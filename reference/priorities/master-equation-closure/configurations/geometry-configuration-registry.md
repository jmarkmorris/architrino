# Geometry configuration registry

Status: DRAFT cross-geometry index, prepared 2026-10-03 at the operator's request from a read of the owner documents linked in each row, and revised the same day after the owners recorded the ring, slow-pair, logarithmic-lattice and downward-crossing results. It is an index. It changes no claim grade, task status, score, ranking or scenario selection. The owners were changing while it was drafted, so a row may lag its owner.

## Purpose

The eight research directories under [Master-Equation Closure](../README.md) each study one family of architrino configurations. Their results are recorded in different forms, so it is hard to see in one place which configurations have a solution, which have a known stability verdict and which have ever been evolved. This registry puts those three answers side by side for every configuration the owners currently name.

Each row answers three questions about one configuration under one stated equation:

1. Does a complete history of this configuration satisfy the equation?
2. If it does, what happens to nearby histories?
3. Has any motion been evolved from the equation and retained, and how far?

The owners keep the proofs, certificates and evidence. Where this registry and an owner disagree, the owner is correct and the row needs repair. The companion [findings ledger](findings-ledger.md) lists the individual findings behind these rows and rates the research routes they open. The Braid Program keeps its own detailed registries, which this table summarizes and does not replace: the [configuration chart](../braid-program/configurations/configuration-chart.md), the [candidate registry](../braid-program/configurations/candidate-registry.md) and the [circular configuration registry](../braid-program/configurations/circular-configuration-registry.md).

## How to read a row

All numerical values use the normalization $c_f=1$, where $c_f$ is the wake speed: the speed at which an architrino's emitted wake travels. A configuration is *below wake speed* when every member moves slower than $c_f$ and *above wake speed* when members move faster. A *complete history* gives every member's path for all past time, which the equation needs because each received wake was emitted earlier. A *causal root* is one emission time whose wake reaches the receiver at the reception time considered; a *self root* is a causal root in which the receiver meets its own earlier wake, which requires the member to have moved at least as fast as $c_f$ somewhere along the way.

The **Equation** column uses these labels. The first is the baseline. The next two are the only variations the operator has authorized for research, as recorded in the [equation-variants index](../equation-variants/README.md). The last two are comparison studies with their own historical authority and are not available as default assumptions.

| Label | Meaning | Defining owner |
| --- | --- | --- |
| ME | Unchanged Master Equation: inverse-square response, every positive-delay self root included, no speed cap | [Canonical form](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) |
| Ceiling | Field-speed ceiling. Each row states the speed domain, the self response and any boundary response it selects | [Ceiling definition](../equation-variants/field-speed-ceiling/definition.md) |
| Log | Logarithmic potential: inverse-distance response with the same causal geometry and transmitter weighting | [Logarithmic potential](../equation-variants/logarithmic-potential/README.md) |
| Linear comparison | Response growing linearly with causal distance, without a receiver multiplier | [Corrected linear comparison](../collinear-research/analysis/multiplier-free-linear-delayed-comparison.md) |
| Quarantined | Quadratic receiver multiplier $1-v^2$ and its softened variants; inactive without operator re-selection | [Quarantine notice](../collinear-research/README.md#quarantined-quadratic-response-examinations) |

The **Does a history satisfy the equation?** column uses a fixed vocabulary:

| Word | Meaning |
| --- | --- |
| Solution | A history shown to satisfy the stated equation, either for all time or up to a named event |
| Balanced | A complete circular history whose required and received accelerations agree, measured and independently checked, without a proof |
| Excluded | Shown not to be a solution within the stated class |
| Prescribed | A supplied path that has not been shown to satisfy the equation |
| Unspecified | No complete history has been written down |

Each status carries its claim grade in parentheses: *derived* for a proof, *measured* for an instrument result, *inferred* for a conclusion drawn from derived or measured inputs without its own proof, and *guessed* for a proposal. "Self-reviewed" means the author of a derivation checked it and no separate adjudication exists yet. "Independently checked" means the owner records a separately constructed check.

The **Nearby histories** column records stability. It reads "No reference" where no solution exists to perturb: a stability statement about a history that does not satisfy the equation has no meaning. The **Evolved motion retained** column records the longest motion actually produced from the equation, by proof or by the EOM solver, and where it stopped.

## Collinear: two opposite-polarity architrinos on one line

Owner: [Collinear research](../collinear-research/priorities.md).

| ID | Configuration | Equation | Does a history satisfy the equation? | Nearby histories | Evolved motion retained |
| --- | --- | --- | --- | --- | --- |
| COL-1 | Mirror pair released from rest with a complete stationary past | ME | Solution up to first arrival at wake speed, which occurs at positive separation near $0.10301$ at $T\approx1.57264$ (measured interval certificate, independently supported). Beyond that event, excluded in every continuation class examined: finite continuous velocity in the integral and nonnegative-measure formulations, a finite jump to above wake speed, and an infinite one-sided velocity limit (derived). A restart below wake speed would need an event impulse that the equation does not supply. Sources: [stationary analysis](../collinear-research/analysis/stationary-binary-first-interval.md), [mirror obstruction](../collinear-research/analysis/mirror-close-approach-causal-root-boundary.md) | No reference beyond the event | None. No passage, bounce or repeating motion |
| COL-2 | Any attracting pair below wake speed whose first exit is speed equality at positive separation, with a regular retained partner root | ME | Excluded for finite continuous outgoing velocity (derived, self-reviewed, conditional). The jump and infinite-limit classes are not yet extended from COL-1 to this class. Source: [class obstruction](../collinear-research/analysis/collinear-review-integration-2026-10-03.md#class-level-continuous-velocity-obstruction) | No reference | None |
| COL-3 | Mirror approach held at the ceiling, with projected boundary response and zero self response | Ceiling | Solution up to coincidence, unique before contact (derived, self-reviewed). No update rule exists at coincidence. The historical event model needs two added hypotheses, admission of both sources and suppression of a frozen root, and is multivalued. Sources: [capped approach](../collinear-research/analysis/capped-incoming-segment-uniqueness.md), [ceiling assessment](../equation-variants/field-speed-ceiling/analysis/field-speed-ceiling-review-integration-2026-10-03.md) | No reference beyond contact | None |
| COL-4 | Mirror pair from a held release | Linear comparison | Numerical solution through self-root birth, a partner fold at $T\approx13.10$ and repeated wake-speed crossings (measured, independently checked). At each upward crossing two continuations exist, and the equation does not select one: one family of choices separates outward for all time, another reaches infinitely many events in a finite time (derived, independently checked). Source: [recrossing fate](../collinear-research/analysis/multiplier-free-linear-recross-fate.md) | Growing excursions measured. No cycle estimate proved | Finite numerical prefix. No return established |
| COL-5 | Mirror pair | Log | Solution up to wake-speed arrival. The same self-root obstruction holds at this response's exponent (derived). With an inclusive ceiling and projection, the capped approach reaches coincidence at $T_c/a\approx1.922$ for unit coupling, where the finite-input rule no longer applies. Source: [logarithmic encounter treatment](../collinear-research/analysis/logarithmic-collinear-manuscript.md) | No reference beyond the event | None |
| COL-6 | Mirror pair with the quadratic receiver multiplier, with or without a softened short-distance length | Quarantined | Inactive. Historical passage, turn and escape results are preserved with their limits and are not premises for any other row | Not assessed | Historical only |
| COL-7 | Reflected two-source pair off the axis, both already above wake speed | ME | Prescribed. The outgoing acceleration sum is finite on the prescribed histories (derived, independently supported). The histories are not shown to satisfy the coupled equation. Source: [speed-crossing geometry](../analysis/speed-crossing-opposing-interaction-geometry.md) | No reference | None |
| COL-8 | One architrino on a locally straight path slowing from above wake speed to below it | ME | Excluded when the opposing acceleration from all remaining rows has a finite integral: the crossing creates a new self root whose forward contribution is infinite (derived, independently adjudicated). Not a universal barrier: curved paths, jumps and non-integrable opposing contributions are outside the result. Source: [downward-crossing obstruction](../analysis/downward-wake-speed-crossing-obstruction.md) | No reference | Not applicable |

## Lattice: infinite alternating cubic checkerboard

Owner: [Lattice research](../lattice-research/priorities.md). The coupling $g$ is the owner's dimensionless interaction strength for the lattice.

| ID | Configuration | Equation | Does a history satisfy the equation? | Nearby histories | Evolved motion retained |
| --- | --- | --- | --- | --- | --- |
| LAT-1 | Checkerboard at rest, summed in eight-site blocks | ME | Solution: an exact equilibrium (derived) | Linearly unstable. One positive growth rate for the staggered mode at every coupling (derived). An unstable band of nearby wavevectors at every coupling (derived, self-reviewed, awaiting adjudication). The static receiver response has zero trace and so cannot restore in every direction. Source: [wavevector analysis](../lattice-research/analysis/checkerboard-linear-wavevectors.md) | Not applicable |
| LAT-2 | Coherent staggered branch: the two polarity sublattices move oppositely, starting from rest in the remote past, at $g=16$ | ME | Solution on its complete past up to a simultaneous first arrival at wake speed, $1191/128<t_*\le1193/128$ for the representative amplitude (derived, independently assessed). Continuation is excluded within a uniform neighborhood of the anchors. Source: [first-event proof](../lattice-research/analysis/staggered-lattice-first-event.md) | This branch is the instability of LAT-1 followed into the nonlinear regime | None beyond the event |
| LAT-3 | Two selected targets given a smooth pulse inside the checkerboard, $0<g\le16$ | ME | Forward solution from the supplied past over bounded intervals. At $g=16$ it passes four vertical turns and reaches a first wake-speed event at $87/16<t_*\le351/64$, beyond which continuation is excluded in the classes examined (derived, independently accepted). The supplied past is not itself a solution of the unforced equation. Couplings $g\ge2^{48}$ are excluded during the pulse and $16<g<2^{48}$ is unclassified. Source: [current results](../lattice-research/priorities.md#current-results) | Not a stability test: the preparation is imposed | Finite prefix |
| LAT-4 | Spatially localized disturbance with a self-consistent past | ME | Linearized equation: complete histories whose spatial tails decay faster than any power (derived, self-reviewed, awaiting adjudication). Full equation: not constructed. Source: [queue item](../lattice-research/work-queue.md#specify-a-spatially-localized-self-consistent-lattice-preparation) | Not assessed | None |
| LAT-5 | Finite cubic clusters of side $N=2,4,6$ with small circular motion at each site | ME | $N=2$: rejected (measured). $N=4$ and $6$: earlier conclusions withdrawn, because the stored history was too short to contain emissions from distant members. Source: [ladder defect](../lattice-research/analysis/lattice-review-integration-2026-10-03.md#retained-history-ladder-defect) | No reference | None |
| LAT-6 | Checkerboard in sustained periodic motion | ME | Unspecified. The infinite sum needs a stated summation rule and a convergence proof before the configuration is defined | No reference | None |
| LAT-7 | Checkerboard at rest under a neutral-cell summation | Log | Solution: equilibrium under that prescription. A fixed-source receiver is restored in every direction (derived, independently reconstructed and adjudicated). Source: [static response](../lattice-research/analysis/logarithmic-static-checkerboard-response.md) | Linearly unstable when every member responds: a growing staggered mode at every positive coupling, with a nearby band of wavevectors (derived, independently adjudicated). Fixed-source restoration and collective instability are both true; they answer different questions. Source: [collective adjudication](../lattice-research/analysis/logarithmic-collective-independent-adjudication-2026-10-03.md) | Not applicable |

## Binary: one isolated opposite-polarity pair off the line

Owner: [Binary research](../binary-research/priorities.md). $R$ is the orbit radius and $K$ the inverse-square coefficient of the pair.

| ID | Configuration | Equation | Does a history satisfy the equation? | Nearby histories | Evolved motion retained |
| --- | --- | --- | --- | --- | --- |
| BIN-1 | Antipodal uniform circle at any speed $0<v\le c_f$ | ME | Excluded: the received acceleration has a positive component along the motion (derived). Source: [review assessment](../binary-research/analysis/binary-review-integration-2026-10-03.md#disposition) | No reference | Not applicable |
| BIN-2 | Slow, nearly circular mirror pair released from a supplied past | ME | Solution on a finite long interval for speeds $v_0/c_f\le10^{-9}$: the squared slow radius grows at rate $K/c_f$ with an explicit error bound through $T=R_0c_f/(4v_0^2)$, and a circular preparation reaches more than $1.4$ times its starting radius $R_0$ (derived, independently adjudicated). A numerical run over about one revolution at larger speed agrees at leading order (measured) and is not certified by the theorem. Escape for all future time is unproved. Source: [controlled secular comparison](../binary-research/analysis/slow-binary-controlled-secular-comparison.md) | No reference: the circle is not a solution | Proved expansion on a finite interval. Fate open |
| BIN-3 | Antipodal uniform circle above wake speed, $v/c_f\approx3.0704$ | ME | Balanced (measured, independently cross-checked). Source: [circular registry](../braid-program/configurations/circular-configuration-registry.md) | Open | None |
| BIN-4 | Antipodal circle held at the ceiling with an active boundary response | Ceiling | Solution of the capped equation (derived) | Unstable within the antipodal planar class: a positive real growth rate (derived) and nonlinear departure by a checked external theorem. Source: [nonlinear instability](../binary-research/analysis/planar-circle-nonlinear-instability.md) | A supplied history at $1.001$ times the balance radius leaves the ceiling and expands through $T=1000$ (measured, floating point). Escape is not certified |
| BIN-5 | Campaign 1 grid: 27 endpoint settings, each with three prehistories and three refinements, below wake speed | ME | Not run. Deferred and blocked; no fate is booked. Source: [campaign definition](../binary-research/campaigns/campaign-1-subfield-binary.md) | Not assessed | None |
| BIN-6 | Slow circular pair | Log | The first-order push along the motion persists, with a different mean radial coefficient $K/(2c_f)$ (derived, self-reviewed). Source: [logarithmic circle response](../binary-research/analysis/logarithmic-first-order-circle-response.md) | No reference | None |

## Braid Program: rings and multi-binary assemblies

Owner: [Braid Program](../braid-program/priorities.md). A *ring* here is $2N$ architrinos equally spaced on one circle with alternating polarity. The six-member ring is also three opposite-polarity binaries sharing a center.

| ID | Configuration | Equation | Does a history satisfy the equation? | Nearby histories | Evolved motion retained |
| --- | --- | --- | --- | --- | --- |
| BRD-1 | Six-member alternating ring above wake speed, at an infinite ladder of balanced speeds labelled T02, T04 and onward | ME | Solution: an exact periodic circular history at each rung (computer-assisted derived, with a theorem covering the whole ladder). Around rung T04 the balance is isolated against small changes of radius and phase. Source: [planar campaign foundation](../braid-program/campaigns/planar-three-binary-work-queue.md#accepted-foundation) | Rung T02 has growing modes in the common radius-and-phase sector: two positive real growth rates are certified, near $0.8596$ and $10.6584$ in units with $K=c_f=1$ (computer-assisted derived). A local nonlinear orbital instability is independently adjudicated, conditional on the frozen characteristic premises. Complete coupled ancient histories depart in the common in-plane class; the largest positive real root used in the construction is not identified with either recorded witness. Other rungs and other sectors are open. Sources: [characteristic evaluation](../braid-program/analysis/t02-symmetric-characteristic-independent-evaluation.md), [nonlinear connection](../braid-program/analysis/t02-admissible-nonlinear-history-connection.md), [nonlinear adjudication](../braid-program/analysis/t02-nonlinear-history-independent-adjudication-2026-10-03.md) | Released prefix to $T\approx0.0029$ (measured). One-cycle reproduction blocked |
| BRD-2 | Alternating rings with 4, 8, 10, 12 and 24 members above wake speed | ME | Balanced (measured, independently checked). Source: [circular registry](../braid-program/configurations/circular-configuration-registry.md) | Open | None |
| BRD-3 | Regular rings with any non-alternating polarity order, 4 to 12 members | ME | Excluded on $0.05\le v/c_f\le20$ (measured, bounded). Coverage questions about the scan are queued for checking | No reference | Not applicable |
| BRD-4 | Six-member ring translating along its axis | ME | Excluded for the eighteen rungs T02 to T36 at axial speeds up to $0.9c_f$ (computer-assisted derived). Source: [planar campaign foundation](../braid-program/campaigns/planar-three-binary-work-queue.md#accepted-foundation) | No reference | Not applicable |
| BRD-5 | Three binaries on orthogonal planes, equal radius and frequency, phases $120^\circ$ apart, polarity order $(+,-,+,-,+,-)$ | ME | Excluded on $0.25\le v/c_f\le12$ (derived, bounded). This does not cover the adjudicated representatives, whose polarity order and frames differ. Source: [weave exclusion](../braid-program/evidence/2026-08-29-orthogonal-plane-weave-fold-limiting-exclusion.md) | No reference | Not applicable |
| BRD-6 | Admitted six-member three-binary charts (twelve) and twelve-member two-component charts (six) | ME | Prescribed. Most frozen histories pass the non-coincidence and root-coverage gates; none has a demonstrated acceleration balance. Source: [candidate registry](../braid-program/configurations/candidate-registry.md) | No reference | None. Every row is in stasis |
| BRD-7 | Centered five-coordinate three-binary representative | ME | Prescribed start, evolved (measured) | No reference | Guarded prefix to $T=0.15$. No return |
| BRD-8 | Eight-member asymmetric counter-breathing representative | ME | Prescribed start, evolved (measured) | No reference | Bounded releases with partial turns. No complete return with valid roots |
| BRD-9 | Two demoted circular realizations and the exploratory seeds F1 to F4 and F6 | ME | Demoted rows are excluded at their stated gates. The seeds are unspecified | No reference | None |

## Photon, neutrino and quark candidates

Owners: [Photon research](../photon-research/priorities.md), [Neutrino research](../neutrino-research/priorities.md) and [Quark research](../quark-research/priorities.md). None of these owners has a retained assembly. The rows record what the prescribed constructions are known to permit or forbid.

| ID | Configuration | Equation | Does a history satisfy the equation? | Nearby histories | Evolved motion retained |
| --- | --- | --- | --- | --- | --- |
| PHO-1 | Twelve members: two coaxial six-member rings of conjugate polarity, rotating in opposite senses and translating together along the axis | ME | Prescribed. With fixed axial offsets and ordinary roots, translation at or above wake speed is excluded, each member must satisfy an axial balance identity, and equal-frequency regular hexagons admit no rigid circular correction (derived, self-reviewed). Source: [root and axial constraints](../photon-research/analysis/translating-carrier-root-and-axial-constraints.md) | No reference | None. The retained branch is missing |
| PHO-2 | Helix of nonzero radius translating at wake speed | ME | Singular: at every reception the member meets its own wake from whole periods earlier with a vanishing transmitter factor (derived, exact geometric scope) | No reference | Not applicable |
| PHO-3 | Carrier whose internal motion varies periodically while it translates | ME | Unspecified. A proposal awaiting an operator decision. Source: [queue item](../photon-research/work-queue.md#decide-whether-to-add-a-modulated-periodic-orbit-criterion) | No reference | None |
| NEU-1 | Near-photon twelve-member construction | ME | Unspecified. It inherits PHO-1's missing reference, and the assignment is guessed | No reference | None |
| NEU-2 | Prescribed six-member alternating ring below wake speed with one small radius or phase defect | ME | Prescribed comparison, not a solution. The regular ring's lowest moments vanish and the defect coefficients are derived (self-reviewed). Verification is queued. Source: [moment calculation](../neutrino-research/analysis/alternating-ring-mismatch-moments.md) | No reference | Not applicable |
| QRK-1 | Host assembly with polarity-decorated accessories: the twelve-member catalog candidate and a fourteen-member alternative | ME | Unspecified. The complete preparation is a queued specification. Source: [queue item](../quark-research/work-queue.md#specify-one-complete-quark-candidate-geometry-and-past-history) | No reference | None |
| QRK-2 | Stationary probe near a finite periodic host below wake speed, with positive clearance | ME | Prescribed host. The acceleration averaged over one host period has zero divergence, so the average offers no point that restores in every direction (derived, self-reviewed). Trapping by the oscillating part is open. Source: [probe average](../quark-research/analysis/periodic-host-probe-average.md) | No reference | None |

## Noether sea: ambient populations

Owner: [Noether sea research](../noether-sea-research/priorities.md).

| ID | Configuration | Equation | Does a history satisfy the equation? | Nearby histories | Evolved motion retained |
| --- | --- | --- | --- | --- | --- |
| SEA-1 | Dense population of scaled braids surrounding matter-containing regions | ME | Unspecified. No constituent with an established history exists, and the density, scales, correlations and past are not declared. Source: [candidate preparation](../noether-sea-research/brainstorming.md) | No reference | None |
| SEA-2 | Checkerboard used as a controlled ordered population | ME | See LAT-1. A weak-coupling collective growth rate is derived (self-reviewed). It is a lattice control, not an accepted sea timescale. Source: [weak-coupling rate](../lattice-research/analysis/checkerboard-weak-coupling-rate.md) | Unstable, as LAT-1 | Not applicable |

## What the table shows

Seven rows have a complete history that satisfies its equation or balances it: LAT-1, LAT-2, LAT-7, BIN-3, BIN-4, BRD-1 and BRD-2. A stability verdict now exists for four of them, and every verdict is unstable: the checkerboard at rest under the unchanged equation (LAT-1, whose growth LAT-2 follows into the nonlinear regime), the same checkerboard under the logarithmic response (LAT-7), the capped circle (BIN-4), and rung T02 of the six-member ring in its common radius-and-phase sector (BRD-1). The verdict is open for the other ring rungs and sectors, for the other ring sizes (BRD-2) and for the circular pair above wake speed (BIN-3). No row has a retained evolved motion that returns to its start.

Under the unchanged equation, the only solutions in this table that persist for all time are the checkerboard at rest and the circular histories above wake speed. Every configuration that starts below wake speed and has been followed far enough either reaches wake speed and meets the self-root obstruction (COL-1, LAT-2, LAT-3) or expands (BIN-2). A straight-line return from above wake speed is also obstructed under the stated condition (COL-8). That pattern is an observation about the rows above, at inferred grade. It is not a theorem that no assembly exists below wake speed, and the open rows BIN-5 and LAT-4 are the registered places where it could fail.

An unstable solution is not an excluded one. Each instability above is a statement that some small disturbances grow; none says where the disturbed history goes, and none rules out a different retained motion nearby. The cells with the most consequence are therefore the remaining ring rungs and sectors in BRD-1 and BRD-2, and the "Evolved motion retained" column, which is empty of any complete return in every row. The findings ledger rates those routes against the others.

## Coverage and maintenance

This registry was built from the owners' current tracker pages, their 2026-10-03 review assessments and the three Braid Program registries. It does not enumerate every configuration ever examined. Known omissions include the Platonic and packed-Platonic programs and the co-spherical controls in the [Braid Program queue](../braid-program/work-queue.md), the cubic and adaptive constructions in the [lattice manuscript](../lattice-research/manuscript.md), the four-member contact and positive-range fold controls named in the parent [brainstorming record](../brainstorming.md), and the dormant [ceiling history](../equation-variants/field-speed-ceiling/history/README.md). No instrument was run and no proof was rechecked to build the table; each status restates its owner.

Add a row when an owner records a configuration with a declared equation and a complete or explicitly missing history. Change a cell only when its owner changes, and link the owner passage that justifies the change. Keep the vocabulary fixed so that rows remain comparable. A row for an equation outside the baseline and the two authorized variations must say so in its Equation cell.
