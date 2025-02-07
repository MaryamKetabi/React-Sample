// وارد کردن (Import) کتابخانه‌ها و فایل‌های مورد نیاز:
import React, { useEffect, useState } from 'react'; 
// React: کتابخانه اصلی برای ساخت رابط‌های کاربری.
// useEffect و useState: هوک‌هایی (Hooks) هستند که به ما امکان مدیریت وضعیت (state) و اثرات جانبی (side effects) را می‌دهند.

import { Link, useNavigate } from 'react-router-dom'; 
// Link: برای ایجاد لینک‌های ناوبری در React بدون نیاز به رفرش صفحه.
// useNavigate: هوکی برای مسیریابی برنامه‌وار (programmatic navigation) در React Router.

import useAuthStore from '../store/authStore'; 
// هوک سفارشی (custom hook) برای مدیریت احراز هویت کاربران. از کتابخانه‌ای به نام Zustand استفاده می‌کند.

import { APP_TITLE } from '../constants'; 
// وارد کردن ثابت (constant) APP_TITLE از فایل constants.js که عنوان برنامه را نگهداری می‌کند.

// تعریف کامپوننت تابعی (Function Component) به نام Header با استفاده از TypeScript:
const Header: React.FC = () => {
  
  // استفاده از هوک سفارشی برای دسترسی به وضعیت احراز هویت و توابع مرتبط:
  const { isLoggedIn, logout, setUser, user } = useAuthStore();
  // isLoggedIn: نشان می‌دهد که کاربر وارد شده است یا خیر.
  // logout: تابعی برای خروج کاربر.
  // setUser: تابعی برای تنظیم اطلاعات کاربر.
  // user: اطلاعات کاربر فعلی.

  // تعریف یک state محلی برای نگهداری اطلاعات کاربر از حافظه محلی (localStorage):
  const [storedUser, setStoredUser] = useState<{ email: string; role: string } | null>(null);
  // useState: هوکی برای مدیریت وضعیت محلی در کامپوننت.
  // مقدار اولیه null است، یعنی هنوز کاربری ذخیره نشده است.

  // ایجاد یک تابع navigate برای مسیریابی برنامه‌وار:
  const navigate = useNavigate();
  // از این تابع برای هدایت کاربر به صفحات مختلف استفاده می‌شود.

  // استفاده از هوک useEffect برای انجام عملیات پس از رندر شدن کامپوننت:
  useEffect(() => {
    // تلاش برای دریافت اطلاعات کاربر از حافظه محلی (localStorage):
    const userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // localStorage: محلی برای ذخیره‌سازی داده‌ها در مرورگر کاربر.
    // JSON.parse: تبدیل رشته به شیء جاوااسکریپت.

    // اگر اطلاعات کاربر موجود بود (مثلاً ایمیل کاربر وجود داشت):
    if (userData?.email) {
      setUser(userData); // تنظیم کاربر در حالت سراسری (global state).
      setStoredUser(userData); // ذخیره کاربر در حالت محلی (local state).
    }
  }, [setUser]);
  // آرایه وابستگی [setUser] باعث می‌شود این اثر فقط زمانی اجرا شود که setUser تغییر کند.

  // تعریف تابعی برای خروج کاربر:
  const handleLogout = () => {
    logout(); // فراخوانی تابع logout از هوک احراز هویت برای خروج کاربر.
    localStorage.removeItem('currentUser'); // حذف اطلاعات کاربر از حافظه محلی.
    navigate('/'); // هدایت کاربر به صفحه اصلی.
  };

  // بازگرداندن (render) محتوای کامپوننت:
  return (
    // تگ <header>: سرصفحه‌ی برنامه.
    <header className="bg-blue-900 text-white py-4 px-6 shadow-md flex justify-between items-center">
      {/* عنوان برنامه */}
      <h1 className="text-2xl font-bold">
        {/* لینک به صفحه اصلی با استفاده از کامپوننت Link */}
        <Link to="/" className="hover:text-gray-200">
          {APP_TITLE} {/* نمایش عنوان برنامه */}
        </Link>
      </h1>

      {/* اگر کاربر وارد شده باشد (isLoggedIn)، این بخش نمایش داده می‌شود */}
      {isLoggedIn && (
        <div className="flex items-center space-x-4">
          {/* نمایش ایمیل و نقش (role) کاربر */}
          <span className="font-semibold">
            {/* 
              از storedUser یا user برای نمایش اطلاعات کاربر استفاده می‌کنیم.
              اگر هیچ‌کدام موجود نباشد، "User" و "Guest" نمایش داده می‌شود.
            */}
            {storedUser?.email || user?.email || 'User'} ({storedUser?.role || user?.role || 'Guest'})
          </span>
          {/* دکمه خروج */}
          <button
            onClick={handleLogout} // با کلیک روی دکمه، تابع handleLogout اجرا می‌شود.
            className="bg-black text-white px-4 py-2 rounded-lg shadow-md hover:bg-gray-800 transition"
          >
            Logout {/* متن دکمه */}
          </button>
        </div>
      )}
    </header>
  );
};

// صادر کردن کامپوننت Header برای استفاده در سایر بخش‌های برنامه:
export default Header;
