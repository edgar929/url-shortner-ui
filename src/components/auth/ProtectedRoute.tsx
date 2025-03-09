import { Navigate } from 'react-router-dom';
import { PropsWithChildren } from 'react';
import { useAuth } from '../../context/AuthContext';

export const ProtectedRoute = ({ children }: PropsWithChildren) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    // You can return a loading spinner or null here
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}; 