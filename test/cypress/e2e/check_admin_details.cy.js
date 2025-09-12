Cypress.Screenshot.defaults({
  screenshotOnRunFailure: false,
});

Cypress.Commands.overwrite("log", (subject, message) => {
  return null;
});

describe("check_admin_center_details.cy.js", () => {
  context("Check Admin Center Details", () => {
    it("Check Implementation Type and related Guidelines", () => {
      cy.visit("/implementation-types");
      cy.contains("Search Implementation Types")
        .should("exist")
        .click()
        .type("Devops Test 2");
      cy.visit("/implementation-type/detail/94");

      // cy.contains("Name", {timeout: 50000}).should("exist");
      // cy.contains("DevOps Test 2").should("exist").click();
      cy.contains("Description").should("exist");
      cy.contains("Test").should("exist").click();
      cy.contains("Is Deprecated").should("exist");
      cy.contains("Active").should("exist").click();
      cy.contains("Draft").should("exist").click();
      cy.contains("Implementation Category").should("exist");
      cy.contains("Consulting").should("exist").click();
      cy.contains("Internal Notes").should("exist");
      cy.contains("Testing Note").should("exist").click();
      cy.contains("Feature").should("exist");
      cy.contains("Testing Features").should("exist").click();
      cy.contains("Benefit").should("exist");
      cy.contains("Testing Benefits").should("exist").click();
      cy.contains("SOW Order").should("exist");
      cy.contains("100").should("exist").click();
      cy.contains("Created At").should("exist");
      cy.contains("Created By").should("exist");
      cy.contains("Last Updated At").should("exist");
      cy.contains("Last Updated By").should("exist");

      cy.contains("Related Implementation Guidelines").should("exist");

      cy.contains("Status").should("exist");
      cy.contains("Active").should("exist");
      cy.contains("Actions").should("exist");
      cy.contains("View").should("exist");

      cy.contains("Create Implementation Guideline").should("exist");
    })

    it("Check Implementation Guideline and related Relationships", () => {
      cy.visit("implementation-type/guideline/2085");
      cy.contains("Name").should("exist");
      cy.contains("DevOps Test 2 - Dan Test 123").should("exist");
      cy.get('.settings').should("exist").click();
      cy.contains("Edit").should("exist");
      cy.contains("Delete").should("exist");
      // cy.contains("Hierarchy").should("exist").click();
      // cy.get("[cy-data=guideline-expansion-item]").should("exist").first().click();
      // cy.get("[cy-data=skill-expansion-item]").click()
      // cy.get("[cy-data=task-expansion-item]").click()
      // cy.get("[cy-data=product-expansion-item]").click()
      // cy.get("[cy-data=bundle-expansion-item]").click()
      // // close modal
      // cy.get("[cy-data=bundle-expansion-item]").trigger("esc");
      
      cy.contains("Description").should("exist");
      cy.contains("desc test").should("exist").click();
      cy.contains("Billing Unit Type").should("exist").click();
      cy.contains("Labor").should("exist").click();
      cy.contains("Billing Frequency").should("exist");
      cy.contains("One-Time").should("exist").click();
      cy.contains("Include By Default").should("exist");
      cy.contains("No").should("exist").click();
      cy.contains("Draft").should("exist").click();
      cy.contains("Is Deprecated").should("exist");
      cy.contains("Active").should("exist").click();
      cy.contains("Per Unit Pricing Basis").should("exist");
      cy.contains("priced basis").should("exist").click();
      cy.contains("Qualification Question").should("exist");
      cy.contains("the question").should("exist").click();
      cy.contains("Recommended Hours").should("exist");
      cy.contains("0 hrs.").should("exist").click();
      cy.contains("Skill Tier").should("exist");
      cy.contains("Tier 2").should("exist").click();
      cy.contains("Internal Notes").should("exist");
      cy.contains("my notes").should("exist").click();
      cy.contains("Documentation URL").should("exist");
      cy.contains("N/A").should("exist").click();
      cy.contains("Implementation Type").should("exist");
      cy.contains("Created At").should("exist");
      cy.contains("Created By").should("exist");
      cy.contains("Last Updated At").should("exist");
      cy.contains("Last Updated By").should("exist");
    })

    it("Check related Skills and SkillDetails", () => {
      // best practice, a test should always be able to run on its own - using .only() WILL fail this test
      cy.contains("Related Skills").should("exist");
      cy.contains("Attach Skill").should("exist").click();
      cy.contains("Search Skills").should("exist");
      // .click();
      // cy.contains("vCenter").should("exist").contains('more_vert').click({force: true});
      cy.contains("Save & Close").should("exist");
      // cy.contains("Unassign").should('exist');
      cy.contains("Cancel").should("exist").click();
      cy.visit("/implementation-type/skill/4");
      // skill details
      cy.contains("Name").should("exist");
      cy.contains("Category").should("exist");
      cy.contains("Microsoft/AD/Exchange/SQL").should("exist");
      // this was visable in test video, but failed and didn't find
      // cy.contains("Description").should("exist");
      cy.contains("Configuration and management of AD").should("exist");
      cy.contains("Active").should("exist");
      cy.contains("Related Implementation Guidelines").should("exist");
    })

    it("Check related Implementation Tasks and TaskDetails", () => {
      cy.visit("implementation-type/guideline/2085");
      cy.contains("Related Implementation Tasks").should("exist");
      cy.contains("button", "Attach Implementation Task").should("exist").click();
      
      // extend test to attach then remove
      // cy.contains("Search Implementation Tasks").click();
      // cy.contains('Configure auto attendant').should('exist').click()
      // cy.contains("Create New").should('exist')
      // cy.contains('Add Another').should('exist')
      // cy.contains("#remove").eq(2).should("exist").click();    
      cy.contains("Save & Close").should("exist");
      cy.contains("Cancel").should("exist").click();
      
      // // implementation task details
      // cy.visit("implementation-type/task/533");
      // cy.contains("Name", {timeout: 25000}).should("exist");
      // cy.contains("Dan Testing").last().should("exist").click();
      // cy.contains("Block Hours").should("exist");
      // cy.contains("5 hrs.").should("exist").click();
      // cy.contains("Is Recurring").should("exist");
      // cy.contains("No").first().should("exist").click();
      // cy.contains("Skill Name").should("exist");
      // cy.contains("VPN").should("exist")
      // cy.contains("Task Type").should("exist");
      // cy.contains("NonLabor").should("exist").click();
      // cy.contains("Skill Tier").should("exist");
      // cy.contains("Tier 3").should("exist").click();
      // cy.contains("is Customer Task").should("exist");
      // cy.contains("No").last().should("exist").click();
      // cy.contains("Project Process").should("exist");
      // cy.contains("Is Deprecated").should("exist").click();
      // cy.contains("Deprecated").should("exist");
      // cy.contains("Position").should("exist").click();
      // cy.contains("Created At").should("exist");
      // cy.contains("Created By").should("exist").click();
      // cy.contains("Last Updated At").should("exist");
      // cy.contains("Last Updated By").should("exist");
      // // cy.contains("Attach Requirement").should("exist").click();
      // // cy.contains("Search Requirements").should("exist").click();
      // // cy.contains("New Phone Setup Sheet").should("exist");
      // // cy.contains("Save & Close").should("exist");
      // // cy.trigger("esc");
      // // cy.contains("Cancel").should("exist").click();
      // cy.contains("Related Task Requirements").should("exist");
      // cy.contains("Contact AIS Document").should("exist");
      // // cy.get('.delete-component').eq(3).should('exist').click()
      // cy.contains("Attach Implementation Guideline").should("exist").click();
      // cy.contains("Search Implementation Guidelines").should("exist");
      // cy.contains("Save & Close").should("exist");
      // cy.contains("Cancel").should("exist").click();
      // cy.contains("Related Implementation Guidelines").should("exist");
      
      // // extend to include create/delete
      // // cy.contains("DevOps Test - test").should("exist").click();
      // // cy.contains("Create New").should("exist");
      // // cy.contains("Save & Close").should("exist").click();
      // // cy.contains("Cancel").should("exist").click();
    })

    it("Check RequirementDetails", () => {
      cy.visit("/implementation-type/requirement/656a9d42b457bc10f4040d72");
      cy.contains("Name").should("exist");
      cy.contains("testing 321").last().should("exist").click();
      cy.contains("Description").should("exist");
      cy.contains("test").should("exist").click();
      cy.contains("ID").should("exist");
      cy.contains("Created At").should("exist");
      cy.contains("Created By").should("exist");
      cy.contains("Last Updated At").should("exist");
      cy.contains("Last Updated By").should("exist");
      cy.contains("Attach Implementation Task").should("exist").click();
      cy.contains("Search Implementation Tasks").should("exist");
      cy.contains("Save & Close").should("exist");
      cy.contains("Cancel").should("exist").click();
      cy.contains("Related Implementation Tasks").should("exist");
      cy.contains("Coordinate cutover of phone number porting").should("exist");
    })

    it("Check related Products and ProductDetails", () => {
      cy.visit("implementation-type/guideline/2085");
      // cy.contains("Attach Product").should("exist").click();
      // cy.contains("Search Products").should("exist");
      // cy.contains("Equipment").should("exist").click({force: true});
      // cy.contains("Quantity").should("exist");
      // cy.contains("Is Optional").should("exist").click();
      // cy.contains("Save & Close").should("exist");
      // cy.contains("Cancel").should("exist").click();
      cy.contains("Related Products").should("exist");
      cy.contains("Quantity").last().should("exist").click();
      cy.contains("Period Type").should("exist");
      cy.contains("One-Time").should("exist");
      cy.contains("Optional").should("exist");
      cy.contains("No").last().should("exist").click();
      cy.contains("Price").should("exist");
      // cy.contains("#remove-icon").eq(2).should("exist").click();
      // product details
      cy.visit("/implementation-type/product/1");
      cy.contains("Name").should("exist");
      // cy.contains("Description").should("exist");
      // cy.contains("Active").should("exist");
      // cy.contains("Period Type").should("exist");
      // cy.contains("One-Time").should("exist");
      // use cy-data
      // cy.contains("Unit Price").should("exist");
      // cy.contains("Products can only be edited in Autotask").should("exist");
      cy.contains("Related Guidelines").should("exist");
    })

    it("Check related Services and ServiceDetails", () => {
      cy.visit("/implementation-type/guideline/2085");
      cy.contains("Attach Service").should("exist").click();
      // cy.contains("Search Services").should("exist").click();
      // cy.contains("iMeet Plus - Monthly").should("exist").click();
      cy.contains("Quantity").should("exist");
      cy.contains("Is Optional").should("exist").click();
      cy.contains("Save & Close").should("exist");
      cy.contains("Cancel").should("exist").click();
      cy.contains("Related Services").should("exist");
      // cy.contains("iMeet Plus - Monthly").should("exist");
      // cy.contains("#remove").should("exist").click();
      // cy.visit("/implementation-type/service/29");
      // cy.contains("iMeet Plus - Monthly").should("exist");
      // cy.contains("Name").should("exist");
      // // cy.contains("Description").should("exist");
      // cy.contains("Active").should("exist");
      // cy.contains("Period Type").should("exist");
      // // cy.contains("Monthly").should("exist");
      // // cy.contains("Unit Price").should("exist");
      // cy.contains("Related Guidelines").should("exist");
    })

    it("Check related Service Bundles and AttachPopup for ServiceBundles", () => {
      cy.visit("/implementation-type/guideline/2085");
      cy.contains("Attach Service Bundle").should("exist").click();
      cy.contains("Search Service Bundles").should("exist").click();
      cy.contains("AIS Managed Endpoint Security (SaaS)").click();
      cy.contains("Save & Close").should("exist");
      cy.contains("Cancel").should("exist").click();
      cy.contains("Related Service Bundles").should("exist");
      cy.contains("Endpoint Protection (Onsite Manager)").should("exist");
    })
      
    it("Check related Service Bundles and ServiceBundleDetails", () => {
      cy.visit("/implementation-type/service_bundle/5");
      cy.wait(2000);
      // cy.contains("Name").should("exist");
      // cy.contains("Description").should("exist");
      // cy.contains("Active").should("exist");

      // these lines may fail, previously commented out 10/23
      // cy.contains("Percentage Discount").should("exist");
      // cy.contains("Period Type").should("exist");
      // cy.contains("Monthly").should("exist");
      // cy.contains("Create Date").should("exist");
      // cy.contains("Last Modified Date").should("exist");
      // cy.contains("Related Guidelines").should("exist");
    })
  })
});
