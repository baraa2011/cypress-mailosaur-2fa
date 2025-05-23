describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://plan-execute-deliver.com')
    cy.get("h1").contains("Login with GitHub").click()
  })
})