const { defineConfig } = require('cypress');
const dotenv = require('dotenv');

dotenv.config();

const credentialKeys = ['USERNAME', 'PASSWORD'];

const resolvedCredentials = credentialKeys.reduce((acc, key) => {
  const value = process.env[key];
  if (value) {
    acc[key] = value;
  }

  return acc;
}, {});

const logMissingCredentials = (env) => {
  const missing = credentialKeys.filter((key) => !env[key]);
  if (missing.length) {
    console.warn(
      `[cypress-config] Missing required credentials: ${missing.join(
        ', '
      )}. Supply them via cypress.env.json, .env, or CYPRESS_* environment variables.`
    );
  }
};

module.exports = defineConfig({
  e2e: {
    baseUrl: 'https://plan-execute-deliver.com',
    experimentalOriginDependencies: true,
    defaultCommandTimeout: 10000,
    experimentalSessionAndOrigin: true,
    screenshotOnRunFailure: true,
    video: true,
    specPattern: 'cypress/e2e/**/*.{js,cy.js}',
    env: resolvedCredentials,
    setupNodeEvents(on, config) {
      on('before:run', () => {
        console.log('Cypress tests are starting...');
      });

      logMissingCredentials(config.env || {});

      return config;
    },
  },
});
