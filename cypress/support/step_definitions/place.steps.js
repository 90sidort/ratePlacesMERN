import { defineStep } from "cypress-cucumber-preprocessor/steps";
import { elementFinder } from "../utils/element.utils";
import { textFinder } from "../utils/text.utils";

import {
  followCount,
  likeCount,
  likePlaceEl,
  placeItemCard,
  unfollowButton,
  unlikePlaceEl,
  userItemCard,
  addPlaceButton,
  newPlaceForm,
  selectType,
  mapModal,
} from "../variables/places.variables";

import { placeNameInfo } from "../variables/ranking.variables";

defineStep("User {string} places are shown", (username) => {
  let placesNum;
  if (username === "two") {
    placesNum = 2;
  } else if (username === "three") {
    placesNum = 0;
  }
  cy.get(placeItemCard).should("have.length", placesNum);
});

defineStep("User unfollows", () => {
  cy.intercept("PUT", "**/api/users/unfollow/**").as("unfollow");
  cy.get(unfollowButton).should("be.visible").click();
  cy.wait("@unfollow").then(() => {
    cy.wait(500);
  });
});

defineStep("User navigates to user {string} {string}", (user, type) => {
  cy.get(userItemCard(user)).should("be.visible").click();
});

defineStep("{string} places are shown", (user) => {
  cy.get(placeNameInfo).should("have.length", 2);
  cy.get(placeNameInfo).eq(0).should("have.text", "TestPlace4");
  cy.get(placeNameInfo).eq(1).should("have.text", "TestPlace5");
});

defineStep("User unlikes place {string}", (placeNum) => {
  cy.get(unlikePlaceEl(placeNum)).should("be.visible").click();
  cy.get(likePlaceEl(placeNum)).should("be.visible");
});

defineStep("Place like count equals {string}", (num) => {
  cy.get(likeCount)
    .eq(0)
    .should("be.visible")
    .should("have.text", `${num} like`);
});

defineStep("Followers count equals {string}", (num) => {
  console.log(typeof num);
  cy.get(followCount)
    .should("be.visible")
    .invoke("text")
    .then((text) => {
      expect(text).to.include(`${num} follower`);
    });
});

defineStep("User creates new place", () => {
  cy.get(addPlaceButton).should("be.visible").click();
});

defineStep("{string} place form is shown", (name) => {
  cy.get(newPlaceForm).should("be.visible");
});

defineStep("User selects {string} in type select", (option) => {
  cy.get(selectType).select(option);
});

defineStep("User places list is shown", () => {
  cy.get(placeItemCard).should("be.visible");
  cy.url().should("include", "/places");
});

defineStep("Place {string} is visible {string}", (placeName, num) => {
  cy.get(placeNameInfo).eq(parseInt(num)).should("have.text", placeName);
});

defineStep(
  "User types {string} in {string} - shortcut",
  (text, elementName) => {
    cy.get(elementFinder(elementName))
      .invoke("val", textFinder(text))
      .trigger("change");
    cy.get(elementFinder(elementName)).type("a");
  }
);

defineStep("Modify buttons are {string}", (state) => {
  cy.get("a")
    .contains("EDIT")
    .should(state === "visible" ? "be.visible" : "not.be.visible");
  cy.get("button")
    .contains("DELETE")
    .should(state === "visible" ? "be.visible" : "not.be.visible");
});

defineStep("Map modal is {string}", (state) => {
  cy.get(mapModal).should(state ? "be.visible" : "not.be.visible");
});
