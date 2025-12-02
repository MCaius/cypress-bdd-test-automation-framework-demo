// Step definitions focused on login behaviours.
// Uses the LoginPage POM and cy.loginAs() command for reusable flows.

const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const LoginPage = require("../../../pages/LoginPage");
const InventoryPage = require("../../../pages/InventoryPage");

const loginPage = new LoginPage();
const inventoryPage = new InventoryPage();

Given("I am on the SauceDemo login page", () => {
  loginPage.visit();
});

When("I login with user type {string}", (userKey) => {
  // Centralised login command that reads credentials from Cypress.env("users")
  cy.loginAs(userKey);
});

When(
  "I login with username {string} and password {string}",
  (username, password) => {
    const loginPage = new LoginPage();
    loginPage.visit();
    loginPage.login(username, password);
  }
);


Then("I should land on the inventory page", () => {
  inventoryPage.assertOnPage();
});

Then("I should see an error message containing {string}", (messageFragment) => {
  loginPage.assertErrorMessageContains(messageFragment);
});
