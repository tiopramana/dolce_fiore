import { useState } from "react";
import { Menu, MessageCircle } from "lucide-react";
import shopFeature from "../../assets/shopfeature.png";

const navItems = ["home", "shop", "about", "support", "blog"];

const shopLinks = ["All", "Final Sale", "Best Sellers", "New Arrivals"];
const collectionLinks = [
  "Graduation",
  "Valentine",
  "Anniversary",
  "Mother Days",
];

export function Navbar() {
  const [open, setOpen] = useState(null);
  const [mobile, setMobile] = useState(false);

  return (
    <header
      className="fixed inset-x-0 top-0 z-20 bg-white shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]"
      onMouseLeave={() => setOpen(null)}
    >
      <div className="mx-auto flex max-w-400 items-center px-10 py-8">
        {/* Left */}
        <div className="flex-1">
          <a href="/" className="text-xl tracking-tight text-foreground">
            Dolce Fiore
          </a>
        </div>

        {/* Center */}
        <nav className="hidden flex-1 justify-center md:flex items-center gap-10">
          {navItems.map((item) => {
            const hasMenu = item === "Shop";

            return (
              <button
                key={item}
                onMouseEnter={() => setOpen(hasMenu ? item : null)}
                onFocus={() => setOpen(hasMenu ? item : null)}
                className="relative text-[15px] text-foreground hover:underline underline-offset-8 capitalize"
              >
                <a href={item}>{item}</a>
              </button>
            );
          })}
        </nav>

        {/* Right */}
        <div className="flex flex-1 justify-end items-center gap-4 tracking-tight">
          <button
            className="md:hidden"
            aria-label="Open menu"
            onClick={() => setMobile((m) => !m)}
          >
            <Menu className="h-5 w-5" strokeWidth={1.5} />
          </button>

          <button
            aria-label="Whatsapp"
            className="text-foreground hover:text-foreground/70"
          >
            <MessageCircle className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Dropdown panel */}
      <div
        className={`hidden md:block absolute left-1/2 top-18 -translate-x-1/2 transition-all duration-200 ${
          open === "Shop"
            ? "pointer-events-auto opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"
        }`}
      >
        <div className="flex w-190 gap-10 bg-white p-8 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
          <img
            src={shopFeature}
            alt="Featured silk blouse"
            width={180}
            height={260}
            loading="lazy"
            className="h-70 w-47.5 shrink-0 object-cover"
          />
          <div className="grid flex-1 grid-cols-2 gap-10 pt-3">
            <div>
              <p className="mb-5 text-xm uppercase tracking-[0.18em] text-muted-foreground">
                Shop
              </p>
              <ul className="space-y-4">
                {shopLinks.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[16px] text-foreground hover:opacity-60"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="mb-5 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Collections
              </p>
              <ul className="space-y-4">
                {collectionLinks.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-[16px] text-foreground hover:opacity-60"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobile ? "max-h-125 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t px-6 py-5">
          <nav className="flex flex-col gap-5 capitalize">
            {navItems.map((item) => (
              <a
                key={item}
                href={item}
                className="text-[15px] text-foreground"
                onClick={() => setMobile(false)}
              >
                {item}
              </a>
            ))}
          </nav>

          <div className="mt-6 border-t pt-6">
            <p className="mb-3 text-xs uppercase tracking-widest text-muted-foreground">
              Collections
            </p>

            <div className="flex flex-col gap-3">
              {collectionLinks.map((item) => (
                <a key={item} href="#" className="text-sm text-foreground">
                  {item}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
