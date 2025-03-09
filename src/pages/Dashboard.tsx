import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button/Button';
import { useUrls } from '../hooks/useUrls';
import { format } from 'date-fns';
import { toast } from 'react-hot-toast';
import { useState, useEffect } from 'react';
import { ChevronUpIcon, ChevronDownIcon, FunnelIcon, MagnifyingGlassIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { useDebounce } from '../hooks/useDebounce';

type SortField = 'createdAt' | 'clicks';
type SortOrder = 'asc' | 'desc';
type DateFilter = 'all' | 'today' | 'week' | 'month';

interface UrlData {
  id: number;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: string;
  user: {
    id: number;
    username: string;
    email: string;
    createdAt: string;
  };
}

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isLoading: boolean;
}

const DeleteModal = ({ isOpen, onClose, onConfirm, isLoading }: DeleteModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full">
        <h2 className="text-xl font-bold mb-4">Delete URL</h2>
        <p className="text-gray-600 mb-6">Are you sure you want to delete this URL? This action cannot be undone.</p>
        <div className="flex justify-end gap-4">
          <Button
            onClick={onClose}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800"
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-600 hover:bg-red-700 text-white"
            isLoading={isLoading}
          >
            Delete
          </Button>
        </div>
      </div>
    </div>
  );
};

interface ViewModalProps {
  url: UrlData | null;
  onClose: () => void;
}

const ViewModal = ({ url, onClose }: ViewModalProps) => {
  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard!');
  };

  if (!url) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full">
        <h2 className="text-xl font-bold mb-6">URL Details</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Short URL</label>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={`${import.meta.env.VITE_API_URL}/${url.shortUrl}`}
                readOnly
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
              />
              <Button
                onClick={() => copyToClipboard(`${import.meta.env.VITE_API_URL}/${url.shortUrl}`)}
                className="text-gray-600 hover:text-gray-900"
              >
                Copy
              </Button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original URL</label>
            <input
              type="text"
              value={url.originalUrl}
              readOnly
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Created At</label>
              <input
                type="text"
                value={format(new Date(url.createdAt), 'MMM d, yyyy HH:mm')}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Total Clicks</label>
              <input
                type="text"
                value={url.clicks}
                readOnly
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-50"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-6">
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

export const Dashboard = () => {
  const [page, setPage] = useState(1);
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [search, setSearch] = useState('');
  const [dateFilter, setDateFilter] = useState<DateFilter>('all');
  const [showFilters, setShowFilters] = useState(false);
  const itemsPerPage = 10;
  const [deleteUrlId, setDeleteUrlId] = useState<string | null>(null);
  const [viewUrl, setViewUrl] = useState<UrlData | null>(null);
  const { urls, deleteUrl } = useUrls();
  const navigate = useNavigate();

  const debouncedSearch = useDebounce(search, 500);

  const { urls: urlsData } = useUrls({ 
    page, 
    sortField, 
    sortOrder, 
    limit: itemsPerPage,
    search: debouncedSearch,
    dateFilter 
  });

  // Reset to first page when filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, dateFilter, sortField, sortOrder]);

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url);
    toast.success('Copied to clipboard!');
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return null;
    return sortOrder === 'asc' ? (
      <ChevronUpIcon className="w-4 h-4 inline-block ml-1" />
    ) : (
      <ChevronDownIcon className="w-4 h-4 inline-block ml-1" />
    );
  };

  const FilterBar = () => (
    <div className={`bg-gray-50 p-4 rounded-lg mb-4 ${showFilters ? '' : 'hidden'}`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date Range
          </label>
          <select
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value as DateFilter)}
          >
            <option value="all">All time</option>
            <option value="today">Today</option>
            <option value="week">Last 7 days</option>
            <option value="month">Last 30 days</option>
          </select>
        </div>
      </div>
    </div>
  );

  const handleDelete = async () => {
    if (!deleteUrlId) return;
    
    try {
      await deleteUrl.mutateAsync(deleteUrlId);
      toast.success('URL deleted successfully');
      setDeleteUrlId(null);
    } catch (error) {
      toast.error('Failed to delete URL');
    }
  };

  if (urlsData.isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-8"></div>
            <div className="bg-white rounded-lg shadow">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b border-gray-200 p-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (urlsData.isError) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-6xl mx-auto text-center">
          <div className="bg-red-50 text-red-600 p-4 rounded-lg">
            Failed to load URLs. Please try again later.
          </div>
        </div>
      </div>
    );
  }

  const totalPages = Math.ceil((urlsData.data?.total || 0) / itemsPerPage);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Your links</h1>
          <Link to="/create">
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              Create new link
            </Button>
          </Link>
        </div>

        {/* Search and Filter Controls */}
        <div className="mb-6 space-y-4">
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search URLs..."
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
            </div>
            <Button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </Button>
          </div>
          <FilterBar />
        </div>

        <div className="bg-white rounded-lg shadow">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Short Link
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Original URL
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('createdAt')}
                  >
                    Created <SortIcon field="createdAt" />
                  </th>
                  <th 
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer"
                    onClick={() => handleSort('clicks')}
                  >
                    Clicks <SortIcon field="clicks" />
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {Array.isArray(urlsData.data) && urlsData.data.length ? (
                  urlsData.data.map((url: UrlData) => (
                    <tr key={url.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <a 
                          href={`${import.meta.env.VITE_API_URL}/${url.shortUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          {url.shortUrl}
                        </a>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        <div className="max-w-xs truncate" title={url.originalUrl}>
                          {url.originalUrl}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {format(new Date(url.createdAt), 'MMM d, yyyy')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                        {url.clicks}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => copyToClipboard(`${import.meta.env.VITE_API_URL}/${url.shortUrl}`)}
                            className="text-gray-600 hover:text-gray-900"
                          >
                            Copy
                          </Button>
                          <Button
                            onClick={() => navigate(`/analytics/${url.shortUrl}`)}
                            className="text-blue-600 hover:text-blue-900"
                          >
                            <EyeIcon className="w-5 h-5" />
                          </Button>
                          <Button
                            onClick={() => setDeleteUrlId(url.shortUrl)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="w-5 h-5" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                      No links found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200">
            <div className="flex-1 flex justify-between sm:hidden">
              <Button
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
                className="text-gray-700 bg-white"
              >
                Previous
              </Button>
              <Button
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages}
                className="text-gray-700 bg-white"
              >
                Next
              </Button>
            </div>
            <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-gray-700">
                  Showing page <span className="font-medium">{page}</span> of{' '}
                  <span className="font-medium">{totalPages}</span>
                </p>
              </div>
              <div>
                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                    <button
                      key={pageNum}
                      onClick={() => setPage(pageNum)}
                      className={`
                        relative inline-flex items-center px-4 py-2 border text-sm font-medium
                        ${pageNum === page
                          ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                          : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                        }
                        ${pageNum === 1 ? 'rounded-l-md' : ''}
                        ${pageNum === totalPages ? 'rounded-r-md' : ''}
                      `}
                    >
                      {pageNum}
                    </button>
                  ))}
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal
        isOpen={!!deleteUrlId}
        onClose={() => setDeleteUrlId(null)}
        onConfirm={handleDelete}
        isLoading={deleteUrl.isPending}
      />
      
      <ViewModal
        url={viewUrl}
        onClose={() => setViewUrl(null)}
      />
    </div>
  );
}; 