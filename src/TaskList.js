import 'bootstrap/dist/css/bootstrap.min.css';
import 'tailwindcss/tailwind.css';


import React, { useState } from 'react';
import './TaskForm.css';
import './TaskList.css';



function TaskList({ tasks, onDeleteTask, onEditTask }) {
  const [editIndex, setEditIndex] = useState(-1);
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');

  const handleEditTask = (index) => {
    setEditIndex(index);
    setEditTitle(tasks[index].task);
    setEditDescription(tasks[index].description);
  };

  const handleSaveTask = (index) => {
    onEditTask(index, editTitle, editDescription);
    setEditIndex(-1);
    setEditTitle('');
    setEditDescription('');
  };

  const handleCancelEdit = () => {
    setEditIndex(-1);
    setEditTitle('');
    setEditDescription('');
  };

  const handleDeleteTask = (index) => {
    onDeleteTask(index);
  };

  // Sort tasks based on priority and deadline
  const sortedTasks = tasks.sort((taskA, taskB) => {
    if (taskA.priority === taskB.priority) {
      return new Date(taskA.deadline) - new Date(taskB.deadline);
    } else {
      const priorityOrder = {
        'most-important': 1,
        'less-important': 2,
        'least-important': 3,
      };
      return priorityOrder[taskA.priority] - priorityOrder[taskB.priority];
    }
  });

  return (
    <div className="task-list-container">
      <h2 className="task-list-heading">Task List</h2>
      <div className="card-group task">
        {sortedTasks.map((task, index) => (
          <div className="card task" style={{ width: '18rem' }} key={index}>
            <div className="card-body">
              <h5 className="card-title task-title">{task.task}</h5>
              <p className="card-text task-title">{task.description}</p>
              <p className="card-text task-title">Deadline: {task.deadline}</p>
              <p className="card-text task-title">Priority: {task.priority}</p>
              <p className="card-text task-title">Progress: {task.progress}</p>
              <button
                className="btn btn-danger mr-2"
                onClick={() => handleDeleteTask(index)}
              >
                Delete
              </button>
              <button
                className="btn btn-primary"
                onClick={() => handleEditTask(index)}
              >
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>


      {/* Modal */}
      {editIndex !== -1 && (
        <div className="modal" style={{ display: 'block' }}>
          {/* ... modal content */}

          <div className="modal-dialog color">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Edit Task</h5>
                <button
                  type="button"
                  className="close"
                  onClick={handleCancelEdit}
                >
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="editTitle" className="form-label">
                    Task Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="editTitle"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="editDescription" className="form-label">
                    Task Description
                  </label>
                  <textarea
                    className="form-control"
                    id="editDescription"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-primary"
                  onClick={() => handleSaveTask(editIndex)}
                >
                  Save
                </button>
                <button className="btn btn-secondary" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <a href="#_" className="px-5 py-2.5 relative rounded group font-medium text-white font-medium inline-block">
      <span className="absolute top-0 left-0 w-full h-full rounded opacity-50 filter blur-sm bg-gradient-to-br from-purple-600 to-blue-500"></span>
      <span className="h-full w-full inset-0 absolute mt-0.5 ml-0.5 bg-gradient-to-br filter group-active:opacity-0 rounded opacity-50 from-purple-600 to-blue-500"></span>
      <span className="absolute inset-0 w-full h-full transition-all duration-200 ease-out rounded shadow-xl bg-gradient-to-br filter group-active:opacity-0 group-hover:blur-sm from-purple-600 to-blue-500"></span>
      <span className="absolute inset-0 w-full h-full transition duration-200 ease-out rounded bg-gradient-to-br to-purple-600 from-blue-500"></span>
      <span className="relative">Button Text</span>
    </a>
              </div>
              
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default TaskList;