import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import curls from "@/assets/curls-lifestyle.jpg";
import { products } from "@/lib/products";
import { Newsletter, ProductCard, Reveal, TrustBar } from "@/components/site";
import StickerSwapHeadline, { type StickerWord } from "@/components/ui/sticker-swap-headline";
import { words as demoWords } from "@/components/ui/demo";

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

      <section className="mx-auto max-w-6xl px-5 py-16 md:py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The collection</p>
          <h2 className="mt-3 text-3xl md:text-4xl">Two small rituals, one beautiful feeling</h2>
        </Reveal>
        <div className="mt-12 grid gap-8 sm:gap-10 md:grid-cols-2 max-w-md md:max-w-4xl lg:max-w-5xl mx-auto">
          {products.map((p, i) => (
            <Reveal key={p.slug} delay={i * 150}>
              <ProductCard slug={p.slug} />
            </Reveal>
          ))}
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

      <section className="mx-auto max-w-5xl px-5 py-24">
        <Reveal className="text-center">
          <p className="eyebrow">Kind words</p>
          <h2 className="mt-4 text-4xl md:text-5xl">From our community</h2>
          <p className="mx-auto mt-6 max-w-lg text-muted-foreground">
            We're a brand-new brand, and our first reviews are on their way. Tried a ritual? We'd love to hear how it made you feel.
          </p>
          <Link to="/contact" className="btn-outline mt-8">Share your story</Link>
        </Reveal>
      </section>

      <Newsletter />
    </>
  );
}
