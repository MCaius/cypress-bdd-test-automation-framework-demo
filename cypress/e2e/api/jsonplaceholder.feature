Feature: Demo API health
  As an API consumer
  I want to validate the demo JSONPlaceholder API
  So that I know the basic endpoints work as expected

  Scenario: Fetch list of posts
    When I send a GET request to "/posts"
    Then the response status should be 200
    And the response body should have at least 1 item

  Scenario: Create a post via POST
    When I send a POST request to "/posts" with body:
      | title  | foo      |
      | body   | bar text |
      | userId | 1        |
    Then the response status should be 201
    And the response should contain the property "title" with value "foo"

  Scenario: Requesting an unknown resource returns 404
    When I send a GET request to "/posts/0"
    Then the response status should be 404

Scenario Outline: Fetch single post returns correct status
  When I send a GET request to "/posts/<id>"
  Then the response status should be <status>

  Examples:
    | id | status |
    | 1  | 200    |
    | 0  | 404    |
