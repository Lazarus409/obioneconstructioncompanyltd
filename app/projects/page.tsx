import { connection } from "next/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsGallery from "@/components/ProjectsGallery";
import ProjectsHero from "@/components/ProjectsHero";
import { listProjects } from "@/lib/content-store";

export default async function ProjectsPage() {
  await connection();
  const projects = await listProjects();

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
          <ProjectsHero />
        </section>

        <section className="bg-white px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <ProjectsGallery projects={projects} />
          </div>
        </section>

        <section className="bg-blue-800 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Interested in Our Work?
            </h2>

            <p className="mt-4 text-sm text-blue-100 sm:text-base">
              Contact us to discuss your next construction or electrical
              project.
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
