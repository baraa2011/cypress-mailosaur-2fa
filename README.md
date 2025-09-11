# E2E Testing with Cypress

## Running Tests

### Using Environment Variables

You can run the tests with your GitHub credentials using the following command:

```bash
npx cypress open --env USERNAME=your-github-username,PASSWORD=your-github-password
```

### Using cypress.env.json

Alternatively, you can create a `cypress.env.json` file in the project root:

```json
{
  "USERNAME": "your-github-email@example.com",
  "PASSWORD": "your-github-password"
}
```
Then run:
```bash
npx cypress open
```

**Note:** The `cypress.env.json` file is already in `.gitignore` for security reasons.
