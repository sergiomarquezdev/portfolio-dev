/**
 * utils.ts - Utilidades para el funcionamiento de la terminal interactiva
 *
 * Este módulo proporciona:
 * - Funciones para añadir texto a la terminal con efectos de tipado
 * - Control de visibilidad de la terminal (mostrar/ocultar)
 * - Funcionalidad para maximizar y restaurar la terminal
 * - Sistema de arrastre para mover la terminal por la pantalla
 * - Inicialización de la terminal con mensaje de bienvenida
 * - Tipos auxiliares para funciones de callback
 *
 * Implementa la lógica central para la manipulación de la interfaz
 * de la terminal, separando estas funcionalidades del resto del código.
 */

// Terminal utility functions

// Function to add text to the terminal with typing effect
export function createAppendToTerminal(terminalOutput: HTMLElement | null, terminalContent: HTMLElement | null) {
  return function appendToTerminal(
    text: string,
    className: string = "terminal-text-white"
  ) {
    if (!terminalOutput) return;

    // Si no hay clase específica, usar terminal-text-white por defecto para asegurar texto blanco
    if (!className) {
      className = "terminal-text-white";
    }

    // Si el texto ya tiene un span con una clase, no agregar clase adicional
    if (!text.includes('<span class="')) {
      text = `<span class="${className}">${text}</span>`;
    }

    // Agregar el texto como un párrafo
    const paragraph = document.createElement('p');
    paragraph.innerHTML = text;
    terminalOutput.appendChild(paragraph);

    // Desplazar al final
    if (terminalContent) {
      requestAnimationFrame(() => {
        terminalContent.scrollTop = terminalContent.scrollHeight;
      });
    }
  };
}

// Function to toggle terminal visibility
export function createToggleTerminal(terminalContainer: HTMLElement | null, terminalInput: HTMLInputElement | null) {
  return function toggleTerminal() {
    if (!terminalContainer) return;

    const isVisible = terminalContainer.classList.contains('opacity-100');
    const toolbarTerminalButton = document.getElementById('terminal-toggle'); // Botón en FloatingToolbar

    if (isVisible) {
      // Ocultar la terminal
      terminalContainer.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
      terminalContainer.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
      terminalContainer.classList.add('hidden');

      // Actualizar el botón de la terminal (si existe en la toolbar)
      if (toolbarTerminalButton) {
        toolbarTerminalButton.setAttribute('aria-expanded', 'false');
        toolbarTerminalButton.setAttribute('title', 'Abrir terminal');
        toolbarTerminalButton.setAttribute('aria-label', 'Abrir terminal');
      }
    } else {
      // Mostrar la terminal
      terminalContainer.classList.remove('hidden');
      setTimeout(() => {
        terminalContainer.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
        terminalContainer.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');

        if (terminalInput) {
          terminalInput.focus();
        }

        // Actualizar el botón de la terminal (si existe en la toolbar)
        if (toolbarTerminalButton) {
          toolbarTerminalButton.setAttribute('aria-expanded', 'true');
          toolbarTerminalButton.setAttribute('title', 'Cerrar terminal');
          toolbarTerminalButton.setAttribute('aria-label', 'Cerrar terminal');
        }
      }, 10);
    }

    return !isVisible;
  };
}

// Function to toggle maximize/restore terminal
export function createToggleMaximize(terminalContainer: HTMLElement | null) {
  let isMaximized = false;

  // Guardar las propiedades originales
  let originalStyles = {
    width: '',
    height: '',
    bottom: '',
    right: '',
    top: '',
    left: ''
  };

  return function toggleMaximize() {
    if (!terminalContainer) return false;

    const terminalMaximizeButton = document.getElementById('terminal-maximize');

    if (!isMaximized) {
      // Guardar el estado actual
      originalStyles = {
        width: terminalContainer.style.width || '',
        height: terminalContainer.style.height || '',
        bottom: terminalContainer.style.bottom || '',
        right: terminalContainer.style.right || '',
        top: terminalContainer.style.top || '',
        left: terminalContainer.style.left || ''
      };

      // Maximizar
      terminalContainer.style.top = '80px'; // Dejar espacio para la barra de navegación
      terminalContainer.style.left = '20px';
      terminalContainer.style.right = '20px';
      terminalContainer.style.bottom = '20px';
      terminalContainer.style.width = 'calc(100% - 40px)';
      terminalContainer.style.height = 'calc(100% - 100px)';
      terminalContainer.style.maxWidth = 'none';
      isMaximized = true;

      // Actualizar el botón maximizar (si existe)
      if (terminalMaximizeButton) {
        terminalMaximizeButton.setAttribute('title', 'Restaurar');
        terminalMaximizeButton.setAttribute('aria-label', 'Restaurar terminal');
        terminalMaximizeButton.setAttribute('aria-pressed', 'true');
      }
    } else {
      // Restaurar el estado original
      terminalContainer.style.width = originalStyles.width;
      terminalContainer.style.height = originalStyles.height;
      terminalContainer.style.bottom = originalStyles.bottom;
      terminalContainer.style.right = originalStyles.right;
      terminalContainer.style.top = originalStyles.top;
      terminalContainer.style.left = originalStyles.left;
      terminalContainer.style.maxWidth = '';
      isMaximized = false;

      // Actualizar el botón maximizar (si existe)
      if (terminalMaximizeButton) {
        terminalMaximizeButton.setAttribute('title', 'Maximizar');
        terminalMaximizeButton.setAttribute('aria-label', 'Maximizar terminal');
        terminalMaximizeButton.setAttribute('aria-pressed', 'false');
      }
    }

    return isMaximized;
  };
}

// Function to make terminal draggable
export function makeTerminalDraggable(
  terminalContainer: HTMLElement | null,
  dragHandle: HTMLElement | null,
  isMaximizedFn: () => boolean
) {
  if (!terminalContainer || !dragHandle) return;

  let isDragging = false;
  let offsetX = 0;
  let offsetY = 0;

  dragHandle.addEventListener('mousedown', (e) => {
    // No permitir arrastrar si está maximizada
    if (isMaximizedFn()) return;

    // Solo permitir arrastrar con el botón izquierdo
    if (e.button !== 0) return;

    // No iniciar arrastre si se hace clic en un botón dentro de la barra de título
    if ((e.target as HTMLElement).tagName === 'BUTTON' || (e.target as HTMLElement).closest('button')) {
      return;
    }

    isDragging = true;
    offsetX = e.clientX - terminalContainer.getBoundingClientRect().left;
    offsetY = e.clientY - terminalContainer.getBoundingClientRect().top;

    // Cambiar el cursor mientras se arrastra
    document.body.style.cursor = 'move';
    dragHandle.style.cursor = 'move';
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;

    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;

    // Asegurar que la terminal no se salga de la ventana
    const maxX = window.innerWidth - terminalContainer.offsetWidth;
    const maxY = window.innerHeight - terminalContainer.offsetHeight;

    terminalContainer.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
    terminalContainer.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
    terminalContainer.style.right = 'auto';
    terminalContainer.style.bottom = 'auto';
    terminalContainer.style.transform = 'none';
  });

  document.addEventListener('mouseup', () => {
    if (isDragging) {
      isDragging = false;
      document.body.style.cursor = '';
      dragHandle.style.cursor = '';
    }
  });
}

// Function to initialize terminal with welcome message
export function initTerminal(terminalOutput: HTMLElement | null, terminalInput: HTMLInputElement | null) {
  if (!terminalOutput || !terminalInput) return;

  // Iniciar con mensaje de bienvenida
  terminalOutput.innerHTML = welcomeMessage;
}

// Exportar tipos
export type AppendToTerminalFn = (text: string, className?: string) => void;
export type ToggleTerminalFn = () => boolean;

// Importamos la función para detectar dispositivos móviles
import { isMobileDevice } from './types';

// Mensaje de bienvenida de la terminal
export const welcomeMessage = `
<span class="terminal-text-green">Bienvenido a la terminal interactiva del portfolio.</span>
<p class="font-medium">Escribe <span class="terminal-text-blue">help</span> para ver la lista de comandos disponibles.</p>
<p class="mt-2">Prueba los comandos <span class="terminal-text-blue">about</span>, <span class="terminal-text-blue">skills</span>, <span class="terminal-text-blue">projects</span> o <span class="terminal-text-blue">contact</span> para explorar el portfolio.</p>
<p class="mt-3">Puedes usar <span class="keyboard-shortcut">Ctrl+Alt+T</span> para mostrar/ocultar esta terminal en cualquier momento.</p>
${typeof window !== 'undefined' && !isMobileDevice() ? '<p class="mt-1">También puedes probar el <span class="secret-code">código Konami</span> para una sorpresa...</p>' : ''}
`;
