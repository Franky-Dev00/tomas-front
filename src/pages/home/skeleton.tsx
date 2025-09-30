

export default function DesignListSkeleton() {
  return (
    <>
      {[...Array(8)].map((_, i) => (
        <DesignCardSkeleton key={i} />
      ))}
    </>
  )
}

function DesignCardSkeleton() {
  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="relative">
        {/* Image skeleton */}
        <div className="w-full h-64 bg-gray-200 animate-pulse" />

        {/* Buttons placeholder in top right */}
        <div className="absolute top-2 right-2 flex gap-1">
          <div className="w-8 h-8 bg-gray-300 rounded animate-pulse" />
          <div className="w-8 h-8 bg-gray-300 rounded animate-pulse" />
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          {/* Title skeleton */}
          <div className="h-6 bg-gray-200 rounded w-2/3 animate-pulse" />

          {/* Price skeleton */}
          <div className="h-6 bg-gray-200 rounded w-20 animate-pulse" />
        </div>

        {/* Button skeleton */}
        <div className="w-full h-10 bg-gray-200 rounded mt-4 animate-pulse" />
      </div>
    </div>
  );
};
