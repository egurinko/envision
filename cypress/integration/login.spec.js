/// <reference types="Cypress" />

describe("Login", () => {
  const username = Cypress.env("username");
  const password = Cypress.env("password");

  beforeEach(() => {
    cy.visit("/login");

    cy.server();
    cy.route("POST", "/api/auth/login").as("login");
  });

  it("icons should be rendered", () => {
    cy.get("[data-cy=username]").type(username);
    cy.get("[data-cy=password]").type(password);
    cy.get("[data-cy=login-button]").click();

    cy.wait("@login").then(res =>{
      expect(res.status).eq(200);
    });
  });
});
