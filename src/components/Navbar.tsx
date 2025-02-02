import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { APP_TITLE } from '../constants';

const Navbar: React.FC = () => {
  const { isLoggedIn, user, logout, setUser } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, [setUser]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-indigo-600 to-purple-500 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200">
            {APP_TITLE}
          </Link>
        </h1>

        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link to="/login" className="hover:underline hover:text-gray-200 transition duration-300">
                Login
              </Link>
              <Link to="/register" className="hover:underline hover:text-gray-200 transition duration-300">
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold">{user?.email || 'User'} ({user?.role})</span>
              <button
                onClick={handleLogout}
                className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
