# E2E Testing with Cypress

## Running Tests

### Using Environment Variables

You can run the tests with your GitHub credentials using the following command:

```bash
npx cypress open --env USERNAME=your-github-username,PASSWORD=your-github-password
```

### Using cypress.env.json

Alternatively, you can create a `cypress.env.json` file in the project root with your GitHub credentials.

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
```

The Cypress config automatically loads `.env` files and merges those values with anything from `cypress.env.json` or CLI `--env` flags. When any required variable is missing you will see a warning before the run starts.
