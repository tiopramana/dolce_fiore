import { ProductDetail } from "./ProductDetail";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Cotton relaxed crewneck — Cartelle" },
      {
        name: "description",
        content: "A slightly oversized crewneck in 100% combed cotton.",
      },
    ],
  }),
  component: ProductDetail,
});
