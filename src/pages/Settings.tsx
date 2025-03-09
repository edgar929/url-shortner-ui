import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'react-hot-toast';
import { TextField } from '../components/common/Input/TextField';
import { Button } from '../components/common/Button/Button';
import { useSettings } from '../context/SettingsContext';

const settingsSchema = z.object({
  defaultDomain: z.string().optional(),
  defaultExpirationDays: z.number().min(0).optional(),
  emailNotifications: z.boolean(),
  theme: z.enum(['light', 'dark', 'system']),
  urlDefaults: z.object({
    useCustomAlias: z.boolean(),
    addTags: z.boolean(),
    trackAnalytics: z.boolean(),
  }),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

export const Settings = () => {
  const { settings, updateSettings, isLoading } = useSettings();
  
  const { register, handleSubmit, formState: { errors } } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: settings || undefined,
  });

  const onSubmit = async (data: SettingsFormData) => {
    try {
      await updateSettings(data);
      toast.success('Settings updated successfully');
    } catch (error) {
      toast.error('Failed to update settings');
    }
  };

  if (isLoading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <TextField
            label="Default Domain"
            {...register('defaultDomain')}
            error={errors.defaultDomain?.message}
          />
          
          <TextField
            label="Default Expiration Days"
            type="number"
            {...register('defaultExpirationDays', { valueAsNumber: true })}
            error={errors.defaultExpirationDays?.message}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Theme
            </label>
            <select
              {...register('theme')}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="system">System</option>
            </select>
          </div>

          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                {...register('emailNotifications')}
                className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Enable email notifications
              </span>
            </label>
          </div>

          <fieldset className="space-y-2">
            <legend className="text-sm font-medium text-gray-700">
              URL Defaults
            </legend>
            
            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('urlDefaults.useCustomAlias')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">
                  Enable custom aliases by default
                </span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('urlDefaults.addTags')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">
                  Enable tags by default
                </span>
              </label>
            </div>

            <div className="space-y-2">
              <label className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  {...register('urlDefaults.trackAnalytics')}
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm text-gray-700">
                  Track analytics by default
                </span>
              </label>
            </div>
          </fieldset>
        </div>

        <Button type="submit" className="w-full">
          Save Settings
        </Button>
      </form>
    </div>
  );
}; 