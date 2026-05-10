'use client'

import React, { useState } from 'react'
import { Share2, X, Link as LinkIcon, Check, Heart } from 'lucide-react'
import { QRCodeSVG } from 'qrcode.react'

interface ShareModalProps {
  tributeUrl: string
  momName: string
}

export function ShareModal({ tributeUrl, momName }: ShareModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const fullUrl = typeof window !== 'undefined' ? `${window.location.origin}${tributeUrl}` : ''

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy', err)
    }
  }

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-[60] w-14 h-14 bg-tertiary text-on-tertiary rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all duration-300 md:flex hidden"
      >
        <Share2 className="w-6 h-6" />
      </button>

      {/* Shared Action Button for Mobile / General use if needed */}
      <div className="md:hidden flex justify-center mb-12">
        <button 
          onClick={() => setIsOpen(true)}
          className="px-8 py-4 rounded-full bg-tertiary text-white font-label-lg hover:bg-on-tertiary-fixed-variant transition-all hover:scale-105 active:scale-95 flex items-center gap-2"
        >
          <Share2 className="w-4 h-4" />
          SHARE THIS TRIBUTE
        </button>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-on-surface/40 backdrop-blur-md" 
            onClick={() => setIsOpen(false)}
          ></div>
          <div className="relative bg-surface dark:bg-surface-dim w-full max-w-sm rounded-3xl shadow-2xl overflow-hidden border border-outline-variant/30 transform transition-all scale-100 opacity-100 animate-in fade-in zoom-in duration-300">
            <div className="p-8 text-center">
              <div className="flex justify-end absolute top-4 right-4">
                <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-surface-container-high text-on-surface-variant transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <h2 className="font-headline-sm text-headline-sm text-primary mb-6 mt-2">Share this Tribute</h2>
              
              <div className="bg-white p-4 rounded-2xl shadow-inner border border-outline-variant/20 inline-block mb-6 relative">
                <div className="w-40 h-40 flex items-center justify-center relative">
                  <QRCodeSVG 
                    value={fullUrl} 
                    size={160}
                    fgColor="#a3394a" // tertiary color
                    level="Q"
                  />
                  {/* Overlay a heart in the center of QR code */}
                  <div className="absolute bg-white p-1 rounded-lg">
                    <Heart className="w-6 h-6 text-tertiary fill-tertiary" />
                  </div>
                </div>
              </div>
              
              <p className="font-body-sm text-body-sm text-on-surface-variant mb-8 px-4">
                Scan this code to share the beauty of {momName}&apos;s story with others.
              </p>
              
              <button 
                onClick={copyLink}
                className={`w-full flex items-center justify-center gap-3 py-4 text-on-primary-container rounded-full font-label-lg transition-all group active:scale-95 ${copied ? 'bg-secondary-container' : 'bg-primary-container hover:bg-primary-container/80'}`}
              >
                {copied ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span>LINK COPIED!</span>
                  </>
                ) : (
                  <>
                    <LinkIcon className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                    <span>COPY LINK TO TRIBUTE</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
