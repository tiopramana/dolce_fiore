import { useEffect, useState } from "react";

const KEYFRAMES = `
  @keyframes df-petal-inner {
    0%   { opacity: 0; transform: scale(0.2); }
    100% { opacity: 1; transform: scale(1); }
  }
  @keyframes df-petal-outer {
    0%   { opacity: 0; transform: scale(0.15) rotate(0deg); }
    100% { opacity: 1; transform: scale(1) rotate(0deg); }
  }
  @keyframes df-core-pulse {
    0%, 100% { opacity: 0.85; transform: scale(1); }
    50%      { opacity: 1;    transform: scale(1.15); }
  }
  @keyframes df-bloom-breathe {
    0%, 100% { transform: scale(1); }
    50%      { transform: scale(1.035); }
  }
  @keyframes df-word-reveal {
    0%   { opacity: 0; letter-spacing: 0.5em; filter: blur(4px); }
    100% { opacity: 1; letter-spacing: 0.25em; filter: blur(0); }
  }
  @keyframes df-caption-reveal {
    0%   { opacity: 0; transform: translateY(4px); }
    100% { opacity: 1; transform: translateY(0); }
  }
  @keyframes df-progress {
    0%   { transform: scaleX(0); }
    100% { transform: scaleX(1); }
  }
  @keyframes df-grain-shift {
    0%, 100% { transform: translate(0, 0); }
    10%      { transform: translate(-1%, -1%); }
    30%      { transform: translate(1%, 2%); }
    50%      { transform: translate(-2%, 1%); }
    70%      { transform: translate(2%, -1%); }
    90%      { transform: translate(-1%, 2%); }
  }
`;

interface LoadingScreenProps {
  /** Controlled loading state. When it flips to false, the screen exits. */
  isLoading?: boolean;
  /** Duration of the exit fade/scale, in ms. */
  exitDurationMs?: number;
  /** Called after the exit transition finishes — good place to unmount. */
  onExitComplete?: () => void;
}

export function LoadingScreen({
  isLoading,
  exitDurationMs = 700,
  onExitComplete,
}: LoadingScreenProps) {
  // Self-contained demo mode if no controlled state is passed in.
  const [internalLoading, setInternalLoading] = useState(true);
  const [mounted, setMounted] = useState(true);

  const loading = isLoading ?? internalLoading;

  useEffect(() => {
    if (isLoading !== undefined) return; // controlled externally
    const t = setTimeout(() => setInternalLoading(false), 2600);
    return () => clearTimeout(t);
  }, [isLoading]);

  useEffect(() => {
    if (loading) return;
    const t = setTimeout(() => {
      setMounted(false);
      onExitComplete?.();
    }, exitDurationMs);
    return () => clearTimeout(t);
  }, [loading, exitDurationMs, onExitComplete]);

  if (!mounted) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-hidden"
      style={{
        backgroundColor: "#faf8f4",
        transition: `opacity ${exitDurationMs}ms ease, transform ${exitDurationMs}ms ease`,
        opacity: loading ? 1 : 0,
        transform: loading ? "scale(1)" : "scale(1.04)",
        pointerEvents: loading ? "auto" : "none",
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />

      {/* Radial vignette — gives the flat cream background depth */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 42%, rgba(201,121,122,0.08) 0%, rgba(250,248,244,0) 55%), radial-gradient(circle at 50% 50%, transparent 0%, rgba(60,45,40,0.05) 100%)",
        }}
      />

      {/* Faint animated grain — breaks up the flat fill */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.05] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          animation: "df-grain-shift 6s steps(1) infinite",
        }}
      />

      {/* Brand identity */}
      <div className="relative flex flex-col items-center justify-center text-center">
        {/* Blooming flower mark */}
        <div
          className="relative mb-7 flex h-24 w-24 items-center justify-center"
          style={{
            animation: "df-bloom-breathe 4s ease-in-out infinite 1.6s",
          }}
        >
          <svg
            className="h-full w-full"
            viewBox="0 0 100 100"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* =========================================================
          OUTER BLOOM
          6 identical petals
      ========================================================== */}
            <g stroke="#a5716f" strokeWidth="1.2">
              {["0.55s", "0.67s", "0.79s", "0.91s", "1.03s", "1.15s"].map(
                (delay, index) => (
                  <g key={index} transform={`rotate(${index * 60} 50 50)`}>
                    <path
                      d="
                M50 50
                C53 42, 58 32, 55 26
                C53 22, 47 22, 45 26
                C42 32, 47 42, 50 50
                Z
              "
                      fill="#f3e2df"
                      style={{
                        transformOrigin: "50px 50px",
                        animation: `df-petal-outer
                  0.7s
                  cubic-bezier(.22,1,.36,1)
                  ${delay}
                  both`,
                      }}
                    />
                  </g>
                ),
              )}
            </g>

            {/* =========================================================
          INNER BLOOM
          6 smaller, softer petals
      ========================================================== */}
            <g stroke="#8b5a5b" strokeWidth="1.1">
              {["0.18s", "0.26s", "0.34s", "0.42s", "0.50s", "0.58s"].map(
                (delay, index) => (
                  <g key={index} transform={`rotate(${index * 60} 50 50)`}>
                    <path
                      d="
                M50 50
                C52 46, 55 42, 53 39
                C52 37, 48 37, 47 39
                C45 42, 48 46, 50 50
                Z
              "
                      fill="#8b5a5b"
                      style={{
                        transformOrigin: "50px 50px",
                        animation: `df-petal-inner
                  0.5s
                  cubic-bezier(.22,1,.36,1)
                  ${delay}
                  both`,
                      }}
                    />
                  </g>
                ),
              )}
            </g>

            {/* =========================================================
          CORE
      ========================================================== */}
            <circle
              cx="50"
              cy="50"
              r="3"
              fill="#6b4645"
              style={{
                transformOrigin: "50px 50px",
                opacity: 0,
                animation:
                  "df-petal-inner 0.4s ease 0s both, df-core-pulse 2.4s ease-in-out infinite 1.2s",
              }}
            />
          </svg>
        </div>

        {/* Wordmark */}
        <h1
          className="text-xl font-light uppercase text-stone-800"
          style={{
            animation: "df-word-reveal 1s cubic-bezier(.22,1,.36,1) 1.1s both",
          }}
        >
          Dolce Fiore
        </h1>

        {/* Progress line */}
        <div
          className="mt-5 h-px w-32 overflow-hidden rounded-full bg-stone-800/10"
          style={{
            animation: "df-caption-reveal 0.6s ease 1.5s both",
          }}
        >
          <div
            className="h-full origin-left bg-[#8b5a5b]"
            style={{
              animation: `df-progress ${
                loading ? "2.6s" : "0.3s"
              } cubic-bezier(.22,1,.36,1) 1.5s both`,
            }}
          />
        </div>

        {/* Caption */}
        <p
          className="mt-3 font-sans text-[10px] tracking-[0.4em] text-stone-400 uppercase"
          style={{
            animation: "df-caption-reveal 0.6s ease 1.6s both",
          }}
        >
          Dressing every bloom
        </p>
      </div>
    </div>
  );
}

export default LoadingScreen;
