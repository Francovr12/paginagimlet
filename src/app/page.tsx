"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";
import { cn } from "@/lib/utils";

// Componentes de sección
import HeroSection from "@/components/hero-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/works-section";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";
import WorksSection from "@/components/works-section";

export default function LandingPage() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-black to-purple-950">
      {/* Navbar */}
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "bg-black/80 backdrop-blur-md py-2 shadow-lg" : "bg-transparent py-4"
        )}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/">
              <div className="relative w-[100px] h-[100px]">
                <Image
                  src="/logo.png"
                  alt="Mi Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {["inicio", "servicios", "trabajos", "contacto"].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item)}
                className="text-white/80 hover:text-white transition-colors capitalize"
              >
                {item}
              </button>
            ))}
            <Button
              variant="ghost"
              className="bg-purple-600/20 hover:bg-purple-600/30 text-white border border-purple-500/30"
              onClick={() => scrollToSection("contacto")}
            >
              Contáctanos
            </Button>
          </nav>

          {/* Mobile Navigation */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" className="text-white">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent className="bg-black/95 border-purple-900/50">
              <DialogTitle className="sr-only">Menú de Navegación</DialogTitle>
              <div className="flex flex-col gap-6 mt-10">
                {["inicio", "servicios", "trabajos", "contacto"].map((item) => (
                  <SheetTrigger asChild key={item}>
                    <button
                      onClick={() => scrollToSection(item)}
                      className="text-white/80 hover:text-white transition-colors text-xl capitalize text-left"
                    >
                      {item}
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
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <HeroSection />
        <ServicesSection />
        <WorksSection />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}