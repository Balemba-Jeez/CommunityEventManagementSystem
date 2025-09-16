interface SkeletonLoaderProps {
  type: 'stories' | 'carousel' | 'grid' | 'card';
}

export const SkeletonLoader = ({ type }: SkeletonLoaderProps) => {
  if (type === 'stories') {
    return (
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div className="h-8 w-32 shimmer rounded"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-8 shimmer rounded"></div>
            <div className="h-8 w-8 shimmer rounded"></div>
          </div>
        </div>
        <div className="flex space-x-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="flex-shrink-0">
              <div className="w-24 h-24 shimmer rounded-full mb-2"></div>
              <div className="h-4 w-20 shimmer rounded mx-auto mb-1"></div>
              <div className="h-3 w-16 shimmer rounded mx-auto"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'carousel') {
    return (
      <div className="space-y-6 w-full">
        <div className="flex items-center justify-between">
          <div className="h-8 w-24 shimmer rounded"></div>
          <div className="flex space-x-2">
            <div className="h-8 w-8 shimmer rounded"></div>
            <div className="h-8 w-8 shimmer rounded"></div>
          </div>
        </div>
        <div className="aspect-video shimmer rounded-lg"></div>
        <div className="flex space-x-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex-shrink-0 w-48">
              <div className="aspect-video shimmer rounded-lg mb-3"></div>
              <div className="h-4 w-full shimmer rounded mb-2"></div>
              <div className="h-3 w-3/4 shimmer rounded"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'grid') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-4">
            <div className="aspect-video shimmer rounded-lg"></div>
            <div className="space-y-2">
              <div className="h-5 w-full shimmer rounded"></div>
              <div className="h-5 w-3/4 shimmer rounded"></div>
              <div className="flex justify-between">
                <div className="h-4 w-20 shimmer rounded"></div>
                <div className="h-4 w-16 shimmer rounded"></div>
              </div>
              <div className="flex justify-between items-center">
                <div className="h-3 w-24 shimmer rounded"></div>
                <div className="flex space-x-2">
                  <div className="h-6 w-6 shimmer rounded"></div>
                  <div className="h-6 w-6 shimmer rounded"></div>
                  <div className="h-6 w-6 shimmer rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (type === 'card') {
    return (
      <div className="space-y-4">
        <div className="aspect-video shimmer rounded-lg"></div>
        <div className="space-y-2">
          <div className="h-5 w-full shimmer rounded"></div>
          <div className="h-5 w-3/4 shimmer rounded"></div>
          <div className="flex justify-between">
            <div className="h-4 w-20 shimmer rounded"></div>
            <div className="h-4 w-16 shimmer rounded"></div>
          </div>
          <div className="flex justify-between items-center">
            <div className="h-3 w-24 shimmer rounded"></div>
            <div className="flex space-x-2">
              <div className="h-6 w-6 shimmer rounded"></div>
              <div className="h-6 w-6 shimmer rounded"></div>
              <div className="h-6 w-6 shimmer rounded"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return null;
};