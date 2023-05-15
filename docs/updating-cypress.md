# From Cypress 9 to 12
See https://docs.cypress.io/guides/references/migration-guide

The major change between Cypress 9 and 12 is the new [directory structure](./bb-tests#directory-structure). 

The highlights are: 
* Spec files are now located in `chart/tests/cypress/e2e/` with the pattern `*.cy.ts`
* The configuration file changed from `cypress.json` to `cypress.config.ts`
* We are strongly encouraging use of Typescript so there are three additional files (`package-lock.json`, `package.json`, `tsconfig.json`)

## To migrate:
```bash
# from a `chart/tests` directory
mkdir -p cypress/e2e

# move tests
mv my-health.spec.js cypress/e2e/my-health.cy.ts
mv my-other-health.spec.js cypress/e2e/my-other-health.cy.ts

# install dependencies
npm install typescript cypress

# ignore node_modules 
echo node_modules > .gitignore

touch cypress.config.ts
touch tsconfig.ts
```

For the `cypress.config.ts` you can use this as a starting point: 

```typescript
import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    env: {
      url: "https://some.bigbang.dev"
    },
    supportFile: false,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```

Likewise for the `tsconfig.json`
```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": ["es5", "dom"],
    "types": ["cypress", "node"],
    "baseUrl": "./",
  },
  "include": ["**/*.ts"]
}
```

To test you can run `npx cypress run --browser chrome --headless` or run interactively with `npx cypress open` 

## Other noteworthy changes
* Introduction of `cy.session` to manage sessions as opposed to manipulating cookies. In cases where logins helpers exist we should  rewrite to leverage `cy.session`

