// ***********************************************************
// This example support/e2e.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Ensure the Mailosaur plugin sees either MAILOSAUR_API_KEY or the Cypress-prefixed variant.
const resolvedMailosaurApiKey =
  Cypress.env('MAILOSAUR_API_KEY') || Cypress.env('CYPRESS_MAILOSAUR_API_KEY');
if (resolvedMailosaurApiKey && !Cypress.env('MAILOSAUR_API_KEY')) {
  Cypress.env('MAILOSAUR_API_KEY', resolvedMailosaurApiKey);
}

import 'cypress-mailosaur';
import './mailosaur';
