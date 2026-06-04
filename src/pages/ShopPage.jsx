import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { ProductCard } from "../components/ui/ProductCard";
import { Slider } from "../components/ui/Slider";
import {
  products,
  collections,
  statuses,
  PRICE_MIN,
  PRICE_MAX,
} from "./shopData";

export function Shop() {
  const [query, setQuery] = useState("");
  // const { collection, statuses } = Route.useSearch();
  // const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedCollections, setSelectedCollections] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState([]);

  const [priceRange, setPriceRange] = useState([PRICE_MIN, PRICE_MAX]);

  const toggle = (arr, v) =>
    arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v];

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      if (
        selectedCollections.length &&
        !selectedCollections.some((c) => p.collections.includes(c))
      )
        return false;
      if (
        selectedStatus.length &&
        !selectedStatus.some((s) => p.status.includes(s))
      )
        return false;
      if (p.price < priceRange[0] || p.price > priceRange[1]) return false;
      return true;
    });
  }, [query, selectedCollections, selectedStatus, priceRange]);

  return (
    <div className="relative max-w-400 bg-background">
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
          {/* Sticky sidebar */}
          <aside className="md:w-64 md:shrink-0">
            <div className="md:sticky md:top-28 space-y-8">
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

              <div className="border-t border-border pt-6">
                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Collections
                </p>
                <ul className="space-y-3">
                  {collections.map((c) => (
                    <li key={c}>
                      <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
                        <input
                          type="checkbox"
                          checked={selectedCollections.includes(c)}
                          onChange={() =>
                            setSelectedCollections((prev) => toggle(prev, c))
                          }
                          className="h-4 w-4 rounded-sm border-border accent-foreground"
                        />
                        {c}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-6">
                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Status
                </p>
                <ul className="space-y-3">
                  {statuses.map((s) => (
                    <li key={s}>
                      <label className="flex cursor-pointer items-center gap-3 text-sm text-foreground">
                        <input
                          type="checkbox"
                          checked={selectedStatus.includes(s)}
                          onChange={() =>
                            setSelectedStatus((prev) => toggle(prev, s))
                          }
                          className="h-4 w-4 rounded-sm border-border accent-foreground"
                        />
                        {s}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-border pt-6">
                <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  Price range
                </p>
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
            </div>
          </aside>

          {/* Product grid */}
          <section className="flex-1">
            {filtered.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
                No products match your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-x-3 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((p) => (
                  <ProductCard
                    key={p.name}
                    name={p.name}
                    price={`SGD $${p.price}`}
                    image={p.image}
                    hoverImage={p.hoverImage}
                  />
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default Shop;
