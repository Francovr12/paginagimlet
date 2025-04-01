"use client"

import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import Image from "next/image"
import { useState } from "react"
import { Expand } from "lucide-react"
import Link from "next/link"

// Datos actualizados para los trabajos con imágenes
export const works = [
  {
    id: 1,
    title: "Fashion",
    slug: "fashion",
    category: "",
    image: "/work1.jpg",  // Actualiza con las imágenes reales
  },
  {
    id: 2,
    title: "Urban",
    slug: "urban",
    category: "",
    image: "/work2.jpg",
  },
  {
    id: 3,
    title: "Events",
    slug: "events",
    category: "",
    image: "/work3.jpg",
  },
  {
    id: 4,
    title: "Food",
    slug: "food",
    category: "",
    image: "/work4.jpg",
  },
  {
    id: 5,
    title: "Industry",
    slug: "industry",
    category: "",
    image: "/work5.jpg",
  },
  {
    id: 6,
    title: "Corporate",
    slug: "corporate",
    category: "",
    image: "/work6.jpg",
  },
]

export default function WorksSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  return (
    <section id="trabajos" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4 text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            Nuestros <span className="text-purple-400">Trabajos</span>
          </motion.h2>
          <motion.p
            className="text-lg text-purple-100/70 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Proyectos destacados que demuestran nuestra experiencia y creatividad
          </motion.p>
        </div>

        <motion.div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {works.map((work, index) => (
            <Link href={`/trabajos/${work.slug}`} key={work.id} className="block">
              <motion.div
                className="relative aspect-square overflow-hidden rounded-lg bg-black/40 border border-purple-900/30"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onHoverStart={() => setHoveredItem(work.id)}
                onHoverEnd={() => setHoveredItem(null)}
                whileHover={{
                  scale: 1.03,
                  transition: { duration: 0.2 },
                }}
              >
                <Image
                  src={work.image || "/placeholder.svg"}
                  alt={work.title}
                  fill
                  className="object-cover transition-transform duration-500 ease-in-out"
                  style={{
                    transform: hoveredItem === work.id ? "scale(1.1)" : "scale(1)",
                  }}
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-6 flex flex-col justify-end transition-opacity duration-300"
                  style={{
                    opacity: hoveredItem === work.id ? 1 : 0.7,
                  }}
                >
                  <div
                    className="transform transition-transform duration-300"
                    style={{
                      transform: hoveredItem === work.id ? "translateY(0)" : "translateY(20px)",
                    }}
                  >
                    <h3 className="text-xl font-bold text-white mb-1">{work.title}</h3>
                    <p className="text-purple-300 text-sm">{work.category}</p>
                  </div>

                  {hoveredItem === work.id && (
                    <motion.div
                      className="absolute top-4 right-4 bg-purple-600/80 p-2 rounded-full"
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Expand className="h-5 w-5 text-white" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>

      {/* Background gradient */}
      <div className="absolute top-1/2 right-0 w-full h-full max-w-3xl max-h-3xl rounded-full bg-purple-600/10 blur-[120px] -z-10" />
    </section>
  )
}
