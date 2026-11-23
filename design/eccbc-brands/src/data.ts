// Brand portfolio content for the ECCBC "Our products" concept.
// NOTE: copy and line-ups are draft placeholders written for the design.
// Verify every brand, variant and pack against eccbc.com before publishing.

export type CategoryId =
  | "sparkling"
  | "water"
  | "juice"
  | "energy"
  | "mixers";

export type Category = {
  id: CategoryId;
  label: string;
  blurb: string;
};

export const categories: Category[] = [
  { id: "sparkling", label: "Sparkling", blurb: "Iconic colas and fruit flavours, with regular and zero sugar options." },
  { id: "water", label: "Water & hydration", blurb: "Still water and sports drinks for everyday refreshment." },
  { id: "juice", label: "Juice drinks", blurb: "Fruit drinks made for the family table." },
  { id: "energy", label: "Energy", blurb: "Energy drinks for adult consumers." },
  { id: "mixers", label: "Mixers & adult sparkling", blurb: "Tonics and bitter sodas, on their own or mixed." },
];

export type Pack = "can" | "bottle";

export type Brand = {
  id: string;
  name: string;
  category: CategoryId;
  tagline: string;
  story: string;
  /** Packshot colours: body, label text, accent ring */
  color: string;
  ink: string;
  pack: Pack;
  variants: string[];
  formats: string[];
  zeroSugar?: boolean;
  featured?: boolean;
};

export const brands: Brand[] = [
  {
    id: "coca-cola",
    name: "Coca-Cola",
    category: "sparkling",
    tagline: "Real magic since 1886.",
    story:
      "The world's best-loved soft drink, bottled locally across our markets. Coca-Cola Original Taste sits alongside Zero Sugar so every consumer can choose the refreshment that suits them.",
    color: "#E41E26",
    ink: "#FFFFFF",
    pack: "bottle",
    variants: ["Original Taste", "Zero Sugar"],
    formats: ["Returnable glass", "PET bottle", "Can"],
    featured: true,
  },
  {
    id: "coca-cola-zero",
    name: "Coca-Cola Zero Sugar",
    category: "sparkling",
    tagline: "Great Coca-Cola taste, zero sugar.",
    story:
      "Recipe built to taste as close as possible to Coca-Cola Original, with no sugar and no calories. A central part of our plan to grow low and no sugar choices.",
    color: "#1C1C1C",
    ink: "#E41E26",
    pack: "can",
    variants: ["Zero Sugar"],
    formats: ["PET bottle", "Can"],
    zeroSugar: true,
  },
  {
    id: "fanta",
    name: "Fanta",
    category: "sparkling",
    tagline: "Bright, bubbly and fruity.",
    story:
      "Fanta brings bold fruit flavours and a playful attitude. Orange leads the range, with local favourites rotating by market.",
    color: "#F47B20",
    ink: "#FFFFFF",
    pack: "can",
    variants: ["Orange", "Pineapple", "Lemon", "Fruit Twist"],
    formats: ["Returnable glass", "PET bottle", "Can"],
  },
  {
    id: "sprite",
    name: "Sprite",
    category: "sparkling",
    tagline: "Crisp lemon-lime refreshment.",
    story:
      "Caffeine free, clear and crisp. Sprite pairs lemon and lime for a clean taste that works with any meal.",
    color: "#00A651",
    ink: "#FFFFFF",
    pack: "can",
    variants: ["Lemon-Lime", "Zero Sugar"],
    formats: ["Returnable glass", "PET bottle", "Can"],
  },
  {
    id: "hawai",
    name: "Hawaï",
    category: "sparkling",
    tagline: "A tropical taste of home.",
    story:
      "A much-loved local brand with a sunny tropical flavour profile, produced for consumers in North Africa.",
    color: "#FFC20E",
    ink: "#7A1F00",
    pack: "bottle",
    variants: ["Tropical"],
    formats: ["Returnable glass", "PET bottle"],
  },
  {
    id: "poms",
    name: "Pom's",
    category: "sparkling",
    tagline: "Sparkling apple, a local classic.",
    story:
      "An apple-flavoured sparkling drink with a long local heritage, kept alive for the generations who grew up with it.",
    color: "#8DC63F",
    ink: "#1E3A0E",
    pack: "bottle",
    variants: ["Apple"],
    formats: ["Returnable glass", "PET bottle"],
  },
  {
    id: "ciel",
    name: "Ciel",
    category: "water",
    tagline: "Pure, simple hydration.",
    story:
      "Purified still water bottled to strict quality standards, in sizes for on the go and for the home.",
    color: "#7EC8E3",
    ink: "#003A70",
    pack: "bottle",
    variants: ["Still"],
    formats: ["PET 0.5L", "PET 1.5L", "Large format"],
    zeroSugar: true,
  },
  {
    id: "aquarius",
    name: "Aquarius",
    category: "water",
    tagline: "Hydration with minerals.",
    story:
      "A lightly flavoured drink with mineral salts, designed to help replenish what you lose through the day.",
    color: "#E8F1F8",
    ink: "#0066B3",
    pack: "bottle",
    variants: ["Lemon", "Orange"],
    formats: ["PET bottle"],
  },
  {
    id: "powerade",
    name: "Powerade",
    category: "water",
    tagline: "Fuel for every game.",
    story:
      "An isotonic sports drink with electrolytes, built for players, runners and anyone who trains hard.",
    color: "#0050A0",
    ink: "#FFFFFF",
    pack: "bottle",
    variants: ["Mountain Blast", "Citrus Charge"],
    formats: ["PET bottle"],
  },
  {
    id: "minute-maid",
    name: "Minute Maid",
    category: "juice",
    tagline: "Fruit goodness for the family.",
    story:
      "Fruit drinks made with real fruit juice. Minute Maid Pulpy adds bits of fruit pulp for a fuller taste.",
    color: "#FFB81C",
    ink: "#00573F",
    pack: "bottle",
    variants: ["Pulpy Orange", "Mango", "Apple"],
    formats: ["PET bottle"],
  },
  {
    id: "monster",
    name: "Monster Energy",
    category: "energy",
    tagline: "Unleash the beast.",
    story:
      "One of the world's leading energy brands, distributed through the Coca-Cola system. Not recommended for children, pregnant women or people sensitive to caffeine.",
    color: "#151515",
    ink: "#7AC142",
    pack: "can",
    variants: ["Original", "Ultra", "Mango Loco"],
    formats: ["Can 500ml"],
  },
  {
    id: "predator",
    name: "Predator",
    category: "energy",
    tagline: "Energy at an accessible price.",
    story:
      "An energy drink built for African markets, offering great taste and value. High caffeine content.",
    color: "#C8102E",
    ink: "#FFD100",
    pack: "can",
    variants: ["Gold Strike", "Purple Power"],
    formats: ["PET bottle", "Can"],
  },
  {
    id: "burn",
    name: "Burn",
    category: "energy",
    tagline: "Fuel your night.",
    story:
      "An intense energy drink with a distinctive flavour, for adults who keep going. High caffeine content.",
    color: "#2B2B2B",
    ink: "#FF6B00",
    pack: "can",
    variants: ["Original"],
    formats: ["Can"],
  },
  {
    id: "schweppes",
    name: "Schweppes",
    category: "mixers",
    tagline: "The original tonic since 1783.",
    story:
      "Distinctive adult sparkling drinks with a characteristic bitter edge. Enjoy over ice or as the base of a mixed drink.",
    color: "#FFE600",
    ink: "#1C1C1C",
    pack: "bottle",
    variants: ["Tonic Water", "Bitter Lemon", "Citron"],
    formats: ["Returnable glass", "PET bottle", "Can"],
  },
];

export type Moment = {
  id: string;
  title: string;
  copy: string;
  brandIds: string[];
  tone: string; // background tint
};

export const moments: Moment[] = [
  { id: "family-meal", title: "At the family table", copy: "Sharing sizes and returnable glass for meals together.", brandIds: ["coca-cola", "fanta", "hawai", "minute-maid"], tone: "#E41E26" },
  { id: "on-the-move", title: "On the move", copy: "Single-serve packs that fit a bag and a busy day.", brandIds: ["ciel", "sprite", "coca-cola-zero"], tone: "#003A70" },
  { id: "game-day", title: "Training and game day", copy: "Hydration and electrolytes before, during and after.", brandIds: ["powerade", "aquarius", "ciel"], tone: "#0066B3" },
  { id: "late-shift", title: "The long shift", copy: "Energy for adults who need to stay sharp.", brandIds: ["monster", "predator", "burn"], tone: "#1C1C1C" },
  { id: "evening", title: "Evenings out", copy: "Tonics and bitter sodas for grown-up refreshment.", brandIds: ["schweppes", "sprite"], tone: "#4A4A4A" },
];

export const byId = Object.fromEntries(brands.map((b) => [b.id, b])) as Record<string, Brand>;
