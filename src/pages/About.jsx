import { createFileRoute } from "@tanstack/react-router";
import { AboutPage } from "../pages/AboutPage.jsx";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Cartelle" },
      {
        name: "description",
        content: "Our story, values, and commitment to considered design.",
      },
      { property: "og:title", content: "About — Cartelle" },
      {
        property: "og:description",
        content: "Our story, values, and commitment to considered design.",
      },
    ],
  }),
  component: AboutPage,
});
