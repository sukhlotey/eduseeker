const express = require('express');
const router = express.Router();
const {
  createCourse,
  getAllCourses,
  getCourseById,
  getProviderCourses,
  updateCourse,
  deleteCourse,
  getInstitutes,
} = require('../controllers/courseController');
const { protect, requireProvider } = require('../utils/authMiddleware');

// Public routes
router.get('/', getAllCourses);
router.get('/institutes', getInstitutes);

// Provider specific routes
router.get('/my-courses', protect, requireProvider, getProviderCourses);

// Public single course
router.get('/:id', getCourseById);

// Provider mutation routes
router.post('/', protect, requireProvider, createCourse);
router.put('/:id', protect, requireProvider, updateCourse);
router.delete('/:id', protect, requireProvider, deleteCourse);

module.exports = router;
