import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";
import "./PlaceList.css";

const PlaceList = (props) => {
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
            <Button to="/places/new">Follow</Button>
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
