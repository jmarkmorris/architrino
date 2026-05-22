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
  - `1.00-1.10`: first physical payoff surfaces, such as mass, Lorentz, Noether swarm, or spin closure, that consume and sharpen the equation engine;
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

| Rank | Kind          | Slug or packet                                                                                   | Title                                                                                         | Base | Cascade | MinDelta | Pressure | Engine | Value | Exec | Intuition | Deps | Valid | Cost |  ROI |
| ---: | ------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------- | ---: | ------: | -------: | -------: | -----: | ----: | ---: | --------: | ---: | ----: | ---: | ---: |
|    1 | Workstream    | [`master-equation-closure`](../master-equation-closure/master-equation-closure.md)                              | Tractable master-equation stack for Lorentz / GR bridge, quantum, and core closure            | 10.0 |    1.55 |      -53 |     1.53 |   1.50 | 35.57 |    6 |         5 |    5 |     6 |  5.5 | 6.47 |
|    2 | Workstream    | [`simulations`](../simulations/simulations.md)                                                                  | Simulations, regularization, convergence, and shell numerics                                  |  8.8 |    1.45 |      -64 |     1.64 |   1.25 | 26.16 |    5 |         3 |    4 |     5 |  4.1 | 6.38 |
|    3 | Workstream    | [`proof-programs`](../proof-programs/proof-programs.md)                                                         | Proof programs: breather certificate and planar bridge closure                                | 10.0 |    1.55 |      -37 |     1.37 |   1.25 | 26.54 |    6 |         4 |    4 |     5 |  4.7 | 5.65 |
|    4 | Workstream    | [`mass-map`](../mass-map/mass-map.md)                                                                           | Noether swarm stability, shielding, exposure, medium response, and first mass map              | 10.0 |    1.55 |      -53 |     1.53 |   1.15 | 27.27 |    6 |         4 |    5 |     6 |  5.1 | 5.35 |
|    5 | Workstream    | [`swarm`](../swarm/swarm.md)                        | Noether swarm triad migration and closure reset                                               | 10.0 |    1.60 |      -64 |     1.64 |   1.08 | 28.34 |    5 |         5 |    6 |     6 |  5.4 | 5.25 |
|    6 | Workstream    | [`angular-momentum-spin`](../angular-momentum-spin/angular-momentum-spin.md)                                    | Fundamental angular-momentum, spin, photon Gate B, measurement, and Bell prerequisites        |  9.5 |    1.45 |      -64 |     1.64 |   1.05 | 23.72 |    5 |         5 |    5 |     6 |  5.2 | 4.56 |
|    7 | Shared packet | [`exposure-quotient-theorem`](../mass-map/exposure-quotient-theorem.md)                                         | Shared sector exposure / quotient theorem                                                     |  9.5 |    1.65 |      -53 |     1.53 |   0.75 | 17.99 |    4 |         4 |    4 |     5 |  4.2 | 4.28 |
|    8 | Shared packet | [`residual-routing-event-ledger`](../nested-shell-swarm-causal-closure/residual-routing-event-ledger.md)                | Shared residual-to-channel routing and event-ledger theorem                                   |  9.5 |    1.70 |      -64 |     1.64 |   0.65 | 17.22 |    4 |         4 |    4 |     5 |  4.2 | 4.10 |
|    9 | Shared packet | [`pressure-dependent-noether-sea-constitutive-response`](../mass-map/pressure-dependent-noether-sea-constitutive-response.md) | Shared pressure-dependent Noether-Sea constitutive-response packet                            |  8.8 |    1.50 |      -53 |     1.53 |   0.95 | 19.19 |    4 |         5 |    5 |     5 |  4.8 | 4.00 |
|   10 | Shared packet | [`transfer-operator-basin-measure`](../quantum-closure/transfer-operator-basin-measure.md)                      | Shared transfer-operator and basin-measure theorem                                            |  9.0 |    1.70 |      -64 |     1.64 |   0.90 | 22.58 |    5 |         7 |    5 |     7 |  6.1 | 3.70 |
|   11 | Workstream    | [`validation-gates`](../validation-gates/validation-gates.md)                                                   | Cross-sector acceptance intersections and no-go routing                                       |  8.5 |    1.65 |      -64 |     1.64 |   0.65 | 14.95 |    4 |         4 |    6 |     5 |  4.6 | 3.25 |
|   12 | Workstream    | [`standard-model-closure`](../standard-model-closure/standard-model-closure.md)                                 | Remaining Standard Model assembly gaps, flavor mixing, confinement, weak, and nuclear closure |  8.5 |    1.30 |      -64 |     1.64 |   0.95 | 17.22 |    6 |         6 |    6 |     7 |  6.2 | 2.78 |
|   13 | Workstream    | [`dyadic-lock`](../dyadic-lock/dyadic-lock.md)                                                                  | Dyadic resonance lock reduced-map program                                                     |  7.0 |    1.25 |      -13 |     1.13 |   0.95 |  9.39 |    4 |         4 |    4 |     5 |  4.2 | 2.24 |
|   14 | Workstream    | [`animator`](../animator/animator.md)                                                                           | Scene animator and visual reasoning surface                                                   |  7.0 |    1.20 |      -11 |     1.11 |   0.85 |  7.93 |    5 |         4 |    4 |     4 |  4.3 | 1.84 |
|   15 | Workstream    | [`strong-field-closure`](../strong-field-closure/strong-field-closure.md)                                       | Black-hole / strong-field quantitative closure                                                |  6.0 |    1.20 |      -64 |     1.64 |   0.85 | 10.04 |    6 |         6 |    6 |     7 |  6.2 | 1.62 |
|   16 | Workstream    | [`quantum-closure`](../quantum-closure/quantum-closure.md)                                                      | Deferred Born-rule / quantum closure with Bell hard tests                                     |  6.0 |    1.35 |      -64 |     1.64 |   0.80 | 10.63 |    6 |         8 |    7 |     8 |  7.3 | 1.46 |
|   17 | Op queue      | [`chapter-authoring`](../chapter-authoring/chapter-authoring.md)                                                | Unified chapter authoring queue and source-material mining                                    |  4.0 |    1.10 |      -11 |     1.11 |   0.75 |  3.66 |    4 |         2 |    3 |     2 |  2.7 | 1.36 |
|   18 | Workstream    | [`cosmology-closure`](../cosmology-closure/cosmology-closure.md)                                                | Cosmology transfer-function closure                                                           |  3.5 |    1.20 |      -64 |     1.64 |   0.80 |  5.51 |    6 |         7 |    7 |     8 |  7.0 | 0.79 |

## Unranked Candidate And Archive References

These are tracked for visibility, but they are not ranked active workstreams in the scoring table.

| Slug or packet | Location | Role | Current disposition |
| --- | --- | --- | --- |
| `dark-sector` | [dark-sector.md](../dark-sector/dark-sector.md) | Speculative dark-sector candidate assembly lane for release, transport, redshift, reaction, and visible-channel re-entry hypotheses. | Priority candidate under watchlist review; promote only packets with a boundary condition, event ledger, redshift/re-entry gate, or discriminating observable. |
| `cross-theory-mapping` | [cross-theory-mapping.md](../cross-theory-mapping/cross-theory-mapping.md) | Priority-candidate lane for observational and experimental benchmark cases whose standard-theory mathematics can sharpen $\mathbb{A}\mathbb{A}\mathbb{A}$ closure work. | Keep unranked until one case supplies a concrete acceptance predicate, closure object, promotion target, and failure mode strong enough to enter a ranked workstream. |
| `ellipsoid` | [ellipsoid.md](../ellipsoid/ellipsoid.md) | Residual routing surface for old ellipsoid notes plus the nested shell swarm prototype app idea. | Shape-plus-scale deformation is already owned by the corpus; retire this candidate after raw notes and app routing have destinations. |
| `strong-field hypothesis bank` | [hypothesis-bank.md](../strong-field-closure/hypothesis-bank.md) | Strong-field and Noether swarm hypothesis watchlist. | Merged under `strong-field-closure`; not a ranked top-level workstream. |
| `deferred` | [legacy-insights.md](../deferred/legacy-insights.md) | Archive and parking lot for non-current material. | Needs a deferred index later. |
| `3x3` | [3x3.md](../deferred/3x3/3x3.md) | Deferred binary-slot matrix note. | Keep deferred unless a target $\mathbb{A}\mathbb{A}\mathbb{A}$ document is selected. |
| `phenomenological-heuristics` | [phenomenological-heuristics.md](../dyadic-lock/phenomenological-heuristics.md) | Dyadic resonance lock archive source. | Keep as sibling archive unless a shared archive convention is adopted. |
| `ideal-core` | [ideal-core.md](../ideal-core/ideal-core.md) | Nested shell swarm prototype app planning and implementation control surface. | Keep outside the theory score table unless app work becomes a validation or authoring dependency. |

## Current Focus

- Workstream `master-equation-closure`: remains ranked first after the 2026-05-20 rescore because the priority surface is still equation-engine-first. The delayed-interior characteristic-tail kernel has endpoint-clear normalization, receiver-gradient cancellation, and energy/momentum/angular-momentum wake-history increments fixed at the local action-kernel level. VP-1 is now an outward tangential-drive failure on a retained root chart, while fixed A1 is a tangential-pass/radial-blocked benchmark: $D_T(C_{\mathrm{A1}};I_\ast)<0$ is certified, but the force-ratio packet proves $\Gamma=b_\ast^2c_f^2r_\ast/(\kappa q_1^2)$ is not determined by A1 kinematics alone. The active work is an independent dimensional / constitutive $\Gamma$ interval or a different branch chart before Lorentz / GR bridge derivation.
- Workstream `simulations`: remains second by ROI because it is the lowest-intuition way to discipline the equation engine. The campaign object and $A_0$ protocol surface now carry classified and event-locked self-root `fold-layer` diagnostics, accepted-history source coverage, a fail-closed validation observer, and a direct fold-layer-locked one-period runner. The compact fixture executed `963815` retained steps without trajectory abort, then failed state/root/phase/speed/drift/energy-like residual closure; subsequent carrier-correction and refined-basis attempts produced finite-coordinate no-go evidence. The next simulation work must satisfy the branch-chart revision contract before another corrected one-period rerun.
- Workstream `proof-programs`: remains top-three because potential/action closure still carries a major validated-closure deficit and certified branches are the first hard evidence that the dynamics have nonempty structure. The dual-mollified master-equation law, doubled four-arc itinerary parity pass, accepted fixed-parameter fold constants, endpoint and regular-boundary rejection packets, cosine-packet parent-gate rejection, and fresh-collocation solver-surface audit are now completed priority evidence. The current executable gate is a fresh fold-adapted collocation candidate whose null-coordinate pre-ledger must pass before any branch chart is authorized.
- Workstream `mass-map`: the $A_0$ Tier 0 / Tier 1 scaffold now emits quotient coordinates, residuals, blocked accepted-history output, weak-retained fail-closed behavior, weak-emitter fail-closed behavior, direct-root branch retention, branch surplus tracking, an event-local fold-layer lock, a source-coverage-passing fold-layer-locked attempt packet, a direct one-period failure, scalar relation-weight and refined-basis no-go results, sampled forcing, a Fourier correction packet, center-preserving waveform replay, a compact-fixture decision witness, a branch-chart revision contract, and a fail-closed pre-rerun checker. The active calculation is no longer another immediate replay; it is a non-root-key inner-layer harmonic deformation coordinate with anti-overfit residuals before monodromy, eta-ladder, energy, shielding, finite envelope-Hessian extraction, or accepted-history emission.
- Workstream `swarm`: the compact control file now owns the Noether swarm triad migration. The broad reader-facing corpus terminology pass, file/path cleanup, visible scene/app copy pass, priority-ledger cleanup, and retained-branch claim discipline are review-ready; remaining work is formula-notation compatibility, simulation semantics, and proof execution. Retained-branch claims remain blocked until live-ledger certificate rows close on one convention. Sibling synthesis, dependency, event-ledger, relativity-bridge, and radiation packets are preserved as source material until a scoped proof or validation pass mines them through the accepted triad.
- Workstream `angular-momentum-spin`: the May 20 packet set turns the workstream from broad derivation into certificate population. It now has a branch-chart angular-momentum evaluation object, a symbolic minimal four-substep certificate, a finite candidate-set and branch-selection law target, a null spinor-holonomy control table, causal-writhe gauge controls, photon Gate B substrate residuals, Stern-Gerlach-like apparatus diagnostics, pair-provenance source scaffolds, and Bell residual handoff gates. The next work is one retained Noether swarm branch chart plus one native analyzer or apparatus model, not more ideal algebraic rows.
- Shared packet `exposure-quotient-theorem`: remains high but is now downstream of equation/proof/simulation engines because formula/coefficient recovery needs one reusable exposure grammar for mass shielding, weak chirality, color exceptionality, photon transverse support, and vector-corridor visibility.
- Shared packet `residual-routing-event-ledger`: remains high but no longer outranks upstream derivation work. It should turn the shared residual-to-channel contract into worked sector cases only as concrete branches, transitions, and sector residuals become available to account for.
- Shared packet `pressure-dependent-noether-sea-constitutive-response`: remains scored because the corpus now has a concrete pressure bridge between $n$, $\chi_{\text{sea}}$, $c_{\text{eff}}$, $\Gamma_N$, strain, and $\mathcal{M}_{\text{sea}}^{ab}$. It remains below branch/exposure/event-ledger work because the current Fe/Cr replay is a toy and the coefficients still require branch-derived pressure response rather than observable-local fitting.
- Shared packet `transfer-operator-basin-measure`: stays active as the quantum-side route from architecture to validated probabilities, detector kernels, Bell tests, dyadic locks, and pilot-wave / algorithmic-resonance stress tests.
- Workstream `validation-gates`: stays active but is capped by the dependency rule until a sector case has a concrete result ready to validate. Use the closure-intersection ledger as the cross-sector pressure test for whether weak, quantum, gravity, hadronic, radiation, and cosmology gates can survive together rather than as disconnected local wins.
- Workstream `standard-model-closure`: keep geometry-first work intact while the weak-sector/gauge packet absorbs weak `V-A`, weak-corridor provenance, CKM/PMNS compatibility, and gauge covariance as one umbrella task; nuclear binding remains a separate hadronic-to-nuclear coarse-graining risk.
- Workstream `dyadic-lock`: remains a lower-cost reduced-map proving ground for transfer-operator and basin-measure ideas, but it should not outrank benchmark-facing closure unless it produces a reusable measure theorem.
- Workstream `animator`: compact control file and sibling design/interface file are in place; keep app work globally downstream unless the operator/developer selects it or it directly supports inspection of a scored proof/simulation object.
- Workstreams `strong-field-closure`, `quantum-closure`, and `cosmology-closure`: the scorecard pressure is high, but their intuition and validation costs keep them downstream until shared branch, exposure, event-ledger, and measure machinery mature.
- Workstream candidate `dark-sector`: keep dark-sector photon-like modes in [dark-sector](../dark-sector/dark-sector.md) as a speculative assembly lane until the packet gains a release-channel boundary condition, event ledger, redshift/re-entry gate, and discriminating observable.
- App-local `ideal-core`: keep the local nested shell swarm prototype queue active in its own file, but do not treat it as global rank 1. It becomes globally ranked only if the app is selected as a validation, authoring, or proof-inspection dependency.

## Organization Status

- First-pass flat cleanup is complete for `standard-model-closure`, `dyadic-lock`, `mass-map`, `master-equation-closure`, `simulations`, `strong-field-closure`, `cosmology-closure`, `quantum-closure`, `proof-programs`, `angular-momentum-spin`, `animator`, `ellipsoid`, `swarm`, and `validation-gates`. The `dark-sector` candidate lane now has a compact watchlist control file and one detailed dark-sector photon-like mode packet.
- The latest deduplication pass compressed weak-sector subgates, quantum stress tests, residual-routing prose, event-ledger prose, strong-field hypotheses, and ellipsoid routing without deleting source material.
- The latest coverage pass added high-upside $\mathbb{A}\mathbb{A}\mathbb{A}$ gap packets without adding extra requirements subdirectories: validation gates, residual-routing event-ledger theorem, exposure-quotient theorem, transfer-operator / basin-measure theorem, radiation Gate C, Decider minimality, weak-sector/gauge closure, nuclear binding, condensed-matter medium transport, algorithmic-resonance / pilot-wave closure, pressure-dependent Noether-Sea constitutive response, dynamic pair-provenance source measure, and terminal-alignment enumeration. The multiplier scoring pass keeps `validation-gates` ranked because cross-sector acceptance can falsify or strengthen several local wins at once. The resistance-cost scoring pass splits cost into execution, intuition, dependency, and validation burdens; this lifts executable simulation work and lowers high-intuition quantum closure work. The 2026-05-20 validated-closure scorecard-pressure pass now factors the May 20 `closure-scorecard` deltas into `Value`; empirical benchmark validation (`-64`), formula/coefficient recovery (`-53`), potential/action closure (`-37`), conservation/invariant closure (`-35`), parameter/scale closure (`-33`), UV/IR deficits (`-28`), master EOM/local dynamics (`-24`), cross-regime bridge (`-23`), internal constituent dynamics (`-13`), and coverage/interface readiness (`-11`) dominate rank pressure, while positive architecture pressure no longer compensates for missing validated mathematics. The rescore keeps the pressure-dependent Noether-Sea constitutive-response packet as a scored shared packet, increases proof-program execution/dependency cost after the cosine-packet rejection, increases mass-map execution cost after the compact finite-coordinate no-go, and keeps nested shell swarm prototype app work unranked globally.
- [closure-join-matrix.md](closure-join-matrix.md) is the product-join view over repeated queue structure: branch state, causal-wake ledger, residual routing, event ledger, exposure, medium response, basin measure, and cross-sector acceptance.
- [inventory.md](inventory.md) is the detailed map for which files are compact control surfaces, which are detailed priority files, and which deployed $\mathbb{A}\mathbb{A}\mathbb{A}$ documents should eventually absorb promoted material.
- Remaining organization work is review-level: decide whether any priority candidate or deferred packet deserves promotion, demotion, or merger after the current theory and app priorities stabilize.

## Top Cross-Workstream Next Actions

1. Drive `master-equation-closure` first: consume the normalized delayed-interior characteristic-tail Noether increments on real branch charts, close the independent A1 force-ratio interval or certify a different non-circular branch, then extend the tractable master-equation stack until Lorentz / GR bridge work, quantum closure, and first-principles mass work have equations rather than only routing language.
2. Use simulation work as the low-intuition path to make proof certificates, convergence checks, regularization choices, and shell numerics executable enough to discipline the theory queues; require branch-chart revision contracts before rerunning failed compact fixtures.
3. Replace the rejected cosine breather route with a fresh fold-adapted collocation candidate: make its null-coordinate pre-ledger pass before branch-chart work, and carry the accepted fold constants only as reusable diagnostics unless the new packet consumes the parent-complement blockers on the same certified domain.
4. Advance the $A_0$ mass-map branch only after the branch-chart revision contract and anti-overfit residual pass for the non-root-key inner-layer harmonic deformation coordinate in $z_\Lambda^\star$; then test corrected one-period residual closure before attempting quotient monodromy / $\Delta_{\mathbf{k}}$, eta-ladder persistence, and finite envelope-Hessian rows.
5. Push the Lorentz / redshift / metric deficit cluster through `swarm`, `master-equation-closure`, and medium-response work until contraction, dilation, clock retuning, PPN recovery, and preferred-frame leakage bounds share one proof surface.
6. Advance the angular-momentum work by populating one retained branch-chart certificate and one native analyzer or apparatus model, then promote only rows whose root, phase, wake, torque, stability, recoil, and event-ledger residuals pass together.
7. Advance the exposure-quotient theorem only where an accepted branch or sector ledger exists to project; it should consume core derivations, not replace them.
8. Advance the residual-routing event-ledger theorem as soon as concrete transitions, residuals, or radiation/reaction channels are ready to account for; keep it downstream of derivation work.
9. Use the pressure-response packet to force one Noether-Sea constitutive record across $\Gamma_N$, $\chi_{\text{sea}}$, $c_{\text{eff}}$, strain, and $\mathcal{M}_{\text{sea}}^{ab}$, but do not promote pressure coefficients until a branch-derived response or empirical replay survives the null-sector bounds.
10. Advance the transfer-operator / basin-measure theorem as the quantum-side measure engine, but keep Born weights, detector kernels, Bell tests, dyadic locks, and pilot-wave / algorithmic-resonance stress tests tied to explicit state spaces and return maps.
11. Use `validation-gates` as the cross-sector pressure test only after a local workstream claims a promotable result; local wins must survive weak, quantum, gravity, hadronic, radiation, and cosmology acceptance gates together.
12. Keep Standard Model, strong-field, quantum, and cosmology closure downstream but sharper: weak/gauge, confinement, nuclear binding, Bell hard tests, black-hole observables, and cosmological transfer functions should inherit explicit branch, exposure, event-ledger, medium-response, and basin-measure objects rather than importing inherited-framework success as a terminal benchmark.
13. Keep app work, including `animator` and `ideal-core`, behind proof/simulation/corpus needs unless the operator/developer explicitly selects the app path or an app surface directly helps inspect a ranked proof object.

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
