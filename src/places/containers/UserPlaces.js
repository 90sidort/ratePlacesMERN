import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHttp } from "../../shared/hooks/http-hook";

import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
  const authId = useParams().userId;
  const [fetchedPlaces, updatefetchedPlaces] = useState([]);
  const [fetchedUser, updateFetchedUser] = useState(null);
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/places/user/${authId}`
        );
        updatefetchedPlaces(responseData.places);
      } catch (e) {}
    };
    const fetchUser = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/${authId}`
        );

        updateFetchedUser(responseData.user);
      } catch (e) {}
    };
    fetchUser();
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
      <PlaceList
        places={fetchedPlaces}
        userData={fetchedUser}
        onDeletePlace={placeDeleteHandler}
      />
    </React.Fragment>
  );
};

export default UserPlaces;
