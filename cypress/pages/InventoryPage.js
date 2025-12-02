// Page Object: captures the inventory (product list) behaviors.
// Encapsulates common product interactions and cart entry points.

const BasePage = require("./BasePage");

class InventoryPage extends BasePage {
  constructor() {
    super();

    this.selectors = {
      inventoryContainer: ".inventory_container",
      inventoryItem: ".inventory_item",
      cartLink: ".shopping_cart_link",
      cartBadge: ".shopping_cart_badge"
    };
  }

  /**
   * Guard assertion that we're on the inventory page.
   * Useful before performing actions that assume this context.
   */
  assertOnPage() {
    this.assertUrlContains("/inventory.html");
    cy.get(this.selectors.inventoryContainer).should("be.visible");
  }

  /**
   * Adds a product to the cart by its visible name.
   */
  addItemToCart(productName) {
    cy.contains(this.selectors.inventoryItem, productName)
      .should("be.visible")
      .within(() => {
        cy.contains("button", "Add to cart").click();
      });
  }

  /**
   * Opens the cart via the header link.
   */
  openCart() {
    cy.get(this.selectors.cartLink).click();
  }

  /**
   * Returns the shopping cart badge element for further assertions.
   */
  cartBadge() {
    return cy.get(this.selectors.cartBadge);
  }

  /**
   * Optional helper if later you want to assert item count at page level.
   */
  assertCartBadgeCount(expectedCount) {
    this.cartBadge().should("have.text", String(expectedCount));
  }
}

module.exports = InventoryPage;
