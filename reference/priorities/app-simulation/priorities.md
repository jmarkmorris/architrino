# App Simulation

## Workstream Metadata

- Kind: `priority`
- Rank: `2`
- Value: `24.88`
- Cost: `4.1`
- ROI: `6.07`
- Status: `active`

## Task Queue

1. `tier0_tier1_runs` — Continue fail-closed checker and anti-overfit coordinate work for the $A_0$ branch, while blocking accepted-physics promotion until `master-equation-closure` supplies the matching dynamics/branch-chart basis. Status: `active`. Depends on: none for fail-closed checker work; accepted-branch promotion depends on the matching `master-equation-closure` branch-chart basis.
2. `field_speed_action_self_hit_scan` — Run the binary-delay approach-to-$c_f$ scan on the same branch rows used for the nested shell braid action-increment packet, with root identity, Jacobian floor, particle-plus-wake energy, delayed-Noether status, action-increment clustering, and source-row binding all reported fail-closed. Status: `source_row_binding_open`. Depends on: `tier0_tier1_runs`, `eta_positive_package`, and the nested shell braid action-increment protocol.
3. `convergence_and_provenance` — Publish convergence plots and $\mathbb{U}_{\text{now}}$ provenance logs. Status: `pending`. Depends on: `tier0_tier1_runs`.
4. `eta_positive_package` — Consolidate the formal $\eta > 0$ existence and continuation package. Status: `pending`. Depends on: `tier0_tier1_runs`.
5. `hydrogen_gamma_n_record_extraction` — Replace scaffolded hydrogen $\Gamma_N$ spectral-row inputs only with same-ledger native hydrogen spectral channel records. Status: `pending`. Depends on: `hydrogen_fermion_sea_boundary` and Noether sea response rows from `mass-map`.
6. `gw_public_waveform_packet` — Build a public-data gravitational-wave benchmark packet from GWOSC/LVK event records. Status: `pending`. Depends on: gravitational-wave effective-metric and event-ledger closure rows.

## Scope

This file is the compact control surface for simulations, regularization, convergence, shell numerics, and simulation-backed validation.

Detailed protocol, campaign-object, acceptance, and artifact material lives in [simulations.md](simulations.md). Loose simulation-side questions and early idea material live in [brainstorming.md](brainstorming.md). Promote material back here only when it becomes a queue item, proof route, app task, or document/app destination.

## Detailed Priority Files

| File | Role | Primary promotion targets |
| --- | --- | --- |
| [simulations.md](simulations.md) | Detailed simulation campaign contracts, field-speed action self-hit scan packet, source-row binding rules, campaign object, public gravitational-wave benchmark campaign, executable diagnostic contract, tier acceptance criteria, proof-certificate handoff, numerical promotion lemma, $\eta > 0$ regularization package, falsifiers, and artifact contracts. | [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md), [convergence-tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md), [synthetic-observables](../../../content/markdown/aaa/validation/simulations/synthetic-observables.md), and [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md). |
| [brainstorming.md](brainstorming.md) | Idea and open-question parking for Planck-scale framing, simulation-scope envelope, provenance utility, direct nucleon Monte Carlo framing, and wake-pattern return diagnostics. | Existing simulation, proof, Standard Model, strong-field, and app targets after a concrete promotion route is selected. |

## Promotion Map

| Task | Detailed source | Primary promotion target | Promotion gate |
| --- | --- | --- | --- |
| `tier0_tier1_runs` | [simulations.md](simulations.md) | [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md) and [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) | Tier 1 runs classify self-root surplus events, emit root ledgers, branch residuals, regularization data, and explicit failure codes rather than generic instability summaries. |
| `field_speed_action_self_hit_scan` | [simulations.md](simulations.md) and [nested-shell-braid-action-increment-protocol](../../../content/markdown/aaa/validation/simulations/nested-shell-braid-action-increment-protocol.md) | [nested-shell-braid-action-increment-protocol](../../../content/markdown/aaa/validation/simulations/nested-shell-braid-action-increment-protocol.md) and [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) | The binary approach-to-$c_f$ scan reports causal-root multiplicity, root-ledger stability, Jacobian floor, and action-increment clustering on the same rows before any `candidate_h_recovery` promotion. |
| `convergence_and_provenance` | [simulations.md](simulations.md) | [convergence-tests](../../../content/markdown/aaa/validation/simulations/convergence-tests.md) and [synthetic-observables](../../../content/markdown/aaa/validation/simulations/synthetic-observables.md) | Convergence plots and $\mathbb{U}_{\text{now}}$ provenance logs are reproducible enough to audit a promoted result. |
| `eta_positive_package` | [simulations.md](simulations.md) | [well-posedness-and-regularization](../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md) | The formal $\eta > 0$ package states existence, uniqueness, continuation criteria, and no-runaway bounds for the relevant causal-wake model. |
| `hydrogen_gamma_n_record_extraction` | [simulations.md](simulations.md) | [hydrogen-gamma-n-spectral-row-toy-scan](../../../content/markdown/aaa/validation/simulations/hydrogen-gamma-n-spectral-row-toy-scan.md), [atomic-spectra](../../../content/markdown/aaa/nuclear-atomic/atomic-spectra.md), and [proper-time-and-time-dilation](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md) | The scaffolded hydrogen row is promoted beyond scaffold status only when $\mathbf{g}_{N,\mathrm H}^{(\ell)}$, envelope gaps, observer frequencies, and static response inputs come from one declared hydrogen spectral channel record and the same clock-rate conversion survives refinement. |
| `gw_public_waveform_packet` | [simulations.md](simulations.md) and [gravitational-waves](../cross-theory-mapping/gravitational-waves.md) | [run-protocols](../../../content/markdown/aaa/validation/simulations/run-protocols.md) and future strong-field validation rows | A public gravitational-wave packet compares predicted detector strain, phase, event energy ledger, photon/gravity timing, and provenance against versioned GWOSC/LVK records rather than against unversioned plots or hand-tuned templates. |

## Related Priorities

- [master-equation-closure](../master-equation-closure/priorities.md)
- [mass-map](../braid-mass-response-map/priorities.md)
- [dyadic-lock](../braid-dyadic-lock/priorities.md)
- [quantum-closure](../quantum-closure/priorities.md)
- [strong-field-closure](../strong-field-closure/priorities.md)
