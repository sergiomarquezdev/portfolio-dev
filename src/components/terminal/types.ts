// Terminal types and data

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
    { name: "open", description: "Abre una URL (ej: open blog)" },
    { name: "echo", description: "Muestra un mensaje en la terminal" },
    { name: "date", description: "Muestra la fecha y hora actual" },
    { name: "whoami", description: "Muestra quién eres" },
    { name: "ls", description: "Lista las secciones del portfolio" },
    { name: "cd", description: "Navega a una sección del portfolio" },
    { name: "konami", description: "Pulsa en orden: ↑↑↓↓←→←→BA" }
  ]
};

// Secciones del portfolio para el comando ls y cd
export const sections = {
  "~": ["about", "skills", "projects", "experience", "education", "contact"],
  "about": ["summary", "interests", "goals"],
  "skills": ["frontend", "backend", "devops", "databases"],
  "projects": ["portfolio", "blog"],
  "contact": ["email", "linkedin", "github", "twitter"]
};

// TypeScript declarations
export interface TerminalState {
  isTerminalOpen: boolean;
  commandHistory: string[];
  historyIndex: number;
  isMaximized: boolean;
  currentDirectory: string;
  isDevModeActive: boolean;
}

// Global TypeScript declarations
declare global {
  interface Window {
    toggleCodeEffect: () => boolean;
    toggleAdvancedCodeEffect: () => boolean;
    isCodeEffectActive: () => boolean;
  }
}
