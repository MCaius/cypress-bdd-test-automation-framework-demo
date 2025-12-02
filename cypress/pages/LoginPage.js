// Page Object: models the SauceDemo login screen so steps stay readable and reusable.
// Built on top of BasePage for consistent helpers and URL handling.

const BasePage = require("./BasePage");

class LoginPage extends BasePage {
  constructor() {
    super();

    // Central place for selectors used on this page.
    // If the UI changes, you update them here, not all over the tests.
    this.selectors = {
      usernameInput: "#user-name",
      passwordInput: "#password",
      loginButton: "#login-button",
      errorMessage: '[data-test="error"]'
    };
  }

  /**
   * Navigate directly to the login page.
   */
  visit() {
    super.visit("/"); // root is the login page in SauceDemo
  }

  fillUsername(username) {
    cy.get(this.selectors.usernameInput).clear().type(username);
  }

  fillPassword(password) {
    // log:false so we don't leak passwords into Cypress logs
    cy.get(this.selectors.passwordInput).clear().type(password, { log: false });
  }

  submit() {
    cy.get(this.selectors.loginButton).click();
  }

  /**
   * High-level login helper used by tests and custom commands.
   */
  login(username, password) {
    this.fillUsername(username);
    this.fillPassword(password);
    this.submit();
  }

  /**
   * Assert that an error banner contains a specific fragment.
   */
  assertErrorMessageContains(expectedText) {
    cy.get(this.selectors.errorMessage).should("contain.text", expectedText);
  }
}

module.exports = LoginPage;
