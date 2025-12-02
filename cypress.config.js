// Cypress configuration entry point.
// - Wires up the Cucumber preprocessor with esbuild bundling so .feature files can run.
// - Enables Mochawesome HTML reporting with screenshots and videos for easy portfolio demos.
// - Sets sensible defaults (baseUrl, spec pattern) and keeps everything in plain JavaScript.

require("dotenv").config(); // <<< load .env first

const { defineConfig } = require("cypress");
const createBundler = require("@bahmutov/cypress-esbuild-preprocessor");
const { addCucumberPreprocessorPlugin } = require("@badeball/cypress-cucumber-preprocessor");
// The esbuild helper is exposed as a named export; pull createEsbuildPlugin to avoid undefined errors.
const { createEsbuildPlugin } = require("@badeball/cypress-cucumber-preprocessor/esbuild");

module.exports = defineConfig({
  video: true,
  screenshotOnRunFailure: true,
  reporter: "cypress-mochawesome-reporter",
  reporterOptions: {
    reportDir: "cypress/reports",
    charts: true,
    embeddedScreenshots: true,
    inlineAssets: true,
    overwrite: false,
    reportFilename: "[status]-[datetime]-report"
  },
  e2e: {
    baseUrl: "https://www.saucedemo.com",
    specPattern: "cypress/e2e/**/*.feature",
    supportFile: "cypress/support/e2e.js",
    async setupNodeEvents(on, config) {
      // Attach the Cucumber preprocessor so .feature files are recognized.
      await addCucumberPreprocessorPlugin(on, config);

      // Use esbuild to bundle step definitions quickly during test runs.
      on(
        "file:preprocessor",
        createBundler({
          plugins: [createEsbuildPlugin(config)]
        })
      );

      // Hook in Mochawesome to capture screenshots and embed them in the HTML report.
      require("cypress-mochawesome-reporter/plugin")(on);

      return config;
    }
  },
  env: {
    apiBaseUrl: "https://jsonplaceholder.typicode.com",
    // Point cucumber to our shared step definitions folder so it can bind steps to feature files.
    stepDefinitions: "cypress/e2e/step_definitions/**/*.{js,ts}",

    // Users loaded from .env for demo purposes (would normally stay out of git).
    users: {
      standard_user: {
        username: process.env.SAUCE_STANDARD_USER,
        password: process.env.SAUCE_STANDARD_PASS
      },
      locked_out_user: {
        username: process.env.SAUCE_LOCKED_USER,
        password: process.env.SAUCE_LOCKED_PASS
      }
    }
  }
});
