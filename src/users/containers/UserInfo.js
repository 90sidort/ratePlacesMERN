import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";

const UserInfo = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const location = useLocation();
  const userId = location.pathname.substring(13);
  const [userDetails, setUserDetails] = useState({});
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`
        );
        setUserDetails(responseData.user);
      } catch (e) {}
    };
    fetchComments();
  }, [sendRequest, userId]);

  console.log(userDetails);
  console.log(userDetails.followers);

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {auth.userId === userId && (
        <Button
          invert
          onClick={() => history.push(`/editUserDetails/${userId}`)}
        >
          EDIT
        </Button>
      )}
      <div>
        <h2>{userDetails.name}</h2>
        <h4>{userDetails.about}</h4>
      </div>
      {userDetails.places && (
        <div>
          <p>{`This user has ${userDetails.places.length} ${
            userDetails.places.length === 1 ? "place" : "places"
          }`}</p>
          <Button invert onClick={() => history.push(`/${userId}/places`)}>
            SEE PLACES
          </Button>
        </div>
      )}
      <div>
        {userDetails.following && userDetails.following.length > 0 && (
          <div>
            <h3>Follows</h3>
            <div></div>
          </div>
        )}
        {userDetails.followers && userDetails.followers.length > 0 && (
          <div>
            <h3>Is followed by</h3>
            <div></div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
};

export default UserInfo;
