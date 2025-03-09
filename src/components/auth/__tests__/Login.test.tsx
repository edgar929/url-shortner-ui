import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { mockLoginData, mockAuthResponse } from '../../../mocks/authMock';
import { vi } from 'vitest';
import { Login } from '../../../pages/Login';

// Mock the auth hook
vi.mock('../../../hooks/useAuth', () => ({
  useAuth: () => ({
    login: {
      mutate: vi.fn().mockImplementation((credentials) => {
        if (credentials.email === mockLoginData.validUser.email) {
          return Promise.resolve(mockAuthResponse);
        }
        return Promise.reject(new Error('Invalid credentials'));
      }),
      isLoading: false
    }
  })
}));

describe('Login Component', () => {
  it('renders login form', () => {
    render(<Login />);
    
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /sign in/i })).toBeInTheDocument();
  });

  it('handles successful login', async () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockLoginData.validUser.email }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: mockLoginData.validUser.password }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.queryByText(/invalid credentials/i)).not.toBeInTheDocument();
    });
  });

  it('handles failed login', async () => {
    render(<Login />);
    
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: mockLoginData.invalidUser.email }
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: mockLoginData.invalidUser.password }
    });
    
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    
    await waitFor(() => {
      expect(screen.getByText(/invalid credentials/i)).toBeInTheDocument();
    });
  });
}); 