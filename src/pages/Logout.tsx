import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const Logout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    logout();
    navigate('/login', { replace: true });
  }, []);

  return null;
}; 