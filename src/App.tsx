// Import کتابخانه‌های ضروری
import React, { Suspense, lazy } from 'react'; // Suspense برای مدیریت لودینگ، lazy برای تقسیم کد (code splitting)
import { Routes, Route, Navigate } from 'react-router-dom'; // کامپوننت‌های مسیریابی
import useAuthStore from './store/authStore'; // store مدیریت احراز هویت با Zustand

// لودینگ تنبل (Lazy Loading) کامپوننت‌ها برای بهینه‌سازی عملکرد
const Layout = lazy(() => import('./components/Layout')); // کامپوننت Layout با تأخیر لود می‌شود
const Login = lazy(() => import('./pages/Login')); // صفحه لاگین
const Register = lazy(() => import('./pages/Register')); // صفحه ثبت‌نام
const Dashboard = lazy(() => import('./pages/Dashboard')); // داشبورد کاربر
const UsersList = lazy(() => import('./pages/UsersList')); // لیست کاربران
const SingleUser = lazy(() => import('./pages/SingleUser')); // صفحه تک کاربر
const PostsList = lazy(() => import('./pages/PostsList')); // لیست پست‌ها
const SinglePost = lazy(() => import('./pages/SinglePost')); // صفحه تک پست
const Home = lazy(() => import('./pages/Home')); // صفحه اصلی

const App: React.FC = () => {
  const { isLoggedIn } = useAuthStore(); // بررسی وضعیت لاگین کاربر از store

  return (
    // Suspense: نمایش fallback تا زمانی که کامپوننت‌های lazy لود شوند
    <Suspense fallback={<div className="text-center mt-20 text-xl">Loading...</div>}>
      {/* Routes: نگهدارنده تمام Routeها */}
      <Routes>
        {/* مسیرهای عمومی (بدون نیاز به لاگین) */}
        <Route path="/" element={<Home />} /> // صفحه اصلی برای همه قابل دسترسی
        <Route 
          path="/login" 
          // شرط: اگر کاربر لاگین نکرده باشد، صفحه لاگین را نشان بده، در غیر این صورت به داشبورد redirect کن
          element={!isLoggedIn ? <Login /> : <Navigate to="/app/dashboard" />} 
        />
        <Route 
          path="/register" 
          element={!isLoggedIn ? <Register /> : <Navigate to="/app/dashboard" />} 
        />

        {/* مسیرهای حفاظت‌شده (نیاز به لاگین) */}
        <Route 
          path="/app" 
          // شرط: اگر کاربر لاگین کرده باشد، Layout را نشان بده، در غیر این صورت به لاگین redirect کن
          element={isLoggedIn ? <Layout /> : <Navigate to="/login" />}
        >
          {/* مسیرهای تو در تو (Nested Routes) */}
          <Route path="dashboard" element={<Dashboard />} /> // مسیر: /app/dashboard
          <Route path="users" element={<UsersList />} /> // مسیر: /app/users
          <Route path="users/:id" element={<SingleUser />} /> // مسیر پویا: /app/users/123
          <Route path="posts" element={<PostsList />} /> // مسیر: /app/posts
          <Route path="posts/:id" element={<SinglePost />} /> // مسیر پویا: /app/posts/456
        </Route>
      </Routes>
    </Suspense>
  );
};

export default App;