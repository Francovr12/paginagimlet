"use client"

import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { Code, Lightbulb, Smartphone, Globe, Zap, Users, ArrowRight, Check } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"
import { useEffect, useState, useRef } from "react"
import { Button } from "@/components/ui/button"

const services = [
  {
    icon: Lightbulb,
    title: "Estrategia Digital",
    description:
      "Desarrollamos estrategias personalizadas para potenciar tu presencia online y alcanzar tus objetivos de negocio.",
    benefits: ["Análisis de competencia", "Estrategia de contenidos", "Plan de acción personalizado"],
  },
  {
    icon: Code,
    title: "Desarrollo Web",
    description:
      "Creamos sitios web atractivos, funcionales y optimizados para brindar la mejor experiencia a tus usuarios.",
    benefits: ["Diseño responsive", "Optimización SEO", "Experiencia de usuario óptima"],
  },
  {
    icon: Smartphone,
    title: "Diseño Grafico",
    description: "Creamos piezas visuales impactantes y funcionales que comunican tu esencia.",
    benefits: ["Identidad visual única", "Materiales de alta calidad", "Diseños adaptables"],
  },
  {
    icon: Globe,
    title: "Marketing Digital",
    description:
      "Implementamos estrategias de marketing digital efectivas para aumentar tu visibilidad y atraer clientes potenciales.",
    benefits: ["Campañas personalizadas", "Análisis de resultados", "Optimización continua"],
  },
  {
    icon: Zap,
    title: "Produccion Audiovisual",
    description:
      "Lleva tu marca al siguiente nivel con videos de calidad cinematográfica diseñados para impactar en redes sociales, páginas web y campañas publicitarias.",
    benefits: ["Calidad profesional", "Narrativa impactante", "Edición de primer nivel"],
  },
  {
    icon: Users,
    title: "Experiencia de Usuario",
    description:
      "Diseñamos interfaces intuitivas y atractivas que mejoran la satisfacción y retención de tus usuarios.",
    benefits: ["Interfaces intuitivas", "Pruebas de usabilidad", "Mejora continua"],
  },
]

// Componente para el efecto de escritura inicial
const TypewriterEffect = ({
  text,
  delay = 0,
  onComplete,
}: { text: string; delay?: number; onComplete?: () => void }) => {
  const [displayText, setDisplayText] = useState("")
  const [currentIndex, setCurrentIndex] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Limpieza de timeouts anteriores
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    if (currentIndex < text.length) {
      timeoutRef.current = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 15) // Velocidad de escritura más rápida
    } else if (onComplete) {
      onComplete()
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [currentIndex, text, onComplete])

  return (
    <span className="relative">
      {displayText}
      {currentIndex < text.length && <span className="text-purple-400 animate-pulse">|</span>}
    </span>
  )
}

// Asegúrate de que la exportación del componente sea correcta
export default function ServicesSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView({
    triggerOnce: false, // Cambiado de true a false para que se active cada vez que entre en la vista
    threshold: 0.1,
  })

  // Estado para controlar qué tarjetas han completado su animación de escritura
  const [completedTyping, setCompletedTyping] = useState<Record<number, boolean>>({})

  // Estado para controlar qué tarjeta está expandida
  const [expandedCard, setExpandedCard] = useState<number | null>(null)

  // Estado para controlar si la sección ha vuelto a la vista
  const [hasReturned, setHasReturned] = useState(false)

  useEffect(() => {
    if (inView) {
      controls.start("visible")
      setHasReturned(true)

      // Asegurarse de que las tarjetas se muestren incluso si la animación no se dispara
      setTimeout(() => {
        const servicesContainer = document.querySelector(".services-grid")
        if (servicesContainer) {
          const cards = servicesContainer.querySelectorAll(".service-card")
          cards.forEach((card) => {
            ;(card as HTMLElement).style.opacity = "1"
            ;(card as HTMLElement).style.transform = "translateY(0)"
          })
        }
      }, 500)
    } else {
      setHasReturned(false)
    }
  }, [controls, inView])

  // Añadir un useEffect que se ejecute cuando hasReturned cambie
  useEffect(() => {
    if (hasReturned) {
      // Forzar la animación de las tarjetas
      controls.start("visible")

      // Asegurarse de que las tarjetas sean visibles
      setTimeout(() => {
        const servicesContainer = document.querySelector(".services-grid")
        if (servicesContainer) {
          const cards = servicesContainer.querySelectorAll(".service-card")
          cards.forEach((card) => {
            ;(card as HTMLElement).style.opacity = "1"
            ;(card as HTMLElement).style.transform = "translateY(0)"
          })
        }
      }, 300)
    }
  }, [hasReturned, controls])

  // Variantes para la animación secuencial de las tarjetas
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Tiempo entre cada tarjeta
      },
    },
  }

  // Variantes para cada tarjeta
  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15,
        duration: 0.5,
      },
    },
  }

  // Variantes para el icono (caída)
  const iconVariants = {
    hidden: {
      y: -50,
      opacity: 0,
      scale: 0.5,
    },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
        duration: 0.5,
      },
    },
  }

  // Variantes para la línea del título de sección
  const titleLineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 0.8,
      },
    },
  }

  // Función para marcar una tarjeta como completada
  const handleTypingComplete = (index: number) => {
    setCompletedTyping((prev) => ({
      ...prev,
      [index]: true,
    }))
  }

  return (
    <section id="servicios" className="py-20 px-4 relative">
      {/* Fondo con gradiente */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/10 to-black -z-10"></div>

      {/* Elementos decorativos */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-5">
        <motion.div
          className="absolute top-[10%] right-[10%] w-40 h-40 rounded-full bg-purple-600/10 blur-2xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
        />
        <motion.div
          className="absolute bottom-[20%] left-[5%] w-60 h-60 rounded-full bg-purple-700/10 blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            className="inline-block"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Nuestros{" "}
              <span className="text-purple-400 relative">
                Servicios
                <motion.span
                  className="absolute bottom-0 left-0 h-1 bg-purple-400"
                  initial="hidden"
                  animate={inView ? "visible" : "hidden"}
                  variants={titleLineVariants}
                />
              </span>
            </h2>
          </motion.div>
          <motion.p
            className="text-lg text-purple-100/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Soluciones digitales de <span className="text-purple-400 font-semibold">alta calidad</span> diseñadas para
            impulsar tu negocio al siguiente nivel
          </motion.p>

          {/* Badges destacados */}
          <motion.div
            className="flex flex-wrap justify-center gap-3 mt-6"
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <span className="bg-purple-500/20 text-purple-200 text-xs font-medium px-3 py-1 rounded-full border border-purple-500/30">
              Resultados Garantizados
            </span>
            <span className="bg-purple-500/20 text-purple-200 text-xs font-medium px-3 py-1 rounded-full border border-purple-500/30">
              Equipo Especializado
            </span>
            <span className="bg-purple-500/20 text-purple-200 text-xs font-medium px-3 py-1 rounded-full border border-purple-500/30">
              Tecnología de Vanguardia
            </span>
          </motion.div>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 services-grid"
          variants={containerVariants}
          initial="hidden"
          animate={controls}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="h-full cursor-pointer service-card"
              whileHover={{
                boxShadow: "0 10px 25px -5px rgba(139, 92, 246, 0.3)",
                transition: { duration: 0.2 },
              }}
              onClick={() => setExpandedCard(expandedCard === index ? null : index)}
            >
              <Card className="bg-black/40 border-purple-900/50 backdrop-blur-sm hover:bg-black/60 transition-all duration-300 h-full overflow-hidden">
                <CardHeader className="relative">
                  <motion.div
                    className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4"
                    variants={iconVariants}
                  >
                    <service.icon className="h-6 w-6 text-purple-400" />
                  </motion.div>
                  <CardTitle className="text-xl text-white relative">
                    {service.title}
                    <motion.div
                      className="absolute -bottom-1 left-0 h-[2px] bg-purple-400/30"
                      initial={{ width: 0 }}
                      animate={{ width: "30%" }}
                      transition={{ delay: 0.2, duration: 0.5 }}
                    />
                  </CardTitle>

                  {/* Etiqueta "Premium" para destacar */}
                  {/*{index === 0 || index === 3 ? (
                    <motion.div
                      className="absolute top-2 right-2"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8, duration: 0.3 }}
                    >
                      <span className="bg-purple-500/30 text-purple-200 text-xs font-medium px-2 py-0.5 rounded-full border border-purple-500/40">
                        Premium
                      </span>
                    </motion.div>
                  ) : null}
                   */}
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-purple-100/70 text-base min-h-[80px]">
                    {inView && !completedTyping[index] ? (
                      <TypewriterEffect
                        text={service.description}
                        delay={index * 0.1}
                        onComplete={() => handleTypingComplete(index)}
                      />
                    ) : (
                      service.description
                    )}
                  </CardDescription>

                  {/* Beneficios que aparecen al expandir */}
                  <AnimatePresence>
                    {expandedCard === index && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="mt-4 pt-4 border-t border-purple-900/30"
                      >
                        <h4 className="text-sm font-medium text-purple-300 mb-2">Beneficios clave:</h4>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.1 }}
                              className="flex items-start gap-2 text-sm text-white/80"
                            >
                              <Check className="h-4 w-4 text-purple-400 mt-0.5 flex-shrink-0" />
                              <span>{benefit}</span>
                            </motion.li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-purple-400 hover:text-purple-300 hover:bg-purple-900/20 p-0 h-auto"
                    onClick={(e) => {
                      e.stopPropagation()
                      setExpandedCard(expandedCard === index ? null : index)
                    }}
                  >
                    {expandedCard === index ? "Ver menos" : "Ver más"}
                    <ArrowRight
                      className={`ml-1 h-4 w-4 transition-transform ${expandedCard === index ? "rotate-90" : ""}`}
                    />
                  </Button>
                </CardFooter>

                {/* Efecto de brillo en la esquina */}
                <motion.div
                  className="absolute -top-10 -right-10 w-20 h-20 bg-purple-500/20 rounded-full blur-xl"
                  animate={{
                    opacity: [0.1, 0.3, 0.1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                    delay: index * 0.5,
                  }}
                />

                {/* Efecto de línea que se dibuja */}
                <motion.div
                  className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-purple-500 to-transparent"
                  initial={{ width: 0 }}
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.8 }}
                />
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA para servicios */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 1.2 }}
        >
          <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
            ¿Listo para <span className="text-purple-400">transformar</span> tu presencia digital?
          </h3>
          <p className="text-white/70 max-w-2xl mx-auto mb-6">
            Nuestro equipo de expertos está preparado para ayudarte a alcanzar tus objetivos con soluciones
            personalizadas y de alta calidad.
          </p>
          <Button
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 text-white px-8"
            onClick={() => document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth" })}
          >
            Solicita una consulta gratuita
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </div>

      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl rounded-full bg-purple-600/10 blur-[120px] -z-10" />

      {/* Efecto de escritura para el título de la sección */}
      <motion.div
        className="absolute top-10 left-1/2 transform -translate-x-1/2 text-purple-300/20 text-8xl font-bold opacity-10 pointer-events-none select-none"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.1 } : { opacity: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
      >
        SERVICIOS
      </motion.div>
    </section>
  )
}

