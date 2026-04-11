"use client";

import {
  Clock3,
  Hammer,
  House,
  ShieldCheck,
  Wrench,
  WrenchIcon,
} from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
      "Transform your space with our comprehensive renovation and remodeling services.",
    icon: WrenchIcon,
  },
  {
    title: "Plumbing Works",
    description:
      "It encompasses both residential and commercial applications, covering tasks like new construction plumbing, repairs, and upgrades.",
    icon: Wrench,
  },
];

const benefits = [
  {
    title: "Quality Assurance",
    description:
      "We guarantee top-quality workmanship and materials for every project.",
    icon: ShieldCheck,
  },
  {
    title: "Timely Delivery",
    description:
      "We complete projects on schedule without compromising quality.",
    icon: Clock3,
  },
  {
    title: "Competitive Pricing",
    description:
      "Affordable rates without sacrificing the quality of our work.",
    icon: House,
  },
];

export default function ServicesPage() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50 text-slate-800">
        <section className="relative overflow-hidden px-4 py-20 text-white sm:px-6 lg:px-8">
          <img
            src="/images/hero.png"
            alt="Construction services background"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-blue-950/70" />
          <div className="relative mx-auto max-w-6xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold"
            >
              Our Services
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-sm text-blue-100 sm:text-base"
            >
              Comprehensive solutions for all your construction and development
              needs.
            </motion.p>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
              {services.map(({ title, description, icon: Icon }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl bg-white p-8 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                >
                  <Icon className="mx-auto h-9 w-9 text-blue-800" />
                  <h3 className="mt-5 text-xl font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-4 text-sm leading-6 text-slate-500">
                    {description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Why Choose Our Services?
              </h2>
            </div>

            <div className="mt-12 grid gap-10 md:grid-cols-3">
              {benefits.map(({ title, description, icon: Icon }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="text-center"
                >
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 text-blue-800">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="mx-auto mt-3 max-w-xs text-sm leading-6 text-slate-500">
                    {description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-800 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-sm text-blue-100 sm:text-base">
              Contact us today for a free consultation and quote.
            </p>
            <a
              href="/contact"
              className="mt-8 rounded-md bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:scale-105"
            >
              Get In Touch
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
