Closure goal:
Establish the narrowest defensible proof ladder in place of the invariant-cell-first proposal: certify a relative-periodic point in one regular delayed-history return chart, lift it through controlled refinement, continue it over drift only when a branch is needed, and test stability or basin size only as separate stronger claims.

# Research Findings And Proposed Changes: Relative-Periodic Existence Before Invariant-Cell Or Coframe Claims

## Research Framing And Status

- **Date:** 2026-07-28
- **Artifact type:** research findings and proposed changes
- **Review lens:** Henri Poincare-style sections, return maps, relative-periodic orbits, continuation, root itineraries, bifurcations, Floquet theory, and qualitative dynamics
- **Research basis:** the mathematical brief and its validated-numerics implications are synthesized by finding; prompt text, response dialogue, and unreceived conclusions are omitted
- **Claim authority:** derived distinctions, conditional validated-numerics statements, and proposed theorem targets
- **Promotion classification:** priority-only
- **Not established:** a source-backed translating branch, an invariant positive-width set, a stable branch, a positive-measure basin, accepted coframe extraction, or Lorentz recovery

Plainly: this document corrects the order and names of the proposed proof objects. It does not report that the EOM solver has found or validated the translating branch.

## Overall Finding

The minimum honest finite-memory existence object is a **validated relative-periodic point enclosed by a validation box**. The interval box is part of the proof machinery; it is not an invariant cell merely because it has positive width.

At fixed memory level $N$ and drift $u$, the reduced return problem is

$$
F_{N,u}(x)
=
P_{N,u}(x)-g\mathbin{\cdot}x
=
0,
$$

where $P_{N,u}$ is the first-return map on a declared regular section chart and $g$ contains only verified neutral symmetries, including any allowed label permutation.

Plainly: the first question is whether one complete delayed history returns to the same physical history after genuine neutral motions are removed. The box helps prove that one returned history exists; it does not say that every history in the box stays there.

The proposed support hierarchy must therefore be kept explicit:

| Object | Minimum statement | What it does not establish |
| --- | --- | --- |
| Validation box | A root operator for $F_{N,u}=0$ encloses a zero in $B_{N,u}$ | Forward invariance, attraction, or basin size |
| Validated relative-periodic point | A zero $x^\ast_{N,u}\in B_{N,u}$ exists, with uniqueness only under an additional uniqueness bound | Persistence as $N$ or the memory window changes |
| Isolating neighborhood | The maximal invariant set in the neighborhood lies in its interior | A unique periodic orbit or attraction |
| Trapping region | $P_{N,u}(B)\subset\operatorname{int}(B)$ | Convergence to one orbit without a contraction or comparable argument |
| Validated branch segment | Relative-periodic points continue over a declared drift interval with consistent charts and labels | Stability or positive-measure basin |
| Locally attracting branch | All nonsymmetry return directions contract under a validated local estimate | A global basin or a coordinate-independent basin measure |

Plainly: these objects answer different questions. A point proves existence, a trapping region keeps nearby states inside, a branch follows solutions as drift changes, and a stability proof shows nearby states approach the branch.

## Claim Map

- **Derived result:** a Krawczyk or interval-Newton operator must act on the square residual $F_{N,u}$, not on the return map $P_{N,u}$ by itself.
- **Derived result:** a root enclosure for $F_{N,u}=0$ does not imply $P_{N,u}(B_{N,u})\subseteq B_{N,u}$.
- **Derived result:** positive interval width is a numerical enclosure property, not evidence of a positive-measure invariant set or basin.
- **Derived result:** only exact symmetries of the complete delayed dynamics may be quotiented from the return problem.
- **Derived result:** rows needed to determine the next return belong in the state or must be rigorously reconstructible from it; diagnostic coframe and comparison rows remain downstream.
- **Proposed innovation:** separate the current combined invariant-cell/coframe target into regular-chart existence, full-history refinement, drift continuation, stability, and downstream extraction stages.
- **Plausible inference:** uniform root-chart margins, compact reconstructed histories, consistent return operators, and vanishing tail error can support a finite-memory-to-full-history convergence theorem.
- **Unresolved question:** the correct full-history topology, reconstruction maps, tail norm, exact neutral symmetry group, and independently validated derivative bounds.

Plainly: the logical corrections are firm, but the actual branch still depends on mathematical and numerical objects that have not yet been built.

## Finding 1: The First Accepted Object And Its Exact Theorem

Let $B_{N,u}\subset\mathbb R^m$ be a closed interval box in local coordinates on a reduced transverse section. Assume:

1. $F_{N,u}:U\to\mathbb R^m$ is continuously differentiable on an open set $U\supset B_{N,u}$;
2. the same first-return event, root chart, boundary-memory convention, and quotient action define $F_{N,u}$ throughout the box;
3. $[DF_{N,u}(B_{N,u})]$ is a validated interval enclosure of every Jacobian in the box;
4. $\bar x\in B_{N,u}$ is a center point and $C$ is a nonsingular approximate inverse;
5. the Krawczyk operator

$$
\mathcal K_{F_{N,u}}(\bar x,B_{N,u})
=
\bar x
-
C F_{N,u}(\bar x)
+
\left(
I-C[DF_{N,u}(B_{N,u})]
\right)
\left(
B_{N,u}-\bar x
\right)
$$

satisfies

$$
\mathcal K_{F_{N,u}}(\bar x,B_{N,u})
\subset
\operatorname{int}(B_{N,u}).
$$

Plainly: the calculation starts near an approximate returned history, uses $C$ as an approximate inverse Jacobian, encloses every allowed derivative across the box, and proves that the corrected possibilities land strictly inside the same box.

Under those hypotheses, the inclusion supplies an existence certificate for a zero of $F_{N,u}$ in $B_{N,u}$. A transparent sufficient uniqueness condition is

$$
q
=
\sup_{A\in[DF_{N,u}(B_{N,u})]}
\left\|
I-CA
\right\|
<
1.
$$

If this bound is validated in one declared operator norm, two distinct zeros $x$ and $y$ would obey

$$
\|x-y\|
\le
q\|x-y\|,
$$

which forces $x=y$.

Plainly: the inclusion proves that a returned point exists. The extra contraction bound says the root equation cannot have two different solutions in the same validation box.

The accepted name at this stage should be **validated finite-memory relative-periodic point**, with $B_{N,u}$ called its **validation box**. “Invariant cell” should be reserved for an explicitly defined set-level invariance statement.

- **Claim grade:** conditional derived result in the declared finite-memory chart.
- **Falsifier:** any failure of differentiability, chart regularity, interval inclusion, or the stated uniqueness bound invalidates the corresponding conclusion.

## Finding 2: Root Enclosure Does Not Prove Invariance Or Stability

Consider the scalar return map

$$
P(x)=2x,
\qquad
F(x)=P(x)-x=x,
\qquad
B=[-1,1].
$$

With $\bar x=0$ and $C=1$,

$$
\mathcal K_F(\bar x,B)=\{0\}
\subset
\operatorname{int}(B),
$$

so the unique fixed point is validated. Nevertheless,

$$
P(B)=[-2,2]\not\subset B,
$$

and the fixed point is unstable because $P'(0)=2$.

Plainly: the root proof correctly finds the fixed point at zero, while nearly every nearby point doubles its distance and leaves the box. This one example separates point existence, forward invariance, and attraction.

Positive width of $B$ changes none of these conclusions. It records a nonzero numerical enclosure around the point, not a positive-width family of solutions and not a basin with positive measure.

- **Claim grade:** derived counterexample.
- **Falsifier:** none within the stated map; the example directly disproves any general implication from root enclosure to trapping or stability.

## Finding 3: Relative Symmetry Requires A Slice Or An Augmented System

There are two valid formulations of the relative-periodic problem.

The reduced-return formulation fixes a transverse section and enough phase or slice conditions to remove every verified continuous neutral direction. It then solves

$$
\widetilde P_{N,u}(\widetilde x)
-
\widetilde x
=
0
$$

in the reduced coordinates.

The augmented-flow formulation retains the return time $\tau$ and group parameters $\theta$ as unknowns:

$$
\Phi_{N,u}^{\tau}(x)
-
g(\theta)\mathbin{\cdot}x
=
0,
\qquad
\psi(x)=0,
$$

where $\psi$ supplies the section and phase conditions needed to make the augmented system square and remove the neutral degeneracy.

Plainly: one may remove neutral motions before building the return map, or solve for those motions together with the returned history. Either way, every removed degree of freedom needs an explicit condition so an unstable direction cannot disappear under the label “symmetry.”

A candidate action $g$ is admissible only if it is an exact equivariance of the complete finite-memory dynamics and its boundary convention:

$$
\Phi_{N,u}^{t}\!\left(g\mathbin{\cdot}x\right)
=
g\mathbin{\cdot}\Phi_{N,u}^{t}(x).
$$

The same action must transform paths, root identities, wakes, phases, boundary memory, and any dynamical Noether sea state. A coordinate convenience or fitted alignment is not enough.

Plainly: translating, rotating, phase-shifting, or relabeling the visible positions is neutral only if the entire stored delayed state evolves in exactly the transformed way.

A false quotient can hide instability. For

$$
P(q,s)
=
\left(
\frac12 q,\,
2s
\right),
$$

incorrectly quotienting $s$ as a neutral symmetry leaves only the multiplier $1/2$ and produces a false stability verdict. The full map has the unstable multiplier $2$.

Plainly: deleting the expanding coordinate makes the reduced map look attractive even though the full state moves away. This is the exact failure the quotient declaration must prevent.

- **Claim grade:** derived construction requirement and counterexample.
- **Falsifier:** failure of full-state equivariance, loss of slice transversality, or an omitted nonneutral multiplier invalidates the reduced return claim.

## Finding 4: The Section Must Contain Every Evolution-Defining Row

The minimum state is determined by causality, not by the current report layout. A coordinate or enclosure belongs in the return state when changing it while holding the others fixed can change the future path, the causal-root sequence, the first-return event, or the return time.

| Class | Required treatment |
| --- | --- |
| Path history | Retain positions and velocities over the declared memory window, or a basis/collocation representation with a validated reconstruction error |
| Active causal roots | Retain or reconstruct the active emission-time branches, root identities, and event ordering |
| Wake and boundary memory | Retain every stored wake or boundary quantity that enters later acceleration contributions |
| Phase and orientation | Include them when they affect the evolution or the section event; otherwise derive them from the returned state under a proved map |
| Noether sea state | Include the local dynamical state when it affects the return; if frozen as a boundary parameter, declare and hold it fixed |
| Raw identities | Carry them on a labeled cover or equivalent continuation record so root strands can be compared across the return |
| Energy, momentum, angular momentum, response-center, coframe, and comparison rows | Compute afterward when they are functionals of the validated state and do not feed the evolution or event rule |

Plainly: the return map must know everything needed to predict the next return. Measurements computed from the returned history belong after the existence proof unless the dynamics itself consumes them.

If a supposedly downstream row enters acceleration evaluation, root selection, a boundary update, or the section definition, it becomes part of the state obligation. It cannot be omitted and later reconstructed from the orbit without proving that reconstruction is unique and dynamically faithful.

- **Claim grade:** derived Markov-closure requirement for the declared finite-memory approximation.
- **Falsifier:** two states identical in the proposed section coordinates but producing different next returns show that the section state is incomplete.

## Finding 5: Raw Identity Is A Continuation Problem, Not A Label List

Inside one regular root chart, each active root needs an interval enclosure that continues continuously over the validation box. The chart should carry uniform margins such as

$$
\inf_{B_{N,u}}
\left|
D_{t,ij}
\right|
\ge
\eta_D
>
0,
\qquad
\inf_{B_{N,u}}
r_{ij}
\ge
\eta_r
>
0,
$$

together with a positive separation between distinct event times and a positive section-transversality margin.

Plainly: active causal roots must stay simple, interacting points must stay separated, events must not exchange order invisibly, and the trajectory must cross the section rather than graze it.

For inactive candidate intervals, interval exclusion must show that no undeclared causal root enters. If a root birth, death, fold, collision, or event-order exchange occurs, the single-chart certificate stops unless a separate validated event-continuation theorem handles that transition.

Raw identity should therefore be represented by:

1. a labeled local cover over $B_{N,u}$;
2. disjoint active-root enclosures and a validated symbolic itinerary;
3. continuation of every label and root strand through one return;
4. a declared permutation $\pi$ when physically interchangeable labels return permuted;
5. the action of $\pi$ on every retained row.

Plainly: the proof follows each history strand and causal-root event from the start to the return. A genuine allowed swap is recorded as part of the return symmetry; an undeclared swap or strand collision is a chart failure.

The return condition becomes

$$
P_{N,u}(x)
=
g_{\mathrm{trans}}
g_{\mathrm{phase}}
g_{\mathrm{rot}}
\pi
\mathbin{\cdot}x,
$$

with only the factors actually proved neutral retained in the product.

Plainly: the orbit may return translated, phase-shifted, rotated, or permuted, but the certificate must state exactly which transformations occurred and why each leaves the complete dynamics unchanged.

- **Claim grade:** proposed certificate construction grounded in derived root-regularity requirements.
- **Falsifier:** a vanishing root margin, overlapping root intervals, undeclared event reorder, or inconsistent permutation action invalidates the chart and its return residual.

## Finding 6: Finite-Memory Existence Is Not Full-History Existence

Let $R_N:\mathcal H_N\to\mathcal H$ reconstruct a finite-memory state in the declared full-history topology. A plausible lifting theorem requires a sequence of validated points $x_N$, return times $\tau_N$, and symmetries $g_N$ with:

1. reconstructed histories $R_Nx_N$ uniformly bounded and precompact;
2. return times in one compact interval bounded away from zero;
3. consistent finite-memory evolution and full-history evolution, with residual $\epsilon_{\mathrm{cons},N}\to0$;
4. tail or truncation error $\epsilon_{\mathrm{tail},N}\to0$ in the chosen history norm;
5. uniform section-transversality, collision, and root-simplicity margins;
6. compatible raw-label and root itineraries;
7. convergence, or compactness, of the allowed symmetry parameters.

A convergent subsequence would then have

$$
R_{N_k}x_{N_k}
\longrightarrow
x_\ast,
\qquad
\tau_{N_k}
\longrightarrow
\tau_\ast,
\qquad
g_{N_k}
\longrightarrow
g_\ast,
$$

and the consistency and tail limits would be used to prove

$$
\Phi^{\tau_\ast}(x_\ast)
=
g_\ast\mathbin{\cdot}x_\ast
$$

for the full delayed system.

Plainly: increasingly detailed finite-memory orbits must stay in a compact family, approximate the same full dynamics ever more accurately, retain the same event structure, and lose their omitted tail. Only then can a subsequence converge to an actual full-history return.

The current refinement suggestions

$$
h\to\frac h2\to\frac h4,
\qquad
N\to N+1\to N+2,
\qquad
W\to2W
$$

are useful diagnostics, but they become a proof route only after the reconstruction maps, full-history norm, consistency estimate, compactness argument, and tail bound are declared.

Plainly: similar coordinates at three resolutions are not by themselves a convergence theorem. The proof must say what “close” means in history space and why omitted memory cannot change the limit.

- **Claim grade:** plausible inference and proposed theorem route.
- **Falsifier:** loss of precompactness, a nonvanishing tail bound, collapse of a regularity margin, incompatible root itineraries, or drift of the return time without a convergent subsequence blocks the lift.

## Finding 7: A Point, A Drift Branch, And A Stable Branch Need Different Evidence

A validated point at one drift $u_0$ is not yet a branch. A validated branch segment over $u\in I$ requires:

1. a parameterized square residual $F_N(x,u)=0$;
2. a nonsingular bordered Jacobian or another validated continuation condition;
3. overlapping validation boxes that cover the declared interval $I$;
4. compatible sections, root charts, labels, and quotient actions on overlaps;
5. full-history refinement or a clearly limited finite-memory claim at each covered segment.

Plainly: one operating point proves one operating point. A branch requires a continuous chain of proved points as drift changes, with no hidden chart reset or label reassignment between neighboring boxes.

The downstream support requirement should follow the claim:

- Pointwise row extraction at one drift needs a validated full-history relative-periodic point at that drift.
- Drift derivatives, a moving coframe family, or transport comparisons need a validated branch segment.
- A robustness or attraction claim needs a separate stability or trapping proof.
- A positive-measure basin claim additionally needs a declared reference measure and a proved or bounded convergent set.

Plainly: the proof program should ask only for the strength its next claim consumes. Requiring an invariant cell before a pointwise extraction is stronger than necessary, while using one point for a drift-family transport law is too weak.

- **Claim grade:** derived claim-to-evidence mapping.
- **Falsifier:** any downstream calculation that uses neighboring drift values, derivatives, or transport while only one drift point is validated shows that the support claim is underspecified.

## Finding 8: Stability Starts After Existence And Must Retain Every Nonsymmetry Direction

For a validated reduced return point $\widetilde x_\ast$, a direct local-attraction certificate is a closed neighborhood $U$ in a complete reduced chart satisfying

$$
\widetilde P_N(U)
\subset
U,
\qquad
\sup_{x\in U}
\left\|
D\widetilde P_N(x)
\right\|
\le
q
<
1.
$$

This proves that the reduced return map is a contraction on $U$, so the fixed point is unique there and every point in $U$ converges under repeated returns.

Plainly: the map keeps nearby histories in the neighborhood and shrinks their separation on every cycle. That supplies both a local trapping set and a concrete part of the basin for the finite-memory system.

Other methods have narrower or different conclusions:

| Method | Smallest legitimate conclusion |
| --- | --- |
| Validated Floquet multipliers | Linear asymptotic stability or instability of the proved point after exact neutral multipliers are removed |
| Cone conditions | Validated stable and unstable direction separation, with hyperbolicity conclusions under the stated cone invariance |
| Graph transform | Existence of local invariant stable or unstable manifolds under its contraction hypotheses |
| Conley index | Existence and qualitative information for an isolated invariant set; not attraction or unique periodicity by itself |

Plainly: Floquet data classify the linearized return, cone and graph methods control invariant directions and manifolds, and a Conley index detects isolated invariant dynamics. None may be used to describe an orbit that has not first been proved to exist.

A finite-memory stability verdict does not automatically lift to full history. The derivative or monodromy tail must also be bounded so omitted history modes cannot contain an unstable direction.

- **Claim grade:** derived finite-dimensional stability criteria and a full-history caveat.
- **Falsifier:** any nonsymmetry multiplier with modulus at least one, a failed cone or contraction bound, or an uncontrolled tail spectrum invalidates the corresponding attraction claim.

## First Decisive Theorem Target

The narrowest useful next theorem is:

> **Regular-chart finite-memory relative-periodic-point theorem.** At one predeclared drift $u_0$ with $c_f=1$, construct a transverse section, exact neutral-symmetry slice, complete evolution-defining finite-memory state, and one regular labeled root chart. If the square residual $F_{N,u_0}$ is continuously differentiable on $B_{N,u_0}$, its interval Jacobian is valid, and the Krawczyk inclusion lies in the interior of the box, then a finite-memory relative-periodic point exists in the box. If the declared uniqueness bound also satisfies $q<1$, that point is unique in the box.

Plainly: before attempting coframe extraction or a drift family, prove one returned delayed history in one chart at one drift. The theorem deliberately claims neither full-history persistence nor stability.

The first proof step is to make $F_{N,u_0}$ square and single-valued: declare the section, phase conditions, exact quotient action, evolution-defining state, first-return convention, root intervals, and regularity margins. Only then is an interval root operator meaningful.

The decisive falsifier is equally narrow: if no neighborhood of the candidate can keep one return event, one regular root itinerary, a transverse section, and a nonsingular reduced Jacobian under refinement, then this certificate route fails at the candidate. Coframe arithmetic at that row cannot repair the failure.

- **Claim grade:** proposed theorem target.
- **Falsifier:** failure of any stated chart, differentiability, interval-inclusion, or refinement prerequisite.

## Proposed Changes

**Readiness gate.** Changes 1–5 are retained as terminology, theorem-domain,
proof-order, identity, and overclaim corrections. They do not assert that a
finite-memory point, full delayed history, drift branch, or stable set exists.
The executable contract migration is deferred under
[Disposition of Open Questions](#disposition-of-open-questions).

**Applied disposition, 2026-07-29.** Changes 1–5 now live in the `S_eq`,
shared-record, equation-detail, and score-ladder owners at terminology and
theorem-boundary authority only. Change 6 and every open question are recorded
in the canonical [July 28 translating-binary review action
register](../../../priorities/equation-mapping/work-queue.md#july-28-translating-binary-review-action-register).
This packet is reference evidence only and owns no outstanding action.

### Change 1: Correct The Support Terminology

Replace the current minimum-support phrase “positive-width invariant cell” with:

- **validation box** for $B_{N,u}$ used by a root-enclosure theorem;
- **validated relative-periodic point** for the enclosed zero;
- **trapping region** only when $P_{N,u}(B)\subset\operatorname{int}(B)$ is separately proved;
- **validated branch segment** only after continuation over a declared drift interval;
- **locally attracting branch** only after a separate reduced and full-history stability argument.

Plainly: names should report what was proved, not the strength hoped for later.

### Change 2: Apply The Interval Operator To The Return Residual

Replace schematic uses of

$$
\mathcal K_{P_N}(B_N)
\subset
B_N
$$

with a declared operator on the square group-reduced residual:

$$
\mathcal K_{F_{N,u}}(\bar x,B_{N,u})
\subset
\operatorname{int}(B_{N,u}),
\qquad
F_{N,u}(x)=P_{N,u}(x)-g\mathbin{\cdot}x.
$$

Plainly: Krawczyk and interval-Newton methods solve equations. The equation is “returned state minus symmetry-adjusted starting state equals zero,” not the return map by itself.

### Change 3: Split The Current Combined Certificate Into Ordered Stages

Use this order:

1. complete finite-memory state and regular labeled root chart;
2. section, first-return convention, and exact symmetry quotient;
3. interval enclosure of one finite-memory relative-periodic point;
4. controlled finite-memory-to-full-history lift;
5. validated continuation over drift when a branch-family claim needs it;
6. stability, trapping, or basin analysis only at the strength claimed;
7. source-bound clock, envelope, two-way signal, energy, momentum, phase, and Noether sea row extraction;
8. coframe and transport tests on the same validated point or branch segment.

Plainly: each stage consumes the previous one. A later arithmetic match cannot substitute for a missing return point, and a point at one drift cannot substitute for a branch family.

### Change 4: Replace Raw-Label Status With A Dynamic Identity Argument

The first retained-row obligation should require the labeled cover, root itinerary, allowed permutation, and overlap continuation described above. A concrete row identifier and source path are provenance, not proof that the same delayed strands returned.

Plainly: durable labels help locate evidence, but the dynamics must show why those labels still refer to the same history and root strands after one cycle.

### Change 5: Keep Stability And Basin Language Out Of The Existence Stage

Do not require or claim positive basin measure merely because the validation box has nonzero coordinate width. Introduce a measure only if a later basin claim needs one, and then declare the section, quotient, measurable structure, reference measure, and basin classifier.

Plainly: this avoids turning a numerical box size into a physical or probabilistic claim.

## Deferred Or Rejected Moves

- **Deferred with blocker:** full-history branch acceptance, until the history topology, reconstruction, compactness, consistency, and tail estimates are defined.
- **Deferred with blocker:** drift-family coframe transport, until a validated branch segment exists.
- **Deferred with blocker:** local stability, until the relative-periodic point exists and every nonsymmetry direction, including the retained tail, is controlled.
- **Rejected:** treating positive interval width as invariant-set width or basin measure.
- **Rejected:** treating reciprocal clock/envelope arithmetic as evidence of branch existence.
- **Rejected:** quotienting a direction because removing it improves the return or stability residual.
- **Priority-only:** migration of the existing equation-mapping producer, fixtures, score ladder, and terminology.

Plainly: the valuable outcome is a sharper proof target, not a new accepted physics result. The current score and branch status do not move.

## Disposition of Open Questions

### Deferred Proposed Change

| Deferred item | Live owner and status | Reason it is not apply-now | Next acceptance test and backlink |
| --- | --- | --- | --- |
| Change 6 — migrate invariant-cell-first terminology and $\mathcal K_{P_N}$ machine contracts across equation-mapping documents, the producer, fixtures, and same-branch checks | [`EQ-02` through `EQ-04` `S_eq` retained-domain evidence object](../../../priorities/equation-mapping/eq-02-04-s-eq-retained-domain-evidence-object.md), status `draft`; work-queue owner `EQM-001`, status `Queued` | This is a coupled executable migration, not a safe field rename. It must preserve current negative controls and cannot run in this no-regeneration batch. Complete-state reconstruction depends on `MEC-002` where wake state is consumed; dynamic causal-root identity and no-double-booking depend on `MEC-005`; derivative rows involving receiver/self acceleration depend on `MEC-006`. These dependencies gate only the corresponding fields, not the finite-memory theorem correction itself. | In one separately authorized migration, update the canonical source contract, producer, fixtures, and separately authored checks together; require old invariant-cell or $\mathcal K_{P_N}$ forms to fail at their intended stage, rerun check-only validation, and preserve the existing backlink from the `S_eq` owner. |

The affected live surfaces remain:

- `reference/priorities/equation-mapping/equation.md`;
- `reference/priorities/equation-mapping/equation-score-5-closure-ladder.md`;
- `reference/priorities/equation-mapping/eq-02-04-s-eq-retained-domain-evidence-object.md`;
- the retained June Kolmogorov response material as preserved by the canonical 2026-07-29 reconciliation packet;
- `scripts/equation-mapping/produce-eq02-04-coframe-extraction-certificate.mjs`;
- the associated `eq02-04-invariant-cell-coframe-source-*.v1.json` fixtures and same-branch checks.

The downstream no-retune transport question remains separately owned by
[the no-retune transport research findings](elie-cartan-eq02-04-no-retune-holonomy-guardrails-2026-07-28.md).
It must consume a validated drift family rather than stand in for one.

Plainly: the mathematical correction can be stated now. Changing the executable
contract waits for a bounded migration in which every deliberately bad fixture
still fails for the intended reason.

| Open question | Live owner and status | Next acceptance test | Routing disposition |
| --- | --- | --- | --- |
| What full-history topology and tail norm make finite-memory histories converge to an admissible delayed history? | [`EQ-02` through `EQ-04` `S_eq` retained-domain evidence object](../../../priorities/equation-mapping/eq-02-04-s-eq-retained-domain-evidence-object.md), status `draft`; work-queue owner `EQM-001`, status `Queued`; `MEC-002` is `In progress` where the topology claims a complete wake state | Declare the topology and tail norm, then prove compactness, consistency of reconstructed histories, vanishing tail error, and uniform root, section, and collision margins along refinement on the state components actually accepted by their owners. | Open upstream obligation. No full-history point or branch is established; prescribed finite-memory point research remains valid within its narrower domain. |
| Which reconstruction maps carry finite-memory coordinates into the complete evolution-defining state? | Same `S_eq` owner, status `draft`; `EQM-001` remains `Queued`; wake reconstruction is gated by `MEC-002`, status `In progress` | Construct source-bound reconstruction maps that recover every accepted path, root, wake, phase, boundary-memory, and Noether sea coordinate needed for the next return, with refinement-stable enclosure error. | Open. Diagnostic or comparison rows cannot substitute for state coordinates, and an unresolved wake representation cannot be filled by a fixture field. |
| What is the exact neutral symmetry group of the complete delayed dynamics? | Same `S_eq` owner, status `draft`; `EQM-001` remains `Queued`; root-labeled neutrality uses `MEC-005`, status `Queued`, where provenance is part of the claim | For each proposed generator, prove neutrality against the complete delayed state, add one pinning condition per admitted generator, and require the fake-symmetry negative control to fail before interval inclusion is accepted. | Open. A quotient chosen because it improves a residual remains barred. |
| Can the derivative and return-map enclosures be validated independently on one regular labeled chart? | Same `S_eq` owner, status `draft`; `EQM-001` remains `Queued`; receiver/self acceleration-gradient rows use `MEC-006`, status `Awaiting verification` | Build the square residual $F_{N,u_0}$ on one predeclared chart, enclose its complete derivative with a separately authored reference or theorem, and require the Krawczyk inclusion and any stated uniqueness bound to pass while itinerary-straddle controls fail. | First finite-memory existence test; no positive-width invariant-set claim follows. MEC-006 gates only the derivative terms it actually owns. |
| Does the finite-memory point continue to a full-history drift branch with dynamic strand identity? | [`EQ-02` through `EQ-04` translating-binary shared-record instantiation](../../../priorities/equation-mapping/eq-02-04-translating-binary-shared-record-instantiation.md), status `draft`; `EQM-001` remains `Queued`; full root provenance uses `MEC-005`, status `Queued` | After the full-history point is validated, continue it over a declared drift interval with one certified event/root itinerary, overlap continuation, allowed permutation fixed in advance, and no duplicated root ownership. | Deferred until point existence and the full-history lift pass. |
| Is the resulting point or branch stable, trapping, or associated with a basin? | Same translating-binary owner; deferred within the queued `EQM-001` lane | Only after existence, validate every nonsymmetry return direction and the retained-tail spectrum using the theorem appropriate to the claim: multipliers, cone conditions, graph transform, trapping inclusion, or a declared basin measure. | Deferred. Validation-box width grants none of these claims. |

Plainly: the open questions remain in the existing `EQM-001` lane and its two live priority owners. The routing changes no status and preserves the strict order from point existence through full-history persistence, continuation, and only then stability.

## Compact Research Conclusions

1. The first accepted finite-memory object should be called a **validated relative-periodic point**, enclosed by a **validation box**.
2. A Krawczyk inclusion for $F_{N,u}=0$ proves point existence under the declared regularity hypotheses; uniqueness requires the chosen uniqueness condition, stated explicitly.
3. The inclusion does not prove forward invariance, attraction, a positive-width solution family, or basin measure.
4. The symmetry quotient must be exact on the complete delayed state and fixed by a slice or augmented system.
5. The section state must contain every path, root, wake, phase, boundary, and Noether sea coordinate that can change the next return.
6. Raw identity requires a labeled cover, validated root itinerary, and declared allowed permutation.
7. Full-history acceptance requires compactness, consistency, vanishing tail error, and uniform root and section margins.
8. Drift-family coframe or transport claims require a validated branch segment, not a single point.
9. Stability begins after existence; contraction, Floquet, cone, graph-transform, and Conley methods justify different strengths.
10. The first decisive target is one regular-chart interval proof at one drift, followed by a separate full-history lift.

Plainly: prove one returned delayed history honestly, lift it to the full system, then ask for a family and stability only when the downstream claim truly needs them.
