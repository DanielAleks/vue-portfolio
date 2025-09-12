// should be dynamically clicking each editable field. Add data-cy to all the inputs and assign the string based on the originalName. Then call those fields here.

describe("check_voip_provisioning", () => {
    context("Check VoIP Provisioning Overview", () => {
        it ("Filter by Phase and Search a Task", () => {
            cy.visit("/voip-provisioning");
        })
    },)

    context("Check VoIP Provisioning Details", () => {
        it("checks voip provisioning", () => {
            cy.visit("/voip/phone/5f6285675e7750229d1c3d08");
            cy.wait(10000);
            // cy.contains("Priority").should("exist");
            // cy.contains("Active").should("exist");
        })
    })
});