/// <reference types="Cypress" />

describe("Reputation", () => {
  beforeEach(() => {
    cy.server();
    cy.route("POST", "/api/auth/login").as("login");
    cy.route("POST", "/api/training-data").as("postTrainningData");

    cy.login();
  });

  it("icons should be rendered", () => {
    expect(cy.get("[data-cy=mood]")).to.exist;
    expect(cy.get("[data-cy=mood_bad]")).to.exist;
  });

  it("reputation button should work", () => {
    cy.get("[data-cy=mood]").click();
    cy.wait("@postTrainningData").then(res =>{
      expect(res.status).eq(200);
    });

    cy.get("[data-cy=mood_bad]").click();
    cy.wait("@postTrainningData").then(res =>{
      expect(res.status).eq(200);
    });
  });
});
