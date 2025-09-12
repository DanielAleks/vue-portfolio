Cypress.Screenshot.defaults({
    screenshotOnRunFailure: false
  });
  
  Cypress.Commands.overwrite('log', (subject, message) => {
    return null;
  });
  
  describe('Requirements Page', () => {
    it('Go to SOW Requirements', () => {
      cy.visit(`/sow_details/4805`);
      cy.contains('SOW ID', {timeout: 50000}).should('exist');
      cy.contains('button', 'Requirements').should('exist').click();
    });

    it('Check SOW Requirements Section & Edit', () => {
      cy.contains('AIS Managed VoIP Requirements', {timeout: 25000}).should('exist');
      cy.contains('Related Guideline - Base Implementation').should('exist');
      cy.contains('4 Requirements').should('exist');
      cy.contains('Current Phone System').should('exist');
      cy.contains('Not Started').should('exist');
      cy.get('.edit-req').should('exist').eq(1).click()
      cy.get('.upload-req').should('exist').eq(1).click();
      cy.contains('View').should('exist');
    });

    it('Check SOW Requirements Section & Add', () => {
      cy.contains('Product Assumptions').should('exist');   
      cy.get('.add-btn').first().click();
      cy.get('.component-search').click()
      cy.contains('div.q-item__section', 'Users will use softether VPN', { timeout: 5000 }).should('exist');
      cy.get('.component-search').click().type('show zero results')
      cy.get('.detail-input').click().type("details")  
      // cy.get('.clear-search').click();
      cy.contains('button', "Cancel").click(); 
      cy.contains('Exclusions').should('exist');
      cy.contains('Dan Assumption Cy Test').click();
      cy.contains('Dan Exclusion Cy Test').click();
  });
});