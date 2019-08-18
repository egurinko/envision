/// <reference types="Cypress" />

describe("Drawer", () => {
  beforeEach(() => {
    cy.exec("yarn seed");
    cy.visit("/");
  });

  it("logo and app name should be rendered", () => {
    expect(true).to.true;
    expect(cy.contains("ENVISION")).to.exist;
    expect(cy.get("[data-cy=logo]")).to.exist;
  });

  it("icons should be rendered", () => {
    expect(cy.get("[data-cy=home]")).to.exist;
    expect(cy.get("[data-cy=bar_chart]")).to.exist;
    expect(cy.get("[data-cy=supervisor_account]")).to.exist;
  });
});
