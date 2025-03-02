/**
 * index.ts - Sistema centralizado de iconos para el portfolio
 *
 * Todos los iconos del proyecto están accesibles desde este único punto de importación,
 * organizados por categorías para facilitar su identificación y mantenimiento.
 *
 * Esta estructura simplificada facilita:
 * 1. Importación con una sola línea en componentes consumidores
 * 2. Mantenimiento centralizado de los iconos del proyecto
 * 3. Consistencia visual en toda la aplicación
 */

// Definición de tipos relacionados con iconos
export type SocialIcon = Record<string, any>;

// UI Icons
export { default as SunIcon } from './ui/SunIcon.astro';
export { default as MoonIcon } from './ui/MoonIcon.astro';
export { default as CodeIcon } from './ui/CodeIcon.astro';
export { default as TerminalIcon } from './ui/TerminalIcon.astro';
export { default as MenuIcon } from './ui/MenuIcon.astro';
export { default as ArrowUpIcon } from './ui/ArrowUpIcon.astro';
export { default as MinimizeIcon } from './ui/MinimizeIcon.astro';
export { default as MaximizeIcon } from './ui/MaximizeIcon.astro';
export { default as CloseIcon } from './ui/CloseIcon.astro';

// Tech Icons
export { default as ReactIcon } from './tech/react.astro';
export { default as VueIcon } from './tech/vue.astro';
export { default as AngularIcon } from './tech/angular.astro';
export { default as SpringIcon } from './tech/spring.astro';
export { default as TypeScriptIcon } from './tech/typescript.astro';
export { default as JavaScriptIcon } from './tech/javascript.astro';
export { default as NodeIcon } from './tech/node.astro';
export { default as JavaIcon } from './tech/java.astro';
export { default as PythonIcon } from './tech/python.astro';
export { default as GoIcon } from './tech/go.astro';
export { default as DockerIcon } from './tech/docker.astro';
export { default as KubernetesIcon } from './tech/kubernetes.astro';
export { default as OracleSQLIcon } from './tech/oraclesql.astro';
export { default as PostgreSQLIcon } from './tech/postgresql.astro';
export { default as MySQLIcon } from './tech/mysql.astro';
export { default as MongoDBIcon } from './tech/mongodb.astro';
export { default as FirebaseIcon } from './tech/firebase.astro';
export { default as AstroIcon } from './tech/astrosvg.astro';
export { default as CICDIcon } from './tech/cicd.astro';

// Social Icons
export { default as GitHubIcon } from './social/GitHub.astro';
export { default as LinkedInIcon } from './social/LinkedIn.astro';
export { default as XIcon } from './social/X.astro';
export { default as MailIcon } from './social/Mail.astro';
export { default as WorldMapIcon } from './social/WorldMap.astro';
export { default as CertificateIcon } from './social/Certificate.astro';
export { default as BlogIcon } from './social/Blog.astro';
