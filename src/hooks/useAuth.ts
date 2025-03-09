import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { authService, LoginRequest, RegisterRequest } from '../services/authService';
import { setStoredTokens, clearTokens, getStoredToken } from '../utils/auth';

export const useAuth = () => {
  const queryClient = useQueryClient();

  const user = useQuery({
    queryKey: ['user'],
    queryFn: authService.getCurrentUser,
    enabled: !!getStoredToken(),
    retry: false,
    staleTime: 5 * 60 * 1000,
  });

  const login = useMutation({
    mutationFn: async (credentials: LoginRequest) => {
      const response = await authService.login(credentials);
      setStoredTokens(response.token, response.refreshToken);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
      window.location.href = '/dashboard';
    },
  });

  const register = useMutation({
    mutationFn: async (data: RegisterRequest) => {
      const response = await authService.register(data);
      setStoredTokens(response.token, response.refreshToken);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });

  const logout = () => {
    clearTokens();
    queryClient.clear();
    window.location.href = '/login';
  };

  return {
    login,
    register,
    logout,
    user,
  };
}; 