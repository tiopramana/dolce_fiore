// Used ONLY for images (/uploads). API calls never use this.
const ASSET_BASE_URL =
  import.meta.env.VITE_API_TARGET === "vps"
    ? import.meta.env.VITE_API_VPS
    : import.meta.env.VITE_API_URL;

/**
 * All API requests go to /api on your own domain.
 * Dev:  Vite proxy adds the key.
 * Prod: Vercel function (api/proxy.js) adds the key.
 */
export async function apiFetch(path) {
  const res = await fetch(`/api${path}`);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

/**
 * Build the full image URL from whatever is stored in the DB.
 *
 * "rose.jpg"                  → `${ASSET_BASE_URL}/uploads/rose.jpg`
 * "https://res.cloudinary..." → returned as-is
 */
export function resolveImageUrl(imageUrl) {
  if (!imageUrl) return "/placeholder.png";
  if (imageUrl.startsWith("http")) return imageUrl;
  return `${ASSET_BASE_URL}/uploads/${imageUrl}`;
}
