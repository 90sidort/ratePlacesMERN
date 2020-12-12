import React, { useState, useContext } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";

import "./Auth.css";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [isAuth, setIsAuth] = useState(true);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const [formState, inputHandler, setFormData] = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );

  const isAuthHandler = () => {
    if (!isAuth) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
          image: { value: null, isValid: false },
        },
        false
      );
    }
    setIsAuth((prevMode) => !prevMode);
  };

  const authSubmitHandler = async (e) => {
    e.preventDefault();
    if (isAuth) {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(responseData.user.id);
      } catch (e) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          "http://localhost:5000/api/users/signup",
          "POST",
          formData
        );
        auth.login(responseData.user.id);
      } catch (e) {}
    }
  };

  return (
    <React.Fragment>
      <ErrorModal error={isError} onClear={clearError} />
      <Card className="authentication">
        {isLoading && <LoadingSpinner asOverlay />}
        <form onSubmit={authSubmitHandler}>
          {!isAuth && (
            <Input
              element="input"
              type="text"
              id="name"
              label="Name"
              validators={[VALIDATOR_REQUIRE]}
              errorText="Please enter a valid name."
              onInput={inputHandler}
            />
          )}
          {!isAuth && (
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="Please provide an image."
            />
          )}
          <Input
            id="email"
            type="text"
            label="Email"
            element="input"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Please enter a valid email."
            onInput={inputHandler}
          />{" "}
          <Input
            id="password"
            type="password"
            label="Password"
            element="input"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Please enter a valid password (at least 6 characters)."
            onInput={inputHandler}
          />
          <Button type="submit" disabled={!formState.isValid}>
            {isAuth ? "SIGN IN" : "SIGN UP"}
          </Button>
        </form>
        <Button inverse onClick={isAuthHandler}>
          {isAuth ? "SIGN UP" : "SIGN IN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;