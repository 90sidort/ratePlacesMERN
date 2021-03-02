import { editProfileURL } from "../variables/profile.variables";
import {
  pagePlaceRanking,
  pageUserRanking,
} from "../variables/ranking.variables";
import { allUsersURL, signInURL } from "../variables/sign.variables";

export const urlFinder = (urlName) => {
  if (urlName === "Sign in" || urlName === "Sign up") {
    return signInURL;
  } else if (urlName === "All users") {
    return allUsersURL;
  } else if (urlName === "Edit profile") {
    return editProfileURL;
  } else if (urlName === "User ranking") {
    return pageUserRanking;
  } else if (urlName === "Place ranking") {
    return pagePlaceRanking;
  }
};
