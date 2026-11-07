import comb from "@/assets/comb.jpg";
import curler from "@/assets/curler.jpg";
import hero from "@/assets/hero.jpg";
import curls from "@/assets/curls-lifestyle.jpg";

// Add new products to this list — every page reads from it.
export type Product = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  price: number;
  images: string[];
  description: string[];
  details: string[];
  steps: { title: string; body: string }[];
  faqs: { q: string; a: string }[];
  tone: "peach" | "pink";
};

export const products: Product[] = [
  {
    slug: "rollerball-scalp-oil-comb",
    name: "Rollerball Scalp Oil Applicator Comb",
    short: "Scalp Oil Comb",
    tagline: "Your oil ritual, beautifully simple.",
    price: 21.99,
    images: [comb, hero],
    tone: "peach",
    description: [
      "Fill the 30ml tank with your favorite oil or serum — rosemary, argan, whatever your hair loves — and let the stainless steel rollerball teeth glide it straight to your scalp.",
      "No drips down your neck, no oily fingertips, no wasted drops. Just a calm, cooling moment that feels like a little spa visit at home.",
    ],
    details: [
      "30ml refillable tank",
      "Stainless steel rollerball teeth",
      "Works with oils and serums",
      "Easy to rinse and refill",
    ],
    steps: [
      { title: "Fill", body: "Unscrew the tank and fill it with your chosen oil or serum." },
      { title: "Part", body: "Section your hair to reveal the scalp where you'd like to apply." },
      { title: "Glide", body: "Gently roll along each part — the oil flows as you go." },
      { title: "Massage", body: "Finish with a slow fingertip massage and take a deep breath." },
    ],
    faqs: [
      { q: "What oils can I use?", a: "Most hair oils and serums work well. Very thick oils may flow more slowly — warming the bottle in your hands helps." },
      { q: "How do I clean it?", a: "Empty the tank, rinse with warm soapy water, and let it air dry before refilling." },
      { q: "Will it leak in my bag?", a: "Keep the cap on and store it upright for travel to keep everything tidy." },
    ],
  },
  {
    slug: "silk-heatless-curler",
    name: "Wire-Free Side-Sleeper Heatless Curler",
    short: "Silk Heatless Curler",
    tagline: "Fall asleep. Wake up to soft curls.",
    price: 28.99,
    images: [curler, curls],
    tone: "pink",
    description: [
      "A soft, flat ribbon wrapped in 22-momme mulberry silk with a gentle cotton filling. Wrap your hair before bed and wake up to bouncy, heat-free curls.",
      "There are no rigid rods or wires inside, so it stays comfortable even if you sleep on your side. Your hair — and your pillow — will thank you.",
    ],
    details: [
      "22-momme mulberry silk exterior",
      "Soft cotton filling",
      "Flat, wire-free design for side sleepers",
      "Includes two silk scrunchies",
    ],
    steps: [
      { title: "Prep", body: "Start with hair that's dry or just slightly damp." },
      { title: "Center", body: "Place the middle of the ribbon on top of your head." },
      { title: "Wrap", body: "Twist sections of hair around each side, working downward." },
      { title: "Secure & sleep", body: "Tie the ends with the scrunchies, rest, and unwrap in the morning." },
    ],
    faqs: [
      { q: "Does it work on short hair?", a: "It works best on shoulder-length hair and longer." },
      { q: "Can I really sleep on my side?", a: "Yes — the flat, wire-free ribbon was made for exactly that." },
      { q: "How do I care for the silk?", a: "Hand wash gently in cool water with a mild detergent and lay flat to dry." },
    ],
  },
];

export const getProduct = (slug: string) => products.find((p) => p.slug === slug);
export const formatPrice = (n: number) => `$${n.toFixed(2)}`;
export const FREE_SHIPPING_THRESHOLD = 40;
