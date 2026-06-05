import { apiFetch } from "./api";

/**
 * Fetch all categories (id, name, slug).
 */
export async function getCategories() {
  return apiFetch("/categories");
}
