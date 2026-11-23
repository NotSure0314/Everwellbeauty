import type { ReactNode } from "react";
import { toast } from "sonner";
import { useCartStore } from "@/stores/cartStore";
import { useCartSync } from "@/hooks/useCartSync";
import { fetchProductByHandle } from "./shopify";
import { getProduct, products } from "./products";

// Thin layer over the Shopify-synced cart store, keyed by our product slugs.
export function CartProvider({ children }: { children: ReactNode }) {
  useCartSync();
  return <>{children}</>;
}

const slugForHandle = (handle: string) => products.find((p) => p.handle === handle)?.slug ?? handle;

export function useCart() {
  const store = useCartStore();
  const lines = store.items.map((i) => ({ slug: slugForHandle(i.product.node.handle), qty: i.quantity, variantId: i.variantId }));
  const count = store.items.reduce((s, i) => s + i.quantity, 0);
  const subtotal = store.items.reduce((s, i) => s + parseFloat(i.price.amount) * i.quantity, 0);
  const variantFor = (slug: string) => lines.find((l) => l.slug === slug)?.variantId;

  const add = async (slug: string, qty = 1) => {
    const local = getProduct(slug);
    if (!local) return;
    try {
      const node = await fetchProductByHandle(local.handle);
      const variant = node?.variants.edges[0]?.node;
      if (!node || !variant) {
        toast.error("This item isn't available right now.");
        return;
      }
      await store.addItem({
        product: { node },
        variantId: variant.id,
        variantTitle: variant.title,
        price: variant.price,
        quantity: qty,
        selectedOptions: variant.selectedOptions,
      });
    } catch (e) {
      console.error(e);
      toast.error("Couldn't add to bag. Please try again.");
    }
  };
  const setQty = (slug: string, qty: number) => {
    const v = variantFor(slug);
    if (v) void store.updateQuantity(v, qty);
  };
  const remove = (slug: string) => {
    const v = variantFor(slug);
    if (v) void store.removeItem(v);
  };

  return {
    lines,
    count,
    subtotal,
    add,
    setQty,
    remove,
    clear: store.clearCart,
    open: store.drawerOpen,
    setOpen: store.setDrawerOpen,
    checkoutUrl: store.checkoutUrl,
    busy: store.isLoading || store.isSyncing,
  };
}
