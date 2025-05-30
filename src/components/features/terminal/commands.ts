/**
 * commands.ts - Sistema de procesamiento de comandos para la terminal interactiva
 *
 * Este módulo implementa:
 * - Procesamiento de comandos de la terminal (help, about, skills, etc.)
 * - Funcionalidad de autocompletado de comandos
 * - Respuestas formateadas con colores y estilos
 * - Comandos especiales como matrix y konami
 *
 * Cada comando tiene su propia implementación y puede interactuar con otros
 * componentes del sistema, como el efecto Matrix o los datos del CV.
 */

// Terminal commands processing
import { portfolioData } from './types';

// Mostrar un tip aleatorio para mejorar la experiencia de la terminal
function showRandomTip(appendToTerminal: (text: string, className?: string, typeEffect?: boolean) => void) {
  const tips = [
    "Usa las teclas de flecha arriba/abajo para navegar por el historial de comandos.",
    "Presiona Tab para autocompletar comandos y sugerencias.",
    "Ejecuta 'help' para ver todos los comandos disponibles.",
    "Si necesitas limpiar la pantalla, usa el comando 'clear'.",
    "Puedes cambiar el tema de la terminal con 'theme dark' o 'theme light'.",
    "Intenta ejecutar 'matrix' para activar un efecto visual especial.",
    "Usa 'whoami' para ver tu identificación en la terminal.",
    "Esta terminal es redimensionable y movible. Prueba arrastrarla por la pantalla.",
    "Puedes maximizar la terminal haciendo doble clic en su barra de título.",
    "¿Conoces el código Konami? Prueba 'konami' para una pista.",
    "Puedes cerrar la terminal con el comando 'exit' o con el botón X.",
    "La tecla Ctrl+Alt+T abre o cierra la terminal rápidamente.",
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  appendToTerminal(`<span class="terminal-text-green">Tip:</span> <span class="terminal-text-gray">${randomTip}</span>`, '', true);
}

// Función auxiliar para sugerir comandos similares
function suggestSimilarCommands(input: string, appendToTerminal: (text: string, className?: string, typeEffect?: boolean) => void): void {
  // Obtener todos los comandos disponibles
  const allCommands = getAllCommands();

  // Encontrar comandos que podrían ser similares al ingresado
  // Usamos una búsqueda simple por inclusión de caracteres
  const possibleMatches = allCommands.filter(cmd =>
    cmd.includes(input.substring(0, 2)) || // Primeros dos caracteres
    input.includes(cmd.substring(0, 2))    // O viceversa
  );

  // Limitar a máximo 3 sugerencias
  const suggestions = possibleMatches.slice(0, 3);

  if (suggestions.length > 0) {
    appendToTerminal('<span class="terminal-text-yellow">¿Quizás quisiste decir?</span>', '', true);
    suggestions.forEach(suggestion => {
      appendToTerminal(`<span class="terminal-text-blue">  ${suggestion}</span>`, '', true);
    });
  }
}

// Function to process commands
export function processCommand(
  command: string,
  currentDirectory: string,
  appendToTerminal: (text: string, className?: string, typeEffect?: boolean) => void,
  toggleTerminal: () => void,
  devModeToggle: HTMLElement | null,
  setDevModeActive: (active: boolean) => void,
  terminalOutput: HTMLElement | null
) {
  const cmd = command.trim();
  if (!cmd) return { currentDirectory };

  const args = cmd.split(' ');
  const mainCommand = args[0].toLowerCase();

  // Mostrar el comando ingresado
  appendToTerminal(`<span class="terminal-text-green">${currentDirectory}</span> <span class="terminal-text-white">${command}</span>`, '', true);

  // Procesar el comando
  switch (mainCommand) {
    // COMANDOS DE AYUDA Y CONTROL BÁSICO
    case 'help':
      appendToTerminal('<span class="terminal-text-yellow font-bold">Comandos disponibles:</span>', '', true);

      // Crear una tabla simple para mostrar todos los comandos
      let helpTable = '<div class="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">';

      // Mostrar todos los comandos en orden
      portfolioData.commands.forEach(cmd => {
        helpTable += `<div><span class="terminal-text-green font-medium">${cmd.name}</span></div><div class="terminal-text-white">${cmd.description}</div>`;
      });

      helpTable += '</div>';
      appendToTerminal(helpTable, '', true);

      // Añadir un separador antes del tip
      appendToTerminal('<span class="terminal-text-gray">───────────────────────────────────────</span>', '', true);

      // Mostrar un tip aleatorio después de la ayuda
      showRandomTip(appendToTerminal);
      break;

    case 'whoami':
      appendToTerminal('<span class="terminal-text-white">Visitante del portfolio de Sergio Márquez</span>', '', true);
      break;

    case 'clear':
      if (terminalOutput) terminalOutput.innerHTML = '';
      break;

    // INFORMACIÓN DEL PORTFOLIO
    case 'about':
      const { about } = portfolioData;
      appendToTerminal(`<span class="terminal-text-yellow">Sobre mí:</span>`, '', true);
      appendToTerminal(`<span class="terminal-text-green">Nombre:</span> <span class="terminal-text-white">${about.name}</span>`, '', true);
      appendToTerminal(`<span class="terminal-text-green">Rol:</span> <span class="terminal-text-white">${about.role}</span>`, '', true);
      appendToTerminal(`<span class="terminal-text-green">Ubicación:</span> <span class="terminal-text-white">${about.location}</span>`, '', true);
      appendToTerminal(`<span class="terminal-text-green">Resumen:</span> <span class="terminal-text-white">${about.summary}</span>`, '', true);
      break;

    case 'skills':
      appendToTerminal('<span class="terminal-text-yellow">Mis habilidades:</span>', '', true);
      portfolioData.skills.forEach(skillGroup => {
        appendToTerminal(`<span class="terminal-text-green">${skillGroup.category}:</span> <span class="terminal-text-white">${skillGroup.items.join(', ')}</span>`, '', true);
      });
      break;

    case 'projects':
      appendToTerminal('<span class="terminal-text-yellow">Mis proyectos:</span>', '', true);
      portfolioData.projects.forEach(project => {
        appendToTerminal(`<span class="terminal-text-green">${project.name}:</span> <span class="terminal-text-white">${project.description}</span>`, '', true);
        appendToTerminal(`<span class="terminal-text-blue">${project.url}</span>`, '', true);
      });
      break;

    case 'contact':
      const { contact } = portfolioData;
      appendToTerminal('<span class="terminal-text-yellow">Información de contacto:</span>', '', true);
      appendToTerminal(`<span class="terminal-text-green">Email:</span> <span class="terminal-text-white">${contact.email}</span>`, '', true);
      appendToTerminal(`<span class="terminal-text-green">LinkedIn:</span> <span class="terminal-text-blue">${contact.linkedin}</span>`, '', true);
      appendToTerminal(`<span class="terminal-text-green">GitHub:</span> <span class="terminal-text-blue">${contact.github}</span>`, '', true);
      appendToTerminal(`<span class="terminal-text-green">Twitter:</span> <span class="terminal-text-blue">${contact.twitter}</span>`, '', true);
      break;

    // PERSONALIZACIÓN Y EXTRAS
    case 'theme':
      const themeArg = args[1]?.toLowerCase();

      // Función para notificar al resto de la aplicación sobre el cambio de tema
      const notifyThemeChange = (themeName: string) => {
        // Disparar un evento para que otros componentes puedan reaccionar al cambio
        document.dispatchEvent(new CustomEvent('themeChanged', {
          detail: { theme: themeName }
        }));
      };

      if (themeArg === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        appendToTerminal('<span class="terminal-text-green">Tema cambiado a oscuro.</span>', '', true);
        appendToTerminal('<span class="terminal-text-gray">Se ha activado el modo oscuro en toda la aplicación.</span>', '', true);
        notifyThemeChange('dark');
      } else if (themeArg === 'light') {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        appendToTerminal('<span class="terminal-text-green">Tema cambiado a claro.</span>', '', true);
        appendToTerminal('<span class="terminal-text-gray">Se ha activado el modo claro en toda la aplicación.</span>', '', true);
        notifyThemeChange('light');
      } else {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'oscuro' : 'claro';
        appendToTerminal(`<span class="terminal-text-green">Tema actual: <span class="terminal-text-white">${currentTheme}</span></span>`, '', true);
        appendToTerminal('<span class="terminal-text-gray">Uso: theme dark|light</span>', '', true);
        appendToTerminal('<span class="terminal-text-gray">El tema se guarda en las preferencias y se mantiene entre sesiones.</span>', '', true);
      }
      break;

    case 'exit':
      toggleTerminal();
      break;

    case 'matrix':
      if (typeof window.toggleCodeEffect === 'function') {
        const isActive = window.toggleCodeEffect();

        // Actualizar el botón si existe
        if (devModeToggle) {
          if (isActive) {
            devModeToggle.classList.add('active-dev-mode');
            appendToTerminal('<span class="terminal-text-green">Modo desarrollador activado.</span>', '', true);
          } else {
            devModeToggle.classList.remove('active-dev-mode');
            appendToTerminal('<span class="terminal-text-green">Modo desarrollador desactivado.</span>', '', true);
          }
        } else {
          if (isActive) {
            appendToTerminal('<span class="terminal-text-green">Modo desarrollador activado.</span>', '', true);
          } else {
            appendToTerminal('<span class="terminal-text-green">Modo desarrollador desactivado.</span>', '', true);
          }
        }
        setDevModeActive(isActive);
      } else {
        appendToTerminal('<span class="terminal-text-red">Error: El modo desarrollador no está disponible.</span>', '', true);
      }
      break;

    case 'konami':
      appendToTerminal('<span class="terminal-text-yellow">¡Has descubierto una pista secreta!</span>', '', true);
      appendToTerminal('<span class="terminal-text-green">Código Konami: <span class="terminal-text-white">↑ ↓ ← →</span></span>', '', true);
      appendToTerminal('<span class="terminal-text-blue">Presiona esta secuencia de teclas para desbloquear un mini-juego.</span>', '', true);
      appendToTerminal('<span class="terminal-text-blue">Completa el juego para descubrir un efecto visual especial.</span>', '', true);
      break;

    default:
      appendToTerminal(`<span class="terminal-text-red">Error: Comando no reconocido: <span class="terminal-text-white">${command}</span></span>`, '', true);
      appendToTerminal('<span class="terminal-text-gray">Escribe <span class="terminal-text-yellow">help</span> para ver los comandos disponibles.</span>', '', true);

      // Sugerir comandos similares si el comando ingresado no se reconoce
      if (command.length > 1) {
        suggestSimilarCommands(command.toLowerCase(), appendToTerminal);
      }
      break;
  }

  return { currentDirectory };
}

// Exportar lista de comandos para autocompletado y ayuda
export function getCommandSuggestions(input: string): string[] {
  // Si la entrada está vacía, devolver todos los comandos
  if (!input.trim()) {
    return getAllCommands();
  }

  const inputLower = input.toLowerCase();

  // Si la entrada contiene espacios, busca comandos con argumentos
  if (inputLower.includes(' ')) {
    const parts = inputLower.split(' ');
    const mainCommand = parts[0];

    // Sugerencias específicas para cada comando
    if (mainCommand === 'theme') {
      const themeOptions = ['theme dark', 'theme light'];

      // Filtrar opciones que coinciden con lo que el usuario está escribiendo
      return themeOptions.filter(cmd => cmd.startsWith(inputLower));
    }

    // Si no hay sugerencias específicas para este comando, devuelve una lista vacía
    return [];
  }

  // Para entrada sin espacios, buscar coincidencias en los comandos
  return findMatchingCommands(inputLower);
}

// Función auxiliar para obtener todos los comandos disponibles
function getAllCommands(): string[] {
  return [
    // Comandos de ayuda y control básico
    'help',            // Muestra la ayuda
    'whoami',          // Identifica al usuario
    'clear',           // Limpia la terminal
    'exit',            // Cierra la terminal

    // Información del portfolio
    'about',           // Muestra información sobre el autor
    'skills',          // Muestra habilidades técnicas
    'projects',        // Muestra proyectos destacados
    'contact',         // Muestra información de contacto

    // Personalización y extras
    'theme',           // Cambia el tema (dark/light)
    'matrix',          // Activa/desactiva el modo desarrollador
    'konami'           // Para usuarios de escritorio (código Konami)
  ];
}

// Función auxiliar para encontrar comandos que coinciden con la entrada del usuario
function findMatchingCommands(input: string): string[] {
  const allCommands = getAllCommands();

  // Primero intentar coincidencias exactas de prefijo (comportamiento original)
  const prefixMatches = allCommands.filter(cmd => cmd.startsWith(input));

  // Si hay coincidencias de prefijo, devolverlas
  if (prefixMatches.length > 0) {
    return prefixMatches;
  }

  // Si no hay coincidencias de prefijo, buscar coincidencias parciales
  // (cuando el texto de entrada aparece en cualquier parte del comando)
  return allCommands.filter(cmd => cmd.includes(input));
}
