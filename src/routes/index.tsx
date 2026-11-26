import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import curls from "@/assets/curls-lifestyle.jpg";
import combMain from "@/assets/comb-main.jpg";
import curlerMain from "@/assets/curler-main.jpg";
import { products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { Newsletter, Reveal, TrustBar } from "@/components/site";
import StickerSwapHeadline, { type StickerWord } from "@/components/ui/sticker-swap-headline";
import { words as demoWords } from "@/components/ui/hero-words";
import { ProductCard, type ProductVariantGroup } from "@/components/ui/product-card";
import { MarqueeTestimonials } from "@/components/ui/marquee-card";
import { Star } from "lucide-react";

const heroWords: StickerWord[] = [
  ...demoWords,
  {
    word: "Glowing",
    alt: "Everwell hair ritual",
    sticker: hero,
    tilt: 6,
  },
  {
    word: "Soft",
    alt: "Soft heatless curls",
    sticker: curls,
    tilt: -7,
  },
];

const combVariants: ProductVariantGroup[] = [
  {
    name: "Model",
    options: [{ value: "Crystal Clear", label: "Crystal Clear Acrylic" }],
  },
];

const curlerVariants: ProductVariantGroup[] = [
  {
    name: "Color",
    options: [
      { value: "Blush Silk", label: "Blush Silk", swatch: "#f3d1cf" },
      { value: "Champagne", label: "Champagne Silk", swatch: "#f5e8d8" },
    ],
  },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Everwell Beauty — Feel Beautiful, Every Day" },
      { name: "description", content: "Calm, luxurious hair rituals: a rollerball scalp oil comb and a silk heatless curler for soft overnight curls." },
      { property: "og:title", content: "Everwell Beauty — Feel Beautiful, Every Day" },
      { property: "og:description", content: "Calm, luxurious hair rituals for women who deserve a moment for themselves." },
    ],
  }),
  component: Home,
});

function Home() {
  const { add, setOpen } = useCart();

  return (
    <>
      <StickerSwapHeadline
        lead="Stay"
        words={heroWords}
        description="Gentle tools for a slower, softer hair routine — made for the moments you keep just for yourself."
        primaryCta={{ label: "Shop the ritual", href: "/shop" }}
        secondaryCta={{ label: "Our story", href: "/about" }}
        paper="#fbf8f2"
        ink="#2c1810"
        accent="#c86d56"
        height="min(82svh, 800px)"
      />

      <section className="mx-auto max-w-7xl px-5 py-14">
        <TrustBar />
      </section>

      <section className="py-16 md:py-24">
        <Reveal className="mx-auto max-w-2xl px-5 text-center mb-12">
          <p className="eyebrow">The collection</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Curated Hair Rituals</h2>
          <p className="mt-3 text-muted-foreground text-sm sm:text-base">
            Thoughtfully crafted tools designed for gentle, effortless hair care. Select options and add directly to your ritual.
          </p>
        </Reveal>

        <div className="mx-auto max-w-4xl px-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal delay={100}>
              <ProductCard
                title="Rollerball Scalp Oil Applicator Comb"
                merchant="Everwell Rituals"
                href="/products/rollerball-scalp-oil-comb"
                image={combMain}
                imageAlt="Crystal-clear rollerball scalp oil applicator comb"
                badge="Bestseller"
                price={28.0}
                salePrice={21.99}
                currency="USD"
                rating={4.9}
                reviewCount={1420}
                variants={combVariants}
                stock="in-stock"
                shipping="Free standard shipping · In stock"
                onAddToCart={async () => {
                  add("rollerball-scalp-oil-comb", 1);
                  setOpen(true);
                  await new Promise((r) => setTimeout(r, 450));
                }}
              />
            </Reveal>

            <Reveal delay={200}>
              <ProductCard
                title="Wire-Free Side-Sleeper Heatless Curler Set"
                merchant="Everwell Rituals"
                href="/products/silk-heatless-curler"
                image={curlerMain}
                imageAlt="Blush mulberry silk wire-free heatless curler set"
                badge="Customer Favorite"
                price={36.0}
                salePrice={28.99}
                currency="USD"
                rating={4.9}
                reviewCount={2180}
                variants={curlerVariants}
                defaultSelection={{ Color: "Blush Silk" }}
                stock="in-stock"
                shipping="Free standard shipping · In stock"
                onAddToCart={async () => {
                  add("silk-heatless-curler", 1);
                  setOpen(true);
                  await new Promise((r) => setTimeout(r, 450));
                }}
              />
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-blush">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 md:grid-cols-2">
          <Reveal>
            <img src={curls} alt="Woman smiling with soft heatless curls" width={1024} height={1024} loading="lazy" className="aspect-square w-full rounded-[2rem] object-cover" />
          </Reveal>
          <Reveal delay={150}>
            <p className="eyebrow">Overnight, effortlessly</p>
            <h2 className="mt-4 text-4xl md:text-5xl">Wake up to curls that feel like you</h2>
            <p className="mt-5 text-lg text-muted-foreground">
              Wrap, rest, and unwrap soft, bouncy curls — no heat, no wires, no fuss. Our silk curler stays comfy even when you sleep on your side.
            </p>
            <Link to="/products/$slug" params={{ slug: "silk-heatless-curler" }} className="btn-primary mt-8">Meet the curler</Link>
          </Reveal>
        </div>
      </section>

      <section className="py-24 overflow-hidden bg-[#faf7f2]/60">
        <div className="mx-auto max-w-5xl px-5 text-center mb-8">
          <Reveal>
            <div className="inline-flex items-center gap-1.5 rounded-full bg-white px-3.5 py-1 text-xs font-medium text-primary shadow-sm border border-[#ede5db] mb-3">
              <div className="flex text-[#d4974f]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </div>
              <span>4.9 / 5 from 3,600+ verified rituals</span>
            </div>
            <p className="eyebrow">Real experiences</p>
            <h2 className="mt-3 text-4xl md:text-5xl">Loved by real morning rituals</h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground text-sm sm:text-base">
              Verified experiences and real results from people using our hair tools every morning and night.
            </p>
          </Reveal>
        </div>

        <MarqueeTestimonials speed="normal" />

        <div className="text-center mt-8">
          <Link to="/shop" className="btn-outline">Shop all customer favorites</Link>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
