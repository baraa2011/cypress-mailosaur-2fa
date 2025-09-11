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
    // Visit the website
    cy.visit('https://plan-execute-deliver.com');
    
    // Click the GitHub login button
    cy.get('a').contains('Login with GitHub').click();
    
    // Handle the GitHub login page
    cy.origin('https://github.com', { args: { username, password } }, ({ username, password }) => {
        // Type username and password
        cy.get('username').type(username);
        cy.get("password").type(password);
        
        // Click the sign in button
        cy.get("input[type='submit']").click();
    }
    );
    
    // Verify we're back on the main site after login
    cy.get('a').should('contain', 'Login with GitHub');
});
});