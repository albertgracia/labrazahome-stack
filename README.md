# Stack 2026

A modern, scalable development stack for next-generation applications.

## Overview

Stack 2026 is a comprehensive development environment designed to provide the best developer experience with cutting-edge technologies. It features:
- Monorepo structure using pnpm workspaces
- TypeScript-first development
- Modern build tools and optimization
- Scalable architecture for enterprise-level applications

## Features

- **Monorepo Architecture**: Organized into apps, packages, infra, and docs directories
- **TypeScript Support**: Full TypeScript integration with strict typing
- **PNPM Workspaces**: Efficient package management across the monorepo
- **Modern Tooling**: Built-in tooling for development, testing, and deployment

## Getting Started

1. Make sure you have Node.js 22 installed (using nvm: `nvm install 22`)
2. Install pnpm if needed: `npm install -g pnpm`
3. Install dependencies: `pnpm install`

## Project Structure

- `/apps` - Application code
- `/packages` - Shared libraries and packages  
- `/infra` - Infrastructure as code
- `/docs` - Documentation
- `/.github` - GitHub workflows and configurations

## Available Scripts

```bash
# Development server
npm run dev

# Build all packages
npm run build

# Lint all files
npm run lint

# Run tests
npm run test
```

## Technology Stack

- Node.js 22
- TypeScript
- PNPM Workspaces
- Turbo for build optimization
- Turborepo for monorepo management