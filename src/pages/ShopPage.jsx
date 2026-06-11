import { useMemo, useState } from "react";
import { Search, RotateCcw } from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { Footer } from "../components/layout/Footer";
import { ProductCard } from "../components/ui/ProductCard";
import { Slider } from "../components/ui/Slider";
import { useProducts } from "../hooks/useProducts";
import { useCategories } from "../hooks/useCategories";
import { resolveImageUrl } from "../services/api";

const INSTAGRAM_USER = "dolcee_fioree";
const PRICE_MIN = 0;
const PRICE_MAX = 500;

export function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);

  const categoryFromUrl = searchParams.get("category") || "";
  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromUrl ? [categoryFromUrl] : [],
  );

  // useEffect(() => {
  //   if (categoryFromUrl) {
  //     setSelectedCategories([categoryFromUrl]);
  //   } else {
  //     setSelectedCategories([]);
  //   }
  // }, [categoryFromUrl]);

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useProducts();

  const { categories, loading: categoriesLoading } = useCategories();

  const toggle = (slug) => {
    const next = selectedCategories.includes(slug)
      ? selectedCategories.filter((x) => x !== slug)
      : [...selectedCategories, slug];
    setSelectedCategories(next);
    if (next.length === 1) {
      setSearchParams({ category: next[0] });
    } else {
      setSearchParams({});
    }
  };

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      if (
        selectedCategories.length &&
        !selectedCategories.includes(p.category_slug)
      )
        return false;
      if (p.price !== undefined) {
        if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      }
      return true;
    });
  }, [query, selectedCategories, priceRange, products]);

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-400 px-6 pt-32 pb-20 md:px-10">
        <header className="mb-12 pl-0 md:pl-72">
          <h1 className="text-5xl font-semibold tracking-tight text-foreground md:text-6xl">
            Explore Our Shop
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Discover handpicked products made just for you.
          </p>
        </header>

        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          {/* Sidebar */}
          <aside className="md:w-64 md:shrink-0">
            <div className="md:sticky md:top-28 space-y-8">
              {/* Search */}
              <div>
                <p className="mb-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Search by product
                </p>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full rounded-sm border border-border bg-transparent py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none"
                  />
                </div>
              </div>

              {/* Categories */}
              <div className="border-t border-border pt-6">
                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Collections
                </p>
                {categoriesLoading ? (
                  <p className="text-xs text-muted-foreground">Loading...</p>
                ) : (
                  <ul className="space-y-3">
                    <li>
                      <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
                        <input
                          type="checkbox"
                          checked={selectedCategories.length === 0}
                          onChange={() => {
                            setSelectedCategories([]);
                            setSearchParams({});
                          }}
                          className="h-4 w-4 rounded-sm border-border accent-black"
                        />
                        All Products
                      </label>
                    </li>
                    {categories.map((c) => (
                      <li key={c.id}>
                        <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
                          <input
                            type="checkbox"
                            checked={selectedCategories.includes(c.slug)}
                            onChange={() => toggle(c.slug)}
                            className="h-4 w-4 rounded-sm border-border accent-black"
                          />
                          {c.name}
                        </label>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              {/* Price range */}
              <div className="border-t border-border pt-6">
                <div className="mb-4 flex items-center justify-between">
                  <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Price range
                  </p>

                  <button
                    onClick={() => setPriceRange([PRICE_MIN, PRICE_MAX])}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                    title="Reset price filter"
                  >
                    <RotateCcw className="h-3.5 w-3.5" />
                    Reset
                  </button>
                </div>

                <Slider
                  value={priceRange}
                  onValueChange={(v) => setPriceRange([v[0], v[1]])}
                  min={PRICE_MIN}
                  max={PRICE_MAX}
                  step={5}
                  className="mt-2"
                />

                <div className="mt-3 flex justify-between text-xs text-muted-foreground">
                  <span>SGD ${priceRange[0]}</span>
                  <span>SGD ${priceRange[1]}</span>
                </div>
              </div>

              {/* ── Custom order CTA in sidebar ── */}
              <div className="border-t border-border pt-6">
                <p className="mb-2 text-sm font-medium text-foreground">
                  Looking for something custom?
                </p>
                <p className="mb-4 text-xs text-muted-foreground leading-relaxed">
                  Can't find what you're looking for? We'll craft it just for
                  you.
                </p>
                <button
                  onClick={() =>
                    window.open(`https://ig.me/m/${INSTAGRAM_USER}`, "_blank")
                  }
                  className="w-full border border-border py-3 text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-black hover:text-white"
                >
                  Chat with us →
                </button>
              </div>
            </div>
          </aside>

          {/* Product grid */}
          <section className="flex-1">
            {/* ── Custom order banner above grid ── */}
            <div className="mb-8 flex items-center justify-between border border-border px-5 py-4">
              <div>
                <p className="text-sm font-medium text-foreground">
                  Want a custom arrangement?
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Tell us your vision and we'll bring it to life.
                </p>
              </div>
              <button
                onClick={() =>
                  window.open(`https://ig.me/m/${INSTAGRAM_USER}`, "_blank")
                }
                className="shrink-0 ml-4 border border-border px-4 py-2 text-xs uppercase tracking-[0.18em] text-foreground transition-colors hover:bg-black hover:text-white"
              >
                DM us →
              </button>
            </div>

            {/* Loading */}
            {productsLoading && (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                Loading products...
              </div>
            )}

            {/* Error */}
            {productsError && (
              <div className="flex h-64 items-center justify-center text-sm text-red-400">
                Failed to load products. Please try again.
              </div>
            )}

            {/* Empty */}
            {!productsLoading && !productsError && filtered.length === 0 && (
              <div className="flex h-64 flex-col items-center justify-center gap-3 text-sm text-muted-foreground">
                <p>No products match your filters.</p>
                <button
                  onClick={() =>
                    window.open(`https://ig.me/m/${INSTAGRAM_USER}`, "_blank")
                  }
                  className="text-xs underline underline-offset-4 hover:text-foreground"
                >
                  Looking for something custom? Chat with us →
                </button>
              </div>
            )}

            {/* Grid */}
            {!productsLoading && !productsError && filtered.length > 0 && (
              <div className="grid grid-cols-1 gap-x-3 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <Link to={`/shop/${p.id}`} key={p.id}>
                    <ProductCard
                      name={p.name}
                      price={`SGD $${p.price}`}
                      image={resolveImageUrl(p.image_url)}
                      categoryName={p.category_name}
                    />
                  </Link>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default Shop;
