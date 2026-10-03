# Findings ledger and route ratings

Status: DRAFT index and rating, prepared 2026-10-03 at the operator's request. The findings and their dispositions restate the owner records linked in each row. The ratings are the drafting agent's judgement at guessed grade. Nothing here changes a claim grade, task status, score, ranking or scenario selection. The ledger was revised the same day after the owners recorded the ring, slow-pair, logarithmic-lattice and downward-crossing results; the owners were changing while it was drafted, so a row may lag its owner.

## Purpose

The October 2026 read-only review of the eight research directories and the two equation variations produced many separate findings. Each owner has since assessed them in its own review-integration record and queued the unfinished work. This ledger gathers those findings into one list, states what each owner decided, and then rates the research routes the findings open, so that the routes can be compared across geometries.

The ledger has three parts. The first lists findings by geometry with the owner's disposition. The second rates the open routes on coarse scales and records the routes already completed. The third lists evidence repairs, operator decisions and the ideas raised in discussion. The companion [geometry configuration registry](geometry-configuration-registry.md) records the configurations these findings concern, and the parent [review synthesis](../analysis/research-review-synthesis-2026-10-03.md) gives the connected account in prose.

## Findings and what the owners decided

Each finding has an identifier, a one-line statement, its claim grade, the owner's disposition, and what remains open. Grades follow repository practice: *derived* for a proof, *measured* for an instrument result, *inferred* for a conclusion without its own proof, and *guessed* for a proposal. "Self-reviewed" means no separate adjudication exists yet. The disposition words are the owners' own: *accepted*, *partially accepted*, *rejected*, *not established*, or *deferred* to an operator decision. The **Route** column points to a rated route (R) in the next part, an evidence repair (E), or an operator decision (D-OP). It reads "Completed" where the owner has finished the work and "None" where nothing further is recorded.

All numerical statements use $c_f=1$, where $c_f$ is the wake speed. $K$ is the inverse-square coefficient of a pair, $n$ is the exponent of a distance response proportional to $R^n$, so that the unchanged Master Equation has $n=-2$ and the logarithmic variation has $n=-1$.

### Collinear

Disposition record: [collinear review assessment](../collinear-research/analysis/collinear-review-integration-2026-10-03.md).

| ID | Finding | Grade | Owner disposition | Still open | Route |
| --- | --- | --- | --- | --- | --- |
| F-COL-1 | For a slow mirror pair, the comparison quantity $\tfrac12v^2+U$ changes at rate $(n+1)k(2\lvert x\rvert)^nv^2$ plus a bounded remainder | Derived, self-reviewed | Partially accepted as a local lemma | A full-cycle estimate; the retained trajectory is too fast for the lemma | R12 |
| F-COL-2 | First arrival at wake speed blocks continuation for a whole class of attracting histories, not only the stationary release | Derived, self-reviewed, conditional | Partially accepted for finite continuous velocity | Jump and infinite-limit classes; other first exits | R2 |
| F-COL-3 | Passage integrability, the sign of F-COL-1 and a proposed self-root scaling all change at $n=-1$ | Derived for $n\le-1$ under stated hypotheses; guessed beyond | Tracked as a conjectural insight | Whether any $n>-1$ admits a continuation | R6 |
| F-COL-4 | The historical zero-impulse event cancellation needs the receiver's own source record, which the zero-self scenario excludes | Derived | Accepted as a scope correction | Which event model, if any, to keep | D-OP-4 |
| F-COL-5 | A capped approach with zero self response exists and is unique up to coincidence | Derived, self-reviewed | New direct proof recorded | No update at coincidence | D-OP-4 |
| F-COL-6 | The incoming interval certificate's source file no longer matches its historical receipt | Measured | Accepted; rerun reproduces the enclosure | The instrument does not enforce the source identity | E-1 |
| F-COL-7 | An architrino slowing through wake speed on a straight path creates a new self root with an infinite forward contribution | Derived, independently adjudicated | Accepted as a conditional obstruction | Curved paths, jumps, and opposing contributions that are not integrable; no universal barrier is claimed | Completed |

### Lattice

Disposition record: [lattice review assessment](../lattice-research/analysis/lattice-review-integration-2026-10-03.md).

| ID | Finding | Grade | Owner disposition | Still open | Route |
| --- | --- | --- | --- | --- | --- |
| F-LAT-1 | The checkerboard at rest has an unstable band of wavevectors at every coupling, and the linearized equation has complete localized histories | Derived, self-reviewed | Accepted and developed | Separate adjudication; a nonlinear localized history | R4 |
| F-LAT-2 | The staggered mode has exactly one positive growth rate at every coupling | Derived | Accepted | None at linear grade | R4 |
| F-LAT-3 | The two-target pulse's late growth rate, between about $2.38$ and $3.00$, is compatible with the staggered rate near $2.79$ | Inferred | Partially accepted as a comparison | No mode projection identifies the mechanism | R4 |
| F-LAT-4 | The site-local cluster ladder stored too little history for $N=4$ and $6$ | Measured | Accepted; conclusions withdrawn | A complete-history rerun | E-2 |
| F-LAT-5 | A static receiver response has zero trace and cannot restore in every direction | Derived | Accepted in narrowed form | Collective and moving responses | R4 |
| F-LAT-6 | The sum for a checkerboard in sustained periodic motion diverges under every order of summation | Guessed | Not established; the owner now requires a summation and convergence theorem before such a configuration is used | That theorem | R4 |
| F-LAT-7 | Some independent adjudications share a residual input with their subject | Measured | Partially accepted, described by component | An independently built residual | E-3 |
| F-LAT-8 | In the weak-coupling limit the collective growth rate depends only on density and coupling | Derived, self-reviewed | Accepted and proved | Separate adjudication; no transfer to disorder | R4, R11 |

### Binary

Disposition record: [binary review assessment](../binary-research/analysis/binary-review-integration-2026-10-03.md).

| ID | Finding | Grade | Owner disposition | Still open | Route |
| --- | --- | --- | --- | --- | --- |
| F-BIN-1 | The first-order received acceleration is $\dfrac{\sigma K}{r^2}\left[\mathbf n_0+\mathbf u-2(\mathbf n_0\cdot\mathbf u)\mathbf n_0\right]$ with an explicit remainder | Derived, independently adjudicated | Accepted | None at local grade | Completed |
| F-BIN-2 | A slow circular pair has geometric slow-radius drift $d(\mathcal R^2)/dT=K/c_f$ with a controlled finite-interval error | Derived on a finite long interval for $v_0/c_f\le10^{-9}$, independently adjudicated | Accepted as controlled finite expansion | Escape for all future time; larger speeds; pairs that are not mirror-symmetric | R13 |
| F-BIN-3 | No uniform antipodal circle exists at any speed up to $c_f$ under the unchanged equation | Derived | Accepted | None in that class | None |
| F-BIN-4 | The small inward radial episode in the long run is a near-tangency within outward drift | Inferred | Accepted as an interpretation | A sign-certified continuation, deferred and blocked | None |
| F-BIN-5 | Campaign 1 outcomes can be predicted by hand before running it | Guessed | Rejected as grid-wide claims | A prediction per complete history | R13 |
| F-BIN-6 | The capped-circle results do not transfer to the unchanged equation, and the escape criteria apply only with all their hypotheses | Derived | Accepted | The remaining manuscript audit | None |

In F-BIN-1, $r$ and $\mathbf n_0$ are the present separation and direction, $\mathbf u$ is the transmitter's velocity divided by $c_f$, and $\sigma$ is $+1$ for like polarity and $-1$ for opposite polarity.

### Braid Program

Disposition record: [Braid Program review assessment](../braid-program/analysis/braid-review-integration-2026-10-03.md).

| ID | Finding | Grade | Owner disposition | Still open | Route |
| --- | --- | --- | --- | --- | --- |
| F-BRD-1 | The exact rings had no stability analysis; a first-variation matrix for common radius and phase can be written from the certified root ledger | Computer-assisted derived for the growth rates; separately adjudicated conditional derivation for the nonlinear step | Carried through: rung T02 has two certified positive growth rates in that sector, and a local nonlinear orbital instability is independently adjudicated. An earlier sign argument for instability was retracted and is not used | Later fate, other rungs and sectors; no qualification decision | R16, R17 |
| F-BRD-2 | An analytical stability route could supplement the ratified evolution-first method | Guessed | Deferred to the operator | The permitted inference | D-OP-1 |
| F-BRD-3 | The orthogonal-plane exclusion should be booked against two adjudicated rows | Guessed | Rejected: polarity order and frames differ | A path and polarity equivalence proof, if one exists | None |
| F-BRD-4 | The weighted score used the wrong divisor and credited symmetry roundoff | Measured | Accepted; credits withdrawn | The corrected reduction | E-4 |
| F-BRD-5 | The sector-exchange rule had the wrong parity for axial offset and phase | Derived | Accepted and corrected | None | None |
| F-BRD-6 | The substrate constants give a unit $K/c_f$ of area per time but no unit of mass or action | Derived | Partially accepted; historical assumption preserved and fenced | An action that derives its own normalization | R7 |
| F-BRD-7 | Parts of the ring certificates may leave small parameter strips uncovered | Guessed | Deferred to a bounded audit | Each allegation's interval and reference | E-5 |

### Photon, neutrino and quark

Disposition records: [photon](../photon-research/analysis/photon-review-integration-2026-10-03.md), [neutrino](../neutrino-research/analysis/neutrino-review-integration-2026-10-03.md) and [quark](../quark-research/analysis/quark-review-integration-2026-10-03.md) review assessments.

| ID | Finding | Grade | Owner disposition | Still open | Route |
| --- | --- | --- | --- | --- | --- |
| F-PHO-1 | A carrier with fixed axial offsets cannot translate at or above wake speed on ordinary roots | Derived, self-reviewed | Partially accepted in that scope | Carriers with internal axial motion; singular contacts | R8 |
| F-PHO-2 | Each member of a translating carrier must satisfy the axial identity $A_{x,i}=US_i+C_i$ | Derived, self-reviewed | Accepted | The cross-ring sums are not yet evaluated | R8 |
| F-PHO-3 | Two equal-frequency regular hexagons rotating in opposite senses cannot be held rigid by a constant correction | Derived, self-reviewed | Accepted as a lead in that chart | Layered and irregular geometries | R8 |
| F-PHO-4 | The photon test should become a search for a periodically modulated history | Guessed | Deferred to the operator | The completion criterion | D-OP-2 |
| F-NEU-1 | A regular alternating six-member ring has vanishing low-order moments, and one defect restores them at computed rates | Derived, self-reviewed | Accepted | Numerical verification; exposure weights | R9 |
| F-NEU-2 | A three-mode reduction needs a lawful reference motion and a separated slow subspace; exact unit-modulus pairs are not required | Derived for the counterexample | Accepted as an open problem | The reference motion | R9 |
| F-QRK-1 | The acceleration a stationary probe receives from a periodic host below wake speed, averaged over a period, has zero divergence | Derived, self-reviewed | Accepted and strengthened to an exact average | Dynamic trapping; a moving accessory | R10 |
| F-QRK-2 | Oriented coupling components split as $2+3+3$ under the full octahedral rotations; unsigned axis labels split as $1+1+2+2+2$ | Derived, conditional | Accepted conditionally | The physical coupling representation | R10 |

In F-PHO-2, $U$ is the translation speed, $S_i$ is member $i$'s total signed scalar root weight and $C_i$ is its cross-ring contribution.

### Noether sea and the two equation variations

Disposition records: [Noether sea](../noether-sea-research/analysis/noether-sea-review-integration-2026-10-03.md), [logarithmic](../collinear-research/analysis/logarithmic-review-integration-2026-10-03.md) and [ceiling](../equation-variants/field-speed-ceiling/analysis/field-speed-ceiling-review-integration-2026-10-03.md) review assessments.

| ID | Finding | Grade | Owner disposition | Still open | Route |
| --- | --- | --- | --- | --- | --- |
| F-SEA-1 | Pressure cannot be an applied control: the substrate constants carry no mass dimension | Derived | Accepted | A density or strain coordinate, proposed | D-OP-3 |
| F-SEA-2 | Generic histories have no scaling symmetry at fixed coupling, so "scaled braids" must be actual solution rungs | Derived | Accepted for generic histories | Which constituents, if any | R11 |
| F-SEA-3 | The effective signal speed has no defined readout | Derived | Accepted; a group-delay readout proposed | Operator selection | D-OP-3 |
| F-LOG-1 | Under the logarithmic response the checkerboard at rest restores a fixed-source receiver in every direction | Derived, independently reconstructed | Accepted | None at this scope | Completed |
| F-LOG-4 | With every member responding, the logarithmic checkerboard has a growing staggered mode at every positive coupling | Derived, independently adjudicated | Accepted at linear grade | A nonlinear or localized history; the variation's overall disposition | D-OP-6 |
| F-LOG-2 | Under the logarithmic response a slow circular pair is still pushed along its motion | Derived, self-reviewed | Accepted | A long-time comparison | D-OP-6 |
| F-LOG-3 | The logarithmic response keeps the self-root obstruction | Derived | Retained | See F-COL-3 | R6 |
| F-CEI-1 | The ceiling does not by itself attract trajectories to the boundary | Inferred | Not established as universal | Other approach histories | None |
| F-CEI-2 | Reviews written under named mathematicians' labels are specialist lenses, not independent authority | Measured | Accepted; independence judged by content | Undisposed panel claims | None |

## Rating the research routes

A route is a line of work that one or more findings open. Each route below already has an owner and a recorded task. The rating adds a judgement about how fruitful the route looks, using three graded scales and a statement of footing.

| Scale | Question | High | Low |
| --- | --- | --- | --- |
| Decisive | Would either outcome change what is done next? | Both outcomes redirect work | One outcome is already expected, or neither changes a plan |
| Reach | How many geometries or variations does the answer bear on? | Four or more | One |
| Tractable | Can it be done now with existing mathematics and instruments? | Hand analysis on an existing base | Needs a new capability, or a prerequisite that does not exist |

A fourth column, **Footing**, states in words how well supported the starting result is: independently checked, self-reviewed, inferred or guessed. A route on weak footing may still be worth doing first if its opening step is to check that footing.

The scales are kept separate and are not multiplied into one number. A composite would imply a precision these judgements do not have, and the Braid Program's weighted score has already needed a normalization erratum (F-BRD-4). The ratings also stay separate from the machine-checked [global priority ranking](../../aaa-work-threads/priorities.md), which scores one next object per workstream and is unchanged by this ledger.

### Routes completed on 2026-10-03

Five bounded routes were carried out by their owners while this ledger was being drafted and integrated. Their identifiers are kept so that earlier references still resolve.

| Route | Question | Outcome | Owner record |
| --- | --- | --- | --- |
| R1 | Does the exact six-member ring have growing modes in its symmetric sector? | Yes for rung T02: two positive real growth rates certified. Stability in other sectors and rungs is not decided | [Characteristic evaluation](../braid-program/analysis/t02-symmetric-characteristic-independent-evaluation.md) |
| R3 | Does a slow circular pair expand over a long interval? | Yes, on a finite interval of order the inverse squared speed, for very slow pairs. Escape for all time is unproved | [Secular adjudication](../binary-research/analysis/slow-binary-secular-independent-adjudication-2026-10-03.md) |
| R5 | Is the logarithmic checkerboard stable when every member responds? | No: a growing staggered mode exists at every positive coupling. The fixed-source restoring response remains true | [Collective adjudication](../lattice-research/analysis/logarithmic-collective-independent-adjudication-2026-10-03.md) |
| R15 | Can an architrino slow through wake speed on a straight path? | Not while the opposing contribution of the remaining rows has a finite integral | [Crossing adjudication](../analysis/downward-wake-speed-crossing-independent-adjudication.md) |
| R16 | Can T02 growing modes be connected to admissible nonlinear histories? | Yes: complete coupled ancient histories and local orbital instability in the common in-plane class, conditional on inherited characteristic certificates. Later fate and other rungs are open | [Nonlinear adjudication](../braid-program/analysis/t02-nonlinear-history-independent-adjudication-2026-10-03.md) |

### Open routes

| Route | What would be done | Decisive | Reach | Tractable | Footing | Owner task and status |
| --- | --- | --- | --- | --- | --- | --- |
| R2 | Extend the self-root obstruction to every attracting history below wake speed, and have the class proof checked | High | High | Medium | Stationary case independently supported; class case self-reviewed | [Independently review collinear endpoint and exponent proofs](../collinear-research/work-queue.md#independently-review-collinear-endpoint-and-exponent-proofs): queued |
| R4 | Attempt a localized nonlinear history from the lattice's linear growing modes | Medium | Medium | Medium | Linear construction self-reviewed | [Specify a spatially localized self-consistent lattice preparation](../lattice-research/work-queue.md#specify-a-spatially-localized-self-consistent-lattice-preparation): queued |
| R6 | Decide whether an exponent above $-1$ admits an outgoing continuation | High | High | Medium | Negative half derived under hypotheses; positive half unproved | [Decide whether to investigate a softer radial exponent](../work-queue.md#decide-whether-to-investigate-a-softer-radial-exponent): deferred to the operator |
| R7 | Find an account of what emission and reception transfer that closes on one causal update | High | High | Low | An impossibility theorem for the simplest account form is independently accepted; the replacement is a proposal | [Robustness and conserved account](../work-queue.md#lpr-005--robustness-and-conserved-account): partial, deferred |
| R8 | Specify the first twelve-member photon test and evaluate its axial sums below wake speed | Medium | Medium | Medium | Self-reviewed | [Specify the first twelve-architrino candidate test](../photon-research/work-queue.md#specify-the-first-twelve-architrino-candidate-test): queued |
| R9 | Verify the ring moment hierarchy; define the slow-mode test once a reference exists | Low | Low | High for the moments; Low for the modes | Self-reviewed | [Verify the prescribed alternating-ring mismatch moments](../neutrino-research/work-queue.md#verify-the-prescribed-alternating-ring-mismatch-moments): queued |
| R10 | Compare a fixed probe's mean and oscillating acceleration on one prescribed host | Medium | Low | Medium | Self-reviewed | [Specify one complete quark-candidate geometry and past history](../quark-research/work-queue.md#specify-one-complete-quark-candidate-geometry-and-past-history): queued |
| R11 | Choose a preparation coordinate and a readout for the sea response | Medium | High | Low | Proposal | [Select a preparation control and disturbance readout](../noether-sea-research/work-queue.md#select-a-preparation-control-and-disturbance-readout): deferred to the operator |
| R12 | Prove a full-cycle growth estimate for the linear comparison | Low | Low | High | Local lemma self-reviewed | [Complete the full-cycle delay-balance comparison](../collinear-research/work-queue.md#complete-the-full-cycle-delay-balance-comparison): queued |
| R13 | Write a prediction for each Campaign 1 history before any run, using the proved slow-pair expansion where it applies | Medium | Low | High | Slow-pair theorem independently adjudicated; the campaign's speeds lie outside it | [Predeclare Campaign 1 expectations by complete history](../binary-research/work-queue.md#predeclare-campaign-1-expectations-by-complete-history): queued |
| R14 | Investigate, on a bounded finite-pair domain, a response taken from the gradient of the accumulated wake amplitude | High | High | Medium | An exact cancellation for a source in uniform motion is derived (self-reviewed); a term from source acceleration remains | [Decide whether to investigate additional response-law proposals](../work-queue.md#decide-whether-to-investigate-additional-response-law-proposals): deferred to the operator |
| R17 | Follow a disturbed ring through at least one full cycle to see where an unstable history goes | High | High | Low | Exact reference handed to the EOM solver; no cycle evolved | [Nearby-history return map and stability](../braid-program/campaigns/planar-three-binary-work-queue.md#nearby-history-return-map-and-stability): deferred, blocked |

### Reading the ratings

The completed routes change the picture. Every exact solution whose nearby histories have now been examined is unstable at linear grade: the checkerboard under both responses, the capped circle, and rung T02 of the ring in its symmetric sector. Slow pairs below wake speed provably expand, and a straight-line crossing of wake speed is obstructed in both directions under the stated conditions. None of these results excludes an assembly, because none says where a disturbed history ends up. Together they remove the simplest candidates for a constituent that holds its shape unaided.

Two open routes are decisive, wide in reach, and can proceed now on derived work.

- **R16** completes the T02 local nonlinear connection. Generalizing to other rungs and sectors would be a new bounded investigation, not an unfinished part of that completed task. Even instability of every circular rung would not exclude a different modulated assembly; absence of growing linear modes alone would not prove retention or qualification.
- **R2** asks whether the self-root obstruction holds for every attracting history below wake speed. With the slow-pair expansion and the downward-crossing obstruction already proved, a class-level result would mean that an isolated pair cannot pass through wake speed in either direction by a regular motion.

Three routes are decisive but wait on the operator, because each changes the equation or its interpretation. **R14** and **R6** each need a selection outside the two authorized variations. **R7** is the standing closure problem of the parent and has no bounded first step. After the completed routes, these decisions carry more weight than any single remaining calculation: every stability test carried out so far, on the unchanged equation and on the logarithmic variation, has found growth.

**R17** is the route that would turn an instability into a fate. It is rated low on tractability only because the EOM solver capability it needs is not yet accepted.

The remaining routes are downstream or narrow. R9's mode test and R10's host both wait on a reference assembly, which R16 could supply or remove. R11 waits on any constituent with an established history. R4, R12 and R13 are inexpensive and improve one geometry's account without changing what the others do.

These readings are judgements at guessed grade. A rating should be revised when its owner records a result.

## Evidence repairs

These are obligations, not opportunities, and are not rated for fruitfulness. Each one limits how an existing result may be used until it is done.

| ID | Repair | What it gates | Owner task |
| --- | --- | --- | --- |
| E-1 | Make the incoming interval certificate enforce its source identity | Reuse of the certificate as a source-bound receipt | [Repair known-receipt source admission](../collinear-research/work-queue.md#repair-known-receipt-source-admission) |
| E-2 | Rerun the site-local cluster ladder with a complete stored history | Any conclusion about clusters of side 4 or 6 (registry row LAT-5) | [Repair the complete-history site-local release ladder](../lattice-research/work-queue.md#repair-the-complete-history-site-local-release-ladder) |
| E-3 | Reproduce the lattice boundary certificate on current source, and name each independent check's inherited inputs | Claims of current reproducibility and of independent validation | [Restore current-source lattice boundary reproducibility](../lattice-research/work-queue.md#restore-current-source-lattice-boundary-reproducibility) |
| E-4 | Redo the weighted score reduction with the frozen ruler | Any use of the withdrawn score credits | [Correct the current score reduction](../braid-program/work-queue.md#correct-the-current-score-reduction) |
| E-5 | Audit the ring certificates' coverage and oracle availability | The scope claimed for rows BRD-1 and BRD-3 | [Verify outstanding ring-certificate scope and reproducibility](../braid-program/campaigns/planar-three-binary-work-queue.md#verify-outstanding-ring-certificate-scope-and-reproducibility) |

## Decisions waiting on the operator

| ID | Decision | Routes affected | Owner record |
| --- | --- | --- | --- |
| D-OP-1 | Whether a proved instability may exclude a candidate, and what analytical evidence may supplement evolution | R16, R17 | [Decide how analytical stability may inform qualification](../braid-program/work-queue.md#decide-how-analytical-stability-may-inform-qualification) |
| D-OP-2 | Whether to add a periodically modulated history as a photon completion criterion | R8, R9 | [Decide whether to add a modulated periodic-orbit criterion](../photon-research/work-queue.md#decide-whether-to-add-a-modulated-periodic-orbit-criterion) |
| D-OP-3 | Whether a density or strain coordinate and a group-delay readout supplement or replace the pressure packet | R11 | [Select a preparation control and disturbance readout](../noether-sea-research/work-queue.md#select-a-preparation-control-and-disturbance-readout) |
| D-OP-4 | Which scope the historical two-source event cancellation keeps | R2 | [Resolve own-source admission in the extended mirror event model](../collinear-research/work-queue.md#resolve-own-source-admission-in-the-extended-mirror-event-model) |
| D-OP-5 | Whether to investigate an exponent above $-1$ | R6 | [Decide whether to investigate a softer radial exponent](../work-queue.md#decide-whether-to-investigate-a-softer-radial-exponent) |
| D-OP-6 | Whether to continue, revise or park the logarithmic variation, now that its lattice advantage is confined to the fixed-source case | R7 | [Logarithmic research disposition](../collinear-research/work-queue.md#lpr-006--research-disposition) |
| D-OP-7 | Whether to select the amplitude-gradient response, a self-braking response or an action-derived law for bounded investigation | R14 | [Decide whether to investigate additional response-law proposals](../work-queue.md#decide-whether-to-investigate-additional-response-law-proposals) |

## Ideas raised in discussion and where they stand

The following arose in the operator's discussion after the review. The parent's [alternatives assessment](../analysis/research-alternatives-assessment-2026-10-03.md) has since given each a disposition. Recording them here accepts no task and authorizes no equation change; the only authorized variations remain the ceiling and the logarithmic potential.

| ID | Idea | Owner disposition |
| --- | --- | --- |
| I-1 | For a mirror pair, the rate of change of $\tfrac12v^2+U$ per member is $\dfrac{K}{r^2c_f}\left(v_{\mathrm{tangential}}^2-v_{\mathrm{radial}}^2\right)$ at first order | Derived with its remainder and accepted by the [local adjudication](../binary-research/analysis/slow-binary-independent-adjudication-2026-10-03.md) as a proxy identity. It is a comparison quantity, not an energy account. The distinct quadratic-motion proxy on the exact ring has zero rate at every instant; the subfield mirror formula does not apply to that superfield ring |
| I-2 | Emission is free and reception does not deplete, so each wake is an inexhaustible capability to accelerate; either that is accepted, or emission is given a cost | Kept as a [formulation question](../analysis/research-alternatives-assessment-2026-10-03.md#continuous-emission-and-energy-accounting). No choice is forced, and physical energy generation is not asserted. The account task stays blocked |
| I-3 | A response taken from the gradient of the accumulated wake amplitude $1/(R\lvert D_t\rvert)$ | An [exact cancellation](../analysis/research-alternatives-assessment-2026-10-03.md#the-amplitude-gradient-proposal-an-exact-kinematic-control) for a source in uniform motion is derived (self-reviewed). A term from source acceleration remains, and the boundary formulation is unresolved. Selection is D-OP-7 |
| I-4 | The barrier at wake speed may be two-sided | The conditional downward-crossing obstruction is proved (F-COL-7). A universal two-sided barrier is not established |
| I-5 | Geometries not yet examined: scattering of two architrinos, a co-rotating coaxial ring pair, a pair with a third body, a probe in the ring's oscillating field, and a lattice of rings | Each is [proposed and not launched](../analysis/research-alternatives-assessment-2026-10-03.md#proposed-geometry-investigations-and-existing-owners), with a named owner and first calculation. A combination of exact rings is not automatically balanced |
| I-6 | Binding may be dynamic and supplied by a surrounding population, or matter may exist only above wake speed | Recorded as [guessed mechanisms](../analysis/research-alternatives-assessment-2026-10-03.md#conservation-binding-and-environment-hypotheses). Environmental binding is a meaningful investigation, not an established mechanism. The claim that conservation would forbid the observed first-order effects is rejected |

In I-3, $R$ is the causal distance and $D_t$ is the transmitter factor $1-\mathbf n\cdot\mathbf V_j/c_f$ evaluated at emission.

## Coverage and maintenance

The findings are those the owners' 2026-10-03 review assessments list with a disposition, together with the results those owners recorded later the same day. Minor corrections that the owners applied and closed, such as formula and digit errata, stale section references and link repairs, are omitted. No proof was rechecked and no instrument was run to build this ledger; each grade and disposition restates its owner, and where the two differ the owner is correct.

Add a finding when an owner records one with a grade and a disposition. Change a rating only with a one-line reason tied to an owner result. Keep the scales separate. When a route's task completes, move it to the completed table with its outcome, keep its identifier, and bring the "Still open" text of its findings into line with the owner.
