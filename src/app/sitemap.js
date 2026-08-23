import { PRODUCTS } from "@/lib/products";
import { RECIPES } from "@/lib/recipes";

const BASE = "https://sundermasala.com";

export default function sitemap() {
  const now = new Date();

  const staticRoutes = [
    { url: "", priority: 1, changeFrequency: "weekly" },
    { url: "/shop", priority: 0.9, changeFrequency: "weekly" },
    { url: "/story", priority: 0.7, changeFrequency: "monthly" },
    { url: "/recipes", priority: 0.8, changeFrequency: "monthly" },
    { url: "/faq", priority: 0.6, changeFrequency: "monthly" },
  ].map((r) => ({
    url: `${BASE}${r.url}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }));

  const productRoutes = PRODUCTS.map((p) => ({
    url: `${BASE}/shop/${p.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  /* One entry per dish. These are the pages that bring people who have never
     heard of the brand, so they are worth as much as a product page. */
  const recipeRoutes = RECIPES.map((r) => ({
    url: `${BASE}/recipes/${r.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticRoutes, ...productRoutes, ...recipeRoutes];
}
