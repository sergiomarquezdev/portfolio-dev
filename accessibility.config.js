// Configuración para verificaciones de accesibilidad
// Para usar con pa11y o herramientas similares

export default {
  standard: "WCAG2AA", // Nivel de conformidad WCAG 2.0 AA
  timeout: 30000, // Tiempo máximo para cargar la página (30 segundos)
  wait: 1000, // Esperar 1 segundo antes de ejecutar pruebas
  ignore: [
    // Ignorar advertencias que no aplican
    "WCAG2AA.Principle1.Guideline1_4.1_4_3.G18.Fail",
    // Personaliza según tus necesidades
  ],
  chromeLaunchConfig: {
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--disable-gpu",
      "--window-size=1920,1080",
    ],
  },
  includeNotices: false, // No incluir notificaciones en resultados
  includeWarnings: true, // Incluir advertencias en resultados
  log: {
    debug: process.env.NODE_ENV !== "production",
    error: console.error,
    info: process.env.NODE_ENV !== "production" ? console.warn : () => { },
  },
  urls: [
    // Lista de URLs para verificar
    "https://sergiomarquez.dev/",
    // Añade más URLs específicas según sea necesario
  ],
  // Acciones para realizar antes de las pruebas
  // Como navegar a ciertas partes de la página
  actions: [
    // 'set field #search to portfolio',
    // 'click element #submit',
    // 'wait for element #results to be visible'
  ],
};
