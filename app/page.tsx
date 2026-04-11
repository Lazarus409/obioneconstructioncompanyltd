import { connection } from "next/server";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutCompany from "@/components/AboutCompany";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import FeaturedProducts from "@/components/FeaturedProducts";
import CallToAction from "@/components/CallToAction";
import { listProducts, listProjects } from "@/lib/content-store";
import Footer from "@/components/Footer";

export default async function Home() {
  await connection();

  const [projects, products] = await Promise.all([listProjects(), listProducts()]);

  return (
    <>
      <Navbar />
      <Hero />
      <AboutCompany />
      <Services />
      <Projects projects={projects.filter((project) => project.featured).slice(0, 4)} />
      <FeaturedProducts products={products.filter((product) => product.featured).slice(0, 4)} />
      <CallToAction />
      <Footer />
    </>
  );
}
