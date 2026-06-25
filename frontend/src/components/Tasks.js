import React, { useState, useEffect } from 'react';
import { getTasks, createTask, updateTaskStatus, getProjects } from '../services/api';

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newTask, setNewTask] = useState({
    projectId: '',
    title: '',
    description: '',
    priority: 'medium',
    status: 'todo',
    estimatedHours: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [taskRes, projRes] = await Promise.all([
        getTasks(),
        getProjects()
      ]);
      setTasks(taskRes.data);
      setProjects(projRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTask({
        ...newTask,
        createdBy: '67c8f8d8b8e8a8b8c8d8e8f8', // Replace with actual user ID
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
      setShowForm(false);
      setNewTask({ projectId: '', title: '', description: '', priority: 'medium', status: 'todo', estimatedHours: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  const handleStatusUpdate = async (id, status) => {
    try {
      await updateTaskStatus(id, status);
      fetchData();
    } catch (error) {
      console.error('Error updating task status:', error);
    }
  };

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>✅ Tasks</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Task'}
        </button>
      </div>

      {showForm && (
        <div className="table-container" style={{ marginBottom: '2rem' }}>
          <h3>Create New Task</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label>Project *</label>
              <select
                required
                value={newTask.projectId}
                onChange={(e) => setNewTask({...newTask, projectId: e.target.value})}
              >
                <option value="">Select Project</option>
                {projects.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Title *</label>
              <input
                type="text"
                required
                value={newTask.title}
                onChange={(e) => setNewTask({...newTask, title: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newTask.description}
                onChange={(e) => setNewTask({...newTask, description: e.target.value})}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({...newTask, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <div className="form-group">
              <label>Estimated Hours</label>
              <input
                type="number"
                value={newTask.estimatedHours}
                onChange={(e) => setNewTask({...newTask, estimatedHours: e.target.value})}
              />
            </div>
            <button type="submit" className="btn btn-success">Create Task</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Project</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                  No tasks found.
                </td>
              </tr>
            ) : (
              tasks.map(task => (
                <tr key={task._id}>
                  <td><strong>{task.title}</strong></td>
                  <td>{task.projectId?.name || 'N/A'}</td>
                  <td>
                    <span className={`status-badge status-${task.status === 'completed' ? 'completed' : 
                      task.status === 'blocked' ? 'blocked' : 
                      task.status === 'in_progress' ? 'active' : 'pending'}`}>
                      {task.status}
                    </span>
                  </td>
                  <td>{task.priority}</td>
                  <td>
                    <select 
                      value={task.status}
                      onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
                      style={{ padding: '4px 8px', borderRadius: '4px' }}
                    >
                      <option value="todo">To Do</option>
                      <option value="in_progress">In Progress</option>
                      <option value="review">Review</option>
                      <option value="blocked">Blocked</option>
                      <option value="completed">Completed</option>
                    </select>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Tasks;