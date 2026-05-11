# UI Guidelines

This note is the first draft of a contributor-facing reference for reader-facing UI standards in the Architrino webapp. Its purpose is to provide one place where interface preferences can be recorded deliberately instead of being scattered across code, scenes, and ad hoc decisions.

For now, this document is intentionally lightweight. It starts as a grouped inventory of UI elements and their preferred treatment, with many preferences left blank until they are explicitly decided.

The third column is a comma-separated ledger of known web-facing docs or app surfaces that do not yet match the preferred treatment. It can remain blank until those mismatches are audited.

## Global Chrome

| UI Element                  | Preference                                                                                                                                                                                | Current Non-Matching Uses                                                                                        |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Primary navigation metaphor | Use clickable spheres as the principal scene-navigation object: selecting a sphere descends into the next layer, while camera zoom/pan supports spatial orientation around that structure |  |
| App title treatment         | Browser page titles use lowercase `architrino` unless it is a use case where capitalization is typical, optionally followed by a lowercase feature suffix                                 |                                                                                                                  |
| animator header             | Timestamp-only                                                                                                                                                                            |                                                                                                                  |
| Global navigation buttons   | Include `Back`, `Forward`, `Home`, `Search`, `Info`, `Archie`, and `Notes`, using 32x32 circular dark-shell icon buttons in the main scene chrome                                         | animator action controls use text buttons instead of 32x32 circular icon buttons                                 |
| Search affordance           | Magnifier icon button opens an anchored search popover, clears the query, and focuses the input on open                                                                                   |                                                                                                                  |
| Notes toggle                | Document icon remains the canonical document-facing chrome control                                                                                                                        | `#doc-button` currently toggles textbook TOC state in `AppSceneChromeRuntime`, not a general scene-notes surface |
| Info/detail affordance      | Circle-i button reopens the detail panel; the scene-label chip can also become a keyboard-accessible info trigger                                                                         |                                                                                                                  |
| Archie ring toggle          | Ring icon button with `aria-pressed` state opens or toggles the Archie ring space                                                                                                         |                                                                                                                  |

## Scene Titles and Document Titles

| UI Element | Preference | Current Non-Matching Uses |
| --- | --- | --- |
| Scene title in chrome | Show the active scene name in a compact uppercase chip with ellipsis overflow, max width `min(58vw, 520px)`, and optional clickable info-trigger behavior |  |
| Markdown source title (`#`) | Keep as canonical document title |  |
| Duplicate visible title when chrome already shows title | Suppress the first rendered markdown `h1` in the reading surface to avoid duplicate titling | The current CSS hides the first `h1` unconditionally inside the markdown panel, not only when chrome already shows the title |
| Auto-open document landing state | Start with title and orienting overview |  |
| Title length guidance | Scene chrome titles should fit the chip and truncate with ellipsis rather than wrap |  |
| Subtitle or deck treatment | When auxiliary label data is present, allow a second text row under the main title |  |

## Markdown Reading Surface

| UI Element | Preference | Current Non-Matching Uses |
| --- | --- | --- |
| Notes panel layout toggle | Layout icon button toggles between one column and the scene's preferred multi-column count, updating its `aria-label` accordingly | The control lives in global chrome rather than in a dedicated notes-panel header |
| One-column reading mode | Use for section views by default; also collapse multi-column markdown to one column below `980px` |  |
| Two-column reading mode | Default preferred reading mode for full documents when no scene override is set | Runtime supports up to 3 preferred columns even though the docs currently describe 1/2-column behavior |
| Full-document button in notes header | Document icon appears only when a section view has a corresponding full document, and opens that full document view | The control lives in global chrome rather than in a dedicated notes-panel header |
| Close behavior | Search closes on `Escape`, outside pointerdown, or focus leaving the panel; detail closes with an explicit close button; animator menus close on outside pointerdown | The markdown panel currently has no dedicated `Close` button in the shipped HTML despite the Archie doc describing one |
| Heading hierarchy in rendered markdown | Render markdown body at `16px / 1.8`; size major headings at `22px`, `20px`, and `18px` for `h1`/`h2`/`h3`; hide the first visible `h1` in-panel |  |
| Treatment of long technical openings | Do not open cold on a divider, `##`, or dense technical block; begin with an orienting overview before the first major section |  |

## Typography

| UI Element | Preference | Current Non-Matching Uses |
| --- | --- | --- |
| Primary UI font | `Helvetica Neue`, falling back to `Arial, sans-serif` | Canvas-drawn labels in `app.js` still use generic `sans-serif` rather than the explicit stack |
| Reading-surface font | `Helvetica Neue`, falling back to `Arial, sans-serif` | Canvas-drawn labels in `app.js` still use generic `sans-serif` rather than the explicit stack |
| Monospace font | `SFMono-Regular`, `Menlo`, `Consolas`, `monospace` |  |
| Heading scale | Markdown headings use `22px` / `20px` / `18px` for `h1` / `h2` / `h3`; compact chrome titles and menu kickers typically use `10px`-`13px` uppercase text |  |
| Body text scale | Markdown prose uses `16px` with `1.8` line height; supporting panels commonly use `11px`-`14px` body text | Search items, detail rows, tooltips, and animator panels run smaller than the markdown reading surface |
| Caption or metadata scale | Use compact metadata text in the `10px`-`13px` range, often with slight letter spacing and uppercase for labels/kickers |  |
| Math rendering context | KaTeX |  |

## Buttons and Controls

| UI Element | Preference | Current Non-Matching Uses |
| --- | --- | --- |
| Primary button style | Use dark translucent buttons with a thin cool-gray border, white text/icons, and compact rounded geometry (`6px`-`8px` radius for text buttons, `999px` for pills) | Some animator action pills and `.animator-assembly-menu-orb` controls use brighter gradient/orb treatments than the standard shell buttons |
| Secondary button style | Reuse the same dark-shell button family for secondary actions, usually at `28px`-`34px` height with lighter emphasis than active toggles | Scene chrome icon buttons are circular `32px` controls rather than text buttons |
| Icon-only buttons | Use clear semantic line icons in 32px circular shell buttons for Search, Info, Archie, Notes, layout toggle, and full-document open | `#animator-docs-button` uses an emoji book icon, element navigation uses triangle glyphs instead of line SVG icons |
| Hover treatment | Brighten the border and deepen the background on hover/focus; some pill/key controls also lift slightly | Hyde navigation keys and legend pills add translation/lift effects, unlike most shell buttons |
| Active/pressed treatment | Use `.is-active` plus stronger accent border/fill, and pair stateful toggles with `aria-pressed` where applicable | Some buttons only change hover state and never expose a pressed state |
| Disabled treatment | Dim unavailable controls with reduced opacity and a non-interactive cursor | Disabled opacity varies by control family: `0.28`, `0.4`, and `0.5` are all in use |
| Focus-visible treatment | Prefer visible keyboard focus through brighter borders on buttons and `1px`-`2px` outlines on nav controls and form fields | Some button families rely on border-color change only, while inputs/selects and nav controls use explicit outlines |

## Panels, Overlays, and Menus

| UI Element | Preference | Current Non-Matching Uses |
| --- | --- | --- |
| Notes panel | Use a centered large-format overlay with rounded corners, scrollable content, and markdown-focused spacing | `#markdown-panel` currently uses a solid purple background instead of the darker glass shell used by most other panels |
| Search panel | Use an anchored dark-glass popover beneath the search toggle, min width `260px`, max width `80vw`, with input autofocus and top-10 button results |  |
| Detail/info panel | Use a left-docked dark-glass card with scrollable content and an explicit close affordance | Element-info mode hides the title and swaps the text `Close` button for a floating circular `×` button |
| animator overlay | Use a full-screen fixed dark workspace with a compact header bar, dedicated status line, and tool-specific internal panels/menus |  |
| Context menus | Prefer custom anchored menus over native browser context menus for animator canvas/timeline editing; use dark-glass menu surfaces with sectioned content | Custom context menus are implemented for animator surfaces, not as a repo-wide pattern across all app areas |
| Modal dialogs |  |  |
| Dismiss behavior | Search and animator menus dismiss on outside interaction; search also dismisses on focus leaving and `Escape`; detail dismisses through an explicit close control | No shared modal-dialog dismissal pattern is implemented because there is no general dialog system yet |

## Scene Navigation Surfaces

| UI Element | Preference | Current Non-Matching Uses |
| --- | --- | --- |
| Hub scene reading order | In hub scenes, a center sphere is the reader’s orientation/start node. Peripheral spheres are read from 12 o’clock clockwise. If no center sphere exists, the 12 o’clock sphere is the start. |  |
| Ring layout scenes | Use when the local scene behaves like a conceptual cluster of peer topics |  |
| Grid layout scenes | Use when the local scene behaves like an ordered notebook, ledger, dated sequence, or other row-scanned list |  |
| Split-document navigation nodes | Derive peer nodes from one declared heading level in one markdown document |  |
| Tree-document navigation nodes | Derive a bounded local heading hierarchy from one markdown document and stop generation at the configured depth |  |
| Element navigation overlay | Show automatically in element scenes; place the overlay bottom-right with a mini periodic map plus a `90px` D-pad using `28px` directional hit targets | Hyde periodic overlay uses a separate keyboard-nav callout and larger stylized keycaps instead of the mini-map + D-pad overlay |
| Keyboard navigation affordances | Support `Cmd/Ctrl + K`, `Enter`, and `Escape` for search; support wrapped arrow-key element navigation when search is closed and no text input is focused | Animator also binds `Space` to playback toggle, and Hyde periodic hotspots expose their own arrow-key navigation model |

## Visual Language

| UI Element | Preference | Current Non-Matching Uses |
| --- | --- | --- |
| Color system | Base the UI on a dark navy/near-black field with white text, cool gray-blue borders, and blue/cyan accent states | Markdown panel uses solid purple, Hyde periodic overlay uses a white canvas, and some animator tools add stronger domain-specific accent palettes |
| Background treatment | Prefer black or the project's neutral purple for scene backgrounds where that treatment works, with translucent dark panel surfaces over the stage and blur for floating UI when appropriate | `#hyde-periodic-overlay` and its stage are white |
| Border treatment | Use thin `1px` semi-transparent cool-gray borders with rounded corners (`8px`-`14px`) or pills (`999px`) | Hyde periodic overlay drops the border entirely, while some orb/timeline elements use brighter accent borders |
| Shadow treatment | Use restrained overlay shadows for menus, callouts, and elevated panels; many shell controls stay flat | Hyde periodic callouts and animator orbs use heavier glow/shadow treatments than the standard shell |
| Motion and transitions | Keep interaction motion short and functional, typically in the `80ms`-`180ms` range for hover/focus states | Periodic overlays fade over `1000ms`, which is much slower than the general control-state timing |
| Icon style | Prefer simple monoline SVG icons with `currentColor` stroke/fill, paired with compact uppercase labels when text is needed | Animator docs uses an emoji icon, element navigation uses pure triangles, Hyde overlay uses text/glyph keycaps |
| Density / spacing rhythm | Use compact `8px`-`12px` gaps, `8px`-`16px` panel padding, and `28px`-`34px` control heights in tool chrome | Markdown reading surface intentionally relaxes density with larger text and taller line height |

## Accessibility and Interaction

| UI Element | Preference | Current Non-Matching Uses |
| --- | --- | --- |
| Keyboard-first operation | Support keyboard search and directional navigation where the scene mode provides it, while ignoring scene-level shortcuts when text inputs are focused |  |
| Focus order | Opening search should move focus into the search input; closing it should restore focus to the toggle when appropriate |  |
| Focus visibility | Use brighter borders and, where needed, explicit outlines to make keyboard focus visible on controls and form fields | Focus treatment is not yet fully uniform across all button families |
| Hit target sizing | Keep shell icon buttons around `32x32`, element-nav arrows around `28x28`, and primary action buttons around `28px`-`42px` tall | Some tiny timeline and marker labels remain visually denser than the main control targets |
| Contrast expectations | Maintain light text on dark surfaces for primary shell UI and tool overlays | Hyde periodic stage flips to a white background, creating a different contrast regime from the rest of the shell |
| Reduced-motion behavior |  |  |
| Screen-reader naming | Use `aria-label` on icon buttons and groups, `aria-live` for status text, `aria-hidden`/`inert` for closed panels, and `aria-pressed` for toggles | No single dialog/accessibility wrapper exists yet because panels are managed individually |

## Open Preference Slots

| UI Element | Preference | Current Non-Matching Uses |
| --- | --- | --- |
| Home scene entry experience | Use the full scene shell with centered focus sphere, top chrome, and dark ambient stage as the default app entry frame |  |
| Mobile behavior | Below the current breakpoints (`980px`, `960px`, `900px`, `820px`), wrap the top HUD, collapse markdown multi-columns to one column, stack animator/reaction layouts, and scale Hyde periodic content down |  |
| Desktop behavior | On wider screens, preserve the full top chrome, centered overlays, multi-column markdown, wide animator timeline/header layout, and full element-nav overlay |  |
| Empty states |  |  |
| Loading states |  |  |
| Error states |  |  |
