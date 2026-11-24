import { useEffect } from "react";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight, MapPin, Package, Tag, Globe } from "@phosphor-icons/react";
import { brands, byId, categoryLabel, heroImage, type Brand } from "@/data";
import { BrandLogo } from "@/components/BrandLogo";
import { brandHref } from "@/router";

const ease = [0.16, 1, 0.3, 1] as const;

type Picture = { src: string; caption: string; kind: "pack" | "logo"; mono?: boolean };

function pictures(b: Brand): Picture[] {
  const out: Picture[] = [];
  if (b.pack) out.push({ src: b.pack, caption: `${b.name} range`, kind: "pack" });
  if (b.shot) out.push({ src: b.shot, caption: `${b.name} pack`, kind: "pack" });
  if (b.colourLogo) out.push({ src: b.colourLogo, caption: "Brand logo", kind: "logo" });
  out.push({ src: b.logo, caption: b.colourLogo ? "Logo, one colour" : "Brand logo", kind: "logo", mono: true });
  return out;
}

export function BrandPage({ id }: { id: string }) {
  const b = byId[id];
  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (b) document.title = `${b.name} | ECCBC Brand Portfolio`;
    return () => {
      document.title = "ECCBC Brand Portfolio";
    };
  }, [b]);

  if (!b) {
    return (
      <main className="mx-auto flex min-h-[60vh] max-w-[1320px] flex-col items-start justify-center gap-4 px-4 sm:px-6 lg:px-10">
        <h1 className="font-display text-4xl font-extrabold">Brand not found</h1>
        <a href="#brands" className="btn btn-primary">Back to all brands</a>
      </main>
    );
  }

  const idx = brands.findIndex((x) => x.id === b.id);
  const prev = brands[(idx - 1 + brands.length) % brands.length];
  const next = brands[(idx + 1) % brands.length];
  const main = heroImage(b);
  const pics = pictures(b);
  const related = brands.filter((x) => x.id !== b.id && x.categories.some((c) => b.categories.includes(c))).slice(0, 4);
  const fallback = `${b.name} is part of the ECCBC portfolio in ${b.categories.map((c) => categoryLabel(c).toLowerCase()).join(" and ")}, produced and distributed by ECCBC in its markets.`;
  // Hero shows the first sentence; the story section shows the full text.
  const lead = b.story ? (b.story[0].match(/^.*?[.!?](\s|$)/)?.[0] ?? b.story[0]).trim() : fallback;
  const story = b.story ?? [];

  return (
    <main style={{ "--tint": b.color } as React.CSSProperties}>
      {/* Hero */}
      <section className="brand-hero">
        <div className="brand-hero-bg" aria-hidden />
        <div className="relative mx-auto grid max-w-[1320px] grid-cols-1 items-center gap-10 px-4 pb-16 pt-6 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:gap-16 lg:px-10 lg:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 90, damping: 16 }}
            className="brand-stage"
          >
            <div className="brand-stage-glow" aria-hidden />
            {main ? (
              <img src={main} alt={`${b.name} products`} className="brand-stage-img" />
            ) : (
              <div className="brand-stage-logo">
                <BrandLogo brand={b} height={150} className="on-white" />
              </div>
            )}
          </motion.div>
          <div className="flex flex-col gap-6">
            <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <a href="#brands" className="inline-flex items-center gap-1 font-semibold hover:text-[var(--text)]">
                <ArrowLeft size={14} weight="bold" /> Our products
              </a>
              <span>/</span>
              <span className="text-[var(--text)]">{b.name}</span>
            </nav>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease }} className="brand-logo-card">
              <BrandLogo brand={b} height={64} colour className="on-white" />
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05, ease }}
              className="font-display text-5xl font-extrabold leading-[1] tracking-tight sm:text-7xl"
            >
              {b.name}
            </motion.h1>
            <div className="flex flex-wrap gap-2">
              {b.categories.map((c) => (
                <a key={c} href="#brands" className="chip">{categoryLabel(c)}</a>
              ))}
            </div>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }} className="max-w-[52ch] text-lg leading-relaxed text-[var(--muted)]">
              {lead}
            </motion.p>
            <div className="flex flex-wrap gap-3">
              <a href="#contact" className="btn btn-primary btn-lg">
                Contact us <ArrowUpRight size={18} weight="bold" />
              </a>
              <a href="#pictures" onClick={(e) => { e.preventDefault(); document.getElementById("pictures")?.scrollIntoView({ behavior: "smooth" }); }} className="btn btn-ghost btn-lg">
                See pictures
              </a>
            </div>
          </div>

        </div>
      </section>

      {/* Story */}
      <section className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_1.3fr] lg:px-10 lg:py-24">
        <div className="flex flex-col gap-3">
          <p className="eyebrow">About the brand</p>
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{b.story ? `Introducing ${b.name}` : `${b.name} at a glance`}</h2>
        </div>
        <div className="flex flex-col gap-5">
          {story.map((p) => (
            <motion.p
              key={p.slice(0, 30)}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6, ease }}
              className="text-lg leading-relaxed"
            >
              {p}
            </motion.p>
          ))}
          {b.story && <p className="text-xs text-[var(--muted)]">Source: The Coca-Cola Company</p>}
          <dl className={`${story.length ? "mt-4" : ""} grid grid-cols-1 gap-3 sm:grid-cols-3`}>
            <Fact icon={Tag} label="Category" value={b.categories.map(categoryLabel).join(", ")} />
            <Fact icon={Globe} label="Portfolio" value={b.story ? "Global Coca-Cola brand" : "ECCBC portfolio"} />
            <Fact icon={Package} label="Packs" value="Vary by country" />
          </dl>
        </div>
      </section>

      {/* Pictures */}
      <section id="pictures" className="scroll-mt-20 bg-[var(--sunken)] py-16 lg:py-24">
        <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
          <h2 className="mb-8 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{b.name} in pictures</h2>
          <div className={`gallery gallery-${Math.min(pics.length, 4)}`}>
            {pics.map((p, i) => (
              <motion.figure
                key={p.src}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, delay: i * 0.07, ease }}
                className={`gallery-item ${p.kind === "pack" ? "is-pack" : "is-logo"} ${i === 0 && p.kind === "pack" ? "is-lead" : ""}`}
              >
                <div className="gallery-frame">
                  <img src={p.src} alt={p.caption} className={p.mono ? "is-mono" : ""} />
                </div>
                <figcaption>{p.caption}</figcaption>
              </motion.figure>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-sm text-[var(--muted)]">
            <MapPin size={18} className="mt-0.5 shrink-0 text-[var(--accent)]" />
            Flavours and pack sizes vary by country. Contact your local ECCBC team to check what is available in your market.
          </p>
        </div>
      </section>

      {/* Related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1320px] px-4 py-16 sm:px-6 lg:px-10 lg:py-24">
          <h2 className="mb-8 font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            More in {categoryLabel(b.categories[0])}
          </h2>
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {related.map((r) => (
              <a key={r.id} href={brandHref(r.id)} className="related-card" style={{ "--tint": r.color } as React.CSSProperties}>
                <div className="related-card-stage">
                  {heroImage(r) ? <img src={heroImage(r)} alt="" /> : <BrandLogo brand={r} height={56} />}
                </div>
                <span className="flex items-center justify-between gap-2 p-4 font-display font-bold">
                  {r.name} <ArrowRight size={16} weight="bold" />
                </span>
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Prev / next */}
      <nav className="border-t border-[var(--line)]" aria-label="Other brands">
        <div className="mx-auto grid max-w-[1320px] grid-cols-2 px-4 sm:px-6 lg:px-10">
          <a href={brandHref(prev.id)} className="brand-pager">
            <span className="text-sm text-[var(--muted)]"><ArrowLeft size={14} weight="bold" className="inline" /> Previous</span>
            <span className="font-display text-xl font-extrabold sm:text-3xl">{prev.name}</span>
          </a>
          <a href={brandHref(next.id)} className="brand-pager items-end text-right">
            <span className="text-sm text-[var(--muted)]">Next <ArrowRight size={14} weight="bold" className="inline" /></span>
            <span className="font-display text-xl font-extrabold sm:text-3xl">{next.name}</span>
          </a>
        </div>
      </nav>
    </main>
  );
}

function Fact({ icon: Icon, label, value }: { icon: typeof Tag; label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4">
      <dt className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[var(--muted)]">
        <Icon size={14} weight="bold" className="text-[var(--accent)]" /> {label}
      </dt>
      <dd className="font-display font-bold">{value}</dd>
    </div>
  );
}
