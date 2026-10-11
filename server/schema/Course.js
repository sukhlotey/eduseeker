const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema(
  {
    providerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    title: {
      type: String,
      required: [true, 'Course title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Course description is required'],
      trim: true,
    },
    duration: {
      type: String,
      required: [true, 'Duration is required'],
      trim: true,
    },
    fee: {
      type: Number,
      required: [true, 'Course fee is required'],
    },
    mode: {
      type: String,
      enum: ['Online', 'Offline', 'Hybrid'],
      default: 'Offline',
      required: true,
    },
    schedule: {
      type: String,
      trim: true,
      default: 'Flexible Batch',
    },
    level: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced', 'All Levels'],
      default: 'All Levels',
    },
    prerequisites: {
      type: String,
      trim: true,
      default: 'No specific prerequisites',
    },
    syllabus: [
      {
        type: String,
        trim: true,
      },
    ],
    seats: {
      type: Number,
      default: 30,
    },
    certification: {
      type: Boolean,
      default: true,
    },
    language: {
      type: String,
      default: 'English',
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Course', courseSchema);
