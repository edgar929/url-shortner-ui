/* eslint-disable @typescript-eslint/no-unused-vars */
import { mockUrls, mockAnalytics, mockSettings, mockUserProfile } from '../mocks';
import { CreateUrlRequest } from '../types/url';

export const mockService = {
  urls: {
    getAll: async () => mockUrls,
    getById: async (id: string) => mockUrls.find(url => url.id === id),
    create: async (data: CreateUrlRequest) => ({ ...mockUrls[0], ...data }),
    update: async (id: string, data: Partial<CreateUrlRequest>) => ({ ...mockUrls[0], ...data, id }),
    delete: async (_id: string) => true
  },
  analytics: {
    getUrlAnalytics: async (shortCode: string) => mockAnalytics,
    getOverallAnalytics: async () => ({
      totalUrls: mockUrls.length,   
      totalClicks: mockAnalytics.clicks
    })
  },
  settings: {
    get: async () => mockSettings,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    update: async (data: any) => ({ ...mockSettings, ...data })
  },
  user: {
    getProfile: async () => mockUserProfile,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateProfile: async (data: any) => ({ ...mockUserProfile, ...data })
  }
}; 