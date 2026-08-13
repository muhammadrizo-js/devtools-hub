'use client'

import { useState } from 'react'

export default function EnvFormatter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [warnings, setWarnings] = useState<string[]>([])
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const formatEnv = (envStr: string) => {
    if (!envStr.trim()) {
      setOutput('')
      setWarnings([])
      setError('')
      return
    }

    try {
      const lines = envStr.split('\n')
      const formattedLines: string[] = []
      const seenKeys = new Set<string>()
      const newWarnings: string[] = []
      let currentSection = ''

      lines.forEach((line, index) => {
        const trimmed = line.trim()
        
        // Skip empty lines and comments
        if (!trimmed || trimmed.startsWith('#')) {
          if (trimmed.startsWith('#')) {
            formattedLines.push(trimmed)
          } else {
            formattedLines.push('')
          }
          return
        }

        // Check for section headers
        if (trimmed.startsWith('[') && trimmed.endsWith(']')) {
          currentSection = trimmed
          formattedLines.push('')
          formattedLines.push(trimmed)
          formattedLines.push('')
          return
        }

        // Parse key-value pairs
        const match = trimmed.match(/^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*)$/)
        
        if (!match) {
          newWarnings.push(`Line ${index + 1}: Invalid format - "${trimmed}"`)
          formattedLines.push(trimmed)
          return
        }

        const [, key, value] = match
        
        // Check for duplicate keys
        if (seenKeys.has(key)) {
          newWarnings.push(`Line ${index + 1}: Duplicate key "${key}" - this will override the previous value`)
        } else {
          seenKeys.add(key)
        }

        // Check for empty values
        if (!value.trim()) {
          newWarnings.push(`Line ${index + 1}: Key "${key}" has an empty value`)
        }

        // Check for potential secrets
        if (/secret|password|api[_-]?key|token|private/i.test(key)) {
          newWarnings.push(`Line ${index + 1}: Key "${key}" contains sensitive data - be careful not to commit this to version control`)
        }

        // Check for spaces in values (potential issues)
        if (value !== value.trim() && !value.startsWith('"') && !value.startsWith("'")) {
          newWarnings.push(`Line ${index + 1}: Key "${key}" has spaces around value - consider quoting`)
        }

        // Format the line
        let formattedValue = value.trim()
        
        // Add quotes if value has spaces
        if (formattedValue.includes(' ') && !formattedValue.startsWith('"') && !formattedValue.startsWith("'")) {
          formattedValue = `"${formattedValue}"`
        }
        
        formattedLines.push(`${key}=${formattedValue}`)
      })

      setOutput(formattedLines.join('\n'))
      setWarnings(newWarnings)
      setError('')
    } catch (e) {
      setError(`Error formatting: ${(e as Error).message}`)
      setOutput('')
      setWarnings([])
    }
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    formatEnv(value)
  }

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    const sample = `# Database Configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=myapp
DATABASE_USER=admin
DATABASE_PASSWORD=secret123

# API Configuration
API_KEY=abc123
API_SECRET=xyz789
API_TIMEOUT=30

# App Settings
DEBUG=true
PORT=8080
APP_NAME=My Application
APP_NAME=Duplicate App

NOT_A_VALID_LINE
EMPTY_VALUE=
`
    setInput(sample)
    formatEnv(sample)
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setWarnings([])
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
          {copied ? 'Copied!' : 'Copy Formatted'}
        </button>
      </div>

      {/* Input and Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Input .env File
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full h-96 bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder='KEY=value'
            spellCheck={false}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Formatted Output
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border border-gray-800 focus:outline-none resize-none"
            placeholder='Formatted .env file...'
            spellCheck={false}
          />
        </div>
      </div>

      {/* Warnings */}
      {warnings.length > 0 && (
        <div className="mt-4 space-y-2">
          <h3 className="text-yellow-400 text-sm font-medium">Warnings ({warnings.length})</h3>
          {warnings.map((warning, index) => (
            <div key={index} className="text-yellow-300 text-sm bg-yellow-900/20 border border-yellow-800 rounded-lg p-3">
              ⚠️ {warning}
            </div>
          ))}
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
        100% client-side. Your .env files never leave your browser.
      </div>
    </div>
  )
}