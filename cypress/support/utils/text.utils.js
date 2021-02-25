import {
  correctEmail,
  correctUsername,
  correctPassword,
} from "../variables/sign.variables";

export const textFinder = (textName) => {
  if (textName === "correct username") {
    return correctUsername;
  } else if (textName === "correct email") {
    return correctEmail;
  } else if (textName === "correct password") {
    return correctPassword;
  }
};
