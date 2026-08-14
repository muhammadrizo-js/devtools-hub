'use client'

import { useState, useCallback } from 'react'
import exifr from 'exifr'

interface MetadataDisplay {
  [key: string]: string
}

export default function ExifStripper() {
  const [images, setImages] = useState<File[]>([])
  const [currentImage, setCurrentImage] = useState<File | null>(null)
  const [metadata, setMetadata] = useState<MetadataDisplay | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string>('')
  const [cleanedUrl, setCleanedUrl] = useState<string>('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState('')
  const [dragOver, setDragOver] = useState(false)

  const readMetadata = async (file: File) => {
    try {
      const data = await exifr.parse(file, {
        gps: true,
        tiff: true,
        exif: true,
        iptc: true,
        xmp: true,
        icc: true,
      })

      if (!data) {
        setMetadata({ 'No metadata found': 'This image has no EXIF data to strip' })
        return
      }

      const display: MetadataDisplay = {}
      
      if (data.GPSLatitude && data.GPSLongitude) {
        display['📍 GPS Location'] = `${data.GPSLatitude.toFixed(6)}, ${data.GPSLongitude.toFixed(6)}`
      }
      if (data.Make) display['📷 Camera Make'] = String(data.Make)
      if (data.Model) display['📷 Camera Model'] = String(data.Model)
      if (data.DateTimeOriginal) display['🕐 Date Taken'] = String(data.DateTimeOriginal)
      if (data.CreateDate) display['🕐 Date Created'] = String(data.CreateDate)
      if (data.Software) display['💻 Software'] = String(data.Software)
      if (data.ExposureTime) display['⏱️ Exposure'] = String(data.ExposureTime)
      if (data.FNumber) display['🔆 F-Number'] = String(data.FNumber)
      if (data.ISO) display['🔆 ISO'] = String(data.ISO)
      if (data.FocalLength) display['🔍 Focal Length'] = String(data.FocalLength)
      if (data.Flash) display['⚡ Flash'] = String(data.Flash)
      if (data.Orientation) display['🔄 Orientation'] = String(data.Orientation)
      if (data.ImageWidth) display['📐 Width'] = `${data.ImageWidth}px`
      if (data.ImageHeight) display['📐 Height'] = `${data.ImageHeight}px`

      setMetadata(display)
    } catch (e) {
      setError(`Could not read metadata: ${(e as Error).message}`)
      setMetadata(null)
    }
  }

  const stripMetadata = async (file: File) => {
    setIsProcessing(true)
    setError('')

    try {
      // Create object URL for preview
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Load image into canvas
      const img = new Image()
      img.src = objectUrl
      
      await new Promise((resolve, reject) => {
        img.onload = resolve
        img.onerror = reject
      })

      // Draw to canvas (this strips metadata)
      const canvas = document.createElement('canvas')
      canvas.width = img.width
      canvas.height = img.height
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0)

      // Convert to clean blob
      const cleanBlob = await new Promise<Blob>((resolve, reject) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob)
          else reject(new Error('Failed to process image'))
        }, 'image/jpeg', 0.95)
      })

      const cleanUrl = URL.createObjectURL(cleanBlob)
      setCleanedUrl(cleanUrl)
      setIsProcessing(false)
    } catch (e) {
      setError(`Failed to strip metadata: ${(e as Error).message}`)
      setIsProcessing(false)
    }
  }

  const handleFileSelect = async (file: File) => {
    setError('')
    setCurrentImage(file)
    setCleanedUrl('')
    await readMetadata(file)
    await stripMetadata(file)
  }

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const files = Array.from(e.dataTransfer.files)
    if (files.length > 0) {
      handleFileSelect(files[0])
    }
  }, [])

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
  }, [])

  const downloadCleanImage = () => {
    if (!cleanedUrl || !currentImage) return
    const a = document.createElement('a')
    a.href = cleanedUrl
    a.download = `clean_${currentImage.name}`
    a.click()
  }

  const loadSample = async () => {
    // Generate a test image with canvas (simulating metadata)
    const canvas = document.createElement('canvas')
    canvas.width = 400
    canvas.height = 300
    const ctx = canvas.getContext('2d')!
    ctx.fillStyle = '#3559E0'
    ctx.fillRect(0, 0, 400, 300)
    ctx.fillStyle = '#FFFFFF'
    ctx.font = '24px sans-serif'
    ctx.fillText('Sample Image', 140, 150)
    
    const blob = await new Promise<Blob>((resolve) => {
      canvas.toBlob((b) => resolve(b!), 'image/jpeg', 0.9)
    })
    
    const file = new File([blob], 'sample.jpg', { type: 'image/jpeg' })
    await handleFileSelect(file)
  }

  return (
    <div>
      {/* Upload area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors mb-6 ${
          dragOver ? 'border-[#3559E0] bg-[#3559E0]/5' : 'border-[#E4E7EC] hover:border-[#3559E0]'
        }`}
        onClick={() => document.getElementById('file-input')?.click()}
      >
        <input
          id="file-input"
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) handleFileSelect(file)
          }}
        />
        <div className="text-4xl mb-3">📸</div>
        <p className="text-[#101319] font-medium mb-1">
          Drag & drop an image here
        </p>
        <p className="text-sm text-[#667085]">
          or click to browse — JPEG, PNG, HEIC supported
        </p>
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
          onClick={() => {
            setCurrentImage(null)
            setMetadata(null)
            setPreviewUrl('')
            setCleanedUrl('')
            setError('')
          }}
          className="px-4 py-2 bg-gray-800 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-sm font-medium"
        >
          Clear
        </button>
      </div>

      {/* Error */}
      {error && (
        <div className="mb-4 text-red-600 text-sm bg-red-50 border border-red-200 rounded-lg p-3">
          {error}
        </div>
      )}

      {/* Results */}
      {currentImage && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Metadata found */}
          <div className="bg-gray-50 border border-[#E4E7EC] rounded-lg p-4">
            <h3 className="text-[#101319] font-medium mb-3">
              📋 Metadata Found
            </h3>
            {metadata && Object.keys(metadata).length > 0 ? (
              <div className="space-y-2">
                {Object.entries(metadata).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start gap-2">
                    <span className="text-sm text-[#667085]">{key}</span>
                    <span className="text-sm text-[#101319] font-mono break-all text-right">
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#667085]">No metadata found.</p>
            )}
          </div>

          {/* Preview */}
          <div>
            {previewUrl && (
              <div className="bg-gray-50 border border-[#E4E7EC] rounded-lg p-4">
                <h3 className="text-[#101319] font-medium mb-3">
                  🖼️ Preview
                </h3>
                <img
                  src={previewUrl}
                  alt="Original"
                  className="max-w-full h-auto rounded mb-3"
                />
                {isProcessing ? (
                  <p className="text-sm text-[#667085]">Processing...</p>
                ) : cleanedUrl ? (
                  <button
                    onClick={downloadCleanImage}
                    className="w-full px-4 py-2 bg-[#3559E0] text-white rounded-lg hover:bg-[#2a46b8] transition-colors text-sm font-medium"
                  >
                    ⬇️ Download Clean Image
                  </button>
                ) : null}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Privacy note */}
      <div className="mt-6 text-xs text-[#667085] flex items-center gap-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        100% client-side. Your images never leave your browser.
      </div>
    </div>
  )
}