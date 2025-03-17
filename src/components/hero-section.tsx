"use client"

import { useRef, useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowRight, ChevronDown } from "lucide-react"
import { motion } from "framer-motion"

export default function HeroSection() {
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToNext = () => {
    const nextSection = document.getElementById("servicios")
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  // Estado para almacenar las posiciones generadas aleatoriamente
  const [bgElements, setBgElements] = useState<{ width: number, height: number, top: string, left: string, opacity: number, duration: number, delay: number }[]>([])

  useEffect(() => {
    const generatedElements = Array.from({ length: 8 }).map(() => ({
      width: Math.random() * 400 + 100,
      height: Math.random() * 400 + 100,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      opacity: Math.random() * 0.5,
      duration: Math.random() * 10 + 20,
      delay: Math.random() * 5
    }))

    setBgElements(generatedElements)
  }, []) // Solo se ejecuta en el cliente

  return (
    <section id="inicio" className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <motion.div
            className="space-y-6 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Transformamos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                ideas
              </span>{" "}
              en experiencias digitales
            </h1>

            <p className="text-lg md:text-xl text-purple-100/80 max-w-xl mx-auto md:mx-0">
              Responde estas preguntas y descubre si somos el match perfecto.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button
                size="lg"
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-6 text-lg rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 group"
                onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
              >
                Comenzar ahora
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="bg-purple-600 text-white hover:bg-purple-700 border-purple-600 px-8 py-6 text-lg rounded-full"
                onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
              >
                Conoce más
              </Button>
            </div>
          </motion.div>

          <motion.div
            className="relative h-[400px] md:h-[500px] order-first md:order-last"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {/* Imagen deshabilitada */}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        onClick={scrollToNext}
        ref={scrollRef}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-purple-200 text-sm">Descubre más</span>
          <ChevronDown className="text-purple-400 animate-bounce h-6 w-6" />
        </div>
      </motion.div>

      {/* Background Animation - Generado en el cliente */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -inset-[10px] opacity-30">
          {bgElements.map((el, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-purple-600/20"
              style={{
                width: `${el.width}px`,
                height: `${el.height}px`,
                top: el.top,
                left: el.left,
                animation: `float ${el.duration}s linear infinite`,
                animationDelay: `${el.delay}s`,
                opacity: el.opacity,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
