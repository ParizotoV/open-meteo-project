/// <reference types="cypress" />

const host = Cypress.env("host") ?? "";

import mock from "../fixtures/weather.json";

describe("<DetailForecast />", { testIsolation: false }, () => {
  before(() => {
    cy.clearAllLocalStorage();
    cy.visit(`${host}/forecasts/5a8baa26-a6af-43e4-884c-ea16b8f3f9f0`, {
      onBeforeLoad(win) {
        win.localStorage.setItem("weathers", JSON.stringify([mock]));
      },
    });
  });

  it("Should render page", () => {
    cy.get("h2").contains("Details Curitiba/PR").should("exist");
    cy.get("h1").contains("Temperature").should("exist");
    cy.get("span").contains("20 °C").should("exist");
    cy.get("h1").contains("Wind Speed").should("exist");
    cy.get("span").contains("9.7 km/h").should("exist");
    cy.get("h1").contains("UV Index").should("exist");
    cy.get("span").contains("9.65").should("exist");

    cy.get("span").contains("08:57").should("exist");
    cy.get("span").contains("22:04").should("exist");
  });
});

export {};
