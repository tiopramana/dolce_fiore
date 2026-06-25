import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronDown, Copy, Check } from "lucide-react";
import { Navbar } from "../components/layout/Navbar";
import { useProduct } from "../hooks/useProduct";
import { resolveImageUrl } from "../services/api";

const INSTAGRAM_USER = "dolcee_fioree";

const DELIVERY_OPTIONS = [
  "Self-pickup (Yuhua Village Market)",
  "Self-pickup (Jurong East MRT)",
  "Delivery via Lalamove",
];

export function OrderPage() {
  const { id } = useParams();
  const { product, loading, error } = useProduct(id);

  const [form, setForm] = useState({
    name: "",
    date: "",
    delivery: "",
    notes: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [formError, setFormError] = useState("");

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function validate() {
    if (!form.name.trim()) return "Please enter your name.";
    if (!form.date) return "Please select a preferred date.";
    if (!form.delivery) return "Please select a delivery option.";
    return "";
  }

  function generateMessage() {
    return [
      `Hi Dolce Fiore! I'd like to place an order 🌸`,
      ``,
      `🌷 Product  : ${product.name}`,
      `📂 Category : ${product.category_name}`,
      `👤 Name     : ${form.name}`,
      `📅 Date     : ${form.date}`,
      `🚗 Delivery : ${form.delivery}`,
      form.notes.trim() ? `📝 Notes    : ${form.notes}` : null,
      ``,
      `Please confirm availability, thank you!`,
    ]
      .filter((line) => line !== null)
      .join("\n");
  }

  function handleSubmit() {
    const err = validate();
    if (err) {
      setFormError(err);
      return;
    }
    setFormError("");
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(generateMessage());
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      const el = document.getElementById("order-message");
      el.select();
      document.execCommand("copy");
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }

  function openInstagram() {
    window.open(`https://ig.me/m/${INSTAGRAM_USER}`, "_blank");
  }

  if (loading) {
    return (
      <div className="relative min-h-screen bg-background">
        <Navbar />
        <div className="flex h-[80vh] items-center justify-center text-sm text-muted-foreground">
          Loading...
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
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/shop" className="hover:text-foreground">
            Shop
          </Link>
          <span className="mx-2">/</span>
          <Link to={`/shop/${product.id}`} className="hover:text-foreground">
            {product.name}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Order</span>
        </nav>

        <div className="flex flex-col gap-12 md:flex-row md:gap-16">
          {/* Left — product summary */}
          <aside className="md:w-72 md:shrink-0">
            <div className="md:sticky md:top-28">
              <p className="mb-4 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                You are ordering
              </p>
              <div className="overflow-hidden border border-border">
                <img
                  src={resolveImageUrl(product.image_url)}
                  alt={product.name}
                  className="h-full w-full object-cover"
                />
                <div className="p-4">
                  {product.category_name && (
                    <span className="text-xs uppercase tracking-[0.15em] text-muted-foreground">
                      {product.category_name}
                    </span>
                  )}
                  <h2 className="mt-1 text-lg font-semibold text-foreground">
                    {product.name}
                  </h2>
                  {product.description && (
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground line-clamp-3">
                      {product.description}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </aside>

          {/* Right — form or result */}
          <section className="flex-1">
            {/* ── STEP 2: Copy message ── */}
            {submitted ? (
              <div>
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-xl">🌸</span>
                  <h1 className="text-2xl font-semibold text-foreground">
                    Your order is ready!
                  </h1>
                </div>
                <p className="mb-8 text-sm text-muted-foreground">
                  Copy the message below, then paste it into our Instagram DM.
                </p>

                {/* Steps guide */}
                <div className="mb-6 flex flex-col gap-3">
                  {[
                    "Copy the message below",
                    "Open our Instagram DM",
                    "Paste and send — we'll confirm shortly!",
                  ].map((step, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-border text-xs text-muted-foreground">
                        {i + 1}
                      </span>
                      <p className="text-sm text-foreground">{step}</p>
                    </div>
                  ))}
                </div>

                {/* Generated message box */}
                <div className="relative">
                  <textarea
                    id="order-message"
                    readOnly
                    rows={14}
                    value={generateMessage()}
                    className="w-full resize-none border border-border bg-transparent px-4 py-4 font-mono text-sm text-foreground focus:outline-none"
                  />
                  <button
                    onClick={handleCopy}
                    className="absolute right-3 top-3 flex items-center gap-1.5 border border-border bg-white px-3 py-1.5 text-xs text-foreground transition-colors hover:bg-black hover:text-white"
                  >
                    {copied ? (
                      <>
                        <Check className="h-3.5 w-3.5" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-3.5 w-3.5" /> Copy
                      </>
                    )}
                  </button>
                </div>

                {/* Open Instagram */}
                <button
                  onClick={openInstagram}
                  className="mt-4 w-full bg-black text-white py-4 text-xs font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-80"
                >
                  Open Instagram DM →
                </button>

                {/* Edit button */}
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({
                      name: "",
                      date: "",
                      delivery: "",
                      notes: "",
                    });
                  }}
                  className="mt-3 w-full border border-border py-3 text-xs uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  Edit order details
                </button>
              </div>
            ) : (
              /* ── STEP 1: Form ── */
              <div>
                <h1 className="text-3xl font-semibold tracking-tight text-foreground mb-8">
                  Order Details
                </h1>

                <div className="space-y-6">
                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Full Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="e.g. Sarah Tan"
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Preferred Collection / Delivery Date{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={form.date}
                      onChange={handleChange}
                      min={
                        new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)
                          .toISOString()
                          .split("T")[0]
                      }
                      className="w-full border border-border bg-transparent px-4 py-3 text-sm text-foreground focus:border-foreground/40 focus:outline-none"
                    />
                    <p className="mt-1 text-xs text-muted-foreground">
                      Please order at least 2–5 days in advance.
                    </p>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Delivery / Pickup Option{" "}
                      <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <select
                        name="delivery"
                        value={form.delivery}
                        onChange={handleChange}
                        className="w-full appearance-none border border-border bg-transparent px-4 py-3 text-sm text-foreground focus:border-foreground/40 focus:outline-none"
                      >
                        <option value="" disabled>
                          Select an option...
                        </option>
                        {DELIVERY_OPTIONS.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    </div>
                  </div>

                  <div>
                    <label className="mb-2 block text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Additional Notes
                      <span className="ml-2 normal-case tracking-normal text-muted-foreground/60">
                        (optional)
                      </span>
                    </label>
                    <textarea
                      name="notes"
                      value={form.notes}
                      onChange={handleChange}
                      rows={4}
                      placeholder="e.g. preferred colours, occasion, card message..."
                      className="w-full resize-none border border-border bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-foreground/40 focus:outline-none"
                    />
                  </div>

                  {formError && (
                    <p className="text-sm text-red-400">{formError}</p>
                  )}

                  <button
                    onClick={handleSubmit}
                    className="w-full bg-black text-white py-4 text-xs font-medium uppercase tracking-[0.18em] transition-opacity hover:opacity-80"
                  >
                    Generate Order Message
                  </button>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default OrderPage;
