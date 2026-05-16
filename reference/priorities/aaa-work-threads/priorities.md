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
- Map each ranked row to the latest dated `closure-scorecard` $\Delta$ categories it materially advances. Record `MinDelta` as the most negative relevant $\Delta$ value. If no scorecard category materially applies, use `0`.
- Compute `Pressure = 1 + max(0, -MinDelta)/100`. Negative scorecard deltas raise priority pressure; positive deltas do not lower priority, retire the work, or mark it as finished. Being ahead of the modern-physics comparator is a floor-clearing signal, not a stopping rule.
- Score `Engine` as a multiplier for foundational engine leverage: how directly the row advances the core equations, potential/action closure, certified branches, executable equation tests, or first physical payoff surfaces that can create a cascade of insight.
  - `1.40-1.55`: core-equation, potential/action, or master-dynamics work that can drive many later derivations;
  - `1.15-1.35`: proof or simulation work that certifies or stress-tests the core dynamics;
  - `1.00-1.10`: first physical payoff surfaces, such as mass, Lorentz, tri-binary, or spin closure, that consume and sharpen the equation engine;
  - `0.85-0.95`: downstream sector work, reduced models, or visualization surfaces that help but do not drive the equation engine;
  - `0.60-0.80`: ledgers, gates, validation packets, and coordination/control artifacts whose value depends on upstream derivations being ready to account for or validate.
- Dependency rule: a ledger, gate, checker, validation packet, or coordination artifact cannot outrank its upstream derivation work unless the upstream equation, branch, potential/action, or sector theorem already has a concrete result ready to validate. If it is still mostly creating accounting structure, discount it with `Engine <= 0.80`.
- Compute adjusted `Value = Base * Cascade * Pressure * Engine`.
- Adjusted `Value` is intentionally allowed to exceed `10`; `Base` remains the direct-value score, `Cascade` records the multiplier effect, `Pressure` records current comparator-deficit pressure from the closure scorecard, and `Engine` records foundational equation-driving leverage.
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

This single table is the canonical rollup for ranked priority workstreams and high-leverage shared theorem packets. Use it to maintain ranking, notice category mistakes, and decide which directories or packet-level queues deserve active attention. `MinDelta` is the strongest current negative closure-scorecard pressure the row is expected to improve; it is a prioritization signal, not a claim that the row owns the entire scorecard category.

This table lists detailed sibling files only when they act as multiplier packets across several workstreams. Ordinary detailed files remain in [inventory.md](inventory.md).

The cross-workstream product join for shared closure objects, repeated proof grammar, and sector projections lives in [closure-join-matrix.md](closure-join-matrix.md).

Nested proof subprograms live under [proof-programs](../proof-programs/proof-programs.md). They keep local metadata for handoff clarity, but the parent `proof-programs` row is the canonical top-level ranking entry.

| Rank | Kind | Slug or packet | Title | Base | Cascade | MinDelta | Pressure | Engine | Value | Exec | Intuition | Deps | Valid | Cost | ROI |
| ---: | --- | --- | --- | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | Workstream | [`master-equation-closure`](../master-equation-closure/master-equation-closure.md) | Tractable master-equation stack for Lorentz / GR bridge, quantum, and core closure | 10.0 | 1.50 | -68 | 1.68 | 1.50 | 37.80 | 6 | 5 | 5 | 6 | 5.5 | 6.87 |
| 2 | Workstream | [`proof-programs`](../proof-programs/proof-programs.md) | Proof programs: breather certificate and planar bridge closure | 10.0 | 1.55 | -53 | 1.53 | 1.20 | 28.46 | 5 | 4 | 3 | 5 | 4.3 | 6.62 |
| 3 | Workstream | [`simulations`](../simulations/simulations.md) | Simulations, regularization, convergence, and shell numerics | 8.5 | 1.40 | -78 | 1.78 | 1.20 | 25.42 | 5 | 3 | 4 | 5 | 4.1 | 6.20 |
| 4 | Workstream | [`mass-map`](../mass-map/mass-map.md) | Noether-core stability, shielding, exposure, medium response, and first mass map | 10.0 | 1.55 | -68 | 1.68 | 1.10 | 28.64 | 5 | 4 | 5 | 6 | 4.9 | 5.84 |
| 5 | Workstream | [`tri-binary-causal-closure`](../tri-binary-causal-closure/tri-binary-causal-closure.md) | Tri-binary causal closure synthesis, photon/QED gate, and transition routing | 10.0 | 1.60 | -78 | 1.78 | 1.05 | 29.90 | 5 | 5 | 6 | 6 | 5.4 | 5.54 |
| 6 | Workstream | [`angular-momentum-spin`](../angular-momentum-spin/angular-momentum-spin.md) | Fundamental angular-momentum, spin, photon Gate B, measurement, and Bell prerequisites | 9.5 | 1.45 | -78 | 1.78 | 1.05 | 25.75 | 5 | 5 | 5 | 6 | 5.2 | 4.95 |
| 7 | Shared packet | [`exposure-quotient-theorem`](../mass-map/exposure-quotient-theorem.md) | Shared sector exposure / quotient theorem | 9.5 | 1.65 | -68 | 1.68 | 0.75 | 19.75 | 4 | 4 | 4 | 5 | 4.2 | 4.70 |
| 8 | Shared packet | [`residual-routing-event-ledger`](../tri-binary-causal-closure/residual-routing-event-ledger.md) | Shared residual-to-channel routing and event-ledger theorem | 9.5 | 1.70 | -78 | 1.78 | 0.65 | 18.69 | 4 | 4 | 4 | 5 | 4.2 | 4.45 |
| 9 | Shared packet | [`transfer-operator-basin-measure`](../quantum-closure/transfer-operator-basin-measure.md) | Shared transfer-operator and basin-measure theorem | 9.0 | 1.70 | -78 | 1.78 | 0.90 | 24.51 | 5 | 7 | 5 | 7 | 6.1 | 4.02 |
| 10 | Workstream | [`validation-gates`](../validation-gates/validation-gates.md) | Cross-sector acceptance intersections and no-go routing | 8.5 | 1.65 | -78 | 1.78 | 0.65 | 16.23 | 4 | 4 | 6 | 5 | 4.6 | 3.53 |
| 11 | Workstream | [`standard-model-closure`](../standard-model-closure/standard-model-closure.md) | Remaining Standard Model assembly gaps, flavor mixing, confinement, weak, and nuclear closure | 8.5 | 1.30 | -78 | 1.78 | 0.95 | 18.69 | 6 | 6 | 6 | 7 | 6.2 | 3.01 |
| 12 | Workstream | [`dyadic-lock`](../dyadic-lock/dyadic-lock.md) | Dyadic resonance lock reduced-map program | 7.0 | 1.25 | -27 | 1.27 | 0.95 | 10.56 | 4 | 4 | 4 | 5 | 4.2 | 2.51 |
| 13 | Workstream | [`animator`](../animator/animator.md) | Scene animator and visual reasoning surface | 7.0 | 1.20 | -27 | 1.27 | 0.85 | 9.07 | 5 | 4 | 4 | 4 | 4.3 | 2.11 |
| 14 | Workstream | [`strong-field-closure`](../strong-field-closure/strong-field-closure.md) | Black-hole / strong-field quantitative closure | 5.5 | 1.20 | -78 | 1.78 | 0.85 | 9.99 | 6 | 6 | 6 | 7 | 6.2 | 1.61 |
| 15 | Op queue | [`chapter-authoring`](../../op/chapter-authoring.md) | Unified chapter authoring queue and legacy-material recovery | 4.0 | 1.10 | -27 | 1.27 | 0.75 | 4.19 | 4 | 2 | 3 | 2 | 2.7 | 1.55 |
| 16 | Workstream | [`quantum-closure`](../quantum-closure/quantum-closure.md) | Deferred Born-rule / quantum closure with Bell hard tests | 5.5 | 1.35 | -78 | 1.78 | 0.80 | 10.57 | 6 | 8 | 7 | 8 | 7.3 | 1.45 |
| 17 | Workstream | [`cosmology-closure`](../cosmology-closure/cosmology-closure.md) | Cosmology transfer-function closure | 3.0 | 1.15 | -78 | 1.78 | 0.80 | 4.91 | 6 | 7 | 7 | 8 | 6.9 | 0.71 |

## Unranked Candidate And Archive References

These are tracked for visibility, but they are not ranked active workstreams in the scoring table.

| Slug or packet | Location | Role | Current disposition |
| --- | --- | --- | --- |
| `dark-sector` | [dark-sector.md](../dark-sector/dark-sector.md) | Speculative dark-sector candidate assembly lane for release, transport, redshift, reaction, and visible-channel re-entry hypotheses. | Priority candidate under watchlist review; promote only packets with a boundary condition, event ledger, redshift/re-entry gate, or discriminating observable. |
| `cross-theory-mapping` | [cross-theory-mapping.md](../cross-theory-mapping/cross-theory-mapping.md) | Priority-candidate lane for observational and experimental benchmark cases whose standard-theory mathematics can sharpen $\mathbb{A}\mathbb{A}\mathbb{A}$ closure work. | Keep unranked until one case supplies a concrete acceptance predicate, closure object, promotion target, and failure mode strong enough to enter a ranked workstream. |
| `ellipsoid` | [ellipsoid.md](../ellipsoid/ellipsoid.md) | Effective-metric routing surface plus Ideal Core app idea. | Priority candidate under routing review; retire only after sibling files have destinations. |
| `strong-field hypothesis bank` | [hypothesis-bank.md](../strong-field-closure/hypothesis-bank.md) | Strong-field and tri-binary hypothesis watchlist. | Merged under `strong-field-closure`; not a ranked top-level workstream. |
| `deferred` | [legacy-insights.md](../deferred/legacy-insights.md) | Archive and parking lot for non-current material. | Needs a deferred index later. |
| `3x3` | [3x3.md](../deferred/3x3/3x3.md) | Deferred binary-slot matrix note. | Keep deferred unless a target $\mathbb{A}\mathbb{A}\mathbb{A}$ document is selected. |
| `phenomenological-heuristics` | [phenomenological-heuristics.md](../dyadic-lock/phenomenological-heuristics.md) | Dyadic resonance lock archive source. | Keep as sibling archive unless a shared archive convention is adopted. |
| `ideal-core` | [ideal-core.md](../ideal-core/ideal-core.md) | End-user Ideal Core app planning and implementation control surface. | Keep outside the theory score table unless app work becomes a validation or authoring dependency. |

## Current Focus

- Workstream `master-equation-closure`: now ranked first because the priority surface is explicitly equation-engine-first. Carry the tractable master-equation stack far enough to support Lorentz / GR closure, quantum closure, and the first-principles mass program; coefficient recovery is the decisive consumer of this work.
- Workstream `proof-programs`: remains top-three because potential/action closure carries a large deficit and certified branches are the first hard evidence that the dynamics have nonempty structure. The dual-mollified master-equation law and doubled four-arc itinerary parity pass are completed state, and the seed-chart packet contract now fixes the next executable gate: generate one symmetry-constrained candidate collinear cycle, mesh, null-coordinate causal ledger, and certified branch chart.
- Workstream `simulations`: moves into the top-three as the fastest way to discipline the equation engine. The campaign object and $A_0$ protocol surface are mature enough to drive self-root fold/splitting classification followed by one-period adaptive direct-root Tier 1 continuation with explicit residual, drift, monodromy, and failure-code outputs.
- Workstream `mass-map`: the $A_0$ Tier 0 scaffold now emits quotient coordinates, residuals, blocked accepted-history output, weak-retained fail-closed behavior, weak-emitter fail-closed behavior, direct-root branch retention, and branch surplus tracking. The active calculation is the adaptive direct-root self-branch fold/splitting diagnostic before one-period Tier 1 continuation, not a new coarse reduced scan.
- Workstream `tri-binary-causal-closure`: compact control file and sibling synthesis structure are in place. Under the engine-weighted scorecard, the photon/QED gate and radiation Gate C benchmark packets matter after the core equations and branch surfaces start producing concrete dynamics.
- Workstream `angular-momentum-spin`: use the sibling core-ledger, partition/spinor, and photon/measurement/Bell files to promote the scaffolded Noether-core angular-momentum ledger into a validated functional, generalize the solved minimal partition branch, prove or falsify ordered-frame spinor closure, and keep Bell as a downstream pair-provenance and measurement-response test.
- Shared packet `exposure-quotient-theorem`: remains high but is now downstream of equation/proof/simulation engines because formula/coefficient recovery needs one reusable exposure grammar for mass shielding, weak chirality, color exceptionality, photon transverse support, and vector-corridor visibility.
- Shared packet `residual-routing-event-ledger`: remains high but no longer outranks upstream derivation work. It should turn the shared residual-to-channel contract into worked sector cases only as concrete branches, transitions, and sector residuals become available to account for.
- Shared packet `transfer-operator-basin-measure`: stays active as the quantum-side route from architecture to validated probabilities, detector kernels, Bell tests, dyadic locks, and pilot-wave / algorithmic-resonance stress tests.
- Workstream `validation-gates`: stays in the top ten but is capped by the dependency rule until a sector case has a concrete result ready to validate. Use the closure-intersection ledger as the cross-sector pressure test for whether weak, quantum, gravity, hadronic, radiation, and cosmology gates can survive together rather than as disconnected local wins.
- Workstream `standard-model-closure`: keep geometry-first work intact while the weak-sector/gauge packet absorbs weak `V-A`, weak-corridor provenance, CKM/PMNS compatibility, and gauge covariance as one umbrella task; nuclear binding remains a separate hadronic-to-nuclear coarse-graining risk.
- Workstream `dyadic-lock`: remains a lower-cost reduced-map proving ground for transfer-operator and basin-measure ideas, but it should not outrank benchmark-facing closure unless it produces a reusable measure theorem.
- Workstream `animator`: compact control file and sibling design/interface file are in place; choose the next concrete observer/framing, structure-editing, or timeline-object implementation pass before touching runtime code.
- Workstreams `strong-field-closure`, `quantum-closure`, and `cosmology-closure`: the scorecard pressure is high, but their intuition and validation costs keep them downstream until shared branch, exposure, event-ledger, and measure machinery mature.
- Workstream candidate `dark-sector`: keep dark-sector photon-like modes in [dark-sector](../dark-sector/dark-sector.md) as a speculative assembly lane until the packet gains a release-channel boundary condition, event ledger, redshift/re-entry gate, and discriminating observable.

## Organization Status

- First-pass flat cleanup is complete for `standard-model-closure`, `dyadic-lock`, `mass-map`, `master-equation-closure`, `simulations`, `strong-field-closure`, `cosmology-closure`, `quantum-closure`, `proof-programs`, `angular-momentum-spin`, `animator`, `ellipsoid`, `tri-binary-causal-closure`, and `validation-gates`. The `dark-sector` candidate lane now has a compact watchlist control file and one detailed dark-sector photon-like mode packet.
- The latest deduplication pass compressed weak-sector subgates, quantum stress tests, residual-routing prose, event-ledger prose, strong-field hypotheses, and ellipsoid routing without deleting source material.
- The latest coverage pass added ten high-upside $\mathbb{A}\mathbb{A}\mathbb{A}$ gap packets without adding extra requirements subdirectories: validation gates, residual-routing event-ledger theorem, exposure-quotient theorem, transfer-operator / basin-measure theorem, radiation Gate C, Decider minimality, weak-sector/gauge closure, nuclear binding, condensed-matter medium transport, and algorithmic-resonance / pilot-wave closure. The multiplier scoring pass promoted `validation-gates` into the ranked table because cross-sector acceptance can falsify or strengthen several local wins at once. The resistance-cost scoring pass split cost into execution, intuition, dependency, and validation burdens; this lifted executable simulation work and lowered high-intuition quantum closure work. The validated-closure scorecard-pressure pass now factors the May 16 `closure-scorecard` deltas into `Value`; empirical benchmark validation (`-78`), formula/coefficient recovery (`-68`), potential/action closure (`-53`), conservation/invariant closure (`-48`), parameter/scale closure (`-45`), and UV/IR plus cross-regime deficits (`-40`) dominate rank pressure, while positive architecture pressure no longer compensates for missing validated mathematics. The latest engine-leverage pass adds the `Engine` multiplier and dependency rule, so core equations, potential/action work, certified branches, and executable simulations outrank ledgers and gates unless those infrastructure rows are consuming an upstream result that is already ready to validate.
- [closure-join-matrix.md](closure-join-matrix.md) is the product-join view over repeated queue structure: branch state, causal-wake ledger, residual routing, event ledger, exposure, medium response, basin measure, and cross-sector acceptance.
- [inventory.md](inventory.md) is the detailed map for which files are compact control surfaces, which are detailed priority files, and which deployed $\mathbb{A}\mathbb{A}\mathbb{A}$ documents should eventually absorb promoted material.
- Remaining organization work is review-level: decide whether any priority candidate or deferred packet deserves promotion, demotion, or merger after the current theory and app priorities stabilize.

## Top Cross-Workstream Next Actions

1. Drive `master-equation-closure` first: extend the tractable master-equation stack until Lorentz / GR bridge work, quantum closure, and first-principles mass work have equations rather than only routing language.
2. Generate the breather candidate cycle and seed-chart packet: `phi_cyc.json`, `mesh.json`, null-coordinate causal ledger, branch chart, and seed-chart interval report; then continue into corridor nonemptiness, coupled corridor, monodromy diagnostic, returned-sample report, and topology ledger on the same certified domain.
3. Use simulation work as the low-intuition path to make proof certificates, convergence checks, regularization choices, and shell numerics executable enough to discipline the theory queues.
4. Classify the $A_0$ adaptive direct-root self-branch surplus event as `fold-layer`, `branch-proliferation`, or `resolution-artifact`; only then run one-period adaptive direct-root Tier 1 continuation with residual, drift, monodromy, and accepted-history blocking checks.
5. Push the Lorentz / redshift / metric deficit cluster through `tri-binary-causal-closure`, `master-equation-closure`, and medium-response work until contraction, dilation, clock retuning, PPN recovery, and preferred-frame leakage bounds share one proof surface.
6. Advance the angular-momentum work until the Noether-core angular-momentum ledger, tri-binary partition rule, photon Gate B, spinor closure, and measurement/Bell prerequisites have a foundation-up derivation path rather than parallel sector explanations.
7. Advance the exposure-quotient theorem only where an accepted branch or sector ledger exists to project; it should consume core derivations, not replace them.
8. Advance the residual-routing event-ledger theorem as soon as concrete transitions, residuals, or radiation/reaction channels are ready to account for; keep it downstream of derivation work.
9. Advance the transfer-operator / basin-measure theorem as the quantum-side measure engine, but keep Born weights, detector kernels, Bell tests, dyadic locks, and pilot-wave / algorithmic-resonance stress tests tied to explicit state spaces and return maps.
10. Use `validation-gates` as the cross-sector pressure test only after a local workstream claims a promotable result; local wins must survive weak, quantum, gravity, hadronic, radiation, and cosmology acceptance gates together.
11. Keep Standard Model, strong-field, quantum, and cosmology closure downstream but sharper: weak/gauge, confinement, nuclear binding, Bell hard tests, black-hole observables, and cosmological transfer functions should inherit explicit branch, exposure, event-ledger, medium-response, and basin-measure objects rather than importing inherited-framework success as a terminal benchmark.
12. Select one concrete animator implementation pass from observer/framing, structure editing, or timeline objects, and keep deferred PDG material out of the active app path unless PDG work resumes.

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
