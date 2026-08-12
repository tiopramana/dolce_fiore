export function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#faf9f6]">
      {/* Container holding the brand identity */}
      <div className="flex flex-col items-center justify-center text-center">
        {/* Minimalist Blooming Flower SVG */}
        <div className="relative mb-6 h-24 w-24 flex items-center justify-center">
          <svg
            className="w-full h-full text-stone-800"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Center pistil / core bud */}
            <circle
              cx="50"
              cy="50"
              r="4"
              fill="currentColor"
              className="animate-[pulse_2s_infinite]"
            />

            {/* Layer 1: Inner Petals (Clockwise Spinning Reveal) */}
            <g className="animate-[spin_12s_linear_infinite] origin-center opacity-80 scale-90">
              <path d="M50 50 C45 35, 55 35, 50 50 Z" />
              <path d="M50 50 C45 65, 55 65, 50 50 Z" />
              <path d="M50 50 C35 45, 35 55, 50 50 Z" />
              <path d="M50 50 C65 45, 65 55, 50 50 Z" />
            </g>

            {/* Layer 2: Outer Organic Petals (Counter-Clockwise Breathing Bloom) */}
            <g className="animate-[spin_20s_linear_infinite_reverse] origin-center">
              {/* Petal Top-Right to Bottom-Left Axis */}
              <path
                className="animate-[pulse_3s_ease-in-out_infinite] origin-center"
                d="M50 50 C65 30, 80 45, 50 50 C35 70, 20 55, 50 50 Z"
              />
              {/* Petal Top-Left to Bottom-Right Axis */}
              <path
                className="animate-[pulse_3s_ease-in-out_infinite_1.5s] origin-center"
                d="M50 50 C35 30, 20 45, 50 50 C65 70, 80 55, 50 50 Z"
              />
            </g>
          </svg>
        </div>

        {/* Elegant Typography Display */}
        <h1 className="font-serif text-3xl font-light tracking-[0.25em] uppercase text-stone-800 animate-pulse duration-1000">
          Dolce Fiore
        </h1>

        {/* Subtle Luxury Subtitle */}
        <p className="mt-2 font-sans text-[10px] tracking-[0.4em] uppercase text-stone-400">
          Loading Experience
        </p>
      </div>
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div className="fixed inset-0 z-40 bg-[#faf9f6]/95 p-6 md:p-12 backdrop-blur-md overflow-y-auto">
      <div className="mx-auto flex h-full max-w-6xl flex-col gap-10">
        {/* Header/Title Skeleton Block */}
        <div className="space-y-3">
          {/* Main Title placeholder */}
          <div className="relative h-8 w-48 overflow-hidden bg-stone-200/60">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
          {/* Subtitle placeholder */}
          <div className="relative h-3 w-32 overflow-hidden bg-stone-200/40">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
          </div>
        </div>

        {/* Product Cards Grid Structure */}
        <div className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <div
              key={index}
              className="space-y-3 border border-stone-200/40 p-3 bg-white/40"
            >
              {/* Product Image placeholder matching aspect-[4/5] layout */}
              <div className="relative aspect-[4/5] w-full overflow-hidden bg-stone-200/50">
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>

              {/* Product Info Block placeholders */}
              <div className="space-y-2 mt-2">
                {/* Title Line */}
                <div className="relative h-4 w-4/5 overflow-hidden bg-stone-200/60">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </div>
                {/* Price Line */}
                <div className="relative h-3 w-1/4 overflow-hidden bg-stone-200/40">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
