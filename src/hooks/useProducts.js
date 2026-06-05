import { useFetch } from "./useFetch";
import { getProducts } from "../services/productService";

/**
 * Fetch all products, optionally filtered by category slug.
 *
 * @param {string} categorySlug  — e.g. "bouquet", "wedding". Leave empty for all.
 *
 * Usage:
 *   const { products, loading, error } = useProducts();
 *   const { products, loading, error } = useProducts("bouquet");
 */
export function useProducts(categorySlug = "") {
  const { data, loading, error, refetch } = useFetch(
    () => getProducts(categorySlug),
    [categorySlug]
  );

  return {
    products: data ?? [],   // always an array — safe to .map() without null checks
    loading,
    error,
    refetch,
  };
}
