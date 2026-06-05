import { useFetch } from "./useFetch";
import { getCategories } from "../services/categoryService";

/**
 * Fetch all categories — used in Shop sidebar filter.
 *
 * Usage:
 *   const { categories, loading, error } = useCategories();
 */
export function useCategories() {
  const { data, loading, error, refetch } = useFetch(
    () => getCategories(),
    []
  );

  return {
    categories: data ?? [],   // always an array
    loading,
    error,
    refetch,
  };
}
