"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "María González",
    role: "CEO, Innovatech",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Trabajar con este equipo ha sido una experiencia excepcional. Transformaron nuestra visión en una plataforma digital que superó todas nuestras expectativas. Su enfoque en la experiencia del usuario y atención al detalle es incomparable.",
    rating: 5,
  },
  {
    name: "Carlos Rodríguez",
    role: "Director de Marketing, TechSolutions",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Desde que implementamos la estrategia digital diseñada por ellos, hemos visto un aumento del 200% en nuestras conversiones. Su equipo no solo entiende de tecnología, sino también de negocios y cómo impulsar resultados reales.",
    rating: 5,
  },
  {
    name: "Laura Martínez",
    role: "Fundadora, EcoStyle",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Nuestra aplicación móvil ha recibido comentarios increíbles de los usuarios. El proceso de desarrollo fue transparente y colaborativo, y el resultado final refleja perfectamente nuestra marca y valores.",
    rating: 4,
  },
  {
    name: "Javier Sánchez",
    role: "CTO, FinanceApp",
    avatar: "/placeholder.svg?height=60&width=60",
    content:
      "Su experiencia técnica es impresionante. Lograron resolver desafíos complejos con soluciones elegantes y eficientes. Además, su soporte post-lanzamiento ha sido excepcional.",
    rating: 5,
  },
]

export default function TestimonialsSection() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [ref, inView] = useInView({
    triggerOnce: false,
    threshold: 0.1,
  })

  useEffect(() => {
    if (inView) {
      const interval = setInterval(() => {
        setActiveIndex((prev) => (prev + 1) % testimonials.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [inView])

  return (
    <section id="testimonios" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Lo que dicen nuestros <span className="text-purple-400">clientes</span>
          </motion.h2>
          <motion.p
            className="text-lg text-purple-100/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Historias de éxito de quienes han confiado en nosotros
          </motion.p>
        </div>

        <div ref={ref} className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <Card className="bg-black/40 border-purple-900/50 backdrop-blur-sm p-6">
                    <CardContent className="p-0">
                      <div className="flex flex-col items-center text-center">
                        <div className="mb-6">
                          <Avatar className="h-20 w-20 border-2 border-purple-500">
                            <AvatarImage src={testimonial.avatar} alt={testimonial.name} />
                            <AvatarFallback className="bg-purple-800 text-white">
                              {testimonial.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        <div className="flex mb-4">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-5 w-5 ${i < testimonial.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-500"}`}
                            />
                          ))}
                        </div>

                        <blockquote className="mb-6 text-lg text-purple-100/90 italic">
                          "{testimonial.content}"
                        </blockquote>

                        <div>
                          <h4 className="font-semibold text-white">{testimonial.name}</h4>
                          <p className="text-sm text-purple-300/70">{testimonial.role}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center mt-8 gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === activeIndex ? "bg-purple-500" : "bg-purple-500/30"
                }`}
                aria-label={`Ver testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute top-1/2 right-0 w-full h-full max-w-3xl max-h-3xl rounded-full bg-purple-600/10 blur-[120px] -z-10" />
    </section>
  )
}

