---
name: B401 Robotics Laboratory
description: Blueprint editorial design system for robotics and intelligent systems research
colors:
  primary: "#18181b"
  primary-dark: "#f4f4f5"
  neutral-bg: "#f1f5f9"
  neutral-bg-dark: "#09090b"
  surface: "#ffffff"
  surface-dark: "rgba(255, 255, 255, 0.04)"
  surface-raised: "#ffffff"
  surface-raised-dark: "#18181b"
  border-hairline: "#e4e4e7"
  border-hairline-dark: "rgba(255, 255, 255, 0.1)"
  fg: "#18181b"
  fg-dark: "#f4f4f5"
  fg-muted: "#52525b"
  fg-muted-dark: "#d4d4d8"
  fg-meta: "#52525b"
  fg-meta-dark: "#a1a1aa"
  danger: "#dc2626"
  danger-dark: "#f87171"
typography:
  display:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(2.25rem, 5vw, 4.5rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Poppins, sans-serif"
    fontSize: "clamp(1.5rem, 3vw, 2.25rem)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.01em"
  title:
    fontFamily: "Poppins, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 600
    lineHeight: 1.3
    letterSpacing: "-0.01em"
  body:
    fontFamily: "DM Sans, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "normal"
  label:
    fontFamily: "ui-monospace, monospace"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.16em"
rounded:
  none: "0px"
  sm: "2px"
  md: "4px"
  full: "9999px"
spacing:
  xs: "4px"
  sm: "8px"
  md: "16px"
  lg: "24px"
  xl: "32px"
  2xl: "48px"
  3xl: "64px"
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "#ffffff"
    rounded: "{rounded.none}"
    padding: "12px 24px"
  button-primary-hover:
    backgroundColor: "#27272a"
  button-primary-dark:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.primary}"
  chip:
    backgroundColor: "transparent"
    textColor: "{colors.fg-muted}"
    rounded: "{rounded.none}"
    padding: "4px 10px"
---

# Design System: B401 Robotics Laboratory

## Overview

**Creative North Star: "The Robotics Blueprint"**

The B401 Robotics Laboratory design system is built on the aesthetic and mechanical discipline of technical engineering blueprints and physical laboratory instruments. The interface prioritizes clarity, informational density, and high-contrast readability. Every visual element communicates structural intent: stark monochrome zinc surfaces, razor-thin 1px architectural hairlines, technical monospace metadata kickers, and mechanical L-shaped corner framing ticks.

Rather than decorative embellishment, the system achieves distinction through precise proportions, deliberate typographic contrast, and restrained motion. Display headlines are rendered in geometric, bold Poppins to establish presence, anchored by a neutral DM Sans reading body, and cataloged via wide-tracked monospace tags.

Anti-reference: Consumer SaaS slop. The interface rejects saturated purple/indigo gradient buttons, pill-shaped bubble badges, noisy decorative drop shadows, and artificial glassmorphism. Surfaces are flat, intentional, and strictly grounded in authentic laboratory evidence.

**Key Characteristics:**
- Strict architectural flatness bounded by 1px hairline dividers.
- L-shaped corner ticks enclosing specimen cards, robotic hardware photos, and project assets.
- Monochrome blueprint zinc palette with functional status signaling only.
- High-contrast typography pairing Poppins display, DM Sans body, and monospace label scales.
- Clean technical affordances with sharp right-angle geometries.
- Rigorous accessibility standards: WCAG AA contrast compliance (4.5:1 on metadata at 11px), 44px minimum tap targets, and comprehensive reduced motion support.

## Colors

The palette is composed of an uncompromising monochrome zinc spectrum ranging from deep obsidian blacks to crisp slate whites, reserving chromatic color solely for functional status indicators.

### Primary
- **Obsidian Zinc** (`#18181b` / light primary, `#f4f4f5` / dark primary): The dominant ground for high-priority calls to action, active navigation underlines, and high-contrast text (`text-zinc-900` / `dark:text-zinc-100`).

### Neutral
- **Blueprint Slate Ground** (`#f1f5f9` / light `bg-slate-100`, `#09090b` / dark `bg-zinc-950`): The foundational backdrop supporting high-contrast readable content.
- **Architectural Surface** (`#ffffff` / light card surface, `rgba(255, 255, 255, 0.04)` / dark card surface): Flat container fill providing clean separation from the page background.
- **Raised Surface** (`#ffffff` / light, `#18181b` / dark `dark:bg-zinc-900`): Elevated containers for modals, dropdowns, and persistent panels.
- **Hairline Border** (`#e4e4e7` / light `border-zinc-200`, `rgba(255, 255, 255, 0.1)` / dark `dark:border-white/10`): 1px structural framing used for section headers, cards, syllabus ledgers, and modal dividers.
- **Muted Body Text** (`#52525b` / light `text-zinc-600`, `#d4d4d8` / dark `dark:text-zinc-300`): High-legibility text for descriptive paragraphs and technical summaries.
- **Metadata Label Zinc** (`#52525b` / light `text-zinc-600`, `#a1a1aa` / dark `dark:text-zinc-400`): Tuned specifically to pass WCAG AA contrast (4.5:1) at 11px on light slate ground and dark zinc ground.

### Status (Functional Only)
- **Signal Danger** (`#dc2626` / light `text-red-600`, `#f87171` / dark `dark:text-red-400`): Alert signal reserved strictly for input validation errors, character limit breaches, and error banners (`surface-danger`: `border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/30`).

### Named Rules
**The Zero-Gradient Rule.** Gradients are strictly forbidden across backgrounds, text, and buttons. Visual hierarchy is achieved exclusively through scale, weight, and tonal contrast.

**The Functional Color Rule.** Chromatic color may never be used for decoration. Red is permitted only for error states; green and amber are permitted only for verified operational status.

## Typography

**Display Font:** Poppins (sans-serif)  
**Body Font:** DM Sans (sans-serif)  
**Label/Mono Font:** ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace  

**Character:** Technical engineering precision meets academic clarity. Bold geometric display headings command immediate focus, supported by a readable humanist sans body and stark monospace technical data tags.

### Hierarchy
- **Display** (Bold 700, `clamp(2.25rem, 5vw, 4.5rem)`, line-height 1.05): Hero slogans and primary page banners (`.section-heading text-4xl md:text-6xl`).
- **Headline** (Bold 700, `clamp(1.5rem, 3vw, 2.25rem)`, line-height 1.15): Section titles, modal headings, and facility room identifiers.
- **Title** (SemiBold 600, 1.25rem to 1.5rem, line-height 1.3): Project titles, member names, thesis cards, and practicum titles.
- **Body** (Regular 400, 0.875rem to 1rem / 1.125rem, line-height 1.6): Narrative copy, abstracts, research descriptions (max line width 65ch).
- **Label / Kicker** (Regular 400, 11px, letter-spacing 0.16em, uppercase): Monospace metadata labels, taxonomy tags, room numbers (`LAB 01`), group counts, status chips, and date stamps (`.kicker`).

### Named Rules
**The Metadata-Only Kicker Rule.** Section headings stand alone; no kicker or eyebrow may sit above a section heading (with the single sanctioned exception of the home hero banner). Monospace uppercase labels are reserved for metadata: card taxonomy tags, record metadata lines, group labels, status chips, and date stamps.

**The Solid Heading Rule.** Display headings remain solid high-contrast foreground color; secondary muted words are reserved only for deliberate secondary sub-phrases (`.fg-muted`).

## Layout & Architecture

The spatial model is organized around a centered 85rem (1360px) envelope with responsive padding (`px-6 md:px-10 lg:px-14 py-12 md:py-16`).

- **Section Envelope:** Content stays aligned to a strict vertical grid, maintaining flush outer margins across desktop and mobile viewports.
- **Asymmetric Header Split:** Major section headers employ an asymmetric layout with heading and optional muted phrase on the left, paired with narrative copy on the right, sealed by a full-width 1px hairline rule (`.section-header`).
- **Multi-View Route Structure:**
  - **Home View (`/`):** Continuous editorial preview experience featuring Hero, About, Research preview, Highlight preview, Equipment preview (3-lab rooms grid), Practicums preview (specimen + curriculum tracks ledger), Members preview, and interactive Chatbot assistant.
  - **Dedicated Section Views:** Immersive full-page experiences under `/:section` (`/research`, `/highlight`, `/equipment`, `/practicums`, `/members`), each featuring specialized heroes, filters, archives, and modal dialogs.
- **Responsive Stacking:** Desktop multi-column grids (2-column preview splits, 3-column project news grids, 3-column laboratory room splits) collapse cleanly into single-column vertical flows on viewports below 768px.
- **Architectural Footer:** Consolidated 3-column layout replacing fragmented contact sections: Lab Identity & Slogan, Physical Location ("Find Us"), and Social Connections & University Links ("Contact Us").

## Elevation & Depth

**Flat-by-Default Architectural Stance.**

Surfaces in the B401 design system exist on a flat plane. Depth is communicated through 1px hairline boundaries, subtle tonal contrast between ground and surface, and mechanical L-corner ticks.

### Shadow Vocabulary
- **Resting Surfaces:** No box shadow (`box-shadow: none`). Containers rely on 1px borders (`border border-zinc-200 dark:border-white/10`).
- **Interactive Hover State:** Restrained translate lift (`transform: translateY(-2px)`) with instant or crisp easing; no heavy diffuse glow.
- **Floating Overlays (Modals & Nav):** Restrained structural shadow backed by a dimmed backdrop blur (`bg-zinc-900/50 backdrop-blur-sm`) to preserve readability over background content.

### Named Rules
**The Hairline Boundary Rule.** Never separate flat content blocks with shadow elevation; always delineate boundaries with a 1px solid hairline border.

## Shapes & Primitives

The form language is sharp, planar, and rectangular, mirroring precision machine components and architectural drafting sheets.

- **Corner Radius:** Sharp right angles (`rounded-none` / 0px) are the standard for buttons, cards, containers, input fields, and tags. Rounded elements are strictly restricted to the dark mode toggle switch and the active navigation underline pill.
- **The Corner-Frame Primitive:** Photographic assets and hardware specimens are mounted inside `.corner-frame` containers: rectangular surfaces framed by opposing 12px L-shaped corner ticks (`border-left`/`border-top` at top-left, `border-right`/`border-bottom` at bottom-right) or 4-corner component ticks (`CornerTicks`).
- **Syllabus Ledger Primitive:** Curriculum tracks and thesis archives avoid cards; they use continuous hairline-separated editorial rows with subtle hover background highlights (`hover:bg-zinc-900/[0.02] dark:hover:bg-white/[0.02]`).

## Components

Interactive elements embody precision, restraint, and immediate state feedback.

### Buttons
- **Shape:** Rectangular sharp edges (0px radius), minimum 44px height for touch targets.
- **Primary:** High-contrast solid fill (#18181b in light mode with white text; #f4f4f5 in dark mode with #18181b text). Monospace or medium sans typography, padding 12px 24px (`px-6 py-3`).
- **Hover / Focus:** Micro-lift (`-translate-y-0.5`), directional arrow displacement (`group-hover:translate-x-1`), focus-visible ring offset 2px.
- **Secondary / Ghost:** 1px hairline outline (`border border-zinc-300 dark:border-zinc-700`) with hover fill transition.

### Chips & Badges
- **Style:** Monospace uppercase tracking (0.16em), 11px font size, 1px border (`border-zinc-300 dark:border-white/15`), transparent background.
- **Suggestion Chips:** Interactive query pills in the Chatbot assistant for one-click prompts.

### Cards & Specimen Frames
- **Corner Style:** Sharp 0px corners with `.corner-frame` L-ticks.
- **Background:** Crisp white (#ffffff) in light mode; subtle translucent tint (`rgba(255, 255, 255, 0.04)`) in dark mode.
- **Border:** 1px hairline border (`border-zinc-200 dark:border-white/10`).
- **Image Hover:** Smooth progressive scale (`hover:scale-[1.04]`) contained within masked boundaries.

### Interactive Modals & Dialogs
Built on the `useDialog` hook with strict keyboard accessibility and focus management:
- **Focus Management:** Automatic focus on first interactive child, keyboard Tab trap, and focus restoration to the trigger element upon closing.
- **Escape & Backdrop:** Immediate dismissal on `Escape` key press or backdrop click.
- **Scroll Lock:** Locks document body scroll while preserving scrollbar width compensation to prevent viewport jumping.
- **Modal Variations:**
  - `FacilityModal`: Full-bleed specimen photography, category/room kicker, and laboratory equipment specifications.
  - `PersonModal`: Complete academic/member profile (role, education, expertise, theses, contact).
  - `PdfViewerModal`: In-app reader for practicum modules, transforming Google Drive URLs into embedded previews with external link fallbacks.

### AI Assistant (Chatbot Section)
- **Interface:** Fixed-width centered workbench with suggested query chips, multi-line auto-resizing text area, and real-time character counter (500-char max).
- **Validation:** Character counter shifts to Signal Danger (`text-danger`) when limit is reached; submission button disables.
- **Markdown Parser:** Custom parser rendering bold, italic, code spans, bullet/numbered lists, inline links, and responsive Markdown tables with hairline borders.

### Navigation & Header
- **Fixed Top Bar:** Progressive scroll-delta translation (hides on scroll-down, instantly reveals on scroll-up).
- **Alignment:** `.nav-edge-px` aligns desktop logo and toggle controls with the 85rem section envelope.
- **Active Indicator:** Smooth horizontal underline scaling (`scale-x-100` on active and hover).
- **Accessibility:** "Skip to content" keyboard navigation target positioned at `#main-content`.
- **Theme Toggle:** Sliding toggle switch persisting preferences across sessions.

## Accessibility & Motion

- **WCAG AA Compliance:** Strict color contrast verification across both light and dark themes. The metadata color token (`fg-meta`) is explicitly calibrated to pass 4.5:1 contrast at 11px.
- **Minimum Target Size:** All buttons, links, suggestion chips, and modal triggers enforce a 44px minimum tap/click target.
- **Reduced Motion Support (`useReducedMotion`):**
  - Hero carousel auto-rotation is disabled.
  - Smooth scrolling drops to instant scrolling (`scroll-behavior: auto`).
  - Translational entry transitions (`translateY`) are stripped, replaced by rapid stationary opacity fades (`150ms`).

## Do's and Don'ts

### Do:
- **Do** keep section headings bare; use monospace uppercase labels only for metadata, tags, lab codes, and group counts.
- **Do** enclose hardware images and research specimen photography inside `.corner-frame` containers with L-shaped corner ticks.
- **Do** enforce sharp 0px radius on buttons, inputs, tags, and content cards.
- **Do** use 1px hairlines (`border-zinc-200 dark:border-white/10`) for all spatial dividers and borders.
- **Do** maintain strict monochrome zinc tones for all layout surfaces and typography.
- **Do** route dialogs through the `useDialog` hook to ensure keyboard trapping and scroll stability.
- **Do** respect `prefers-reduced-motion` across all animated transitions.

### Don't:
- **Don't** use purple, indigo, cyan, or rainbow gradient fills on buttons, backgrounds, or text.
- **Don't** introduce bubbly rounded pill buttons or high-radius cards.
- **Don't** apply heavy diffuse drop shadows to resting cards.
- **Don't** use color decoratively; reserve chromatic red exclusively for error conditions and alerts.
- **Don't** omit dark mode support or WCAG AA contrast verification for any new component or view.
