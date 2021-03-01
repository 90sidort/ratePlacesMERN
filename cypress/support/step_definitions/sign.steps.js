import { defineStep } from "cypress-cucumber-preprocessor/steps";

import { profileNavigation } from "../variables/profile.variables";
import {
  cratedUserProfile,
  inputEmail,
  inputPassword,
  signInButton,
  signUpButton,
  validEmail,
  validPassword,
} from "../variables/sign.variables";

defineStep("User clicks sign up to create account", () => {
  cy.intercept("GET", "**/api/users/").as("getUsers");
  cy.get(signUpButton, { timeout: 10000 }).click();
  cy.wait("@getUsers");
});

defineStep("User is logged", () => {
  cy.get(profileNavigation, { timeout: 10000 }).should("be.visible");
});

defineStep("Created user profile is visible", () => {
  cy.get(cratedUserProfile, { timeout: 10000 }).should("be.visible");
});

defineStep("User {string} is logged in", (user) => {
  let login;
  if (user === "two") {
    login = validEmail;
  }
  cy.visit("/auth");
  cy.get(inputEmail).type(login);
  cy.get(inputPassword).type(validPassword);
  cy.get(signInButton).click();
  cy.url().should("eq", "http://localhost:3000/");
});

defineStep("User is logged out", () => {
  cy.get(profileNavigation).should("not.exist");
});
