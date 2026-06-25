import mongoose from 'mongoose';

const projectDeliverySchema = new mongoose.Schema({
  projectId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
    required: true
  },
  deliveryName: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  deliveryType: {
    type: String,
    enum: ['milestone', 'phase', 'final', 'update'],
    default: 'milestone'
  },
  plannedDate: {
    type: Date,
    required: true
  },
  actualDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['planned', 'in_progress', 'completed', 'delayed', 'cancelled'],
    default: 'planned'
  },
  deliveryOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  deliverables: [{
    name: String,
    type: String,
    url: String,
    size: Number,
    uploadedAt: {
      type: Date,
      default: Date.now
    }
  }],
  qualityScore: {
    type: Number,
    min: 0,
    max: 100
  },
  clientFeedback: {
    type: String,
    trim: true
  },
  clientRating: {
    type: Number,
    min: 0,
    max: 5
  },
  internalNotes: {
    type: String,
    trim: true
  },
  isOnTime: {
    type: Boolean,
    default: false
  },
  isWithinBudget: {
    type: Boolean,
    default: false
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

const ProjectDelivery = mongoose.model('ProjectDelivery', projectDeliverySchema);
export default ProjectDelivery;