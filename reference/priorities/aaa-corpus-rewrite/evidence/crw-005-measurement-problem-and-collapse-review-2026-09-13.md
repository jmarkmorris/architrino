# CRW-005 Measurement Problem and Collapse Review — 2026-09-13

Scope: full 84-line baseline review and bounded repair of [Measurement Problem and Collapse](../../../../content/markdown/aaa/philosophy-history/theory-bridges/measurement-problem-and-collapse.md). Only that chapter and this receipt are owned; shared integration records remain with the coordinator.

The chapter was clean by scoped `git --no-optional-locks status --short -- <chapter>` before editing. SHA-256 by `shasum -a 256`: baseline `5b99a13295763ceb92349cd4a3f1b25f5ad4081e06c2651ebc962e1214024f47`; final chapter `f654cc1552fc867bb97a8b1dd63bc722bfa141a3e71bfb734f263a307e85a711`. Prior-editor attribution was not investigated.

## Findings

All ten findings were accepted and repaired: six high and four medium.

| ID | Severity | Finding and disposition |
| --- | --- | --- |
| MC-01 | Medium | Standard measurement was universally called projection to an eigenstate, and the interpretation survey caricatured Everett, collapse models, Copenhagen, and QBism. Scoped selective projective measurements to eigenspaces and described distinct interpretations without treating conditional normalization as a new physical law. |
| MC-02 | High | A separatrix crossing was asserted as an achieved universal mechanism. Propagated the live Measurement Ontology definition of a driven or reduced threshold and stated why an invariant autonomous basin boundary cannot be crossed. |
| MC-03 | High | Every target was assumed metastable and measurement was identified with a high-intensity perturbation, a new stable attractor, and a chaotic bifurcation. The detector may hold the metastability; amplification, finite-resolution persistence, and probability require separate constructions. |
| MC-04 | High | Born probabilities were identified with fractional target phase-space basin volumes. Replaced them with a normalized preparation measure on complete coupled-state record events, including failed records or matched conditioning. |
| MC-05 | High | A conservative event ledger was treated as a primitive result. Required derivation of effective balance laws, distinguished internal from external transfers, and prevented double counting of internal recoil and medium excitation. |
| MC-06 | Medium | A universal action transfer of order Planck's constant, dissipation, and a new limit cycle were made necessary for measurement; Noether sea stiffness and decoherence were called the complete threshold determinants. Scoped these to the proposed dissipative realization and included apparatus/preparation/readout dependence. |
| MC-07 | Medium | Dissipation was asserted to prevent revival, and same-law ontology was treated as solving the effective cut. Distinguished persistence windows, suppression of accessible interference, and actual single-record selection. |
| MC-08 | High | Apparatus record time was directly compared with spontaneous gravitational-collapse lifetime. Separated trigger, record completion, and coherence loss and required matched preparation, event, clock, density profiles, and uncertainties. |
| MC-09 | Medium | The combined heating/statistics residual lacked local definitions and normalization boundaries and was presented as broad viability. Defined its numerators and positive scales and limited a pass to the specified diagnostic. |
| MC-10 | High | An unsupported attosecond-to-zeptosecond forecast and an impossible demand to prove exactly zero duration were used for falsification. Replaced them with a derived positive lower bound versus an experimental upper bound for the same calibrated event. |

## Independent analytical checks

Claim grade: derived. These checks are independent elementary constructions; they do not use the edited chapter as an oracle. A counterexample satisfying their premises or an algebraic error would overturn the stated result.

1. **Invariant basin and threshold distinction.** For the autonomous scalar equation with derivative equal to the coordinate, the solution is its initial value times the exponential of elapsed time. Its sign never changes. More generally, time-shifting a trajectory that tends to an attractor leaves its limiting attractor unchanged, so a forward basin is invariant along its admitted flow. Driving or a reduced moving boundary changes the object and can permit a threshold crossing.
2. **Finite record versus exact settling.** A stable scalar relaxation with derivative minus the coordinate approaches zero exponentially and never reaches zero at finite time from a nonzero initial condition. It reaches any fixed positive readout tolerance in finite time. Exact attractor arrival is therefore not necessary for a finite-resolution record.
3. **Probability is not coordinate volume.** A uniform preparation on the unit interval gives probability one half to its lower half. Under the coordinate transformation equal to the square of the original coordinate, that event occupies coordinate length one quarter but still has probability one half. The transformed measure, rather than raw volume, preserves the event probability. Unknown initial data do not select a distribution on their own.
4. **Lower duration bound.** An oriented response coordinate begins at minus a positive margin and increases at a rate no greater than a positive constant. Integrating that inequality to the first zero gives margin no greater than rate bound times elapsed duration. Thus elapsed duration is at least margin divided by rate bound. Preparations approaching zero margin destroy any uniform positive lower bound unless the preparation class excludes them.
5. **Readout discontinuity.** A continuous scalar response passing through zero can be mapped to a binary sign label that jumps at zero. A discontinuous reported value does not establish discontinuous underlying dynamics.
6. **Conditional normalization.** Conditioning a mixture on a selected event rescales each component by its event probability before renormalization. This map is generally nonlinear despite using ordinary probability. The nonlinear form of a selective update alone does not prove physically nonlinear evolution.
7. **Observable comparison.** An apparatus delay can be changed by changing downstream amplification or readout while keeping the target coherence-loss process fixed. A trigger-time-to-collapse-lifetime ratio therefore has physical discriminatory content only after those event definitions are related within the model.

No numerical wake-speed example, Python run, EOM simulation, or empirical timing estimate was introduced.

## Authorities and sources

Read the entire baseline and final chapter. Live [Measurement Ontology](../../../../content/markdown/aaa/quantum/measurement-ontology.md) passages inspected include its opening conditional mechanism and separatrix definition, measurement-and-heating residual, massive-superposition comparison, and finite-time falsification bound. These are propagation authorities; the elementary checks above supply independent reasoning. Concurrent Superposition Mechanism and Angular Momentum and Spin edits were not used as settled independent evidence.

Opened Zurek, [arXiv:quant-ph/0105127](https://arxiv.org/abs/quant-ph/0105127), abstract and publication metadata, confirming environmental suppression of interference and stable pointer states. Opened Tilloy and Stace, [arXiv:1901.05477v3](https://arxiv.org/abs/1901.05477v3), abstract and revision/publication metadata, confirming model-parameter-dependent neutron-star heating bounds. Neither source establishes the proposed substrate threshold mechanism. No new numerical experimental bound is claimed.

## Verification

The scratch checker `.tmp/crw-005-measurement-collapse/check.cjs` ran its known one-inline/one-display/fenced-exclusion sample and strict KaTeX simple-variable check before the chapter. It passed 28 strict KaTeX expressions: 2 displays and 26 inline expressions. Both displays and their original viewer identifiers are byte-preserved relative to the clean baseline. Its two-target synthetic link example passed before the chapter; all nine final links were extracted, all seven local paths exist by filesystem resolution, and every original target remains. This does not validate every neighboring fragment or all remote contents.

`git diff --check HEAD -- content/markdown/aaa/philosophy-history/theory-bridges/measurement-problem-and-collapse.md` passed. `node scripts/validate-content.mjs --check --strict` passed on the final chapter with 1759 repository Markdown files, 199 corpus files, 391 scenes, zero errors, zero warnings, and 30 notes before this receipt was included. The coordinator owns joined validation and shared-record integration. No generated or Git write was performed; authored-source fingerprints are left for the authorized regeneration procedure if affected.

## Open obligations

- **MC-O1 — Physical record construction.** Derive a concrete admitted apparatus-target flow, threshold, trigger, readable variable, and persistence window. This conditional mechanism is not a theorem covering every measurement apparatus.
- **MC-O2 — Statistics and balance.** Supply an independently justified preparation measure, outcome map, effective conservation account, and shared-channel statistical comparison. A small residual does not derive the Born rule or prove all relevant transfers were measured.
- **MC-O3 — Observable timing comparison.** Derive a preparation-specific timing bound and clock/instrument response, and compare it with the same observable in experiments and competing collapse models. No absolute-time zero-duration experiment or generic ultrafast timescale is claimed.
