import { useState } from 'react';
import { handleError } from '../utils/errorHandler';

export const useAsync = <T, Args extends unknown[]>(
  asyncFn: (...args: Args) => Promise<T>,
  onSuccess?: (data: T) => void
) => {
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (...args: Args) => {
    try {
      setIsLoading(true);
      const result = await asyncFn(...args);
      onSuccess?.(result);
      return result;
    } catch (error) {
      handleError(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    execute,
    isLoading
  };
}; 