/**
 * Basic functionality tests for the task management application.
 */

describe("Basic functionality tests", () => {
  beforeEach(() => {
    // Visit the application homepage
    cy.visit('/')

    // Write a new task on input
    cy.get('#addTask').type('New task test!')
    cy.get('#addTask').should('have.value', 'New task test!')

    // Add new task
    cy.get('#addTaskButton').click()
    cy.contains('New task test!')
  })

  /**
   * Test if completing a task works properly.
   * Steps:
   * 1. Click the "Done" button of the task.
   * 2. Expect the task text to have a "line-through" text decoration.
   */
  it("Complete a task", () => {
    cy.get('#doneButton').click()
    cy.get('.taskSpan').should('have.css', 'text-decoration-line', 'line-through')
  })

  /**
   * Test if deleting a task works properly.
   * Steps:
   * 1. Click the "Delete" button of the task.
   * 2. Expect the task element to not exist in the DOM.
   */
  it("Delete a task", () => {
    cy.get('#deleteButton').click()
    cy.get('.taskSpan').should('not.exist')
  })

  /**
   * Test adding an empty task.
   * Steps:
   * 1. Expect the "Add Task" button to be disabled.
   */
  it("Adding empty task", () => {
    // To check whether or not it's possible to add a new task with an empty value
    cy.get('#addTaskButton').should('be.disabled')
  })
})

/**
 * Tests for filtering tasks based on their completed state.
 */
describe("Test filtering tasks based on completed state", () => {
  beforeEach(() => {
    // Visit the application homepage
    cy.visit('/')

    // Write a new task on input
    cy.get('#addTask').type('New task test!')
    cy.get('#addTask').should('have.value', 'New task test!')

    // Add new task
    cy.get('#addTaskButton').click()
    cy.contains('New task test!')

    // Filter all of the tasks
    cy.get('#allTasksButton').click()
    cy.get('.taskSpan').should('exist')
  })

  /**
   * Test filtering for incomplete tasks.
   * Steps:
   * 1. Click the "Incomplete Tasks" button to filter incomplete tasks.
   * 2. Expect the task elements to exist in the DOM.
   * 3. Click the "Complete Tasks" button to filter complete tasks.
   * 4. Expect the task elements to not exist in the DOM.
   */
  it("Incomplete task filtering", () => {
    cy.get('#incompleteTasksButton').click()
    cy.get('.taskSpan').should('exist')

    cy.get('#completeTasksButton').click()
    cy.get('.taskSpan').should('not.exist')
  })

  /**
   * Test filtering for completed tasks.
   * Steps:
   * 1. Click the "Done" button of the task to mark it as completed.
   * 2. Expect the task text to have a "line-through" text decoration.
   * 3. Click the "Complete Tasks" button to filter complete tasks.
   * 4. Expect the task elements to exist in the DOM.
   * 5. Click the "Incomplete Tasks" button to filter incomplete tasks.
   * 6. Expect the task elements to not exist in the DOM.
   */
  it("Complete task filtering", () => {
    cy.get('#doneButton').click()
    cy.get('.taskSpan').should('have.css', 'text-decoration-line', 'line-through')

    cy.get('#completeTasksButton').click()
    cy.get('.taskSpan').should('exist')

    cy.get('#incompleteTasksButton').click()
    cy.get('.taskSpan').should('not.exist')
  })
})