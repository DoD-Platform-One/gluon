# From Cypress 9 to 12
See https://docs.cypress.io/guides/references/migration-guide

The major change between Cypress 9 and 12 is the new [directory structure](https://repo1.dso.mil/big-bang/product/packages/gluon/-/blob/master/docs/bb-tests.md#directory-structure).

The highlights are: 
* Spec files are now located in the package repo in `chart/tests/cypress/e2e/` with the pattern `*.cy.js`
* The configuration file changed from `cypress.json` to `cypress.config.js`. It should be located in the `/chart/tests` folder. 
* We are strongly encouraging use of Typescript so there are three additional files: `package-lock.json`, `package.json`, and `tsconfig.json`. These should also be located in `/chart/tests`. 

## To migrate:
```bash
# from a `chart/tests` directory
mkdir -p cypress/e2e

# move tests
mv my-health.spec.js cypress/e2e/my-health.cy.js
mv my-other-health.spec.js cypress/e2e/my-other-health.cy.js

# install dependencies
npm install cypress

# ignore node_modules 
echo node_modules >> .gitignore

touch cypress.config.js
touch tsconfig.js
```

For the `cypress.config.js` you can use this as a starting point: 

```typescript
const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    env: {
      baseUrl: "https://keycloak.bigbang.dev"
    },
    video: true,
    screenshot: true,
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
```

To test you can run `npx cypress run --browser chrome --headless` or run interactively with `npx cypress open` 

## Other noteworthy changes
* Introduction of `cy.session` to manage sessions as opposed to manipulating cookies. In cases where logins helpers exist we should  rewrite to leverage `cy.session`

