import React, { useContext, useState } from "react";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserDetails = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const [isFollowed, setIsFollowed] = useState(
    props.followers.includes(auth.userId)
  );
  const [userCount, setUserCount] = useState(props.followers.length);

  const folloHandler = async () => {
    const followUnfollow = isFollowed ? "unfollow" : "follow";
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/${followUnfollow}/${props.id}`,
        "PUT",
        {},
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      setIsFollowed(isFollowed ? false : true);
      setUserCount(isFollowed ? userCount - 1 : userCount + 1);
    } catch (e) {
      console.log(e);
    }
  };

  console.log(props.name);
  console.log(isFollowed);
  console.log(auth.userId);
  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="place-list center">
        <Card>
          <h4>{`Welcome to ${props.name} profile.`}</h4>
          <small>{`This user has ${props.places.length} ${
            props.places.length !== 1 ? "places" : "place"
          } and is followed by ${userCount} ${
            userCount !== 1 ? "users" : "user"
          }.`}</small>
          <br />
          {auth.userId && isFollowed && (
            <Button onClick={folloHandler}>Unfollow</Button>
          )}
          {auth.userId && !isFollowed && (
            <Button onClick={folloHandler}>Follow</Button>
          )}
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UserDetails;
