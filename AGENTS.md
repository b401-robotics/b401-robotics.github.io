# Project Context

This is a website project for B401 Robotics and Intelligent Systems Laboratory. It will showcase the lab's focus of study, practicums, projects, members (both lecturers and students), equipments, and facilities.

The repository also hosts an internal **Content Editor** — a local-only CRUD tool used to maintain the bilingual content files under `src/contents/`. The editor is a developer tool, not part of the deployed site, and lives under `tools/content-editor/`. It is **strictly local-dev only** and must never be included in the GitHub Pages build. It discovers content files automatically, so adding a new content folder requires no editor code changes.

# Techstack

- Bun: Javascript runtime
- React: Frontend framework
- Tailwind: Page styling
- Typescript: Type-safe Javascript

# General Instructions

- Write code only in Typescript
- Write clean and readable code
- Always use best practice
- Avoid uncommon or hard-to-understand shorthands and one-liners if possible. Only use common-knowledge one-liners and shorthands
- Comply with Typescript rules. Always try to be type compliant
- ALWAYS consider the current content of the code before editing it. If current content changed a variable name from the previous agent-generated code, then KEEP the change. Don't revert it to it's previous state. For example, if the agent generate a varibale named var_name and then the user edit it to VarName, then keep VarName and don't revert it to var_name upon next agent-editing

# Non-code Response Instructions

- Only respond in short and compact but understandable way.
- Only summarize what you do, like what code you changed and how the change will affect the system. Do it in short, compact, and understandable language
- Do not write long explanations unless specifically told to do so

# Project Structure

- src/ : directory for source codes
- src/pages/ : directory for pages of the website
- src/assets/ : directory for assets (images, videos, etc.) used
- src/components/ : directory for components used in the website
- src/contens/ : directory for contents used in the website
- tools/content-editor/ : directory for the internal bilingual content CRUD tool (dev-only, not shipped)

---

# Content Editor — Plan

## 1. Purpose

A local, developer-only web app for creating, reading, updating, and deleting entries in the bilingual content files under `src/contents/`. Primary goal is **quality of life**: editing EN/ID pairs should be fast, safe, and hard to get wrong. It must never corrupt source files, never break the TypeScript build, never lose unsaved edits, **must scale to new content folders and files without editor code changes**, and **must never be reachable from the deployed GitHub Pages site**.

## 2. Scope & Discovery Rules

The editor does not use a hardcoded registry. It **scans** the filesystem at startup and on every file-change event.

**Discovery rules:**

- Scan `src/contents/*/` — every first-level subfolder is a candidate section.
- Inside each folder, collect every `.ts` file (`.tsx` is ignored, as are `.d.ts` and non-code files).
- For each `.ts` file, parse top-level `export const <name> = { ... } as const;` declarations only. Exported interfaces, types, and functions are ignored.
- **Bilingual pairing:** if a folder contains both `en.ts` and `id.ts`, and an export `<x>EN` in `en.ts` matches an export `<x>ID` in `id.ts` by shared `<x>` prefix, they are paired into one editable section keyed by `<x>`.
- **Standalone exports:** any export that does not fit the `<x>EN` / `<x>ID` pairing rule is exposed as its own single-file section (this is how `MembersContent/memberList.ts` is handled — its `lecturers`, `assistants`, and `alumni` exports each become a section).
- **Fallback:** a folder with only `en.ts` is listed as an "EN-only" section; the editor offers a one-click "Create ID" action that scaffolds `id.ts` with the same structure and empty strings.

**Conventions that new content must follow** (already used everywhere in `src/contents/`):

- One folder per section under `src/contents/`.
- Bilingual files named `en.ts` and `id.ts`.
- Exports named `<x>EN` and `<x>ID` for a paired section.
- Values are plain JS literals (string, number, boolean, array, object) so schema inference works.

**Out of scope / read-only:**

- `HeroContent/handleHeading.tsx` — JSX, shown read-only with a "edit in code" banner.
- `src/contents/translations.ts` — not hand-edited; only validated for consistency, and appended to by the scaffold flow.

## 3. Architecture

- **Runtime:** Bun for both server and dev tooling.
- **Backend:** `Bun.serve()` HTTP API that reads/writes the content `.ts` files on disk.
- **Frontend:** Vite + React + TypeScript + Tailwind, served in dev mode by Vite with a proxy to the Bun API.
- **Single command startup:** `bun run tools/content-editor` starts both server and Vite, opens the browser.
- **Discovery module:** `discoverSections.ts` walks `src/contents/*/` and builds the section registry from the rules in §2. Runs once on startup and again on every watcher event.
- **Hot reload:** the server watches `src/contents/` recursively with `fs.watch`. On any add/change/unlink it re-runs discovery and pushes the updated section list to the client over SSE. Unsaved client drafts are preserved.
- **File I/O:** `ts-morph` for AST-aware editing so comments, blank lines, and unrelated code are preserved. Only the target `export const` initializer is rewritten.
- **Formatting after write:** `bunx prettier --write <file>` to normalize the replaced node so diffs stay small.
- **Atomic writes:** write to `<file>.tmp` then `rename()` to the real path.
- **Post-save check:** after writing, run `bunx tsc --noEmit`. If it fails, restore the previous file content and surface the TS error in the UI.

## 4. Data Model (schema-aware)

The editor **infers** a schema from each section's value shape. No schema registration is needed — a brand-new section following the conventions in §2 is editable the moment it appears on disk. Supported node kinds:

- `string` — single-line text input
- `multilineString` — textarea (auto-detected by `\n` in value or by field name: `body`, `desc`, `summary`, `info`, `addressLines`, `institutionLines`, `locationValue`, `hoursValue`)
- `number`, `boolean` — number input / checkbox
- `stringArray` — list of text inputs (e.g. `tags`, `addressLines`)
- `object` — nested fieldset
- `objectArray` — repeatable list of objects (e.g. `highlights`, `items`, `areas`, `labRooms`, `facilities`, `topics`, `studentRoles`)
- `bilingualString` — `{ en: string, id: string }` detected inside any file (e.g. `role` and `specialty` in `memberList.ts`)
- `bilingualObject` — nested object whose leaf fields are bilingual strings

Every paired EN/ID section must have matching shapes. The editor compares key sets and array lengths on every load and highlights mismatches.

## 5. Server API

- `GET  /api/sections` — list all discovered sections with `{ key, kind, files, hasEn, hasId, dirty, standalone }`
- `GET  /api/section/:key/:lang` — read a section's parsed value (JSON)
- `PUT  /api/section/:key/:lang` — write a section
- `POST /api/reload` — re-scan `src/contents/` on demand
- `GET  /api/events` — SSE stream of discovery / file-change events
- `GET  /api/members` / `PUT /api/members` — convenience aliases that route to the `memberList.ts` sections
- `POST /api/validate` — cross-language + `translations.ts` + tsc validation report
- `POST /api/section/:key/create-id` — clone EN structure into a new `id.ts` with empty strings
- `POST /api/section` — scaffold a new section folder (`en.ts` + `id.ts`) and append the matching entries to `translations.ts`
- `POST /api/preview/:key/:lang` — optional; returns rendered HTML for preview

The server binds to `127.0.0.1` only (never `0.0.0.0`), so it is unreachable from other machines on the network.

## 6. UI / UX

- **Layout:** left sidebar (section list), main area split into EN | ID columns, right rail for validation & diff.
- **Sidebar:** sections grouped by folder. Dot indicator when dirty. "New Section" button at the top; "Refresh" button next to it. Standalone sections (like `memberList.ts`) are shown under a separate "Data Files" group.
- **Field editors:** auto-generated from the inferred schema. List items get drag handles, "Add", "Duplicate", "Delete" controls.
- **Paired EN/ID:** side-by-side panes with synchronized scroll. A "copy EN → ID" button on each field.
- **Standalone sections:** single-column layout (they already embed `{ en, id }` objects where needed).
- **Toolbar:** Save, Discard, Undo, Redo, Validate, Toggle Preview, Toggle Diff.
- **Preview pane:** renders the live section using the site's actual components when feasible; otherwise a readable text preview.
- **Diff view:** shows the exact textual change to the `.ts` file before commit.
- **Toast notifications:** success/failure, with the TS error message on failure.
- **Theme:** light & dark mode, matching the site's `dark:` Tailwind classes.

## 7. Quality-of-life features (highest priority)

1. **Zero config** — one command starts everything and opens the browser.
2. **Never lose work** — drafts auto-save to `localStorage` on every keystroke (debounced); restored on reload with a "restore draft?" prompt.
3. **Undo / redo** — in-memory stack per section, `Cmd/Ctrl+Z` and `Cmd/Ctrl+Shift+Z`.
4. **Atomic saves** — tmp file + rename, so files are never partially written.
5. **Auto-validate on save** — `tsc --noEmit` runs after each write; on failure, roll back and show the error.
6. **Minimal diffs** — ts-morph preserves everything outside the edited node; prettier normalizes the replaced node.
7. **Mismatch detection** — missing keys, extra keys, and length mismatches between EN and ID are highlighted, not silently ignored.
8. **Search** — global filter across all section labels and field values.
9. **Reorder / duplicate** — drag to reorder; one-click duplicate for array items.
10. **Keyboard shortcuts** — `Cmd/Ctrl+S` save, `Cmd/Ctrl+Z` undo, `Cmd/Ctrl+Shift+Z` redo, `Cmd/Ctrl+K` search.
11. **Copy between languages** — quick "copy EN → ID" per field and per section.
12. **Bulk toggle** — "fill missing ID with EN" for an entire section.
13. **Read-only awareness** — `.tsx` files and `translations.ts` shown with a clear "edit in code" notice.
14. **Type-safe schema** — the editor's internal types mirror `Translations` from `src/contents/translations.ts` so a mismatch is a compile error in the tool itself.
15. **Auto-discovery** — dropping a new folder under `src/contents/` with `en.ts` + `id.ts` makes it appear in the sidebar without restarting. No editor code change required.
16. **Live reload** — external edits to content files show up in the editor via SSE; unsaved drafts are preserved.
17. **One-click scaffold** — "New Section" prompts for a folder name and export prefix, then creates the folder, both language files, and appends the matching imports + entries to `translations.ts`.
18. **One-click ID creation** — for an EN-only section, generate `id.ts` with the same structure and empty strings.

## 8. Special-case handling

- `HeroContent/handleHeading.tsx` — discovered but marked read-only; a banner explains it is JSX and must be edited in code.
- `MembersContent/memberList.ts` — discovered as three standalone sections (`lecturers`, `assistants`, `alumni`). Each entry's `role` and `specialty` are `{ en, id }` objects, so the editor shows a paired input for those fields.
- `translations.ts` — never hand-written by the editor except through the scaffold flow. Otherwise the editor validates that every discovered section is registered and that `en` / `id` entries cover the same sections.
- **New outlier files** — any new `.ts` file dropped into a content folder is picked up by the generic discovery. No manifest to maintain.

## 9. Directory layout

tools/content-editor/
├── package.json
├── tsconfig.json
├── vite.config.ts
├── server/
│ ├── index.ts # Bun.serve() entry point — binds to 127.0.0.1 only
│ ├── routes.ts # API route handlers
│ ├── discoverSections.ts # scans src/contents/ and builds the section registry
│ ├── watcher.ts # fs.watch + SSE broadcast
│ ├── readSection.ts # load a section value from a .ts file
│ ├── writeSection.ts # ts-morph based write with atomic replace
│ ├── serialize.ts # JS value -> TS object literal string
│ ├── scaffold.ts # create new section folder + files + translations.ts entries
│ ├── validate.ts # cross-language + translations.ts + tsc validation
│ └── types.ts # shared server types
└── client/
├── index.html
├── main.tsx
├── App.tsx
├── api.ts # fetch wrappers around server endpoints
├── components/
│ ├── Sidebar.tsx
│ ├── SectionEditor.tsx
│ ├── FieldEditor.tsx
│ ├── ArrayFieldEditor.tsx
│ ├── PreviewPane.tsx
│ ├── DiffView.tsx
│ ├── ValidationPanel.tsx
│ ├── Toast.tsx
│ ├── Toolbar.tsx
│ └── NewSectionDialog.tsx
├── hooks/
│ ├── useSections.ts
│ ├── useDirtyState.ts
│ ├── useUndoRedo.ts
│ └── useAutoSaveDraft.ts
├── lib/
│ ├── schema.ts # shape inference from data
│ └── format.ts
└── styles.css

## 10. Implementation order

1. `discoverSections.ts` — walk `src/contents/*/`, pair `<x>EN` / `<x>ID`, expose standalone exports.
2. `readSection.ts` + `serialize.ts` + `writeSection.ts` — round-trip every discovered section through disk unchanged. Verify via `git diff` (must be empty).
3. Bun server (bound to `127.0.0.1`) + API endpoints; smoke-test with `curl`.
4. File watcher + SSE.
5. Vite + React shell with sidebar and section list.
6. Generic `FieldEditor` / `ArrayFieldEditor` driven by inferred schema.
7. Paired EN/ID layout with synchronized scroll.
8. Validation panel (mismatch + `translations.ts` + tsc).
9. Save flow: diff preview → confirm → atomic write → tsc → rollback on failure.
10. Undo/redo + draft auto-save.
11. New Section scaffold + Create ID from EN.
12. Preview pane wired to real site components.
13. Polish: dark mode, keyboard shortcuts, toasts.
14. `memberList.ts` standalone handling.
15. **Deployment-exclusion guards** (§12).

## 11. Non-negotiables

- The editor must round-trip every file unchanged when nothing is edited.
- The editor must never write a file that fails `tsc --noEmit`.
- Unsaved edits must survive a browser refresh.
- One command must start the tool; no manual setup for the developer.
- **Adding a new folder under `src/contents/` with `en.ts` + `id.ts` must require zero editor code changes** — it appears in the sidebar automatically.
- **Dropping any additional `.ts` file into a content folder must also require zero editor code changes** — it is discovered as a standalone section.
- **The editor must never appear in the GitHub Pages build or any deployed artifact.**

---

## 12. Deployment Exclusion (GitHub Pages)

### 12.1 Why it is safe by default

GitHub Pages only serves **static files**. It cannot run a Bun server, so the editor's `/api/*` endpoints — the only way the editor can read or write content files — do not exist in production. Even if the editor's HTML/JS were accidentally shipped, it would fail to fetch `/api/sections` and show an empty, non-functional UI. There is no filesystem to write to and no server to proxy writes back to the repo.

That said, defense in depth: we do **not** rely on this alone. Explicit guards ensure the tool is not even bundled.

### 12.2 Build-time exclusion guards

- **Separate build root.** The site build (`bun run build`) uses the Vite config at `src/` / project root. The editor build uses `tools/content-editor/vite.config.ts`. The two builds never share an entry graph.
- **No cross-imports.** Site code must never import from `tools/content-editor/`. Enforced with an ESLint rule (`no-restricted-imports` with pattern `tools/content-editor/*`) and a CI check.
- **Editor build never runs in CI deploy.** `.github/workflows/deploy.yml` runs only the site build and uploads `dist/` to Pages. It must not reference `tools/content-editor/`.
- **`.gitignore` for editor artifacts.** `tools/content-editor/dist/` and `tools/content-editor/node_modules/` are ignored so they can never be committed or picked up by a `public/`-style copy.
- **`public/` is clean.** The editor lives under `tools/`, not `public/`, so Vite's static-copy step cannot pick it up.
- **Guard script.** `tools/content-editor/scripts/assertNotDeployed.ts` runs as part of the deploy workflow and fails the build if any of the following are true:
  - Any file under `dist/` contains the string `content-editor` or `api/sections`.
  - Any file in the site's import graph resolves to `tools/content-editor/`.

### 12.3 Runtime guards

- **Loopback only.** The Bun server binds to `127.0.0.1`, so it is unreachable from any other machine on the LAN — even in dev.
- **Host header check.** Every `/api/*` request verifies `Host` is `localhost` or `127.0.0.1`. Requests from a Pages-origin `Host` are rejected with 403.
- **Origin check.** Writes (`PUT`, `POST`) require an `Origin` header matching the local Vite dev origin. Cross-origin writes are rejected, so a malicious page cannot silently drive the API.
- **Environment flag.** `server/index.ts` exits immediately if `process.env.NODE_ENV === "production"`. The tool has no production mode.

### 12.4 What a developer sees on GitHub Pages

Nothing editor-related. The deployed site only contains the public site. The editor is available exclusively via `bun run tools/content-editor` on a developer's machine.

<!-- gitnexus:start -->

# GitNexus — Code Intelligence

This project is indexed by GitNexus as **b401-robotics.github.io** (314 symbols, 555 relationships, 8 execution flows).

> Index stale? Run `node .gitnexus/run.cjs analyze --index-only` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? Bootstrap with `npx`, `bunx`, or `pnpm dlx` — e.g. `bunx gitnexus@latest analyze` (npm 11 npx crash; #1939).

## Always Do

- **MUST run impact before editing.** Use `impact({target: "symbolName", direction: "upstream"})` or `node .gitnexus/run.cjs impact "symbolName" --direction upstream --repo .`; report callers, processes, and risk. Never substitute grep for graph analysis.
- **MUST analyze graph changes before committing.** Use `detect_changes({scope: "all"})` (MCP) or `node .gitnexus/run.cjs detect-changes --scope all --repo .` (CLI fallback). `partial: true` or `truncated: true` is not a clean check — a zero means unseen, not unaffected; re-run it. For regression review: `detect_changes({scope: "compare", base_ref: "main"})` or `node .gitnexus/run.cjs detect-changes --scope compare --base-ref "main" --repo .`.
- MUST warn on HIGH/CRITICAL `risk` pre-edit; never use `riskSharedAxes` to waive a HIGH/CRITICAL `risk` warning. Compare File/symbol: MCP File omits axes; Graph-RAG expands File.
- **MUST treat `risk: UNKNOWN` as unresolved, not as low.** An empty caller set is not evidence the symbol is unused — it can also mean the callers are not resolvable by the index (plain-object property access, dynamic dispatch, cross-language calls). `impact` pairs `UNKNOWN` with a `riskNote` saying so. Confirm with a text search before treating the symbol as safe to change or delete; do not proceed on the strength of a zero.
- **MUST use `query({search_query: "concept"})` for concepts/flows, `context({name: "symbolName"})` for a named symbol, or `impact` for blast radius, on read-only callers, dependencies, imports, or execution flow.** Graph first; text search only for empty/`UNKNOWN`/literals.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method before MCP/CLI impact analysis.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis, and never read `UNKNOWN` as an all-clear — it means the walk could not answer, which is the one verdict that requires confirming by other means.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit before MCP/CLI graph change analysis.

## Resources

| Resource                                                 | Use for                                  |
| -------------------------------------------------------- | ---------------------------------------- |
| `gitnexus://repo/b401-robotics.github.io/context`        | Codebase overview, check index freshness |
| `gitnexus://repo/b401-robotics.github.io/clusters`       | All functional areas                     |
| `gitnexus://repo/b401-robotics.github.io/processes`      | All execution flows                      |
| `gitnexus://repo/b401-robotics.github.io/process/{name}` | Step-by-step execution trace             |

## CLI

| Task                                         | Read this skill file                               |
| -------------------------------------------- | -------------------------------------------------- |
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus-exploring/SKILL.md`       |
| Blast radius / "What breaks if I change X?"  | `.claude/skills/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?"             | `.claude/skills/gitnexus-debugging/SKILL.md`       |
| Rename / extract / split / refactor          | `.claude/skills/gitnexus-refactoring/SKILL.md`     |
| Tools, resources, schema reference           | `.claude/skills/gitnexus-guide/SKILL.md`           |
| Index, status, clean, wiki CLI commands      | `.claude/skills/gitnexus-cli/SKILL.md`             |

<!-- gitnexus:end -->
