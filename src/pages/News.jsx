import { useState, useMemo } from "react";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { useSearchParams, Link } from "react-router-dom";
import { Footer } from "../components/layout/Footer";
import { useBlogs } from "../hooks/useBlogs";
import { useCategories } from "../hooks/useCategories";
import { resolveImageUrl } from "../services/api";

export function NewsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const { posts, loading, error } = useBlogs();
  const { categories, loading: categoriesLoading } = useCategories();

  const categoryFromUrl = searchParams.get("category") || "";
  const [selectedCategories, setSelectedCategories] = useState(
    categoryFromUrl ? [categoryFromUrl] : [],
  );

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

  // featured posts: first posts with is_featured=1, or fallback to first posts
  const filtered = useMemo(() => {
    return posts.filter((p) => {
      if (query && !p.name.toLowerCase().includes(query.toLowerCase()))
        return false;
      if (
        selectedCategories.length &&
        !selectedCategories.includes(p.category_slug)
      )
        return false;
      return true;
    });
  }, [query, selectedCategories, posts]);

  const featured = filtered[0];
  const rest = featured ? filtered.slice(1) : filtered;

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-400 px-6 pt-40 md:px-10">
        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            The Journal
          </h1>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">
            Stories on craft, style, and the slow art of dressing well.
          </p>
        </div>

        {/* Search Input */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search postss..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full max-w-md rounded-lg border border-border bg-background px-4 py-2 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground"
          />
        </div>
        {/* Categories */}
        <div className="border-t border-border pt-6">
          <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Collections
          </p>
          {categoriesLoading ? (
            <p className="text-xs text-muted-foreground">Loading...</p>
          ) : (
            <ul className="flex flex-wrap gap-x-5 gap-y-3">
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

        {/* Loading */}
        {loading && (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            Loading postss...
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="flex h-64 items-center justify-center text-sm text-red-400">
            Failed to load postss. Please try again.
          </div>
        )}

        {/* Empty */}
        {!loading && !error && filtered.length === 0 && (
          <div className="flex h-64 items-center justify-center text-sm text-muted-foreground">
            No postss in this category yet.
          </div>
        )}

        {/* Featured + first secondary posts */}
        {!loading && !error && featured && (
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            <FeaturedCard posts={featured} />
            {rest[0] && <SmallCard posts={rest[0]} />}
          </div>
        )}

        {/* Remaining grid */}
        {!loading && !error && rest.length > 1 && (
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {rest.slice(1).map((p) => (
              <SmallCard key={p.id} posts={p} />
            ))}
          </div>
        )}

        <div className="mt-24 border-t border-border" />
        <p className="py-10 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          More stories coming soon
        </p>
      </div>

      <Footer />
    </div>
  );
}

function FeaturedCard({ posts }) {
  return (
    <Link
      to={`/news/${posts.id}`}
      className="group col-span-1 block md:col-span-2"
    >
      <div className="relative aspect-video w-full overflow-hidden bg-muted border border-gray-400">
        <img
          src={resolveImageUrl(posts.image_url)}
          alt={posts.name}
          width={1280}
          height={720}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/85 px-5 py-3 backdrop-blur-sm">
          <div className="text-xs text-foreground">
            <p className="font-medium text-white">
              {new Date(posts.published_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-muted-foreground">{posts.read_time}</p>
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-foreground">
            {posts.category}
          </p>
        </div>
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {posts.name}
      </h2>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        {posts.description}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground transition-opacity group-hover:opacity-60">
        Read posts <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
      </span>
    </Link>
  );
}

function SmallCard({ posts }) {
  return (
    <Link to={`/news/${posts.id}`} className="group block">
      <div className="relative aspect-4/3 w-full overflow-hidden bg-muted border border-gray-400">
        <img
          src={resolveImageUrl(posts.image_url)}
          alt={posts.title}
          width={1024}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/85 px-4 py-3 backdrop-blur-sm">
          <div className="text-[11px] text-foreground">
            <p className="font-medium text-white">
              {new Date(posts.published_at).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </p>
            <p className="text-muted-foreground">{posts.read_time}</p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-foreground">
            {posts.category}
          </p>
        </div>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
        {posts.name}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{posts.description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm text-foreground transition-opacity group-hover:opacity-60">
        Read posts <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
      </span>
    </Link>
  );
}

export default NewsPage;
