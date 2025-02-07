import React, { lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

// Lazy Load کامپوننت‌ها
const Home = lazy(() => import('../pages/Home'));
const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

const PublicRoutes: React.FC = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route 
        path="/login" 
        element={!isLoggedIn ? <Login /> : <Navigate to="/app/dashboard" />} 
      />
      <Route 
        path="/register" 
        element={!isLoggedIn ? <Register /> : <Navigate to="/app/dashboard" />} 
      />
    </Routes>
  );
};

export default PublicRoutes;
