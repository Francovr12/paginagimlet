"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ChevronDown, MousePointer } from "lucide-react"

export default function HeroSection() {
  const words = ["estrategias", "conceptos", "proyectos", "innovaciones", "soluciones", "creatividad"]
  const [index, setIndex] = useState(0)
  const [displayedText, setDisplayedText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)
  const [speed, setSpeed] = useState(100)
  const [isMounted, setIsMounted] = useState(false)

  // Referencia para la animación de partículas
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Marcar que el componente está montado (solo en el cliente)
  useEffect(() => {
    setIsMounted(true)
  }, [])

  useEffect(() => {
    if (!isMounted) return // No ejecutar en el servidor

    const word = words[index]
    let timeout: NodeJS.Timeout

    if (isDeleting) {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => prev.slice(0, -1))
        if (displayedText === "") {
          setIsDeleting(false)
          setIndex((prev) => (prev + 1) % words.length)
          setSpeed(100)
        }
      }, 100) // Velocidad de borrado
    } else {
      timeout = setTimeout(() => {
        setDisplayedText((prev) => word.slice(0, prev.length + 1))
        if (displayedText === word) {
          setTimeout(() => {
            setIsDeleting(true)
          }, 2000) // Tiempo antes de empezar a borrar
        }
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [displayedText, isDeleting, index, words, isMounted])

  // Efecto para la animación de partículas
  useEffect(() => {
    if (!isMounted || !canvasRef.current) return // No ejecutar en el servidor

    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Ajustar el tamaño del canvas al tamaño de la ventana
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Crear partículas
    const particles: {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string
      alpha: number
    }[] = []

    // Colores en tonos violetas para las partículas
    const purpleColors = [
      "rgba(139, 92, 246,", // Violeta
      "rgba(124, 58, 237,", // Violeta más oscuro
      "rgba(167, 139, 250,", // Violeta más claro
      "rgba(196, 181, 253,", // Lavanda
      "rgba(109, 40, 217,", // Púrpura
    ]

    // Reducir el número de partículas en dispositivos móviles
    const particleCount = window.innerWidth < 768 ? 25 : 50

    for (let i = 0; i < particleCount; i++) {
      const colorIndex = Math.floor(Math.random() * purpleColors.length)
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 3 + 1,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        color: purpleColors[colorIndex],
        alpha: Math.random() * 0.5 + 0.1,
      })
    }

    // Animar partículas
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach((particle) => {
        ctx.fillStyle = particle.color + particle.alpha + ")"
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        particle.x += particle.speedX
        particle.y += particle.speedY

        // Rebote en los bordes
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX = -particle.speedX
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY = -particle.speedY
        }
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [isMounted])

  return (
    <section
      id="inicio"
      className="relative min-h-screen flex flex-col items-center justify-center pt-20 pb-10 px-4 overflow-hidden"
    >
      {/* Gradiente de fondo */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-purple-950/20 to-black z-0"></div>

      {/* Elementos decorativos adicionales */}
      <div className="absolute top-0 right-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[10%] right-[5%] w-64 h-64 rounded-full bg-purple-700/10 blur-3xl"></div>
        <div className="absolute bottom-[20%] left-[10%] w-80 h-80 rounded-full bg-purple-600/10 blur-3xl"></div>
        <div className="absolute top-[40%] left-[30%] w-40 h-40 rounded-full bg-purple-500/10 blur-2xl"></div>
      </div>

      {/* Canvas para partículas */}
      <canvas ref={canvasRef} className="absolute inset-0 z-0 opacity-40" />

      <div className="container mx-auto max-w-6xl z-10">
        <div className="grid gap-8 items-center">
          <motion.div
            className="space-y-6 max-w-xl mx-auto text-center sm:text-left sm:mx-0" // Centrado en móvil, alineado a la izquierda en desktop
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
              {" "}
              Transformamos{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">
                {isMounted ? displayedText : words[0].substring(0, 5)}
              </span>
              {isMounted && <span className="text-purple-400">|</span>} {/* Cursor animado */}
              <br />
              en experiencias <br />
              digitales
            </h1>

            <p className="text-lg text-purple-100/80 max-w-xl">
              Descubre cómo nuestra agencia puede potenciar tu presencia digital y llevar tu marca al siguiente nivel.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center sm:justify-start">
              <Button
                size="lg"
                variant="outline"
                className="border-purple-500/30 text-white hover:bg-purple-500/10 px-8 py-6 text-lg rounded-full"
                onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
              >
                Conoce más
              </Button>
            </div>

            {/* Elementos visuales adicionales */}
            <motion.div
              className="mt-8 flex items-center gap-3 text-purple-300/70 justify-center sm:justify-start"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
            >
              <MousePointer className="h-4 w-4" />
              <span className="text-sm">Explora nuestro sitio para descubrir cómo podemos ayudarte</span>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Elementos decorativos flotantes - limitados en tamaño para móviles */}
      <motion.div
        className="absolute right-10 top-1/3 w-16 sm:w-20 h-16 sm:h-20 rounded-full bg-purple-500/20 blur-xl"
        animate={{
          y: [0, 30, 0],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute left-10 sm:left-20 bottom-1/3 w-24 sm:w-32 h-24 sm:h-32 rounded-full bg-purple-600/20 blur-xl"
        animate={{
          y: [0, -40, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 7,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Líneas decorativas - reducidas para móviles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <motion.div
          className="absolute top-[20%] right-[10%] w-[100px] sm:w-[150px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          animate={{ width: [0, 100, 0] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        />
        <motion.div
          className="absolute bottom-[30%] left-[15%] w-[120px] sm:w-[200px] h-[1px] bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"
          animate={{ width: [0, 120, 0] }}
          transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 2 }}
        />
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 cursor-pointer"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.5 }}
        onClick={() => document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth" })}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-purple-200 text-sm">Descubre más</span>
          <ChevronDown className="text-purple-400 animate-bounce h-6 w-6" />
        </div>
      </motion.div>
    </section>
  )
}

