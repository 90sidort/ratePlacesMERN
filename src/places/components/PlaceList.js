import React from "react";

import PlaceItem from "./PlaceItem";

import "./PlaceList.css";
import UserDetails from "../../users/components/UserDetails";

const PlaceList = (props) => {
  if (props.places.length === 0) {
    return (
      <div className="place-list center">
        {props.userData && (
          <UserDetails
            name={props.userData.name}
            places={props.userData.places}
            followers={props.userData.followers}
            id={props.userData._id}
          />
        )}
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
            popular={props.popular}
            key={place._id}
            type={place.type}
            id={place._id}
            image={place.image}
            title={place.title}
            address={place.address}
            description={place.description}
            about={place.about}
            creatorId={place.creator}
            coordinates={place.location}
            likes={place.likes}
            onDelete={props.onDeletePlace}
            comments={place.comments}
          />
        ))}
      </ul>
    </React.Fragment>
  );
};

export default PlaceList;
