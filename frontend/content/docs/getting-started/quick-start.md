---
title: "Quick Start"
description: "Build your first project in under 5 minutes"
date: 2024-01-01
updated: 2024-01-10
order: 2
---

# Quick Start

Let's build something in under 5 minutes!

## Create Your First Page

Create a new file at `src/pages/hello.astro`:

```astro
---
const name = "World";
---

<html>
  <body>
    <h1>Hello, {name}!</h1>
  </body>
</html>
```

## Add Some Styling

Add a `<style>` block to your component:

```astro
---
const name = "World";
---

<html>
  <body>
    <h1>Hello, {name}!</h1>
  </body>
</html>

<style>
  h1 {
    color: purple;
    font-size: 4rem;
  }
</style>
```

## Add Interactivity

Add a `<script>` tag for client-side JavaScript:

```astro
<button id="counter">Count: 0</button>

<script>
  let count = 0;
  const button = document.getElementById('counter');
  button?.addEventListener('click', () => {
    count++;
    button.textContent = `Count: ${count}`;
  });
</script>
```

## What's Next?

- Learn about [components](/docs/getting-started/components)
- Explore [layouts](/docs/getting-started/layouts)
- Add [content collections](/docs/getting-started/content)