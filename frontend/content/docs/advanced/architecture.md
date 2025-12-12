---
title: "Architecture Overview"
description: "Understanding the system architecture and design decisions"
date: 2024-01-01
updated: 2024-01-15
order: 1
---

# Architecture Overview

This document explains the high-level architecture of the system.

## System Components

The architecture consists of three main layers:

### Presentation Layer

- Static site generation with Astro
- View Transitions for SPA-like navigation
- Progressive enhancement approach

### Content Layer

- File-based content management
- YAML configuration files
- Markdown/MDX for content

### Build Pipeline

- Static generation at build time
- Asset optimization
- Sitemap generation

## Design Principles

### Convention Over Configuration

Create a folder, add a config file, and you're done. The system discovers and routes automatically.

### Performance First

- Zero JavaScript by default
- Critical CSS inlined
- Lazy loading for comments and heavy components

### Progressive Enhancement

The site works without JavaScript. Interactive features enhance the experience but aren't required.

## Data Flow

```
Content (Markdown) → Build Process → Static HTML → CDN → User
         ↑
   Configuration (YAML)
```

## Extending the System

### Adding New Section Types

1. Create section folder
2. Define `_section.yaml`
3. Add custom layout if needed
4. Add content

### Custom Components

Drop new Astro components in `src/components/` and reference them in your content.