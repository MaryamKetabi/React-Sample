// وارد کردن کتابخانه‌های ضروری
import React from 'react'; // وارد کردن کتابخانه React برای ساخت کامپوننت‌های ری‌اکت
import { useNavigate } from 'react-router-dom'; // وارد کردن هوک useNavigate از react-router-dom برای مسیریابی برنامه‌وار
import { APP_TITLE } from '../constants'; // وارد کردن ثابت APP_TITLE از فایل constants.js

// تعریف کامپوننت تابعی Home با تایپ React.FC (Function Component) در TypeScript
const Home: React.FC = () => {
  // ایجاد متغیر navigate با استفاده از هوک useNavigate برای مسیریابی برنامه‌وار
  const navigate = useNavigate();

  return (
    // کل صفحه را در یک div قرار می‌دهیم که با کلاس‌های Tailwind CSS استایل‌دهی شده است
    <div className="h-screen flex flex-col justify-between bg-gray-50">
      
      {/* محتوای اصلی صفحه */}
      <main className="flex-grow flex flex-col items-center justify-center">
        {/* عنوان اصلی با استایل‌دهی */}
        <h2 className="text-4xl font-bold mb-6 text-gray-800">
          Welcome to {APP_TITLE} {/* نمایش متن "Welcome to" به همراه عنوان برنامه */}
        </h2>
        {/* پاراگراف توضیحی با استایل‌دهی */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl text-center">
          Manage your users and posts seamlessly with an intuitive interface.
          {/* پیام توضیحی برای کاربران */}
        </p>
        {/* دکمه‌ها برای ورود و ثبت‌نام */}
        <div className="flex space-x-4">
          <button
            // مسیریابی به صفحه لاگین با کلیک بر روی دکمه
            onClick={() => navigate('/login')}
            className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
          >
            Login {/* متن دکمه لاگین */}
          </button>
          <button
            // مسیریابی به صفحه ثبت‌نام با کلیک بر روی دکمه
            onClick={() => navigate('/register')}
            className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
          >
            Register {/* متن دکمه ثبت‌نام */}
          </button>
        </div>
      </main>

    </div>
  );
};

// صادر کردن کامپوننت Home برای استفاده در سایر بخش‌های برنامه
export default Home;
