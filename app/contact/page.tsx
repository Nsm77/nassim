"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Phone, Mail, MapPin, Clock, Send, ArrowUp, Moon, Sun, Menu, X, Shield, FileText } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ContactPage() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted")
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
                  <Link href="/contact" className="nav-link active">
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
                      className="block px-6 py-3 text-emerald-600 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
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

      {/* Contact Hero */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Contactez-Nous</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Notre équipe d'experts est à votre disposition pour vous accompagner
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white flex items-center gap-3">
                  <Phone className="w-6 h-6 text-emerald-600" />
                  Nos Coordonnées
                </h3>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">Téléphone</h4>
                    <p className="text-emerald-600 font-semibold">
                      <Link href="tel:+33982444148" className="hover:underline">
                        09 82 44 41 48
                      </Link>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Du lundi au vendredi, 9h-18h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">Email</h4>
                    <p className="text-emerald-600 font-semibold">
                      <Link href="mailto:contact@assurance-sante-premium.fr" className="hover:underline">
                        contact@assurance-sante-premium.fr
                      </Link>
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Réponse garantie sous 24h</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">Adresse</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      99 rue de camas
                      <br />
                      13005 Marseille
                      <br />
                      France
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold mb-2 text-slate-800 dark:text-white">Horaires d'ouverture</h4>
                    <p className="text-gray-600 dark:text-gray-300">
                      Lundi - Vendredi : 9h00 - 18h00
                      <br />
                      Samedi : 9h00 - 12h00
                      <br />
                      Dimanche : Fermé
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <Link
                  href="#"
                  className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 hover:scale-110 transition-all"
                  aria-label="Facebook"
                >
                  <span className="text-lg font-bold">f</span>
                </Link>
                <Link
                  href="#"
                  className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 hover:scale-110 transition-all"
                  aria-label="LinkedIn"
                >
                  <span className="text-lg font-bold">in</span>
                </Link>
                <Link
                  href="#"
                  className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 hover:scale-110 transition-all"
                  aria-label="Twitter"
                >
                  <span className="text-lg font-bold">t</span>
                </Link>
                <Link
                  href="#"
                  className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center hover:bg-emerald-700 hover:scale-110 transition-all"
                  aria-label="Instagram"
                >
                  <span className="text-lg font-bold">i</span>
                </Link>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl">
              <h3 className="text-2xl font-bold mb-8 text-slate-800 dark:text-white flex items-center gap-3">
                <Send className="w-6 h-6 text-emerald-600" />
                Envoyez-nous un message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="nom" className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                      Nom *
                    </label>
                    <Input
                      id="nom"
                      name="nom"
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label htmlFor="prenom" className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                      Prénom *
                    </label>
                    <Input
                      id="prenom"
                      name="prenom"
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                      Email *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="telephone"
                      className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white"
                    >
                      Téléphone
                    </label>
                    <Input
                      id="telephone"
                      name="telephone"
                      type="tel"
                      className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="sujet" className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                    Sujet *
                  </label>
                  <Select required>
                    <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500">
                      <SelectValue placeholder="Choisissez un sujet" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="devis">Demande de devis</SelectItem>
                      <SelectItem value="souscription">Souscription</SelectItem>
                      <SelectItem value="remboursement">Question remboursement</SelectItem>
                      <SelectItem value="modification">Modification de contrat</SelectItem>
                      <SelectItem value="resiliation">Résiliation</SelectItem>
                      <SelectItem value="reclamation">Réclamation</SelectItem>
                      <SelectItem value="autre">Autre</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                    Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Décrivez votre demande en détail..."
                    required
                    rows={6}
                    className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  <label className="text-sm text-gray-600 dark:text-gray-400">
                    J'accepte que mes données soient utilisées pour traiter ma demande *
                  </label>
                </div>

                <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700 text-white text-lg py-3">
                  Envoyer le message
                  <Send className="w-5 h-5 ml-2" />
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Où nous trouver ?</h3>
            </div>
            <div className="rounded-3xl overflow-hidden shadow-2xl">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2894.499689842499!2d5.38680791570498!3d43.2964829791355!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x12c9c0c1b0c1b0c1%3A0x12c9c0c1b0c1b0c1!2s99%20Rue%20de%20Camas%2C%2013005%20Marseille%2C%20France!5e0!3m2!1sen!2sfr!4v1678901234567!5m2!1sen!2sfr"
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full"
              />
            </div>
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
                  <MapPin className="w-4 h-4 text-emerald-400" />
                  99 rue de camas, 13005 Marseille
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <Link href="tel:+33982444148" className="hover:text-emerald-400 transition-colors">
                    09 82 44 41 48
                  </Link>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400" />
                  <Link
                    href="mailto:contact@assurance-sante-premium.fr"
                    className="hover:text-emerald-400 transition-colors"
                  >
                    contact@assurance-sante-premium.fr
                  </Link>
                </p>
                <p className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-emerald-400" />
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
