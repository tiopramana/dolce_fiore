export default async function handler(req, res) {
  const base = process.env.DOLCE_API_BASE_URL;
  const secret = process.env.DOLCE_API_SECRET;

  if (!base || !secret) {
    return res.status(500).json({
      error: "Proxy configuration missing",
    });
  }

  const path = req.query.path;
  const apiPath = Array.isArray(path) ? path.join("/") : path || "";

  const allowedPaths = ["products", "categories", "blog"];

  if (!allowedPaths.includes(apiPath)) {
    return res.status(404).json({ error: "Not found" });
  }

  const incoming = new URL(req.url, `https://${req.headers.host}`);
  const target = new URL(`/api/${apiPath}`, base);
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
    if (contentType) res.setHeader("Content-Type", contentType);

    return res.status(response.status).send(await response.text());
  } catch (error) {
    console.error("API proxy error:", error);
    return res.status(502).json({ error: "Backend unavailable" });
  }
}
