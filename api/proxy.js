const ALLOWED = new Set(["products", "categories", "blog", "news"]);
const SEGMENT = /^[A-Za-z0-9_-]+$/;

export default async function handler(req, res) {
  if (!["GET", "HEAD"].includes(req.method)) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const segments = String(req.query.path || "")
    .split("/")
    .filter(Boolean);

  if (
    segments.length === 0 ||
    segments.length > 3 ||
    !ALLOWED.has(segments[0]) ||
    !segments.every((s) => SEGMENT.test(s))
  ) {
    return res.status(404).json({ error: "Not found" });
  }

  // eslint-disable-next-line no-undef
  const baseUrl = process.env.DOLCE_API_BASE_URL;
  // eslint-disable-next-line no-undef
  const apiKey = process.env.DOLCE_API_SECRET;

  if (!baseUrl || !apiKey) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const upstreamUrl = new URL(`/api/${segments.join("/")}`, baseUrl);

  for (const [key, value] of Object.entries(req.query)) {
    if (key === "path") continue;
    for (const item of Array.isArray(value) ? value : [value]) {
      if (item !== undefined) upstreamUrl.searchParams.append(key, item);
    }
  }

  try {
    const upstream = await fetch(upstreamUrl, {
      method: req.method,
      headers: {
        "x-internal-api-key": apiKey,
        accept: "application/json",
      },
    });

    const body = await upstream.text();

    res.setHeader(
      "Content-Type",
      upstream.headers.get("content-type") || "application/json",
    );
    // Optional: cache at Vercel's edge to reduce load on your backend
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");

    return res.status(upstream.status).send(body);
  } catch (error) {
    console.error("API proxy failed:", error.message);
    return res.status(502).json({ error: "Upstream API unavailable" });
  }
}
