"use client"

import { useEffect, useState } from "react"

export default function ClientOnlyComponent() {
  const [randomValue, setRandomValue] = useState(0)

  useEffect(() => {
    // Código que solo debe ejecutarse en el cliente
    setRandomValue(Math.random())
  }, [])

  return <div>Valor aleatorio: {randomValue}</div>
}

