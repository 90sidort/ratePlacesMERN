import React, { useContext, useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "./PlaceForm.css";
import Card from "../../shared/components/UIElements/Card";
import { useHttp } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const UpdatePlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const placeId = useParams().placeId;
  const [fetchedPlace, updatefetchedPlace] = useState(undefined);
  const history = useHistory();
  const [formState, inputHandler, setFormData] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: { value: "", isValid: false },
      image: { value: null, isValid: true },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/places/${placeId}`
        );
        updatefetchedPlace(responseData.place);
        setFormData(
          {
            title: {
              value: responseData.place.title,
              isValid: true,
            },
            description: {
              value: responseData.place.description,
              isValid: true,
            },
          },
          true
        );
      } catch (e) {}
    };
    fetchPlace();
  }, [placeId, sendRequest, setFormData]);

  const placeUpdateSubmitHandler = async (e) => {
    console.log("kucyk");
    console.log(fetchedPlace.image);
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append(
        "image",
        formState.inputs.image ? formState.inputs.image.value : "leave"
      );
      await sendRequest(
        `http://localhost:5000/api/places/${placeId}`,
        "PATCH",
        formData
      );
      history.push(`/${auth.userId}/places`);
    } catch (e) {}
  };

  console.log(fetchedPlace);

  if (!fetchedPlace && !isError) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find the place</h2>
        </Card>
      </div>
    );
  }

  return (
    <React.Fragment>
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      <ErrorModal error={isError} onClear={clearError} />
      {!isLoading && fetchedPlace && (
        <form className="place-form" onSubmit={placeUpdateSubmitHandler}>
          <Input
            id="title"
            element="input"
            type="text"
            label="Title"
            validators={[VALIDATOR_REQUIRE()]}
            errorText="Please enter a valid title."
            onInput={inputHandler}
            initialValue={fetchedPlace.title}
            initialValid={true}
          />
          <Input
            id="description"
            label="Description"
            element="textarea"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a valid description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={fetchedPlace.description}
            initialValid={true}
          />
          <ImageUpload
            id="image"
            center
            edit
            onInput={inputHandler}
            errorText="Please provide an image."
          />
          <Button type="submit" disabled={!formState.isValid}>
            UPDATE PLACE
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdatePlace;
