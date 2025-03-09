import { ShareOptions, SocialShareData } from '../types/sharing';

export const sharingService = {
  getShareUrl(platform: ShareOptions['platform'], data: SocialShareData): string {
    const encodedUrl = encodeURIComponent(data.url);
    const encodedTitle = data.title ? encodeURIComponent(data.title) : '';
    const encodedDesc = data.description ? encodeURIComponent(data.description) : '';
    const encodedTags = data.hashtags ? data.hashtags.join(',') : '';

    switch (platform) {
      case 'twitter':
        return `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&hashtags=${encodedTags}`;
      case 'facebook':
        return `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
      case 'linkedin':
        return `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`;
      case 'email':
        return `mailto:?subject=${encodedTitle}&body=${encodedDesc}%0A%0A${encodedUrl}`;
      default:
        return data.url;
    }
  },

  async shareUrl(options: ShareOptions, data: SocialShareData): Promise<void> {
    if (options.platform === 'copy') {
      await navigator.clipboard.writeText(data.url);
      return;
    }

    const shareUrl = this.getShareUrl(options.platform, data);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
}; 