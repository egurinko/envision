/// <reference types="Cypress" />

describe("Users", () => {
  beforeEach(() => {
    cy.server();
    cy.route("POST", "/api/auth/login").as("login");
    cy.route("GET", "/api/auth/users").as("users");
    cy.route("GET", "/api/contributions").as("contributions");    
    cy.route("POST", "/api/training-data").as("postTrainningData");

    cy.login();
    cy.visit("/users");
    cy.wait(["@users", "@contributions"]);
  });

  it("username should be rendered", () => {
    expect(cy.contains("super")).to.exist;
    expect(cy.contains("cypress")).to.exist;
  });

  it("contribution graph should be rendered", () => {
    cy.get("[data-cy=mood]").click();
    cy.wait("@postTrainningData").then(res =>{
      expect(res.status).eq(200);
    });

    expect(cy.get("[data-cy=contribution-graph]")).to.exist;
  });
});
