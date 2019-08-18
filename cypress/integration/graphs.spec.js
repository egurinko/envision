/// <reference types="Cypress" />

context("Graphs", () => {
  beforeEach(() => {
    cy.visit("/graphs");
  });

  it("should be rendered", () => {
    // expect(cy.contains("CO2")).to.exist;
  });
});
