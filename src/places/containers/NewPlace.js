import React, { useContext } from "react";

import {
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttp } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useHistory } from "react-router-dom";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

import "./PlaceForm.css";

const NewPlace = () => {
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const [formState, inputHandler] = useForm(
    {
      title: { value: "", isValid: false },
      type: { value: "", isValid: true },
      about: { value: "", isValid: false },
      description: { value: "", isValid: true },
      address: { value: "", isValid: false },
      image: { value: null, isValid: true },
    },
    false
  );
  const history = useHistory();

  const placeSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", formState.inputs.title.value);
      formData.append("description", formState.inputs.description.value);
      formData.append("about", formState.inputs.about.value);
      formData.append("address", formState.inputs.address.value);
      formData.append("image", formState.inputs.image.value);
      formData.append("type", formState.inputs.type.value);
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/places`,
        "POST",
        formData,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      history.push(`/${auth.userId}/places`);
    } catch (e) {}
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      <form
        className="place-form"
        onSubmit={placeSubmitHandler}
        data-test="newPlaceForm"
      >
        {isLoading && <LoadingSpinner asOverlay />}
        <Input
          id="title"
          type="text"
          label="Title"
          element="input"
          validators={[VALIDATOR_MINLENGTH(1), VALIDATOR_MAXLENGTH(300)]}
          errorText="Please enter a valid title (min. 1 char, max 300)."
          onInput={inputHandler}
          dataTest="inputTitle"
        />
        <Input
          id="type"
          label="Type"
          element="select"
          options={["Monument", "Site", "Event", "Other"]}
          onInput={inputHandler}
          initialValue="monument"
          validators={""}
          dataTest="selectType"
        />
        <Input
          id="about"
          label="About"
          element="textarea"
          validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(1000)]}
          errorText="Please enter a short description (min. 5 chars, max 1000)."
          onInput={inputHandler}
          dataTest="inputAbout"
        />
        <Input
          id="address"
          type="text"
          label="Address"
          element="input"
          validators={[VALIDATOR_REQUIRE()]}
          errorText="Please enter a valid address."
          onInput={inputHandler}
          dataTest="inputAddress"
        />
        <Input
          id="description"
          label="Description"
          element="textarea"
          onInput={inputHandler}
          validators={""}
          dataTest="inputDescription"
        />
        <ImageUpload
          id="image"
          center
          onInput={inputHandler}
          errorText="Please provide an image."
        />
        <Button
          type="submit"
          disabled={!formState.isValid}
          dataTest="addPlaceButton"
        >
          ADD PLACE
        </Button>
      </form>
    </React.Fragment>
  );
};

export default NewPlace;
