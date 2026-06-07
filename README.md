# Stack 2026 - Development Environment

## Technologies Used

- **Frontend**: Astro, React (v19), Tailwind CSS (v4), TypeScript
- **Backend**: Node.js (v22 LTS), Fastify (v5), TypeScript
- **Database**: PostgreSQL 17, Prisma ORM (v6)
- **Monorepo**: pnpm workspaces
- **Tooling**: ESLint, Prettier, TypeScript strict mode

## Architecture Overview

The project follows a monorepo structure with distinct modules for frontend and backend:

### Frontend (`apps/web`)

- Built using Astro with React
- Tailwind CSS for styling

### Backend (`apps/api`)

- API layer powered by Fastify
- TypeScript for type safety and robustness

### Database Layer (`packages/db`)

- Prisma ORM for database interaction
- PostgreSQL as the primary data store

### Shared Packages

- `packages/shared`: Contains shared types, utilities, and Zod validations
- `packages/ui`: For UI components that can be reused across projects

### Infrastructure

- Docker Compose for local development environment setup (`infra/docker-compose.yml`)

## Development Commands

| Command            | Description                   |
| ------------------ | ----------------------------- |
| `pnpm dev`         | Start all services            |
| `pnpm dev:web`     | Start frontend (port 4321)    |
| `pnpm dev:api`     | Start backend API (port 8080) |
| `pnpm db:up`       | Start PostgreSQL container    |
| `pnpm db:down`     | Stop PostgreSQL container     |
| `pnpm db:migrate`  | Run database migrations       |
| `pnpm db:generate` | Generate Prisma client        |
| `pnpm build`       | Build all packages            |
| `pnpm lint`        | Lint code with ESLint         |
| `pnpm typecheck`   | Check TypeScript types        |
| `pnpm format`      | Format code with Prettier     |

## Development Ports

- **Frontend**: 4321
- **Backend API**: 8080
- **PostgreSQL**: 5432 (via Docker)

## Documentation

This project includes documentation in the `/docs/` directory:

- `architecture.md`: Describes the overall architecture of this environment.
- `development.md`: Provides guidance on how to set up and run the development environment.

## Notes for Future Development

Please note that:

1. This is a base scaffolding for Stack 2026.
2. Further features like authentication, Stripe integration, or business logic should be added separately in future phases.
3. The Docker Compose configuration is designed for local development and is not meant for production deployment.

This setup allows for a clean separation of concerns while maintaining the flexibility to scale and evolve as needed.
