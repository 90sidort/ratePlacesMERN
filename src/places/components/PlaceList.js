import React, { useState, useContext } from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";
import "./PlaceList.css";

const PlaceList = (props) => {
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const [isFollowed, setIsFollowed] = useState(
    props.userData && props.userData.followers.includes(auth.userId)
  );

  const likeHandler = async () => {
    try {
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/follow/${props.userData.id}`,
        "PUT",
        {},
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  if (props.places.length === 0) {
    return (
      <div className="place-list center">
        <Card>
          <h2>No places found. If you feel like it, create one.</h2>
          <Button to="/places/new">Share place</Button>
        </Card>
      </div>
    );
  }
  console.log(props);
  return (
    <React.Fragment>
      {props.userData.followers && (
        <div className="place-list center">
          <Card>
            <h4>{`Welcome to ${props.userData.name} profile.`}</h4>
            <small>{`This user has ${props.places.length} ${
              props.places.length !== 1 ? "places" : "place"
            } and is followed by ${props.userData.followers.length} ${
              props.userData.followers.length !== 1 ? "users" : "user"
            }.`}</small>
            <br />
            <Button onClick={likeHandler}>Follow</Button>
          </Card>
        </div>
      )}
      <ul className="place-list">
        {props.places.map((place) => (
          <PlaceItem
            key={place.id}
            id={place.id}
            image={place.image}
            title={place.title}
            address={place.address}
            description={place.description}
            creatorId={place.creator}
            coordinates={place.location}
            likes={place.likes}
            onDelete={props.onDeletePlace}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default PlaceList;
