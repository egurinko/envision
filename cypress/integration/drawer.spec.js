/// <reference types="Cypress" />

describe("Drawer", () => {
  beforeEach(() => {
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

  it("icons should enable users to go target routes", () => {
    cy.get("[data-cy=bar_chart]").click();
    cy.url().should("include", "/graphs");

    cy.get("[data-cy=supervisor_account]").click();
    cy.url().should("include", "/users");

    cy.get("[data-cy=home]").click();
    cy.url().should("include", "/");
  });
});
