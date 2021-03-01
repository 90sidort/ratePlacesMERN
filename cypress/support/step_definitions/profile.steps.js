import { defineStep } from "cypress-cucumber-preprocessor/steps";
import { textFinder } from "../utils/text.utils";

import {
  profileNavigation,
  seePlacesButton,
  userAboutInfo,
  userFourFollowed,
  userNameProfile,
  userTenFollows,
} from "../variables/profile.variables";

defineStep("User navigates to profile", () => {
  cy.get(profileNavigation).should("be.visible").click();
  cy.url().should("include", "/userdetails/");
});

defineStep("User {string} profile is shown", (username) => {
  let userName;
  if (username === "two") {
    userName = "TestUser2";
  } else if (username === "ten") {
    userName = "TestUser10";
  } else if (username === "four") {
    userName = "TestUser4";
  }
  cy.get(seePlacesButton).should("be.visible");
  cy.get(userNameProfile).should("be.visible").contains(userName);
});

defineStep(
  "User clicks {string} profile in {string}",
  (userNumber, section) => {
    let userNum;
    if (userNumber === "TestUser10") {
      userNum = userTenFollows;
    } else if (userNumber === "TestUser4") {
      userNum = userFourFollowed;
    }
    cy.get(userNum).click();
  }
);

defineStep("Changed profile is displayed", () => {
  cy.get(userNameProfile)
    .should("be.visible")
    .contains(textFinder("changed name"));
  cy.get(userAboutInfo);
});
