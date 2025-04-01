"use client"

import { useState, useEffect, useCallback, useMemo } from "react"
import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Play, X, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Añadir el import al principio del archivo
import VideoWithLazyLoading from "@/components/VideoWithLazyLoading"

// Definimos todos los tipos necesarios aquí mismo
interface GalleryItem {
  id: number
  title: string
  description?: string
  type: "image" | "video"
  thumbnail: string
  src: string
  category: string
}

// Lista de categorías válidas definida directamente aquí
const CATEGORIES = [
  { id: 1, title: "Fashion", slug: "fashion" },
  { id: 2, title: "Urban", slug: "urban" },
  { id: 3, title: "Events", slug: "events" },
  { id: 4, title: "Food", slug: "food" },
  { id: 5, title: "Industry", slug: "industry" },
  { id: 6, title: "Corporate", slug: "corporate" },
]

// Datos de ejemplo para cada categoría con rutas actualizadas
const GALLERY_DATA: Record<string, GalleryItem[]> = {
  fashion: [
    {
      id: 1,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/fashion/fashion.jpg",
      src: "/fashion/fashion.jpg",
      category: "Fashion",
    },
    {
      id: 2,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/fashion/fashion2.jpg",
      src: "/fashion/fashion2.jpg",
      category: "Fashion",
    },
    {
      id: 3,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/fashion/fashion3.jpg",
      src: "/fashion/fashion3.jpg",
      category: "Fashion",
    },
    {
      id: 4,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/fashion/fashion4.jpg",
      src: "/fashion/fashion4.jpg",
      category: "Fashion",
    },
    {
      id: 5,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/fashion/fashion5.jpg",
      src: "/fashion/fashion5.jpg",
      category: "Fashion",
    },
    {
      id: 6,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/fashion/output-thumbnail.jpg",
      src: "/fashion/fashioneurope.mp4",
      category: "Fashion",
    },
    {
        id: 7,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/fashion/fashion11.jpg",
        src: "/fashion/fashion11.jpg",
        category: "Fashion",
      },
      {
        id: 8,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/fashion/fashion12.jpg",
        src: "/fashion/fashion12.jpg",
        category: "Fashion",
      },
      {
        id: 9,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/fashion/faschion10.jpg",
        src: "/fashion/faschion10.jpg",
        category: "Fashion",
      },
      {
        id: 10,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/fashion/faschion9.jpg",
        src: "/fashion/faschion9.jpg",
        category: "Fashion",
      },
      {
        id: 11,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/fashion/fashion8.jpg",
        src: "/fashion/fashion8.jpg",
        category: "Fashion",
      },
      {
        id: 12,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/fashion/fashion1.jpg",
        src: "/fashion/fashion1.jpg",
        category: "Fashion",
      },
      {
        id: 13,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/fashion/fashion13.jpg",
        src: "/fashion/fashion13.jpg",
        category: "Fashion",
      },
      {
        id: 14,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/fashion/fashion14.jpg",
        src: "/fashion/fashion14.jpg",
        category: "Fashion",
      },
      {
        id: 15,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/fashion/fashion16.jpg",
        src: "/fashion/fashion16.jpg",
        category: "Fashion",
      },
  ],
  urban: [
    {
      id: 1,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/urban/urban21.jpg",
      src: "/urban/urban21.jpg",
      category: "Urban",
    },
    {
      id: 2,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/urban/urban13.jpg",
      src: "/urban/urban13.jpg",
      category: "Urban",
    },
    {
      id: 3,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/urban/wow3-thumbnail.jpg",
      src: "/urban/wow3.mp4",
      category: "Urban",
    },
    {
      id: 4,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/urban/urban1.jpg",
      src: "/urban/urban1.jpg",
      category: "Urban",
    },
    {
      id: 5,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/urban/urban18.jpg",
      src: "/urban/urban18.jpg",
      category: "Urban",
    },
    {
      id: 6,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/urban/output-thumbnail.jpg",
      src: "/urban/wow1.mp4",
      category: "Urban",
    },
    {
        id: 7,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/urban/urban9.jpg",
        src: "/urban/urban9.jpg",
        category: "Urban",
    },
    {
        id: 8,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/urban/urban20.jpg",
        src: "/urban/urban20.jpg",
        category: "Urban",
    },
    {
        id: 9,
        title: "",
        description: "",
        type: "video",
        thumbnail: "/urban/wow2-thumbnail.jpg",
        src: "/urban/wow2.mp4",
        category: "Urban",
      },
      {
        id: 10,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/urban/urban6.jpg",
        src: "/urban/urban6.jpg",
        category: "Urban",
      },
      {
        id: 11,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/urban/urban16.jpg",
        src: "/urban/urban16.jpg",
        category: "Urban",
      },  
      {
        id: 12,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/urban/urban11.jpg",
        src: "/urban/urban11.jpg",
        category: "Urban",
      },  
  ],
  events: [
    {
        id: 1,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/events/events1.jpg",
        src: "/events/events1.jpg",
        category: "Events",
      },
    {
      id: 2,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/events/wow1-thumbnail.jpg",
      src: "/events/wow1.mp4",
      category: "Events",
    },
    {
      id: 3,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/events/wow2-thumbnail.jpg",
      src: "/events/wow2.mp4",
      category: "Events",
    },
    {
        id: 4,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/events/events4.jpg",
        src: "/events/events4.jpg",
        category: "Events",
      },
    {
      id: 5,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/events/wow3-thumbnail.jpg",
      src: "/events/wow3.mp4",
      category: "Events",
    },
    {
      id: 6,
      title: " ",
      description: "",
      type: "video",
      thumbnail: "/events/wow4.jpg",
      src: "/events/wow4.mp4",
      category: "Events",
    },
    {
      id: 7,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/events/events8.jpg",
      src: "/events/events8.jpg",
      category: "Events",
    },
    {
      id: 8,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/events/events5.jpg",
      src: "/events/events5.jpg",
      category: "Events",
    },
    {
        id: 9,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/events/events11.jpg",
        src: "/events/events11.jpg",
        category: "Events",
      },
      {
        id: 10,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/events/events10.jpg",
        src: "/events/events10.jpg",
        category: "Events",
      },
      {
        id: 10,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/events/events13.jpg",
        src: "/events/events13.jpg",
        category: "Events",
      },
      {
        id: 12,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/events/events12.jpg",
        src: "/events/events12.jpg",
        category: "Events",
      },
  ],
  food: [
    {
      id: 1,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/food/food1.jpg",
      src: "/food/food1.mp4",
      category: "Food",
    },
    {
      id: 2,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/food/food2.jpg",
      src: "/food/food2.mp4",
      category: "Food",
    },
    {
      id: 3,
      title: "",
      description: "",
      type: "video",
      thumbnail: "", 
      src: "/food/food3.mp4",
      category: "Food",
    },
    {
      id: 4,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/food/foods4.jpg",
      src: "/food/foods4.jpg",
      category: "Food",
    },
    {
      id: 5,
      title: "",
      description: "",
      type: "image",
      thumbnail: "/food/foods5.jpg",
      src: "/food/foods5.jpg",
      category: "Food",
    },
    {
        id: 6,
        title: "",
        description: "",
        type: "image",
        thumbnail: "/food/foods6.jpg",
        src: "/food/foods6.jpg",
        category: "Food",
      },
  ],
  industry: [
    {
      id: 1,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/industry/industry1.jpg",
      src: "/industry/industry1.mp4",
      category: "Industry",
    },
    {
      id: 2,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/industry/industry2.jpg",
      src: "/industry/industry2.mp4",
      category: "Industry",
    },
    {
      id: 3,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/industry/industry3.jpg",
      src: "/industry/industry3.mp4",
      category: "Industry",
    },
    {
      id: 4,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/industry/industry4.jpg",
      src: "/industry/industry4.mp4",
      category: "Industry",
    },
    {
      id: 5,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/industry/industry5.jpg",
      src: "/industry/industry5.mp4",
      category: "Industry",
    },
  ],
  corporate: [
    {
      id: 1,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/corporate/corporate1.jpg",
      src: "/corporate/corporate1.mp4",
      category: "Corporate",
    },
    {
      id: 2,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/corporate/corporate2.jpg",
      src: "/corporate/corporate2.mp4",
      category: "Corporate",
    },
    {
      id: 3,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/corporate/corporate3.jpg",
      src: "/corporate/corporate3.mp4",
      category: "Corporate",
    },
    {
      id: 4,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/corporate/corporate4.jpg",
      src: "/corporate/corporate4.mp4",
      category: "Corporate",
    },
    {
      id: 5,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/corporate/corporate5.jpg",
      src: "/corporate/corporate5.mp4",
      category: "Corporate",
    },
    {
      id: 6,
      title: "",
      description: "",
      type: "video",
      thumbnail: "/corporate/corporate6.jpg",
      src: "/corporate/corporate6.mp4",
      category: "Corporate",
    },
  ],
}

export default function CategoryPage() {
  // Usamos useParams para obtener los parámetros de la URL de forma segura
  const params = useParams()
  const categorySlug = typeof params.category === "string" ? params.category : ""

  // Estados - todos los Hooks se declaran al principio y sin condiciones
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null)
  const [currentIndex, setCurrentIndex] = useState<number>(0)
  const [scrolled, setScrolled] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Usamos useMemo para calcular valores derivados
  const isValidCategory = useMemo(() => CATEGORIES.some((cat) => cat.slug === categorySlug), [categorySlug])

  const galleryItems = useMemo(() => GALLERY_DATA[categorySlug] || [], [categorySlug])

  const categoryTitle = useMemo(
    () => CATEGORIES.find((cat) => cat.slug === categorySlug)?.title || categorySlug,
    [categorySlug],
  )

  // Funciones de callback - definidas con useCallback para evitar recreaciones innecesarias
  const openModal = useCallback((item: GalleryItem, index: number) => {
    setSelectedItem(item)
    setCurrentIndex(index)
    document.body.style.overflow = "hidden"
  }, [])

  const closeModal = useCallback(() => {
    setSelectedItem(null)
    document.body.style.overflow = "auto"
  }, [])

  const goToPrevious = useCallback(() => {
    if (galleryItems.length === 0) return

    const newIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length
    setSelectedItem(galleryItems[newIndex])
    setCurrentIndex(newIndex)
  }, [currentIndex, galleryItems])

  const goToNext = useCallback(() => {
    if (galleryItems.length === 0) return

    const newIndex = (currentIndex + 1) % galleryItems.length
    setSelectedItem(galleryItems[newIndex])
    setCurrentIndex(newIndex)
  }, [currentIndex, galleryItems])

  // Efectos - siempre presentes, sin condiciones
  useEffect(() => {
    setMounted(true)

    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedItem) return

      if (e.key === "Escape") closeModal()
      if (e.key === "ArrowLeft") goToPrevious()
      if (e.key === "ArrowRight") goToNext()
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [selectedItem, closeModal, goToPrevious, goToNext])

  // Renderizado condicional seguro - después de todos los Hooks
  if (!mounted) {
    return null // Renderizado inicial en el servidor o durante la hidratación
  }

  if (!isValidCategory) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center p-8">
          <h1 className="text-3xl font-bold text-white mb-4">Categoría no encontrada</h1>
          <p className="text-purple-100/70 mb-8">La categoría que buscas no existe o ha sido movida.</p>
          <Link href="/#trabajos">
            <Button className="bg-purple-600 hover:bg-purple-700 text-white">Volver a trabajos</Button>
          </Link>
        </div>
      </div>
    )
  }

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
              {CATEGORIES.map((cat) => (
                <Link href={`/trabajos/${cat.slug}`} key={cat.id}>
                  <button
                    className={cn(
                      "px-4 py-2 rounded-full transition-all duration-300 text-sm tracking-wide whitespace-nowrap",
                      categorySlug === cat.slug
                        ? "bg-purple-600/80 text-white font-medium"
                        : "text-white/70 hover:text-white hover:bg-white/10",
                    )}
                  >
                    {cat.title}
                  </button>
                </Link>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="pt-28 pb-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="mb-12 text-center">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Galería <span className="text-purple-400">{categoryTitle}</span>
            </h1>
            <p className="text-lg text-purple-100/70 max-w-2xl mx-auto">
              Explora nuestra colección de trabajos en la categoría {categoryTitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {galleryItems.map((item, index) => (
              <div
                key={`${categorySlug}-${item.id}`} // Clave única combinando categoría e ID
                className="relative overflow-hidden rounded-lg bg-black/40 border border-purple-900/30 cursor-pointer group"
                onClick={() => (item.type === "image" ? openModal(item, index) : null)}
              >
                <div className="aspect-[4/3] w-full relative overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                    {item.type === "image" ? (
                      <Image
                        src={item.thumbnail || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-contain hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <VideoWithLazyLoading
                        videoSrc={item.src}
                        thumbnail={item.thumbnail}
                        alt="Tu navegador no soporta el elemento de video"
                      />
                    )}
                  </div>
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end">
                  <div className="transform transition-transform duration-300 group-hover:translate-y-0 translate-y-2">
                    <h3 className="text-xl font-bold text-white mb-1">{item.title}</h3>
                    <p className="text-purple-300 text-sm">{item.category}</p>
                  </div>

                  {item.type === "video" && (
                    <a
                      href={item.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-purple-600/80 p-4 rounded-full hover:bg-purple-500 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Play className="h-6 w-6 text-white" />
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Modal para visualizar imágenes */}
      {selectedItem && selectedItem.type === "image" && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4" onClick={closeModal}>
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 text-white hover:bg-white/10 z-10"
            onClick={(e) => {
              e.stopPropagation()
              closeModal()
            }}
          >
            <X className="h-6 w-6" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 z-10"
            onClick={(e) => {
              e.stopPropagation()
              goToPrevious()
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/10 z-10"
            onClick={(e) => {
              e.stopPropagation()
              goToNext()
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </Button>

          <div
            className="relative max-w-5xl max-h-[80vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative w-full h-full flex items-center justify-center">
              <div className="relative max-w-full max-h-full">
                <Image
                  src={selectedItem.src || "/placeholder.svg"}
                  alt={selectedItem.title}
                  width={1200}
                  height={800}
                  className="object-contain max-h-[70vh]"
                  sizes="100vw"
                  priority
                  style={{ width: "auto", height: "auto" }}
                />
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-4">
              <h3 className="text-xl font-bold text-white">{selectedItem.title}</h3>
              {selectedItem.description && <p className="text-purple-100/70 mt-2">{selectedItem.description}</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

