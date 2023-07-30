import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    imageId: v.string(),
    price: v.float64(),
    title: v.string(),
  }),
  outfits: defineTable({
    title: v.string(),
    products: v.array(v.id("products")),
  }),
});
