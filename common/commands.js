// Commands shared across multiple package tests
const semver = require("semver");
const gluonVersion = Cypress.env("gluon_version") ?? "0.5.4";

// Log to the artifact and the cypress console
// This task is defined in the cypress.config.js file
Cypress.Commands.overwrite("log", function(log, ...args) {
  if (semver.gte(gluonVersion, "0.5.7")) {
    return cy.task("log", args).then(() => {
      return log(...args);
    });
  } else {
    return log(...args);
  }
});

// Clear all session related data
// Example: cy.clearAllUserData()
Cypress.Commands.add('clearAllUserData', () => {
  cy.clearCookies();
  cy.clearLocalStorage();
  cy.window().then((win) => {
    win.sessionStorage.clear();
  })
})

// Keycloak Login
// Example: cy.performKeycloakLogin(Cypress.env('username'), Cypress.env('password'))
Cypress.Commands.add('performKeycloakLogin', (username, password) => {
  cy.get('input[id="username"]').type(username)
  cy.get('input[id="password"]').type(password)
  cy.get('input[id="kc-login"]').click()
  cy.get('input[id="kc-accept"]').click()
  cy.get('input[id="kc-login"]').click()
})

// Grafana Login
// Example: cy.performGrafanaLogin(Cypress.env('username'), Cypress.env('password'))
Cypress.Commands.add('performGrafanaLogin', (username, password) => {
  cy.get('input[name="user"]').type(username)
  cy.get('input[name="password"]').type(password)
  cy.contains("Log in").click()
  cy.get('.page-dashboard').contains('Welcome', {timeout: 30000})
})

// Gitlab Login
// Example: cy.performGitlabLogin(Cypress.env('username'), Cypress.env('password'))
Cypress.Commands.add('performGitlabLogin', (username, password) => {
  cy.get('input[id="user_login"]').type(username)
  cy.get('input[id="user_password"]').type(password)
  cy.get('button[data-testid="sign-in-button"]').click()
})

// Create Gitlab Project
// Example: cy.createGitlabProject(Cypress.env('url'), Cypress.env('gitlab_project'))
Cypress.Commands.add('createGitlabProject', (url, projectName) => {
  cy.visit(`${url}/projects/new`)
  cy.get('a[data-qa-panel-name="blank_project"]').click()
  cy.get('input[id="project_name"]').first().type(projectName)

  //If namespace is not automatically filled in, wait for population and then select first item in list
  cy.get('body').then($body => { 
    if ($body.find('button[type="button"]:contains("Pick a group or namespace")').length) {
      cy.intercept('POST', '**/graphql').as('listCall')
      cy.contains('button[type="button"]', 'Pick a group or namespace').click()
      cy.wait('@listCall').then((interception) => {
        expect(interception.response.statusCode).to.equal(200)
      })
      cy.get('li[tabindex=-1]').click()
    }
  })

  cy.get('input[id="project_visibility_level_20"]').first().click({force: true})
  cy.get('button[type="submit"]').first().click()        
})

// Delete Gitlab Project
// Example: cy.deleteGitlabProject(Cypress.env('url'), Cypress.env('gitlab_username'), Cypress.env('gitlab_project'))
Cypress.Commands.add('deleteGitlabProject', (url, username, projectName) => {
  cy.visit(`${url}/${username}/${projectName}/edit`)
  cy.get('section[data-testid="advanced-settings-content"]').contains('span', 'Expand').click()
  cy.get('button[data-testid="delete-button"]').click()
  cy.get('input[data-testid="confirm-name-field"]').type(`${username}/${projectName}`)
  cy.get('button[data-testid="confirm-delete-button"]').click()
})

// Validate Prometheus Target
// Example: cy.validatePromTarget("cluster-auditor\/opa-exporter\/0", "(1/1 up)")
// Example: cy.validatePromTarget("cluster-auditor\/opa-exporter\/0", /\(([0-9]+)\/\1 up\)/)
Cypress.Commands.add('validatePromTarget', (monitorText, match) => {
  cy.get(`button:contains("${monitorText}")`)
    .click({force: true})
  cy.get(`a[href*="${monitorText}"]`)
    .should('be.visible')
    .contains(match)
})

// Load Grafana Dashboard
// Example: cy.loadGrafanaDashboard("OPA Violations")
Cypress.Commands.add('loadGrafanaDashboard', (dashboardName) => {
  cy.intercept('POST', '**/query*').as('apiQuery')
  cy.get('input[placeholder="Search for dashboards and folders"]').type(dashboardName)
  cy.get(`a[title="${dashboardName}"]`).click()
  cy.wait('@apiQuery', {timeout: 30000}).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
  })
  cy.get('title').contains(dashboardName)
})

// Minio Login
// Example: cy.performMinioLogin(Cypress.env('username'), Cypress.env('password'))
Cypress.Commands.add('performMinioLogin', (username, password) => {
  cy.get('input[id="accessKey"]').type(username)
  cy.get('input[id="secretKey"]').type(password)
  cy.contains("Login").click()
})
