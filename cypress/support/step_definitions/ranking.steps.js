import { defineStep } from "cypress-cucumber-preprocessor/steps";
import { placeItemCard, userItemCard } from "../variables/places.variables";
import {
  placeNameInfo,
  placeRanking,
  userNameInfo,
  userProfileItem,
  userRanking,
} from "../variables/ranking.variables";

defineStep("User navigates to users ranking", () => {
  cy.get(userRanking).should("be.visible").click();
});

defineStep("User navigates to places ranking", () => {
  cy.get(placeRanking).should("be.visible").click();
});

defineStep("Users popularity is shown correctly", () => {
  cy.get(userProfileItem).should("have.length", 5);
  cy.get(userNameInfo).eq(0).should("have.text", "TestUser10");
});

defineStep("Places popularity is shown correctly", () => {
  cy.get(placeItemCard).should("have.length", 5);
  cy.get(placeNameInfo).eq(0).should("have.text", "TestPlace1");
});

defineStep("Places popularity is changed", () => {
  cy.get(placeItemCard).should("have.length", 5);
  cy.get(placeNameInfo).eq(4).should("have.text", "TestPlace4");
});

defineStep("Users popularity is changed", () => {
  cy.get(userItemCard("TestUser3")).should("not.exist");
});
