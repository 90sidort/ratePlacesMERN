/// <reference types="cypress" />
const cucumber = require("cypress-cucumber-preprocessor").default;
const seeder = require("cypress-mongo-seeder");

const mongouri = require("../../config");

const folder = "./cypress/fixtures";
const dropCollections = true;

/**
 * @type {Cypress.PluginConfig}
 */

module.exports = (on, config) => {
  on("task", {
    "seed:database": () => {
      return seeder.seedAll(mongouri, folder, dropCollections);
    },
  });
  on("file:preprocessor", cucumber());
};
