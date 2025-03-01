// Terminal utility functions

// Function to add text to the terminal with typing effect
export function createAppendToTerminal(terminalOutput: HTMLElement | null, terminalContent: HTMLElement | null) {
  return function appendToTerminal(
    text: string,
    className: string = "terminal-text-white",
    clearBefore: boolean = false
  ) {
    if (!terminalOutput) return;

    if (clearBefore) {
      terminalOutput.innerHTML = '';
    }

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

    if (isVisible) {
      // Ocultar la terminal
      terminalContainer.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
      terminalContainer.classList.add('opacity-0', 'scale-95', 'pointer-events-none');
      terminalContainer.classList.add('hidden');

      // Actualizar el botón de la terminal (si existe)
      const terminalToggle = document.getElementById('terminal-toggle');
      if (terminalToggle) {
        terminalToggle.setAttribute('aria-expanded', 'false');
        terminalToggle.setAttribute('title', 'Abrir terminal');
        terminalToggle.setAttribute('aria-label', 'Abrir terminal');
      }
    } else {
      // Mostrar la terminal
      terminalContainer.classList.remove('hidden');
      setTimeout(() => {
        terminalContainer.classList.remove('opacity-0', 'scale-95', 'pointer-events-none');
        terminalContainer.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');

        // Enfocar el input
        if (terminalInput) {
          terminalInput.focus();
        }

        // Actualizar el botón de la terminal (si existe)
        const terminalToggle = document.getElementById('terminal-toggle');
        if (terminalToggle) {
          terminalToggle.setAttribute('aria-expanded', 'true');
          terminalToggle.setAttribute('title', 'Cerrar terminal');
          terminalToggle.setAttribute('aria-label', 'Cerrar terminal');
        }
      }, 10);
    }

    return !isVisible;
  };
}

// Function to toggle maximize/restore terminal
export function createToggleMaximize(terminalContainer: HTMLElement | null) {
  return function toggleMaximize() {
    if (!terminalContainer) return false;

    const isMaximized = terminalContainer.style.top === '80px';

    if (isMaximized) {
      // Restaurar tamaño original
      terminalContainer.style.top = '';
      terminalContainer.style.right = '';
      terminalContainer.style.bottom = '';
      terminalContainer.style.left = '';
      terminalContainer.style.width = '';
      terminalContainer.style.height = '';
      terminalContainer.style.maxWidth = '';
      terminalContainer.style.maxHeight = '';
      terminalContainer.style.transform = '';

      // Actualizar el botón maximizar (si existe)
      const terminalMaximize = document.getElementById('terminal-maximize');
      if (terminalMaximize) {
        terminalMaximize.setAttribute('title', 'Maximizar');
        terminalMaximize.setAttribute('aria-label', 'Maximizar terminal');
      }
    } else {
      // Maximizar
      terminalContainer.style.top = '80px';
      terminalContainer.style.right = '20px';
      terminalContainer.style.bottom = '20px';
      terminalContainer.style.left = '20px';
      terminalContainer.style.width = 'auto';
      terminalContainer.style.height = 'auto';
      terminalContainer.style.maxWidth = 'none';
      terminalContainer.style.maxHeight = 'none';
      terminalContainer.style.transform = 'none';

      // Actualizar el botón maximizar (si existe)
      const terminalMaximize = document.getElementById('terminal-maximize');
      if (terminalMaximize) {
        terminalMaximize.setAttribute('title', 'Restaurar');
        terminalMaximize.setAttribute('aria-label', 'Restaurar terminal');
      }
    }

    return !isMaximized;
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
export type AppendToTerminalFn = (text: string, className?: string, clearBefore?: boolean) => void;
export type ToggleTerminalFn = () => boolean;

// Mensaje de bienvenida de la terminal
export const welcomeMessage = `
<span class="terminal-text-green">Bienvenido a la terminal interactiva del portfolio.</span>
<p class="font-medium">Escribe <span class="terminal-text-blue">help</span> para ver la lista de comandos disponibles.</p>
<p class="mt-2">Prueba los comandos <span class="terminal-text-blue">about</span>, <span class="terminal-text-blue">skills</span>, <span class="terminal-text-blue">projects</span> o <span class="terminal-text-blue">contact</span> para explorar el portfolio.</p>
<p class="mt-3">Puedes usar <span class="keyboard-shortcut">Ctrl+Alt+T</span> para mostrar/ocultar esta terminal en cualquier momento.</p>
<p class="mt-1">También puedes probar el <span class="secret-code">código Konami</span> para una sorpresa...</p>
`;
