// Base URL — in development points to your local Fastify server
// When you go live, change this to your production domain
const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

/**
 * Base fetch wrapper — handles errors consistently
 */
export async function apiFetch(path) {
  const res = await fetch(`${BASE_URL}/api${path}`);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

/**
 * Helper — build the full image URL from whatever is stored in the DB.
 *
 * Development : image_url = "rose-bouquet.jpg"
 *               → served from your React public/uploads/ folder
 *
 * Production  : image_url = "https://res.cloudinary.com/yourshop/rose.jpg"
 *               → already a full URL, returned as-is
 */
export function resolveImageUrl(imageUrl) {
  if (!imageUrl) return "/placeholder.png";
  if (imageUrl.startsWith("http")) return imageUrl; // already a full URL (production)
  return `/uploads/${imageUrl}`; // local dev — served from public/uploads/
}
