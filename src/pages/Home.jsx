import { useState, useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ProductCard } from "../components/ui/ProductCard";
import { CardCollection } from "../components/ui/ProductCollection";
import { CurvedProductArc } from "../components/ui/AnimationCurve";
import { CtaBanner } from "../components/ui/Cta";
import { Plus, Minus } from "lucide-react";
import { useScrollAnimation } from "../components/layout/ScollAnim";

import { useProducts } from "../hooks/useProducts";
import { resolveImageUrl } from "../services/api";
import { Link } from "react-router-dom";

import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
import col2 from "../assets/col2.png";

// ─── Animation CSS (injected once) ──────────────────────────────────────────
const ANIM_STYLES = `
  /* Base state — hidden */
  .anim-hidden        { opacity: 0; }
  .anim-fade-up       { opacity: 0; transform: translateY(40px); }
  .anim-fade-down     { opacity: 0; transform: translateY(-30px); }
  .anim-fade-left     { opacity: 0; transform: translateX(-50px); }
  .anim-fade-right    { opacity: 0; transform: translateX(50px); }
  .anim-scale-up      { opacity: 0; transform: scale(0.92); }

  /* Visible state */
  .anim-visible {
    opacity: 1 !important;
    transform: none !important;
    transition: opacity 0.7s cubic-bezier(.22,1,.36,1),
                transform 0.7s cubic-bezier(.22,1,.36,1);
  }

  /* Stagger helpers — add to children */
  .stagger-1 { transition-delay: 0.08s !important; }
  .stagger-2 { transition-delay: 0.18s !important; }
  .stagger-3 { transition-delay: 0.28s !important; }
  .stagger-4 { transition-delay: 0.38s !important; }
  .stagger-5 { transition-delay: 0.48s !important; }

  /* Hero text enters on page load */
  @keyframes heroFadeUp {
    from { opacity: 0; transform: translateY(32px); }
    to   { opacity: 1; transform: translateY(0);    }
  }
  .hero-title {
    animation: heroFadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.3s both;
  }
  .hero-desc {
    animation: heroFadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.5s both;
  }
  .hero-btn {
    animation: heroFadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.7s both;
  }
  .hero-dots {
    animation: heroFadeUp 0.9s cubic-bezier(.22,1,.36,1) 0.9s both;
  }
`;

function StyleInjector() {
  useEffect(() => {
    if (document.getElementById("scroll-anim-styles")) return;
    const tag = document.createElement("style");
    tag.id = "scroll-anim-styles";
    tag.textContent = ANIM_STYLES;
    document.head.appendChild(tag);
  }, []);
  return null;
}

// ─── Staggered list (each child gets its own observer + delay) ───────────────
function StaggeredList({
  items,
  renderItem,
  animClass = "anim-fade-up",
  wrapperClass = "",
}) {
  const [ref, visible] = useScrollAnimation(0.1);
  return (
    <div ref={ref} className={wrapperClass}>
      {items.map((item, i) => (
        <div
          key={i}
          className={`${animClass} stagger-${i + 1} ${visible ? "anim-visible" : ""}`}
        >
          {renderItem(item, i)}
        </div>
      ))}
    </div>
  );
}

// ─── Data ────────────────────────────────────────────────────────────────────
const slides = [
  {
    image: hero1,
    title: "Hand Crafted",
    description: "Everlasting Blooms, Meticulously Crafted by Hand.",
  },
  {
    image: hero2,
    title: "Preordered",
    description: "Slowly Crafted with Love. Pre-Order Your Custom Blooms Now.",
  },
];

const faqs = [
  {
    title: "How far in advance should I place my order?",
    content:
      "We recommend placing your order at least 2–5 days before your preferred collection date. However, you are welcome to order earlier to secure your preferred time slot.",
  },
  {
    title: "Where can I collect my order?",
    content:
      "Self-pickup appointments can be arranged at the Yuhua Village Market area or Jurong East MRT. Collection details will be provided after your order is confirmed.",
  },
  {
    title: "What is your cancellation and refund policy?",
    content:
      "As each bouquet is handmade and prepared specifically for your order, cancellations and refunds are not available once an order has been placed.",
  },
  {
    title: "Will my bouquet look exactly like the photos?",
    content:
      "Each bouquet is handcrafted, making every piece unique. While we strive to recreate designs as accurately as possible, slight variations may occur. Please also note that product photos are styled and taken under different lighting conditions, so actual colors may vary slightly.",
  },
  {
    title: "Do you offer delivery?",
    content:
      "Yes, delivery is available via Lalamove (car delivery). Delivery fees may vary depending on distance and demand. The delivery cost will be provided on the day of dispatch. Alternatively, you may arrange your own courier service.",
  },
  {
    title: "Is packaging included?",
    content:
      "A recyclable carrier will be provided with every order. If you prefer a transparent carrier bag, it can be purchased for an additional $1.",
  },
];

const services = [
  {
    num: "01",
    title: "Deliver with quality",
    desc: "Every product is crafted with care and attention to detail, ensuring the best for your customers.",
  },
  {
    num: "02",
    title: "Hand Crafted",
    desc: "Every product is crafted with care and attention to detail, ensuring the best for your customers.",
  },
  {
    num: "03",
    title: "Pre-Ordered Book",
    desc: "Every product is crafted with care and attention to detail, ensuring the best for your customers.",
  },
];

// ─── Component ───────────────────────────────────────────────────────────────
export const Home = () => {
  const [active, setActive] = useState(0);
  const [open, setOpen] = useState(0);

  const { products: featuredProducts, loading: featuredLoading } =
    useProducts();
  const bestSellers = featuredProducts.slice(0, 3); // show first 3 as best sellers
  const collectionItems = featuredProducts.slice(0, 4); // show first 4 as collection

  // Refs for sections used with useScrollAnimation
  const [bestSellerTitleRef, bestSellerTitleVisible] = useScrollAnimation(0.2);
  const [serviceRef, serviceVisible] = useScrollAnimation(0.1);
  const [collectionTitleRef, collectionTitleVisible] = useScrollAnimation(0.2);
  const [faqTitleRef, faqTitleVisible] = useScrollAnimation(0.2);
  const [faqImageRef, faqImageVisible] = useScrollAnimation(0.15);
  const [curvedRef, curvedVisible] = useScrollAnimation(0.1);
  const [ctaRef, ctaVisible] = useScrollAnimation(0.1);
  const [footerRef, footerVisible] = useScrollAnimation(0.05);

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % slides.length),
      6000,
    );
    return () => clearInterval(id);
  }, []);

  return (
    <section>
      <StyleInjector />
      <Navbar />

      {/* ── Hero ── */}
      <div className="mt-25 mx-auto flex max-w-400 px-3 py-2">
        <div className="relative h-[calc(90vh-4.5rem)] w-full overflow-hidden px-4 pt-4 md:px-6 md:pt-6">
          <div className="relative h-full w-full overflow-hidden">
            {slides.map((slide, i) => (
              <div key={slide.image}>
                <img
                  src={slide.image}
                  alt={slide.title}
                  width="auto"
                  height="auto"
                  loading={i === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
                <div
                  className={`absolute inset-0 bg-linear-to-t from-black/60 to-transparent transition-opacity duration-1000 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
              </div>
            ))}

            {/* Hero text — animated on load (CSS keyframes) */}
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-10 mt-80 text-center">
              <h1 className="hero-title text-5xl font-semibold tracking-tight text-white drop-shadow-lg md:text-7xl">
                {slides[active].title}
              </h1>
              <p className="hero-desc text-base text-white">
                {slides[active].description}
              </p>
              <Link
                to="/shop"
                className="hero-btn md:mb-0 mb-40 inline-flex mt-5 items-center justify-center bg-white px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-all hover:bg-black hover:text-white"
              >
                Shop Now
              </Link>
            </div>

            <div className="hero-dots absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-0.5 transition-all duration-200 ${
                    i === active
                      ? "w-8 bg-white"
                      : "w-4 bg-zinc-400/70 hover:bg-white/80"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Best Seller ── */}
      <div className="mt-20 mx-auto max-w-400 items-center justify-between px-10 py-8">
        {/* Title row */}
        <div
          ref={bestSellerTitleRef}
          className={`anim-fade-up flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between ${
            bestSellerTitleVisible ? "anim-visible" : ""
          }`}
        >
          <h1 className="text-3xl md:text-4xl font-inter capitalize">
            Best Sales
          </h1>
          <Link
            to="/shop"
            className="inline-flex items-center justify-center border bg-white px-4 py-3 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-white/80 sm:w-auto"
          >
            View More
          </Link>
        </div>

        {/* Cards — staggered */}
        {featuredLoading ? (
          <div className="flex h-48 mt-10 items-center justify-center text-sm text-muted-foreground">
            Loading...
          </div>
        ) : (
          <StaggeredList
            items={bestSellers}
            animClass="anim-fade-up"
            wrapperClass="grid mt-10 grid-cols-1 gap-x-2 gap-y-12 md:grid-cols-3 md:gap-x-3"
            renderItem={(p) => (
              <Link to={`/shop/${p.id}`} key={p.id}>
                <ProductCard
                  name={p.name}
                  price={`SGD $${p.price}`}
                  image={resolveImageUrl(p.image_url)}
                  hoverImage={resolveImageUrl(p.hover_img_url)}
                />
              </Link>
            )}
          />
        )}
      </div>

      {/* ── Services ── */}
      <div id="services" className="mt-20 border-y border-gray-300">
        <div className="mx-auto max-w-400 flex items-center px-6 md:px-10 py-12 lg:h-80">
          <div
            ref={serviceRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16"
          >
            {services.map((s, i) => (
              <div
                key={i}
                className={`anim-fade-left stagger-${i + 1} ${serviceVisible ? "anim-visible" : ""}`}
              >
                <span className="text-sm text-gray-400">{s.num}</span>
                <h2 className="py-4 text-2xl font-medium">{s.title}</h2>
                <p className="text-sm leading-relaxed text-gray-500">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Collection ── */}
      <div
        id="collection"
        className="mt-20 mx-auto max-w-400 items-center justify-between px-10 py-8"
      >
        <div
          ref={collectionTitleRef}
          className={`anim-fade-up flex items-center justify-between ${
            collectionTitleVisible ? "anim-visible" : ""
          }`}
        >
          <h1 className="text-4xl capitalize font-inter">Collection</h1>
        </div>

        {featuredLoading ? (
          <div className="flex h-48 mt-10 items-center justify-center text-sm text-muted-foreground">
            Loading...
          </div>
        ) : (
          <StaggeredList
            items={collectionItems}
            animClass="anim-scale-up"
            wrapperClass="grid grid-cols-1 mt-20 lg:grid-cols-4 gap-3"
            renderItem={(c) => (
              <Link to={`/shop/${c.id}`} key={c.id}>
                <CardCollection
                  name={c.name}
                  image={resolveImageUrl(c.image_url)}
                  description={c.description}
                />
              </Link>
            )}
          />
        )}
      </div>

      {/* ── Curved Arc ── */}
      <div
        ref={curvedRef}
        className={`anim-fade-up mt-23 mx-auto items-center justify-between px-10 py-8 overflow-hidden border-b border-gray-300 ${
          curvedVisible ? "anim-visible" : ""
        }`}
      >
        <CurvedProductArc />
      </div>

      {/* ── FAQ ── */}
      <div id="faq" className="mx-auto max-w-400 px-6 md:px-10 py-20">
        {/* Heading */}
        <div
          ref={faqTitleRef}
          className={`anim-fade-up mb-14 ${faqTitleVisible ? "anim-visible" : ""}`}
        >
          <h2 className="text-4xl font-medium text-black">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl text-gray-500">
            Everything you need to know about our flower collections,
            deliveries, and services.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Image — slides in from left */}
          <div
            ref={faqImageRef}
            className={`anim-fade-left ${faqImageVisible ? "anim-visible" : ""}`}
          >
            <img
              src={col2}
              alt="Flowers"
              className="lg:h-[70%] w-full h-full rounded-3xl object-cover"
            />
          </div>

          {/* FAQ items — staggered from right */}
          <StaggeredList
            items={faqs}
            animClass="anim-fade-right"
            wrapperClass=""
            renderItem={(faq, index) => {
              const isOpen = open === index;
              return (
                <div className="border-b border-gray-200 py-6">
                  <button
                    onClick={() => setOpen(isOpen ? null : index)}
                    className="flex w-full items-center justify-between text-left"
                  >
                    <h3 className="text-lg font-medium text-black">
                      {faq.title}
                    </h3>
                    <span className="transition-transform duration-300">
                      {isOpen ? (
                        <Minus className="h-5 w-5 text-black" />
                      ) : (
                        <Plus className="h-5 w-5 text-black" />
                      )}
                    </span>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-500 ease-in-out ${
                      isOpen ? "max-h-40 opacity-100 mt-4" : "max-h-0 opacity-0"
                    }`}
                  >
                    <p className="text-gray-600 leading-7">{faq.content}</p>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>

      {/* ── CTA ── */}
      <div
        ref={ctaRef}
        className={`anim-fade-up mx-auto max-w-400 ${ctaVisible ? "anim-visible" : ""}`}
      >
        <CtaBanner />
      </div>

      {/* ── Footer ── */}
      <div
        ref={footerRef}
        className={`anim-fade-up ${footerVisible ? "anim-visible" : ""}`}
      >
        <Footer />
      </div>
    </section>
  );
};

export default Home;
