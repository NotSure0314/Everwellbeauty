import { describe, expect, it } from "vitest";
import { DEFAULT_PRODUCTS } from "@/components/ui/skincare-product-shelf";

describe("Product Shelf Customization with 3D Studio Packaging", () => {
  it("has exactly 4 products for the single top shelf", () => {
    expect(DEFAULT_PRODUCTS).toHaveLength(4);
  });

  it("features Scalp Treatment Oil Infuser Comb as the first ritual", () => {
    const item = DEFAULT_PRODUCTS[0];
    expect(item?.id).toBe("scalp-oil-comb");
    expect(item?.kind).toBe("comb");
    expect(item?.short).toBe("Scalp Oil Comb");
    expect(item?.price).toBe(21.99);
  });

  it("features Wire-Free Heatless Curler Set as the second ritual", () => {
    const item = DEFAULT_PRODUCTS[1];
    expect(item?.id).toBe("heatless-curler");
    expect(item?.kind).toBe("curler");
    expect(item?.short).toBe("Heatless Curler");
    expect(item?.price).toBe(28.99);
  });

  it("features two 'Coming Soon' products for slots 3 and 4", () => {
    const item3 = DEFAULT_PRODUCTS[2];
    const item4 = DEFAULT_PRODUCTS[3];
    expect(item3?.short).toBe("Coming Soon");
    expect(item3?.price).toBe(0);
    expect(item4?.short).toBe("Coming Soon");
    expect(item4?.price).toBe(0);
  });

  it("provides multiple product gallery images for both active products", () => {
    const comb = DEFAULT_PRODUCTS[0];
    const curler = DEFAULT_PRODUCTS[1];
    expect(comb?.images).toBeDefined();
    expect(comb?.images?.length).toBeGreaterThanOrEqual(3);
    expect(curler?.images).toBeDefined();
    expect(curler?.images?.length).toBeGreaterThanOrEqual(3);
  });
});
