/**
 * game.ts - Implementación de juegos interactivos para la terminal
 *
 * Este módulo proporciona:
 * - Mini-juego principal de "atrapa el objetivo" desbloqueado con código Konami
 * - Juego de adivinar número disponible como comando directo
 * - Sistema de detector de código Konami (secuencia ↑↓←→)
 * - Recompensas visuales (modo Matrix avanzado) al completar los juegos
 * - Lógica adaptativa para diferentes dispositivos (desktop/móvil)
 *
 * Los juegos están diseñados para ser accesibles y proporcionar una
 * experiencia interactiva dentro del entorno de la terminal.
 */

// Terminal mini-game functionality

export function startGame(
  appendToTerminal: (text: string, className?: string, typeEffect?: boolean) => void,
  terminalOutput: HTMLElement | null
) {
  // Crear un elemento para el juego
  const gameContainer = document.createElement('div');
  gameContainer.className = 'mt-2 mb-4 p-2 rounded';
  gameContainer.style.backgroundColor = '#1f2937'; // Fondo oscuro fijo
  gameContainer.innerHTML = `
    <p class="text-center terminal-text-yellow mb-2">¡Mini-juego desbloqueado!</p>
    <div class="flex justify-between items-center mb-2">
      <div class="terminal-text-green font-medium">Objetivo: 5 puntos</div>
      <div id="game-score" class="terminal-text-white font-medium">Puntos: 0</div>
    </div>
    <div id="game-container" class="w-full h-48 relative overflow-hidden rounded" style="background-color: #111827;">
      <div id="game-player" class="absolute w-6 h-6 rounded-full" style="background-color: #10b981; bottom: 10px; left: 10px;"></div>
      <div id="game-goal" class="absolute w-6 h-6 rounded-full" style="background-color: #fbbf24; top: 10px; right: 10px;"></div>
      <div class="absolute bottom-2 left-2 text-xs terminal-text-white">Usa las flechas para mover</div>
      <div class="absolute bottom-2 right-2 text-xs terminal-text-white">ESC para salir</div>
      <div id="game-instruction" class="absolute top-2 left-0 w-full text-center text-xs terminal-text-green font-medium bg-black bg-opacity-40 py-1"
        style="transition: opacity 0.3s ease-out;">
        ¡Atrapa todas las esferas amarillas para descubrir el secreto!
      </div>
    </div>
  `;
  terminalOutput?.appendChild(gameContainer);
  if (terminalOutput) {
    terminalOutput.scrollTo(0, terminalOutput.scrollHeight);
  }

  // Iniciar el mini-juego
  const player = document.getElementById('game-player');
  const goal = document.getElementById('game-goal');
  const scoreDisplay = document.getElementById('game-score');
  const gameContainer2 = document.getElementById('game-container');

  if (player && goal && scoreDisplay && gameContainer2) {
    let playerX = 10;
    let playerY = 10;
    let score = 0;
    let gameActive = true;

    // Posicionar el objetivo en un lugar aleatorio
    function repositionGoal() {
      if (!gameContainer2 || !goal) return;

      const maxX = gameContainer2.clientWidth - 30;
      const maxY = gameContainer2.clientHeight - 30;
      const goalX = Math.floor(Math.random() * maxX) + 10;
      const goalY = Math.floor(Math.random() * maxY) + 10;
      goal.style.left = `${goalX}px`;
      goal.style.top = `${goalY}px`;
    }

    repositionGoal();

    // Manejar las teclas de flecha
    function handleGameKeys(e: KeyboardEvent) {
      if (!gameActive || !player || !goal || !scoreDisplay || !gameContainer2) return;

      // Salir del juego con ESC
      if (e.key === 'Escape') {
        gameActive = false;
        appendToTerminal('<span class="terminal-text-yellow">Juego cancelado. Puedes volver a iniciarlo con el comando "konami".</span>', '', true);
        document.removeEventListener('keydown', handleGameKeys);
        return;
      }

      const step = 5;
      const maxX = gameContainer2.clientWidth - 30;
      const maxY = gameContainer2.clientHeight - 30;

      switch (e.key) {
        case 'ArrowUp':
          playerY = Math.min(maxY, playerY + step);
          break;
        case 'ArrowDown':
          playerY = Math.max(0, playerY - step);
          break;
        case 'ArrowLeft':
          playerX = Math.max(0, playerX - step);
          break;
        case 'ArrowRight':
          playerX = Math.min(maxX, playerX + step);
          break;
      }

      player.style.bottom = `${playerY}px`;
      player.style.left = `${playerX}px`;

      // Comprobar colisión con el objetivo
      const playerRect = player.getBoundingClientRect();
      const goalRect = goal.getBoundingClientRect();

      if (
        playerRect.left < goalRect.right &&
        playerRect.right > goalRect.left &&
        playerRect.top < goalRect.bottom &&
        playerRect.bottom > goalRect.top
      ) {
        // Colisión detectada
        score++;
        scoreDisplay.textContent = `Puntos: ${score}`;
        repositionGoal();

        // Cambiar el color del jugador para indicar éxito
        player.style.backgroundColor = '#34d399'; // verde más brillante
        setTimeout(() => {
          if (player) {
            player.style.backgroundColor = '#10b981'; // volver al verde normal
          }
        }, 200);

        // Ocultar el mensaje de instrucción después del primer punto
        if (score === 1) {
          const instructionMessage = document.getElementById('game-instruction');
          if (instructionMessage) {
            instructionMessage.style.opacity = '0';
            setTimeout(() => {
              if (instructionMessage) {
                instructionMessage.style.display = 'none';
              }
            }, 300); // Esperar a que termine la transición de opacidad
          }
        }

        // Terminar el juego después de 5 puntos
        if (score >= 5) {
          gameActive = false;
          appendToTerminal('<span class="terminal-text-green">¡Felicidades! Has completado el mini-juego.</span>', '', true);
          appendToTerminal('<span class="terminal-text-yellow">Recompensa desbloqueada: Modo Matrix Avanzado</span>', '', true);

          // Activar el modo desarrollador con colores mejorados
          if (typeof window.toggleAdvancedCodeEffect === 'function') {
            window.toggleAdvancedCodeEffect();
            // Cambiar los colores del efecto Matrix para que sea más impresionante
            const canvas = document.getElementById('matrix-canvas') as HTMLCanvasElement;
            if (canvas) {
              canvas.classList.add('matrix-advanced');
              appendToTerminal('<span class="terminal-text-green">Modo Matrix Avanzado activado con colores mejorados.</span>', '', true);
            }
          }

          document.removeEventListener('keydown', handleGameKeys);
        }
      }
    }

    // Añadir el event listener para las teclas
    document.addEventListener('keydown', handleGameKeys);

    // Devolver una función para limpiar los event listeners
    return function cleanupGame() {
      document.removeEventListener('keydown', handleGameKeys);
      gameActive = false;
    };
  }

  return () => {}; // Función vacía si no se pudo iniciar el juego
}

// Código Konami simplificado: ↑↓←→
const konamiCode = [
  'ArrowUp',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight'
];

// Secuencia actual para comprobar el Konami Code
let konamiCodePosition = 0;

// Función para detectar si el dispositivo es móvil
function isMobileDevice(): boolean {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
         (window.innerWidth <= 768);  // También comprobamos el ancho de la pantalla
}

// Función para configurar la detección del código Konami
export function setupKonamiCodeDetector(
  toggleTerminal: () => boolean | undefined,
  isTerminalOpen: () => boolean | undefined
) {
  // No inicializar en dispositivos móviles
  if (isMobileDevice()) {
    return; // Salir de la función sin configurar nada
  }

  // Configurar un único event listener para detectar el código
  document.addEventListener('keydown', (e) => {
    // Comprobar si la tecla pulsada coincide con la siguiente en la secuencia
    if (e.key === konamiCode[konamiCodePosition]) {
      // Avanzar en la secuencia
      konamiCodePosition++;

      // Si se ha completado toda la secuencia
      if (konamiCodePosition === konamiCode.length) {
        // Reiniciar la secuencia
        konamiCodePosition = 0;

        // Activar el modo Matrix si existe
        if (typeof window.toggleMatrixEffect === 'function') {
          window.toggleMatrixEffect();
        }

        // Gestionar la terminal y el juego
        handleKonamiSuccess(toggleTerminal, isTerminalOpen);
      }
    } else {
      // Reiniciar la secuencia si hay un error
      konamiCodePosition = 0;
    }
  });
}

// Función auxiliar para manejar el éxito del código Konami
function handleKonamiSuccess(
  toggleTerminal: () => boolean | undefined,
  isTerminalOpen: () => boolean | undefined
) {
  // Si la terminal ya está abierta, añadir mensaje y activar juego
  if (isTerminalOpen()) {
    activateKonamiGame();
  } else {
    // Si la terminal no está abierta, abrirla primero
    toggleTerminal();

    // Esperar a que la terminal esté abierta
    setTimeout(activateKonamiGame, 300);
  }
}

// Función para activar el juego Konami
function activateKonamiGame() {
  const terminalOutput = document.getElementById('terminal-output');
  if (!terminalOutput) return;

  // Añadir mensaje especial
  const message = document.createElement('p');
  message.innerHTML = '<span class="terminal-text-green">¡Código Konami activado! Se ha habilitado el modo Matrix y el mini-juego.</span>';
  terminalOutput.appendChild(message);

  // Añadir instrucciones del juego
  const instructions = document.createElement('p');
  instructions.innerHTML = '<span class="terminal-text-yellow">Objetivo:</span> <span class="terminal-text-white">Alcanza el punto amarillo con tu círculo verde. Completa 5 niveles para desbloquear el modo Matrix avanzado.</span>';
  terminalOutput.appendChild(instructions);

  // Función para añadir texto a la terminal
  const appendToGameTerminal = (text: string, className: string = "") => {
    const p = document.createElement('p');
    if (className) p.className = className;
    p.innerHTML = text;
    terminalOutput.appendChild(p);

    // Asegurar scroll al final
    const content = document.getElementById('terminal-content');
    if (content) content.scrollTop = content.scrollHeight;
  };

  // Iniciar el juego
  startGame(appendToGameTerminal, terminalOutput);

  // Asegurar scroll al final
  const terminalContent = document.getElementById('terminal-content');
  if (terminalContent) {
    terminalContent.scrollTop = terminalContent.scrollHeight;
  }
}

// Juego bonus para la terminal
export function runMiniGame(appendToTerminal: (text: string, className?: string, clear?: boolean) => void) {
  // Implementación básica de un minijuego de adivinar un número
  const min = 1;
  const max = 100;
  const array = new Uint32Array(1);
  window.crypto.getRandomValues(array);
  const secretNumber = Math.floor(array[0] / (0xFFFFFFFF + 1) * (max - min + 1)) + min;
  let attempts = 0;
  let gameActive = true;

  // Instrucciones del juego
  appendToTerminal(
    '<span class="terminal-text-green">¡Bienvenido al juego de adivinar el número!</span>',
    '',
    true
  );
  appendToTerminal(
    `<span class="terminal-text-white">He pensado un número entre ${min} y ${max}.</span>`,
    '',
    false
  );
  appendToTerminal(
    '<span class="terminal-text-white">Escribe un número y pulsa Enter para adivinar.</span>',
    '',
    false
  );
  appendToTerminal(
    '<span class="terminal-text-blue">Escribe "salir" para terminar el juego.</span>',
    '',
    false
  );

  // Función para procesar los intentos
  return function processGuess(input: string): boolean {
    if (!gameActive) return false;

    // Opción para salir del juego
    if (input.toLowerCase() === 'salir' || input.toLowerCase() === 'exit' || input.toLowerCase() === 'quit') {
      appendToTerminal(
        `<span class="terminal-text-yellow">Juego terminado. El número era: ${secretNumber}</span>`,
        '',
        false
      );
      gameActive = false;
      return false;
    }

    const guess = parseInt(input, 10);
    attempts++;

    // Comprobar si es un número válido
    if (isNaN(guess)) {
      appendToTerminal(
        '<span class="terminal-text-red">Por favor, introduce un número válido.</span>',
        '',
        false
      );
      return true;
    }

    // Comprobar si está fuera de rango
    if (guess < min || guess > max) {
      appendToTerminal(
        `<span class="terminal-text-red">El número debe estar entre ${min} y ${max}.</span>`,
        '',
        false
      );
      return true;
    }

    // Comprobar el resultado
    if (guess === secretNumber) {
      appendToTerminal(
        `<span class="terminal-text-green">¡Felicidades! Has adivinado el número en ${attempts} intentos.</span>`,
        '',
        false
      );
      gameActive = false;
      return false;
    } else if (guess < secretNumber) {
      appendToTerminal(
        '<span class="terminal-text-blue">El número es mayor. Inténtalo de nuevo.</span>',
        '',
        false
      );
    } else {
      appendToTerminal(
        '<span class="terminal-text-blue">El número es menor. Inténtalo de nuevo.</span>',
        '',
        false
      );
    }

    return true;
  };
}

// Tipos para TypeScript
declare global {
  interface Window {
    toggleMatrixEffect?: () => boolean;
    toggleCodeEffect?: () => boolean;
    toggleAdvancedCodeEffect?: () => boolean;
  }
}
