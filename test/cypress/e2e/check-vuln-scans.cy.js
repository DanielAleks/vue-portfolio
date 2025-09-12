Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.Commands.overwrite("log", (subject, message) => {
  return null;
});

describe("check_vuln-scans.cy.js", () => {
  context("Vulnerability-Scan Overview Page", () => {
    it(".should() - check the Overview and Details Page for Vulnerability Scans", () => {
      cy.visit("/vulnerability-scans");
      cy.contains("Search Vulnerability Scans").should("exist");
      cy.contains("Account ID").should("exist");
      cy.contains("Domain Name").should("exist");
      cy.contains("Last Report Date").should("exist");
      cy.contains("Complete (%)").should("exist");
      cy.contains("Discovery Completed").should("exist");
    });
  })

  context("Vulnerability-Scan Details Page", () => {
    it(".should() - Edit Fields in Vuln-ScanDetails", () => {
      cy.visit("/vulnerability-scan-details/6306c14c22183f155f29f0d2");
      cy.contains("vulnerability scan - aislabs.com", {timeout: 50000}).should("exist");

      cy.contains("Full Name").should("exist");
      cy.contains("jpieta@aislabs.com").should("exist");
      cy.contains("Email").should("exist");
      cy.contains("Domain Name").should("exist");
      cy.contains("aislabs.com").should("exist").click();
      cy.contains("Approver Email").should("exist");
      cy.contains("jeff@aislabs.com").should("exist").click();
      cy.contains("Corporate Domain List").should("exist");
      cy.contains("test").should("exist").click();
      cy.contains("Notes").should("exist");
      cy.contains("no notes").should("exist").click();
    });

    it(".should() - Edit Fields in Vuln-ScanDetails", () => {
      cy.contains("Scan Status").should("exist");
      cy.contains("discovery Started").should("exist");
      cy.contains("discovery Completed").should("exist");
      cy.contains("report Sent For Approval").should("exist");
      cy.contains("report Approved").should("exist");
      cy.contains("No").first().should("exist").click();
      cy.contains("report Sent").should("exist");
      cy.contains("No").last().should("exist").click();
      cy.contains("mauticform_submissions_id").should("exist");
      cy.contains("271").should("exist").click();
      cy.contains("start Discovery Link").should("exist");
      cy.contains("start Scan Link").should("exist");
      cy.contains("send Report To Client Link").should("exist");
      cy.contains("send Report For Approval Link").should("exist");
      cy.contains("Last Report Scan Duration").should("exist");
      cy.contains("Last Scan Result Count").should("exist");
      cy.contains("14").should("exist");
      cy.contains("Last Scan Error Count").should("exist");
      cy.contains("Last Discovery Scan Duration").should("exist");
      cy.contains("Last Scan Error").should("exist");
      cy.contains("Erroneous scan progress value").should("exist");
      cy.contains("Scan Status Percent").should("exist");
      cy.contains("Scan Completed").should("exist");
      cy.contains("Last Report Date").should("exist");
      cy.contains("04/14/2023").should("exist");
    });
  });
});
