---
title: "Understanding Ownership in Rust"
description: "A deep dive into Rust's unique ownership system for memory safety"
date: 2024-01-08
draft: false
---

# Understanding Ownership in Rust

Ownership is Rust's most unique feature and enables memory safety guarantees without a garbage collector.

## The Three Rules of Ownership

1. Each value in Rust has a variable that's called its owner
2. There can only be one owner at a time
3. When the owner goes out of scope, the value will be dropped

## Moving Ownership

When you assign a value to another variable, ownership moves:

```rust
let s1 = String::from("hello");
let s2 = s1; // s1 is no longer valid

// println!("{}", s1); // This would cause a compile error
println!("{}", s2); // This works fine
```

## Cloning Data

If you want to deeply copy data, use `clone()`:

```rust
let s1 = String::from("hello");
let s2 = s1.clone();

println!("s1 = {}, s2 = {}", s1, s2); // Both are valid
```

## References and Borrowing

References allow you to refer to a value without taking ownership:

```rust
fn calculate_length(s: &String) -> usize {
    s.len()
}

let s1 = String::from("hello");
let len = calculate_length(&s1);
println!("The length of '{}' is {}.", s1, len);
```

## Mutable References

You can have one mutable reference to a piece of data in a particular scope:

```rust
let mut s = String::from("hello");
let r = &mut s;
r.push_str(", world");
println!("{}", r);
```

## Why This Matters

Ownership prevents:
- Data races at compile time
- Null pointer dereferences
- Double-free errors
- Memory leaks (mostly)