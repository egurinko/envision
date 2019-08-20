/// <reference types="Cypress" />

describe("Home", () => {
    beforeEach(() => {
      cy.server();
      cy.route("GET", "/api/comfort").as("comfort");
      cy.route("GET", "/api/envs").as("envs");

      cy.visit("/");
    });

    it("should get api response", () => {
      cy.wait("@comfort").then(res =>{
        expect(res.status).eq(200);
      });
  
      cy.wait("@envs").then(res =>{
        expect(res.status).eq(200);
      });
    });
  
    it("should be rendered", () => {
      expect(cy.get("[data-cy=comfort-index]")).to.exist;

      expect(cy.get("[data-cy=SNACK]")).to.exist;
      expect(cy.get("[data-cy=CO2]")).to.exist;
      expect(cy.get("[data-cy=TEMPERATURE]")).to.exist;
      expect(cy.get("[data-cy=LUX]")).to.exist;
      expect(cy.get("[data-cy=HUMIDITY]")).to.exist;
      expect(cy.get("[data-cy=PRESSURE]")).to.exist;

      expect(cy.get("[data-cy=timespan]")).to.exist;
      expect(cy.get("[data-cy=comfort-graph]")).to.exist;
    });
  
    it("timespan button should render new graph", () => {
      cy.get("[data-cy=timespan-button]").click();
      cy.get("[data-cy='3 HOURS']").click();

      cy.wait("@comfort").then(res =>{
        expect(res.status).eq(200);
      });
  
      cy.wait("@envs").then(res =>{
        expect(res.status).eq(200);
      });
    });
  });
  