export const mockLoginData = {
  validUser: {
    email: 'test@example.com',
    password: 'Password123!'
  },
  invalidUser: {
    email: 'invalid@example.com',
    password: 'wrongpassword'
  }
};

export const mockAuthResponse = {
  accessToken: 'mock-jwt-token',
  refreshToken: 'mock-refresh-token',
  user: {
    id: '1',
    email: 'test@example.com',
    name: 'Test User'
  }
}; 