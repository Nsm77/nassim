"use client"

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
  Search,
  ChevronDown,
  FileSignature,
  Euro,
  ShieldCheck,
  Settings,
  Mail,
  MapPin,
  Clock,
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [showBackToTop, setShowBackToTop] = useState(false)
  const [isDarkMode, setIsDarkMode] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [showPreloader, setShowPreloader] = useState(true)
  const [showCookieBanner, setShowCookieBanner] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [openItems, setOpenItems] = useState<number[]>([])

  const faqData: FAQItem[] = [
    {
      question: "Comment souscrire à une assurance santé chez Assurance Santé Premium ?",
      answer:
        "La souscription est simple et rapide. Vous pouvez faire une demande de devis en ligne en 2 minutes sur notre site, nous appeler au 09 82 44 41 48 pour être accompagné par un conseiller, ou prendre rendez-vous dans l'une de nos agences. Une fois votre devis validé, vous recevrez votre contrat par email et courrier. La prise d'effet peut être immédiate ou différée selon vos besoins.",
      category: "souscription",
    },
    {
      question: "Quels documents dois-je fournir pour souscrire ?",
      answer:
        "Pour finaliser votre souscription, vous devrez nous fournir : une pièce d'identité en cours de validité, un justificatif de domicile de moins de 3 mois, votre relevé d'identité bancaire (RIB), votre attestation de résiliation si vous changez d'assureur, et un questionnaire de santé simplifié (selon la formule choisie). Tous ces documents peuvent être transmis de manière sécurisée via notre espace client en ligne.",
      category: "souscription",
    },
    {
      question: "Y a-t-il des délais de carence ?",
      answer:
        "Nos délais de carence sont parmi les plus courts du marché : Soins courants (prise d'effet immédiate), Hospitalisation (30 jours sauf urgence), Maternité (10 mois), Dentaire et optique (6 mois). En cas de changement d'assureur sans interruption de garanties, les délais de carence peuvent être supprimés.",
      category: "souscription",
    },
    {
      question: "Comment fonctionne le tiers payant ?",
      answer:
        "Le tiers payant vous évite d'avancer les frais chez les professionnels de santé. Avec Assurance Santé Premium : tiers payant intégral chez tous nos partenaires (médecins, pharmacies, laboratoires), présentation de votre carte vitale et de votre carte de tiers payant, vous ne payez que le reste à charge éventuel, disponible dès le premier jour de votre contrat. Notre réseau compte plus de 50 000 professionnels de santé partenaires en France.",
      category: "remboursement",
    },
    {
      question: "Quels sont les délais de remboursement ?",
      answer:
        "Nos délais de remboursement sont optimisés : Soins avec tiers payant (remboursement automatique sous 48h), Soins sans tiers payant (5 jours ouvrés après réception des justificatifs), Hospitalisation (7 jours ouvrés maximum), Dentaire et optique (10 jours ouvrés). Vous pouvez suivre l'état de vos remboursements en temps réel sur votre espace client.",
      category: "remboursement",
    },
    {
      question: "Comment envoyer mes factures pour remboursement ?",
      answer:
        "Plusieurs moyens s'offrent à vous : Application mobile (photographiez vos factures et envoyez-les instantanément), Espace client en ligne (téléchargement sécurisé de vos documents), Email (envoi à remboursement@assurance-sante-premium.fr), Courrier (à notre adresse postale). L'application mobile offre le traitement le plus rapide avec accusé de réception immédiat.",
      category: "remboursement",
    },
    {
      question: "Que couvre exactement mon contrat d'assurance santé ?",
      answer:
        "Votre contrat d'assurance santé couvre une large gamme de dépenses médicales, selon la formule choisie : Consultations médicales (généralistes et spécialistes), Médicaments sur ordonnance, Analyses médicales et examens radiologiques, Hospitalisation (frais de séjour, honoraires chirurgicaux, chambre particulière), Soins dentaires (consultations, détartrages, prothèses, orthodontie), Soins optiques (lunettes, lentilles, opérations), Médecines douces (ostéopathie, acupuncture, chiropraxie, etc.), Cures thermales, appareillages, etc. Le détail précis de votre couverture est disponible dans votre tableau de garanties et sur votre espace client.",
      category: "couverture",
    },
    {
      question: "Puis-je ajouter des garanties supplémentaires à mon contrat ?",
      answer:
        "Oui, vous pouvez à tout moment demander à ajouter des garanties optionnelles à votre contrat, telles que : Renfort optique et dentaire, Forfait bien-être (sport, nutrition, psychologue), Garantie hospitalisation renforcée, Assistance voyage. Contactez votre conseiller pour étudier les options disponibles et adapter votre contrat à l'évolution de vos besoins.",
      category: "couverture",
    },
    {
      question: "La couverture est-elle valable à l'étranger ?",
      answer:
        "Nos contrats incluent une couverture de base pour vos déplacements à l'étranger. Selon votre formule, vous pouvez bénéficier de : Prise en charge des urgences médicales, Rapatriement sanitaire, Assistance voyage 24h/24. Pour des séjours prolongés ou des destinations spécifiques, nous vous recommandons de souscrire une extension de garantie voyage.",
      category: "couverture",
    },
    {
      question: "Comment accéder à mon espace client ?",
      answer:
        "Votre espace client est accessible depuis notre site web en cliquant sur 'Espace Client' en haut de la page. Vous pouvez également télécharger notre application mobile gratuite disponible sur l'App Store et Google Play. Identifiant : votre numéro de contrat ou email, Mot de passe : celui que vous avez défini lors de l'inscription. En cas d'oubli, utilisez la fonction 'Mot de passe oublié'. Votre espace client vous permet de consulter vos remboursements, télécharger vos attestations, modifier vos coordonnées et bien plus encore.",
      category: "gestion",
    },
    {
      question: "Comment résilier mon contrat ?",
      answer:
        "Vous pouvez résilier votre contrat à tout moment après la première année, ou immédiatement dans certains cas : Résiliation annuelle (2 mois avant l'échéance avec lettre recommandée), Loi Chatel (Dans les 20 jours suivant l'avis d'échéance), Loi Hamon (À tout moment après 1 an de contrat), Changement de situation (Mariage, divorce, déménagement, etc.). Notre service client vous accompagne dans toutes vos démarches de résiliation.",
      category: "gestion",
    },
    {
      question: "Que faire en cas de réclamation ?",
      answer:
        "En cas de réclamation, plusieurs solutions s'offrent à vous : Contactez directement votre conseiller dédié, Utilisez le formulaire de réclamation sur votre espace client, Envoyez un email à reclamation@assurance-sante-premium.fr, Appelez notre service réclamation au 09 82 44 41 48. Nous nous engageons à traiter votre réclamation dans les 10 jours ouvrés et à vous tenir informé de l'avancement du dossier.",
      category: "gestion",
    },
  ]

  const categories = [
    { id: "all", name: "Toutes", icon: null },
    { id: "souscription", name: "Souscription", icon: FileSignature },
    { id: "remboursement", name: "Remboursement", icon: Euro },
    { id: "couverture", name: "Couverture", icon: ShieldCheck },
    { id: "gestion", name: "Gestion", icon: Settings },
  ]

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

  const toggleFAQItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]))
  }

  const filteredFAQs = faqData.filter((item) => {
    const matchesSearch =
      item.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

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
                  <Link href="/faq" className="nav-link active">
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
                      className="block px-6 py-3 text-emerald-600 font-semibold hover:bg-gray-50 dark:hover:bg-gray-800"
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
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Questions Fréquentes</h1>
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
            Trouvez rapidement les réponses à toutes vos questions sur nos assurances santé
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          {/* Search Box */}
          <div className="relative mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Rechercher une question..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 py-4 text-lg border-gray-300 dark:border-gray-600 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3 mb-12 justify-center">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all ${
                  activeCategory === category.id
                    ? "bg-emerald-600 text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-emerald-100 dark:hover:bg-emerald-900/20"
                }`}
              >
                {category.icon && <category.icon className="w-4 h-4 inline mr-2" />}
                {category.name}
              </button>
            ))}
          </div>

          {/* FAQ Items */}
          <div className="space-y-4">
            {filteredFAQs.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQItem(index)}
                  className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-2xl transition-colors"
                >
                  <span className="text-lg font-semibold text-slate-800 dark:text-white pr-4">{item.question}</span>
                  <ChevronDown
                    className={`w-6 h-6 text-emerald-600 flex-shrink-0 transition-transform ${
                      openItems.includes(index) ? "rotate-180" : ""
                    }`}
                  />
                </button>
                {openItems.includes(index) && (
                  <div className="px-6 pb-6">
                    <div className="text-gray-700 dark:text-gray-300 leading-relaxed">
                      {item.answer.split("\n").map((paragraph, pIndex) => (
                        <p key={pIndex} className="mb-3 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {filteredFAQs.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400 text-lg">Aucune question trouvée pour votre recherche.</p>
            </div>
          )}

          {/* Contact CTA */}
          <div className="mt-16 bg-gradient-to-br from-slate-800 to-emerald-600 rounded-3xl p-8 text-center text-white">
            <h3 className="text-2xl font-bold mb-4">Vous ne trouvez pas la réponse à votre question ?</h3>
            <p className="text-lg opacity-90 mb-8">
              Notre équipe d'experts est à votre disposition pour vous accompagner
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="bg-white text-slate-800 hover:bg-gray-100">
                <Link href="/contact">
                  <Mail className="w-5 h-5 mr-2" />
                  Nous contacter
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-slate-800 bg-transparent"
              >
                <Link href="tel:+33982444148">
                  <Phone className="w-5 h-5 mr-2" />
                  09 82 44 41 48
                </Link>
              </Button>
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
