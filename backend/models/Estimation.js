import mongoose from 'mongoose';

const estimationSchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  estimatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  estimatedHours: {
    type: Number,
    required: true,
    min: 0
  },
  estimatedCost: {
    type: Number,
    required: true,
    min: 0
  },
  estimatedCurrency: {
    type: String,
    default: 'USD'
  },
  estimatedStartDate: {
    type: Date,
    required: true
  },
  estimatedEndDate: {
    type: Date,
    required: true
  },
  actualHours: {
    type: Number,
    min: 0
  },
  actualCost: {
    type: Number,
    min: 0
  },
  varianceHours: {
    type: Number
  },
  varianceCost: {
    type: Number
  },
  status: {
    type: String,
    enum: ['draft', 'submitted', 'approved', 'rejected'],
    default: 'draft'
  },
  notes: {
    type: String,
    trim: true
  },
  assumptions: [{
    type: String,
    trim: true
  }],
  risks: [{
    type: String,
    trim: true
  }],
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

const Estimation = mongoose.model('Estimation', estimationSchema);
export default Estimation;