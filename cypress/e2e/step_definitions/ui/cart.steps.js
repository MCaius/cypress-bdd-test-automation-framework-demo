// Step definitions focused on cart and shopping-related behaviours.

const { Given, When, Then } = require("@badeball/cypress-cucumber-preprocessor");
const InventoryPage = require("../../../pages/InventoryPage");
const CartPage = require("../../../pages/CartPage");
const testData = require("../../../fixtures/testData.json");

const inventoryPage = new InventoryPage();
const cartPage = new CartPage();

// Reuse existing background steps:
// - "I am on the SauceDemo login page"
// - "I login with user type {string}"
// - "I should land on the inventory page"
// These are defined in login.steps.js and shared via Cucumber.

When("I add the default product to the cart", () => {
  inventoryPage.assertOnPage();
  inventoryPage.addItemToCart(testData.defaultProduct);
});

When("I add the second product to the cart", () => {
  inventoryPage.assertOnPage();
  inventoryPage.addItemToCart(testData.secondProduct);
});

Then("I should see the cart badge showing {string}", (expectedCount) => {
  inventoryPage.cartBadge().should("have.text", expectedCount);
});

When("I open the cart", () => {
  inventoryPage.openCart();
});

Then("I should see the default product listed in the cart", () => {
  cartPage.assertOnPage();
  cartPage.assertItemInCart(testData.defaultProduct);
});
