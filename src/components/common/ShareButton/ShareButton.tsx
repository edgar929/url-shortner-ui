import { useState } from 'react';
import { ShareIcon } from '@heroicons/react/24/outline';
import { Button } from '../Button/Button';
import { ShareOptions } from '../../../types/sharing';

interface ShareButtonProps {
  url: string;
  title?: string;
  description?: string;
  onShare?: (platform: ShareOptions['platform']) => void;
}

export const ShareButton = ({ url, title, description, onShare }: ShareButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const shareOptions: Array<{ platform: ShareOptions['platform']; label: string; icon: string }> = [
    { platform: 'copy', label: 'Copy Link', icon: '📋' },
    { platform: 'twitter', label: 'Twitter', icon: '𝕏' },
    { platform: 'facebook', label: 'Facebook', icon: 'f' },
    { platform: 'linkedin', label: 'LinkedIn', icon: 'in' },
    { platform: 'email', label: 'Email', icon: '✉️' },
  ];

  const handleShare = (platform: ShareOptions['platform']) => {
    onShare?.(platform);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <Button
        variant="secondary"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2"
      >
        <ShareIcon className="h-5 w-5" />
        <span>Share</span>
      </Button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu">
            {shareOptions.map((option) => (
              <button
                key={option.platform}
                onClick={() => handleShare(option.platform)}
                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                role="menuitem"
              >
                <span className="w-6 text-center">{option.icon}</span>
                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 