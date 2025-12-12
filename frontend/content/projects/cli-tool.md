---
title: "Open Source CLI Tool"
description: "A command-line tool for automating common development tasks"
order: 2
---

# Open Source CLI Tool

A productivity tool that automates repetitive development workflows.

## What It Does

- Scaffolds new projects from templates
- Manages environment variables across environments
- Automates deployment workflows
- Generates documentation from code comments

## Usage

```bash
npm install -g @yourname/cli

# Create a new project
mycli create my-app --template react

# Deploy to production
mycli deploy --env production
```

## Built With

- Node.js
- Commander.js for CLI parsing
- Inquirer.js for interactive prompts
- Chalk for terminal styling