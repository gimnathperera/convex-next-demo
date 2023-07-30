import { query } from "./_generated/server";

export const getProducts = query({
  args: {},
  handler: async (ctx) => {
    const products = await ctx.db.query("products").collect();
    return Promise.all(
      products.map(async (product) => ({
        ...product,
        ...(product.imageId
          ? { url: await ctx.storage.getUrl(product.imageId) }
          : {}),
      }))
    );
  },
});
