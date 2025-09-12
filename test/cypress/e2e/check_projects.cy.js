Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.Commands.overwrite("log", (subject, message) => {
  return null;
});

describe("check_projects.cy.js", () => {
  beforeEach(() => {
    Cypress.env("CYPRESS", true);
  });
  context("Check Project Data", () =>  {
    it(".should() - Display Project Overview", () => {
      cy.visit(`/projects`);
      cy.contains("Search Projects").should("exist", {timeout: 5000}).click()
      cy.contains("Search Projects").type("zDevOps Test - Nathan Test - 010524");
    });
    
    it(".should() - Display Project Information Card", () => {
      cy.visit('/project_details/2751');
      cy.contains("zDevOps", {timeout: 50000}).should("exist");
      cy.contains("Project Lead").should("exist");
      cy.contains("Status: 1").should("exist");

      cy.contains("Project Timeline").should("exist");
      cy.contains("Start Date").should("exist");
      cy.contains("End Date").should("exist");
      cy.contains("Completed Date").should("exist");
      cy.contains("View in AT").should("exist");

      cy.contains("Contract").should("exist");
      cy.contains("zDevOps Test - PROJECT - Dan Test - 091024").should(
        "exist"
      );
      cy.contains("Opportunity").should("exist");
      cy.contains("Dan Test - T20240910.0265").should("exist");
      cy.contains("Purchase Order #").should("exist");
      cy.contains("32454: PROJECT: Dan Test").should("exist");
      cy.contains("Description").should("exist");
      cy.contains("Project Revenue").should("exist");
      cy.contains("Project Cost").should("exist");
      cy.contains("Labor Revenue").should("exist");
      cy.contains("Labor Cost").should("exist");
    })

    it(".should() - Display Project Requirements", () => {
      cy.contains("Project Requirements").should("exist");
      // cy.contains("Related Task - Phone Port").click();
      // cy.contains("Current Phone System Setup Sheet").should("exist");
      // cy.contains("Network Readiness Checklist").should("exist");
      // cy.contains("New Phone Setup Sheet").should("exist");
      // cy.contains("Phone System Design Diagram").should("exist");
      cy.contains("Status").should("exist");
      cy.contains("Actions").should("exist");
    });

    it(".should() - Display Project Phases", () => {
      cy.contains("Project Phases").should("exist");
      cy.contains("Discovery").dblclick();
      cy.contains("Complete Current Phone System Configuration Sheet").should("exist");
      cy.contains("09/10/24").should("exist");
      cy.contains("12/09/24").should("exist");
      cy.contains("3 hrs.").should("exist");
      cy.contains("Due Date").should("exist");
      cy.contains("Est. Hours").should("exist");
    })
  })
});
