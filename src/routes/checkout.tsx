import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
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
  const { lines, subtotal } = useCart();
  const [code, setCode] = useState("");
  const [applied, setApplied] = useState(false);
  const [notice, setNotice] = useState(false);
  const discount = applied ? subtotal * 0.1 : 0;
  const shipping = subtotal >= FREE_SHIPPING_THRESHOLD || subtotal === 0 ? 0 : 4.95;
  const total = subtotal - discount + shipping;

  if (lines.length === 0)
    return (
      <section className="px-5 py-32 text-center">
        <h1 className="text-5xl">Nothing to check out yet</h1>
        <Link to="/shop" className="btn-primary mt-8">Shop the ritual</Link>
      </section>
    );

  return (
    <section className="mx-auto grid max-w-6xl gap-12 px-5 py-16 md:grid-cols-[1fr_400px]">
      <form className="space-y-8" onSubmit={(e) => { e.preventDefault(); setNotice(true); }}>
        <h1 className="flex items-center gap-3 text-5xl">Checkout <Lock className="h-6 w-6 text-primary" /></h1>
        <fieldset className="space-y-3">
          <legend className="mb-3 font-serif text-2xl">Contact</legend>
          <input className="field" type="email" required placeholder="Email address" aria-label="Email" />
        </fieldset>
        <fieldset className="space-y-3">
          <legend className="mb-3 font-serif text-2xl">Shipping address</legend>
          <div className="grid gap-3 sm:grid-cols-2">
            <input className="field" required placeholder="First name" aria-label="First name" />
            <input className="field" required placeholder="Last name" aria-label="Last name" />
          </div>
          <input className="field" required placeholder="Address" aria-label="Address" />
          <div className="grid gap-3 sm:grid-cols-3">
            <input className="field" required placeholder="City" aria-label="City" />
            <input className="field" required placeholder="State" aria-label="State" />
            <input className="field" required placeholder="ZIP" aria-label="ZIP code" />
          </div>
        </fieldset>
        {notice ? (
          <div className="rounded-2xl bg-blush p-6 text-center">
            <p className="font-serif text-2xl">Almost there!</p>
            <p className="mt-2 text-muted-foreground">Payments are being set up and will open very soon. Thank you for your patience, beautiful.</p>
          </div>
        ) : (
          <button className="btn-primary w-full"><Lock className="h-4 w-4" /> Continue to payment · {formatPrice(total)}</button>
        )}
        <p className="text-center text-xs text-muted-foreground">Encrypted & secure · 30-day returns</p>
      </form>

      <aside className="h-fit space-y-5 rounded-2xl bg-cream p-7">
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
        <div className="flex gap-2">
          <input className="field" placeholder="Discount code" value={code} onChange={(e) => setCode(e.target.value)} aria-label="Discount code" />
          <button type="button" className="btn-outline px-5" onClick={() => setApplied(code.trim().toUpperCase() === "WELCOME10")}>Apply</button>
        </div>
        {applied && <p className="text-sm text-primary">WELCOME10 applied — 10% off ✨</p>}
        <div className="space-y-2 border-t pt-4 text-sm">
          <div className="flex justify-between"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
          {applied && <div className="flex justify-between"><span>Discount</span><span>−{formatPrice(discount)}</span></div>}
          <div className="flex justify-between"><span>Shipping</span><span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span></div>
          <div className="flex justify-between pt-2 text-lg font-medium"><span>Total</span><span>{formatPrice(total)}</span></div>
        </div>
      </aside>
    </section>
  );
}
