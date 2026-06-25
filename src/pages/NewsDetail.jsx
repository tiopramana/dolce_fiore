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
      <div className="mx-auto max-w-400 px-6 pt-32 pb-20 md:px-10">
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span className="mx-2">/</span>
          {blog.category_name && (
            <>
              <span>{blog.category_name}</span>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-foreground">{blog.name}</span>
        </nav>

        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          {/* blog images */}
          <section className="flex-1 space-y-3">
            {blog.images && blog.images.length > 0 ? (
              blog.images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-full overflow-hidden bg-muted"
                >
                  <img
                    src={resolveImageUrl(img)}
                    alt={`${blog.name} view ${i + 1}`}
                    width={1600}
                    height={1800}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="h-auto w-auto object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="relative w-full overflow-hidden bg-muted">
                <img
                  src={resolveImageUrl(blog.image_url)}
                  alt={blog.name}
                  width={1600}
                  height={1800}
                  loading="eager"
                  className="h-auto w-full object-cover"
                />
              </div>
            )}
          </section>

          {/* Sticky right sidebar */}
          <aside className="md:w-[22rem] md:flex-shrink-0">
            <div className="md:sticky md:top-28">
              {blog.category_name && (
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {blog.category_name}
                </span>
              )}

              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                {blog.name}
              </h1>

              {blog.description && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {blog.description}
                </p>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default NewsDetail;
