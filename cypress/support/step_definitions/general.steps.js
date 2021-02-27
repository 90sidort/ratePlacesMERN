import { defineStep } from "cypress-cucumber-preprocessor/steps";

import { elementFinder } from "../utils/element.utils";
import { textFinder } from "../utils/text.utils";
import { urlFinder } from "../utils/url.utils";

defineStep("User opens app", () => {
  cy.intercept("GET", "**//api/users/").as("getUsers");
  cy.visit("/");
  cy.wait("@getUsers");
});

defineStep("User clicks {string}", (elementName) => {
  cy.get(elementFinder(elementName), { timeout: 10000 }).click();
});

defineStep("{string} page is displayed", (urlName) => {
  cy.url().should("include", urlFinder(urlName));
});

defineStep("User types {string} in {string}", (text, elementName) => {
  cy.get(elementFinder(elementName), { timeout: 10000 }).type(textFinder(text));
});

defineStep("{string} is {string}", (elementName, state) => {
  state = state === "enabled" ? "not.have.attr" : "have.attr";
  cy.get(elementFinder(elementName)).should(state, "disabled");
});

defineStep("User defocuses last field", () => {
  cy.get('div[class="image-upload center"]').click();
});

defineStep("{string} form error is shown", (errorElement) => {
  cy.get(`p[data-test="error_${errorElement}"]`).should("be.visible");
});
