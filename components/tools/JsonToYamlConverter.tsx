'use client'

import { useState } from 'react'
import * as yaml from 'js-yaml'

export default function JsonToYamlConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convertToYaml = (jsonStr: string) => {
    if (!jsonStr.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      const jsonObj = JSON.parse(jsonStr)
      const yamlStr = yaml.dump(jsonObj, {
        indent: 2,
        lineWidth: 80,
        noRefs: true,
      })
      setOutput(yamlStr)
      setError('')
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`)
      setOutput('')
    }
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    convertToYaml(value)
  }

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    const sample = {
      name: "My App",
      version: "1.0.0",
      description: "Sample configuration",
      settings: {
        debug: true,
        port: 8080,
        database: {
          host: "localhost",
          username: "admin"
        }
      },
      features: ["auth", "logging", "api"]
    }
    setInput(JSON.stringify(sample, null, 2))
    convertToYaml(JSON.stringify(sample, null, 2))
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  return (
    <div>
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
          onClick={handleCopy}
          disabled={!output}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {copied ? 'Copied!' : 'Copy YAML'}
        </button>
      </div>

      {/* Input and Output panels */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            JSON Input
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full h-96 bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder='Paste your JSON here...'
            spellCheck={false}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            YAML Output
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border border-gray-800 focus:outline-none resize-none"
            placeholder='YAML output will appear here...'
            spellCheck={false}
          />
        </div>
      </div>

      {/* Error message */}
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