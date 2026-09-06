# Equation Mapping App Concept Synthesis

This document retains provisional Equation Mapping concepts that are not accepted tasks. The app provides addressable equation records and authoring support without changing the authority of an equation or its source passage.

## Routing Boundary

Accepted implementation work belongs in [work-queue.md](work-queue.md), strategy belongs in [priorities.md](priorities.md), and stable registry or authoring rules belong in the existing focused contracts.

## Unresolved Ideas

- None currently recorded.

## Provisional Diagnosis: Duplicated Top-Right Control Strip And Fragile Settings Row

Recorded 2026-09-06 from an operator screenshot of the app reached through a corpus `View →` link. No fix is accepted; this section records the analysis so the eventual task can be written against a stated cause rather than against the screenshot.

### Observed presentation

The screenshot shows two stacked control clusters in the top-right corner. The upper cluster is a row of round dark buttons reading `TOC`, back chevron, forward chevron, home, magnifier. The lower cluster is a row of two larger square-cornered light buttons: a second magnifier and a gear. The open settings panel shows the word `Background` running underneath the first background swatch, and the label `Comment size` wrapped onto two lines.

### Cause of the second row

The page mounts two independent control surfaces.

The first is the canonical shared strip. `EquationMappingRuntime.init` calls `createStandaloneAppNavigationRuntime` on `#scene-hud-tools`, which builds a `top-dynamic-control-bar` carrying the default `toc`, `back`, `forward`, `home`, and `search` capabilities. Its stylesheet pins the host with `.top-dynamic-control-bar.is-standalone { position: absolute; top: max(16px, env(safe-area-inset-top)); right: max(16px, env(safe-area-inset-right)) }` and renders each action as a 32 px circle (`border-radius: 999px`) on a dark translucent ground.

The second is app-private. `EquationMappingRuntime.renderControls` builds a `.equation-mapping-controls` element holding its own `search` and `settings` buttons, plus an `edit` button when the active document is promoted. The page stylesheet places that element at `top: var(--control-top)` where `--control-top: max(62px, calc(env(safe-area-inset-top) + 48px))`, and styles `.equation-mapping-icon-button` as a 36 px box with `border-radius: 6px` on `--panel-strong`.

The two rules therefore stack the private cluster directly beneath the shared strip, at a different size, corner radius, and palette. Grade: derived, by reading the two rules and the two render paths; the offsets are stated in the source rather than measured on screen.

This is the only instance of the pattern in the repository. `--control-top` is defined and consumed only in `equation-mapping.html`, and the other stacked top-right offsets in `causal-delay-feedback.html` position dropdown panels rather than a second row of icon buttons. Grade: measured, by a repository-wide search for `--control-top` and an inspection of every root `*.html` file that hosts `#scene-hud-tools`. Falsifier: an app-private icon cluster placed under the shared strip by some other mechanism would not carry that custom property and would not appear in that search.

### Cause of the redundant magnifier

The private magnifier is `Search equations`. Its handler expands the subject index, closes the settings and editor panels, re-renders, and moves keyboard focus into the sidebar field `.equation-mapping-search-input`. On a viewport wide enough to show the index, that index and its search field are already visible, so the click produces no visible change beyond a focus ring. The button therefore reads as inert while doing exactly what it was written to do.

The two magnifiers are also visually indistinguishable. `createIconSvg("search")` in `EquationMappingRuntime.js` draws `circle cx=11 cy=11 r=6.5` plus a line from `(15.5, 15.5)` to `(21, 21)`; `ACTION_ICON_MARKUP.search` in `TopDynamicControlBarRuntime.js` draws the same two primitives with the same coordinates. Two identical glyphs sit within roughly 30 px of each other and search different corpora — one searches scenes, the other searches equations. Grade: derived, by comparing the two markup strings.

The design contract already resolves this in favour of one control. `contracts/requirements-and-design.md` requirement 7 asks for a top-right home button and search menu "consistent with the standalone app shell"; its layer table gives a single `Top-right controls` layer holding "home, search, and settings"; and its Search Menu section states that search stays visible in the expanded sidebar and that "the standard top-right search control opens the sidebar and focuses this same field". The private duplicate is a departure from that contract, not an elaboration of it.

### Cause of the settings-row overlap

`.equation-mapping-settings-row` uses `grid-template-columns: 92px minmax(0, 1fr)`. The swatch group is the second track and therefore begins 100 px from the panel's content edge, which is where the screenshot shows it. The swatches are not displaced; the label is too wide for its track.

`.equation-mapping-settings-label` declares `font-size: 11px; font-weight: 720`. At that size `Background` occupies roughly 62 px and fits the 92 px track with room to spare, and `Comment size` fits on one line. In the screenshot `Background` occupies roughly 113 px of an otherwise correctly proportioned panel and `Comment size` wraps, which places the rendered label size near 20 px rather than 11 px. Since `Background` is a single word it cannot wrap, so the excess overflows the fixed track and paints across the first swatch.

The most likely origin of the inflation is a text-size floor applied outside the page: a browser minimum-font-size preference, an operating-system text-scaling setting, or a text-only zoom. The repository is not the source. The working tree carries no local modification to `equation-mapping.html`, `src/apps/equation-mapping/`, `src/runtime/`, or `ui-tokens.css`, and `ui-tokens.css` defines custom properties only, with no element rule that could raise the label size. Grade for the layout mechanism: derived. Grade for the inflation origin: inferred, from proportions in a screenshot rather than from a computed style. Falsifier: read the computed `font-size` of the `.equation-mapping-settings-label` span in the browser that produced the screenshot. A value near 11 px refutes the inference and points the search back into the page's own cascade; a value near 20 px confirms it.

The defect worth fixing is the fixed track itself. A 92 px column beside a label that cannot wrap has no tolerance for any text-size change, and the panel has spare horizontal room that an intrinsic column would use.

### Proposed shape of a fix

1. Move `settings`, and the promoted-document `edit` control, into the shared strip through the `extensionActions` parameter of `createStandaloneAppNavigationRuntime`. `BorgAppRuntime` is the existing precedent: the shared bar owns the button, the app owns the panel it opens. `SHARED_ACTION_ORDER` already reserves `settings` and `edit` after `search`, so the accepted order is preserved without changing the shared runtime.
2. Remove the private `search` button. The sidebar field remains the equation search, which is what the design contract specifies.
3. Delete `.equation-mapping-controls`, `--control-top`, `--control-right`, and the `search`, `settings`, and `edit` branches of `createIconSvg`. The carousel still needs `previous` and `next`. Removing the first three also removes a duplicated icon path, consistent with the single-canonical-path rule.
4. Re-anchor the settings and editor popovers to the canvas rather than to the removed row, placing them below the single strip.
5. Replace the fixed label track with an intrinsic one, so the swatch and segment groups always begin after the label at any text size.

Consequential test edits: `tests/equation-mapping-runtime.test.js` currently asserts that the three private `renderIconButton` calls exist and that `controls.hidden = this.globalSearchOpen` is present. Those assertions encode the defect and would be rewritten to assert the merged strip instead.
