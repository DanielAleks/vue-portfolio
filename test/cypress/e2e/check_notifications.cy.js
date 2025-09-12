Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.Commands.overwrite("log", (subject, message) => {
  return null;
});

describe("check_notifications.cy.js", () => {
  beforeEach(() => {
    Cypress.env("CYPRESS", true);
  });
  it(".should() - Check Overview of Notifications", () => {
    cy.visit("/notifications");
    cy.contains("Search Account")
      .should("exist")
      .click()
      .type("AIS Internal");
    cy.contains("Contact Name").should("exist");
  });

  it(".should() - Go to Create AccountNotification Page", () => {
    cy.contains("Create Account Notification").should("exist").click();
    cy.contains("Create an Account Notification").should("exist");
    cy.contains("Select Contact").should("exist");
    // cy.contains("div.q_item__section", sometimes "Joel Melvin" othertimes "AIS Support").should("exist").click();
    cy.contains("Email").should("exist").click();
    cy.contains("SMS").should("exist").click();
    cy.contains("High").should("exist").click();
    cy.contains("Medium").should("exist").click();
    cy.contains("Low").should("exist").click();
    cy.contains("Critical").should("exist").click();
    cy.contains("Information").should("exist").click();
    cy.contains("Create Account Notification").should("exist")
  });

  it(".should() - Check NotificationDetails Page", () => {
    cy.visit("notification-details/651dd072d53c5de1ac08d6e6")
    cy.contains("Account Name: AIS Internal", {timeout: 15000}).should("exist");
    cy.contains("Primary Phone").should("exist");
    cy.contains("Account Notification Preferences").should("exist");
    cy.contains("Priority Levels...").should("exist");
    cy.contains("Contact Preferences").should("exist");
    cy.contains("Email").should("exist").click();
    cy.contains("SMS").should("exist").click();
    cy.contains("Available Notifications").should("exist");
    cy.contains("Notification Description").should("exist");
    cy.contains("Notification Priority").should("exist");
    cy.contains("High").should("exist").click();
    cy.contains("Medium").should("exist").click();
    cy.contains("Low").should("exist").click();
    cy.contains("Critical").should("exist").click();
    cy.contains("Information").should("exist").click();
    cy.contains("Remove Notification Account").should("exist");
});
});
