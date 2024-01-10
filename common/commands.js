// Commands shared across multiple package tests

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

// Validate Prometheus Target
// Example: cy.validatePromTarge("cluster-auditor\/opa-exporter\/0", "(1/1 up)")
Cypress.Commands.add('validatePromTarget', (monitorText, textToMatch) => {
  cy.get(`button:contains("${monitorText}")`)
    .click({force: true})
  cy.get(`a[href*="${monitorText}"]`)
    .should('be.visible')
    .and('contain', textToMatch)
})

// Load Grafana Dashboard
// Example: cy.loadGrafanaDashboard("OPA Violations")
Cypress.Commands.add('loadGrafanaDashboard', (dashboardName) => {
  cy.intercept('POST', '**/query*').as('apiQuery')
  cy.get('[data-testid*="Dashboard search item ' + dashboardName + '"]')
    .click()
  cy.wait('@apiQuery', {timeout: 30000}).then((interception) => {
      expect(interception.response.statusCode).to.equal(200);
  })
  cy.get('title').contains(dashboardName)
})