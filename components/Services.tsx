"use client";

import { Building2, Hammer, House } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    title: "Construction",
    description:
      "Residential and commercial building projects with premium quality materials and expert craftsmanship.",
    icon: Hammer,
  },
  {
    title: "Real Estate",
    description:
      "Property development and management services tailored to meet your investment goals.",
    icon: House,
  },
  {
    title: "Electrical Works",
    description:
      "Obi One Construction undertakes electrical project work from design through installation and maintenance.",
    icon: Building2,
  },
];

export default function Services() {
  return (
    <section id="services" className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-800">
          Our Services
        </h2>

        <div className="grid gap-5 md:grid-cols-3">
          {services.map(({ title, description, icon: Icon }, index) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="rounded-2xl bg-white px-6 py-8 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
            >
              <Icon className="mx-auto mb-4 h-8 w-8 text-blue-700" />
              <h3 className="mb-3 text-lg font-semibold text-slate-900">
                {title}
              </h3>
              <p className="text-sm leading-6 text-slate-600">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
