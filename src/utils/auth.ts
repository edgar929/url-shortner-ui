import { jwtDecode } from 'jwt-decode';
import { User } from '../types/auth';

export const getStoredToken = (): string | null => {
  return localStorage.getItem('accessToken');
};

export const decodeToken = (token: string): User | null => {
  try {
    return jwtDecode(token);
  } catch {
    return null;
  }
};

export const setStoredTokens = (accessToken: string, refreshToken: string) => {
  localStorage.setItem('accessToken', accessToken);
  localStorage.setItem('refreshToken', refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

interface DummyUser {
  id: string;
  email: string;
  name: string;
}

const DUMMY_USERS: DummyUser[] = [
  { id: '1', email: 'test@test.com', name: 'Test User' }
];

export const setStoredUser = (user: DummyUser) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const getStoredUser = (): DummyUser | null => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

export const removeStoredUser = () => {
  localStorage.removeItem('user');
};

export const authenticateUser = (email: string, password: string): DummyUser | null => {
  // For demo purposes, accept only "password123" for test@test.com
  const user = DUMMY_USERS.find(u => u.email === email && password === 'password123');
  if (user) {
    setStoredUser(user);
    return user;
  }
  return null;
}; 