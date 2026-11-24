import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, MotionConfig, motion } from "motion/react";
import {
  ArrowRight,
  ArrowUpRight,
  Moon,
  Sun,
  List,
  X,
  Drop,
  Scales,
  ShieldCheck,
  Recycle,
} from "@phosphor-icons/react";
import { brands, byId, categories, globalBrands, heroImage, inCategory, intro, moments, type Brand, type CategoryId } from "@/data";
import { BrandLogo, ProductShot } from "@/components/BrandLogo";
import { ProductSlider } from "@/components/ProductSlider";
import { BrandPage } from "@/pages/BrandPage";
import { brandHref, useRoute } from "@/router";
import eccbcLogo from "@/assets/eccbc_logo.png";
import eccbcLogoAlt from "@/assets/eccbc_logo_alt.png";

const ease = [0.16, 1, 0.3, 1] as const;

function useTheme() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    try {
      const saved = localStorage.getItem("eccbc-theme");
      if (saved === "light" || saved === "dark") return saved;
    } catch {
      /* storage blocked */
    }
    return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("eccbc-theme", theme);
    } catch {
      /* storage blocked */
    }
  }, [theme]);
  return [theme, setTheme] as const;
}

function EccbcLogo({ size }: { size: number }) {
  return (
    <>
      <img src={eccbcLogo} alt="Equatorial Coca-Cola Bottling Company" className="eccbc-logo is-light" style={{ height: size, width: "auto" }} />
      <img src={eccbcLogoAlt} alt="" aria-hidden className="eccbc-logo is-dark" style={{ height: size, width: "auto" }} />
    </>
  );
}

const navLinks = ["About us", "Our products", "Sustainability", "Careers", "News"];

function Nav({ theme, onToggle }: { theme: string; onToggle: () => void }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="nav">
      <div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10">
        <a href="#" className="flex items-center gap-2" aria-label="ECCBC home">
          <EccbcLogo size={48} />
        </a>
        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
          {navLinks.map((l) => (
            <a key={l} href={l === "Our products" ? "#brands" : "#"} className={`nav-link ${l === "Our products" ? "is-active" : ""}`}>
              {l}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button className="icon-btn" onClick={onToggle} aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}>
            {theme === "dark" ? <Sun size={18} weight="bold" /> : <Moon size={18} weight="bold" />}
          </button>
          <a href="#contact" className="btn btn-primary hidden sm:inline-flex">
            Contact us
          </a>
          <button className="icon-btn lg:hidden" onClick={() => setOpen((o) => !o)} aria-label="Menu" aria-expanded={open}>
            {open ? <X size={18} weight="bold" /> : <List size={18} weight="bold" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-[var(--line)] lg:hidden"
            aria-label="Mobile"
          >
            <div className="flex flex-col px-4 py-3">
              {navLinks.map((l) => (
                <a key={l} href={l === "Our products" ? "#brands" : "#"} onClick={() => setOpen(false)} className="py-3 font-display font-semibold">
                  {l}
                </a>
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function BrandTile({ brand, big, onOpen }: { brand: Brand; big: boolean; onOpen: () => void }) {
  return (
    <motion.button
      layout
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.4, ease }}
      onClick={onOpen}
      className={`tile group ${big ? "tile-big" : ""}`}
      style={{ "--tint": brand.color } as React.CSSProperties}
    >
      <div className="tile-stage">
        <div className="tile-glow" />
        {heroImage(brand) ? (
          <>
            <span className="tile-logo-chip">
              <BrandLogo brand={brand} height={big ? 48 : 30} colour={!big} className={big ? "on-colour" : "on-white"} />
            </span>
            <div className="tile-shot">
              <img src={heroImage(brand)} alt={`${brand.name} products`} className="tile-img" style={{ height: big ? 340 : 170 }} draggable={false} />
            </div>
          </>
        ) : (
          <div className="tile-pack">
            <BrandLogo brand={brand} height={big ? 120 : 64} className={big ? "on-colour" : ""} />
          </div>
        )}
      </div>
      <div className="flex items-end justify-between gap-3 p-5 text-left">
        <div className="flex min-w-0 flex-col gap-1">
          <span className={`font-display font-extrabold tracking-tight ${big ? "text-3xl" : "text-lg"}`}>{brand.name}</span>
          <span className={`text-[var(--muted)] ${big ? "text-base" : "text-sm"}`}>{brand.categories.map((c) => categories.find((x) => x.id === c)?.label).join(" · ")}</span>
        </div>
        <span className={`tile-arrow ${big ? "" : "hidden sm:grid"}`} aria-hidden>
          <ArrowUpRight size={16} weight="bold" />
        </span>
      </div>
    </motion.button>
  );
}

function Portfolio({ onOpen }: { onOpen: (id: string) => void }) {
  const [active, setActive] = useState<CategoryId | "all">("all");
  const list = useMemo(() => (active === "all" ? brands : inCategory(active)), [active]);
  const cat = categories.find((c) => c.id === active);

  return (
    <section id="brands" className="scroll-mt-20 pb-24">
      <div className="filter-bar">
        <div className="mx-auto flex max-w-[1320px] items-center gap-2 overflow-x-auto px-4 py-3 sm:px-6 lg:px-10" role="tablist" aria-label="Filter by category">
          {[{ id: "all" as const, label: "All" }, ...categories].map((c) => (
            <button
              key={c.id}
              role="tab"
              aria-selected={active === c.id}
              onClick={() => setActive(c.id)}
              className={`pill ${active === c.id ? "is-active" : ""}`}
            >
              {active === c.id && <motion.span layoutId="pill-bg" className="pill-bg" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
              <span className="relative">{c.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-[1320px] px-4 pt-10 sm:px-6 lg:px-10">
        <div className="mb-8 flex flex-col gap-2">
          <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">
            {cat ? cat.label : "A growing family"}
          </h2>
          <p className="max-w-[60ch] text-[var(--muted)]">
            {cat ? `${list.length} ${list.length === 1 ? "brand" : "brands"} in ${cat.label.toLowerCase()}.` : `${brands.length} brands across soft drinks, juices, water, energy drinks, malt and beer. Select a brand to learn more.`}
          </p>
        </div>

        <LayoutGroup>
          <motion.div layout className="brand-grid">
            <AnimatePresence mode="popLayout">
              {list.map((b) => (
                <BrandTile key={b.id} brand={b} big={!!b.featured && (active === "all" || active === "soft-drinks")} onOpen={() => onOpen(b.id)} />
              ))}
              {active === "all" && (
                <motion.a
                  layout
                  key="customer-cta"
                  href="#contact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="tile-cta"
                >
                  <span className="font-display text-xl font-extrabold leading-tight tracking-tight sm:text-2xl">
                    Want our brands on your shelves?
                  </span>
                  <span className="max-w-[44ch] text-sm text-white/85 sm:text-base">
                    Retailers, restaurants and wholesalers can order directly from our local teams.
                  </span>
                  <span className="mt-auto inline-flex items-center gap-2 font-display text-sm font-bold">
                    Contact us <ArrowRight size={16} weight="bold" />
                  </span>
                </motion.a>
              )}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {list.length === 0 && (
          <div className="rounded-2xl border border-dashed border-[var(--line)] p-12 text-center text-[var(--muted)]">
            No brands in this category for your market yet.
            <button onClick={() => setActive("all")} className="ml-2 font-semibold text-[var(--accent)] underline-offset-4 hover:underline">
              Show all brands
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

function GlobalIcons({ onOpen }: { onOpen: (id: string) => void }) {
  const list = globalBrands();
  return (
    <section className="icons-band py-20 sm:py-24" aria-labelledby="icons-title">
      <div className="mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10">
        <Reveal className="mb-10 flex flex-col gap-3">
          <h2 id="icons-title" className="font-display text-3xl font-extrabold tracking-tight sm:text-5xl">
            World-famous brands, <span className="text-[var(--accent)]">bottled locally.</span>
          </h2>
          <p className="max-w-[60ch] text-[var(--muted)]">
            {list.length} of our brands are global brands of The Coca-Cola Company, produced and distributed by ECCBC in our markets.
          </p>
        </Reveal>
        <div className="icons-track" tabIndex={0} aria-label="Global brands">
          {list.map((b, i) => (
            <motion.button
              key={b.id}
              onClick={() => onOpen(b.id)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
              className="icon-card"
              style={{ "--tint": b.color } as React.CSSProperties}
            >
              <span className="logo-pill"><BrandLogo brand={b} height={36} colour className="on-white" /></span>
              {b.story && <p className="line-clamp-3 text-sm leading-relaxed text-[var(--muted)]">{b.story[0]}</p>}
              <div className="shot-wrap"><ProductShot brand={b} height={240} /></div>
              <span className="inline-flex items-center gap-2 font-display text-sm font-bold">
                Discover {b.name} <ArrowRight size={16} weight="bold" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>
    </section>
  );
}

function Moments({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <section className="mx-auto max-w-[1320px] px-4 pb-24 sm:px-6 lg:px-10">
      <Reveal className="mb-8 flex flex-col gap-2">
        <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">A drink for every moment</h2>
        <p className="max-w-[56ch] text-[var(--muted)]">Our portfolio is built around the moments of the day, not just the products on the shelf.</p>
      </Reveal>
      {/* Bento: 5 moments, 5 cells. Row 1: wide + narrow. Row 2: three equal. Mobile: one column. */}
      <div className="moments-bento">
        {moments.map((m, i) => {
          const packs = m.brandIds.map((id) => byId[id]).filter((x) => heroImage(x)).slice(0, i === 0 ? 3 : 2);
          return (
            <motion.article
              key={m.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.6, delay: i * 0.06, ease }}
              className={`moment-cell ${i === 0 ? "is-wide" : ""}`}
              style={{ "--tone": m.tone } as React.CSSProperties}
            >
              <div className="relative z-[1] flex flex-col gap-2">
                <h3 className="font-display text-2xl font-extrabold tracking-tight">{m.title}</h3>
                <p className="max-w-[36ch] text-white/80">{m.copy}</p>
              </div>
              <div className="moment-packs" aria-hidden>
                {packs.map((x) => (
                  <img key={x.id} src={heroImage(x)} alt="" draggable={false} />
                ))}
              </div>
              <div className="relative z-[1] flex flex-wrap gap-2">
                {m.brandIds.map((id) => (
                  <button key={id} onClick={() => onOpen(id)} className="moment-chip">
                    {byId[id].name}
                  </button>
                ))}
              </div>
            </motion.article>
          );
        })}
      </div>
    </section>
  );
}

const commitments = [
  { icon: Scales, title: "More choice, less sugar", copy: "Zero sugar and light versions sit next to our originals, with clear nutrition labels on every pack." },
  { icon: Drop, title: "Smaller packs", copy: "Single-serve and smaller sizes make it easier to enjoy the right amount." },
  { icon: ShieldCheck, title: "Responsible marketing", copy: "We do not market our drinks to children under 13, in line with Coca-Cola system policy." },
  { icon: Recycle, title: "Returnable glass", copy: "Refillable bottles remain a core pack in our markets, keeping packaging in use for longer." },
];

function Commitments() {
  return (
    <section id="commitments" className="scroll-mt-20 bg-[var(--sunken)] py-20 sm:py-28">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:px-10">
        <Reveal className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <p className="eyebrow">Our commitments</p>
          <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-5xl">
            Refreshment, <span className="text-[var(--accent)]">made responsibly.</span>
          </h2>
          <p className="max-w-[46ch] text-lg text-[var(--muted)]">How we shape the portfolio so consumers can make informed choices.</p>
        </Reveal>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {commitments.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.6, delay: i * 0.07, ease }}
              className={`commit ${i === 0 ? "sm:col-span-2 commit-lead" : ""} ${i === commitments.length - 1 ? "sm:col-span-2" : ""}`}
            >
              <c.icon size={i === 0 ? 34 : 26} weight="duotone" className="text-[var(--accent)]" />
              <h3 className={`font-display font-bold tracking-tight ${i === 0 ? "text-2xl" : "text-lg"}`}>{c.title}</h3>
              <p className="text-[var(--muted)]">{c.copy}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--line)]">
      <div className="mx-auto grid max-w-[1320px] grid-cols-1 gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr] lg:px-10">
        <div className="flex flex-col gap-4">
          <EccbcLogo size={72} />
          <p className="max-w-[40ch] text-sm text-[var(--muted)]">
            Equatorial Coca-Cola Bottling Company. {intro.market}
          </p>
          <a href="#" className="btn btn-primary w-fit">Contact us</a>
        </div>
        <FooterCol title="Company" links={["About us", "Our markets", "Leadership", "News"]} />
        <FooterCol title="Explore" links={["Our products", "Sustainability", "Careers", "Suppliers"]} />
      </div>
      <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-2 border-t border-[var(--line)] px-4 py-6 text-xs text-[var(--muted)] sm:flex-row sm:px-6 lg:px-10">
        <span>© 2026 ECCBC. All trademarks belong to their respective owners.</span>
        <span className="flex gap-4">
          <a href="#">Privacy</a>
          <a href="#">Cookies</a>
          <a href="#">Legal notice</a>
        </span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      <h3 className="font-display text-sm font-bold">{title}</h3>
      {links.map((l) => (
        <a key={l} href={l === "Our products" ? "#brands" : "#"} className="text-sm text-[var(--muted)] hover:text-[var(--text)]">
          {l}
        </a>
      ))}
    </div>
  );
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.7, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function App() {
  const [theme, setTheme] = useTheme();
  const route = useRoute();
  const open = (id: string) => {
    window.location.hash = brandHref(id);
  };

  // On the home page, scroll to the anchor in the hash (e.g. #brands) after render.
  useEffect(() => {
    if (route.name !== "home") return;
    if (!route.anchor) return;
    const t = setTimeout(() => document.getElementById(route.anchor!)?.scrollIntoView(), 30);
    return () => clearTimeout(t);
  }, [route]);

  return (
    <MotionConfig reducedMotion="user">
      <Nav theme={theme} onToggle={() => setTheme(theme === "dark" ? "light" : "dark")} />
      {route.name === "brand" ? (
        <BrandPage key={route.id} id={route.id} />
      ) : (
        <main>
          <ProductSlider />
          <Portfolio onOpen={open} />
          <GlobalIcons onOpen={open} />
          <Moments onOpen={open} />
          <Commitments />
        </main>
      )}
      <Footer />
    </MotionConfig>
  );
}
