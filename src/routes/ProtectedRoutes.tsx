import React, { lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

// Lazy Load کامپوننت‌های نیازمند احراز هویت
const Dashboard = lazy(() => import('../pages/Dashboard'));
const UsersList = lazy(() => import('../pages/UsersList'));
const SingleUser = lazy(() => import('../pages/SingleUser'));
const PostsList = lazy(() => import('../pages/PostsList'));
const SinglePost = lazy(() => import('../pages/SinglePost'));

const ProtectedRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="users" element={<UsersList />} />
      <Route path="users/:id" element={<SingleUser />} />
      <Route path="posts" element={<PostsList />} />
      <Route path="posts/:id" element={<SinglePost />} />
    </Routes>
  );
};

export default ProtectedRoutes;
