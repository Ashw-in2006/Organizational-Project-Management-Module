import mongoose from 'mongoose';

const performanceRecordSchema = new mongoose.Schema({
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
  periodStart: {
    type: Date,
    required: true
  },
  periodEnd: {
    type: Date,
    required: true
  },
  tasksCompleted: {
    type: Number,
    default: 0
  },
  tasksAssigned: {
    type: Number,
    default: 0
  },
  onTimeCompletion: {
    type: Number,
    min: 0,
    max: 100
  },
  qualityScore: {
    type: Number,
    min: 0,
    max: 100
  },
  productivityScore: {
    type: Number,
    min: 0,
    max: 100
  },
  totalHoursLogged: {
    type: Number,
    default: 0
  },
  estimatedVsActual: {
    type: Number
  },
  breachCount: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  feedback: {
    type: String,
    trim: true
  },
  strengths: [{
    type: String,
    trim: true
  }],
  improvements: [{
    type: String,
    trim: true
  }],
  status: {
    type: String,
    enum: ['pending', 'reviewed', 'approved'],
    default: 'pending'
  },
  reviewedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  reviewedAt: {
    type: Date
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

// Ensure unique combination of userId, projectId, and period
performanceRecordSchema.index({ userId: 1, projectId: 1, periodStart: 1, periodEnd: 1 }, { unique: true });

const PerformanceRecord = mongoose.model('PerformanceRecord', performanceRecordSchema);
export default PerformanceRecord;