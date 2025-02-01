import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import UsersList from './pages/UsersList';
import SingleUser from './pages/SingleUser';
import PostsList from './pages/PostsList';
import SinglePost from './pages/SinglePost';
import Home from './pages/Home';
import useAuthStore from './store/authStore';

const App: React.FC = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={!isLoggedIn ? <Login /> : <Navigate to="/app/dashboard" />}
        />
        <Route
          path="/register"
          element={!isLoggedIn ? <Register /> : <Navigate to="/app/dashboard" />}
        />

        {/* Protected Routes */}
        <Route
          path="/app"
          element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="users" element={<UsersList />} />
          <Route path="users/:id" element={<SingleUser />} />
          <Route path="posts" element={<PostsList />} />
          <Route path="posts/:id" element={<SinglePost />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
