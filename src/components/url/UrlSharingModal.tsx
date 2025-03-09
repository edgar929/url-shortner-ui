import { Dialog } from '@headlessui/react';
import { QRCodeSVG } from 'qrcode.react';
import { Button } from '../common/Button/Button';
import { ShareButton } from '../common/ShareButton/ShareButton';
import { sharingService } from '../../services/sharingService';
import { toast } from 'react-hot-toast';

interface UrlSharingModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title?: string;
  description?: string;
}

export const UrlSharingModal = ({
  isOpen,
  onClose,
  url,
  title,
  description,
}: UrlSharingModalProps) => {
  const handleShare = async (platform: 'twitter' | 'facebook' | 'linkedin' | 'email' | 'copy') => {
    try {
      await sharingService.shareUrl(
        { platform },
        { url, title, description }
      );
      
      if (platform === 'copy') {
        toast.success('URL copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share URL');
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-sm rounded bg-white p-6 shadow-xl">
          <Dialog.Title className="text-lg font-medium mb-4">
            Share URL
          </Dialog.Title>

          <div className="space-y-4">
            <div className="flex justify-center">
              <QRCodeSVG value={url} size={200} />
            </div>

            <div className="p-2 bg-gray-50 rounded-md">
              <p className="text-sm text-gray-600 break-all">{url}</p>
            </div>

            <div className="flex justify-center space-x-2">
              <ShareButton
                url={url}
                title={title}
                description={description}
                onShare={handleShare}
              />
              
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
}; 