/**
 * types.ts - Definiciones de tipos para el componente Terminal
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
