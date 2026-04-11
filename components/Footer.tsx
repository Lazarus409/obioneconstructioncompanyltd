import { Mail, MapPin, Phone, X } from "lucide-react";

export default function Footer() {
  return (
    <footer className="border-t-4 border-blue-800 bg-[#161d2d] px-6 py-8 text-slate-300 sm:px-8 lg:px-10">
      <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 xl:grid-cols-4">
        <div>
          <h3 className="text-base font-bold text-white">
            Obi One Trading & Construction Ltd
          </h3>
          <p className="mt-3 max-w-xs text-sm leading-6 text-slate-400">
            Providing quality construction services and genuine car spare parts
            since 2002.
          </p>
          <div className="mt-4 flex items-center gap-3 text-slate-400">
            <a
              href="#"
              aria-label="Facebook"
              className="text-xs font-semibold transition hover:text-white"
            >
              Fb
            </a>
            <a
              href="#"
              aria-label="Twitter"
              className="transition hover:text-white"
            >
              <X className="h-3.5 w-3.5" />
            </a>
            <a
              href="#"
              aria-label="LinkedIn"
              className="text-xs font-semibold transition hover:text-white"
            >
              in
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Quick Links</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-400">
            <a href="/" className="block transition hover:text-white">
              Home
            </a>
            <a href="/about" className="block transition hover:text-white">
              About Us
            </a>
            <a href="/services" className="block transition hover:text-white">
              Services
            </a>
            <a href="/projects" className="block transition hover:text-white">
              Projects
            </a>
            <a href="/shop" className="block transition hover:text-white">
              Shop
            </a>
            <a href="/contact" className="block transition hover:text-white">
              Contact
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Our Services</h4>
          <div className="mt-3 space-y-2 text-sm text-slate-400">
            <p>Construction</p>
            <p>Real Estate</p>
            <p>Renovation</p>
            <p>Spare Parts</p>
            <p>Maintenance</p>
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-white">Contact Us</h4>
          <div className="mt-3 space-y-3 text-sm text-slate-400">
            <div className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <p>Asofan, Accra</p>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <p>0205009955 / 0302455587</p>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" />
              <p>obionecompanyltd@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-7 max-w-6xl border-t border-slate-800 pt-5 text-center text-xs text-slate-500">
        © 2023 Obi One Trading and Construction Ltd. All rights reserved.
      </div>
    </footer>
  );
}
