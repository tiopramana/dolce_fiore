import { ArrowRight, Star } from "lucide-react";

export function CtaBanner() {
  return (
    <section className="relative mx-auto w-full h-full max-w-400 overflow-hidden bg-[#ffffff] px-6 py-20 md:py-20 shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
      {/* diagonal light/shadow overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(115deg, transparent 0%, transparent 55%, rgba(0,0,0,0) 55%, rgba(0,0,0,0) 100%)",
        }}
      />

      {/* product images bottom-left */}
      <div className="pointer-events-none absolute -bottom-6 left-0 hidden h-48 w-1/2 md:block"></div>

      {/* center content */}
      <div className="relative z-10 mx-auto max-w-2xl text-center">
        <h2 className="font-serif text-3xl leading-tight md:text-4xl lg:text-5xl">
          The Perfect Product Is Just A
          <br />
          <span className="text-muted-foreground">Click Away</span>
        </h2>

        <div className="mt-6 flex items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-medium text-foreground md:text-sm">
              230 Happy customers
            </span>
          </div>
        </div>

        <button className="mt-6 inline-flex items-center gap-2  bg-foreground px-6 py-2.5 text-sm font-medium text-background transition-transform hover:scale-105 outline">
          Store
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}
