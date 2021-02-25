import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import ErrorModal from "../../shared/components/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/components/UIElements/LoadingSpinner";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MAXLENGTH,
  VALIDATOR_MINLENGTH,
} from "../../shared/utils/validators";
import { AuthContext } from "../../shared/context/auth-context";
import { useHttp } from "../../shared/hooks/http-hook";

import "./Auth.css";
import ImageUpload from "../../shared/components/FormElements/ImageUpload";

const Auth = () => {
  const auth = useContext(AuthContext);
  const history = useHistory();
  const [isAuth, setIsAuth] = useState(true);
  const { isLoading, isError, sendRequest, clearError } = useHttp();
  const [formState, inputHandler, setFormData] = useForm(
    {
      name: { value: "", isValid: isAuth },
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
          image: { value: null, isValid: true },
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
          `${process.env.REACT_APP_BACKEND_URL}/api/users/login`,
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          { "Content-Type": "application/json" }
        );
        auth.login(
          responseData.userId,
          responseData.token,
          responseData.userName
        );
        history.push("/");
      } catch (e) {}
    } else {
      try {
        const formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        const responseData = await sendRequest(
          `${process.env.REACT_APP_BACKEND_URL}/api/users/signup`,
          "POST",
          formData
        );
        auth.login(responseData.userId, responseData.token);
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
            <ImageUpload
              id="image"
              center
              onInput={inputHandler}
              errorText="Please provide an image."
            />
          )}
          {!isAuth && (
            <Input
              element="input"
              type="text"
              id="name"
              label="Name"
              validators={[VALIDATOR_MINLENGTH(5), VALIDATOR_MAXLENGTH(100)]}
              errorText="Please enter a valid name (at least 5 characters, max 100 characters)."
              onInput={inputHandler}
              dataTest="inputUserName"
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
            dataTest="inputEmail"
          />{" "}
          <Input
            id="password"
            type="password"
            label="Password"
            element="input"
            validators={[VALIDATOR_MINLENGTH(6), VALIDATOR_MAXLENGTH(16)]}
            errorText="Please enter a valid password (at least 6 characters, max 16 characters)."
            onInput={inputHandler}
            dataTest="inputPassword"
          />
          <Button
            type="submit"
            disabled={!formState.isValid}
            dataTest={`button${isAuth ? "SignIn" : "SignUp"}`}
          >
            {isAuth ? "SIGN IN" : "SIGN UP"}
          </Button>
        </form>
        <Button
          inverse
          onClick={isAuthHandler}
          dataTest={`button${!isAuth ? "SignIn" : "SignUp"}`}
        >
          {isAuth ? "SIGN UP" : "SIGN IN"}
        </Button>
      </Card>
    </React.Fragment>
  );
};

export default Auth;
