import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';
import { GraduationCap, LogIn, UserPlus, LogOut, LayoutDashboard, Compass } from 'lucide-react';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <header className="navbar-header">
      <div className="container navbar-inner">
        <Link to="/" className="brand-logo">
          <div className="brand-icon">
            <GraduationCap size={22} />
          </div>
          <span>EduSeeker</span>
        </Link>

        <nav className="nav-links">
          <Link to="/seeker/explore" className="nav-link">
            Explore Courses
          </Link>
          <Link to="/seeker/institutes" className="nav-link">
            Institutes
          </Link>

          {token && user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link
                to={user.role === 'provider' ? '/admin/dashboard' : '/seeker/explore'}
                className="btn btn-primary btn-sm"
              >
                <LayoutDashboard size={16} />
                <span>{user.role === 'provider' ? 'Admin Portal' : 'Student Portal'}</span>
              </Link>
              <button onClick={handleLogout} className="btn btn-secondary btn-sm">
                <LogOut size={16} />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <Link to="/login" className="btn btn-secondary btn-sm">
                <LogIn size={16} />
                <span>Login</span>
              </Link>
              <Link to="/register" className="btn btn-primary btn-sm">
                <UserPlus size={16} />
                <span>Register</span>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
