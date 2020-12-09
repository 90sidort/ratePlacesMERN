import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttp } from "../../shared/hooks/http-hook";

import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
  const authId = useParams().userId;
  const [fetchedPlaces, updatefetchedPlaces] = useState([]);
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/user/${authId}`
        );
        updatefetchedPlaces(responseData.places);
      } catch (e) {}
    };
    fetchPlaces();
  }, [authId, sendRequest]);

  const placeDeleteHandler = (deletedId) => {
    updatefetchedPlaces((prevPlace) =>
      prevPlace.filter((place) => place.id !== deletedId)
    );
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <PlaceList places={fetchedPlaces} onDeletePlace={placeDeleteHandler} />
    </React.Fragment>
  );
};

export default UserPlaces;
