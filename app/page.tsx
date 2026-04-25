import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutCompany from "@/components/AboutCompany";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import ProjectsGallery from "@/components/ProjectsGallery";
import Products from "@/components/Products";
import CallToAction from "@/components/CallToAction";
import { listProducts, listProjects } from "@/lib/content-store";
import Footer from "@/components/Footer";

const BOGLA_PROOF_CATEGORY = "Bogla Proof Works";
const ELECTRICAL_WORKS_CATEGORY = "Electrical Works";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [projects, products] = await Promise.all([
    listProjects(),
    listProducts(),
  ]);
  const boglaProofWorks = projects.filter(
    (project) => project.category === BOGLA_PROOF_CATEGORY,
  );
  const electricalWorks = projects.filter(
    (project) => project.category === ELECTRICAL_WORKS_CATEGORY,
  );
  const featuredProjects = [
    ...projects.filter(
      (project) =>
        project.featured &&
        project.category !== BOGLA_PROOF_CATEGORY &&
        project.category !== ELECTRICAL_WORKS_CATEGORY,
    ),
    ...projects.filter(
      (project) =>
        !project.featured &&
        project.category !== BOGLA_PROOF_CATEGORY &&
        project.category !== ELECTRICAL_WORKS_CATEGORY,
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
      <section
        id="electrical-works"
        className="bg-white px-4 py-16 sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="mt-3 text-3xl font-bold text-slate-900 sm:text-4xl">
              Electrical Works
            </h2>
            <p className="mt-4 text-sm leading-6 text-slate-500 sm:text-base">
              Electrical installation, wiring, and finishing updates from the electrical
              works collection.
            </p>
          </div>

          <ProjectsGallery projects={electricalWorks} />
        </div>
      </section>
      <Products products={products} />
      <CallToAction />
      <Footer />
    </>
  );
}
