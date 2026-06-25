// frontend/src/components/Reports.js
import React, { useState, useEffect } from 'react';
// Remove unused import - getReports is not needed
import { getProjects, getTasks, getTimeLogs } from '../services/api';

function Reports() {
  const [reportData, setReportData] = useState({
    projects: [],
    tasks: [],
    timeLogs: []
  });
  const [loading, setLoading] = useState(true);
  const [reportType, setReportType] = useState('overview');

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projRes, taskRes, logRes] = await Promise.all([
        getProjects(),
        getTasks(),
        getTimeLogs()
      ]);
      setReportData({
        projects: projRes.data,
        tasks: taskRes.data,
        timeLogs: logRes.data
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching report data:', error);
      setLoading(false);
    }
  };

  const calculateStats = () => {
    const totalProjects = reportData.projects.length;
    const activeProjects = reportData.projects.filter(p => p.status === 'active').length;
    const completedProjects = reportData.projects.filter(p => p.status === 'completed').length;
    const totalTasks = reportData.tasks.length;
    const completedTasks = reportData.tasks.filter(t => t.status === 'completed').length;
    const totalHours = reportData.timeLogs.reduce((sum, log) => sum + (log.hours || 0), 0);

    return {
      totalProjects,
      activeProjects,
      completedProjects,
      totalTasks,
      completedTasks,
      totalHours,
      completionRate: totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0
    };
  };

  if (loading) return <div>Loading reports...</div>;

  const stats = calculateStats();

  return (
    <div>
      <h2>📊 Reports & Analytics</h2>

      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button 
            className={`btn ${reportType === 'overview' ? 'btn-primary' : ''}`}
            onClick={() => setReportType('overview')}
          >
            Overview
          </button>
          <button 
            className={`btn ${reportType === 'projects' ? 'btn-primary' : ''}`}
            onClick={() => setReportType('projects')}
          >
            Projects
          </button>
          <button 
            className={`btn ${reportType === 'tasks' ? 'btn-primary' : ''}`}
            onClick={() => setReportType('tasks')}
          >
            Tasks
          </button>
          <button 
            className={`btn ${reportType === 'productivity' ? 'btn-primary' : ''}`}
            onClick={() => setReportType('productivity')}
          >
            Productivity
          </button>
        </div>
      </div>

      {reportType === 'overview' && (
        <>
          <div className="dashboard-stats">
            <div className="stat-card">
              <h3>Total Projects</h3>
              <div className="number">{stats.totalProjects}</div>
              <small>{stats.activeProjects} active</small>
            </div>
            <div className="stat-card">
              <h3>Total Tasks</h3>
              <div className="number">{stats.totalTasks}</div>
              <small>{stats.completedTasks} completed</small>
            </div>
            <div className="stat-card">
              <h3>Completion Rate</h3>
              <div className="number">{stats.completionRate}%</div>
              <small>{stats.completedProjects} projects done</small>
            </div>
            <div className="stat-card">
              <h3>Total Hours Logged</h3>
              <div className="number">{stats.totalHours}h</div>
              <small>Across all projects</small>
            </div>
          </div>

          <div className="table-container">
            <h3>Project Status Distribution</h3>
            <div style={{ padding: '1rem' }}>
              {reportData.projects.map(project => (
                <div key={project._id} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #ecf0f1'
                }}>
                  <span>{project.name}</span>
                  <span className={`status-badge status-${project.status === 'completed' ? 'completed' : 
                    project.status === 'on_hold' ? 'blocked' : 
                    project.status === 'active' ? 'active' : 'pending'}`}>
                    {project.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {reportType === 'projects' && (
        <div className="table-container">
          <h3>Project Details</h3>
          <table>
            <thead>
              <tr>
                <th>Project</th>
                <th>Client</th>
                <th>Status</th>
                <th>Priority</th>
              </tr>
            </thead>
            <tbody>
              {reportData.projects.map(project => (
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
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {reportType === 'tasks' && (
        <div className="table-container">
          <h3>Task Status Summary</h3>
          <div style={{ padding: '1rem' }}>
            {['todo', 'in_progress', 'review', 'blocked', 'completed'].map(status => {
              const count = reportData.tasks.filter(t => t.status === status).length;
              return (
                <div key={status} style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between',
                  padding: '0.5rem 0',
                  borderBottom: '1px solid #ecf0f1'
                }}>
                  <span style={{ textTransform: 'capitalize' }}>{status.replace('_', ' ')}</span>
                  <span className="status-badge" style={{ 
                    background: status === 'completed' ? '#d4edda' : 
                              status === 'blocked' ? '#f8d7da' : '#fff3cd'
                  }}>
                    {count} tasks
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {reportType === 'productivity' && (
        <div className="table-container">
          <h3>Team Productivity</h3>
          <div style={{ padding: '1rem' }}>
            <p><strong>Total Time Logged:</strong> {stats.totalHours} hours</p>
            <p><strong>Average Time per Task:</strong> 
              {reportData.tasks.length > 0 
                ? Math.round(stats.totalHours / reportData.tasks.length) 
                : 0} hours
            </p>
            <p><strong>Task Completion Rate:</strong> {stats.completionRate}%</p>
            <p><strong>Project Success Rate:</strong> 
              {stats.totalProjects > 0 
                ? Math.round((stats.completedProjects / stats.totalProjects) * 100) 
                : 0}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Reports;