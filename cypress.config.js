const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
baseUrl: 'https://plan-execute-deliver.com', // The base URL for your tests
experimentalOriginDependencies: true,
    defaultCommandTimeout: 10000,
    experimentalSessionAndOrigin: true,
    screenshotOnRunFailure: true, // Enables screenshots on test failure
    video: true, // Enables video recording of test runs
   specPattern: 'cypress/e2e/**/*.{js,cy.js}', // Path to where your test files are located
    setupNodeEvents(on, config) {
on('before:run', () => {
        console.log('Cypress tests are starting...');
      });
      // implement node event listeners here
    },
  },
});




