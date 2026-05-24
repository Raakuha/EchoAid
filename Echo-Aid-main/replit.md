# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Artifacts

### EchoAid — Color Palette & Design Guide (`echoaid-palette`)
- **Preview path**: `/`
- **Purpose**: Color palette, typography tokens, accessibility guidelines, and Figma implementation guide for the EchoAid mental health platform.
- **Stack**: React + Vite + TailwindCSS
- **Design System**:
  - Primary: Healing Sage (#2E8B6F) — calming, nature-inspired
  - Secondary: Calm Periwinkle (#5B72E8) — trust and education
  - Accent: Warm Amber (#F0A030) — warmth and encouragement
  - Neutral: Blue-based Slate scale
- **Accessibility**: WCAG 2.1 AA compliant, screen reader friendly, dark mode ready

## Key Commands

- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- `pnpm --filter @workspace/api-server run dev` — run API server locally

See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details.
