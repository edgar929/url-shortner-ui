import axios from 'axios';
import { mockService } from '../services/mockService';

export const setupMockApi = () => {
  axios.interceptors.request.use(async (config) => {
    if (process.env.NODE_ENV === 'development') {
      const path = config.url?.replace('/api/', '');
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));

      const mockResponse = {
        status: 200,
        statusText: 'OK',
        headers: {},
        config,
        data: await (async () => {
          switch (path) {
            case 'urls':
              return mockService.urls.getAll();
            case 'analytics':
              return mockService.analytics.getUrlAnalytics(config.params.shortCode);
            case 'settings':
              return mockService.settings.get();
            case 'profile':
              return mockService.user.getProfile();
            default:
              return config;
          }
        })()
      };

      return Promise.reject(mockResponse);
    }
    return config;
  });
}; 