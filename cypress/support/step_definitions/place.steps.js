import { defineStep } from "cypress-cucumber-preprocessor/steps";
import { placeItemCard } from "../variables/places.variables";

defineStep("User {string} places are shown", (username) => {
  let placesNum;
  if (username === "two") {
    placesNum = 2;
  }
  cy.get(placeItemCard).should("be.visible").should("have.length", placesNum);
});
