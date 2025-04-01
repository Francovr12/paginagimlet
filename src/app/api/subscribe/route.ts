import { NextResponse } from "next/server"

// Función para validar el formato de email
function isValidEmail(email: string) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export async function POST(request: Request) {
  try {
    // Obtener los datos del formulario
    const data = await request.json()
    const { name, email, message } = data

    // Validar que los campos requeridos estén presentes
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Todos los campos son obligatorios" }, { status: 400 })
    }

    // Validar formato de email
    if (!isValidEmail(email)) {
      return NextResponse.json({ error: "El formato del email no es válido" }, { status: 400 })
    }

    // Configuración de Mailchimp
    const API_KEY = process.env.MAILCHIMP_API_KEY
    const LIST_ID = process.env.MAILCHIMP_LIST_ID
    const DATACENTER = process.env.MAILCHIMP_SERVER || API_KEY?.split("-")[1]

    // Verificar que las variables de entorno estén configuradas
    if (!API_KEY || !LIST_ID || !DATACENTER) {
      console.error("Faltan variables de entorno para Mailchimp")
      return NextResponse.json({ error: "Error de configuración del servidor" }, { status: 500 })
    }

    // Preparar los datos para Mailchimp
    const mailchimpData = {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: name.split(" ")[0],
        LNAME: name.split(" ").slice(1).join(" ") || "",
        MMERGE3: message,
      },
    }

    try {
      // Enviar datos a Mailchimp
      const response = await fetch(`https://${DATACENTER}.api.mailchimp.com/3.0/lists/${LIST_ID}/members`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `apikey ${API_KEY}`,
        },
        body: JSON.stringify(mailchimpData),
      })

      // Verificar si la respuesta es válida antes de intentar analizarla como JSON
      const responseText = await response.text()
      let responseData = {}

      if (responseText) {
        try {
          responseData = JSON.parse(responseText)
        } catch (parseError) {
          console.error("Error al analizar la respuesta JSON:", parseError)
          console.log("Respuesta recibida:", responseText)
        }
      }

      // Manejar respuesta de Mailchimp
      if (response.status >= 400) {
        // Si el email ya existe, considerarlo un éxito
        if (responseData && (responseData as any).title === "Member Exists") {
          return NextResponse.json({
            success: true,
            message: "Ya estás suscrito a nuestra lista. ¡Gracias!",
          })
        }

        return NextResponse.json(
          {
            error: (responseData as any).title || "Error al suscribirse",
            details: responseData,
          },
          { status: response.status },
        )
      }

      return NextResponse.json({
        success: true,
        message: "¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.",
      })
    } catch (fetchError) {
      console.error("Error al comunicarse con Mailchimp:", fetchError)
      return NextResponse.json(
        {
          error: "Error al comunicarse con el servicio de email",
          details: fetchError instanceof Error ? fetchError.message : "Error desconocido",
        },
        { status: 500 },
      )
    }
  } catch (error) {
    console.error("Error al procesar la solicitud:", error)
    return NextResponse.json({ error: "Error interno del servidor" }, { status: 500 })
  }
}

