# Lorentz Geometry work queue

No app-local implementation work is queued.

## Deferred maintenance

These items are behind-the-scenes hygiene. Do not start them unless they block user-facing work, cause a real defect, or are included in a coordinated shared-runtime cleanup.

### LG-001 — Causal-delay protocol identifier migration

**Status:** Deferred maintenance.

Replace the legacy causal-delay protocol/result identifiers in `src/prescribed-path-analysis/B1CompleteCycleProbeProtocol.mjs` with current causal-delay names, updating every consumer and test atomically. This is shared protocol work, not an A1-only patch.

### LG-002 — Shared solver-app schema terminology decision

**Status:** Deferred maintenance.

Decide whether the shared `forceLawVersion` machine-contract field can be migrated to acceleration-first terminology with a compatibility plan. Do not rename it locally.

### LG-003 — Shared Markdown asset-owner migration

**Status:** Deferred maintenance.

Move the shared KaTeX/Markdown assets only when all current HTML consumers can be migrated together. Do not duplicate or relocate them for A1 alone.
