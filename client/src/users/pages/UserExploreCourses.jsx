import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllCourses } from '../../redux/slices/courseSlice';
import {
  applyToCourse,
  fetchSeekerApplications,
  clearApplicationState,
} from '../../redux/slices/applicationSlice';
import {
  Search,
  Filter,
  Building2,
  Calendar,
  Clock,
  IndianRupee,
  CheckCircle2,
  AlertCircle,
  X,
  BookOpen,
  Award,
  Globe,
  MapPin,
  Send,
  Folder,
} from 'lucide-react';

const UserExploreCourses = () => {
  const dispatch = useDispatch();
  const { courses, loading: coursesLoading } = useSelector(
    (state) => state.courses
  );
  const {
    seekerApplications,
    loading: applyLoading,
    error: applyError,
    successMessage: applySuccess,
  } = useSelector((state) => state.applications);
  const { user } = useSelector((state) => state.auth);

  const [searchTerm, setSearchTerm] = useState('');
  const [providerTypeFilter, setProviderTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [modeFilter, setModeFilter] = useState('all');

  // Selected course for detailed modal
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [applicationNotes, setApplicationNotes] = useState('');

  useEffect(() => {
    dispatch(fetchAllCourses());
    if (user && user.role === 'seeker') {
      dispatch(fetchSeekerApplications());
    }
  }, [dispatch, user]);

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(
      fetchAllCourses({
        search: searchTerm,
        providerType: providerTypeFilter,
        category: categoryFilter,
        mode: modeFilter,
      })
    );
  };

  const handleFilterChange = (type, val) => {
    let updatedSearch = searchTerm;
    let updatedProv = providerTypeFilter;
    let updatedCat = categoryFilter;
    let updatedMode = modeFilter;

    if (type === 'providerType') {
      updatedProv = val;
      setProviderTypeFilter(val);
    } else if (type === 'category') {
      updatedCat = val;
      setCategoryFilter(val);
    } else if (type === 'mode') {
      updatedMode = val;
      setModeFilter(val);
    }

    dispatch(
      fetchAllCourses({
        search: updatedSearch,
        providerType: updatedProv,
        category: updatedCat,
        mode: updatedMode,
      })
    );
  };

  const openCourseModal = (course) => {
    setSelectedCourse(course);
    setApplicationNotes('');
    dispatch(clearApplicationState());
  };

  const closeCourseModal = () => {
    setSelectedCourse(null);
    setApplicationNotes('');
    dispatch(clearApplicationState());
  };

  const handleApply = (courseId) => {
    dispatch(applyToCourse({ courseId, notes: applicationNotes })).then((res) => {
      if (!res.error) {
        dispatch(fetchSeekerApplications());
      }
    });
  };

  // Check if current student has applied to this course
  const isApplied = (courseId) => {
    return seekerApplications.some(
      (app) => app.courseId?._id === courseId && app.status !== 'Withdrawn'
    );
  };

  const getApplicationStatus = (courseId) => {
    const found = seekerApplications.find(
      (app) => app.courseId?._id === courseId && app.status !== 'Withdrawn'
    );
    return found ? found.status : null;
  };

  return (
    <div>
      {/* Hero Banner */}
      <div className="explore-hero-banner">
        <h1 className="explore-hero-title">
          Explore Academies & IELTS Institutes
        </h1>
        <p className="explore-hero-subtitle">
          Find premier verified training academies, IELTS coaching institutes, and certified career programs tailored for your qualification and ambition.
        </p>
      </div>

      {/* Search & Filter Bar */}
      <form onSubmit={handleSearch} className="filter-bar">
        <div className="search-input-box">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search courses by keyword, topic, or skills..."
            className="form-input"
            style={{ paddingLeft: '2.5rem' }}
          />
          <Search
            size={18}
            style={{
              position: 'absolute',
              left: '0.9rem',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#94a3b8',
            }}
          />
        </div>

        <select
          value={providerTypeFilter}
          onChange={(e) => handleFilterChange('providerType', e.target.value)}
          className="form-select filter-select"
        >
          <option value="all">All Provider Types</option>
          <option value="Academy">Academy</option>
          <option value="IELTS Institute">IELTS Institute</option>
        </select>

        <select
          value={categoryFilter}
          onChange={(e) => handleFilterChange('category', e.target.value)}
          className="form-select filter-select"
        >
          <option value="all">All Categories</option>
          <option value="IELTS Academic">IELTS Academic</option>
          <option value="IELTS General">IELTS General</option>
          <option value="PTE">PTE Academic</option>
          <option value="Spoken English">Spoken English</option>
          <option value="Software">Software Engineering</option>
          <option value="Data">Data Science & AI</option>
          <option value="Business">Business Management</option>
        </select>

        <select
          value={modeFilter}
          onChange={(e) => handleFilterChange('mode', e.target.value)}
          className="form-select filter-select"
        >
          <option value="all">All Modes</option>
          <option value="Offline">Offline Campus</option>
          <option value="Online">Online Live</option>
          <option value="Hybrid">Hybrid</option>
        </select>

        <button type="submit" className="btn btn-primary">
          <Search size={16} />
          <span>Search</span>
        </button>
      </form>

      {/* Courses Grid */}
      {coursesLoading ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
          Loading courses...
        </div>
      ) : courses.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            padding: '4rem 1rem',
          }}
        >
          <BookOpen size={48} style={{ color: '#2563eb', opacity: 0.3, marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>No Courses Found</h3>
          <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
            Try adjusting your search keywords or clearing filter parameters.
          </p>
        </div>
      ) : (
        <div className="courses-grid">
          {courses.map((course) => {
            const alreadyApplied = isApplied(course._id);
            const appStatus = getApplicationStatus(course._id);

            return (
              <div key={course._id} className="course-card">
                <div className="course-card-body">
                  {/* Institute Header */}
                  <div className="course-provider-header">
                    <span className="course-institute-name">
                      <Building2 size={16} />
                      {course.providerId?.instituteName || 'Education Provider'}
                    </span>
                    <span className="badge badge-secondary">
                      {course.providerId?.providerType || 'Academy'}
                    </span>
                  </div>

                  <h3 className="course-title">{course.title}</h3>
                  <p className="course-desc">{course.description}</p>

                  {/* Meta Tags */}
                  <div className="course-meta-tags">
                    <span className="course-meta-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Folder size={13} color="#2563eb" />
                      <span>{course.category}</span>
                    </span>
                    <span className="course-meta-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <MapPin size={13} color="#059669" />
                      <span>{course.mode}</span>
                    </span>
                    <span className="course-meta-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={13} color="#d97706" />
                      <span>{course.duration}</span>
                    </span>
                    <span className="course-meta-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Award size={13} color="#7c3aed" />
                      <span>{course.level}</span>
                    </span>
                    {course.providerId?.city && (
                      <span className="course-meta-tag" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.3rem' }}>
                        <Building2 size={13} color="#64748b" />
                        <span>{course.providerId.city}</span>
                      </span>
                    )}
                  </div>

                  {/* Card Footer */}
                  <div className="course-card-footer">
                    <div className="course-fee">
                      ₹{course.fee?.toLocaleString()}
                      <span> / total fee</span>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button
                        onClick={() => openCourseModal(course)}
                        className="btn btn-secondary btn-sm"
                      >
                        Details
                      </button>

                      {alreadyApplied ? (
                        <span
                          className="badge badge-success"
                          style={{ padding: '0.45rem 0.75rem' }}
                        >
                          Applied ({appStatus})
                        </span>
                      ) : (
                        <button
                          onClick={() => openCourseModal(course)}
                          className="btn btn-primary btn-sm"
                        >
                          Apply Now
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Detailed Course & Application Modal */}
      {selectedCourse && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                  <span className="badge badge-primary">{selectedCourse.category}</span>
                  <span className="badge badge-secondary">
                    {selectedCourse.providerId?.providerType || 'Academy'}
                  </span>
                </div>
                <h2 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#0f172a' }}>
                  {selectedCourse.title}
                </h2>
                <div style={{ fontSize: '0.88rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.4rem', marginTop: '0.25rem' }}>
                  <Building2 size={15} color="#2563eb" />
                  <strong>{selectedCourse.providerId?.instituteName}</strong>
                  {selectedCourse.providerId?.city && (
                    <span>• {selectedCourse.providerId.city}, {selectedCourse.providerId.state}</span>
                  )}
                </div>
              </div>
              <button onClick={closeCourseModal} className="modal-close-btn">
                <X size={18} />
              </button>
            </div>

            {applySuccess && (
              <div className="alert alert-success">
                <CheckCircle2 size={18} />
                <span>{applySuccess}</span>
              </div>
            )}

            {applyError && (
              <div className="alert alert-error">
                <AlertCircle size={18} />
                <span>{applyError}</span>
              </div>
            )}

            {/* Quick Specs Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.75rem',
                background: '#f8fafc',
                padding: '1rem',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
                marginBottom: '1.25rem',
                fontSize: '0.85rem',
              }}
            >
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem' }}>FEE</span>
                <strong style={{ color: '#059669', fontSize: '1.1rem' }}>
                  ₹{selectedCourse.fee?.toLocaleString()}
                </strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem' }}>DURATION</span>
                <strong>{selectedCourse.duration}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem' }}>MODE</span>
                <strong>{selectedCourse.mode}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem' }}>LEVEL</span>
                <strong>{selectedCourse.level}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b', display: 'block', fontSize: '0.75rem' }}>SCHEDULE</span>
                <strong>{selectedCourse.schedule}</strong>
              </div>
            </div>

            {/* Description */}
            <div style={{ marginBottom: '1.25rem' }}>
              <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.4rem', color: '#1e293b' }}>
                Course Overview
              </h4>
              <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.6' }}>
                {selectedCourse.description}
              </p>
            </div>

            {/* Syllabus */}
            {selectedCourse.syllabus && selectedCourse.syllabus.length > 0 && (
              <div style={{ marginBottom: '1.25rem' }}>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.5rem', color: '#1e293b' }}>
                  Key Modules & Curriculum Highlights
                </h4>
                <ul style={{ paddingLeft: '1.2rem', color: '#475569', fontSize: '0.88rem', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                  {selectedCourse.syllabus.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Prerequisites & Language */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
                fontSize: '0.85rem',
                marginBottom: '1.25rem',
                background: '#f8fafc',
                padding: '0.85rem 1rem',
                borderRadius: '10px',
              }}
            >
              <div>
                <span style={{ color: '#64748b' }}>Prerequisites: </span>
                <strong>{selectedCourse.prerequisites || 'None'}</strong>
              </div>
              <div>
                <span style={{ color: '#64748b' }}>Language: </span>
                <strong>{selectedCourse.language || 'English'}</strong>
              </div>
            </div>

            {/* Application Section */}
            {isApplied(selectedCourse._id) ? (
              <div
                style={{
                  background: '#d1fae5',
                  color: '#065f46',
                  padding: '1rem',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                }}
              >
                <CheckCircle2 size={20} />
                <span>
                  You have already applied for this course. (Status: {getApplicationStatus(selectedCourse._id)})
                </span>
              </div>
            ) : (
              <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '1.25rem', marginTop: '1rem' }}>
                <label className="form-label" style={{ marginBottom: '0.35rem' }}>
                  Add a Note / Query for the Institute (Optional):
                </label>
                <textarea
                  value={applicationNotes}
                  onChange={(e) => setApplicationNotes(e.target.value)}
                  placeholder="e.g. Inquiring regarding demo class timing or batch start date..."
                  className="form-textarea"
                  style={{ minHeight: '70px', marginBottom: '1rem' }}
                />

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                  <button onClick={closeCourseModal} className="btn btn-secondary">
                    Close
                  </button>
                  <button
                    onClick={() => handleApply(selectedCourse._id)}
                    disabled={applyLoading}
                    className="btn btn-primary"
                  >
                    <Send size={16} />
                    <span>{applyLoading ? 'Submitting Application...' : 'Apply for This Course'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserExploreCourses;
