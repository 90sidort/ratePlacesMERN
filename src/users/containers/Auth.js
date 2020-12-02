import React, { useState } from "react";

import Button from "../../shared/components/FormElements/Button";
import Input from "../../shared/components/FormElements/Input";
import Card from "../../shared/components/UIElements/Card";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/utils/validators";

import "./Auth.css";

const Auth = () => {
  const [isAuth, setIsAuth] = useState(true);
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
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
        },
        false
      );
    }
    setIsAuth((prevMode) => !prevMode);
  };

  const authSubmitHandler = (e) => {
    e.preventDefault();
    console.log(formState.inputs);
  };

  return (
    <Card className="authentication">
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
          validators={[VALIDATOR_MINLENGTH(5)]}
          errorText="Please enter a valid password."
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
  );
};

export default Auth;
