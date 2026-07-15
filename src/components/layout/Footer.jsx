import Logo from "../../assets/favicon.jpg";
export function Footer() {
  return (
    <footer className="border py-12 px-4 sm:px-6 lg:px-8 mt-50 border-gray-300">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">
          <div className="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
            <a href="/">
              <div className="flex items-center">
                <img src={Logo} alt="" className="w-20 h-20" />
                <span className="px-6 text-xl">Dolce Fiore</span>
              </div>
            </a>
            <div className="w-full max-w-52 h-px mt-8 bg-linear-to-r from-black via-white/25 to-black"></div>
            <p className="text-sm /60 mt-6 max-w-sm leading-relaxed">
              As product is handcrafted and it might not be exactly the same.
              Keep in mind that our photos are styled and edited under various
              lighting conditions, so the actual color might look abit
              different.
            </p>
          </div>

          <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm font-medium">Important Links</h3>
            <div className="flex flex-col gap-2 mt-6">
              <a
                href="/home"
                className="text-sm /60 hover:text-black transition-colors"
              >
                Home
              </a>
              <a
                href="/about"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                About
              </a>
              <a
                href="/news"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                News
              </a>
              <a
                onClick={() =>
                  window.open("https://ig.me/m/dolcee_fioree", "_blank")
                }
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                Contact
              </a>
              <a
                href="#faq"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>

          <div className="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm text-black font-medium">Social Links</h3>
            <div className="flex flex-col gap-2 mt-6">
              <a
                href="https://www.instagram.com/dolcee_fioree/"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                Instagram
              </a>
              <a
                href="https://www.tiktok.com/@dolcee_fioree"
                className="text-sm text-black/60 hover:text-black transition-colors"
              >
                Tiktok
              </a>
            </div>
          </div>

          <div className="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-sm text-black font-medium">
              Subscribe for news
            </h3>
            <div className="flex items-center border gap-2 border-black/20 h-13 max-w-80 w-full rounded-full overflow-hidden mt-4">
              <input
                type="email"
                placeholder="Enter your email.."
                className="w-full h-full pl-6 outline-none text-sm bg-transparent text-black placeholder-black/60 placeholder:text-xs"
                required
              />
              <button
                type="submit"
                className="border active:scale-95 transition w-56 h-10 rounded-full text-sm text-black cursor-pointer mr-1.5"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="w-full h-px mt-16 mb-4 bg-linear-to-r from-black via-white/25 to-black"></div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-black/60">© 2026 Dolcefiore</p>
          <div className="flex items-center gap-6">
            <a
              href="#"
              className="text-xs text-black/60 hover:text-black transition-colors"
            >
              Terms & Conditions
            </a>
            <div className="w-px h-4 bg-white/20"></div>
            <a
              href="#"
              className="text-xs text-black/60 hover:text-black transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
