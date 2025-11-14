describe('GitHub Login Test', () => {
  it('should navigate to GitHub login', () => {
    cy.visit('https://plan-execute-deliver.com');
    cy.get('h1').contains('Login with GitHub').click();
  });
});
