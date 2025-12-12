---
title: "ES6 Modules Explained"
description: "Understanding import and export in modern JavaScript applications"
date: 2024-01-10
draft: false
---

# ES6 Modules Explained

ES6 modules provide a standardized way to organize and share code between JavaScript files.

## Named Exports

You can export multiple values from a module using named exports:

```javascript
// math.js
export const PI = 3.14159;
export function add(a, b) { return a + b; }
export function multiply(a, b) { return a * b; }

// main.js
import { PI, add, multiply } from './math.js';
```

## Default Exports

Each module can have one default export:

```javascript
// User.js
export default class User {
  constructor(name) {
    this.name = name;
  }
}

// main.js
import User from './User.js';
```

## Re-exporting

You can re-export from other modules:

```javascript
// index.js
export { add, multiply } from './math.js';
export { default as User } from './User.js';
```

## Dynamic Imports

Load modules dynamically at runtime:

```javascript
async function loadModule() {
  const module = await import('./heavy-module.js');
  module.doSomething();
}
```