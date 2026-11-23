// Brand portfolio for the ECCBC "Our products" page.
// Source: https://www.eccbc.com/about-us/our-products/ (brands, categories and logos, as listed there).
// Brand colours are only used to tint tiles; they are not taken from eccbc.com.

export type CategoryId = "soft-drinks" | "juices" | "water" | "energy-drinks" | "malt" | "beer";

export type Category = { id: CategoryId; label: string };

// Same order and labels as the filter on eccbc.com
export const categories: Category[] = [
  { id: "soft-drinks", label: "Soft Drinks" },
  { id: "juices", label: "Juices" },
  { id: "water", label: "Water" },
  { id: "energy-drinks", label: "Energy Drinks" },
  { id: "malt", label: "Malt" },
  { id: "beer", label: "Beer" },
];

const logoFiles = import.meta.glob("./assets/logos/*.svg", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const logo = (file: string) => logoFiles[`./assets/logos/${file}.svg`];

export type Brand = {
  id: string;
  name: string;
  categories: CategoryId[];
  logo: string;
  /** Tint for the brand tile */
  color: string;
  featured?: boolean;
};

const b = (id: string, name: string, cats: CategoryId[], file: string, color: string, featured = false): Brand => ({
  id,
  name,
  categories: cats,
  logo: logo(file),
  color,
  featured,
});

// Same order as eccbc.com
export const brands: Brand[] = [
  b("coca-cola", "Coca-Cola", ["soft-drinks"], "Coca-Cola_Logo", "#E41E26", true),
  b("fanta", "Fanta", ["soft-drinks"], "Fanta_logo", "#F47B20"),
  b("sprite", "Sprite", ["soft-drinks"], "Sprite_logo", "#00A651"),
  b("schweppes", "Schweppes", ["soft-drinks"], "Schweppes_logo", "#F2C500"),
  b("aquarius", "Aquarius", ["soft-drinks"], "Aquarius_logo", "#0072CE"),
  b("hawai", "Hawai", ["soft-drinks"], "Hawai_logo", "#FFB000"),
  b("ciel", "Ciel", ["water"], "Ciel_logo", "#4FB3E8"),
  b("bonaqua", "Bonaqua", ["water"], "Bonaqua_logo", "#2A7DC1"),
  b("burn", "Burn", ["energy-drinks"], "Burn_logo", "#FF5A00"),
  b("ceris", "Ceris", ["soft-drinks"], "Ceris_logo", "#C8102E"),
  b("monster", "Monster", ["energy-drinks"], "Monster", "#7AC142"),
  b("tops", "Tops", ["soft-drinks"], "Tops_logo", "#E8452C"),
  b("cappy", "Cappy", ["juices"], "Cappy_logo", "#F58220"),
  b("cappy-pulpy", "Cappy Pulpy", ["soft-drinks"], "Cappy-Pulpy", "#FFA400"),
  b("poms", "Pom's", ["soft-drinks"], "Poms_logo", "#8DC63F"),
  b("vimto", "Vimto", ["soft-drinks"], "Vimto_logo", "#7B2D8E"),
  b("sparletta", "Sparletta", ["soft-drinks"], "Sparletta_logo", "#E30613"),
  b("actimalt", "Actimalt", ["malt"], "Actimalt_logo", "#8B5A2B"),
  b("parrot", "Parrot", ["energy-drinks", "soft-drinks"], "Parrot_logo", "#00954C"),
  b("strela", "Strela", ["beer"], "Strela_logo", "#C9A227"),
  b("predator", "Predator", ["energy-drinks"], "Predator_logo", "#D4A017"),
  b("power-play", "Power Play", ["energy-drinks"], "PowerPlay_logo", "#D7262E"),
  b("minute-maid", "Minute Maid", ["soft-drinks"], "Minute_Maid_Logo", "#00843D"),
  b("voltic", "Voltic", ["water"], "Voltic_logo", "#0057A8"),
];

export const byId = Object.fromEntries(brands.map((x) => [x.id, x])) as Record<string, Brand>;
export const categoryLabel = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? id;
export const inCategory = (id: CategoryId) => brands.filter((x) => x.categories.includes(id));

export type Moment = { id: string; title: string; copy: string; brandIds: string[]; tone: string };

// Editorial grouping for the design; not taken from eccbc.com.
export const moments: Moment[] = [
  { id: "family-meal", title: "At the family table", copy: "Sharing sizes for meals together.", brandIds: ["coca-cola", "fanta", "hawai", "cappy"], tone: "#E41E26" },
  { id: "on-the-move", title: "On the move", copy: "Single-serve refreshment for a busy day.", brandIds: ["ciel", "sprite", "bonaqua"], tone: "#003A70" },
  { id: "hydration", title: "Stay hydrated", copy: "Water and hydration through the day.", brandIds: ["voltic", "aquarius", "ciel"], tone: "#0066B3" },
  { id: "late-shift", title: "The long shift", copy: "Energy for adults who need to stay sharp.", brandIds: ["monster", "predator", "burn", "power-play"], tone: "#1C1C1C" },
  { id: "evening", title: "Evenings out", copy: "Grown-up refreshment, enjoyed responsibly.", brandIds: ["schweppes", "strela", "actimalt"], tone: "#4A4A4A" },
];

export const intro = {
  lead: "Since we began operations we have been adapting our portfolio of products to the tastes and needs of every market, consumer and occasion.",
  market: "Today, ECCBC bottles and distributes the Coca-Cola Company’s portfolio in 13 African countries, reaching over 160 million consumers.",
};
