# CLAUDE.md

## Project
Admin page for "The Humor Project" class database — tech stack: Next.js, TypeScript, TailwindCSS

## UI References
- Wireframes are in `docs/wireframes/`. These wireframes are structural only (disregard black and white color palette)
- Design system: Tailwind utility classes only, no custom CSS unless necessary

## Supabase MCP Safety Rules

Claude may use the Supabase MCP to inspect the database schema and read data.

Allowed actions:

- Read table schemas
- View table columns
- Run SELECT queries
- Inspect relationships
- Inspect indexes
- Inspect policies (read-only)

Claude should treat the database as **read-only**.

If a task requires modifying the database, Claude must:
1. Explain the change needed
2. Ask the user for approval
3. Wait for confirmation before proceeding.

Never make destructive changes automatically.

## Key Commands
- `npm run dev` — start dev server
- `npm run lint` — lint check
- `npm run build` — production build