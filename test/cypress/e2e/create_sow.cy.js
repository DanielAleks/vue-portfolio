Cypress.Screenshot.defaults({
    screenshotOnRunFailure: false
  });
  
  Cypress.Commands.overwrite('log', (subject, message) => {
    return null;
  });
  
  describe('Create Sow', () => {
    it('Create SOW Testing', () => {
      cy.visit('/sow/create');
      cy.contains('Create SOW').should('exist');
      cy.contains('SOW Name').click().type('Dan Automated Cypress Test');
      cy.contains('Search Account').click().type('AIS Int');
      cy.contains('div.q-item__section', 'AIS Internal').should('exist').click()
      cy.contains('Search Location').should('exist');
      cy.contains('Search Sales Person').click()
      cy.contains('div.q-item__section', 'Jeff Pieta')
      cy.contains('Search CdwAMs').click()
      cy.contains('div.q-item__section', 'joshkel@cdw.com').click()
      cy.contains('Search Milestone').click()
      cy.contains('div.q-item__section', 'All Non-Labor').click()
      cy.contains('Search Labor Type').click()
      cy.contains('div.q-item__section', 'Block Hours').click()
      cy.contains('Overview').should('exist')
      cy.contains('Create').should('exist')
    });
  });