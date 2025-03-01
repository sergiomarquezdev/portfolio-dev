// Terminal utility functions

// Function to add text to the terminal with typing effect
export function createAppendToTerminal(terminalOutput: HTMLElement | null, terminalContent: HTMLElement | null) {
  return function appendToTerminal(text: string, className: string = '', typeEffect: boolean = false) {
    // Reemplazar clases de color de Tailwind por clases personalizadas
    text = text
      .replace(/class="text-white"/g, 'class="terminal-text-white"')
      .replace(/class="text-green-400"/g, 'class="terminal-text-green"')
      .replace(/class="text-yellow-400"/g, 'class="terminal-text-yellow"')
      .replace(/class="text-blue-400"/g, 'class="terminal-text-blue"')
      .replace(/class="text-red-400"/g, 'class="terminal-text-red"')
      .replace(/class="text-gray-400"/g, 'class="terminal-text-gray"')
      .replace(/class="text-gray-500"/g, 'class="terminal-text-gray-light"')
      .replace(/class="text-gray-600"/g, 'class="terminal-text-gray-lighter"');

    // Asegurar que todo el texto tenga un color asignado
    if (!text.includes('class="terminal-text-')) {
      text = `<span class="terminal-text-white">${text}</span>`;
    }

    const p = document.createElement('p');
    p.className = className + ' terminal-text-white'; // Añadir clase de texto blanco por defecto

    // Función para asegurar que el scroll se mantenga en la parte inferior
    const scrollToBottom = () => {
      if (terminalContent) {
        // Usar requestAnimationFrame para asegurar que el scroll ocurra después de que el DOM se actualice
        requestAnimationFrame(() => {
          terminalContent.scrollTop = terminalContent.scrollHeight;
        });
      }
    };

    if (!typeEffect) {
      // Sin efecto de escritura, mostrar inmediatamente
      p.innerHTML = text;
      terminalOutput?.appendChild(p);
      scrollToBottom();
      return;
    }

    // Con efecto de escritura (más rápido)
    let i = 0;
    const speed = 5; // Velocidad más rápida (ms por carácter)
    p.innerHTML = '';
    terminalOutput?.appendChild(p);

    function typeWriter() {
      if (i < text.length) {
        // Para evitar problemas con las etiquetas HTML, añadimos el texto completo
        // y usamos slice para mostrar solo una parte
        p.innerHTML = text.slice(0, i + 1);
        i++;
        setTimeout(typeWriter, speed);
        // Scroll durante la animación de escritura
        scrollToBottom();
      } else {
        // Scroll final cuando termina la animación
        scrollToBottom();
      }
    }

    typeWriter();
  };
}

// Function to toggle terminal visibility
export function createToggleTerminal(
  terminalContainer: HTMLElement | null,
  terminalInput: HTMLInputElement | null
) {
  let isTerminalOpen = false;

  return function toggleTerminal() {
    isTerminalOpen = !isTerminalOpen;

    if (isTerminalOpen) {
      terminalContainer?.classList.remove('hidden', 'scale-95', 'opacity-0', 'pointer-events-none');
      terminalContainer?.classList.add('scale-100', 'opacity-100');
      terminalInput?.focus();

      // Asegurar que el scroll esté en la parte inferior cuando se abre la terminal
      const terminalContent = terminalContainer?.querySelector('#terminal-content');
      if (terminalContent) {
        setTimeout(() => {
          terminalContent.scrollTop = terminalContent.scrollHeight;
        }, 50); // Pequeño retraso para asegurar que el contenido esté renderizado
      }
    } else {
      terminalContainer?.classList.remove('scale-100', 'opacity-100');
      terminalContainer?.classList.add('scale-95', 'opacity-0');
      setTimeout(() => {
        terminalContainer?.classList.add('hidden', 'pointer-events-none');
      }, 300);
    }

    return isTerminalOpen;
  };
}

// Function to toggle maximize/restore terminal
export function createToggleMaximize(terminalContainer: HTMLElement | null) {
  let isMaximized = false;

  return function toggleMaximize() {
    isMaximized = !isMaximized;

    if (isMaximized) {
      // Usar posicionamiento que respete el header (inset-4 es demasiado agresivo)
      terminalContainer?.classList.add('fixed', 'w-auto', 'h-auto', 'max-w-none');
      terminalContainer?.classList.remove('bottom-4', 'right-4', 'w-96', 'h-80');

      // Establecer dimensiones que respeten el header
      if (terminalContainer) {
        terminalContainer.style.top = '80px'; // Dejar espacio para el header
        terminalContainer.style.left = '20px';
        terminalContainer.style.right = '20px';
        terminalContainer.style.bottom = '20px';
        terminalContainer.style.width = 'auto';
        terminalContainer.style.height = 'auto';

        // Asegurar que el z-index sea suficientemente alto
        terminalContainer.style.zIndex = '1000';
      }
    } else {
      // Restaurar a tamaño normal
      terminalContainer?.classList.remove('fixed', 'w-auto', 'h-auto', 'max-w-none');
      terminalContainer?.classList.add('bottom-4', 'right-4', 'w-96', 'h-80');

      // Limpiar estilos inline
      if (terminalContainer) {
        terminalContainer.style.top = '';
        terminalContainer.style.left = '';
        terminalContainer.style.right = '';
        terminalContainer.style.bottom = '';
        terminalContainer.style.width = '';
        terminalContainer.style.height = '';
      }
    }

    return isMaximized;
  };
}

// Function to make terminal draggable
export function makeTerminalDraggable(
  terminalContainer: HTMLElement | null,
  headerElement: HTMLElement | null,
  isMaximized: () => boolean
) {
  let isDragging = false;
  let dragOffsetX = 0;
  let dragOffsetY = 0;

  headerElement?.addEventListener('mousedown', (e) => {
    if (isMaximized()) return;

    isDragging = true;
    dragOffsetX = e.clientX - (terminalContainer?.getBoundingClientRect().left || 0);
    dragOffsetY = e.clientY - (terminalContainer?.getBoundingClientRect().top || 0);

    // Añadir clase para indicar que se está arrastrando
    terminalContainer?.classList.add('cursor-grabbing');
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDragging || isMaximized()) return;

    const x = e.clientX - dragOffsetX;
    const y = e.clientY - dragOffsetY;

    if (terminalContainer) {
      // Asegurar que la terminal no se salga de la pantalla
      const maxX = window.innerWidth - (terminalContainer.offsetWidth || 0);
      const maxY = window.innerHeight - (terminalContainer.offsetHeight || 0);

      const boundedX = Math.max(0, Math.min(x, maxX));
      const boundedY = Math.max(0, Math.min(y, maxY));

      terminalContainer.style.left = `${boundedX}px`;
      terminalContainer.style.top = `${boundedY}px`;
      terminalContainer.style.right = 'auto';
      terminalContainer.style.bottom = 'auto';
      terminalContainer.classList.add('absolute');
      terminalContainer.classList.remove('fixed', 'bottom-4', 'right-4');
    }
  });

  document.addEventListener('mouseup', () => {
    isDragging = false;
    terminalContainer?.classList.remove('cursor-grabbing');
  });

  // Devolver una función para limpiar los event listeners si es necesario
  return function cleanupDraggable() {
    headerElement?.removeEventListener('mousedown', () => {});
    document.removeEventListener('mousemove', () => {});
    document.removeEventListener('mouseup', () => {});
  };
}

// Function to initialize terminal with welcome message
export function initTerminal(terminalOutput: HTMLElement | null, terminalInput: HTMLInputElement | null) {
  // Limpiar el contenido de la terminal
  if (terminalOutput) {
    terminalOutput.innerHTML = '';
  }

  // Mostrar mensaje de bienvenida
  const welcomeMessage = `
    <p class="terminal-text-green font-medium">¡Bienvenido a la terminal interactiva de Sergio Márquez!</p>
    <p class="terminal-text-gray mt-2">Escribe <span class="terminal-text-yellow">help</span> para ver los comandos disponibles.</p>
    <p class="terminal-text-gray-light text-xs mt-3">Pulsa <span class="terminal-text-blue">Ctrl+Alt+T</span> para abrir/cerrar la terminal.</p>
    <p class="terminal-text-gray-lighter text-xs mt-1">Pssst... ¿conoces el código Konami? <span class="terminal-text-white">↑↑↓↓←→←→BA</span></p>
  `;

  if (terminalOutput) {
    terminalOutput.innerHTML = welcomeMessage;
  }

  // Limpiar el input
  if (terminalInput) {
    terminalInput.value = '';
  }

  // Asegurar que el scroll esté en la parte inferior después de inicializar
  const terminalContent = terminalOutput?.parentElement;
  if (terminalContent) {
    requestAnimationFrame(() => {
      terminalContent.scrollTop = terminalContent.scrollHeight;
    });
  }
}
