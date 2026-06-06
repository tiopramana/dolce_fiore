import { Navbar } from "../components/layout/Navbar";
import studioImg from "../assets/col1.png";
import craftImg from "../assets/col2.png";
import { Footer } from "../components/layout/Footer";

const values = [
  {
    n: "01",
    title: "Quality first",
    body: "We prioritize well-crafted, durable products designed to bring value to your life.",
  },
  {
    n: "02",
    title: "Customer-centered",
    body: "Your satisfaction comes first, responsive support, and thoughtfully curated products.",
  },
  {
    n: "03",
    title: "Integrity & transparency",
    body: "We believe in honest communication, and delivering exactly what we promise.",
  },
  {
    n: "04",
    title: "Community focused",
    body: "We build connections by valuing our customers and giving back whenever possible.",
  },
];

export function AboutPage() {
  return (
    <div className="relative min-h-screen bg-background">
      <Navbar />

      <div className="mx-auto max-w-400 px-6 pt-40 md:px-10">
        {/* Heading */}
        <div className="mx-auto mb-20 max-w-2xl text-center">
          <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Our Mission
          </p>
          <h1 className="text-4xl font-semibold leading-tight tracking-tight text-foreground md:text-6xl">
            Clothing that fits the life you actually live.
          </h1>
          <p className="mt-5 text-sm text-muted-foreground md:text-base">
            Get to know who we are, what we stand for, and why we love what we
            do.
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Large story card */}
          <div className="group relative overflow-hidden bg-card p-8 md:col-span-2 md:p-12 border border-border">
            <div className="relative z-10 flex h-full flex-col justify-between">
              <div>
                <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
                  Our Story
                </p>
                <p className="max-w-xl text-lg leading-relaxed text-foreground md:text-xl">
                  Cartelle began with a simple conviction: everyday clothing
                  should feel as good as it looks. Founded in 2019, we set out
                  to build a wardrobe of quiet, considered pieces — silhouettes
                  that move with you, fabrics that soften with wear, and details
                  that reveal themselves over time.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-foreground">
                    6
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Years crafting essentials
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-foreground">
                    12
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Artisan partners worldwide
                  </p>
                </div>
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-foreground">
                    100%
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Traceable materials
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Studio image card */}
          <div className="relative aspect-square overflow-hidden bg-muted md:aspect-auto group">
            <img
              src={studioImg}
              alt="Cartelle studio interior"
              width={1024}
              height={768}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Craftsmanship image card */}
          <div className="relative aspect-square overflow-hidden bg-muted group">
            <img
              src={craftImg}
              alt="Hand stitching detail"
              width={1024}
              height={1024}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </div>

          {/* Materials card */}
          <div className="bg-card p-8 md:p-10 border border-border">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Materials
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              We source the finest organic cotton, merino wool, and
              vegetable-tanned leather. Every fabric is chosen for how it ages,
              drapes, and feels against the skin — because the best pieces get
              better with time.
            </p>
          </div>

          {/* Sustainability card */}
          <div className="bg-secondary p-8 md:p-10 outline">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Sustainability
            </p>
            <p className="text-sm leading-relaxed text-foreground">
              Small-batch production, fair labor standards, and plastic-free
              packaging dictate our model. We design collections that reduce
              seasonal textile waste.
            </p>
          </div>
        </div>

        {/* Company Core Values Grid */}
        <div className="mt-24 flex flex-col">
          <div className="border-t border-border" />
          <div className="grid flex-1 grid-cols-1 gap-x-10 gap-y-12 py-10 sm:grid-cols-2 md:py-14">
            {values.map((v) => (
              <div key={v.n}>
                <p className="mb-4 text-xs tracking-[0.2em] text-muted-foreground">
                  {v.n}
                </p>
                <h3 className="mb-3 text-lg font-semibold text-foreground">
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {v.body}
                </p>
              </div>
            ))}
          </div>
          <div className="border-t border-border" />
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default AboutPage;
