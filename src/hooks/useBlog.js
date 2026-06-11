import { useFetch } from "./useFetch";
import { getBlog } from "../services/blogService";

/**
 * Fetch all blog posts, optionally filtered by category slug.
 *
 * @param {string} categorySlug — e.g. "craft", "style". Leave empty for all.
 *
 * Usage:
 *   const { posts, loading, error } = useBlog();
 *   const { posts, loading, error } = useBlog("craft");
 */
export function useBlog(categorySlug = "") {
  const { data, loading, error, refetch } = useFetch(
    () => getBlog(categorySlug),
    [categorySlug],
  );

  return {
    posts: data ?? [],
    loading,
    error,
    refetch,
  };
}
