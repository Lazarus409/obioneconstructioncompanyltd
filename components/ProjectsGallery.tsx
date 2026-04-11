"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ProjectRecord } from "@/lib/content-store";

type ProjectsGalleryProps = {
  projects: ProjectRecord[];
};

export default function ProjectsGallery({ projects }: ProjectsGalleryProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {projects.map((project, index) => (
        <motion.div
          key={project.id}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.45, delay: index * 0.07 }}
          whileHover={{ y: -8 }}
          className="group overflow-hidden rounded-[28px] bg-white p-2 shadow-[0_18px_45px_rgba(15,23,42,0.12)] ring-1 ring-slate-100"
        >
          <div className="relative overflow-hidden rounded-[22px]">
            {project.mediaType === "video" ? (
              <video
                src={project.mediaUrl}
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
                muted
                loop
                playsInline
              />
            ) : (
              <img
                src={project.mediaUrl}
                alt={project.title}
                className="h-72 w-full object-cover transition duration-700 group-hover:scale-110"
              />
            )}
          </div>

          <div className="px-2 pb-2 pt-4">
            <p className="text-[10px] uppercase tracking-[0.22em] text-blue-700">
              {project.category}
            </p>
            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              {project.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-slate-500">
              {project.description}
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-flex rounded-full bg-blue-800 px-4 py-2 text-xs font-medium text-white transition hover:scale-105"
            >
              Discuss a similar project
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

