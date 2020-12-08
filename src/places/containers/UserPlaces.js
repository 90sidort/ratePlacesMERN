import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../../shared/hooks/http-hook";

import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
  const userId = useParams().userId;
  const [fetchedPlaces, fetchPlaces] = useState(null);
  const { isLoading, isError, sendRequest, clearError } = useHttp;

  return <PlaceList places={loadedPlaces} />;
};

export default UserPlaces;
