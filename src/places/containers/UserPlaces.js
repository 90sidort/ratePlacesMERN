import React from "react";
import { useParams } from "react-router-dom";

import PlaceList from "../components/PlaceList";

const PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrappers in the world",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/commons/1/10/Empire_State_Building_%28aerial_view%29.jpg",
    location: {
      lat: 40.7484405,
      lng: -73.9878584,
    },
    creator: "u1",
    address: "20 W 34th St, New York, NY 10001, United States",
  },
  {
    id: "p2",
    title: "Orthodox Church of St. Nicholas",
    description: "Orthodox Church in Szczecin",
    imageUrl:
      "https://thumbs.dreamstime.com/z/orthodox-parish-st-nicholas-altar-b-poland-szczecin-june-63083420.jpg",
    location: {
      lat: 53.430453,
      lng: 14.55971,
    },
    creator: "u2",
    address: "Zygmunta Starego 1A, 71-899 Szczecin, Poland",
  },
];

const UserPlaces = () => {
  const userId = useParams().userId;
  const loadedPlaces = PLACES.filter((place) => place.creator === userId);
  return <PlaceList places={loadedPlaces} />;
};

export default UserPlaces;
