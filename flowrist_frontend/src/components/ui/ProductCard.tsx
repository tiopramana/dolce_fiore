import { useState } from "react";

interface ProductCardProps {
  name: string;
  price: string;
  image: string;
  hoverImage: string;
}

export function ProductCard({
  name,
  price,
  image,
  hoverImage,
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href="#shop"
      className="group relative"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="relative aspect-4/5 w-full overflow-hidden bg-muted">
        <img
          src={image}
          alt={name}
          width={800}
          height={1000}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
            hovered ? "opacity-0 brightness-100" : "opacity-100 brightness-90"
          }`}
        />
        <img
          src={hoverImage}
          alt={`${name} alternate view`}
          width={800}
          height={1000}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-out ${
            hovered ? "opacity-100 brightness-100" : "opacity-0 brightness-75"
          }`}
        />
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/60 to-transparent transition-opacity duration-700 ${
            hovered ? "opacity-60" : "opacity-100"
          }`}
        />
      </div>
      <div className="mt-2">
        <h3 className="text-[16px] font-normal tracking-tight text-foreground">
          {name}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground text-slate-500">
          {price}
        </p>
      </div>
    </a>
  );
}
