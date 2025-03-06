# Portfolio de Sergio Márquez - sergiomarquez.dev

<div align="center">
  <img src="https://img.shields.io/badge/Astro-5.3.1-orange" alt="Astro">
  <img src="https://img.shields.io/badge/TypeScript-5.7.3-blue" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Partytown-2.1.3-green" alt="Partytown">
  <img src="https://img.shields.io/badge/Sitemap-3.2.1-brightgreen" alt="Sitemap">
  <a href="https://github.com/sergiomarquezdev/portfolio-dev/actions/workflows/deploy.yml">
    <img src="https://github.com/sergiomarquezdev/portfolio-dev/actions/workflows/deploy.yml/badge.svg" alt="Deployment Status">
  </a>
  <br>
  <br>
  <strong>
    <a href="https://sergiomarquez.dev" target="_blank">Visitar Portfolio ↗</a>
  </strong>
</div>

## 📋 Tabla de contenidos

- [Descripción](#-descripción)
- [Características Principales](#-características-principales)
- [Demo](#-demo)
- [Stack Tecnológico](#️-stack-tecnológico)
- [Estructura del Proyecto](#-estructura-del-proyecto)
- [Inicio Rápido](#-inicio-rápido)
- [Scripts Disponibles](#-scripts-disponibles)
- [Flujo de Despliegue](#-flujo-de-despliegue)
- [Optimizaciones de Rendimiento](#-optimizaciones-de-rendimiento)
- [Animaciones y Experiencia de Usuario](#-animaciones-y-experiencia-de-usuario)
- [Terminal Interactiva](#-terminal-interactiva)
- [Licencia](#-licencia)
- [Contacto](#-contacto)

## 🎯 Descripción

Portfolio personal moderno y optimizado para desarrolladores, construido con **Astro** y **Tailwind CSS**. Diseñado para mostrar mi experiencia como Desarrollador Full Stack, proyectos destacados y habilidades técnicas con un enfoque en rendimiento, experiencia de usuario y SEO.

## ✨ Características Principales

<details>
<summary><strong>Rendimiento Optimizado</strong></summary>
<br>

- Construido con Astro 5.3.1 para una carga ultra rápida (<0.5s FCP)
- Optimización automática de imágenes y recursos estáticos
- Puntuación perfecta en Lighthouse (Performance, Accessibility, SEO)
- Uso de Partytown para scripts de terceros sin bloqueo
</details>

<details>
<summary><strong>Diseño Profesional</strong></summary>
<br>

- Interfaz minimalista y moderna con Tailwind CSS
- Diseño totalmente responsive (Mobile-first)
- Optimizado para experiencia móvil con controles adaptables
- Animaciones elegantes con CSS nativo y Intersection Observer
- Navegación intuitiva con secciones bien definidas
- Indicador de progreso de lectura
- Botón "Volver arriba" con aparición inteligente
- Barra de herramientas flotante con funciones de cambio de tema, activación de modo desarrollador y apertura de terminal
</details>

<details>
<summary><strong>Terminal Interactiva</strong></summary>
<br>

- Terminal completamente funcional integrada en la interfaz
- Comandos personalizados para explorar el portfolio
- Autocompletado de comandos con Tab
- Historial de comandos navegable con flechas arriba/abajo
- Efectos de escritura para una experiencia más inmersiva
- Soporte para atajos de teclado (Ctrl+Alt+T para abrir/cerrar)
- Modo desarrollador con efectos visuales especiales
- Terminal redimensionable, maximizable y arrastrable
- Huevo de pascua con código Konami (↑↓←→) que desbloquea un mini-juego
</details>

<details>
<summary><strong>Experiencia de Usuario Mejorada</strong></summary>
<br>

- Animaciones de entrada para elementos cuando entran en el viewport
- Resaltado automático de la sección activa en la navegación
- Transiciones suaves entre secciones
- Scroll padding para evitar que el header oculte el contenido
- Scroll automático en componentes interactivos
- Controles de navegación optimizados para interacción táctil
</details>

<details>
<summary><strong>Gestión de Datos y SEO</strong></summary>
<br>

- CV estructurado en formato JSON para mantenimiento sencillo
- Tipado estricto con TypeScript para mayor robustez
- Generación automática de sitemap
- Metadatos Open Graph y Twitter Cards
- Schema.org con JSON-LD
- Rutas semánticas y contenido accesible
</details>

<details>
<summary><strong>CI/CD y DevOps</strong></summary>
<br>

- Despliegue automático con GitHub Actions
- Comprobación de tipos TypeScript en build
- Optimización de assets durante la compilación
- Configuración avanzada para minificación CSS con LightningCSS
- Preservación de archivos .env durante el despliegue
</details>

## 🚀 Demo

Visita el portfolio en vivo: [sergiomarquez.dev](https://sergiomarquez.dev)

## 🛠️ Stack Tecnológico

### Core
- **[Astro](https://astro.build/)** v5.3.1 - Framework web para sitios estáticos de alto rendimiento
- **[TypeScript](https://www.typescriptlang.org/)** v5.7.3 - Superset de JavaScript tipado
- **[Tailwind CSS](https://tailwindcss.com/)** v3.4.17 - Framework CSS utilitario para diseño rápido

### Integraciones
- **[@astrojs/tailwind](https://docs.astro.build/en/guides/integrations-guide/tailwind/)** v6.0.0 - Integración oficial de Tailwind CSS
- **[@astrojs/partytown](https://docs.astro.build/en/guides/integrations-guide/partytown/)** v2.1.3 - Para optimización de scripts de terceros
- **[@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/)** v3.2.1 - Generación automática de sitemap
- **[@astrojs/check](https://docs.astro.build/en/guides/typescript/)** v0.9.4 - Comprobación de tipos TypeScript

### Optimización
- **[LightningCSS](https://lightningcss.dev/)** v1.29.1 - Minificación avanzada de CSS
- **[Terser](https://terser.org/)** v5.39.0 - Minificación avanzada de JavaScript
- **[PostCSS](https://postcss.org/)** v8.5.3 - Procesamiento de CSS
- **[Autoprefixer](https://github.com/postcss/autoprefixer)** v10.4.20 - Añade prefijos de navegador automáticamente

### DevOps
- **GitHub Actions** - CI/CD para despliegue automático
- **VPS propio con Nginx** - Hosting del sitio

### Herramientas de Calidad
- **ESLint** v9.21.0 - Linting de código
- **Prettier** v3.5.2 - Formateo de código

## 📂 Estructura del Proyecto

```
portfolio-dev/
├── .github/
│   └── workflows/         # Configuraciones de CI/CD (deploy.yml)
├── public/
│   ├── img/              # Imágenes y recursos estáticos
│   │   ├── robots.txt        # Configuración para crawlers
│   │   └── favicon.ico       # Icono del sitio
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── sections/     # Secciones principales del portfolio (Hero, About, etc.)
│   │   └── features/     # Componentes funcionales avanzados
│   │       ├── terminal/ # Componentes de la terminal interactiva
│   │       └── toolbar/  # Componentes de la barra de herramientas flotante
│   ├── layouts/          # Plantillas de página (Layout.astro)
│   ├── pages/            # Páginas de la aplicación (index.astro)
│   ├── styles/           # Estilos globales y utilidades CSS
│   ├── icons/            # Iconos SVG optimizados
│   ├── cv.d.ts           # Tipos para datos del CV
│   ├── env.d.ts          # Tipos de variables de entorno
│   └── types.d.ts        # Definiciones de tipos globales
├── cv.json               # Datos estructurados del CV
├── accessibility.config.js # Configuración para pruebas de accesibilidad
├── astro.config.mjs      # Configuración de Astro
├── tailwind.config.js    # Configuración de Tailwind CSS
├── postcss.config.js     # Configuración de PostCSS
├── package.json          # Dependencias y scripts
└── tsconfig.json         # Configuración de TypeScript
```

## 🚀 Inicio Rápido

1. **Clonar el repositorio:**

   ```bash
   git clone https://github.com/sergiomarquezdev/portfolio-dev.git
   cd portfolio-dev
   ```

2. **Instalar dependencias:**

   ```bash
   npm install
   ```

3. **Iniciar entorno de desarrollo:**

   ```bash
   npm run dev
   ```

4. **Abrir navegador:**
   Visita `http://localhost:4321`

## 📦 Scripts Disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo local en `localhost:4321` |
| `npm run build` | Comprueba tipos y construye el proyecto para producción |
| `npm run preview` | Previsualiza la build de producción localmente |
| `npm run check` | Ejecuta la comprobación de tipos de TypeScript |
| `npm run lint` | Ejecuta ESLint para verificar la calidad del código |
| `npm run lint-fix` | Corrige automáticamente problemas detectados por ESLint |
| `npm run format` | Formatea el código usando Prettier |

## 🔄 Flujo de Despliegue

El proyecto implementa Integración y Despliegue Continuo (CI/CD):

1. Los cambios en la rama `main` activan automáticamente el workflow de GitHub Actions
2. El proceso de CI/CD:
   - Comprueba la integridad del código con TypeScript
   - Construye la aplicación para producción
   - Prepara el servidor para el despliegue (preservando archivos .env)
   - Transfiere los archivos generados al VPS
   - Reinicia Nginx para aplicar los cambios
   - Verifica que el despliegue se ha completado correctamente
3. El sitio queda disponible en [sergiomarquez.dev](https://sergiomarquez.dev)

## 📊 Optimizaciones de Rendimiento

Este portfolio incorpora múltiples optimizaciones para garantizar la mejor experiencia:

- **HTML minificado** mediante la opción `compressHTML` de Astro
- **CSS minificado** usando LightningCSS para máxima eficiencia
- **JavaScript optimizado** con Terser, eliminando console.logs y optimizando tamaño
- **División de chunks** inteligente con Rollup
- **Precarga de fuentes** para evitar parpadeos de texto
- **Scripts de terceros** ejecutados con Partytown para no bloquear el renderizado
- **Animaciones optimizadas** que solo se activan cuando los elementos entran en el viewport
- **Componentes modulares** para mejor mantenibilidad y reutilización

## 🎭 Animaciones y Experiencia de Usuario

El portfolio incluye varias mejoras de UX para una experiencia más atractiva:

- **Animaciones de entrada** para elementos cuando entran en el viewport
- **Efectos de transición** suaves entre estados de elementos
- **Indicador de progreso de lectura** en la parte superior de la página
- **Resaltado automático** de la sección activa en la navegación
- **Botón "Volver arriba"** que aparece después de cierto scroll
- **Terminal interactiva** con efectos de escritura y comandos personalizados
- **Controles adaptativos** que se ajustan a diferentes dimensiones de pantalla

## 💻 Terminal Interactiva

Una de las características más destacadas es la terminal interactiva que permite a los visitantes explorar el portfolio de forma única:

- **Comandos disponibles:**
  - `help` - Muestra la lista de comandos disponibles
  - `about` - Muestra información personal y profesional
  - `skills` - Lista las habilidades técnicas por categorías
  - `projects` - Muestra los proyectos destacados
  - `contact` - Muestra información de contacto
  - `theme` - Cambia entre tema claro y oscuro
  - `clear` - Limpia la terminal
  - `exit` - Cierra la terminal
  - `matrix` - Activa/desactiva el modo desarrollador
  - `whoami` - Identifica al usuario
  - `konami` - Proporciona pistas sobre la secuencia secreta

- **Características avanzadas:**
  - **Autocompletado** - Presiona Tab para autocompletar comandos
  - **Historial** - Usa las flechas arriba/abajo para navegar por comandos anteriores
  - **Atajos de teclado** - Ctrl+Alt+T para abrir/cerrar la terminal
  - **Modo desarrollador** - Activa efectos visuales especiales
  - **Código Konami** - Secuencia ↑↓←→ que desbloquea un mini-juego

- **Personalización:**
  - Cambio de tema con el comando `theme dark` o `theme light`
  - Terminal redimensionable y maximizable
  - Arrastrable a cualquier posición en la pantalla

## 📝 Licencia

Este proyecto está licenciado bajo la Licencia MIT - vea el archivo [LICENSE](LICENSE) para más detalles.

## 📬 Contacto

Sergio Márquez - [@smarquezdev](https://twitter.com/smarquezdev) - contacto@sergiomarquez.dev

Enlace del proyecto: [https://github.com/sergiomarquezdev/portfolio-dev](https://github.com/sergiomarquezdev/portfolio-dev)

---

<div align="center">
  <sub>Hecho con ❤️ por <a href="https://sergiomarquez.dev">Sergio Márquez</a></sub>
</div>
