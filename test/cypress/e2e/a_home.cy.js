Cypress.config('experimentalSessionSupport', true)

Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false
});

Cypress.Commands.overwrite('log', (subject, message) => {
  return null;
});

describe('Landing', { retries: 5, timeout: 50000 }, () => {
  beforeEach(() => {
    Cypress.env('CYPRESS', true);
    cy.visit('/');
  });
  it('.should() - assert that <title> is correct', () => {
    cy.title().should('include', 'AIS Project Central');


  // });
  },
  );
});

describe('Check Login Buttons', { retries: 5, timeout: 300000 }, () => {
  // it('.should() - assert that google button exist', () => {
  //   cy.contains('Sign In With Google');
  // });

  // it('.should() - assert that microsoft button exist', () => {
  //   cy.contains('Sign In With Microsoft');
  // });

  it('.should() -contain cypress login input', () => {
    // cy.session('performLogin', () => {
      cy.visit('/login');
      // Cypress.env('CYPRESS', true);
      cy.get('input#cypressemail').should('exist', {timeout: 50000});
      cy.wait(1000);
      cy.get('input#cypressemail').type('daleksandrov@aislabs.com');
      cy.wait(1000);
      cy.get('button#cypresslogin').click();
      cy.wait(1000);
      cy.getLocalStorage('AUTH_TOKEN');
      cy.wait(2000);
      cy.visit('/').then(() => {
        cy.url().should('contain', '/')
      });
   });
});

// example, this way Test Isolation can stay true
//   [user, password],
//   () => {
//       cy.visit('/auth/login');

//       type('#user_name', user);
//       type('#user_password', password);

//       cy.get('#user_login_submit').click();
//       cy.url().should('contain', '/main');
//   },
//  
// );

// Caching session when logging in via page visit
// cy.session(name, () => {
//   cy.visit('/login')
//   cy.get('[data-test=name]').type(name)
//   cy.get('[data-test=password]').type('s3cr3t')
//   cy.get('form').contains('Log In').click()
//   cy.url().should('contain', '/login-successful')
// },
// {
  //       cacheAcrossSpecs: true,
  //   },
// )

// examples of Cypress commands and notes from Cypress documentation:

// ACCESS COMPONENT'S BTN & ORGANIZE W/ js
// cy.get('button').then(($btn) => {

//   // store the button's text
//   const txt = $btn.text()

//   // submit a form
//   cy.get('form').submit()

//   // compare the two buttons' text
//   // and make sure they are different
//   cy.get('button').should(($btn2) => {
//     expect($btn2.text()).not.to.eq(txt)
//   })
// })
// OR
// cy.get('button').then(($btn) => {
//   // inspect $btn <object>
//   debugger

//   cy.get('[data-testid="countries"]')
//     .select('USA')
//     .then(($select) => {
//       // inspect $select <object>
//       debugger

//       cy.clock().then(($clock) => {
//         // inspect $clock <object>
//         debugger

//         $btn // is still available
//         $select // is still available too
//       })
//     })
// })


// ALIASES ACCESSING VARIABLES IN TEST SCOPES W/ this.
// beforeEach(() => {
//   // alias the $btn.text() as 'text'
//   cy.get('button').invoke('text').as('text')
// })

// it('has access to text', function () {
//   this.text // is now available
// })

// PERFECT EX. OF CONDITIONAL TESTING
// You cannot use a this.* reference until the .as() command runs.
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

// cy.fixture('users.json').then((users) => {
//   // now we can avoid the alias altogether
//   // and use a callback function
//   const user = users[0]

//   // passes
//   cy.get('header').should('contain', user.name)
// })


// ACCESS ALIASES WITH @
// Advantage of why to use @alias instead of this.myAlias:
// When using this.users, it is stored on the context when it is first evaluated. 
// But when using cy.get('@users'), any queries are re-evaluated every time the alias is accessed.
// example:
// beforeEach(() => {
//   // alias the users fixtures
//   cy.fixture('users.json').as('users')
// })

// it('utilize users in some way', function () {
//   // use the special '@' syntax to access aliases
//   // which avoids the use of 'this'
//   cy.get('@users').then((users) => {
//     // access the users argument
//     const user = users[0]

//     // make sure the header contains the first
//     // user's name
//     cy.get('header').should('contain', user.name)
//   })
// })
// ALWAYS PLACE ALIAS IN beforeEach so that it stays ✅ REACTIVE
// beforeEach(() => {
//   // we will create a new alias before each test
//   cy.wrap('some value').as('exampleValue')
// })

// it('works in the first test', () => {
//   cy.get('@exampleValue').should('equal', 'some value')
// })

// it('works in the second test', () => {
//   cy.get('@exampleValue').should('equal', 'some value')
// })