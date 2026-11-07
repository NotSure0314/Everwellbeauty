import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock, X } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct } from "@/lib/products";
import { QtyControl, ShippingProgress } from "@/components/site";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Bag — Everwell Beauty" },
      { name: "description", content: "Review the items in your Everwell Beauty bag." },
      { property: "og:title", content: "Your Bag — Everwell Beauty" },
      { property: "og:description", content: "Review your bag and check out securely." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const { lines, setQty, remove, subtotal } = useCart();
  if (lines.length === 0)
    return (
      <section className="px-5 py-32 text-center">
        <h1 className="text-5xl">Your bag is empty</h1>
        <p className="mt-4 text-muted-foreground">Something lovely is waiting for you.</p>
        <Link to="/shop" className="btn-primary mt-8">Shop the ritual</Link>
      </section>
    );
  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1fr_380px]">
      <div>
        <h1 className="text-5xl">Your bag</h1>
        <ul className="mt-8 divide-y border-y">
          {lines.map((l) => {
            const p = getProduct(l.slug);
            if (!p) return null;
            return (
              <li key={l.slug} className="flex gap-5 py-6">
                <img src={p.images[0]} alt={p.name} className="h-28 w-28 rounded-xl object-cover" loading="lazy" />
                <div className="flex flex-1 flex-col justify-between">
                  <div className="flex justify-between gap-3">
                    <Link to="/products/$slug" params={{ slug: p.slug }} className="font-serif text-xl">{p.name}</Link>
                    <button onClick={() => remove(p.slug)} aria-label="Remove"><X className="h-4 w-4" /></button>
                  </div>
                  <div className="flex items-center justify-between">
                    <QtyControl qty={l.qty} onChange={(n) => setQty(p.slug, n)} />
                    <span>{formatPrice(p.price * l.qty)}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <aside className="h-fit space-y-5 rounded-2xl bg-cream p-7">
        <ShippingProgress subtotal={subtotal} />
        <div className="flex justify-between text-lg"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
        <p className="text-sm text-muted-foreground">Shipping and discounts calculated at checkout.</p>
        <Link to="/checkout" className="btn-primary w-full"><Lock className="h-4 w-4" /> Secure checkout</Link>
      </aside>
    </section>
  );
}
