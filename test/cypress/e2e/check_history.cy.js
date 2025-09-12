Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false
});

Cypress.Commands.overwrite('log', (subject, message) => {
  return null;
});

describe('Sow Detail History', () => {
  beforeEach(() => {
    Cypress.env('CYPRESS', true);
  });
  it('.should() - Display Documents and Popup', () => {
    cy.visit(`/sow_details/4805`);

    // right details tests
    cy.contains('SOW ID', {timeout: 50000});

    // left details tests
    cy.contains('button', 'History').should('exist').click();
    cy.contains('button', "Create Document").should('exist');
    // cy.contains('button', "CDW SOW").should('exist');
    // cy.contains('button', "Direct SOW").should('exist');
    // cy.contains('button', "Send for eSign").should('exist');
    // cy.get('[data-testid="close-modal-button"]', {timeout: 5000}).click()
    cy.contains("Sow History").should('exist');
    cy.contains("Direct.AIS Internal.Dan Test 3.V1.07.19.2023.docx").should('exist');
    cy.contains("07/19/23").should('exist');
    // cy.contains("Print").should('exist');
    // cy.contains("Download").should('exist');
  });
});