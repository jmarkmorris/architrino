# Lorentz Geometry work queue

No app-local implementation work is queued.

## Deferred shared migrations

### LG-001 — Causal-delay protocol identifier migration

**Status:** Queued for a coordinated shared-schema migration.

Replace the legacy causal-delay protocol/result identifiers in `src/prescribed-path-analysis/B1CompleteCycleProbeProtocol.mjs` with current causal-delay names, updating every consumer and test atomically. This is shared protocol work, not an A1-only patch.

### LG-002 — Shared solver-app schema terminology decision

**Status:** Queued for a coordinated schema decision.

Decide whether the shared `forceLawVersion` machine-contract field can be migrated to acceleration-first terminology with a compatibility plan. Do not rename it locally.

### LG-003 — Shared Markdown asset-owner migration

**Status:** Queued for a coordinated asset-owner migration.

Move the shared KaTeX/Markdown assets only when all current HTML consumers can be migrated together. Do not duplicate or relocate them for A1 alone.
