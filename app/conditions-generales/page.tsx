"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function ConditionsGeneralesPage() {
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
      {/* Header - same structure as other pages */}

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Conditions Générales</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            Modalités et conditions de votre contrat d'assurance santé
          </p>
        </div>
      </section>

      {/* Conditions Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Préambule */}
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-bold">P</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Préambule - Objet du contrat</h2>
            </div>

            <div className="space-y-4 text-gray-600 dark:text-gray-300">
              <p>
                Les présentes conditions générales définissent les droits et obligations d'Assurance Santé Premium et de
                l'Assuré dans le cadre du contrat d'assurance santé complémentaire.
              </p>

              <p>
                Ce contrat a pour objet de garantir le remboursement ou la prise en charge de frais de santé non
                couverts ou partiellement couverts par les régimes obligatoires de sécurité sociale.
              </p>

              <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                <p className="text-slate-800 dark:text-white">
                  <strong>Important :</strong> Ce contrat est régi par le Code des assurances et le Code de la
                  mutualité. Il est soumis à la loi française.
                </p>
              </div>
            </div>
          </div>

          {/* Garanties */}
          <div className="mb-12 bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center">
                <span className="text-emerald-600 font-bold">3</span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 dark:text-white">Étendue des garanties</h2>
            </div>

            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Les garanties accordées sont détaillées dans le tableau des garanties annexé aux conditions particulières.
              Elles comprennent notamment :
            </p>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border border-gray-300 dark:border-gray-600 rounded-lg">
                <thead>
                  <tr className="bg-emerald-50 dark:bg-emerald-900/20">
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-left text-slate-800 dark:text-white">
                      Type de soins
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-center text-slate-800 dark:text-white">
                      Formule Essentiel
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-center text-slate-800 dark:text-white">
                      Formule Confort
                    </th>
                    <th className="border border-gray-300 dark:border-gray-600 p-3 text-center text-slate-800 dark:text-white">
                      Formule Premium
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-300">
                      Consultations généralistes
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      150% BRSS
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      200% BRSS
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      300% BRSS
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-300">
                      Consultations spécialistes
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      150% BRSS
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      200% BRSS
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      300% BRSS
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-300">
                      Hospitalisation
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      100% BRSS + FF
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      100% BRSS + FF + CP
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      100% BRSS + FF + CP
                    </td>
                  </tr>
                  <tr className="bg-gray-50 dark:bg-gray-700">
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-300">
                      Dentaire (forfait annuel)
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      400€
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      800€
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      1500€
                    </td>
                  </tr>
                  <tr>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-300">
                      Optique (forfait 2 ans)
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      200€
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      400€
                    </td>
                    <td className="border border-gray-300 dark:border-gray-600 p-3 text-center text-emerald-600 font-semibold">
                      800€
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-gray-500 dark:text-gray-400 mt-4">
              FF = Forfait journalier, CP = Chambre particulière
            </p>
          </div>

          {/* Contact */}
          <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
            <h2 className="text-2xl font-bold mb-6 text-slate-800 dark:text-white">Réclamations et litiges</h2>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-emerald-600 mb-2">Service Réclamations</h4>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  En cas de désaccord ou de réclamation, vous pouvez contacter notre service réclamations :
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                    <p className="text-slate-800 dark:text-white">
                      <strong>Par courrier :</strong>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Assurance Santé Premium, Service Réclamations, 99 rue de camas, 13005 Marseille
                    </p>
                  </div>
                  <div className="p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-xl">
                    <p className="text-slate-800 dark:text-white">
                      <strong>Par email :</strong>
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">reclamations@assurance-sante-premium.fr</p>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-xl">
                <p className="text-slate-800 dark:text-white">
                  Nous nous engageons à vous répondre dans un délai de 10 jours ouvrables.
                </p>
              </div>
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
