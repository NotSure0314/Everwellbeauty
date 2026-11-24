import combHero from "@/assets/comb-transparent-hero.jpg";
import combDetail from "@/assets/comb-transparent-detail.jpg";
import curlerSet from "@/assets/curler-silk-set.jpg";
import curler from "@/assets/curler.jpg";
import curls from "@/assets/curls-lifestyle.jpg";
import hero from "@/assets/hero.jpg";

// Add new products to this list — every page reads from it.
export type Product = {
  slug: string;
  handle: string; // Shopify product handle
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
    handle: "rollerball-scalp-oil-applicator-comb",
    name: "Rollerball Scalp Oil Applicator Comb",
    short: "Scalp Oil Comb",
    tagline: "Your oil ritual, beautifully simple.",
    price: 21.99,
    images: [combHero, combDetail, hero],
    tone: "peach",
    description: [
      "Crafted from crystal-clear acrylic with an extended wide-mouth reservoir, this liquid applicator comb lets you pour hair oils and serums with zero funnels or mess. Stainless steel rollerball teeth gently part hair and distribute liquid directly to your scalp roots.",
      "No drips down your neck, no oily fingertips, and no wasted drops. Just a soothing, cooling scalp massage that transforms your daily ritual into pure luxury.",
    ],
    details: [
      "Crystal-clear wide-mouth liquid reservoir",
      "Surgical stainless steel rollerball dispenser teeth",
      "Smooth rounded teeth protect sensitive scalps",
      "Refill directly without funnels or droppers",
    ],
    steps: [
      { title: "Fill", body: "Pour your favorite scalp oil or serum directly into the wide-mouth reservoir." },
      { title: "Part", body: "Place the rollerball comb gently against your scalp along your natural part." },
      { title: "Glide", body: "Glide slowly across your crown — oil dispenses evenly with light rolling pressure." },
      { title: "Massage", body: "Finish with a slow fingertip massage and enjoy effortless root absorption." },
    ],
    faqs: [
      { q: "What oils can I use?", a: "Rosemary, jojoba, castor, argan, and lightweight hair growth serums all flow effortlessly." },
      { q: "How do I clean it?", a: "Empty any leftover oil, rinse with warm soapy water, and allow to air dry before your next ritual." },
      { q: "Does it leak in transit?", a: "The secure snap-fit cap seals the reservoir and teeth tightly to keep your vanity and travel bag clean." },
    ],
  },
  {
    slug: "silk-heatless-curler",
    handle: "wire-free-side-sleeper-heatless-curler",
    name: "Wire-Free Side-Sleeper Heatless Curler",
    short: "Silk Heatless Curler",
    tagline: "Fall asleep. Wake up to soft curls.",
    price: 28.99,
    images: [curlerSet, curler, curls],
    tone: "pink",
    description: [
      "A cloud-soft ribbon wrapped in 22-momme pure mulberry silk with a featherlight memory foam core. Wrap your hair before bed and wake up to bouncy, salon-level curls without heat damage.",
      "Engineered completely wire-free so it stays cushioned and comfortable even if you sleep on your side. Includes two matching pure silk scrunchies.",
    ],
    details: [
      "22-momme pure mulberry silk exterior",
      "Featherlight cloud-foam core — zero rigid wires",
      "Ergonomic flat ribbon engineered for side sleepers",
      "Includes two matching silk scrunchies",
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
