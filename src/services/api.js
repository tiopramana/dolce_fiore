/**
 * API requests through the Vercel server-side proxy.
 */
const BASE_URL = "";

export async function apiFetch(path) {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const response = await fetch(`/api${normalizedPath}`);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));

    throw new Error(error.error || `Request failed: ${response.status}`);
  }

  return response.json();
}

/**
 * Build image URL.
 */
export function resolveImageUrl(imageUrl) {
  if (!imageUrl) return "/placeholder.png";

  if (/^https?:\/\//i.test(imageUrl)) {
    return imageUrl;
  }

  return `${BASE_URL}/uploads/${imageUrl.replace(/^\/+/, "")}`;
}
