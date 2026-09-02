# Borg App

## Workstream Metadata

- Kind: `priority`
- Rank: `15`
- Value: `0.46`
- Cost: `5.1`
- ROI: `0.09`
- Status: `deferred`
- Claim level: `priority-design`
- Execution ledger: [work queue](work-queue.md)
- Design packet: [requirements-and-design](requirements-and-design.md)
- Assembly-view replay packet: [assembly-viewer-requirements](assembly-viewer-requirements.md)
- Prescribed-translation packet: [prescribed-translation](prescribed-translation.md)
- Boundary-shell replay packet: [boundary-shell-replay](boundary-shell-replay.md)
- Dataset manifest: [borg-dataset-manifest.v1](borg-dataset-manifest.v1.md)

## Objective

Maintain Borg as an app-facing surface for EOM-solver simulation and sealed-record assembly-view replay. Borg must consume EOM-owned runs and sealed records; it must not add another solver, reconstruct missing physics in the app, or elevate replay/display output into independent evidence.

## Current Decisions

1. The EOM solver is Borg’s only forward engine; ordinary startup remains idle until explicit Start.
2. Simulation workspace and assembly-view replay are distinct: replay is record-only and exposes no run or mutation controls.
3. Borg displays a finite spherical envelope and central observation ball, with path and wake history owned by solver outputs and manifests.
4. Missing wake, interaction, residual, or boundary-shell rows remain fail-closed or display-only; the app must not fill gaps with visual tuning.
5. Keep the UI minimal while preserving required authority, error-budget, path-history, wake-history, boundary-shell, and diagnostic state.
6. Use normalized field speed $c_f=1$ for Borg EOM runs unless an explicit manifest transform is present.
7. Borg owns the selected teaching surfaces for prescribed geometry, source-carried classification and polarity rows, and interaction-ledger display; the scientific owner must supply every non-display row.
8. The assembly catalog is flat: no required family or parent metadata, no family menu headings, and no name-derived classifications. [The accepted decision](../../architectural-decisions/flat-assembly-catalog.md) preserves mathematical constraints and exact source provenance separately.

## Work Queue

The locally ranked execution order, including deferred workflows, lives in [work-queue.md](work-queue.md).

## Promotion Boundary

Promote only stable, evidence-bound explanatory material into the corpus. Design notes, implementation obligations, and execution evidence remain in this priority directory and its linked queue.
