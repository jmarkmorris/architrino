# Braid Candidate Requirement Adjudication

Status: CURRENT EVIDENCE-GRADED MATRIX, established 2026-08-25, campaign-reconciled 2026-08-26, and updated for the later F5 phase-varying campaign certificate. This document applies the consolidated requirements inferred in [Inferring Braid Requirements](inferring-braid-requirements.md) to every admitted or exploratory row in the [Braid Candidate Registry](../braid-program/candidate-registry.md) and retains named scoped-negative realizations when their adjudication prevents a rejected row from silently re-entering search. The registry remains authoritative for names, inclusion, concise status, and next action. This matrix owns requirement dispositions and their evidence grades.

## Scope And Non-Score Rule

Exhaustive means that every admitted or exploratory registry row appears here and every consolidated requirement receives a disposition; a named demoted row may remain visible to preserve its exact scoped negative. It does not mean that requirement mining is closed, that every detailed observer-level row has become independently testable, or that an untested candidate has failed. New requirements must be added here when their owning inference is accepted, and new registry candidates must enter this matrix in the same edit that admits them to active consideration.

No scalar candidate score is authorized by this matrix. The universal requirements are noncompensable: favorable symmetry cannot offset an unresolved coordinate coincidence, incomplete causal roots, loss of identity, a $c_f=1$ boundary crossing, or failure to obtain an ordinary retained branch. Functional rows classify what a geometry can presently attempt; they do not establish particle identity. A later weighted score may rank the expected information value of experiments only after hard failures and unknowns remain separately visible.

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
| `H3` | Causal admissibility | On one declared complete history in normalized $c_f=1$ units, every required causal root is certified complete; each ordinary root has positive causal range and transmitter-factor margin; each zero-range or nonordinary event is owned by a declared regularized event chart; and every member remains below field speed. | Missing or unresolved required roots, an unowned zero-range or nonordinary event, an unclassified fold, or loss of the speed margin. |
| `H4` | Ordinary EOM compatibility | A nonzero-horizon EOM solver release preserves declared identities and remains inside the `H2` and `H3` guards over its entire stated scope without prescribed continuation. | The tested realization immediately violates its defining relations or exits a geometric or causal guard. A bounded prefix pass does not establish retention. |
| `H5` | Retained branch | Refined multi-prehistory ordinary evolution establishes a root-complete positive-width retained or metastable basin with a declared nondegenerate return action, member permutation, valid event-chart continuations, prehistory collapse, and a positive-width retained-neighborhood certificate. | No qualifying return, zero-width fine tuning, persistent prehistory separation, degenerate scalar recrossing, unresolved event continuation, or branch loss under declared refinement or neighborhood perturbation. |

Plainly: `H1` asks whether the candidate is a well-defined initial-state family. `H2` and `H3` ask whether one complete history is legal. `H4` asks whether ordinary dynamics can follow it for a bounded interval. `H5` is the first requirement that establishes a retained braid rather than a drawing, prescribed path, or short guarded release.

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

The taxonomy rows inherit `H1` from the exact [configuration chart](../braid-program/configuration-chart.md) and the Family-A, Family-B, and Family-C definitions. Taxonomy-level prescribed paths do not pass `H2` through `H5` unless a separate row below names bounded evidence.

| Candidate | `H1` | `H2` | `H3` | `H4` | `H5` | Controlling evidence or scoped negative |
| --- | --- | --- | --- | --- | --- | --- |
| `A1` | `P[D]` | `U` | `U` | `U` | `U` | Exact Family-A chart; no candidate-specific ordinary release. |
| `A1.1` | `P[D]` | `U` | `U` | `U` | `U` | Exact A1 common-frequency locus; prescribed geometry only. |
| `A1.2` | `P[D]` | `U` | `U` | `U` | `U` | Exact equal-scale cyclic phase locus; prescribed geometry only. |
| `A1.3` | `P[D]` | `U` | `U` | `U` | `U` | Exact $4{:}2{:}1$ cadence locus; the V1 calibration route does not adjudicate retention. |
| `A1.4` | `P[D]` | `U` | `U` | `U` | `U` | Exact $3{:}2{:}1$ cadence locus; prescribed geometry only. |
| `A2` | `P[D]` | `U` | `U` | `U` | `U` | Exact cyclic three-binary chart and bounded analytical diagnostics; no ordinary retained release. |
| `A3` | `P[D]` | `P[M]` | `P[M]` | `P[M]` | `U` | One pair-conjugate five-coordinate slice completed the [guarded release](three-binary-five-coordinate-bounded-eom-comparison.md) through $T=0.15$ with certified noncoincidence, complete roots, and speed margin; the pass does not cover full A3. |
| `A3.1` | `P[D]` | `U` | `U` | `U` | `U` | Exact A3 common-frequency locus; no candidate-specific release. |
| `A3.2` | `P[D]` | `U` | `U` | `U` | `U` | Exact equal-radius/common-frequency locus; historical diagnostics do not establish present retention. |
| `A3.3` | `P[D]` | `U` | `U` | `U` | `U` | Exact $4{:}2{:}1$ cadence locus; prescribed geometry only. |
| `A3.4` | `P[D]` | `U` | `U` | `U` | `U` | Exact $3{:}2{:}1$ cadence locus; prescribed geometry only. |
| `B1` | `P[D]` | `U` | `U` | `U` | `U` | Exact common-axis parent chart; no frozen executable covering row. |
| `B1.1` | `P[D]` | `U` | `U` | `U` | `U` | Prescribed-path score landscape is not ordinary evolution. |
| `B1.2` | `P[D]` | `U` | `U` | `U` | `U` | Exact high-axial locus and bounded analytical diagnostics only. |
| `B1.3` | `P[D]` | `U` | `U` | `U` | `U` | Exact all-equatorial locus and bounded analytical diagnostics only. |
| `C1` | `P[D]` | `U` | `U` | `U` | `U` | Exact twelve-member coaxial chart; historical analytical records do not cover the current identity. |
| `C2` | `P[D]` | `U` | `U` | `U` | `U` | Exact counter-rotating subset chart; historical analytical records do not cover the current identity. |
| `C3` | `P[D]` | `U` | `U` | `U` | `U` | Exact two-component C1 locus; former-identity records are historical only. |
| `C4` | `P[D]` | `U` | `U` | `U` | `U` | Exact counter-rotating two-component C2 locus; former-identity records are historical only. |
| `C5` | `P[D]` | `U` | `U` | `U` | `U` | Exact all-equatorial C3 locus; V1 calibration is insufficient. |
| `C6` | `P[D]` | `U` | `U` | `U` | `U` | Exact counter-rotating all-equatorial C4 locus; former-identity records are historical only. |
| `SD3` | `P[D]` | `P[M]` | `P[M]` | `P[M]` | `U` | The metric-matched five-coordinate row completed the [guarded $T=0.15$ release](three-binary-five-coordinate-bounded-eom-comparison.md) and preserved its cyclic slice, but did not return. |
| `F1` | `U` | `U` | `U` | `U` | `U` | Bounded seed description only; an executable chart remains undeclared. |
| `F2` | `U` | `U` | `U` | `U` | `U` | Bounded dual-triad seed description only; association and executable coordinates remain open. |
| `F3` | `U` | `U` | `U` | `U` | `U` | Bounded near-A2/A3 mode-search description only; no predeclared census. |
| `F4` | `U` | `U` | `U` | `U` | `U` | Bounded framed-plus-counterflow composition only; integrated association remains open. |
| `F5` revised phase-varying campaign realization | `P[D/M]` | `P[D/M]` | `U` | `U` | `U` | The [executable and guard certificate](../braid-program/evidence/2026-08-26-f5-phase-varying-executable-guard-certificate.md) freezes twelve identities and source order, one all-real analytic history restricted to `H=1`, continuous all-66-pair clearance at least `0.12014843873518877`, and a conservative speed bound `0.5` with $c_f=1$; complete causal-root certification remains absent. |
| `F5` common-cadence circular realization | `P[D]` | `F[D]` | `U` | `U` | `U` | The declared ordinary two-ring circular realization has an [exact incompatibility](inferring-braid-requirements.md#joint-projection-audit-and-a-two-ring-no-go) among everywhere-noncoincident member geometry, stationary centroid, and instantaneous dipole null; the revised row is materially different and does not erase this scoped negative. |
| `F6` | `P[D]` | `U` | `U` | `U` | `U` | Exact tetrahedral parent geometry; F6b and F6c own its concrete continuations. |
| `F6b` (demoted realization) | `P[D]` | `P[D]` | `P[D]` | `F[M]` | `U` | Exact continuous noncoincidence and complete simple roots pass on the prescribed circular history, but its [measured member-acceleration residual](inferring-braid-requirements.md#f6b-root-ledger-and-member-acceleration-screen) rejects that isolated history as an EOM realization. |
| `F6c` | `P[D]` | `P[M]` | `P[M]` | `P[M]` | `U` | Bounded releases in the [F6c geometry program](f6c-geometry.md) preserve the exact symmetry surface and achieve partial turns, but no root-valid nondegenerate complete return exists. |
| Three-binary plus six accessories | `P[D]` | `U` | `U` | `U` | `U` | Separate six-accessory inventory and placement strata are declared; the base retained branch and full twelve-member history do not exist. |
| F6c plus six accessories | `P[D]` | `U` | `U` | `U` | `U` | Separate $2+4$ accessory-site inventory and placement strata are declared; retained F6c and full fourteen-member evolution do not exist. |

Plainly: the revised F5 row joins the candidates with a legal prescribed history but has not yet passed the complete-root gate or any ordinary release. Only one A3 slice, one SD3 row, and F6c have bounded ordinary-release passes, and none has passed `H5`. The F5 circular and F6b failures remain scoped to their exact realizations.

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

The A1 and A3 rows pass `R2` only because their ordered binary circulation data can express opposed signs independently of frame and translation; no current evidence shows that a useful counterflow survives ordinary evolution or produces the required exposed moment. A2 fails the same row because its exact cyclic equivalence imposes one common circulation sense; F1 is the proposed A2-like extension that restores independent signs. The Family-B failures follow from its one common axis and one common circulation. C2, C4, and C6 pass only the declared opposed-circulation geometry row; association and retention remain unknown. F1--F4 remain guessed bounded seeds, so their positive functional cells are `P[G]`. F5, F6, F6b, and F6c use `P[D]` only where their later exact constructions establish the geometric row. The seed capabilities are compared in [Seed Comparison Without A Score](inferring-braid-requirements.md#seed-comparison-without-a-score); none is measured physical behavior.

Plainly: A1 and A3 can write down opposed binary circulation, while A2 preserves its stronger cyclic equivalence by using one common sense. The counter-rotating Family-C rows provide explicit opposed circulation but collapse the frame to one axis. The F-series seeds were introduced to combine symmetry, frame, counterflow, and history more tightly, and their inferred passes remain hypotheses until the hard gates are met.

## Accessory-Bearing Adjudication

The accessory rows inherit the unresolved `H5` status of their underlying braid. They also carry six accessory-specific requirements from [Accessory Placement Relative To The Braid](inferring-braid-requirements.md#accessory-placement-relative-to-the-braid).

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

No admitted or exploratory candidate currently passes `H5`, so this matrix selects no physical braid. The separately governed allocation percentages in the [candidate registry](../braid-program/candidate-registry.md) do not alter that conclusion. The immediately discriminating rows are:

1. for taxonomy rows other than A3, obtain the first candidate-specific `H2`--`H4` record; for F1--F4, close `H1` before attempting those gates;
2. for A3 and SD3, extend beyond the one bounded slice only through a separately predeclared coverage campaign, while keeping the existing no-return result scoped to that row;
3. for the revised F5 row, run a complete-root `H3` audit before ordinary evolution; retain the common-cadence circular no-go as a separate scoped negative;
4. for the demoted F6b realization, require a materially different direction-bearing path or inventory row and a new admission audit rather than rescaling one common magnitude;
5. for F6c, do not refine the completed radial-frequency coordinate without a new coordinated-turn signal; predeclare either a materially different return coordinate or the matched guarded/full-causal-root comparison; and
6. for accessory-bearing continuations, do not advance beyond site definition until the underlying braid passes `H5`.

Plainly: the matrix does not say which candidate is best. It says exactly what each candidate has established, what it has failed in a bounded scope, and which missing hard requirement prevents a physical verdict.

### 2026-08-26 Campaign Effect

The [all-candidate evaluation campaign](../braid-program/evidence/2026-08-26-all-candidate-evaluation-campaign-closeout.md) changes no `H1`--`H5`, `R1`--`R6`, or accessory cell. Its disposition audit is:

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

No candidate is `ADVANCED`, and no candidate passes `H5`. The campaign accepts a common centered-RMS ruler and wake-crossing clock for future predeclared measurements but rejects retrospective score backfill. It also derives that a nonbinary `M09` traversal fraction needs an additional continuous lift coordinate; turns, crossings, elapsed time, and shape matches remain ineligible.

Plainly: the hard-gate matrix stays exactly as it was because the campaign found blockers and scoped failures, not new gate-closing evidence. The new result is complete disposition coverage and an explicit mathematical reason that partial return progress still cannot be scored.

### Complete-Registry Follow-On Effect

The later [complete-registry closure campaign](../braid-program/campaigns/2026-08-complete-braid-registry-closure.md) advances the revised F5 phase-varying realization from incomplete representation to `H1 P[D/M]` and `H2 P[D/M]`. The operator subsequently approved that exact scientific row for prescribed display. Its bounded selection and continuous-guard certificate were predeclared as score-ineligible, so no `M01`--`M14` availability or percentage changes. `H3` remains `U` until all required ordered-pair and self-history roots are certified with an analytic interpolation enclosure on the immutable scientific row. The common-cadence circular realization remains `H2 F[D]`.

Plainly: the repaired row is now eligible for a causal-root audit, not for an EOM retention claim. The old failed row stays failed within its own assumptions.

## Weighted Score Boundary

The registry's two percentages are experiment-allocation summaries rather than physical scores. Their [current score packet](../braid-program/candidate-weighted-score-packet.md) preserves every `U`, overlays the noncompensable `H1`--`H5` dispositions, publishes the factual inputs and normalization, and tests sensitivity to alternative weights. Expected discriminatory value, measured campaign cost, and instrument reuse may choose the next test after the hard gates and evidence scores are read; they do not add braid-evidence points.

Plainly: the scores help decide which missing measurement may be worth buying. They do not change a hard-gate failure or turn a candidate into a physical braid.

## Maintenance Rule

Update this matrix whenever the candidate registry changes, an inferred requirement is accepted or retired, or new evidence changes a cell. Every changed cell must name its derived argument or bounded instrument in the accompanying prose or controlling evidence column. A bounded failure stays attached to its exact realization unless a separately certified covering argument promotes it to a family-wide negative.

Closure goal: maintain complete candidate-by-requirement coverage while keeping prescribed geometry, bounded diagnostics, ordinary evolution, retained-branch evidence, and optional search-priority weighting as separate claim layers.
