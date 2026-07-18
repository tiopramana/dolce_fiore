import { Link, useParams } from "react-router-dom";
import { Navbar } from "../components/layout/Navbar";
import { useBlog } from "../hooks/useBlog";
import { resolveImageUrl } from "../services/api";

// const sections = [
//   {
//     title: "blog Details",
//     body: "Each bouquet is handcrafted with care and attention to detail. As every piece is made by hand, slight variations in arrangement may occur — this is part of the charm of a handmade blog.",
//   },
//   {
//     title: "Order Information",
//     body: "We recommend placing your order at least 2–5 days before your preferred collection date. Cancellations and refunds are not available once an order has been placed.",
//   },
//   {
//     title: "Delivery & Pickup",
//     body: "Self-pickup is available at the Yuhua Village Market area or Jurong East MRT. Delivery is available via Lalamove — delivery fees vary by distance and will be provided on the day of dispatch.",
//   },
// ];

export function NewsDetail() {
  const { id } = useParams();
  const { blog, loading, error } = useBlog(id);
  //   const [open, setOpen] = useState(null);

  if (loading) {
    return (
      <div className="relative min-h-screen bg-background">
        <Navbar />
        <div className="flex h-[80vh] items-center justify-center text-sm text-muted-foreground">
          Loading blog...
        </div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="relative min-h-screen bg-background">
        <Navbar />
        <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground">blog not found.</p>
          <Link
            to="/blog"
            className="text-xs uppercase tracking-[0.18em] underline underline-offset-4"
          >
            Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      <article className="mx-auto max-w-[800px] px-6 pt-32 pb-20">
        {/* Breadcrumbs & Category */}
        <nav className="mb-6 flex items-center gap-2 text-xs uppercase tracking-wider text-muted-foreground">
          <Link to="/news" className="hover:text-foreground transition-colors">
            News
          </Link>
          <span>/</span>
          {blog.category_name && (
            <>
              <span className="text-foreground font-medium">
                {blog.category_name}
              </span>
              <span>/</span>
            </>
          )}
        </nav>

        {/* Header Section */}
        <header className="mb-10">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-tight text-foreground leading-[1.15]">
            {blog.name}
          </h1>

          {/* Article Metadata */}
          <div className="mt-6 flex items-center gap-4 border-y border-border py-3 text-sm text-muted-foreground">
            {blog.created_at && (
              <time dateTime={blog.created_at}>
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </time>
            )}
            <span className="w-1 h-1 rounded-full bg-muted-foreground/40" />
            <span>By Editorial Team</span>
          </div>
        </header>

        {/* Hero Image */}
        <figure className="mb-10 overflow-hidden rounded-sm bg-muted">
          <img
            src={resolveImageUrl(
              blog.image_url || (blog.images && blog.images[0]),
            )}
            alt={blog.name}
            width={1600}
            height={900}
            loading="eager"
            className="w-full h-auto max-h-[500px] object-cover"
          />
        </figure>

        {/* Article Body Content */}
        <div className="prose prose-neutral dark:prose-invert max-w-none">
          {blog.description && (
            <p className="text-lg md:text-xl font-normal leading-relaxed text-foreground/90 font-serif mb-6 first-letter:text-5xl first-letter:font-bold first-letter:float-left first-letter:mr-3 first-letter:mt-1">
              {blog.description}
            </p>
          )}

          {/* Supporting Images Gallery if multiple exist */}
          {blog.images && blog.images.length > 1 && (
            <div className="my-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {blog.images.slice(1).map((img, i) => (
                <figure
                  key={i}
                  className="overflow-hidden rounded-sm bg-muted m-0"
                >
                  <img
                    src={resolveImageUrl(img)}
                    alt={`${blog.name} supporting view ${i + 1}`}
                    width={800}
                    height={600}
                    loading="lazy"
                    className="w-full h-48 md:h-64 object-cover"
                  />
                </figure>
              ))}
            </div>
          )}
        </div>
      </article>
    </div>
  );
}

export default NewsDetail;
