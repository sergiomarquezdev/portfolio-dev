/**
 * types.ts - Definiciones de tipos e interfaces para la terminal interactiva
 *
 * Este módulo proporciona:
 * - Interfaces TypeScript para la terminal y sus componentes
 * - Datos de portfolio para mostrar en respuestas de comandos
 * - Estructura de secciones para navegación en la terminal
 * - Detección de dispositivos para adaptar comportamiento
 * - Extensiones de la interfaz Window para funcionalidades globales
 *
 * Centraliza todas las definiciones de tipos para garantizar consistencia
 * en todo el sistema de terminal interactiva.
 */

// Tipos para el resultado del comando
export interface CommandResult {
  currentDirectory?: string;
}

// Definición para la función de procesamiento de comandos
export type ProcessCommandFunction = (
  command: string,
  currentDirectory: string,
  appendToTerminal: AppendToTerminalFunction,
  toggleTerminal: () => void,
  devModeToggle: HTMLElement | null,
  setDevModeActive: (active: boolean) => void,
  terminalOutput: HTMLElement | null
) => CommandResult;

// Definición para la función de sugerencia de comandos
export type GetCommandSuggestionsFunction = (
  partialCommand: string
) => string[];

// Definición para la función que añade texto a la terminal
export type AppendToTerminalFunction = (
  text: string,
  className?: string,
  withPrompt?: boolean
) => void;

// Definición para la función de detección del código Konami
export type SetupKonamiCodeDetectorFunction = (
  toggleTerminal: () => void,
  isTerminalOpen: () => boolean
) => void;

// Interfaz para extender el objeto global window
declare global {
  interface Window {
    toggleCodeEffect?: () => boolean;
  }
}

// Tipos para las funciones de utilidad de la terminal
export type CreateAppendToTerminalFunction = (
  terminalOutput: HTMLElement | null,
  terminalContent: HTMLElement | null
) => AppendToTerminalFunction;

export type CreateToggleTerminalFunction = (
  terminalContainer: HTMLElement | null,
  terminalInput: HTMLInputElement | null
) => () => void;

export type CreateToggleMaximizeFunction = (
  terminalContainer: HTMLElement | null
) => () => boolean;

export type MakeTerminalDraggableFunction = (
  terminalContainer: HTMLElement | null,
  dragHandle: HTMLElement | null,
  isMaximized: () => boolean
) => void;

export type InitTerminalFunction = (
  terminalOutput: HTMLElement | null,
  terminalInput: HTMLInputElement | null
) => void;

// Portfolio data for commands
export const portfolioData = {
  about: {
    name: "Sergio Márquez",
    role: "Full Stack Developer",
    location: "Madrid, España",
    summary: "Desarrollador Full Stack especializado en Java, Angular, Docker y Kubernetes con experiencia en el desarrollo de aplicaciones web y servicios."
  },
  skills: [
    { category: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "Angular", "React", "Astro"] },
    { category: "Backend", items: ["Java", "Spring Boot", "Node.js", "Express", "Python"] },
    { category: "DevOps", items: ["Docker", "Kubernetes", "CI/CD", "Git", "GitHub Actions"] },
    { category: "Databases", items: ["MySQL", "PostgreSQL", "MongoDB", "Redis"] }
  ],
  projects: [
    { name: "Portfolio Personal", description: "Portfolio profesional desarrollado con Astro y Tailwind CSS", url: "https://sergiomarquez.dev" },
    { name: "Blog Técnico", description: "Blog sobre desarrollo web y tecnologías", url: "https://blog.sergiomarquez.dev" }
  ],
  contact: {
    email: "sergiomarquezdev@gmail.com",
    linkedin: "https://www.linkedin.com/in/sergio-marquez-perez/",
    github: "https://github.com/sergiomarquezdev/",
    twitter: "https://x.com/smarquezdev/"
  },
  commands: [
    { name: "help", description: "Muestra la lista de comandos disponibles" },
    { name: "about", description: "Muestra información sobre mí" },
    { name: "skills", description: "Lista mis habilidades técnicas" },
    { name: "projects", description: "Muestra mis proyectos destacados" },
    { name: "contact", description: "Muestra mi información de contacto" },
    { name: "theme", description: "Cambia el tema (dark/light)" },
    { name: "matrix", description: "Activa/desactiva el modo desarrollador" },
    { name: "clear", description: "Limpia la terminal" },
    { name: "exit", description: "Cierra la terminal" },
    { name: "whoami", description: "Muestra quién eres" },
    { name: "game", description: "Inicia un mini-juego de adivinanza" }
  ]
};

// Función para detectar si el dispositivo es móvil
export function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.innerWidth <= 768);
}

// Añadir el comando Konami sólo en dispositivos de escritorio
if (typeof window !== 'undefined' && !isMobileDevice()) {
  portfolioData.commands.push({ name: "konami", description: "Pulsa en orden: ↑↓←→" });
}

// Secciones del portfolio
export const sections: Record<string, string[]> = {
  "~": ["about", "skills", "projects", "experience", "education", "contact", "social"],
  "about": ["summary", "interests", "goals"],
  "skills": ["frontend", "backend", "devops", "databases"],
  "projects": ["portfolio", "blog"],
  "contact": ["email", "phone", "form", "social"],
  "social": ["twitter", "linkedin", "github", "blog"],
  "twitter": [],
  "linkedin": [],
  "github": [],
  "blog": []
};

// TypeScript declarations
export interface TerminalState {
  isTerminalOpen: boolean;
  historyIndex: number;
  isMaximized: boolean;
  currentDirectory: string;
  isDevModeActive: boolean;
}

// Global TypeScript declarations
declare global {
  interface Window {
    toggleMatrixEffect?: () => boolean;
    toggleCodeEffect?: () => boolean;
    toggleAdvancedCodeEffect?: () => boolean;
  }
}
