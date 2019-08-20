/// <reference types="Cypress" />

describe("Users New", () => {
  const date = new Date().getTime();
  const username = String(date).slice(5);
  const password = "password";

  beforeEach(() => {
    cy.server();
    cy.route("POST", "/api/auth/login").as("login");
    cy.route("POST", "/api/auth/users").as("users");

    cy.login();

    cy.visit("/users/new");
  });

  it("should be rendered", () => {
    expect(cy.get("[data-cy=username]")).to.exist;
    expect(cy.get("[data-cy=password]")).to.exist;
    expect(cy.get("[data-cy=login-button]")).to.exist;
    expect(cy.get("[data-cy=link]")).to.exist;
  });

  it("should create new user with logined user", () => {
    cy.get("[data-cy=username]").type(username);
    cy.get("[data-cy=password]").type(password);
    cy.get("[data-cy=login-button]").click();

    cy.wait("@users").then(res =>{
      expect(res.status).eq(200);
    });
  });

  it("new user should be rendered", () => {
    cy.visit("/users");
    expect(cy.contains(username)).to.exist;
  });
});
