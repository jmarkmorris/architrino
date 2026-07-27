# Attractor-Search Execution Instrument

## Packet Metadata

- Parent: [EOM](priorities.md)
- Status: `accepted-for-bounded-campaign-use`
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
- Fresh release and sanitizer builds now reaccept deterministic checkpoint
  resume, cumulative accounting, exact checkpoint-to-record token parity,
  declared cross-chunk comparison, and certified release-root propagation.
  The bounded evidence is recorded in the
  [G3/G4 reacceptance packet](evidence/attractor-resume-g3-g4-reacceptance-2026-07-27.md).
- No persistent assembly, braid, or attractor is booked.
- Reproduction against the harness's own uninterrupted execution establishes
  determinism and serialization identity only; campaign correctness still
  requires the independent-oracle duty declared by the Braid Program
  instrument gate.

## Owned Capabilities

- `scripts/eom/attractor-phase0-release-profile.cpp`: empirical workload and
  cost attribution for declared release families.
- `scripts/eom/attractor-ensemble-harness.cpp`: checkpoint-chunked ensemble
  execution, deterministic resume, streamed observables, and viewable record
  emission.
- Fresh-build identity, sanitizer coverage, checkpoint-to-record token parity,
  cross-chunk comparison, and release-root clearance.

## Open Work

1. Confirm Borg's record-only display route using a newly emitted
   `assembly-view-record.v0` file; display does not upgrade evidence.
2. Preserve the accepted G3/G4 baseline while each Braid Program campaign
   separately satisfies its root, residual, refinement, collapse, and
   independent-oracle gates.
