# Braid Candidate Registry

Status: CURRENT MASTER INDEX, operator-established 2026-08-25. This registry owns the inclusion, short-name routing, concise description, present program status, dynamical claim boundary, and next action for every named braid candidate that is admitted, actively considered, or retained as a scoped negative. Detailed geometry, evidence, and campaign owners remain authoritative for their own rows.

The evidence-graded [Braid Candidate Requirement Adjudication](../mapping-electromagnetism/braid-candidate-requirement-adjudication.md) applies the consolidated inferred requirements to every admitted or exploratory registry row and preserves the F6b scoped negative. This registry owns candidate identity and routing; the adjudication owns requirement dispositions and does not replace candidate-specific evidence.

## Status Discipline

`Admitted candidate` means that the geometry has a complete exact chart, persistent member inventory, removed gauge coordinates, and a reconstructible position-and-velocity map. `Exploratory` means that the geometry remains a search seed or incomplete extension. `Scoped negative / demoted` means that the declared realization has been rejected or excluded from active search while its evidence is retained. None of these labels establishes a retained braid.

`Borg signed-off` means only that one prescribed display geometry was reviewed. `Borg pending` means that the current prescribed display geometry still needs candidate-specific inspection. Neither label is dynamical evidence.

The dynamical-status column reports only what ordinary Master Equation evolution or an explicitly bounded diagnostic establishes. `No retained braid` is the default until a candidate-specific, root-complete, refined evolution establishes a positive-width retained branch under the Braid Program acceptance rules.

Current coverage is twenty-three admitted candidates, six named active exploratory rows, two accessory-bearing continuations, and two scoped-negative or deprecated rows. These are registry rows, not disjoint configuration-space counts: constrained members and F6 variants remain inside their declared parent families.

Plainly: a geometry can be admitted and its drawing can be approved while the physical question remains completely open. The two kinds of status are kept separate here so that a display or prescribed-path result cannot be mistaken for a lasting braid.

## Weighted Score Process

The weighted scores are resource-allocation aids, not physical verdicts. They summarize factual derived or measured candidate metrics while preserving three facts that a single percentage would hide: whether a hard requirement has failed, how much of the metric set has actually been evaluated, and how strong the available results are. Candidate age, familiarity, or accumulated effort never contributes to either score.

Plainly: a high score cannot establish a braid, and a new candidate is not rejected merely because most measurements have not yet been made.

### Metric Record And Initial Weights

Every scored cell must retain the raw value or certified interval, unit or dimensionless normalization, derivation or instrument, claim grade, scope, falsifier, and evidence pointer. Only `derived` and `measured` results are available metrics. An inference, guess, prescribed display, or undocumented numerical value remains unavailable. A measured or derived failure is available evidence and normally receives zero credit; it is not converted back into an unknown.

The initial weights total 100. The raw metrics are factual; the weights and normalization maps are declared allocation policy. A weight expresses how much that metric should influence the next allocation decision, not how much nature values it.

| Metric group | Factual metric | Weight | Required raw quantity |
| --- | --- | ---: | --- |
| Geometric and causal admissibility | Minimum continuous clearance | 8 | Smallest certified member separation divided by the predeclared characteristic braid scale over the claimed history. Sampled clearance is identified as sampled and does not receive continuous-clearance credit. |
| Geometric and causal admissibility | Required causal-root completeness | 8 | Number of certified required roots divided by the number required by the predeclared causal-root contract, with unresolved roots counted as incomplete. |
| Geometric and causal admissibility | Minimum causal-certification margin | 9 | Smallest dimensionless margin to the causal boundary under one predeclared contract shared by the compared candidates. Guarded and full-causal-root margins are not silently mixed. |
| Equation consistency | Master Equation acceleration residual | 20 | Predeclared dimensionless RMS and peak mismatch between the history-required acceleration and the Master Equation acceleration contribution on the same history. Lower is better. |
| Ordinary evolution | Certified evolution horizon | 10 | Root-valid, clearance-valid EOM solver evolution time divided by a predeclared common target horizon or nontrivial return timescale. Elapsed wall time does not count. |
| Ordinary evolution | Geometry and identity leakage | 5 | Largest dimensionless departure from the candidate's declared geometry, symmetry, centering, and persistent-member chart during the certified horizon. Lower is better. |
| Return evidence | Certified return-cycle traversal | 10 | Largest certified fraction of a predeclared nontrivial lifted direct or relative return action traversed while all validity guards remain satisfied. A scalar recrossing, isolated turn, or elapsed time alone does not count. |
| Return evidence | Best eligible full-state return residual | 15 | Smallest dimensionless position-and-rate mismatch under the exact declared return action at an eligible nonzero event. Shape-only proximity and scalar-section proximity are reported separately and receive no full-state-return credit. |
| Numerical reliability | Refinement agreement | 5 | Predeclared dimensionless discrepancy between independently evaluated refinement levels for the scored quantity. Lower is better; this measures numerical reliability, not independent physical confirmation. |
| Retention evidence | Positive-width retention and recovery margin | 10 | Certified dimensionless width of nearby initial histories that retain or return and recover under the declared criterion. A single fine-tuned trajectory has zero width. |
|  | **Total** | **100** |  |

Plainly: the largest weights go to equation consistency, an actual full-state return, and positive-width retention. Geometry, causal validity, sustained evolution, and numerical reliability remain necessary, but none earns points merely because a workflow stage was completed.

### Weighting Rationale

The 25 points for geometric and causal admissibility protect the minimum conditions under which later numbers have a defined referent. The 20-point Master Equation residual is the largest single metric because it is the direct acceleration-law mismatch and an efficient early falsifier, while its weight remains far below a majority because a small residual on a prescribed history cannot establish persistence. Certified horizon and chart leakage receive 15 points together because ordinary evolution must last long enough to be informative without losing candidate identity.

Return evidence receives 25 points: traversal records how much of the declared nontrivial cycle has actually been reached, while the larger residual weight rewards proximity of the complete position-and-rate state under the exact return action. Traversal cannot substitute for residual, and residual cannot substitute for causal validity. Refinement receives 5 points because it can invalidate a numerical result but cannot independently confirm the physical claim. Positive-width retention and recovery receives 10 points because it distinguishes a retained neighborhood from one fine-tuned history; its noncompensable hard-gate role, rather than an arbitrarily dominant weight, protects its necessity.

Plainly: the weights favor the measurements that most directly falsify or advance a braid while avoiding one decisive-looking number. Necessary conditions remain necessary through the hard gates, not by assigning them enough points to overwhelm every other metric.

### Normalizing Raw Metrics

For candidate $b$ and metric $i$, let $x_{bi}$ be the raw factual value, $w_i$ the published weight, and $q_{bi}\in[0,1]$ the normalized metric credit. The scoring packet must freeze a common normalization before seeing the candidate results. For a higher-is-better quantity with zero-credit anchor $L_i$ and full-credit anchor $U_i$,

$$
q_{bi}=\operatorname{clip}\!\left(\frac{x_{bi}-L_i}{U_i-L_i},0,1\right).
$$

For a lower-is-better quantity whose lower anchor $L_i$ receives full credit and upper anchor $U_i$ receives zero credit,

$$
q_{bi}=\operatorname{clip}\!\left(\frac{U_i-x_{bi}}{U_i-L_i},0,1\right).
$$

Here $\operatorname{clip}(z,0,1)=\min(1,\max(0,z))$. A metric spanning several orders of magnitude may use a predeclared logarithmic map, but every candidate in the comparison must use the same map and anchors. Anchors come from the declared campaign gates, exact limiting cases, or a shared benchmark; they are never selected separately for each candidate or adjusted after the results are known.

Plainly: the raw residual, horizon, clearance, or return error remains the evidence. Normalization only puts unlike factual quantities on a common allocation scale, and its choices must be visible and fixed in advance.

### The Two Published Percentages

Let $A_b$ be the metrics applicable to candidate $b$, and let $V_b\subseteq A_b$ be the metrics for which an admissible derived or measured value exists. The registry publishes these two columns:

$$
S_{\mathrm{all}}(b)=100\,\frac{\sum_{i\in V_b}w_iq_{bi}}{\sum_{i\in A_b}w_i},
\qquad
S_{\mathrm{available}}(b)=100\,\frac{\sum_{i\in V_b}w_iq_{bi}}{\sum_{i\in V_b}w_i}.
$$

The column headings are `All metrics` and `Available metrics`. `All metrics` keeps every applicable but unavailable metric in the denominator, so it combines evidence strength with evaluation coverage. `Available metrics` scores only what has actually been derived or measured, so it shows the quality of the evidence obtained so far. If $V_b$ is empty, `Available metrics` is an em dash rather than zero.

Weighted coverage need not occupy a third registry column because it is exactly recoverable as

$$
C(b)=100\,\frac{\sum_{i\in V_b}w_i}{\sum_{i\in A_b}w_i},
\qquad
S_{\mathrm{all}}(b)=\frac{C(b)}{100}S_{\mathrm{available}}(b).
$$

An applicable unknown remains visibly `U` in the requirement adjudication and contributes no numerator credit while remaining in the `All metrics` denominator. `N/A` is excluded from both denominators only when non-applicability was established and frozen before measurement. A hard-requirement failure remains noncompensable regardless of either percentage; status and hard-gate disposition are always read before the scores.

Plainly: `All metrics` answers, “How much weighted evidence has this candidate accumulated out of everything it must eventually establish?” `Available metrics` answers, “How good is the factual evidence we have actually obtained?” Their gap reports weighted coverage without pretending that an unknown is a physical failure.

### Allocation Use

Resource allocation uses the hard-gate disposition first, then the relationship between the two percentages, and finally the measured cost and expected discriminatory value of the next test. Cost, instrument reuse, and expected uncertainty reduction choose among next tests; they do not inflate a candidate's evidence score.

| Observed score pattern | Allocation interpretation |
| --- | --- |
| No available metrics | Do not discard the candidate for being new. Fund only the smallest bounded test that can close the chart or produce the first high-weight factual discriminator. |
| Strong `Available metrics`, low `All metrics` | The evidence obtained so far is favorable but sparse. Prefer the missing high-weight metric that can most sharply confirm or falsify the candidate. |
| Strong and close `All metrics` and `Available metrics` | The candidate has both favorable evidence and broad coverage. Prefer closure tests, refinement, independent checks, and positive-width retention work. |
| Weak `Available metrics` with broad coverage | The available evidence is unfavorable. Repair a specific failed mechanism or demote the declared realization rather than buying more repetitions of the same test. |
| Large gap with mixed available results | Coverage is still the controlling uncertainty. Choose the next metric by expected evidence gain per measured resource cost, while preserving hard-gate order. |
| Any `H1`--`H5` hard-requirement failure | The candidate cannot outrank the failure by accumulating points elsewhere. Further work requires a materially different repair with a new scoped record. |

Plainly: the scores organize attention. They do not permit a cheap, familiar, or heavily studied candidate to outrank a hard failure, and they give a new candidate a defined route to earn its first evidence.

### Exclusions, Sensitivity, And Publication

No score credit is awarded for completing a named stage, producing a document, manifest, test, or display, receiving Borg approval, being old or new, consuming compute, accumulating attempts, matching a hoped-for particle role, or satisfying an inferred capability without a derived or measured metric. Those facts may route work or establish reproducibility, but they are not braid evidence.

Before the two percentage columns are populated, one score packet must publish the applicable-metric set, raw records, normalization maps and anchors, weights, hard-gate overlay, and calculation for every included candidate as one versioned snapshot. It must also recompute the allocation ordering under equal metric weights and plausible weight variations. If a resource decision changes under those alternatives, the result is reported as weight-sensitive rather than as a stable ranking. Rows from different evidence generations are not combined.

This chapter defines the scoring process but does not assign current candidate values. The `All metrics` and `Available metrics` columns are added only after that complete score packet is reviewed; until then, the requirement adjudication's `U`, pass, fail, and scoped-evidence cells remain the authoritative comparison.

Plainly: no percentage appears until every arithmetic choice and every raw input can be audited. The first implementation task is therefore a complete score packet, not hand-entered numbers in selected candidate rows.

## Admitted Candidates

The [configuration chart](configuration-chart.md) owns the admitted coordinates and scope. The [Borg sign-off ledger](borg-candidate-signoff.md) owns prescribed-display review, and the [work queue](work-queue.md) owns executable campaign state.

| Short name | Short description | Program and geometry status | Dynamical status | Next step, if any |
| --- | --- | --- | --- | --- |
| `A1` | Three neutral binaries with a common braid center and zero axial half-separation; each pair uses one center-crossing circle. | Admitted taxonomy; Borg signed-off. | No retained braid; prescribed geometry only. | No candidate-specific campaign is queued; first ratify the configuration chart, then nominate a frozen EOM solver campaign if A1 remains competitive. |
| `A1.1` | A1 with one common binary frequency. | Admitted taxonomy; Borg signed-off. | No retained braid; prescribed geometry only. | No candidate-specific next step is queued. |
| `A1.2` | A1 with equal radii, common frequency, and phases separated by $120^\circ$. | Admitted taxonomy; Borg signed-off. | No retained braid; prescribed geometry only. | No candidate-specific next step is queued. |
| `A1.3` | A1 with indexed frequency ratio $4{:}2{:}1$. | Admitted taxonomy; Borg signed-off. | No retained braid; the V1 A1.3/C5 calibration route is insufficient. | Predeclare the deferred `BP-007` V2 adjudication packet and cost pilot, or retire that calibration route. |
| `A1.4` | A1 with indexed frequency ratio $3{:}2{:}1$. | Admitted taxonomy; Borg signed-off. | No retained braid; prescribed geometry only. | No candidate-specific next step is queued. |
| `A2` | Fully symmetric three-binary Family-A locus with equal geometric scales and cadence, common circulation, and $120^\circ$ phases. | Admitted taxonomy; Borg signed-off. | No retained braid; prescribed geometry and bounded analytical diagnostics only. | No candidate-specific next step is queued; A2 also remains a parent geometry for exploratory F-series seeds. |
| `A3` | General three-binary Family-A geometry with a common braid center and independent axial, transverse, phase, and cadence coordinates. | Admitted taxonomy; Borg signed-off. | No retained braid; one bounded five-coordinate A3 slice has been evolved, without return or family coverage. | A full-A3 claim requires a separately predeclared covering campaign; none is queued. |
| `A3.1` | A3 with one common binary frequency. | Admitted taxonomy; Borg signed-off. | No retained braid; prescribed geometry only. | No candidate-specific next step is queued. |
| `A3.2` | A3 with equal radii, common frequency, and $120^\circ$ phases while axial/transverse decompositions remain distinct. | Admitted taxonomy; Borg signed-off. | No retained braid; prescribed geometry and historical bounded diagnostics only. | No candidate-specific next step is queued. |
| `A3.3` | A3 with indexed frequency ratio $4{:}2{:}1$. | Admitted taxonomy; Borg signed-off. | No retained braid; prescribed geometry only. | No candidate-specific next step is queued. |
| `A3.4` | A3 with indexed frequency ratio $3{:}2{:}1$. | Admitted taxonomy; Borg signed-off. | No retained braid; prescribed geometry only. | No candidate-specific next step is queued. |
| `B1` | General three-binary common-axis family with one midpoint, frequency, and circulation relation and nonzero transverse motion. | Admitted taxonomy parent; no separate Borg representative. | No retained braid; taxonomy only. | Ratify the configuration chart and nominate a frozen executable slice before making a B1-family claim. |
| `B1.1` | Interior B1 locus with positive axial and transverse coordinates for every binary. | Admitted taxonomy; Borg signed-off. | No retained braid; the score-landscape work is prescribed-path diagnosis, not evolution. | Verify or reject the `BP-009` frozen manifest; no pilot or wider search is authorized by that review. |
| `B1.2` | High-axial interior B1 locus with $h_a>\rho_a>0$. | Admitted taxonomy; Borg signed-off. | No retained braid; prescribed geometry and bounded analytical diagnostics only. | No candidate-specific next step is queued. |
| `B1.3` | All-equatorial B1 boundary with $h_a=0$ and $\rho_a=R_a$. | Admitted taxonomy; Borg signed-off. | No retained braid; prescribed geometry and bounded analytical diagnostics only. | No candidate-specific next step is queued. |
| `C1` | General twelve-member coaxial geometry with one circulation relation. | Admitted taxonomy; Borg pending current-identity inspection. | No retained braid; the historical analytical cohort does not cover the current identity. | Complete renewed Borg inspection and a current $c_f=1$ source/registry rebuild before any present-tense analytical comparison. |
| `C2` | General twelve-member coaxial geometry with opposite circulation on two declared subsets. | Admitted taxonomy; Borg pending current-identity inspection. | No retained braid; the historical analytical cohort does not cover the current identity. | Complete renewed Borg inspection and a current $c_f=1$ source/registry rebuild before any present-tense analytical comparison. |
| `C3` | Co-rotating coaxial pair of B1 components inside C1. | Admitted taxonomy; renumbered and Borg pending renewed inspection. | No retained braid; former-identity artifacts are historical only. | Renew prescribed-display inspection and rebuild current-identity analytical records before any dynamical campaign. |
| `C4` | Counter-rotating coaxial pair of B1 components inside C2. | Admitted taxonomy; renumbered and Borg pending renewed inspection. | No retained braid; former-identity artifacts are historical only. | Renew prescribed-display inspection and rebuild current-identity analytical records before any dynamical campaign. |
| `C5` | Co-rotating coaxial pair of all-equatorial B1.3 components. | Admitted taxonomy; renumbered and Borg pending renewed inspection. | No retained braid; the V1 A1.3/C5 calibration route is insufficient. | Renew prescribed-display inspection; predeclare `BP-007` V2 before any further adjudication. |
| `C6` | Counter-rotating coaxial pair of all-equatorial B1.3 components. | Admitted taxonomy; renumbered and Borg pending renewed inspection. | No retained braid; former-identity artifacts are historical only. | Renew prescribed-display inspection and rebuild current-identity analytical records before any dynamical campaign. |
| `SD3` | Three-pair sector-differential geometry with cyclic symmetry, five centered internal coordinates, and generally moving binary midpoints. | Admitted candidate; exact centered geometry, inverse map, tangent metric, and metric-matched initialization are defined. | No retained braid; one guarded prefix through $T=0.15$ stayed in its symmetry-preserved slice but did not return. | A broader conclusion requires a separately predeclared covering campaign; none is currently queued. See the [bounded comparison](../mapping-electromagnetism/three-binary-five-coordinate-bounded-eom-comparison.md). |
| `F6c` | Eight-member, six-coordinate polarity-resolved breathing tetrahedral geometry. | Admitted candidate and active geometry program with an exact symmetry-invariant configuration surface. | No retained braid; bounded EOM solver releases preserve the surface and show partial turns, but the stored census and completed guarded continuations contain no root-valid complete return. | No further refinement of the completed radial-frequency coordinate is justified by its declared gate. A new campaign must predeclare either a materially different coordinated-turn variable or the matched full causal-root comparison. See [F6c Geometry](../mapping-electromagnetism/f6c-geometry.md). |

## Active Exploratory Candidates

These geometries are active considerations but do not yet satisfy the admitted-candidate condition. Their detailed owner is [Inferring Braid Requirements](../mapping-electromagnetism/inferring-braid-requirements.md), except where a more focused owner is linked.

| Short name | Short description | Program and geometry status | Dynamical status | Next step, if any |
| --- | --- | --- | --- | --- |
| `F1` | Near-A2 three-binary frame with independent circulation signs and small phase/deformation coordinates. | Exploratory F-series seed. | No ordinary-evolution result and no retained braid. | Formalize an executable chart, then test root validity, port equivalence, and laboratory-anisotropy leakage before particle-facing comparisons. |
| `F2` | Two A2-like triads sharing a center and frame with conjugation, relative circulation, phase, permutation, and separation coordinates. | Exploratory F-series seed. | No ordinary-evolution result and no retained braid. | Test whether the two triads associate under one law and whether useful exposure survives excessive symmetry cancellation. |
| `F3` | Near-A2 mode and return-permutation search within the A3 deformation chart. | Exploratory F-series seed. | No ordinary-evolution result and no retained braid. | Define a predeclared mode/return census that can distinguish isolated classes from a continuum or ordinary $2\pi$ return. |
| `F4` | A2/A3 three-direction frame associated with a C4-like counter-rotating module. | Exploratory F-series seed. | No ordinary-evolution result and no retained braid. | Establish one integrated retained assembly rather than a detachable module before testing angular, recoil, or particle-facing rows. |
| `F5` | Twelve-member balanced double-dyad triad on three orthogonal body axes. | Exploratory F-series seed with bounded prescribed-path geometry diagnostics. | No retained braid; sampled clearance exists, but the declared two-ring circular form has a conditional incompatibility among collision freedom, stationary centroid, and instantaneous dipole null. | Repair that joint geometry obstruction and obtain continuous clearance/root readiness before any ordinary release. |
| `F6` | Eight-member tetrahedral counterflow parent with four body axes and one distinguished motion-moment direction. | Exploratory F-series parent; F6b and F6c are its concrete continuations. | No retained braid. | Use F6c as the live dynamical continuation; no separate F6 campaign is queued. |

## Scoped-Negative And Demoted Candidates

This is the authoritative list of named candidates that are not currently viable in their declared realization. A scoped negative rejects only the stated chart or history; it does not silently reject a broader parent family or a materially repaired candidate.

| Short name | Current disposition | Controlling issue | Re-entry condition |
| --- | --- | --- | --- |
| `F6b` | Demoted from active search; retained as a scoped-negative F6 realization. | Its exact fixed-radius tetrahedral edge-partition history passes the declared clearance and simple-root screens but fails the measured member-acceleration residual. Magnitude-only, phase-grid, simple-shell, and stationary-anchor repairs are exhausted in the declared screens. | A materially different direction-bearing path or member inventory must close a new exact chart and pass the local residual screen before readmission; rescaling the rejected history is insufficient. |
| `B1.4` | Deprecated control; not an active candidate. | The all-axial B1 limit has zero transverse internal motion. | None under the unchanged all-axial definition. Preserve its stable identifiers, records, tests, and hashes for historical reproducibility. |

## Accessory-Bearing Continuations

Accessory architrinos are separate declared inventory and do not establish a retained braid. These rows record the two current placement programs.

| Short name | Short description | Program and geometry status | Dynamical status | Next step, if any |
| --- | --- | --- | --- | --- |
| Three-binary plus six accessories | Six accessory sites continued across interior, boundary, just-exterior, and remote-exterior placements around a retained three-binary braid. | Exploratory associated-assembly continuation; no stable abbreviated identifier has been assigned. | No retained base braid and no retained accessory-bearing assembly. | First establish the base braid; then run the staged probe, one-way response, accessory-only, full-backreaction, and removal/recovery sequence. |
| F6c plus six accessories | Two axial and four transverse accessory sites continued across interior, boundary, just-exterior, and remote-exterior placements around F6c. | Exploratory associated-assembly continuation; no stable abbreviated identifier has been assigned. | No retained F6c branch and no retained fourteen-member assembly. | First establish a retained F6c branch; then apply the same staged sequence while keeping axial-dyad polarity decorations as distinct histories. |

## Referenced Aliases That Are Not Separate Candidates

| Name | Registry disposition | Reason or routing |
| --- | --- | --- |
| `Candidate A` | Alias only; not a separate registry row. | The pair-conjugate three-binary comparison geometry is a selected A3 slice. Its bounded result is recorded under A3. |
| `Candidate B` | Retired temporary alias for `SD3`. | The letter meant only the second side of a local comparison and was easily confused with Family B. Historical machine fields and append-only records may retain `candidateB` or `Candidate B` as provenance-bound identifiers. |

## Maintenance Rule

Any edit that admits, names, renames, deprecates, or materially changes the status of a braid candidate must update this registry, the [requirement adjudication](../mapping-electromagnetism/braid-candidate-requirement-adjudication.md), and the detailed owner in the same scoped change. Geometry equations remain with the configuration chart or focused geometry owner; display approval remains with the Borg ledger; campaign lifecycle remains with the work queue; measurements remain with their evidence packet. When those owners disagree, the stronger claim does not win automatically: the inconsistency must be resolved at the owner, and this registry must retain the narrower status until then.

Plainly: this file answers what candidates exist, what each name means, what is actually known, and what happens next. It routes to the proof rather than replacing the proof.
