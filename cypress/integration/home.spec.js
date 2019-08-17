/// <reference types="Cypress" />

context("Home", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should be rendered", () => {
    expect(cy.contains("ENVISION")).to.exist;
    expect(cy.contains("Good")).to.exist;
    expect(cy.contains("Bad")).to.exist;
  });
});
