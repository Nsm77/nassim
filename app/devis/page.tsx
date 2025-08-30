"use client"

import type React from "react"

import { useState, useEffect } from "react"
import {
  Phone,
  FileText,
  Shield,
  ArrowUp,
  Moon,
  Sun,
  Menu,
  X,
  ArrowRight,
  ArrowLeft,
  Calculator,
  CheckCircle,
  Briefcase,
  UserCheck,
  GraduationCap,
  UserX,
  MoreHorizontal,
  User,
  Users,
  MapPin,
  Mail,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormData {
  prenom: string
  nom: string
  email: string
  telephone: string
  date_naissance: string
  code_postal: string
  situation_pro: string
  situation_famille: string
  nb_enfants: number
  niveau_couverture: string
  besoins_specifiques: string[]
  commentaire: string
}

export default function DevisPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const [showCookieBanner, setShowCookieBanner] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [showResults, setShowResults] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState(0)
  const [formData, setFormData] = useState<FormData>({
    prenom: "",
    nom: "",
    email: "",
    telephone: "",
    date_naissance: "",
    code_postal: "",
    situation_pro: "",
    situation_famille: "",
    nb_enfants: 0,
    niveau_couverture: "",
    besoins_specifiques: [],
    commentaire: "",
  })

  const totalSteps = 3

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

  const nextStep = () => {
    if (validateStep(currentStep)) {
      if (currentStep < totalSteps) {
        setCurrentStep(currentStep + 1)
      }
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return (
          formData.prenom &&
          formData.nom &&
          formData.email &&
          formData.telephone &&
          formData.date_naissance &&
          formData.code_postal
        )
      case 2:
        return formData.situation_pro && formData.situation_famille
      case 3:
        return formData.niveau_couverture
      default:
        return true
    }
  }

  const calculatePrice = () => {
    let price = 30 // Base price

    // Professional situation adjustments
    if (formData.situation_pro === "independant") price += 15
    if (formData.situation_pro === "retraite") price += 20

    // Family situation adjustments
    if (formData.situation_famille === "couple") price += 25
    if (formData.situation_famille === "famille") price += 40 + formData.nb_enfants * 10

    // Coverage level adjustments
    if (formData.niveau_couverture === "confort") price += 20
    if (formData.niveau_couverture === "premium") price += 50

    // Specific needs adjustments
    if (formData.besoins_specifiques.includes("dentaire")) price += 10
    if (formData.besoins_specifiques.includes("optique")) price += 8
    if (formData.besoins_specifiques.includes("hospitalisation")) price += 12
    if (formData.besoins_specifiques.includes("medecines_douces")) price += 7
    if (formData.besoins_specifiques.includes("maternite")) price += 15

    return price
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateStep(3)) {
      const price = calculatePrice()
      setEstimatedPrice(price)
      setShowResults(true)
    }
  }

  const updateFormData = (field: keyof FormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const toggleSpecificNeed = (need: string) => {
    setFormData((prev) => ({
      ...prev,
      besoins_specifiques: prev.besoins_specifiques.includes(need)
        ? prev.besoins_specifiques.filter((n) => n !== need)
        : [...prev.besoins_specifiques, need],
    }))
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
      <section className="relative pt-32 pb-20 bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-600 text-white">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Obtenez Votre Devis Gratuit</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-2xl mx-auto">
            En seulement 2 minutes, découvrez la formule qui vous convient
          </p>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {!showResults ? (
            <>
              {/* Progress Bar */}
              <div className="mb-8">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-emerald-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  />
                </div>
              </div>

              {/* Step Indicator */}
              <div className="flex justify-center mb-12">
                <div className="flex items-center gap-8">
                  {[1, 2, 3].map((step) => (
                    <div key={step} className="flex items-center">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-all ${
                          step < currentStep
                            ? "bg-emerald-600 text-white"
                            : step === currentStep
                              ? "bg-emerald-600 text-white"
                              : "bg-gray-200 dark:bg-gray-700 text-gray-500"
                        }`}
                      >
                        {step < currentStep ? <CheckCircle className="w-6 h-6" /> : step}
                      </div>
                      <div className="ml-3 text-center">
                        <div className="text-sm font-semibold text-slate-800 dark:text-white">
                          {step === 1 && "Vos informations"}
                          {step === 2 && "Votre situation"}
                          {step === 3 && "Vos besoins"}
                        </div>
                      </div>
                      {step < 3 && <div className="w-16 h-0.5 bg-gray-300 dark:bg-gray-600 ml-8" />}
                    </div>
                  ))}
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">
                      Vos Informations Personnelles
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Commençons par faire connaissance</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                          Prénom *
                        </label>
                        <Input
                          value={formData.prenom}
                          onChange={(e) => updateFormData("prenom", e.target.value)}
                          required
                          className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">Nom *</label>
                        <Input
                          value={formData.nom}
                          onChange={(e) => updateFormData("nom", e.target.value)}
                          required
                          className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                          Email *
                        </label>
                        <Input
                          type="email"
                          value={formData.email}
                          onChange={(e) => updateFormData("email", e.target.value)}
                          required
                          className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                          Téléphone *
                        </label>
                        <Input
                          type="tel"
                          value={formData.telephone}
                          onChange={(e) => updateFormData("telephone", e.target.value)}
                          required
                          className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                          Date de naissance *
                        </label>
                        <Input
                          type="date"
                          value={formData.date_naissance}
                          onChange={(e) => updateFormData("date_naissance", e.target.value)}
                          required
                          className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                          Code postal *
                        </label>
                        <Input
                          pattern="[0-9]{5}"
                          value={formData.code_postal}
                          onChange={(e) => updateFormData("code_postal", e.target.value)}
                          required
                          className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end mt-8">
                      <Button onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Suivant
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 2: Situation */}
                {currentStep === 2 && (
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Votre Situation</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">Aidez-nous à mieux vous connaître</p>

                    <div className="space-y-8">
                      <div>
                        <label className="block text-sm font-semibold mb-4 text-slate-800 dark:text-white">
                          Votre situation professionnelle *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                          {[
                            { value: "salarie", icon: Briefcase, title: "Salarié", desc: "CDI, CDD, intérim..." },
                            {
                              value: "independant",
                              icon: UserCheck,
                              title: "Indépendant",
                              desc: "Artisan, commerçant...",
                            },
                            { value: "retraite", icon: User, title: "Retraité", desc: "Vous êtes à la retraite" },
                            {
                              value: "etudiant",
                              icon: GraduationCap,
                              title: "Étudiant",
                              desc: "Inscrit dans un établissement",
                            },
                            {
                              value: "sans_emploi",
                              icon: UserX,
                              title: "Sans emploi",
                              desc: "À la recherche d'un emploi",
                            },
                            {
                              value: "autre",
                              icon: MoreHorizontal,
                              title: "Autre",
                              desc: "Autre situation",
                            },
                          ].map((option) => (
                            <div
                              key={option.value}
                              className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                                formData.situation_pro === option.value
                                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                                  : "border-gray-200 dark:border-gray-600 hover:border-emerald-300"
                              }`}
                              onClick={() => updateFormData("situation_pro", option.value)}
                            >
                              <option.icon className="w-8 h-8 text-emerald-600 mb-2" />
                              <h4 className="font-semibold text-slate-800 dark:text-white">{option.title}</h4>
                              <p className="text-sm text-gray-600 dark:text-gray-300">{option.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-4 text-slate-800 dark:text-white">
                          Votre situation familiale *
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {[
                            { value: "celibataire", icon: User, title: "Célibataire" },
                            { value: "couple", icon: Users, title: "En couple" },
                            { value: "famille", icon: Users, title: "Famille" },
                          ].map((option) => (
                            <div
                              key={option.value}
                              className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                                formData.situation_famille === option.value
                                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                                  : "border-gray-200 dark:border-gray-600 hover:border-emerald-300"
                              }`}
                              onClick={() => updateFormData("situation_famille", option.value)}
                            >
                              <option.icon className="w-8 h-8 text-emerald-600 mb-2" />
                              <h4 className="font-semibold text-slate-800 dark:text-white">{option.title}</h4>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                          Nombre d'enfants à charge (si applicable)
                        </label>
                        <Input
                          type="number"
                          min="0"
                          value={formData.nb_enfants}
                          onChange={(e) => updateFormData("nb_enfants", Number.parseInt(e.target.value) || 0)}
                          className="max-w-xs border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button
                        onClick={prevStep}
                        variant="outline"
                        className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white bg-transparent"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Précédent
                      </Button>
                      <Button onClick={nextStep} className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Suivant
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}

                {/* Step 3: Needs */}
                {currentStep === 3 && (
                  <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg">
                    <h3 className="text-2xl font-bold mb-4 text-slate-800 dark:text-white">Vos Besoins en Santé</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-8">
                      Précisez vos attentes pour une offre sur-mesure
                    </p>

                    <div className="space-y-8">
                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                          Niveau de couverture souhaité *
                        </label>
                        <Select
                          value={formData.niveau_couverture}
                          onValueChange={(value) => updateFormData("niveau_couverture", value)}
                        >
                          <SelectTrigger className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500">
                            <SelectValue placeholder="-- Sélectionnez --" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="essentiel">Essentiel (Remboursement minimum)</SelectItem>
                            <SelectItem value="confort">Confort (Bon remboursement)</SelectItem>
                            <SelectItem value="premium">Premium (Remboursement optimal)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-4 text-slate-800 dark:text-white">
                          Besoins spécifiques (cochez toutes les options pertinentes)
                        </label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {[
                            { value: "dentaire", title: "Soins dentaires (prothèses, orthodontie)" },
                            { value: "optique", title: "Optique (lunettes, lentilles)" },
                            { value: "hospitalisation", title: "Hospitalisation (chambre particulière)" },
                            { value: "medecines_douces", title: "Médecines douces (ostéopathie, acupuncture)" },
                            { value: "maternite", title: "Maternité" },
                          ].map((option) => (
                            <div
                              key={option.value}
                              className={`p-4 border-2 rounded-xl cursor-pointer transition-all hover:shadow-lg ${
                                formData.besoins_specifiques.includes(option.value)
                                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20"
                                  : "border-gray-200 dark:border-gray-600 hover:border-emerald-300"
                              }`}
                              onClick={() => toggleSpecificNeed(option.value)}
                            >
                              <div className="flex items-center gap-3">
                                <div
                                  className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                                    formData.besoins_specifiques.includes(option.value)
                                      ? "border-emerald-500 bg-emerald-500"
                                      : "border-gray-300"
                                  }`}
                                >
                                  {formData.besoins_specifiques.includes(option.value) && (
                                    <CheckCircle className="w-3 h-3 text-white" />
                                  )}
                                </div>
                                <span className="text-slate-800 dark:text-white">{option.title}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold mb-2 text-slate-800 dark:text-white">
                          Commentaire (facultatif)
                        </label>
                        <Textarea
                          value={formData.commentaire}
                          onChange={(e) => updateFormData("commentaire", e.target.value)}
                          rows={4}
                          className="border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
                        />
                      </div>
                    </div>

                    <div className="flex justify-between mt-8">
                      <Button
                        onClick={prevStep}
                        variant="outline"
                        className="border-emerald-600 text-emerald-600 hover:bg-emerald-600 hover:text-white bg-transparent"
                      >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Précédent
                      </Button>
                      <Button type="submit" className="bg-emerald-600 hover:bg-emerald-700 text-white">
                        Obtenir mon devis
                        <Calculator className="w-4 h-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                )}
              </form>
            </>
          ) : (
            /* Results Section */
            <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg text-center">
              <h3 className="text-3xl font-bold mb-4 text-slate-800 dark:text-white">Votre Devis Personnalisé</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Voici une estimation de votre prime mensuelle et les garanties incluses.
              </p>

              <div className="bg-emerald-50 dark:bg-emerald-900/20 rounded-2xl p-8 mb-8">
                <p className="text-lg text-slate-800 dark:text-white mb-2">Votre prime mensuelle estimée :</p>
                <p className="text-5xl font-bold text-emerald-600 mb-2">{estimatedPrice} €</p>
                <p className="text-gray-600 dark:text-gray-300">par mois</p>
              </div>

              <div className="text-left mb-8">
                <h4 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Garanties incluses :</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Médecine Générale & Spécialisée</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Hospitalisation & Chirurgie</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-gray-700 dark:text-gray-300">Pharmacie & Médicaments</span>
                  </div>
                  {formData.besoins_specifiques.includes("dentaire") && (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Soins Dentaires</span>
                    </div>
                  )}
                  {formData.besoins_specifiques.includes("optique") && (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Optique & Vision</span>
                    </div>
                  )}
                  {formData.besoins_specifiques.includes("hospitalisation") && (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Chambre Particulière</span>
                    </div>
                  )}
                  {formData.besoins_specifiques.includes("medecines_douces") && (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Médecines Douces</span>
                    </div>
                  )}
                  {formData.besoins_specifiques.includes("maternite") && (
                    <div className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500" />
                      <span className="text-gray-700 dark:text-gray-300">Maternité</span>
                    </div>
                  )}
                </div>
              </div>

              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Un conseiller vous contactera sous 24h pour affiner votre offre.
              </p>
              <Button asChild className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Link href="/contact">Contacter un conseiller</Link>
              </Button>
            </div>
          )}
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
