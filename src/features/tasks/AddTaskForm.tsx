import React, { useState } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { addTask } from './tasksSlice'

const AddTaskForm: React.FC = () => {

  const [task, setTask] = useState("")

  const dispatch = useAppDispatch()

  /**
   * Dispatch the action to the store
   */
  const handleAddTask = () => {
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
          className="input"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          placeholder='Add a task'
        />
        <button
          className="btn"
          type="button"
          onClick={handleAddTask}
          disabled={!canAdd}
        >Add Task</button>
      </form>
    </div>
  )
}

export default AddTaskForm