import React, { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import PublicRoutes from './PublicRoutes';
import ProtectedRoutes from './ProtectedRoutes';

const Layout = lazy(() => import('../components/Layout'));

const AppRoutes: React.FC = () => {
  const { isLoggedIn } = useAuthStore();

  return (
    <Suspense fallback={<div className="text-center mt-20 text-xl">Loading...</div>}>
      <Routes>
        {/* مسیرهای عمومی (بدون نیاز به لاگین) */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* مسیرهای محافظت‌شده (نیاز به لاگین) */}
        <Route
          path="/app"
          element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
        >
          <Route path="*" element={<ProtectedRoutes />} />
        </Route>
      </Routes>
    </Suspense>
  );
};

export default AppRoutes;
