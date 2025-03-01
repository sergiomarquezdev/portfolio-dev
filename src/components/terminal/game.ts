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
    <div id="game-container" class="w-full h-40 relative overflow-hidden rounded" style="background-color: #111827;">
      <div id="game-player" class="absolute w-6 h-6 rounded-full" style="background-color: #10b981; bottom: 10px; left: 10px;"></div>
      <div id="game-goal" class="absolute w-6 h-6 rounded-full" style="background-color: #fbbf24; top: 10px; right: 10px;"></div>
      <div class="absolute bottom-2 left-2 text-xs terminal-text-white">Usa las flechas para mover</div>
      <div class="absolute bottom-2 right-2 text-xs terminal-text-white">ESC para salir</div>
      <div id="game-score" class="absolute top-2 right-2 text-xs terminal-text-white">Puntos: 0</div>
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

        // Terminar el juego después de 10 puntos
        if (score >= 10) {
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

// Detector del código Konami
export function setupKonamiCodeDetector(
  toggleTerminal: () => void,
  isTerminalOpen: () => boolean,
  terminalInput: HTMLInputElement | null
) {
  const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
  let konamiIndex = 0;

  function handleKonamiKeydown(e: KeyboardEvent) {
    // Comprobar si la tecla pulsada coincide con la siguiente del código Konami
    if (e.key.toLowerCase() === konamiCode[konamiIndex].toLowerCase()) {
      konamiIndex++;

      // Si se ha completado la secuencia
      if (konamiIndex === konamiCode.length) {
        // Reiniciar el índice
        konamiIndex = 0;

        // Abrir la terminal si no está abierta
        if (!isTerminalOpen()) {
          toggleTerminal();
        }

        // Ejecutar el comando konami
        setTimeout(() => {
          if (terminalInput) {
            terminalInput.value = 'konami';
            const event = new KeyboardEvent('keydown', { key: 'Enter' });
            terminalInput.dispatchEvent(event);
          }
        }, 500);
      }
    } else {
      // Reiniciar la secuencia si se pulsa una tecla incorrecta
      konamiIndex = 0;
    }
  }

  document.addEventListener('keydown', handleKonamiKeydown);

  // Devolver una función para eliminar el event listener si es necesario
  return function cleanupKonamiDetector() {
    document.removeEventListener('keydown', handleKonamiKeydown);
  };
}
