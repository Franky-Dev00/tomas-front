
function OrderCardSkeleton({ showAdminFeatures = false }) {
  return (
    <div className="border rounded-lg hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="p-6 pb-3">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            {/* Order ID */}
            <div className="h-6 bg-gray-200 rounded w-32 mb-2 animate-pulse" />
            {/* Date */}
            <div className="h-4 bg-gray-200 rounded w-40 animate-pulse" />
            {/* User info (admin only) */}
            {showAdminFeatures && (
              <div className="h-4 bg-gray-200 rounded w-48 mt-1 animate-pulse" />
            )}
          </div>
          <div className="text-right">
            {/* Status badge */}
            <div className="h-6 bg-gray-200 rounded w-24 mb-2 animate-pulse" />
            {/* Price */}
            <div className="h-6 bg-gray-200 rounded w-28 mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content - Items */}
      <div className="px-6 pt-0 pb-6">
        <div className="space-y-3">
          {[...Array(2)].map((_, index) => (
            <div key={index} className="flex items-center gap-3">
              {/* Item image */}
              <div className="w-12 h-12 bg-gray-200 rounded-md animate-pulse" />
              <div className="flex-1 space-y-1">
                {/* Item name */}
                <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
                {/* Garment and size */}
                <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse" />
                {/* Quantity */}
                <div className="h-3 bg-gray-200 rounded w-20 animate-pulse" />
                {/* Unit price */}
                <div className="h-3 bg-gray-200 rounded w-24 animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer - Status select (admin only) */}
      {showAdminFeatures && (
        <div className="px-6 pt-6 pb-6">
          <div className="h-10 bg-gray-200 rounded w-[180px] animate-pulse" />
        </div>
      )}
    </div>
  );
};

export default function OrderListSkeleton({ showAdminFeatures = false, count = 6 }) {
  return (
    <>
      {[...Array(count)].map((_, i) => (
        <OrderCardSkeleton key={i} showAdminFeatures={showAdminFeatures} />
      ))}
    </>
  );
};

