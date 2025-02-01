import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const ProtectedRoute: React.FC = () => {
  const { isLoggedIn } = useAuthStore();

  return isLoggedIn ? (
    <Outlet />
  ) : (
    <Navigate
      to="/login"
      replace
      state={{
        message: 'You must log in first to access the shop!',
      }}
    />
  );
};

export default ProtectedRoute;
