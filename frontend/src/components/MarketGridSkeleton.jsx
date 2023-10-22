import React from 'react';

const SkeletonBlock = () => {
  return (
    <div className="animate-pulse">
      <div className="flex flex-col w-[380px] bg-white shadow-xl rounded">
        {/* image container skeleton */}
        <div className="w-full h-[250px] bg-gray-300"></div>
        
        {/* info skeletons */}
        <div className="flex flex-col gap-1 p-3">
          <div className="h-4 bg-gray-300 rounded w-3/4"></div> {/* Title skeleton */}
          <div className="h-4 bg-gray-300 rounded mt-2"></div> {/* Price skeleton */}

          <div className="flex gap-3 mt-2">
            <div className="h-4 bg-gray-300 rounded w-14"></div> {/* Property detail skeleton */}
            <div className="h-4 bg-gray-300 rounded w-14"></div> {/* Property detail skeleton */}
            <div className="h-4 bg-gray-300 rounded w-14"></div> {/* Property detail skeleton */}
          </div>

          <div className="h-4 bg-gray-300 rounded w-full mt-2"></div> {/* Address skeleton */}

          <div className="flex justify-between mt-2">
            <div className="flex items-center gap-2">
              <div className="h-4 bg-gray-300 rounded w-14"></div> {/* Shares input skeleton */}
            </div>
            <div className="bg-gray-300 px-6 rounded-lg py-2 w-14"></div> {/* Button skeleton */}
          </div>
        </div>
      </div>
    </div>
  );
};

const MarketGridSkeleton = () => {
  return (
    <div className="grid grid-cols-3 mt-20 gap-10 ">
      <SkeletonBlock />
      <SkeletonBlock />
      <SkeletonBlock />
      <SkeletonBlock />
      <SkeletonBlock />
      <SkeletonBlock />
     
    </div>
  );
};

export default MarketGridSkeleton;
