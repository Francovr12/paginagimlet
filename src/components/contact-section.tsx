"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Mail, MessageSquare, Phone, Send } from "lucide-react"

export default function ContactSection() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formStatus, setFormStatus] = useState<{
    type: "success" | "error" | null
    message: string
  }>({ type: null, message: "" })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormState((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFormStatus({ type: null, message: "" })

    try {
      const response = await fetch("/api/subscribe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formState),
      })

      // Primero verificamos si la respuesta es válida
      if (!response.ok) {
        let errorMessage = "Error al enviar el formulario"

        try {
          const errorData = await response.json()
          errorMessage = errorData.error || errorMessage
        } catch (jsonError) {
          console.error("Error al analizar la respuesta JSON:", jsonError)
          // Si no podemos analizar la respuesta como JSON, usamos el mensaje genérico
        }

        throw new Error(errorMessage)
      }

      // Si la respuesta es válida, intentamos analizarla como JSON
      let data
      try {
        data = await response.json()
      } catch (jsonError) {
        console.error("Error al analizar la respuesta JSON:", jsonError)
        throw new Error("Error al procesar la respuesta del servidor")
      }

      // Éxito
      setFormStatus({
        type: "success",
        message: data.message || "¡Mensaje enviado con éxito! Nos pondremos en contacto contigo pronto.",
      })
      setFormState({ name: "", email: "", message: "" })
    } catch (error) {
      // Error
      setFormStatus({
        type: "error",
        message: error instanceof Error ? error.message : "Error al enviar el formulario. Inténtalo de nuevo.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contacto" className="py-20 px-4 relative">
      <div className="container mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              ¿Listo para <span className="text-purple-400">transformar</span> tu negocio?
            </h2>

            <p className="text-lg text-purple-100/70">
              Contáctanos hoy mismo y descubre cómo podemos ayudarte a alcanzar tus objetivos.
            </p>

            <div className="space-y-4 pt-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <Mail className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Email</h3>
                  <p className="text-purple-200/70">Contacto@gimlet.com.ar</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-purple-600/20 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-purple-400" />
                </div>
                <div>
                  <h3 className="text-white font-medium">Teléfono</h3>
                  <p className="text-purple-200/70">+12 123 456 789</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6 }}
            className="bg-black/40 border border-purple-900/50 backdrop-blur-sm rounded-xl p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-6">Envíanos un mensaje</h3>

            {formStatus.type && (
              <div
                className={`mb-6 p-4 rounded-lg border ${
                  formStatus.type === "success"
                    ? "bg-green-500/20 border-green-500/30 text-green-300"
                    : "bg-red-500/20 border-red-500/30 text-red-300"
                }`}
              >
                <p className="font-medium">{formStatus.type === "success" ? "¡Éxito!" : "Error"}</p>
                <p className="text-sm mt-1">{formStatus.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-purple-100">
                  Nombre
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formState.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  required
                  className="bg-black/60 border-purple-900/50 focus:border-purple-500 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="text-purple-100">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formState.email}
                  onChange={handleChange}
                  placeholder="tu@gmail.com"
                  required
                  className="bg-black/60 border-purple-900/50 focus:border-purple-500 text-white"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-purple-100">
                  Mensaje
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  placeholder="¿Cómo podemos ayudarte?"
                  required
                  className="bg-black/60 border-purple-900/50 focus:border-purple-500 text-white min-h-[120px]"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-purple-600 hover:bg-purple-700 text-white py-6 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
              >
                {isSubmitting ? (
                  <span className="flex items-center gap-2">
                    <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Enviando...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-5 w-5" />
                    Enviar mensaje
                  </span>
                )}
              </Button>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute bottom-0 left-0 w-full h-full max-w-3xl max-h-3xl rounded-full bg-purple-600/10 blur-[120px] -z-10" />
    </section>
  )
}

