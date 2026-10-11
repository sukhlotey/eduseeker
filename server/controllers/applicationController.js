const Application = require('../schema/Application');
const Course = require('../schema/Course');

// @desc Course Seeker applies for a course
// @route POST /api/applications/apply/:courseId
// @access Private (Seeker only)
const applyForCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { notes } = req.body;

    const course = await Course.findById(courseId).populate('providerId');
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (!course.isActive) {
      return res.status(400).json({ success: false, message: 'This course is currently not accepting applications' });
    }

    // Check if application already exists and is not withdrawn
    const existing = await Application.findOne({
      courseId,
      studentId: req.user._id,
    });

    if (existing) {
      if (existing.status !== 'Withdrawn') {
        return res.status(400).json({
          success: false,
          message: `You have already applied for this course (Status: ${existing.status}).`,
        });
      } else {
        // Re-apply if previously withdrawn
        existing.status = 'Pending';
        existing.notes = notes || '';
        existing.isViewedByProvider = false;
        await existing.save();

        const updated = await Application.findById(existing._id)
          .populate('courseId')
          .populate('providerId', 'instituteName providerType city state country phone email address');

        return res.status(200).json({
          success: true,
          message: 'Application re-submitted successfully!',
          application: updated,
        });
      }
    }

    const application = await Application.create({
      courseId,
      studentId: req.user._id,
      providerId: course.providerId._id,
      notes: notes || '',
      status: 'Pending',
    });

    const populatedApp = await Application.findById(application._id)
      .populate('courseId')
      .populate('providerId', 'instituteName providerType city state country phone email address');

    res.status(201).json({
      success: true,
      message: 'Application submitted successfully! The institute has been notified.',
      application: populatedApp,
    });
  } catch (error) {
    console.error('Apply for course error:', error);
    res.status(500).json({ success: false, message: error.message || 'Application failed' });
  }
};

// @desc Course Seeker withdraws applied course
// @route PUT /api/applications/withdraw/:id
// @access Private (Seeker only)
const withdrawApplication = async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.studentId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to withdraw this application' });
    }

    if (application.status === 'Withdrawn') {
      return res.status(400).json({ success: false, message: 'Application is already withdrawn' });
    }

    application.status = 'Withdrawn';
    await application.save();

    res.status(200).json({
      success: true,
      message: 'Application withdrawn successfully',
      application,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get current seeker's applied courses
// @route GET /api/applications/my-applications
// @access Private (Seeker only)
const getSeekerApplications = async (req, res) => {
  try {
    const applications = await Application.find({ studentId: req.user._id })
      .populate({
        path: 'courseId',
        populate: {
          path: 'providerId',
          select: 'instituteName providerType city state country phone email address',
        },
      })
      .populate('providerId', 'instituteName providerType city state country phone email address')
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: applications.length,
      applications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all applications received by Course Provider (with user detail and selected course)
// @route GET /api/applications/provider-notifications
// @access Private (Provider only)
const getProviderApplications = async (req, res) => {
  try {
    const applications = await Application.find({ providerId: req.user._id })
      .populate('courseId', 'title category duration fee mode schedule level')
      .populate(
        'studentId',
        'name email phone qualification city state country address'
      )
      .sort({ createdAt: -1 });

    const pendingCount = applications.filter(
      (a) => a.status === 'Pending' && !a.isViewedByProvider
    ).length;

    res.status(200).json({
      success: true,
      count: applications.length,
      unreadCount: pendingCount,
      applications,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update application status (Accept / Reject / Reviewed)
// @route PUT /api/applications/status/:id
// @access Private (Provider only)
const updateApplicationStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const application = await Application.findById(req.params.id);

    if (!application) {
      return res.status(404).json({ success: false, message: 'Application not found' });
    }

    if (application.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this application' });
    }

    if (['Pending', 'Accepted', 'Rejected', 'Withdrawn'].includes(status)) {
      application.status = status;
      application.isViewedByProvider = true;
      await application.save();

      const populated = await Application.findById(application._id)
        .populate('courseId', 'title category duration fee mode')
        .populate('studentId', 'name email phone qualification city state country address');

      return res.status(200).json({
        success: true,
        message: `Application marked as ${status}`,
        application: populated,
      });
    } else {
      return res.status(400).json({ success: false, message: 'Invalid status' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  applyForCourse,
  withdrawApplication,
  getSeekerApplications,
  getProviderApplications,
  updateApplicationStatus,
};
