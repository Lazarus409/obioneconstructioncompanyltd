// app/page.tsx
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import AboutCompany from "@/components/AboutCompany";
import Services from "@/components/Services";
import Projects from "@/components/Projects";
import FeaturedProducts from "@/components/FeaturedProducts";
import CallToAction from "@/components/CallToAction";

import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <AboutCompany />
      <Services />
      <Projects />
      <FeaturedProducts />
      <CallToAction />
      <Footer />
    </>
  );
}
