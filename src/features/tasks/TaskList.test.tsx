import { fireEvent, getByTestId, queryByTestId, queryByText, render, screen } from "@testing-library/react";
import { Provider } from "react-redux"
import AddTaskForm from "./AddTaskForm"
import TasksList from "./TasksList"
import { store } from "../../app/store"
import userEvent from "@testing-library/user-event"
import '@testing-library/jest-dom/extend-expect';

/**
 * Test cases for <TaskList/> component.
 */
describe("<TaskList/>", () => {
  /**
   * Test if contents are being displayed properly.
   * Steps:
   * 1. Render the <AddTaskForm/> and <TasksList/> components wrapped in a <Provider> with the store.
   * 2. Get the input field for adding a task by test ID.
   * 3. Fire a change event on the input field to enter a new value.
   * 4. Get the add task button by test ID and click it.
   * 5. Query for the task with the new value in the DOM.
   * 6. Expect the task to be defined, indicating that it is displayed properly.
   * 7. Get the delete task button by text and click it.
   */
  test("Check if contents are being displayed properly", () => {
    const handleAddMock = jest.fn()

    const { getByTestId }: any = render(
      <Provider store={store}>
        <AddTaskForm handleAdd={handleAddMock} />
        <TasksList />
      </Provider>
    )

    const inputTask = getByTestId('addTask')
    fireEvent.change(inputTask, { target: { value: 'New Value' } })

    const button = getByTestId("addTaskButton")
    userEvent.click(button)

    const task = screen.queryByText('New Value', { exact: false })
    expect(task).toBeDefined()

    const deleteTaskButton = screen.queryByText('Delete')
    deleteTaskButton?.click()
  })

  /**
   * Test if completing a task works properly.
   * Steps:
   * 1. Render the <AddTaskForm/> and <TasksList/> components wrapped in a <Provider> with the store.
   * 2. Get the input field for adding a task by test ID.
   * 3. Fire a change event on the input field to enter a new value.
   * 4. Get the add task button by test ID and click it.
   * 5. Get all "Done" buttons in the DOM.
   * 6. Click the second "Done" button if it exists, otherwise click the first one.
   * 7. Query for the task with the new value in the DOM.
   * 8. Expect the task to have the proper style indicating it is completed.
   * 9. Get the delete task button by text and click it.
   */
  test("Check if completing a task works properly", () => {
    const handleAddMock = jest.fn()

    const { getByTestId }: any = render(
      <Provider store={store}>
        <AddTaskForm handleAdd={handleAddMock} />
        <TasksList />
      </Provider>
    )

    const inputTask = getByTestId('addTask')
    fireEvent.change(inputTask, { target: { value: 'New Value' } })

    const addTaskButton = getByTestId("addTaskButton")
    userEvent.click(addTaskButton)

    const doneTaskButton = screen.queryAllByText("Done")
    doneTaskButton[1] ? doneTaskButton[1].click() : doneTaskButton[0].click()
    const task = screen.queryByText("New Value", { exact: false })
    expect(task).toHaveStyle('color: rgb(55 65 81)')

    const deleteTaskButton = screen.queryByText('Delete')
    deleteTaskButton?.click()
  })
})

/**
 * Test cases for <SingleTask/> component.
 */
describe('<SingleTask/>', () => {
  /**
   * Test if deleting a task works properly.
   * Steps:
   * 1. Render the <AddTaskForm/> component wrapped in a <Provider> with the store.
   * 2. Get the add task button by test ID and click it.
   * 3. Expect the handleAddMock function not to have been called.
   * 4. Get the delete task button by text and click it.
   * 5. Query for the task with the new value in the DOM.
   * 6. Expect the task to be null, indicating it has been deleted.
   */
  test("Ensure deleting a task works properly", () => {
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

    const task = screen.queryByText("New Value")
    expect(task).toBeNull()
  })
})