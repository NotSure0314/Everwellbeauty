import { createFileRoute, Link } from "@tanstack/react-router";
import hero from "@/assets/hero.jpg";
import curls from "@/assets/curls-lifestyle.jpg";
import { products } from "@/lib/products";
import { Newsletter, ProductCard, Reveal, TrustBar } from "@/components/site";

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
      <section className="relative overflow-hidden bg-cream">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-12 md:grid-cols-2 md:py-20">
          <div className="order-2 md:order-1">
            <p className="eyebrow animate-in fade-in slide-in-from-bottom-2 duration-700">The Everwell ritual</p>
            <h1 className="mt-5 text-5xl leading-[1.05] animate-in fade-in slide-in-from-bottom-4 duration-1000 md:text-7xl">
              You're already beautiful. <em className="text-primary">Let your hair feel it too.</em>
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground animate-in fade-in duration-1000">
              Gentle tools for a slower, softer hair routine — made for the moments you keep just for yourself.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/shop" className="btn-primary">Shop the ritual</Link>
              <Link to="/about" className="btn-outline">Our story</Link>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <img src={hero} alt="Woman with soft, glossy waves smiling with eyes closed" width={1536} height={1024} className="aspect-[4/5] w-full rounded-[2rem] object-cover shadow-soft md:aspect-[4/5]" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-14">
        <TrustBar />
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow">The collection</p>
          <h2 className="mt-4 text-4xl md:text-5xl">Two small rituals, one beautiful feeling</h2>
        </Reveal>
        <div className="mt-14 grid gap-12 md:grid-cols-2">
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
