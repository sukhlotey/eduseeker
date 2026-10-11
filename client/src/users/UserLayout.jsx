import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import './style/user.css';
import {
  Compass,
  Building2,
  BookmarkCheck,
  User,
  LogOut,
  Menu,
  X,
  GraduationCap,
  MapPin,
} from 'lucide-react';

const UserLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { seekerApplications } = useSelector((state) => state.applications);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const activeAppsCount = seekerApplications.filter(
    (a) => a.status !== 'Withdrawn'
  ).length;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="user-layout">
      {/* Mobile Drawer Overlay */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 45,
          }}
        />
      )}

      {/* Left Responsive Sidebar */}
      <aside className={`user-sidebar ${isCollapsed ? 'collapsed' : ''} ${sidebarOpen ? 'open' : ''}`}>
        <div className="user-sidebar-header">
          {!isCollapsed && (
            <div className="user-brand-text" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, #2563eb 0%, #06b6d4 100%)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  flexShrink: 0,
                }}
              >
                <GraduationCap size={22} />
              </div>
              <div>
                <div className="user-brand-title">EduSeeker</div>
                <span className="user-role-tag">Course Seeker</span>
              </div>
            </div>
          )}

          {/* Toggle Menu Button to collapse / open sidebar */}
          <button
            type="button"
            className="sidebar-toggle-btn"
            onClick={() => setIsCollapsed(!isCollapsed)}
            title={isCollapsed ? 'Expand sidebar menu' : 'Collapse sidebar menu'}
          >
            <Menu size={18} />
          </button>

          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              display: sidebarOpen ? 'block' : 'none',
              background: 'transparent',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
            }}
          >
            <X size={20} />
          </button>
        </div>

        <nav className="user-nav">
          <NavLink
            to="/seeker/explore"
            onClick={() => setSidebarOpen(false)}
            title="Explore Courses"
            className={({ isActive }) =>
              `user-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Compass size={20} />
            <span>Explore Courses</span>
          </NavLink>

          <NavLink
            to="/seeker/institutes"
            onClick={() => setSidebarOpen(false)}
            title="Institutes & Academies"
            className={({ isActive }) =>
              `user-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Building2 size={20} />
            <span>Institutes & Academies</span>
          </NavLink>

          <NavLink
            to="/seeker/applications"
            onClick={() => setSidebarOpen(false)}
            title="My Applications"
            className={({ isActive }) =>
              `user-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <BookmarkCheck size={20} />
            <span>My Applications</span>
            {activeAppsCount > 0 && (
              <span
                className="user-nav-badge"
                style={{
                  marginLeft: 'auto',
                  background: '#2563eb',
                  color: 'white',
                  fontWeight: 700,
                  borderRadius: '9999px',
                }}
              >
                {activeAppsCount}
              </span>
            )}
          </NavLink>

          <NavLink
            to="/seeker/profile"
            onClick={() => setSidebarOpen(false)}
            title="My Profile"
            className={({ isActive }) =>
              `user-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <User size={20} />
            <span>My Profile</span>
          </NavLink>
        </nav>

        <div className="user-sidebar-footer">
          <div className="user-profile-widget" title={user?.name || 'Student'}>
            <div className="user-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
            </div>
            {!isCollapsed && (
              <div style={{ display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
                <span
                  style={{
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    color: '#0f172a',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user?.name || 'Student'}
                </span>
                <span
                  style={{
                    fontSize: '0.75rem',
                    color: '#64748b',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {user?.qualification || user?.email}
                </span>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-secondary btn-sm btn-block user-logout-btn"
            title="Sign Out"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="user-main">
        {/* Topbar */}
        <header className="user-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button
              className="mobile-sidebar-toggle"
              style={{ color: '#0f172a' }}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>

            <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#0f172a' }}>
              Student Learning Portal
            </h2>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div
              style={{
                fontSize: '0.82rem',
                color: '#64748b',
                background: '#f1f5f9',
                padding: '0.4rem 0.8rem',
                borderRadius: '8px',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: '0.35rem',
              }}
            >
              <MapPin size={14} color="#2563eb" />
              <span>{user?.city ? `${user.city}, ${user.country}` : 'Global Student'}</span>
            </div>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="user-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default UserLayout;
