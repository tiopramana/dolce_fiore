import coat1 from "../assets/col1.png";
import coat2 from "../assets/col1-hov.png";
import gloves1 from "../assets/col2.png";
import gloves2 from "../assets/col2-hover.png";
import turtleneck1 from "../assets/col3.png";
import turtleneck2 from "../assets/col3-hov.png";
import trousers1 from "../assets/sale1.png";
import trousers2 from "../assets/sale1-hover.png";
import bag1 from "../assets/sale2.png";
import bag2 from "../assets/sale2-hover.png";
import linen1 from "../assets/sale3.png";
import linen2 from "../assets/sale3-hover.png";

export const products = [
  {
    name: "Crestline wool coat",
    price: 420,
    image: coat1,
    hoverImage: coat2,
    collections: ["Fall Collection", "The Essentials"],
    status: ["Best Sellers"],
  },
  {
    name: "Crestline wool coat",
    price: 420,
    image: coat1,
    hoverImage: coat2,
    collections: ["Fall Collection", "The Essentials"],
    status: ["Best Sellers"],
  },
  {
    name: "Crestline wool coat",
    price: 420,
    image: coat1,
    hoverImage: coat2,
    collections: ["Fall Collection", "The Essentials"],
    status: ["Best Sellers"],
  },
  {
    name: "Crestline wool coat",
    price: 420,
    image: coat1,
    hoverImage: coat2,
    collections: ["Fall Collection", "The Essentials"],
    status: ["Best Sellers"],
  },
  {
    name: "Aldgate leather gloves",
    price: 95,
    image: gloves1,
    hoverImage: gloves2,
    collections: ["Fall Collection", "Studio Edit"],
    status: ["New Arrivals"],
  },
  {
    name: "Ember ribbed turtleneck",
    price: 145,
    image: turtleneck1,
    hoverImage: turtleneck2,
    collections: ["The Essentials", "After Dark"],
    status: ["Best Sellers"],
  },
  {
    name: "Harrow wide-leg trousers",
    price: 210,
    image: trousers1,
    hoverImage: trousers2,
    collections: ["Studio Edit", "The Essentials"],
    status: ["New Arrivals"],
  },
  {
    name: "Sable crossbody bag",
    price: 265,
    image: bag1,
    hoverImage: bag2,
    collections: ["After Dark", "Studio Edit"],
    status: ["Final Sale"],
  },
  {
    name: "Linen straight-leg trousers",
    price: 175,
    image: linen1,
    hoverImage: linen2,
    collections: ["The Essentials"],
    status: ["New Arrivals", "Best Sellers"],
  },
];

export const collections = [
  "Fall Collection",
  "The Essentials",
  "After Dark",
  "Studio Edit",
];

export const statuses = ["Final Sale", "Best Sellers", "New Arrivals"];

export const PRICE_MIN = 0;
export const PRICE_MAX = 500;
