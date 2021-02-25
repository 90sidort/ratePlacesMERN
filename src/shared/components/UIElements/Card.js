import React from "react";

import "./Card.css";

const Card = (props) => {
  return (
    <div
      className={`card ${props.className}`}
      style={props.style}
      data-test={props.dataTest}
    >
      {props.children}
    </div>
  );
};

export default Card;
