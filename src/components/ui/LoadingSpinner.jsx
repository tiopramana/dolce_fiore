export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <h1 className="font-serif text-4xl tracking-wide">Dolce Fiore</h1>

      <div className="mt-6 h-0.5 w-40 overflow-hidden bg-gray-200">
        <div className="h-full animate-pulse bg-black" />
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="fixed inset-0 z-40 bg-white/95 p-6 backdrop-blur-sm">
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-6">
        <div className="h-16 w-3/4 rounded-2xl bg-gray-200 animate-pulse" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="space-y-4 rounded-3xl bg-gray-100 p-6 shadow-sm"
            >
              <div className="h-48 rounded-3xl bg-gray-200 animate-pulse" />
              <div className="h-6 w-2/3 rounded-full bg-gray-200 animate-pulse" />
              <div className="h-4 w-1/2 rounded-full bg-gray-200 animate-pulse" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
