import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, X, Package, Leaf } from "@phosphor-icons/react";
import { motion, AnimatePresence } from "motion/react";
import { brands, categories, type Brand } from "@/data";
import { Packshot } from "./Packshot";

type Props = {
  brand: Brand | null;
  onOpenChange: (open: boolean) => void;
  onSelect: (id: string) => void;
};

export function BrandSheet({ brand, onOpenChange, onSelect }: Props) {
  const idx = brand ? brands.findIndex((b) => b.id === brand.id) : -1;
  const prev = idx >= 0 ? brands[(idx - 1 + brands.length) % brands.length] : null;
  const next = idx >= 0 ? brands[(idx + 1) % brands.length] : null;
  const category = brand ? categories.find((c) => c.id === brand.category) : null;
  const related = brand
    ? brands.filter((b) => b.category === brand.category && b.id !== brand.id).slice(0, 3)
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
                  className="relative flex h-72 shrink-0 items-end justify-center overflow-hidden pb-8"
                  style={{ background: `color-mix(in srgb, ${brand.color} 22%, var(--surface))` }}
                >
                  <div
                    className="absolute -bottom-24 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full opacity-60 blur-2xl"
                    style={{ background: brand.color }}
                  />
                  <motion.div
                    initial={{ y: 40, rotate: -6 }}
                    animate={{ y: 0, rotate: -4 }}
                    transition={{ type: "spring", stiffness: 120, damping: 16 }}
                    className="relative"
                  >
                    <Packshot brand={brand} size={brand.pack === "can" ? 96 : 80} />
                  </motion.div>
                  <Dialog.Close className="icon-btn absolute right-4 top-4" aria-label="Close">
                    <X size={18} weight="bold" />
                  </Dialog.Close>
                </div>

                <div className="flex flex-1 flex-col gap-8 p-6 sm:p-8">
                  <div className="flex flex-col gap-2">
                    <p className="text-sm font-semibold text-[var(--muted)]">{category?.label}</p>
                    <Dialog.Title className="font-display text-3xl font-extrabold tracking-tight">
                      {brand.name}
                    </Dialog.Title>
                    <p className="text-lg text-[var(--muted)]">{brand.tagline}</p>
                  </div>

                  <p className="max-w-[60ch] leading-relaxed">{brand.story}</p>

                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-sm font-bold">Flavours and variants</h3>
                    <div className="flex flex-wrap gap-2">
                      {brand.variants.map((v) => (
                        <span key={v} className="chip">
                          {v}
                        </span>
                      ))}
                      {brand.zeroSugar && (
                        <span className="chip chip-accent">
                          <Leaf size={14} weight="bold" /> No sugar
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-3">
                    <h3 className="font-display text-sm font-bold">Available packs</h3>
                    <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {brand.formats.map((f) => (
                        <li key={f} className="flex items-center gap-3 rounded-2xl bg-[var(--sunken)] px-4 py-3 text-sm">
                          <Package size={18} className="text-[var(--accent)]" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {related.length > 0 && (
                    <div className="flex flex-col gap-3">
                      <h3 className="font-display text-sm font-bold">More in {category?.label}</h3>
                      <div className="grid grid-cols-3 gap-3">
                        {related.map((r) => (
                          <button
                            key={r.id}
                            onClick={() => onSelect(r.id)}
                            className="related-tile"
                            style={{ background: `color-mix(in srgb, ${r.color} 14%, var(--surface))` }}
                          >
                            <Packshot brand={r} size={30} />
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
