# Development Guidelines

## Overview

This document outlines the development practices, coding standards, and workflows for Stack 2026 projects.

## Getting Started

1. Ensure Node.js 22 is installed (use `nvm` to manage versions)
2. Install pnpm globally: `npm install -g pnpm`
3. Clone the repository
4. Run `pnpm install` in the root directory

## Project Structure

```
stack-2026/
├── apps/              # Application code
│   ├── web/           # Web application (Next.js)
│   └── mobile/        # Mobile application (React Native)
├── packages/        # Shared libraries and components  
│   ├── ui/            # UI component library
│   ├── core/          # Core business logic
│   └── utils/         # Utility functions
├── infra/               # Infrastructure as code
├── docs/              # Documentation
└── .github/           # GitHub configuration
```

## Code Standards

### TypeScript Usage

1. Always use TypeScript for type safety:
```typescript
// Good
interface User {
  id: number;
  name: string;
}

function processUser(user: User): void {
  // implementation
}

// Avoid
const user = { id, name } // No explicit typing
```

2. Use strict mode in all files:
```typescript
"use strict";
```

### Component Structure

All components should follow this structure:

1. **TypeScript interfaces** for props and state
2. **Clear separation of concerns**
3. **Component documentation with JSDoc**

Example component:
```tsx
/**
 * A reusable button component 
 */
interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = 'primary' }) => {
  return (
    <button className={`btn btn-${variant}`} onClick={onClick}>
      {label}
    </button>
  );
};
```

## Package Structure

Each package should have:
1. `package.json` with correct dependencies and scripts
2. TypeScript configuration (`tsconfig.json`)
3. README.md with usage instructions
4. Tests using Jest or Vitest
5. Documentation in the `/docs` directory

### Example Package Structure
```
packages/
  └── ui/
      ├── src/
      │   └── components/
      ├── package.json
      ├── tsconfig.json  
      └── README.md
```

## Development Workflow

1. **Create feature branches**: `feature/issue-number-description` 
2. **Run tests before committing**: `pnpm test`
3. **Lint code**: `pnpm lint`
4. **Format code**: `pnpm format`
5. **Commit with conventional commits**: https://www.conventionalcommits.org/

## Testing

### Unit Tests
- Use Jest for unit testing components and utilities
- Place tests alongside source files in `__tests__` directory
- Aim for 100% test coverage of critical business logic

Example:
```typescript
import { sum } from './math';

test('should add numbers correctly', () => {
  expect(sum(2, 3)).toBe(5);
});
```

### Integration Tests
- Test interactions between multiple components or services  
- Use tools like Playwright for end-to-end testing of web applications

## Code Quality Tools

### ESLint Configuration
```json
{
  "extends": [
    "@typescript-eslint/recommended",
    "eslint:recommended"
  ],
  "rules": {
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/strict-boolean-expressions": "error"
  }
}
```

### Prettier Configuration  
```json
{
  "semi": true,
  "singleQuote": true,
  "trailingComma": "es5",
  "printWidth": 80,
  "tabWidth": 2
}
```

## Git Hooks

1. Husky is configured to run linting and tests before each commit
2. Pre-commit hooks enforce code quality standards
3. Commit message convention: [type]: description (e.g., feat: add user authentication)

## Documentation Standards  

### API Documentation
All APIs should include:
- Clear endpoint descriptions  
- Request/response schema examples
- Error handling documentation

### Component Documentation  
Each component should have JSDoc comments:

```typescript
/**
 * A reusable navigation menu component 
 * @param {string} title - The heading text for the menu
 * @param {Array<{text: string, url: string}>} items - Menu items with labels and links
 */
```

## Environment Variables

All environment variables should be:
1. Defined in `.env` files (not committed to repository)
2. Documented in `README.md`
3. Managed through a secrets management system in production environments

Example `.env` file:
```bash
# Database credentials
DB_HOST=localhost
DB_PORT=5432
DB_NAME=myapp

# API keys  
API_KEY=your-secret-key-here
```

## Performance Guidelines  

1. **Lazy loading**: Load components only when needed
2. **Code splitting**: Split bundles for better performance 
3. **Efficient state management**: Use React Context or Zustand appropriately
4. **Optimized image loading**: Use modern formats and lazy loading

## Security Best Practices  

1. Never expose sensitive information in the frontend
2. Always validate inputs on both client and server-side  
3. Implement rate limiting for API endpoints
4. Use HTTPS in all environments
5. Sanitize user input to prevent XSS attacks

## Contributing

1. Create a fork of this repository
2. Make your changes in a feature branch 
3. Run tests locally before submitting pull request
4. Update documentation if necessary  
5. Submit a pull request with clear description and links to issues addressed

## Release Process  

1. Tag releases using semantic versioning (v1.0.0, v1.1.0, etc.)
2. Generate changelogs automatically from commits 
3. Publish packages to npm registry when needed
4. Update documentation for new versions