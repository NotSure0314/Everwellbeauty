import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Check, Lock, Star } from "lucide-react";
import { formatPrice, getProduct, products } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { ProductCard, QtyControl, Reveal, TrustBar } from "@/components/site";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const p = getProduct(params.slug);
    if (!p) throw notFound();
    return { slug: p.slug, name: p.name, tagline: p.tagline };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Everwell Beauty` },
          { name: "description", content: loaderData.tagline },
          { property: "og:title", content: `${loaderData.name} — Everwell Beauty` },
          { property: "og:description", content: loaderData.tagline },
          { property: "og:type", content: "product" },
        ]
      : [{ title: "Product not found — Everwell Beauty" }, { name: "robots", content: "noindex" }],
  }),
  notFoundComponent: () => (
    <div className="px-5 py-32 text-center">
      <h1 className="text-4xl">We couldn't find that product</h1>
      <Link to="/shop" className="btn-primary mt-8">Back to shop</Link>
    </div>
  ),
  component: ProductPage,
});

function ProductPage() {
  const { slug } = Route.useLoaderData();
  const p = getProduct(slug)!;
  const { add, setOpen } = useCart();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState(1);
  const others = products.filter((o) => o.slug !== slug);

  return (
    <>
      <section className="mx-auto grid max-w-7xl gap-10 px-5 py-10 md:grid-cols-2 md:py-16">
        <div>
          <div className={`overflow-hidden rounded-[2rem] ${p.tone === "peach" ? "bg-peach" : "bg-pink"}`}>
            <img key={img} src={p.images[img]} alt={p.name} width={1024} height={1024} className="aspect-square w-full object-cover animate-in fade-in duration-500" />
          </div>
          <div className="mt-4 flex gap-3">
            {p.images.map((src, i) => (
              <button key={src} onClick={() => setImg(i)} aria-label={`View image ${i + 1}`} className={`overflow-hidden rounded-xl border-2 transition ${i === img ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"}`}>
                <img src={src} alt="" className="h-20 w-20 object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        </div>
        <div className="md:pt-6">
          <p className="eyebrow">Everwell ritual</p>
          <h1 className="mt-3 text-4xl leading-tight md:text-5xl">{p.name}</h1>
          <p className="mt-3 font-serif text-xl italic text-primary">{p.tagline}</p>
          <p className="mt-5 text-2xl">{formatPrice(p.price)}</p>
          <div className="mt-6 space-y-4 text-muted-foreground">
            {p.description.map((d) => <p key={d}>{d}</p>)}
          </div>
          <ul className="mt-6 space-y-2">
            {p.details.map((d) => (
              <li key={d} className="flex items-center gap-3 text-sm">
                <Check className="h-4 w-4 text-primary" /> {d}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex items-center gap-4">
            <QtyControl qty={qty} onChange={(n) => setQty(Math.max(1, n))} />
            <button className="btn-primary flex-1" onClick={() => { add(p.slug, qty); setOpen(true); }}>
              Add to bag · {formatPrice(p.price * qty)}
            </button>
          </div>
          <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" /> Secure checkout · Free shipping over $40 · 30-day returns
          </p>
        </div>
      </section>

      <section className="bg-cream">
        <div className="mx-auto max-w-7xl px-5 py-20">
          <Reveal className="text-center">
            <p className="eyebrow">How to use</p>
            <h2 className="mt-4 text-4xl">Your ritual, step by step</h2>
          </Reveal>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {p.steps.map((s, i) => (
              <Reveal key={s.title} delay={i * 100} className="rounded-2xl bg-card p-7">
                <p className="font-serif text-5xl text-primary">0{i + 1}</p>
                <h3 className="mt-3 text-2xl">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-3xl px-5 py-20">
        <h2 className="text-center text-4xl">Questions, answered</h2>
        <div className="mt-10 divide-y border-y">
          {p.faqs.map((f) => (
            <details key={f.q} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between font-serif text-xl">
                {f.q}
                <span className="text-primary transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-muted-foreground">{f.a}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="bg-blush">
        <div className="mx-auto max-w-3xl px-5 py-20 text-center">
          <div className="flex justify-center gap-1 text-primary">
            {[0, 1, 2, 3, 4].map((i) => <Star key={i} className="h-5 w-5" />)}
          </div>
          <h2 className="mt-4 text-4xl">Customer reviews</h2>
          <p className="mt-4 text-muted-foreground">No reviews yet — you could be the very first. We'd love to hear how your ritual feels.</p>
          <Link to="/contact" className="btn-outline mt-8">Write a review</Link>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16"><TrustBar /></section>

      {others.length > 0 && (
        <section className="mx-auto max-w-7xl px-5 pb-24">
          <h2 className="text-center text-4xl">Complete your ritual</h2>
          <div className="mx-auto mt-10 grid max-w-xl gap-12">
            {others.map((o) => <ProductCard key={o.slug} slug={o.slug} />)}
          </div>
        </section>
      )}
    </>
  );
}
