const Course = require('../schema/Course');
const User = require('../schema/User');
const Application = require('../schema/Application');

// @desc Create a new course
// @route POST /api/courses
// @access Private (Course Provider only)
const createCourse = async (req, res) => {
  try {
    const {
      title,
      category,
      description,
      duration,
      fee,
      mode,
      schedule,
      level,
      prerequisites,
      syllabus,
      seats,
      certification,
      language,
    } = req.body;

    if (!title || !category || !description || !duration || fee === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Please provide Title, Category, Description, Duration, and Course Fee',
      });
    }

    const syllabusArray = Array.isArray(syllabus)
      ? syllabus
      : typeof syllabus === 'string'
      ? syllabus.split('\n').map((s) => s.trim()).filter(Boolean)
      : [];

    const course = await Course.create({
      providerId: req.user._id,
      title,
      category,
      description,
      duration,
      fee: Number(fee),
      mode: mode || 'Offline',
      schedule: schedule || 'Flexible Batch',
      level: level || 'All Levels',
      prerequisites: prerequisites || 'None',
      syllabus: syllabusArray,
      seats: seats ? Number(seats) : 30,
      certification: certification !== undefined ? certification : true,
      language: language || 'English',
    });

    const populatedCourse = await Course.findById(course._id).populate(
      'providerId',
      'instituteName providerType city state country phone email address'
    );

    res.status(201).json({
      success: true,
      message: 'Course published successfully!',
      course: populatedCourse,
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to create course' });
  }
};

// @desc Get all courses with optional search and filters
// @route GET /api/courses
// @access Public
const getAllCourses = async (req, res) => {
  try {
    const { search, category, mode, providerType, instituteId } = req.query;

    let query = { isActive: true };

    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { category: { $regex: search, $options: 'i' } },
      ];
    }

    if (category && category !== 'all') {
      query.category = { $regex: category, $options: 'i' };
    }

    if (mode && mode !== 'all') {
      query.mode = mode;
    }

    if (instituteId) {
      query.providerId = instituteId;
    }

    let courses = await Course.find(query)
      .populate('providerId', 'instituteName providerType city state country phone email address about')
      .sort({ createdAt: -1 });

    // Filter by providerType if specified
    if (providerType && providerType !== 'all') {
      courses = courses.filter(
        (c) => c.providerId && c.providerId.providerType === providerType
      );
    }

    res.status(200).json({
      success: true,
      count: courses.length,
      courses,
    });
  } catch (error) {
    console.error('Get all courses error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get single course by ID
// @route GET /api/courses/:id
// @access Public
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'providerId',
      'instituteName providerType city state country phone email address about'
    );

    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    res.status(200).json({ success: true, course });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get courses created by current provider
// @route GET /api/courses/my-courses
// @access Private (Provider only)
const getProviderCourses = async (req, res) => {
  try {
    const courses = await Course.find({ providerId: req.user._id }).sort({ createdAt: -1 });

    // Attach application counts for each course
    const coursesWithStats = await Promise.all(
      courses.map(async (c) => {
        const appCount = await Application.countDocuments({
          courseId: c._id,
          status: { $ne: 'Withdrawn' },
        });
        return {
          ...c.toObject(),
          applicationsCount: appCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      count: coursesWithStats.length,
      courses: coursesWithStats,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Update course
// @route PUT /api/courses/:id
// @access Private (Provider only)
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to modify this course' });
    }

    const updated = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('providerId', 'instituteName providerType city state country phone email address');

    res.status(200).json({
      success: true,
      message: 'Course updated successfully',
      course: updated,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Delete course
// @route DELETE /api/courses/:id
// @access Private (Provider only)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (!course) {
      return res.status(404).json({ success: false, message: 'Course not found' });
    }

    if (course.providerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this course' });
    }

    await Course.findByIdAndDelete(req.params.id);
    // Also remove applications for this course
    await Application.deleteMany({ courseId: req.params.id });

    res.status(200).json({ success: true, message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc Get all registered Academies and IELTS Institutes
// @route GET /api/courses/institutes
// @access Public
const getInstitutes = async (req, res) => {
  try {
    const providers = await User.find({ role: 'provider' })
      .select('instituteName providerType city state country phone email address about')
      .sort({ createdAt: -1 });

    const institutesWithCounts = await Promise.all(
      providers.map(async (p) => {
        const courseCount = await Course.countDocuments({ providerId: p._id, isActive: true });
        return {
          ...p.toObject(),
          coursesCount: courseCount,
        };
      })
    );

    res.status(200).json({
      success: true,
      institutes: institutesWithCounts,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  getProviderCourses,
  updateCourse,
  deleteCourse,
  getInstitutes,
};
