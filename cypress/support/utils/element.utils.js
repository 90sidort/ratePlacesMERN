import { okayButton } from "../variables/common.variables";
import {
  addPlaceButton,
  inputAddress,
  inputTitle,
  addPlaceNav,
  inputDescription,
  getMyPlaces,
  edit4,
  updatePlaceButton,
  viewMap,
  mapModal,
  closeMapModal,
} from "../variables/places.variables";

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
  } else if (elementName === "add place navigation") {
    return addPlaceNav;
  } else if (elementName === "title input") {
    return inputTitle;
  } else if (elementName === "address input") {
    return inputAddress;
  } else if (elementName === "Add place button") {
    return addPlaceButton;
  } else if (elementName === "description input") {
    return inputDescription;
  } else if (elementName === "my places navigation") {
    return getMyPlaces;
  } else if (elementName === "edit place 4") {
    return edit4;
  } else if (elementName === "Update place button") {
    return updatePlaceButton;
  } else if (elementName === "view map button") {
    return viewMap;
  } else if (elementName === "close map button") {
    return closeMapModal;
  }
};
