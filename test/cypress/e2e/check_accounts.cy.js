Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.Commands.overwrite("log", (subject, message) => {
  return null;
});

describe("check_accounts.cy.js", () => {
  context("Check Account Data", () => {
    it(".should() - check the Account Information Card", () => {
      cy.visit("/account/3245");
      cy.contains("Account: zDevOps Test", {timeout: 50000}).should("exist");
      cy.contains("Account Type").should("exist")
      cy.contains("Customer").should("exist")
      cy.contains("Available Notifications").should("exist")
      cy.contains("SIEM Only").should("exist")
      cy.contains("Total Spend").should("exist")
    });

    it(".should() - Display Related Projects", () => {
      cy.contains("Search Projects").should("exist").type("Devops")
      cy.contains("Related Projects").should("exist")
      cy.contains("Sort By").should("exist")
      cy.contains("Status").should("exist")
      cy.contains("Purchase Order #").should("exist")
    });

    it(".should() - Attach Vuln-Scan Popup", () => {
      cy.contains("Attach Vulnerability Scan").should("exist").click();
      cy.contains("div.q-item__section", "aislabs.com").should("exist").first().click();
      cy.contains("Save & Close").should("exist")
      cy.get("[cy-data=close-modal]").should("exist").click()
    });

    it(".should() - Display Related Vulnerability Scans", () => {
      cy.contains("Related Vulnerability Scans").should("exist")
      cy.contains("Domain Name").should("exist")
      cy.contains("Last Report Date").should("exist")
      cy.contains("Discovery Completed").should("exist")
      cy.contains("Search Vulnerability Scans").click()
      cy.contains("Search Vulnerability Scans").type("lakecounty")
      cy.contains("lakecountyil.gov").should("exist")
      cy.contains("jpieta@aislabs.com").should("exist")
    });

    it(".should() - Display Related Requirements", () => {
      cy.contains("Account Requirements").should("exist")
      // cy.contains("Description").should("exist")
      // cy.contains("Related Task - AIS MFW Generic Configuration").should("exist").click()
      // cy.contains("Completed").should("exist")
      // cy.contains("List of standard alerts").should("exist")
    });

    it(".should() - Display Related SOWs", () => {
      cy.contains("Account SOWs").should("exist")
      cy.contains("SOW ID").should("exist")
      cy.contains("Stage").should("exist")
      cy.contains("Date").should("exist")
      cy.contains("Collaborators").should("exist")
    });

    it(".should() - Display Related Users", () => {
      cy.contains("Account Users").should("exist")
      cy.contains("Title").should("exist")
      cy.contains("Email").should("exist")
    });
  });

  context("Check Create Page for AccountNotifications", () => {
    it(".should() - Test Create Account Notification", () => {
      cy.contains("Attach Account Notification").should("exist").click()
      cy.contains("Create an Account Notification").should("exist")
      cy.contains("Select Contact").should("exist")
      cy.contains("Contact Preferences").should("exist")
      cy.contains("SMS").should("exist").click()
      cy.contains("Email").should("exist");
      cy.contains("Notification Priority").should("exist")
      cy.contains("High").should("exist").click()
      cy.contains("Medium").should("exist").click()
      cy.contains("Low").should("exist").click()
      cy.contains("Critical").should("exist").click()
      cy.contains("Information").should("exist").click()
      cy.contains("Create Account Notification").should("exist")
    });
  });
});
