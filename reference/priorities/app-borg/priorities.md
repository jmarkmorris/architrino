# Borg App

## Workstream Metadata

- Kind: `priority`
- Rank: `14`
- Value: `0.46`
- Cost: `5.1`
- ROI: `0.09`
- Status: `deferred`
- Claim level: `priority-design`
- Execution ledger: [work queue](work-queue.md)
- Design packet: [requirements-and-design](contracts/requirements-and-design.md)
- Assembly-view replay packet: [assembly-viewer-requirements](contracts/assembly-viewer-requirements.md)
- Prescribed-translation packet: [prescribed-translation](contracts/prescribed-translation.md)
- Boundary-shell replay packet: [boundary-shell-replay](contracts/boundary-shell-replay.md)
- Dataset manifest: [borg-dataset-manifest.v1](contracts/borg-dataset-manifest.v1.md)

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
9. The primary accompaniment to every pictured study is a plain-language account of its facts, insights and conclusions: assembly formation, stability, tested perturbation survival and transient or persistent behavior. A one-paragraph animation description and principal findings remain available during playback and pause. Numerical metrics and verification details belong in secondary inspection with open-source links. The [study explanation requirement](contracts/requirements-and-design.md#study-explanation-alongside-the-visualization) owns this operator-directed presentation policy; implementation is not claimed.

## Work Queue

The locally ranked execution order, including deferred workflows, lives in [work-queue.md](work-queue.md).

## Accepted Weber visualization addition

The operator requires circular and noncircular instantaneous Weber bound pairs in Borg. [BORG-019](work-queue.md#borg-019--instantaneous-weber-bound-pair-visualizations) owns the catalog and visualization acceptance, including a stable circle, a near-circular rosette and the eccentric WP-2 case. Reuse the independently confirmed completed benchmark with its exact equation and source records; this app addition leaves Weber research dormant. The [motion explanation](brainstorming.md#noncircular-weber-bound-pairs) describes what the noncircular examples show.

## Proposed research integration

The [alternative-equation assembly proposal](brainstorming.md#assemblies-under-alternative-master-equations) describes source-bound equation selection, research-record replay and comparisons, followed separately by validated EOM support for selected variants. Beyond the accepted Weber pair addition above, this broader design remains provisional. Its proposed first step is an intake inventory for one released-balance comparison under the canonical and field-speed-ceiling equations; no additional implementation task, research execution, score change or reactivation is selected.

## Promotion Boundary

Promote only stable, evidence-bound explanatory material into the corpus. Design notes, implementation obligations, and execution evidence remain in this priority directory and its linked queue.

## Manuscript synthesis

- [Manuscript](manuscript.md)
- [Source coverage](analysis/manuscript-source-coverage.md)
- [Independent fidelity review](analysis/manuscript-review.md)
