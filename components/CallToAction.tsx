"use client";

import { motion } from "framer-motion";

export default function CallToAction() {
  return (
    <section className="bg-blue-800 px-4 py-14 text-white sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="mx-auto flex max-w-4xl flex-col items-center text-center"
      >
        <h2 className="text-3xl font-bold sm:text-4xl">
          Ready to Start Your Project?
        </h2>
        <p className="mt-3 text-sm text-blue-100 sm:text-base">
          Contact us today for a free consultation and quote
        </p>
        <a
          href="/contact"
          className="mt-8 rounded-md bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:scale-105"
        >
          Get In Touch
        </a>
      </motion.div>
    </section>
  );
}
