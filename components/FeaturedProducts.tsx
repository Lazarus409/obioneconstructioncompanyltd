"use client";

import { ShoppingCart } from "lucide-react";
import { motion } from "framer-motion";

const products = [
  {
    name: "Engine Oil Filter",
    subtitle: "Universal Fit",
    price: "$24.99",
    image: "/images/product1.png",
  },
  {
    name: "Brake Pads Set",
    subtitle: "Front Axle",
    price: "$49.99",
    image: "/images/product2.png",
  },
  {
    name: "All Season Tire",
    subtitle: "225/65R17",
    price: "$129.99",
    image: "/images/product3.png",
  },
  {
    name: "Car Battery",
    subtitle: "12V Maintenance Free",
    price: "$89.99",
    image: "/images/product4.png",
  },
];

export default function FeaturedProducts() {
  return (
    <section id="products" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-800">
          Featured Products
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_25px_rgba(15,23,42,0.08)]"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-44 w-full object-cover"
              />
              <div className="px-4 py-4 text-left">
                <h3 className="text-sm font-semibold text-slate-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-xs text-slate-500">{product.subtitle}</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-blue-700">{product.price}</p>
                  <button
                    type="button"
                    aria-label={`Add ${product.name} to cart`}
                    className="rounded-md bg-blue-700 p-2 text-white transition hover:scale-105"
                  >
                    <ShoppingCart className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
