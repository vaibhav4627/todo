import React, { useState, useEffect } from 'react';
import TaskForm from './TaskForm';
import TaskList from './TaskList';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';



function App() {
  const [tasks, setTasks] = useState([]);

  // Load tasks from local storage on initial render
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      setTasks(JSON.parse(storedTasks));
    }
  }, []);

  // Save tasks to local storage whenever it changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const saveTasksToFile = () => {
    const fileContent = JSON.stringify(tasks);
    const blob = new Blob([fileContent], { type: 'application/json' });
    const downloadLink = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = downloadLink;
    a.download = 'storage.json';
    a.click();

    URL.revokeObjectURL(downloadLink);
  };

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);

  };

  const handleDeleteTask = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
  };

  const handleEditTask = (index, updatedTitle, updatedDescription) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].task = updatedTitle;
    updatedTasks[index].description = updatedDescription;
    setTasks(updatedTasks);
  };
 
  
  return (
    <div >
      <header className="header">
      <h1 >TODO List Website!</h1>
      </header>
      <TaskForm onAddTask={handleAddTask} />
      <TaskList
        tasks={tasks}
        onDeleteTask={handleDeleteTask}
        onEditTask={handleEditTask}
      />
      <br />
      <button onClick={saveTasksToFile} class="btn btn-secondary" >Download Your Task List</button>
    </div>
  );
}

export default App;