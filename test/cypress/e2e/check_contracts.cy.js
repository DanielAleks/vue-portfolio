Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.Commands.overwrite("log", (subject, message) => {
  return null;
});

describe("Sow Contracts", () => {
  beforeEach(() => {
    Cypress.env("CYPRESS", true);
  });
  it(".should() - Display Documents and Popup", () => {
    cy.visit(`/sow_details/4805`);

    // right details tests
    cy.contains("Opportunity", {timeout: 50000});
    // contracts btn is visible, but only clicked after response loads
    cy.wait(5000);
    cy.contains("Contracts").should("exist").click();
    cy.contains("button", "Renew WOP").should("exist", {timeout: 5000});
    cy.contains("Sow Contracts").should("exist");
    cy.contains(
      "AIS Internal - PROJECT - Dan - Cy Test Sow (do not delete) - 072123"
    ).should("exist");
    cy.contains("07/21/23 - 10/20/23").should("exist");
    cy.contains("View in AT").should("exist");
  });
});
