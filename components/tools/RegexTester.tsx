'use client'

import { useState, useMemo } from 'react'

interface MatchResult {
  match: string
  index: number
  groups?: string[]
}

interface HighlightPart {
  text: string
  isMatch: boolean
}

export default function RegexTester() {
  const [pattern, setPattern] = useState('')
  const [flags, setFlags] = useState('g')
  const [testString, setTestString] = useState('')
  const [error, setError] = useState('')

  const matches = useMemo((): MatchResult[] => {
    if (!pattern || !testString) return []
    
    try {
      const regex = new RegExp(pattern, flags)
      const results: MatchResult[] = []
      let match: RegExpExecArray | null
      
      regex.lastIndex = 0
      
      while ((match = regex.exec(testString)) !== null) {
        results.push({
          match: match[0],
          index: match.index,
          groups: match.slice(1),
        })
        
        if (match.index === regex.lastIndex) {
          regex.lastIndex++
        }
      }
      
      setError('')
      return results
    } catch (e) {
      setError(`Invalid regex: ${(e as Error).message}`)
      return []
    }
  }, [pattern, flags, testString])

  const highlightedParts = useMemo((): HighlightPart[] => {
    if (!pattern || !testString || matches.length === 0) {
      return []
    }

    try {
      const regex = new RegExp(pattern, flags)
      const parts: HighlightPart[] = []
      let lastIndex = 0
      let match: RegExpExecArray | null
      
      regex.lastIndex = 0
      
      while ((match = regex.exec(testString)) !== null) {
        if (match.index > lastIndex) {
          parts.push({ text: testString.slice(lastIndex, match.index), isMatch: false })
        }
        parts.push({ text: match[0], isMatch: true })
        lastIndex = match.index + match[0].length
        
        if (match.index === regex.lastIndex) {
          regex.lastIndex++
        }
      }
      
      if (lastIndex < testString.length) {
        parts.push({ text: testString.slice(lastIndex), isMatch: false })
      }
      
      return parts
    } catch {
      return []
    }
  }, [pattern, flags, testString, matches])

  const loadSample = () => {
    setPattern('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}')
    setFlags('g')
    setTestString('Contact us at john.doe@example.com or jane.smith@company.co.uk. For support, email support@myapp.io or invalid@email.')
  }

  const clearAll = () => {
    setPattern('')
    setFlags('g')
    setTestString('')
    setError('')
  }

  const commonPatterns = [
    { label: 'Email', pattern: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}' },
    { label: 'URL', pattern: 'https?:\\/\\/[\\w\\-\\.]+\\.[a-zA-Z]{2,}[\\w\\-\\/\\.\\?\\=\\&\\%]*' },
    { label: 'Phone', pattern: '\\+?[0-9\\s\\-\\(\\)]{10,}' },
    { label: 'Date (YYYY-MM-DD)', pattern: '\\d{4}-\\d{2}-\\d{2}' },
    { label: 'IPv4', pattern: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b' },
    { label: 'Hex Color', pattern: '#[0-9a-fA-F]{6}\\b' },
  ]

  return (
    <div>
      {/* Pattern input */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Regex Pattern
        </label>
        <div className="flex gap-2">
          <span className="text-gray-500 font-mono text-lg pt-2">/</span>
          <input
            type="text"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
            className="flex-1 bg-gray-950 text-gray-200 font-mono text-sm p-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter regex pattern..."
            spellCheck={false}
          />
          <span className="text-gray-500 font-mono text-lg pt-2">/</span>
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            className="w-20 bg-gray-950 text-gray-200 font-mono text-sm p-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="flags"
            spellCheck={false}
          />
        </div>
      </div>

      {/* Common patterns */}
      <div className="mb-4 flex flex-wrap gap-2">
        {commonPatterns.map(({ label, pattern: p }) => (
          <button
            key={label}
            onClick={() => setPattern(p)}
            className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-xs hover:bg-gray-700 transition-colors"
          >
            {label}
          </button>
        ))}
      </div>

      {/* Test string */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-300 mb-2">
          Test String
        </label>
        <textarea
          value={testString}
          onChange={(e) => setTestString(e.target.value)}
          className="w-full h-40 bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
          placeholder="Enter text to test against..."
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

      {/* Error */}
      {error && (
        <div className="mb-4 text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3">
          {error}
        </div>
      )}

      {/* Highlighted text */}
      {highlightedParts.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">
            Matches ({matches.length})
          </h3>
          <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 font-mono text-sm leading-relaxed">
            {highlightedParts.map((part, index) => (
              part.isMatch ? (
                <mark key={index} className="bg-yellow-600/50 text-yellow-100 px-1 rounded">
                  {part.text}
                </mark>
              ) : (
                <span key={index}>{part.text}</span>
              )
            ))}
          </div>
        </div>
      )}

      {/* Match list */}
      {matches.length > 0 && (
        <div className="mb-4">
          <h3 className="text-sm font-medium text-gray-300 mb-2">Match Details</h3>
          <div className="space-y-2">
            {matches.map((match, index) => (
              <div key={index} className="bg-gray-950 border border-gray-800 rounded-lg p-3">
                <div className="flex justify-between items-center">
                  <span className="font-mono text-sm text-gray-200">{match.match}</span>
                  <span className="text-xs text-gray-500">Index: {match.index}</span>
                </div>
                {match.groups && match.groups.length > 0 && (
                  <div className="mt-1 text-xs text-gray-400">
                    Groups: {match.groups.join(', ')}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Privacy note */}
      <div className="text-xs text-gray-500 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        100% client-side. Your data never leaves your browser.
      </div>
    </div>
  )
}