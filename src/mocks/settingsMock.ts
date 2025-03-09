import { UserSettings } from '../types/settings';

export const mockSettings: UserSettings = {
  id: '1',
  userId: '1',
  defaultDomain: 'short.ly',
  defaultExpirationDays: 30,
  emailNotifications: true,
  theme: 'system',
  urlDefaults: {
    useCustomAlias: false,
    addTags: true,
    trackAnalytics: true
  }
}; 