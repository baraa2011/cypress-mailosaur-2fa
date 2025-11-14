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
    const mailosaurServer = Cypress.env('CYPRESS_MAILOSAUR_SERVER');
    const mailosaurEmail = Cypress.env('CYPRESS_MAILOSAUR_EMAIL');
    const mailosaurPhoneNumber = Cypress.env('CYPRESS_MAILOSAUR_PHONE_NUMBER');

    // Debug: Log the credentials being used (password is hidden for security)
    cy.log(`Using GitHub username: ${username}`);
    cy.log(`Using Mailosaur server: ${mailosaurServer}`);
    if (mailosaurEmail) {
        cy.log(`Using Mailosaur email: ${mailosaurEmail}`);
    }
    if (mailosaurPhoneNumber) {
        cy.log(`Using Mailosaur phone number: ${mailosaurPhoneNumber}`);
    }

    // Validate credentials
    if (!username || !password || !mailosaurServer) {
      throw new Error('GitHub username, password, or Mailosaur server is not set in cypress.env.json');
    }

    const willUseSms = Boolean(mailosaurPhoneNumber);
    const targetMailosaurEmail = mailosaurEmail || `anything@${mailosaurServer}.mailosaur.net`;
    const mailosaurRecipient = willUseSms ? mailosaurPhoneNumber : targetMailosaurEmail;
    
    cy.intercept('POST', '/api/auth/callback').as('authCallback');

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
    
    // Handle 2FA after GitHub login if prompted
    cy.origin('https://github.com', { args: { username, mailosaurServer, mailosaurRecipient, willUseSms } }, ({ username, mailosaurServer, mailosaurRecipient, willUseSms }) => {
        const fetchMailosaurMessage = (attempt = 1) => {
            const maxAttempts = 5;
            cy.log(`Waiting for 2FA ${willUseSms ? 'SMS' : 'email'} (attempt ${attempt}/${maxAttempts})`);

            const getter = willUseSms ? cy.getMailosaurSms : cy.getMailosaurMessage;
            const searchCriteria = { sentTo: mailosaurRecipient };
            return cy
                .wrap(null)
                .then(() => getter(mailosaurServer, searchCriteria, { timeout: 15000 }))
                .then(
                    (message) => message,
                    (error) => {
                        if (attempt >= maxAttempts) {
                            throw error;
                        }

                        cy.wait(3000);
                        return fetchMailosaurMessage(attempt + 1);
                    }
                );
        };

        cy.get('body').then(($body) => {
            const otpSelector = 'input[name="otp"], input[name="app_otp"]';
            if ($body.find(otpSelector).length > 0) { // Check for 2FA input field
                cy.log(`Fetching 2FA code from ${willUseSms ? 'SMS' : 'email'} sent to ${mailosaurRecipient}`);
                fetchMailosaurMessage().then((message) => {
                    const code = willUseSms
                        ? cy.extract2FACodeFromSms(message)
                        : cy.extract2FACodeFromEmail(message);
                    cy.get(otpSelector).type(code);
                    cy.get('button[type="submit"]').click();
                });
            }
        });
    });
    
    // Verify successful redirect back to app
    cy.wait('@authCallback').then(({ response }) => {
        const token = response?.body?.token;
        expect(token, 'auth token present').to.exist;
        cy.wrap(token).as('authToken');
    });

    cy.url().should('include', 'plan-execute-deliver.com');
    cy.get('body').should('exist');
});
