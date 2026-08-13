'use client'

import { useState, useMemo } from 'react'

export default function CronBuilder() {
  const [minute, setMinute] = useState('*')
  const [hour, setHour] = useState('*')
  const [dayOfMonth, setDayOfMonth] = useState('*')
  const [month, setMonth] = useState('*')
  const [dayOfWeek, setDayOfWeek] = useState('*')
  const [copied, setCopied] = useState(false)

  const cronExpression = useMemo(() => {
    return `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`
  }, [minute, hour, dayOfMonth, month, dayOfWeek])

  const humanReadable = useMemo(() => {
    const parts: string[] = []

    // Minute
    if (minute === '*') {
      parts.push('every minute')
    } else if (minute.startsWith('*/')) {
      parts.push(`every ${minute.slice(2)} minutes`)
    } else {
      parts.push(`at minute ${minute}`)
    }

    // Hour
    if (hour === '*') {
      // Skip if minute is every
    } else if (hour.startsWith('*/')) {
      parts.push(`every ${hour.slice(2)} hours`)
    } else {
      parts.push(`at hour ${hour}`)
    }

    // Day of month
    if (dayOfMonth === '*') {
      // Skip
    } else if (dayOfMonth.startsWith('*/')) {
      parts.push(`every ${dayOfMonth.slice(2)} days`)
    } else {
      parts.push(`on day ${dayOfMonth} of month`)
    }

    // Month
    if (month === '*') {
      // Skip
    } else if (month.startsWith('*/')) {
      parts.push(`every ${month.slice(2)} months`)
    } else {
      const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
      parts.push(`in ${monthNames[parseInt(month) - 1] || month}`)
    }

    // Day of week
    if (dayOfWeek === '*') {
      // Skip
    } else if (dayOfWeek.startsWith('*/')) {
      parts.push(`every ${dayOfWeek.slice(2)} days of week`)
    } else {
      const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const days = dayOfWeek.split(',').map(d => {
        const num = parseInt(d)
        return dayNames[num] || d
      })
      parts.push(`on ${days.join(', ')}`)
    }

    if (parts.length === 0) {
      return 'Every minute'
    }

    if (parts.length === 1 && parts[0] === 'every minute') {
      return 'Every minute'
    }

    return parts.join(' ')
  }, [minute, hour, dayOfMonth, month, dayOfWeek])

  const handleCopy = async () => {
    await navigator.clipboard.writeText(cronExpression)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const presets = [
    { label: 'Every minute', values: ['*', '*', '*', '*', '*'] },
    { label: 'Every hour', values: ['0', '*', '*', '*', '*'] },
    { label: 'Every day at midnight', values: ['0', '0', '*', '*', '*'] },
    { label: 'Every day at noon', values: ['0', '12', '*', '*', '*'] },
    { label: 'Every Monday at 9 AM', values: ['0', '9', '*', '*', '1'] },
    { label: 'Every weekday at 9 AM', values: ['0', '9', '*', '*', '1-5'] },
    { label: 'Every 15 minutes', values: ['*/15', '*', '*', '*', '*'] },
    { label: 'Every 30 minutes', values: ['*/30', '*', '*', '*', '*'] },
    { label: 'Every 5 minutes', values: ['*/5', '*', '*', '*', '*'] },
    { label: 'Monthly on 1st at 3 AM', values: ['0', '3', '1', '*', '*'] },
  ]

  const applyPreset = (values: string[]) => {
    setMinute(values[0])
    setHour(values[1])
    setDayOfMonth(values[2])
    setMonth(values[3])
    setDayOfWeek(values[4])
  }

  return (
    <div>
      {/* Presets */}
      <div className="mb-6">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Quick Presets</h3>
        <div className="flex flex-wrap gap-2">
          {presets.map(preset => (
            <button
              key={preset.label}
              onClick={() => applyPreset(preset.values)}
              className="px-3 py-1 bg-gray-800 text-gray-300 rounded text-xs hover:bg-gray-700 transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Builder fields */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Minute (0-59)
          </label>
          <input
            type="text"
            value={minute}
            onChange={(e) => setMinute(e.target.value)}
            className="w-full bg-gray-950 text-gray-200 font-mono text-sm p-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Hour (0-23)
          </label>
          <input
            type="text"
            value={hour}
            onChange={(e) => setHour(e.target.value)}
            className="w-full bg-gray-950 text-gray-200 font-mono text-sm p-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Day of Month (1-31)
          </label>
          <input
            type="text"
            value={dayOfMonth}
            onChange={(e) => setDayOfMonth(e.target.value)}
            className="w-full bg-gray-950 text-gray-200 font-mono text-sm p-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Month (1-12)
          </label>
          <input
            type="text"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full bg-gray-950 text-gray-200 font-mono text-sm p-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Day of Week (0-6)
          </label>
          <input
            type="text"
            value={dayOfWeek}
            onChange={(e) => setDayOfWeek(e.target.value)}
            className="w-full bg-gray-950 text-gray-200 font-mono text-sm p-3 rounded-lg border border-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>
      </div>

      {/* Result */}
      <div className="bg-gray-950 border border-gray-800 rounded-lg p-6 mb-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white font-medium">Your Cron Expression</h3>
          <button
            onClick={handleCopy}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition-colors text-sm font-medium"
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
        <div className="font-mono text-2xl text-indigo-400 mb-4">
          {cronExpression}
        </div>
        <div className="text-gray-400 text-sm">
          📅 {humanReadable}
        </div>
      </div>

      {/* Quick reference */}
      <div className="bg-gray-950 border border-gray-800 rounded-lg p-4 mb-4">
        <h3 className="text-sm font-medium text-gray-300 mb-2">Quick Reference</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-gray-400 font-mono">
          <div>* = any value</div>
          <div>*/5 = every 5 units</div>
          <div>1,15,30 = at 1, 15, and 30</div>
          <div>1-5 = range from 1 to 5</div>
          <div>Sunday = 0 or 7</div>
          <div>Monday = 1</div>
        </div>
      </div>

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