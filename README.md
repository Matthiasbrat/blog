# Personal Website

A minimal, fast personal website built with [Astro](https://astro.build) featuring a dynamic section system, blog, documentation, and referrals showcase.

## Features

- **Dynamic Section System** - Create new sections by adding folders with config files
- **Blog with Topics** - Organized posts with table of contents sidebar
- **Documentation** - Structured guides with prev/next navigation
- **Referrals** - Profile cards for people you recommend
- **Projects** - Showcase your work
- **Search** - Client-side search with highlighting
- **Comments** - Giscus integration (GitHub Discussions)
- **Reactions** - Emoji reactions on posts
- **View Transitions** - SPA-like navigation without full page reloads
- **SEO Optimized** - Sitemap, RSS feed, Open Graph tags
- **AI-Friendly** - robots.txt allows AI crawlers

## Project Structure

```
├── frontend/
│   ├── content/                 # All content lives here
│   │   ├── _site.yaml          # Global site configuration
│   │   ├── blog/               # Blog section
│   │   │   ├── _section.yaml   # Section config
│   │   │   └── [topic]/        # Topics (e.g., javascript, rust)
│   │   │       ├── _topic.yaml
│   │   │       └── *.md        # Posts
│   │   ├── docs/               # Documentation section
│   │   ├── referrals/          # People you recommend
│   │   │   └── people.yaml
│   │   └── projects/           # Your projects
│   ├── src/
│   │   ├── components/         # Astro components
│   │   ├── layouts/            # Page layouts
│   │   ├── lib/                # Utilities
│   │   ├── pages/              # Route pages
│   │   └── styles/             # CSS
│   └── public/                 # Static assets
└── backend/                    # (Not used for static site)
```

## Quick Start

### Development

```bash
cd frontend
yarn install
yarn dev
```

Open http://localhost:3000

### Build for Production

```bash
yarn build
```

Output will be in `frontend/dist/`

## Adding Content

### Create a New Blog Post

1. Navigate to a topic folder (e.g., `content/blog/javascript/`)
2. Create a new `.md` file:

```markdown
---
title: "Your Post Title"
description: "A brief description"
date: 2024-01-15
---

# Your Post Title

Your content here...

## Section Heading

More content...
```

### Create a New Topic

1. Create a folder in `content/blog/`
2. Add `_topic.yaml`:

```yaml
name: "Topic Name"
slug: "topic-slug"
description: "What this topic covers"
order: 1
```

### Create a New Section

1. Create a folder in `content/` (e.g., `content/notes/`)
2. Add `_section.yaml`:

```yaml
name: "Notes"
slug: "notes"
description: "Quick thoughts"
showInNav: true
navOrder: 5

layout:
  index: "list"
  content: "article"

structure:
  hasTopics: false
  sortBy: "date"

features:
  comments: false
  reactions: true
  sidePanel: false
```

3. Add content files - that's it!

### Add a Referral

Edit `content/referrals/people.yaml`:

```yaml
- name: "Person Name"
  title: "Their Role at Company"
  description: "Why you recommend them"
  links:
    - type: "linkedin"
      url: "https://linkedin.com/in/..."
    - type: "github"
      url: "https://github.com/..."
  order: 1
```

## Configuration

### Site Configuration (`content/_site.yaml`)

```yaml
site:
  title: "Your Name"
  description: "Your site description"
  url: "https://yoursite.com"
  author: "Your Name"

navigation:
  order: ["blog", "docs", "referrals", "projects"]

comments:
  provider: "giscus"
  repo: "username/repo"
  repoId: "R_xxx"
  category: "Announcements"
  categoryId: "DIC_xxx"

seo:
  defaultOgImage: "/images/og-default.png"
  twitterHandle: "@yourhandle"
```

### Section Features

Toggle features per section in `_section.yaml`:

| Feature | Description |
|---------|-------------|
| `comments` | Giscus comment thread |
| `reactions` | Emoji reaction bar |
| `sidePanel` | Table of contents sidebar |
| `breadcrumbs` | Navigation breadcrumbs |
| `prevNext` | Previous/Next post links |
| `estimatedReadTime` | Show reading time |
| `showDate` | Display publish date |

## Deployment

### Cloudflare Pages (Recommended)

1. Push to GitHub/GitLab
2. Connect repo to [Cloudflare Pages](https://pages.cloudflare.com)
3. Settings:
   - Build command: `cd frontend && yarn build`
   - Output directory: `frontend/dist`
4. Deploy!

### Vercel / Netlify

Same process - both auto-detect Astro projects.

### Manual

```bash
cd frontend
yarn build
# Upload dist/ folder to any static host
```

## SEO & Indexing

- **Sitemap**: Auto-generated at `/sitemap-index.xml`
- **RSS Feed**: Available at `/rss.xml`
- **robots.txt**: Configured to allow all crawlers including AI bots

To submit to Google:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your site
3. Submit sitemap URL: `https://yoursite.com/sitemap-index.xml`

## Tech Stack

- **Framework**: [Astro](https://astro.build)
- **Styling**: Vanilla CSS with custom properties
- **Fonts**: IBM Plex Sans & IBM Plex Mono
- **Comments**: [Giscus](https://giscus.app)
- **Search**: Client-side (Pagefind-ready)

## License

MIT
