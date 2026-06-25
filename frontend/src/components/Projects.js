import React, { useState, useEffect } from 'react';
import { getProjects, createProject, deleteProject } from '../services/api';

function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    description: '',
    clientName: '',
    status: 'planned',
    priority: 'medium'
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await getProjects();
      setProjects(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching projects:', error);
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createProject({
        ...newProject,
        startDate: new Date()
      });
      setShowForm(false);
      setNewProject({ name: '', description: '', clientName: '', status: 'planned', priority: 'medium' });
      fetchProjects();
    } catch (error) {
      console.error('Error creating project:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject(id);
        fetchProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
      }
    }
  };

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>📋 Projects</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Project'}
        </button>
      </div>

      {showForm && (
        <div className="table-container" style={{ marginBottom: '2rem' }}>
          <h3>Create New Project</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label>Project Name *</label>
              <input
                type="text"
                required
                value={newProject.name}
                onChange={(e) => setNewProject({...newProject, name: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Client Name</label>
              <input
                type="text"
                value={newProject.clientName}
                onChange={(e) => setNewProject({...newProject, clientName: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={newProject.status}
                onChange={(e) => setNewProject({...newProject, status: e.target.value})}
              >
                <option value="planned">Planned</option>
                <option value="active">Active</option>
                <option value="on_hold">On Hold</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label>Priority</label>
              <select
                value={newProject.priority}
                onChange={(e) => setNewProject({...newProject, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">Create Project</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Client</th>
              <th>Status</th>
              <th>Priority</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                  No projects found. Create your first project!
                </td>
              </tr>
            ) : (
              projects.map(project => (
                <tr key={project._id}>
                  <td><strong>{project.name}</strong></td>
                  <td>{project.clientName || '-'}</td>
                  <td>
                    <span className={`status-badge status-${project.status === 'completed' ? 'completed' : 
                      project.status === 'on_hold' ? 'blocked' : 
                      project.status === 'active' ? 'active' : 'pending'}`}>
                      {project.status}
                    </span>
                  </td>
                  <td>{project.priority}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(project._id)}>
                      Delete
                    </button>
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

export default Projects;