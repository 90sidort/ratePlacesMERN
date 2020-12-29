import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MapboxGLMap from "../../shared/components/UIElements/Map";
import Button from "../../shared/components/FormElements/Button";
import { useHttp } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const PlaceDetails = () => {
  const location = useLocation();
  const placeId = location.pathname.substring(14);
  const [placeDetails, setPlaceDetails] = useState({});
  const [commentInput, setCommentInput] = useState("");
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`
        );
        setPlaceDetails(responseData.place);
      } catch (e) {}
    };
    fetchDetails();
  }, [sendRequest, placeId]);

  const onCommentChangeHandler = (e) => {
    setCommentInput(e.target.value);
  };

  const addCommentHandler = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({
        comment: commentInput,
        userId: auth.userId,
      });
      const res = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/comments/${placeId}`,
        "POST",
        body,
        {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        }
      );
      await setCommentInput("");
      setPlaceDetails(res.place);
    } catch (e) {}
  };

  const delCommentHandler = async (commentId) => {
    const body = JSON.stringify({
      cid: commentId,
    });
    try {
      const res = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/comments/${placeId}`,
        "PATCH",
        body,
        {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        }
      );
      setPlaceDetails(res.place);
    } catch (e) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div>
        <h1>{placeDetails.title}</h1>
        <h3>{placeDetails.about}</h3>
        {placeDetails.likes && (
          <p>
            This place has {placeDetails.likes.length}{" "}
            {placeDetails.likes.length === 1 ? "like" : "likes"}
          </p>
        )}
        {placeDetails.image && (
          <img
            src={
              placeDetails.image !== "placeholder"
                ? `${process.env.REACT_APP_BACKEND_URL}/${placeDetails.image}`
                : `${process.env.REACT_APP_BACKEND_URL}/uploads/images/tundra.jpg`
            }
            alt={placeDetails.title}
          />
        )}
        {placeDetails.location && (
          <div className="map-container">
            <MapboxGLMap
              coordinates={[
                placeDetails.location.lat,
                placeDetails.location.lng,
              ]}
            />
          </div>
        )}
        <p>{placeDetails.description}</p>
        <form className="place-form" onSubmit={addCommentHandler}>
          <div className={`form-control`}>
            <label htmlFor="comment">Comment</label>
            <input id="comment" type="text" onChange={onCommentChangeHandler} />
          </div>
          <Button disabled={commentInput.length === 0} type="submit">
            Add comment
          </Button>
        </form>
        {placeDetails.comments && (
          <div>
            {placeDetails.comments.map((comment) => {
              return (
                <div key={comment._id}>
                  <p>{comment.text}</p>
                  <button
                    onClick={() => {
                      delCommentHandler(comment._id);
                    }}
                  >
                    X
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default PlaceDetails;
