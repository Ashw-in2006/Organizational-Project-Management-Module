import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema({
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
  role: {
    type: String,
    required: true,
    trim: true
  },
  responsibilities: [{
    type: String,
    trim: true
  }],
  allocationPercentage: {
    type: Number,
    min: 0,
    max: 100,
    default: 100
  },
  joinedDate: {
    type: Date,
    default: Date.now
  },
  leftDate: {
    type: Date
  },
  isActive: {
    type: Boolean,
    default: true
  },
  performanceRating: {
    type: Number,
    min: 0,
    max: 5
  },
  feedback: {
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

// Ensure unique combination of userId and projectId
teamMemberSchema.index({ userId: 1, projectId: 1 }, { unique: true });

const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
export default TeamMember;