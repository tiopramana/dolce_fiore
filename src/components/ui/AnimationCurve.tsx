import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";

const PRODUCTS = [
  "https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=400&h=400&fit=crop", // roses
  "https://images.unsplash.com/photo-1468327768560-75b778cbb551?w=400&h=400&fit=crop", // bouquet
  "https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=400&h=400&fit=crop", // tulips
  "https://images.unsplash.com/photo-1455656678494-4d1b5f3e7ad1?w=400&h=400&fit=crop", // flowers
  "https://images.unsplash.com/photo-1526045612212-70caf35c14df?w=400&h=400&fit=crop", // pink flowers
  "https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=400&h=400&fit=crop", // sunflower
  "https://images.unsplash.com/photo-1470509037663-253afd7f0f51?w=400&h=400&fit=crop", // bouquet
  "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?w=400&h=400&fit=crop", // flower field
  "https://images.unsplash.com/photo-1518895949257-7621c3c786d7?w=400&h=400&fit=crop", // roses
  "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=400&h=400&fit=crop", // bouquet
  "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?w=400&h=400&fit=crop", // floral
  "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?w=400&h=400&fit=crop", // flowers
  "https://images.unsplash.com/photo-1526397751294-331021109fbd?w=400&h=400&fit=crop", // peonies
  "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&h=400&fit=crop", // bouquet
];
const SPEED = 0.04; // full loops per second — lower = slower marquee

export function CurvedProductArc() {
  const containerRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let raf: number;
    let startTime: number | null = null;

    const tick = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000;

      const W = container.offsetWidth;
      const H = container.offsetHeight;

      // Ellipse params
      const isMobile = W < 768;
      const cxPx = W * 0.5;
      const cyPx = isMobile ? H * 0.42 : H * 0.72;
      const rxPx = isMobile ? W * 0.95 : W * 0.78; // lebih lebar dari container di mobile
      const ryPx = isMobile ? H * 0.38 : H * 0.65; // lebih flat di mobile

      const scrollOffset = (elapsed * SPEED) % 1;
      const total = PRODUCTS.length;

      dotRefs.current.forEach((el, i) => {
        if (!el) return;
        if (isMobile && i % 2 === 0) {
          el.style.opacity = "0"; // sembunyikan dot genap di mobile
          return;
        }
        const t = i / (total + 1);
        const position = (t + scrollOffset) % 1;

        // Map 0–1 position to 180°–360° (top half of ellipse only)
        const angleDeg = 180 + position * 180;
        const rad = (angleDeg * Math.PI) / 180;

        const x = cxPx + rxPx * Math.cos(rad);
        const y = cyPx + ryPx * Math.sin(rad);

        // Depth: dots near top of arc (low y) = smaller + more transparent
        const depthT = Math.max(isMobile ? 1 : 2, Math.min(2, y / H));
        const size = Math.round(30 + depthT * 30);

        // Smooth float
        const floatY = Math.sin(elapsed * 0.7 + i * 0.95) * 3;

        // Fade dots as they approach the edges of the arc
        const fadeZone = 0.08; // 8% of the loop = fade region at each end
        const fadeIn = Math.min(1, position / fadeZone);
        const fadeOut = Math.min(1, (1 - position) / fadeZone);
        const edgeFade = Math.min(fadeIn, fadeOut);
        const opacity = (0.5 + depthT * 0.5) * edgeFade;

        // Write directly to DOM — zero React involvement
        el.style.left = `${x}px`;
        el.style.top = `${y}px`;
        el.style.width = `${size}px`;
        el.style.height = `${size}px`;
        el.style.opacity = opacity.toFixed(3);
        el.style.transform = `translate(-50%, calc(-50% + ${floatY.toFixed(2)}px))`;
        el.style.zIndex = String(Math.round(depthT * 10));
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <section className="relative w-full py-16 md:py-28">
      <div
        ref={containerRef}
        className="relative mx-auto w-full max-w-6xl"
        style={{ height: "clamp(480px, 60vw, 700px)" }}
      >
        {/* Dots — rendered once by React, animated purely via DOM refs */}
        {PRODUCTS.map((src, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) dotRefs.current[i] = el;
            }}
            className="absolute rounded-full border border-border/40 bg-card overflow-hidden"
            style={{ willChange: "transform, left, top, opacity" }}
          >
            <img
              src={src}
              alt={`Product ${i + 1}`}
              className="h-full w-full object-cover gap-5"
              loading="lazy"
            />
          </div>
        ))}

        {/* Center content */}
        <div className="absolute left-1/2 top-[65%] md:top-[52%] w-full max-w-xl -translate-x-1/2 -translate-y-1/2 text-center px-4">
          <span className="inline-block rounded-full border border-border bg-card px-4 py-1.5 text-xs font-medium tracking-wide text-foreground shadow-sm">
            Stats
          </span>
          <h2 className="mt-6 font-serif text-4xl leading-tight text-foreground md:text-5xl lg:text-6xl">
            100+ Flowers Got
            <br />
            Sold Last Month
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-muted-foreground md:text-base">
            "We create handcrafted crochet and wire flowers that capture beauty,
            elegance, and lasting sentiment in every detail."
          </p>

          <a
            href="#shop"
            className="inline-flex mt-5 items-center justify-center bg-white px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-white/80 outline-1"
          >
            Shop Now
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
