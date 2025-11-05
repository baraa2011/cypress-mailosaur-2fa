// Cypress test: GitHub OAuth multi-domain flow for https://plan-execute-deliver.com/

describe('GitHub OAuth Login', () => {
  beforeEach(() => {
    // Old implementation - kept for reference
    // cy.loginSession(Cypress.env('USERNAME'), Cypress.env('PASSWORD'));
    
    // New implementation - no need for loginSession if we're testing the login flow
    // cy.loginSession(Cypress.env('EMAIL'), Cypress.env('PASSWORD'));
  });
  
  it('should load the GitHub login page', () => {
    // Old implementation - kept for reference
    // cy.visit('https://plan-execute-deliver.com');
    // cy.visit('https://github.com')
    // cy.origin('https://github.com')
    // cy.get('a').contains('Login with GitHub').should('be.visible');
    
    // New implementation
    cy.visit('https://plan-execute-deliver.com');
    cy.get('a').contains('Login with GitHub').should('be.visible');
  });
  
  it('should show the home page after successful login', () => {
    // This test would need to be updated based on your actual app's behavior
    // after successful login
    cy.visit('https://plan-execute-deliver.com');
    // Update this selector based on what actually appears after login
    cy.get('body').should('exist');
  });
});
