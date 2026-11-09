import { describe, expect, it } from "vitest";
import { DEFAULT_PRODUCTS } from "@/components/ui/skincare-product-shelf";

describe("Product Shelf Customization", () => {
  it("has exactly 4 products for the single top shelf", () => {
    expect(DEFAULT_PRODUCTS).toHaveLength(4);
  });

  it("features Rollerball Scalp Comb as the first ritual", () => {
    const item = DEFAULT_PRODUCTS[0];
    expect(item?.id).toBe("scalp-oil-comb");
    expect(item?.kind).toBe("comb");
    expect(item?.short).toBe("Scalp Oil Comb");
    expect(item?.price).toBe(21.99);
  });

  it("features Wire-Free Side-Sleeper Heatless Curler as the second ritual", () => {
    const item = DEFAULT_PRODUCTS[1];
    expect(item?.id).toBe("heatless-curler");
    expect(item?.kind).toBe("curler");
    expect(item?.short).toBe("Heatless Curler");
    expect(item?.price).toBe(28.99);
  });

  it("features two 'Coming Soon' products for the remaining slots", () => {
    const item3 = DEFAULT_PRODUCTS[2];
    const item4 = DEFAULT_PRODUCTS[3];
    expect(item3?.short).toBe("Coming Soon");
    expect(item3?.price).toBe(0);
    expect(item4?.short).toBe("Coming Soon");
    expect(item4?.price).toBe(0);
  });
});
