import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import DarkModeProvider from "@/components/dark-mode-provider"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "GIMLET - Agencia de Marketing Estratégico",
  description: "Transformamos marcas a través de estrategias innovadoras y experiencias memorables.",
  keywords: "agencia marketing, estrategia de marca, marketing digital, transformación digital",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={inter.className}>
        <DarkModeProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </DarkModeProvider>
      </body>
    </html>
  )
}

