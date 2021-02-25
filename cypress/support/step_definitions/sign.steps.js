import { defineStep } from "cypress-cucumber-preprocessor/steps";

import { profileNavigation } from "../variables/profile.variables";
import { cratedUserProfile, signUpButton } from "../variables/sign.variables";

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
