import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProviderCourses } from '../../redux/slices/courseSlice';
import { fetchProviderApplications } from '../../redux/slices/applicationSlice';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  Clock,
  CheckCircle,
  PlusCircle,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { providerCourses } = useSelector((state) => state.courses);
  const { providerApplications, unreadCount } = useSelector(
    (state) => state.applications
  );
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(fetchProviderCourses());
    dispatch(fetchProviderApplications());
  }, [dispatch]);

  const totalCourses = providerCourses.length;
  const totalApplications = providerApplications.length;
  const pendingApplications = providerApplications.filter(
    (a) => a.status === 'Pending'
  ).length;
  const acceptedApplications = providerApplications.filter(
    (a) => a.status === 'Accepted'
  ).length;

  return (
    <div>
      {/* Welcome Banner */}
      <div
        style={{
          background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 50%, #06b6d4 100%)',
          borderRadius: '20px',
          padding: '2rem 2.5rem',
          marginBottom: '2rem',
          boxShadow: '0 8px 24px rgba(79, 70, 229, 0.15)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1.5rem',
        }}
      >
        <div>
          <span
            style={{
              fontSize: '0.8rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: '#e0e7ff',
            }}
          >
            {user?.providerType || 'Course Provider'} Dashboard
          </span>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#ffffff', marginTop: '0.25rem' }}>
            Welcome, {user?.instituteName || 'Admin'}
          </h1>
          <p style={{ color: '#e0e7ff', fontSize: '0.95rem', marginTop: '0.25rem' }}>
            Manage your courses, view student applications, and expand your educational reach.
          </p>
        </div>

        <Link
          to="/admin/courses"
          className="btn btn-primary"
          style={{
            background: '#ffffff',
            color: '#4f46e5',
            fontWeight: 700,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
            border: 'none',
          }}
        >
          <PlusCircle size={18} />
          <span>Publish New Course</span>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="admin-stats-grid">
        <div className="admin-stat-card">
          <div className="admin-stat-icon indigo">
            <BookOpen size={26} />
          </div>
          <div>
            <div className="admin-stat-value">{totalCourses}</div>
            <div className="admin-stat-label">Published Courses</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon cyan">
            <Users size={26} />
          </div>
          <div>
            <div className="admin-stat-value">{totalApplications}</div>
            <div className="admin-stat-label">Total Applications</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon amber">
            <Clock size={26} />
          </div>
          <div>
            <div className="admin-stat-value">{pendingApplications}</div>
            <div className="admin-stat-label">Pending Review</div>
          </div>
        </div>

        <div className="admin-stat-card">
          <div className="admin-stat-icon emerald">
            <CheckCircle size={26} />
          </div>
          <div>
            <div className="admin-stat-value">{acceptedApplications}</div>
            <div className="admin-stat-label">Accepted Students</div>
          </div>
        </div>
      </div>

      {/* Recent Applications Section */}
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2 className="admin-panel-title">Recent Student Applications</h2>
          <Link
            to="/admin/notifications"
            style={{
              color: '#4f46e5',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>View All Applications</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {providerApplications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
            <Users size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
            <p>No student applications received yet.</p>
            <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>
              Once course seekers apply to your courses, their full details will appear here.
            </p>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Course Applied</th>
                  <th>Email & Phone</th>
                  <th>Qualification</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {providerApplications.slice(0, 5).map((app) => (
                  <tr key={app._id}>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>
                      {app.studentId?.name || 'Student'}
                    </td>
                    <td style={{ color: '#2563eb', fontWeight: 600 }}>
                      {app.courseId?.title || 'Course'}
                    </td>
                    <td>
                      <div>{app.studentId?.email}</div>
                      <div style={{ fontSize: '0.78rem', color: '#64748b' }}>
                        {app.studentId?.phone}
                      </div>
                    </td>
                    <td>{app.studentId?.qualification || 'N/A'}</td>
                    <td>
                      <span
                        className={`badge ${
                          app.status === 'Accepted'
                            ? 'badge-success'
                            : app.status === 'Rejected'
                            ? 'badge-danger'
                            : app.status === 'Withdrawn'
                            ? 'badge-neutral'
                            : 'badge-warning'
                        }`}
                      >
                        {app.status}
                      </span>
                    </td>
                    <td style={{ fontSize: '0.82rem', color: '#64748b' }}>
                      {new Date(app.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Courses Overview Preview */}
      <div className="admin-panel">
        <div className="admin-panel-header">
          <h2 className="admin-panel-title">Your Active Courses</h2>
          <Link
            to="/admin/courses"
            style={{
              color: '#4f46e5',
              fontSize: '0.88rem',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '0.35rem',
            }}
          >
            <span>Manage All Courses</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        {providerCourses.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem 1rem', color: '#64748b' }}>
            <BookOpen size={40} style={{ opacity: 0.3, marginBottom: '0.75rem' }} />
            <p>No courses published yet.</p>
            <Link
              to="/admin/courses"
              className="btn btn-primary btn-sm"
              style={{ marginTop: '0.75rem' }}
            >
              Add Your First Course
            </Link>
          </div>
        ) : (
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Course Title</th>
                  <th>Category</th>
                  <th>Mode</th>
                  <th>Duration</th>
                  <th>Fee</th>
                  <th>Applicants</th>
                </tr>
              </thead>
              <tbody>
                {providerCourses.slice(0, 5).map((course) => (
                  <tr key={course._id}>
                    <td style={{ fontWeight: 700, color: '#0f172a' }}>
                      {course.title}
                    </td>
                    <td>
                      <span className="badge badge-primary">{course.category}</span>
                    </td>
                    <td>{course.mode}</td>
                    <td>{course.duration}</td>
                    <td style={{ fontWeight: 700, color: '#059669' }}>
                      ₹{course.fee.toLocaleString()}
                    </td>
                    <td>
                      <span className="badge badge-secondary">
                        {course.applicationsCount || 0} applied
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
