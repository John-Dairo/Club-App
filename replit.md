# Overview

This is a full-stack club and event management application built with React, Express, and PostgreSQL. The platform enables users to discover clubs, join communities, create events, participate in chat rooms, and receive notifications. It features a mobile-first design with a modern UI using shadcn/ui components.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Framework**: React with TypeScript
- **Routing**: wouter (lightweight client-side routing)
- **State Management**: TanStack Query (React Query) for server state
- **UI Components**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens
- **Build Tool**: Vite

**Design Decisions**:
- Mobile-first responsive design with dedicated mobile navigation component
- Component-based architecture using shadcn/ui for consistency
- Custom theming using CSS variables for colors and typography
- Path aliases (@/, @shared/, @assets/) for clean imports

## Backend Architecture

**Framework**: Express.js with TypeScript
- **Runtime**: Node.js with ESM modules
- **Server Structure**: Single entry point (server/index.ts) with modular route handlers
- **Development**: tsx for TypeScript execution in development
- **Production**: Bundled with esbuild

**Key Modules**:
- `server/auth.ts`: Authentication logic using bcrypt for password hashing
- `server/storage.ts`: Database abstraction layer using Drizzle ORM
- `server/routes.ts`: RESTful API route definitions
- `server/seed.ts`: Database seeding for demo data

**API Design**:
- RESTful endpoints under `/api` prefix
- Authentication endpoints: `/api/auth/register`, `/api/auth/login`
- Resource endpoints: `/api/clubs`, `/api/events`, `/api/chat`, etc.
- Error handling middleware with status codes and JSON responses

## Database Layer

**ORM**: Drizzle ORM
- **Dialect**: PostgreSQL
- **Schema Location**: `shared/schema.ts` (shared between client and server)
- **Migrations**: Managed via drizzle-kit, stored in `/migrations` directory

**Schema Design**:
- `users`: User authentication and profiles
- `clubs`: Club information and metadata
- `events`: Event scheduling and details
- `clubMembers`: Many-to-many relationship with roles (member, moderator, admin, owner)
- `chatMessages`: Club-specific chat functionality
- `notifications`: User notification system
- `follows`: User-club following relationships

**Key Features**:
- UUID primary keys using PostgreSQL's `gen_random_uuid()`
- Foreign key relationships with cascading
- Timestamp tracking for created_at fields
- Type-safe schema with Zod validation via drizzle-zod

## Authentication & Authorization

**Strategy**: Session-based authentication (bcrypt for password hashing)
- Password hashing with 10 salt rounds
- User registration with duplicate username checking
- Login authentication with credential validation
- No JWT implementation - relies on session management

**Security Considerations**:
- Passwords excluded from API responses
- Bcrypt for secure password storage
- Basic error messages to prevent user enumeration

## External Dependencies

**Database Service**: 
- Neon Serverless PostgreSQL (@neondatabase/serverless)
- WebSocket constructor configured for serverless environment
- Connection pooling via Neon's Pool

**UI Component Library**:
- Radix UI primitives for accessible, unstyled components
- Full suite of UI components (dialogs, dropdowns, forms, etc.)
- Tailwind CSS for utility-first styling

**Development Tools**:
- Replit-specific plugins for development environment (vite-plugin-runtime-error-modal, vite-plugin-cartographer, vite-plugin-dev-banner)
- TypeScript with strict mode enabled
- PostCSS with Tailwind and Autoprefixer

**Third-Party Libraries**:
- `react-hook-form` with `@hookform/resolvers` for form management
- `date-fns` for date manipulation
- `zod` for schema validation
- `wouter` for lightweight routing
- `nanoid` for ID generation
- `class-variance-authority` and `clsx` for conditional styling

**Build & Bundling**:
- Vite for frontend development and building
- esbuild for backend bundling
- Separate build outputs: `dist/public` (frontend) and `dist` (backend)