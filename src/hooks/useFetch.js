import { useState, useEffect, useCallback } from "react";

/**
 * Generic fetch hook.
 *
 * @param {Function} fetcher  — async function that returns data
 * @param {Array}    deps     — re-fetch when these change (like useEffect deps)
 *
 * @returns {{ data, loading, error, refetch }}
 *
 * Usage:
 *   const { data, loading, error } = useFetch(() => getProducts(), []);
 *   const { data, loading, error } = useFetch(() => getProducts(slug), [slug]);
 */
export function useFetch(fetcher, deps = []) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const run = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  useEffect(() => {
    run();
  }, [run]);

  return { data, loading, error, refetch: run };
}
