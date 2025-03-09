export interface ShortenedUrl {
  id: string;
  shortCode: string;
  longUrl: string;
  createdAt: string;
  clicks: number;
  expiresAt?: string;
  title?: string;
  tags: string[];
  isCustom: boolean;
}

export interface CreateUrlRequest {
  longUrl: string;
  customAlias?: string;
  expiresAt?: string;
  title?: string;
  tags?: string[];
}

export interface UseUrlsOptions {
  page?: number;
  limit?: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
  dateFilter?: 'all' | 'today' | 'week' | 'month';
} 