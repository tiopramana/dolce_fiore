import { useState, useEffect } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ProductCard } from "../components/ui/ProductCard";
import { CardCollection } from "../components/ui/ProductCollection";

import hero1 from "../assets/hero1.png";
import hero2 from "../assets/hero2.png";
// import hero3 from "../assets/hero3.png";

import sale1 from "../assets/sale1.png";
import sale1_hover from "../assets/sale1-hover.png";
import sale2 from "../assets/sale2.png";
import sale2_hover from "../assets/sale2-hover.png";
import sale3 from "../assets/sale3.png";
import sale3_hover from "../assets/sale3-hover.png";

import col1 from "../assets/col1.png";
import col1_hov from "../assets/col1-hov.png";
import col2 from "../assets/col2.png";
import col2_hov from "../assets/col2-hover.png";
import col3 from "../assets/col3.png";
import col3_hov from "../assets/col3-hov.png";

// Defined outside the component — stable, never recreated on re-render
const slides = [
  {
    image: hero1,
    title: "Hand Crafted",
    description: " Everlasting Blooms, Meticulously Crafted by Hand.",
  },
  {
    image: hero2,
    title: "Preordered",
    description: "Slowly Crafted with Love. Pre-Order Your Custom Blooms Now.",
  },
  // { image: hero3, title: "Valentine" },
];

export const Home = () => {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const id = setInterval(
      () => setActive((a) => (a + 1) % slides.length),
      6000,
    );
    return () => clearInterval(id);
  }, []); // slides is stable — empty dep array is correct

  return (
    <section>
      <Navbar />

      {/* Hero Section */}
      <div className="mt-25 mx-auto flex max-w-400 px-3 py-2">
        <div className="relative h-[calc(90vh-4.5rem)] w-full overflow-hidden px-4 pt-4 md:px-6 md:pt-6">
          <div className="relative h-full w-full overflow-hidden">
            {slides.map((slide, i) => (
              <div>
                <img
                  key={slide.image}
                  src={slide.image}
                  alt={slide.title}
                  width={"auto"}
                  height={"auto"}
                  loading={i === 0 ? "eager" : "lazy"}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
                    i === active ? "opacity-100" : "opacity-0"
                  }`}
                />
                {/* Darkens only the bottom 50% of the slide */}
                <div
                  className={`absolute inset-0 bg-linear-to-t from-black/60 to-transparent transition-opacity duration-1000 ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              </div>
            ))}

            <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-10 mt-80 text-center">
              <h1 className="text-5xl font-semibold tracking-tight text-white drop-shadow-lg md:text-7xl">
                {slides[active].title}
              </h1>
              <p className="text-base text-white">
                {slides[active].description}
              </p>

              <a
                href="#shop"
                className="inline-flex mt-5 items-center justify-center bg-white px-10 py-4 text-xs font-medium uppercase tracking-[0.2em] text-foreground transition-colors hover:bg-white/80"
              >
                Shop Now
              </a>
            </div>

            <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-2">
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

      {/* Best Seller Section */}
      <div className="mt-20 mx-auto max-w-400 items-center justify-between px-10 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl capitalize font-inter">Best Sales</h1>
          <a
            href="#shop"
            className="inline-flex mt-5 items-center justify-center bg-white px-4 py-3 text-xs font-medium uppercase border tracking-[0.2em] text-foreground transition-colors hover:bg-white/80"
          >
            View More
          </a>
        </div>

        <div id="shop" className="mt-7">
          <div className="grid grid-cols-1 gap-x-2 gap-y-12 md:grid-cols-3 md:gap-x-3">
            <ProductCard
              name="Crestline wool coat"
              price="USD $420"
              image={sale1}
              hoverImage={sale1_hover}
            />
            <ProductCard
              name="Aldgate leather gloves"
              price="USD $95"
              image={sale2}
              hoverImage={sale2_hover}
            />
            <ProductCard
              name="Ember ribbed turtleneck"
              price="USD $145"
              image={sale3}
              hoverImage={sale3_hover}
            />
          </div>
        </div>
      </div>

      {/* Services */}
      <div id="services" className="mt-20 border-y border-gray-300">
        <div className="mx-auto max-w-400 flex items-center px-6 md:px-10 py-12 lg:h-80">
          <div className="grid grid-cols-1md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-16">
            <div>
              <span className="text-sm text-gray-300">01</span>

              <h2 className="py-4 text-xl font-medium">Deliver with quality</h2>

              <p className="text-sm leading-relaxed text-gray-500">
                Every product is crafted with care and attention to detail,
                ensuring the best for your customers.
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-300">02</span>

              <h2 className="py-4 text-xl font-medium">Deliver with quality</h2>

              <p className="text-sm leading-relaxed text-gray-500">
                Every product is crafted with care and attention to detail,
                ensuring the best for your customers.
              </p>
            </div>

            <div>
              <span className="text-sm text-gray-300">03</span>

              <h2 className="py-4 text-xl font-medium">Deliver with quality</h2>

              <p className="text-sm leading-relaxed text-gray-500">
                Every product is crafted with care and attention to detail,
                ensuring the best for your customers.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-20 mx-auto max-w-400 items-center justify-between px-10 py-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl capitalize font-inter">Collection</h1>
        </div>

        <div id="shop" className="mt-7">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
            <CardCollection
              name="The Midnight Blue Bouquet"
              image={sale3}
              hoverImage={sale3_hover}
              description="Perfect for : Graduation, Love,
Friendship, Mother’s day,
Valentines day, Birthday."
            />

            <CardCollection
              name="Ember ribbed turtleneck"
              image={col1}
              hoverImage={col1_hov}
              description="Perfect for : Graduation, Love,
Friendship, Mother’s day,
Valentines day, Birthday."
            />

            <CardCollection
              name="Ember ribbed turtleneck"
              image={col2}
              hoverImage={col2_hov}
              description="Perfect for : Graduation, Love,
Friendship, Mother’s day,
Valentines day, Birthday."
            />

            <CardCollection
              name="Ember ribbed turtleneck"
              image={col3}
              hoverImage={col3_hov}
              description="Perfect for : Graduation, Love,
Friendship, Mother’s day,
Valentines day, Birthday."
            />
          </div>
        </div>
      </div>

      <Footer />
    </section>
  );
};

export default Home;
