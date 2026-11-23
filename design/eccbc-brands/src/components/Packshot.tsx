import type { Brand } from "@/data";

// Stylised packshot slot. Stands in for real product photography:
// swap for transparent PNG packshots from the brand asset library.
type Props = { brand: Brand; size?: number; className?: string };

export function Packshot({ brand, size = 72, className = "" }: Props) {
  const label = (
    <span
      className="pack-label"
      style={{ color: brand.ink, fontSize: size * 0.19 }}
    >
      {brand.name.replace(" Zero Sugar", "").replace(" Energy", "")}
    </span>
  );

  if (brand.pack === "can") {
    return (
      <div
        className={`pack-can ${className}`}
        style={{ width: size, height: size * 1.85, background: brand.color }}
        role="img"
        aria-label={`${brand.name} can`}
      >
        <div className="pack-can-rim" />
        {label}
        <div className="pack-shine" />
      </div>
    );
  }

  return (
    <div
      className={`pack-bottle ${className}`}
      style={{ width: size, height: size * 2.6 }}
      role="img"
      aria-label={`${brand.name} bottle`}
    >
      <div className="pack-cap" style={{ background: brand.ink }} />
      <div className="pack-neck" style={{ background: brand.color }} />
      <div className="pack-body" style={{ background: brand.color }}>
        {label}
        <div className="pack-shine" />
      </div>
    </div>
  );
}
