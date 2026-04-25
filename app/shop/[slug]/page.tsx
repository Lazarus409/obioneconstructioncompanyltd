import Link from "next/link";
import { notFound } from "next/navigation";
import { MessageCircle, Star } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { listProducts } from "@/lib/content-store";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamic = "force-dynamic";

export default async function ProductDetailPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const products = await listProducts();
  const product = products.find((item) => item.id === slug);

  if (!product) {
    notFound();
  }

  const specs = Array.isArray(product.specs) ? product.specs : [];
  const benefits = Array.isArray(product.benefits) ? product.benefits : [];

  const isOilFilter = product.id === "premium-engine-oil-filter";
  const videoSrc = product.id.startsWith("video")
    ? `/videos/${product.id}.mp4`
    : undefined;
  const isVideoProduct = Boolean(videoSrc);
  const related = products.filter((item) => item.id !== product.id).slice(0, 4);

  return (
    <>
      <Navbar />

      <main className="bg-slate-50 text-slate-800">
        <section className="bg-white px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-10 lg:grid-cols-[1fr_1.15fr]">
              <div className="rounded-2xl bg-white p-4 shadow-[0_12px_28px_rgba(15,23,42,0.08)]">
                <div className="overflow-hidden rounded-2xl">
                  {isVideoProduct ? (
                    <video
                      src={videoSrc}
                      poster={product.imageUrl}
                      className="h-full w-full object-cover"
                      controls
                      playsInline
                      preload="metadata"
                    >
                      Your browser does not support the video tag.
                    </video>
                  ) : (
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="h-full w-full object-cover"
                    />
                  )}
                </div>
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                    {isOilFilter ? "Catalog Item" : "In Stock"}
                  </span>
                  <span className="text-xs text-slate-400">{product.sku}</span>
                </div>

                <h1 className="mt-4 text-4xl font-bold text-slate-900">
                  {product.name}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-yellow-400">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="text-sm text-slate-500">
                    Product highlights
                  </span>
                </div>

                <p className="mt-5 max-w-2xl text-sm leading-7 text-slate-600">
                  {product.description}
                </p>

                <div className="mt-8 border-t border-slate-200 pt-6">
                  <h2 className="text-lg font-bold text-slate-900">
                    Product Specifications
                  </h2>
                  <div className="mt-4 space-y-3">
                    {specs.length > 0 ? (
                      specs.map((spec) => (
                        <div
                          key={spec.label}
                          className="flex flex-col justify-between gap-2 border-b border-slate-100 py-2 text-sm sm:flex-row"
                        >
                          <span className="font-medium text-slate-600">
                            {spec.label}
                          </span>
                          <span className="text-slate-900">{spec.value}</span>
                        </div>
                      ))
                    ) : (
                      <div className="rounded-xl border border-dashed border-slate-200 px-4 py-5 text-sm text-slate-500">
                        Specifications are not available for this item yet.
                      </div>
                    )}
                  </div>
                </div>

                <div className="mt-10 border-t border-slate-200 pt-6">
                  <h2 className="text-lg font-bold text-slate-900">
                    Why Choose This Part?
                  </h2>
                  <div className="mt-4 space-y-3">
                    {benefits.length > 0 ? (
                      benefits.map((benefit) => (
                        <div
                          key={benefit}
                          className="flex gap-3 text-sm text-slate-600"
                        >
                          <span className="mt-1 h-2 w-2 rounded-full bg-blue-800" />
                          <p>{benefit}</p>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-slate-500">
                        Benefits will be added soon for this item.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h2 className="text-center text-2xl font-bold text-slate-900">
                Related Products
              </h2>

              <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
                {related.map((item) => (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-white p-3 shadow-[0_12px_28px_rgba(15,23,42,0.08)]"
                  >
                    <Link href={`/shop/${item.id}`} className="block">
                      <div className="overflow-hidden rounded-xl">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          className="h-36 w-full object-cover"
                        />
                      </div>
                      <p className="mt-3 text-[10px] uppercase tracking-[0.22em] text-blue-700">
                        {item.category}
                      </p>
                      <h3 className="mt-1 text-sm font-semibold text-slate-900">
                        {item.name}
                      </h3>
                      <p className="mt-1 text-xs text-slate-500">
                        {item.subtitle}
                      </p>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* <a
            href="https://wa.me/"
            aria-label="Chat on WhatsApp"
            className="fixed bottom-6 right-6 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-green-500 text-white shadow-lg transition hover:scale-105"
          >
            <MessageCircle className="h-5 w-5" />
          </a> */}
        </section>

        <section className="bg-blue-800 px-4 py-16 text-white sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
            <h2 className="text-3xl font-bold sm:text-4xl">
              Need Help Finding Parts?
            </h2>
            <p className="mt-3 text-sm text-blue-100 sm:text-base">
              Our experts can help you find the right spare parts for your
              vehicle.
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
