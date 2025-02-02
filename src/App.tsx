import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from './store/authStore';

const Layout = lazy(() => import('./components/Layout'));
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const UsersList = lazy(() => import('./pages/UsersList'));
const SingleUser = lazy(() => import('./pages/SingleUser'));
const PostsList = lazy(() => import('./pages/PostsList'));
const SinglePost = lazy(() => import('./pages/SinglePost'));
const Home = lazy(() => import('./pages/Home'));

const App: React.FC = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <Suspense fallback={<div className="text-center mt-20 text-xl">Loading...</div>}>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!isLoggedIn ? <Login /> : <Navigate to="/app/dashboard" />} />
        <Route path="/register" element={!isLoggedIn ? <Register /> : <Navigate to="/app/dashboard" />} />

        {/* Protected Routes */}
        <Route path="/app" element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:id" element={<SingleUser />} />
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/:id" element={<SinglePost />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;
