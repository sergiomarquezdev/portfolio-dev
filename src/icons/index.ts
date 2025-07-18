// UI Icons
export { default as MenuIcon } from "./ui/MenuIcon.astro";
export { default as ArrowUpIcon } from "./ui/ArrowUpIcon.astro";

// Tech Icons
export { default as Spring } from "./tech/spring.astro";
export { default as Node } from "./tech/node.astro";
export { default as Java } from "./tech/java.astro";
export { default as Python } from "./tech/python.astro";
export { default as Go } from "./tech/go.astro";
export { default as Docker } from "./tech/docker.astro";
export { default as Kubernetes } from "./tech/kubernetes.astro";
export { default as PostgreSQL } from "./tech/postgresql.astro";
export { default as MongoDB } from "./tech/mongodb.astro";
export { default as CICD } from "./tech/cicd.astro";
export { default as Ai } from "./tech/ai.astro";
export { default as LLMOps } from "./tech/llmops.astro";
export { default as N8n } from "./tech/n8n.astro";
export { default as GCP } from "./tech/gcp.astro";
export { default as FastAPI } from "./tech/fastapi.astro";
export { default as Pinecone } from "./tech/pinecone.astro";

// Social Icons
export { default as GitHub } from "./social/GitHub.astro";
export { default as LinkedIn } from "./social/LinkedIn.astro";
export { default as X } from "./social/X.astro";
export { default as Mail } from "./social/Mail.astro";
export { default as Website } from "./social/WorldMap.astro"; // Renamed for Hero component
export { default as WorldMapIcon } from "./social/WorldMap.astro"; // Kept for compatibility
export { default as Certificate } from "./social/Certificate.astro";
export { default as Blog } from "./social/Blog.astro";
export { default as YouTube } from "./social/YouTube.astro";

// Explicit exports for components that use the 'Icon' suffix
export { default as GitHubIcon } from "./social/GitHub.astro";
export { default as WebsiteIcon } from "./social/WorldMap.astro";
export { default as CertificateIcon } from "./social/Certificate.astro";

// Type definition
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type SocialIcon = Record<string, any>;