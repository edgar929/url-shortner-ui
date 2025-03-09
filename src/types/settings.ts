export interface UserSettings {
  id: string;
  userId: string;
  defaultDomain?: string;
  defaultExpirationDays?: number;
  emailNotifications: boolean;
  theme: 'light' | 'dark' | 'system';
  urlDefaults: {
    useCustomAlias: boolean;
    addTags: boolean;
    trackAnalytics: boolean;
  };
}

export interface UpdateSettingsRequest {
  defaultDomain?: string;
  defaultExpirationDays?: number;
  emailNotifications?: boolean;
  theme?: 'light' | 'dark' | 'system';
  urlDefaults?: {
    useCustomAlias?: boolean;
    addTags?: boolean;
    trackAnalytics?: boolean;
  };
} 