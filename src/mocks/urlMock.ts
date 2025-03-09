import { ShortenedUrl } from '../types/url';

export const mockUrls: ShortenedUrl[] = [
  {
    id: '1',
    shortCode: 'abc123',
    longUrl: 'https://example.com/very/long/url/that/needs/shortening',
    createdAt: '2024-03-09T10:00:00Z',
    clicks: 150,
    title: 'Example URL',
    tags: ['marketing', 'social'],
    isCustom: false
  },
  {
    id: '2',
    shortCode: 'custom-link',
    longUrl: 'https://another-example.com/path',
    createdAt: '2024-03-08T15:30:00Z',
    clicks: 75,
    title: 'Custom Link',
    tags: ['personal'],
    isCustom: true,
    expiresAt: '2024-12-31T23:59:59Z'
  }
];

export const mockUrlResponse = {
  success: true,
  data: mockUrls[0]
}; 