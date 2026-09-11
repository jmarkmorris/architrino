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
