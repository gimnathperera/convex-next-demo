import { mutation, query } from "./_generated/server";
import { asyncMap, getAll } from "./lib/relationships";
import { v } from "convex/values";

export const createOutfit = mutation({
  args: { title: v.string(), products: v.array(v.id("products")) },
  handler: async ({ db }, { title, products }) => {
    await db.insert("outfits", { title, products });
  },
});

export const getOutfits = query(async ({ db, storage }) => {
  const outfits = await db.query("outfits").order("desc").take(10);

  return await asyncMap(outfits, async (outfit) => {
    const products = await getAll(db, outfit.products);
    return {
      ...outfit,
      products: await asyncMap(products, async (product) => ({
        ...product,
        url: await storage.getUrl(product?.imageId ?? ""),
      })),
    };
  });
});

export const deleteOutfit = mutation({
  args: { id: v.id("outfits") },
  handler: async ({ db }, args) => {
    await db.delete(args.id);
  },
});
