# Focused feature for cart and shopping related flows.
Feature: SauceDemo cart and shopping journey

  Background:
    Given I am on the SauceDemo login page
    And I login with user type "standard_user"
    And I should land on the inventory page

  @smoke
  Scenario: Standard user can add a default product to cart
    When I add the default product to the cart
    Then I should see the cart badge showing "1"
    When I open the cart
    Then I should see the default product listed in the cart

  @known_fail
  Scenario: Intentional failing badge check for demo purposes
    When I add the second product to the cart
    # This will fail on purpose because only one item is added.
    Then I should see the cart badge showing "2"
