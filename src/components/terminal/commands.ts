// Terminal commands processing
import { portfolioData, sections, isMobileDevice } from './types';

// Function to process commands
export function processCommand(
  command: string,
  currentDirectory: string,
  appendToTerminal: (text: string, className?: string, typeEffect?: boolean) => void,
  toggleTerminal: () => void,
  devModeToggle: HTMLElement | null,
  isDevModeActive: boolean,
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
    case 'help':
      appendToTerminal('<span class="terminal-text-yellow font-bold">Comandos disponibles:</span>', '', true);
      // Crear una tabla para mejor alineación
      let helpTable = '<div class="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">';
      portfolioData.commands.forEach(cmd => {
        helpTable += `<div><span class="terminal-text-green font-medium">${cmd.name}</span></div><div class="terminal-text-white">${cmd.description}</div>`;
      });
      helpTable += '</div>';
      appendToTerminal(helpTable, '', true);
      break;

    case 'about':
      const about = portfolioData.about;
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
      const contact = portfolioData.contact;
      appendToTerminal('<span class="terminal-text-yellow">Información de contacto:</span>', '', true);
      appendToTerminal(`<span class="terminal-text-green">Email:</span> <span class="terminal-text-white">${contact.email}</span>`, '', true);
      appendToTerminal(`<span class="terminal-text-green">LinkedIn:</span> <span class="terminal-text-blue">${contact.linkedin}</span>`, '', true);
      appendToTerminal(`<span class="terminal-text-green">GitHub:</span> <span class="terminal-text-blue">${contact.github}</span>`, '', true);
      appendToTerminal(`<span class="terminal-text-green">Twitter:</span> <span class="terminal-text-blue">${contact.twitter}</span>`, '', true);
      break;

    case 'theme':
      const themeArg = args[1]?.toLowerCase();
      if (themeArg === 'dark' || themeArg === 'light') {
        if (themeArg === 'dark') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
          appendToTerminal('<span class="terminal-text-green">Tema cambiado a oscuro.</span>', '', true);
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
          appendToTerminal('<span class="terminal-text-green">Tema cambiado a claro.</span>', '', true);
        }
      } else {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'oscuro' : 'claro';
        appendToTerminal(`<span class="terminal-text-green">Tema actual: <span class="terminal-text-white">${currentTheme}</span></span>`, '', true);
        appendToTerminal('<span class="terminal-text-gray">Uso: theme dark|light</span>', '', true);
      }
      break;

    case 'matrix':
      if (typeof window.toggleCodeEffect === 'function') {
        const newDevModeActive = window.toggleCodeEffect();
        setDevModeActive(newDevModeActive);

        // Actualizar el aspecto del botón según el estado
        if (devModeToggle) {
          if (newDevModeActive) {
            devModeToggle.classList.add('active-dev-mode');
            devModeToggle.setAttribute('title', 'Desactivar modo desarrollador');
            appendToTerminal('<span class="terminal-text-green">Modo desarrollador activado.</span>', '', true);
          } else {
            devModeToggle.classList.remove('active-dev-mode');
            devModeToggle.setAttribute('title', 'Activar modo desarrollador');
            appendToTerminal('<span class="terminal-text-green">Modo desarrollador desactivado.</span>', '', true);
          }
        } else {
          if (newDevModeActive) {
            appendToTerminal('<span class="terminal-text-green">Modo desarrollador activado.</span>', '', true);
          } else {
            appendToTerminal('<span class="terminal-text-green">Modo desarrollador desactivado.</span>', '', true);
          }
        }
      } else {
        appendToTerminal('<span class="terminal-text-red">Error: El modo desarrollador no está disponible.</span>', '', true);
      }
      break;

    case 'clear':
      if (terminalOutput) terminalOutput.innerHTML = '';
      break;

    case 'exit':
      toggleTerminal();
      break;

    case 'open':
      const target = args[1]?.toLowerCase();
      if (target === 'blog') {
        appendToTerminal('<span class="terminal-text-green">Abriendo blog...</span>', '', true);
        window.open('https://blog.sergiomarquez.dev', '_blank');
      } else if (target === 'github') {
        appendToTerminal('<span class="terminal-text-green">Abriendo GitHub...</span>', '', true);
        window.open(portfolioData.contact.github, '_blank');
      } else if (target === 'linkedin') {
        appendToTerminal('<span class="terminal-text-green">Abriendo LinkedIn...</span>', '', true);
        window.open(portfolioData.contact.linkedin, '_blank');
      } else if (target === 'twitter') {
        appendToTerminal('<span class="terminal-text-green">Abriendo Twitter...</span>', '', true);
        window.open(portfolioData.contact.twitter, '_blank');
      } else {
        appendToTerminal('<span class="terminal-text-red">Error: Especifica qué quieres abrir (blog, github, linkedin, twitter)</span>', '', true);
      }
      break;

    case 'echo':
      const message = args.slice(1).join(' ');
      if (message) {
        appendToTerminal(`<span class="terminal-text-white">${message}</span>`, '', true);
      } else {
        appendToTerminal('<span class="terminal-text-gray">Uso: echo [mensaje]</span>', '', true);
      }
      break;

    case 'date':
      const now = new Date();
      appendToTerminal(`<span class="terminal-text-white">${now.toLocaleString()}</span>`, '', true);
      break;

    case 'whoami':
      appendToTerminal('<span class="terminal-text-white">Visitante del portfolio de Sergio Márquez</span>', '', true);
      break;

    case 'ls':
      const dirArg = args[1]?.toLowerCase();
      const dirToList = dirArg || currentDirectory;

      if (sections[dirToList as keyof typeof sections]) {
        appendToTerminal(`<span class="terminal-text-yellow">Contenido de <span class="terminal-text-white">${dirToList}</span>:</span>`, '', true);
        sections[dirToList as keyof typeof sections].forEach(item => {
          appendToTerminal(`<span class="terminal-text-blue">${item}/</span>`, '', true);
        });
      } else {
        appendToTerminal(`<span class="terminal-text-red">Error: El directorio <span class="terminal-text-white">${dirToList}</span> no existe</span>`, '', true);
      }
      break;

    case 'cd':
      const newDir = args[1]?.toLowerCase();
      let updatedDirectory = currentDirectory;

      if (!newDir || newDir === '~') {
        updatedDirectory = '~';
        appendToTerminal('<span class="terminal-text-green">Cambiado al directorio principal</span>', '', true);
      } else if (sections[currentDirectory as keyof typeof sections]?.includes(newDir)) {
        updatedDirectory = newDir;
        appendToTerminal(`<span class="terminal-text-green">Cambiado al directorio <span class="terminal-text-white">${newDir}</span></span>`, '', true);
      } else if (newDir === '..') {
        if (currentDirectory !== '~') {
          updatedDirectory = '~';
          appendToTerminal('<span class="terminal-text-green">Cambiado al directorio principal</span>', '', true);
        } else {
          appendToTerminal('<span class="terminal-text-yellow">Ya estás en el directorio principal</span>', '', true);
        }
      } else {
        appendToTerminal(`<span class="terminal-text-red">Error: El directorio <span class="terminal-text-white">${newDir}</span> no existe</span>`, '', true);
      }

      return { currentDirectory: updatedDirectory };
      break;

    case 'konami':
      // Verificar si estamos en un dispositivo móvil
      if (isMobileDevice()) {
        appendToTerminal('<span class="terminal-text-red">Esta función solo está disponible en ordenadores de escritorio.</span>', '', true);
        return { currentDirectory };
      }

      appendToTerminal('<span class="terminal-text-yellow">¡Has descubierto un huevo de pascua!</span>', '', true);
      appendToTerminal('<span class="terminal-text-green">Código Konami activado: <span class="terminal-text-white">↑ ↓ ← →</span></span>', '', true);

      import('./game').then(module => {
        module.startGame(appendToTerminal, terminalOutput);
      });
      break;

    default:
      appendToTerminal(`<span class="terminal-text-red">Error: Comando no reconocido: <span class="terminal-text-white">${command}</span></span>`, '', true);
      appendToTerminal('<span class="terminal-text-gray">Escribe <span class="terminal-text-yellow">help</span> para ver los comandos disponibles.</span>', '', true);
      break;
  }

  return { currentDirectory };
}

// Function to get command suggestions for autocomplete
export function getCommandSuggestions(input: string) {
  if (!input) return [];

  const possibleCommands = portfolioData.commands
    .map(cmd => cmd.name)
    .filter(cmd => cmd.startsWith(input.toLowerCase()));

  return possibleCommands;
}
