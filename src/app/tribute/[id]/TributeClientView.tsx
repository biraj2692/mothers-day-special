/* eslint-disable @next/next/no-img-element */
'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { ShareModal } from '@/components/ShareModal'
import { Sparkles, Flower2, Utensils, Heart, Quote } from 'lucide-react'

interface TributeClientViewProps {
  tribute: {
    id: string
    from_name?: string
    mom_name: string
    fav_color: string
    fav_food?: string
    superpower?: string
    fav_place?: string
    message: string
    image_urls?: string[]
  }
}

export function TributeClientView({ tribute }: TributeClientViewProps) {
  const customColor = tribute.fav_color || '#a3394a'

  // Pre-defined random rotations and offsets for the scrapbook polaroids
  const scrapbookStyles = [
    { rotate: -4, marginTop: '20px', marginLeft: '-10px' },
    { rotate: 3, marginTop: '-15px', marginLeft: '15px' },
    { rotate: -2, marginTop: '10px', marginLeft: '5px' },
    { rotate: 5, marginTop: '-5px', marginLeft: '-15px' },
    { rotate: -3, marginTop: '25px', marginLeft: '10px' },
    { rotate: 2, marginTop: '-20px', marginLeft: '-5px' },
    { rotate: -5, marginTop: '15px', marginLeft: '20px' },
    { rotate: 4, marginTop: '-10px', marginLeft: '-20px' }
  ]

  const floatingEmojis = ['✨', '💖', '🌸', '🦋', '💐']

  const [mounted, setMounted] = React.useState(false)
  const [floatingElements, setFloatingElements] = React.useState<any[]>([])

  React.useEffect(() => {
    setMounted(true)
    setFloatingElements([...Array(5)].map((_, i) => ({
      id: i,
      initialX: Math.random() * 100 + "%",
      animateX: Math.random() * 100 + "%",
      duration: 15 + Math.random() * 10,
      left: `${Math.random() * 80}%`,
      top: `${Math.random() * 80}%`
    })))
  }, [])

  const quotes = [
    "Life doesn't come with a manual, it comes with a mother.",
    "To the world you are a mother, but to your family you are the world.",
    "A mother's hug lasts long after she lets go.",
    "Mothers hold their children's hands for a short while, but their hearts forever.",
    "There is no role in life that is more essential than that of motherhood."
  ]
  const [randomQuote, setRandomQuote] = React.useState(quotes[0])

  React.useEffect(() => {
    setRandomQuote(quotes[Math.floor(Math.random() * quotes.length)])
  }, [])

  return (
    <main className="pt-24 pb-32 selection:bg-tertiary-container selection:text-on-tertiary-container" style={{ '--color-tertiary': customColor } as React.CSSProperties}>
      {/* Hero Section */}
      <section className="relative min-h-[716px] flex items-center justify-center overflow-hidden px-margin-mobile">
        {/* Floating background elements for a more alive feel */}
        {mounted && floatingElements.map((el, i) => (
          <motion.div
            key={el.id}
            className="absolute opacity-20 pointer-events-none"
            initial={{ y: "100%", x: el.initialX }}
            animate={{ 
              y: "-10%", 
              x: el.animateX,
              rotate: [0, 90, 180, 270, 360]
            }}
            transition={{ 
              duration: el.duration, 
              repeat: Infinity, 
              ease: "linear" 
            }}
            style={{ 
              left: el.left,
              top: el.top
            }}
          >
            {i % 2 === 0 ? (
              <Heart className="w-8 h-8" style={{ color: customColor, fill: customColor }} />
            ) : (
              <span className="text-3xl">{floatingEmojis[i % floatingEmojis.length]}</span>
            )}
          </motion.div>
        ))}

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-4xl mx-auto px-4"
        >
          <div className="flex justify-center mb-6">
            <Sparkles className="w-12 h-12" style={{ color: customColor }} />
          </div>
          <h1 className="font-headline-lg text-headline-lg md:text-[64px] text-primary mb-6 leading-tight">
            Happy Mother&apos;s Day, <br/>
            <span className="italic" style={{ color: customColor }}>{tribute.mom_name}</span>
          </h1>
          <p className="font-label-lg text-label-lg uppercase tracking-[0.2em] text-on-surface-variant mb-4">
            Celebrating a Lifetime of Love
          </p>
          <div className="mt-8 italic text-lg md:text-xl font-headline-sm max-w-2xl mx-auto" style={{ color: customColor }}>
            &quot;{randomQuote}&quot;
          </div>
          <div className="mt-12 flex justify-center items-center gap-4">
            <div className="w-16 h-[1px] bg-outline-variant self-center"></div>
            <Flower2 className="text-outline-variant w-6 h-6" />
            <div className="w-16 h-[1px] bg-outline-variant self-center"></div>
          </div>
        </motion.div>
      </section>

      {/* Personal Message Section */}
      <section className="py-24 px-margin-mobile relative overflow-visible bg-surface-container-low">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-[850px] mx-auto relative"
        >
          <div 
            className="relative bg-white/70 backdrop-blur-md rounded-[40px] p-12 md:p-16 shadow-2xl transition-transform hover:scale-[1.02] duration-500"
            style={{ 
              boxShadow: `0 25px 50px -12px ${customColor}33`,
              border: `1px solid ${customColor}22`
            }}
          >
            <Quote 
              className="absolute -top-8 left-12 w-16 h-16 opacity-90 drop-shadow-md" 
              style={{ color: customColor, fill: customColor }} 
            />
            <div className="relative z-10 text-center">
              <p className="font-headline-md text-headline-md italic text-on-surface leading-relaxed mb-10 drop-shadow-sm">
                &quot;{tribute.message}&quot;
              </p>
              <div 
                className="font-label-lg text-label-lg tracking-[0.3em] uppercase opacity-90"
                style={{ color: customColor }}
              >
                — WITH ALL MY LOVE
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Highlights Section */}
      <section className="py-24 max-w-container-max mx-auto px-margin-mobile">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-gutter">
          {/* Highlight 1: Food */}
          {tribute.fav_food && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-2 rounded-3xl p-10 flex flex-col justify-between border shadow-sm hover:shadow-md transition-shadow bg-surface-container-lowest"
              style={{ borderColor: `${customColor}33` }}
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-2xl" style={{ backgroundColor: customColor }}>
                    <Utensils className="text-white w-6 h-6" />
                  </div>
                  <span className="font-label-lg text-label-lg uppercase" style={{ color: customColor }}>Your Signature Taste</span>
                </div>
                <h3 className="font-headline-md text-headline-md text-on-secondary-container mb-4">{tribute.fav_food}</h3>
                <p className="font-body-lg text-body-lg text-on-surface-variant max-w-md">
                  Nothing says &apos;home&apos; quite like the zesty, sweet aroma of your cooking. It&apos;s the secret ingredient of love in every bite.
                </p>
              </div>
            </motion.div>
          )}

          {/* Highlight 2: Color */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="rounded-3xl p-8 border border-tertiary-container shadow-sm flex flex-col items-center text-center bg-surface-container-lowest"
          >
            <Heart className="w-10 h-10 mb-4" style={{ color: customColor, fill: customColor }} />
            <h4 className="font-headline-sm text-headline-sm text-on-tertiary-container mb-2">Favorite Color</h4>
            <div 
              className="w-16 h-16 rounded-full shadow-inner mb-4 ring-4 ring-white"
              style={{ backgroundColor: customColor }}
            ></div>
            <p className="font-body-sm text-body-sm text-on-surface-variant">Her signature shade.</p>
          </motion.div>

          {/* Highlight 3: Superpower */}
          {tribute.superpower && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="rounded-3xl p-8 border shadow-sm flex flex-col justify-center bg-surface-container-lowest"
              style={{ borderColor: `${customColor}33` }}
            >
              <h4 className="font-label-lg text-label-lg uppercase mb-4 tracking-tighter" style={{ color: customColor }}>Your Superpower</h4>
              <p className="font-headline-sm text-headline-sm text-on-surface">{tribute.superpower}</p>
            </motion.div>
          )}

          {/* Highlight 4: Place */}
          {tribute.fav_place && (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="md:col-span-2 rounded-3xl p-10 border shadow-lg flex flex-col md:flex-row gap-8 items-center bg-surface-container-lowest"
              style={{ borderColor: `${customColor}33` }}
            >
              <div className="w-full md:w-1/2">
                <h3 className="font-headline-sm text-headline-sm mb-2" style={{ color: customColor }}>Our Favorite Place</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">{tribute.fav_place}</p>
              </div>
            </motion.div>
          )}
        </div>
      </section>

      {/* Image Gallery */}
      {tribute.image_urls && tribute.image_urls.length > 0 && (
        <section 
          className="py-24"
          style={{ backgroundColor: `${customColor}11` }}
        >
          <div className="max-w-container-max mx-auto px-margin-mobile">
            <div className="text-center mb-16">
              <h2 className="font-headline-md text-headline-md text-primary mb-2">Moments We Treasure</h2>
              <div className="h-1 w-20 mx-auto rounded-full" style={{ backgroundColor: customColor }}></div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-8 md:gap-12 pt-8">
              {tribute.image_urls.map((url: string, index: number) => {
                const styleObj = scrapbookStyles[index % scrapbookStyles.length]
                
                return (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                    whileInView={{ opacity: 1, scale: 1, rotate: styleObj.rotate }}
                    viewport={{ once: true }}
                    transition={{ type: 'spring', stiffness: 100, delay: index * 0.1 }}
                    className="relative z-10 hover:z-20 transition-z duration-300"
                    style={{ 
                      marginTop: styleObj.marginTop,
                      marginLeft: styleObj.marginLeft,
                      maxWidth: '300px',
                      width: '100%'
                    }}
                  >
                    <div 
                      className="bg-white p-4 pb-16 shadow-2xl border transition-transform hover:scale-105 duration-300"
                      style={{ borderColor: `${customColor}22` }}
                    >
                      <img 
                        src={url} 
                        alt={`Memory ${index + 1}`} 
                        className="w-full aspect-[4/5] object-cover bg-surface-variant" 
                      />
                    </div>
                    {/* Decorative Tape */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-24 h-8 bg-white/40 backdrop-blur-sm shadow-sm rotate-[-2deg]"></div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* Action Section */}
      <section className="py-24 max-w-2xl mx-auto px-margin-mobile text-center">
        <div className="flex items-center justify-center gap-4 text-outline mb-12">
          <Heart className="w-4 h-4" />
          <span className="font-label-sm tracking-widest uppercase">Created with love {tribute.from_name && `by ${tribute.from_name}`}</span>
          <Heart className="w-4 h-4" />
        </div>
      </section>

      <ShareModal tributeUrl={`/tribute/${tribute.id}`} momName={tribute.mom_name} />
    </main>
  )
}
