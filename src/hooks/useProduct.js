import { useFetch } from "./useFetch";
import { getProductById } from "../services/productService";

/**
 * Fetch a single product by id.
 * Used in ProductDetail page — reads :id from the route.
 *
 * @param {string|number} id — product id from URL params
 *
 * Usage:
 *   const { id } = useParams();
 *   const { product, loading, error } = useProduct(id);
 */
export function useProduct(id) {
  const { data, loading, error, refetch } = useFetch(
    () => getProductById(id),
    [id]
  );

  return {
    product: data ?? null,
    loading,
    error,
    refetch,
  };
}
