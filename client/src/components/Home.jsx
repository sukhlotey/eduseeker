import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import {
  GraduationCap,
  Building2,
  BookOpen,
  CheckCircle,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Search,
  Bell,
} from 'lucide-react';

const Home = () => {
  return (
    <div className="app-container">
      <Navbar />

      {/* Hero Section */}
      <section
        style={{
          background: 'radial-gradient(ellipse at top, #e0e7ff 0%, #f8fafc 70%)',
          padding: '5rem 0 4rem 0',
          textAlign: 'center',
        }}
      >
        <div className="container" style={{ maxWidth: '900px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              background: '#e0e7ff',
              color: '#4338ca',
              padding: '0.45rem 1rem',
              borderRadius: '9999px',
              fontSize: '0.85rem',
              fontWeight: 700,
              marginBottom: '1.25rem',
            }}
          >
            <Sparkles size={16} />
            <span>Connect Aspirants with Premier Academies & IELTS Centers</span>
          </div>

          <h1
            style={{
              fontSize: '3rem',
              fontWeight: 800,
              color: '#0f172a',
              letterSpacing: '-0.03em',
              lineHeight: '1.15',
              marginBottom: '1.25rem',
            }}
          >
            Find the Perfect Course or{' '}
            <span
              style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #06b6d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Empower Students Worldwide
            </span>
          </h1>

          <p
            style={{
              fontSize: '1.15rem',
              color: '#475569',
              lineHeight: '1.6',
              marginBottom: '2.5rem',
              maxWidth: '720px',
              margin: '0 auto 2.5rem auto',
            }}
          >
            EduSeeker bridges ambitious learners with verified coaching institutes and academies. Explore top-tier IELTS, foreign language, and professional certification programs with instant application tracking.
          </p>

          {/* Registration Decision Cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '1.5rem',
              textAlign: 'left',
              marginTop: '1rem',
            }}
          >
            {/* Card 1: Course Seeker */}
            <div
              style={{
                background: '#ffffff',
                border: '2px solid #e0e7ff',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <GraduationCap size={28} />
              </div>

              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#2563eb',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                For Students & Aspirants
              </span>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0.35rem 0 0.75rem 0' }}>
                Course Seeker
              </h3>

              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                Search and explore certified IELTS and Academy programs, compare syllabus, review pricing, apply in 1-click, and manage your applied courses anytime.
              </p>

              <div style={{ marginTop: 'auto' }}>
                <Link
                  to="/register"
                  className="btn btn-primary btn-block"
                  style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                >
                  <span>Register as Course Seeker</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>

            {/* Card 2: Course Provider */}
            <div
              style={{
                background: '#ffffff',
                border: '2px solid #e0e7ff',
                borderRadius: '20px',
                padding: '2rem',
                boxShadow: '0 10px 25px -5px rgba(79, 70, 229, 0.1)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'transform 0.2s ease',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  background: '#f5f3ff',
                  color: '#7c3aed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1.25rem',
                }}
              >
                <Building2 size={28} />
              </div>

              <span
                style={{
                  fontSize: '0.78rem',
                  fontWeight: 700,
                  color: '#7c3aed',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                }}
              >
                For Academies & IELTS Centers
              </span>

              <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0f172a', margin: '0.35rem 0 0.75rem 0' }}>
                Course Provider (Admin)
              </h3>

              <p style={{ color: '#64748b', fontSize: '0.92rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
                Publish detailed course curriculums, batch timings, and fees. Receive real-time student application notifications with student qualifications and addresses.
              </p>

              <div style={{ marginTop: 'auto' }}>
                <Link
                  to="/register"
                  className="btn btn-secondary btn-block"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    borderColor: '#7c3aed',
                    color: '#7c3aed',
                    background: '#fcfaff',
                  }}
                >
                  <span>Register as Course Provider</span>
                  <ArrowRight size={18} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Highlights */}
      <section style={{ padding: '4rem 0', background: '#ffffff', borderTop: '1px solid #e2e8f0' }}>
        <div className="container">
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
              gap: '2rem',
            }}
          >
            <div style={{ display: 'flex', gap: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#eff6ff',
                  color: '#2563eb',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Search size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem', color: '#0f172a' }}>
                  Smart Course Discovery
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
                  Filter by Online, Offline, or Hybrid modes, categories, and verified locations.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#fef3c7',
                  color: '#d97706',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <Bell size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem', color: '#0f172a' }}>
                  Instant Institute Notifications
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
                  Institutes receive live alerts with applicant details when students apply.
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1rem' }}>
              <div
                style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '12px',
                  background: '#d1fae5',
                  color: '#059669',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                }}
              >
                <ShieldCheck size={22} />
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.3rem', color: '#0f172a' }}>
                  Full Application Control
                </h4>
                <p style={{ fontSize: '0.88rem', color: '#64748b', lineHeight: '1.5' }}>
                  Students can update their qualifications, track statuses, or withdraw applied courses.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          background: '#0f172a',
          color: '#94a3b8',
          padding: '3rem 0 2rem 0',
          marginTop: 'auto',
        }}
      >
        <div className="container" style={{ textAlign: 'center', fontSize: '0.88rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#ffffff', fontWeight: 700, fontSize: '1.2rem' }}>
            <GraduationCap size={24} color="#818cf8" />
            <span>EduSeeker</span>
          </div>
          <p>© {new Date().getFullYear()} EduSeeker. All rights reserved. Connecting Seekers and Providers seamlessly.</p>
        </div>
      </footer>
    </div>
  );
};

export default Home;
