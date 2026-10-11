import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInstitutes } from '../../redux/slices/courseSlice';
import { useNavigate } from 'react-router-dom';
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  BookOpen,
  ArrowRight,
  ExternalLink,
  Info,
  X,
  Globe,
  CheckCircle,
} from 'lucide-react';

const InstitutesList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { institutes } = useSelector((state) => state.courses);

  const [selectedInstitute, setSelectedInstitute] = useState(null);

  useEffect(() => {
    dispatch(fetchInstitutes());
  }, [dispatch]);

  const handleViewCourses = (instituteId) => {
    navigate(`/seeker/explore?instituteId=${instituteId}`);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: '#0f172a' }}>
          Registered Academies & IELTS Institutes
        </h1>
        <p style={{ color: '#64748b', fontSize: '0.95rem' }}>
          Connect with trusted institutions, study centers, and language coaching academies.
        </p>
      </div>

      {institutes.length === 0 ? (
        <div
          style={{
            background: '#ffffff',
            borderRadius: '16px',
            border: '1px solid #e2e8f0',
            textAlign: 'center',
            padding: '4rem 1rem',
          }}
        >
          <Building2 size={48} style={{ color: '#2563eb', opacity: 0.3, marginBottom: '1rem' }} />
          <h3 style={{ marginBottom: '0.5rem', color: '#0f172a' }}>No Institutes Registered Yet</h3>
          <p style={{ color: '#64748b', fontSize: '0.92rem' }}>
            Check back soon as new academies and IELTS institutes join EduSeeker.
          </p>
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(330px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {institutes.map((inst) => (
            <div
              key={inst._id}
              style={{
                background: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: '18px',
                padding: '1.75rem',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.04)',
                transition: 'all 0.2s ease',
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: inst.providerType === 'IELTS Institute' ? '#eff6ff' : '#f5f3ff',
                    color: inst.providerType === 'IELTS Institute' ? '#2563eb' : '#7c3aed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Building2 size={24} />
                </div>
                <span
                  className={`badge ${
                    inst.providerType === 'IELTS Institute'
                      ? 'badge-secondary'
                      : 'badge-primary'
                  }`}
                >
                  {inst.providerType || 'Academy'}
                </span>
              </div>

              <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.4rem' }}>
                {inst.instituteName}
              </h3>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#64748b', fontSize: '0.85rem', marginBottom: '1rem' }}>
                <MapPin size={15} color="#2563eb" />
                <span>
                  {inst.city ? `${inst.city}, ${inst.state || inst.country}` : 'Global Location'}
                </span>
              </div>

              {inst.about && (
                <p
                  style={{
                    fontSize: '0.88rem',
                    color: '#64748b',
                    lineHeight: '1.5',
                    marginBottom: '1.25rem',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                  }}
                >
                  {inst.about}
                </p>
              )}

              <div
                style={{
                  background: '#f8fafc',
                  borderRadius: '10px',
                  padding: '0.75rem 1rem',
                  marginBottom: '1.25rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.85rem',
                }}
              >
                <span style={{ color: '#64748b' }}>Active Programs</span>
                <strong style={{ color: '#2563eb', fontWeight: 700 }}>
                  {inst.coursesCount || 0} Courses
                </strong>
              </div>

              <div style={{ marginTop: 'auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.6rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedInstitute(inst)}
                  className="btn btn-secondary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                >
                  <Info size={15} />
                  <span>View Details</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleViewCourses(inst._id)}
                  className="btn btn-primary btn-sm"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.35rem' }}
                >
                  <span>Courses</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Institute Necessary Details Modal */}
      {selectedInstitute && (
        <div className="modal-overlay">
          <div className="modal-content" style={{ maxWidth: '620px' }}>
            <div className="modal-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: selectedInstitute.providerType === 'IELTS Institute' ? '#eff6ff' : '#f5f3ff',
                    color: selectedInstitute.providerType === 'IELTS Institute' ? '#2563eb' : '#7c3aed',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Building2 size={24} />
                </div>
                <div>
                  <span
                    className={`badge ${
                      selectedInstitute.providerType === 'IELTS Institute'
                        ? 'badge-secondary'
                        : 'badge-primary'
                    }`}
                    style={{ marginBottom: '0.2rem' }}
                  >
                    {selectedInstitute.providerType || 'Academy'}
                  </span>
                  <h2 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0f172a' }}>
                    {selectedInstitute.instituteName}
                  </h2>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setSelectedInstitute(null)}
                className="modal-close-btn"
              >
                <X size={18} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {/* Location & Address Box */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.1rem',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                }}
              >
                <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: '#64748b', letterSpacing: '0.04em' }}>
                  Location & Campus Address
                </h4>
                
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e293b', fontSize: '0.92rem' }}>
                  <MapPin size={16} color="#2563eb" style={{ flexShrink: 0 }} />
                  <strong>
                    {selectedInstitute.city ? `${selectedInstitute.city}, ${selectedInstitute.state}, ${selectedInstitute.country}` : 'Global Location'}
                  </strong>
                </div>

                {selectedInstitute.address && (
                  <div style={{ fontSize: '0.88rem', color: '#475569', paddingLeft: '1.5rem' }}>
                    {selectedInstitute.address}
                  </div>
                )}
              </div>

              {/* Contact Information */}
              <div
                style={{
                  background: '#f8fafc',
                  border: '1px solid #e2e8f0',
                  borderRadius: '12px',
                  padding: '1.1rem',
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '1rem',
                }}
              >
                <div>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Official Email
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0f172a', fontSize: '0.88rem', fontWeight: 600 }}>
                    <Mail size={15} color="#2563eb" />
                    <span style={{ wordBreak: 'break-all' }}>{selectedInstitute.email || 'Not provided'}</span>
                  </div>
                </div>

                <div>
                  <span style={{ fontSize: '0.78rem', color: '#64748b', textTransform: 'uppercase', fontWeight: 600, display: 'block', marginBottom: '0.3rem' }}>
                    Contact Phone
                  </span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#0f172a', fontSize: '0.88rem', fontWeight: 600 }}>
                    <Phone size={15} color="#059669" />
                    <span>{selectedInstitute.phone || 'Not provided'}</span>
                  </div>
                </div>
              </div>

              {/* About / Overview */}
              <div>
                <h4 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#0f172a', marginBottom: '0.5rem' }}>
                  About the Institute
                </h4>
                <p style={{ fontSize: '0.92rem', color: '#475569', lineHeight: '1.6' }}>
                  {selectedInstitute.about || 'This institution has not provided a detailed biography yet. You can explore their verified courses below or contact them directly.'}
                </p>
              </div>

              {/* Programs count badge */}
              <div
                style={{
                  background: '#eff6ff',
                  border: '1px solid #bfdbfe',
                  borderRadius: '10px',
                  padding: '0.85rem 1rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#1e40af', fontWeight: 600, fontSize: '0.9rem' }}>
                  <BookOpen size={18} />
                  <span>Available Programs on EduSeeker</span>
                </div>
                <strong style={{ fontSize: '1.1rem', color: '#1d4ed8' }}>
                  {selectedInstitute.coursesCount || 0} Courses
                </strong>
              </div>

              {/* Footer CTA */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.5rem' }}>
                <button
                  type="button"
                  onClick={() => setSelectedInstitute(null)}
                  className="btn btn-secondary"
                >
                  Close
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const id = selectedInstitute._id;
                    setSelectedInstitute(null);
                    handleViewCourses(id);
                  }}
                  className="btn btn-primary"
                  style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}
                >
                  <span>Explore Institute Courses</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InstitutesList;
