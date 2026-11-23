import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, ArrowUpRight, X, MapPin } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { brands, categoryLabel, type Brand } from "@/data";
import { BrandLogo } from "./BrandLogo";

type Props = {
  brand: Brand | null;
  onOpenChange: (open: boolean) => void;
  onSelect: (id: string) => void;
};

export function BrandSheet({ brand, onOpenChange, onSelect }: Props) {
  const idx = brand ? brands.findIndex((b) => b.id === brand.id) : -1;
  const prev = idx >= 0 ? brands[(idx - 1 + brands.length) % brands.length] : null;
  const next = idx >= 0 ? brands[(idx + 1) % brands.length] : null;
  const primary = brand?.categories[0];
  const related = brand
    ? brands.filter((b) => primary && b.categories.includes(primary) && b.id !== brand.id).slice(0, 3)
    : [];

  return (
    <Dialog.Root open={!!brand} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="sheet-overlay" />
        <Dialog.Content className="sheet-panel" aria-describedby={undefined}>
          {brand && (
            <AnimatePresence mode="wait">
              <motion.div
                key={brand.id}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="flex min-h-full flex-col"
              >
                <div
                  className="relative flex h-72 shrink-0 items-center justify-center overflow-hidden"
                  style={{ background: `color-mix(in srgb, ${brand.color} 22%, var(--surface))` }}
                >
                  <div
                    className="absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-60 blur-2xl"
                    style={{ background: brand.color }}
                  />
                  <motion.div
                    initial={{ y: 30, scale: 0.92, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                    className="relative grid h-40 w-64 place-items-center rounded-2xl bg-white p-6 shadow-xl"
                  >
                    <BrandLogo brand={brand} height={110} className="on-white" />
                  </motion.div>
                  <Dialog.Close className="icon-btn absolute right-4 top-4" aria-label="Close">
                    <X size={18} weight="bold" />
                  </Dialog.Close>
                </div>

                <div className="flex flex-1 flex-col gap-8 p-6 sm:p-8">
                  <div className="flex flex-col gap-3">
                    <Dialog.Title className="font-display text-3xl font-extrabold tracking-tight">
                      {brand.name}
                    </Dialog.Title>
                    <div className="flex flex-wrap gap-2">
                      {brand.categories.map((c) => (
                        <span key={c} className="chip">{categoryLabel(c)}</span>
                      ))}
                    </div>
                  </div>

                  <p className="flex max-w-[60ch] items-start gap-3 rounded-2xl bg-[var(--sunken)] p-4 text-sm leading-relaxed text-[var(--muted)]">
                    <MapPin size={20} className="mt-0.5 shrink-0 text-[var(--accent)]" />
                    Flavours and pack sizes vary by country. Contact your local ECCBC team to check what is available in your market.
                  </p>

                  <a href="#contact" onClick={() => onOpenChange(false)} className="btn btn-primary w-fit">
                    Order {brand.name} <ArrowUpRight size={16} weight="bold" />
                  </a>

                  {related.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h3 className="font-display text-sm font-bold">More in {primary && categoryLabel(primary)}</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {related.map((r) => (
                          <button
                            key={r.id}
                            onClick={() => onSelect(r.id)}
                            className="related-tile"
                            style={{ background: `color-mix(in srgb, ${r.color} 14%, var(--surface))` }}
                          >
                            <span className="grid h-14 w-full place-items-center rounded-xl bg-white p-2"><BrandLogo brand={r} height={40} className="on-white" /></span>
                            <span className="text-xs font-semibold leading-tight">{r.name}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="mt-auto flex items-center justify-between gap-3 border-t border-[var(--line)] pt-6">
                    {prev && (
                      <button onClick={() => onSelect(prev.id)} className="pager">
                        <ArrowLeft size={16} weight="bold" />
                        <span className="truncate">{prev.name}</span>
                      </button>
                    )}
                    {next && (
                      <button onClick={() => onSelect(next.id)} className="pager justify-end text-right">
                        <span className="truncate">{next.name}</span>
                        <ArrowRight size={16} weight="bold" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
