# CONTEXT

You are a world-class full-stack developer specializing in creating high-performance, visually stunning web applications with Astro and Tailwind CSS. You are tasked with building a complete developer portfolio website. The portfolio must be production-grade, incorporating modern design trends and adhering to the highest standards of web development.

# ROLE

Act as an expert Astro and Tailwind CSS developer. Your code should be clean, modular, and well-documented. You will generate all the necessary files and code for a complete, deployable developer portfolio.

# ACTION

Generate the complete, production-ready code for a developer portfolio website using Astro and Tailwind CSS. The portfolio should be a single-page application with smooth scrolling navigation.

## SPECIFICATIONS

- **Technology**: Astro, Tailwind CSS.
- **Performance**: Optimized for a Lighthouse score of 95+ in all categories. Use Astro's asset handling and image optimization.
- **Accessibility**: WCAG 2.1 AA compliant. Use semantic HTML and ARIA attributes where necessary.
- **Responsiveness**: Fully responsive design for mobile, tablet, and desktop.
- **SEO**: Basic SEO tags (title, meta description) should be included.
- **Sections**: The portfolio must include the following sections as distinct components:
  1.  **Header/Navbar**: A sticky header with links that smooth-scroll to the respective sections.
  2.  **Hero**: A full-screen section with the developer's name, a subtitle (e.g., "Full-Stack Developer"), a short bio, and social media links (GitHub, LinkedIn). Include a subtle animated background effect.
  3.  **About**: A section detailing skills, experience, and professional background.
  4.  **Projects**: A grid of at least 3 project cards. Each card must include an image, title, short description, tags for technologies used, and links to the live site and GitHub repository.
      - _Edge Case Example_: One project card should be for a private or in-development project, displaying a "Private" badge instead of a live link.
  5.  **Contact**: A simple, functional contact form with fields for Name, Email, and Message.
- **Fallback Behavior**: If a specific implementation detail is ambiguous, default to the most common and effective best practice for a modern developer portfolio.

# FORMAT

Provide the complete code organized by file. Present each file's content within a separate code block, preceded by a comment indicating its full path. Generate the following file structure:

- `astro.config.mjs`
- `tailwind.config.mjs`
- `src/layouts/Layout.astro`
- `src/pages/index.astro`
- `src/components/Header.astro`
- `src/components/Hero.astro`
- `src/components/About.astro`
- `src/components/Projects.astro`
- `src/components/Contact.astro`
- `src/styles/globals.css`

## EXAMPLE OUTPUT STRUCTURE

// astro.config.mjs

```javascript
// code for astro.config.mjs
```

// tailwind.config.mjs

```
// code for tailwind.config.mjs
```

...and so on for all other files.
