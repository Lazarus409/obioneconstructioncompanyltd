// components/Products.tsx
"use client";

import { motion } from "framer-motion";

export default function Products() {
  return (
    <section className="py-20 bg-white text-center">
      <h2 className="text-3xl font-bold mb-12 gradient-text">
        Featured Products
      </h2>

      <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
        {[1, 2, 3, 4].map((item) => (
          <motion.div
            key={item}
            whileHover={{ y: -10 }}
            className="p-4 rounded-xl shadow hover:shadow-xl bg-gray-50"
          >
            <img
              src={`/images/product${item}.jpg`}
              className="h-40 w-full object-cover mb-4"
            />

            <h4 className="font-medium mb-2">Product {item}</h4>
            <p className="text-blue-600 font-bold">$120</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
