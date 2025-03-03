/**
 * toolbar-utils.ts - Utilidades para la barra de herramientas flotante
 *
 * Este módulo proporciona:
 * - Definiciones de tipos e interfaces para la barra de herramientas
 * - Funciones para manejar la visibilidad y comportamiento de la barra
 * - Sistema de eventos personalizado para la comunicación entre componentes
 *
 * @author Portfolio Dev Team
 * @version 1.0.0
 */

// Tipos e interfaces
export interface ToolbarState {
  visible: boolean;
  userInteracting: boolean;
  lastScrollY: number;
}

export interface ToolbarConfig {
  scrollThreshold: number;
  inactivityDelay: number;
  leftThreshold: number;
  bottomThreshold: number;
}

export type ToolbarPosition = 'left' | 'bottom';

// Interfaz para la API pública de la Toolbar
export interface ToolbarAPI {
  show: () => void;
  hide: () => void;
  toggle: () => void;
  getState: () => ToolbarState;
  initialize: () => void;
}

// Constantes para eventos de la barra de herramientas
export const TOOLBAR_EVENTS = {
  TOGGLE_THEME: 'toolbar:toggle-theme',
  TOGGLE_DEV_MODE: 'toolbar:toggle-dev-mode',
  TOGGLE_TERMINAL: 'toolbar:toggle-terminal',
  VISIBILITY_CHANGED: 'toolbar:visibility-changed',
};

// Estado por defecto
const defaultState: ToolbarState = {
  visible: true,
  userInteracting: false,
  lastScrollY: 0,
};

// Configuración por defecto
const defaultConfig: ToolbarConfig = {
  scrollThreshold: 20,
  inactivityDelay: 3000,
  leftThreshold: 50,
  bottomThreshold: 50,
};

/**
 * Determinar si estamos en un dispositivo móvil
 * @returns true si el ancho de la ventana es menor que 768px
 */
export function isMobile(): boolean {
  return window.innerWidth < 768;
}

/**
 * Inicializar la barra de herramientas flotante
 * @param toolbarId - ID del elemento de la barra de herramientas
 * @param customConfig - Configuración personalizada (opcional)
 * @returns Objeto con métodos para controlar la barra
 */
export function initToolbar(
  toolbarId: string = 'floating-toolbar',
  customConfig: Partial<ToolbarConfig> = {}
): ToolbarAPI | undefined {
  // Obtener el elemento de la barra de herramientas
  const floatingToolbar = document.getElementById(toolbarId);
  if (!floatingToolbar) {
    console.error(`Elemento con ID "${toolbarId}" no encontrado`);
    return undefined;
  }

  // Estado de la barra de herramientas
  const state: ToolbarState = { ...defaultState };

  // Combinar la configuración por defecto con la personalizada
  const config: ToolbarConfig = { ...defaultConfig, ...customConfig };

  // Variables para temporizadores
  let hideTimeout: number | null = null;
  let scrollTimer: number | null = null;

  /**
   * Posición actual de la barra (izquierda en desktop, abajo en móvil)
   * @returns 'left' para desktop, 'bottom' para móvil
   */
  const getPosition = (): ToolbarPosition => {
    return isMobile() ? 'bottom' : 'left';
  };

  /**
   * Ocultar la barra de herramientas
   */
  const hideControls = () => {
    if (state.visible) {
      if (getPosition() === 'bottom') {
        floatingToolbar.classList.remove('opacity-100', 'translate-y-0');
        floatingToolbar.classList.add('opacity-0', 'translate-y-16');
      } else {
        floatingToolbar.classList.remove('opacity-100', 'translate-x-0');
        floatingToolbar.classList.add('opacity-0', '-translate-x-16');
      }

      state.visible = false;
      dispatchToolbarEvent(TOOLBAR_EVENTS.VISIBILITY_CHANGED, { visible: false });
    }
  };

  /**
   * Mostrar la barra de herramientas
   */
  const showControls = () => {
    if (!state.visible) {
      if (getPosition() === 'bottom') {
        floatingToolbar.classList.remove('opacity-0', 'translate-y-16');
        floatingToolbar.classList.add('opacity-100', 'translate-y-0');
      } else {
        floatingToolbar.classList.remove('opacity-0', '-translate-x-16');
        floatingToolbar.classList.add('opacity-100', 'translate-x-0');
      }

      state.visible = true;
      dispatchToolbarEvent(TOOLBAR_EVENTS.VISIBILITY_CHANGED, { visible: true });
    }

    // Configurar temporizador para ocultar después de inactividad
    resetHideTimer();
  };

  /**
   * Resetear el temporizador de ocultación
   */
  const resetHideTimer = () => {
    // Limpiar el temporizador existente si hay uno
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      hideTimeout = null;
    }

    // Configurar nuevo temporizador
    hideTimeout = setTimeout(() => {
      // Ocultar si no hay interacción del usuario, independientemente de la posición del scroll
      if (!state.userInteracting) {
        hideControls();
      }
    }, config.inactivityDelay) as unknown as number;
  };

  /**
   * Actualizar la visibilidad según el scroll
   */
  const updateVisibility = () => {
    const currentScrollY = window.scrollY;

    // Si está en la parte superior, mostrar inicialmente
    if (currentScrollY < 100) {
      showControls();
    }
    else if (Math.abs(currentScrollY - state.lastScrollY) > config.scrollThreshold) {
      // Si hay un cambio significativo en el scroll
      if (currentScrollY > state.lastScrollY) {
        // Scrolling hacia abajo - ocultar
        hideControls();
      } else {
        // Scrolling hacia arriba - mostrar
        showControls();
      }
      state.lastScrollY = currentScrollY;
    }
  };

  /**
   * Disparar un evento personalizado de la barra de herramientas
   * @param eventName - Nombre del evento
   * @param detail - Datos adicionales para el evento
   */
  const dispatchToolbarEvent = (eventName: string, detail: Record<string, any> = {}) => {
    const event = new CustomEvent(eventName, {
      detail: { ...detail, state: { ...state } },
      bubbles: true
    });
    document.dispatchEvent(event);
  };

  // Configurar listeners para los botones
  const setupButtonListeners = () => {
    // Botón para cambiar tema
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        dispatchToolbarEvent(TOOLBAR_EVENTS.TOGGLE_THEME);
      });
    }

    // Botón para activar modo desarrollador
    const devModeToggle = document.getElementById('dev-mode-toggle');
    if (devModeToggle) {
      devModeToggle.addEventListener('click', () => {
        dispatchToolbarEvent(TOOLBAR_EVENTS.TOGGLE_DEV_MODE);
      });
    }

    // Botón para abrir la terminal
    const terminalToggle = document.getElementById('terminal-toggle');
    if (terminalToggle) {
      terminalToggle.addEventListener('click', () => {
        dispatchToolbarEvent(TOOLBAR_EVENTS.TOGGLE_TERMINAL);
      });
    }
  };

  // Configurar listeners para eventos de interacción
  const setupInteractionListeners = () => {
    // Detectar cuando el usuario interactúa con los controles
    floatingToolbar.addEventListener('mouseenter', () => {
      state.userInteracting = true;
      showControls();
    });

    floatingToolbar.addEventListener('mouseleave', () => {
      state.userInteracting = false;
      resetHideTimer();
    });

    // Detectar toques en dispositivos móviles
    floatingToolbar.addEventListener('touchstart', () => {
      state.userInteracting = true;
      showControls();
    });

    floatingToolbar.addEventListener('touchend', () => {
      state.userInteracting = false;
      resetHideTimer();
    });

    // También mostrar cuando el mouse se mueve por las zonas sensibles
    document.addEventListener('mousemove', (e) => {
      if (getPosition() === 'left') {
        // En desktop, mostrar cuando el mouse está en la parte izquierda
        if (e.clientX < config.leftThreshold) {
          showControls();
        }
      } else {
        // En móvil, mostrar cuando el mouse está en la parte inferior
        const bottomThreshold = window.innerHeight - config.bottomThreshold;
        if (e.clientY > bottomThreshold) {
          showControls();
        }
      }
    });

    // También responder a eventos touch en la parte apropiada en móviles
    document.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        const touch = e.touches[0];

        if (getPosition() === 'bottom') {
          // En móvil, detectar toques en la parte inferior
          const bottomThreshold = window.innerHeight - config.bottomThreshold;
          if (touch.clientY > bottomThreshold) {
            showControls();
          }
        } else {
          // En desktop, detectar toques en la parte izquierda
          if (touch.clientX < config.leftThreshold) {
            showControls();
          }
        }
      }
    });

    // Listener para el evento scroll
    window.addEventListener('scroll', () => {
      if (scrollTimer) {
        clearTimeout(scrollTimer);
      }

      scrollTimer = setTimeout(() => {
        updateVisibility();
        resetHideTimer();
      }, 10) as unknown as number;
    });

    // Función para manejar cambios de tamaño de pantalla
    window.addEventListener('resize', () => {
      // Mostrar siempre al redimensionar para evitar problemas de visibilidad
      showControls();
    });
  };

  // Inicializar
  const initialize = () => {
    setupButtonListeners();
    setupInteractionListeners();
    updateVisibility();
    resetHideTimer();
  };

  // API pública
  return {
    show: showControls,
    hide: hideControls,
    toggle: () => state.visible ? hideControls() : showControls(),
    getState: () => ({ ...state }),
    initialize
  };
}

/**
 * Escuchar eventos de la barra de herramientas
 * @param eventName - Nombre del evento a escuchar
 * @param callback - Función a ejecutar cuando ocurra el evento
 */
export function listenToToolbarEvent(eventName: string, callback: (event: CustomEvent) => void): void {
  document.addEventListener(eventName, callback as EventListener);
}

/**
 * Marcar el botón de modo desarrollador como activo o inactivo
 * @param active - Si el modo está activo o no
 */
export function setDevModeButtonState(active: boolean): void {
  const devModeToggle = document.getElementById('dev-mode-toggle');
  if (devModeToggle) {
    if (active) {
      devModeToggle.classList.add('active-dev-mode');
      devModeToggle.setAttribute('title', 'Desactivar modo desarrollador');
    } else {
      devModeToggle.classList.remove('active-dev-mode');
      devModeToggle.setAttribute('title', 'Activar modo desarrollador');
    }
  }
}
