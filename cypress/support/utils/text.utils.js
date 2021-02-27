import {
  correctEmail,
  correctUsername,
  correctPassword,
  incorrectUsername,
  incorrectEmail,
  incorrectPassword,
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
  }
};
