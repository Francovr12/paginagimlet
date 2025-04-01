import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Extraer funciones compartidas a un archivo de utilidades
export function formatCategoryTitle(category: string): string {
  return category.charAt(0).toUpperCase() + category.slice(1)
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
