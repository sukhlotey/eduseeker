import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, clearAuthMessages } from '../redux/slices/authSlice';
import { useNavigate, Link } from 'react-router-dom';
import {
  GraduationCap,
  Building2,
  Mail,
  Lock,
  Phone,
  MapPin,
  Globe,
  Award,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Eye,
  EyeOff,
} from 'lucide-react';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, loading, error, successMessage } = useSelector((state) => state.auth);

  // Type: "seeker" (Course Seeker) or "provider" (Course Provider)
  const [userType, setUserType] = useState('seeker');
  const [showSeekerPassword, setShowSeekerPassword] = useState(false);
  const [showProviderPassword, setShowProviderPassword] = useState(false);

  // Course Seeker form state
  const [seekerForm, setSeekerForm] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    state: '',
    city: '',
    address: '',
    qualification: '',
    password: '',
  });

  // Course Provider form state
  const [providerForm, setProviderForm] = useState({
    providerType: 'Academy', // 'Academy' or 'IELTS Institute'
    instituteName: '',
    country: '',
    state: '',
    city: '',
    address: '',
    email: '',
    phone: '',
    password: '',
  });

  useEffect(() => {
    dispatch(clearAuthMessages());
  }, [userType, dispatch]);

  useEffect(() => {
    if (user) {
      if (user.role === 'provider') {
        navigate('/admin/dashboard');
      } else {
        navigate('/seeker/explore');
      }
    }
  }, [user, navigate]);

  const handleSeekerChange = (e) => {
    setSeekerForm({ ...seekerForm, [e.target.name]: e.target.value });
  };

  const handleProviderChange = (e) => {
    setProviderForm({ ...providerForm, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (userType === 'seeker') {
      const payload = {
        role: 'seeker',
        name: seekerForm.name,
        email: seekerForm.email,
        phone: seekerForm.phone,
        country: seekerForm.country,
        state: seekerForm.state,
        city: seekerForm.city,
        address: seekerForm.address,
        qualification: seekerForm.qualification,
        password: seekerForm.password,
      };
      dispatch(registerUser(payload));
    } else {
      const payload = {
        role: 'provider',
        providerType: providerForm.providerType,
        instituteName: providerForm.instituteName,
        country: providerForm.country,
        state: providerForm.state,
        city: providerForm.city,
        address: providerForm.address,
        email: providerForm.email,
        phone: providerForm.phone,
        password: providerForm.password,
      };
      dispatch(registerUser(payload));
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem 1rem', background: 'radial-gradient(ellipse at top, #e0e7ff 0%, #f8fafc 70%)' }}>
      <div style={{ maxWidth: '680px', width: '100%', background: '#ffffff', borderRadius: '24px', boxShadow: '0 20px 40px -10px rgba(79, 70, 229, 0.12)', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
        
        {/* Header */}
        <div style={{ background: 'linear-gradient(135deg, #4f46e5 0%, #3b82f6 100%)', padding: '2.5rem 2rem', color: '#ffffff', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.6rem', background: 'rgba(255, 255, 255, 0.15)', padding: '0.4rem 1rem', borderRadius: '9999px', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.75rem' }}>
            <span>EduSeeker Portal</span>
          </div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#ffffff', marginBottom: '0.5rem' }}>
            Create Your Account
          </h1>
          <p style={{ color: '#e0e7ff', fontSize: '0.95rem' }}>
            Choose whether you are looking for courses or offering educational programs
          </p>
        </div>

        <div style={{ padding: '2rem 2.5rem' }}>
          {error && (
            <div className="alert alert-error">
              <AlertCircle size={18} />
              <span>{error}</span>
            </div>
          )}

          {successMessage && (
            <div className="alert alert-success">
              <CheckCircle2 size={18} />
              <span>{successMessage}</span>
            </div>
          )}

          {/* First show type selector: "Course Seeker" or "Course Provider" */}
          <div style={{ marginBottom: '2rem' }}>
            <label style={{ fontSize: '0.85rem', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em', display: 'block', marginBottom: '0.75rem' }}>
              Select Registration Type:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              
              <button
                type="button"
                onClick={() => setUserType('seeker')}
                style={{
                  padding: '1.2rem 1rem',
                  borderRadius: '16px',
                  border: userType === 'seeker' ? '2.5px solid #4f46e5' : '1.5px solid #e2e8f0',
                  background: userType === 'seeker' ? '#f5f3ff' : '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: userType === 'seeker' ? '0 8px 16px rgba(79, 70, 229, 0.12)' : 'none',
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: userType === 'seeker' ? '#4f46e5' : '#f1f5f9',
                  color: userType === 'seeker' ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <GraduationCap size={24} />
                </div>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: userType === 'seeker' ? '#4f46e5' : '#1e293b' }}>
                  Course Seeker
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748b', textAlign: 'center' }}>
                  Students & Aspirants seeking courses
                </span>
              </button>

              <button
                type="button"
                onClick={() => setUserType('provider')}
                style={{
                  padding: '1.2rem 1rem',
                  borderRadius: '16px',
                  border: userType === 'provider' ? '2.5px solid #4f46e5' : '1.5px solid #e2e8f0',
                  background: userType === 'provider' ? '#f5f3ff' : '#ffffff',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '0.5rem',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  boxShadow: userType === 'provider' ? '0 8px 16px rgba(79, 70, 229, 0.12)' : 'none',
                }}
              >
                <div style={{
                  width: '46px',
                  height: '46px',
                  borderRadius: '12px',
                  background: userType === 'provider' ? '#4f46e5' : '#f1f5f9',
                  color: userType === 'provider' ? '#ffffff' : '#64748b',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  <Building2 size={24} />
                </div>
                <span style={{ fontWeight: 800, fontSize: '1rem', color: userType === 'provider' ? '#4f46e5' : '#1e293b' }}>
                  Course Provider
                </span>
                <span style={{ fontSize: '0.78rem', color: '#64748b', textAlign: 'center' }}>
                  Academies & IELTS Institutes (Admin)
                </span>
              </button>

            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* If Course Seeker is chosen */}
            {userType === 'seeker' && (
              <div>
                <div className="form-group">
                  <label className="form-label">
                    Full Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={seekerForm.name}
                    onChange={handleSeekerChange}
                    placeholder="Enter your full name"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={seekerForm.email}
                      onChange={handleSeekerChange}
                      placeholder="student@example.com"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={seekerForm.phone}
                      onChange={handleSeekerChange}
                      placeholder="+91 98765 43210"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label className="form-label">Country <span className="required">*</span></label>
                    <input
                      type="text"
                      name="country"
                      value={seekerForm.country}
                      onChange={handleSeekerChange}
                      placeholder="e.g. India"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State <span className="required">*</span></label>
                    <input
                      type="text"
                      name="state"
                      value={seekerForm.state}
                      onChange={handleSeekerChange}
                      placeholder="e.g. Punjab"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City <span className="required">*</span></label>
                    <input
                      type="text"
                      name="city"
                      value={seekerForm.city}
                      onChange={handleSeekerChange}
                      placeholder="e.g. Ludhiana"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Full Address <span className="required">*</span></label>
                  <input
                    type="text"
                    name="address"
                    value={seekerForm.address}
                    onChange={handleSeekerChange}
                    placeholder="Street, Landmark, Apartment"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Higher Qualification <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="qualification"
                    value={seekerForm.qualification}
                    onChange={handleSeekerChange}
                    placeholder="e.g. 12th Grade, Bachelor's in CS, Graduate"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Password <span className="required">*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showSeekerPassword ? 'text' : 'password'}
                      name="password"
                      value={seekerForm.password}
                      onChange={handleSeekerChange}
                      placeholder="Create a strong password (min 6 characters)"
                      className="form-input"
                      style={{ paddingRight: '2.75rem' }}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowSeekerPassword(!showSeekerPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.85rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.2rem',
                      }}
                      title={showSeekerPassword ? 'Hide password' : 'Show password'}
                    >
                      {showSeekerPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* If Course Provider is chosen */}
            {userType === 'provider' && (
              <div>
                <div className="form-group">
                  <label className="form-label">
                    Type: Academy or IELTS Institute <span className="required">*</span>
                  </label>
                  <select
                    name="providerType"
                    value={providerForm.providerType}
                    onChange={handleProviderChange}
                    className="form-select"
                    required
                  >
                    <option value="Academy">Academy</option>
                    <option value="IELTS Institute">IELTS Institute</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Name of Academy or IELTS Institute <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="instituteName"
                    value={providerForm.instituteName}
                    onChange={handleProviderChange}
                    placeholder="e.g. Apex IELTS Coaching & Academy"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-grid-3">
                  <div className="form-group">
                    <label className="form-label">Country <span className="required">*</span></label>
                    <input
                      type="text"
                      name="country"
                      value={providerForm.country}
                      onChange={handleProviderChange}
                      placeholder="e.g. India"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">State <span className="required">*</span></label>
                    <input
                      type="text"
                      name="state"
                      value={providerForm.state}
                      onChange={handleProviderChange}
                      placeholder="e.g. Punjab"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">City <span className="required">*</span></label>
                    <input
                      type="text"
                      name="city"
                      value={providerForm.city}
                      onChange={handleProviderChange}
                      placeholder="e.g. Amritsar"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Full Address <span className="required">*</span></label>
                  <input
                    type="text"
                    name="address"
                    value={providerForm.address}
                    onChange={handleProviderChange}
                    placeholder="Campus address, Building, Road"
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-grid-2">
                  <div className="form-group">
                    <label className="form-label">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={providerForm.email}
                      onChange={handleProviderChange}
                      placeholder="contact@institute.com"
                      className="form-input"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={providerForm.phone}
                      onChange={handleProviderChange}
                      placeholder="+91 98123 45678"
                      className="form-input"
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Password <span className="required">*</span>
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showProviderPassword ? 'text' : 'password'}
                      name="password"
                      value={providerForm.password}
                      onChange={handleProviderChange}
                      placeholder="Create admin password"
                      className="form-input"
                      style={{ paddingRight: '2.75rem' }}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowProviderPassword(!showProviderPassword)}
                      style={{
                        position: 'absolute',
                        right: '0.85rem',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'transparent',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#64748b',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        padding: '0.2rem',
                      }}
                      title={showProviderPassword ? 'Hide password' : 'Show password'}
                    >
                      {showProviderPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary btn-block"
              style={{ marginTop: '1.5rem', padding: '0.9rem' }}
            >
              {loading ? 'Creating Account...' : (
                <>
                  <span>Register as {userType === 'seeker' ? 'Course Seeker' : 'Course Provider'}</span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.92rem', color: '#64748b' }}>
            Already have an account?{' '}
            <Link to="/login" style={{ color: '#4f46e5', fontWeight: 700 }}>
              Sign In here
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Register;
