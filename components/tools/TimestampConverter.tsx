'use client'

import { useState } from 'react'

export default function TimestampConverter() {
  const [timestamp, setTimestamp] = useState('')
  const [dateString, setDateString] = useState('')
  const [result, setResult] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convertTimestamp = (ts: string) => {
    if (!ts.trim()) {
      setResult('')
      setError('')
      return
    }

    try {
      const tsNum = parseInt(ts)
      if (isNaN(tsNum)) {
        setError('Invalid timestamp. Please enter a number.')
        setResult('')
        return
      }

      // Handle both seconds and milliseconds
      const date = tsNum > 100000000000 ? new Date(tsNum) : new Date(tsNum * 1000)
      
      if (isNaN(date.getTime())) {
        setError('Invalid timestamp.')
        setResult('')
        return
      }

      setResult(date.toISOString())
      setError('')
    } catch (e) {
      setError(`Error: ${(e as Error).message}`)
      setResult('')
    }
  }

  const convertDate = (dateStr: string) => {
    if (!dateStr.trim()) {
      setResult('')
      setError('')
      return
    }

    try {
      const date = new Date(dateStr)
      if (isNaN(date.getTime())) {
        setError('Invalid date format. Try: 2024-01-15 or 2024-01-15T10:30:00')
        setResult('')
        return
      }

      const seconds = Math.floor(date.getTime() / 1000)
      const milliseconds = date.getTime()
      setResult(`Seconds: ${seconds}\nMilliseconds: ${milliseconds}`)
      setError('')
    } catch (e) {
      setError(`Error: ${(e as Error).message}`)
      setResult('')
    }
  }

  const handleCopy = async () => {
    if (!result) return
    await navigator.clipboard.writeText(result)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadCurrentTimestamp = () => {
    const now = Math.floor(Date.now() / 1000)
    setTimestamp(now.toString())
    convertTimestamp(now.toString())
  }

  const loadCurrentDate = () => {
    const now = new Date().toISOString()
    setDateString(now)
    convertDate(now)
  }

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Timestamp to Date */}
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
          <h3 className="text-white font-medium mb-3">Timestamp → Date</h3>
          <input
            type="text"
            value={timestamp}
            onChange={(e) => {
              setTimestamp(e.target.value)
              convertTimestamp(e.target.value)
            }}
            className="w-full bg-gray-900 text-gray-200 font-mono text-sm p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
            placeholder="e.g. 1705320000"
          />
          <button
            onClick={loadCurrentTimestamp}
            className="text-xs text-indigo-400 hover:text-indigo-300"
          >
            Use current timestamp
          </button>
        </div>

        {/* Date to Timestamp */}
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
          <h3 className="text-white font-medium mb-3">Date → Timestamp</h3>
          <input
            type="text"
            value={dateString}
            onChange={(e) => {
              setDateString(e.target.value)
              convertDate(e.target.value)
            }}
            className="w-full bg-gray-900 text-gray-200 font-mono text-sm p-3 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-2"
            placeholder="e.g. 2024-01-15 or 2024-01-15T10:30:00"
          />
          <button
            onClick={loadCurrentDate}
            className="text-xs text-indigo-400 hover:text-indigo-300"
          >
            Use current date
          </button>
        </div>
      </div>

      {/* Result */}
      {result && (
        <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-4">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-white font-medium">Result</h3>
            <button
              onClick={handleCopy}
              className="px-3 py-1 bg-indigo-600 text-white rounded text-xs hover:bg-indigo-500 transition-colors"
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="font-mono text-sm text-gray-200 whitespace-pre-wrap">{result}</pre>
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-400 text-sm bg-red-900/20 border border-red-800 rounded-lg p-3 mb-4">
          {error}
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