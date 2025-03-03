# Portfolio de Sergio Márquez - sergiomarquez.dev

![Astro](https://img.shields.io/badge/Astro-5.3.1-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7.3-blue)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.17-38B2AC)
![Partytown](https://img.shields.io/badge/Partytown-2.1.3-green)
![Sitemap](https://img.shields.io/badge/Sitemap-3.2.1-brightgreen)
[![Deployment Status](https://github.com/sergiomarquezdev/portfolio-dev/actions/workflows/deploy.yml/badge.svg)](https://github.com/sergiomarquezdev/portfolio-dev/actions/workflows/deploy.yml)

## 🎯 Descripción

Portfolio personal moderno y optimizado para desarrolladores, construido con **Astro** y **Tailwind CSS**. Diseñado para mostrar mi experiencia como Desarrollador Full Stack, proyectos destacados y habilidades técnicas con un enfoque en rendimiento, experiencia de usuario y SEO.

🌐 [Visitar Portfolio](https://sergiomarquez.dev)

## ✨ Características Principales

- **Rendimiento Optimizado**
  - Construido con Astro 5.3.1 para una carga ultra rápida (<0.5s FCP)
  - Optimización automática de imágenes y recursos estáticos
  - Puntuación perfecta en Lighthouse (Performance, Accessibility, SEO)
  - Uso de Partytown para scripts de terceros sin bloqueo

- **Diseño Profesional**
  - Interfaz minimalista y moderna con Tailwind CSS
  - Diseño totalmente responsive (Mobile-first)
  - Optimizado para experiencia móvil con controles adaptables
  - Animaciones elegantes con CSS nativo y Intersection Observer
  - Navegación intuitiva con secciones bien definidas
  - Indicador de progreso de lectura
  - Botón "Volver arriba" con aparición inteligente
  - Barra de herramientas flotante con funciones de cambio de tema, activación de modo desarrollador y apertura de terminal

- **Terminal Interactiva**
  - Terminal completamente funcional integrada en la interfaz
  - Comandos personalizados para explorar el portfolio (help, about, skills, projects, contact)
  - Autocompletado de comandos con Tab
  - Historial de comandos navegable con flechas arriba/abajo
  - Efectos de escritura para una experiencia más inmersiva
  - Soporte para atajos de teclado (Ctrl+Alt+T para abrir/cerrar)
  - Modo desarrollador con efectos visuales especiales
  - Terminal redimensionable, maximizable y arrastrable
  - Huevo de pascua con código Konami (↑↓←→) que desbloquea un mini-juego con interfaz adaptativa

- **Experiencia de Usuario Mejorada**
  - Animaciones de entrada para elementos cuando entran en el viewport
  - Resaltado automático de la sección activa en la navegación
  - Transiciones suaves entre secciones
  - Scroll padding para evitar que el header oculte el contenido al navegar
  - Scroll automático en componentes interactivos
  - Controles de navegación optimizados para interacción táctil

- **Gestión de Datos**
  - CV estructurado en formato JSON para mantenimiento sencillo
  - Tipado estricto con TypeScript para mayor robustez
  - Interfaces bien definidas para todas las secciones

- **SEO Optimizado**
  - Generación automática de sitemap
  - Metadatos Open Graph y Twitter Cards
  - Schema.org con JSON-LD
  - Rutas semánticas y contenido accesible

- **CI/CD y DevOps**
  - Despliegue automático con GitHub Actions
  - Comprobación de tipos TypeScript en build
  - Optimización de assets durante la compilación
  - Configuración avanzada para minificación CSS con LightningCSS
  - Preservación de archivos .env durante el despliegue

- **Accesibilidad**
  - Configuración para pruebas de accesibilidad (WCAG 2.0 AA)
  - Atributos ARIA correctamente implementados
  - Estructura semántica HTML5
  - Contraste de colores adecuado

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
│   ├── robots.txt        # Configuración para crawlers
│   └── favicon.ico       # Icono del sitio
├── src/
│   ├── components/       # Componentes reutilizables
│   │   ├── sections/     # Secciones principales del portfolio (Hero, About, etc.)
│   │   └── features/     # Componentes funcionales avanzados
│   │       ├── terminal/ # Componentes de la terminal interactiva
│   │       │   ├── Terminal.astro    # Componente principal de la terminal
│   │       │   ├── commands.ts       # Procesamiento de comandos
│   │       │   ├── game.ts           # Mini-juego y código Konami
│   │       │   ├── styles.css        # Estilos específicos de la terminal
│   │       │   ├── types.ts          # Tipos e interfaces para la terminal
│   │       │   └── utils.ts          # Funciones de utilidad para la terminal
│   │       └── toolbar/  # Componentes de la barra de herramientas flotante
│   │           ├── FloatingToolbar.astro  # Componente principal de la barra flotante
│   │           ├── styles.css        # Estilos específicos de la barra de herramientas
│   │           └── utils/            # Funciones de utilidad para la barra flotante
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
- **Arquitectura refactorizada** con separación clara de:
  - Estilos en archivos CSS específicos por componente
  - Lógica de utilidades en carpetas dedicadas
  - Estructura basada en eventos para comunicación entre componentes

## 🎭 Animaciones y Experiencia de Usuario

El portfolio incluye varias mejoras de UX para una experiencia más atractiva:

- **Animaciones de entrada** para elementos cuando entran en el viewport
- **Efectos de transición** suaves entre estados de elementos
- **Indicador de progreso de lectura** en la parte superior de la página
- **Resaltado automático** de la sección activa en la navegación
- **Botón "Volver arriba"** que aparece después de cierto scroll
- **Scroll padding** para evitar que el header fijo oculte el contenido al navegar
- **Terminal interactiva** con efectos de escritura y comandos personalizados
- **Scroll automático** en componentes interactivos para mejor usabilidad
- **Controles adaptativos** que se ajustan a diferentes dimensiones de pantalla
- **Transiciones inteligentes** en elementos interactivos según el contexto de uso
- **Interfaz contextual** que se adapta al progreso del usuario

## 💻 Terminal Interactiva

Una de las características más destacadas es la terminal interactiva que permite a los visitantes explorar el portfolio de forma única:

- **Comandos disponibles:**
  - `help` - Muestra la lista de comandos disponibles
  - `about` - Muestra información personal y profesional
  - `skills` - Lista las habilidades técnicas por categorías
  - `projects` - Muestra los proyectos destacados
  - `contact` - Muestra información de contacto
  - `clear` - Limpia la terminal
  - `exit` - Cierra la terminal

- **Características avanzadas:**
  - **Autocompletado** - Presiona Tab para autocompletar comandos
  - **Historial** - Usa las flechas arriba/abajo para navegar por comandos anteriores
  - **Atajos de teclado** - Ctrl+Alt+T para abrir/cerrar la terminal
  - **Modo desarrollador** - Activa efectos visuales especiales
  - **Interfaz personalizable** - Terminal redimensionable, maximizable y arrastrable
  - **Código Konami** - Secuencia ↑↓←→ que desbloquea un mini-juego con interfaz dinámica:
    - Instrucciones que desaparecen automáticamente tras el primer punto
    - Feedback visual inmediato al conseguir objetivos
    - Recompensa especial al completar 5 niveles (activación automática del modo Matrix avanzado)
  - **Retroalimentación visual** - Respuestas adaptadas al contexto móvil/desktop
  - **Diseño responsivo** - Se adapta perfectamente a diferentes tamaños de pantalla
  - **Experiencia progresiva** - La interfaz evoluciona según la interacción del usuario

## 📱 Optimización Móvil

El portfolio está completamente optimizado para dispositivos móviles con especial atención a la experiencia del usuario:

- **Diseño Mobile-First:** Desarrollado priorizando la experiencia en dispositivos móviles
- **Navegación adaptativa:** El header se adapta perfectamente a pantallas pequeñas con un menú móvil accesible
- **Controles táctiles:** Footer con controles de navegación optimizados para interacción táctil
- **Espaciado optimizado:** Cuidadosa distribución de elementos con espaciado adaptativo según el tamaño de pantalla
- **Rendimiento:** Carga optimizada de recursos para conexiones móviles
- **Gestos táctiles:** Soporte para eventos touch en componentes interactivos
- **Visibilidad inteligente:** Controles que aparecen/desaparecen según la interacción del usuario

## 🔍 SEO y Accesibilidad

El proyecto está optimizado para motores de búsqueda y accesibilidad:

- **Meta tags** completos para SEO
- **Open Graph** y Twitter Cards para compartir en redes sociales
- **Schema.org** con JSON-LD para datos estructurados
- **Etiquetas ARIA** para mejorar la navegación con lectores de pantalla
- **Configuración de accesibilidad** para pruebas automatizadas según WCAG 2.0 AA
- **Tipografía optimizada** con Inter para texto y Montserrat para encabezados
- **Contraste adecuado** para asegurar la legibilidad en todos los elementos

## 🎨 Personalización

Para personalizar este portfolio para tu uso:

1. Actualiza el archivo `cv.json` con tu información personal y profesional
2. Reemplaza las imágenes en `/public/img/`
3. Modifica los colores y estilos en `tailwind.config.js` y `src/styles/global.css`
4. Actualiza la configuración en `astro.config.mjs`
5. Adapta las pruebas de accesibilidad en `accessibility.config.js`
6. Personaliza los comandos de la terminal en `src/components/features/terminal/commands.ts`
7. Ajusta los componentes responsivos en `src/components/sections/` para adaptar el espaciado a tu contenido
8. Verifica la experiencia móvil con las herramientas de desarrollo del navegador

### 🔧 Ajustes para Experiencia Móvil

Para optimizar la experiencia en dispositivos móviles:

- Comprueba el diseño en múltiples tamaños de pantalla (320px-768px)
- Ajusta los valores de padding/margin en media queries para tu contenido específico
- Prueba la usabilidad de los controles navegables en dispositivos táctiles reales
- Verifica que los tamaños de fuente sean legibles en pantallas pequeñas
- Asegúrate de que los elementos interactivos tengan suficiente área táctil (mínimo 44x44px)

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

## 📧 Contacto

Sergio Márquez

- Twitter/X: [@smarquezdev](https://twitter.com/smarquezdev)
- Email: sergiomarquezdev@gmail.com
- Web: [sergiomarquez.dev](https://sergiomarquez.dev)
- LinkedIn: [Sergio Márquez Pérez](https://www.linkedin.com/in/sergio-marquez-perez/)
- GitHub: [sergiomarquezdev](https://github.com/sergiomarquezdev/)

---

Desarrollado con ❤️ por [Sergio Márquez](https://github.com/sergiomarquezdev)
