import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import DarkModeToggle from "./components/DarkModeToggle"
import BackToTopButton from "./components/BackToTopButton"
import CookieBanner from "./components/CookieBanner"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Assurance Santé Premium - Protégez votre famille",
  description:
    "Découvrez nos solutions d'assurance santé premium avec une couverture optimale, des tarifs compétitifs et un service client d'exception.",
  keywords: "assurance santé, mutuelle, protection famille, couverture médicale, devis gratuit",
  authors: [{ name: "Assurance Santé Premium" }],
  openGraph: {
    title: "Assurance Santé Premium",
    description:
      "Découvrez nos solutions d'assurance santé premium avec une couverture optimale, des tarifs compétitifs et un service client d'exception.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link
          rel="icon"
          href="/assurance-sante-website-mobile-nav-fixed/assurance-sante-website/assurance-sante-website/images/icons-health-1.jpg"
          type="image/jpeg"
        />
        <meta name="color-scheme" content="light dark" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no, maximum-scale=1.0" />
      </head>
      <body className={`font-inter antialiased`}>
        <Header />
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        <Footer />
        <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-40">
          <DarkModeToggle />
          <BackToTopButton />
        </div>
        <CookieBanner />
        <Analytics />
      </body>
    </html>
  )
}
