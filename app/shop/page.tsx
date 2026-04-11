import { connection } from "next/server";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ShopCatalog from "@/components/ShopCatalog";
import { listProducts } from "@/lib/content-store";
import { MessageCircle } from "lucide-react";

export default async function ShopPage() {
  await connection();
  const products = await listProducts();

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 text-slate-800">
        <section className="bg-white px-4 py-8 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <ShopCatalog products={products} />
          </div>

          <a
            href="https://wa.me/"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
          </a>
        </section>

        <section className="bg-blue-800 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Need Help Finding Parts?
            </h2>
            <p className="mt-3 text-sm text-blue-100 sm:text-base">
              Our team can help you find the right spare parts for your vehicle.
            </p>
            <a
              href="/contact"
              className="mt-8 rounded-md bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:scale-105"
            >
              Contact Our Team
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
