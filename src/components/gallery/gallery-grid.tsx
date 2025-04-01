"use client"

import { useState } from "react"
import Image from "next/image"
import { motion } from "framer-motion"
import { Play, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export interface GalleryItem {
  id: number
  title: string
  description?: string
  type: "image" | "video"
  thumbnail: string
  src: string
  category: string
}

interface GalleryGridProps {
  items: GalleryItem[]
  category: string
}

export default function GalleryGrid({ items, category }: GalleryGridProps) {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)

  const openModal = (item: GalleryItem) => {
    setSelectedItem(item)
    document.body.style.overflow = "hidden"
  }

  const closeModal = () => {
    setSelectedItem(null)
    document.body.style.overflow = "auto"
  }

  return (
    <div className="container mx-auto px-4 max-w-6xl">
      <div className="mb-12 text-center">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Galería <span className="text-purple-400">{category}</span>
        </h1>
        <p className="text-lg text-purple-100/70 max-w-2xl mx-auto">
          Explora nuestra colección de trabajos en la categoría {category}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((item) => (
          <motion.div
            key={item.id}
            className="relative aspect-square overflow-hidden rounded-lg bg-black/40 border border-purple-900/30 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => openModal(item)}
          >
            <Image
              src={item.thumbnail || "/placeholder.svg"}
              alt={item.title}
              fill
              className="object-cover transition-transform duration-500 ease-in-out hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
              <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
              <p className="text-purple-300 text-sm">{item.category}</p>

              {item.type === "video" && (
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600/80 p-4 rounded-full">
                  <Play className="h-6 w-6 text-white" />
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal para visualizar el contenido */}
      {selectedItem && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4">
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
            onClick={closeModal}
          >
            <X className="h-6 w-6" />
          </Button>

          <div className="relative w-full max-w-5xl max-h-[90vh] overflow-hidden">
            {selectedItem.type === "image" ? (
              <div className="relative w-full" style={{ height: "80vh" }}>
                <Image
                  src={selectedItem.src || "/placeholder.svg"}
                  alt={selectedItem.title}
                  fill
                  className="object-contain"
                />
              </div>
            ) : (
              <div className="relative w-full aspect-video">
                <iframe
                  src={selectedItem.src}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                ></iframe>
              </div>
            )}

            <div className="bg-black/80 p-4 mt-2">
              <h3 className="text-xl font-bold text-white">{selectedItem.title}</h3>
              {selectedItem.description && <p className="text-purple-100/70 mt-2">{selectedItem.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

