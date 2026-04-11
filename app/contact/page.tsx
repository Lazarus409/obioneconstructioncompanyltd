"use client";

import { Clock3, Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const locationLabel = "Asofan, Accra, Ghana";
const locationMapUrl =
  "https://www.google.com/maps?q=Asofan,+Accra,+Ghana&z=15&output=embed";
const locationDirectionsUrl =
  "https://www.google.com/maps/search/?api=1&query=Asofan,+Accra,+Ghana";

const contactItems = [
  {
    title: "Phone Numbers",
    detail: ["0205009955", "0302455587"],
    icon: Phone,
    color: "bg-blue-900",
  },
  {
    title: "Email Address",
    detail: ["obioneconstructioncompanyltd@gmail.com"],
    icon: Mail,
    color: "bg-blue-700",
  },
  {
    title: "Location",
    detail: [locationLabel, "P.O. Box 12345"],
    icon: MapPin,
    color: "bg-orange-400",
  },
];

export default function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50 text-slate-800">
        <section className="bg-blue-900 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold"
            >
              Get In Touch
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-sm text-blue-100 sm:text-base"
            >
              We&apos;re here to help with your construction and trading needs.
            </motion.p>
          </div>
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="text-center">
              <h2 className="text-3xl font-bold text-slate-900">
                Contact Information
              </h2>
              <div className="mx-auto mt-3 h-1 w-16 rounded-full bg-orange-400" />
              <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500">
                Reach out to us through any of the channels below.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1fr]">
              <div className="space-y-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5 }}
                  className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                >
                  <h3 className="text-xl font-bold text-slate-900">
                    Our Office
                  </h3>
                  <div className="mt-6 space-y-6">
                    {contactItems.map(
                      ({ title, detail, icon: Icon, color }) => (
                        <div key={title} className="flex gap-4">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-white ${color}`}
                          >
                            <Icon className="h-4 w-4" />
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold text-slate-900">
                              {title}
                            </h4>
                            <div className="mt-1 space-y-1 text-sm text-slate-500">
                              {detail.map((line) => (
                                <p key={line}>{line}</p>
                              ))}
                            </div>
                          </div>
                        </div>
                      ),
                    )}
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                  className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
                >
                  <h3 className="text-xl font-bold text-slate-900">
                    WhatsApp Us
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-slate-500">
                    Connect with our team instantly via WhatsApp for quick
                    responses.
                  </p>
                  <a
                    href="https://wa.me/2330302455587"
                    className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-green-500 px-5 py-3 text-sm font-medium text-white transition hover:scale-[1.02]"
                  >
                    <MessageCircle className="h-4 w-4" />
                    Chat on WhatsApp
                  </a>
                  <p className="mt-3 text-center text-xs text-slate-400">
                    Available Monday-Friday, 8am-5pm GMT
                  </p>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: 0.15 }}
                className="rounded-2xl bg-white p-8 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  Find Us on Map
                </h3>
                <p className="mt-3 text-sm leading-6 text-slate-500">
                  We&apos;re located in {locationLabel}. Visit us for
                  consultations or project discussions.
                </p>

                <div className="mt-6 overflow-hidden rounded-2xl border border-slate-200 shadow-sm">
                  <iframe
                    title="Obi One Trading and Construction office location"
                    src={locationMapUrl}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="h-80 w-full border-0"
                  />
                </div>

                <div className="mt-5 flex flex-wrap gap-3">
                  <a
                    href={locationDirectionsUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-md bg-blue-900 px-4 py-2.5 text-sm font-medium text-white transition hover:scale-[1.02]"
                  >
                    Get Directions
                  </a>
                  <a
                    href={locationMapUrl.replace("&output=embed", "")}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-400 hover:bg-slate-50"
                  >
                    Open in Google Maps
                  </a>
                </div>

                <div className="mt-5 rounded-xl bg-slate-100 p-5">
                  <div className="flex items-start gap-3">
                    <Clock3 className="mt-0.5 h-4 w-4 text-blue-900" />
                    <div className="text-sm text-slate-600">
                      <p className="font-semibold text-slate-900">
                        Office Hours
                      </p>
                      <p className="mt-2">
                        <span className="font-medium text-slate-800">
                          Monday-Friday:
                        </span>{" "}
                        8:00 AM - 5:00 PM
                      </p>
                      <p>
                        <span className="font-medium text-slate-800">
                          Saturday:
                        </span>{" "}
                        9:00 AM - 1:00 PM
                      </p>
                      <p>
                        <span className="font-medium text-slate-800">
                          Sunday:
                        </span>{" "}
                        Closed
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="bg-blue-900 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Ready to Start Your Project?
            </h2>
            <p className="mt-4 text-sm text-blue-100 sm:text-base">
              Contact us today to discuss your construction or trading
              requirements.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <a
                href="tel:0205009955"
                className="rounded-md bg-orange-500 px-6 py-3 text-sm font-medium text-white transition hover:scale-105"
              >
                Call Now
              </a>
              <a
                href="mailto:obioneconstructioncompanyltd@gmail.com"
                className="rounded-md bg-white px-6 py-3 text-sm font-medium text-blue-900 transition hover:scale-105"
              >
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
