import { PayloadAction, createSlice, nanoid } from "@reduxjs/toolkit"
import { useAppSelector } from "../../app/hooks"
import { RootState } from "../../app/store"


interface Task {
  id: string
  task: string
  completed: boolean 
}

const initialState: Task[] = [
  
]

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        state.push(action.payload)
      },
      prepare: (task) => {
        return ({
          payload: {
            id: nanoid(),
            task: task,
            completed: false
          }
        })
      }
    },
    editTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        return state.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              task: action.payload.task
            };
          }
          return task;
        });
      },
      prepare: (id, edittedTask) => {
        return ({
          payload: {
            id: id,
            task: edittedTask,
            completed: false
          }
        })
      }
    },
    deleteTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        return state.filter((task) => task.id !== action.payload.id)
      },
      prepare: (id) => {
        return ({
          payload: {
            id: id,
            task: "",
            completed: false
          }
        })
      }
    },
    doneTask: {
      reducer: (state, action: PayloadAction<Task>) => {
        return state.map((task) => {
          if (task.id === action.payload.id) {
            return {
              ...task,
              completed: !task.completed
            };
          }
          return task;
        });
      },
      prepare: (id) => {
        return ({
          payload: {
            id: id,
            task: "",
            completed: false
          }
        })
      }
    }
  }
})

export const selectAllTasks = (state: RootState) => state.tasks

export const { addTask, editTask, deleteTask, doneTask } = tasksSlice.actions

export default tasksSlice.reducer
