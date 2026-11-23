import type { Brand } from "@/data";

// Brand logo. By default the single-colour SVG from eccbc.com (inverted in dark mode).
// With `colour`, uses the full-colour logo from The Coca-Cola Company when the brand has one.
type Props = { brand: Brand; height?: number; className?: string; colour?: boolean };

export function BrandLogo({ brand, height = 56, className = "", colour = false }: Props) {
  const useColour = colour && !!brand.colourLogo;
  return (
    <img
      src={useColour ? brand.colourLogo : brand.logo}
      alt={`${brand.name} logo`}
      className={`brand-logo ${useColour ? "is-colour" : ""} ${className}`}
      style={{ height, width: Math.round(height * 2.4) }}
      draggable={false}
    />
  );
}

// Transparent product shot (global brands only).
export function ProductShot({ brand, height = 200, className = "" }: { brand: Brand; height?: number; className?: string }) {
  if (!brand.shot) return null;
  return (
    <img
      src={brand.shot}
      alt={`${brand.name} pack`}
      className={`product-shot ${className}`}
      style={{ height, width: "auto" }}
      draggable={false}
    />
  );
}
