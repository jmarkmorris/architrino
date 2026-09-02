# UI Guidelines

This document is the contributor-facing reference for reader-facing UI standards across Architrino applications and application-like surfaces. Its purpose is to provide one place where interface preferences can be recorded deliberately instead of being scattered across code, scenes, and ad hoc decisions.

Interface rules are part of explanation. A reader who is wrestling with unfamiliar physics should not also have to decode inconsistent controls, unclear navigation, or mixed visual language.

This document is intentionally lightweight. It uses a grouped inventory of UI elements and their preferred treatment, with undecided preferences left blank until they are explicitly decided.

The third column is a comma-separated ledger of known web-facing docs or app surfaces that do not yet match the preferred treatment. It can remain blank until those mismatches are audited.

## Document Role

This document is the canonical UI preference reference. It governs applications; it is not itself a product application. Its scene entry is an intentional documentation route, not an Applications-list entry or standalone-app launch target. It may also carry a short implementation-audit ledger, but the two roles should remain separate.

- [Branding and Marketing](branding-and-marketing.md) owns the favored brand palette, logo treatment, public visual identity, contact card, and marketing presentation. This guide owns how that identity is applied inside the webapp.
- [Navigation and Controls](navigation-and-controls.md) explains accepted controls from the reader's perspective. This guide owns the shared standards those controls implement.
- Reusable implementation values belong in `ui-tokens.css`, and reusable behavior belongs in shared runtime modules. Applications consume those shared owners and keep only genuinely application-specific presentation or behavior local.
- Scene views, rendered references, generated manifests, and examples may expose or demonstrate this guide, but they do not replace it or become competing standards authorities.
- The `Preference` column states durable policy.
- The `Current Non-Matching Uses` column records known implementation drift that should eventually move into issues, priority notes, or code-review tasks when it becomes active work.
- Blank preference cells mean the policy has not been decided yet; they should not be treated as silent approval of current behavior.
- Blank implementation cells mean no mismatch is currently recorded in this document, not that the surface has been exhaustively audited.

When an audit item becomes broad or long-lived, promote it out of this guide into a dedicated implementation tracker and leave this document focused on the canonical preference.

## Global Chrome

| UI Element                  | Preference                                                                                                                                                                                | Current Non-Matching Uses                                                                                        |
| --------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Primary navigation metaphor | Use clickable spheres as the principal scene-navigation object: selecting a sphere descends into the next layer, while camera zoom/pan supports spatial orientation around that structure |  |
| Sphere ring action signal | Use the brand action-halo purple defined in [Branding and Marketing](branding-and-marketing.md) only for actionable spheres: child-scene navigation, markdown/file opens, image-gallery opens, and animator-panel opens. Non-clickable spheres that render a ring use a black ring. |  |
| App title treatment         | Browser page titles use lowercase `architrino` unless it is a use case where capitalization is typical, optionally followed by a lowercase feature suffix                                 |                                                                                                                  |
| animator header             | Timestamp-only                                                                                                                                                                            |                                                                                                                  |
| Global navigation buttons   | Use 32x32 circular dark-shell icon buttons in the stable order TOC, `Back`, `Forward`, `Home`, `Search`, then optional document-entry, Settings, and mode-entry actions. Keep operations for an open document in its reading-surface header. Omit unavailable actions rather than showing dead controls. | Wake Topography, Molecule, PDG Edit, Borg Library, Greek Letter Match, and Equation Mapping remain partial or near migrations. |
| Search affordance           | The full-bar magnifier opens global scene search, clears the query, and focuses the input on open. App-specific equation, molecule, document, or collection searches stay local and are named for the content they filter. | Equation Mapping currently uses its top-bar magnifier for local equation search while it remains a near migration. |
| Full-document control | The document icon opens the complete source behind the current section when that route exists. | |
| Detail affordance | Element detail is opened by the element interaction that owns it. No global circle-i control is shipped. | A future global detail trigger remains an unbuilt preference, not current behavior. |
| Archie entry                | Archie is a top-level sphere on the root scene rather than a persistent global chrome button                                                                                              |                                                                                                                  |

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
| Markdown layout toggle | A panel-local Layout icon button toggles between one column and the scene's preferred multi-column count, updating its `aria-label` accordingly |  |
| Markdown column canon | Treat `view.columns` as an authored reading-surface override, not a historical default. Keep an explicit value only when the document or section has a clear reading-surface reason for that opening mode; remove unexplained values and let runtime defaults apply. | Existing scene `view.columns` values need audit because not all may be deliberate authored choices |
| One-column reading mode | Use for all section views and for any markdown document or section containing equations or TeX/KaTeX math. Multi-column markdown still collapses to one column below `980px`. |  |
| Two-column reading mode | Default preferred reading mode for full documents when no scene override is set and the source has no TeX/KaTeX math. Use explicit `view.columns: 2` only for a deliberate full-document reading-surface choice that should survive alternate entry paths. |  |
| Two-column page direction | Fill the left column and then the right column within one visible spread; stack subsequent spreads below so wheel, trackpad, keyboard, and scrollbar movement advance vertically rather than paging horizontally. |  |
| Three-column reading mode | Reserve for TOC/catalog/index surfaces only. Do not use 3-column mode for ordinary documents, section views, or sources containing TeX/KaTeX math. | Runtime supports up to 3 preferred columns; existing 3-column scenes must be confirmed as TOC/catalog/index surfaces |
| Full-document button | A panel-local Document icon appears only when a section view has a corresponding full document and opens that full document view. Layout, print/PDF, and Close follow it in the reading-surface header. |  |
| Close behavior | Search closes on `Escape`, outside pointerdown, or focus leaving the panel; markdown and detail surfaces provide explicit Close buttons; animator menus close on outside pointerdown. | |
| Heading hierarchy in rendered markdown | Render markdown body at `16px / 1.8`; size major headings at `22px`, `20px`, and `18px` for `h1`/`h2`/`h3`; hide the first visible `h1` in-panel |  |
| Treatment of long technical openings | Do not open cold on a divider, `##`, or dense technical block; begin with an orienting overview before the first major section |  |

## Typography

| UI Element | Preference | Current Non-Matching Uses |
| --- | --- | --- |
| Primary UI font | `Helvetica Neue`, falling back to `Arial, sans-serif` | Canvas-drawn labels in `src/apps/animator/AnimatorRenderAssetsRuntime.js` still use generic `sans-serif` rather than the explicit stack |
| Shared web-app typography tokens | Use `--ui-font-family: "Helvetica Neue", Arial, sans-serif`, `--ui-body-size: 14px`, `--ui-body-weight: 400`, and `--ui-body-line-height: 1.5` for ordinary app body text; use `--ui-label-size: 12px`, `--ui-label-weight: 700`, and `--ui-label-line-height: 1.25` for interactive labels and navigation-list items. These seven tokens are defined in `ui-tokens.css`, imported by `style.css`, and are the canonical shared values. Reserve `10px`-`11px` compact text for non-interactive secondary metadata. | App-local literal styles that duplicate these roles remain audit targets. |
| Reading-surface font | `Helvetica Neue`, falling back to `Arial, sans-serif` | Canvas-drawn labels in `src/apps/animator/AnimatorRenderAssetsRuntime.js` still use generic `sans-serif` rather than the explicit stack |
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
| Icon-only buttons | Use clear semantic line icons in 32px circular shell buttons for Search, TOC, PDF export, layout toggle, and full-document open | `#animator-docs-button` uses an emoji book icon, element navigation uses triangle glyphs instead of line SVG icons |
| Transport controls | Use the shared 24x24 monoline SVG set for `Play`, `Pause`, `First frame`, `Rewind`, `Reset`, and `Stop`. Render at 18x18 with `currentColor`, a 2px stroke, rounded caps and joins, and no text glyphs or app-local path variants. |  |
| Hover treatment | Brighten the border and deepen the background on hover/focus; some pill/key controls also lift slightly | Hyde navigation keys and legend pills add translation/lift effects, unlike most shell buttons |
| Active/pressed treatment | Use `.is-active` plus stronger accent border/fill, and pair stateful toggles with `aria-pressed` where applicable | Some buttons only change hover state and never expose a pressed state |
| Disabled treatment | Dim unavailable controls with reduced opacity and a non-interactive cursor | Disabled opacity varies by control family: `0.28`, `0.4`, and `0.5` are all in use |
| Focus-visible treatment | Prefer visible keyboard focus through brighter borders on buttons and `1px`-`2px` outlines on nav controls and form fields | Some button families rely on border-color change only, while inputs/selects and nav controls use explicit outlines |

### Transport Controls

Transport controls use the shared implementation in `src/runtime/TransportControlIcons.js`. Apps may choose an icon-only shell or pair the icon with a visible label, but they must not redraw these symbols in local SVG, CSS pseudo-elements, Unicode characters, or text approximations.

| Control | Canonical meaning | Icon construction |
| --- | --- | --- |
| `Play` | Start or resume movement from the current playhead. | Right-pointing triangle. |
| `Pause` | Hold the current playhead without returning it to the beginning. | Two independent vertical strokes. |
| `First frame` | Move to the earliest available frame and remain paused. | Vertical start bar with a left-pointing triangle. |
| `Rewind` | Move backward through available frames without implying a full state reset. | Two left-pointing triangles. |
| `Reset` | Restore the named simulation or replay scope to its defined initial state, such as `Reset time`; do not imply that unrelated parameters also reset. | Counterclockwise circular arrow. |
| `Stop` | End the active run or playback operation; use only when the app supports a state distinct from Pause. | Square. |

A fixed-location Play/Pause toggle shows the action that clicking will perform: `Pause` while movement is active and `Play` while movement is held. Its `aria-label`, `title`, icon, and `aria-pressed` state update together; `aria-pressed="true"` means playback is active. `First frame`, `Reset`, and `Stop` are not interchangeable: use the control whose behavior matches the definitions above.

## Panels, Overlays, and Menus

| UI Element | Preference | Current Non-Matching Uses |
| --- | --- | --- |
| Notes panel | Use a centered large-format overlay with rounded corners, scrollable content, and markdown-focused spacing | `#markdown-panel` currently uses a solid purple background instead of the darker glass shell used by most other panels |
| Search panel | Use an anchored dark-glass popover beneath the search toggle, min width `260px`, max width `80vw`, with input autofocus and top-10 button results |  |
| Detail/info panel | Use a left-docked dark-glass card with scrollable content and an explicit close affordance | Element-info mode hides the title and swaps the text `Close` button for a floating circular `×` button |
| animator overlay | Use a full-screen fixed dark workspace with a compact header bar, dedicated status line, and tool-specific internal panels/menus |  |
| Context menus | Prefer custom anchored menus over native browser context menus for animator canvas/timeline editing; use dark-glass menu surfaces with sectioned content | Custom context menus are implemented for animator surfaces, not as a repo-wide pattern across all app areas |
| Modal dialogs | Use only for blocking decisions; use dark-glass panel surfaces with explicit title, primary/secondary actions, Escape/outside-dismiss rules where safe, and focus trapping while open |  |
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
| Color system | Consume the favored palette from [Branding and Marketing](branding-and-marketing.md): use primary purple for principal brand fields, deep purple-black for sustained UI surfaces, violet/lilac for branded emphasis and action, white for primary text, and blue/cyan only where the interface assigns those accent or signal roles. Preserve red and blue polarity meanings. | Markdown panel uses a saturated purple field instead of the darker sustained-reading surface preferred for most panels, Hyde periodic overlay uses a white canvas, and some animator tools add stronger domain-specific accent palettes |
| Background treatment | Prefer the brand deep foundation for panels and sustained workspaces and primary purple for scene or identity fields where that treatment works, with translucent dark panel surfaces over the stage and blur for floating UI when appropriate | `#hyde-periodic-overlay` and its stage are white |
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
| Reduced-motion behavior | Respect reduced-motion preferences by disabling decorative animation, shortening transitions, and preserving functional state changes without motion dependence |  |
| Screen-reader naming | Use `aria-label` on icon buttons and groups, `aria-live` for status text, `aria-hidden`/`inert` for closed panels, and `aria-pressed` for toggles | No single dialog/accessibility wrapper exists yet because panels are managed individually |

## Open Preference Slots

| UI Element | Preference | Current Non-Matching Uses |
| --- | --- | --- |
| Home scene entry experience | Use the full scene shell with centered focus sphere, top chrome, and dark ambient stage as the default app entry frame |  |
| Mobile behavior | Below the current breakpoints (`980px`, `960px`, `900px`, `820px`), wrap the top HUD, collapse markdown multi-columns to one column, stack animator/reaction layouts, and scale Hyde periodic content down |  |
| Desktop behavior | On wider screens, preserve the full top chrome, centered overlays, multi-column markdown, wide animator timeline/header layout, and full element-nav overlay |  |
| Empty states | Use short, plain text inside the relevant panel or surface, paired with one clear recovery action when available |  |
| Loading states | Use compact inline status text or a restrained spinner/skeleton within the affected surface; avoid full-screen blocking unless the whole app is unavailable |  |
| Error states | State what failed in plain language, keep technical detail collapsible or secondary, and provide retry/back/home recovery when applicable |  |
