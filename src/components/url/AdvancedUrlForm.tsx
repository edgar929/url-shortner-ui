import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { TextField } from '../common/Input/TextField';
import { Button } from '../common/Button/Button';
import { TagInput } from './TagInput';

const urlSchema = z.object({
  longUrl: z.string().url('Please enter a valid URL'),
  customAlias: z.string().optional(),
  title: z.string().optional(),
  expiresAt: z.string().optional(),
});

type UrlFormData = z.infer<typeof urlSchema>;

export const AdvancedUrlForm = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<UrlFormData>({
    resolver: zodResolver(urlSchema),
  });

  const onSubmit = async (data: UrlFormData) => {
    const payload = {
      ...data,
      tags,
    };
    // Handle form submission
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <TextField
        label="Long URL"
        placeholder="https://example.com"
        {...register('longUrl')}
        error={errors.longUrl?.message}
      />

      <div className="flex justify-end">
        <Button
          type="button"
          variant="secondary"
          onClick={() => setShowAdvanced(!showAdvanced)}
        >
          {showAdvanced ? 'Hide' : 'Show'} Advanced Options
        </Button>
      </div>

      {showAdvanced && (
        <div className="space-y-4 border-t pt-4 mt-4">
          <TextField
            label="Custom Alias (optional)"
            placeholder="my-custom-url"
            {...register('customAlias')}
            error={errors.customAlias?.message}
          />

          <TextField
            label="Title (optional)"
            placeholder="My URL"
            {...register('title')}
            error={errors.title?.message}
          />

          <TextField
            label="Expiration Date (optional)"
            type="datetime-local"
            {...register('expiresAt')}
            error={errors.expiresAt?.message}
          />

          <TagInput
            tags={tags}
            onChange={setTags}
            label="Tags (optional)"
          />
        </div>
      )}

      <Button type="submit" className="w-full">
        Shorten URL
      </Button>
    </form>
  );
}; 