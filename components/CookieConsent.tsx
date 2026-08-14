'use client'

import { useEffect, useState } from 'react'

declare global {
  interface Window {
    dataLayer: any[]
    gtag: (...args: any[]) => void
  }
}

const GA_ID = 'G-2Z2H1QHS05'
const CONSENT_KEY = 'cookie_consent'

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  const loadGA = () => {
    if (document.getElementById('ga-script')) return

    const script = document.createElement('script')
    script.id = 'ga-script'
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`
    script.async = true
    document.head.appendChild(script)

    script.onload = () => {
      window.dataLayer = window.dataLayer || []
      window.gtag = function gtag(...args: any[]) {
        window.dataLayer.push(args)
      }
      window.gtag('js', new Date())
      window.gtag('config', GA_ID)
    }
  }

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY)
    if (saved === 'accepted') {
      loadGA()
    } else if (saved === 'rejected') {
      // Do nothing
    } else {
      setShowBanner(true)
    }
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setShowBanner(false)
    loadGA()
  }

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setShowBanner(false)
  }

  if (!showBanner) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
      <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-700">
          We use Google Analytics to understand site usage. This involves cookies. You can accept or
          reject.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={reject}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm"
          >
            Reject
          </button>
          <button
            onClick={accept}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 text-sm"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  )
}