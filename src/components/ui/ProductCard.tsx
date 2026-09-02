import { useState } from "react";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
}

export function ProductCard({ name, price, image }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="group relative border border-gray-400/30 p-3 flex flex-col h-full justify-between"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-5/8 w-full overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          width={800}
          height={1000}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
            hovered ? "opacity-100 brightness-90" : "opacity-90 brightness-70"
          }`}
        />
      </div>
      <div className="mt-2 flex flex-col grow justify-between">
        <h3 className="text-[16px] font-normal tracking-tight text-foreground">
          {name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground text-slate-500 border-t border-t-slate-400/60 py-1">
          {price}
        </p>
      </div>
    </div>
  );
}
