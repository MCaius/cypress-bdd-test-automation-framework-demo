# Cypress BDD Demo: SauceDemo UI + API Automation

Clean, modern Cypress (v10+) BDD framework in JavaScript that exercises SauceDemo’s UI and a public JSONPlaceholder API. Uses Cucumber/Gherkin, Page Object Model, custom commands, and Mochawesome HTML reporting. A screen recording (placeholder below) walks through local execution and opening the Mochawesome report in a browser.  

Recording: _[placeholder link – add video]_

## Highlights for recruiters
- Full UI + API automated testing framework with scalable structure and clear separation of concerns.
- BDD with Cucumber/Gherkin plus Page Object Model for readable, maintainable scenarios.
- Custom Cypress commands and a reusable API client abstraction to centralize behaviors.
- Data-driven testing via Scenario Outlines; tag-based suites for smoke/negative/known_fail selection.
- Clean project layout that can expand easily; secrets handled correctly (see `.env` note).

## Note on `.env`
In real production work, `.env` must never be committed. For this demo, keeping `.env` visible lets reviewers run tests immediately without extra setup.

## Technical Overview
- Project layout:  
  - `cypress/e2e/ui` — UI features (e.g., `login.feature`) and Gherkin scenarios.  
  - `cypress/e2e/api` — API features (e.g., `jsonplaceholder.feature`).  
  - `cypress/e2e/step_definitions` — Step definitions, organized by domain (UI/API).  
  - `cypress/pages` — Page Objects (BasePage, LoginPage, InventoryPage, CartPage) encapsulating locators and actions.  
  - `cypress/support` — Custom commands (`commands.js`), API client (`apiClient.js`), and global hooks (`e2e.js`).  
  - `cypress/fixtures` — Test data such as user credentials.  
  - `cypress/reports` — Mochawesome HTML with embedded screenshots and videos.
- Page Objects: BasePage (shared behaviors), LoginPage (auth flows), InventoryPage (catalog/cart entry), CartPage (cart assertions).
- API client: `cypress/support/apiClient.js` wraps `cy.request` for GET/POST; extend with headers/auth as needed.
- Tags: Use Cucumber tags (`@smoke`, `@negative`, `@known_fail`) to slice suites; run with `--env tags='@smoke'` or exclude with `--env tags='not @known_fail'`.

## Running the Tests
```bash
npm install
npx cypress open
npx cypress run
npx cypress run --spec "cypress/e2e/ui/login.feature"
npx cypress run --env tags='@smoke'
npx cypress run --env tags='not @known_fail'
```
Mochawesome reports generate automatically under `cypress/reports` with embedded screenshots and videos.

## CI-style local execution + auto-open latest HTML report
```bash
npm run test:ci        # Runs the entire suite headless (Chrome)
npm run report:open    # Opens the most recent Mochawesome HTML report in Chrome
```

## CI/CD Integration Example (GitHub Actions)
```yaml
name: CI
on: [push, pull_request]
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
      - run: npm ci
      - run: npx cypress run
      - name: Upload Mochawesome report
        uses: actions/upload-artifact@v4
        with:
          name: mochawesome-report
          path: cypress/reports
```

## Technology Stack
- Cypress (JavaScript)
- Cucumber / Gherkin
- ESBuild preprocessor
- Mochawesome reporting
- dotenv
- Node.js
