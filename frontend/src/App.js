import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard';
import Projects from './components/Projects';
import Estimation from './components/Estimation';
import Assignment from './components/Assignment';
import Tasks from './components/Tasks';
import TimeLogs from './components/TimeLogs';
import Performance from './components/Performance';
import Delivery from './components/Delivery';
import Reports from './components/Reports';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <div className="nav-container">
            <h1 className="nav-logo">📊 APJ Project Management</h1>
            <ul className="nav-menu">
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/projects">Projects</Link></li>
              <li><Link to="/estimation">Estimation</Link></li>
              <li><Link to="/assignment">Assignments</Link></li>
              <li><Link to="/tasks">Tasks</Link></li>
              <li><Link to="/timelogs">Time Logs</Link></li>
              <li><Link to="/performance">Performance</Link></li>
              <li><Link to="/delivery">Delivery</Link></li>
              <li><Link to="/reports">Reports</Link></li>
            </ul>
          </div>
        </nav>

        <div className="content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/estimation" element={<Estimation />} />
            <Route path="/assignment" element={<Assignment />} />
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/timelogs" element={<TimeLogs />} />
            <Route path="/performance" element={<Performance />} />
            <Route path="/delivery" element={<Delivery />} />
            <Route path="/reports" element={<Reports />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;