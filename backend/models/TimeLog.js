import mongoose from 'mongoose';

const timeLogSchema = new mongoose.Schema({
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task',
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  hours: {
    type: Number,
    required: true,
    min: 0
  },
  minutes: {
    type: Number,
    min: 0,
    max: 59
  },
  description: {
    type: String,
    trim: true
  },
  type: {
    type: String,
    enum: ['regular', 'overtime', 'holiday', 'sick_leave', 'vacation'],
    default: 'regular'
  },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedAt: {
    type: Date
  },
  billable: {
    type: Boolean,
    default: true
  },
  isActive: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const TimeLog = mongoose.model('TimeLog', timeLogSchema);
export default TimeLog;