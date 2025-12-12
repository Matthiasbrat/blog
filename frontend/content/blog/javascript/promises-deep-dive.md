---
title: "Promises: A Deep Dive"
description: "Everything you need to know about JavaScript Promises"
date: 2024-01-05
---

# Promises: A Deep Dive

Promises revolutionized asynchronous JavaScript. Let's explore them thoroughly.

## The Three States

A Promise exists in one of three states:

1. **Pending** - Initial state, neither fulfilled nor rejected
2. **Fulfilled** - Operation completed successfully
3. **Rejected** - Operation failed

```javascript
const promise = new Promise((resolve, reject) => {
  // Pending state
  
  if (success) {
    resolve(value); // Fulfilled
  } else {
    reject(error);  // Rejected
  }
});
```

## Chaining Promises

The real power comes from chaining:

```javascript
fetch('/api/user')
  .then(response => response.json())
  .then(user => fetch(`/api/posts/${user.id}`))
  .then(response => response.json())
  .then(posts => console.log(posts))
  .catch(error => console.error(error));
```

## Promise.all()

Run multiple promises in parallel:

```javascript
const [users, posts, comments] = await Promise.all([
  fetch('/api/users').then(r => r.json()),
  fetch('/api/posts').then(r => r.json()),
  fetch('/api/comments').then(r => r.json())
]);
```

## Promise.race()

First settled promise wins:

```javascript
const result = await Promise.race([
  fetch('/api/fast'),
  new Promise((_, reject) => 
    setTimeout(() => reject('Timeout'), 5000)
  )
]);
```

## Promise.allSettled()

Wait for all to settle, regardless of outcome:

```javascript
const results = await Promise.allSettled([
  fetch('/api/a'),
  fetch('/api/b'),
  fetch('/api/c')
]);

results.forEach(result => {
  if (result.status === 'fulfilled') {
    console.log('Success:', result.value);
  } else {
    console.log('Failed:', result.reason);
  }
});
```

## Creating Your Own Promisified Functions

```javascript
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function readFileAsync(path) {
  return new Promise((resolve, reject) => {
    fs.readFile(path, 'utf8', (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}
```