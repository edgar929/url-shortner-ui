export const mockUsers = {
  currentUser: {
    id: '1',
    email: 'user@example.com',
    name: 'John Doe',
    createdAt: '2024-01-01T00:00:00Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
    role: 'user'
  },
  adminUser: {
    id: '2',
    email: 'admin@example.com',
    name: 'Admin User',
    createdAt: '2024-01-01T00:00:00Z',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Admin',
    role: 'admin'
  }
};

export const mockUserProfile = {
  ...mockUsers.currentUser,
  urls: 25,
  totalClicks: 1500,
  memberSince: '2024-01-01T00:00:00Z'
}; 