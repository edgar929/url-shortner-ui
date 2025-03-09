import { toast } from 'react-hot-toast';
import { AxiosError } from 'axios';

export const handleError = (error: unknown) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || 'An error occurred';
    toast.error(message);
    return;
  }

  if (error instanceof Error) {
    toast.error(error.message);
    return;
  }

  toast.error('An unexpected error occurred');
}; 