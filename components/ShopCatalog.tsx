"use client";

import Link from "next/link";
import { useDeferredValue, useMemo, useState } from "react";
import { Filter, Search, X } from "lucide-react";
import { motion } from "framer-motion";
import type { ProductRecord } from "@/lib/content-store";

type ShopCatalogProps = {
  products: ProductRecord[];
};

export default function ShopCatalog({ products }: ShopCatalogProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const deferredSearchTerm = useDeferredValue(searchTerm);

  const categories = useMemo(
    () => ["All", ...new Set(products.map((product) => product.category))],
    [products],
  );

  const filteredProducts = useMemo(() => {
    const normalizedSearch = deferredSearchTerm.trim().toLowerCase();

    return products.filter((product) => {
      const matchesCategory =
        activeCategory === "All" || product.category === activeCategory;

      if (!matchesCategory) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      const searchableText = [
        product.name,
        product.subtitle,
        product.category,
        product.sku,
        product.description,
      ]
        .join(" ")
        .toLowerCase();

      return searchableText.includes(normalizedSearch);
    });
  }, [activeCategory, deferredSearchTerm, products]);

  const hasActiveFilters =
    searchTerm.trim().length > 0 || activeCategory !== "All";

  const clearFilters = () => {
    setSearchTerm("");
    setActiveCategory("All");
  };

  return (
    <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
      <aside className="rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]">
        <h2 className="text-lg font-bold text-slate-900">Categories</h2>
        <div className="mt-6 space-y-6">
          <div>
            <div className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
              <Filter className="h-3.5 w-3.5" />
              Browse
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => {
                const isActive = activeCategory === category;

                return (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setActiveCategory(category)}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      isActive
                        ? "bg-blue-700 text-white shadow-sm"
                        : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                    }`}
                    aria-pressed={isActive}
                  >
                    {category}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </aside>

      <div>
        <div className="rounded-lg border border-slate-200 bg-white px-4 py-3 shadow-sm">
          <div className="flex items-center gap-3">
            <Search className="h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search for spare parts..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              aria-label="Search products"
            />
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={clearFilters}
                className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:bg-slate-200"
              >
                <X className="h-3.5 w-3.5" />
                Clear
              </button>
            ) : null}
          </div>
          <p className="mt-2 text-xs text-slate-500">
            Search by name, category, SKU, or description.
          </p>
        </div>

        <div className="mt-5">
          <h1 className="text-3xl font-bold text-slate-900">Car Spare Parts</h1>
          <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-slate-500">
            <p>Premium quality components for all vehicle makes and models.</p>
            <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:inline-block" />
            <p>
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
        </div>

        {filteredProducts.length > 0 ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.45, delay: index * 0.06 }}
                whileHover={{ y: -4 }}
                className="rounded-xl border border-slate-100 bg-white p-2.5 shadow-[0_10px_24px_rgba(15,23,42,0.06)]"
              >
                <Link href={`/shop/${product.id}`} className="block">
                  <div className="overflow-hidden rounded-lg">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-28 w-full object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-blue-700">
                    {product.category}
                  </p>
                  <h3 className="mt-1 text-[13px] font-semibold text-slate-900">
                    {product.name}
                  </h3>
                  <p className="mt-1 text-[10px] text-slate-500">
                    {product.subtitle}
                  </p>
                </Link>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-200 bg-white px-6 py-16 text-center">
            <p className="text-lg font-semibold text-slate-900">
              No products match your filters.
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Try a different keyword or clear the category filter to see the
              full catalog.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-6 rounded-md bg-blue-700 px-5 py-2.5 text-sm font-medium text-white transition hover:scale-105"
            >
              Reset filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
