import { create } from 'zustand';

interface User {
  email: string;
  role: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (email: string, role?: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem('user'),
  user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) : null,

  login: (email, role = 'User') => {
    const userData = { email, role };
    localStorage.setItem('user', JSON.stringify(userData));
    set({ isLoggedIn: true, user: userData });
  },

  logout: () => {
    localStorage.removeItem('user');
    set({ isLoggedIn: false, user: null });
  },

  setUser: (user) => {
    localStorage.setItem('user', JSON.stringify(user));
    set({ isLoggedIn: true, user });
  },
}));

export default useAuthStore;
