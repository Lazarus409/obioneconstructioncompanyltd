"use client";

import { motion } from "framer-motion";

export default function ProjectsHero() {
  return (
    <div className="relative mx-auto max-w-6xl text-center">
      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold"
      >
        Our Projects
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="mx-auto mt-4 max-w-2xl text-sm text-blue-100 sm:text-base"
      >
        A showcase of our completed construction and electrical works projects.
      </motion.p>
    </div>
  );
}
