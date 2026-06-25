// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for better error handling
api.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error Details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    return Promise.reject(error);
  }
);

// Test API connection
export const testAPI = () => api.get('/');

// Users
export const getUsers = () => api.get('/users');
export const getUser = (id) => api.get(`/users/${id}`);
export const createUser = (data) => api.post('/users', data);
export const updateUser = (id, data) => api.put(`/users/${id}`, data);
export const deleteUser = (id) => api.delete(`/users/${id}`);

// Projects
export const getProjects = () => api.get('/projects');
export const createProject = (data) => api.post('/projects', data);
export const updateProject = (id, data) => api.put(`/projects/${id}`, data);
export const deleteProject = (id) => api.delete(`/projects/${id}`);

// Estimations
export const getEstimations = () => api.get('/estimations');
export const createEstimation = (data) => api.post('/estimations', data);

// Team Members
export const getTeamMembers = () => api.get('/teammembers');
export const createTeamMember = (data) => api.post('/teammembers', data);

// Tasks
export const getTasks = () => api.get('/tasks');
export const createTask = (data) => api.post('/tasks', data);
export const updateTaskStatus = (id, status) => api.patch(`/tasks/${id}/status`, { status });

// Time Logs
export const getTimeLogs = () => api.get('/timelogs');
export const createTimeLog = (data) => api.post('/timelogs', data);

// Performance
export const getPerformance = () => api.get('/performance');
export const createPerformance = (data) => api.post('/performance', data);

// Deliveries
export const getDeliveries = () => api.get('/deliveries');
export const createDelivery = (data) => api.post('/deliveries', data);

// Reports
export const getReports = () => api.get('/reports');

export default api;