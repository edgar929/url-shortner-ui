import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { urlService } from '../services/urlService';
import { CreateUrlRequest } from '../types/url';

interface UseUrlsOptions {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  dateFilter?: 'all' | 'today' | 'week' | 'month';
}

export const useUrls = (options: UseUrlsOptions = {}) => {
  const queryClient = useQueryClient();

  const urls = useQuery({
    queryKey: ['urls', options],
    queryFn: () => urlService.getUserUrls(options)
  });

  const shortenUrl = useMutation({
    mutationFn: (data: CreateUrlRequest) => urlService.shortenUrl(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['urls'] });
    }
  });

  const deleteUrl = useMutation({
    mutationFn: (shortUrl: string) => urlService.deleteUrl(shortUrl),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['urls'] });
    }
  });

  const getAnalytics = useQuery({
    queryKey: ['analytics'],
    queryFn: () => urlService.getUrlAnalytics
  });

  return {
    urls,
    shortenUrl,
    deleteUrl,
    getAnalytics
  };
}; 