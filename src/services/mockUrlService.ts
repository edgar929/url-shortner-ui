import { UrlAnalyticsType } from '../types/analytics';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const generateMockData = (shortCode: string): UrlAnalyticsType => ({
// get url analytics by using useUrls hook


  clicks: Math.floor(Math.random() * 1000),
  clicksOverTime: Array.from({ length: 7 }, (_, i) => ({
    date: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    clicks: Math.floor(Math.random() * 100),
  })),
  browsers: [
    { browser: 'Chrome', count: Math.floor(Math.random() * 500) },
    { browser: 'Firefox', count: Math.floor(Math.random() * 300) },
    { browser: 'Safari', count: Math.floor(Math.random() * 200) },
    { browser: 'Edge', count: Math.floor(Math.random() * 100) },
  ],
  locations: [
    { country: 'United States', count: Math.floor(Math.random() * 400) },
    { country: 'United Kingdom', count: Math.floor(Math.random() * 200) },
    { country: 'Germany', count: Math.floor(Math.random() * 150) },
    { country: 'France', count: Math.floor(Math.random() * 100) },
    { country: 'Japan', count: Math.floor(Math.random() * 150) },
  ],
});

export const mockUrlService = {
  getUrlAnalytics: async (shortCode: string): Promise<UrlAnalyticsType> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    return generateMockData(shortCode);
  }
}; 