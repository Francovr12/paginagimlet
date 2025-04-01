"use client"

import dynamic from "next/dynamic"

// Importar el componente dinámicamente para evitar problemas de SSR con la cámara
const VirtualInterview = dynamic(() => import("@/components/virtual-interview"), { ssr: false })

export default function EntrevistaVirtualPage() {
  return <VirtualInterview />
}

