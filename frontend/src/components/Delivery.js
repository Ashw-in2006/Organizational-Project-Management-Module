import React, { useState, useEffect } from 'react';
import { getDeliveries, createDelivery, getProjects } from '../services/api';

function Delivery() {
  const [deliveries, setDeliveries] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newDelivery, setNewDelivery] = useState({
    projectId: '',
    deliveryName: '',
    deliveryType: 'milestone',
    status: 'planned',
    description: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [delRes, projRes] = await Promise.all([
        getDeliveries(),
        getProjects()
      ]);
      setDeliveries(delRes.data);
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
      await createDelivery({
        ...newDelivery,
        deliveryOwner: '67c8f8d8b8e8a8b8c8d8e8f8', // Replace with actual user ID
        plannedDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000)
      });
      setShowForm(false);
      setNewDelivery({ projectId: '', deliveryName: '', deliveryType: 'milestone', status: 'planned', description: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating delivery:', error);
    }
  };

  if (loading) return <div>Loading deliveries...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>📦 Project Deliveries</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ New Delivery'}
        </button>
      </div>

      {showForm && (
        <div className="table-container" style={{ marginBottom: '2rem' }}>
          <h3>Create New Delivery</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label>Project *</label>
              <select
                required
                value={newDelivery.projectId}
                onChange={(e) => setNewDelivery({...newDelivery, projectId: e.target.value})}
              >
                <option value="">Select Project</option>
                {projects.map(p => (
                  <option key={p._id} value={p._id}>{p.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Delivery Name *</label>
              <input
                type="text"
                required
                value={newDelivery.deliveryName}
                onChange={(e) => setNewDelivery({...newDelivery, deliveryName: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <textarea
                value={newDelivery.description}
                onChange={(e) => setNewDelivery({...newDelivery, description: e.target.value})}
                rows="3"
              />
            </div>
            <div className="form-group">
              <label>Type</label>
              <select
                value={newDelivery.deliveryType}
                onChange={(e) => setNewDelivery({...newDelivery, deliveryType: e.target.value})}
              >
                <option value="milestone">Milestone</option>
                <option value="phase">Phase</option>
                <option value="final">Final</option>
                <option value="update">Update</option>
              </select>
            </div>
            <div className="form-group">
              <label>Status</label>
              <select
                value={newDelivery.status}
                onChange={(e) => setNewDelivery({...newDelivery, status: e.target.value})}
              >
                <option value="planned">Planned</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <button type="submit" className="btn btn-success">Create Delivery</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Delivery</th>
              <th>Project</th>
              <th>Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {deliveries.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                  No deliveries found.
                </td>
              </tr>
            ) : (
              deliveries.map(delivery => (
                <tr key={delivery._id}>
                  <td><strong>{delivery.deliveryName}</strong></td>
                  <td>{delivery.projectId?.name || 'N/A'}</td>
                  <td>{delivery.deliveryType}</td>
                  <td>
                    <span className={`status-badge status-${delivery.status === 'completed' ? 'completed' : 
                      delivery.status === 'in_progress' ? 'active' : 'pending'}`}>
                      {delivery.status}
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

export default Delivery;