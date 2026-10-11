import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { user, token } = useSelector((state) => state.auth);

  if (!token || !user) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user.role !== requiredRole) {
    if (user.role === 'provider') {
      return <Navigate to="/admin/dashboard" replace />;
    } else {
      return <Navigate to="/seeker/explore" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;
