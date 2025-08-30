"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  FileText,
  Shield,
  Menu,
  X,
  Lock,
  Eye,
  EyeOff,
  User,
  LogIn,
  Calendar,
  FileInputIcon as FileInvoice,
  DollarSign,
  UserCog,
  HelpCircle,
  LogOut,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function EspaceClientPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const [showCookieBanner, setShowCookieBanner] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
    remember: false,
  })

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

    // Check if user is logged in
    const loggedIn = localStorage.getItem("isLoggedIn") === "true"
    setIsLoggedIn(loggedIn)

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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Simulate login
    localStorage.setItem("isLoggedIn", "true")
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn")
    setIsLoggedIn(false)
  }

  const updateLoginData = (field: string, value: any) => {
    setLoginData((prev) => ({ ...prev, [field]: value }))
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
                    <Link href="/espace-client">
                      <User className="w-4 h-4 mr-2" />
                      Espace Client
                    </Link>
                  </Button>
                </div>
              </div>
            </>
          )}
        </nav>
      </header>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Espace Client</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Gérez votre assurance santé en toute simplicité
          </p>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          {!isLoggedIn ? (
            /* Login Section */
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Login Form */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Lock className="w-8 h-8 text-emerald-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Connexion</h3>
                  <p className="text-gray-600 dark:text-gray-300">Accédez à votre espace personnel sécurisé</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">Email *</label>
                    <Input
                      type="email"
                      value={loginData.email}
                      onChange={(e) => updateLoginData("email", e.target.value)}
                      placeholder="votre@email.com"
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                      Mot de passe *
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        value={loginData.password}
                        onChange={(e) => updateLoginData("password", e.target.value)}
                        placeholder="••••••••"
                        required
                        className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500 pr-12"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={loginData.remember}
                        onChange={(e) => updateLoginData("remember", e.target.checked)}
                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-600 dark:text-gray-300">Se souvenir de moi</span>
                    </label>
                    <Link href="#" className="text-sm text-emerald-600 hover:underline">
                      Mot de passe oublié ?
                    </Link>
                  </div>

                  <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-3">
                    <LogIn className="w-5 h-5 mr-2" />
                    Se connecter
                  </Button>
                </form>

                <div className="text-center mt-6">
                  <p className="text-gray-600 dark:text-gray-300">
                    Pas encore de compte ?{" "}
                    <Link href="#" className="text-emerald-600 hover:underline font-semibold">
                      Créez-en un ici
                    </Link>
                  </p>
                </div>
              </div>

              {/* Login Benefits */}
              <div className="space-y-8">
                <div>
                  <h3 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Pourquoi créer un compte ?</h3>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileInvoice className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">
                        Suivi des remboursements
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Consultez l'état de vos demandes de remboursement en temps réel.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <FileText className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">Accès aux documents</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Retrouvez facilement vos attestations, décomptes et contrats.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <UserCog className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">
                        Gestion de votre profil
                      </h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Mettez à jour vos informations personnelles et bancaires.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">Support dédié</h4>
                      <p className="text-gray-600 dark:text-gray-300">
                        Contactez directement votre conseiller pour toute question.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Dashboard Section */
            <div className="space-y-8">
              {/* Dashboard Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg">
                <div>
                  <h3 className="text-2xl font-bold text-slate-800 dark:text-white">Bienvenue, Jean-Pierre !</h3>
                  <p className="text-gray-600 dark:text-gray-300">Votre espace personnel</p>
                </div>
                <Button
                  onClick={handleLogout}
                  variant="outline"
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white bg-transparent"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Déconnexion
                </Button>
              </div>

              {/* Dashboard Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Calendar className="w-8 h-8 text-emerald-600" />
                    <h4 className="font-semibold text-slate-800 dark:text-white">Prochain remboursement</h4>
                  </div>
                  <p className="text-3xl font-bold text-emerald-600 mb-1">120,50 €</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Prévu le 25 août 2025</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <FileInvoice className="w-8 h-8 text-emerald-600" />
                    <h4 className="font-semibold text-slate-800 dark:text-white">Contrat actif</h4>
                  </div>
                  <p className="text-xl font-bold text-slate-800 dark:text-white mb-1">Premium Famille</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Depuis le 01/01/2025</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-8 h-8 text-emerald-600" />
                    <h4 className="font-semibold text-slate-800 dark:text-white">Reste à charge annuel</h4>
                  </div>
                  <p className="text-3xl font-bold text-slate-800 dark:text-white mb-1">245,80 €</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Sur 500 € maximum</p>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield className="w-8 h-8 text-emerald-600" />
                    <h4 className="font-semibold text-slate-800 dark:text-white">Garanties actives</h4>
                  </div>
                  <p className="text-3xl font-bold text-slate-800 dark:text-white mb-1">12</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Toutes catégories</p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
                <h4 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Actions rapides</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white p-6 h-auto flex-col gap-2">
                    <FileInvoice className="w-6 h-6" />
                    <span>Déclarer un sinistre</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white p-6 h-auto flex-col gap-2 bg-transparent"
                  >
                    <FileText className="w-6 h-6" />
                    <span>Mes documents</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white p-6 h-auto flex-col gap-2 bg-transparent"
                  >
                    <UserCog className="w-6 h-6" />
                    <span>Mon profil</span>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white p-6 h-auto flex-col gap-2 bg-transparent"
                  >
                    <HelpCircle className="w-6 h-6" />
                    <span>Aide & Support</span>
                  </Button>
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
                <h4 className="text-xl font-bold mb-6 text-slate-800 dark:text-white">Activité récente</h4>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                      <FileInvoice className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 dark:text-white">Remboursement effectué</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        Consultation médecin généraliste - 85,50 €
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">Il y a 2 jours</span>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <FileText className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 dark:text-white">Document ajouté</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Attestation de droits 2025</p>
                    </div>
                    <span className="text-sm text-gray-500">Il y a 1 semaine</span>
                  </div>

                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                    <div className="w-10 h-10 bg-orange-100 dark:bg-orange-900/30 rounded-full flex items-center justify-center">
                      <UserCog className="w-5 h-5 text-orange-600" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-slate-800 dark:text-white">Profil mis à jour</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">Coordonnées bancaires modifiées</p>
                    </div>
                    <span className="text-sm text-gray-500">Il y a 2 semaines</span>
                  </div>
                </div>
              </div>
            </div>
          )}
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
