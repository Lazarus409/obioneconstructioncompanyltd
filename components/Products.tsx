"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProductRecord } from "@/lib/content-store";

type ProductsProps = {
  products: ProductRecord[];
};

const productVideos = [
  { src: "/videos/video4.mp4", label: "Product video 4" },
  { src: "/videos/video5.mp4", label: "Product video 5" },
  { src: "/videos/video6.mp4", label: "Product video 6" },
  { src: "/videos/video7.mp4", label: "Product video 7" },
  { src: "/videos/video8.mp4", label: "Product video 8" },
];

export default function Products({ products }: ProductsProps) {
  const categories = [...new Set(products.map((product) => product.category))];
  const spotlightProducts = categories
    .flatMap((category) =>
      products.filter((product) => product.category === category).slice(0, 2),
    )
    .slice(0, 12);

  return (
    <section
      id="products"
      className="relative overflow-hidden bg-slate-950 px-4 py-20 text-white sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(59,130,246,0.22),transparent_35%),radial-gradient(circle_at_top_right,rgba(244,114,182,0.14),transparent_32%),linear-gradient(180deg,rgba(15,23,42,0.85),rgba(15,23,42,1))]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">Products</h2>
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {categories.map((category) => (
            <span
              key={category}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200"
            >
              {category}
            </span>
          ))}
        </div>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {spotlightProducts.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.45, delay: index * 0.05 }}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-[26px] border border-white/10 bg-white/5 shadow-[0_18px_40px_rgba(15,23,42,0.28)] backdrop-blur"
            >
              <Link href={`/shop/${product.id}`} className="block">
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="h-52 w-full object-cover"
                />
                <div className="px-4 py-4 text-left">
                  <p className="text-[10px] uppercase tracking-[0.24em] text-blue-300">
                    {product.category}
                  </p>
                  <h3 className="mt-2 text-sm font-semibold text-white">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-xs leading-6 text-slate-300">
                    {product.subtitle}
                  </p>
                </div>
              </Link>
            </motion.article>
          ))}
        </div>

        <div className="mt-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <h3 className="mt-2 text-2xl font-semibold">Product clips</h3>
            </div>
            <p className="text-sm text-slate-400">video4 to video8</p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {productVideos.map((video, index) => (
              <motion.article
                key={video.src}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                whileHover={{ y: -5 }}
                className="overflow-hidden rounded-[22px] border border-white/10 bg-white/5 shadow-[0_16px_34px_rgba(15,23,42,0.24)]"
              >
                <video
                  src={video.src}
                  className="h-40 w-full object-cover"
                  muted
                  loop
                  playsInline
                  autoPlay
                  preload="metadata"
                />
                <div className="px-4 py-3">
                  <p className="text-xs font-medium text-slate-100">
                    {video.label}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/shop"
            className="rounded-full bg-blue-500 px-6 py-3 text-sm font-semibold text-white transition hover:scale-105"
          >
            Browse full catalog
          </Link>
        </div>
      </div>
    </section>
  );
}
