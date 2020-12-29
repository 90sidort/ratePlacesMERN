import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Avatar from "../../shared/components/UIElements/Avatar";
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
  const [follow, setFollow] = useState({});
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`
        );
        setUserDetails(responseData.user);
      } catch (e) {}
    };
    fetchUserData();
  }, [sendRequest, userId]);

  useEffect(() => {
    const fetchUsersData = async () => {
      try {
        const body = JSON.stringify({
          usersIdsFollowed: userDetails.following,
          userIdsFollowers: userDetails.followers,
        });
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/details/get`,
          "PATCH",
          body,
          {
            "Content-Type": "application/json",
          }
        );
        setFollow(responseData);
      } catch (e) {
        console.log(e);
      }
    };
    if (userDetails.following || userDetails.followers) {
      fetchUsersData();
    }
  }, [sendRequest, userDetails]);

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
      {userDetails.image && (
        <div className="user-item__image-profile">
          <Avatar
            src={
              userDetails.image !== "placeholder"
                ? `${process.env.REACT_APP_BACKEND_URL}/${userDetails.image}`
                : `${process.env.REACT_APP_BACKEND_URL}/uploads/images/profile.jpg`
            }
            alt={userDetails.name}
          />
        </div>
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
        <div>
          {follow.followed && (
            <div>
              <h3>Follows</h3>
              <div>
                {follow.followed.map((foll) => (
                  <div key={foll._id}>
                    <Link
                      to={`/userdetails/${foll._id}`}
                      className="avatar-link"
                    >
                      <Avatar
                        className="user-item__image"
                        src={
                          foll.image !== "placeholder"
                            ? `${process.env.REACT_APP_BACKEND_URL}/${foll.image}`
                            : `${process.env.REACT_APP_BACKEND_URL}/uploads/images/profile.jpg`
                        }
                        alt={foll.name}
                      />

                      <p>{foll.name}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div>
          {follow.followers && (
            <div>
              <h3>Is followed by</h3>
              <div>
                {follow.followers.map((foll) => (
                  <div key={foll._id}>
                    <Link
                      to={`/userdetails/${foll._id}`}
                      className="avatar-link"
                    >
                      <Avatar
                        className="user-item__image"
                        src={
                          foll.image !== "placeholder"
                            ? `${process.env.REACT_APP_BACKEND_URL}/${foll.image}`
                            : `${process.env.REACT_APP_BACKEND_URL}/uploads/images/profile.jpg`
                        }
                        alt={foll.name}
                      />
                      <p>{foll.name}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};

export default UserInfo;
