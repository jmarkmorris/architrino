# Braid Candidate Requirement Adjudication

Owner: [Braid Program](priorities.md). General requirement inference remains with [Equation Mapping](../mapping-equations/inferring-braid-requirements.md); this document owns the application to candidate records.

Status: CURRENT EVIDENCE-GRADED MATRIX, reconciled 2026-08-27 with the accepted F5 enclosed-root restart and the independently integrated A/B/C prescribed-history evidence. This document applies the consolidated requirements inferred in [Inferring Braid Requirements](../mapping-equations/inferring-braid-requirements.md) to every admitted or exploratory row in the [Braid Candidate Registry](candidate-registry.md) and retains named scoped-negative realizations when their adjudication prevents a rejected row from silently re-entering search. The registry remains authoritative for names, inclusion, concise status, and next action. This matrix owns requirement dispositions and their evidence grades.

## Scope And Non-Score Rule

Exhaustive means that every admitted or exploratory registry row appears here and every consolidated requirement receives a disposition; a named demoted row may remain visible to preserve its exact scoped negative. It does not mean that requirement mining is closed, that every detailed observer-level row has become independently testable, or that an untested candidate has failed. New requirements must be added here when their owning inference is accepted, and new registry candidates must enter this matrix in the same edit that admits them to active consideration.

No scalar candidate score is authorized by this matrix. The universal requirements are noncompensable: favorable symmetry cannot offset an unresolved coordinate coincidence, incomplete causal roots, loss of identity, an unowned nonordinary causal event, or failure to obtain an ordinary retained branch. A member reaching or exceeding $c_f=1$ is not by itself a universal failure. Functional rows classify what a geometry can presently attempt; they do not establish particle identity. A later weighted score may rank the expected information value of experiments only after hard failures and unknowns remain separately visible.

Plainly: this is a coverage and evidence table, not a leaderboard. A candidate with many attractive geometric features but no retained evolution is still unresolved, and a missing test is recorded as unknown rather than silently receiving points.

## Disposition And Evidence Codes

| Code | Meaning | Claim boundary |
| --- | --- | --- |
| `P[D]` | Pass, derived | Exact declared geometry, algebra, or theorem establishes the row within its stated realization. |
| `P[M]` | Pass, measured | A named instrument establishes the row only on its declared bounded record. |
| `P[I]` | Pass as an inferred capability | The geometry supplies a defensible route to attempt the row, but no retained dynamical realization establishes it. |
| `P[G]` | Pass as a guessed capability | A bounded search seed was constructed to attempt the row, but the capability remains more speculative than an inference from an admitted chart. |
| `F[D]` | Fail, derived | An exact obstruction rejects the stated realization or the current chart's ability to express the row. It does not automatically reject a broader parent family. |
| `F[M]` | Fail, measured | A named bounded instrument rejects the stated realization. It does not automatically establish a family-wide negative. |
| `U` | Unknown | The current evidence does not adjudicate the row. Unknown is neither pass nor failure and receives no numerical value. |
| `N/A` | Not applicable | The row does not apply to that registry object. |

Plainly: the bracket names why a judgment is allowed. Derived geometry and bounded measurement are kept distinct, inferred capability is weaker than either, and guessed capability is weaker than inference.

## Consolidated Requirements

### Universal Admissibility Requirements

| ID | Requirement | Pass condition | Failure condition |
| --- | --- | --- | --- |
| `H1` | Closed declared state | Complete member inventory, polarities, pairing and persistent identities, internal coordinates, removed translation or other gauge coordinates, and a reconstructible position-and-velocity map. | Hidden inventory, aliased translation, noninjective internal map, or undeclared polarity/pairing relation. |
| `H2` | Geometric and coincidence admissibility | At least one nondegenerate realization preserves every exact centroid, polarity, dipole, and symmetry condition claimed for it, while every member pair is either certified noncoincident on the claimed history or continued through each declared coordinate coincidence by one finite, provenance-preserving, regulator-independent outgoing history. | Degeneracy, an exact incompatibility among claimed geometric conditions, an undeclared coordinate coincidence, a nonfinite or refinement-path-dependent coincidence limit, or loss of member provenance. |
| `H3` | Causal admissibility | On one declared complete history in normalized $c_f=1$ units, certify the complete required partner- and self-root inventory, including justified exclusions; each ordinary root has positive causal delay and range and a certified nonzero transmitter-factor magnitude $\lvert D_t\rvert$; each admitted zero-range or nonordinary event is owned by a declared regularized event chart consistent with the model binding. No universal member-speed ceiling applies. | An established omission of a required root, an unowned admitted zero-range or nonordinary event, an unclassified fold, or loss of the ordinary-root transversality margin without valid event continuation. Missing certification or an instrument-domain exclusion leaves `H3 U`, not a physical rejection. |
| `H4` | Ordinary EOM compatibility | A nonzero-horizon EOM solver release preserves declared identities and remains inside the `H2` and `H3` guards over its entire stated scope without prescribed continuation. | The tested realization immediately violates its defining relations or exits a geometric or causal guard. A bounded prefix pass does not establish retention. |
| `H5` | Retained branch | Refined multi-prehistory ordinary evolution establishes a root-complete positive-width retained or metastable basin with a declared nondegenerate return action, member permutation, valid event-chart continuations, prehistory collapse, and a positive-width retained-neighborhood certificate. | No qualifying return, zero-width fine tuning, persistent prehistory separation, degenerate scalar recrossing, unresolved event continuation, or branch loss under declared refinement or neighborhood perturbation. |

Plainly: `H1` asks whether the candidate is a well-defined initial-state family. `H2` and `H3` ask whether one complete history is legal. `H4` asks whether ordinary dynamics can follow it for a bounded interval. `H5` is the first requirement that establishes a retained braid rather than a drawing, prescribed path, or short guarded release.

### Velocity Domain And Instrument Scope

The canonical velocity domain is unbounded: finite member speeds below, at, and above $c_f$ are admitted. The [EOM evolution contract](../app-solver/contracts/evolution-contract-v1.md#ordered-pair-and-self-history-rule) explicitly includes all three regimes and states that equality alone is not a singularity. The [field-speed-ceiling compatibility decision](../field-speed-ceiling/field-speed-ceiling-compatibility-decision.md#decision-question) concerns a separately versioned alternative with no canonical adoption. This domain statement does not assert that every admitted history is regular, that every instrument supports it, or that any such history is retained.

For ordinary roots, $D_t=c_f-\hat{\mathbf r}_t\cdot\mathbf V_t(T_t)$ is the transmitter-side factor, and the acceleration weight is $c_f/\lvert D_t\rvert$. A negative $D_t$ is not a failed margin: its magnitude must be certified away from zero. Root existence and completeness, actual zero-range geometry, and fold or other nonordinary events determine the causal assessment; instantaneous speed alone neither establishes nor excludes a self-hit.

Plainly: wakes travel at $c_f$, but the current theory does not impose that speed on architrinos. A faster history must still account for every arriving wake, including any self-hits, and resolve actual singular events.

Strictly sub-field speed remains a valid hypothesis of a restricted certification method. The [delay-map theorem](../../../content/markdown/aaa/dynamics/master-equation.md#delay-map-theorem-pack-formalized) derives monotonicity and at most one root per ordered pair on the bounded transmitter interval where that speed bound holds; existence requires the endpoint conditions as well. Excluding positive-delay self-roots additionally requires the speed bound over each full intervening history. The A/B/C enclosed-root adapter and independent ledger reducer enforce these conditions on their actual uncertainty-inflated histories. Their speed guards, positive-factor bounds, root inventories, and fail-closed behavior remain unchanged.

Every `H3` or `H4` result retains its declared model, history, instrument, and domain. Exiting a method's speed guard invalidates that method's certificate or continuation, not the canonical velocity domain. Unless separate evidence establishes an actual causal obstruction, the candidate remains `U` outside that method. Reusing the sub-field route for `A1`, `A1.3`, or `A3.3` requires a separately frozen slower history and H2 reconfirmation; evaluating the unchanged faster history requires an independently validated root method covering its actual regime and all required partner/self branches. Neither route is executed or accepted by this scope correction.

Plainly: “this method cannot certify the history” is not “the history is forbidden.” Historical speed stops, failures, passes, source hashes, candidate dispositions, and scores keep their original campaign scope; none is retrospectively promoted or erased.

### Functional Geometry Requirements

| ID | Requirement | Current inference burden |
| --- | --- | --- |
| `R1` | Volumetric body frame | The geometry exposes three noncollapsed body-fixed directions or an independently justified equivalent frame; one common axis alone does not pass. |
| `R2` | Independent counterflow/current | Opposed circulation or an equivalent signed internal-current coordinate remains independently variable from the body frame and group translation. |
| `R3` | Persistent identity and non-aliasing | Member and pair identities persist, internal coordinates exclude rigid translation, and required permutations or conjugations are explicit rather than inferred from a drawing. |
| `R4` | Charge-facing exposure separated from motion moment | The record can carry a nonzero charge-facing projection without erasing the independent circulation or motion-moment row; a neutral moment-bearing geometry alone remains unknown. |
| `R5` | Discrete protected return or mode route | The chart supplies a finite, testable route to ordered return, doubled-rotation history, or exactly three isolated modes without assuming particle labels. |
| `R6` | Reusable motif and transition route | One fixed inventory and geometry grammar can attempt related roles, multiplet relatives, or certified transitions without private retuning or detachable undeclared modules. |

Plainly: these rows say which physical questions a surviving geometry is capable of answering. They are not substitutes for the universal gates and cannot turn an unevolved geometry into a fermion.

## Universal Hard-Gate Adjudication

The taxonomy rows inherit `H1` from the exact [configuration chart](configuration-chart.md) and the Family-A, Family-B, and Family-C definitions. Taxonomy-level prescribed paths do not pass `H2` through `H5` unless a separate row below names bounded evidence.

The [source-frozen A/B/C census](evidence/2026-08-26-parallel-abc-h1-h2-census.md) establishes continuous prescribed-history `H2` for nineteen current representatives, not their entire parameter families. The [independently integrated root ladders](evidence/2026-08-27-braid-search-launch-readiness.md#parallel-abc-scope) establish scoped `H3 P[M]` only for the completed named representatives and their declared finite `8/32/128` reception grids. Their actual cubic histories, nonzero interpolation allowances, root completeness, repeated receptions and operational admissions are independently checked. These grades do not assert continuous-reception root coverage, ordinary evolution or new metric availability.

Plainly: each new pass belongs to an exact saved representative and the scope actually checked. It is not a pass for every geometry in the parent family or for an EOM-generated future.

| Candidate | `H1` | `H2` | `H3` | `H4` | `H5` | Controlling evidence or scoped negative |
| --- | --- | --- | --- | --- | --- | --- |
| `A1` | `P[D]` | `P[D]` | `U` | `U` | `U` | Frozen representative passes continuous H2; its at/above-field-speed cadence blocks this sub-field H3 route. |
| `A1.1` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Frozen common-frequency representative passes continuous H2 and the independently accepted prescribed root ladder. |
| `A1.2` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Frozen equal-scale cyclic representative passes continuous H2 and the independently accepted prescribed root ladder. |
| `A1.3` | `P[D]` | `P[D]` | `U` | `U` | `U` | Frozen $4{:}2{:}1$ representative passes continuous H2; its at/above-field-speed cadence blocks this sub-field H3 route. BP-007 remains a separate calibration route. |
| `A1.4` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Frozen $3{:}2{:}1$ representative passes continuous H2 and the independently accepted prescribed root ladder; preserve its narrow certified speed margin. |
| `A2` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Frozen cyclic representative passes continuous H2 and the independently accepted prescribed root ladder; no ordinary release follows. |
| `A3` | `P[D]` | `P[M]` | `P[M]` | `P[M]` | `U` | One pair-conjugate five-coordinate slice completed the [guarded release](three-binary-five-coordinate-bounded-eom-comparison.md) through $T=0.15$ with certified noncoincidence, complete roots, and speed margin; the pass does not cover full A3. |
| `A3.1` | `P[D]` | `P[D/M]` | `P[M]` | `U` | `U` | Frozen representative passes sampled-plus-continuous-enclosure H2 and the independently accepted prescribed root ladder. |
| `A3.2` | `P[D]` | `P[D/M]` | `P[M]` | `U` | `U` | Frozen representative passes sampled-plus-continuous-enclosure H2 and the independently accepted prescribed root ladder; preserve its tight clearance. |
| `A3.3` | `P[D]` | `P[D]` | `U` | `U` | `U` | Frozen $4{:}2{:}1$ representative passes continuous H2; its at/above-field-speed cadence blocks this sub-field H3 route. |
| `A3.4` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Frozen $3{:}2{:}1$ representative passes continuous H2 and the independently accepted prescribed root ladder. |
| `B1` | `P[D]` | `U` | `U` | `U` | `U` | Exact common-axis parent chart; no frozen executable covering row. |
| `B1.1` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Current-identity continuous H2 and the prescribed root ladder pass; BP-009's center-pilot decision remains separate. |
| `B1.2` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Frozen high-axial representative passes continuous H2 and the independently accepted prescribed root ladder. |
| `B1.3` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Frozen all-equatorial representative passes continuous H2 and the independently accepted prescribed root ladder. |
| `C1` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Current-identity continuous H2 and the independently accepted prescribed root ladder are closed; no ordinary release follows. |
| `C2` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Current-identity continuous H2 and the independently accepted prescribed root ladder are closed; no ordinary release follows. |
| `C3` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Current-identity continuous H2 and the independently accepted prescribed root ladder are closed; no ordinary release follows. |
| `C4` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Current-identity continuous H2 and the independently accepted prescribed root ladder are closed, with the stated history-depth margin preserved; no ordinary release follows. |
| `C5` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Current-identity continuous H2 and the independently accepted prescribed root ladder are closed; no ordinary release follows. No direct H2 dependency on BP-007 remains. |
| `C6` | `P[D]` | `P[D]` | `P[M]` | `U` | `U` | Current-identity continuous H2 and the independently accepted prescribed root ladder are closed; no ordinary release follows. |
| `SD3` | `P[D]` | `P[M]` | `P[M]` | `P[M]` | `U` | The metric-matched five-coordinate row completed the [guarded $T=0.15$ release](three-binary-five-coordinate-bounded-eom-comparison.md) and preserved its cyclic slice, but did not return. |
| `F1` | `U` | `U` | `U` | `U` | `U` | Bounded seed description only; an executable chart remains undeclared. |
| `F2` | `U` | `U` | `U` | `U` | `U` | Bounded dual-triad seed description only; association and executable coordinates remain open. |
| `F3` | `U` | `U` | `U` | `U` | `U` | Bounded near-A2/A3 mode-search description only; no predeclared census. |
| `F4` | `U` | `U` | `U` | `U` | `U` | Bounded framed-plus-counterflow composition only; integrated association remains open. |
| `F5` revised phase-varying campaign realization | `P[D/M]` | `P[D/M]` | `P[M]` | `U` | `U` | The [executable and guard certificate](evidence/2026-08-26-f5-phase-varying-executable-guard-certificate.md) preserves the approved twelve-member history and continuous guards. The independently accepted [enclosed-root restart](evidence/2026-08-27-f5-enclosed-root-closure.md) adds scoped prescribed H3 on its finite `8/32/128` reception ladder, with actual-history enclosure and all 24,192 pair certificates. |
| `F5` common-cadence circular realization | `P[D]` | `F[D]` | `U` | `U` | `U` | The declared ordinary two-ring circular realization has an [exact incompatibility](../mapping-equations/inferring-braid-requirements.md#joint-projection-audit-and-a-two-ring-no-go) among everywhere-noncoincident member geometry, stationary centroid, and instantaneous dipole null; the revised row is materially different and does not erase this scoped negative. |
| `F6` | `P[D]` | `U` | `U` | `U` | `U` | Exact tetrahedral parent geometry; F6b and F6c own its concrete continuations. |
| `F6b` (demoted realization) | `P[D]` | `P[D]` | `P[D]` | `F[M]` | `U` | Exact continuous noncoincidence and complete simple roots pass on the prescribed circular history, but its [measured member-acceleration residual](../mapping-equations/inferring-braid-requirements.md#f6b-root-ledger-and-member-acceleration-screen) rejects that isolated history as an EOM realization. |
| `F6c` | `P[D]` | `P[M]` | `P[M]` | `P[M]` | `U` | Bounded releases in the [F6c geometry program](f6c-geometry.md) preserve the exact symmetry surface and achieve partial turns, but no root-valid nondegenerate complete return exists. |
| Three-binary plus six accessories | `P[D]` | `U` | `U` | `U` | `U` | Separate six-accessory inventory and placement strata are declared; the base retained branch and full twelve-member history do not exist. |
| F6c plus six accessories | `P[D]` | `U` | `U` | `U` | `U` | Separate $2+4$ accessory-site inventory and placement strata are declared; retained F6c and full fourteen-member evolution do not exist. |

Plainly: the revised F5 row and the named completed A/B/C representatives pass their declared prescribed-root checks, not ordinary evolution. Only one A3 slice, one SD3 row, and F6c have bounded ordinary-release passes, and none has passed `H5`. The F5 circular and F6b failures remain scoped to their exact realizations.

## Functional Geometry Adjudication

These entries judge the coordinates exposed by the current chart, not whether ordinary evolution preserves them. `P[I]` marks an inferred route to a future test, while `P[G]` marks a more speculative search-seed route.

| Candidate | `R1` | `R2` | `R3` | `R4` | `R5` | `R6` |
| --- | --- | --- | --- | --- | --- | --- |
| `A1` | `P[D]` | `P[D]` | `P[D]` | `U` | `U` | `U` |
| `A1.1` | `P[D]` | `P[D]` | `P[D]` | `U` | `U` | `U` |
| `A1.2` | `P[D]` | `P[D]` | `P[D]` | `U` | `P[I]` | `U` |
| `A1.3` | `P[D]` | `P[D]` | `P[D]` | `U` | `U` | `U` |
| `A1.4` | `P[D]` | `P[D]` | `P[D]` | `U` | `U` | `U` |
| `A2` | `P[D]` | `F[D]` | `P[D]` | `U` | `P[I]` | `U` |
| `A3` | `P[D]` | `P[D]` | `P[D]` | `U` | `P[I]` | `U` |
| `A3.1` | `P[D]` | `P[D]` | `P[D]` | `U` | `U` | `U` |
| `A3.2` | `P[D]` | `P[D]` | `P[D]` | `U` | `P[I]` | `U` |
| `A3.3` | `P[D]` | `P[D]` | `P[D]` | `U` | `U` | `U` |
| `A3.4` | `P[D]` | `P[D]` | `P[D]` | `U` | `U` | `U` |
| `B1` | `F[D]` | `F[D]` | `P[D]` | `U` | `U` | `U` |
| `B1.1` | `F[D]` | `F[D]` | `P[D]` | `U` | `U` | `U` |
| `B1.2` | `F[D]` | `F[D]` | `P[D]` | `U` | `U` | `U` |
| `B1.3` | `F[D]` | `F[D]` | `P[D]` | `U` | `U` | `U` |
| `C1` | `F[D]` | `F[D]` | `P[D]` | `U` | `U` | `U` |
| `C2` | `F[D]` | `P[D]` | `P[D]` | `U` | `U` | `U` |
| `C3` | `F[D]` | `F[D]` | `P[D]` | `U` | `U` | `P[I]` |
| `C4` | `F[D]` | `P[D]` | `P[D]` | `U` | `U` | `P[I]` |
| `C5` | `F[D]` | `F[D]` | `P[D]` | `U` | `U` | `P[I]` |
| `C6` | `F[D]` | `P[D]` | `P[D]` | `U` | `U` | `P[I]` |
| `SD3` | `P[D]` | `U` | `P[D]` | `U` | `P[I]` | `U` |
| `F1` | `P[G]` | `P[G]` | `P[G]` | `U` | `U` | `U` |
| `F2` | `P[G]` | `P[G]` | `P[G]` | `U` | `U` | `P[G]` |
| `F3` | `P[G]` | `U` | `P[G]` | `U` | `P[G]` | `U` |
| `F4` | `P[G]` | `P[G]` | `P[G]` | `P[G]` | `U` | `P[G]` |
| `F5` | `P[D]` | `P[D]` | `P[I]` | `U` | `P[I]` | `U` |
| `F6` | `P[D]` | `P[D]` | `P[I]` | `U` | `P[I]` | `U` |
| `F6b` (demoted realization) | `P[D]` | `P[D]` | `P[D]` | `U` | `U` | `U` |
| `F6c` | `P[D]` | `P[D]` | `P[D]` | `P[I]` | `P[I]` | `U` |

The A1 and A3 rows pass `R2` only because their ordered binary circulation data can express opposed signs independently of frame and translation; no current evidence shows that a useful counterflow survives ordinary evolution or produces the required exposed moment. A2 fails the same row because its exact cyclic equivalence imposes one common circulation sense; F1 is the proposed A2-like extension that restores independent signs. The Family-B failures follow from its one common axis and one common circulation. C2, C4, and C6 pass only the declared opposed-circulation geometry row; association and retention remain unknown. F1--F4 remain guessed bounded seeds, so their positive functional cells are `P[G]`. F5, F6, F6b, and F6c use `P[D]` only where their later exact constructions establish the geometric row. The seed capabilities are compared in [Seed Comparison Without A Score](../mapping-equations/inferring-braid-requirements.md#seed-comparison-without-a-score); none is measured physical behavior.

Plainly: A1 and A3 can write down opposed binary circulation, while A2 preserves its stronger cyclic equivalence by using one common sense. The counter-rotating Family-C rows provide explicit opposed circulation but collapse the frame to one axis. The F-series seeds were introduced to combine symmetry, frame, counterflow, and history more tightly, and their inferred passes remain hypotheses until the hard gates are met.

## Accessory-Bearing Adjudication

The accessory rows inherit the unresolved `H5` status of their underlying braid. They also carry six accessory-specific requirements from [Accessory Placement Relative To The Braid](../mapping-equations/inferring-braid-requirements.md#accessory-placement-relative-to-the-braid).

| ID | Accessory-specific requirement |
| --- | --- |
| `ACC1` | The braid passes `H5` without accessories. |
| `ACC2` | Interior, boundary, just-exterior, and remote-exterior site families and polarity decorations have complete histories, with every braid-accessory and accessory-accessory pair either certified noncoincident or assigned a declared coordinate-coincidence continuation. |
| `ACC3` | A one-way six-accessory loading diagnostic resolves rigid, branch-tangent, and transverse braid response while preserving causal guards. |
| `ACC4` | The six accessories form a positive-width associated basin when mutual accessory contributions are included against the same braid history. |
| `ACC5` | Full braid-plus-six ordinary evolution passes causal, coordinate-coincidence continuation, identity, ledger, and retained-basin requirements with backreaction. |
| `ACC6` | A declared accessory-transfer history preserves provenance and returns the braid to its original or a separately classified retained branch. |

| Candidate | `ACC1` | `ACC2` | `ACC3` | `ACC4` | `ACC5` | `ACC6` | Current boundary |
| --- | --- | --- | --- | --- | --- | --- | --- |
| Three-binary plus six accessories | `U` | `P[D]` | `U` | `U` | `U` | `U` | Six polar site families and the placement continuation are defined, but no retained three-binary base history exists. |
| F6c plus six accessories | `U` | `P[D]` | `U` | `U` | `U` | `U` | The axial-pair plus transverse-quartet site family and radial placement continuation are defined, but no retained F6c history exists. |

Plainly: both accessory programs have search coordinates, not associated assemblies. Every dynamical accessory judgment remains blocked by the missing retained braid, and exterior placement receives no pass merely for being farther away.

## Candidate-Level Outcome

No admitted or exploratory candidate currently passes `H5`, so this matrix selects no physical braid. The separately governed allocation percentages in the [candidate registry](candidate-registry.md) do not alter that conclusion. The immediately discriminating rows are:

1. preserve the accepted A/B/C H2 records and all sixteen independently integrated H3 ladders, and separately predeclare ordinary evolution; A1, A1.3 and A3.3 need either a validated root method for their unchanged histories or separately frozen slower histories with H2 reconfirmation to reuse the sub-field H3 route, B1 still needs a frozen executable row, and F1--F4 must close `H1` first;
2. for A3 and SD3, extend beyond the one bounded slice only through a separately predeclared coverage campaign, while keeping the existing no-return result scoped to that row;
3. preserve the revised F5 row's accepted prescribed `H3`, independently checked past-only history, actual EOM data handoff and symbolic-strength release response; separately declare ordinary evolution with explicit interaction strength and numerical controls, retaining the common-cadence circular no-go as a separate scoped negative;
4. for the demoted F6b realization, require a materially different direction-bearing path or inventory row and a new admission audit rather than rescaling one common magnitude;
5. for F6c, preserve the baseline resource return and [independently accepted full reconstructed-family root cover](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-actual-full-f6c-conditional-cover), preserve the [independently accepted actual one-cell acceleration range](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-actual-one-cell-acceleration-range), whose broad intervals establish neither balance nor imbalance; preserve the [independently accepted actual emission refinement](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-actual-one-cell-emission-refinement), preserve the separately [accepted actual refined-input acceleration comparison](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-actual-one-cell-refined-acceleration), whose much tighter residual bounds still include zero; preserve the separately [accepted pure integral/supremum reference](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-pure-integral-and-supremum-reference); preserve the [shared quadrature protocol](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-shared-quadrature-protocol) and [correlated residual envelope](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-correlated-residual-envelope); preserve the [independently accepted actual first-leaf integral diagnostic](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-actual-first-leaf-integral-diagnostic), which closes source-bound input and watched-execution checks, with a 6.03864% local integral-width reduction and no peak or claim promotion; the [independently accepted actual reception-cell geometry restriction](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-actual-reception-cell-geometry-restriction) preserves all 336 whole-cell bounds and narrows all 1,008 neighborhood bounds within their parents; the [independently accepted actual restricted first-leaf comparison](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-actual-restricted-first-leaf-integral-comparison) closes the explicit adapter and execution connection, but its local integral bound is 3.18148% wider than the prior accepted bound and its peak is unchanged; preserve both results; the [independently accepted first-parent bisection](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-actual-first-parent-bisection) narrows local integral uncertainty by 32.98842% versus the better prior result and lowers the peak upper bound by 26.84505%, using two of twenty shared frame cuts; the [independently accepted first four genuine requests](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-actual-first-four-genuine-requests) now close the controller connection, with 156 initial requests still pending; the remaining three requests in that saved run had broad uncertainty, not measured large residuals; the parent-specific instruments and source-bound wrappers are accepted and frozen; the [actual original-parent-one refinement](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-actual-parent-one-emission-refinement) completes in 261.94229158400003 seconds and passes independent post-run audit, narrowing all 56 emission intervals without evaluating acceleration; the [explicit streamed leaf composition](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-streamed-leaf-composition) also passes independent review; the [actual two-refined-parent streamed calculation](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-two-refined-parent-streamed-calculation) passes independent mathematical and operational review in 57.891806040999995 seconds, with 158 initial requests pending in that fresh run; the [generic original-parent selection and source attribution](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-generic-original-parent-selection) now pass independent review with consumed generations preserved; the [actual original-parent-two emission refinement](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-actual-original-parent-2-emission-refinement) and [generic streamed caller repair](evidence/2026-08-27-braid-search-launch-readiness.md#independently-accepted-generic-streamed-caller-and-final-layout-repair) are independently accepted; paused at operator request with no jobs running; on resumption, independently admit the three-parent streamed calculation, then address evidence packaging and measure full-history capacity and precision without changing geometry or inferring parallel cost; whole-history coverage and three-rung measurement remain outstanding under the [member-acceleration predeclaration](evidence/2026-08-26-f6c-normalized-member-acceleration-predeclaration.md), preserving separate historical-score attribution; do not refine the completed radial-frequency coordinate without a new coordinated-turn signal; and
6. for accessory-bearing continuations, do not advance beyond site definition until the underlying braid passes `H5`.

Plainly: the matrix does not say which candidate is best. It says exactly what each candidate has established, what it has failed in a bounded scope, and which missing hard requirement prevents a physical verdict.

### 2026-08-26 Campaign Effect

The completed [all-candidate evaluation campaign](evidence/2026-08-26-all-candidate-evaluation-campaign-closeout.md) changed no `H1`--`H5`, `R1`--`R6`, or accessory cell. The following historical disposition audit is preserved; the later evidence described below supersedes its missing-H2 and missing-H3 blockers where explicitly stated.

| Candidates | Campaign disposition | Controlling requirement boundary |
| --- | --- | --- |
| `A1`, `A1.1`--`A1.4`, `A2`, `A3.1`--`A3.4` | `STASIS` | nearest candidate-specific `H2` record is absent; prescribed and historical diagnostics do not substitute |
| `A3` measured slice, `SD3` | `STASIS` | bounded `H2`--`H4 P[M]` remains slice-scoped; `H5 U`; no new eligible `M05`--`M08` record |
| `B1`, `B1.1`--`B1.3`, `C1`--`C6` | `STASIS` | `H2 U`; exact `R1/R2` capability failures or passes do not adjudicate the universal hard gate; former-identity records remain ineligible |
| `F1`--`F4` | `STASIS` | `H1 U`; executable charts remain incomplete |
| `F5` common-cadence circular realization | `DEMOTED` | existing exact `H2 F[D]` common-cadence obstruction remains controlling for that realization only |
| `F6` | `STASIS` | parent-only `H1 P[D]`; no separate continuation and no inherited F6c evidence |
| `F6b` circular realization | `DEMOTED` | existing measured `H4 F[M]` member-acceleration failure remains controlling |
| `F6c` | `STASIS` | bounded `H2`--`H4 P[M]`; `H5 U`; no eligible return and no justified radial-frequency refinement |
| Three-binary plus six accessories, F6c plus six accessories | `STASIS` | `ACC1 U` until the named base braid passes `H5` |

That campaign marked no candidate `ADVANCED`, and no candidate passed `H5`. It accepted a common centered-RMS ruler and wake-crossing clock for future predeclared measurements but rejected retrospective score backfill. It also derived that a nonbinary `M09` traversal fraction needs an additional continuous lift coordinate; turns, crossings, elapsed time, and shape matches remain ineligible.

Plainly: that historical campaign found blockers and scoped failures rather than new gate-closing evidence. Its disposition table is not the current evidence overlay and does not erase the later accepted results.

### Complete-Registry Follow-On Effect

The later [complete-registry closure campaign](campaigns/2026-08-complete-braid-registry-closure.md) advanced the revised F5 phase-varying realization from incomplete representation to `H1 P[D/M]` and `H2 P[D/M]`. The operator approved that exact scientific row for prescribed display. The separately accepted [enclosed-root restart](evidence/2026-08-27-f5-enclosed-root-closure.md) now establishes scoped prescribed `H3 P[M]`: 24,192 ordered-pair certificates on the declared `8/32/128` reception ladder, with independently checked actual-history interpolation allowances, complete ordinary-root and self-exclusion census, repeated phases, source/build bindings and operational admission. Its [past-only preparation and actual EOM data handoff](evidence/2026-08-27-braid-search-launch-readiness.md#strength-independent-f5-evolution-prerequisite) and [actual release-time response](evidence/2026-08-27-braid-search-launch-readiness.md#accepted-actual-f5-release-time-response) are also independently accepted. The latter measures all 132 ordinary contributions and twelve bounded vectors at release, with effective strength symbolic and no new root search; it establishes no `H4` or `H5` result. Interaction strength, a validated evolution request, numerical controls and ordinary release remain separate. No `M01`--`M14` availability or percentage changes, and the common-cadence circular realization remains `H2 F[D]`.

Plainly: the approved F5 geometry has passed its declared root audit. This does not show that the EOM solver generates its prescribed future or retains it. The old failed realization remains failed only within its own assumptions.

### Parallel A/B/C Follow-On Effect

The [nineteen-representative H1/H2 census](evidence/2026-08-26-parallel-abc-h1-h2-census.md) closes the historical missing-H2 and stale-current-identity blockers on its frozen sources. `A3.1` and `A3.2` use `H2 P[D/M]`; the other seventeen use `H2 P[D]`. `A1`, `A1.3` and `A3.3` remain outside the strict sub-field admission for this root route. The subsequent [four-worker root campaign and independent integration](evidence/2026-08-27-braid-search-launch-readiness.md#parallel-abc-scope) close scoped prescribed `H3 P[M]` for `A1.1`, `A1.2`, `A1.4`, `A2`, `A3.1`, `A3.2`, `A3.4`, `B1.1`, `B1.2`, `B1.3`, `C1`, `C2`, `C3`, `C4`, `C5` and `C6`, totaling 205,632 pair certificates. All sixteen complete ladders and the final dispatcher are independently integrated. BP-009 still owns the separate B1.1 center-pilot decision; C5 has no direct H2 dependency on BP-007. None of these updates changes a functional or accessory cell, score, H4 or H5.

Plainly: the geometry-admission work and all sixteen complete prescribed-root ladders are finished. Later ordinary-evolution work must not be blocked by the superseded historical status table.

Changed source or build bindings, incomplete history or pair coverage, failed independent enclosure checks, inconsistent repeated receptions, or failed timed publication would overturn the corresponding acceptance. The three at/above-field-speed rows require a newly frozen slower cadence and H2 reconfirmation only to reuse this sub-field method. Their unchanged histories remain eligible for assessment by a method independently validated for their actual causal-root regime; no such new certificate is supplied here, and their existing specifications remain frozen.

Plainly: a pass remains tied to its original evidence. These updates neither tune a candidate nor convert an unfinished calculation into a failure.

## Weighted Score Boundary

The registry's two percentages are experiment-allocation summaries rather than physical scores. Their [current score packet](candidate-weighted-score-packet.md) preserves every `U`, overlays the noncompensable `H1`--`H5` dispositions, publishes the factual inputs and normalization, and tests sensitivity to alternative weights. Expected discriminatory value, measured campaign cost, and instrument reuse may choose the next test after the hard gates and evidence scores are read; they do not add braid-evidence points.

Plainly: the scores help decide which missing measurement may be worth buying. They do not change a hard-gate failure or turn a candidate into a physical braid.

## Maintenance Rule

Update this matrix whenever the candidate registry changes, an inferred requirement is accepted or retired, or new evidence changes a cell. Every changed cell must name its derived argument or bounded instrument in the accompanying prose or controlling evidence column. A bounded failure stays attached to its exact realization unless a separately certified covering argument promotes it to a family-wide negative.

Closure goal: maintain complete candidate-by-requirement coverage while keeping prescribed geometry, bounded diagnostics, ordinary evolution, retained-branch evidence, and optional search-priority weighting as separate claim layers.
