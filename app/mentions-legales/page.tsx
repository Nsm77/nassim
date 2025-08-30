"use client"

import { useState, useEffect } from "react"
import { Shield, Menu, X, FileText, User } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function MentionsLegalesPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  useEffect(() => {
    // Preloader
    const timer = setTimeout(() => {
      setShowPreloader(false)
    }, 1000)

    // Dark mode from localStorage
    const darkMode = localStorage.getItem("darkMode") === "on"
    setIsDarkMode(darkMode)
    if (darkMode) {
      document.documentElement.classList.add("dark")
    }

    // Cookie consent
    if (!localStorage.getItem("cookieConsent")) {
      setShowCookieBanner(true)
    }

    // Scroll handlers
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      setShowBackToTop(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      clearTimeout(timer)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowCookieBanner(false)
  }

  if (showPreloader) {
    return (
      <div className="fixed inset-0 bg-slate-800 dark:bg-gray-900 flex items-center justify-center z-[9999]">
        <div className="w-16 h-16 border-8 border-white/20 border-t-emerald-600 rounded-full animate-spin"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-colors duration-300">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl shadow-lg border-b border-emerald-500/20"
            : "bg-white/98 dark:bg-gray-900/98 backdrop-blur-xl shadow-sm border-b border-gray-200/30 dark:border-gray-700/30"
        }`}
      >
        <nav className={`container mx-auto px-4 transition-all duration-300 ${isScrolled ? "py-3" : "py-5"}`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="flex items-center gap-3 text-2xl font-bold text-slate-800 dark:text-white hover:scale-105 transition-transform"
            >
              <Shield className="w-8 h-8 text-emerald-600" />
              Assurance Santé
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center justify-center flex-1">
              <ul className="flex items-center gap-8">
                <li>
                  <Link href="/" className="nav-link">
                    Accueil
                  </Link>
                </li>
                <li>
                  <Link href="/services" className="nav-link">
                    Services
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="nav-link">
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="nav-link">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/devis">
                  <FileText className="w-4 h-4 mr-2" />
                  Obtenir un devis
                </Link>
              </Button>
              <Button
                variant="outline"
                asChild
                className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white bg-transparent"
              >
                <Link href="/espace-client">
                  <User className="w-4 h-4 mr-2" />
                  Espace Client
                </Link>
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-slate-800 dark:text-white"
              aria-label="Menu de navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <>
              <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-xl rounded-b-2xl overflow-hidden lg:hidden z-50"></div>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Mentions Légales</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Informations légales et conditions d'utilisation
          </p>
        </div>
      </section>

      {/* Legal Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Identification */}
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
              1. Identification de l'entreprise
            </h2>

            <div className="space-y-4">
              <h4 className="text-lg font-semibold text-emerald-600">Assurance Santé Premium</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-600 dark:text-gray-300">
                <p>
                  <strong>Forme juridique :</strong> Société par Actions Simplifiée (SAS)
                </p>
                <p>
                  <strong>Capital social :</strong> 500 000 euros
                </p>
                <p>
                  <strong>Siège social :</strong> 99 rue de camas, 13005 Marseille, France
                </p>
                <p>
                  <strong>RCS :</strong> Marseille B 123 456 789
                </p>
                <p>
                  <strong>SIRET :</strong> 123 456 789 00012
                </p>
                <p>
                  <strong>Code APE :</strong> 6512Z (Autres assurances)
                </p>
                <p>
                  <strong>TVA Intracommunautaire :</strong> FR12 123456789
                </p>
                <p>
                  <strong>Président :</strong> Jean-Pierre MARTIN
                </p>
              </div>

              <div className="mt-6 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <h5 className="font-semibold text-slate-800 dark:text-white mb-2">Contact</h5>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Téléphone :</strong> 09 82 44 41 48
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Email :</strong> contact@assurance-sante-premium.fr
                </p>
                <p className="text-gray-600 dark:text-gray-300">
                  <strong>Horaires :</strong> Du lundi au vendredi de 9h à 18h, samedi de 9h à 12h
                </p>
              </div>
            </div>
          </div>

          {/* Autorités de contrôle */}
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">
              2. Autorités de contrôle et supervision
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Assurance Santé Premium est soumise au contrôle des autorités suivantes :
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-emerald-600 mb-2">
                  Autorité de Contrôle Prudentiel et de Résolution (ACPR)
                </h4>
                <p className="text-gray-600 dark:text-gray-300">4 Place de Budapest, CS 92459, 75436 Paris Cedex 09</p>
                <p className="text-gray-600 dark:text-gray-300">Téléphone : 01 49 95 40 00</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Site web :{" "}
                  <a
                    href="https://acpr.banque-france.fr"
                    target="_blank"
                    className="text-emerald-600 hover:underline"
                    rel="noreferrer"
                  >
                    https://acpr.banque-france.fr
                  </a>
                </p>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-emerald-600 mb-2">Médiateur de l'Assurance</h4>
                <p className="text-gray-600 dark:text-gray-300">TSA 50110, 75441 Paris Cedex 09</p>
                <p className="text-gray-600 dark:text-gray-300">
                  Site web :{" "}
                  <a
                    href="https://www.mediation-assurance.org"
                    target="_blank"
                    className="text-emerald-600 hover:underline"
                    rel="noreferrer"
                  >
                    https://www.mediation-assurance.org
                  </a>
                </p>
              </div>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <p className="text-slate-800 dark:text-white">
                  <strong>Numéro d'agrément ACPR :</strong> 123456
                </p>
                <p className="text-gray-600 dark:text-gray-300 mt-2">
                  Assurance Santé Premium est habilitée à exercer dans les branches d'assurance maladie et accidents
                  corporels sur l'ensemble du territoire français.
                </p>
              </div>
            </div>
          </div>

          {/* Continue with other sections... */}
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">3. Hébergement du site web</h2>

            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Le site web www.assurance-sante-premium.fr est hébergé par :
            </p>

            <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="text-lg font-semibold text-emerald-600 mb-2">OVH SAS</h4>
              <p className="text-gray-600 dark:text-gray-300">2 rue Kellermann, 59100 Roubaix, France</p>
              <p className="text-gray-600 dark:text-gray-300">Téléphone : 09 72 10 10 07</p>
              <p className="text-gray-600 dark:text-gray-300">
                Site web :{" "}
                <a
                  href="https://www.ovh.com"
                  target="_blank"
                  className="text-emerald-600 hover:underline"
                  rel="noreferrer"
                >
                  https://www.ovh.com
                </a>
              </p>
            </div>
          </div>

          {/* Propriété intellectuelle */}
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">4. Propriété intellectuelle</h2>

            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                L'ensemble du contenu de ce site web (textes, images, vidéos, logos, graphismes, icônes, sons,
                logiciels, etc.) est la propriété exclusive d'Assurance Santé Premium ou fait l'objet d'une autorisation
                d'utilisation.
              </p>

              <p>
                Ces éléments sont protégés par les lois françaises et internationales relatives à la propriété
                intellectuelle. Toute reproduction, représentation, modification, publication, adaptation de tout ou
                partie des éléments du site, quel que soit le moyen ou le procédé utilisé, est interdite, sauf
                autorisation écrite préalable d'Assurance Santé Premium.
              </p>

              <div className="mt-6">
                <h4 className="text-lg font-semibold text-emerald-600 mb-2">Marques et logos</h4>
                <p>
                  Les marques "Assurance Santé Premium" et tous les logos associés sont des marques déposées. Toute
                  utilisation non autorisée de ces marques constitue une contrefaçon passible de sanctions pénales.
                </p>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Contact</h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Pour toute question concernant ces mentions légales ou l'utilisation de notre site web, vous pouvez nous
              contacter :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <p className="text-slate-800 dark:text-white">
                  <strong>Par téléphone :</strong> 09 82 44 41 48
                </p>
                <p className="text-slate-800 dark:text-white">
                  <strong>Par email :</strong> contact@assurance-sante-premium.fr
                </p>
              </div>
              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <p className="text-slate-800 dark:text-white">
                  <strong>Par courrier :</strong> Assurance Santé Premium, 99 rue de camas, 13005 Marseille
                </p>
                <p className="text-slate-800 dark:text-white">
                  <strong>Via notre formulaire :</strong>{" "}
                  <Link href="/contact" className="text-emerald-600 hover:underline">
                    Page de contact
                  </Link>
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Dernière mise à jour :</strong> 15 février 2024
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 flex items-center justify-center"
          aria-label="Retour en haut"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}

      {/* Cookie Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-4 shadow-lg z-50">
          <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Nous utilisons des cookies pour améliorer votre expérience sur notre site.
            </p>
            <div className="flex gap-2">
              <Button onClick={acceptCookies} size="sm" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Accepter
              </Button>
              <Button
                onClick={() => setShowCookieBanner(false)}
                variant="outline"
                size="sm"
                className="border-gray-300 text-gray-600 hover:bg-gray-50 bg-transparent"
              >
                Refuser
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
