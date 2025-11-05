// Custom Mailosaur commands for Cypress
// This file extends Cypress with Mailosaur-specific commands for 2FA testing

// Command to get the latest email message
Cypress.Commands.add('getMailosaurMessage', (serverId, criteria = {}, requestOptions = {}) => {
  return cy.mailosaurGetMessage(serverId, criteria, requestOptions);
});

// Command to get the latest SMS message (Mailosaur treats SMS as messages too)
Cypress.Commands.add('getMailosaurSms', (serverId, recipient = {}, requestOptions = {}) => {
  const searchCriteria = typeof recipient === 'string' ? { sentTo: recipient } : recipient;
  return cy.mailosaurGetMessage(serverId, searchCriteria, requestOptions);
});

// Command to extract 2FA code from email body (assumes 6-digit code)
Cypress.Commands.add('extract2FACodeFromEmail', (email) => {
  const codeMatch = email.text.body.match(/\b\d{6}\b/); // Adjust regex for your code format
  if (!codeMatch) {
    throw new Error('2FA code not found in email body');
  }
  return codeMatch[0];
});

// Command to extract 2FA code from SMS body
Cypress.Commands.add('extract2FACodeFromSms', (sms) => {
  const codeMatch = sms.text.body.match(/\b\d{6}\b/); // Adjust regex for your code format
  if (!codeMatch) {
    throw new Error('2FA code not found in SMS body');
  }
  return codeMatch[0];
});

// Example usage in tests:
// cy.getMailosaurMessage('your-server-id', { sentTo: 'test@example.mailosaur.net' }).then((email) => {
//   const code = cy.extract2FACodeFromEmail(email);
//   cy.get('#2fa-input').type(code);
// });

// cy.getMailosaurSms('your-server-id', { phoneNumber: 'your-phone-number' }).then((sms) => {
//   const code = cy.extract2FACodeFromSms(sms);
//   cy.get('#sms-input').type(code);
// });
