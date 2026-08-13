'use client'

import { useState } from 'react'

export default function JsonToCsvConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convertToCsv = (jsonStr: string) => {
    if (!jsonStr.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      const data = JSON.parse(jsonStr)
      
      // Handle array of objects
      if (Array.isArray(data)) {
        if (data.length === 0) {
          setError('Array is empty. Please provide an array with at least one object.')
          setOutput('')
          return
        }

        // Get headers from first object
        const headers = Object.keys(data[0])
        
        // Create CSV rows
        const rows = data.map(obj => {
          return headers.map(header => {
            const value = obj[header]
            
            // Handle nested objects/arrays
            if (typeof value === 'object' && value !== null) {
              return JSON.stringify(value)
            }
            
            // Handle strings with commas/quotes
            if (typeof value === 'string') {
              if (value.includes(',') || value.includes('"') || value.includes('\n')) {
                return `"${value.replace(/"/g, '""')}"`
              }
            }
            
            return value ?? ''
          }).join(',')
        })
        
        const csv = [headers.join(','), ...rows].join('\n')
        setOutput(csv)
        setError('')
      } 
      // Handle single object
      else if (typeof data === 'object' && data !== null) {
        const headers = Object.keys(data)
        const values = headers.map(header => {
          const value = data[header]
          if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value)
          }
          if (typeof value === 'string') {
            if (value.includes(',') || value.includes('"') || value.includes('\n')) {
              return `"${value.replace(/"/g, '""')}"`
            }
          }
          return value ?? ''
        })
        
        const csv = headers.join(',') + '\n' + values.join(',')
        setOutput(csv)
        setError('')
      } else {
        setError('Invalid JSON format. Please provide an array of objects or a single object.')
        setOutput('')
      }
    } catch (e) {
      setError(`Invalid JSON: ${(e as Error).message}`)
      setOutput('')
    }
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    convertToCsv(value)
  }

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    const sample = [
      {
        "name": "John Doe",
        "email": "john@example.com",
        "age": 30,
        "city": "New York"
      },
      {
        "name": "Jane Smith",
        "email": "jane@example.com",
        "age": 25,
        "city": "Los Angeles"
      },
      {
        "name": "Bob Johnson",
        "email": "bob@example.com",
        "age": 35,
        "city": "Chicago"
      }
    ]
    setInput(JSON.stringify(sample, null, 2))
    convertToCsv(JSON.stringify(sample, null, 2))
  }

  const clearAll = () => {
    setInput('')
    setOutput('')
    setError('')
  }

  const downloadCsv = () => {
    if (!output) return
    const blob = new Blob([output], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'converted.csv'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div>
      {/* Buttons */}
      <div className="flex gap-3 mb-4 flex-wrap">
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
          {copied ? 'Copied!' : 'Copy CSV'}
        </button>
        <button
          onClick={downloadCsv}
          disabled={!output}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Download .csv
        </button>
      </div>

      {/* Input and Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            JSON Input
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full h-96 bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder='[{"name": "John", "age": 30}]'
            spellCheck={false}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            CSV Output
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border border-gray-800 focus:outline-none resize-none"
            placeholder='name,age\nJohn,30'
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