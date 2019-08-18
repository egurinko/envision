/// <reference types="Cypress" />

context("Graphs", () => {
  beforeEach(() => {
    cy.exec("yarn seed");
    cy.visit("/graphs");
  });

  it("should be rendered", () => {
    // expect(cy.contains("CO2")).to.exist;
  });
});
