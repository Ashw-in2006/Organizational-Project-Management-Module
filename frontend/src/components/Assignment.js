import React, { useState, useEffect } from 'react';
import { getTeamMembers, createTeamMember, getProjects } from '../services/api';

function Assignment() {
  const [assignments, setAssignments] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newAssignment, setNewAssignment] = useState({
    projectId: '',
    userId: '',
    role: '',
    allocationPercentage: '100'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [assignRes, projRes] = await Promise.all([
        getTeamMembers(),
        getProjects()
      ]);
      setAssignments(assignRes.data);
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
      await createTeamMember({
        ...newAssignment,
        userId: '67c8f8d8b8e8a8b8c8d8e8f8', // Replace with actual user ID
        joinedDate: new Date()
      });
      setShowForm(false);
      setNewAssignment({ projectId: '', userId: '', role: '', allocationPercentage: '100' });
      fetchData();
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  if (loading) return <div>Loading assignments...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>👥 Team Assignments</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Assign Team Member'}
        </button>
      </div>

      {showForm && (
        <div className="table-container" style={{ marginBottom: '2rem' }}>
          <h3>Assign Team Member</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label>Project *</label>
              <select
                required
                value={newAssignment.projectId}
                onChange={(e) => setNewAssignment({...newAssignment, projectId: e.target.value})}
              >
                <option value="">Select Project</option>
                {projects.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>User ID *</label>
              <input
                type="text"
                required
                value={newAssignment.userId}
                onChange={(e) => setNewAssignment({...newAssignment, userId: e.target.value})}
                placeholder="Enter user ID"
              />
            </div>
            <div className="form-group">
              <label>Role *</label>
              <input
                type="text"
                required
                value={newAssignment.role}
                onChange={(e) => setNewAssignment({...newAssignment, role: e.target.value})}
                placeholder="e.g., Developer, Designer, PM"
              />
            </div>
            <div className="form-group">
              <label>Allocation %</label>
              <input
                type="number"
                value={newAssignment.allocationPercentage}
                onChange={(e) => setNewAssignment({...newAssignment, allocationPercentage: e.target.value})}
                min="0"
                max="100"
              />
            </div>
            <button type="submit" className="btn btn-success">Assign</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>User</th>
              <th>Role</th>
              <th>Allocation</th>
            </tr>
          </thead>
          <tbody>
            {assignments.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                  No team members assigned.
                </td>
              </tr>
            ) : (
              assignments.map(assignment => (
                <tr key={assignment._id}>
                  <td>{assignment.projectId?.name || 'N/A'}</td>
                  <td>{assignment.userId?.name || assignment.userId || 'N/A'}</td>
                  <td>{assignment.role}</td>
                  <td>{assignment.allocationPercentage}%</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Assignment;