import { apiFetch } from "./api";

export async function getBlog(categorySlug = "") {
  const query = categorySlug ? `?category=${categorySlug}` : "";
  return apiFetch(`/blog${query}`);
}

export async function getBlogById(id) {
  return apiFetch(`/blog/${id}`);
}
