# App UI Guidelines Work Queue

This is the canonical execution ledger for accepted shared UI-standard work.

## Ranked Next Objects

No rows.

## Queued

No rows.

## Awaiting verification

No rows.

## Verified

### UI-008 — Shared navigation icon rendering repair

- **Status:** Verified
- **Priority object:** `shared_navigation_svg_namespace_and_size_repair`
- **Result:** The canonical runtime now creates glyphs in the SVG namespace, and the canonical stylesheet protects the accepted `32px` action height from app-wide button minimums. Because every full-bar surface consumes this runtime and stylesheet, the implementation repair is shared rather than page-specific.
- **Evidence:** The [UI-008 browser receipt](evidence/ui-008-shared-navigation-icon-repair.2026-09-02.json) records the pre-repair zero-size glyph fault and post-repair desktop/mobile measurements for Ideal Braid, Braid Search, and Borg Library. Focused tests enforce SVG namespace and canonical sizing ownership.
- **Boundary:** Browser evidence establishes visible glyph geometry, action order, sizing, popover containment, focus restoration, and lack of horizontal overflow on the three named pages only. Other full-bar surfaces receive the same code path but were not individually rendered in this repair pass.

### UI-005 — Standalone app migration

- **Status:** Verified
- **Priority object:** `standalone_app_home_search_settings_migration`
- **Result:** All declared standalone full-bar surfaces now consume the canonical runtime and stylesheet. Batch 9 completed the owner-coordinated [Ideal Braid, Braid Search, Borg, and Borg Library migrations](evidence/ui-005-batch-9-borg-braid-browser-captures.2026-09-02.json), preserved each app's local controls, and deleted the superseded standalone stylesheet after its final import was removed.
- **Evidence:** The nine UI-005 browser receipts bind the desktop/mobile captures and interaction checks for every declared migration batch.
- **Boundary:** This verifies shared navigation ownership, responsive presentation, focus, routing, and declared app-mode integration. It does not validate app-local scientific models, datasets, solver output, or domain-control correctness.

## Superseded / withdrawn

No rows.
