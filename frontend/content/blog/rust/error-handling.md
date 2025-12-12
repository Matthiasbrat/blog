---
title: "Error Handling in Rust"
description: "Mastering Result, Option, and the ? operator"
date: 2024-01-01
---

# Error Handling in Rust

Rust doesn't have exceptions. Instead, it uses `Result<T, E>` and `Option<T>` types for error handling.

## Option: For Nullable Values

```rust
enum Option<T> {
    Some(T),
    None,
}

fn find_user(id: u32) -> Option<User> {
    // Returns Some(user) or None
}

match find_user(42) {
    Some(user) => println!("Found: {}", user.name),
    None => println!("User not found"),
}
```

## Result: For Operations That Can Fail

```rust
enum Result<T, E> {
    Ok(T),
    Err(E),
}

fn read_file(path: &str) -> Result<String, io::Error> {
    std::fs::read_to_string(path)
}

match read_file("config.json") {
    Ok(contents) => println!("{}", contents),
    Err(e) => eprintln!("Failed to read: {}", e),
}
```

## The ? Operator

Propagates errors automatically:

```rust
fn read_config() -> Result<Config, Box<dyn Error>> {
    let contents = std::fs::read_to_string("config.json")?;
    let config: Config = serde_json::from_str(&contents)?;
    Ok(config)
}
```

## Combinators

### map and map_err

```rust
let doubled = Some(5).map(|x| x * 2); // Some(10)

let result: Result<i32, String> = Ok(5)
    .map(|x| x * 2)
    .map_err(|e| format!("Error: {}", e));
```

### and_then (flatMap)

```rust
fn parse_and_double(s: &str) -> Option<i32> {
    s.parse::<i32>().ok().and_then(|n| Some(n * 2))
}
```

### unwrap_or and unwrap_or_else

```rust
let value = some_option.unwrap_or(default_value);
let value = some_option.unwrap_or_else(|| compute_default());
```

## Custom Error Types

```rust
#[derive(Debug)]
enum AppError {
    NotFound,
    InvalidInput(String),
    DatabaseError(sqlx::Error),
}

impl std::fmt::Display for AppError {
    fn fmt(&self, f: &mut std::fmt::Formatter) -> std::fmt::Result {
        match self {
            AppError::NotFound => write!(f, "Resource not found"),
            AppError::InvalidInput(msg) => write!(f, "Invalid input: {}", msg),
            AppError::DatabaseError(e) => write!(f, "Database error: {}", e),
        }
    }
}

impl std::error::Error for AppError {}
```

## Using anyhow and thiserror

For applications, use `anyhow`:

```rust
use anyhow::{Context, Result};

fn main() -> Result<()> {
    let config = read_config()
        .context("Failed to read configuration")?;
    Ok(())
}
```

For libraries, use `thiserror`:

```rust
use thiserror::Error;

#[derive(Error, Debug)]
pub enum DataError {
    #[error("Failed to parse: {0}")]
    ParseError(String),
    
    #[error("IO error: {0}")]
    IoError(#[from] std::io::Error),
}
```