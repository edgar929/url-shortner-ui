import { UrlAnalyticsType } from '../types/analytics';

export const mockAnalytics: UrlAnalyticsType = {
  clicks: 1250,
  clicksOverTime: [
    { date: '2024-03-01', clicks: 100 },
    { date: '2024-03-02', clicks: 150 },
    { date: '2024-03-03', clicks: 200 },
    { date: '2024-03-04', clicks: 175 },
    { date: '2024-03-05', clicks: 225 }
  ],
  browsers: [
    { browser: 'Chrome', count: 500 },
    { browser: 'Firefox', count: 300 },
    { browser: 'Safari', count: 250 },
    { browser: 'Edge', count: 200 }
  ],
  locations: [
    { country: 'United States', count: 400 },
    { country: 'United Kingdom', count: 250 },
    { country: 'Germany', count: 200 },
    { country: 'France', count: 150 },
    { country: 'Canada', count: 250 }
  ]
}; 