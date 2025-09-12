Cypress.Screenshot.defaults({
    screenshotOnRunFailure: false
  });
  
  Cypress.Commands.overwrite('log', (subject, message) => {
    return null;
  });

  describe('check_work_locations.cy.js', () => {
    it('.should() - Display SOWS Overview', () => {
      cy.visit(`/sow_details/4805`);
      cy.contains('SOW ID');
      cy.contains('Labor Rates').click();     
      // update this to click()
      cy.contains("Work Address").should('exist');
      // .click();
      // cy.contains('div.q-item__section', '1430 Greenbrier Dr, Libertyville Illinois, 60048', { timeout: 5000 }).should('exist');

      // very conditional based, need to update with better logic
      // cy.contains("Add Location", {timeout: 10000}).then(($addLocationButton) => {
      //   $addLocationButton.click();
      //   cy.contains('div.q-item__section', '1815 S Meyers Rd, Oakbrook IL, 60181', { timeout: 5000 }).should('exist').click();
      // });

      // cy.contains("Work Address", {timeout: 10000}).last().then(($secondLocation) => {
      //   const loc = $secondLocation.text();
      //   cy.wrap($secondLocation).trigger('mouseover');
        
      //   cy.get('[cy-data=delete-sow-location]').click();
      // });
    });
  });