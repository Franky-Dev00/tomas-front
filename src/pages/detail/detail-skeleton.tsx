
export default function DetailSkeleton() {
  return (
    <div className="container mx-auto px-4 py-16">
      {/* Back button skeleton */}
      <div className="mb-6">
        <div className="h-10 w-32 bg-gray-200 rounded animate-pulse" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Cart/Images skeleton */}
        <div className="space-y-4">
          {/* Main image */}
          <div className="aspect-square overflow-hidden rounded-lg border bg-gray-200 animate-pulse" />

          {/* Thumbnail grid */}
          <div className="grid grid-cols-4 gap-2">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="aspect-square overflow-hidden rounded-md border-2 bg-gray-200 animate-pulse"
              />
            ))}
          </div>
        </div>

        {/* Product details skeleton */}
        <div className="space-y-6">
          {/* Title and price */}
          <div>
            <div className="h-9 bg-gray-200 rounded w-3/4 mb-2 animate-pulse" />
            <div className="h-9 bg-gray-200 rounded w-32 mb-16 animate-pulse" />
          </div>

          <div className="h-px bg-gray-200" />

          {/* Garment select */}
          <div>
            <div className="h-6 bg-gray-200 rounded w-24 mb-3 animate-pulse" />
            <div className="grid grid-cols-2 gap-2 mb-8">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className="h-10 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Size select */}
          <div className="mb-8">
            <div className="h-6 bg-gray-200 rounded w-20 mb-3 animate-pulse" />
            <div className="flex flex-wrap gap-2">
              {[...Array(5)].map((_, i) => (
                <div
                  key={i}
                  className="w-12 h-12 bg-gray-200 rounded animate-pulse"
                />
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <div className="h-6 bg-gray-200 rounded w-24 mb-3 animate-pulse" />
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded animate-pulse" />
              <div className="w-12 h-6 bg-gray-200 rounded animate-pulse" />
              <div className="w-9 h-9 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>

          <div className="h-px bg-gray-200" />

          {/* Add to cart button */}
          <div className="space-y-3">
            <div className="w-full h-12 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </div>

      {/* Description and features cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Description card */}
        <div className="border rounded-lg">
          <div className="p-6">
            <div className="h-7 bg-gray-200 rounded w-32 mb-4 animate-pulse" />
            <div className="space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            </div>
          </div>
        </div>

        {/* Features card */}
        <div className="border rounded-lg">
          <div className="p-6">
            <div className="h-7 bg-gray-200 rounded w-40 mb-4 animate-pulse" />
            <ul className="space-y-2">
              {[...Array(5)].map((_, i) => (
                <li key={i} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300" />
                  <div className="h-4 bg-gray-200 rounded flex-1 animate-pulse" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

