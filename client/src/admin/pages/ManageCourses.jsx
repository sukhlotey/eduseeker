import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProviderCourses,
  createNewCourse,
  updateCourse,
  deleteCourse,
  clearCourseActionState,
} from '../../redux/slices/courseSlice';
import {
  Plus,
  BookOpen,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  X,
  Clock,
  IndianRupee,
  Calendar,
  Layers,
  GraduationCap,
} from 'lucide-react';

const initialForm = {
  title: '',
  category: 'IELTS Academic',
  description: '',
  duration: '3 Months',
  fee: '',
  mode: 'Offline',
  schedule: 'Mon - Fri (10:00 AM - 12:00 PM)',
  level: 'All Levels',
  prerequisites: 'None',
  syllabus: '',
  seats: '30',
  certification: true,
  language: 'English',
};

const ManageCourses = () => {
  const dispatch = useDispatch();
  const { providerCourses, loading, error, actionSuccess } = useSelector(
    (state) => state.courses
  );

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(initialForm);

  useEffect(() => {
    dispatch(fetchProviderCourses());
  }, [dispatch]);

  const openCreateModal = () => {
    setEditingId(null);
    setFormData(initialForm);
    setModalOpen(true);
    dispatch(clearCourseActionState());
  };

  const openEditModal = (course) => {
    setEditingId(course._id);
    setFormData({
      title: course.title,
      category: course.category,
      description: course.description,
      duration: course.duration,
      fee: course.fee,
      mode: course.mode,
      schedule: course.schedule || '',
      level: course.level || 'All Levels',
      prerequisites: course.prerequisites || '',
      syllabus: Array.isArray(course.syllabus)
        ? course.syllabus.join('\n')
        : course.syllabus || '',
      seats: course.seats || '30',
      certification: course.certification !== undefined ? course.certification : true,
      language: course.language || 'English',
    });
    setModalOpen(true);
    dispatch(clearCourseActionState());
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingId(null);
    setFormData(initialForm);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      dispatch(updateCourse({ id: editingId, courseData: formData })).then(() => {
        closeModal();
      });
    } else {
      dispatch(createNewCourse(formData)).then(() => {
        closeModal();
      });
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this course? Associated applications will also be removed.')) {
      dispatch(deleteCourse(id));
    }
  };

  return (
    <div>
      {/* Page Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
            Course Management
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
            Create and publish comprehensive course details visible to all Course Seekers.
          </p>
        </div>

        <button onClick={openCreateModal} className="btn btn-primary">
          <Plus size={18} />
          <span>Add New Course</span>
        </button>
      </div>

      {actionSuccess && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>{actionSuccess}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {/* Courses List */}
      {providerCourses.length === 0 ? (
        <div className="admin-panel" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <BookOpen size={48} style={{ color: '#4f46e5', opacity: 0.3, marginBottom: '1rem' }} />
          <h3 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>No Courses Published Yet</h3>
          <p style={{ color: '#64748b', maxWidth: '450px', margin: '0 auto 1.5rem auto', fontSize: '0.92rem' }}>
            Start creating courses with full syllabus, schedules, fees, and eligibility so students can discover and apply for them.
          </p>
          <button onClick={openCreateModal} className="btn btn-primary">
            <Plus size={18} />
            <span>Publish Your First Course</span>
          </button>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {providerCourses.map((course) => (
            <div
              key={course._id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '16px',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.03)',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.75rem' }}>
                <span className="badge badge-primary">{course.category}</span>
                <span
                  style={{
                    fontSize: '0.78rem',
                    background: '#f1f5f9',
                    color: '#475569',
                    padding: '0.2rem 0.55rem',
                    borderRadius: '6px',
                    fontWeight: 600,
                  }}
                >
                  {course.mode}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                {course.title}
              </h3>

              <p
                style={{
                  fontSize: '0.88rem',
                  color: '#64748b',
                  lineHeight: '1.5',
                  marginBottom: '1rem',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                }}
              >
                {course.description}
              </p>

              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '10px',
                  padding: '0.85rem',
                  marginBottom: '1.25rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '0.6rem',
                  fontSize: '0.82rem',
                }}
              >
                <div>
                  <span style={{ color: '#64748b', display: 'block' }}>Duration</span>
                  <strong style={{ color: '#0f172a' }}>{course.duration}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block' }}>Batch Timing</span>
                  <strong style={{ color: '#0f172a' }}>{course.schedule}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block' }}>Target Level</span>
                  <strong style={{ color: '#0f172a' }}>{course.level}</strong>
                </div>
                <div>
                  <span style={{ color: '#64748b', display: 'block' }}>Seats Available</span>
                  <strong style={{ color: '#0f172a' }}>{course.seats}</strong>
                </div>
              </div>

              <div
                style={{
                  marginTop: 'auto',
                  paddingTop: '1rem',
                  borderTop: '1px solid #f1f5f9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600 }}>COURSE FEE</div>
                  <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#059669' }}>
                    ₹{course.fee?.toLocaleString()}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button
                    onClick={() => openEditModal(course)}
                    style={{
                      background: '#f1f5f9',
                      border: '1px solid #e2e8f0',
                      color: '#475569',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                    title="Edit Course"
                  >
                    <Edit2 size={16} />
                  </button>
                  <button
                    onClick={() => handleDelete(course._id)}
                    style={{
                      background: '#fee2e2',
                      border: '1px solid #fecaca',
                      color: '#dc2626',
                      padding: '0.5rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                    }}
                    title="Delete Course"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Course Creation & Editing Modal */}
      {modalOpen && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '750px', background: '#ffffff', color: '#0f172a' }}>
            <div className="modal-header">
              <div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0f172a' }}>
                  {editingId ? 'Edit Course Details' : 'Create & Publish New Course'}
                </h2>
                <p style={{ fontSize: '0.85rem', color: '#64748b' }}>
                  Provide complete curriculum, schedule, and pricing for students
                </p>
              </div>
              <button
                onClick={closeModal}
                className="modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">
                  Course Title <span className="required">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g. IELTS 8+ Bands Comprehensive Masterclass"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Course Category <span className="required">*</span>
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="IELTS Academic">IELTS Academic</option>
                    <option value="IELTS General">IELTS General</option>
                    <option value="PTE Academic">PTE Academic</option>
                    <option value="Spoken English">Spoken English</option>
                    <option value="TOEFL Preparation">TOEFL Preparation</option>
                    <option value="French / Foreign Languages">French / Foreign Languages</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Data Science & AI">Data Science & AI</option>
                    <option value="Business Management">Business Management</option>
                    <option value="Digital Marketing">Digital Marketing</option>
                    <option value="Other Academy Course">Other Academy Course</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Learning Mode <span className="required">*</span>
                  </label>
                  <select
                    name="mode"
                    value={formData.mode}
                    onChange={handleChange}
                    className="form-select"
                    required
                  >
                    <option value="Offline">Offline (Classroom Campus)</option>
                    <option value="Online">Online (Live Interactive)</option>
                    <option value="Hybrid">Hybrid (Classroom + Online)</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-3">
                <div className="form-group">
                  <label className="form-label">
                    Course Duration <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleChange}
                    placeholder="e.g. 3 Months, 6 Weeks"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Course Fee (₹) <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="fee"
                    value={formData.fee}
                    onChange={handleChange}
                    placeholder="e.g. 15000"
                    className="form-input"
                    required
                    min={0}
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Available Seats
                  </label>
                  <input
                    type="number"
                    name="seats"
                    value={formData.seats}
                    onChange={handleChange}
                    placeholder="e.g. 30"
                    className="form-input"
                    min={1}
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Batch Schedule / Timings
                  </label>
                  <input
                    type="text"
                    name="schedule"
                    value={formData.schedule}
                    onChange={handleChange}
                    placeholder="e.g. Mon-Fri 10:00 AM - 12:00 PM"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Difficulty / Level
                  </label>
                  <select
                    name="level"
                    value={formData.level}
                    onChange={handleChange}
                    className="form-select"
                  >
                    <option value="All Levels">All Levels</option>
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">
                  Course Description <span className="required">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Provide detailed description of what students will achieve in this program..."
                  className="form-textarea"
                  style={{ minHeight: '85px' }}
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Key Syllabus / Modules (one per line)
                </label>
                <textarea
                  name="syllabus"
                  value={formData.syllabus}
                  onChange={handleChange}
                  placeholder="Module 1: Comprehensive Listening & Reading Strategies&#10;Module 2: Academic Writing Task 1 & 2 Masterclass&#10;Module 3: Daily Live Speaking Mock Sessions with Feedback&#10;Module 4: Full length simulation mock exam series"
                  className="form-textarea"
                  style={{ minHeight: '85px' }}
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label className="form-label">
                    Eligibility / Prerequisites
                  </label>
                  <input
                    type="text"
                    name="prerequisites"
                    value={formData.prerequisites}
                    onChange={handleChange}
                    placeholder="e.g. 10th or 12th Pass, Basic English comprehension"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Instruction Language
                  </label>
                  <input
                    type="text"
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    placeholder="e.g. English & Punjabi / English"
                    className="form-input"
                  />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', margin: '1rem 0 1.5rem 0' }}>
                <input
                  type="checkbox"
                  id="certCheck"
                  name="certification"
                  checked={formData.certification}
                  onChange={handleChange}
                  style={{ width: '18px', height: '18px', cursor: 'pointer' }}
                />
                <label htmlFor="certCheck" style={{ fontSize: '0.9rem', color: '#334155', cursor: 'pointer' }}>
                  Provide Certificate of Completion to graduating students
                </label>
              </div>

              <div style={{ display: 'flex', gap: '1rem', justifyContent: 'flex-end' }}>
                <button
                  type="button"
                  onClick={closeModal}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button type="submit" disabled={loading} className="btn btn-primary">
                  {loading ? 'Saving...' : editingId ? 'Update Course' : 'Publish Course'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageCourses;
