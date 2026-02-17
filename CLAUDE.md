# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a University of Illinois Urbana-Champaign Computer Scienece program wiki built with Astro 5, a static site generator focused on content. The wiki provides student-maintained information about CS courses, guides, and resources at the University of Illinois Urbana-Champaign.

## Commands

### Development

```bash
yarn dev          # Start development server (default port 4321)
yarn build        # Build for production
yarn preview      # Preview production build locally
yarn astro        # Run Astro CLI commands
```

### Common Astro Commands

```bash
yarn astro add        # Add an integration
yarn astro check      # Type-check Astro files
yarn astro sync       # Sync content collections
```

## Architecture

### Content Collections System

The site uses Astro's Content Collections feature for type-safe content management:

- **Classes Collection** (`src/content/classes/`): Course information stored as MDX files, organized by subject directories (e.g., `CS/cs124.mdx`). Each class has frontmatter with structured metadata (title, subject, number, credits, description, prerequisites, tags).

- **Guides Collection** (`src/content/guides/`): Student guides stored as MDX files with frontmatter (title, description, order).

- **Content Schema** (`src/content/config.ts`): Defines Zod schemas that validate all content frontmatter at build time. This ensures type safety across the entire site.

### Routing Structure

Astro uses file-based routing with dynamic routes:

- `/` - Home page
- `/classes/[subject]/[course]` - Individual course pages (e.g., `/classes/CS/CS124`)
- `/classes/[subject]/index` - Subject overview pages
- `/guides/[slug]` - Guide pages
- `/contributing` - Contributing information

Dynamic routes use `getStaticPaths()` to generate pages from content collections at build time.

### Component Architecture

- **BaseLayout** (`src/layouts/BaseLayout.astro`): Main layout wrapper with sidebar, provides consistent page structure, includes global CSS and fonts (Montserrat for display, JetBrains Mono for code, Source Sans 3 for body).

- **Sidebar** (`src/components/Sidebar.astro`): Navigation component that automatically builds nav structure from content collections. Uses client-side JavaScript for collapsible sections. Auto-expands current section based on URL path.

- **Constants** (`src/lib/constants.ts`): Centralized configuration for subjects (CS, MATH, STAT, ECE, PHYS) with descriptions, difficulty colors/labels, and workload labels.

### Styling System

Uses Tailwind CSS v4 with custom design tokens defined in `src/styles/global.css`:

- Custom color palette: Illinois Orange (#E84A27), Illinois Blue (#13294B)
- GitHub-inspired dark theme: `wiki-bg`, `wiki-surface`, `wiki-border`, `wiki-text`, `wiki-muted`, `wiki-link`
- Custom fonts defined as CSS variables: `font-display`, `font-mono`
- Prose styling applied globally to markdown content in BaseLayout

### Build Configuration

- **astro.config.mjs**: Integrates MDX for enhanced markdown and Tailwind CSS via Vite plugin
- **tsconfig.json**: Extends Astro's strict TypeScript config
- Content is sourced from `src/**/*.astro` and `src/**/*.mdx` as defined in global.css

## Adding New Content

### Adding a Course

1. Create MDX file in `src/content/classes/[SUBJECT]/[course-code].mdx`
2. Include required frontmatter:
   ```yaml
   ---
   title: 'Course Name'
   subject: 'CS'
   number: 124
   section: 'CCA' # optional, only used for special topics classes like CS 498 or CS 598
   credits: 3
   instructor: 'Professor Name' # optional
   description: 'Course description'
   prerequisites: ['CS 101'] # optional, supports AND/OR logic (see below)
   tags: ['algorithms', 'theory'] # optional
   ---
   ```
3. Write course content in markdown below frontmatter
4. The course will automatically appear in sidebar navigation and routing

### Prerequisite Format

Prerequisites support AND/OR logic with smart linking:

```yaml
# Simple list (all required - AND)
prerequisites: ["CS 124", "MATH 241"]

# OR group (one of these required)
prerequisites: [["MATH 257", "MATH 415", "MATH 416"]]

# Mixed: (MATH 257 OR MATH 415) AND CS 225 AND "some text"
prerequisites: [["MATH 257", "MATH 415"], "CS 225", "Three years of algebra"]
```

**Smart Linking**: Course codes (e.g., "CS 124") automatically link to internal wiki articles if they exist, or to Course Explorer if not. Free-form text (e.g., "Three years of algebra") displays without links. Only subjects in `VALID_SUBJECTS` (CS, MATH, STAT, ECE, PHYS) are recognized as course codes.

### Adding a Guide

1. Create MDX file in `src/content/guides/[slug].mdx`
2. Include required frontmatter:
   ```yaml
   ---
   title: 'Guide Title'
   description: 'Guide description'
   order: 1 # optional, controls sidebar ordering
   category: 'tech' # optional, categorizes guides for folder structure on the sidebar
   ---
   ```
3. Write guide content in markdown below frontmatter

## Key Implementation Details

- **Content Organization**: Classes are grouped by subject in the sidebar, then by level (1xx, 2xx, etc.). The level is calculated as `Math.floor(course.number / 100) + 'xx'`.

- **Prerequisite System** (`src/lib/prerequisites.ts`, `src/components/PrerequisiteList.astro`): Parses prerequisite arrays, detects course codes via regex, and generates smart links. Uses `buildCourseIndex()` at build time to determine which courses have wiki articles.

- **Type Safety**: All content schemas are validated at build time via Zod. The `getCollection()` API provides fully typed content access throughout the codebase.

- **Client-Side Interactions**: Sidebar navigation uses vanilla JavaScript in `<script>` tags for collapsible sections. Auto-expansion logic runs on page load to open the current section.

- **MDX Integration**: Allows using JSX components within markdown files for enhanced interactivity when needed.

## Technology Stack

- **Framework**: Astro 5.16.8 (static site generation)
- **Styling**: Tailwind CSS 4.1.18 with custom design tokens
- **Content**: MDX 4.3.13 for enhanced markdown
- **Package Manager**: Yarn (lockfile present)
- **TypeScript**: Strict mode enabled via Astro's strict tsconfig
