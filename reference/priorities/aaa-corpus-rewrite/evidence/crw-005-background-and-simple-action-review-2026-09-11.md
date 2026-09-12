# crw-005 Background and Simple Action review — independent evidence report, 2026-09-11

## Scope, source identity, and disposition

Review date: 2026-09-11. Reviewer: Codex, independent chapter review. This is a report-only evidence record for HQ adjudication. No correction, acceptance, theory-closure, solver-certification, tracker, generated-artifact, or Git publication action was authorized or performed.

The assigned source is [Background and Simple Action](../../../../content/markdown/aaa/validation/simulations/action-energy/background-and-simple-action.md). The reviewed live snapshot measured 43 newline-terminated lines and SHA-256 `28199f92eb75f85ed2158dcbcb72a5a073d58475c081677236939afd185b22a1` with `shasum -a 256` and `wc -l`. All source references below address that snapshot. The source was already modified in the shared working tree when review began; the six-line working-tree diff was inspected and left untouched. The requested report path was absent before this write. The CRW-005 status board marked this document unread, and the queue marked CRW-005 active; those ownership checks establish review routing, not source ownership or mathematical authority.

The committed conversion history was checked only to separate inherited text from the current concurrent edit: the last committed source is `c973402b96d50e45b9bdac0da2bd680e6c26116f`, its pre-conversion parent had SHA-256 `cb31443376ddede890d28fefd9826555961cb29c3e64b52b8a3ae4110d4270ec` and 41 lines, and the conversion commit changed the source to 43 lines. This report reviews the current bytes and does not attribute any finding to that conversion.

The review read the complete assigned chapter and used the live [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md), [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md), [Delay Dynamics Energy](../../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md), and current mathematics and terminology authorities as dependency owners. Those dependency reads do not count as additional chapter reviews.

### Overall assessment

The fixed absolute-time/Euclidean background, causal-distance root condition, radial line of action, and transmitter-side weight are conditionally coherent with the live Master Equation. The displayed separation of transmitter weighting from receiver root playback is also the correct structure: $1/r^2$ is the surface-geometry factor, $W^{\mathrm{acc}}=c_f/|D_t|$ is the transmitter-time root-collapse factor, and $D_r/D_t$ is root playback rather than an additional instantaneous acceleration multiplier.

Two issues prevent the chapter from being claim-level coherent as written. First, it calls each arriving acceleration an “impulse” and says motion is inertial “between hits,” although a simple causal root can persist over a reception interval and produce continuous acceleration. Second, the chapter names $D_t$, $D_r$, and $W^{\mathrm{acc}}$ without giving the derivative definitions and regular-domain conditions needed to distinguish the Jacobian from root playback. The continuous-emission normalization and the word “action” also require explicit disposition before this can serve as a self-contained mathematical account.

Finding counts: 2 demonstrated defects; 3 open obligations or unsupported generalizations; 4 editorial/source issues. No finding is an acceptance decision or a solver result.

## Demonstrated defects

Severity convention: P1 means the wording changes the temporal support or mathematical object being described; P2 means a load-bearing specification or claim boundary is missing; P3 is editorial. Each finding is proposed for HQ adjudication only.

### D1 — “Impulse” and “between hits” misdescribe persistent causal-root branches

**Severity and category:** P1 — demonstrated temporal-support and object-type mismatch.

**Exact source references:** lines 26–36 call the hit an “acceleration impulse”; line 39 says that motion is inertial “between hits” and that mollification turns “the impulses” into short acceleration intervals; line 43 repeats the arriving-contribution picture.

**Claim grade:** Derived for the counterexample below; measured for the chapter wording by complete numbered reading. The live Master Equation calls the object at a reception event a per-hit acceleration contribution. It reserves “finite impulse” for a time-integrated velocity change through a qualified caustic transit, not for every regular causal-root row.

**Finding:** A causal hit is indexed by an emission root at a receiver event, but the same simple root may continue as $T_r$ varies. Then the receiver has an active hit at every reception time in an interval, so there is no inertial gap between isolated impulses. Mollification gives a finite-width approximation to the causal surface or root-supported law; it does not generally turn a persistent branch into a short pulse.

**Independent known-case check:** In normalized units $c_f=1$, prescribe a stationary transmitter $\mathbf X_t(T)=(0,0,0)$ and a stationary receiver $\mathbf X_r(T)=(1,0,0)$. For every reception time $T_r$ in the chosen window, $T_t=T_r-1$ satisfies the causal condition, $D_t=D_r=1$, and $W^{\mathrm{acc}}=1$. The canonical per-hit acceleration is therefore the same nonzero vector at every reception time, up to the coupling and polarity coefficient. This is a prescribed-history local check, not a coupled evolution or stability claim.

**Smallest repair or disposition:** Replace “acceleration impulse” with “per-hit acceleration contribution.” Replace “between hits” with “outside the support of all active causal-root branches” or, if the intended model is discrete, state and prove a restriction to isolated root events. Reserve “impulse” for an explicitly integrated $\Delta\mathbf V=\int \mathbf A\,dT_r$ over a declared transition or caustic window. If $\eta$ is retained, define the finite-width causal-surface prescription and its weak/integrated limit separately.

**Operator-checkable falsifier:** An explicit chapter hypothesis that excludes any root branch persisting over a reception interval, together with a defined mollified law whose support is provably short in reception time, would remove the demonstrated mismatch. The stationary prescribed history above would also have to be shown outside the chapter's claimed domain.

### D2 — The transmitter-side Jacobian and receiver playback are not locally specified

**Severity and category:** P2 — demonstrated load-bearing definition omission.

**Exact source references:** lines 14 and 36 introduce surface density and the weight $W^{\mathrm{acc}}=c_f/|D_t|$; line 36 assigns different roles to $D_t$ and $D_r$; line 39 uses $W^{\mathrm{acc}}/r^2$ as the acceleration scale. No displayed equation in the chapter defines $D_t$, $D_r$, or $dT_t/dT_r$.

**Claim grade:** Measured for the absence of local definitions by the full 43-line read; derived for the required distinction by differentiating the chapter's causal condition. The current [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#transmitter-side-roots-acceleration-weight-and-action-residual) and [mathematics style guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md#master-equation-of-motion-eom-line-of-action-with-transmitter-side-acceleration-weight) define the missing objects, but a dependency owner does not make the assigned chapter's formula self-reconstructing.

**Finding:** With $g(T_r;T_t)=r(T_r;T_t)-c_f(T_r-T_t)$ and reception held fixed,

$$
D_t=\partial_{T_t}g=c_f-\hat{\mathbf r}\cdot\mathbf V_t(T_t).
$$

The receiver-side quantity is

$$
D_r=c_f-\hat{\mathbf r}\cdot\mathbf V_r(T_r),
\qquad
\frac{dT_t}{dT_r}=\frac{D_r}{D_t}.
$$

The first expression is the simple-root Jacobian that collapses the emission-time measure; the second is root playback. Without both definitions, a reader cannot reproduce the claimed weight or tell whether $D_r$ is intended as a multiplier. The omission is material even though the live owner supplies the intended equations.

**Smallest repair or disposition:** Add the two definitions, the root-playback ratio, the strict-past root set, and the simple-root condition $|D_t|>0$ on the claimed regular domain. State explicitly that $W^{\mathrm{acc}}=c_f/|D_t|$ occurs once and that $D_r/D_t$ is transport metadata, not an additional instantaneous factor.

**Operator-checkable falsifier:** A local equation or an explicitly linked chapter section containing these definitions before the first load-bearing use of $D_t$, $D_r$, and $W^{\mathrm{acc}}$ would resolve this finding. A derivation in which $D_r/D_t$ changes the instantaneous per-hit acceleration under the live Master Equation would instead falsify the report's distinction.

## Open obligations and unsupported generalizations

### O1 — Continuous-emission strength and surface geometry need one explicit measure convention

**Severity and category:** P2 — open normalization and double-counting obligation.

**Exact source references:** lines 13–15 say that potential streams continuously and that each causal wake surface has density proportional to $1/r^2$ with integrated flux $q$; lines 36 and 39 then multiply the inverse-square factor by $W^{\mathrm{acc}}$.

**Claim grade:** Measured for the missing measure convention; inferred for the resulting ambiguity. The chapter does not say whether $q$ is a per-unit-absolute-time emission amplitude, a measure attached to $q\,dT_t$, or a total strength assigned to each zero-thickness surface.

**Finding:** The canonical decomposition is coherent when the continuous source is represented by an emission measure proportional to $c_f q\,dT_t$, the surface geometry supplies $1/(4\pi r^2)$, and the causal support is collapsed once in $T_t$. That collapse gives $c_f/|D_t|$. It is not a second surface-density factor, and the receiver playback ratio $D_r/D_t$ is not another arriving-strength factor. The chapter's prose leaves open a different reading in which every member of a continuous family carries a full $q$ and the wake-spacing/Jacobian correction is then applied again.

**Smallest repair or disposition:** State one normalization equation, for example a surface measure proportional to $c_f q\,dT_t/(4\pi r^2)$ on the surface $r=c_f(T_r-T_t)$, and then show the root collapse that produces $W^{\mathrm{acc}}$. Add a sentence that root membership counts each distinct active root once, while $D_r/D_t$ is retained only for root transport. Use “surface measure” or “emission measure” when no energy or momentum current has been derived.

**Operator-checkable falsifier:** A local convention defining $q$ per unit absolute-time emission and an explicit one-collapse derivation would remove the ambiguity. A calculation that independently multiplies the displayed $W^{\mathrm{acc}}$ by a wake-spacing Jacobian or by $D_r/D_t$ while claiming the canonical law would confirm the double-counting concern.

### O2 — Regular-domain and root-completeness boundaries are only gestured at

**Severity and category:** P2 — unsupported generalization at singular and history boundaries.

**Exact source references:** lines 18–25 define a causal root; line 36 mentions root transversality; line 39 invokes $\eta\to0$ and $\eta>0$ without defining a regulator, history window, positive-separation floor, inactive-root gap, or caustic route; line 40 extends the statement to self-hits when “branch conditions allow.”

**Claim grade:** Measured for the absent conditions; inferred for the burden of the broad wording. The live [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#branch-chart-closure-object) requires a declared retained history, active-root set, inactive-root gaps, transmitter-side Jacobian floor, separation or regularization data, and a singular-stratum disposition. The [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md#limits-at-singular-events) separately states that a finite-width extension must define its limiting topology and event convention.

**Finding:** The chapter's displayed sharp rule is valid only on a regular simple-root chart. Positive delay and the zero-delay exclusion do not by themselves control a tangential root with $D_t=0$, a history-window endpoint, an omitted second root, or a coincident/self-hit transition. The self-hit sentence is therefore a conditional pointer, not a complete admissibility rule, and the present chapter does not mark it as such.

**Smallest repair or disposition:** Add a compact domain sentence: strict delay, positive separation or named regularization, all-root enumeration over a declared history window, positive $|D_t|$ floor, and an explicit stop/transition route when a floor or endpoint margin fails. Either define the $\eta$-regularized law and its weak limit or remove the parameter from this introductory chapter.

**Operator-checkable falsifier:** An explicit retained-history domain and branch certificate in the assigned bytes, or a theorem showing that the chapter's hypotheses imply root completeness and $|D_t|>0$, would discharge this obligation. A positive-delay root with $D_t=0$ admitted under the present wording would confirm the reported boundary failure.

### O3 — “Simple action” is not yet a variational or energy claim

**Severity and category:** P2 — unsupported action-level generalization.

**Exact source references:** title and line 3 call the dynamics a “simple action”; headings at lines 38–40 then describe an event-driven acceleration law, not a scalar functional or its variation.

**Claim grade:** Measured for the wording; inferred for the claim-level ambiguity. The live [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md) explicitly distinguishes a scalar comparison statistic from a proved variational action, and the [Delay Dynamics Energy](../../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md#no-double-counting-rule) owner requires an independent same-record action, history, and boundary account before conservation language is promoted.

**Finding:** If “action” is ordinary prose for a simple causal response, the chapter can be coherent after saying so. If it means a variational action, line 3 overclaims: the displayed chapter contains no functional, variation, endpoint terms, or proof that variation reproduces the Master Equation. The event-driven description does not supply that missing derivation.

**Smallest repair or disposition:** Replace “simple action” with “simple acceleration rule,” or qualify it as “simple action in the event-driven sense, not a proved variational action.” Keep variational, energy, and conservation claims under their current owners until their same-record boundary terms close.

**Operator-checkable falsifier:** A declared scalar functional with its variation, endpoint/history terms, and equality to the canonical acceleration law on the same branch would support retaining variational language. No such object appears in the assigned 43 lines.

## Editorial and source issues

### E1 — Primitive mass terminology should be made layer-explicit

**Severity and category:** P3 — terminology and claim-level clarity.

**Exact source reference:** line 3 calls an architrino a “massless carrier.”

**Claim grade:** Measured for the phrase; inferred for likely reader interpretation. Current canon states that architrinos have no primitive physical mass and that mass-like response is an assembly-level or bookkeeping question.

**Smallest repair or disposition:** Use “primitive carrier with one of two polarities” or “carrier with no primitive mass property.” This preserves the intended boundary without importing the effective word “massless” into substrate ontology.

**Operator-checkable falsifier:** A current terminology owner that defines “massless” as the preferred primitive term, without implying an effective mass comparison, would support retaining it.

### E2 — The “Newton-Cartan/Galilean” label needs comparison scope

**Severity and category:** P3 — source/terminology framing.

**Exact source reference:** line 9 labels the background kinematics “Newton-Cartan/Galilean.”

**Claim grade:** Measured for the unqualified label; inferred for the risk of importing a framework as a substrate premise. The displayed product background and straight-free-path statement are native enough; the parenthetical standard-framework name is not needed to establish them.

**Smallest repair or disposition:** Remove the parenthetical or write “using Newton-Cartan/Galilean notation as a comparison.” Do not let the label carry any law, mass, force, or spacetime premise into the primitive account.

**Operator-checkable falsifier:** An explicit comparison sentence elsewhere in the chapter that limits the label to notation would resolve the issue.

### E3 — “Flux” can be read as an unproved energy or momentum current

**Severity and category:** P3 — editorial/source boundary.

**Exact source references:** lines 13–15 use “continuous causal flux,” “integrated flux remains $q$,” and “the flux never shuts off.”

**Claim grade:** Measured for the terminology; inferred for the possible over-reading. The live wake-state owner distinguishes conserved kinematic surface measure from an energy or momentum flux, which remains an open account.

**Smallest repair or disposition:** Say “continuous emission measure” or “signed surface measure” and add that this statement does not establish a wake-energy current, momentum transport, or conservation law. Retain “flux” only if its amplitude/bookkeeping meaning is defined locally.

**Operator-checkable falsifier:** A local definition of “flux” as the signed potential/emission measure, explicitly separate from energy and momentum, would remove the editorial concern.

### E4 — The final direction phrase is ambiguous relative to the displayed vector

**Severity and category:** P3 — directional wording.

**Exact source reference:** line 43 says the contribution is directed “along the radius back to its emission point,” while lines 28–31 define $\hat{\mathbf r}$ from the emission point to the receiver.

**Claim grade:** Measured for the wording; derived for the vector convention. “Back to” can be read as receiver-to-emission, opposite to the displayed $\hat{\mathbf r}$; polarity supplies the signed attraction/repulsion factor separately.

**Smallest repair or disposition:** Replace the phrase with “along the radius from the emission point to the receiver, with the polarity sign determining the signed acceleration.”

**Operator-checkable falsifier:** A rendered or surrounding sentence that unambiguously uses “back” only as a geometric reference and not as the vector direction would reduce this to style only.

## Preserved strengths and non-findings

The fixed background statement in lines 5 and 9–11 is coherent with the live absolute-time/Euclidean-void owners: the background contributes no acceleration, and free motion is straight in the declared native parameter. This is a conditional substrate statement, not a claim that observer-level effective geometry is flat.

The causal-hit equation in lines 18–25 is the correct root condition for a past emission and receiver event, provided the strict-past condition, positive wake speed, and the declared history domain are understood. It does not import a standard force law or spacetime metric.

The direction in lines 26–31 is mathematically the correct line of action from the transmitter's past emission position to the receiver's current position. The chapter correctly excludes cross products and right-hand-rule terms. The final prose ambiguity is editorial; the displayed vector itself is not a finding.

There is no demonstrated double counting in the displayed conceptual stack once its missing measure convention is supplied. Independently, for $g=r-c_f(T_r-T_t)$,

$$
c_f\int f(T_t)\,\delta(g)\,dT_t
=
\sum_{T_t\in\mathcal C(T_r)}\frac{c_f f(T_t)}{|D_t|}.
$$

The inverse-square factor comes from surface geometry, $c_f/|D_t|$ from the transmitter-time collapse, and $D_r/D_t$ only from differentiating the root family with respect to reception time. A root is counted once in the sum. This derivation supports the chapter's line 43 statement that receiver crossing rate does not multiply the arriving acceleration, subject to O1's normalization clarification.

For a concrete receiver-crossing check at $c_f=1$, take a stationary transmitter at the origin and $\mathbf X_r(T)=(2+T/2,0,0)$. At $T_r=2$, the receiver is at $r=3$ and the root is $T_t=-1$; $D_t=1$, $D_r=1/2$, $W^{\mathrm{acc}}=1$, and the canonical acceleration magnitude is $K/9$ for $K=\kappa\sigma|q_tq_r|$. Multiplying by $D_r/D_t$ would give $K/18$, which is not the canonical arriving contribution. This is a prescribed-history algebra check, not a coupled trajectory or conservation result.

No standard-physics mass law, force law, magnetic cross product, relativistic spacetime substrate, or conservation law was used as a premise. No solver certification, stable assembly claim, action closure, energy closure, or observer-level recovery follows from this review.

## Validation receipt and residual limits

### Review and repository-state checks

The complete 43-line source was read with `nl -ba`. The current source hash and line count were recorded above before writing. The source diff was inspected with `git --no-pager diff -- content/markdown/aaa/validation/simulations/action-energy/background-and-simple-action.md`; this establishes only the concurrent working-tree delta, not authorship or correctness. `git --no-optional-locks status --short --untracked-files=all` was used to identify ambient changes; no unrelated file was staged or reverted.

The textbook TOC and scene graph both contain the assigned path, and the status board lists it as the next unread Action-Energy backlog object after the already recorded earlier reviews. These checks establish routing and discoverability, not chapter validity.

### Independent mathematical check

A report-specific Node instrument was tested against its known stationary-root case before the moving-receiver case. With $c_f=1$, it confirmed the root $T_t=T_r-1$, $D_t=1$, persistent nonzero acceleration on the stationary branch, and the moving-receiver values $D_t=1$, $D_r=0.5$, $W^{\mathrm{acc}}=1$, $m=0.5$, canonical magnitude $K/9$, and extra-playback result $K/18$. The instrument is an algebra/counterexample check; it does not evolve the EOM, certify root completeness, or prove the postulated Master Equation.

No Python, solver, web search, generator write, or external source acquisition was needed. All numerical instantiations in this report use normalized wake-speed units $c_f=1$; symbolic $c_f$ is retained where the derivation depends on it.

### Report validation

A report-specific Node check passed after writing: it found the required sections, exactly the nine findings `D1`, `D2`, `O1`, `O2`, `O3`, and `E1`–`E4`, and all required reference, severity, claim-grade, smallest-repair/disposition, and falsifier fields. Fourteen local report links resolved to existing files. KaTeX 0.16.11 compiled three display expressions and 86 inline expressions with `throwOnError: true`; this is syntax compilation, not visual layout review. A direct trailing-whitespace scan passed. The final source identity check again measured 43 lines and SHA-256 `28199f92eb75f85ed2158dcbcb72a5a073d58475c081677236939afd185b22a1`, so the assigned chapter did not change during report creation. The source's tracked working-tree diff also passed `git diff --check`.

These checks establish report structure, local-link resolution, TeX syntax, whitespace, and source identity only; they do not establish mathematical correctness or resolve HQ findings.

Residual limits: no coupled trajectory was evolved; no all-root inventory, branch certificate, caustic continuation, wake-energy current, variational action, conservation identity, or solver result was certified. The report is limited to the assigned current source snapshot and the named live owners.

## Next HQ adjudication boundary

HQ should first decide whether the chapter is intended as a short conceptual primer or as a standalone simulation law. In either case, D1 should be corrected or explicitly restricted before the chapter is used to design event-driven numerical behavior. If the chapter is retained as a law-facing document, HQ must also adjudicate D2 and O1–O3: define the emission measure and one-time Jacobian collapse, state the regular branch domain, and separate ordinary event-driven root tracking from variational-action and finite-impulse claims. E1–E4 can be handled as bounded terminology/source repairs after that mathematical disposition. No source edit is authorized by this report.


## Owner-authorized implementation closeout — 2026-09-11

This section records the subsequent authorized repair of CRW-005 item 6 by Codex as implementation owner. It supersedes the report-only disposition above; the original findings, counterexamples, and snapshot references remain historical evidence. The operator authorized edits to this chapter and this evidence report only, leaving shared-board integration to HQ.

**Bounded result:** both demonstrated defects and all four editorial issues are repaired; O1's normalization ambiguity is resolved; O2 and O3 receive scope repairs while their scientific obligations remain open. This completes the bounded review/disposition work, with equation-mapping regeneration deferred as required. It establishes no theory closure, complete self-action, global delayed-history coverage, solver certification, conservation, or empirical acceptance.

### Source identity and changed files

- The input chapter measured SHA-256 `28199f92eb75f85ed2158dcbcb72a5a073d58475c081677236939afd185b22a1` by `shasum -a 256`, matching the independently reviewed snapshot. Scoped `git status` and `git diff` printed no pending changes to either authorized file before implementation.
- The original report measured SHA-256 `f015280abd2525be33806b134783530b164ac6f1eaebde126e84187ebdf9fa5d` by `shasum -a 256`. This closeout is appended; the original evidence is retained.
- The repaired [Background and Simple Action](../../../../content/markdown/aaa/validation/simulations/action-energy/background-and-simple-action.md) measures 102 lines and SHA-256 `ba279045264bbdc88d1fb033dd809029d8208e0e241fbea5db64965f8d180f87` by `wc -l` and `shasum -a 256`. Chapter line references below address these repaired bytes.
- The only files written by this implementation are that canonical chapter and this evidence report. No shared board, priority, queue, work log, dependency chapter, generated artifact, or validation instrument was edited; no staging, commit, push, regeneration, or worktree operation was performed.

The dependency review used the live Master Equation's path-history integral, emission-labeled wake state, branch chart, and canonical per-hit law. Causal Action Functional measured SHA-256 `7e585c26bd6702dcb01efbf329431ae17295d3293d19d373816c7c28657d62dd` by `shasum -a 256`. Delay Dynamics Energy was being repaired concurrently: its hash changed from `2d6184d8c36e6dd33149953b381016e764d7486f65f12c46966fbb8636d3d5e8` at initial reading to `f0bcfbb6321e6dac628568526575c71c6845d2d32ffa635b2f5a861aaaa32f54` at the dependency recheck. Its changed construction, continuation, and conservation passages were reread with `git diff`; the chapter's conditional energy statement remains compatible with them. These are snapshot identities, not authorship or scientific-acceptance claims.

### Finding-by-finding disposition

| Finding | Disposition | Implemented repair and evidence boundary | Reopening condition |
| --- | --- | --- | --- |
| D1 | ✓ Done — accepted mathematical repair | Lines 98–100 use per-hit acceleration, derive the persistent stationary prescribed-history example, define inertial motion by zero total acceleration over an interval, and reserve finite impulse for an established velocity-change integral. The undefined mollification/pulse assertion is removed. | Reopen if the example fails substitution into the causal condition and regular law, or pulse/inertial-gap claims return without a temporal-support hypothesis. |
| D2 | ✓ Done — accepted definitional repair | Lines 34–47 define the support function, both derivatives, signed playback, units, and unsigned weight. Lines 51–57 give the strict-past retained root set; lines 74–92 count each ordered root once. No nonzero receiver-factor condition is imposed. | Reopen if per-hit strength gains a playback multiplier or the derivatives disagree with the causal condition. |
| O1 | ✓ Done — accepted normalization repair | Lines 65–81 define the signed emission measure, spherical density, and single emission-time delta collapse. Line 92 declares coupling normalization and units. No double counting was demonstrated in the old formula. | Reopen if surface integration fails to return the declared measure or any geometry/Jacobian factor is counted twice. Energy-current construction remains separate. |
| O2 | ✓ Done — accepted scope repair; scientific extension open | Lines 49–61 specify compatible finite histories, finite root count, separation/Jacobian floors, endpoint margins, inactive-root coverage, self-root conditions, and the end of the regular formula at boundary failure. Lines 76–81 exclude both integration endpoints. Exact full-law equality requires zero omitted total contribution; a nonzero truncation bound supports only an approximation. | Reopen extension work with a concrete complete-root/omitted-history certificate or singular transition. A missing root, lost margin, or uncontrolled omitted contribution invalidates application on that record. |
| O3 | ✓ Done — accepted claim-boundary repair; variational and energy closure open | Lines 3 and 102 define action as causal response and distinguish the comparison statistic from a variational generator. Complete receiver/transmitter variation, self-history, endpoints, and independent conservation remain obligations under the linked owners. | Reopen stronger claims only with a complete functional variation reproducing the same acceleration and an independent history/boundary account. |
| E1 | ✓ Done — accepted editorial-only repair | Line 3 replaces primitive “massless” with a carrier having no primitive mass property. No mass map is introduced. | Reopen only if controlled terminology changes the primitive description. |
| E2 | ✓ Done — accepted editorial/source-scope repair | Lines 9–11 state absolute time, Euclidean space, and free motion directly; the unqualified external-framework label is removed. No external premise or citation is required. | Reopen if a comparison framework is introduced without stating its role and assumptions. |
| E3 | ✓ Done — accepted editorial repair coupled to O1 | Lines 65–72 replace ambiguous flux with a signed surface measure and exclude an inferred energy or momentum current. | Reopen a transport claim only after its independent current and balance are constructed. |
| E4 | ✓ Done — accepted editorial-only repair | Lines 22–32 retain the original outward unit vector and align its prose; line 92 states like-polarity outward and unlike-polarity inward acceleration. | Reopen if prose reverses the vector or omits the separate polarity sign. |

No finding was rejected or silently discarded. O2 and O3 are complete as bounded dispositions, not as scientific closures. The chapter retains its title, substrate, original causal-distance and unit-vector equations and IDs, radial response, inverse-square geometry, and transmitter-side weight.

### Mathematical self-review and separate analytical check

The editor reviewed the complete repaired chapter. A separate read-only agent independently derived the two support derivatives, playback quotient, emission-time collapse, polarity normalization, and persistent-root counterexample. Its full-document pass found one further scope error in the repair draft: a bounded omitted-history contribution had been allowed to imply exact equality. That sentence was corrected to distinguish exact zero omission from controlled approximation. The editor also made the open integration interval explicit so no endpoint, including zero-delay self coincidence, contributes silently.

The independent references are the direct change-of-variables derivation and analytic prescribed histories, not agreement between agents. The stationary unit-separation example at normalized wake speed has a root at every reception time; differentiating the causal identity gives the playback quotient. Neither calculation evolves the coupled EOM. The unchanged causal-wake test suite separately checks a known affine root and numerical fixed-reception collapse against the closed form. These checks establish local identities and examples, not the acceleration postulate as a model of nature.

### Validation commands and results

| Command or instrument | Result and scope |
| --- | --- |
| `git diff --check` | Passed with exit 0 over the shared tracked diff at the recorded run. Whitespace validation only. |
| `node scripts/validate-content.mjs --check --strict` | Passed with exit 0: 0 errors, 0 warnings, 30 notes; 391 scenes, 199 corpus Markdown files, and 1638 repository Markdown files audited at the initial repaired-chapter run. Structural validation, not a proof or solver check. |
| `node --test tests/causal-wake-update-law.test.js` | Passed with exit 0: 6 tests, 6 passed, 0 failed. Existing unmodified tests cover surface transport, normal direction, affine-root reduction and quadrature, transmitter projection, and the distinct moving-center alternative. |
| Node syntax/local-file instrument below | Initial target run passed under KaTeX 0.16.47: chapter 7 display expressions, 69 inline expressions, 11 local links; original report 3 display expressions, 86 inline expressions, 14 local links. Its known fixture passed before target access. Final appended-report verification is recorded below. This checks TeX syntax and file targets, not visual layout or link fragments. |
| `node scripts/build-equation-mapping-corpus.mjs --check` | Exit 1: five missing canonical source links and stale `content/generated/equation-mapping/corpus-equations.json`. The run discovered 199 Markdown files, 4666 display equations, 23 promoted equations, and 30191 symbol definitions. Overall generated freshness is not claimed. |

The five new chapter displays lack generated links. The check reported IDs `corpus-equation-64ee29567fb2e6aa`, `corpus-equation-6e68e862aa5efb32`, `corpus-equation-9c165fd0ccf57a2d`, `corpus-equation-ca9a7334a66b7f31`, and `corpus-equation-817cee980597181e`. The required command is `node scripts/build-equation-mapping-corpus.mjs --write`, followed by `node scripts/build-equation-mapping-corpus.mjs --check`, under authorized regeneration/publication ownership. Concurrent corpus edits can change the global registry before that run; this receipt reports observed drift rather than attributing all staleness to this chapter.

Final appended-report checks passed under KaTeX 0.16.47: chapter 7 display expressions, 69 inline expressions, 11 local file links; appended report 3 display expressions, 86 inline expressions, 20 local file links. A Node byte comparison against the hash-verified original report from `git show HEAD:<report-path>` confirmed that all original report bytes remain its prefix; the existing display parser confirmed that both original chapter equations and their IDs are unchanged. The separate read-only reviewer verified the final chapter hash above and returned a bounded disposition pass after the equality and open-endpoint corrections.

An intermediate shared-tree `node scripts/validate-content.mjs --check --strict` rerun exited 1 with 1 error, 0 warnings, and 30 notes: `reference/priorities/aaa-corpus-rewrite/evidence/crw-005-delay-dynamics-energy-review-2026-09-11.md:200` contained a Markdown link target `time` resolving to the missing path `reference/priorities/aaa-corpus-rewrite/evidence/time`. That report is outside this owner's two-file write authority and was not edited here. A subsequent `sed` read found the receipt's literal example removed during concurrent work; the final strict rerun then passed with exit 0, 0 errors, 0 warnings, and 30 notes over the same 391 scenes, 199 corpus Markdown files, and 1638 repository Markdown files. This resolves the observed shared content-check failure without changing this implementation's write scope. Generated-equation freshness remains deferred as recorded above.

The reproducible syntax/local-file instrument uses the existing display parser and Markdown link lexer. Its known fixture checks one display expression, one inline expression, one real link, and exclusion of inline code and fenced content before target access. Run the following JavaScript from the repository root through `CRW005_TARGETS=1 node --input-type=module` on standard input; omit the environment variable to run only the fixture.

```js
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import katex from "katex";
import { marked } from "marked";
import { parseCorpusDisplayEquations } from "./scripts/build-equation-mapping-corpus.mjs";
function scan(sourcePath, source) {
  const displays = parseCorpusDisplayEquations(sourcePath, source);
  const lines = source.split("\n");
  for (const b of displays) for (let n=b.startLine-1;n<b.endLine;n++) lines[n]="";
  let fence=null;
  const text = lines.map(line => {
    const m=line.match(/^\s*(\x60{3,}|~{3,})/);
    if (m) { fence=fence ? null : m[1][0]; return ""; }
    return fence ? "" : line.replace(/(\x60+)[\s\S]*?\1/g,"");
  }).join("\n");
  const inline = [...text.matchAll(/(?<!\\)\$([^$\n]+?)(?<!\\)\$/g)].map(m=>m[1]);
  const links=[];
  marked.walkTokens(marked.lexer(source), token=>{if(token.type==="link") links.push(token.href);});
  return {displays, inline, links};
}
const fixture = "# Case\n\n$$\nx^2\n$$\n\nInline $y+1$ and \x60$ignored$\x60.\n\n\x60\x60\x60\n$ignored$ [code](missing.md)\n\x60\x60\x60\n\n[real](AGENTS.md)\n";
const known=scan("case.md",fixture);
assert.deepEqual(known.displays.map(x=>x.tex),["x^2"]);
assert.deepEqual(known.inline,["y+1"]);
assert.deepEqual(known.links,["AGENTS.md"]);
for(const x of [...known.displays.map(b=>b.tex),...known.inline]) katex.renderToString(x,{throwOnError:true});
console.log("KNOWN CASE PASS: 1 display, 1 inline, 1 link; inline code and fenced content excluded.");
if (process.env.CRW005_TARGETS === "1") {
  for (const sourcePath of [
    "content/markdown/aaa/validation/simulations/action-energy/background-and-simple-action.md",
    "reference/priorities/aaa-corpus-rewrite/evidence/crw-005-background-and-simple-action-review-2026-09-11.md"
  ]) {
    const result=scan(sourcePath,fs.readFileSync(sourcePath,"utf8"));
    for (const b of result.displays) katex.renderToString(b.tex,{displayMode:true,throwOnError:true});
    for (const tex of result.inline) katex.renderToString(tex,{displayMode:false,throwOnError:true});
    let local=0;
    for(const href of result.links) {
      if (/^[a-z][a-z0-9+.-]*:/i.test(href) || href.startsWith("#")) continue;
      const target=path.resolve(path.dirname(sourcePath),decodeURIComponent(href.split("#")[0]));
      assert.ok(fs.existsSync(target),sourcePath+" => "+href); local++;
    }
    console.log(JSON.stringify({sourcePath,display:result.displays.length,inline:result.inline.length,localLinks:local,katex:katex.version}));
  }
}
```

### Unresolved obligations and HQ handoff

| Status | Obligation and existing owner | Evidence needed to reopen |
| --- | --- | --- |
| ○ Deferred — full-history application | [Master Equation branch chart](../../../../content/markdown/aaa/dynamics/master-equation.md#branch-chart-closure-object) | A complete retained-root record and omitted-history/member/endpoint control. A finite horizon alone is insufficient. |
| ○ Deferred — singular and self-action extension | [Master Equation self-hit regime](../../../../content/markdown/aaa/dynamics/master-equation.md#self-hit-regime) and [Causal Action Functional singular limits](../../../../content/markdown/aaa/dynamics/causal-action-functional.md#limits-at-singular-events) | A specified finite-width or event law, coincidence convention, regular limit, and applicable integrated transition account. Positive delay alone is insufficient. |
| ○ Deferred — variational generation | [Master Equation action residual](../../../../content/markdown/aaa/dynamics/master-equation.md#transmitter-side-roots-acceleration-weight-and-action-residual) | Complete variation, including both causal roles, admitted self-history, pair normalization, and common boundaries, equal to the acceleration on the same record. |
| ○ Deferred — energy and transport | [Delay Dynamics Energy](../../../../content/markdown/aaa/validation/simulations/action-energy/delay-dynamics-energy.md#accepted-construction-routes) | An independent wake/history/boundary construction and balance. A kinematic measure or work-defined constant total is insufficient. |
| ○ Deferred — generated links and registry | Existing equation-mapping generator | The recorded write/check pair under explicit regeneration or final publication authority. No generator write occurred here. |
| ○ Not done here — shared record integration | HQ's CRW-005 record | HQ can mark item 6 complete at bounded review/disposition level using this receipt. Shared-board edits remain outside this implementation's authority. |

There is no decision needed from the operator to complete this authorized repair. The next recommended action is HQ integration of this receipt; scientific extensions remain with their current owners and require the evidence above.
