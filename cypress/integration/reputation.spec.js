/// <reference types="Cypress" />

describe("Reputation", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("icons should be rendered", () => {
    expect(cy.get("[data-cy=mood]")).to.exist;
    expect(cy.get("[data-cy=mood_bad]")).to.exist;
  });
});
