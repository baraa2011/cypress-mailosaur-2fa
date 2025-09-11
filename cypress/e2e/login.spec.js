it('login with GitHub', () => {
    // Old implementation - kept for reference
    // cy.visit('https://plan-execute-deliver.com')
    // cy.get('a').contains('Login with GitHub').click();
    // cy.origin('https://github.com', () => {
    //     cy.get('input[name="login"]').type(username);
    //     cy.get('input[name="password"]').type(password, { log: false });
    //     cy.get('button[type="submit"]').click();
    // });
    // cy.get('a').should('contain', 'Login with GitHub');

    // New implementation with environment variables
    const username = Cypress.env('USERNAME');
    const password = Cypress.env('PASSWORD');
    
    // Debug: Log the credentials being used (password is hidden for security)
    cy.log(`Using GitHub username: ${username}`);
    
    // Validate credentials
    if (!username || !password) {
      throw new Error('GitHub username or password is not set in cypress.env.json');
    }
    
    cy.visit('https://plan-execute-deliver.com');
    cy.get('a').contains('Login with GitHub').click();
    
    // Handle GitHub login
    cy.origin('https://github.com', { args: { username, password } }, ({ username, password }) => {
        // Fill GitHub login form with username
        cy.get('input[name="login"]').type(username);
        cy.get('input[name="password"]').type(password, { log: false });
        cy.get('input[type="submit"]').click();
        
        // Check for login errors
        cy.get('body').then(($body) => {
            if ($body.find('#js-flash-container .flash-error').length > 0) {
                cy.get('#js-flash-container .flash-error').invoke('text').then((errorText) => {
                    throw new Error(`GitHub login failed: ${errorText.trim()}`);
                });
            }
        });
    });
    
    // Verify successful redirect back to app
    cy.url().should('include', 'plan-execute-deliver.com');
    cy.get('body').should('exist');
});