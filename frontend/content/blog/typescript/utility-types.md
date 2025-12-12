---
title: "TypeScript Utility Types Cheatsheet"
description: "A quick reference for TypeScript's built-in utility types"
date: 2024-01-14
---

# TypeScript Utility Types Cheatsheet

TypeScript provides several utility types out of the box. Here's your quick reference.

## Partial<T>

Makes all properties optional:

```typescript
interface User {
  name: string;
  age: number;
}

type PartialUser = Partial<User>;
// { name?: string; age?: number; }

function updateUser(user: User, updates: Partial<User>) {
  return { ...user, ...updates };
}
```

## Required<T>

Makes all properties required:

```typescript
interface Config {
  debug?: boolean;
  timeout?: number;
}

type RequiredConfig = Required<Config>;
// { debug: boolean; timeout: number; }
```

## Readonly<T>

Makes all properties readonly:

```typescript
type ReadonlyUser = Readonly<User>;
// { readonly name: string; readonly age: number; }
```

## Pick<T, K>

Create type with subset of properties:

```typescript
type UserName = Pick<User, 'name'>;
// { name: string; }

type UserBasics = Pick<User, 'name' | 'age'>;
```

## Omit<T, K>

Create type excluding certain properties:

```typescript
interface Post {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

type CreatePost = Omit<Post, 'id' | 'createdAt'>;
// { title: string; content: string; }
```

## Record<K, T>

Create object type with specific key/value types:

```typescript
type UserRoles = Record<string, boolean>;
// { [key: string]: boolean }

type StatusMap = Record<'loading' | 'error' | 'success', boolean>;
// { loading: boolean; error: boolean; success: boolean; }
```

## Extract<T, U>

Extract types from union:

```typescript
type T = Extract<'a' | 'b' | 'c', 'a' | 'f'>;
// 'a'
```

## Exclude<T, U>

Exclude types from union:

```typescript
type T = Exclude<'a' | 'b' | 'c', 'a'>;
// 'b' | 'c'
```

## NonNullable<T>

Remove null and undefined:

```typescript
type T = NonNullable<string | null | undefined>;
// string
```

## ReturnType<T>

Get function's return type:

```typescript
function getUser() {
  return { name: 'Alice', age: 30 };
}

type User = ReturnType<typeof getUser>;
// { name: string; age: number; }
```

## Parameters<T>

Get function's parameter types as tuple:

```typescript
function greet(name: string, age: number): void {}

type GreetParams = Parameters<typeof greet>;
// [string, number]
```

## Awaited<T>

Unwrap Promise types:

```typescript
type A = Awaited<Promise<string>>; // string
type B = Awaited<Promise<Promise<number>>>; // number
```