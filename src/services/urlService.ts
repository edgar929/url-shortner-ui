import { api } from './api';
import { UrlAnalyticsType } from '../types/analytics';
import { UseUrlsOptions } from '../types/url';

export interface CreateUrlRequest {
  longUrl: string;
  title?: string;
}

export interface UrlResponse {
  id: string;
  shortCode: string;
  longUrl: string;
  shortUrl: string;
  title?: string;
  createdAt: string;
  clicks: number;
}

export interface UrlsResponse {
  items: UrlResponse[];
  total: number;
}

export const urlService = {
  shortenUrl: async (data: CreateUrlRequest) => {
    const response = await api.post<UrlResponse>('/urls/shorten', data);
    return response.data;
  },

  getUserUrls: async (options: UseUrlsOptions) => {
    const response = await api.get<UrlsResponse>('/urls', { params: options });
    return response.data;
  },

  getUrlAnalytics: async (shortCode: string) => {
    const response = await api.get<UrlAnalyticsType>(`/analytics/${shortCode}`);
    return response.data;
  },

  redirectUrl: async (shortCode: string) => {
    const response = await api.get<{ url: string }>(`${shortCode}`);
    return response.data;
  },

  deleteUrl: async (shortUrl: string) => {
    const response = await api.delete(`/urls/${shortUrl}`);
    return response.data;
  }
};

