import React, { useEffect, useState } from 'react'
import { useAppSelector } from '../../app/hooks'
import { selectAllTasks } from './tasksSlice'
import SingleTask from './SingleTask'

const TasksList: React.FC = () => {

  const tasks = useAppSelector(selectAllTasks)
  const [tasksToDisplay, setTasksToDisplay] = useState(tasks.slice())

  // useEffect is used to let the tasks upto date with the global stored state
  useEffect(() => {
    setTasksToDisplay(tasks)
  }, [tasks])

  /**
   * This makes use of an additional state to know which tasks to display
   * @param e 
   * @param button to specify which tasks to display
   */
  const displayHandler = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, button: string) => {
    e.preventDefault()
    if (button === "button1") {
      setTasksToDisplay(tasks.map(task => task))
    } else if (button === "button2") {
      setTasksToDisplay(tasks.filter(task => task.completed === true))
    } else {
      setTasksToDisplay(tasks.filter(task => task.completed !== true))
    }
  }

  /**
   * Render taskstodisplay
   */
  const renderedTasks = tasksToDisplay.map((task) => (
    <li key={task.id} className='taskItem'>
      <SingleTask taskId={task.id} />
    </li>
  ))


  return (
    <div>
      <div className='mb-4 w-full flex justify-center'>
        <button
          id='allTasksButton'
          className='btn'
          type='button'
          onClick={(e) => (displayHandler(e, "button1"))}
        >All tasks</button>
        <button
          id='completeTasksButton'
          className='btn ml-3'
          type='button'
          onClick={(e) => (displayHandler(e, "button2"))}
        >Completed</button>
        <button
          id='incompleteTasksButton'
          className='btn ml-3'
          type='button'
          onClick={(e) => (displayHandler(e, "button3"))}
        >Incomplete</button>
      </div>
      <ul className='flex flex-col items-start ' id='taskList'>
        {renderedTasks}
      </ul>
    </div>
  )
}

export default TasksList