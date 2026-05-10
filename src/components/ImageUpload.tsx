/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState, useCallback } from 'react'
import { Image as ImageIcon, ImagePlus, X } from 'lucide-react'

interface ImageUploadProps {
  onImagesChange: (files: File[]) => void
}

export function ImageUpload({ onImagesChange }: ImageUploadProps) {
  const [previews, setPreviews] = useState<string[]>([])
  const [files, setFiles] = useState<File[]>([])

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const validFiles = Array.from(newFiles).filter(file => file.size <= 10 * 1024 * 1024 && file.type.startsWith('image/'))
    
    // We limit to 10 images max
    const combinedFiles = [...files, ...validFiles].slice(0, 10)
    
    setFiles(combinedFiles)
    onImagesChange(combinedFiles)

    const newPreviews = combinedFiles.map(file => URL.createObjectURL(file))
    setPreviews(newPreviews)
  }, [files, onImagesChange])

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    handleFiles(e.dataTransfer.files)
  }, [handleFiles])

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files)
    }
  }, [handleFiles])

  const removeImage = (index: number) => {
    const newFiles = files.filter((_, i) => i !== index)
    const newPreviews = previews.filter((_, i) => i !== index)
    setFiles(newFiles)
    setPreviews(newPreviews)
    onImagesChange(newFiles)
  }

  return (
    <div className="space-y-4 w-full">
      <label className="font-label-lg text-label-lg text-on-surface-variant">Upload up to 10 Photos of Mom</label>
      
      <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="border-2 border-dashed border-outline-variant rounded-xl p-8 text-center bg-background/50 hover:bg-surface-container-low transition-colors duration-300 relative group cursor-pointer"
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <ImagePlus className="w-10 h-10 text-primary mx-auto mb-2 opacity-80 group-hover:opacity-100 transition-opacity" />
        <p className="font-label-lg text-primary mb-1">Drag and drop your favorites here</p>
        <p className="font-body-sm text-outline">Maximum size 10MB per image &bull; Up to 10 images</p>
        <button 
          className="mt-4 px-6 py-2 bg-secondary text-white font-label-lg rounded-full hover:bg-on-secondary-fixed-variant transition-all pointer-events-none" 
          type="button"
        >
          Select Files
        </button>
        <input 
          id="file-upload" 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          onChange={onChange}
        />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4">
          {previews.map((preview, idx) => (
            <div key={idx} className="relative aspect-square bg-surface-container rounded-lg border border-outline-variant/30 overflow-hidden group">
              <img src={preview} alt={`Preview ${idx}`} className="w-full h-full object-cover" />
              <button 
                onClick={(e) => { e.stopPropagation(); removeImage(idx); }}
                className="absolute top-2 right-2 bg-black/50 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                type="button"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
          {previews.length < 10 && Array.from({ length: 10 - previews.length }).map((_, idx) => (
            <div key={`empty-${idx}`} className="aspect-square bg-surface-container rounded-lg border border-outline-variant/30 flex items-center justify-center text-outline-variant">
              <ImageIcon className="w-8 h-8 opacity-50" />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
