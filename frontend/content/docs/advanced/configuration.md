---
title: "Configuration Reference"
description: "Complete reference for all configuration options"
date: 2024-01-01
updated: 2024-01-18
order: 2
---

# Configuration Reference

This document covers all configuration options available.

## Site Configuration

Located at `content/_site.yaml`:

```yaml
site:
  title: "Site Title"
  description: "Site description"
  url: "https://example.com"
  author: "Your Name"

navigation:
  order: ["blog", "docs", "projects"]
  overrides:
    blog:
      label: "Writing"

comments:
  provider: "giscus"
  repo: "user/repo"
  repoId: "R_xxx"
  category: "Comments"
  categoryId: "DIC_xxx"

seo:
  defaultOgImage: "/images/og.png"
  twitterHandle: "@handle"
```

## Section Configuration

Each section has a `_section.yaml`:

### Identity

```yaml
name: "Section Name"          # Display name
slug: "section-slug"          # URL path
description: "Description"    # Meta description
icon: "pencil"                # Lucide icon name
```

### Navigation

```yaml
showInNav: true               # Show in main nav
navOrder: 1                   # Position in nav
navLabel: "Custom Label"      # Override nav text
```

### Layouts

```yaml
layout:
  index: "grid"               # Section index: grid|list|single
  topic: "list"               # Topic index: grid|list
  content: "article"          # Content page: article|docs|single
```

### Structure

```yaml
structure:
  hasTopics: true             # Use topic subfolders
  topicDisplay: "cards"       # cards|list|accordion
  contentTypes: ["md", "mdx"] # File extensions
  sortBy: "date"              # date|order|title|updated
  sortOrder: "desc"           # asc|desc
```

### Features

```yaml
features:
  comments: true              # Giscus comments
  reactions: true             # Emoji reactions
  sidePanel: true             # Table of contents
  asides: true                # Margin notes
  prevNext: true              # Prev/next navigation
  breadcrumbs: true           # Breadcrumb trail
  pdfViewer: false            # PDF embedding
  codeBlocks: true            # Syntax highlighting
  estimatedReadTime: true     # Reading time
  relatedContent: false       # Related posts
  topicNav: false             # Topic sidebar
  showDate: true              # Publish date
  showUpdated: true           # Update date
  showAuthor: false           # Author name
```

## Topic Configuration

Optional `_topic.yaml` in topic folders:

```yaml
name: "Topic Name"
slug: "topic-slug"
description: "Topic description"
banner: "./banner.jpg"
order: 1
```

## Content Frontmatter

```yaml
---
title: "Post Title"           # Required
description: "Description"    # SEO/previews
date: 2024-01-15              # Publish date
updated: 2024-01-20           # Last update
draft: false                  # Hide from listings
banner: "./image.jpg"         # Header image
order: 1                      # Manual sorting
pdf: "./document.pdf"         # Embedded PDF
---
```