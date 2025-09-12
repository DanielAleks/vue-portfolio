describe("check_project_tasks", () => {
    context("Check Project Tasks Overview", () => {
        it ("Filter by Phase and Search a Task", () => {
            cy.visit("/tasks");
            cy.get('[data-cy="phase-filter"]').click();
            cy.get('[data-cy="task-search"]').click();
            cy.get('[data-cy="task-search"]').type("Dev");
            cy.contains("Development").should("exist");
        })
    })
    context("Check Project Task Details", () => {
        it("checks project tasks", () => {
            cy.visit("/task_details/9022")
            cy.wait(10000);
            // cy.contains("Adam VanDeusen").should("exist");
            // cy.contains("Priority").should("exist");
            // cy.contains("Active").should("exist");
        })
    })
})