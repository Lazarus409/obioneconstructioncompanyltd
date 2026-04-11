// components/Hero.tsx
"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section className="w-full bg-white px-1 pt-1 sm:px-2 sm:pt-2">
      <div className="grid min-h-135 overflow-hidden bg-white shadow-lg lg:grid-cols-[1.38fr_1fr]">
        <div className="relative min-h-80 lg:min-h-130">
          <img
            src="/images/hero.png"
            alt="Construction site hero background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div aria-hidden="true" className="absolute inset-0 bg-black/45" />
        </div>

        <div className="flex items-center justify-center bg-[#8b8b8b] px-6 py-16 text-center sm:px-10 lg:px-12">
          <div className="max-w-md text-white">
            <motion.h1
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4 text-[2.35rem] font-bold leading-[0.95] sm:text-[3.2rem]"
            >
              Building Dreams,
              <br />
              Delivering Excellence
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mx-auto mb-7 max-w-sm text-sm leading-6 text-gray-100 sm:text-base"
            >
              Professional construction services and quality spare parts for all
              your needs
            </motion.p>

            <motion.div
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                href="/projects"
                className="rounded bg-blue-700 px-4 py-2 text-[11px] shadow transition hover:scale-105 sm:text-xs"
              >
                View Projects
              </Link>

              <Link
                href="/shop"
                className="rounded bg-red-500 px-4 py-2 text-[11px] shadow transition hover:scale-105 sm:text-xs"
              >
                Shop Spare Parts
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
