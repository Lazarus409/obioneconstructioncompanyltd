"use client";

import { motion } from "framer-motion";
import type { ProjectRecord } from "@/lib/content-store";

type ProjectsProps = {
  projects: ProjectRecord[];
};

export default function Projects({ projects }: ProjectsProps) {
  return (
    <section id="projects" className="bg-white px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <h2 className="mb-4 text-center text-3xl font-bold text-slate-800">
          Our Projects
        </h2>
        <p className="mx-auto mb-10 max-w-2xl text-center text-sm text-slate-500">
          A few recent project highlights pulled directly from the admin-managed content.
        </p>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -6 }}
              className="overflow-hidden rounded-2xl bg-white shadow-[0_10px_25px_rgba(15,23,42,0.08)]"
            >
              {project.mediaType === "video" ? (
                <video
                  src={project.mediaUrl}
                  className="h-44 w-full object-cover"
                  muted
                  loop
                  playsInline
                />
              ) : (
                <img
                  src={project.mediaUrl}
                  alt={project.title}
                  className="h-44 w-full object-cover"
                />
              )}
              <div className="px-4 py-4 text-left">
                <p className="text-[10px] uppercase tracking-[0.22em] text-blue-700">
                  {project.category}
                </p>
                <h3 className="mt-2 text-sm font-semibold text-slate-900">
                  {project.title}
                </h3>
                <p className="mt-1 text-xs leading-6 text-slate-500">
                  {project.description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
