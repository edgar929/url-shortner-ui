import { useQuery } from '@tanstack/react-query';
import { mockUrlService } from '../../services/mockUrlService';
import { ClicksChart } from './ClicksChart';
import { PieChartComponent } from './PieChartComponent';
import { UrlAnalyticsType } from '../../types/analytics';
import { AnalyticsSkeleton } from '../common/Skeleton/Skeleton';
import { useParams } from 'react-router-dom';
import { urlService } from '../../services/urlService';


export const UrlAnalytics = () => {
  const { shortCode } = useParams();
  
  // Real clicks data
  const { data: urlData } = useQuery({
    queryKey: ['url-clicks', shortCode],
    queryFn: () => urlService.getUrlAnalytics(shortCode as string),
  });

  // Mock data for charts and distributions
  const { data: mockData, isLoading, isError } = useQuery<UrlAnalyticsType>({
    queryKey: ['mock-analytics', shortCode],
    queryFn: () => mockUrlService.getUrlAnalytics(shortCode as string),
  });

  if (isLoading) {
    return <AnalyticsSkeleton />;
  }

  if (isError) {
    return (
      <div className="text-center py-8 text-red-500">
        Failed to load analytics data
      </div>
    );
  }

  if (!mockData) return null;

  const browserData = mockData.browsers.map(({ browser, count }) => ({
    name: browser,
    value: count,
  }));

  const locationData = mockData.locations.map(({ country, count }) => ({
    name: country,
    value: count,
  }));

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Analytics Overview
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Total Clicks</p>
            <p className="text-2xl font-bold text-primary-600">
              {urlData?.clicks || 0}
            </p>
          </div>
          {/* Add more summary stats here */}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Clicks Over Time
        </h3>
        <ClicksChart data={mockData.clicksOverTime} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <PieChartComponent
          data={browserData}
          title="Browser Distribution"
        />
        <PieChartComponent
          data={locationData}
          title="Geographic Distribution"
        />
      </div>
    </div>
  );
}; 