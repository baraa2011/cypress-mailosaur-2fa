# E2E Testing with Cypress

## Running Tests

### Using Environment Variables

You can run the tests with your GitHub credentials using the following command:

```bash
npx cypress open --env USERNAME=your-github-username,PASSWORD=your-github-password
```

### Using cypress.env.json

Alternatively, you can create a `cypress.env.json` file in the project root with your environment variables (e.g., for GitHub credentials and Mailosaur settings).

Then run:
```bash
npx cypress open --browser chrome
npx cypress open
```

**Note:** The `cypress.env.json` file is already in `.gitignore` for security reasons.

### Using a `.env` File

If you prefer keeping credentials in a `.env` file, create one at the project root:

```
USERNAME=your-github-username
PASSWORD=your-github-password
CYPRESS_MAILOSAUR_SERVER=your-mailosaur-server-id
CYPRESS_MAILOSAUR_EMAIL=optional-email@server.mailosaur.net
CYPRESS_MAILOSAUR_PHONE_NUMBER=+10000000000
CYPRESS_MAILOSAUR_API_KEY=your-api-key
```

The Cypress config automatically loads `.env` files and merges those values with anything from `cypress.env.json` or CLI `--env` flags. When any required variable is missing you will see a warning before the run starts.

## Mailosaur Setup

1. Install the package:
   ```bash
   npm install -D cypress-mailosaur
   ```

2. Add the import to `cypress/support/e2e.js`:
   ```javascript
   import 'cypress-mailosaur';
   ```

3. Set environment variables:
   ```bash
   export CYPRESS_MAILOSAUR_API_KEY=your-api-key
   export CYPRESS_MAILOSAUR_SERVER=server-id
   ```
   Or add to `cypress.env.json`.
