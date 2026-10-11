const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema(
  {
    courseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Course',
      required: true,
    },
    studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    status: {
      type: String,
      enum: ['Pending', 'Accepted', 'Rejected', 'Withdrawn'],
      default: 'Pending',
    },
    notes: {
      type: String,
      trim: true,
      default: '',
    },
    isViewedByProvider: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// Prevent duplicate active applications from same student to same course
applicationSchema.index({ courseId: 1, studentId: 1 });

module.exports = mongoose.model('Application', applicationSchema);
