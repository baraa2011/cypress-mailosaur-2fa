describe('Login with GitHub', () => {
  beforeEach(() => {
    // Clear cookies and local storage before each test
    cy.clearCookies()
    cy.clearLocalStorage()
  })


  it('should log in via GitHub and redirect back to the app', () => {
    // Skip if GitHub credentials are not set
    const username = Cypress.env('GITHUB_USERNAME')
    const password = Cypress.env('GITHUB_PASSWORD')
    
    if (!username || !password) {
      cy.log('GitHub credentials not set. Skipping test.')
      return
    }

    // Step 1: Visit the application's login page
    cy.visit('https://plan-execute-deliver.com')
    
    // Step 2: Click the "Login with GitHub" button
    cy.contains('Login with GitHub').click()
    
    // Step 3: Handle GitHub login in the new origin
    cy.origin('https://github.com', { args: { username, password } }, ({ username, password }) => {
      // Verify we're on GitHub's login page
      cy.url().should('include', '/login')
      
      // Fill in GitHub credentials
      cy.get('input#login_field').should('be.visible').type(username)
      cy.get('input#password').should('be.visible').type(password, { log: false })
      
      // Click the sign in button
      cy.get('input[type="submit"]').click()
      
      // Handle GitHub's OAuth authorization if it appears
      cy.get('body').then(($body) => {
        if ($body.find('button[name="authorize"]').length > 0) {
          cy.get('button[name="authorize"]').click()
        }
      })
    })
    
    // Step 4: Verify we're back at the application
    cy.url().should('include', 'plan-execute-deliver.com')
    // Add more assertions here to verify successful login
  })
})