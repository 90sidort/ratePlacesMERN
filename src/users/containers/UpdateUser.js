import React, { useContext, useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

import Input from "../../shared/components/FormElements/Input";
import Button from "../../shared/components/FormElements/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_MAXLENGTH,
} from "../../shared/utils/validators";
import { useForm } from "../../shared/hooks/form-hook";
import "../../places/containers/PlaceForm.css";
import Card from "../../shared/components/UIElements/Card";
import { useHttp } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import { AuthContext } from "../../shared/context/auth-context";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const UpdateUser = () => {
  const auth = useContext(AuthContext);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const location = useLocation();
  const userId = location.pathname.substring(17);
  const [fetchedUser, updateFetchedUser] = useState(undefined);
  const history = useHistory();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      name: { value: "", isValid: true },
      about: { value: "", isValid: false },
      image: { value: null, isValid: true },
    },
    false
  );

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`
        );
        updateFetchedUser(responseData.user);
        setFormData(
          {
            email: {
              value: responseData.user.email,
              isValid: true,
            },
            name: {
              value: responseData.user.name,
              isValid: true,
            },
            about: {
              value: responseData.user.about,
              isValid: true,
            },
          },
          true
        );
      } catch (e) {}
    };
    fetchUserData();
  }, [sendRequest, userId, setFormData]);

  const userUpdateSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", formState.inputs.name.value);
      formData.append("email", formState.inputs.email.value);
      formData.append("about", formState.inputs.about.value);
      formData.append(
        "image",
        formState.inputs.image ? formState.inputs.image.value : "leave"
      );
      await sendRequest(
        `${process.env.REACT_APP_BACKEND_URL}/api/users/${userId}`,
        "PATCH",
        formData,
        {
          Authorization: `Bearer ${auth.token}`,
        }
      );
      history.push(`/userdetails/${userId}`);
    } catch (e) {}
  };

  if (!fetchedUser && !isError) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find the user</h2>
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
      {!isLoading && fetchedUser && (
        <form className="place-form" onSubmit={userUpdateSubmitHandler}>
          <Input
            id="email"
            element="input"
            type="text"
            label="Email"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
            initialValue={fetchedUser.email}
            initialValid={true}
            dataTest="inputEmail"
          />
          <Input
            id="name"
            element="input"
            type="text"
            label="Name"
            validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(30)]}
            errorText="Please enter a valid name (at least 5 characters, max 30 characters)."
            onInput={inputHandler}
            initialValue={fetchedUser.name}
            initialValid={true}
            dataTest="inputUserName"
          />
          <Input
            id="about"
            label="About"
            element="textarea"
            onInput={inputHandler}
            initialValue={fetchedUser.about}
            initialValid={true}
            errorText="Provide a description if you feel like it."
            validators={""}
            dataTest="inputAbout"
          />
          <ImageUpload
            id="image"
            center
            edit
            onInput={inputHandler}
            errorText="Please provide an image."
          />
          <Button
            type="submit"
            disabled={!formState.isValid}
            dataTest="updateUserButton"
          >
            UPDATE USER
          </Button>
        </form>
      )}
    </React.Fragment>
  );
};

export default UpdateUser;
