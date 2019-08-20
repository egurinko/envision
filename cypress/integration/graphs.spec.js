/// <reference types="Cypress" />

describe("Graphs", () => {
  beforeEach(() => {
    cy.server();
    cy.route("GET", "/api/envs").as("envs");

    cy.visit("/");
  });

  it("should get api response", () => {
    cy.wait("@envs").then(res =>{
      expect(res.status).eq(200);
    });
  });
});
