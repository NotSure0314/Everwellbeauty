import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { Menu, Minus, Plus, ShoppingBag, X, Lock, Truck, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/lib/cart";
import { formatPrice, getProduct, FREE_SHIPPING_THRESHOLD } from "@/lib/products";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link to="/" className={`flex flex-col items-center leading-none ${className}`} aria-label="Everwell Beauty home">
      <span className="font-serif text-2xl tracking-[0.18em] md:text-3xl">EVERWELL</span>
      <span className="mt-1 text-[0.6rem] tracking-[0.5em] text-primary">BEAUTY</span>
    </Link>
  );
}

export function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add("is-visible");
          io.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <div ref={ref} className={`reveal ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

const nav = [
  { to: "/shop", label: "Shop" },
  { to: "/about", label: "Our Story" },
  { to: "/help", label: "Shipping & FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  const { count, setOpen } = useCart();
  const [menu, setMenu] = useState(false);
  return (
    <>
      <div className="bg-espresso px-4 py-2 text-center text-xs tracking-[0.15em] text-cream">
        Free shipping on orders over ${FREE_SHIPPING_THRESHOLD} · 30-day happy-hair returns
      </div>
      <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto grid max-w-7xl grid-cols-3 items-center px-5 py-4">
          <div>
            <button className="md:hidden" onClick={() => setMenu(true)} aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
            <nav className="hidden gap-7 text-sm md:flex">
              {nav.slice(0, 2).map((n) => (
                <Link key={n.to} to={n.to} className="link-underline" activeProps={{ className: "text-primary" }}>
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
          <Logo />
          <div className="flex items-center justify-end gap-7 text-sm">
            <nav className="hidden gap-7 md:flex">
              {nav.slice(2).map((n) => (
                <Link key={n.to} to={n.to} className="link-underline" activeProps={{ className: "text-primary" }}>
                  {n.label}
                </Link>
              ))}
            </nav>
            <button onClick={() => setOpen(true)} className="relative" aria-label={`Open bag, ${count} items`}>
              <ShoppingBag className="h-6 w-6" />
              {count > 0 && (
                <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[0.65rem] text-primary-foreground">
                  {count}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>
      {menu && (
        <div className="fixed inset-0 z-50 bg-gradient-soft p-6 animate-in fade-in md:hidden">
          <div className="flex justify-end">
            <button onClick={() => setMenu(false)} aria-label="Close menu">
              <X className="h-7 w-7" />
            </button>
          </div>
          <nav className="mt-12 flex flex-col items-center gap-8 font-serif text-4xl">
            <Link to="/" onClick={() => setMenu(false)}>Home</Link>
            {nav.map((n) => (
              <Link key={n.to} to={n.to} onClick={() => setMenu(false)}>
                {n.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
      <CartDrawer />
    </>
  );
}

export function QtyControl({ qty, onChange }: { qty: number; onChange: (n: number) => void }) {
  return (
    <div className="inline-flex items-center rounded-full border">
      <button className="p-2.5" onClick={() => onChange(qty - 1)} aria-label="Decrease quantity">
        <Minus className="h-3.5 w-3.5" />
      </button>
      <span className="w-6 text-center text-sm">{qty}</span>
      <button className="p-2.5" onClick={() => onChange(qty + 1)} aria-label="Increase quantity">
        <Plus className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

export function ShippingProgress({ subtotal }: { subtotal: number }) {
  const left = FREE_SHIPPING_THRESHOLD - subtotal;
  const pct = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);
  return (
    <div>
      <p className="text-sm">
        {left > 0 ? <>You're <strong className="font-medium">{formatPrice(left)}</strong> away from free shipping</> : "You've unlocked free shipping ✨"}
      </p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-blush">
        <div className="h-full rounded-full bg-primary transition-all duration-700" style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}

function CartDrawer() {
  const { open, setOpen, lines, setQty, subtotal } = useCart();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-espresso/30 animate-in fade-in" onClick={() => setOpen(false)} />
      <aside className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-background shadow-soft animate-in slide-in-from-right duration-300">
        <div className="flex items-center justify-between border-b p-5">
          <h2 className="text-2xl">Your bag</h2>
          <button onClick={() => setOpen(false)} aria-label="Close bag">
            <X className="h-6 w-6" />
          </button>
        </div>
        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-5 p-8 text-center">
            <p className="font-serif text-2xl">Your bag is waiting for something lovely.</p>
            <Link to="/shop" className="btn-primary" onClick={() => setOpen(false)}>Explore the ritual</Link>
          </div>
        ) : (
          <>
            <div className="border-b bg-cream p-5"><ShippingProgress subtotal={subtotal} /></div>
            <ul className="flex-1 space-y-5 overflow-y-auto p-5">
              {lines.map((l) => {
                const p = getProduct(l.slug);
                if (!p) return null;
                return (
                  <li key={l.slug} className="flex gap-4">
                    <img src={p.images[0]} alt={p.name} className="h-24 w-24 rounded-lg object-cover" loading="lazy" />
                    <div className="flex flex-1 flex-col justify-between">
                      <div className="flex justify-between gap-2">
                        <p className="font-serif text-lg leading-tight">{p.name}</p>
                        <p className="text-sm">{formatPrice(p.price * l.qty)}</p>
                      </div>
                      <QtyControl qty={l.qty} onChange={(n) => setQty(l.slug, n)} />
                    </div>
                  </li>
                );
              })}
            </ul>
            <div className="space-y-4 border-t p-5">
              <div className="flex justify-between text-lg">
                <span>Subtotal</span>
                <span className="font-medium">{formatPrice(subtotal)}</span>
              </div>
              <Link to="/checkout" className="btn-primary w-full" onClick={() => setOpen(false)}>
                <Lock className="h-4 w-4" /> Secure checkout
              </Link>
              <Link to="/cart" className="block text-center text-sm underline" onClick={() => setOpen(false)}>View full bag</Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}

export function TrustBar() {
  const items = [
    { icon: Truck, title: "Free shipping over $40", body: "Ships in 1–2 business days" },
    { icon: RotateCcw, title: "30-day returns", body: "Love it or send it back" },
    { icon: Lock, title: "Secure checkout", body: "Encrypted, private payments" },
  ];
  return (
    <div className="grid gap-6 sm:grid-cols-3">
      {items.map(({ icon: Icon, title, body }) => (
        <div key={title} className="flex items-center gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-blush text-primary">
            <Icon className="h-5 w-5" />
          </span>
          <div>
            <p className="font-medium">{title}</p>
            <p className="text-sm text-muted-foreground">{body}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section className="bg-gradient-soft px-5 py-24">
      <Reveal className="mx-auto max-w-xl text-center">
        <p className="eyebrow">Join the ritual</p>
        <h2 className="mt-4 text-4xl md:text-5xl">A little gift, just for you</h2>
        <p className="mt-4 text-muted-foreground">Sign up for gentle hair-care tips and early access — and enjoy 10% off your first order.</p>
        {done ? (
          <p className="mt-8 font-serif text-2xl">Welcome in, beautiful. Use code <strong className="text-primary">WELCOME10</strong> at checkout.</p>
        ) : (
          <form
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (!/^\S+@\S+\.\S+$/.test(email)) return toast.error("Please enter a valid email.");
              setDone(true);
            }}
          >
            <input className="field" type="email" required placeholder="Your email address" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email address" />
            <button className="btn-primary shrink-0">Get 10% off</button>
          </form>
        )}
      </Reveal>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="bg-espresso px-5 py-16 text-cream">
      <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <p className="font-serif text-3xl tracking-[0.18em]">EVERWELL</p>
          <p className="mt-3 max-w-sm text-sm opacity-80">Gentle hair rituals for women who deserve a moment of calm — and already know they're beautiful.</p>
        </div>
        <div className="space-y-2 text-sm">
          <p className="mb-3 text-xs tracking-[0.25em] opacity-70">SHOP</p>
          <Link to="/shop" className="block link-underline w-fit">All products</Link>
          <Link to="/about" className="block link-underline w-fit">Our story</Link>
          <Link to="/help" className="block link-underline w-fit">Shipping & returns</Link>
        </div>
        <div className="space-y-2 text-sm">
          <p className="mb-3 text-xs tracking-[0.25em] opacity-70">SAY HELLO</p>
          <a href="mailto:hello@everwellbeauty.com" className="block link-underline w-fit">hello@everwellbeauty.com</a>
          <p className="opacity-80">Mon–Fri, 9am–5pm CT</p>
          <Link to="/contact" className="block link-underline w-fit">Contact us</Link>
        </div>
      </div>
      <p className="mx-auto mt-12 max-w-7xl border-t border-cream/20 pt-6 text-xs opacity-70">© {new Date().getFullYear()} Everwell Beauty. Made with love.</p>
    </footer>
  );
}

export function ProductCard({ slug }: { slug: string }) {
  const p = getProduct(slug)!;
  const { add, setOpen } = useCart();
  return (
    <div className="group">
      <Link to="/products/$slug" params={{ slug }} className={`block overflow-hidden rounded-2xl ${p.tone === "peach" ? "bg-peach" : "bg-pink"}`}>
        <img src={p.images[0]} alt={p.name} width={1024} height={1024} loading="lazy" className="img-zoom aspect-square w-full object-cover group-hover:scale-105" />
      </Link>
      <div className="mt-5 flex items-start justify-between gap-4">
        <div>
          <Link to="/products/$slug" params={{ slug }} className="font-serif text-2xl leading-tight">{p.name}</Link>
          <p className="mt-1 text-sm text-muted-foreground">{p.tagline}</p>
        </div>
        <p className="text-lg">{formatPrice(p.price)}</p>
      </div>
      <button
        className="btn-outline mt-5 w-full"
        onClick={() => {
          add(slug);
          setOpen(true);
        }}
      >
        Add to bag
      </button>
    </div>
  );
}
