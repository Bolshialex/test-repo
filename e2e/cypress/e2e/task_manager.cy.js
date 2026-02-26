describe("Task Manager E2E Flow", () => {
  // Before each test, we visit the frontend URL
  beforeEach(() => {
    cy.visit("/");
  });

  it("should successfully load the application", () => {
    cy.contains("h1", "Task Manager").should("be.visible");
  });

  it("should allow a user to create and then delete a task", () => {
    const taskName = "My First Cypress Task";

    // 1. CREATE TASK
    // Find the input field, type the task name, and hit enter
    cy.get('input[placeholder="New task"]').type(taskName);
    cy.contains("button", "Add Task").click();

    // Verify the UI updated and the task is visible in the list
    cy.contains("li", taskName).should("be.visible");

    // Verify the input field cleared out
    cy.get('input[placeholder="New task"]').should("have.value", "");

    // 2. DELETE TASK
    // Find the list item containing our specific task, then find the Delete button inside it and click
    cy.contains("li", taskName).find("button").contains("Delete").click();

    // Verify the task is no longer in the DOM
    cy.contains("li", taskName).should("not.exist");
  });
});
