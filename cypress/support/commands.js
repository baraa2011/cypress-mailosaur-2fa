// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("loginSession", (username, password) => {
    cy.session([username, password], () => {
        cy.visit('https://plan-execute-deliver.com');

        cy.get('a').contains('Login with GitHub').click();

        cy.origin('https://github.com', { args: { username, password } }, ({ username, password }) => {
            cy.get('#login_field').should('be.visible').type(username);
            cy.get('#password').type(password, { log: false });
            cy.get("input[type='submit']").click();
        });

        cy.url().should('include', 'plan-execute-deliver.com');
    });
});