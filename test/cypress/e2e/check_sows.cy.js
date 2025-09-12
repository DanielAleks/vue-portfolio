Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false
});

Cypress.Commands.overwrite('log', (subject, message) => {
  return null;
});

describe('SOWs Overview and Details', () => {

  context('Display Top SOW Info and Dates', () => {
    it("Right Card Info", () => {
      cy.visit(`/sow_details/4805`);
      cy.contains('SOW ID', {timeout: 50000});
      cy.contains('Date Created');
      cy.contains('Project Start Date');
      cy.contains('Project End Date');
      cy.contains('Quote Effective Date');
      cy.contains('Quote Exp. Date');
   });

    // left details tests
    it('Edit Fields in Top Info', () => {
      // cy.contains('AIS Internal').should('exist').click();
      // cy.wait(2000);
      // cy.contains('div.q-item__section', '10th Magnitude', { timeout: 10000 }).should('exist');
      cy.contains('Dan - Cy Test Sow (do not delete)').should("exist", {timeout: 50000});
      cy.contains('Project Manager');
      cy.contains('Account Manager');
      cy.contains('Dan - Cy Test Sow (do not delete)').click();
      cy.contains("Sales Person").should('exist');
      // cy.contains('div.q-item__section', 'Adam Blair', { timeout: 5000 }).should('exist');
    });
  });

  context("SOW Overview Section", () => {
    it('Test Fields in Overview', () => {
      cy.contains("PM Rate").click();
      // sow overview detail tests
      // cy.contains('div.q-item__section', 'Project Billing Example', { timeout: 5000 }).should('exist');
      cy.contains("Tier 1 Rate").click();
      cy.contains("CDW AM").click();
      cy.contains('div.q-item__section', 'joshkel@cdw.com', { timeout: 5000 }).should('exist');
      cy.contains("Tier 2 Rate").click();
      cy.contains("Milestone").should('exist');
      // cy.contains('div.q-item__section', 'All One-Time billing items only', { timeout: 5000 }).should('exist');
      cy.contains("Tier 3 Rate").click();
      cy.contains("Labor Contract Type").click();
      cy.contains('div.q-item__section', 'Block Hours', { timeout: 5000 }).should('exist');
      cy.contains("Consultant Rate").click();
      cy.contains("After Hours Rate").click();
      cy.contains("Opportunity").should('exist').click();

      cy.contains("Overview").click();
    });

    it('.should() - Check Popups', () => {
      cy.contains('button', 'Create in AT').click();  
      cy.contains('button', 'Opportunity').should('exist');
      cy.get('.close-modal').click();

      cy.contains('button', 'Print Sow').click();
      cy.contains('button', 'Direct SOW - Full').should('exist');
      cy.contains('button', 'CDW SOW - Full').should('exist');
      cy.get('[data-testid="close-modal-button"]', {timeout: 5000}).click()

      cy.contains('button', 'Review WOP').should('exist').click();
      cy.get('.close-modal').click();
    });
  });
});