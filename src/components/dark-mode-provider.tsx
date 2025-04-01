"use client"; // Directiva use client para habilitar hooks de React como useState

import { useState, useEffect } from "react";

export default function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const userPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(userPrefersDark);
  }, []);

  return (
    <div className={isDarkMode ? "dark" : ""}>
      {children}
    </div>
  );
}
