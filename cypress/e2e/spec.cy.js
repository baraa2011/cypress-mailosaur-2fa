describe('GitHub Login Test', () => {
  // Generate a unique test email using Mailosaur
  const serverId = 'jkda8qa1'; // Replace with your Mailosaur server ID
  const email = `test.${Cypress._.random(0, 1000)}@${serverId}.mailosaur.net`;
  
  it('should login using GitHub', () => {
    // Visit the login page
    cy.visit('https://plan-execute-deliver.com');
    
    // Click on GitHub login
    cy.get('h1').contains('Login with GitHub').click();
    
    // Example of how to use the generated email in a form (update selectors as needed)
    // cy.get('input[type="email"]').type(email);
    // cy.get('button[type="submit"]').click();
    
    // You can also log the email for reference
    cy.log(`Using test email: ${email}`);
  });
});