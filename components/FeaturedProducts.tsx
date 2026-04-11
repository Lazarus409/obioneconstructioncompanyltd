"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import AddToCartButton from "./AddToCartButton";
import { products } from "@/app/shop/data";

const featuredProducts = products.slice(0, 4);

export default function FeaturedProducts() {
  return (
    <section id="products" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-800">
          Featured Products
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_25px_rgba(15,23,42,0.08)]"
            >
              <Link href={`/shop/${product.slug}`} className="block">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-44 w-full object-cover"
                />
              </Link>
              <div className="px-4 py-4 text-left">
                <Link href={`/shop/${product.slug}`} className="block">
                  <h3 className="text-sm font-semibold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {product.subtitle}
                  </p>
                </Link>
                <div className="mt-4 flex items-center justify-between">
                  <p className="text-sm font-bold text-blue-700">{product.price}</p>
                  <AddToCartButton
                    product={product}
                    iconOnly
                    className="rounded-md bg-blue-700 p-2 text-white transition hover:scale-105"
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
