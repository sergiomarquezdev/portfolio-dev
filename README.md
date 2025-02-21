# Portfolio de Sergio Márquez - sergiomarquez.dev

[![Deployment Status](https://github.com/sergiomarquezdev/portfolio-dev/actions/workflows/deploy.yml/badge.svg)](https://github.com/sergiomarquezdev/portfolio-dev/actions/workflows/deploy.yml)

Bienvenido al repositorio de mi portfolio personal, una aplicación web moderna y optimizada desarrollada con **Astro**. Este portfolio muestra mi experiencia como Desarrollador Full Stack, proyectos destacados y habilidades técnicas.

🌐 [Visitar Portfolio](https://sergiomarquez.dev)

## ✨ Características Principales

- 🎯 **Rendimiento Optimizado**: Construido con Astro para una carga ultra rápida
- 📱 **Diseño Responsive**: Adaptado a todos los dispositivos
- 🔍 **SEO Optimizado**: Con generación automática de sitemap
- 🚀 **CI/CD**: Despliegue automático con GitHub Actions
- 📊 **Datos Estructurados**: CV y experiencia en formato JSON para fácil mantenimiento
- 🌐 **Scripts Optimizados**: Integración con Partytown para mejor rendimiento

## 🛠️ Tecnologías Principales

- **Framework:**

  - [Astro](https://astro.build/) v5.2.4 - Framework web para sitios estáticos de alto rendimiento

- **Integraciones:**

  - [@astrojs/partytown](https://docs.astro.build/en/guides/integrations-guide/partytown/) v2.1.3 - Para optimización de scripts de terceros
  - [@astrojs/sitemap](https://docs.astro.build/en/guides/integrations-guide/sitemap/) v3.2.1 - Generación automática de sitemap
  - [@astrojs/check](https://docs.astro.build/en/guides/typescript/) v0.9.4 - Comprobación de tipos TypeScript

- **DevOps:**
  - GitHub Actions - CI/CD para despliegue automático
  - TypeScript v5.7.3 - Tipado estático para mayor robustez

## 📁 Estructura del Proyecto

```
portfolio-dev/
├── .github/
│   └── workflows/         # Configuraciones de CI/CD
├── public/
│   ├── img/              # Imágenes y recursos estáticos
│   ├── robots.txt        # Configuración para crawlers
│   └── favicon.ico       # Icono del sitio
├── src/
│   ├── components/       # Componentes reutilizables
│   ├── layouts/         # Plantillas de página
│   ├── pages/           # Páginas de la aplicación
│   ├── icons/           # Iconos SVG
│   ├── cv.d.ts          # Tipos para datos del CV
│   ├── env.d.ts         # Tipos de variables de entorno
│   └── types.d.ts       # Definiciones de tipos globales
├── cv.json              # Datos estructurados del CV
├── astro.config.mjs     # Configuración de Astro
├── package.json         # Dependencias y scripts
└── tsconfig.json        # Configuración de TypeScript
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

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye el proyecto para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run astro` - CLI de Astro para comandos adicionales

## 🔄 Despliegue Continuo

El proyecto utiliza GitHub Actions para el despliegue automático:

- Los cambios en la rama `main` activan el pipeline de despliegue
- Se ejecuta la build y las comprobaciones de tipos
- Se despliega automáticamente en el servidor de producción
- Se actualiza el sitio web en sergiomarquez.dev

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Consulta el archivo `LICENSE` para más detalles.

---

Desarrollado con ❤️ por [Sergio Márquez](https://github.com/sergiomarquezdev)
