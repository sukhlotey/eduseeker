import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchProviderApplications,
  updateAppStatus,
} from '../../redux/slices/applicationSlice';
import {
  Bell,
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  BookOpen,
  CheckCircle,
  XCircle,
  Clock,
  Filter,
  MessageSquare,
} from 'lucide-react';

const ApplicantNotifications = () => {
  const dispatch = useDispatch();
  const { providerApplications, loading } = useSelector(
    (state) => state.applications
  );

  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    dispatch(fetchProviderApplications());
  }, [dispatch]);

  const handleStatusChange = (applicationId, status) => {
    dispatch(updateAppStatus({ applicationId, status }));
  };

  const filteredApplications = providerApplications.filter((app) => {
    if (statusFilter === 'all') return true;
    return app.status.toLowerCase() === statusFilter.toLowerCase();
  });

  return (
    <div>
      {/* Header */}
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
            Student Applications & Notifications
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
            Live applications submitted by Course Seekers with full student profile and contact credentials.
          </p>
        </div>

        {/* Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', background: '#ffffff', padding: '0.35rem', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
          {['all', 'pending', 'accepted', 'rejected'].map((filter) => (
            <button
              key={filter}
              onClick={() => setStatusFilter(filter)}
              style={{
                padding: '0.45rem 0.9rem',
                borderRadius: '8px',
                fontSize: '0.82rem',
                fontWeight: 600,
                textTransform: 'capitalize',
                background: statusFilter === filter ? '#4f46e5' : 'transparent',
                color: statusFilter === filter ? '#ffffff' : '#64748b',
                transition: 'all 0.15s ease',
                border: 'none',
                cursor: 'pointer',
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {loading && providerApplications.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '4rem', color: '#64748b' }}>
          Loading student applications...
        </div>
      ) : filteredApplications.length === 0 ? (
        <div className="admin-panel" style={{ textAlign: 'center', padding: '4rem 1rem' }}>
          <Bell size={48} style={{ color: '#4f46e5', opacity: 0.3, marginBottom: '1rem' }} />
          <h3 style={{ color: '#0f172a', marginBottom: '0.5rem' }}>No Applications Found</h3>
          <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
            {statusFilter === 'all'
              ? 'When course seekers submit an application for your courses, their full student details and chosen course will be displayed here.'
              : `No applications with status "${statusFilter}" currently.`}
          </p>
        </div>
      ) : (
        <div className="admin-panel" style={{ padding: '0.5rem' }}>
          {/* Responsive Table Container */}
          <div className="table-responsive">
            <table className="admin-table">
              <thead>
                <tr>
                  <th style={{ minWidth: '180px' }}>Student Profile</th>
                  <th style={{ minWidth: '180px' }}>Contact Details</th>
                  <th style={{ minWidth: '200px' }}>Location & Address</th>
                  <th style={{ minWidth: '220px' }}>Course Applied</th>
                  <th style={{ minWidth: '130px' }}>Applied Date</th>
                  <th style={{ minWidth: '110px' }}>Status</th>
                  <th style={{ minWidth: '170px', textAlign: 'center' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApplications.map((app) => (
                  <tr key={app._id}>
                    {/* Student Profile */}
                    <td>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                        <div
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '10px',
                            background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)',
                            color: 'white',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontWeight: 700,
                            fontSize: '0.95rem',
                            flexShrink: 0,
                          }}
                        >
                          {app.studentId?.name ? app.studentId.name.charAt(0).toUpperCase() : 'S'}
                        </div>
                        <div>
                          <div style={{ fontWeight: 700, color: '#0f172a', fontSize: '0.95rem' }}>
                            {app.studentId?.name || 'Applicant'}
                          </div>
                          <div style={{ fontSize: '0.78rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                            <GraduationCap size={13} color="#4f46e5" />
                            <span>{app.studentId?.qualification || 'Not provided'}</span>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Contact Details */}
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.85rem', color: '#1e293b' }}>
                          <Mail size={14} color="#2563eb" style={{ flexShrink: 0 }} />
                          <span style={{ wordBreak: 'break-all' }}>{app.studentId?.email || 'N/A'}</span>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.82rem', color: '#64748b' }}>
                          <Phone size={14} color="#059669" style={{ flexShrink: 0 }} />
                          <span>{app.studentId?.phone || 'N/A'}</span>
                        </div>
                      </div>
                    </td>

                    {/* Location & Address */}
                    <td>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', fontSize: '0.86rem', fontWeight: 600, color: '#0f172a' }}>
                          <MapPin size={14} color="#dc2626" style={{ flexShrink: 0 }} />
                          <span>
                            {app.studentId?.city ? `${app.studentId.city}, ${app.studentId.state}, ${app.studentId.country}` : 'Global Location'}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.78rem', color: '#64748b', paddingLeft: '1.2rem', lineHeight: '1.4' }}>
                          {app.studentId?.address || 'No street address specified'}
                        </div>
                      </div>
                    </td>

                    {/* Course Applied */}
                    <td>
                      <div>
                        <div style={{ fontWeight: 700, color: '#1d4ed8', fontSize: '0.94rem', marginBottom: '0.25rem' }}>
                          {app.courseId?.title || 'Selected Course'}
                        </div>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '0.25rem' }}>
                          <span className="badge badge-primary" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                            {app.courseId?.category}
                          </span>
                          <span className="badge badge-secondary" style={{ fontSize: '0.7rem', padding: '0.15rem 0.45rem' }}>
                            {app.courseId?.mode}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.82rem', color: '#059669', fontWeight: 700 }}>
                          ₹{app.courseId?.fee?.toLocaleString() || 0}
                          <span style={{ color: '#64748b', fontWeight: 400, fontSize: '0.75rem' }}> ({app.courseId?.duration})</span>
                        </div>
                        {app.notes && (
                          <div style={{ marginTop: '0.35rem', background: '#f8fafc', padding: '0.35rem 0.55rem', borderRadius: '6px', fontSize: '0.76rem', color: '#475569', fontStyle: 'italic', border: '1px solid #e2e8f0' }}>
                            <MessageSquare size={12} style={{ display: 'inline', marginRight: 4 }} />
                            "{app.notes}"
                          </div>
                        )}
                      </div>
                    </td>

                    {/* Applied Date */}
                    <td>
                      <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#1e293b' }}>
                        {new Date(app.createdAt).toLocaleDateString()}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b' }}>
                        {new Date(app.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </div>
                    </td>

                    {/* Status */}
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
                        style={{ fontSize: '0.78rem' }}
                      >
                        {app.status}
                      </span>
                    </td>

                    {/* Actions */}
                    <td>
                      {app.status === 'Withdrawn' ? (
                        <div style={{ fontSize: '0.8rem', color: '#94a3b8', fontStyle: 'italic', textAlign: 'center' }}>
                          Withdrawn by student
                        </div>
                      ) : (
                        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.45rem' }}>
                          {app.status !== 'Accepted' && (
                            <button
                              onClick={() => handleStatusChange(app._id, 'Accepted')}
                              className="btn btn-sm btn-success"
                              style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                              title="Accept Student Application"
                            >
                              <CheckCircle size={14} />
                              <span>Accept</span>
                            </button>
                          )}

                          {app.status !== 'Rejected' && (
                            <button
                              onClick={() => handleStatusChange(app._id, 'Rejected')}
                              className="btn btn-sm btn-outline-danger"
                              style={{ padding: '0.35rem 0.65rem', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                              title="Reject Application"
                            >
                              <XCircle size={14} />
                              <span>Reject</span>
                            </button>
                          )}
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicantNotifications;
