'use client'

import { useEffect, useState } from 'react'
import Script from 'next/script'

const GA_ID = 'G-2Z2H1QHS05'
const CONSENT_KEY = 'cookie_consent'

export default function CookieConsent() {
  const [consent, setConsent] = useState<string | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem(CONSENT_KEY)
    setConsent(saved)
  }, [])

  const accept = () => {
    localStorage.setItem(CONSENT_KEY, 'accepted')
    setConsent('accepted')
  }

  const reject = () => {
    localStorage.setItem(CONSENT_KEY, 'rejected')
    setConsent('rejected')
  }

  if (consent === null) {
    return (
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50 p-4">
        <div className="max-w-[1120px] mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-700">
            We use Google Analytics to understand site usage. This involves cookies. You can accept or reject.
          </p>
          <div className="flex gap-3 shrink-0">
            <button onClick={reject} className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 text-sm">
              Reject
            </button>
            <button onClick={accept} className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-500 text-sm">
              Accept
            </button>
          </div>
        </div>
      </div>
    )
  }

  if (consent === 'accepted') {
    return (
      <>
        <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </>
    )
  }

  return null
}