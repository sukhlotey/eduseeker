import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfile, fetchUserProfile } from '../../redux/slices/authSlice';
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  Save,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const AdminProfile = () => {
  const dispatch = useDispatch();
  const { user, loading, error, successMessage } = useSelector(
    (state) => state.auth
  );

  const [formData, setFormData] = useState({
    instituteName: '',
    providerType: 'Academy',
    phone: '',
    country: '',
    state: '',
    city: '',
    address: '',
    about: '',
  });

  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData({
        instituteName: user.instituteName || '',
        providerType: user.providerType || 'Academy',
        phone: user.phone || '',
        country: user.country || '',
        state: user.state || '',
        city: user.city || '',
        address: user.address || '',
        about: user.about || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData)).then((res) => {
      if (!res.error) {
        setSavedSuccess(true);
        setTimeout(() => setSavedSuccess(false), 3000);
      }
    });
  };

  return (
    <div style={{ maxWidth: '850px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Institute Profile & Settings
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
          Update your Academy or IELTS Institute public profile and contact coordinates.
        </p>
      </div>

      {(savedSuccess || successMessage) && (
        <div className="alert alert-success">
          <CheckCircle2 size={18} />
          <span>Profile updated successfully!</span>
        </div>
      )}

      {error && (
        <div className="alert alert-error">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      <div className="admin-panel">
        <form onSubmit={handleSubmit}>
          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">
                Institute Name <span className="required">*</span>
              </label>
              <input
                type="text"
                name="instituteName"
                value={formData.instituteName}
                onChange={handleChange}
                className="form-input"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">
                Provider Type <span className="required">*</span>
              </label>
              <select
                name="providerType"
                value={formData.providerType}
                onChange={handleChange}
                className="form-select"
                required
              >
                <option value="Academy">Academy</option>
                <option value="IELTS Institute">IELTS Institute</option>
              </select>
            </div>
          </div>

          <div className="form-grid-2">
            <div className="form-group">
              <label className="form-label">Email Address (Account ID)</label>
              <input
                type="email"
                value={user?.email || ''}
                disabled
                className="form-input"
                style={{ background: '#f8fafc', color: '#64748b' }}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Phone Number</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
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
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label className="form-label">About Academy / IELTS Institute</label>
            <textarea
              name="about"
              value={formData.about}
              onChange={handleChange}
              placeholder="Tell prospective students about your institute's history, instructors, pass rates, and facilities..."
              className="form-textarea"
              style={{ minHeight: '110px' }}
            />
          </div>

          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" disabled={loading} className="btn btn-primary">
              <Save size={18} />
              <span>{loading ? 'Saving...' : 'Save Profile Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AdminProfile;
