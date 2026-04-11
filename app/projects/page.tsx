import { connection } from "next/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProjectsGallery from "@/components/ProjectsGallery";
import { listProjects } from "@/lib/content-store";

export default async function ProjectsPage() {
  await connection();
  const projects = await listProjects();

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 text-slate-800">
        <section className="bg-slate-100 px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl text-center">
            <h1 className="text-4xl font-bold text-slate-900">Our Projects</h1>
            <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-500 sm:text-base">
              A showcase of our completed construction projects and developments.
            </p>
          </div>
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
