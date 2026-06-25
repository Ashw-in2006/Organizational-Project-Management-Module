import React, { useState, useEffect } from 'react';
import { getProjects, getTasks, getTimeLogs } from '../services/api';

function Dashboard() {
  const [stats, setStats] = useState({
    projects: 0,
    tasks: 0,
    timeLogs: 0,
    teamMembers: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projectsRes, tasksRes, timeLogsRes] = await Promise.all([
        getProjects(),
        getTasks(),
        getTimeLogs()
      ]);
      
      setStats({
        projects: projectsRes.data.length || 0,
        tasks: tasksRes.data.length || 0,
        timeLogs: timeLogsRes.data.length || 0,
        teamMembers: 12 // Static for now
      });
      setLoading(false);
    } catch (error) {
      console.error('Error fetching stats:', error);
      setLoading(false);
    }
  };

  if (loading) return <div>Loading dashboard...</div>;

  return (
    <div>
      <h2>📊 Dashboard Overview</h2>
      
      <div className="dashboard-stats">
        <div className="stat-card">
          <h3>Total Projects</h3>
          <div className="number">{stats.projects}</div>
        </div>
        <div className="stat-card">
          <h3>Active Tasks</h3>
          <div className="number">{stats.tasks}</div>
        </div>
        <div className="stat-card">
          <h3>Time Logs</h3>
          <div className="number">{stats.timeLogs}</div>
        </div>
        <div className="stat-card">
          <h3>Team Members</h3>
          <div className="number">{stats.teamMembers}</div>
        </div>
      </div>

      <div className="table-container">
        <h3>Recent Activity</h3>
        <p style={{ color: '#7f8c8d', padding: '1rem' }}>
          Dashboard showing summary of all project activities.
          Click on navigation links above to manage specific sections.
        </p>
      </div>
    </div>
  );
}

export default Dashboard;