import React from 'react';
import './App.css';
import TasksList from './features/tasks/TasksList';
import AddTaskForm from './features/tasks/AddTaskForm';

const App: React.FC = () => {
  return (
    <div className='flex flex-col items-center mt-32'>
      <h1 className='text-3xl font-bold text-green-500 py-5 shadow-md px-2 mb-2 rounded-md'>Task Manager</h1>
      <AddTaskForm />
      <TasksList />
    </div>
  );
}

export default App;
