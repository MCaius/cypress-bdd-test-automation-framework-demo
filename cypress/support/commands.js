// Custom Cypress commands collected here to keep step definitions tidy.
// Add more helpers for API auth tokens, data seeding, or composite user actions as needed.

const LoginPage = require("../pages/LoginPage");

// Users are now provided via Cypress env (fed from .env through cypress.config.js).
const users = Cypress.env("users");

Cypress.Commands.add("loginAs", (userKey = "standard_user") => {
  const loginPage = new LoginPage();
  const creds = users[userKey];

  if (!creds) {
    throw new Error(`No credentials configured for user key: ${userKey}`);
  }

  loginPage.visit();
  loginPage.login(creds.username, creds.password);
});
