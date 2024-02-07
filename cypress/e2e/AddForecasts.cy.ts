/// <reference types="cypress" />

const host = Cypress.env("host") ?? "";

describe("<AddForecast />", { testIsolation: false }, () => {
  before(() => {
    cy.clearAllLocalStorage();
    cy.visit(`${host}/add-forecast`);
  });

  it("Should render page", () => {
    cy.get("h3").contains("Add new location").should("exist");
    cy.get("label").contains("Latitude").should("exist");
    cy.get('input[placeholder="Latitude"]').should("exist");
    cy.get("label").contains("Longitude").should("exist");
    cy.get('input[placeholder="Longitude"]').should("exist");

    cy.get("button").should("exist");
  });

  it("Should render errors form", () => {
    cy.get("button").click();

    cy.get("span").contains("Longitude is required").should("exist");
    cy.get("span").contains("Longitude is required").should("exist");
  });

  it("Should submit form", () => {
    cy.get('input[placeholder="Latitude"]').type("-25.365617");
    cy.get('input[placeholder="Longitude"]').type("-49.193972");

    cy.get('button[type="submit"]').click();

    cy.wait(200);

    cy.get("div").contains("Added successfully");
  });

  it("Should submit form with error", () => {
    cy.wait(2000);

    cy.get('input[placeholder="Latitude"]').type("156516615");
    cy.get('input[placeholder="Longitude"]').type("-65162165");

    cy.get('button[type="submit"]').click();

    cy.wait(200);

    cy.get("div").contains("Error adding weather");
  });
});

export {};
