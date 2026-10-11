const express = require('express');
const router = express.Router();
const {
  applyForCourse,
  withdrawApplication,
  getSeekerApplications,
  getProviderApplications,
  updateApplicationStatus,
} = require('../controllers/applicationController');
const {
  protect,
  requireSeeker,
  requireProvider,
} = require('../utils/authMiddleware');

// Seeker routes
router.post('/apply/:courseId', protect, requireSeeker, applyForCourse);
router.put('/withdraw/:id', protect, requireSeeker, withdrawApplication);
router.get('/my-applications', protect, requireSeeker, getSeekerApplications);

// Provider routes (notifications and status updates)
router.get(
  '/provider-notifications',
  protect,
  requireProvider,
  getProviderApplications
);
router.put('/status/:id', protect, requireProvider, updateApplicationStatus);

module.exports = router;
