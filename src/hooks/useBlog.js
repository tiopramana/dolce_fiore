import { useFetch } from "./useFetch";
import { getBlogById } from "../services/blogService";

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
export function useBlog(id) {
  const { data, loading, error, refetch } = useFetch(
    () => getBlogById(id),
    [id],
  );

  return {
    blog: data ?? null,
    loading,
    error,
    refetch,
  };
}
