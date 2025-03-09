interface SkeletonProps {
  className?: string;
}

export const Skeleton = ({ className = '' }: SkeletonProps) => {
  return (
    <div 
      className={`animate-pulse bg-gray-200 rounded ${className}`}
    />
  );
};

export const UrlCardSkeleton = () => {
  return (
    <div className="p-4 border-b">
      <div className="flex justify-between">
        <div className="space-y-2 flex-1 mr-8">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-1/2" />
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-16" />
        </div>
      </div>
    </div>
  );
};

export const AnalyticsSkeleton = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-8">
      <div className="space-y-4">
        <Skeleton className="h-8 w-48" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-gray-50 p-4 rounded-lg">
              <Skeleton className="h-4 w-24 mb-2" />
              <Skeleton className="h-6 w-16" />
            </div>
          ))}
        </div>
      </div>
      <Skeleton className="h-[300px] w-full" />
    </div>
  );
}; 