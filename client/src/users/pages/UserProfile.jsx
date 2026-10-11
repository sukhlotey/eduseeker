import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile } from '../../redux/slices/authSlice';
import {
  fetchSeekerApplications,
  withdrawSeekerApplication,
} from '../../redux/slices/applicationSlice';
import {
  User,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Save,
  CheckCircle2,
  AlertCircle,
  Building2,
  RotateCcw,
} from 'lucide-react';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, loading: authLoading, error: authError } = useSelector(
    (state) => state.auth
  );
  const { seekerApplications } = useSelector((state) => state.applications);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    address: '',
    qualification: '',
  });

  const [saveSuccess, setSaveSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        phone: user.phone || '',
        country: user.country || '',
        state: user.state || '',
        city: user.city || '',
        address: user.address || '',
        qualification: user.qualification || '',
      });
    }
    dispatch(fetchSeekerApplications());
  }, [user, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData)).then((res) => {
      if (!res.error) {
        setSaveSuccess(true);
        setTimeout(() => setSaveSuccess(false), 3000);
      }
    });
  };

  const handleWithdraw = (applicationId, courseTitle) => {
    if (
      window.confirm(
        `Are you sure you want to withdraw your application for "${courseTitle}"?`
      )
    ) {
      dispatch(withdrawSeekerApplication(applicationId));
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto' }}>
      {/* Page Title */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          My Student Profile
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
          Manage your personal details, higher qualifications, and review chosen institutes & courses.
        </p>
      </div>

      {saveSuccess && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>Profile changes saved successfully!</span>
        </div>
      )}

      {authError && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{authError}</span>
        </div>
      )}

      {/* Profile Form Card */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
          marginBottom: '2.5rem',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
          Personal & Academic Information
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">
                Full Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Email Address (Account ID)
              </label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="form-input"
                style={{ background: '#f8fafc', color: '#64748b' }}
              />
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91 98765 43210"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Higher Qualification</label>
              <input
                type="text"
                name="qualification"
                value={formData.qualification}
                onChange={handleChange}
                placeholder="e.g. 12th Grade, Graduate, B.Tech"
                className="form-input"
              />
            </div>
          </div>

          <div className="form-grid-3">
            <div className="form-group">
              <label className="form-label">Country</label>
              <input
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">State</label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label className="form-label">City</label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-input"
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Full Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Residential address, Street, Locality"
              className="form-input"
            />
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button
              type="submit"
              disabled={authLoading}
              className="btn btn-primary"
            >
              <Save size={18} />
              <span>{authLoading ? 'Saving...' : 'Save Profile Details'}</span>
            </button>
          </div>
        </form>
      </div>

      {/* Applied Courses & Chosen Institutes Overview Section */}
      <div
        style={{
          background: '#ffffff',
          borderRadius: '18px',
          border: '1px solid #e2e8f0',
          padding: '2rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)',
        }}
      >
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a', marginBottom: '1.25rem', borderBottom: '1px solid #f1f5f9', paddingBottom: '0.75rem' }}>
          Your Chosen Institutes & Applied Courses
        </h3>

        {seekerApplications.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '2rem 1rem', color: '#64748b' }}>
            <p>You haven't chosen or applied to any courses yet.</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {seekerApplications.map((app) => (
              <div
                key={app._id}
                style={{
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  background: '#f8fafc',
                }}
              >
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#2563eb', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <Building2 size={15} />
                    {app.providerId?.instituteName} ({app.providerId?.providerType})
                  </div>
                  <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#0f172a', marginTop: '0.2rem' }}>
                    {app.courseId?.title}
                  </h4>
                  <div style={{ fontSize: '0.82rem', color: '#64748b', marginTop: '0.2rem' }}>
                    Fee: ₹{app.courseId?.fee?.toLocaleString()} | Mode: {app.courseId?.mode}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
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

                  {app.status !== 'Withdrawn' && (
                    <button
                      onClick={() => handleWithdraw(app._id, app.courseId?.title)}
                      className="btn btn-outline-danger btn-sm"
                      style={{ padding: '0.35rem 0.65rem', fontSize: '0.8rem' }}
                    >
                      <RotateCcw size={13} />
                      <span>Withdraw</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserProfile;
