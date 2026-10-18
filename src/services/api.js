const BASE_URL =
  import.meta.env.VITE_API_TARGET === "vps"
    ? import.meta.env.VITE_API_VPS
    : import.meta.env.VITE_API_URL;

/**
 * Base fetch wrapper
 */
export async function apiFetch(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const res = await fetch(`${BASE_URL}/api${normalizedPath}`);

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.error || `Request failed: ${res.status}`);
  }

  return res.json();
}

/**
 * Build image URL
 */
export function resolveImageUrl(imageUrl) {
  if (!imageUrl) return "/placeholder.png";
  if (imageUrl.startsWith("http")) return imageUrl;

  return `${BASE_URL}/uploads/${imageUrl}`;
}
