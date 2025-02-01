import { create } from 'zustand';

interface User {
  username: string;
  role: string;
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  login: (username: string, role?: string) => void;
  logout: () => void;
  setUser: (user: User) => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  user: null,
  login: (username, role = 'User') => {
    const userData = { username, role };
    localStorage.setItem('user', JSON.stringify(userData));
    set({ isLoggedIn: true, user: userData });
  },
  logout: () => {
    localStorage.removeItem('user');
    set({ isLoggedIn: false, user: null });
  },
  setUser: (user) => set({ isLoggedIn: true, user }),
}));

export default useAuthStore;
