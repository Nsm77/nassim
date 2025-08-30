"use client"

import { useEffect, useState } from "react"
import { Phone, FileText, Shield, Heart, CheckCircle, ArrowUp, Moon, Sun, Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function HomePage() {
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

  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode
    setIsDarkMode(newDarkMode)
    if (newDarkMode) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("darkMode", "on")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("darkMode", "off")
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowCookieBanner(false)
  }

  if (showPreloader) {
    return (
      <div className="fixed inset-0 bg-[#1B2B5C] dark:bg-gray-900 flex items-center justify-center z-[9999]">
        <div className="w-16 h-16 border-8 border-white/20 border-t-[#BE9256] rounded-full animate-spin"></div>
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
                  <Link href="/" className="nav-link active">
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
                <Link href="tel:+33982444148">
                  <Phone className="w-4 h-4 mr-2" />
                  09 82 44 41 48
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
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-xl rounded-b-2xl overflow-hidden lg:hidden z-50">
                <ul className="py-4">
                  <li>
                    <Link
                      href="/"
                      className="block px-6 py-3 text-slate-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Accueil
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/services"
                      className="block px-6 py-3 text-slate-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Services
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/faq"
                      className="block px-6 py-3 text-slate-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      FAQ
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/contact"
                      className="block px-6 py-3 text-slate-800 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
                <div className="px-6 pb-6 space-y-3">
                  <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                    <Link href="/devis">
                      <FileText className="w-4 h-4 mr-2" />
                      Obtenir un devis
                    </Link>
                  </Button>
                  <Button
                    variant="outline"
                    asChild
                    className="w-full border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white bg-transparent"
                  >
                    <Link href="tel:+33982444148">
                      <Phone className="w-4 h-4 mr-2" />
                      09 82 44 41 48
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-600 z-0" />
        <div className="absolute inset-0 bg-black/20 z-10" />

        <div className="relative z-20 container mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Protégez votre famille,
              <br />
              <span className="text-emerald-400">sécurisez votre santé</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 leading-relaxed max-w-3xl mx-auto opacity-90">
              Découvrez nos solutions d'assurance santé premium avec une couverture optimale, des tarifs compétitifs et
              un service client d'exception. Plus de 50 000 familles nous font confiance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                asChild
                className="bg-emerald-600 hover:bg-emerald-700 text-white text-lg px-8 py-4 h-auto"
              >
                <Link href="/devis">
                  <FileText className="w-5 h-5 mr-2" />
                  Obtenir un devis gratuit
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="border-white text-white hover:bg-white hover:text-slate-800 text-lg px-8 py-4 h-auto bg-transparent"
              >
                <Link href="tel:+33982444148">
                  <Phone className="w-5 h-5 mr-2" />
                  09 82 44 41 48
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
          <div className="w-8 h-8 border-b-2 border-r-2 border-white transform rotate-45 animate-bounce" />
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">
                Pourquoi choisir Assurance Santé Premium ?
              </h2>
              <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
                Nous sommes spécialisés dans la protection de votre santé et celle de votre famille. Nos conseillers
                vous accompagnent pour trouver la solution la plus adaptée à vos besoins et à votre budget.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-emerald-600 mb-2">+50 000</div>
                <div className="text-gray-600 dark:text-gray-300">Familles protégées</div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-emerald-600 mb-2">98%</div>
                <div className="text-gray-600 dark:text-gray-300">Clients satisfaits</div>
              </div>
              <div className="bg-white dark:bg-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
                <div className="text-gray-600 dark:text-gray-300">Assistance dédiée</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">
              Nos Solutions d'Assurance Santé Premium
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Une gamme complète de services pour répondre à tous vos besoins de santé, avec des garanties étendues et
              des remboursements optimaux.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/assurance-sante-website-mobile-nav-fixed/assurance-sante-website/assurance-sante-website/images/icons-health-1.jpg"
                  alt="Mutuelle Santé"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                Mutuelle Santé
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Des garanties adaptées à chaque profil, pour une couverture optimale de vos frais médicaux.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/assurance-sante-website-mobile-nav-fixed/assurance-sante-website/assurance-sante-website/images/icons-health-2.jpg"
                  alt="Assurance Hospitalisation"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                Assurance Hospitalisation
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Prise en charge complète en cas d'hospitalisation, avec des remboursements rapides.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/assurance-sante-website-mobile-nav-fixed/assurance-sante-website/assurance-sante-website/images/icons-health-3.jpg"
                  alt="Prévoyance Santé"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                Prévoyance Santé
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Anticipez les imprévus et protégez votre famille avec nos solutions de prévoyance.
              </p>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="w-16 h-16 mx-auto mb-6 rounded-full overflow-hidden">
                <Image
                  src="/assurance-sante-website-mobile-nav-fixed/assurance-sante-website/assurance-sante-website/images/icons-health-4.jpg"
                  alt="Assurance Famille"
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white group-hover:text-emerald-600 transition-colors">
                Assurance Famille
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Des formules sur-mesure pour garantir la sécurité de tous les membres de votre foyer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 dark:text-white">
                Les avantages Assurance Santé Premium
              </h2>
              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-lg">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Conseillers dédiés et disponibles</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Tarifs négociés et transparents</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Souscription rapide et 100% en ligne</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Remboursements express</span>
                </li>
                <li className="flex items-center gap-3 text-lg">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Assistance 24/7</span>
                </li>
              </ul>
            </div>
            <div className="flex-1 max-w-lg">
              <div className="rounded-2xl overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
                <Image
                  src="/assurance-sante-website-mobile-nav-fixed/assurance-sante-website/assurance-sante-website/images/Ya7Ojn3xZROC.jpg"
                  alt="Famille heureuse avec Assurance Santé"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-slate-800 to-emerald-600 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à protéger votre famille ?</h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Obtenez votre devis personnalisé en moins de 2 minutes et découvrez combien vous pouvez économiser avec
                nos solutions premium.
              </p>
              <Button size="lg" asChild className="bg-white text-slate-800 hover:bg-gray-100 text-lg px-8 py-4 h-auto">
                <Link href="/devis">
                  <FileText className="w-5 h-5 mr-2" />
                  Obtenir mon devis gratuit
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">Contactez-nous</h2>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Notre équipe d'experts est à votre disposition pour vous accompagner.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <Phone className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Par téléphone</h3>
              <p className="text-gray-600 dark:text-gray-300">
                <Link href="tel:+33982444148" className="text-emerald-600 hover:underline">
                  09 82 44 41 48
                </Link>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Par email</h3>
              <p className="text-gray-600 dark:text-gray-300">
                <Link href="mailto:contact@assurance-sante-premium.fr" className="text-emerald-600 hover:underline">
                  contact@assurance-sante-premium.fr
                </Link>
              </p>
            </div>

            <div className="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300">
              <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Adresse</h3>
              <p className="text-gray-600 dark:text-gray-300">99 rue de camas, 13005 Marseille</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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

      {/* Fixed Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="w-12 h-12 bg-white dark:bg-gray-800 text-slate-800 dark:text-emerald-400 rounded-full shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center"
          aria-label="Activer/désactiver le mode sombre"
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

        {/* Back to Top */}
        {showBackToTop && (
          <button
            onClick={scrollToTop}
            className="w-12 h-12 bg-slate-800 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-110 hover:bg-emerald-600 transition-all duration-300 flex items-center justify-center"
            aria-label="Retour en haut"
          >
            <ArrowUp className="w-6 h-6" />
          </button>
        )}
      </div>

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 bg-slate-800/95 backdrop-blur-lg text-white p-6 z-50 shadow-2xl">
          <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm md:text-base flex-1">
              Ce site utilise des cookies pour améliorer votre expérience de navigation et analyser notre trafic. En
              continuant, vous acceptez notre utilisation des cookies.
            </p>
            <div className="flex gap-3">
              <Button onClick={acceptCookies} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                Accepter
              </Button>
              <Button
                variant="outline"
                onClick={acceptCookies}
                className="border-white text-white hover:bg-white hover:text-slate-800 bg-transparent"
              >
                Personnaliser
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
