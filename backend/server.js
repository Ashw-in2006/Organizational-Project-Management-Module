// server.js - Complete with all API routes
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

// Import models
import User from './models/User.js';
import Project from './models/Project.js';
import Estimation from './models/Estimation.js';
import TeamMember from './models/TeamMember.js';
import ProjectAssignment from './models/ProjectAssignment.js';
import Task from './models/Task.js';
import TimeLog from './models/TimeLog.js';
import BreachLog from './models/BreachLog.js';
import PerformanceRecord from './models/PerformanceRecord.js';
import ProjectDelivery from './models/ProjectDelivery.js';

// Load dotenv
dotenv.config();

// Initialize Express App
const app = express();

// Enable CORS
app.use(cors());

// Enable JSON
app.use(express.json());

// ==================== ROUTES ====================

// Basic test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

// Health check route
app.get('/health', (req, res) => {
  res.json({ 
    status: 'healthy',
    timestamp: new Date().toISOString()
  });
});

// ==================== PROJECT ROUTES ====================

// Get all projects
app.get('/api/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single project
app.get('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create project
app.post('/api/projects', async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      description: req.body.description,
      clientName: req.body.clientName,
      clientEmail: req.body.clientEmail,
      startDate: req.body.startDate || new Date(),
      endDate: req.body.endDate,
      status: req.body.status || 'planned',
      priority: req.body.priority || 'medium',
      budget: req.body.budget,
      budgetCurrency: req.body.budgetCurrency || 'USD',
      department: req.body.department,
      tags: req.body.tags || []
    });
    
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update project
app.put('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Delete project
app.delete('/api/projects/:id', async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== ESTIMATION ROUTES ====================

// Get all estimations
app.get('/api/estimations', async (req, res) => {
  try {
    const estimations = await Estimation.find()
      .populate('projectId', 'name')
      .populate('estimatedBy', 'name')
      .sort({ createdAt: -1 });
    res.json(estimations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create estimation
app.post('/api/estimations', async (req, res) => {
  try {
    const estimation = new Estimation(req.body);
    const savedEstimation = await estimation.save();
    res.status(201).json(savedEstimation);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================== TEAM MEMBER ROUTES ====================

// Get all team members
app.get('/api/teammembers', async (req, res) => {
  try {
    const teamMembers = await TeamMember.find()
      .populate('userId', 'name email')
      .populate('projectId', 'name')
      .sort({ createdAt: -1 });
    res.json(teamMembers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create team member
app.post('/api/teammembers', async (req, res) => {
  try {
    const teamMember = new TeamMember(req.body);
    const savedTeamMember = await teamMember.save();
    res.status(201).json(savedTeamMember);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================== TASK ROUTES ====================

// Get all tasks
app.get('/api/tasks', async (req, res) => {
  try {
    const tasks = await Task.find()
      .populate('projectId', 'name')
      .populate('assignedTo', 'name')
      .populate('createdBy', 'name')
      .sort({ createdAt: -1 });
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create task
app.post('/api/tasks', async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Update task status
app.patch('/api/tasks/:id/status', async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status },
      { new: true }
    );
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }
    res.json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================== TIME LOG ROUTES ====================

// Get all time logs
app.get('/api/timelogs', async (req, res) => {
  try {
    const timeLogs = await TimeLog.find()
      .populate('taskId', 'title')
      .populate('userId', 'name')
      .populate('projectId', 'name')
      .sort({ date: -1 });
    res.json(timeLogs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create time log
app.post('/api/timelogs', async (req, res) => {
  try {
    const timeLog = new TimeLog(req.body);
    const savedTimeLog = await timeLog.save();
    res.status(201).json(savedTimeLog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================== PERFORMANCE ROUTES ====================

// Get all performance records
app.get('/api/performance', async (req, res) => {
  try {
    const records = await PerformanceRecord.find()
      .populate('userId', 'name')
      .populate('projectId', 'name')
      .sort({ periodStart: -1 });
    res.json(records);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create performance record
app.post('/api/performance', async (req, res) => {
  try {
    const record = new PerformanceRecord(req.body);
    const savedRecord = await record.save();
    res.status(201).json(savedRecord);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================== DELIVERY ROUTES ====================

// Get all deliveries
app.get('/api/deliveries', async (req, res) => {
  try {
    const deliveries = await ProjectDelivery.find()
      .populate('projectId', 'name')
      .populate('deliveryOwner', 'name')
      .sort({ plannedDate: -1 });
    res.json(deliveries);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create delivery
app.post('/api/deliveries', async (req, res) => {
  try {
    const delivery = new ProjectDelivery(req.body);
    const savedDelivery = await delivery.save();
    res.status(201).json(savedDelivery);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// ==================== REPORT ROUTES ====================

// Get report data
app.get('/api/reports', async (req, res) => {
  try {
    const [projects, tasks, timeLogs] = await Promise.all([
      Project.find(),
      Task.find(),
      TimeLog.find()
    ]);
    
    res.json({
      projects,
      tasks,
      timeLogs,
      summary: {
        totalProjects: projects.length,
        activeProjects: projects.filter(p => p.status === 'active').length,
        completedProjects: projects.filter(p => p.status === 'completed').length,
        totalTasks: tasks.length,
        completedTasks: tasks.filter(t => t.status === 'completed').length,
        totalHours: timeLogs.reduce((sum, log) => sum + (log.hours || 0), 0)
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ==================== TEST ROUTES (Keep for testing) ====================

// Test route to create a sample estimation
app.post('/api/test/create-estimation', async (req, res) => {
  try {
    const project = await Project.findOne();
    if (!project) {
      return res.status(400).json({ 
        message: 'No project found. Please create a project first.' 
      });
    }

    const user = await User.findOne();
    if (!user) {
      return res.status(400).json({ 
        message: 'No user found. Please create a user first.' 
      });
    }

    const estimation = new Estimation({
      projectId: project._id,
      estimatedBy: user._id,
      estimatedHours: 40,
      estimatedCost: 5000,
      estimatedCurrency: 'USD',
      estimatedStartDate: new Date(),
      estimatedEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'draft',
      notes: 'Initial estimation'
    });

    await estimation.save();
    res.status(201).json({ 
      message: 'Estimation created successfully! Check Atlas Data Explorer.',
      estimation 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test route to create a sample task
app.post('/api/test/create-task', async (req, res) => {
  try {
    const project = await Project.findOne();
    if (!project) {
      return res.status(400).json({ 
        message: 'No project found. Please create a project first.' 
      });
    }

    const user = await User.findOne();
    if (!user) {
      return res.status(400).json({ 
        message: 'No user found. Please create a user first.' 
      });
    }

    const task = new Task({
      projectId: project._id,
      assignedTo: user._id,
      createdBy: user._id,
      title: 'Sample Task',
      description: 'This is a sample task to create the tasks collection',
      status: 'todo',
      priority: 'medium',
      type: 'task',
      estimatedHours: 8,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });

    await task.save();
    res.status(201).json({ 
      message: 'Task created successfully! Check Atlas Data Explorer.',
      task 
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Test route to create all sample data at once
app.post('/api/test/create-all', async (req, res) => {
  try {
    let project = await Project.findOne();
    if (!project) {
      project = new Project({
        name: 'Sample Project',
        description: 'Sample project for testing',
        clientName: 'Test Client',
        clientEmail: 'test@client.com',
        startDate: new Date(),
        status: 'planned',
        priority: 'medium',
        budget: 10000
      });
      await project.save();
      console.log('✅ Sample project created');
    }

    let user = await User.findOne();
    if (!user) {
      user = new User({
        name: 'Admin User',
        email: 'admin@test.com',
        password: 'hashed_password_here',
        role: 'admin',
        department: 'IT',
        designation: 'Project Manager'
      });
      await user.save();
      console.log('✅ Sample user created');
    }

    const estimation = new Estimation({
      projectId: project._id,
      estimatedBy: user._id,
      estimatedHours: 40,
      estimatedCost: 5000,
      estimatedCurrency: 'USD',
      estimatedStartDate: new Date(),
      estimatedEndDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
      status: 'draft'
    });
    await estimation.save();
    console.log('✅ Estimation created');

    const teamMember = new TeamMember({
      userId: user._id,
      projectId: project._id,
      role: 'Developer',
      allocationPercentage: 100,
      joinedDate: new Date()
    });
    await teamMember.save();
    console.log('✅ TeamMember created');

    const task = new Task({
      projectId: project._id,
      assignedTo: user._id,
      createdBy: user._id,
      title: 'Sample Task',
      description: 'Sample task description',
      status: 'todo',
      priority: 'medium',
      type: 'task',
      estimatedHours: 8,
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    });
    await task.save();
    console.log('✅ Task created');

    const timeLog = new TimeLog({
      taskId: task._id,
      userId: user._id,
      projectId: project._id,
      date: new Date(),
      hours: 4,
      minutes: 30,
      description: 'Worked on sample task',
      type: 'regular',
      status: 'pending',
      billable: true
    });
    await timeLog.save();
    console.log('✅ TimeLog created');

    const projectAssignment = new ProjectAssignment({
      projectId: project._id,
      userId: user._id,
      assignedBy: user._id,
      assignedDate: new Date(),
      role: 'Team Lead',
      startDate: new Date(),
      status: 'active'
    });
    await projectAssignment.save();
    console.log('✅ ProjectAssignment created');

    res.status(201).json({ 
      message: 'All sample data created successfully! Refresh Atlas Data Explorer.',
      data: {
        project,
        user,
        estimation,
        teamMember,
        task,
        timeLog,
        projectAssignment
      }
    });
  } catch (error) {
    console.error('Error creating sample data:', error);
    res.status(500).json({ error: error.message });
  }
});

// ==================== DATABASE CONNECTION & SERVER START ====================

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB Connected');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error.message);
    process.exit(1);
  }
};

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
    console.log(`📡 Test API at: http://localhost:${PORT}`);
    console.log(`🔧 Create sample data: POST http://localhost:${PORT}/api/test/create-all`);
  });
}).catch(err => {
  console.error('Failed to connect to MongoDB:', err);
  process.exit(1);
});

process.on('unhandledRejection', (err) => {
  console.log('Unhandled Rejection:', err.message);
  process.exit(1);
});