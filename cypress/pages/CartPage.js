// Page Object: minimal cart view assertions.
// Owns all selectors and common checks for the cart page.

const BasePage = require("./BasePage");

class CartPage extends BasePage {
  constructor() {
    super();

    this.selectors = {
      cartItemRow: ".cart_item",
      itemName: ".inventory_item_name",
      cartListContainer: ".cart_list"
    };
  }

  /**
   * Guard assertion that we're on the cart page.
   */
  assertOnPage() {
    this.assertUrlContains("/cart.html");
    cy.get(this.selectors.cartListContainer).should("be.visible");
  }

  /**
   * Assert that a specific product name is present in the cart.
   */
  assertItemInCart(productName) {
    cy.get(this.selectors.cartItemRow).should("exist");
    cy.contains(this.selectors.itemName, productName).should("be.visible");
  }

  /**
   * Optional helper for total items in cart.
   */
  assertNumberOfItems(expectedCount) {
    cy.get(this.selectors.cartItemRow).should("have.length", expectedCount);
  }
}

module.exports = CartPage;
