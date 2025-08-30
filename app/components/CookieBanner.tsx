"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"

export default function CookieBanner() {
  const [showCookieBanner, setShowCookieBanner] = useState(false)

  useEffect(() => {
    if (!localStorage.getItem("cookieConsent")) {
      setShowCookieBanner(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowCookieBanner(false)
  }

  if (!showCookieBanner) {
    return null
  }

  return (
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
  )
}
