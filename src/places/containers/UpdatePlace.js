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
      title: { value: "", isValid: false },
      type: { value: "", isValid: true },
      description: { value: "", isValid: true },
      address: { value: "", isValid: false },
      about: { value: "", isValid: false },
      image: { value: null, isValid: true },
    },
    false
  );

  useEffect(() => {
    const fetchPlace = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`
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
            about: {
              value: responseData.place.about,
              isValid: true,
            },
            address: {
              value: responseData.place.address,
              isValid: true,
            },
            type: {
              value: responseData.place.type,
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
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("about", formState.inputs.about.value);
      formData.append("type", formState.inputs.type.value);
      formData.append("address", formState.inputs.address.value);
      formData.append(
        "image",
        formState.inputs.image ? formState.inputs.image.value : "leave"
      );
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/places/${placeId}`,
        "PATCH",
        formData,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (e) {}
  };

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
            id="type"
            element="select"
            type="text"
            label="Type"
            onInput={inputHandler}
            options={["Monument", "Site", "Event", "Other"]}
            initialValue={fetchedPlace.type}
            initialValid={true}
            validators={""}
          />
          <Input
            id="about"
            label="About"
            element="textarea"
            validators={[VALIDATOR_MINLENGTH(5)]}
            errorText="Please enter a short description (at least 5 characters)."
            onInput={inputHandler}
            initialValue={fetchedPlace.about}
            initialValid={true}
          />
          <Input
            id="address"
            type="text"
            label="Address"
            element="input"
            validators={[VALIDATOR_REQUIRE()]}
            initialValue={fetchedPlace.address}
            initialValid={true}
            errorText="Please enter a valid address."
            onInput={inputHandler}
          />
          <Input
            id="description"
            label="Description"
            element="textarea"
            onInput={inputHandler}
            initialValue={fetchedPlace.description}
            initialValid={true}
            errorText="Provide a description if you feel like it."
            validators={""}
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
