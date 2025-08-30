import Link from "next/link"

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <h4 className="text-xl font-semibold mb-6 text-emerald-400 relative">
              Assurance Santé
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" />
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="hover:text-emerald-400 transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-emerald-400 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/faq" className="hover:text-emerald-400 transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-emerald-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 text-emerald-400 relative">
              Informations
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" />
            </h4>
            <ul className="space-y-3">
              <li>
                <Link href="/mentions" className="hover:text-emerald-400 transition-colors">
                  Mentions légales
                </Link>
              </li>
              <li>
                <Link href="/politique" className="hover:text-emerald-400 transition-colors">
                  Politique de confidentialité
                </Link>
              </li>
              <li>
                <Link href="/conditions" className="hover:text-emerald-400 transition-colors">
                  Conditions générales
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-6 text-emerald-400 relative">
              Suivez-nous
              <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" />
            </h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 hover:scale-110 transition-all"
                aria-label="Facebook"
              >
                <span className="text-lg">f</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 hover:scale-110 transition-all"
                aria-label="Twitter"
              >
                <span className="text-lg">t</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 hover:scale-110 transition-all"
                aria-label="Instagram"
              >
                <span className="text-lg">i</span>
              </Link>
              <Link
                href="#"
                className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 hover:scale-110 transition-all"
                aria-label="LinkedIn"
              >
                <span className="text-lg">in</span>
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 text-center opacity-70">
          <p>&copy; {new Date().getFullYear()} Assurance Santé Premium. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  )
}
