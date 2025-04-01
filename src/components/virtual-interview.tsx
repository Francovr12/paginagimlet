"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import Link from "next/link"

export default function VirtualInterview() {
  const router = useRouter()
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const [cameraPermission, setCameraPermission] = useState<"granted" | "denied" | "pending">("pending")
  const [cameraError, setCameraError] = useState<string | null>(null)

  useEffect(() => {
    // Solicitar acceso a la cámara cuando el componente se monte
    async function setupCamera() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: {
            width: { ideal: 320 },
            height: { ideal: 240 },
            facingMode: "user",
          },
        })

        if (videoRef.current) {
          videoRef.current.srcObject = stream
        }

        setCameraPermission("granted")
      } catch (error) {
        console.error("Error accessing camera:", error)
        setCameraPermission("denied")
        setCameraError(error instanceof Error ? error.message : "No se pudo acceder a la cámara")
      }
    }

    // Verificar si estamos en el navegador antes de intentar acceder a la cámara
    if (typeof window !== "undefined" && navigator.mediaDevices) {
      setupCamera()
    }

    // Limpiar el stream cuando el componente se desmonte
    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream
        const tracks = stream.getTracks()
        tracks.forEach((track) => track.stop())
      }
    }
  }, [])

  const goBack = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <header className="bg-black/90 backdrop-blur-md py-4 px-4 border-b border-purple-900/30">
        <div className="container mx-auto max-w-6xl">
          <div className="flex items-center justify-between">
            {/* Logo y botón de regreso */}
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" onClick={goBack} className="text-white hover:bg-white/10">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <Link href="/">
                <span className="text-white font-bold text-xl tracking-tight">GIMLET</span>
              </Link>
            </div>

            {/* Título de la página */}
            <div className="text-white/70 text-sm">Entrevista Virtual</div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="flex-1 container mx-auto max-w-6xl py-8 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Video principal */}
          <div className="lg:col-span-2 bg-black/40 rounded-lg overflow-hidden border border-purple-900/30">
            <div className="aspect-video relative">
              <iframe
                src="https://www.youtube.com/embed/jMyvL4c-S2k?autoplay=1&mute=0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              ></iframe>
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold text-white mb-2">Entrevista con nuestro CEO</h2>
              <p className="text-white/70 text-sm">
                Descubre cómo GIMLET puede transformar la estrategia de marketing de tu empresa
              </p>
            </div>
          </div>

          {/* Cámara del usuario y chat */}
          <div className="flex flex-col gap-4">
            {/* Cámara del usuario */}
            <div className="bg-black/40 rounded-lg overflow-hidden border border-purple-900/30">
              <div className="aspect-[4/3] relative">
                {cameraPermission === "pending" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80">
                    <div className="text-center">
                      <div className="h-8 w-8 border-2 border-t-transparent border-purple-400 rounded-full animate-spin mx-auto mb-4"></div>
                      <p className="text-white/70 text-sm">Solicitando acceso a la cámara...</p>
                    </div>
                  </div>
                )}

                {cameraPermission === "denied" && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/80 p-4">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center mb-4 mx-auto">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-red-500"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </div>
                      <p className="text-white text-sm mb-2">No se pudo acceder a la cámara</p>
                      <p className="text-white/70 text-xs">{cameraError}</p>
                    </div>
                  </div>
                )}

                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="absolute inset-0 w-full h-full object-cover"
                ></video>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium text-sm">Tu cámara</h3>
              </div>
            </div>

            {/* Información adicional */}
            <div className="bg-black/40 rounded-lg border border-purple-900/30 p-4">
              <h3 className="text-white font-semibold mb-2">¿Tienes preguntas?</h3>
              <p className="text-white/70 text-sm mb-4">
                Nuestro equipo está listo para responder todas tus dudas sobre cómo podemos ayudar a tu empresa.
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">Agendar una llamada real</Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

