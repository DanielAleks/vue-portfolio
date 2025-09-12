Cypress.Screenshot.defaults({
    screenshotOnRunFailure: false
  });
  
  Cypress.Commands.overwrite('log', (subject, message) => {
    return null;
  });

  describe('check_admin_overview.cy.js', () => {
    beforeEach(() => {
      Cypress.env('CYPRESS', true);
    });
    it('.should() - check the Overview and Create pages of ImplementationTypes, Guidelines, Tasks, and Requirements', () => {
      cy.visit('/search/implementation-types/');
      cy.contains('Sort By').should('exist').click();
      cy.contains('---').should('exist')
      cy.contains('Most Recent').should('exist')
      cy.contains('Alphabetical A -> Z').should('exist')
      cy.contains('Alphabetical Z -> A').should('exist').click();
      cy.contains('Category').should('exist').click()
      cy.contains('Consulting').should('exist');
      cy.contains('Managed Services').should('exist');
      cy.contains('AIS Labs').should('exist');
      cy.contains('Create Implementation Type').should('exist').click();
      cy.contains('Create Implementation Type').should('exist');
      cy.contains('Name').should('exist')
      // cy.contains('Internal Notes').should('exist')
      // cy.contains('feature').should('exist')
      // cy.contains('benefit').should('exist')
      cy.contains('is Draft').should('exist')
      cy.contains('SOW Order').should('exist')
      cy.contains('Implementation Category').should('exist').click();
      cy.contains('Consulting').should('exist').click();
      cy.contains('Create').should('exist');

      cy.visit('/search/implementation-guidelines/');
      cy.contains('Create Implementation Guideline').should('exist').click();
      cy.contains('Create Implementation Guideline').should('exist');
      cy.contains('Name').should('exist')
      // cy.contains('Description').should('exist')
      cy.contains('Qualification Question').should('exist')
      // cy.contains('Search Implementation Type').should('exist').click();
      // cy.wait(1000);
      // cy.contains('Search Implementation Type').should('exist').type('General IT');
      // cy.wait(1000);
      // cy.contains('General IT Support', {timeout: 10000}).should('exist');
      // cy.contains('div.q_item__section', 'General IT Support', {timeout: 10000}).should('exist');
      cy.contains('Per Unit Pricing Basis').should('exist')
      // cy.contains('Internal Notes').should('exist')
      // cy.contains('Documentation Url').should('exist')
      cy.contains('Recommended Block Hours').should('exist')
      cy.contains('Include By Default').should('exist')
      cy.contains('is Draft').should('exist')
      cy.contains('Skill Tier').should('exist').click()
      cy.contains('Project Manager').should('exist').click()
      cy.contains('Billing Unit Type').should('exist').click()
      cy.contains('Non Labor Only').should('exist').click()
      cy.contains('Billing Frequency').should('exist').click()
      cy.contains('Annual').should('exist').click()
      cy.contains('Create').should('exist');

      cy.visit('/search/implementation-tasks/');
      cy.contains('Recurring').should('exist').click();
      cy.contains('Recurring Only').should('exist');
      cy.contains('One Time Only').should('exist').click();
      cy.contains('Project Process').should('exist').click();
      cy.contains('Discovery').should('exist');
      cy.contains('Solution Design').should('exist');
      cy.contains('Design Review').should('exist');
      cy.contains('Create Implementation Task').should('exist').click();
      cy.contains('Name').should('exist')
      cy.contains('Search Skills').should('exist').click()
      cy.contains('Search Skills').should('exist').type("V");
      cy.contains('VPN', {timeout: 10000}).should('exist').click();
      cy.contains('Search Project Process').should('exist').click();
      cy.contains('Discovery').should('exist').click();
      cy.contains('Block Hours').should('exist');
      cy.contains('Position').should('exist');
      cy.contains('Task Type').should('exist').click();
      cy.contains('Non Labor').should('exist').click();
      cy.contains('Skill Tier').should('exist').click();
      cy.contains('Project Manager').should('exist').click();
      cy.contains('Is Recurring').should('exist').click();
      cy.contains('is Customer Task').should('exist').click();
      cy.contains('Create').should('exist');

      cy.visit('/search/requirements/');
      cy.contains('Create Requirement').should('exist').click();
      cy.contains('Name *').should('exist').click();
      cy.contains('Description').should('exist');
      cy.contains('Create').should('exist');

      // also test
      // products, services, s.bundles, and skills
    });
  });

