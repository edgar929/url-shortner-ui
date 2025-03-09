import { useState } from 'react';
import { format } from 'date-fns';
import { useUrls } from '../../hooks/useUrls';
import { Button } from '../common/Button/Button';
import { UrlCardSkeleton } from '../common/Skeleton/Skeleton';
import { UrlSharingModal } from './UrlSharingModal';
import { ShareIcon } from '@heroicons/react/24/outline';
import { UrlResponse } from '../../services/urlService';

interface UrlListProps {
  onUrlSelect?: (shortCode: string) => void;
}

export const UrlList = ({ onUrlSelect }: UrlListProps) => {
  const { urls } = useUrls();
  const [sortBy, setSortBy] = useState<'date' | 'clicks'>('date');
  const [sharingUrl, setSharingUrl] = useState<UrlResponse | null>(null);

  const sortedUrls = urls.data?.items?.slice().sort((a, b) => {
    if (sortBy === 'date') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return b.clicks - a.clicks;
  }) || [];

  if (urls.isLoading) {
    return (
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-4 border-b">
          <h3 className="text-lg font-medium">Your URLs</h3>
        </div>
        {[1, 2, 3, 4].map((i) => (
          <UrlCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (urls.isError) {
    return <div className="text-center text-red-500">Error loading URLs</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Your URLs</h3>
          <div className="space-x-2">
            <Button
              variant={sortBy === 'date' ? 'primary' : 'secondary'}
              onClick={() => setSortBy('date')}
            >
              Sort by Date
            </Button>
            <Button
              variant={sortBy === 'clicks' ? 'primary' : 'secondary'}
              onClick={() => setSortBy('clicks')}
            >
              Sort by Clicks
            </Button>
          </div>
        </div>
      </div>

      <div className="divide-y">
        {sortedUrls.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            No URLs found. Create your first short URL!
          </div>
        ) : (
          sortedUrls.map((url) => (
            <div 
              key={url.id} 
              className="p-4 hover:bg-gray-50 cursor-pointer"
              onClick={() => onUrlSelect?.(url.shortCode)}
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">{url.longUrl}</p>
                  <p className="text-primary-600 font-medium">{url.shortCode}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-500">
                    {format(new Date(url.createdAt), 'MMM d, yyyy')}
                  </p>
                  <p className="text-sm font-medium">{url.clicks} clicks</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSharingUrl(url);
                    }}
                    className="p-2 text-gray-400 hover:text-gray-600"
                  >
                    <ShareIcon className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {sharingUrl && (
        <UrlSharingModal
          isOpen={!!sharingUrl}
          onClose={() => setSharingUrl(null)}
          url={sharingUrl.shortCode}
          title={sharingUrl.title}
        />
      )}
    </div>
  );
}; 