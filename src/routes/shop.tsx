import { createFileRoute } from "@tanstack/react-router";
import { products } from "@/lib/products";
import { ProductCard, Reveal, TrustBar } from "@/components/site";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — Everwell Beauty" },
      { name: "description", content: "Shop the Everwell collection: rollerball scalp oil comb and silk heatless curler." },
      { property: "og:title", content: "Shop — Everwell Beauty" },
      { property: "og:description", content: "Gentle haircare tools for a calm, luxurious ritual." },
    ],
  }),
  component: Shop,
});

function Shop() {
  return (
    <>
      <section className="bg-gradient-peach px-5 py-20 text-center">
        <p className="eyebrow">The collection</p>
        <h1 className="mt-4 text-5xl md:text-6xl">Everything your ritual needs</h1>
        <p className="mx-auto mt-4 max-w-md text-muted-foreground">Thoughtfully made tools that turn everyday hair care into a moment of calm.</p>
      </section>
      <section className="mx-auto grid max-w-md md:max-w-4xl gap-6 sm:gap-8 px-5 py-14 md:py-20 md:grid-cols-2">
        {products.map((p, i) => (
          <Reveal key={p.slug} delay={i * 120}>
            <ProductCard slug={p.slug} />
          </Reveal>
        ))}
      </section>
      <section className="mx-auto max-w-7xl px-5 pb-20"><TrustBar /></section>
    </>
  );
}
