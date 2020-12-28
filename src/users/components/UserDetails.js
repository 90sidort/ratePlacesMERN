import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";

import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";
import Button from "../../shared/components/FormElements/Button";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";

const UserDetails = (props) => {
  const auth = useContext(AuthContext);
  const history = useHistory();
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
    } catch (e) {}
  };

  const isYou = props.id === auth.userId;
  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      {isLoading && <LoadingSpinner asOverlay />}
      <div className="place-list center">
        <Card className={"card-user"}>
          <h4>{`Welcome to ${isYou ? "your" : props.name} profile.`}</h4>
          <small>{` ${isYou ? "You have" : "This user has"} ${
            props.places.length
          } ${
            props.places.length !== 1 ? "places" : "place"
          } and ${userCount} ${
            userCount !== 1 ? "followers" : "follower"
          }.`}</small>
          <br />
          {!isYou && auth.userId && isFollowed && (
            <Button onClick={folloHandler}>Unfollow</Button>
          )}
          {!isYou && auth.userId && !isFollowed && (
            <Button onClick={folloHandler}>Follow</Button>
          )}
          <Button
            inverse
            onClick={() => history.push(`/userdetails/${props.id}`)}
          >
            Details
          </Button>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UserDetails;
