Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.Commands.overwrite("log", (subject, message) => {
  return null;
});

describe("check_users.cy.js", () => {
  context("Check UserOverview and UserDetails pages", () => {
    it("Check UserOverview Page", () => {
      // this test checks for the user then clicks. This is bad practice .only() it should redirect to specific user via URL.
      cy.visit("/users");
      cy.contains("Search Users").should("exist").click().type("Daniel A");
      cy.contains("Daniel Aleksandrov", {timeout: 25000}).first().should("exist").click();
    });

    it("Check UserDetails Page", () => {
      // cy.contains("Active").should("exist");
      cy.contains("Client Portal Access Enabled").should("exist");
      cy.contains("Title").should("exist").click();
      cy.contains("Account").should("exist").click();
      cy.contains("Email").should("exist");
      cy.contains("Bio").should("exist").click();
      cy.contains("button", "Delete User").should("exist");
    });
  });
});
