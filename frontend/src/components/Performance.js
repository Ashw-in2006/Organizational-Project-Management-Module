import React, { useState, useEffect } from 'react';
import { getPerformance, createPerformance, getUsers } from '../services/api';

function Performance() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    userId: '',
    projectId: '',
    tasksCompleted: '',
    qualityScore: '',
    productivityScore: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await getPerformance();
      setRecords(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching performance records:', error);
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createPerformance({
        ...newRecord,
        periodStart: new Date(),
        periodEnd: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        onTimeCompletion: 85,
        totalHoursLogged: 40
      });
      setShowForm(false);
      setNewRecord({ userId: '', projectId: '', tasksCompleted: '', qualityScore: '', productivityScore: '' });
      fetchData();
    } catch (error) {
      console.error('Error creating performance record:', error);
    }
  };

  if (loading) return <div>Loading performance records...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>📈 Performance Records</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Record'}
        </button>
      </div>

      {showForm && (
        <div className="table-container" style={{ marginBottom: '2rem' }}>
          <h3>Add Performance Record</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label>User ID *</label>
              <input
                type="text"
                required
                value={newRecord.userId}
                onChange={(e) => setNewRecord({...newRecord, userId: e.target.value})}
                placeholder="Enter user ID"
              />
            </div>
            <div className="form-group">
              <label>Project ID *</label>
              <input
                type="text"
                required
                value={newRecord.projectId}
                onChange={(e) => setNewRecord({...newRecord, projectId: e.target.value})}
                placeholder="Enter project ID"
              />
            </div>
            <div className="form-group">
              <label>Tasks Completed</label>
              <input
                type="number"
                value={newRecord.tasksCompleted}
                onChange={(e) => setNewRecord({...newRecord, tasksCompleted: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Quality Score (0-100)</label>
              <input
                type="number"
                value={newRecord.qualityScore}
                onChange={(e) => setNewRecord({...newRecord, qualityScore: e.target.value})}
                min="0"
                max="100"
              />
            </div>
            <div className="form-group">
              <label>Productivity Score (0-100)</label>
              <input
                type="number"
                value={newRecord.productivityScore}
                onChange={(e) => setNewRecord({...newRecord, productivityScore: e.target.value})}
                min="0"
                max="100"
              />
            </div>
            <button type="submit" className="btn btn-success">Add Record</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>Tasks Done</th>
              <th>Quality</th>
              <th>Productivity</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {records.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                  No performance records found.
                </td>
              </tr>
            ) : (
              records.map(record => (
                <tr key={record._id}>
                  <td>{record.userId?.name || record.userId || 'N/A'}</td>
                  <td>{record.tasksCompleted || 0}</td>
                  <td>{record.qualityScore || 0}%</td>
                  <td>{record.productivityScore || 0}%</td>
                  <td>
                    <span className="status-badge status-active">
                      {record.rating || 'Pending'}
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

export default Performance;