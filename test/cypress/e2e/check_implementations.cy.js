Cypress.Screenshot.defaults({
    screenshotOnRunFailure: false
  });
  
  Cypress.Commands.overwrite('log', (subject, message) => {
    return null;
  });
  
// PERFECT EX. OF CONDITIONAL TESTING
// describe('parent', () => {
//   beforeEach(() => {
//     cy.wrap('one').as('a')
//   })

//   context('child', () => {
//     beforeEach(() => {
//       cy.wrap('two').as('b')
//     })

//     describe('grandchild', () => {
//       beforeEach(() => {
//         cy.wrap('three').as('c')
//       })

//       it('can access all aliases as properties', function () {
//         expect(this.a).to.eq('one') // true
//         expect(this.b).to.eq('two') // true
//         expect(this.c).to.eq('three') // true
//       })
//     })
//   })
// })

// alias all of the tr's found in the table as 'rows'
// cy.get('table').find('tr').as('rows')

// Cypress returns the reference to the <tr>'s
// which allows us to continue to chain commands
// finding the 1st row.
// cy.get('@rows').first().click()

  describe('check_implementations.cy.js', () => {
    context("Implementation Page", () => {
      it('Implementation Tab & Guideline Popup', () => {
        cy.visit(`/sow_details/4805`);
        cy.contains('SOW ID', { timeout: 50000 });
        cy.contains('button', 'Implementations').should('exist');
        cy.contains('button', 'Implementations').click();
        cy.get('[data-testid="add-button"]', {timeout: 25000}).click({ multiple: true })
        cy.contains('Add Guideline').click();
        cy.get('[cy-data=quantity-input]').click();
        cy.get('[cy-data=quantity-input]').type(3);
        cy.get('[cy-data=component-search]').click();
        cy.contains('button', 'Save').should('exist');
        cy.get('[data-testid="close-modal-button"]', {timeout: 5000}).click()
        cy.contains('button', 'Cancel').click({force: true});
      });

      it('Attach ImplementationType and Discount Guideline', () => {
        cy.get('[cy-data=implementation-search]').click()
        cy.get('[cy-data=implementation-search]').type("SIEM");  
        cy.contains('div.q-item__section', 'AIS Managed SIEM', { timeout: 5000 }).click();
        cy.get('[cy-data=guideline-name]').first().click();
        cy.get('[cy-data=guideline-name]').first().type('test');
        cy.get('[cy-data=guideline-quantity]').first().click();
        cy.get('[cy-data=guideline-quantity]').first().type(2);
        // cy.get('[cy-data=guideline-discount]').first().click()
        // cy.get('[cy-data=guideline-discount]').first().type(100);  
        cy.get('[cy-data=guideline-alr-implemented]').first().click();
        cy.contains('button', 'Attach Implementation').should('exist');
        cy.get('[cy-data=cancel-implementation]').click();
      });

      it('Add Implementation', () => {
        // cy.contains('IT Project Management').should('exist')
        // cy.contains('Standard Project Management').should('exist').click(); 
        // cy.contains("$ 171.00").click()
        // cy.contains('2').click({force: true})
        // cy.contains('2 hr.').should('exist')
        // cy.contains("$ 171.00").should('exist')

        // cy.get('.ps-checkbox').click({multiple: true});
        // cy.contains('vCloud Server - Windows 2008/2012').should('exist');
        // cy.contains('One-Time Hardware/Software/Licensing').should('exist');
        // cy.contains('vCloud Server - Windows 2008/2012').should('exist').click()
        // cy.contains('12').should('exist')

        // cy.contains('Monthly Hardware/Software/Licensing').should('exist');
        // cy.contains('La Grange Area Network Advertisement').should('exist').click()
        // cy.contains('$ 200.00').click()
        // cy.contains('23').click()
        // cy.contains("$ 4,600.00").should('exist')

        cy.contains('Engagement Summary').should('exist');
        cy.contains('One Time Total').should('exist');
        cy.contains('Monthly Recurring Total').should('exist');
        cy.contains('Yearly Recurring Total').should('exist');

        cy.contains('Project Milestones').should('exist');
        cy.contains('Project Kickoff').should('exist');
        cy.contains('Project Completion').should('exist');
      });
    });
  });