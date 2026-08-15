const KEYFRAMES = `
  @keyframes df-shimmer {
    0%   { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }
  @keyframes df-skeleton-in {
    0%   { opacity: 0; }
    100% { opacity: 1; }
  }
`;

/** A single shimmering placeholder block. `delay` staggers the sweep. */
function Shimmer({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <div className={`relative overflow-hidden bg-stone-200/50 ${className}`}>
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.35) 35%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0.35) 65%, transparent 100%)",
          animation: `df-shimmer 2.4s ease-in-out infinite`,
          animationDelay: `${delay}s`,
        }}
      />
    </div>
  );
}

export function PageSkeleton() {
  return (
    <div
      className="fixed inset-0 z-40 overflow-y-auto bg-[#faf9f6]/95 p-6 backdrop-blur-md md:p-12"
      style={{ animation: "df-skeleton-in 0.35s ease both" }}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      <div className="mx-auto flex h-full max-w-6xl flex-col gap-10">
        {/* Header/Title Skeleton Block */}
        <div className="space-y-3">
          <Shimmer className="h-8 w-48" delay={0} />
          <Shimmer className="h-3 w-32" delay={0.08} />
        </div>

        {/* Product Cards Grid Structure */}
        <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => {
            // Each card's whole shimmer group is offset from the next,
            // so the "wave" travels left-to-right across the grid instead
            // of every card lighting up at once.
            const cardDelay = index * 0.18;
            return (
              <div
                key={index}
                className="space-y-3 border border-stone-200/40 bg-white/40 p-3"
              >
                <Shimmer className="aspect-[4/5] w-full" delay={cardDelay} />
                <div className="mt-2 space-y-2">
                  <Shimmer className="h-4 w-4/5" delay={cardDelay + 0.1} />
                  <Shimmer className="h-3 w-1/4" delay={cardDelay + 0.16} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default PageSkeleton;
