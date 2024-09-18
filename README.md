# Proyecto Portfolio de Sergio Márquez

Bienvenido al repositorio del proyecto **Portfolio de Sergio Márquez**, una aplicación web desarrollada con **Astro** que muestra mis habilidades, experiencia y proyectos como Desarrollador Full Stack.

## Tecnologías Utilizadas

- **Frontend:**
  - **Astro**: Framework para construir aplicaciones web rápidas y optimizadas.

- **Backend:**
  - **Node.js**: Entorno de ejecución para JavaScript en el servidor.
  - **Express.js**: Framework para construir aplicaciones web en Node.js.
  - **PostgreSQL**: Sistema de gestión de bases de datos relacional.

- **DevOps:**
  - **Github Actions**: Integración y entrega continua para automatizar el despliegue.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

- **src/**: Contiene el código fuente de la aplicación.
  - **components/**: Componentes reutilizables de la interfaz.
  - **layouts/**: Plantillas de diseño para las páginas.
  - **pages/**: Páginas de la aplicación.
  - **icons/**: Iconos utilizados en la interfaz.

- **public/**: Archivos estáticos que se sirven directamente.

- **.github/**: Configuraciones para GitHub Actions.

- **README.md**: Documentación del proyecto.

- **package.json**: Dependencias y scripts del proyecto.

- **cv.json**: Datos estructurados sobre mi currículum.

- **tsconfig.json**: Configuración de TypeScript.

- **astro.config.mjs**: Configuración de Astro.

## Instalación

Para ejecutar el proyecto localmente, sigue estos pasos:

1. Clona el repositorio:
   ```bash
   git clone https://github.com/sergiomarquezdev/portfolio-dev.git
   cd portfolio-dev
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Abre tu navegador y visita `http://localhost:3000` para ver la aplicación en acción.

## Despliegue

El proyecto está configurado para desplegarse automáticamente en un servidor VPS utilizando GitHub Actions. Cada vez que se realiza un push a la rama `main`, se ejecuta un flujo de trabajo que:

1. Clona el código.
2. Instala las dependencias.
3. Construye la aplicación.
4. Despliega los archivos en el servidor.
5. Reinicia el servidor Nginx.
