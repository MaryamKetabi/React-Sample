import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const Layout: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />
      <div className="flex-grow flex flex-col">
        {/* Main Content */}
        <main className="p-8 bg-gray-100 flex-grow">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
