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
      const users = JSON.parse(localStorage.getItem('users') || '[]');

      if (users.some((user: User) => user.email === email)) {
        return false; // ایمیل تکراری
      }

      const newUser = { email, password, role };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(newUser));

      set({ isLoggedIn: true, user: newUser });
      return true;
    },

    login: (email, password) => {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const user = users.find(
        (user: User) => user.email === email && user.password === password
      );

      if (!user) {
        return false;
      }

      localStorage.setItem('currentUser', JSON.stringify(user));
      set({ isLoggedIn: true, user });
      return true;
    },

    logout: () => {
      localStorage.removeItem('currentUser');
      set({ isLoggedIn: false, user: null });
    },

    setUser: (user) => {
      localStorage.setItem('currentUser', JSON.stringify(user));
      set({ user });
    },
  };
});

export default useAuthStore;
