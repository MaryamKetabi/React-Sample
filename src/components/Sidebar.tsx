// وارد کردن کتابخانه‌های لازم
import React from 'react'; // کتابخانه‌ی React برای ساخت کامپوننت‌های ری‌اکت
import { Link } from 'react-router-dom'; // کامپوننت `Link` از React Router برای مسیریابی بدون رفرش صفحه

// تعریف کامپوننت تابعی Sidebar با تایپ React.FC (Function Component) در TypeScript
const Sidebar: React.FC = () => {
  return (
    // تگ <aside> به عنوان سایدبار، با کلاس‌های استایل‌دهی Tailwind CSS
    <aside className="bg-gray-800 text-white w-64 min-h-screen flex-shrink-0">
      {/* محتوای داخلی سایدبار */}
      <div className="p-6">
        {/* عنوان سایدبار */}
        <h2 className="text-xl font-bold mb-4">App Navigation</h2>
        {/* منوی ناوبری */}
        <nav className="space-y-2">
          {/* لینک‌ها به صفحات مختلف برنامه */}
          <Link
            to="/app/dashboard"
            className="block py-2 px-4 rounded hover:bg-gray-600 transition"
          >
            Dashboard {/* متن لینک */}
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

// صادر کردن کامپوننت Sidebar برای استفاده در بخش‌های دیگر برنامه
export default Sidebar;
