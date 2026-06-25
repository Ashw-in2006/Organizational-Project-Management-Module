import React, { useState, useEffect } from 'react';
import { getTimeLogs, createTimeLog, getTasks } from '../services/api';

function TimeLogs() {
  const [timeLogs, setTimeLogs] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [newLog, setNewLog] = useState({
    taskId: '',
    hours: '',
    minutes: '0',
    description: '',
    type: 'regular'
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [logRes, taskRes] = await Promise.all([
        getTimeLogs(),
        getTasks()
      ]);
      setTimeLogs(logRes.data);
      setTasks(taskRes.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await createTimeLog({
        ...newLog,
        userId: '67c8f8d8b8e8a8b8c8d8e8f8', // Replace with actual user ID
        projectId: '67c8f8d8b8e8a8b8c8d8e8f8', // Replace with actual project ID
        date: new Date(),
        billable: true
      });
      setShowForm(false);
      setNewLog({ taskId: '', hours: '', minutes: '0', description: '', type: 'regular' });
      fetchData();
    } catch (error) {
      console.error('Error creating time log:', error);
    }
  };

  if (loading) return <div>Loading time logs...</div>;

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
        <h2>⏱️ Time Logs</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Log Time'}
        </button>
      </div>

      {showForm && (
        <div className="table-container" style={{ marginBottom: '2rem' }}>
          <h3>Log Time</h3>
          <form onSubmit={handleCreate}>
            <div className="form-group">
              <label>Task *</label>
              <select
                required
                value={newLog.taskId}
                onChange={(e) => setNewLog({...newLog, taskId: e.target.value})}
              >
                <option value="">Select Task</option>
                {tasks.map(t => (
                  <option key={t._id} value={t._id}>{t.title}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Hours *</label>
              <input
                type="number"
                required
                value={newLog.hours}
                onChange={(e) => setNewLog({...newLog, hours: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Minutes</label>
              <input
                type="number"
                value={newLog.minutes}
                onChange={(e) => setNewLog({...newLog, minutes: e.target.value})}
                min="0"
                max="59"
              />
            </div>
            <div className="form-group">
              <label>Description</label>
              <input
                type="text"
                value={newLog.description}
                onChange={(e) => setNewLog({...newLog, description: e.target.value})}
              />
            </div>
            <button type="submit" className="btn btn-success">Log Time</button>
          </form>
        </div>
      )}

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Task</th>
              <th>Hours</th>
              <th>Description</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {timeLogs.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>
                  No time logs found.
                </td>
              </tr>
            ) : (
              timeLogs.map(log => (
                <tr key={log._id}>
                  <td>{log.taskId?.title || 'N/A'}</td>
                  <td>{log.hours}h {log.minutes}m</td>
                  <td>{log.description || '-'}</td>
                  <td>{log.type}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TimeLogs;