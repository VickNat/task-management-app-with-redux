import React, { useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { deleteTask, doneTask, editTask, selectAllTasks } from './tasksSlice'

interface Props {
  taskId: string
}

const SingleTask: React.FC<Props> = ({ taskId }) => {

  const [edit, setEdit] = useState(false)
  const [del, setDel] = useState(false)

  const tasks = useAppSelector(selectAllTasks)
  const dispatch = useAppDispatch()

  // find the task with the given taskId
  const task = tasks.find(task => task.id === taskId)
  const [edittedTask, setEdittedTask] = useState(task?.task)

  console.log(task?.task);

  const editHandler = () => {
    if (edittedTask) {
      dispatch(editTask(taskId, edittedTask))
    }

    setEdit(!edit)
  }

  const deleteHandler = () => {
    dispatch(deleteTask(taskId))
    setDel(!del)
  }

  const doneHandler = () => {
    dispatch(doneTask(taskId))
  }

  return (
    <form>
      <div className='flex my-2 shadow-sm py-2 px-4 bg-gray-200'>
        <div className='flex-auto'>
          {
            edit ? (
              <>
                <input
                  name='editInput'
                  id='editInput'
                  value={edittedTask}
                  onChange={(e) => setEdittedTask(e.target.value)}
                />

                <button className='btn' type='button' onClick={editHandler}>Done</button>
              </>
            ) : (
              task?.completed ? (
                <span className='text-gray-700 line-through taskSpan'>{task.task}</span>
              ) : (
                <span className='text-black taskSpan'>{task?.task}</span>
              )
            )
          }
        </div>

        <div className='flex-auto'>
          {
            !del ? (
              <>
                <button
                  type='button'
                  onClick={doneHandler}
                  className='btn mx-3'
                  id='doneButton'
                  data-testid="doneTask"
                >
                  Done
                </button>
                <button
                  type='button'
                  onClick={
                    () => {
                      if (edit == false) {
                        setEdit(!edit)
                      }
                    }
                  }
                  className='btn mr-3'
                >
                  Edit
                </button>
                <button
                data-testid="delete"
                  id='deleteButton'
                  type='button'
                  onClick={deleteHandler}
                  className='px-4 rounded-md text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500'
                >
                  Delete
                </button>
              </>
            ) : (
              <></>
            )
          }
        </div>
      </div>
    </form>
  )
}

export default SingleTask