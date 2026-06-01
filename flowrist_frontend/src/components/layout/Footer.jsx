export function Footer() {
  return (
    <footer class="border py-12 px-4 sm:px-6 lg:px-8 mt-50 border-gray-300">
      <div class="w-full max-w-7xl mx-auto">
        <div class="flex flex-wrap justify-between gap-y-12 lg:gap-x-8">
          <div class="w-full md:w-[45%] lg:w-[35%] flex flex-col items-center md:items-start text-center md:text-left">
            <a href="https://prebuiltui.com">
              <div className="flex items-center">
                <img src="../public/favicon.jpg" alt="" className="w-20 h-20" />
                <span className="px-6 text-xl">Dolce Fiore</span>
              </div>
            </a>
            <div class="w-full max-w-52 h-px mt-8 bg-linear-to-r from-black via-white/25 to-black"></div>
            <p class="text-sm /60 mt-6 max-w-sm leading-relaxed">
              As product is handcrafted and it might not be exactly the same.
              Keep in mind that our photos are styled and edited under various
              lighting conditions, so the actual color might look abit
              different.
            </p>
          </div>

          <div class="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 class="text-sm font-medium">Important Links</h3>
            <div class="flex flex-col gap-2 mt-6">
              <a
                href="#"
                class="text-sm /60 hover:text-black transition-colors"
              >
                Home
              </a>
              <a
                href="#"
                class="text-sm text-black/60 hover:text-black transition-colors"
              >
                About
              </a>
              <a
                href="#"
                class="text-sm text-black/60 hover:text-black transition-colors"
              >
                Portfolio
              </a>
              <a
                href="#"
                class="text-sm text-black/60 hover:text-black transition-colors"
              >
                Contact
              </a>
              <a
                href="#"
                class="text-sm text-black/60 hover:text-black transition-colors"
              >
                FAQ
              </a>
            </div>
          </div>

          <div class="w-full md:w-[45%] lg:w-[15%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 class="text-sm text-black font-medium">Social Links</h3>
            <div class="flex flex-col gap-2 mt-6">
              <a
                href="#"
                class="text-sm text-black/60 hover:text-black transition-colors"
              >
                Twitter
              </a>
              <a
                href="#"
                class="text-sm text-black/60 hover:text-black transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                class="text-sm text-black/60 hover:text-black transition-colors"
              >
                Youtube
              </a>
              <a
                href="#"
                class="text-sm text-black/60 hover:text-black transition-colors"
              >
                Linkedin
              </a>
            </div>
          </div>

          <div class="w-full md:w-[45%] lg:w-[25%] flex flex-col items-center md:items-start text-center md:text-left">
            <h3 class="text-sm text-black font-medium">Subscribe for news</h3>
            <div class="flex items-center border gap-2 border-black/20 h-13 max-w-80 w-full rounded-full overflow-hidden mt-4">
              <input
                type="email"
                placeholder="Enter your email.."
                class="w-full h-full pl-6 outline-none text-sm bg-transparent text-black placeholder-black/60 placeholder:text-xs"
                required
              />
              <button
                type="submit"
                class="border active:scale-95 transition w-56 h-10 rounded-full text-sm text-black cursor-pointer mr-1.5"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div class="w-full h-px mt-16 mb-4 bg-linear-to-r from-black via-white/25 to-black"></div>

        <div class="flex flex-col md:flex-row items-center justify-between gap-4">
          <p class="text-xs text-black/60">© 2026 tiopramana</p>
          <div class="flex items-center gap-6">
            <a
              href="#"
              class="text-xs text-black/60 hover:text-black transition-colors"
            >
              Terms & Conditions
            </a>
            <div class="w-px h-4 bg-white/20"></div>
            <a
              href="#"
              class="text-xs text-black/60 hover:text-black transition-colors"
            >
              Privacy Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
