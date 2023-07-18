import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import './TaskForm.css';
import 'tailwindcss/tailwind.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function TaskForm({ onAddTask }) {
  const [task, setTask] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [priority, setPriority] = useState('');
  const [progress, setProgress] = useState('');
  const [showPopup, setShowPopup] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      task,
      description,
      deadline,
      priority,
      progress,
    };
    if (isDeadlineExpired() && (progress === 'Inprogress' || progress === 'Not Started')) {
      setShowPopup(true);
    } else {
      onAddTask(newTask);
      setTask('');
      setDescription('');
      setDeadline('');
      setPriority('');
      setProgress('');
    }
  };

  const isDeadlineExpired = () => {
    const today = new Date();
    const selectedDeadline = new Date(deadline);
    return selectedDeadline < today;
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <div>
      <h2>Add New Task</h2><br /><br />
      <form onSubmit={handleSubmit} className="form-indent color">
        <label>Task:</label>< br/>
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <br /><br />
        <label>Description:</label><br />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <br /><br />
        <label>Deadline:</label><br />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
        />
        <br /><br />
        <label>
          Priority:
          <select
            className="form-select"
            id="priority"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            <option value="">Select Priority</option>
            <option value="most-important">Most Important</option>
            <option value="less-important">Less Important</option>
            <option value="least-important">Least Important</option>
          </select>
        </label>
        <br /><br />
        <label>
          Progress:
          <select
            className="form-select"
            id="progress"
            value={progress}
            onChange={(e) => setProgress(e.target.value)}
          >
            <option value="">Select Progress</option>
            <option value="Completed">Completed</option>
            <option value="Inprogress">Inprogress</option>
            <option value="Not Started">Not Started</option>
          </select>
        </label>
        <br /><br />
        <button type="submit" class="btn btn-success">Add</button>
      </form>
      <br /><br />
      {/* Popup */}
      <Modal show={showPopup} onHide={handleClosePopup}>
        <Modal.Header closeButton>
          <Modal.Title>Incomplete Task</Modal.Title>
        </Modal.Header>
        <Modal.Body className="color">
          <p>The task you are entering has already reached its deadline . Please check the</p>
          <p>Task: {task}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClosePopup}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default TaskForm;