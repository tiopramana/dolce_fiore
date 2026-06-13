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
            Creating handcrafted flowers that last beyond the moment.{" "}
          </h1>
          <p className="mt-5 text-sm text-muted-foreground md:text-base">
            At Dolce Fiore, we believe every bouquet should tell a story.
            Through carefully crafted crochet and wire flowers, we create
            timeless gifts that celebrate life's special moments and become
            cherished memories for years to come.
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
                  Dolce Fiore began as a simple hobby and a way to spend time
                  creatively at home. What started with a few handmade crochet
                  flowers soon grew into a passion for creating meaningful gifts
                  that bring joy to others. Today, every bouquet is carefully
                  handcrafted with love, turning yarn and wire into timeless
                  blooms that celebrate life's special moments.
                </p>
              </div>
              <div className="mt-12 grid grid-cols-3 gap-6 border-t border-border pt-8">
                <div>
                  <p className="text-3xl font-semibold tracking-tight text-foreground">
                    50+
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Bouquets handcrafted
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-semibold tracking-tight text-foreground">
                    20+
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Happy customers
                  </p>
                </div>

                <div>
                  <p className="text-3xl font-semibold tracking-tight text-foreground">
                    100%
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    Handmade creations
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
            <p className="text-base leading-relaxed text-foreground">
              Our bouquets are handcrafted using high-quality crochet yarn and
              flexible floral wire, carefully selected for their durability and
              beauty. Each flower is shaped by hand, allowing us to create
              elegant blooms that maintain their form and can be treasured for
              years to come.
            </p>
          </div>

          {/* Sustainability card */}
          <div className="bg-secondary p-8 md:p-10 outline">
            <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Sustainability
            </p>
            <p className="text-base leading-relaxed text-foreground">
              Unlike fresh flowers that fade within days, our handcrafted
              crochet bouquets are designed to last. By creating reusable floral
              keepsakes, we offer a meaningful and long-lasting alternative that
              can be enjoyed long after the special occasion has passed.
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
