import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar: React.FC = () => {
  return (
    <aside className="bg-gray-800 text-white w-64 min-h-screen flex-shrink-0">
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">App Navigation</h2>
        <nav className="space-y-2">
          <Link
            to="/app/dashboard"
            className="block py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Dashboard
          </Link>
          <Link
            to="/app/users"
            className="block py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Users
          </Link>
          <Link
            to="/app/posts"
            className="block py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Posts
          </Link>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
