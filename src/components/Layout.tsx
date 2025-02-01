import React, { lazy, Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';

const Sidebar = lazy(() => import('./Sidebar'));

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen">
      {/* Header ثابت در همه صفحات */}
      <Header />
      <div className="flex h-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar />
        </Suspense>
        <main className="p-8 bg-gray-100 flex-grow min-h-screen">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
