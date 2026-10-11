import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from './redux/slices/authSlice';
import './App.css';

// Components
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

// Admin / Provider Pages
import AdminLayout from './admin/AdminLayout';
import AdminDashboard from './admin/pages/AdminDashboard';
import ManageCourses from './admin/pages/ManageCourses';
import ApplicantNotifications from './admin/pages/ApplicantNotifications';
import AdminProfile from './admin/pages/AdminProfile';

// User / Seeker Pages
import UserLayout from './users/UserLayout';
import UserExploreCourses from './users/pages/UserExploreCourses';
import InstitutesList from './users/pages/InstitutesList';
import MyApplications from './users/pages/MyApplications';
import UserProfile from './users/pages/UserProfile';

function App() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    if (token) {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token]);

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Admin / Course Provider Protected Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="provider">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="courses" element={<ManageCourses />} />
          <Route path="notifications" element={<ApplicantNotifications />} />
          <Route path="profile" element={<AdminProfile />} />
        </Route>

        {/* User / Course Seeker Routes */}
        <Route path="/seeker" element={<UserLayout />}>
          <Route index element={<Navigate to="/seeker/explore" replace />} />
          <Route path="explore" element={<UserExploreCourses />} />
          <Route path="institutes" element={<InstitutesList />} />
          <Route
            path="applications"
            element={
              <ProtectedRoute requiredRole="seeker">
                <MyApplications />
              </ProtectedRoute>
            }
          />
          <Route
            path="profile"
            element={
              <ProtectedRoute requiredRole="seeker">
                <UserProfile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
