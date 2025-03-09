export interface ShareOptions {
  platform: 'twitter' | 'facebook' | 'linkedin' | 'email' | 'copy';
  title?: string;
  description?: string;
}

export interface SocialShareData {
  url: string;
  title?: string;
  description?: string;
  hashtags?: string[];
} 