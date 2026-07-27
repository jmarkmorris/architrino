# Attractor-Search Execution Instrument

## Packet Metadata

- Parent: [EOM](priorities.md)
- Status: `fresh-baseline-required`
- Claim level: `priority-design`
- Scientific campaign owner: [Braid Program](../braid-program/priorities.md)
- Campaign design: [Undirected Ensemble Search](../braid-program/undirected-ensemble-search.md)
- Instrument history: [Attractor-Search Instrument Work Log](attractor-search-work-log.md)

## Purpose

EOM owns the reusable execution capability for native ensemble-release
campaigns on the `src/eom` coupled delayed-history integrator. The retained
instrument consists of the release-workload profiler and checkpoint-chunked
ensemble harness, together with deterministic resume, record emission,
performance attribution, and campaign-driver behavior.

The [Braid Program](../braid-program/priorities.md) owns the scientific use of
that capability: declared seed families, persistence criteria, fate
classification, collapse adjudication, and any physical promotion.

## Current Evidence State

- Historical profiler ledgers, harness demo output, and local campaign bundles
  were intentionally removed on 2026-07-24 after the EOM solver review.
- The profiler and harness source remain available, but their performance,
  resume, replay, and root-clearance behavior require fresh validation against
  the corrected EOM solver.
- No persistent assembly, braid, or attractor is booked.
- Reproduction against the harness's own replay establishes determinism only;
  campaign correctness still requires the independent-oracle duty declared by
  the Braid Program instrument gate.

## Owned Capabilities

- `scripts/eom/attractor-phase0-release-profile.cpp`: empirical workload and
  cost attribution for declared release families.
- `scripts/eom/attractor-ensemble-harness.cpp`: checkpoint-chunked ensemble
  execution, deterministic resume, streamed observables, and viewable record
  emission.
- Fresh-build identity, sanitizer coverage, checkpoint-to-record token parity,
  cross-chunk comparison, and release-root clearance.

## Open Work

1. Establish a post-review baseline from a fresh EOM build.
2. Reaccept checkpoint resume and exact checkpoint-to-record token parity.
3. Reaccept sanitizer coverage, cross-chunk comparison, and release-root
   clearance.
4. Confirm Borg's record-only display route using a newly emitted
   `assembly-view-record.v0` file; display does not upgrade evidence.
5. Hand the accepted instrument to the Braid Program only after its
   [instrument gate](../braid-program/campaigns/instrument-gate.md) accepts G3
   and G4.
