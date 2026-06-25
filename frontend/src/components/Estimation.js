import React, { useState, useEffect } from 'react';
import { getEstimations, createEstimation, getProjects } from '../services/api';

function Estimation() {
  const [estimations, setEstimations] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newEstimation, setNewEstimation] = useState({
    projectId: '',
    estimatedHours: '',
    estimatedCost: '',
    status: 'draft'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [estRes, projRes] = await Promise.all([
        getEstimations(),
        getProjects()
      ]);
      setEstimations(estRes.data);
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
      await createEstimation({
        ...newEstimation,
        estimatedBy: '67c8f8d8b8e8a8b8c8d8e8f8', // Replace with actual user ID
        estimatedStartDate: new Date(),
        estimatedEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
      });
      setShowForm(false);
      setNewEstimation({ projectId: '', estimatedHours: '', estimatedCost: '', status: 'draft' });
      fetchData();
    } catch (error) {
      console.error('Error creating estimation:', error);
    }
  };

  if (loading) return <div>Loading estimations...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>💰 Estimations</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Estimation'}
        </button>
      </div>

      {showForm && (
        <div className="table-container" style={{ marginBottom: '2rem' }}>
          <h3>Create New Estimation</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label>Project *</label>
              <select
                required
                value={newEstimation.projectId}
                onChange={(e) => setNewEstimation({...newEstimation, projectId: e.target.value})}
              >
                <option value="">Select Project</option>
                {projects.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Estimated Hours *</label>
              <input
                type="number"
                required
                value={newEstimation.estimatedHours}
                onChange={(e) => setNewEstimation({...newEstimation, estimatedHours: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Estimated Cost ($) *</label>
              <input
                type="number"
                required
                value={newEstimation.estimatedCost}
                onChange={(e) => setNewEstimation({...newEstimation, estimatedCost: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={newEstimation.status}
                onChange={(e) => setNewEstimation({...newEstimation, status: e.target.value})}
              >
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="approved">Approved</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">Create Estimation</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Project</th>
              <th>Hours</th>
              <th>Cost ($)</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {estimations.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                  No estimations found.
                </td>
              </tr>
            ) : (
              estimations.map(est => (
                <tr key={est._id}>
                  <td>{est.projectId?.name || 'N/A'}</td>
                  <td>{est.estimatedHours}</td>
                  <td>${est.estimatedCost}</td>
                  <td>
                    <span className={`status-badge status-${est.status === 'approved' ? 'completed' : 'pending'}`}>
                      {est.status}
                    </span>
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

export default Estimation;