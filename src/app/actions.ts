"use server"

import { z } from "zod"

// Esquema de validación
const ContactFormSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  email: z.string().email({ message: "Email inválido" }),
  message: z.string().min(10, { message: "El mensaje debe tener al menos 10 caracteres" }),
})

// Tipo para el estado del formulario
type FormState = {
  success?: boolean
  message?: string
  errors?: {
    name?: string[]
    email?: string[]
    message?: string[]
  }
}

export async function submitContactForm(prevState: FormState, formData: FormData) {
  // Convertir FormData a un objeto JavaScript para pasar a Zod
  const formObject = Object.fromEntries(formData.entries()) as Record<string, string>;

  // Validar los datos
  const validatedFields = ContactFormSchema.safeParse(formObject)

  // Si hay errores de validación, devolver los errores
  if (!validatedFields.success) {
    return {
      success: false,
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }

  // Simular un retraso para mostrar el estado de carga
  await new Promise((resolve) => setTimeout(resolve, 1500))

  // Aquí iría la lógica para enviar el email o guardar en base de datos
  // Por ahora, solo simulamos una respuesta exitosa

  return {
    success: true,
    message: "Nos pondremos en contacto contigo pronto.",
  }
}
