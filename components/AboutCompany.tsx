"use client";

import { CheckCircle2, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const highlights = [
  "Quality Materials",
  "Experienced Team",
  "Affordable Prices",
];

export default function AboutCompany() {
  return (
    <section className="bg-white px-4 py-10 sm:px-6 sm:py-12 lg:px-8">
      <div className="mx-auto grid max-w-6xl items-center gap-8 rounded-[30px] bg-white px-4 py-6 shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:px-6 lg:grid-cols-[0.95fr_1.1fr] lg:px-8 lg:py-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="overflow-hidden rounded-3xl shadow-lg"
        >
          <img
            src="/images/about.png"
            alt="Obi One office interior"
            className="h-full w-full object-cover"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative"
        >
          <a
            href="https://wa.me/"
            aria-label="Chat with Obi One on WhatsApp"
            className="absolute right-0 top-0 flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
          </a>

          <h2 className="mb-5 pr-14 text-3xl font-bold text-slate-800">
            About Our Company
          </h2>

          <div className="space-y-4 text-sm leading-6 text-slate-600 sm:text-[15px]">
            <p>
              Obi One Trading and Construction Ltd has been providing
              top-quality construction services and reliable car spare parts for
              over a decade. Our commitment to excellence and customer
              satisfaction has made us a trusted name in the industry.
            </p>
            <p>
              We specialize in residential and commercial construction projects,
              ensuring timely delivery and superior craftsmanship. Our spare
              parts division offers genuine components for all vehicle makes and
              models.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3 text-sm font-medium text-slate-700">
            {highlights.map((item) => (
              <div key={item} className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-700" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
