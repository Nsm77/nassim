"use client"

import { useEffect, useState } from "react"
import { Phone, FileText, Shield, Heart, CheckCircle } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import AnimatedSection from "@/components/AnimatedSection"

export default function HomePage() {
  const [showPreloader, setShowPreloader] = useState(true)

  useEffect(() => {
    // Preloader
    const timer = setTimeout(() => {
      setShowPreloader(false)
    }, 1000)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-700 to-emerald-600 z-0" />
        <div className="absolute inset-0 bg-black/20 z-10" />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 container mx-auto px-4 py-20"
        >
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
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20"
        >
          <div className="w-8 h-8 border-b-2 border-r-2 border-white transform rotate-45 animate-bounce" />
        </motion.div>
      </section>

      {/* About Section */}
      <AnimatedSection>
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
                <motion.div
                  variants={cardVariants}
                  className="bg-white dark:bg-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-3xl font-bold text-emerald-600 mb-2">+50 000</div>
                  <div className="text-gray-600 dark:text-gray-300">Familles protégées</div>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  className="bg-white dark:bg-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-3xl font-bold text-emerald-600 mb-2">98%</div>
                  <div className="text-gray-600 dark:text-gray-300">Clients satisfaits</div>
                </motion.div>
                <motion.div
                  variants={cardVariants}
                  className="bg-white dark:bg-gray-700 rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="text-3xl font-bold text-emerald-600 mb-2">24/7</div>
                  <div className="text-gray-600 dark:text-gray-300">Assistance dédiée</div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* Services Section */}
      <AnimatedSection>
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

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.div
                variants={cardVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
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
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
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
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
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
              </motion.div>

              <motion.div
                variants={cardVariants}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
              >
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
              </motion.div>
            </motion.div>
          </div>
        </section>
      </AnimatedSection>

      {/* Features Section */}
      <AnimatedSection>
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
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                  className="rounded-2xl overflow-hidden shadow-2xl"
                >
                  <Image
                    src="/assurance-sante-website-mobile-nav-fixed/assurance-sante-website/assurance-sante-website/images/Ya7Ojn3xZROC.jpg"
                    alt="Famille heureuse avec Assurance Santé"
                    width={600}
                    height={400}
                    className="w-full h-auto"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </AnimatedSection>

      {/* CTA Section */}
      <AnimatedSection>
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
      </AnimatedSection>

      {/* Contact Info Section */}
      <AnimatedSection>
        <section className="py-20 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-slate-800 dark:text-white">Contactez-nous</h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Notre équipe d'experts est à votre disposition pour vous accompagner.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Phone className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Par téléphone</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <Link href="tel:+33982444148" className="text-emerald-600 hover:underline">
                    09 82 44 41 48
                  </Link>
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Heart className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Par email</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  <Link href="mailto:contact@assurance-sante-premium.fr" className="text-emerald-600 hover:underline">
                    contact@assurance-sante-premium.fr
                  </Link>
                </p>
              </motion.div>

              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white dark:bg-gray-700 rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Shield className="w-12 h-12 text-emerald-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-4 text-slate-800 dark:text-white">Adresse</h3>
                <p className="text-gray-600 dark:text-gray-300">99 rue de camas, 13005 Marseille</p>
              </motion.div>
            </div>
          </div>
        </section>
      </AnimatedSection>
    </div>
  )
}
