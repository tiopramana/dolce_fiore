export default async function handler(req, res) {
  if (!["GET", "HEAD"].includes(req.method)) {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const allowedPaths = new Set(["products", "categories", "blog", "news"]);

  const path = String(req.query.path || "");

  if (!allowedPaths.has(path)) {
    return res.status(404).json({ error: "Not found" });
  }

  // eslint-disable-next-line no-undef
  const baseUrl = process.env.DOLCE_API_BASE_URL;
  // eslint-disable-next-line no-undef
  const apiKey = process.env.DOLCE_API_SECRET;

  if (!baseUrl || !apiKey) {
    return res.status(500).json({ error: "Server configuration error" });
  }

  const upstreamUrl = new URL(`/api/${path}`, baseUrl);

  // Teruskan parameter query selain parameter proxy "path".
  for (const [key, value] of Object.entries(req.query)) {
    if (key === "path") continue;

    for (const item of Array.isArray(value) ? value : [value]) {
      if (item !== undefined) {
        upstreamUrl.searchParams.append(key, item);
      }
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
    res.setHeader("Cache-Control", "no-store");

    return res.status(upstream.status).send(body);
  } catch (error) {
    console.error("API proxy failed:", error.message);

    return res.status(502).json({
      error: "Upstream API unavailable",
    });
  }
}
