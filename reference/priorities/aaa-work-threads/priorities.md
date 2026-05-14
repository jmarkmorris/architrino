# Priorities Report

This file is the canonical control surface for `priorities`. Directory names are stable identities. Rank, status, classification, and task queues live here and in each workstream slug file, not in the filesystem names.

The full pre-split monolith is preserved at [deferred/priorities-legacy.md](../deferred/priorities-legacy.md).

## Scoring System

- Score `Base` on a `1-10` scale for the direct local value of closing the work.
- Score `Cascade` as a multiplier for how much a solved item unlocks, constrains, or simplifies other workstreams:
  - `1.00-1.15`: mostly local payoff;
  - `1.20-1.35`: useful cross-links or documentation/reader payoff;
  - `1.40-1.55`: unlocks several theory queues or removes repeated proof grammar;
  - `1.60-1.75`: multiplier node whose solution cascades across many sectors.
- Compute adjusted `Value = Base * Cascade`.
- Adjusted `Value` is intentionally allowed to exceed `10`; `Base` remains the direct-value score and `Cascade` records the multiplier effect.
- Score `Cost` as expected resistance to closure, not as raw hours. Raw hours become meaningful only after the proof route or implementation route has enough traction.
- Split cost into four `1-10` burden columns:
  - `Exec`: artifact effort once the path is known: writing, derivation, code, data, or certificate production.
  - `Intuition`: conceptual invention still required before ordinary execution can begin. This is the explicit cost of innovation or insight.
  - `Deps`: dependency and integration burden across workstreams, deployed corpus documents, notation, and accepted terminology.
  - `Valid`: validation burden from hard gates, benchmarks, no-go constraints, recovery targets, and failure modes.
- Compute `Cost = 0.25*Exec + 0.35*Intuition + 0.20*Deps + 0.20*Valid`, rounded to one decimal. `Intuition` is weighted highest because it is the least schedulable term.
- Compute `ROI = Value / Cost`.
- Use the scoring table as the canonical ranking. Break ties by higher adjusted `Value`, then lower `Intuition`, then lower `Cost`, then higher `Cascade`.
- Workstream metadata stores the adjusted `Value`, `Cost`, and `ROI` from this table for ranked workstream rows. Ranked shared theorem packets do not need workstream metadata unless they become parent workstreams.

## Workstream Overview Structure

Each active workstream `<slug>.md` file should use the same front-matter order before any local theory or product notes:

1. `## Workstream Metadata`
2. `## Task Queue`
3. `## Scope`

After that fixed front matter, each workstream may add its own domain-specific sections such as `Current State`, `Main Directions`, `Quantitative Targets`, or `Hypotheses To Preserve`.

Keep the metadata field order fixed for workstream control files:

- `Kind`
- `Rank`
- `Value`
- `Cost`
- `ROI`
- `Status`

Keep task queue lines in one compact sentence form:

- `` `task_id` — Task title. Status: `state`. Depends on: ... ``

This keeps the files readable in plain Markdown, diff-friendly in git, and structurally consistent without requiring a separate machine-control file.

## Unified Priority Table

This single table is the canonical rollup for ranked priority workstreams and high-leverage shared theorem packets. Use it to maintain ranking, notice category mistakes, and decide which directories or packet-level queues deserve active attention.

This table lists detailed sibling files only when they act as multiplier packets across several workstreams. Ordinary detailed files remain in [inventory.md](inventory.md).

The cross-workstream product join for shared closure objects, repeated proof grammar, and sector projections lives in [closure-join-matrix.md](closure-join-matrix.md).

Nested proof subprograms live under [proof-programs](../proof-programs/proof-programs.md). They keep local metadata for handoff clarity, but the parent `proof-programs` row is the canonical top-level ranking entry.

| Rank | Kind | Slug or packet | Title | Base | Cascade | Value | Exec | Intuition | Deps | Valid | Cost | ROI |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | Shared packet | [`residual-routing-event-ledger`](../tri-binary-causal-closure/residual-routing-event-ledger.md) | Shared residual-to-channel routing and event-ledger theorem | 9.5 | 1.70 | 16.15 | 4 | 4 | 4 | 5 | 4.2 | 3.85 |
| 2 | Shared packet | [`exposure-quotient-theorem`](../mass-map/exposure-quotient-theorem.md) | Shared sector exposure / quotient theorem | 9.5 | 1.65 | 15.68 | 4 | 4 | 4 | 5 | 4.2 | 3.73 |
| 3 | Workstream | [`proof-programs`](../proof-programs/proof-programs.md) | Proof programs: breather certificate and planar bridge closure | 10.0 | 1.55 | 15.50 | 5 | 4 | 3 | 5 | 4.3 | 3.65 |
| 4 | Workstream | [`validation-gates`](../validation-gates/validation-gates.md) | Cross-sector acceptance intersections and no-go routing | 8.5 | 1.65 | 14.03 | 4 | 4 | 6 | 5 | 4.6 | 3.05 |
| 5 | Workstream | [`mass-map`](../mass-map/mass-map.md) | Noether-core stability, shielding, exposure, medium response, and first mass map | 10.0 | 1.55 | 15.50 | 5 | 5 | 5 | 6 | 5.2 | 2.98 |
| 6 | Workstream | [`tri-binary-causal-closure`](../tri-binary-causal-closure/tri-binary-causal-closure.md) | Tri-binary causal closure synthesis, photon/QED gate, and transition routing | 10.0 | 1.60 | 16.00 | 5 | 5 | 6 | 6 | 5.4 | 2.96 |
| 7 | Workstream | [`simulations`](../simulations/simulations.md) | Simulations, regularization, convergence, and shell numerics | 8.5 | 1.40 | 11.90 | 5 | 3 | 4 | 5 | 4.1 | 2.90 |
| 8 | Workstream | [`master-equation-closure`](../master-equation-closure/master-equation-closure.md) | Tractable master-equation stack for Lorentz / GR bridge, quantum, and core closure | 10.0 | 1.50 | 15.00 | 6 | 5 | 5 | 6 | 5.5 | 2.75 |
| 9 | Workstream | [`angular-momentum-spin`](../angular-momentum-spin/angular-momentum-spin.md) | Fundamental angular-momentum, spin, photon Gate B, measurement, and Bell prerequisites | 9.5 | 1.45 | 13.78 | 5 | 5 | 5 | 6 | 5.2 | 2.65 |
| 10 | Shared packet | [`transfer-operator-basin-measure`](../quantum-closure/transfer-operator-basin-measure.md) | Shared transfer-operator and basin-measure theorem | 9.0 | 1.70 | 15.30 | 5 | 7 | 5 | 7 | 6.1 | 2.51 |
| 11 | Workstream | [`dyadic-lock`](../dyadic-lock/dyadic-lock.md) | Dyadic resonance lock reduced-map program | 7.0 | 1.25 | 8.75 | 4 | 4 | 4 | 5 | 4.2 | 2.08 |
| 12 | Workstream | [`animator`](../animator/animator.md) | Scene animator and visual reasoning surface | 7.0 | 1.20 | 8.40 | 5 | 4 | 4 | 4 | 4.3 | 1.98 |
| 13 | Workstream | [`standard-model-closure`](../standard-model-closure/standard-model-closure.md) | Remaining Standard Model assembly gaps, flavor mixing, confinement, weak, and nuclear closure | 8.5 | 1.30 | 11.05 | 6 | 6 | 6 | 7 | 6.2 | 1.78 |
| 14 | Op queue | [`chapter-authoring`](../../op/chapter-authoring.md) | Unified chapter authoring queue and legacy-material recovery | 4.0 | 1.10 | 4.40 | 4 | 2 | 3 | 2 | 2.7 | 1.63 |
| 15 | Workstream | [`strong-field-closure`](../strong-field-closure/strong-field-closure.md) | Black-hole / strong-field quantitative closure | 5.5 | 1.20 | 6.60 | 6 | 6 | 6 | 7 | 6.2 | 1.06 |
| 16 | Workstream | [`quantum-closure`](../quantum-closure/quantum-closure.md) | Deferred Born-rule / quantum closure with Bell hard tests | 5.5 | 1.35 | 7.43 | 6 | 8 | 7 | 8 | 7.3 | 1.02 |
| 17 | Workstream | [`cosmology-closure`](../cosmology-closure/cosmology-closure.md) | Cosmology transfer-function closure | 3.0 | 1.15 | 3.45 | 6 | 7 | 7 | 8 | 6.9 | 0.50 |

## Unranked Candidate And Archive References

These are tracked for visibility, but they are not ranked active workstreams in the scoring table.

| Slug or packet | Location | Role | Current disposition |
| --- | --- | --- | --- |
| `ellipsoid` | [ellipsoid.md](../ellipsoid/ellipsoid.md) | Effective-metric routing surface plus Ideal Core app idea. | Priority candidate under routing review; retire only after sibling files have destinations. |
| `strong-field hypothesis bank` | [hypothesis-bank.md](../strong-field-closure/hypothesis-bank.md) | Strong-field and tri-binary hypothesis watchlist. | Merged under `strong-field-closure`; not a ranked top-level workstream. |
| `deferred` | [legacy-insights.md](../deferred/legacy-insights.md) | Archive and parking lot for non-current material. | Needs a deferred index later. |
| `3x3` | [3x3.md](../deferred/3x3/3x3.md) | Deferred binary-slot matrix note. | Keep deferred unless a target $\mathbb{A}\mathbb{A}\mathbb{A}$ document is selected. |
| `phenomenological-heuristics` | [phenomenological-heuristics.md](../dyadic-lock/phenomenological-heuristics.md) | Dyadic resonance lock archive source. | Keep as sibling archive unless a shared archive convention is adopted. |

## Current Focus

- Workstream `proof-programs`: architecture complete, certificate pending; the dual-mollified master-equation law is now recorded, the doubled four-arc itinerary has a coarse parity pass, and the seed-chart packet contract now fixes the next executable gate: generate one symmetry-constrained candidate collinear cycle, mesh, null-coordinate causal ledger, and certified branch chart. The planar delayed-bridge closure is kept as the queued higher-dimensional extension under the same directory.
- Workstream `mass-map`: derive the first reusable mass map from tri-binary geometry, using the sibling $A_0$ branch, energy/shielding, exposure-quotient, medium-response, and critical-transport packets rather than treating the parameter ledger in isolation.
- Workstream `tri-binary-causal-closure`: compact control file and sibling synthesis structure are in place; next active theory burdens are the photon/QED gate and the shared residual-routing event-ledger theorem, with radiation Gate C kept as the first worked benchmark packet for atomic, bremsstrahlung, synchrotron, Compton-like, pair, and blackbody recovery.
- Workstream `animator`: compact control file and sibling design/interface file are in place; choose the next concrete observer/framing, structure-editing, or timeline-object implementation pass before touching runtime code.
- Workstream `master-equation-closure`: carry the tractable master-equation stack far enough to support Lorentz / GR closure, quantum closure, and the first-principles mass program.
- Workstream `angular-momentum-spin`: use the sibling core-ledger, partition/spinor, and photon/measurement/Bell files to promote the scaffolded Noether-core angular-momentum ledger into a validated functional, generalize the solved minimal partition branch, prove or falsify ordered-frame spinor closure, and keep Bell as a downstream pair-provenance and measurement-response test.
- Workstream `standard-model-closure`: keep geometry-first work intact while the weak-sector/gauge packet absorbs weak `V-A`, weak-corridor provenance, CKM/PMNS compatibility, and gauge covariance as one umbrella task; nuclear binding remains a separate hadronic-to-nuclear coarse-graining risk.
- Workstream `quantum-closure`: remain deferred, but preserve the transfer-operator / basin-measure theorem packet as the shared measure-theoretic spine, with Decider minimality and pilot-wave / algorithmic-resonance opportunities downstream as stress tests under one top-level queue item.
- Workstream `strong-field-closure`: owns the former strong-field hypothesis watchlist as [hypothesis-bank](../strong-field-closure/hypothesis-bank.md), so hypotheses stay preserved without a separate ranked workstream.
- Workstream `validation-gates`: use the closure-intersection ledger as the cross-sector pressure test for whether weak, quantum, gravity, hadronic, radiation, and cosmology gates can survive together rather than as disconnected local wins.

## Organization Status

- First-pass flat cleanup is complete for `standard-model-closure`, `dyadic-lock`, `mass-map`, `master-equation-closure`, `simulations`, `strong-field-closure`, `cosmology-closure`, `quantum-closure`, `proof-programs`, `angular-momentum-spin`, `animator`, `ellipsoid`, `tri-binary-causal-closure`, and `validation-gates`.
- The latest deduplication pass compressed weak-sector subgates, quantum stress tests, residual-routing prose, event-ledger prose, strong-field hypotheses, and ellipsoid routing without deleting source material.
- The latest coverage pass added ten high-upside $\mathbb{A}\mathbb{A}\mathbb{A}$ gap packets without adding extra requirements subdirectories: validation gates, residual-routing event-ledger theorem, exposure-quotient theorem, transfer-operator / basin-measure theorem, radiation Gate C, Decider minimality, weak-sector/gauge closure, nuclear binding, condensed-matter medium transport, and algorithmic-resonance / pilot-wave closure. The multiplier scoring pass promoted `validation-gates` into the ranked table because cross-sector acceptance can falsify or strengthen several local wins at once. The resistance-cost scoring pass split cost into execution, intuition, dependency, and validation burdens; this lifted executable simulation work and lowered high-intuition quantum closure work.
- [closure-join-matrix.md](closure-join-matrix.md) is the product-join view over repeated queue structure: branch state, causal-wake ledger, residual routing, event ledger, exposure, medium response, basin measure, and cross-sector acceptance.
- [inventory.md](inventory.md) is the detailed map for which files are compact control surfaces, which are detailed priority files, and which deployed $\mathbb{A}\mathbb{A}\mathbb{A}$ documents should eventually absorb promoted material.
- Remaining organization work is review-level: decide whether any priority candidate or deferred packet deserves promotion, demotion, or merger after the current theory and app priorities stabilize.

## Top Cross-Workstream Next Actions

1. Advance the residual-routing event-ledger theorem and exposure-quotient theorem as the two highest-ROI multiplier packets; each should remove repeated proof grammar from several sector queues without collapsing those sector queues.
2. Generate the breather candidate cycle and seed-chart packet: `phi_cyc.json`, `mesh.json`, null-coordinate causal ledger, branch chart, and seed-chart interval report; then continue into corridor nonemptiness, coupled corridor, monodromy diagnostic, returned-sample report, and topology ledger on the same certified domain.
3. Use `validation-gates` as the cross-sector pressure test: local wins must survive weak, quantum, gravity, hadronic, radiation, and cosmology acceptance gates together.
4. Turn the mass-side placeholders into a first derived map with one attractor family, shielding extraction, exposure-quotient theorem, medium-response tensor, critical-transport threshold, and a baseline electron-mass prediction target.
5. Advance the tri-binary photon/QED path and radiation Gate C against the shared residual-routing contract before photon-based measurement or radiation is treated as closed.
6. Use simulation work as the low-intuition path to make proof certificates, convergence checks, regularization choices, and shell numerics executable enough to discipline the theory queues.
7. Carry the master-equation and angular-momentum ledgers far enough that Lorentz / GR bridge work, spinor closure, and photon Gate B have shared mathematical handles.
8. Keep quantum closure deferred but sharpen the transfer-operator / basin-measure packet so Born weights, detector kernels, Decider shifts, dyadic locks, pilot-wave guidance, and algorithmic-resonance coherence depth all consume one measure-theoretic grammar.
9. Select one concrete animator implementation pass from observer/framing, structure editing, or timeline objects, and keep deferred PDG material out of the active app path unless PDG work resumes.

## Info

### Repo / Branding / Community

- The new `architrino` repository went live on February 17, 2026.
- Go clean up the old `neoclassical.ai` repo.
- Try to sell the `neoclassical.ai` domain.
- Make a new subreddit named `architrino`.
- Rename the blog.

### Raw Research Prompts

- Think more about multi-determinism and how it maps to quantum theory, many worlds, and free will; route concrete claims through [agency-decision-and-decider](../quantum-closure/agency-decision-and-decider.md) or [algorithmic-resonance-and-pilot-wave](../quantum-closure/algorithmic-resonance-and-pilot-wave.md) instead of leaving them as loose prompts.

## Related $\mathbb{A}\mathbb{A}\mathbb{A}$ Notes

- [closure-scorecard](../../../content/markdown/aaa/validation/closure-scorecard.md)
- [failure-criteria](../../../content/markdown/aaa/validation/failure-criteria.md)
- [software-architecture-and-maintenance](../../../content/markdown/aaa/archie/software-architecture-and-maintenance.md)
- [research-notebook](../../../content/markdown/aaa/archie/research-notebook.md)
