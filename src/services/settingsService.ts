import { api } from './api';
import { UserSettings, UpdateSettingsRequest } from '../types/settings';

export const settingsService = {
  getUserSettings: async (): Promise<UserSettings> => {
    const response = await api.get('/settings');
    return response.data;
  },

  updateSettings: async (settings: UpdateSettingsRequest): Promise<UserSettings> => {
    const response = await api.patch('/settings', settings);
    return response.data;
  }
}; 