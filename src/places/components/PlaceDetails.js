import React, { useState, useContext, useEffect } from "react";
import { useLocation } from "react-router-dom";

import MapboxGLMap from "../../shared/components/UIElements/Map";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { VALIDATOR_MINLENGTH } from "../../shared/utils/validators";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";

const PlaceDetails = (props) => {
  const history = useHistory();
  const location = useLocation();
  const [data, setData] = useState({ ...location.placeData });
  const auth = useContext(AuthContext);
  const [comments, setComments] = useState(null);
  const [formState, inputHandler] = useForm(
    {
      comment: { value: "", isValid: false },
    },
    false
  );
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/places/comments/${data.id}`
        );
        console.log(responseData);
        setComments(responseData.comments);
      } catch (e) {}
    };
    fetchComments();
  }, [setComments]);

  const addCommentHandler = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({
        comment: formState.inputs.comment.value,
        userId: auth.userId,
      });
      const res = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/comments/${data.id}`,
        "POST",
        body,
        {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        }
      );
      const resArray = Object.values(res);
      setComments(resArray);
      setData(data);
    } catch (e) {
      console.log(e);
    }
  };

  const delCommentHandler = async (commentId) => {
    const body = JSON.stringify({
      cid: commentId,
    });
    try {
      const res = await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/comments/${data.id}`,
        "PATCH",
        body,
        {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        }
      );
      const resArray = Object.values(res);
      setComments(resArray);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(comments);

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div>
        <h1>{data.title}</h1>
        <h3>{data.about}</h3>
        <p>
          This place has {data.likes} {data.likes === 1 ? "like" : "likes"}
        </p>
        <div>
          {" "}
          <img
            src={
              props.image !== "placeholder"
                ? `${process.env.REACT_APP_BACKEND_URL}/${data.image}`
                : `${process.env.REACT_APP_BACKEND_URL}/uploads/images/tundra.jpg`
            }
            alt={data.title}
          />
        </div>
        <div className="map-container">
          <MapboxGLMap
            coordinates={[data.coordinates.lat, data.coordinates.lng]}
          />
        </div>
        <p>{data.desc}</p>
        <form className="place-form" onSubmit={addCommentHandler}>
          <Input
            id="comment"
            type="text"
            label="Comment"
            element="input"
            validators={[VALIDATOR_MINLENGTH(1)]}
            errorText="Comment must have at least one character."
            onInput={inputHandler}
          />
          <Button disabled={!formState.isValid} type="submit">
            Add comment
          </Button>
        </form>
        {console.log(123, comments)}
        {comments && (
          <div>
            {comments.map((comment) => {
              return (
                <div key={comment._id}>
                  <p>{comment.text}</p>
                  <button onClick={() => delCommentHandler(comment._id)}>
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
