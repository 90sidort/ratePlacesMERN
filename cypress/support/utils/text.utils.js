import {
  changedAbout,
  changedEmail,
  changedName,
} from "../variables/profile.variables";

import {
  correctEmail,
  correctUsername,
  correctPassword,
  incorrectUsername,
  incorrectEmail,
  incorrectPassword,
  validEmail,
  validPassword,
  invalidEmail,
  invalidPassword,
  userDsntExist,
  wrngPassword,
  rchvdEmail,
  rchvdUser,
} from "../variables/sign.variables";

export const textFinder = (textName) => {
  if (textName === "correct username") {
    return correctUsername;
  } else if (textName === "correct email") {
    return correctEmail;
  } else if (textName === "correct password") {
    return correctPassword;
  } else if (textName === "incorrect username") {
    return incorrectUsername;
  } else if (textName === "incorrect email") {
    return incorrectEmail;
  } else if (textName === "incorrect password") {
    return incorrectPassword;
  } else if (textName === "valid email") {
    return validEmail;
  } else if (textName === "valid password") {
    return validPassword;
  } else if (textName === "invalid email") {
    return invalidEmail;
  } else if (textName === "invalid password") {
    return invalidPassword;
  } else if (textName === "user does not exist") {
    return userDsntExist;
  } else if (textName === "wrong password") {
    return wrngPassword;
  } else if (textName === "archived email") {
    return rchvdEmail;
  } else if (textName === "archived user") {
    return rchvdUser;
  } else if (textName === "changed email") {
    return changedEmail;
  } else if (textName === "changed name") {
    return changedName;
  } else if (textName === "changed about") {
    return changedAbout;
  }
};
