describe("Cypress", () => {
  it("waits 10 seconds for network policies to be in effect", () => {
    cy.wait(10000);
  });

  it("visits the cypress example page", () => {
    cy.visit("https://example.cypress.io");
  });
});
