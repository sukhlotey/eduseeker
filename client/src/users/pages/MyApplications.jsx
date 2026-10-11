import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchSeekerApplications,
  withdrawSeekerApplication,
} from '../../redux/slices/applicationSlice';
import {
  BookmarkCheck,
  Building2,
  Calendar,
  Clock,
  IndianRupee,
  MapPin,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  RotateCcw,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const MyApplications = () => {
  const dispatch = useDispatch();
  const { seekerApplications, loading, successMessage, error } = useSelector(
    (state) => state.applications
  );

  useEffect(() => {
    dispatch(fetchSeekerApplications());
  }, [dispatch]);

  const handleWithdraw = (applicationId, courseTitle) => {
    if (
      window.confirm(
        `Are you sure you want to withdraw your application for "${courseTitle}"? The institute will be updated.`
      )
    ) {
      dispatch(withdrawSeekerApplication(applicationId));
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          My Course Applications
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Track the status of all academies and courses you have applied for, and manage or withdraw applications.
        </p>
      </div>

      {successMessage && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>{successMessage}</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <XCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {loading && seekerApplications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
          Loading your applications...
        </div>
      ) : seekerApplications.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            padding: '4rem 1rem',
          }}
        >
          <BookmarkCheck size={48} style={{ color: '#2563eb', opacity: 0.3, marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>No Applications Yet</h3>
          <p style={{ color: '#64748b', fontSize: '0.92rem', marginBottom: '1.5rem' }}>
            You haven't applied to any courses yet. Explore our verified academies and IELTS institutes to get started!
          </p>
          <Link to="/seeker/explore" className="btn btn-primary">
            Explore & Apply for Courses
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          {seekerApplications.map((app) => (
            <div key={app._id} className="application-card">
              <div className="app-card-top">
                <div>
                  {/* Institute Chosen */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.35rem' }}>
                    <span className="badge badge-secondary">
                      {app.providerId?.providerType || 'Academy / Institute'}
                    </span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#2563eb', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Building2 size={16} />
                      {app.providerId?.instituteName || 'Education Institute'}
                    </span>
                  </div>

                  {/* Course Chosen */}
                  <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a', marginBottom: '0.25rem' }}>
                    {app.courseId?.title || 'Selected Course'}
                  </h3>

                  <div style={{ fontSize: '0.82rem', color: '#64748b' }}>
                    Applied on: {new Date(app.createdAt).toLocaleDateString()} at{' '}
                    {new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>

                {/* Status Badge */}
                <div style={{ textAlign: 'right' }}>
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
                    style={{ fontSize: '0.85rem', padding: '0.4rem 0.85rem' }}
                  >
                    {app.status}
                  </span>
                </div>
              </div>

              {/* Meta Grid */}
              <div className="app-meta-box">
                <div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block' }}>
                    Category
                  </span>
                  <strong>{app.courseId?.category || 'General'}</strong>
                </div>

                <div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block' }}>
                    Learning Mode
                  </span>
                  <strong>{app.courseId?.mode || 'Offline'}</strong>
                </div>

                <div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block' }}>
                    Duration
                  </span>
                  <strong>{app.courseId?.duration || 'Standard'}</strong>
                </div>

                <div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block' }}>
                    Tuition Fee
                  </span>
                  <strong style={{ color: '#059669', fontSize: '1.05rem' }}>
                    ₹{app.courseId?.fee?.toLocaleString() || 0}
                  </strong>
                </div>

                <div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block' }}>
                    Institute Location
                  </span>
                  <span>
                    {app.providerId?.city
                      ? `${app.providerId.city}, ${app.providerId.state}`
                      : 'Campus Address'}
                  </span>
                </div>

                <div>
                  <span style={{ color: '#64748b', fontSize: '0.75rem', textTransform: 'uppercase', display: 'block' }}>
                    Contact Phone
                  </span>
                  <span>{app.providerId?.phone || 'Contact on campus'}</span>
                </div>
              </div>

              {/* Withdraw Button if still active */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid #f1f5f9' }}>
                {app.status !== 'Withdrawn' ? (
                  <button
                    onClick={() => handleWithdraw(app._id, app.courseId?.title)}
                    className="btn btn-outline-danger btn-sm"
                    style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                  >
                    <RotateCcw size={15} />
                    <span>Withdraw Application</span>
                  </button>
                ) : (
                  <span style={{ fontSize: '0.85rem', color: '#94a3b8', fontStyle: 'italic' }}>
                    This application was withdrawn by you.
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MyApplications;
