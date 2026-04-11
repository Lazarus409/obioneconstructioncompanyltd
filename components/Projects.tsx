// components/Projects.tsx
"use client";

import { motion } from "framer-motion";

const projects = [
  {
    title: "Modern Office Building",
    category: "Commercial construction",
    image: "/images/project2.png",
  },
  {
    title: "Luxury Residential Home",
    category: "Residential construction",
    image: "/images/project5.png",
  },
  {
    title: "Car Dealership Complex",
    category: "Commercial renovation",
    image: "/images/project6.png",
  },
  {
    title: "Apartment Complex",
    category: "Multi-unit residential",
    image: "/images/project8.png",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-10 text-center text-3xl font-bold text-slate-800">
          Our Projects
        </h2>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_25px_rgba(15,23,42,0.08)]"
            >
              <img
                src={project.image}
                alt={project.title}
                className="h-44 w-full object-cover"
              />
              <div className="px-4 py-4 text-left">
                <h3 className="text-sm font-semibold text-slate-900">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs text-slate-500">
                  {project.category}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
