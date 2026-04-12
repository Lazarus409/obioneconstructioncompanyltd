import { connection } from "next/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutCompany from "@/components/AboutCompany";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import ProjectsGallery from "@/components/ProjectsGallery";
import FeaturedProducts from "@/components/FeaturedProducts";
import CallToAction from "@/components/CallToAction";
import { listProducts, listProjects } from "@/lib/content-store";
import Footer from "@/components/Footer";

const BOGLA_PROOF_CATEGORY = "Bogla Proof Works";

export default async function Home() {
  await connection();

  const [projects, products] = await Promise.all([
    listProjects(),
    listProducts(),
  ]);
  const boglaProofWorks = projects.filter(
    (project) => project.category === BOGLA_PROOF_CATEGORY,
  );
  const featuredProjects = [
    ...projects.filter(
      (project) =>
        project.featured && project.category !== BOGLA_PROOF_CATEGORY,
    ),
    ...projects.filter(
      (project) =>
        !project.featured && project.category !== BOGLA_PROOF_CATEGORY,
    ),
  ].slice(0, 4);

  return (
    <>
      <Navbar />
      <Hero />
      <AboutCompany />
      <Services />

      <Projects projects={featuredProjects} />
      <section
        id="bogla-proof-works"
        className="bg-slate-50 px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Bogla Proof Works
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Project and video updates from the Bogla proof works collection.
            </p>
          </div>

          <ProjectsGallery projects={boglaProofWorks} />
        </div>
      </section>
      <FeaturedProducts
        products={products.filter((product) => product.featured).slice(0, 4)}
      />
      <CallToAction />
      <Footer />
    </>
  );
}
