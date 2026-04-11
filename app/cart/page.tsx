"use client";

import Link from "next/link";
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/components/CartProvider";

export default function CartPage() {
  const { items, itemCount, subtotal, removeItem, updateQuantity, clearCart } =
    useCart();

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 text-slate-800">
        <section className="px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-slate-900">
                  Your Cart
                </h1>
                <p className="mt-2 text-sm text-slate-500">
                  {itemCount} item{itemCount === 1 ? "" : "s"} ready for your
                  next order.
                </p>
              </div>

              {items.length > 0 ? (
                <button
                  type="button"
                  onClick={clearCart}
                  className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                >
                  Clear Cart
                </button>
              ) : null}
            </div>

            {items.length === 0 ? (
              <div className="mt-10 rounded-3xl bg-white px-6 py-16 text-center shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                  <ShoppingCart className="h-7 w-7" />
                </div>
                <h2 className="mt-6 text-2xl font-bold text-slate-900">
                  Your cart is empty
                </h2>
                <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500">
                  Add spare parts from the shop and they&apos;ll appear here for
                  review before checkout.
                </p>
                <Link
                  href="/shop"
                  className="mt-8 inline-flex rounded-md bg-blue-800 px-6 py-3 text-sm font-medium text-white transition hover:scale-105"
                >
                  Continue Shopping
                </Link>
              </div>
            ) : (
              <div className="mt-10 grid gap-8 lg:grid-cols-[1.5fr_0.85fr]">
                <div className="space-y-4">
                  {items.map((item) => (
                    <article
                      key={item.slug}
                      className="rounded-2xl bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                    >
                      <div className="flex flex-col gap-4 sm:flex-row">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-28 w-full rounded-xl object-cover sm:w-32"
                        />

                        <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row sm:items-start">
                          <div>
                            <p className="text-xs font-medium uppercase tracking-[0.16em] text-blue-700">
                              {item.category}
                            </p>
                            <h2 className="mt-1 text-lg font-bold text-slate-900">
                              {item.name}
                            </h2>
                            <p className="mt-1 text-sm text-slate-500">
                              {item.subtitle}
                            </p>
                            <p className="mt-3 text-sm font-semibold text-slate-900">
                              {item.price}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-3">
                            <div className="flex items-center rounded-full border border-slate-200 bg-slate-50">
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.slug, item.quantity - 1)
                                }
                                className="rounded-l-full p-2 text-slate-600 transition hover:bg-slate-100"
                              >
                                <Minus className="h-4 w-4" />
                              </button>
                              <span className="min-w-10 text-center text-sm font-semibold text-slate-900">
                                {item.quantity}
                              </span>
                              <button
                                type="button"
                                onClick={() =>
                                  updateQuantity(item.slug, item.quantity + 1)
                                }
                                className="rounded-r-full p-2 text-slate-600 transition hover:bg-slate-100"
                              >
                                <Plus className="h-4 w-4" />
                              </button>
                            </div>

                            <button
                              type="button"
                              onClick={() => removeItem(item.slug)}
                              className="inline-flex items-center gap-2 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100"
                            >
                              <Trash2 className="h-4 w-4" />
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                <aside className="h-fit rounded-3xl bg-white p-6 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
                  <h2 className="text-xl font-bold text-slate-900">
                    Order Summary
                  </h2>
                  <div className="mt-6 space-y-4 text-sm text-slate-600">
                    <div className="flex items-center justify-between">
                      <span>Items</span>
                      <span>{itemCount}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Subtotal</span>
                      <span className="font-semibold text-slate-900">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Delivery</span>
                      <span>Calculated on request</span>
                    </div>
                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <p className="flex items-center justify-between text-base font-bold text-slate-900">
                      <span>Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </p>
                    <p className="mt-3 text-sm leading-6 text-slate-500">
                      Checkout can be completed by contacting the team with your
                      selected parts.
                    </p>
                  </div>

                  <div className="mt-6 space-y-3">
                    <a
                      href="/contact"
                      className="flex w-full items-center justify-center rounded-md bg-red-500 px-5 py-3 text-sm font-medium text-white transition hover:scale-[1.02]"
                    >
                      Request Order
                    </a>
                    <Link
                      href="/shop"
                      className="flex w-full items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
                    >
                      Continue Shopping
                    </Link>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
