# Architecture Overview

This document provides a high-level architectural overview of the Stack 2026 development environment.

## System Components

The system is composed of several key modules, each serving specific roles:

- **Frontend (`apps/web`)**: Built with Astro and React, utilizing Tailwind CSS for styling.
- **Backend (`apps/api`)**: Powered by Fastify to handle API requests.
- **Database Layer (`packages/db`)**: Uses Prisma ORM to manage interactions with PostgreSQL.
- **Shared Packages (`packages/shared`, `packages/ui`)**: Containing shared utilities and components for reuse.

## Data Flow

### Frontend → Backend → Database

1. The frontend, hosted at [http://localhost:4321](http://localhost:4321), interacts with the backend API.
2. All backend endpoints are exposed on port 8080 (`http://localhost:8080`).
3. The backend communicates with the PostgreSQL database via Prisma ORM.

## Technology Stack

- **Frontend**: Astro + React + Tailwind CSS + TypeScript
- **Backend**: Fastify + TypeScript
- **Database**: PostgreSQL (via Prisma ORM)
- **Monorepo**: pnpm workspaces
- **Development Environment**: Docker Compose for local database setup

This architecture supports scalability and maintainability while providing a modern development experience.
