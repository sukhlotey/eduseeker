import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import './style/admin.css';
import {
  LayoutDashboard,
  BookOpen,
  Bell,
  Building,
  LogOut,
  Menu,
  X,
  ExternalLink,
} from 'lucide-react';

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { unreadCount } = useSelector((state) => state.applications);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="admin-layout">
      {/* Sidebar Overlay for Mobile */}
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

      {/* Responsive Left Sidebar */}
      <aside className={`admin-sidebar ${isCollapsed ? 'collapsed' : ''} ${sidebarOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          {!isCollapsed && (
            <div className="admin-logo-wrapper">
              <div className="admin-logo-text">EduSeeker Admin</div>
              <span className="admin-badge-type">
                {user?.providerType || 'Course Provider'}
              </span>
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

        <nav className="admin-nav">
          <NavLink
            to="/admin/dashboard"
            onClick={() => setSidebarOpen(false)}
            title="Dashboard"
            className={({ isActive }) =>
              `admin-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <LayoutDashboard size={20} />
            <span>Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/courses"
            onClick={() => setSidebarOpen(false)}
            title="Manage Courses"
            className={({ isActive }) =>
              `admin-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <BookOpen size={20} />
            <span>Manage Courses</span>
          </NavLink>

          <NavLink
            to="/admin/notifications"
            onClick={() => setSidebarOpen(false)}
            title="Student Applications"
            className={({ isActive }) =>
              `admin-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Bell size={20} />
            <span>Applications</span>
            {unreadCount > 0 && (
              <span className="admin-nav-badge">{unreadCount}</span>
            )}
          </NavLink>

          <NavLink
            to="/admin/profile"
            onClick={() => setSidebarOpen(false)}
            title="Institute Profile"
            className={({ isActive }) =>
              `admin-nav-item ${isActive ? 'active' : ''}`
            }
          >
            <Building size={20} />
            <span>Institute Profile</span>
          </NavLink>

          <NavLink
            to="/seeker/explore"
            onClick={() => setSidebarOpen(false)}
            title="Preview Student View"
            className="admin-nav-item"
            style={{ marginTop: 'auto', color: '#4f46e5' }}
          >
            <ExternalLink size={18} />
            <span>Student View</span>
          </NavLink>
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-provider-card" title={user?.instituteName || 'Admin'}>
            <div className="admin-provider-avatar">
              {user?.instituteName ? user.instituteName.charAt(0).toUpperCase() : 'P'}
            </div>
            {!isCollapsed && (
              <div className="admin-provider-info">
                <span className="admin-provider-name">
                  {user?.instituteName || 'Admin Provider'}
                </span>
                <span className="admin-provider-email">{user?.email}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="btn btn-outline-danger btn-sm btn-block admin-logout-btn"
            title="Sign Out"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Container */}
      <div className="admin-main">
        {/* Topbar */}
        <header className="admin-topbar">
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
            <button
              className="mobile-sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              <Menu size={24} />
            </button>

            <h2 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#0f172a' }}>
              {user?.instituteName || 'Admin Portal'}
            </h2>
            <span
              style={{
                fontSize: '0.75rem',
                background: '#eef2ff',
                color: '#4338ca',
                padding: '0.2rem 0.6rem',
                borderRadius: '9999px',
                border: '1px solid #c7d2fe',
                fontWeight: 600,
              }}
            >
              {user?.city ? `${user.city}, ${user.state}` : user?.providerType}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <NavLink
              to="/admin/notifications"
              style={{
                position: 'relative',
                background: '#f1f5f9',
                border: '1px solid #e2e8f0',
                padding: '0.55rem',
                borderRadius: '10px',
                color: '#475569',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span
                  style={{
                    position: 'absolute',
                    top: '-4px',
                    right: '-4px',
                    width: '18px',
                    height: '18px',
                    background: '#ef4444',
                    color: 'white',
                    fontSize: '0.7rem',
                    fontWeight: 700,
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {unreadCount}
                </span>
              )}
            </NavLink>
          </div>
        </header>

        {/* Dynamic Nested Content */}
        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
