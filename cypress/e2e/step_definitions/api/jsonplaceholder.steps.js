// Step definitions for JSONPlaceholder API scenarios.
// Extend by adding new When/Then blocks for additional endpoints or behaviors.
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { ApiClient } from "../../../support/apiClient";

let latestResponse;

// Request steps
When("I send a GET request to {string}", (endpoint) => {
  ApiClient.get(endpoint).then((response) => {
    latestResponse = response;
  });
});

When("I send a POST request to {string} with body:", (endpoint, dataTable) => {
  const body = dataTable.rowsHash();

  ApiClient.post(endpoint, body).then((response) => {
    latestResponse = response;
  });
});

// Assertion steps
Then("the response status should be {int}", (statusCode) => {
  expect(latestResponse.status).to.eq(statusCode);
});

Then("the response body should have at least {int} item", (minimum) => {
  expect(Array.isArray(latestResponse.body)).to.be.true;
  expect(latestResponse.body.length).to.be.at.least(minimum);
});

Then("the response should contain the property {string} with value {string}", (property, value) => {
  expect(latestResponse.body).to.have.property(property, value);
});

