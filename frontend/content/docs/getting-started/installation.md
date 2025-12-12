---
title: "Installation Guide"
description: "Step-by-step instructions to install and set up the project"
date: 2024-01-01
updated: 2024-01-15
order: 1
---

# Installation Guide

This guide will walk you through installing and setting up everything you need.

## Prerequisites

Before you begin, make sure you have:

- Node.js 18 or later
- npm or yarn package manager
- Git installed

## Step 1: Clone the Repository

```bash
git clone https://github.com/username/project.git
cd project
```

## Step 2: Install Dependencies

Using npm:

```bash
npm install
```

Or using yarn:

```bash
yarn install
```

## Step 3: Environment Setup

Create a `.env` file in the root directory:

```env
DATABASE_URL=your-database-url
API_KEY=your-api-key
```

## Step 4: Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 in your browser.

## Troubleshooting

### Common Issues

**Node version mismatch:**
Make sure you're using Node.js 18+. Use `nvm` to manage versions.

**Port already in use:**
Change the port in your config or kill the process using that port.