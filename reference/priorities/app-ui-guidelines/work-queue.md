# App UI Guidelines Work Queue

This is the canonical execution ledger for accepted shared UI-standard work.

## Ranked Next Objects

1. `standard_acceptance_pass` — [UI-001](#ui-001--standard-acceptance-pass). Status: `Queued`.
2. `shared_bar_runtime_design` — [UI-002](#ui-002--shared-bar-runtime-design). Status: `Queued`.
3. `main_webapp_and_animator_hud_unification` — [UI-003](#ui-003--main-webapp-and-animator-hud-unification). Status: `Queued`.
4. `markdown_control_relocation` — [UI-004](#ui-004--markdown-control-relocation). Status: `Queued`.
5. `standalone_app_home_search_settings_migration` — [UI-005](#ui-005--standalone-app-migration). Status: `Queued`.
6. `page_exception_policy` — [UI-006](#ui-006--page-exception-policy). Status: `Queued`.
7. `visual_regression_capture` — [UI-007](#ui-007--visual-regression-capture). Status: `Queued`.

## Queued

### UI-001 — Standard acceptance pass

- **Status:** Queued
- **Priority object:** `standard_acceptance_pass`
- **Request / acceptance:** Decide baseline controls, dimensions, ordering, responsive behavior, and exemptions in [top-dynamic-control-bar.md](top-dynamic-control-bar.md).
- **Evidence / blocker:** The candidate standard must be accepted before shared runtime work.
- **Completion:** One explicit standard and exception policy are approved.

### UI-002 — Shared bar runtime design

- **Status:** Queued
- **Priority object:** `shared_bar_runtime_design`
- **Request / acceptance:** Define the smallest shared path for icons, home targets, search/settings anchoring, focus, and responsive wrapping.
- **Evidence / blocker:** Depends on UI-001.
- **Completion:** The design identifies one implementation path and app-owned extension points.

### UI-003 — Main webapp and Animator HUD unification

- **Status:** Queued
- **Priority object:** `main_webapp_and_animator_hud_unification`
- **Request / acceptance:** Remove forked top-HUD drift and route both surfaces through the accepted shared control model.
- **Evidence / blocker:** Depends on UI-002.
- **Completion:** Both surfaces pass focused interaction and responsive checks.

### UI-004 — Markdown control relocation

- **Status:** Queued
- **Priority object:** `markdown_control_relocation`
- **Request / acceptance:** Decide and implement the reading-surface location for layout, full-document, print/PDF, and close controls.
- **Evidence / blocker:** Depends on UI-001.
- **Completion:** Main, Photon, and Ideal Braid markdown panels use the accepted model.

### UI-005 — Standalone app migration

- **Status:** Queued
- **Priority object:** `standalone_app_home_search_settings_migration`
- **Request / acceptance:** Migrate standalone apps in declared batches without changing app-specific domain controls.
- **Evidence / blocker:** Depends on UI-002.
- **Completion:** Each batch passes desktop/mobile interaction and accessibility checks.

### UI-006 — Page exception policy

- **Status:** Queued
- **Priority object:** `page_exception_policy`
- **Request / acceptance:** Classify generated reading copies, native shells, and review pages as exempt, lightweight-header, or full-standard surfaces.
- **Evidence / blocker:** None.
- **Completion:** Every current surface class has one documented disposition.

### UI-007 — Visual regression capture

- **Status:** Queued
- **Priority object:** `visual_regression_capture`
- **Request / acceptance:** Capture desktop and mobile evidence across the declared representative surfaces.
- **Evidence / blocker:** Depends on the first migration batch.
- **Completion:** Current captures show control order, wrapping, focus, and app-content clearance.

## Awaiting verification

No rows.

## Verified

No rows.

## Superseded / withdrawn

No rows.
