/// <reference types="cypress" />

const host = Cypress.env("host") ?? "";

import mock from "../fixtures/weather.json";

describe("<Forecasts />", { testIsolation: false }, () => {
  before(() => {
    cy.clearAllLocalStorage();
    cy.visit(`${host}/forecasts`);
  });

  it("Should render page without cards", () => {
    cy.get("h3").contains("Add new location").should("exist");
    cy.get("h3").contains("My widgets").should("exist");
    cy.contains("Not found").should("exist");

    cy.get('div[id="id"]').should("have.length", 0);
  });

  it("Should render page wih cards", () => {
    cy.visit(`${host}/forecasts`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("weathers", JSON.stringify([mock]));
      },
    });

    cy.get("h3").contains("Add new location").should("exist");
    cy.get("h3").contains("My widgets").should("exist");

    cy.get('div[id="cards"]').should("have.length", 1);
  });

  it("Should reload the card", () => {
    cy.get("h3").contains("Add new location").should("exist");
    cy.get("h3").contains("My widgets").should("exist");

    cy.get('div[id="cards"]').should("have.length", 1);
    cy.get('div[id="cards"]')
      .first()
      .get('[data-testid="button-menu"]')
      .click();

    cy.get("li").contains("Reload").click();

    cy.wait(200)

    cy.get("div").contains("Updated successfully").should("exist");
  });

  it("Should delete the card", () => {
    cy.get("h3").contains("Add new location").should("exist");
    cy.get("h3").contains("My widgets").should("exist");

    cy.get('div[id="cards"]').should("have.length", 1);
    cy.get('div[id="cards"]')
      .first()
      .get('[data-testid="button-menu"]')
      .click();

    cy.get("li").contains("Delete").click();

    cy.get("h3").contains("Not found Widgets").should("exist");
  });
});

export {};
