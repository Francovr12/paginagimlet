"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

// Lista de categorías válidas
const validCategories = [
  { id: 1, title: "Fashion", slug: "fashion" },
  { id: 2, title: "Urban", slug: "urban" },
  { id: 3, title: "Events", slug: "events" },
  { id: 4, title: "Food", slug: "food" },
  { id: 5, title: "Industry", slug: "industry" },
  { id: 6, title: "Corporate", slug: "corporate" },
]

interface GalleryLayoutProps {
  children: React.ReactNode
  currentCategory: string
}

export default function GalleryLayout({ children, currentCategory }: GalleryLayoutProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-black">
      {/* Header con navegación */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <Link href="/#trabajos">
                <Button variant="ghost" size="icon" className="text-white hover:bg-white/10">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <Link href="/" className="text-white font-bold text-xl tracking-tight">
                GIMLET
              </Link>
            </div>

            {/* Navegación entre categorías */}
            <nav className="flex items-center justify-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 border border-purple-900/20 overflow-x-auto max-w-full">
              {validCategories.map((category) => (
                <Link href={`/trabajos/${category.slug}`} key={category.id}>
                  <button
                    className={cn(
                      "px-4 py-2 rounded-full transition-all duration-300 text-sm tracking-wide whitespace-nowrap",
                      currentCategory === category.slug
                        ? "bg-purple-600/80 text-white font-medium"
                        : "text-white/70 hover:text-white hover:bg-white/10",
                    )}
                  >
                    {category.title}
                  </button>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="pt-28 pb-20">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
    </div>
  )
}

