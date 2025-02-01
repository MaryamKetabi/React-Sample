import React from 'react';
import { useNavigate } from 'react-router-dom';
import { APP_TITLE } from '../constants';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen flex flex-col justify-between bg-gray-50">

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          Welcome to {APP_TITLE}
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
          Manage your users and posts seamlessly with an intuitive interface.
        </p>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/login')}
            className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate('/register')}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            Register
          </button>
        </div>
      </main>

    </div>
  );
};

export default Home;
