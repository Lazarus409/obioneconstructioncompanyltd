"use client";

import { BadgeCheck, Compass, Eye, Handshake, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const actionShots = [
  "/images/project1.png",
  "/images/project2.png",
  "/images/project4.png",
];

const values = [
  {
    title: "Integrity",
    description:
      "Upholding honesty and ethical conduct in all our business relationships and operations.",
    icon: ShieldCheck,
  },
  {
    title: "Excellence",
    description:
      "Committed to the highest standards of quality, safety, and performance in every project.",
    icon: BadgeCheck,
  },
  {
    title: "Partnership",
    description:
      "Collaborating openly with clients, communities, and stakeholders to create lasting results.",
    icon: Handshake,
  },
];

export default function AboutPage() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50 text-slate-800">
        <section className="bg-blue-900 px-4 py-14 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-3xl font-bold sm:text-4xl"
            >
              Building Excellence Since 2002
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-sm text-blue-100 sm:text-base"
            >
              Pioneering construction solutions and premium trading services
              across Accra and beyond.
            </motion.p>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">Who We Are</h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-orange-400" />
            </div>

            <div className="mt-12 grid items-center gap-10 lg:grid-cols-[1fr_1.05fr]">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5 }}
              >
                <h3 className="text-xl font-bold text-slate-900">
                  Trusted Construction & Trading Partner
                </h3>
                <div className="mt-5 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                  <p>
                    Obi One Trading and Construction Ltd is a leading African
                    business and trading company with roots in Ghana. We offer
                    premium construction, project support, and durable building
                    solutions backed by experienced professionals.
                  </p>
                  <p>
                    Our integrated approach combines innovative construction
                    methods with strategic trading partnerships, enabling us to
                    deliver dependable service, technical excellence, and
                    measurable value for every client and community we serve.
                  </p>
                </div>

                <div className="mt-8 grid max-w-md grid-cols-2 overflow-hidden rounded-2xl bg-slate-50 shadow-sm">
                  <div className="border-r border-slate-200 px-6 py-5 text-center">
                    <p className="text-2xl font-bold text-blue-900">24+</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Years Experience
                    </p>
                  </div>
                  <div className="px-6 py-5 text-center">
                    <p className="text-2xl font-bold text-blue-900">250+</p>
                    <p className="mt-1 text-xs text-slate-500">
                      Projects Completed
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative"
              >
                <img
                  src="/images/about.png"
                  alt="Obi One office headquarters"
                  className="w-full rounded-2xl object-cover shadow-xl"
                />
                <div className="absolute bottom-4 right-4 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-slate-800 shadow-lg">
                  Asofan, Accra
                  <br />
                  HQ
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Our Mission & Vision
              </h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-orange-400" />
              <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500">
                Guiding principles that drive our commitment to excellence and
                sustainable growth.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5 }}
                className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-900 text-white">
                  <Compass className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  Our Mission
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  To deliver exceptional construction and trading services that
                  transform communities, empower businesses, and set new
                  benchmarks for quality, safety, and sustainability across
                  Africa and beyond.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-900 text-white">
                  <Eye className="h-5 w-5" />
                </div>
                <h3 className="mt-5 text-xl font-bold text-slate-900">
                  Our Vision
                </h3>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                  To be the most trusted and innovative construction and trading
                  partner in Africa, recognized globally for our excellence,
                  integrity, and transformative impact on infrastructure and
                  economic growth.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Our Work in Action
              </h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-orange-400" />
              <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500">
                See how we bring our expertise to life through landmark projects
                and strategic partnerships.
              </p>
            </div>

            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {actionShots.map((image, index) => (
                <motion.div
                  key={image}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="overflow-hidden rounded-2xl shadow-lg"
                >
                  <img
                    src={image}
                    alt="Obi One construction project"
                    className="h-56 w-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">Core Values</h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-orange-400" />
              <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500">
                The principles that define our culture and guide every decision
                we make.
              </p>
            </div>

            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {values.map(({ title, description, icon: Icon }, index) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="rounded-2xl bg-white p-8 text-center shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                >
                  <div
                    className={`mx-auto flex h-12 w-12 items-center justify-center rounded-full text-white ${
                      index === 2 ? "bg-orange-400" : "bg-blue-900"
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-slate-900">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-blue-900 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Build Your Future With Us?
            </h2>
            <p className="mt-4 text-sm text-blue-100 sm:text-base">
              Contact our team today to discuss your construction or trading
              requirements.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="/contact"
                className="rounded-md bg-orange-500 px-6 py-3 text-sm font-medium text-white transition hover:scale-105"
              >
                Get In Touch
              </a>
              <a
                href="/#services"
                className="rounded-md bg-white px-6 py-3 text-sm font-medium text-blue-900 transition hover:scale-105"
              >
                Explore Services
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
