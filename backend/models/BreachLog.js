import mongoose from 'mongoose';

const breachLogSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  taskId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  breachType: {
    type: String,
    enum: ['deadline', 'budget', 'scope', 'quality', 'resource'],
    required: true
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  expectedDate: {
    type: Date
  },
  actualDate: {
    type: Date
  },
  expectedValue: {
    type: Number
  },
  actualValue: {
    type: Number
  },
  variance: {
    type: Number
  },
  variancePercentage: {
    type: Number
  },
  status: {
    type: String,
    enum: ['open', 'investigating', 'mitigated', 'resolved'],
    default: 'open'
  },
  resolution: {
    type: String,
    trim: true
  },
  resolvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  resolvedAt: {
    type: Date
  },
  impact: {
    type: String,
    trim: true
  },
  rootCause: {
    type: String,
    trim: true
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

const BreachLog = mongoose.model('BreachLog', breachLogSchema);
export default BreachLog;