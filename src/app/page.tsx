"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { cn } from "@/lib/utils"
import dynamic from "next/dynamic"

// Componentes de sección
import HeroSection from "@/components/hero-section"
import WorksSection from "@/components/works-section"
import ContactSection from "@/components/contact-section"
import Footer from "@/components/footer"

// Importar el componente de servicios con carga dinámica para evitar problemas de hidratación
const ServicesSection = dynamic(() => import("@/components/services-section-simple"), {
  ssr: false,
  loading: () => (
    <div className="py-20 px-4 flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  ),
})

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState("inicio")
  const [mounted, setMounted] = useState(false)

  // Asegurarse de que el componente esté montado antes de renderizar
  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Detectar sección activa
      const sections = ["inicio", "servicios", "trabajos", "contacto"]
      const scrollPosition = window.scrollY + 100 // Offset para mejor detección

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(id)
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" })
      }
    }
  }

  // Asegurarse de que el componente esté montado antes de renderizar
  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-black overflow-hidden">
      {/* Navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/80 backdrop-blur-md py-3 shadow-lg" : "bg-transparent py-5",
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo - Ahora a la izquierda */}
            <Link href="/" className="flex items-center gap-2">
              <span className="text-white font-bold text-xl tracking-tight">GIMLET</span>
            </Link>

            {/* Desktop Navigation - Centrado y mejorado */}
            <nav className="hidden md:flex items-center justify-center gap-1 bg-black/30 backdrop-blur-sm rounded-full px-2 py-1 border border-purple-900/20">
              {[
                { id: "inicio", label: "INICIO" },
                { id: "servicios", label: "SERVICIOS" },
                { id: "trabajos", label: "TRABAJOS" },
                { id: "contacto", label: "CONTACTO" },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={cn(
                    "px-4 py-2 rounded-full transition-all duration-300 text-sm tracking-wide",
                    activeSection === item.id
                      ? "bg-purple-600/80 text-white font-medium"
                      : "text-white/70 hover:text-white hover:bg-white/10",
                  )}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            {/* Botones de acción - A la derecha */}
            <div className="hidden md:flex items-center gap-3">
              <Button
                variant="outline"
                className="border-purple-500/30 text-white hover:bg-purple-500/10"
                onClick={() => scrollToSection("contacto")}
              >
                Contáctanos
              </Button>

              <Link href="/entrevista-virtual">
                <Button className="bg-purple-600 hover:bg-purple-700 text-white">Trabajá con Nosotros</Button>
              </Link>
            </div>

            {/* Mobile Navigation */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="text-white">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent className="bg-black/95 border-purple-900/30">
                <div className="flex flex-col gap-6 mt-10">
                  {[
                    { id: "inicio", label: "INICIO" },
                    { id: "servicios", label: "SERVICIOS" },
                    { id: "trabajos", label: "TRABAJOS" },
                    { id: "contacto", label: "CONTACTO" },
                  ].map((item) => (
                    <SheetTrigger asChild key={item.id}>
                      <button
                        onClick={() => scrollToSection(item.id)}
                        className={cn(
                          "text-left py-2 px-4 rounded-lg transition-colors",
                          activeSection === item.id
                            ? "bg-purple-600/20 text-white font-medium"
                            : "text-white/70 hover:text-white hover:bg-white/5",
                        )}
                      >
                        {item.label}
                      </button>
                    </SheetTrigger>
                  ))}
                  <SheetTrigger asChild>
                    <Button
                      className="bg-purple-600 hover:bg-purple-700 text-white mt-4"
                      onClick={() => scrollToSection("contacto")}
                    >
                      Contáctanos
                    </Button>
                  </SheetTrigger>
                  <SheetTrigger asChild>
                    <Link href="/entrevista-virtual">
                      <Button
                        variant="outline"
                        className="border-purple-500/30 text-white hover:bg-purple-500/10 mt-2 w-full"
                      >
                        Trabajá con Nosotros
                      </Button>
                    </Link>
                  </SheetTrigger>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="overflow-hidden">
        <HeroSection />
        <ServicesSection />
        <WorksSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  )
}

