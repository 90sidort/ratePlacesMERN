import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Avatar from "../../shared/components/UIElements/Avatar";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";

import "./UserInfo.css";

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

  const archiveAccount = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/archive/${userId}`,
        "PATCH",
        {},
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      auth.logout();
      history.push(`/auth`);
    } catch (e) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <div style={{ textAlign: "center" }}>
        {auth.userId === userId && (
          <div className="user-info__edit" style={{ display: "inline" }}>
            <Button
              invert
              onClick={() => history.push(`/editUserDetails/${userId}`)}
            >
              EDIT
            </Button>
          </div>
        )}
        {auth.userId === userId && (
          <div className="user-info__edit" style={{ display: "inline" }}>
            <Button invert onClick={archiveAccount}>
              ARCHIVE
            </Button>
          </div>
        )}
      </div>
      <Card className="user-info__content">
        {userDetails.image && (
          <div className="user-item__image-profile user-info__item">
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
          <div>
            <h2>{userDetails.name}</h2>
            {userDetails.places && (
              <div>
                <p>{`This user has ${userDetails.places.length} ${
                  userDetails.places.length === 1 ? "place" : "places"
                }`}</p>
                <Button
                  invert
                  onClick={() => history.push(`/${userId}/places`)}
                >
                  SEE PLACES
                </Button>
              </div>
            )}
            <h4>{userDetails.about}</h4>
          </div>
        </div>
      </Card>
      <div>
        <Card className="user-info__likes">
          {follow.followed && (
            <div>
              <h3 style={{ textAlign: "center" }}>Follows</h3>
              <div>
                {follow.followed.map((foll) => (
                  <div className="user-info__item" key={foll._id}>
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

                      <p style={{ color: "black" }}>{foll.name}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
        <Card className="user-info__likes">
          {follow.followers && (
            <div>
              <h3 style={{ textAlign: "center" }}>Is followed by</h3>
              <div>
                {follow.followers.map((foll) => (
                  <div
                    key={foll._id}
                    className="user-info__item"
                    style={{ margin: "1rem" }}
                  >
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
                      <p style={{ color: "black" }}>{foll.name}</p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UserInfo;
