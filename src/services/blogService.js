import { apiFetch } from "./api";

export async function getBlog(categorySlug = "") {
  const query = categorySlug ? `?category=${categorySlug}` : "";
  return apiFetch(`/news${query}`);
}

export async function getBlogById(id) {
  return apiFetch(`/news/${id}`);
}
