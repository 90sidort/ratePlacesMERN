import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";

const mapboxToken = process.env.MAP_TOKEN;

const styles = {
  width: "30vw",
  height: "calc(30vh - 80px)",
  margin: "auto",
};

const MapboxGLMap = (props) => {
  const [map, setMap] = useState(null);
  const mapContainer = useRef(null);
  const lat = props.coordinates[0];
  const long = props.coordinates[1];

  useEffect(() => {
    mapboxgl.accessToken = mapboxToken;
    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v11", // stylesheet location
        center: [long, lat],
        zoom: 12,
      });

      new mapboxgl.Marker().setLngLat([long, lat]).addTo(map);

      map.on("load", () => {
        setMap(map);
        map.resize();
      });
    };

    if (!map) initializeMap({ setMap, mapContainer });
  }, [map, lat, long]);

  return <div ref={(el) => (mapContainer.current = el)} style={styles} />;
};

export default MapboxGLMap;
