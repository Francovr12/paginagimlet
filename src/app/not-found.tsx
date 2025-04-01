import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4">
      <div className="text-center max-w-md">
        <h1 className="text-4xl font-bold text-white mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-purple-400 mb-6">Página no encontrada</h2>
        <p className="text-white/70 mb-8">Lo sentimos, la página que estás buscando no existe o ha sido movida.</p>
        <Link href="/">
          <Button className="bg-purple-600 hover:bg-purple-700 text-white">Volver al inicio</Button>
        </Link>
      </div>
    </div>
  )
}

