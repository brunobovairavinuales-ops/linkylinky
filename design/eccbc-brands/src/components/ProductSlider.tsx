import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight, CaretLeft, CaretRight } from "@phosphor-icons/react";
import { categoryLabel, heroImage, withPictures } from "@/data";
import { brandHref } from "@/router";

// Product slider in the layout of the eccbc.com homepage: one product large in the
// centre on white, arrows on each side. Neighbouring products peek in at the edges.
const ease = [0.16, 1, 0.3, 1] as const;

export function ProductSlider() {
  const list = withPictures();
  const [[index, dir], setState] = useState<[number, number]>([0, 0]);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const n = list.length;
  const at = (i: number) => list[((i % n) + n) % n];
  const go = useCallback((step: number) => setState(([i]) => [(i + step + n) % n, step]), [n]);

  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => go(1), 5000);
    return () => clearInterval(t);
  }, [paused, reduce, go]);

  const b = at(index);

  return (
    <section className="slider" aria-roledescription="carousel" aria-label="Our products" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="slider-wave" aria-hidden />
      <div className="mx-auto max-w-[1320px] px-4 pt-8 sm:px-6 lg:px-10">
        <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="eyebrow text-center">
          Our products
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05, duration: 0.7, ease }}
          className="mx-auto mt-3 max-w-[18ch] text-center font-display text-4xl font-extrabold leading-[1.05] tracking-tight sm:text-6xl"
        >
          Brands people love, <span className="text-[var(--accent)]">bottled close to home.</span>
        </motion.h1>
      </div>

      <div
        className="slider-stage"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1);
          if (e.key === "ArrowLeft") go(-1);
        }}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
      >
        {/* side previews */}
        {[-1, 1].map((side) => {
          const p = at(index + side);
          return (
            <button key={`${side}-${p.id}`} className={`slider-peek ${side < 0 ? "is-left" : "is-right"}`} onClick={() => go(side)} aria-label={`Show ${p.name}`} tabIndex={-1}>
              <img src={heroImage(p)} alt="" draggable={false} />
            </button>
          );
        })}

        <button className="slider-arrow is-left" onClick={() => go(-1)} aria-label="Previous product">
          <CaretLeft size={28} weight="light" />
        </button>

        <AnimatePresence mode="popLayout" initial={false} custom={dir}>
          <motion.a
            key={b.id}
            href={brandHref(b.id)}
            custom={dir}
            variants={{
              enter: (d: number) => ({ x: d * 220, opacity: 0, scale: 0.9 }),
              center: { x: 0, opacity: 1, scale: 1 },
              exit: (d: number) => ({ x: d * -220, opacity: 0, scale: 0.9 }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: reduce ? 0 : 0.6, ease }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.25}
            onDragEnd={(_, info) => {
              if (info.offset.x < -60) go(1);
              else if (info.offset.x > 60) go(-1);
            }}
            className="slider-main"
            aria-label={`Discover ${b.name}`}
            aria-live="polite"
          >
            <img src={heroImage(b)} alt={`${b.name} products`} draggable={false} />
          </motion.a>
        </AnimatePresence>

        <button className="slider-arrow is-right" onClick={() => go(1)} aria-label="Next product">
          <CaretRight size={28} weight="light" />
        </button>
      </div>

      <div className="mx-auto flex max-w-[1320px] flex-col items-center gap-5 px-4 pb-14 sm:px-6 lg:px-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={b.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center gap-3 text-center"
          >
            <span className="text-sm font-semibold text-[var(--muted)]">{b.categories.map(categoryLabel).join(" · ")}</span>
            <h2 className="font-display text-3xl font-extrabold tracking-tight sm:text-4xl">{b.name}</h2>
            <a href={brandHref(b.id)} className="btn btn-primary">
              Discover {b.name} <ArrowRight size={16} weight="bold" />
            </a>
          </motion.div>
        </AnimatePresence>

        <div className="slider-thumbs" role="tablist" aria-label="Choose a product">
          {list.map((x, i) => (
            <button
              key={x.id}
              role="tab"
              aria-selected={i === index}
              aria-label={x.name}
              onClick={() => setState([i, i > index ? 1 : -1])}
              className={`slider-thumb ${i === index ? "is-active" : ""}`}
            >
              <img src={heroImage(x)} alt="" draggable={false} />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
