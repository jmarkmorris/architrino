# Borg App

## Workstream Metadata

- Kind: `priority`
- Rank: `7`
- Value: `16.38`
- Cost: `4.3`
- ROI: `3.81`
- Status: `design-open`
- Claim level: `priority-design`
- Execution ledger: [work queue](work-queue.md)
- Design packet: [requirements-and-design](requirements-and-design.md)
- Assembly-view replay packet: [assembly-viewer-requirements](assembly-viewer-requirements.md)
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

## Ranked Next Objects

1. `native_wake_history_and_boundary_residual_fixture` — [BORG-001: native wake history and boundary residuals](work-queue.md#borg-001--native-wake-history-and-boundary-residuals). Status: `queued`.
2. `assembly_viewer_record_contract_carriers` — [BORG-002: assembly-viewer record-contract carriers](work-queue.md#borg-002--assembly-viewer-record-contract-carriers). Status: `queued`.
3. `velocity_scale_sampling_evidence` — [BORG-003: velocity-scale sampling evidence](work-queue.md#borg-003--velocity-scale-sampling-evidence). Status: `queued`.
4. `assembly_explorer_disposition` — [BORG-004: Assembly Explorer disposition](work-queue.md#borg-004--assembly-explorer-disposition). Status: `queued`.
5. Save, export, import, and load workflows remain deferred until EOM-run dataset coverage stabilizes.

## Promotion Boundary

Promote only stable, evidence-bound explanatory material into the corpus. Design notes, implementation obligations, and execution evidence remain in this priority directory and its linked queue.
