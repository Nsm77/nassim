"use client"

import { useState, useEffect } from "react"
import { Shield, FileText, Lock, UserCheck, Edit, Trash2, Ban, Download, Pause } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PolitiqueConfidentialitePage() {
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
      {/* Header - same as mentions legales */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Politique de Confidentialité</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Protection et traitement de vos données personnelles
          </p>
        </div>
      </section>

      {/* Privacy Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Introduction */}
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">1. Introduction</h2>

            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Assurance Santé Premium accorde une importance particulière à la protection de vos données personnelles
                et au respect de votre vie privée. Cette politique de confidentialité vous informe sur la manière dont
                nous collectons, utilisons, stockons et protégeons vos données personnelles.
              </p>

              <p>
                Cette politique s'applique à tous les services proposés par Assurance Santé Premium, que ce soit via
                notre site web, notre application mobile, nos bureaux ou par téléphone.
              </p>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <p className="text-slate-800 dark:text-white">
                  <strong>Engagement RGPD :</strong> Nous nous conformons strictement au Règlement Général sur la
                  Protection des Données (RGPD) et à la loi Informatique et Libertés modifiée.
                </p>
              </div>
            </div>
          </div>

          {/* Vos droits */}
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Vos droits</h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <UserCheck className="w-8 h-8 text-emerald-600 mb-3" />
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Droit d'accès</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Vous pouvez demander à accéder aux données personnelles que nous détenons sur vous.
                </p>
              </div>

              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <Edit className="w-8 h-8 text-emerald-600 mb-3" />
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Droit de rectification</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Vous pouvez demander la correction de données inexactes ou incomplètes.
                </p>
              </div>

              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <Trash2 className="w-8 h-8 text-emerald-600 mb-3" />
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Droit à l'effacement</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Vous pouvez demander la suppression de vos données dans certaines conditions.
                </p>
              </div>

              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <Ban className="w-8 h-8 text-emerald-600 mb-3" />
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Droit d'opposition</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Vous pouvez vous opposer au traitement de vos données pour des raisons légitimes.
                </p>
              </div>

              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <Download className="w-8 h-8 text-emerald-600 mb-3" />
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Droit à la portabilité</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Vous pouvez récupérer vos données dans un format structuré et lisible.
                </p>
              </div>

              <div className="p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <Pause className="w-8 h-8 text-emerald-600 mb-3" />
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Droit à la limitation</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  Vous pouvez demander la limitation du traitement de vos données.
                </p>
              </div>
            </div>

            <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Comment exercer vos droits ?</h4>
              <ul className="text-gray-600 dark:text-gray-300 space-y-1">
                <li>• Nous contacter par email : dpo@assurance-sante-premium.fr</li>
                <li>• Nous écrire à l'adresse : DPO - Assurance Santé Premium, 99 rue de camas, 13005 Marseille</li>
                <li>• Utiliser le formulaire dédié sur votre espace client</li>
              </ul>
            </div>
          </div>

          {/* Contact DPO */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Contact</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <FileText className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Par email</h4>
                <p className="text-gray-600 dark:text-gray-300">dpo@assurance-sante-premium.fr</p>
              </div>

              <div className="text-center p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <Shield className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Par téléphone</h4>
                <p className="text-gray-600 dark:text-gray-300">09 82 44 41 48</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">Du lundi au vendredi, 9h-18h</p>
              </div>

              <div className="text-center p-6 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <Lock className="w-8 h-8 text-emerald-600 mx-auto mb-3" />
                <h4 className="font-semibold text-slate-800 dark:text-white mb-2">Par courrier</h4>
                <p className="text-gray-600 dark:text-gray-300">
                  DPO - Assurance Santé Premium
                  <br />
                  99 rue de camas
                  <br />
                  13005 Marseille, France
                </p>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
              <p className="text-sm text-gray-600 dark:text-gray-300">
                <strong>Date de dernière mise à jour :</strong> 20 août 2025
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
