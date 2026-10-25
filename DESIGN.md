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
  border-hairline: "#e4e4e7"
  border-hairline-dark: "rgba(255, 255, 255, 0.1)"
  fg: "#18181b"
  fg-dark: "#f4f4f5"
  fg-muted: "#52525b"
  fg-muted-dark: "#d4d4d8"
  fg-meta: "#71717a"
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

## Colors

The palette is composed of an uncompromising monochrome zinc spectrum ranging from deep obsidian blacks to crisp slate whites, reserving color solely for functional status indicators.

### Primary
- **Obsidian Zinc** (#18181b / light primary, #f4f4f5 / dark primary): The dominant ground for high-priority calls to action, active navigation underlines, and high-contrast text.

### Neutral
- **Blueprint Slate Ground** (#f1f5f9 / light body bg, #09090b / dark body bg): The foundational backdrop supporting high-contrast readable content.
- **Architectural Surface** (#ffffff / light card surface, rgba(255, 255, 255, 0.04) / dark card surface): Flat container fill providing clean separation from the page background.
- **Hairline Border** (#e4e4e7 / light border, rgba(255, 255, 255, 0.1) / dark border): 1px structural framing used for section headers, cards, and modal dividers.
- **Muted Body Text** (#52525b / light body, #d4d4d8 / dark body): High-legibility text for descriptive paragraphs and technical summaries.
- **Metadata Label Zinc** (#71717a / light kicker, #a1a1aa / dark kicker): De-emphasized tone for uppercase kickers, dates, and auxiliary badges.

### Status (Functional Only)
- **Signal Danger** (#dc2626 / light, #f87171 / dark): Functional alert signal reserved strictly for input validation errors and character limit breaches.

### Named Rules
**The Zero-Gradient Rule.** Gradients are strictly forbidden across backgrounds, text, and buttons. Visual hierarchy is achieved exclusively through scale, weight, and tonal contrast.

**The Functional Color Rule.** Chromatic color may never be used for decoration. Red is permitted only for error states; green and amber are permitted only for verified operational status.

## Typography

**Display Font:** Poppins (sans-serif)  
**Body Font:** DM Sans (sans-serif)  
**Label/Mono Font:** ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace  

**Character:** Technical engineering precision meets academic clarity. Bold geometric display headings command immediate focus, supported by a readable humanist sans body and stark monospace technical data tags.

### Hierarchy
- **Display** (Bold 700, clamp(2.25rem, 5vw, 4.5rem), line-height 1.05): Hero slogans, primary page banners, and key showcase headlines.
- **Headline** (Bold 700, clamp(1.5rem, 3vw, 2.25rem), line-height 1.15): Section titles, modal headings, and facility room identifiers.
- **Title** (SemiBold 600, 1.25rem to 1.5rem, line-height 1.3): Project titles, member names, thesis cards, and practicum titles.
- **Body** (Regular 400, 0.875rem to 1rem, line-height 1.6): Narrative copy, abstracts, research descriptions (max line width 65ch).
- **Label** (Regular 400, 11px, letter-spacing 0.16em, uppercase): Metadata labels, taxonomy tags, group labels, status chips, and date stamps. Never used as an eyebrow above a heading.

### Named Rules
**The Metadata-Only Kicker Rule.** Section headings stand alone; no kicker or eyebrow may sit above a heading. Monospace uppercase labels are reserved for metadata: card taxonomy tags, record metadata lines, group labels, status chips, and date stamps.

**The Solid Heading Rule.** Display headings remain solid high-contrast foreground color; secondary muted words are reserved only for deliberate secondary sub-phrases.

## Layout

The spatial model is organized around a centered 85rem (1360px) envelope with responsive padding (`px-6 md:px-10 lg:px-14 py-12 md:py-16`).

- **Section Envelope:** Content stays aligned to a strict vertical grid, maintaining flush outer margins across desktop and mobile viewports.
- **Asymmetric Header Split:** Major section headers employ an asymmetric layout with heading on the left, paired with concise narrative copy on the right, sealed by a full-width 1px hairline rule.
- **Responsive Stacking:** Desktop multi-column grids (2-column preview splits, 3-column project news grids) collapse cleanly into single-column vertical flows on viewports below 768px.
- **Density:** High informational density without visual noise. Breathing room is governed by rhythmic step spacing (`pb-16 md:pb-24 lg:pb-32` above major transition thresholds).

## Elevation & Depth

**Flat-by-Default Architectural Stance.**

Surfaces in the B401 design system exist on a flat plane. Depth is communicated through 1px hairline boundaries, subtle tonal contrast between ground and surface, and mechanical L-corner ticks.

### Shadow Vocabulary
- **Resting Surfaces:** No box shadow (`box-shadow: none`). Containers rely on 1px borders (`border border-zinc-200 dark:border-white/10`).
- **Interactive Hover State:** Restrained translate lift (`transform: translateY(-2px)`) with instant or crisp easing; no heavy diffuse glow.
- **Floating Overlays (Modals & Nav):** Restrained structural shadow (`0 10px 15px -3px rgba(0, 0, 0, 0.1)`) backed by a frosted backdrop blur (`backdrop-blur-sm` / `backdrop-blur-xl`) to preserve readability over background testbeds.

### Named Rules
**The Hairline Boundary Rule.** Never separate flat content blocks with shadow elevation; always delineate boundaries with a 1px solid hairline border.

## Shapes

The form language is sharp, planar, and rectangular, mirroring precision machine components and architectural drafting sheets.

- **Corner Radius:** Sharp right angles (`rounded-none` / 0px) are the standard for buttons, cards, containers, input fields, and tags. Rounded elements are restricted to circular toggles, avatars, and status dots.
- **The Corner-Frame Primitive:** Photographic assets and hardware specimens are mounted inside `.corner-frame` containers: rectangular surfaces framed by opposing 12px L-shaped corner ticks (`border-left`/`border-top` at top-left, `border-right`/`border-bottom` at bottom-right).

## Components

Interactive elements embody precision, restraint, and immediate state feedback.

### Buttons
- **Shape:** Rectangular sharp edges (0px radius).
- **Primary:** High-contrast solid fill (#18181b in light mode with white text; #f4f4f5 in dark mode with #18181b text). Monospace or medium sans typography, padding 12px 24px (`px-6 py-3`).
- **Hover / Focus:** Micro-lift (`-translate-y-0.5`), subtle opacity shift (90%), focus ring offset 2px.
- **Secondary / Ghost:** 1px hairline outline (`border border-zinc-300 dark:border-zinc-700`) with hover fill transition.

### Chips & Badges
- **Style:** Monospace uppercase tracking (0.16em), 11px font size, 1px border (`border-zinc-300 dark:border-white/15`), transparent background.
- **State:** Active chips invert foreground and border to solid primary tone.

### Cards & Specimen Frames
- **Corner Style:** Sharp 0px corners.
- **Background:** Crisp white (#ffffff) in light mode; subtle translucent tint (`rgba(255, 255, 255, 0.04)`) in dark mode.
- **Border:** 1px hairline border (`border-zinc-200 dark:border-white/10`).
- **Padding:** 24px to 32px (`p-6` to `p-8`).

### Inputs & Text Areas
- **Style:** 1px perimeter border (`border-zinc-200 dark:border-white/10`), flat background, sans body type, sharp corners.
- **Focus:** Sharp border shift to primary foreground (`focus:border-zinc-900 dark:focus:border-zinc-100`), outline-none.
- **Error State:** Border shifts to Signal Danger (`border-red-600 dark:border-red-400`).

### Navigation
- **Header:** Fixed top bar with dynamic hide-on-scroll down / reveal-on-scroll up behavior.
- **Desktop Links:** Clean horizontal list with an animated expanding underline indicator (`scale-x-100` on active and hover).
- **Theme Toggle:** Precision pill track with sliding circular thumb.

### Modals
- **Backdrop:** Dimmed backdrop blur (`bg-zinc-900/50 backdrop-blur-sm`).
- **Surface:** Sharp rectangular panel with hairline border, full-bleed specimen banner, and scrollable details body.

## Do's and Don'ts

### Do:
- **Do** keep section headings bare; use monospace uppercase labels only for metadata, tags, and group labels.
- **Do** enclose hardware images and research specimen photography inside `.corner-frame` containers with L-shaped corner ticks.
- **Do** enforce sharp 0px radius on buttons, inputs, tags, and content cards.
- **Do** use 1px hairlines (`border-zinc-200 dark:border-white/10`) for all spatial dividers and borders.
- **Do** maintain strict monochrome zinc tones for all layout surfaces and typography.

### Don't:
- **Don't** use purple, indigo, cyan, or rainbow gradient fills on buttons, backgrounds, or text.
- **Don't** introduce bubbly rounded pill buttons or high-radius cards.
- **Don't** apply heavy diffuse drop shadows to resting cards.
- **Don't** use color decoratively; reserve chromatic red exclusively for error conditions and alerts.
- **Don't** omit dark mode support for any new component or view.
