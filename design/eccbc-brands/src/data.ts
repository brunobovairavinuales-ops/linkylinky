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

// Product shots and full-colour logos for the brands listed on The Coca-Cola Company's
// all-brands page (https://www.coca-colacompany.com/brands/all-brands).
const shotFiles = import.meta.glob("./assets/products/*.webp", { eager: true, query: "?url", import: "default" }) as Record<string, string>;
const colourLogoFiles = import.meta.glob("./assets/logos-colour/*.png", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

// Pack photos from the eccbc.com homepage product slider (https://www.eccbc.com/).
const packFiles = import.meta.glob("./assets/packs/*.webp", { eager: true, query: "?url", import: "default" }) as Record<string, string>;

// Brand descriptions quoted from the same Coca-Cola Company page.
const stories: Record<string, string[]> = {
  "coca-cola": [
    "Since 1886, Coca-Cola has been the unmistakable taste of togetherness. It’s the classic, refreshing pause during a celebration, the perfect companion for quiet moments, and the spark between loved ones. More than a soda, it’s the delicious, iconic way to make any moment feel real.",
  ],
  fanta: [
    "Our second oldest brand, the Fanta we know and love today emerged in Naples, Italy, in 1955 as a delicious Orange flavored soft drink. The name was chosen because it meant the same meaning \"fantastic\" in most languages.",
    "Today Fanta is available in over 100 flavors across 180 countries, with Fanta Orange remaining the most popular.",
  ],
  sprite: [
    "Sprite® is the world’s No. 1 lemon-lime soft drink.",
    "With its crisp lemon-lime taste, Sprite is the ultimate refreshment with the freshest take on culture.",
  ],
  schweppes: [
    "Schweppes® was created in 1783 by Jacob Schweppe, who developed the first process to capture carbonation in a bottle. With more than 230 years of heritage, Schweppes offers a range of premium mixers, flavored sodas and sparkling waters enjoyed throughout the world.",
  ],
  aquarius: [
    "AQUARIUS® is a functional hydration drink developed in 1983 in Japan to help people rehydrate and replace minerals lost during physical activity. With a refreshing taste and added electrolytes, AQUARIUS® is designed for those who lead active lifestyles.",
  ],
  "minute-maid": [
    "Minute Maid® has been making juice and drinks for more than 80 years, we pride ourselves on our history of providing quality products to families around the world.",
  ],
};

export type Brand = {
  id: string;
  name: string;
  categories: CategoryId[];
  logo: string;
  /** Tint for the brand tile */
  color: string;
  featured?: boolean;
  /** Transparent product shot (global brands only) */
  shot?: string;
  /** Full-colour logo (global brands only) */
  colourLogo?: string;
  /** Description paragraphs from The Coca-Cola Company */
  story?: string[];
  /** Pack photo from eccbc.com */
  pack?: string;
};

const b = (id: string, name: string, cats: CategoryId[], file: string, color: string, featured = false): Brand => ({
  id,
  name,
  categories: cats,
  logo: logo(file),
  color,
  featured,
  shot: shotFiles[`./assets/products/${id}.webp`],
  colourLogo: colourLogoFiles[`./assets/logos-colour/${id}.png`],
  story: stories[id],
  pack: packFiles[`./assets/packs/${id}.webp`],
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

/** Best product picture: eccbc.com pack photo, else Coca-Cola Company product shot */
export const heroImage = (x: Brand) => x.pack ?? x.shot;
export const withPictures = () => brands.filter((x) => heroImage(x));

export const globalBrands = () => brands.filter((x) => x.shot);

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
