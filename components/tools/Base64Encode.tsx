'use client'

import { useState } from 'react'

export default function Base64Encode() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [mode, setMode] = useState<'encode' | 'decode'>('encode')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const process = (text: string, currentMode: 'encode' | 'decode') => {
    if (!text.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      if (currentMode === 'encode') {
        const encoded = btoa(unescape(encodeURIComponent(text)))
        setOutput(encoded)
        setError('')
      } else {
        const decoded = decodeURIComponent(escape(atob(text)))
        setOutput(decoded)
        setError('')
      }
    } catch (e) {
      setError(`Invalid Base64: ${(e as Error).message}`)
      setOutput('')
    }
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    process(value, mode)
  }

  const handleModeChange = (newMode: 'encode' | 'decode') => {
    setMode(newMode)
    setInput('')
    setOutput('')
    setError('')
  }

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    if (mode === 'encode') {
      const sample = 'Hello, World! This is a sample text for Base64 encoding.'
      setInput(sample)
      process(sample, 'encode')
    } else {
      const sample = 'SGVsbG8sIFdvcmxkISBUaGlzIGlzIGEgc2FtcGxlIHRleHQgZm9yIEJhc2U2NCBlbmNvZGluZy4='
      setInput(sample)
      process(sample, 'decode')
    }
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const swapContent = () => {
    setInput(output)
    process(output, mode === 'encode' ? 'decode' : 'encode')
    setMode(mode === 'encode' ? 'decode' : 'encode')
  }

  return (
    <div>
      {/* Mode toggle */}
      <div className="flex gap-2 mb-4">
        <button
          onClick={() => handleModeChange('encode')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'encode'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Encode
        </button>
        <button
          onClick={() => handleModeChange('decode')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            mode === 'decode'
              ? 'bg-indigo-600 text-white'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
          }`}
        >
          Decode
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-3 mb-4">
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
        <button
          onClick={swapContent}
          disabled={!output}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50"
        >
          ⇅ Swap
        </button>
        <button
          onClick={handleCopy}
          disabled={!output}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>

      {/* Input and Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {mode === 'encode' ? 'Text Input' : 'Base64 Input'}
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full h-64 bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Paste Base64 to decode...'}
            spellCheck={false}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            {mode === 'encode' ? 'Base64 Output' : 'Decoded Text Output'}
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-64 bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border border-gray-800 focus:outline-none resize-none"
            placeholder={mode === 'encode' ? 'Base64 output...' : 'Decoded text...'}
            spellCheck={false}
          />
        </div>
      </div>

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
        100% client-side. Your data never leaves your browser.
      </div>
    </div>
  )
}