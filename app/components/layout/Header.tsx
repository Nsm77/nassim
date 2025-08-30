"use client"

import { useEffect, useState } from "react"
import { Phone, FileText, Shield, Menu, X } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const navLinkVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
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
            <motion.ul
              className="flex items-center gap-8"
              initial="hidden"
              animate="visible"
              variants={{
                visible: { transition: { staggerChildren: 0.1 } },
              }}
            >
              <motion.li variants={navLinkVariants}>
                <Link href="/" className="nav-link active">
                  Accueil
                </Link>
              </motion.li>
              <motion.li variants={navLinkVariants}>
                <Link href="/services" className="nav-link">
                  Services
                </Link>
              </motion.li>
              <motion.li variants={navLinkVariants}>
                <Link href="/faq" className="nav-link">
                  FAQ
                </Link>
              </motion.li>
              <motion.li variants={navLinkVariants}>
                <Link href="/contact" className="nav-link">
                  Contact
                </Link>
              </motion.li>
            </motion.ul>
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
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 bg-white dark:bg-gray-900 shadow-xl rounded-b-2xl overflow-hidden lg:hidden z-50"
            >
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
            </motion.div>
          </>
        )}
      </nav>
    </motion.header>
  )
}
