describe('Login with GitHub', () => {
    it('should log in via GitHub and redirect back to the app', () => {
      // Step 1: Visit the application's login page
      cy.visit('https://plan-execute-deliver.com');
  
      // Step 2: Click the "Login with GitHub" button
      cy.contains('Login with GitHub').click();
  
      // Step 3: Verify redirection to GitHub's login page
      cy.url().should('include', 'https://github.com/login');
  
      // Step 4: Fill in GitHub username and password
      cy.get('input[name="login"]').type(Cypress.env('GITHUB_USERNAME')); // Replace with your GitHub username
      cy.get('input[name="password"]').type(Cypress.env('GITHUB_PASSWORD'), { log: false }); // Replace with your GitHub password (hidden in logs)
  
      // Step 5: Submit the GitHub login form
      cy.get('input[name="commit"]').click();
  
      // Step 6: Verify redirection back to your application
      cy.url().should('include', '/dashboard'); // Adjust based on your app's post-login redirection URL
    });
  });