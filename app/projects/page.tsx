"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

/*PROJECT DATA (IMAGES + VIDEOS)*/
const projects = [
  { type: "image", src: "/images/project12.png" },
  { type: "video", src: "/videos/video1.mp4" },
  { type: "image", src: "/images/project2.png" },
  { type: "video", src: "/videos/video2.mp4" },
  { type: "image", src: "/images/project3.png" },
  { type: "image", src: "/images/project4.png" },
  { type: "image", src: "/images/project5.png" },
  { type: "image", src: "/images/project6.png" },
  { type: "image", src: "/images/project7.png" },
  { type: "image", src: "/images/project8.png" },
  { type: "image", src: "/images/project9.png" },
  { type: "image", src: "/images/project10.png" },
  { type: "image", src: "/images/project11.png" },
  { type: "image", src: "/images/project1.png" },
];

/* PAGE*/
export default function ProjectsPage() {
  return (
    <>
      <Navbar />

      <main className="bg-slate-50 text-slate-800">
        {/* HEADER */}
        <section className="bg-slate-100 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-4xl font-bold text-slate-900"
            >
              Our Projects
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mx-auto mt-4 max-w-2xl text-sm text-slate-500 sm:text-base"
            >
              A showcase of our completed construction projects and
              developments.
            </motion.p>
          </div>
        </section>

        {/* PROJECT GRID */}
        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.07 }}
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-[28px] bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-100"
                >
                  <div className="relative overflow-hidden rounded-[22px]">
                    {/* IMAGE */}
                    {project.type === "image" && (
                      <img
                        src={project.src}
                        alt="Project"
                        className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    )}

                    {/* VIDEO */}
                    {project.type === "video" && (
                      <video
                        src={project.src}
                        className="h-72 w-full object-cover"
                        muted
                        loop
                        playsInline
                        onMouseEnter={(e) => e.currentTarget.play()}
                        onMouseLeave={(e) => e.currentTarget.pause()}
                      />
                    )}

                    {/* PLAY OVERLAY (for videos only) */}
                    {project.type === "video" && (
                      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition group-hover:opacity-100">
                        <div className="rounded-full bg-black/60 px-4 py-2 text-white text-sm">
                          ▶ Play
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-blue-800 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Interested in Our Work?
            </h2>

            <p className="mt-4 text-sm text-blue-100 sm:text-base">
              Contact us to discuss your next construction project.
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
