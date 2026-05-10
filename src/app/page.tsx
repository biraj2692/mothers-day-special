/* eslint-disable @next/next/no-img-element */
'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Sparkles, Loader2 } from 'lucide-react'
import { ImageUpload } from '@/components/ImageUpload'
import { supabase } from '@/lib/supabaseClient'

export default function Home() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  
  const [formData, setFormData] = useState({
    from_name: '',
    mom_name: '',
    fav_color: '#f472b6',
    fav_food: '',
    fav_place: '',
    superpower: '',
    message: ''
  })

  const COLOR_SWATCHES = [
    '#f43f5e', '#ef4444', '#f97316', '#f59e0b', '#eab308', 
    '#84cc16', '#22c55e', '#10b981', '#14b8a6', '#06b6d4', 
    '#0ea5e9', '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', 
    '#d946ef', '#ec4899', '#f472b6', '#fb7185', '#fda4af'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // 1. Upload images
      const imageUrls: string[] = []
      
      for (const file of files) {
        const fileExt = file.name.split('.').pop()
        const fileName = `${Math.random()}.${fileExt}`
        const filePath = `${Date.now()}-${fileName}`

        const { error: uploadError } = await supabase.storage
          .from('mom-images')
          .upload(filePath, file)

        if (uploadError) {
          console.error("Upload error:", uploadError)
          throw uploadError
        }

        const { data: publicUrlData } = supabase.storage
          .from('mom-images')
          .getPublicUrl(filePath)
          
        imageUrls.push(publicUrlData.publicUrl)
      }

      // 2. Insert into database
      const { data: tributeData, error: dbError } = await supabase
        .from('tributes')
        .insert([
          {
            from_name: formData.from_name,
            mom_name: formData.mom_name,
            fav_color: formData.fav_color,
            fav_food: formData.fav_food,
            fav_place: formData.fav_place,
            superpower: formData.superpower,
            message: formData.message,
            image_urls: imageUrls
          }
        ])
        .select()
        .single()

      if (dbError) {
        console.error("DB error:", dbError)
        throw dbError
      }

      // 3. Redirect to tribute page
      if (tributeData && tributeData.id) {
        router.push(`/tribute/${tributeData.id}`)
      }
    } catch (error) {
      console.error("Failed to create tribute", error)
      alert("Failed to create tribute. Please check console for details.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="pt-32 pb-24 px-margin-mobile md:px-margin-desktop max-w-container-max mx-auto">
      {/* Hero Banner */}
      <section className="mb-16 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-tertiary-container/30 text-on-tertiary-container font-label-md mb-6">
          <Sparkles className="w-4 h-4" />
          <span>The Perfect Gift</span>
        </div>
        <h1 className="font-headline-lg text-[40px] leading-tight md:text-headline-lg text-primary mb-6 max-w-4xl mx-auto">
          Create a Timeless Digital Tribute for Mom
        </h1>
        <p className="font-body-lg text-body-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto">
          Show her how much she means to you. Craft a beautiful, personalized webpage dedicated entirely to her with memories, photos, and a heartfelt message in just minutes.
        </p>
      </section>

      {/* Main Creator Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
        {/* Left Decorative Column */}
        <div className="hidden lg:flex lg:col-span-4 flex-col gap-8">
          <div className="rounded-xl overflow-hidden aspect-[3/4] soft-glow-shadow">
            <img 
              className="w-full h-full object-cover" 
              alt="Mother and child hugging"
              src="/Gemini_Generated_Image_62pxnb62pxnb62px.png"
            />
          </div>
          <div className="p-8 rounded-xl border border-outline-variant bg-surface-container-low italic text-primary font-headline-sm">
            &quot;A mother&apos;s love is the fuel that enables a normal human being to do the impossible.&quot;
          </div>
        </div>

        {/* Form Column */}
        <div className="lg:col-span-8 bg-surface-container-lowest rounded-xl p-8 md:p-12 border border-outline-variant soft-glow-shadow">
          <form className="space-y-8" onSubmit={handleSubmit}>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="font-label-lg text-label-lg text-on-surface-variant">Your Name (From)</label>
                <input 
                  required
                  name="from_name"
                  value={formData.from_name}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container border-0 focus:ring-2 focus:ring-secondary rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-outline/50 outline-none" 
                  placeholder="Enter your name" 
                  type="text"
                />
              </div>
              <div className="space-y-2">
                <label className="font-label-lg text-label-lg text-on-surface-variant">Mom&apos;s Name</label>
                <input 
                  required
                  name="mom_name"
                  value={formData.mom_name}
                  onChange={handleInputChange}
                  className="w-full bg-surface-container border-0 focus:ring-2 focus:ring-secondary rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-outline/50 outline-none" 
                  placeholder="Enter her full name" 
                  type="text"
                />
              </div>
            </div>

            <div className="space-y-3">
              <label className="font-label-lg text-label-lg text-on-surface-variant">Her Signature Color</label>
              <div className="bg-surface-container rounded-lg p-4">
                <div className="flex flex-wrap gap-3">
                  {COLOR_SWATCHES.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setFormData({ ...formData, fav_color: color })}
                      className={`w-10 h-10 rounded-full transition-transform hover:scale-110 flex items-center justify-center ${formData.fav_color === color ? 'ring-2 ring-offset-2 ring-primary scale-110' : ''}`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${color}`}
                    />
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-label-lg text-label-lg text-on-surface-variant">Favorite Food</label>
              <input 
                name="fav_food"
                value={formData.fav_food}
                onChange={handleInputChange}
                className="w-full bg-surface-container border-0 focus:ring-2 focus:ring-secondary rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-outline/50 outline-none" 
                placeholder="Something she loves to cook or eat" 
                type="text"
              />
            </div>
            
            <div className="space-y-2">
              <label className="font-label-lg text-label-lg text-on-surface-variant">Our Favorite Place</label>
              <input 
                name="fav_place"
                value={formData.fav_place}
                onChange={handleInputChange}
                className="w-full bg-surface-container border-0 focus:ring-2 focus:ring-secondary rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-outline/50 outline-none" 
                placeholder="Where do you share your best memories?" 
                type="text"
              />
            </div>
            
            <div className="space-y-2">
              <label className="font-label-lg text-label-lg text-on-surface-variant">Her Superpower</label>
              <input 
                name="superpower"
                value={formData.superpower}
                onChange={handleInputChange}
                className="w-full bg-surface-container border-0 focus:ring-2 focus:ring-secondary rounded-lg px-4 py-3 font-body-md text-on-surface placeholder:text-outline/50 outline-none" 
                placeholder="What is her secret strength?" 
                type="text"
              />
            </div>

            <div className="space-y-2">
              <label className="font-label-lg text-label-lg text-on-surface-variant">Personal Message</label>
              <textarea 
                required
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="w-full bg-surface-container border-0 focus:ring-2 focus:ring-secondary rounded-lg px-4 py-3 font-body-md text-on-surface resize-none placeholder:text-outline/50 outline-none" 
                placeholder="Write a heartfelt note for her..." 
                rows={5}
              ></textarea>
            </div>

            <ImageUpload onImagesChange={setFiles} />

            <div className="pt-8">
              <button 
                disabled={isSubmitting}
                className="w-full py-5 bg-tertiary text-on-tertiary font-headline-sm rounded-xl soft-glow-shadow hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:scale-100 disabled:cursor-not-allowed" 
                type="submit"
              >
                {isSubmitting ? (
                  <Loader2 className="w-6 h-6 animate-spin" />
                ) : (
                  <Sparkles className="w-6 h-6 fill-current" />
                )}
                {isSubmitting ? 'Generating...' : 'Generate Tribute'}
              </button>
              <p className="text-center mt-4 text-body-sm text-outline">You&apos;ll be able to preview and edit your tribute in the next step.</p>
            </div>
          </form>
        </div>
      </div>
      
      {/* Decorative Flower Footer */}
      <div className="mt-24 flex justify-center opacity-20">
        <svg className="text-tertiary" fill="none" height="60" viewBox="0 0 200 60" width="200" xmlns="http://www.w3.org/2000/svg">
          <path d="M100 30C100 30 110 10 120 30C130 50 100 50 100 50C100 50 70 50 80 30C90 10 100 30 100 30Z" stroke="currentColor" strokeWidth="1.5"></path>
          <path d="M100 30C100 30 120 20 125 35C130 50 110 55 100 50M100 30C100 30 80 20 75 35C70 50 90 55 100 50" stroke="currentColor" strokeWidth="1"></path>
          <line stroke="currentColor" strokeDasharray="4 4" strokeWidth="0.5" x1="10" x2="70" y1="30" y2="30"></line>
          <line stroke="currentColor" strokeDasharray="4 4" strokeWidth="0.5" x1="130" x2="190" y1="30" y2="30"></line>
        </svg>
      </div>
    </main>
  )
}
