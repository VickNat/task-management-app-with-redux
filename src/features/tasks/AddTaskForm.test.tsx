import { fireEvent, getByTestId, queryByText, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Provider } from "react-redux"
import AddTaskForm from "./AddTaskForm"
import { store } from "../../app/store"
import TasksList from "./TasksList"

/**
 * Verifying if a task can be added.
 */
describe("<AddTaskForm />", () => {
  /**
   * Call the add function when the button is clicked.
   * - Renders the AddTaskForm component with a mock add handler.
   * - Changes the input value to 'New Value'.
   * - Clicks the add task button.
   * - Expects that the add handler has been called.
   * - Clicks the delete task button.
   */
  test("Call the add function when the button is clicked", () => {
    const handleAddMock = jest.fn()

    const { getByTestId } = render(
      <Provider store={store}>
        <AddTaskForm handleAdd={handleAddMock} />
      </Provider>
    )

    const inputTask = getByTestId('addTask')
    fireEvent.change(inputTask, { target: { value: 'New Value' } })

    const button = getByTestId("addTaskButton")
    userEvent.click(button)
    expect(handleAddMock).toHaveBeenCalled()

    const deleteTaskButton = screen.queryByText('Delete')
    deleteTaskButton?.click()
  })

  /**
   * The add task button is inactive if no task is entered.
   * - Renders the AddTaskForm component with a mock add handler.
   * - Clicks the add task button without entering a task.
   * - Expects that the add handler has not been called.
   * - Clicks the delete task button.
   */
  test("The add task button is inactive if no task is entered", () => {
    const handleAddMock = jest.fn()

    const { getByTestId } = render(
      <Provider store={store}>
        <AddTaskForm handleAdd={handleAddMock} />
      </Provider>
    )

    const button = getByTestId("addTaskButton")
    userEvent.click(button)
    expect(handleAddMock).not.toHaveBeenCalled()

    const deleteTaskButton = screen.queryByText('Delete')
    deleteTaskButton?.click()
  })
})