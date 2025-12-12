---
title: "Components Guide"
description: "How to create and use custom components in your content"
date: 2024-01-01
updated: 2024-01-12
order: 3
---

# Components Guide

Learn how to use and create custom components for your content.

## Built-in Components

### Code Blocks

Fenced code blocks with syntax highlighting:

```javascript
function hello(name) {
  console.log(`Hello, ${name}!`);
}
```

### Blockquotes

> This is a blockquote. Use it to highlight important information or quotes.

### Lists

Unordered lists:

- First item
- Second item
- Third item

Ordered lists:

1. First step
2. Second step
3. Third step

## Creating Custom Components

Create Astro components in `src/components/`:

```astro
---
interface Props {
  title: string;
  type?: 'info' | 'warning' | 'error';
}

const { title, type = 'info' } = Astro.props;
---

<div class={`callout callout-${type}`}>
  <strong>{title}</strong>
  <slot />
</div>
```

## Using Components in MDX

Import and use components in `.mdx` files:

```mdx
import Callout from '../components/Callout.astro';

<Callout title="Note" type="info">
  This is an informational callout.
</Callout>
```

## Component Best Practices

1. Keep components focused and single-purpose
2. Use TypeScript for props interfaces
3. Provide sensible defaults
4. Document usage with examples
5. Consider accessibility from the start