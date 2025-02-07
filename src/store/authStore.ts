// Import کتابخانه Zustand برای مدیریت state
import { create } from 'zustand';

// اینترفیس User: ساختار داده کاربر را تعریف می‌کند
interface User {
  email: string;
  role: string; // نقش کاربر (مثلا Admin یا User)
  password: string; // بهتر است پسورد به صورت hash ذخیره شود
}

// اینترفیس AuthState: state کلی سیستم احراز هویت
interface AuthState {
  isLoggedIn: boolean; // وضعیت لاگین کاربر
  user: User | null; // اطلاعات کاربر فعلی یا null
  register: (email: string, password: string, role?: string) => boolean; // ثبت نام کاربر
  login: (email: string, password: string) => boolean; // ورود کاربر
  logout: () => void; // خروج کاربر
  setUser: (user: User) => void; // آپدیت اطلاعات کاربر
}

// ایجاد store با Zustand
const useAuthStore = create<AuthState>((set) => ({
  // مقداردهی اولیه از localStorage
  isLoggedIn: !!localStorage.getItem('currentUser'), // تبدیل مقدار به boolean
  user: localStorage.getItem('currentUser')
    ? JSON.parse(localStorage.getItem('currentUser')!) // ! برای اطمینان از عدم null بودن
    : null,

  // متد ثبت نام
  register: (email, password, role = 'User') => {
    const users = JSON.parse(localStorage.getItem('users') || '[]'); // دریافت لیست کاربران یا آرایه خالی

    // بررسی تکراری نبودن ایمیل
    if (users.some((user: User) => user.email === email)) {
      return false; // ایمیل تکراری
    }

    // ایجاد کاربر جدید
    const newUser = { email, password, role };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users)); // ذخیره در localStorage
    localStorage.setItem('currentUser', JSON.stringify(newUser)); // ذخیره کاربر فعلی

    // آپدیت state
    set({ isLoggedIn: true, user: newUser });
    return true;
  },

  // متد ورود
  login: (email, password) => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (user: User) => user.email === email && user.password === password
    );

    if (!user) {
      return false; // کاربر یافت نشد
    }

    localStorage.setItem('currentUser', JSON.stringify(user));
    set({ isLoggedIn: true, user }); // آپدیت state
    return true;
  },

  // متد خروج
  logout: () => {
    localStorage.removeItem('currentUser');
    set({ isLoggedIn: false, user: null }); // ریست state
  },

  // آپدیت اطلاعات کاربر (مثلا بعد از ویرایش پروفایل)
  setUser: (user) => {
    localStorage.setItem('currentUser', JSON.stringify(user));
    set({ user }); // فقط user آپدیت می‌شود، isLoggedIn ثابت می‌ماند
  },
}));

export default useAuthStore;