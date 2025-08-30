"use client"

import { useState, useEffect } from "react"
import {
  Phone,
  FileText,
  Shield,
  Users,
  Crown,
  UserX as UserMd,
  Hospital,
  Eye,
  Leaf,
  Stethoscope,
  Bed,
  Bluetooth as Tooth,
  Glasses,
  Smile,
  HandHeart,
  Space as Spa,
  Dumbbell,
  Calculator,
  ShieldCheck,
  ArrowUp,
  Moon,
  Sun,
  Menu,
  X,
  Check,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function ServicesPage() {
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
                  <Link href="/services" className="nav-link active">
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
                      className="block px-6 py-3 text-emerald-600 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
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
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-48 h-48 bg-slate-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 w-24 h-24 bg-emerald-300/30 rounded-full blur-2xl animate-pulse delay-500" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Solutions d'Assurance Santé <span className="text-emerald-400">Premium</span>
          </h1>
          <p className="text-xl md:text-2xl mb-12 opacity-90 max-w-3xl mx-auto">
            Protégez votre santé et celle de votre famille avec nos formules complètes et personnalisées
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">98%</div>
              <div className="text-lg opacity-90">Satisfaction client</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">24h</div>
              <div className="text-lg opacity-90">Assistance</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400 mb-2">15k+</div>
              <div className="text-lg opacity-90">Praticiens partenaires</div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">
              Choisissez Votre Formule
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Des solutions adaptées à tous les besoins et tous les budgets
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Essentiel Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UserMd className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">Essentiel</h3>
                <p className="text-gray-600 dark:text-gray-300">Pour une protection de base</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span className="text-2xl font-bold text-emerald-600">€</span>
                  <span className="text-5xl font-bold text-slate-800 dark:text-white">29</span>
                  <span className="text-lg text-gray-600 dark:text-gray-300">/mois</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Consultations remboursées 150%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Tiers payant intégral</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Téléconsultation incluse</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Forfait dentaire 300€/an</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Forfait optique 200€/2ans</span>
                </div>
              </div>

              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/devis">
                  Choisir Essentiel
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Famille Plan - Featured */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:-translate-y-2 relative border-2 border-emerald-500">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <div className="bg-emerald-600 text-white px-6 py-2 rounded-full text-sm font-semibold">Recommandé</div>
              </div>

              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">Famille</h3>
                <p className="text-gray-600 dark:text-gray-300">Protection complète familiale</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span className="text-2xl font-bold text-emerald-600">€</span>
                  <span className="text-5xl font-bold text-slate-800 dark:text-white">89</span>
                  <span className="text-lg text-gray-600 dark:text-gray-300">/mois</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Consultations remboursées 200%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Jusqu'à 6 personnes</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">-20% dès le 3ème enfant</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Forfait dentaire 800€/an</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Orthodontie jusqu'à 16 ans</span>
                </div>
              </div>

              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/devis">
                  Choisir Famille
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>

            {/* Premium Plan */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-slate-800 dark:text-white">Premium</h3>
                <p className="text-gray-600 dark:text-gray-300">Le summum de la protection</p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center">
                  <span className="text-2xl font-bold text-emerald-600">€</span>
                  <span className="text-5xl font-bold text-slate-800 dark:text-white">149</span>
                  <span className="text-lg text-gray-600 dark:text-gray-300">/mois</span>
                </div>
              </div>

              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Consultations remboursées 300%</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Chambre particulière garantie</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Forfait dentaire 1500€/an</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Médecines douces 500€/an</span>
                </div>
                <div className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 dark:text-gray-300">Assistance mondiale</span>
                </div>
              </div>

              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/devis">
                  Choisir Premium
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Showcase */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">
              Nos Garanties en Détail
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Découvrez tous les avantages de nos formules d'assurance santé
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Soins Courants */}
            <div className="bg-white dark:bg-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Stethoscope className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Soins Courants</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <UserMd className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Médecine Générale</h4>
                    <p className="text-gray-600 dark:text-gray-300">Remboursement jusqu'à 200% avec tiers payant</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Eye className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Spécialistes</h4>
                    <p className="text-gray-600 dark:text-gray-300">15 000+ praticiens partenaires</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Analyses & Examens</h4>
                    <p className="text-gray-600 dark:text-gray-300">Laboratoires pris en charge à 100%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hospitalisation */}
            <div className="bg-white dark:bg-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Hospital className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Hospitalisation</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Bed className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Chambre Particulière</h4>
                    <p className="text-gray-600 dark:text-gray-300">Garantie sans supplément</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <FileText className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Forfait Journalier</h4>
                    <p className="text-gray-600 dark:text-gray-300">Jusqu'à 120€/jour sans limitation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Transport Sanitaire</h4>
                    <p className="text-gray-600 dark:text-gray-300">Ambulance 24h/24 selon prescription</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Dentaire & Optique */}
            <div className="bg-white dark:bg-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Tooth className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Dentaire & Optique</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Tooth className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Soins Dentaires</h4>
                    <p className="text-gray-600 dark:text-gray-300">Forfait jusqu'à 1500€/an</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Glasses className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Optique Premium</h4>
                    <p className="text-gray-600 dark:text-gray-300">Forfait jusqu'à 800€/2 ans</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Smile className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Orthodontie</h4>
                    <p className="text-gray-600 dark:text-gray-300">Prise en charge jusqu'à 16 ans</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Médecines Douces */}
            <div className="bg-white dark:bg-gray-700 rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Médecines Douces</h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <HandHeart className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Ostéopathie</h4>
                    <p className="text-gray-600 dark:text-gray-300">Jusqu'à 8 séances/an remboursées</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Spa className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Acupuncture</h4>
                    <p className="text-gray-600 dark:text-gray-300">Praticiens agréés partenaires</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Dumbbell className="w-5 h-5 text-emerald-600 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-slate-800 dark:text-white">Kinésithérapie</h4>
                    <p className="text-gray-600 dark:text-gray-300">Remboursement complémentaire</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-600" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-emerald-400/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-48 h-48 bg-slate-400/20 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 container mx-auto px-4 text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Prêt à Protéger Votre Santé ?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Obtenez votre devis personnalisé en 2 minutes et bénéficiez de nos tarifs préférentiels
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Button size="lg" asChild className="bg-white text-slate-800 hover:bg-gray-100 text-lg px-8 py-4 h-auto">
              <Link href="/devis">
                <Calculator className="w-5 h-5 mr-2" />
                Devis Gratuit
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

          <div className="flex items-center justify-center gap-2 text-sm opacity-80">
            <ShieldCheck className="w-4 h-4" />
            <span>Sans engagement • Réponse immédiate • Conseiller dédié</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-xl font-semibold mb-6 text-emerald-400 relative">
                <Shield className="w-6 h-6 inline mr-2" />
                Assurance Santé Premium
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" />
              </h4>
              <p className="text-gray-300 mb-6">
                Votre partenaire de confiance pour une couverture santé optimale. Des solutions sur-mesure pour protéger
                votre famille et votre avenir.
              </p>
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
                  aria-label="LinkedIn"
                >
                  <span className="text-lg">in</span>
                </Link>
                <Link
                  href="#"
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-emerald-600 hover:-translate-y-1 hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <span className="text-lg">i</span>
                </Link>
              </div>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6 text-emerald-400 relative">
                Navigation
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
                    Nos Services
                  </Link>
                </li>
                <li>
                  <Link href="/devis" className="hover:text-emerald-400 transition-colors">
                    Obtenir un Devis
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
                Informations Légales
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" />
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link href="/mentions" className="hover:text-emerald-400 transition-colors">
                    Mentions Légales
                  </Link>
                </li>
                <li>
                  <Link href="/politique" className="hover:text-emerald-400 transition-colors">
                    Politique de Confidentialité
                  </Link>
                </li>
                <li>
                  <Link href="/conditions" className="hover:text-emerald-400 transition-colors">
                    Conditions Générales de Vente
                  </Link>
                </li>
                <li>
                  <Link href="/espace-client" className="hover:text-emerald-400 transition-colors">
                    Espace Client
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-xl font-semibold mb-6 text-emerald-400 relative">
                Contact Rapide
                <div className="absolute bottom-0 left-0 w-12 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full" />
              </h4>
              <div className="space-y-3 text-sm">
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4 text-emerald-400">📍</span>
                  99 rue de camas, 13005 Marseille
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <Link href="tel:+33982444148" className="hover:text-emerald-400 transition-colors">
                    09 82 44 41 48
                  </Link>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4 text-emerald-400">✉️</span>
                  <Link
                    href="mailto:contact@assurance-sante-premium.fr"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    contact@assurance-sante-premium.fr
                  </Link>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-4 h-4 text-emerald-400">🕒</span>
                  Lun-Ven: 9h-18h
                </p>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center opacity-70">
            <p>&copy; 2025 Assurance Santé Premium. Tous droits réservés.</p>
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
