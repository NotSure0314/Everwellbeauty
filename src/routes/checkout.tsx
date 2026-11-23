import { createFileRoute, Link } from "@tanstack/react-router";
import { Lock } from "lucide-react";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct, FREE_SHIPPING_THRESHOLD } from "@/lib/products";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Everwell Beauty" },
      { name: "description", content: "Secure checkout for your Everwell Beauty order." },
      { property: "og:title", content: "Checkout — Everwell Beauty" },
      { property: "og:description", content: "Secure checkout for your Everwell Beauty order." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const { lines, subtotal, checkoutUrl, busy } = useCart();
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 4.95;

  if (lines.length === 0)
    return (
      <section className="px-5 py-32 text-center">
        <h1 className="text-5xl">Nothing to check out yet</h1>
        <Link to="/shop" className="btn-primary mt-8">Shop the ritual</Link>
      </section>
    );

  return (
    <section className="mx-auto max-w-xl px-5 py-16">
      <h1 className="flex items-center gap-3 text-5xl">Checkout <Lock className="h-6 w-6 text-primary" /></h1>
      <div className="mt-8 space-y-5 rounded-2xl bg-cream p-7">
        <h2 className="text-2xl">Order summary</h2>
        <ul className="space-y-4">
          {lines.map((l) => {
            const p = getProduct(l.slug);
            if (!p) return null;
            return (
              <li key={l.slug} className="flex items-center gap-4">
                <img src={p.images[0]} alt={p.name} className="h-16 w-16 rounded-lg object-cover" loading="lazy" />
                <span className="flex-1 text-sm">{p.short} × {l.qty}</span>
                <span className="text-sm">{formatPrice(p.price * l.qty)}</span>
              </li>
            );
          })}
        </ul>
        <div className="space-y-2 border-t pt-4 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          <div className="flex justify-between"><span>Shipping (estimate)</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
        </div>
        <button
          className="btn-primary w-full"
          disabled={!checkoutUrl || busy}
          onClick={() => checkoutUrl && window.open(checkoutUrl, "_blank")}
        >
          <Lock className="h-4 w-4" /> Continue to secure payment
        </button>
        <p className="text-center text-xs text-muted-foreground">You'll finish on Shopify's secure checkout. Discount codes, shipping and taxes are applied there.</p>
      </div>
    </section>
  );
}
