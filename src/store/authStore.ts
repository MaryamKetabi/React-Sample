import { create } from 'zustand';

interface User {
  email: string;
  role: string;
  password: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  register: (email: string, password: string, role?: string) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthState>((set) => {
  // بررسی مقدار ذخیره‌شده در localStorage
  const storedUser = localStorage.getItem('currentUser');
  const parsedUser = storedUser ? JSON.parse(storedUser) : null;

  return {
    isLoggedIn: parsedUser !== null, // اگر `currentUser` در `localStorage` باشد، مقدار `true` بدهد
    user: parsedUser,

    register: (email, password, role = 'User') => {
      const users = JSON.parse(localStorage.getItem('users') || '[]'); // دریافت لیست کاربران
      
      if (users.some((user: User) => user.email === email)) {
        return false; // اگر ایمیل تکراری باشد، ثبت‌نام جدیدی انجام نمی‌شود
      }
    
      const newUser = { email, password, role };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users)); // ذخیره کاربران
      localStorage.setItem('currentUser', JSON.stringify(newUser)); // ذخیره کاربر لاگین‌شده
    
      set({ isLoggedIn: true, user: newUser }); // آپدیت Zustand Store
      return true;
    },

    login: (email, password) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]'); // دریافت لیست کاربران
      
      const user = users.find(
        (user: User) => user.email === email && user.password === password
      );
    
      if (!user) {
        return false; // اگر کاربری یافت نشد، ورود انجام نمی‌شود
      }
    
      localStorage.setItem('currentUser', JSON.stringify(user)); // ذخیره اطلاعات ورود
      set({ isLoggedIn: true, user }); // بروزرسانی Zustand Store
      return true;
    },

    logout: () => {
      localStorage.removeItem('currentUser'); // حذف اطلاعات ورود
      set({ isLoggedIn: false, user: null }); // آپدیت `state`
    },

    setUser: (user) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      set({ user });
    },
  };
});

export default useAuthStore;
