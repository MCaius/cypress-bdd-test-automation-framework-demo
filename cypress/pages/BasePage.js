// BasePage: shared helpers for all page objects.
// Keeps low-level Cypress calls in one place so individual pages stay focused
// on business-level actions and assertions.

class BasePage {
  /**
   * Navigate to a given path. Defaults to the app root.
   * @param {string} path e.g. "/", "/inventory.html"
   */
  visit(path = "/") {
    cy.visit(path);
  }

  /**
   * Convenience wrapper around a basic URL assertion.
   */
  assertUrlContains(fragment) {
    cy.url().should("include", fragment);
  }

  /**
   * Get an element by data-test attribute.
   * Encouraged selector strategy for long-term stability.
   */
  getByDataTest(id) {
    return cy.get(`[data-test="${id}"]`);
  }

  /**
   * Click an element by data-test attribute.
   */
  clickByDataTest(id) {
    return this.getByDataTest(id).click();
  }

  /**
   * Clear and type into an input by data-test attribute.
   */
  typeByDataTest(id, value, options = {}) {
    return this.getByDataTest(id).clear().type(value, options);
  }
}

module.exports = BasePage;
