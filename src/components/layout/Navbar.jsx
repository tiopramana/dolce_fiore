import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, MessageCircle, X } from "lucide-react";
import { useCategories } from "../../hooks/useCategories";
import shopFeature from "../../assets/shopfeature.png";

const navItems = ["home", "shop", "about", "support", "blog"];

// Static shop quick links — always shown regardless of API
const shopQuickLinks = [
  { label: "All Products", slug: "" },
  { label: "Best Sellers", slug: "" },
  { label: "New Arrivals", slug: "" },
];

export function Navbar() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);
  const navigate = useNavigate();

  // Fetch categories from API
  const { categories } = useCategories();

  // Navigate to shop with category filter
  function goToCategory(slug) {
    setOpen(null);
    setMobile(false);
    if (slug) {
      navigate(`/shop?category=${slug}`);
    } else {
      navigate("/shop");
    }
  }

  return (
    <header
      className="fixed inset-x-0 top-0 z-20 bg-white shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="mx-auto flex max-w-400 items-center px-10 py-8">
        {/* Left — logo */}
        <div className="flex-1">
          <Link to="/" className="text-xl tracking-tight text-foreground">
            Dolce Fiore
          </Link>
        </div>

        {/* Center — nav links */}
        <nav className="hidden flex-1 justify-center md:flex items-center gap-10">
          {navItems.map((item) => (
            <button
              key={item}
              onMouseEnter={() =>
                item === "shop" ? setOpen("Shop") : setOpen(null)
              }
              onClick={() =>
                item === "shop"
                  ? setOpen("Shop")
                  : navigate(item === "home" ? "/" : `/${item}`)
              }
              className="text-[15px] text-foreground hover:underline underline-offset-8 capitalize cursor-pointer bg-transparent border-none"
            >
              {item}
            </button>
          ))}
        </nav>

        {/* Right — icons */}
        <div className="flex flex-1 justify-end items-center gap-4 tracking-tight">
          <button
            className="md:hidden"
            aria-label="Toggle menu"
            onClick={() => setMobile((m) => !m)}
          >
            {mobile ? (
              <X className="h-5 w-5" strokeWidth={1.5} />
            ) : (
              <Menu className="h-5 w-5" strokeWidth={1.5} />
            )}
          </button>

          <button
            aria-label="Instagram DM"
            className="text-foreground hover:text-foreground/70 cursor-pointer"
            onClick={() =>
              window.open("https://ig.me/m/dolcee_fioree", "_blank")
            }
          >
            <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* ── Desktop Dropdown ── */}
      <div
        className={`hidden md:block absolute left-1/2 top-18 -translate-x-1/2 transition-all duration-200 ${
          open === "Shop"
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "pointer-events-none opacity-0 -translate-y-2"
        }`}
        onMouseEnter={() => setOpen("Shop")}
      >
        <div className="flex w-190 gap-10 bg-white p-8 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          <img
            src={shopFeature}
            alt="Featured bouquet"
            width={180}
            height={260}
            loading="lazy"
            className="h-70 w-47.5 shrink-0 object-cover"
          />

          <div className="grid flex-1 grid-cols-2 gap-10 pt-3">
            {/* Shop quick links */}
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Shop
              </p>
              <ul className="space-y-4">
                {shopQuickLinks.map((l) => (
                  <li key={l.label}>
                    <button
                      onClick={() => goToCategory(l.slug)}
                      className="text-[16px] text-foreground hover:opacity-60 cursor-pointer bg-transparent border-none text-left"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Collections — from API */}
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Collections
              </p>
              <ul className="space-y-4">
                {categories.map((c) => (
                  <li key={c.id}>
                    <button
                      onClick={() => goToCategory(c.slug)}
                      className="text-[16px] text-foreground hover:opacity-60 cursor-pointer bg-transparent border-none text-left capitalize"
                    >
                      {c.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobile ? "max-h-screen opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t px-6 py-5">
          {/* Mobile nav items */}
          <nav className="flex flex-col gap-4">
            {navItems.map((item) => (
              <button
                key={item}
                onClick={() => {
                  setMobile(false);
                  navigate(item === "home" ? "/" : `/${item}`);
                }}
                className="text-left text-[15px] text-foreground capitalize bg-transparent border-none cursor-pointer"
              >
                {item}
              </button>
            ))}
          </nav>

          {/* Mobile collections — from API */}
          <div className="mt-6 border-t pt-6">
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              Collections
            </p>
            <div className="flex flex-col gap-3">
              {categories.map((c) => (
                <button
                  key={c.id}
                  onClick={() => goToCategory(c.slug)}
                  className="text-left text-sm text-foreground capitalize bg-transparent border-none cursor-pointer hover:opacity-60"
                >
                  {c.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
