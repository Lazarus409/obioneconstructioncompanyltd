"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProductRecord } from "@/lib/content-store";

type FeaturedProductsProps = {
  products: ProductRecord[];
};

export default function FeaturedProducts({ products }: FeaturedProductsProps) {
  return (
    <section id="products" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-800">
          Featured Products
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_25px_rgba(15,23,42,0.08)]"
            >
              <Link href={`/shop/${product.id}`} className="block">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-44 w-full object-cover"
                />
              </Link>
              <div className="px-4 py-4 text-left">
                <Link href={`/shop/${product.id}`} className="block">
                  <p className="text-[10px] uppercase tracking-[0.22em] text-blue-700">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-semibold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500">
                    {product.subtitle}
                  </p>
                </Link>
                <div className="mt-4 flex items-center justify-between">
                  <Link
                    href={`/shop/${product.id}`}
                    className="rounded-md bg-blue-700 px-3 py-2 text-xs font-medium text-white transition hover:scale-105"
                  >
                    View details
                  </Link>
                  {product.featured ? (
                    <span className="rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700">
                      Featured
                    </span>
                  ) : null}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
