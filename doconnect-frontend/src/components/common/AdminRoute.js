import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const AdminRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user || user.roleId !== 2) return <Navigate to="/" />;
  return children;
};

export default AdminRoute;