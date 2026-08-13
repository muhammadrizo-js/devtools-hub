'use client'

import { useState } from 'react'
import * as yaml from 'js-yaml'

export default function YamlToXmlConverter() {
  const [input, setInput] = useState('')
  const [output, setOutput] = useState('')
  const [error, setError] = useState('')
  const [copied, setCopied] = useState(false)

  const convertToXml = (yamlStr: string) => {
    if (!yamlStr.trim()) {
      setOutput('')
      setError('')
      return
    }

    try {
      const data = yaml.load(yamlStr)
      const xml = jsonToXml(data)
      setOutput(xml)
      setError('')
    } catch (e) {
      setError(`Invalid YAML: ${(e as Error).message}`)
      setOutput('')
    }
  }

  const jsonToXml = (obj: any, rootName = 'root'): string => {
    const buildXml = (value: any, name: string, indent = ''): string => {
      const nextIndent = indent + '  '
      
      if (value === null || value === undefined) {
        return `${indent}<${name}></${name}>\n`
      }
      
      if (typeof value === 'object' && !Array.isArray(value)) {
        let xml = `${indent}<${name}>\n`
        for (const [key, val] of Object.entries(value)) {
          xml += buildXml(val, key, nextIndent)
        }
        xml += `${indent}</${name}>\n`
        return xml
      }
      
      if (Array.isArray(value)) {
        let xml = ''
        value.forEach((item, index) => {
          if (typeof item === 'object') {
            xml += buildXml(item, `${name}Item`, indent)
          } else {
            xml += buildXml(item, `${name}Item`, indent)
          }
        })
        return xml
      }
      
      return `${indent}<${name}>${value}</${name}>\n`
    }

    if (typeof obj === 'object' && !Array.isArray(obj)) {
      return '<?xml version="1.0" encoding="UTF-8"?>\n' + buildXml(obj, rootName)
    }
    
    return '<?xml version="1.0" encoding="UTF-8"?>\n' + buildXml(obj, rootName)
  }

  const handleInputChange = (value: string) => {
    setInput(value)
    convertToXml(value)
  }

  const handleCopy = async () => {
    if (!output) return
    await navigator.clipboard.writeText(output)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const loadSample = () => {
    const sample = `name: My Application
version: 1.0.0
description: Sample YAML configuration
settings:
  debug: true
  port: 8080
  database:
    host: localhost
    username: admin
    password: secret123
features:
  - authentication
  - logging
  - api
`
    setInput(sample)
    convertToXml(sample)
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
          {copied ? 'Copied!' : 'Copy XML'}
        </button>
      </div>

      {/* Input and Output */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            YAML Input
          </label>
          <textarea
            value={input}
            onChange={(e) => handleInputChange(e.target.value)}
            className="w-full h-96 bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
            placeholder='name: My App'
            spellCheck={false}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            XML Output
          </label>
          <textarea
            value={output}
            readOnly
            className="w-full h-96 bg-gray-950 text-gray-200 font-mono text-sm p-4 rounded-lg border border-gray-800 focus:outline-none resize-none"
            placeholder='<?xml version="1.0"?>'
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