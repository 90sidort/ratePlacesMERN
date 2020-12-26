import React, { useState, useContext } from "react";
import { useLocation } from "react-router-dom";

import MapboxGLMap from "../../shared/components/UIElements/Map";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { VALIDATOR_MINLENGTH } from "../../shared/utils/validators";
import { AuthContext } from "../../shared/context/auth-context";

const PlaceDetails = (props) => {
  const location = useLocation();
  const data = { ...location.placeData };
  const auth = useContext(AuthContext);

  const [formState, inputHandler] = useForm(
    {
      comment: { value: "", isValid: false },
    },
    false
  );
  const { isLoading, isError, sendRequest, clearError } = useHttp();

  const addCommentHandler = async (e) => {
    e.preventDefault();
    try {
      const body = JSON.stringify({
        comment: formState.inputs.comment.value,
        userId: auth.userId,
      });
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/comments/${data.id}`,
        "POST",
        body,
        {
          Authorization: `Bearer ${auth.token}`,
          "Content-Type": "application/json",
        }
      );
    } catch (e) {
      console.log(e);
    }
  };

  console.log(data);

  return (
    <div>
      <h1>{data.title}</h1>
      <h3>{data.about}</h3>
      <p>
        This place has {data.likes} {data.likes === 1 ? "like" : "likes"}
      </p>
      <div>
        {" "}
        <img
          src={
            props.image !== "placeholder"
              ? `${process.env.REACT_APP_BACKEND_URL}/${data.image}`
              : `${process.env.REACT_APP_BACKEND_URL}/uploads/images/tundra.jpg`
          }
          alt={data.title}
        />
      </div>
      <div className="map-container">
        <MapboxGLMap
          coordinates={[data.coordinates.lat, data.coordinates.lng]}
        />
      </div>
      <p>{data.desc}</p>
      <form className="place-form" onSubmit={addCommentHandler}>
        <Input
          id="comment"
          type="text"
          label="Comment"
          element="input"
          validators={[VALIDATOR_MINLENGTH(1)]}
          errorText="Comment must have at least one character."
          onInput={inputHandler}
        />
        <Button disabled={!formState.isValid} type="submit">
          Add comment
        </Button>
      </form>
      <div>
        {data.comments &&
          data.comments.map((comment) => {
            return <p>{comment.text}</p>;
          })}
      </div>
    </div>
  );
};

export default PlaceDetails;
