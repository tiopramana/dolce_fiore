import { apiFetch } from "./api";

/**
 * Fetch all available products.
 * Optionally filter by category slug: getProducts("bouquet")
 */
export async function getProducts(categorySlug = "") {
  const query = categorySlug ? `?category=${categorySlug}` : "";
  return apiFetch(`/products${query}`);
}

/**
 * Fetch a single product by its id.
 */
export async function getProductById(id) {
  return apiFetch(`/products/${id}`);
}
