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

// Historial de navegación para 'cd -'
let navigationHistory: string[] = ['~'];

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

// Mostrar un tip aleatorio al usuario
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
 * @param socialNetwork Nombre de la red social (twitter, linkedin, github, etc.)
 * @param appendToTerminal Función para añadir texto a la terminal
 */
function showSocialProfile(
  socialNetwork: string,
  appendToTerminal: (text: string, className?: string, typeEffect?: boolean) => void
) {
  // Datos comunes a todos los perfiles
  const socialNetworks = {
    twitter: {
      username: '@sergiomarquezdev',
      url: 'https://twitter.com/sergiomarquezdev',
      bio: 'Full Stack Developer | Java & Angular specialist | Software Engineering enthusiast',
      color: 'blue'
    },
    linkedin: {
      username: 'Sergio Márquez',
      url: 'https://www.linkedin.com/in/sergio-marquez-perez/',
      bio: 'Full Stack Developer specializing in Java, Angular and Cloud technologies',
      color: 'sky-blue'
    },
    github: {
      username: 'sergiomarquezdev',
      url: 'https://github.com/sergiomarquezdev',
      bio: 'Building awesome software and sharing open source projects',
      color: 'purple'
    },
    blog: {
      username: 'Sergio\'s Tech Blog',
      url: 'https://blog.sergiomarquez.dev',
      bio: 'Articles about software development, best practices and tech trends',
      color: 'green'
    }
  };

  const profile = socialNetworks[socialNetwork as keyof typeof socialNetworks];

  if (!profile) {
    appendToTerminal(`<span class="terminal-text-red">Error: Perfil de ${socialNetwork} no encontrado</span>`, '', true);
    return;
  }

  // Mostrar cabecera con el título y color de la red social
  appendToTerminal(`<span class="terminal-text-${profile.color}">──── Perfil de ${socialNetwork.toUpperCase()} ────</span>`, '', true);

  // Mostrar información del perfil
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

    case 'exit':
      toggleTerminal();
      break;

    // COMANDOS DE NAVEGACIÓN Y SISTEMA DE ARCHIVOS
    case 'pwd':
      // Mostrar ruta completa del directorio actual
      let displayPath = '';
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
          appendToTerminal('<span class="terminal-text-white">Utiliza <span class="terminal-text-green">cd [nombre]</span> para acceder a cada perfil</span>', '', true);
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

    case 'cd':
      const newDir = args[1]?.toLowerCase();
      let updatedDirectory = currentDirectory;

      if (!newDir || newDir === '~') {
        // Volver al directorio raíz
        navigationHistory.push('~');
        updatedDirectory = '~';
        appendToTerminal('<span class="terminal-text-green">Cambiado al directorio principal</span>', '', true);
      } else if (newDir === '..') {
        // Volver al directorio padre
        if (currentDirectory !== '~') {
          // Si estamos en una red social, volver a 'social'
          if (['twitter', 'linkedin', 'github', 'blog'].includes(currentDirectory)) {
            navigationHistory.push('social');
            updatedDirectory = 'social';
            appendToTerminal('<span class="terminal-text-green">Cambiado al directorio social</span>', '', true);
          } else {
            // En cualquier otro caso, volver a la raíz
            navigationHistory.push('~');
            updatedDirectory = '~';
            appendToTerminal('<span class="terminal-text-green">Cambiado al directorio principal</span>', '', true);
          }
        } else {
          appendToTerminal('<span class="terminal-text-yellow">Ya estás en el directorio principal</span>', '', true);
        }
      } else if (newDir === '-') {
        // Implementación completa de cd -: volver al directorio anterior
        if (navigationHistory.length > 1) {
          // Obtener el directorio anterior (no el actual)
          const previousDir = navigationHistory[navigationHistory.length - 2];
          // Guardar directorio actual antes de cambiarlo
          const currentDir = navigationHistory[navigationHistory.length - 1];

          // Reordenar el historial: quitar el último y agregar el actual al final
          navigationHistory.pop(); // Quitar el último (que era el actual)
          navigationHistory.push(currentDir); // Agregar el actual al final

          updatedDirectory = previousDir;
          appendToTerminal(`<span class="terminal-text-green">Volviendo al directorio anterior: <span class="terminal-text-white">${previousDir}</span></span>`, '', true);

          // Si el directorio anterior es una red social, mostrar su perfil
          if (['twitter', 'linkedin', 'github', 'blog'].includes(previousDir)) {
            showSocialProfile(previousDir, appendToTerminal);
          }
        } else {
          appendToTerminal('<span class="terminal-text-yellow">No hay directorio anterior al que volver</span>', '', true);
        }
      } else if (newDir.includes('/')) {
        // Navegación por ruta (implementación básica)
        const parts = newDir.split('/').filter(p => p.length > 0);

        if (parts.length === 2 && parts[0] === 'social' &&
            ['twitter', 'linkedin', 'github', 'blog'].includes(parts[1])) {
          navigationHistory.push(parts[1]);
          updatedDirectory = parts[1];
          showSocialProfile(updatedDirectory, appendToTerminal);
        } else {
          appendToTerminal(`<span class="terminal-text-red">Error: Ruta no válida o directorio inexistente</span>`, '', true);
        }
      } else if (sections[currentDirectory as keyof typeof sections]?.includes(newDir)) {
        // Navegar a un subdirectorio desde el directorio actual
        navigationHistory.push(newDir);
        updatedDirectory = newDir;

        // Mostrar información específica si es una red social
        if (['twitter', 'linkedin', 'github', 'blog'].includes(newDir)) {
          showSocialProfile(newDir, appendToTerminal);
        } else {
          appendToTerminal(`<span class="terminal-text-green">Cambiado al directorio <span class="terminal-text-white">${newDir}</span></span>`, '', true);
        }
      } else if (Object.keys(sections).includes(newDir)) {
        // Navegación directa a un directorio conocido
        navigationHistory.push(newDir);
        updatedDirectory = newDir;

        // Mostrar información específica si es una red social
        if (['twitter', 'linkedin', 'github', 'blog'].includes(newDir)) {
          showSocialProfile(newDir, appendToTerminal);
        } else {
          appendToTerminal(`<span class="terminal-text-green">Cambiado al directorio <span class="terminal-text-white">${newDir}</span></span>`, '', true);
        }
      } else {
        appendToTerminal(`<span class="terminal-text-red">Error: El directorio <span class="terminal-text-white">${newDir}</span> no existe</span>`, '', true);
      }

      // Mostrar un tip después de algunos cambios de directorio (25% de probabilidad)
      if (Math.random() < 0.25) {
        showRandomTip(appendToTerminal);
      }

      return { currentDirectory: updatedDirectory };

    // INFORMACIÓN DEL PORTFOLIO
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
      const url = args[2] || '';

      // Mapeo de redes sociales y URLs comunes
      const commonUrls: {[key: string]: string} = {
        'blog': 'https://blog.sergiomarquez.dev',
        'github': portfolioData.contact.github,
        'linkedin': portfolioData.contact.linkedin,
        'twitter': portfolioData.contact.twitter,
        'portfolio': 'https://sergiomarquez.dev',
        'email': `mailto:${portfolioData.contact.email}`
      };

      // Comportamiento según el caso
      // Caso 1: URL directa (si comienza con http o https)
      if (target && (target.startsWith('http://') || target.startsWith('https://') || target.startsWith('mailto:'))) {
        appendToTerminal(`<span class="terminal-text-green">Abriendo URL externa: <span class="terminal-text-blue">${target}</span>...</span>`, '', true);
        window.open(target, '_blank');
      }
      // Caso 2: Sin argumentos pero en directorio de red social
      else if (!target && ['twitter', 'linkedin', 'github', 'blog'].includes(currentDirectory)) {
        const socialName = currentDirectory;
        if (commonUrls[socialName]) {
          appendToTerminal(`<span class="terminal-text-green">Abriendo ${socialName}...</span>`, '', true);
          appendToTerminal(`<span class="terminal-text-gray">URL: <span class="terminal-text-blue">${commonUrls[socialName]}</span></span>`, '', true);
          window.open(commonUrls[socialName], '_blank');
        }
      }
      // Caso 3: Red social específica
      else if (target && commonUrls[target]) {
        appendToTerminal(`<span class="terminal-text-green">Abriendo ${target}...</span>`, '', true);
        appendToTerminal(`<span class="terminal-text-gray">URL: <span class="terminal-text-blue">${commonUrls[target]}</span></span>`, '', true);
        window.open(commonUrls[target], '_blank');
      }
      // Caso 4: URL personalizada con formato "open url https://example.com"
      else if (target === 'url' && url && (url.startsWith('http://') || url.startsWith('https://'))) {
        appendToTerminal(`<span class="terminal-text-green">Abriendo URL personalizada: <span class="terminal-text-blue">${url}</span>...</span>`, '', true);
        window.open(url, '_blank');
      }
      // Caso 5: Error o información
      else {
        appendToTerminal('<span class="terminal-text-yellow">Uso del comando open:</span>', '', true);
        appendToTerminal('<span class="terminal-text-white">- <span class="terminal-text-green">open</span> (abre la red social actual si estás en un directorio de red social)</span>', '', true);
        appendToTerminal('<span class="terminal-text-white">- <span class="terminal-text-green">open [red_social]</span> (abre una red social específica: github, twitter, linkedin, etc.)</span>', '', true);
        appendToTerminal('<span class="terminal-text-white">- <span class="terminal-text-green">open url [URL]</span> (abre una URL personalizada, por ejemplo: open url https://example.com)</span>', '', true);
        appendToTerminal('<span class="terminal-text-white">- <span class="terminal-text-green">open [URL]</span> (abre directamente una URL completa que comience con http:// o https://)</span>', '', true);

        // Si estamos en social, dar pista adicional
        if (currentDirectory === 'social') {
          appendToTerminal('', '', true);
          appendToTerminal('<span class="terminal-text-green">Tip:</span> <span class="terminal-text-white">Usa <span class="terminal-text-green">cd [red_social]</span> y luego <span class="terminal-text-green">open</span> para explorar y abrir perfiles</span>', '', true);
        }

        // Lista de opciones disponibles
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

    case 'game':
      appendToTerminal('Iniciando juego de adivinar el número...', 'terminal-text-blue', false);
      let gameProcessor = runMiniGame(appendToTerminal);
      return {
        activeGame: gameProcessor,
        currentDirectory
      };

    case 'konami':
      // Solo dar una pista sobre el código secreto
      appendToTerminal('<span class="terminal-text-yellow">¡Has descubierto una pista secreta!</span>', '', true);
      appendToTerminal('<span class="terminal-text-green">Código Konami: <span class="terminal-text-white">↑ ↓ ← →</span></span>', '', true);
      appendToTerminal('<span class="terminal-text-blue">Presiona esta secuencia de teclas para desbloquear un mini-juego.</span>', '', true);
      appendToTerminal('<span class="terminal-text-blue">Completa el juego para descubrir un efecto visual especial.</span>', '', true);
      return { currentDirectory };

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
    'cd',              // Cambia el directorio actual

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
    } else if (mainCommand === 'cd') {
      return ['cd ~', 'cd ..', 'cd -', 'cd about', 'cd skills', 'cd projects', 'cd contact', 'cd social']
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
