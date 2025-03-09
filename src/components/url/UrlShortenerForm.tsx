import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'react-hot-toast';
import { TextField } from '../common/Input/TextField';
import { Button } from '../common/Button/Button';
import { useUrls } from '../../hooks/useUrls';

const urlSchema = z.object({
  longUrl: z.string().url('Please enter a valid URL'),
});

type UrlFormData = z.infer<typeof urlSchema>;

export const UrlShortenerForm = () => {
  const { shortenUrl } = useUrls();
  const [shortUrl, setShortUrl] = useState<string>('');

  const { register, handleSubmit, reset, formState: { errors } } = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
  });

  const onSubmit = async (data: UrlFormData) => {
    try {
      const result = await shortenUrl.mutateAsync(data);
      setShortUrl(result.shortCode);
      reset();
      toast.success('URL shortened successfully!');
    } catch (error) {
      toast.error('Failed to shorten URL');
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    toast.success('Copied to clipboard!');
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <TextField
          label="Enter Long URL"
          placeholder="https://example.com"
          {...register('longUrl')}
          error={errors.longUrl?.message}
        />
        
        <Button
          type="submit"
          className="w-full"
          isLoading={shortenUrl.isPending}
        >
          Shorten URL
        </Button>
      </form>

      {shortUrl && (
        <div className="mt-4 p-4 bg-gray-50 rounded-md">
          <div className="flex items-center justify-between">
            <p className="text-primary-600 font-medium">{shortUrl}</p>
            <Button
              variant="secondary"
              onClick={copyToClipboard}
              className="ml-2"
            >
              Copy
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}; 