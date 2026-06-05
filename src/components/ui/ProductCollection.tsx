import { useState } from "react";

interface ProductCardProps {
  name: string;
  description?: string;
  image: string;
  hoverImage?: string;
  href?: string;
}

export function CardCollection({
  name,
  description,
  image,
  hoverImage,
  href = "#collection",
}: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <a
      href={href}
      className="group relative block w-full overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/6] w-full overflow-hidden">
        {/* Default image */}
        <img
          src={image}
          alt={name}
          className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out ${
            hovered && hoverImage
              ? "opacity-0 scale-105"
              : "opacity-100 scale-100"
          }`}
        />

        {/* Hover image */}
        {hoverImage && (
          <img
            src={hoverImage}
            alt={`${name} alternate view`}
            className={`absolute inset-0 h-full w-full object-cover transition-all duration-700 ease-in-out ${
              hovered ? "opacity-100 scale-105" : "opacity-0 scale-100"
            }`}
          />
        )}

        {/* Gradient overlay — always present, stronger on hover */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-80"
          }`}
        />

        {/* Text overlay at bottom of image */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3 className="text-[17px] font-medium text-white tracking-tight py-2">
            {name}
          </h3>
          <div
            className={`transition-transform duration-500 ease-out ${
              hovered ? "-translate-y-1" : "translate-y-0"
            }`}
          >
            {/* Description — hidden below, expands above name on hover */}
            {description && (
              <p
                className={`text-[13px] leading-snug text-white/75 overflow-hidden transition-all duration-500 ease-out ${
                  hovered
                    ? "max-h-30 opacity-100 mb-1.5"
                    : "max-h-0 opacity-0 mb-0"
                }`}
              >
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </a>
  );
}
