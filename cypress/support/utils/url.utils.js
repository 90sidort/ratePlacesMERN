import { allUsersURL, signInURL } from "../variables/sign.variables";

export const urlFinder = (urlName) => {
  if (urlName === "Sign in" || urlName === "Sign up") {
    return signInURL;
  } else if (urlName === "All users") {
    return allUsersURL;
  }
};
