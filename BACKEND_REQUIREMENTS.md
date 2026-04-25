# Shohoj Path Backend Requirements

This frontend includes mocked route handlers under `app/api/*` and a machine-readable contract file at `public/contracts/shohoj-path-backend-contract.json`.

## Core endpoints

1. `GET /api/tasks`
2. `GET /api/tasks/:slug`
3. `GET /api/search?q=...`
4. `GET /api/community/insights`
5. `GET /api/navigation/:slug`
6. `POST /api/contributions`
7. `GET /api/contracts`
8. `GET /api/location/reverse?lat=...&lon=...`

## Auth expectations

- Browsing tasks, search, route previews, and community insights should be public.
- Posting contributions should require authentication.
- The frontend mock uses header `x-mock-user-id` to demonstrate protected contribution submission.

## Data expectations

- A task must return summary fields, documents, steps, linked locations, route stops, AI summary, and community tip.
- A step should support optional `fee`, linked `locationId`, and a `contributionLocked` flag.
- Contribution responses should include moderation metadata so the UI can show pending or approved states later.

## Handoff files

- Contract JSON: `public/contracts/shohoj-path-backend-contract.json`
- Mock source of truth: `lib/shohoj-path/mock-data.ts`
- Human-readable in-app spec page: `/api-spec`
