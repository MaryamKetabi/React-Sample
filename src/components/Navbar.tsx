import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { APP_TITLE } from '../constants';


const Navbar: React.FC = () => {
  const { isLoggedIn, logout } = useAuthStore();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <nav className="bg-gradient-to-r from-blue-900 via-indigo-600 to-purple-500 text-white py-4 px-6 shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* App Title */}
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:text-gray-200">
            {APP_TITLE}
          </Link>
        </h1>

        {/* Links */}
        <div className="flex items-center space-x-4">
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="hover:underline hover:text-gray-200 transition duration-300"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="hover:underline hover:text-gray-200 transition duration-300"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <span className="font-semibold">{user.username || 'User'}</span>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow-lg transition"
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
