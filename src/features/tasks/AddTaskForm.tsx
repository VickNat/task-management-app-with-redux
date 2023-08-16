import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { addTask } from './tasksSlice'

interface Props {
  handleAdd: () => void
}

const AddTaskForm: React.FC<Props> = ({ handleAdd }) => {

  const [task, setTask] = useState("")

  const dispatch = useAppDispatch()

  /**
   * Dispatch the action to the store
   */
  const handleAddTask = () => {
    handleAdd()
    if (task) {
      dispatch(addTask(task))
    }
    
    setTask('')
  }
  
  const canAdd = Boolean(task)  

  return (
    <div className='my-3 px-3 py-4'>
      <form>
        <input
          name='addTask'
          id='addTask'
          data-testid='addTask'
          className="input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='Add a task'
        />
        <button
          className="btn"
          id='addTaskButton'
          data-testid='addTaskButton'
          type="button"
          onClick={handleAddTask}
          disabled={!canAdd}
        >Add Task</button>
      </form>
    </div>
  )
}

export default AddTaskForm