import { Link, useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { useProduct } from "../hooks/useProduct";
import { resolveImageUrl } from "../services/api";

const INSTAGRAM_USER = "dolcee_fioree";

const sections = [
  {
    title: "Product Details",
    body: "Each bouquet is handcrafted with care and attention to detail. As every piece is made by hand, slight variations in arrangement may occur — this is part of the charm of a handmade product.",
  },
  {
    title: "Order Information",
    body: "We recommend placing your order at least 2–5 days before your preferred collection date. Cancellations and refunds are not available once an order has been placed.",
  },
  {
    title: "Delivery & Pickup",
    body: "Self-pickup is available at the Yuhua Village Market area or Jurong East MRT. Delivery is available via Lalamove — delivery fees vary by distance and will be provided on the day of dispatch.",
  },
];

export function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { product, loading, error } = useProduct(id);
  const [open, setOpen] = useState(null);

  function openCustomDM() {
    window.open(`https://ig.me/m/${INSTAGRAM_USER}`, "_blank");
  }

  if (loading) {
    return (
      <div className="relative min-h-screen bg-background">
        <Navbar />
        <div className="flex h-[80vh] items-center justify-center text-sm text-muted-foreground">
          Loading product...
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="relative min-h-screen bg-background">
        <Navbar />
        <div className="flex h-[80vh] flex-col items-center justify-center gap-4">
          <p className="text-sm text-muted-foreground">Product not found.</p>
          <Link
            to="/shop"
            className="text-xs uppercase tracking-[0.18em] underline underline-offset-4"
          >
            Back to shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-400 px-6 pt-32 pb-20 md:px-10">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span className="mx-2">/</span>
          {product.category_name && (
            <>
              <span>{product.category_name}</span>
              <span className="mx-2">/</span>
            </>
          )}
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          {/* Product images */}
          <section className="flex-1 space-y-3">
            {product.images && product.images.length > 0 ? (
              product.images.map((img, i) => (
                <div
                  key={i}
                  className="relative w-full overflow-hidden bg-muted"
                >
                  <img
                    src={resolveImageUrl(img)}
                    alt={`${product.name} view ${i + 1}`}
                    width={1600}
                    height={1800}
                    loading={i === 0 ? "eager" : "lazy"}
                    className="h-auto w-full object-cover"
                  />
                </div>
              ))
            ) : (
              <div className="relative w-full overflow-hidden bg-muted">
                <img
                  src={resolveImageUrl(product.image_url)}
                  alt={product.name}
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
              {product.category_name && (
                <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {product.category_name}
                </span>
              )}

              <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground">
                {product.name}
              </h1>

              {product.description && (
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  {product.description}
                </p>
              )}

              {/* ── Primary: Order Now ── */}
              <button
                onClick={() => navigate(`/shop/${product.id}/order`)}
                className="mt-6 flex w-full items-center justify-center bg-black text-white py-4 text-xs font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-90 border border-gray-400"
              >
                Order Now
              </button>

              {/* ── Secondary: Custom order ── */}
              <button
                onClick={openCustomDM}
                className="mt-3 flex w-full items-center justify-center gap-2 border border-border py-3 text-xs text-muted-foreground transition-colors hover:text-foreground"
              >
                Want a custom arrangement?
                <span className="underline underline-offset-4">
                  Chat with us →
                </span>
              </button>

              {/* Accordion */}
              <div className="mt-12 border-t border-gray-400">
                {sections.map((s) => {
                  const isOpen = open === s.title;
                  return (
                    <div key={s.title} className="border-b border-gray-400">
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? null : s.title)}
                        className="flex w-full items-center justify-between py-4 text-left text-sm font-medium text-foreground"
                      >
                        {s.title}
                        <ChevronDown
                          className={`h-4 w-4 text-muted-foreground transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                      {isOpen && (
                        <p className="pb-5 text-sm leading-relaxed text-muted-foreground">
                          {s.body}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
