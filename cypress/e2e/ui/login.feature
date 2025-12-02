# Focused feature for login behaviours only.
Feature: SauceDemo login

  Background:
    Given I am on the SauceDemo login page

  @smoke
  Scenario: Standard user can login successfully
    When I login with user type "standard_user"
    Then I should land on the inventory page

  @negative
  Scenario: Locked out user sees a helpful error
    When I login with user type "locked_out_user"
    Then I should see an error message containing "locked out"

@negative
Scenario Outline: Invalid login shows an error
  When I login with username "<username>" and password "<password>"
  Then I should see an error message containing "<message>"

  Examples:
    | username       | password      | message                  |
    | standard_user  | wrong_pass    | Username and password    |
    | locked_out_user| secret_sauce  | Sorry, this user has been|


