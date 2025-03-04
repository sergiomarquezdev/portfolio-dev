/**
 * commands.ts - Sistema de procesamiento de comandos para la terminal interactiva
 *
 * Este módulo implementa:
 * - Procesamiento de comandos de la terminal (help, about, skills, etc.)
 * - Funcionalidad de autocompletado de comandos
 * - Respuestas formateadas con colores y estilos
 * - Sistema de navegación entre directorios virtuales
 * - Comandos especiales como matrix y konami
 *
 * Cada comando tiene su propia implementación y puede interactuar con otros
 * componentes del sistema, como el efecto Matrix o los datos del CV.
 */

// Terminal commands processing
import { portfolioData, sections } from './types';

// Importar solo la función necesaria para el juego de adivinanza
import { runMiniGame } from './game';

// Función para obtener una fecha formateada para ls -l
function getFormattedDate() {
  const date = new Date();
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const month = months[date.getMonth()];
  const day = date.getDate().toString().padStart(2, '0');
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${month} ${day} ${hours}:${minutes}`;
}

// Mostrar un tip aleatorio para mejorar la experiencia de la terminal
function showRandomTip(appendToTerminal: (text: string, className?: string, typeEffect?: boolean) => void) {
  const tips = [
    "Usa las teclas de flecha arriba/abajo para navegar por el historial de comandos.",
    "Presiona Tab para autocompletar comandos y rutas.",
    "Ejecuta 'help' para ver todos los comandos disponibles.",
    "Si necesitas limpiar la pantalla, usa el comando 'clear'.",
    "Puedes cambiar el tema de la terminal con 'theme dark' o 'theme light'."
  ];

  const randomTip = tips[Math.floor(Math.random() * tips.length)];
  appendToTerminal(`<span class="terminal-text-green">Tip:</span> <span class="terminal-text-gray">${randomTip}</span>`, '', true);
}

/**
 * Muestra información del perfil social según la red social seleccionada
 */
function showSocialProfile(
  socialNetwork: string,
  appendToTerminal: (text: string, className?: string, typeEffect?: boolean) => void
) {
  // Información de perfiles sociales
  const profiles: Record<string, {
    username: string,
    bio: string,
    url: string,
    color: string
  }> = {
    github: {
      username: '@sergiomarquezdev',
      bio: 'Desarrollador Full Stack & DevOps',
      url: 'https://github.com/sergiomarquezdev',
      color: 'purple'
    },
    twitter: {
      username: '@smarquezdev',
      bio: 'Reflexiones sobre desarrollo y tecnología',
      url: 'https://x.com/smarquezdev',
      color: 'blue'
    },
    linkedin: {
      username: 'sergio-marquez-perez',
      bio: 'Desarrollador Full Stack especializado en Java y Angular',
      url: 'https://www.linkedin.com/in/sergio-marquez-perez/',
      color: 'sky-blue'
    },
    blog: {
      username: 'Blog de Sergio Márquez',
      bio: 'Artículos técnicos y tutoriales sobre desarrollo',
      url: 'https://blog.sergiomarquez.dev',
      color: 'green'
    }
  };

  // Verificar si existe el perfil
  const profile = profiles[socialNetwork];
  if (!profile) {
    appendToTerminal(`<span class="terminal-text-red">Error: Perfil de ${socialNetwork} no encontrado</span>`, '', true);
    return;
  }

  // Mostrar información del perfil
  appendToTerminal(`<span class="terminal-text-${profile.color}">──── Perfil de ${socialNetwork.toUpperCase()} ────</span>`, '', true);

  // Información detallada del perfil
  appendToTerminal(`<span class="terminal-text-yellow">Usuario:</span> <span class="terminal-text-white">${profile.username}</span>`, '', true);
  appendToTerminal(`<span class="terminal-text-yellow">Bio:</span> <span class="terminal-text-white">${profile.bio}</span>`, '', true);
  appendToTerminal(`<span class="terminal-text-yellow">URL:</span> <span class="terminal-text-white">${profile.url}</span>`, '', true);

  // Añadir instrucciones para abrir el perfil
  appendToTerminal('', '', true);
  appendToTerminal(`<span class="terminal-text-green">Tip:</span> <span class="terminal-text-white">Usa el comando <span class="terminal-text-${profile.color}">open ${socialNetwork}</span> para visitar el perfil</span>`, '', true);
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
      // Crear una tabla para mejor alineación
      let helpTable = '<div class="grid grid-cols-2 gap-x-4 gap-y-1 mt-1">';
      portfolioData.commands.forEach(cmd => {
        helpTable += `<div><span class="terminal-text-green font-medium">${cmd.name}</span></div><div class="terminal-text-white">${cmd.description}</div>`;
      });

      helpTable += '</div>';
      appendToTerminal(helpTable, '', true);

      // Mostrar un tip aleatorio después de la ayuda
      appendToTerminal('', '', true);
      showRandomTip(appendToTerminal);
      break;

    case 'whoami':
      appendToTerminal('<span class="terminal-text-white">Visitante del portfolio de Sergio Márquez</span>', '', true);
      break;

    case 'clear':
      if (terminalOutput) terminalOutput.innerHTML = '';
      break;

    case 'pwd':
      // Mostrar el directorio actual con formato
      let displayPath = "";
      if (currentDirectory === '~') {
        displayPath = '~';
      } else if (['twitter', 'linkedin', 'github', 'blog'].includes(currentDirectory)) {
        displayPath = `~/social/${currentDirectory}`;
      } else {
        displayPath = `~/${currentDirectory}`;
      }
      appendToTerminal(`<span class="terminal-text-green">${displayPath}</span>`, '', true);
      break;

    case 'ls':
      const dirArg = args[1]?.toLowerCase();
      const dirToList = dirArg || currentDirectory;
      const options = args.filter(arg => arg.startsWith('-')).join('');
      const showDetails = options.includes('l');

      // Caso especial para el directorio social
      if (dirToList === 'social') {
        // Cabecera para el directorio social
        if (showDetails) {
          appendToTerminal('<span class="terminal-text-yellow">Directorio: ~/social</span>', '', true);
          appendToTerminal('<span class="terminal-text-white">total 4</span>', '', true);
        } else {
          appendToTerminal('<span class="terminal-text-yellow">Redes Sociales Disponibles:</span>', '', true);
          appendToTerminal('<span class="terminal-text-white">Utiliza <span class="terminal-text-green">open [nombre]</span> para visitar los perfiles</span>', '', true);
          appendToTerminal('', '', true);
        }

        // Mostrar redes sociales con colores personalizados
        if (showDetails) {
          const date = getFormattedDate();
          appendToTerminal('<span class="terminal-text-yellow">Directorios:</span>', '', true);
          appendToTerminal(`<span class="terminal-text-white">drwxr-xr-x 2 user user 4096 ${date} </span><span class="terminal-text-blue">twitter</span><span class="terminal-text-white"> - Twitter/X</span>`, '', true);
          appendToTerminal(`<span class="terminal-text-white">drwxr-xr-x 2 user user 4096 ${date} </span><span class="terminal-text-sky-blue">linkedin</span><span class="terminal-text-white"> - LinkedIn</span>`, '', true);
          appendToTerminal(`<span class="terminal-text-white">drwxr-xr-x 2 user user 4096 ${date} </span><span class="terminal-text-purple">github</span><span class="terminal-text-white"> - GitHub</span>`, '', true);
          appendToTerminal(`<span class="terminal-text-white">drwxr-xr-x 2 user user 4096 ${date} </span><span class="terminal-text-green">blog</span><span class="terminal-text-white"> - Blog personal</span>`, '', true);
        } else {
          appendToTerminal('<span class="terminal-text-blue">twitter/</span> - Twitter/X', '', true);
          appendToTerminal('<span class="terminal-text-sky-blue">linkedin/</span> - LinkedIn', '', true);
          appendToTerminal('<span class="terminal-text-purple">github/</span> - GitHub', '', true);
          appendToTerminal('<span class="terminal-text-green">blog/</span> - Blog personal', '', true);
        }
      }
      // Caso especial para directorios de redes sociales
      else if (['twitter', 'linkedin', 'github', 'blog'].includes(dirToList)) {
        // Mostrar información del perfil
        showSocialProfile(dirToList, appendToTerminal);
      }
      // Directorio estándar
      else if (sections[dirToList as keyof typeof sections]) {
        // Cabecera del directorio
        if (showDetails) {
          appendToTerminal(`<span class="terminal-text-yellow">Directorio: ~/${dirToList}</span>`, '', true);
          appendToTerminal('<span class="terminal-text-white">total ' + sections[dirToList as keyof typeof sections].length + '</span>', '', true);
          appendToTerminal('<span class="terminal-text-yellow">Directorios:</span>', '', true);
        } else {
          appendToTerminal(`<span class="terminal-text-yellow">Contenido de <span class="terminal-text-white">${dirToList}</span>:</span>`, '', true);
        }

        // Mostrar subdirectorios
        const date = getFormattedDate();
        sections[dirToList as keyof typeof sections].forEach(item => {
          if (showDetails) {
            appendToTerminal(`<span class="terminal-text-white">drwxr-xr-x 2 user user 4096 ${date} </span><span class="terminal-text-blue">${item}</span>`, '', true);
          } else {
            appendToTerminal(`<span class="terminal-text-blue">${item}/</span>`, '', true);
          }
        });
      } else {
        appendToTerminal(`<span class="terminal-text-red">Error: El directorio <span class="terminal-text-white">${dirToList}</span> no existe</span>`, '', true);
      }
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

    // UTILIDADES GENERALES
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

    case 'open':
      const target = args[1]?.toLowerCase();

      // URLs comunes para redes sociales y más
      const commonUrls: Record<string, string> = {
        twitter: 'https://x.com/smarquezdev',
        linkedin: 'https://www.linkedin.com/in/sergio-marquez-perez/',
        github: 'https://github.com/sergiomarquezdev',
        blog: 'https://blog.sergiomarquez.dev',
        portfolio: 'https://sergiomarquez.dev',
        facebook: 'https://facebook.com/smarquezdev',
        instagram: 'https://instagram.com/smarquezdev',
      };

      // Si hay un objetivo específico tipo URL (args[1] === "url")
      if (target === 'url' && args[2]) {
        const url = args[2].startsWith('http') ? args[2] : `https://${args[2]}`;
        window.open(url, '_blank');
        appendToTerminal(`<span class="terminal-text-green">Abriendo URL externa: <span class="terminal-text-blue">${target}</span>...</span>`, '', true);
      }
      // Si no hay target pero estamos en un directorio de red social, abrir ese perfil
      else if (!target && ['twitter', 'linkedin', 'github', 'blog'].includes(currentDirectory)) {
        const socialName = currentDirectory;
        window.open(commonUrls[socialName], '_blank');
        appendToTerminal(`<span class="terminal-text-green">Abriendo ${socialName}...</span>`, '', true);
        appendToTerminal(`<span class="terminal-text-gray">URL: <span class="terminal-text-blue">${commonUrls[socialName]}</span></span>`, '', true);
      }
      // Si el target existe como red social o enlace común
      else if (target && commonUrls[target]) {
        window.open(commonUrls[target], '_blank');
        appendToTerminal(`<span class="terminal-text-green">Abriendo ${target}...</span>`, '', true);
        appendToTerminal(`<span class="terminal-text-gray">URL: <span class="terminal-text-blue">${commonUrls[target]}</span></span>`, '', true);
      }
      // Si el target es una URL completa
      else if (target && (target.startsWith('http://') || target.startsWith('https://'))) {
        const url = target;
        window.open(url, '_blank');
        appendToTerminal(`<span class="terminal-text-green">Abriendo URL personalizada: <span class="terminal-text-blue">${url}</span>...</span>`, '', true);
      }
      // Mostrar ayuda de uso
      else {
        appendToTerminal('<span class="terminal-text-yellow">Uso del comando open:</span>', '', true);
        appendToTerminal('<span class="terminal-text-white">- <span class="terminal-text-green">open</span> (abre la red social actual si estás en un directorio de red social)</span>', '', true);
        appendToTerminal('<span class="terminal-text-white">- <span class="terminal-text-green">open [red_social]</span> (abre una red social específica: github, twitter, linkedin, etc.)</span>', '', true);
        appendToTerminal('<span class="terminal-text-white">- <span class="terminal-text-green">open url [URL]</span> (abre una URL personalizada, por ejemplo: open url https://example.com)</span>', '', true);
        appendToTerminal('<span class="terminal-text-white">- <span class="terminal-text-green">open [URL]</span> (abre directamente una URL completa que comience con http:// o https://)</span>', '', true);

        // Si estamos en el directorio social, mostrar las redes disponibles
        if (currentDirectory === 'social') {
          appendToTerminal('', '', true);
          appendToTerminal('<span class="terminal-text-green">Tip:</span> <span class="terminal-text-white">Usa <span class="terminal-text-green">open [red_social]</span> para abrir directamente una red social</span>', '', true);
        }

        // Mostrar las redes sociales disponibles
        appendToTerminal('', '', true);
        appendToTerminal('<span class="terminal-text-yellow">Redes sociales disponibles:</span>', '', true);
        Object.keys(commonUrls).forEach(social => {
          appendToTerminal(`<span class="terminal-text-blue">${social}</span>`, '', true);
        });
      }
      break;

    // PERSONALIZACIÓN Y EXTRAS
    case 'theme':
      const themeArg = args[1]?.toLowerCase();
      if (themeArg === 'dark') {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
        appendToTerminal('<span class="terminal-text-green">Tema cambiado a oscuro.</span>', '', true);
      } else if (themeArg === 'light') {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
        appendToTerminal('<span class="terminal-text-green">Tema cambiado a claro.</span>', '', true);
      } else {
        const currentTheme = document.documentElement.classList.contains('dark') ? 'oscuro' : 'claro';
        appendToTerminal(`<span class="terminal-text-green">Tema actual: <span class="terminal-text-white">${currentTheme}</span></span>`, '', true);
        appendToTerminal('<span class="terminal-text-gray">Uso: theme dark|light</span>', '', true);
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

    case 'game':
      runMiniGame(appendToTerminal);
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
      break;
  }

  return { currentDirectory };
}

// Exportar lista de comandos para autocompletado y ayuda
export function getCommandSuggestions(input: string): string[] {
  // Lista completa y actualizada de todos los comandos disponibles, agrupados por categorías
  const commands = [
    // Comandos de ayuda y control básico
    'help',            // Muestra la ayuda
    'whoami',          // Identifica al usuario
    'clear',           // Limpia la terminal
    'exit',            // Cierra la terminal

    // Comandos de navegación y sistema de archivos
    'pwd',             // Muestra el directorio actual
    'ls',              // Lista directorios y archivos
    'ls -l',           // Lista con formato detallado

    // Información del portfolio
    'about',           // Muestra información sobre el autor
    'skills',          // Muestra habilidades técnicas
    'projects',        // Muestra proyectos destacados
    'contact',         // Muestra información de contacto

    // Utilidades generales
    'echo',            // Muestra un mensaje
    'date',            // Muestra la fecha y hora actual
    'open',            // Abre URLs (open blog, open github, etc.)

    // Personalización y extras
    'theme',           // Cambia el tema (dark/light)
    'matrix',          // Activa/desactiva el modo desarrollador
    'game',            // Inicia un mini-juego
    'konami'           // Para usuarios de escritorio (código Konami)
  ];

  // Si la entrada contiene espacios, busca comandos con argumentos
  if (input.includes(' ')) {
    const parts = input.split(' ');
    const mainCommand = parts[0].toLowerCase();

    // Sugerencias específicas para cada comando
    if (mainCommand === 'open') {
      return ['open twitter', 'open linkedin', 'open github', 'open blog', 'open url']
        .filter(cmd => cmd.startsWith(input.toLowerCase()));
    } else if (mainCommand === 'theme') {
      return ['theme dark', 'theme light']
        .filter(cmd => cmd.startsWith(input.toLowerCase()));
    } else if (mainCommand === 'ls') {
      return ['ls -l', 'ls social', 'ls ~']
        .filter(cmd => cmd.startsWith(input.toLowerCase()));
    }

    // Si no hay sugerencias específicas, devuelve una lista vacía
    return [];
  }

  // Filtrar comandos que coincidan con la entrada
  return commands.filter(cmd => cmd.startsWith(input.toLowerCase()));
}
