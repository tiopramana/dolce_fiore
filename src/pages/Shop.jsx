import { createFileRoute } from "@tanstack/react-router";
import { Shop } from "./ShopPage";

export const Route = createFileRoute("/shop")({
  validateSearch: (search) => ({
    collection: search.collection ?? "",
    status: search.status ?? "",
  }),
  component: Shop,
});
