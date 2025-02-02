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
  setUser: (user: User) => void; // 
}

const useAuthStore = create<AuthState>((set) => ({
  isLoggedIn: !!localStorage.getItem('currentUser'),
  user: localStorage.getItem('currentUser') ? JSON.parse(localStorage.getItem('currentUser')!) : null,

  register: (email, password, role = 'User') => {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (users.some((user: User) => user.email === email)) {
      return false;
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
    const user = users.find((user: User) => user.email === email && user.password === password);

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

  setUser: (user) => { // ✅ اضافه کردن `setUser`
    localStorage.setItem('currentUser', JSON.stringify(user));
    set({ user });
  },
}));

export default useAuthStore;
