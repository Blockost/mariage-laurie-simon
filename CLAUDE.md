# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

Wedding website for Laurie & Simon, built with Angular 22 (zoneless-ready, standalone components, SSR via Angular SSR + Express). The app is a freshly scaffolded Angular CLI project — `src/app/app.routes.ts` has no routes defined yet, so there is no established feature structure to follow yet; use idiomatic Angular 22 conventions (standalone components, `signal`-based state) when adding one.

## Commands

- `npm start` / `ng serve` — run the dev server at `http://localhost:4200/` (uses the `development` build configuration).
- `ng build` — production build, output to `dist/`. `ng build --configuration development` (or `npm run watch` for a watched build) uses the dev configuration instead.
- `ng test` — run unit tests via the Vitest-based Angular test runner (`@angular/build:unit-test`). To run a single test file, pass it directly, e.g. `ng test -- src/app/app.spec.ts`.
- `npm run serve:ssr:mariage-laurie-simon` — run the built SSR server from `dist/mariage-laurie-simon/server/server.mjs` (run `ng build` first).
- No e2e framework is configured.

## Architecture

- **Rendering**: SSR is enabled with `outputMode: "server"` and prerendering (`src/app/app.routes.server.ts` sets `RenderMode.Prerender` for all routes, `**`). Client hydration is enabled via `provideClientHydration()` in `src/app/app.config.ts`. New routes added to `src/app/app.routes.ts` should have a matching entry considered in `app.routes.server.ts` if a different render mode (e.g. `Server` instead of `Prerender`) is needed.
- **Server entry**: `src/server.ts` is an Express app wrapping `AngularNodeAppEngine`; it serves static assets from `dist/.../browser` and falls back to Angular SSR rendering for all other requests. Any custom REST endpoints should be added here (there's a marked placeholder spot before the catch-all handler). Listens on `process.env.PORT` (default 4000).
- **Config split**: `app.config.ts` (browser providers) is merged with `app.config.server.ts` (server-only providers, e.g. `provideServerRendering`) via `mergeApplicationConfig` — keep browser-only vs. server-only providers in their respective files.
- **Bootstrap**: `src/main.ts` (browser) and `src/main.server.ts` (server) are the two entry points; don't need to be touched when adding features/routes.

## Conventions

- Style: 2-space indent, single quotes, 100-char print width (Prettier config in `.prettierrc`, enforced via `.editorconfig`).
- Components generated with `ng generate component` default to SCSS styles (`angular.json` schematics config) — keep using SCSS for new components.
- TypeScript is strict; keep to the existing `tsconfig.app.json` / `tsconfig.spec.json` split (app code vs. test code).
