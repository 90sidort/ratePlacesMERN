import React from "react";

import Card from "../../shared/components/UIElements/Card";
import PlaceItem from "./PlaceItem";
import Button from "../../shared/components/FormElements/Button";

import "./PlaceList.css";
import UserDetails from "../../users/components/UserDetails";

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
  return (
    <React.Fragment>
      {props.userData && (
        <UserDetails
          name={props.userData.name}
          places={props.userData.places}
          followers={props.userData.followers}
          id={props.userData._id}
        />
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
