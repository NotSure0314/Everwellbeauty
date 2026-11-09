/**
 * Product Shelf. Designed & built by Aakash Mehra.
 * Customized for Everwell Beauty rituals with studio-rendered 3D packaging.
 *
 * A store wall featuring a single floating shelf with Everwell's signature rituals:
 * 1. Scalp Treatment Oil Infuser Comb (sculpted ivory handle with button, knurled rose-gold collar, 50ml graduated glass reservoir, 9 stainless rollerball teeth)
 * 2. Wire-Free Heatless Curler Set (blush mulberry silk rod arch, stacked ruched silk scrunchies, continuous U-loop, white wrap band)
 * 3. Botanical Rosemary Scalp Elixir (Coming Soon)
 * 4. Cloud Silk Overnight Hair Glaze (Coming Soon)
 *
 * Click one and it moves from its place on the shelf to the left of a product page and turns once,
 * its print wrapping round the cylindrical body. Drag it to turn it yourself; let go
 * and it carries your speed, then settles facing front.
 */
"use client";

import { useEffect, useId, useRef, useState, type PointerEvent as ReactPointerEvent, type ReactNode, type RefObject } from "react";
import { AnimatePresence, LayoutGroup, animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react";
import { ChevronDown, ChevronLeft, Minus, Plus, ShoppingBag, Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Kind = "jar" | "tube" | "pump" | "dropper" | "perfume" | "mist" | "bottle" | "stick" | "lip" | "comb" | "curler";

export type Product = {
  id: string;
  kind: Kind;
  name: string;
  /** Name printed on the pack, with an optional second line. */
  short: string;
  sub?: string;
  category: string;
  /** Body colour, cap colour, label colour, print colour. */
  color: string;
  cap: string;
  label: string;
  ink: string;
  /** See-through glass, and the colour of what is inside. */
  glass?: boolean;
  liquid?: string;
  price: number;
  compareAt?: number;
  sizes: string[];
  rating: number;
  reviews: number;
  tagline: string;
  description: string;
  benefits: string[];
  ingredients: string;
  howTo: string;
};

export const DEFAULT_PRODUCTS: Product[] = [
  {
    id: "scalp-oil-comb",
    kind: "comb",
    name: "Scalp Treatment Oil Infuser Comb",
    short: "Scalp Oil Comb",
    sub: "Oil Infuser 50 ml",
    category: "Hair & Scalp Tool",
    color: "#fcfaf7",
    cap: "#f5ece2",
    label: "#ffffff",
    ink: "#1d1715",
    glass: true,
    liquid: "#e8af38", // Warm golden rosemary & scalp treatment oil
    price: 21.99,
    compareAt: 28.0,
    sizes: ["50 ml"],
    rating: 4.9,
    reviews: 1420,
    tagline: "Your oil ritual, beautifully simple.",
    description:
      "Precision surgical-grade dispenser teeth distribute scalp oils and treatments directly to the roots without mess, waste, or greasy hands. 50ml graduated reservoir with comfort ergonomic grip, knurled rose-gold accents, and airtight silicone seal.",
    benefits: [
      "Targeted root-level delivery",
      "Zero oil on hands or hair lengths",
      "9 soothing massage rollerball pins",
      "Graduated 50ml reservoir with knurled grip",
    ],
    ingredients:
      "BPA-free medical resin reservoir, surgical stainless steel rollerball dispensers, rose-gold electroplated alloy accent bands, airtight silicone seal.",
    howTo:
      "Fill reservoir with your favorite hair oil or serum up to 50ml. Part dry or towel-damp hair and gently glide comb over scalp in slow passes. Rollerballs dispense oil evenly as they roll.",
  },
  {
    id: "heatless-curler",
    kind: "curler",
    name: "Wire-Free Heatless Curler Set",
    short: "Heatless Curler",
    sub: "Includes Silk Rod & 2 Scrunchies",
    category: "Styling Tool",
    color: "#ffffff", // Pure white paper sleeve band
    cap: "#f3d1cf", // Blush mulberry silk
    label: "#ffffff",
    ink: "#1d1615",
    price: 28.99,
    compareAt: 36.0,
    sizes: ["1 Set (Silk)"],
    rating: 4.9,
    reviews: 2180,
    tagline: "Fall asleep. Wake up to soft curls.",
    description:
      "Made for side-sleepers who want effortless volume without rigid metal wires or heat damage. Filled with featherlight cloud foam and wrapped in 100% high-grade mulberry silk that prevents friction and frizz. Includes 2 matching silk scrunchies.",
    benefits: [
      "Zero wires — 100% side-sleeper comfortable",
      "22-Momme pure mulberry silk",
      "Prevents hair breakage & moisture loss",
      "Includes 2 matching silk scrunchies",
    ],
    ingredients:
      "100% Grade 6A 22-Momme Mulberry Silk exterior, ultra-soft hypoallergenic memory microfoam core.",
    howTo:
      "Place the curler across the crown of slightly damp or dry hair. Wrap 1-2 inch sections around the rod moving away from your face. Secure ends with the silk scrunchies and sleep comfortably.",
  },
  {
    id: "coming-soon-1",
    kind: "dropper",
    name: "Botanical Rosemary Scalp Elixir",
    short: "Coming Soon",
    sub: "Rosemary & Biotin",
    category: "Ritual Treatment",
    color: "#e8ede8",
    cap: "#232624",
    label: "#ffffff",
    ink: "#1f2421",
    glass: true,
    liquid: "#b9934e",
    price: 0,
    sizes: ["50 ml"],
    rating: 5.0,
    reviews: 0,
    tagline: "Formulated for deep scalp nourishment.",
    description:
      "Our upcoming botanical scalp elixir crafted with cold-pressed rosemary leaf oil, biotin, and peptide complex to stimulate healthy hair growth and soothe the scalp.",
    benefits: [
      "Cold-pressed rosemary oil",
      "Biotin & tri-peptide complex",
      "Lightweight, non-greasy absorption",
      "Pairs with our Rollerball Comb",
    ],
    ingredients: "Coming soon. Sign up for early ingredient reveal and launch perks.",
    howTo: "Dispense directly into the Everwell Rollerball Scalp Comb or apply drops along hair parts.",
  },
  {
    id: "coming-soon-2",
    kind: "jar",
    name: "Cloud Silk Overnight Hair Glaze",
    short: "Coming Soon",
    sub: "Ceramides & Peptides",
    category: "Overnight Care",
    color: "#f7f4ee",
    cap: "#e7decb",
    label: "#f7f4ee",
    ink: "#2c2724",
    price: 0,
    sizes: ["100 ml"],
    rating: 5.0,
    reviews: 0,
    tagline: "Overnight restorative treatment for glass hair.",
    description:
      "An intensive overnight silk balm that locks in hydration, seals split cuticles, and restores luminous shine while you sleep.",
    benefits: [
      "Ceramide bonding complex",
      "Hydrolyzed silk amino acids",
      "Zero pillow transfer",
      "Rinses clean or leaves hair weightless",
    ],
    ingredients: "Coming soon. Sign up to get notified the minute this drops.",
    howTo: "Warm a dime-sized amount between palms and smooth over lengths before wrapping into your heatless curler.",
  },
];

// ---------- colour helpers ----------

type RGB = [number, number, number];

const hexRgb = (hex: string): RGB => {
  const h = hex.replace("#", "");
  const n = parseInt(h.length === 3 ? h.split("").map((c) => c + c).join("") : h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const mixRgb = (a: RGB, b: RGB, t: number): RGB => [
  Math.round(a[0] + (b[0] - a[0]) * t),
  Math.round(a[1] + (b[1] - a[1]) * t),
  Math.round(a[2] + (b[2] - a[2]) * t),
];

const css = (c: RGB, k = 1, a = 1) => `rgba(${Math.round((c[0] ?? 0) * k)}, ${Math.round((c[1] ?? 0) * k)}, ${Math.round((c[2] ?? 0) * k)}, ${a})`;
const WHITE: RGB = [255, 255, 255];
const lum = (c: RGB) => c[0] * 0.3 + c[1] * 0.59 + c[2] * 0.11;

// ---------- packaging (viewBox 200 x 300, everything stands on y = 286) ----------

type Box = { x: number; y: number; w: number; h: number };
type Shape = {
  body: string;
  box: Box;
  /** Where the print sits. `paper` puts it on a paper label instead of straight on the pack. */
  print: Box & { paper?: boolean };
  /** Liquid top for see-through packs. */
  fill?: number;
  /** Dip tube for see-through pumps and mists. */
  tube?: boolean;
  behind?: (id: string) => ReactNode;
  cap: (id: string) => ReactNode;
};

const rr = (x: number, y: number, w: number, h: number, r: number) =>
  `M${x + r} ${y} H${x + w - r} Q${x + w} ${y} ${x + w} ${y + r} V${y + h - r} Q${x + w} ${y + h} ${x + w - r} ${y + h} H${x + r} Q${x} ${y + h} ${x} ${y + h - r} V${y + r} Q${x} ${y} ${x + r} ${y} Z`;

const ridges = (x: number, y: number, w: number, h: number, step = 2.6) =>
  Array.from({ length: Math.floor(w / step) }, (_, i) => (
    <line key={i} x1={x + 1 + i * step} y1={y + 1.5} x2={x + 1 + i * step} y2={y + h - 1.5} stroke="#000" strokeOpacity={i % 2 ? 0.14 : 0.06} strokeWidth="1" />
  ));

const SHAPES: Record<Kind, Shape> = {
  comb: {
    // Transparent oil reservoir cylinder (y = 136 to 212, width = 30)
    body: rr(85, 136, 30, 76, 3),
    box: { x: 85, y: 136, w: 30, h: 76 },
    print: { x: 85, y: 138, w: 30, h: 72 },
    tube: true,
    fill: 146,
    cap: (id) => (
      <>
        {/* Upper rose-gold collar */}
        <rect x="84" y="130" width="32" height="6" rx="1.5" fill={`url(#${id}-metal)`} />
        <line x1="85" y1="131" x2="115" y2="131" stroke="#fff" strokeOpacity="0.8" strokeWidth="0.8" />

        {/* Sculpted ivory ergonomic handle tapering up to rounded crown */}
        <path
          d="M87 130 C86 98, 79 72, 88 48 C93 36, 107 36, 112 48 C121 72, 114 98, 113 130 Z"
          fill={`url(#${id}-handle)`}
        />
        {/* Handle highlight reflection */}
        <path
          d="M94 122 C91 96, 91 68, 98 44"
          stroke="#fff"
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        {/* Ergonomic handle button */}
        <circle cx="100" cy="114" r="5" fill="#ded5c8" />
        <circle cx="100" cy="114" r="4.2" fill="none" stroke="#fff" strokeOpacity="0.65" strokeWidth="0.8" />
        <circle cx="100" cy="114" r="3.2" fill="#ede5da" />

        {/* Lower knurled rose-gold collar */}
        <rect x="84" y="212" width="32" height="20" rx="2" fill={`url(#${id}-metal)`} />
        {/* Knurled cross-hatch diamond grip pattern */}
        <g opacity="0.32">
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`k1-${i}`} x1={84 + i * 3.8} y1="212" x2={84 + i * 3.8 + 8} y2="232" stroke="#000" strokeWidth="0.8" />
          ))}
          {Array.from({ length: 9 }, (_, i) => (
            <line key={`k2-${i}`} x1={84 + i * 3.8 + 8} y1="212" x2={84 + i * 3.8} y2="232" stroke="#000" strokeWidth="0.8" />
          ))}
        </g>
        <line x1="85" y1="213" x2="115" y2="213" stroke="#fff" strokeOpacity="0.8" strokeWidth="0.9" />

        {/* Flared ivory comb manifold head */}
        <path
          d="M84 232 C82 244, 66 252, 63 260 V265 Q63 268 67 268 H133 Q137 268 137 265 V260 C134 252, 118 244, 116 232 Z"
          fill={`url(#${id}-handle)`}
        />
        <path d="M65 261 Q100 256 135 261" stroke="#fff" strokeOpacity="0.85" strokeWidth="1" fill="none" />
        <rect x="63" y="267" width="74" height="2" fill="#000" opacity="0.16" />

        {/* Exactly 9 Surgical Stainless Steel Dispenser Teeth with Precision Rollerballs */}
        {[69, 77, 85, 92, 100, 108, 115, 123, 131].map((tx, i) => (
          <g key={i}>
            {/* Stainless steel tooth pin */}
            <rect x={tx - 1.8} y="268" width="3.6" height="12.5" rx="1.2" fill={`url(#${id}-steel)`} />
            {/* Rollerball spherical tip touching y = 286 */}
            <circle cx={tx} cy="283.4" r="2.6" fill={`url(#${id}-ball)`} />
            <circle cx={tx - 0.6} cy="282.6" r="0.7" fill="#ffffff" opacity="0.9" />
          </g>
        ))}
      </>
    ),
  },
  curler: {
    // Center white paper wrap band (y = 144 to 228, width = 74)
    body: rr(63, 144, 74, 84, 3),
    box: { x: 63, y: 144, w: 74, h: 84 },
    print: { x: 63, y: 144, w: 74, h: 84, paper: true },
    behind: (id) => (
      <>
        {/* 1. Top blush silk rod arch loop (y = 38 to 86, continuous) */}
        <path
          d="M85 86 C85 46, 115 46, 115 86"
          stroke={`url(#${id}-silk)`}
          strokeWidth="15"
          strokeLinecap="round"
          fill="none"
        />
        <path
          d="M88 84 C88 52, 112 52, 112 84"
          stroke="#ffffff"
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />

        {/* 2. Continuous silk rod legs (y = 80 to 252, connects into bottom loop) */}
        <rect x="66" y="80" width="24" height="172" rx="12" fill={`url(#${id}-silk)`} />
        <rect x="110" y="80" width="24" height="172" rx="12" fill={`url(#${id}-silk)`} />
        {/* Specular silk highlights along legs */}
        <line x1="72" y1="90" x2="72" y2="250" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />
        <line x1="116" y1="90" x2="116" y2="250" stroke="#fff" strokeWidth="2" strokeLinecap="round" opacity="0.5" />

        {/* 3. Inner tucked silk ends inside loop (y = 216 to 262) */}
        <rect x="91" y="216" width="8.5" height="46" rx="4.2" fill={`url(#${id}-silk)`} />
        <rect x="100.5" y="216" width="8.5" height="46" rx="4.2" fill={`url(#${id}-silk)`} />
        <line x1="93" y1="220" x2="93" y2="258" stroke="#fff" strokeWidth="1" opacity="0.45" />
        <line x1="102.5" y1="220" x2="102.5" y2="258" stroke="#fff" strokeWidth="1" opacity="0.45" />

        {/* 4. Bottom continuous U-turn loop (y = 244 to 286, resting firmly on shelf at y = 286!) */}
        <path
          d="M66 244 C66 298, 134 298, 134 244 C134 268, 110 274, 100 274 C90 274, 66 268, 66 244 Z"
          fill={`url(#${id}-silk)`}
        />
        <path
          d="M72 250 C76 286, 124 286, 128 250"
          stroke="#ffffff"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.6"
        />
      </>
    ),
    cap: (id) => (
      <>
        {/* Paper sleeve drop shadows onto silk */}
        <rect x="64" y="142" width="72" height="2.5" fill="#000" opacity="0.12" />
        <rect x="64" y="228" width="72" height="3" fill="#000" opacity="0.12" />

        {/* Stacked Ruched Silk Scrunchie 1 (Upper, y = 74 to 102) */}
        <g>
          <ellipse cx="100" cy="88" rx="35" ry="11" fill="#c88b8e" opacity="0.25" filter={`url(#${id}-soft)`} />
          <ellipse cx="74" cy="88" rx="9" ry="8" fill={`url(#${id}-silk)`} stroke="#dca4a7" strokeWidth="0.6" />
          <ellipse cx="84" cy="89.5" rx="9" ry="8" fill={`url(#${id}-silk)`} stroke="#dca4a7" strokeWidth="0.6" />
          <ellipse cx="94" cy="87.5" rx="9" ry="8" fill={`url(#${id}-silk)`} stroke="#dca4a7" strokeWidth="0.6" />
          <ellipse cx="106" cy="89.5" rx="9" ry="8" fill={`url(#${id}-silk)`} stroke="#dca4a7" strokeWidth="0.6" />
          <ellipse cx="116" cy="87.5" rx="9" ry="8" fill={`url(#${id}-silk)`} stroke="#dca4a7" strokeWidth="0.6" />
          <ellipse cx="126" cy="88" rx="9" ry="8" fill={`url(#${id}-silk)`} stroke="#dca4a7" strokeWidth="0.6" />
          <path d="M79 82 Q81 88 79 94" stroke="#ab6b6e" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M89 82 Q87 88 89 94" stroke="#ab6b6e" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M100 82 Q102 88 100 94" stroke="#ab6b6e" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M111 82 Q109 88 111 94" stroke="#ab6b6e" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M121 82 Q123 88 121 94" stroke="#ab6b6e" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>

        {/* Stacked Ruched Silk Scrunchie 2 (Lower, y = 98 to 126, directly overlapping with upper scrunchie and legs!) */}
        <g>
          <ellipse cx="100" cy="112" rx="35" ry="11" fill="#c88b8e" opacity="0.25" filter={`url(#${id}-soft)`} />
          <ellipse cx="74" cy="112" rx="9" ry="8" fill={`url(#${id}-silk)`} stroke="#dca4a7" strokeWidth="0.6" />
          <ellipse cx="84" cy="113.5" rx="9" ry="8" fill={`url(#${id}-silk)`} stroke="#dca4a7" strokeWidth="0.6" />
          <ellipse cx="94" cy="111.5" rx="9" ry="8" fill={`url(#${id}-silk)`} stroke="#dca4a7" strokeWidth="0.6" />
          <ellipse cx="106" cy="113.5" rx="9" ry="8" fill={`url(#${id}-silk)`} stroke="#dca4a7" strokeWidth="0.6" />
          <ellipse cx="116" cy="111.5" rx="9" ry="8" fill={`url(#${id}-silk)`} stroke="#dca4a7" strokeWidth="0.6" />
          <ellipse cx="126" cy="112" rx="9" ry="8" fill={`url(#${id}-silk)`} stroke="#dca4a7" strokeWidth="0.6" />
          <path d="M79 106 Q81 112 79 118" stroke="#ab6b6e" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M89 106 Q87 112 89 118" stroke="#ab6b6e" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M100 106 Q102 112 100 118" stroke="#ab6b6e" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M111 106 Q109 112 111 118" stroke="#ab6b6e" strokeWidth="0.8" fill="none" opacity="0.6" />
          <path d="M121 106 Q123 112 121 118" stroke="#ab6b6e" strokeWidth="0.8" fill="none" opacity="0.6" />
        </g>
      </>
    ),
  },
  jar: {
    body: "M42 208 H158 Q162 208 162 214 V276 Q162 286 150 286 H50 Q38 286 38 276 V214 Q38 208 42 208 Z",
    box: { x: 38, y: 208, w: 124, h: 78 },
    print: { x: 38, y: 226, w: 124, h: 46 },
    cap: (id) => (
      <>
        <path d={rr(36, 172, 128, 38, 6)} fill={`url(#${id}-cap)`} />
        <g>{ridges(36, 178, 128, 30, 2.2)}</g>
        <path d={rr(36, 172, 128, 38, 6)} fill={`url(#${id}-capv)`} />
        <path d="M42 173.2 H158" stroke="#fff" strokeOpacity="0.7" strokeWidth="1.2" />
        <rect x="38" y="208" width="124" height="3" fill="#000" opacity="0.22" />
      </>
    ),
  },
  tube: {
    body: "M80 250 L67 74 Q66 60 74 58 L126 58 Q134 60 133 74 L120 250 Z",
    box: { x: 66, y: 58, w: 68, h: 192 },
    print: { x: 66, y: 104, w: 68, h: 110 },
    cap: (id) => (
      <>
        <path d={`M62 40 H138 V58 H62 Z`} fill={`url(#${id}-body)`} />
        <path d={`M62 40 ${Array.from({ length: 19 }, (_, i) => `L${64 + i * 4} ${i % 2 ? 40 : 37.5}`).join(" ")} L138 40`} fill={`url(#${id}-body)`} />
        {Array.from({ length: 18 }, (_, i) => (
          <line key={i} x1={64 + i * 4.1} y1="42" x2={64 + i * 4.1} y2="56" stroke="#000" strokeOpacity="0.09" />
        ))}
        <text x="132" y="53" fontSize="3.4" textAnchor="end" fill="#000" fillOpacity="0.35">L2611 EXP 06/28</text>
        <path d={rr(73, 248, 54, 38, 7)} fill={`url(#${id}-cap)`} />
        <g>{ridges(73, 256, 54, 28, 2.4)}</g>
        <path d={rr(73, 248, 54, 38, 7)} fill={`url(#${id}-capv)`} />
        <path d="M75 251 H125" stroke="#000" strokeOpacity="0.2" />
      </>
    ),
  },
  pump: {
    body: "M58 136 Q58 110 84 108 L116 108 Q142 110 142 136 L142 272 Q142 286 128 286 L72 286 Q58 286 58 272 Z",
    box: { x: 58, y: 108, w: 84, h: 178 },
    print: { x: 58, y: 160, w: 84, h: 90 },
    tube: true,
    fill: 132,
    cap: (id) => (
      <>
        <rect x="95.5" y="60" width="9" height="32" fill={`url(#${id}-cap)`} />
        <path d="M82 50 H126 Q132 50 132 55 V64 H78 V55 Q78 50 82 50 Z" fill={`url(#${id}-cap)`} />
        <path d="M126 53 H153 Q157 53 157 56.5 V60 H126 Z" fill={`url(#${id}-cap)`} />
        <path d="M80 51.5 H128" stroke="#fff" strokeOpacity="0.7" />
        <path d={rr(80, 88, 40, 22, 3)} fill={`url(#${id}-cap)`} />
        <g>{ridges(80, 88, 40, 22, 2.2)}</g>
        <path d={rr(80, 88, 40, 22, 3)} fill={`url(#${id}-capv)`} />
      </>
    ),
  },
  dropper: {
    body: "M64 170 Q64 152 86 150 L86 140 L114 140 L114 150 Q136 152 136 170 L136 272 Q136 286 122 286 L78 286 Q64 286 64 272 Z",
    box: { x: 64, y: 140, w: 72, h: 146 },
    print: { x: 64, y: 192, w: 72, h: 70, paper: true },
    fill: 168,
    cap: (id) => (
      <>
        <path d="M86 118 V86 Q86 62 100 62 Q114 62 114 86 V118 Z" fill={`url(#${id}-bulb)`} />
        <path d="M91 74 Q93 66 100 65" stroke="#fff" strokeOpacity="0.4" strokeWidth="2" fill="none" strokeLinecap="round" />
        <path d={rr(80, 114, 40, 28, 3)} fill={`url(#${id}-cap)`} />
        <g>{ridges(80, 114, 40, 28, 2)}</g>
        <path d={rr(80, 114, 40, 28, 3)} fill={`url(#${id}-capv)`} />
      </>
    ),
  },
  perfume: {
    body: "M58 166 H142 Q154 166 156 178 L158 270 Q158 286 142 286 H58 Q42 286 42 270 L44 178 Q46 166 58 166 Z",
    box: { x: 42, y: 166, w: 116, h: 120 },
    print: { x: 66, y: 204, w: 68, h: 44 },
    fill: 178,
    cap: (id) => (
      <>
        <rect x="88" y="150" width="24" height="18" fill={`url(#${id}-cap)`} />
        <path d={rr(70, 96, 60, 56, 4)} fill={`url(#${id}-cap)`} />
        <path d={rr(70, 96, 60, 56, 4)} fill={`url(#${id}-capv)`} />
        <path d="M72 97.5 H128" stroke="#fff" strokeOpacity="0.8" />
      </>
    ),
  },
  mist: {
    body: "M62 154 Q62 130 86 128 L114 128 Q138 130 138 154 L138 272 Q138 286 124 286 L76 286 Q62 286 62 272 Z",
    box: { x: 62, y: 128, w: 76, h: 158 },
    print: { x: 62, y: 178, w: 76, h: 78 },
    tube: true,
    fill: 168,
    cap: (id) => (
      <>
        <path d={rr(82, 110, 36, 22, 3)} fill={`url(#${id}-cap)`} />
        <g>{ridges(82, 110, 36, 22, 2.2)}</g>
        <path d={rr(86, 82, 28, 30, 6)} fill={`url(#${id}-cap)`} />
        <path d={rr(86, 82, 28, 30, 6)} fill={`url(#${id}-capv)`} />
        <circle cx="111" cy="94" r="2.2" fill="#000" opacity="0.45" />
      </>
    ),
  },
  bottle: {
    body: "M62 114 Q62 86 86 82 L114 82 Q138 86 138 114 L141 268 Q141 286 122 286 L78 286 Q59 286 59 268 Z",
    box: { x: 59, y: 82, w: 82, h: 204 },
    print: { x: 59, y: 140, w: 82, h: 100, paper: true },
    fill: 110,
    cap: (id) => (
      <>
        <path d={rr(78, 50, 44, 34, 6)} fill={`url(#${id}-cap)`} />
        <path d={rr(78, 50, 44, 34, 6)} fill={`url(#${id}-capv)`} />
        <path d="M80 63 H120" stroke="#000" strokeOpacity="0.45" />
        <path d="M80 51.5 H120" stroke="#fff" strokeOpacity="0.4" />
      </>
    ),
  },
  lip: {
    body: "M89 250 L85 152 Q85 144 91 143 L109 143 Q115 144 115 152 L111 250 Z",
    box: { x: 85, y: 143, w: 30, h: 107 },
    print: { x: 85, y: 166, w: 30, h: 60 },
    cap: (id) => (
      <>
        <path d={`M83 128 H117 V143 H83 Z`} fill={`url(#${id}-body)`} />
        {Array.from({ length: 8 }, (_, i) => (
          <line key={i} x1={85 + i * 4.2} y1="130" x2={85 + i * 4.2} y2="141" stroke="#000" strokeOpacity="0.08" />
        ))}
        <path d={rr(86, 248, 28, 38, 5)} fill={`url(#${id}-cap)`} />
        <path d={rr(86, 248, 28, 38, 5)} fill={`url(#${id}-capv)`} />
      </>
    ),
  },
  stick: {
    body: rr(81, 224, 38, 62, 4),
    box: { x: 81, y: 224, w: 38, h: 62 },
    print: { x: 81, y: 236, w: 38, h: 38 },
    cap: (id) => (
      <>
        <path d={rr(81, 168, 38, 58, 5)} fill={`url(#${id}-cap)`} />
        <path d={rr(81, 168, 38, 58, 5)} fill={`url(#${id}-capv)`} />
        <rect x="81" y="222" width="38" height="2.5" fill="#000" opacity="0.3" />
      </>
    ),
  },
};

const EXTENT: Record<Kind, { top: number; w: number }> = {
  comb: { top: 36, w: 76 },
  curler: { top: 38, w: 74 },
  jar: { top: 172, w: 128 },
  tube: { top: 37, w: 76 },
  pump: { top: 50, w: 101 },
  dropper: { top: 60, w: 72 },
  perfume: { top: 96, w: 116 },
  mist: { top: 80, w: 76 },
  bottle: { top: 48, w: 84 },
  stick: { top: 166, w: 38 },
  lip: { top: 128, w: 34 },
};
const pageZoom = (k: Kind) => Math.min(2.2, 262 / (290 - EXTENT[k].top), 190 / EXTENT[k].w);

// ---------- 3D Studio Product Art with Wrap-Around Label Animation ----------

function ProductArt({ p, spin, className }: { p: Product; spin?: MotionValue<number> | undefined; className?: string | undefined }) {
  const id = "ps" + useId().replace(/[^a-zA-Z0-9]/g, "");
  const s = SHAPES[p.kind];
  const c = hexRgb(p.color);
  const k = hexRgb(p.cap);
  const lab = hexRgb(p.label);
  const a = p.glass ? (lum(c) > 200 ? 0.28 : 0.8) : 1;
  const liq = hexRgb(p.liquid ?? p.color);
  const { print: P, box: B } = s;
  const period = P.w * 2.6; // Print covers front, then back rolls by
  const fallback = useMotionValue(0);
  const x = useTransform(spin ?? fallback, (v) => -((((v * period) % period) + period) % period));

  const printArt = (dx: number) => {
    if (p.kind === "comb") {
      return (
        <g transform={`translate(${dx} 0)`}>
          {/* Top white brand bar */}
          <rect x={P.x} y={P.y} width={P.w} height="12" fill="#ffffff" />
          <text x={P.x + P.w / 2} y={P.y + 8} fill="#1a1614" fontSize="4.6" fontWeight="700" letterSpacing="0.8" textAnchor="middle">EVERWELL</text>
          {/* Printed formula info */}
          <text x={P.x + P.w / 2} y={P.y + 24} fill="#1a1614" fontSize="5.6" fontWeight="600" textAnchor="middle">Scalp</text>
          <text x={P.x + P.w / 2} y={P.y + 33} fill="#1a1614" fontSize="5.6" fontWeight="600" textAnchor="middle">Treatment</text>
          <text x={P.x + P.w / 2} y={P.y + 44} fill="#1a1614" fontSize="4.1" opacity="0.85" textAnchor="middle">Oil Infuser</text>
          <text x={P.x + P.w / 2} y={P.y + 58} fill="#1a1614" fontSize="4.0" opacity="0.75" textAnchor="middle">50 ml</text>
        </g>
      );
    }

    if (p.kind === "curler") {
      return (
        <g transform={`translate(${dx} 0)`}>
          {P.paper && <rect x={P.x} y={P.y} width={P.w} height={P.h} fill="#ffffff" stroke="#ece7de" strokeWidth="0.6" />}
          <text x={P.x + P.w / 2} y={P.y + 14} fill="#1d1615" fontSize="5.2" fontWeight="700" letterSpacing="1.2" textAnchor="middle">EVERWELL</text>
          <text x={P.x + P.w / 2} y={P.y + 28} fill="#1d1615" fontSize="7.4" fontWeight="600" letterSpacing="-0.2" textAnchor="middle">Heatless</text>
          <text x={P.x + P.w / 2} y={P.y + 38} fill="#1d1615" fontSize="7.4" fontWeight="600" letterSpacing="-0.2" textAnchor="middle">Curler Set</text>
          <text x={P.x + P.w / 2} y={P.y + 51} fill="#1d1615" fontSize="3.9" opacity="0.82" textAnchor="middle">Includes Silk Rod &amp; 2 Scrunchies</text>
          <text x={P.x + P.w / 2} y={P.y + 65} fill="#1d1615" fontSize="3.6" opacity="0.75" textAnchor="middle">1 Set</text>
          <text x={P.x + P.w / 2} y={P.y + 73} fill="#1d1615" fontSize="3.6" opacity="0.75" textAnchor="middle">Material: Silk</text>
        </g>
      );
    }

    const nameSize = Math.min(10.5, P.w * 0.12, (P.w * 1.12) / p.short.length);
    const subSize = Math.min(7, P.w * 0.08, (P.w * 1.25) / (p.sub ?? "").length);
    return (
      <g transform={`translate(${dx} 0)`}>
        {P.paper && <rect x={P.x} y={P.y} width={P.w} height={P.h} fill={css(lab)} />}
        <text x={P.x + P.w / 2} y={P.y + P.h * 0.22} fill={p.ink} fontSize={Math.min(6.5, P.w * 0.075)} fontWeight="600" letterSpacing={Math.min(1.6, P.w * 0.02)} textAnchor="middle">EVERWELL</text>
        <text x={P.x + P.w / 2} y={P.y + P.h * 0.48} fill={p.ink} fontSize={nameSize} fontWeight="500" letterSpacing="-0.15" textAnchor="middle">{p.short}</text>
        {p.sub && <text x={P.x + P.w / 2} y={P.y + P.h * 0.65} fill={p.ink} fontSize={subSize} opacity="0.8" textAnchor="middle">{p.sub}</text>}
        <text x={P.x + P.w / 2} y={P.y + P.h * 0.88} fill={p.ink} opacity="0.6" fontSize={Math.min(5.8, P.w * 0.07)} textAnchor="middle">{p.sizes[0]}</text>
      </g>
    );
  };

  return (
    <svg viewBox="0 0 200 300" className={className} aria-hidden overflow="visible">
      <defs>
        {/* Rose-gold metallic electroplate gradient */}
        <linearGradient id={`${id}-metal`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#c88e72" />
          <stop offset="25%" stopColor="#f8ded2" />
          <stop offset="50%" stopColor="#d3987e" />
          <stop offset="75%" stopColor="#faece5" />
          <stop offset="100%" stopColor="#ab7258" />
        </linearGradient>
        {/* Surgical stainless steel chrome gradient */}
        <linearGradient id={`${id}-steel`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#9da3a8" />
          <stop offset="35%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#bcc1c7" />
          <stop offset="100%" stopColor="#767c82" />
        </linearGradient>
        {/* Stainless steel rollerball tip radial highlight */}
        <radialGradient id={`${id}-ball`} cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="45%" stopColor="#c5c9ce" />
          <stop offset="85%" stopColor="#676e75" />
          <stop offset="100%" stopColor="#3d4349" />
        </radialGradient>
        {/* Sculpted ivory handle gradient */}
        <linearGradient id={`${id}-handle`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ebe4db" />
          <stop offset="25%" stopColor="#ffffff" />
          <stop offset="70%" stopColor="#f5efe6" />
          <stop offset="100%" stopColor="#ded5c8" />
        </linearGradient>
        {/* Blush mulberry silk satin sheen gradient */}
        <linearGradient id={`${id}-silk`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#df9da2" />
          <stop offset="22%" stopColor="#feecec" />
          <stop offset="50%" stopColor="#ebb1b5" />
          <stop offset="80%" stopColor="#f9dfe0" />
          <stop offset="100%" stopColor="#c58288" />
        </linearGradient>

        {/* Studio cylinder lighting */}
        <linearGradient id={`${id}-body`} x1="0" x2="1">
          <stop offset="0" stopColor={css(mixRgb(c, WHITE, 0.08), 0.72, a)} />
          <stop offset="0.08" stopColor={css(mixRgb(c, WHITE, 0.4), 1.06, a)} />
          <stop offset="0.22" stopColor={css(c, 1, a)} />
          <stop offset="0.65" stopColor={css(c, 0.94, a)} />
          <stop offset="0.88" stopColor={css(c, 0.78, a)} />
          <stop offset="1" stopColor={css(mixRgb(c, WHITE, 0.2), 0.9, a)} />
        </linearGradient>
        <linearGradient id={`${id}-cap`} x1="0" x2="1">
          <stop offset="0" stopColor={css(k, 0.7)} />
          <stop offset="0.1" stopColor={css(mixRgb(k, WHITE, 0.5), 1.08)} />
          <stop offset="0.26" stopColor={css(k, 1)} />
          <stop offset="0.7" stopColor={css(k, 0.92)} />
          <stop offset="0.9" stopColor={css(k, 0.74)} />
          <stop offset="1" stopColor={css(mixRgb(k, WHITE, 0.25), 0.88)} />
        </linearGradient>
        <linearGradient id={`${id}-capv`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.28" />
          <stop offset="0.3" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.75" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.22" />
        </linearGradient>
        <linearGradient id={`${id}-shade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#fff" stopOpacity="0.14" />
          <stop offset="0.18" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.86" stopColor="#000" stopOpacity="0" />
          <stop offset="1" stopColor="#000" stopOpacity="0.2" />
        </linearGradient>
        <linearGradient id={`${id}-wrap`} x1="0" x2="1">
          <stop offset="0" stopColor={css(c, 0.42)} stopOpacity="1" />
          <stop offset="0.14" stopColor={css(c, 0.42)} stopOpacity="0" />
          <stop offset="0.86" stopColor={css(c, 0.42)} stopOpacity="0" />
          <stop offset="1" stopColor={css(c, 0.42)} stopOpacity="1" />
        </linearGradient>
        <linearGradient id={`${id}-liquid`} x1="0" x2="1">
          <stop offset="0" stopColor={css(liq, 0.7)} />
          <stop offset="0.3" stopColor={css(liq, 1)} />
          <stop offset="0.7" stopColor={css(liq, 0.92)} />
          <stop offset="1" stopColor={css(liq, 0.7)} />
        </linearGradient>
        <filter id={`${id}-soft`} x="-50%" y="-10%" width="200%" height="120%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
        <clipPath id={`${id}-clip`}>
          <path d={s.body} />
        </clipPath>
        <radialGradient id={`${id}-bulb`} cx="0.35" cy="0.25" r="0.9">
          <stop offset="0" stopColor={css(mixRgb(k, WHITE, 0.4))} />
          <stop offset="0.55" stopColor={css(k, 0.9)} />
          <stop offset="1" stopColor={css(k, 0.55)} />
        </radialGradient>
        <radialGradient id={`${id}-floor`}>
          <stop offset="0" stopColor="#000" stopOpacity="0.28" />
          <stop offset="1" stopColor="#000" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Shelf contact shadow */}
      <ellipse cx="100" cy="287" rx={B.w * 0.75} ry="6" fill={`url(#${id}-floor)`} />
      <ellipse cx="100" cy="286.3" rx={B.w * 0.5} ry="1.4" fill="#000" opacity="0.35" />

      {/* Elements rendered behind body (such as continuous silk rod legs and bottom loop) */}
      {s.behind?.(id)}

      {/* Main product vector body (such as white wrap band or glass cylinder) */}
      <path d={s.body} fill={`url(#${id}-body)`} />
      <g clipPath={`url(#${id}-clip)`}>
        {p.glass && s.fill !== undefined && (
          <>
            <rect x={B.x + 2} y={s.fill} width={B.w - 4} height={286 - s.fill - 8} fill={`url(#${id}-liquid)`} opacity="0.85" />
            <rect x={B.x + 2} y={s.fill} width={B.w - 4} height="1.6" fill="#fff" opacity="0.45" />
            {s.tube && <rect x="98.6" y={B.y - 4} width="2.8" height={286 - B.y - 4} fill="#fff" opacity="0.45" />}
            <rect x={B.x} y={B.y + B.h - 8} width={B.w} height="8" fill={css(c, 0.5, 0.55)} />
            <path d={`M${B.x + 4} ${B.y + B.h - 7} H${B.x + B.w - 4}`} stroke="#fff" strokeOpacity="0.5" strokeWidth="0.8" />
          </>
        )}
        {/* Wrapping label that turns around the 3D cylinder */}
        <motion.g style={{ x }}>
          {printArt(0)}
          {printArt(period)}
        </motion.g>
        <rect x={B.x} y={P.y - 2} width={B.w} height={P.h + 4} fill={`url(#${id}-wrap)`} opacity="0.48" />
        <rect x={B.x} y={B.y} width={B.w} height={B.h} fill={`url(#${id}-shade)`} />
        {/* Studio softbox reflections */}
        <rect x={B.x + B.w * 0.07} y={B.y + 4} width={B.w * 0.11} height={B.h - 8} rx="3" fill="#fff" opacity={lum(c) > 200 ? 0.45 : 0.3} filter={`url(#${id}-soft)`} />
        <rect x={B.x + B.w * 0.11} y={B.y + 6} width={B.w * 0.028} height={B.h - 12} rx="1" fill="#fff" opacity="0.85" />
        <rect x={B.x + B.w * 0.86} y={B.y + 8} width={B.w * 0.025} height={B.h - 16} rx="1" fill="#fff" opacity="0.3" />
      </g>
      <path d={s.body} fill="none" stroke={css(c, 0.45, 0.45)} strokeWidth="0.7" />
      {/* Product cap, collars, teeth, and accents */}
      {s.cap(id)}
    </svg>
  );
}

// ---------- component ----------

export type ProductShelfProps = {
  products?: Product[];
  currency?: string;
  className?: string;
  children?: ReactNode;
  brandName?: string;
  hideFloatingNav?: boolean;
  onAddToCart?: (product: Product, quantity: number, size: string) => void;
};

const SPRING = { type: "spring" as const, bounce: 0, duration: 0.55 };
const INK = "#111111";

export function ProductShelf({
  products = DEFAULT_PRODUCTS,
  currency = "$",
  className,
  children,
  brandName = "EVERWELL",
  hideFloatingNav = false,
  onAddToCart,
}: ProductShelfProps) {
  const [openId, setOpenId] = useState(null as string | null);
  const [bag, setBag] = useState(0);
  const [bump, setBump] = useState(0);
  const bagRef = useRef(null as HTMLButtonElement | null);
  // Keep strictly the top shelf (1 shelf with 4 ritual slots)
  const rows = [products.slice(0, 4)];
  const open = products.find((p) => p.id === openId) ?? null;

  useEffect(() => {
    if (!openId) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenId(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [openId]);

  const addToBag = (qty: number, size: string) => {
    setBag((b) => b + qty);
    setBump((n) => n + 1);
    if (open && onAddToCart) {
      onAddToCart(open, qty, size);
    }
  };

  return (
    <div
      className={cn("relative min-h-dvh w-full overflow-x-hidden bg-[#f3f1ed] font-sans text-[#111] antialiased", className)}
    >
      {!hideFloatingNav && (
        <>
          <div className="pointer-events-none fixed top-4 left-5 z-30 flex h-11 items-center text-[15px] font-semibold tracking-[0.18em]">
            {brandName}
          </div>
          <button
            ref={bagRef}
            type="button"
            aria-label={`Bag, ${bag} ${bag === 1 ? "item" : "items"}`}
            className="fixed top-4 right-4 z-30 grid size-11 place-items-center rounded-xl bg-white/80 text-[#111111] shadow-[0_2px_12px_rgba(0,0,0,0.08)] ring-1 ring-black/[0.06] backdrop-blur-xl transition-[transform,background-color] duration-100 hover:bg-white active:scale-[0.94] focus-visible:outline-2 focus-visible:outline-[#111111]"
          >
            <ShoppingBag className="size-[19px]" strokeWidth={1.6} />
            {bag > 0 && (
              <motion.span
                key={bump}
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={SPRING}
                className="absolute -top-1.5 -right-1.5 grid h-[18px] min-w-[18px] place-items-center rounded-[9px] bg-[#111111] px-1 text-[11px] font-semibold text-white tabular-nums"
              >
                {bag}
              </motion.span>
            )}
          </button>
        </>
      )}

      <LayoutGroup>
        <main className={cn("mx-auto w-full max-w-[1080px] px-5 pb-12", hideFloatingNav ? "pt-2" : "pt-16")}>
          {rows.map((row, r) => (
            <section key={r} aria-label="Everwell Rituals" className="relative mb-14">
              <div className="relative z-10 grid grid-cols-4 items-end gap-3 px-3 sm:gap-8 sm:px-8">
                {row.map((p) => (
                  <div key={p.id} className="flex flex-col items-center">
                    {openId === p.id ? (
                      <div className="aspect-[2/3] w-full max-w-[160px]" />
                    ) : (
                      <motion.button
                        layoutId={`product-${p.id}`}
                        type="button"
                        onClick={() => setOpenId(p.id)}
                        aria-label={p.price > 0 ? `${p.name}, ${currency}${p.price.toFixed(2)}` : `${p.name}, Coming Soon`}
                        transition={SPRING}
                        className="relative aspect-[2/3] w-full max-w-[160px] cursor-pointer rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-[#111111]"
                      >
                        <ProductArt p={p} className="size-full" />
                      </motion.button>
                    )}
                  </div>
                ))}
              </div>
              {/* Floating white shelf: lit top, crisp front edge, soft shadow on the wall */}
              <div aria-hidden className="relative -mt-[6px] h-[16px]">
                <div className="absolute inset-x-0 top-0 h-[8px] bg-[linear-gradient(to_bottom,#e6e6ea,#fbfbfd)]" />
                <div className="absolute inset-x-0 top-[8px] h-[8px] bg-[linear-gradient(to_bottom,#ffffff,#ececf0)] shadow-[0_1px_0_rgba(0,0,0,0.04)]" />
                <div className="absolute inset-x-[2%] top-[16px] h-[34px] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(0,0,0,0.13),transparent)]" />
              </div>
              <div className="mt-5 grid grid-cols-4 gap-3 px-3 sm:gap-8 sm:px-8">
                {row.map((p) => (
                  <div key={p.id} className="text-center">
                    <div className="text-[13px] leading-tight font-medium sm:text-[14px]">{p.short}</div>
                    <div className="mt-0.5 text-[12px] text-[#6f6a64] tabular-nums sm:text-[13px]">
                      {p.price > 0 ? `${currency}${p.price.toFixed(2)}` : "Coming Soon"}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </main>

        <AnimatePresence>
          {open && (
            <ProductPage
              key={open.id}
              p={open}
              currency={currency}
              onClose={() => setOpenId(null)}
              onAdd={addToBag}
              bagRef={bagRef}
            />
          )}
        </AnimatePresence>
      </LayoutGroup>
      {children}
    </div>
  );
}

function ProductPage({
  p,
  currency,
  onClose,
  onAdd,
  bagRef,
}: {
  p: Product;
  currency: string;
  onClose: () => void;
  onAdd: (qty: number, size: string) => void;
  bagRef: RefObject<HTMLButtonElement | null>;
}) {
  const reduce = useReducedMotion();
  const spin = useMotionValue(0);
  const [size, setSize] = useState(p.sizes[0] ?? "");
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [email, setEmail] = useState("");
  const [notified, setNotified] = useState(false);
  const [section, setSection] = useState("Details" as string | null);
  const closeRef = useRef(null as HTMLButtonElement | null);
  const drag = useRef(null as { x: number; v: number; samples: { x: number; t: number }[] } | null);

  useEffect(() => {
    closeRef.current?.focus({ preventScroll: true });
    if (reduce) return;
    const c = animate(spin, 1, { duration: 1.1, ease: [0.25, 0.1, 0.25, 1], delay: 0.1 });
    return () => c.stop();
  }, [spin, reduce]);

  const price = p.price * (p.sizes.indexOf(size) > 0 ? 1.7 : 1);
  const add = () => {
    onAdd(qty, size);
    setAdded(true);
    bagRef.current?.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.18)" }, { transform: "scale(1)" }],
      { duration: 320, easing: "ease-out" }
    );
    setTimeout(() => setAdded(false), 1800);
  };

  const onDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    spin.stop();
    drag.current = { x: e.clientX, v: spin.get(), samples: [{ x: e.clientX, t: e.timeStamp }] };
  };
  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const d = drag.current;
    if (!d) return;
    spin.set(d.v - (e.clientX - d.x) / 380);
    d.samples.push({ x: e.clientX, t: e.timeStamp });
    if (d.samples.length > 5) d.samples.shift();
  };
  const onUp = () => {
    const d = drag.current;
    drag.current = null;
    if (!d) return;
    const first = d.samples[0];
    const last = d.samples[d.samples.length - 1];
    if (!first || !last) return;
    const vx = last.t > first.t ? ((last.x - first.x) / (last.t - first.t)) * 1000 : 0;
    const velocity = -vx / 380;
    const projected = spin.get() + ((velocity / 1000) * 0.998) / (1 - 0.998);
    animate(spin, Math.round(projected), { type: "spring", bounce: 0, duration: 0.9, velocity });
  };

  const sections: [string, ReactNode][] = [
    ["Details", <ul key="d" className="list-disc space-y-1 pl-5">{p.benefits.map((b) => <li key={b}>{b}</li>)}</ul>],
    ["Ingredients & Materials", <p key="i">{p.ingredients}</p>],
    ["How to use", <p key="h">{p.howTo}</p>],
  ];

  return (
    <motion.div role="dialog" aria-modal="true" aria-label={p.name} className="fixed inset-0 z-50 overflow-y-auto">
      <motion.div className="fixed inset-0 bg-[#f3f1ed]" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} />
      <div className="relative mx-auto grid min-h-full max-w-[1080px] grid-cols-1 items-center gap-8 px-5 pt-20 pb-12 md:grid-cols-[1.05fr_1fr] md:gap-14">
        {/* The 3D product, moved over from the shelf, standing on a white surface */}
        <div className="relative flex flex-col items-center justify-center md:h-[calc(100dvh-7rem)]">
          <motion.div
            layoutId={`product-${p.id}`}
            transition={SPRING}
            className="relative z-10 aspect-[2/3] h-[44vh] cursor-grab touch-none select-none active:cursor-grabbing md:h-[62vh]"
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
          >
            <motion.div
              className="pointer-events-none size-full"
              style={{ transformOrigin: "50% 96.7%" }}
              initial={{ scale: 1 }}
              animate={{ scale: pageZoom(p.kind) }}
              exit={{ scale: 1 }}
              transition={SPRING}
            >
              <ProductArt p={p} spin={spin} className="size-full" />
            </motion.div>
          </motion.div>
          <motion.div
            aria-hidden
            className="relative -mt-[1.5%] h-[18px] w-[86%] rounded-[3px] bg-[linear-gradient(to_bottom,#ffffff,#ececf0)] shadow-[0_18px_40px_-12px_rgba(0,0,0,0.18)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />
          <p className="mt-6 text-[12px] text-[#8f8982]">Drag to turn 360°</p>
        </div>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 24 }}
          transition={{ ...SPRING, delay: 0.05 }}
          className="relative z-20"
        >
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            className="-ml-1.5 mb-6 inline-flex items-center gap-0.5 rounded-md px-1.5 py-1 text-[15px] text-[#111111] underline-offset-4 transition-colors hover:underline focus-visible:outline-2 focus-visible:outline-[#111111]"
          >
            <ChevronLeft className="size-4" strokeWidth={2.2} /> Shelf
          </button>
          <div className="text-[14px] text-[#6f6a64]">{p.category}</div>
          <h2 className="mt-1 text-[clamp(28px,3.8vw,38px)] leading-[1.08] font-semibold tracking-[-0.022em]">{p.name}</h2>
          <p className="mt-2 text-[18px] leading-snug text-[#6f6a64]">{p.tagline}</p>

          {p.price > 0 ? (
            <div className="mt-3 flex items-center gap-1.5 text-[14px] text-[#6f6a64]">
              <span className="flex text-[#111111]" aria-label={`Rated ${p.rating} out of 5`}>
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="size-[14px]" fill={i < Math.round(p.rating) ? INK : "transparent"} strokeWidth={1.4} />
                ))}
              </span>
              {p.rating.toFixed(1)} · {p.reviews.toLocaleString()} verified ratings
            </div>
          ) : (
            <div className="mt-3 flex items-center gap-2 text-[14px] text-[#8f8982]">
              <span className="inline-block size-2 rounded-full bg-amber-600/70" />
              <span>Preview Edition · Joining the ritual collection soon</span>
            </div>
          )}

          {p.price > 0 ? (
            <div className="mt-6 flex items-baseline gap-2.5 tabular-nums">
              <span className="text-[24px] font-semibold tracking-[-0.01em]">{currency}{price.toFixed(2)}</span>
              {p.compareAt && (
                <span className="text-[17px] text-[#8f8982] line-through">
                  {currency}{(p.compareAt * (price / p.price)).toFixed(2)}
                </span>
              )}
            </div>
          ) : (
            <div className="mt-6 flex items-baseline gap-2.5">
              <span className="inline-flex items-center rounded-full bg-[#111111]/8 px-3.5 py-1 text-[13px] font-semibold tracking-wider text-[#111111] uppercase">
                Coming Soon
              </span>
            </div>
          )}

          <p className="mt-4 max-w-[54ch] text-[16px] leading-[1.5] tracking-[-0.01em] text-[#111111]/85">{p.description}</p>

          {p.price > 0 && p.sizes.length > 1 && (
            <fieldset className="mt-7">
              <legend className="mb-2.5 text-[16px] font-semibold tracking-[-0.01em]">Size</legend>
              <div className="grid grid-cols-2 gap-2.5">
                {p.sizes.map((sz, i) => {
                  const on = size === sz;
                  return (
                    <label
                      key={sz}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-xl border bg-white px-4 py-3 text-[15px] transition-[border-color,box-shadow] duration-150 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-[#111111]",
                        on ? "border-[#111111] shadow-[0_0_0_1px_#111111]" : "border-[#d9d4cd] hover:border-[#8f8982]",
                      )}
                    >
                      <input type="radio" name="size" value={sz} checked={on} onChange={() => setSize(sz)} className="sr-only" />
                      <span className="font-medium">{sz}</span>
                      <span className="text-[#6f6a64] tabular-nums">{currency}{(p.price * (i > 0 ? 1.7 : 1)).toFixed(2)}</span>
                    </label>
                  );
                })}
              </div>
            </fieldset>
          )}

          {p.price > 0 ? (
            <div className="mt-7 flex items-stretch gap-3">
              <div className="flex items-center rounded-xl border border-[#d9d4cd] bg-white">
                <button
                  type="button"
                  aria-label="Decrease quantity"
                  onClick={() => setQty((q) => Math.max(1, q - 1))}
                  className="grid h-full w-11 place-items-center rounded-l-xl text-[#111111] transition-colors active:bg-black/[0.06] disabled:text-[#d9d4cd]"
                  disabled={qty === 1}
                >
                  <Minus className="size-4" />
                </button>
                <span className="w-7 text-center text-[17px] tabular-nums" aria-live="polite">{qty}</span>
                <button
                  type="button"
                  aria-label="Increase quantity"
                  onClick={() => setQty((q) => Math.min(9, q + 1))}
                  className="grid h-full w-11 place-items-center rounded-r-xl text-[#111111] transition-colors active:bg-black/[0.06]"
                >
                  <Plus className="size-4" />
                </button>
              </div>
              <button
                type="button"
                onClick={add}
                className="h-12 flex-1 rounded-[10px] bg-[#111111] text-[16px] font-medium tracking-[-0.01em] text-white transition-[background-color,transform] duration-100 hover:bg-[#000000] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#111111]"
              >
                <span aria-live="polite">{added ? "Added to Bag" : "Add to Bag"}</span>
              </button>
            </div>
          ) : (
            <div className="mt-7">
              <label htmlFor="notify-email" className="mb-2 block text-[14px] font-medium text-[#111111]">
                Be the first to know when early batches drop
              </label>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (email.trim()) setNotified(true);
                }}
                className="flex flex-col gap-2.5 sm:flex-row"
              >
                <input
                  id="notify-email"
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-12 flex-1 rounded-[10px] border border-[#d9d4cd] bg-white px-4 text-[15px] outline-none transition focus:border-[#111111] focus:ring-1 focus:ring-[#111111]"
                />
                <button
                  type="submit"
                  className="h-12 rounded-[10px] bg-[#111111] px-6 text-[15px] font-medium text-white transition hover:bg-black active:scale-[0.98]"
                >
                  {notified ? "You're on the list!" : "Notify Me"}
                </button>
              </form>
              {notified && (
                <p className="mt-2 text-[13px] text-emerald-700 font-medium">
                  ✓ Thank you! We&apos;ll notify you when early access begins.
                </p>
              )}
            </div>
          )}

          {p.price > 0 ? (
            <dl className="mt-6 grid gap-1 text-[14px] leading-snug">
              <div className="flex gap-2"><dt className="font-semibold">Delivery:</dt><dd className="text-[#6f6a64]">Free standard shipping over $40</dd></div>
              <div className="flex gap-2"><dt className="font-semibold">Guarantee:</dt><dd className="text-[#6f6a64]">30-day happy-hair returns</dd></div>
            </dl>
          ) : (
            <dl className="mt-6 grid gap-1 text-[14px] leading-snug">
              <div className="flex gap-2"><dt className="font-semibold">Status:</dt><dd className="text-[#6f6a64]">In final testing & formulation</dd></div>
              <div className="flex gap-2"><dt className="font-semibold">Release:</dt><dd className="text-[#6f6a64]">Limited first edition batch dropping soon</dd></div>
            </dl>
          )}

          <div className="mt-8 border-t border-[#d9d4cd]">
            {sections.map(([title, body]) => {
              const isOpen = section === title;
              return (
                <div key={title} className="border-b border-[#d9d4cd]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setSection(isOpen ? null : title)}
                    className="flex w-full items-center justify-between py-4 text-left text-[16px] font-semibold tracking-[-0.01em] focus-visible:outline-2 focus-visible:outline-[#111111]"
                  >
                    {title}
                    <ChevronDown className={cn("size-[18px] text-[#6f6a64] transition-transform duration-300", isOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={SPRING} className="overflow-hidden">
                        <div className="pb-5 text-[14.5px] leading-relaxed text-[#111111]/80">{body}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
