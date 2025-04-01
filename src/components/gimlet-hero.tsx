"use client"

import { motion } from "framer-motion"
import { ChevronDown, Play } from "lucide-react"
import { useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

// Logos de clientes reconocidos (usaremos placeholders)
const clients = [
  { name: "Nike", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Apple", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Google", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Amazon", logo: "/placeholder.svg?height=40&width=120" },
  { name: "Microsoft", logo: "/placeholder.svg?height=40&width=120" },
]

export default function GimletHero() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToNext = () => {
    const nextSection = document.getElementById("servicios")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      id="inicio"
      className="relative min-h-screen w-full flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Fondo con gradiente sutil */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-black to-purple-950/70 z-0"></div>

      {/* Patrón de fondo sutil */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(circle at 25px 25px, white 2%, transparent 0%)",
            backgroundSize: "50px 50px",
          }}
        ></div>
      </div>

      {/* Contenido principal */}
      <div className="z-10 container mx-auto px-4 flex flex-col items-center pt-20 md:pt-28">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-7xl md:text-8xl lg:text-9xl font-bold text-white tracking-tight mb-6">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-white via-purple-200 to-white font-serif">
              GIMLET
            </span>
          </h1>

          <div className="h-px w-24 bg-purple-400/50 mx-auto mb-6"></div>

          <p className="text-xl md:text-2xl text-white/80 max-w-xl mx-auto font-light tracking-wide mb-8">
            Estrategias de marketing que transforman marcas y definen tendencias
          </p>

          {/* Botón Comenzar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="mb-12"
          >
            <Link href="/entrevista-virtual">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 group"
              >
                <Play className="mr-2 h-5 w-5" /> Comenzar entrevista virtual
              </Button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Sección de clientes */}
        <motion.div
          className="mt-8 md:mt-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <p className="text-center text-sm text-white/50 uppercase tracking-widest mb-8">
            Confiado por marcas líderes globales
          </p>

          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {clients.map((client, index) => (
              <motion.div
                key={index}
                className="opacity-60 hover:opacity-100 transition-opacity duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.6, y: 0 }}
                transition={{ duration: 0.4, delay: 0.8 + index * 0.1 }}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src={client.logo || "/placeholder.svg"}
                  alt={client.name}
                  width={120}
                  height={40}
                  className="h-8 md:h-10 w-auto object-contain filter invert"
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ duration: 0.5, delay: 1.5 }}
          whileHover={{ opacity: 1 }}
          onClick={scrollToNext}
          ref={scrollRef}
        >
          <div className="flex flex-col items-center gap-2">
            <span className="text-white/70 text-xs uppercase tracking-widest">Descubrir</span>
            <ChevronDown className="text-white/70 animate-bounce h-5 w-5" />
          </div>
        </motion.div>
      </div>
    </section>
  )
}

