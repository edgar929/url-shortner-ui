import { useState, useEffect } from 'react';
import { Button } from '../components/common/Button/Button';
import { TextField } from '../components/common/Input/TextField';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { useUrls } from '../hooks/useUrls';
import { useLocation } from 'react-router-dom';

const urlSchema = z.object({
  longUrl: z.string().url('Please enter a valid URL'),
  title: z.string().optional()
});

type UrlFormData = z.infer<typeof urlSchema>;

interface SuccessModalProps {
  shortUrl: string;
  onClose: () => void;
}

const SuccessModal = ({ shortUrl, onClose }: SuccessModalProps) => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const formattedUrl = `${apiUrl}/${shortUrl.split('/').pop()}`;

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formattedUrl);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Your shortened URL is ready!</h2>
        <div className="flex items-center gap-2 mb-6">
          <input
            type="text"
            value={formattedUrl}
            readOnly
            className="flex-1 px-4 py-2 text-lg text-gray-700 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
          />
          <Button
            onClick={copyToClipboard}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            Copy
          </Button>
        </div>
        <div className="flex justify-end">
          <Button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
          >
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};

export const CreateLink = () => {
  const [showModal, setShowModal] = useState(false);
  const [shortUrl, setShortUrl] = useState('');
  const { shortenUrl } = useUrls();
  const location = useLocation();
  
  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema)
  });

  useEffect(() => {
    // Check if we have a URL from the navigation state
    if (location.state?.url) {
      // Set the URL in the form
      setValue('longUrl', location.state.url);
      // Automatically submit the form
      onSubmit({ longUrl: location.state.url });
    }
  }, [location.state]);

  const onSubmit = async (data: UrlFormData) => {
    try {
      const response = await shortenUrl.mutateAsync(data);
      setShortUrl(response.shortUrl);
      setShowModal(true);
      reset();
      toast.success('URL shortened successfully!');
    } catch (error) {
      toast.error('Failed to create short link');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <TextField
                label="Destination"
                type="url"
                placeholder="https://example.com/my-long-url"
                {...register('longUrl')}
                error={errors.longUrl?.message}
                className="w-full"
              />
            </div>

            <div>
              <TextField
                label="Title (optional)"
                type="text"
                placeholder="Enter a title"
                {...register('title')}
                error={errors.title?.message}
                className="w-full"
              />
            </div>

            <div className="flex justify-end">
              <Button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white"
                isLoading={shortenUrl.isPending}
              >
                Create short link
              </Button>
            </div>
          </form>
        </div>
      </div>

      {showModal && (
        <SuccessModal
          shortUrl={shortUrl}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}; 