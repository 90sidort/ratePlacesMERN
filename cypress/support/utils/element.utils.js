import {
  signInNavigation,
  signUpButton,
  inputUserName,
  inputEmail,
  inputPassword,
} from "../variables/sign.variables";

export const elementFinder = (elementName) => {
  if (elementName === "navigation Sign in") {
    return signInNavigation;
  } else if (elementName === "Sign up button") {
    return signUpButton;
  } else if (elementName === "username input") {
    return inputUserName;
  } else if (elementName === "email input") {
    return inputEmail;
  } else if (elementName === "password input") {
    return inputPassword;
  }
};
