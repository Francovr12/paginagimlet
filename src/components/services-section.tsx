"use client"

import { motion } from "framer-motion"
import { Code, Lightbulb, Smartphone, Globe, Zap, Users } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useInView } from "react-intersection-observer"

const services = [
  {
    icon: Lightbulb,
    title: "Estrategia Digital",
    description:
      "Desarrollamos estrategias personalizadas para potenciar tu presencia online y alcanzar tus objetivos de negocio.",
  },
  {
    icon: Code,
    title: "Desarrollo Web",
    description:
      "Creamos sitios web atractivos, funcionales y optimizados para brindar la mejor experiencia a tus usuarios.",
  },
  {
    icon: Smartphone,
    title: "Diseño Grafico",
    description:
      "Creamos piezas visuales impactantes y funcionales que comunican tu esencia. ",
  },
  {
    icon: Globe,
    title: "Marketing Digital",
    description:
      "Implementamos estrategias de marketing digital efectivas para aumentar tu visibilidad y atraer clientes potenciales.",
  },
  {
    icon: Zap,
    title: "Optimización SEO",
    description:
      "Mejoramos el posicionamiento de tu sitio web en los motores de búsqueda para aumentar el tráfico orgánico.",
  },
  {
    icon: Users,
    title: "Experiencia de Usuario",
    description:
      "Diseñamos interfaces intuitivas y atractivas que mejoran la satisfacción y retención de tus usuarios.",
  },
]

export default function ServicesSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="servicios" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Nuestros <span className="text-purple-400">Servicios</span>
          </motion.h2>
          <motion.p
            className="text-lg text-purple-100/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Ofrecemos soluciones digitales completas para ayudarte a destacar en el mundo digital
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
        >
          {services.map((service, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="bg-black/40 border-purple-900/50 backdrop-blur-sm hover:bg-black/60 transition-colors h-full">
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg bg-purple-600/20 flex items-center justify-center mb-4">
                    <service.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <CardTitle className="text-xl text-white">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-purple-100/70 text-base">{service.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-4xl max-h-4xl rounded-full bg-purple-600/10 blur-[120px] -z-10" />
    </section>
  )
}

