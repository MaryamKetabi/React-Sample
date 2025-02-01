import { create } from 'zustand';

interface AuthState {
  isLoggedIn: boolean;
  username: string | null;
  login: (username: string) => void;
  logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: false,
  username: null,
  login: (username: string) => set({ isLoggedIn: true, username }),
  logout: () => set({ isLoggedIn: false, username: null }),
}));

export default useAuthStore;
