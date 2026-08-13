'use client'

import { useState } from 'react'

export default function UuidGenerator() {
  const [uuids, setUuids] = useState<string[]>([])
  const [count, setCount] = useState(1)
  const [copied, setCopied] = useState(false)

  const generateUuid = (): string => {
    return crypto.randomUUID()
  }

  const generate = () => {
    const newUuids = Array.from({ length: count }, () => generateUuid())
    setUuids(newUuids)
  }

  const generateOne = () => {
    const newUuids = Array.from({ length: count }, () => generateUuid())
    setUuids(newUuids)
  }

  const handleCopy = async () => {
    if (uuids.length === 0) return
    await navigator.clipboard.writeText(uuids.join('\n'))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const clearAll = () => {
    setUuids([])
  }

  return (
    <div>
      {/* Controls */}
      <div className="flex gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-300">Count:</label>
          <input
            type="number"
            min="1"
            max="100"
            value={count}
            onChange={(e) => setCount(Math.min(100, Math.max(1, parseInt(e.target.value) || 1)))}
            className="w-20 bg-gray-800 text-gray-200 text-sm p-2 rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <button
          onClick={generate}
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-medium"
        >
          Generate
        </button>
        <button
          onClick={handleCopy}
          disabled={uuids.length === 0}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50"
        >
          {copied ? 'Copied!' : 'Copy All'}
        </button>
        <button
          onClick={clearAll}
          disabled={uuids.length === 0}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium disabled:opacity-50"
        >
          Clear
        </button>
      </div>

      {/* Output */}
      <div className="bg-gray-950 border border-gray-800 rounded-lg p-4">
        {uuids.length > 0 ? (
          <div className="space-y-2">
            {uuids.map((uuid, index) => (
              <div key={index} className="font-mono text-sm text-gray-200 bg-gray-900 p-2 rounded flex justify-between items-center">
                <span>{uuid}</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(uuid)
                  }}
                  className="text-gray-500 hover:text-white text-xs ml-2"
                >
                  Copy
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500 text-sm">
            Click Generate to create UUIDs
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-4 text-xs text-gray-500 flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        UUID v4 - Randomly generated using crypto.randomUUID()
      </div>
    </div>
  )
}