'use client'

import { useState } from 'react'

export default function JwtDecoder() {
  const [token, setToken] = useState('')
  const [header, setHeader] = useState('')
  const [payload, setPayload] = useState('')
  const [signature, setSignature] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const decodeJwt = (jwt: string) => {
    if (!jwt.trim()) {
      setHeader('')
      setPayload('')
      setSignature('')
      setError('')
      return
    }

    try {
      const parts = jwt.split('.')
      
      if (parts.length !== 3) {
        setError('Invalid JWT format. A JWT must have 3 parts separated by dots (header.payload.signature)')
        setHeader('')
        setPayload('')
        setSignature('')
        return
      }

      const decodePart = (part: string): string => {
        const base64 = part.replace(/-/g, '+').replace(/_/g, '/')
        const padded = base64.padEnd(base64.length + (4 - (base64.length % 4)) % 4, '=')
        const decoded = atob(padded)
        return JSON.stringify(JSON.parse(decoded), null, 2)
      }

      setHeader(decodePart(parts[0]))
      setPayload(decodePart(parts[1]))
      setSignature(parts[2])
      setError('')
    } catch (e) {
      setError(`Invalid JWT: ${(e as Error).message}`)
      setHeader('')
      setPayload('')
      setSignature('')
    }
  }

  const handleCopy = async (text: string) => {
    if (!text) return
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    const sample = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE3MzY4MDAwMDB9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
    setToken(sample)
    decodeJwt(sample)
  }

  const clearAll = () => {
    setToken('')
    setHeader('')
    setPayload('')
    setSignature('')
    setError('')
  }

  return (
    <div>
      {/* Input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          JWT Token
        </label>
        <textarea
          value={token}
          onChange={(e) => {
            setToken(e.target.value)
            decodeJwt(e.target.value)
          }}
          className="w-full h-32 bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="Paste your JWT token here..."
          spellCheck={false}
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={loadSample}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          Sample
        </button>
        <button
          onClick={clearAll}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          Clear
        </button>
      </div>

      {/* Decoded parts */}
      {(header || payload) && (
        <div className="space-y-4">
          {/* Header */}
          {header && (
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium">Header</h3>
                <button
                  onClick={() => handleCopy(header)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-500 transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="font-mono text-sm text-gray-200 whitespace-pre-wrap">{header}</pre>
            </div>
          )}

          {/* Payload */}
          {payload && (
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-white font-medium">Payload</h3>
                <button
                  onClick={() => handleCopy(payload)}
                  className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-500 transition-colors"
                >
                  {copied ? 'Copied!' : 'Copy'}
                </button>
              </div>
              <pre className="font-mono text-sm text-gray-200 whitespace-pre-wrap">{payload}</pre>
            </div>
          )}

          {/* Signature */}
          {signature && (
            <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
              <h3 className="text-white font-medium mb-2">Signature (Encoded)</h3>
              <div className="font-mono text-xs text-gray-400 break-all">{signature}</div>
            </div>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="mt-4 text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3">
          {error}
        </div>
      )}

      {/* Privacy note */}
      <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        100% client-side. Your tokens never leave your browser.
      </div>
    </div>
  )
}