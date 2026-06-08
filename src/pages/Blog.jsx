import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import blog1 from "../assets/col1.png";
import blog2 from "../assets/col2.png";
import blog3 from "../assets/col3.png";
import blog4 from "../assets/sale1.png";
import blog5 from "../assets/sale2.png";

const categories = ["View All", "Style", "Craft", "Edits", "Journal"];

const posts = [
  {
    title: "The Quiet Power of Linen",
    excerpt:
      "How a humble fiber became the cornerstone of an unhurried wardrobe.",
    image: blog1,
    date: "Oct 12, 2025",
    read: "4 min read",
    category: "Craft",
    featured: true,
  },
  {
    title: "On Coats That Last a Decade",
    excerpt:
      "Notes on outerwear that ages with grace and gets better with time.",
    image: blog3,
    date: "Oct 5, 2025",
    read: "3 min read",
    category: "Edits",
  },
  {
    title: "Edit Your Wardrobe in One Afternoon",
    excerpt: "A short framework for keeping only what you reach for.",
    image: blog4,
    date: "Sep 28, 2025",
    read: "5 min read",
    category: "Style",
  },
  {
    title: "Hand-Finished, By Design",
    excerpt: "Inside the studio where every seam is felt before it is seen.",
    image: blog5,
    date: "Sep 19, 2025",
    read: "6 min read",
    category: "Craft",
  },
  {
    title: "The One Pair of Shoes Rule",
    excerpt: "Why a single, well-made pair quietly outperforms a closet full.",
    image: blog2,
    date: "Sep 10, 2025",
    read: "3 min read",
    category: "Journal",
  },
];

export function BlogPage() {
  const [active, setActive] = useState("View All");
  const filtered =
    active === "View All" ? posts : posts.filter((p) => p.category === active);
  const featured = filtered.find((p) => p.featured) ?? filtered[0];
  const rest = filtered.filter((p) => p !== featured);

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-[1400px] px-6 pt-40 md:px-10">
        {/* Heading */}
        <div className="mb-12 max-w-2xl">
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            The Journal
          </h1>
          <p className="mt-4 text-sm text-muted-foreground md:text-base">
            Stories on craft, style, and the slow art of dressing well.
          </p>
        </div>

        {/* Category tabs */}
        <div className="flex items-end justify-between border-b border-border">
          <nav className="flex flex-wrap gap-x-8 gap-y-3">
            {categories.map((c) => {
              const isActive = c === active;
              return (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={`relative -mb-px pb-4 text-sm transition-colors ${
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {c}
                  {isActive && (
                    <span className="absolute inset-x-0 -bottom-px h-px bg-foreground" />
                  )}
                </button>
              );
            })}
          </nav>
          <p className="hidden pb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground md:block">
            Latest Posts
          </p>
        </div>

        {/* Featured + secondary */}
        {featured && (
          <div className="mt-12 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            <FeaturedCard post={featured} />
            {rest[0] && <SmallCard post={rest[0]} />}
          </div>
        )}

        {/* Remaining grid */}
        {rest.length > 1 && (
          <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8">
            {rest.slice(1).map((p) => (
              <SmallCard key={p.title} post={p} />
            ))}
          </div>
        )}

        <div className="mt-24 border-t border-border" />
        <p className="py-10 text-center text-xs uppercase tracking-[0.18em] text-muted-foreground">
          More stories coming soon
        </p>
      </div>
    </div>
  );
}

function FeaturedCard({ post }) {
  return (
    <a href="#" className="group col-span-1 block md:col-span-2">
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-muted">
        <img
          src={post.image}
          alt={post.title}
          width={1280}
          height={720}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/85 px-5 py-3 backdrop-blur-sm">
          <div className="text-xs text-foreground">
            <p className="font-medium">{post.date}</p>
            <p className="text-muted-foreground">{post.read}</p>
          </div>
          <p className="text-xs uppercase tracking-[0.16em] text-foreground">
            {post.category}
          </p>
        </div>
      </div>
      <h2 className="mt-6 text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
        {post.title}
      </h2>
      <p className="mt-3 max-w-xl text-sm text-muted-foreground">
        {post.excerpt}
      </p>
      <span className="mt-5 inline-flex items-center gap-1 text-sm text-foreground transition-opacity group-hover:opacity-60">
        Read Post <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
      </span>
    </a>
  );
}

function SmallCard({ post }) {
  return (
    <a href="#" className="group block">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-muted">
        <img
          src={post.image}
          alt={post.title}
          width={1024}
          height={768}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />
        <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-background/85 px-4 py-3 backdrop-blur-sm">
          <div className="text-[11px] text-foreground">
            <p className="font-medium">{post.date}</p>
            <p className="text-muted-foreground">{post.read}</p>
          </div>
          <p className="text-[11px] uppercase tracking-[0.16em] text-foreground">
            {post.category}
          </p>
        </div>
      </div>
      <h3 className="mt-5 text-lg font-semibold tracking-tight text-foreground">
        {post.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{post.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm text-foreground transition-opacity group-hover:opacity-60">
        Read Post <ArrowUpRight className="h-4 w-4" strokeWidth={1.5} />
      </span>
    </a>
  );
}

export default BlogPage;
