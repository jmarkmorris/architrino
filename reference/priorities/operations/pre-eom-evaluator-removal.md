# Pre-EOM Evaluator Removal (Tombstone)

## Status

- Kind: `operations-record`
- Date: `2026-07-16`
- Authority: operator order, executed same day
- This is the single in-repo record of the removal. Full history lives in git.

## What happened

Before EOM, the repo carried an earlier simulation engine. A 2026-07-12 independent audit found it was a prescribed-orbit force evaluator with no coupled integrator: it evaluated forces on analytically prescribed paths and self-reported canonical evidence flags its mathematics did not earn. All temporal, stability, and long-term conclusions produced through it were quarantined pending re-derivation; force-balance facts and negatives survived under separate re-verification burdens.

Consumers were migrated to the EOM engine (`src/eom`) individually — display surfaces to recorded-dataset adapters, Borg to EOM-native runs with certified artificial retained history, Photon and Ideal Braid to an explicitly non-evidence prescribed-path analysis library (`src/prescribed-path-analysis`). The engine, its bridge, its build/guard toolchain, its surface tests, its stored outputs and fixtures, its research-instrument scripts, the archived campaign records built on it, its audit and migration paper trail, and finally every remaining in-repo reference to it were then removed by operator order.

## What this binds

- **EOM is the only engine.** All motion, causal-root, path-history, and evolution computation routes through `src/eom` and its contracts (`eom_evolution_contract/v0`), gated by its declared acceptance criteria.
- **Nothing pre-EOM may return.** Do not reintroduce the removed evaluator, port its kernels forward, restore its outputs from git history, or cite any number it produced as evidence at any claim level.
- **Producer-asserted evidence flags are never consumed.** Canonical authority comes only from EOM's acceptance gates and independent oracles, never from a field an engine sets about itself.
- **If a document or dataset claiming pre-EOM provenance resurfaces**, treat it as non-evidence, quarantine it, and flag it to the operator.

## Removal inventory (cluster level, for git archaeology)

Engine tree and bridge; build, guard, benchmark, and toolchain scripts; surface and contract tests; Borg stored compatibility fixture and its generators; legacy research-instrument scripts and their fixtures; the archived legacy braid campaign directory; the audit/quarantine/claims-triage lane and retirement dispatch records; and all terminology referring to the removed engine. Dates of record: audit 2026-07-12, migration 2026-07-15/16, deletion and full purge 2026-07-16.
