// Global Cypress support file.
// - Registers custom commands and reporters.
// - A friendly place to add before/after hooks or shared configuration.
import "./commands";
import "cypress-mochawesome-reporter/register";

before(() => {
  // Light touch hook to log test startup; keeps demo output readable.
  cy.log("Bootstrapping Cypress BDD demo suite...");
});
