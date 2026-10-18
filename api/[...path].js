export default async function handler(req, res) {
  const base = import.meta.env.DOLCE_API_BASE_URL;
  const secret = import.meta.env.DOLCE_API_SECRET;

  if (!base || !secret) {
    return res.status(500).json({
      error: "Proxy configuration missing",
    });
  }

  const path = req.query.path;
  const apiPath = Array.isArray(path) ? path.join("/") : path || "";

  // Only forward requests to the intended API prefix.
  const target = new URL(`/api/${apiPath}`, base);

  const incoming = new URL(req.url, `https://${req.headers.host}`);

  target.search = incoming.search;

  try {
    const response = await fetch(target, {
      method: req.method,
      headers: {
        "Content-Type": req.headers["content-type"] || "application/json",
        "x-internal-api-key": secret,
      },
      body: ["GET", "HEAD"].includes(req.method)
        ? undefined
        : JSON.stringify(req.body ?? {}),
    });

    const contentType = response.headers.get("content-type");
    if (contentType) {
      res.setHeader("Content-Type", contentType);
    }

    return res.status(response.status).send(await response.text());
  } catch {
    return res.status(502).json({
      error: "Backend unavailable",
    });
  }
}
