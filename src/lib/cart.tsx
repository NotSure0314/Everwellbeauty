import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getProduct } from "./products";

type Line = { slug: string; qty: number };
type Cart = {
  lines: Line[];
  count: number;
  subtotal: number;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
};

const CartContext = createContext<Cart | null>(null);
const KEY = "everwell-cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setLines(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (loaded) localStorage.setItem(KEY, JSON.stringify(lines));
  }, [lines, loaded]);

  const add = (slug: string, qty = 1) =>
    setLines((ls) => {
      const found = ls.find((l) => l.slug === slug);
      return found
        ? ls.map((l) => (l.slug === slug ? { ...l, qty: l.qty + qty } : l))
        : [...ls, { slug, qty }];
    });
  const setQty = (slug: string, qty: number) =>
    setLines((ls) => (qty <= 0 ? ls.filter((l) => l.slug !== slug) : ls.map((l) => (l.slug === slug ? { ...l, qty } : l))));
  const remove = (slug: string) => setLines((ls) => ls.filter((l) => l.slug !== slug));

  const count = lines.reduce((s, l) => s + l.qty, 0);
  const subtotal = lines.reduce((s, l) => s + (getProduct(l.slug)?.price ?? 0) * l.qty, 0);

  return (
    <CartContext.Provider value={{ lines, count, subtotal, add, setQty, remove, clear: () => setLines([]), open, setOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const c = useContext(CartContext);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
