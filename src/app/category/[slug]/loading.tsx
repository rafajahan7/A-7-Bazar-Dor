
export default function CategoryLoading() {
  return (
    <main className="mx-auto max-w-6xl space-y-6 px-4 py-8 animate-pulse">
      {/* Category title skeleton */}
      <div className="flex items-center gap-4 rounded-2xl border p-6">
        <div className="h-16 w-16 rounded-xl bg-gray-200" />
        <div className="flex-1 space-y-3">
          <div className="h-6 w-40 rounded bg-gray-200" />
          <div className="h-4 w-64 max-w-full rounded bg-gray-200" />
        </div>
      </div>

      {/* Sort control skeleton */}
      <div className="flex justify-between">
        <div className="h-4 w-28 rounded bg-gray-200" />
        <div className="h-10 w-52 rounded-lg bg-gray-200" />
      </div>

      {/* Product card skeletons */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="space-y-4 rounded-xl border p-5"
          >
            <div className="h-20 rounded-lg bg-gray-200" />
            <div className="h-5 w-3/4 rounded bg-gray-200" />
            <div className="h-4 w-1/2 rounded bg-gray-200" />
            <div className="h-8 w-1/3 rounded bg-gray-200" />
          </div>
        ))}
      </div>
    </main>
  );
}

