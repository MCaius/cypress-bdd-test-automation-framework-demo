// Central API client used by BDD steps.
// All low-level request details live here.

class ApiClient {
  static request(method, endpoint, { body, query, headers, failOnStatusCode = false } = {}) {
    return cy.request({
      method,
      url: `${Cypress.env("apiBaseUrl")}${endpoint}`,
      qs: query,
      body,
      headers: {
        "Content-Type": "application/json",
        ...headers
      },
      failOnStatusCode
    });
  }

  static get(endpoint, options = {}) {
    return this.request("GET", endpoint, options);
  }

  static post(endpoint, body, options = {}) {
    return this.request("POST", endpoint, { body, ...options });
  }

  // to add if needed:
  // static put, patch, delete etc.
}

module.exports = { ApiClient };
