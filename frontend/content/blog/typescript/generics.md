---
title: "Advanced TypeScript Generics"
description: "Master TypeScript's powerful generic type system"
date: 2024-01-18
---

# Advanced TypeScript Generics

Generics let you write reusable, type-safe code. Let's explore advanced patterns.

## Basic Generics Recap

```typescript
function identity<T>(arg: T): T {
  return arg;
}

const str = identity<string>('hello'); // string
const num = identity(42); // number (inferred)
```

## Generic Constraints

Limit what types can be used:

```typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength('hello'); // OK
logLength([1, 2, 3]); // OK
logLength(42); // Error: number has no length
```

## keyof and Indexed Access

```typescript
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
  return obj[key];
}

const person = { name: 'Alice', age: 30 };
const name = getProperty(person, 'name'); // string
const age = getProperty(person, 'age'); // number
```

## Mapped Types

```typescript
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

type Partial<T> = {
  [P in keyof T]?: T[P];
};

type Nullable<T> = {
  [P in keyof T]: T[P] | null;
};
```

## Conditional Types

```typescript
type IsString<T> = T extends string ? true : false;

type A = IsString<string>; // true
type B = IsString<number>; // false

// Extract non-nullable
type NonNullable<T> = T extends null | undefined ? never : T;
```

## Infer Keyword

Extract types from other types:

```typescript
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

type ArrayElement<T> = T extends (infer E)[] ? E : never;

type Unpacked<T> = 
  T extends (infer U)[] ? U :
  T extends Promise<infer U> ? U :
  T;
```

## Template Literal Types

```typescript
type EventName<T extends string> = `on${Capitalize<T>}`;

type ClickEvent = EventName<'click'>; // 'onClick'
type FocusEvent = EventName<'focus'>; // 'onFocus'

type PropGetters<T> = {
  [K in keyof T as `get${Capitalize<string & K>}`]: () => T[K];
};
```

## Practical Example: Type-Safe API Client

```typescript
interface API {
  '/users': { GET: User[]; POST: User };
  '/users/:id': { GET: User; PUT: User; DELETE: void };
  '/posts': { GET: Post[] };
}

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

async function api<
  Path extends keyof API,
  M extends keyof API[Path] & Method
>(path: Path, method: M): Promise<API[Path][M]> {
  const response = await fetch(path, { method });
  return response.json();
}

// Fully typed!
const users = await api('/users', 'GET'); // User[]
const user = await api('/users/:id', 'GET'); // User
```