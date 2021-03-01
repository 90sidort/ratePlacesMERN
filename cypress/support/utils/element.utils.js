import { okayButton } from "../variables/common.variables";

import {
  archiveProfileButton,
  editProfileButton,
  inputAbout,
  seePlacesButton,
  updateUserButton,
} from "../variables/profile.variables";

import {
  signInNavigation,
  signUpButton,
  inputUserName,
  inputEmail,
  inputPassword,
  signInButton,
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
  } else if (elementName === "Sign in button") {
    return signInButton;
  } else if (elementName === "Okay button") {
    return okayButton;
  } else if (elementName === "see places button") {
    return seePlacesButton;
  } else if (elementName === "archive button") {
    return archiveProfileButton;
  } else if (elementName === "edit button") {
    return editProfileButton;
  } else if (elementName === "Update user button") {
    return updateUserButton;
  } else if (elementName === "about input") {
    return inputAbout;
  }
};
