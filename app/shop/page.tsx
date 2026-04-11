"use client";

import Link from "next/link";
import { ShoppingCart, Search, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { products, shopCategories } from "./data";

export default function ShopPage() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50 text-slate-800">
        <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
              <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
                <h2 className="text-lg font-bold text-slate-900">Categories</h2>
                <div className="mt-6 space-y-6">
                  {shopCategories.map((group) => (
                    <div key={group.title}>
                      <h3 className="text-sm font-semibold text-slate-900">
                        {group.title}
                      </h3>
                      <div className="mt-3 space-y-2 text-sm text-slate-500">
                        {group.items.map((item) => (
                          <p key={item}>{item}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </aside>

              <div>
                <div className="flex items-center gap-3 rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
                  <Search className="h-4 w-4 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search for spare parts..."
                    className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                  />
                </div>

                <div className="mt-5">
                  <h1 className="text-3xl font-bold text-slate-900">
                    Car Spare Parts
                  </h1>
                  <p className="mt-2 text-sm text-slate-500">
                    Premium quality components for all vehicle makes and models.
                  </p>
                </div>

                <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                  {products.map((product, index) => (
                    <motion.div
                      key={product.slug}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.25 }}
                      transition={{ duration: 0.45, delay: index * 0.06 }}
                      whileHover={{ y: -4 }}
                      className="rounded-xl border border-slate-100 bg-white p-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
                    >
                      <Link href={`/shop/${product.slug}`} className="block">
                        <div className="overflow-hidden rounded-lg">
                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-28 w-full object-cover transition duration-500 hover:scale-105"
                          />
                        </div>
                        <h3 className="mt-3 text-[13px] font-semibold text-slate-900">
                          {product.name}
                        </h3>
                        <p className="mt-1 text-[10px] text-slate-500">
                          {product.subtitle}
                        </p>
                      </Link>
                      <div className="mt-3 flex items-center justify-between gap-2">
                        <p className="text-[13px] font-bold text-blue-700">
                          {product.price}
                        </p>
                        <button
                          type="button"
                          className="rounded-md bg-red-500 px-2.5 py-1.5 text-[10px] font-medium text-white transition hover:scale-105"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>

                <div className="mt-8 flex items-center justify-center gap-2 text-sm">
                  <span className="rounded bg-blue-800 px-3 py-1.5 text-white">
                    1
                  </span>
                  <span className="rounded bg-slate-100 px-3 py-1.5 text-slate-500">
                    2
                  </span>
                  <span className="rounded bg-slate-100 px-3 py-1.5 text-slate-500">
                    3
                  </span>
                  <span className="rounded bg-slate-100 px-3 py-1.5 text-slate-500">
                    Next
                  </span>
                </div>
              </div>
            </div>
          </div>

          <a
            href="https://wa.me/"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </section>

        <section className="bg-blue-800 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Need Help Finding Parts?
            </h2>
            <p className="mt-3 text-sm text-blue-100 sm:text-base">
              Our experts can help you find the right spare parts for your vehicle.
            </p>
            <a
              href="/contact"
              className="mt-8 rounded-md bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:scale-105"
            >
              Contact Our Team
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
