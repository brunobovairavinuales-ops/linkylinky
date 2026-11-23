import type { Brand } from "@/data";

// Official brand logo from eccbc.com. Logos are single-colour (dark grey) SVGs;
// the .brand-logo class inverts them in dark mode.
type Props = { brand: Brand; height?: number; className?: string };

export function BrandLogo({ brand, height = 56, className = "" }: Props) {
  return (
    <img
      src={brand.logo}
      alt={`${brand.name} logo`}
      className={`brand-logo ${className}`}
      style={{ height, width: Math.round(height * 2.4) }}
      draggable={false}
    />
  );
}
