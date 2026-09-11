# crw-005: Independent attraction chapter review

Review date: 2026-09-11. Reviewer: Codex, independent chapter review. Scope: report only in the existing shared checkout; no corpus, shared tracker, generated-artifact, or Git writes are authorized.

## Source identity and review scope

The assigned source is [Attraction](../../../../content/markdown/aaa/validation/simulations/action-energy/attraction.md). Initial `shasum -a 256` measured `7c7344fa6ce56b79a0141deea6aa2882f7dcfa4fab0afe10a4782493813119b1`; `wc -l` measured 118 newline-terminated lines. All chapter line references below refer to these bytes. Full coverage means every line, including equations, equation links, setup, and deliverables, receives a disposition; it does not mean every linked owner receives a separate full review.

The review follows the live `AGENTS.md`, generated startup router, corpus-review skill and its live owner, Corpus Reviewer, and the requested Integrator Reviewer procedure. Integration and tracker edits are excluded by the explicit assignment. No other review report or reviewer conclusion was consulted. Nearby corpus pages serve as current theory and terminology owners, not as independent experimental evidence. The review's independent mathematical references are the explicit derivations and counterexamples below; generated-registry agreement is only a structural check.

## Assessment

The chapter correctly gives the attractive sign, inverse-square delayed chord, and transmitter-side acceleration weight for regular partner hits. Its relative-coordinate subtraction is correct, and the midpoint formulas are valid on a genuinely symmetric retained history. It does not import primitive mass or an instantaneous receiver-velocity multiplier. These are derived conclusions from the algebra in §Independent derivations, conditional on the postulated Master Equation; they are not experimental validation of that postulate.

The chapter is not yet a complete computational specification. It leaves its initial history unspecified, presents a single-hit vector expression as a total acceleration despite admitting multiple roots, and calls partner-only rows canonical without a self-root exclusion. It also leaves the defining transmitter derivative and the regular-domain boundary unstated. These findings do not establish that the intended initially quiescent pair develops multiple roots, self-hits, collision, or a caustic. Those are separate evolution questions.

### Findings and smallest repairs

Severity convention: P1 is high priority because the defect changes the acceleration or the problem being solved; P2 is a material definition or domain omission; P3 is an editorial correction. Every repair below is proposed only. No source repair or shared-tracker update was performed.

| ID | Severity and category | Exact chapter lines | Finding | Smallest repair |
| --- | --- | --- | --- | --- |
| F1 | P1 — demonstrated underdetermination; missing hypothesis | 3, 7, 25–27, 64, 79–80, 107–118 | Present positions and velocities do not determine the first delayed acceleration. Symmetric endpoint data alone do not keep the midpoint at rest. | Specify compatible position/velocity histories, their time domain and coverage, and reflection symmetry throughout the required past. For a release example, explicitly choose a prescribed stationary past and state the release convention. Make persistence of symmetry conditional on unique continuation. |
| F2 | P1 — demonstrated equation mismatch | 28–47 versus 66–77 | The scalar rows sum all partner roots; the vector rows contain only one root while retaining the total-acceleration labels. | Restore both partner-root sums, or label these equations as contributions from one selected root and explicitly sum them to obtain total acceleration. A single-root restriction must cover the entire relevant history, not just present speed. |
| F3 | P1 — demonstrated missing channel in the unrestricted canonical claim | 14–20, 28–51, 54–64, 116–118 | Only the other architrino appears as a transmitter. The canonical law also includes nonzero-delay same-transmitter roots when present; current rest and $H(0)=0$ do not exclude them. | State that these are the mutual partner contributions. To identify them with total acceleration, restrict the admitted history window to empty self-root sets and prove or check that condition. Otherwise include the same-transmitter sums. If the omission is an intentional comparison model, name that restriction explicitly. |
| F4 | P2 — demonstrated missing load-bearing definition | 11, 15–16, 25–27, 51 | $D_t$ and $D_{t,ab}$ are never defined in the chapter, although the acceleration depends on them. The causal sets are introduced through membership statements without an explicit strict-past/history-domain definition. | Define $D_{t,ab}=1-V_b(T_t)\operatorname{sgn}s_{ab}$, identify $a$ as receiver and $b$ as transmitter, and define the root set with $T_t<T$ and the retained-history domain. Expand DDE as delay differential equation, name $T$ as absolute time, and identify $H$ as the Heaviside step with the stated zero-delay convention. |
| F5 | P2 — demonstrated domain omission; singular continuation remains open | 7, 15–16, 24, 28–51, 64, 117–118 | The sharp formula divides by $|D_t|$ but gives no simple-root restriction or failure boundary. A mollifier width is mentioned without defining a mollified law. Positive equal-time separation and $H(0)=0$ do not regularize a positive-delay tangency. | State that the displayed law applies on a finite complete simple-root chart with positive delayed-distance and transmitter-derivative floors. Stop or use an explicitly defined regularized/transition treatment when a floor fails. Either remove the unused mollifier reference from the sharp example or define and link its distinct finite-width prescription. |
| F6 | P3 — editorial and teaching issues | 3, 5–16, 22, 24, 54, 77, 79–80, 116–118 | “Comparison” does not identify the compared model; “particle” and “charges” obscure the primitive polarity terminology. The unsigned-to-signed $r$ convention lacks an explicit ordering interval, and the central-origin section is not a heading. Objectives and deliverables repeat the plan rather than close the explanation. | Identify the model and its scope, use architrino/polarity terminology, declare $X_1>X_2$ before using signed separation and stop that coordinate chart at ordering loss, make line 79 a heading, and replace the repeated planning prose with the established result and remaining mathematical question. |

#### F1: Initial history and symmetry

Claim grade: derived. The two complete, sub-wake-speed histories in §History counterexample have the same positions and velocities at $T=0$ but give different $A_1(0)$. Using one of each breaks midpoint acceleration despite symmetric endpoint data. Thus the displayed four initial numbers do not define one DDE initial-value problem, and line 80 needs full-history symmetry. The source evidence is the full `nl -ba` inspection of lines 1–118; no history interval, history function, or release protocol appears there. This omission matters even before any singularity or high-speed episode.

The smallest repair is a concrete history declaration, not a new solver or a new validation ledger. For example, prescribe $X_1(s)=r_0/2$, $X_2(s)=-r_0/2$, and $V_i(s)=0$ for the necessary $s\le0$, then release at $T=0$. This past is preparation data; it is not a freely evolving equilibrium of two attracting architrinos. If smooth matching of acceleration is required by the selected existence theorem, the preparation/release must meet that additional compatibility condition. A finite stored history must cover every relevant emission and justify omission of older history.

Falsifier: an explicit history prescription already present in the chapter, or equality of the independently evaluated accelerations for the distinct histories below, would defeat the stated omission or counterexample. For symmetry preservation, a unique symmetric-history solution with unequal mirrored accelerations under the same complete root rules would overturn the conditional proof.

#### F2: Lost root sums

Claim grade: derived. Each vector term reduces in one dimension to exactly one scalar summand, since $s/|s|^3=\operatorname{sgn}(s)/|s|^2$ for $s\ne0$. It cannot equal a sum of several nonzero, same-sign terms. The three-root example below evaluates the scalar sum as $-385/144$ while the individual terms are $-5/4$, $-10/9$, and $-5/16$ in normalized units. No chosen single term equals the sum.

The defect is the unqualified equation labeling, not the vector algebra of a per-hit contribution. A reader may reasonably infer that the section intends a single-root illustration, but the restriction is not stated and contradicts the immediately preceding all-root scope. Add the sums or change the labels to per-hit acceleration. Restoring sums is the smaller repair if multi-root scope is retained.

Falsifier: a declared singleton-root domain covering this section, or a derivation showing that the vector expression contains every scalar contribution under its existing notation, would remove the mismatch. Merely checking one low-speed trajectory does not establish the unrestricted identity.

#### F3: Partner-only versus complete canonical acceleration

Claim grade: derived for the missing channel relative to the Master Equation; inferred that the intended chapter example may be a restricted partner-only calculation. The [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md), lines 59–77 and 89–120, sums transmitter identities as well as their causal roots. [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md), lines 3–7 and 39–41, separates partner contributions from same-transmitter feedback. [Self-interaction Switch](../../../../content/markdown/aaa/validation/simulations/action-energy/self-interaction-switch.md), lines 3–16, defines the nonzero-delay test. The chapter's rows omit those terms without declaring their absence.

For a history whose speed stays strictly below 1 on every intervening segment, the chord bound proved below rules out self-hits. That is a valid way to retain the present rows. Present speed near zero is not that bound. The self-hit counterexample supplies a simple positive-delay root even at present rest and with reflection-symmetric, separated histories. It proves a specification gap, not that the intended release evolves to that history.

Falsifier: prove that every history admitted by the chapter has empty same-transmitter root sets throughout its claimed time domain, or show the missing same-transmitter contributions are explicitly included elsewhere in its total-acceleration definition. Relabeling the equations as partner contributions also resolves the overbroad claim without a new physical hypothesis.

#### F4: Transmitter derivative and causal-set definitions

Claim grade: measured for absence of these definitions by full line-by-line reading of the 118-line chapter, and derived for the required formula by differentiating its causal constraint. The needed definition is supplied in the live [Mathematics Style Guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md#master-equation-of-motion-eom-line-of-action-with-transmitter-side-acceleration-weight), [Terminology Usage](../../../../content/markdown/aaa/archie/terminology-usage.md#transmitter-and-receiver-event-usage), and Master Equation lines 99–146. The chapter names the weight but leaves its numerical value unreconstructible locally. Equation-viewer generic symbol descriptions do not replace this derivative.

For receiver $a$, transmitter $b$, and signed chord $s_{ab}=X_a(T)-X_b(T_t)$, differentiation at fixed receiver event gives

$$
g_{ab}(T;T_t)=|s_{ab}|-(T-T_t),\qquad
D_{t,ab}=\partial_{T_t}g_{ab}=1-V_b(T_t)\operatorname{sgn}(s_{ab})
$$

Here $g_{ab}$ is the root residual and $V_b$ is the transmitter velocity at emission. The denominator measures how transmitter emission times map to arriving wake surfaces; it is not a receiver-velocity response factor. Define $\mathcal C_{a\leftarrow b}(T)=\{T_t\in I_b:T_t<T,\ g_{ab}(T;T_t)=0\}$, with $I_b$ the supplied history domain. The chapter's shorthand $\mathcal C_b(T)$ is acceptable if its receiver dependence is made explicit; renaming it is optional.

Falsifier: locating a local definition of $D_{t,ab}$ and the history domain in the reviewed bytes, or a sign error in the derivative above, would overturn the respective part of this finding.

#### F5: The sharp law has a regular domain

Claim grade: derived. At a simple root, collapsing a delta-supported history integral gives the denominator $|\partial_{T_t}g|$; at a multiple root this elementary formula is not defined. Master Equation lines 108–163 explicitly require simple roots and a positive transmitter-derivative floor. Its lines 332–411 discuss limited caustic continuation and distinguish a sharp root sum from a finite-width history integral. The nearby [regularization owner](../../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md), lines 94–100 and 162–190, likewise requires a declared history class and domain.

For a direct geometric example, fix reception at $T=0$, $X_1(0)=1$, and prescribe $X_2(s)=1+s-(s+2)^2$ near $s=-2$. Then $g(s)=1-X_2(s)+s=(s+2)^2$, the delayed distance at the root is 2, and $D_t=0$. The emission is strictly in the past and the direction exists. Thus excluding zero-delay contact does not cure the singular denominator. This is a prescribed local root geometry, not an evolved pair or a theorem that the chapter's intended history reaches this tangency.

The chapter also mentions a “declared reference length and mollifier width” at line 7, although neither a width value nor a finite-width acceleration prescription is supplied. A numerical value is unnecessary for a symbolic chapter, but its equation class must be clear. A Gaussian width in the causal residual does not by itself bound the inverse-square factor at spatial coincidence. Do not silently replace $r^{-2}$ by a softened comparison denominator and call it the same sharp equation.

Falsifier: an explicit regular chart and singular-event prescription in the chapter, or a finite value of its literal $1/|D_t|$ at $D_t=0$, would remove the respective objection. A converged finite-width treatment would address continuation only for that named regulator and domain.

#### F6: Editorial scope and teaching

Claim grade: measured for the identified wording and structure by `nl -ba` over the chapter, and inferred for their likely effect on a reader. [Terminology Usage](../../../../content/markdown/aaa/archie/terminology-usage.md#charge-polarity-and-architrino-usage), lines 121–147, assigns polarity to the primitive entity. [Academic Style Guide](../../../../content/markdown/aaa/archie/academic-style-guide.md#explanation-standard) requires a clue in place for load-bearing concepts. The chapter supplies no definition of absolute time, wake speed, or a causal wake, and its first use of DDE is unexpanded. These are inexpensive local fixes.

Line 24 defines an unsigned distance; lines 54 and 83 use a signed coordinate and assume it is positive. That is consistent on the ordered interval $X_1>X_2$, so it is not a sign error. State the interval once. Likewise a fixed geometric midpoint is appropriate under the symmetry conditions, and the scalar $X,V,A$ symbols are legitimate in a one-dimensional chart. Do not introduce a center of mass or bold every scalar merely to imitate three-dimensional notation.

The word “comparison” at line 3 may denote an isolated native test problem rather than a standard-physics surrogate. Clarify which it is. No scalar-wave PDE, Newtonian mass law, or energy functional appears in the chapter, so none should be attributed to it. Line 79 should be a real subsection heading so the central-origin equations are not structurally grouped under “Nonlinear History-Anchored Form.” Retain stable equation identifiers when editing prose or headings.

Falsifier: a declared alternative audience/presentation contract could reduce the editorial recommendations, while unchanged wording cannot overturn the directly observed omissions. An explicit comparison-model definition in the chapter would resolve that ambiguity.

## Independent derivations and counterexamples

All numerical instantiations below use $c_f=1$. Write $K=\kappa\epsilon^2>0$ solely as shorthand for the acceleration coupling times polarity magnitude squared; it is not mass, kinetic energy, or an extra postulate. In dimensional variables, $[K]=L^3/T^2$, $[D_t]=[c_f]=L/T$, and $W^{\mathrm{acc}}$ is dimensionless. Hence $KW/r^2$ has acceleration units. The fixed-speed normalization fixes the length/time conversion; it does not set $K$ to unity unless a numerical example explicitly does so.

### Signs, relative acceleration, and symmetry

For a partner hit on architrino 1, unlike polarities give $-K W\operatorname{sgn}(s_{12})/|s_{12}|^2$. The corresponding expression for architrino 2 has the same polarity multiplier. Subtracting $A_2$ from $A_1$ changes the second row's overall sign, exactly as chapter lines 58–59 do. If the entire relevant history is ordered across the origin, $X_1(T)>0>X_2(s)$ and $X_2(T)<0<X_1(s)$ for every active emission, then $s_{12}>0$ and $s_{21}<0$. Each included partner term decreases $r''$. Strict negativity requires at least one active nonzero partner term; empty root sets give zero, not inward acceleration.

Suppose $X_2(s)=-X_1(s)$ and $V_2(s)=-V_1(s)$ throughout the supplied history, the initial midpoint velocity is zero, and both sides use the same complete root and regularization rules. Reflection and member exchange map each root on one member to a root at the same emission time on the other. The delayed chords reverse sign, while $V_b\operatorname{sgn}s_{ab}$ and therefore $W$ are unchanged. Thus $A_2=-A_1$. On a domain with unique continuation, the reflected solution equals the original solution, preserving $X_2=-X_1$. This uses symmetry of the delayed law and uniqueness, not instantaneous action-reaction, momentum conservation, or mass.

For this ordered symmetric partner-only problem, both delayed distances equal $\rho(T;s)=[r(T)+r(s)]/2$, and their common transmitter factor is $1+r'(s)/2$. The scalar reduction can be made explicit:

$$
\mathcal C(T)=\left\{s<T:\frac{r(T)+r(s)}2=T-s\right\},\qquad
r''(T)=-8K\sum_{s\in\mathcal C(T)}
\frac{1}{|1+r'(s)/2|\,[r(T)+r(s)]^2}
$$

This is a derived reduction on the declared symmetric, ordered, simple-root chart with no self-hits. It is not an autonomous instantaneous equation in $r(T)$ alone. The chapter's general subtraction is an exact identity, but does not eliminate the two histories without symmetry. On a stationary prescribed past with $r(s)=r_0$, the initial root is $s=-r_0$, each weight is 1, and $r''(0)=-2K/r_0^2$, agreeing with direct subtraction of the two rows. The geometric identities $X_1=r/2$, $X_2=-r/2$, and their differentiated velocities then follow directly.

Claim grade: derived. Falsifier: a violated paired-root equality or a missing factor in the substitution into chapter lines 55–60 would invalidate this reduction. It carries no claim through collision, a root transition, or failure of unique continuation.

### History counterexample: identical endpoint data, different acceleration

Let $L>0$, reception time be 0, and endpoint data be $X_1(0)=L$, $X_2(0)=-L$, $V_1(0)=V_2(0)=0$. Compare a constant past $X_2^{(a)}(s)=-L$ with the continuously differentiable past

$$
X_2^{(b)}(s)=
\begin{cases}
-L-s^2/(9L),&-4L\le s\le0\\
7L/9+8s/9,&s<-4L
\end{cases}
$$

The pieces agree in both value and first derivative at $s=-4L$. The past speed is at most $8/9<1$, and the source remains negative. For history (a), the unique partner root is $s=-2L$, the weight is 1, and $A_1^{(a)}(0)=-K/(4L^2)$. For history (b), the residual on the quadratic interval factors as

$$
g(s)=2L+s+s^2/(9L)=\frac{(s+3L)(s+6L)}{9L}
$$

Only $s=-3L$ lies in that interval. On the older linear interval, $g(s)=2L/9+s/9<0$, so there is no older root. The root at $-3L$ has delayed distance $3L$, transmitter velocity $2/3$, and $D_t=1/3$. Therefore $A_1^{(b)}(0)=-K/(3L^2)$. Both choices meet the same position and velocity endpoint data, with simple, unique partner roots and no self-hits.

Taking $X_1$ to be the mirrored history in each case gives two different symmetric-history examples with the same endpoint data. Taking $X_1(s)=L$ and only changing $X_2$ to history (b) gives $A_2(0)=K/(4L^2)$, so the midpoint $M=(X_1+X_2)/2$ obeys

$$
M''(0)=\frac{A_1(0)+A_2(0)}2=-\frac{K}{24L^2}\ne0
$$

The endpoint is symmetric and stationary but the history is not reflection symmetric. With $L=10$ and $K=1$, the two inward accelerations are $-0.0025$ and $-0.003333333333333333$, while the mixed-history midpoint acceleration is $-0.000416666666666667$. These values were independently derived before the scratch evaluator checked their arithmetic.

Claim grade: derived for the exact formulas, measured for the floating-point spot check by `numeric.mjs --examples` with relative/absolute comparison threshold $10^{-12}\max(1,|\text{expected}|)$. Falsifier: another root on the stated history, a failure of the endpoint or derivative matching, or an incorrect canonical acceleration substitution. The histories are prescribed inputs, not past solutions of the isolated free pair; the example proves that a preparation/history convention is necessary and does not prove nonuniqueness after a complete admissible history has been fixed.

### Three regular roots cannot be replaced by one

Fix reception at $T=0$, $X_1(0)=1$, and on the retained source interval $[-4.2,-1.8]$ take

$$
X_2(s)=1+s-\frac{(s+2)(s+3)(s+4)}{10}
$$

The source is negative throughout this interval: $1+s\le-0.8$ and the polynomial correction has magnitude at most $0.5808$ by bounding its three factors there. Thus the sign of the delayed chord is positive. The residual is exactly $g(s)=(s+2)(s+3)(s+4)/10$. It has precisely three roots in the interval, $-2,-3,-4$, whose derivative values are $1/5,-1/10,1/5$. All are simple, all are strictly delayed, and all three partner accelerations point inward. With $K=1$ their sum is

$$
A_1=-\frac54-\frac{10}{9}-\frac5{16}=-\frac{385}{144}
$$

No one selected root gives this sum. This finite retained interval is an algebraic comparison input; no complete pair trajectory, current rest condition, or evolution claim is assigned to it. Extending the retained history can add roots and requires its own coverage; it does not make a single term equal this already admitted subtotal. This suffices to falsify the claimed all-root equivalence of the scalar and vector presentations.

Claim grade: derived from polynomial factorization and the per-hit formula; measured arithmetic confirmation by the separately known-case-tested `numeric.mjs --examples`. Falsifier: a sign change invalidating the chord simplification on the stated interval, a non-simple listed root, or equality of any single listed term with the displayed sum.

### Present rest does not exclude an old self-hit

First, the valid exclusion theorem: if an architrino's speed satisfies $|V(u)|\le v_*<1$ throughout $[s,T]$, then

$$
|X(T)-X(s)|\le\int_s^T|V(u)|\,du\le v_*(T-s)<T-s
$$

It cannot meet its own causal-root equality at positive delay. This is a chord-length estimate and imports no standard-physics speed cap. It must cover the intervening past, not just $V(T)$.

For the converse warning, prescribe $X_1(s)=L+s^2/(2L)$ and $X_2(s)=-X_1(s)$ for $s\le0$. The present positions are $\pm L$ and both present velocities vanish. The positive-delay self equation at reception 0 is $s^2/(2L)=-s$, whose nonzero solution is $s=-2L$. The self chord is $-2L$, the emission velocity is $-2$, and $D_t=1-(-2)(-1)=-1$. The same-polarity self contribution on member 1 is therefore $-K/(4L^2)$, directed away from its own past location at $3L$. In this one-dimensional history, that direction happens to be inward toward the origin; the outward radial projection of a circular self-hit must not be generalized to it.

The partner residual is $2L+s^2/(2L)+s=[(s+L)^2+3L^2]/(2L)>0$, so no partner root exists at that reception event. The partner-only rows give zero, while the complete law has the stated self contribution. All source paths remain separated and ordered. The histories contain super-wake-speed past motion and are prescribed; this is not a dynamically realized outcome of stationary release. It demonstrates both why present rest is insufficient and why the inward-sign conclusion needs nonempty partner roots.

Claim grade: derived; measured arithmetic check at $L=10$, $K=1$ by `numeric.mjs --examples` gives root residual 0, $D_t=-1$, and self acceleration $-0.0025$. Falsifier: failure of the positive-delay equality or nonzero derivative, or a stated whole-history restriction that excludes these inputs. It does not falsify a separately declared globally sub-wake-speed example.

### An exact early-time benchmark is available after choosing the past

The phrase “no known closed-form solution” must not be read as saying no exact solution segment is available. Prescribe the symmetric stationary past $X_1(s)=L$, $X_2(s)=-L$ for $s\le0$ and release at $T=0$. Before the arriving partner emission reaches time 0, the source location sampled by member 1 remains $-L$ and its emission velocity remains zero. Let $x(T)=X_1(T)$ and $y(T)=x(T)+L$, so $y_0=2L=r_0$. On this interval the partner equation is exactly $y''=-K/y^2$, with $y(0)=y_0$ and $y'(0)=0$.

Multiplying this acceleration equation by $y'$ and integrating gives the mathematical first integral $(y')^2=2K(1/y-1/y_0)$. This calculation uses the chain rule; it does not identify a physical kinetic or wake-energy account. The inward solution has the parametric form

$$
y=y_0\cos^2\theta,\qquad
T=\sqrt{\frac{y_0^3}{2K}}\bigl(\theta+\sin\theta\cos\theta\bigr)
$$

Differentiation gives $y'=-\sqrt{2K/y_0}\tan\theta$ and $y''=-K/y^2$. This verifies the result without importing a Newtonian mass law. Its validity ends at the first failure of the declared conditions: the emission time $T-y$ must remain negative, $x>0$ must preserve the ordered chart, and the generated history must remain in the simple-root/no-self regime. A sufficiently small positive interval has these properties because initially $T-y=-y_0<0$ and the velocity is zero. The formula is not the general coupled delayed solution and does not overturn the chapter's narrowly interpreted full-system solvability statement.

Claim grade: derived on the specified early-time chart. Falsifier: failure of the differentiated equation, initial data, or emission-time inequality. No numerical evolution or physical conservation conclusion is attached to this benchmark.

## Open obligations, distinguished from errors

**O1 — Full-system solvability status, chapter lines 12, 64, 118.** “No exact closed-form solution is presently known” is a statement about knowledge, not a nonintegrability theorem. This review neither found a full-system solution nor conducted an exhaustive literature search for this exact transmitter-weighted law. The smallest defensible wording is that this chapter supplies no closed form for the fully coupled delayed evolution, while the fixed-transmitter and stationary-prehistory segments have exact reductions. Claim grade: inferred for the limited status assessment. Falsifier: an explicit full-system solution satisfying the complete root law, specified history, and stated validity interval. A solution of a different electrodynamic or scalar-wave comparison model does not meet that test.

**O2 — Continuation and validation, chapter lines 64 and 116–118.** The chapter contains no evolved output, regulator refinement, accepted root record, or numerical accuracy result by full reading of lines 1–118. Its instruction to use robust root finding and event-aware stepping is sensible method guidance, but is not evidence that the specified pair was integrated or remained admissible. Binding, collision avoidance, field-speed crossing, stability, energy closure, and physical realization remain unestablished here. The task is formulation-focused, so no new simulation campaign or energy chapter is required to repair this page; the minimum is to delimit its claim. Claim grade: measured for what the chapter contains, with the instrument and scope just stated. Falsifier: an actual computation and independently checked output identified in those bytes would overturn the absence claim; external results would need a precise same-problem link and scope.

The [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md), lines 3–9, 39–78, separates a branch magnitude statistic from a proved variational action. [Energy](../../../../content/markdown/aaa/dynamics/energy.md), lines 9–31, distinguishes the primitive acceleration law from candidate kinetic bookkeeping and assembly mass. These owners prevent attraction or a scalar extremum from being promoted to a conservation or stability result. The target chapter makes no explicit such promotion, so this is a preserved boundary rather than an additional error finding.

## Complete chapter coverage and equation checks

The following coverage partition is exhaustive over lines 1–118, including the intervening blank lines. Exact references were read with `nl -ba`; equation syntax and source links were checked separately as recorded below.

| Lines | Content covered | Disposition |
| --- | --- | --- |
| 1–9 | Title, opening, polarities, initial speeds, separation, imposed line | Attractive polarity sign accepted. Collinearity is valid for a fully collinear supplied history and compatible velocities; present collinearity alone is insufficient. F1, F5, F6. |
| 10–17 | Objectives and canonical delayed conditions | Causal distance relation is valid in the later-declared $c_f=1$ units; move normalization before its first equation. Weight and zero-delay exclusion have the right roles. F3–F5. |
| 18–28 | Coupling, separation and partner-root setup | Positive coupling and polarity magnitudes are consistent. Native clock and history-domain definitions incomplete. F1, F3, F4. |
| 29–39 | First scalar acceleration and viewer link | Correct partner-root sign, power of distance, and weight. Full total needs F3; domain needs F5. Link passes. |
| 40–52 | Second scalar acceleration, viewer link, sign/weight explanation | Correct partner-root formula and unlike-polarity factor; same F3–F5 boundaries. Link passes. |
| 53–65 | Relative-coordinate equation, link, inward-sign interpretation and status | Subtraction and factor of two under symmetry accepted. State ordering and nonempty-root assumptions. Full scalar closure needs histories/symmetry. F1, F3, F6; O1. |
| 66–78 | Vector history-anchored equations, link, omitted approximations | Each displayed term is correct for one root; total labeling fails for multiple roots. No objection to omitting approximations. F2; link passes. |
| 79–95 | Central-origin prose, separation and positions, two viewer links | Geometric kinematics accepted conditional on full-history symmetry and unique continuation. Endpoint symmetry alone fails. F1 and F6; links pass. |
| 96–106 | Differentiated velocity relations and viewer link | Exact differentiation accepted on the smooth ordered chart. No mass assumption. Link passes. |
| 107–115 | Four endpoint conditions and viewer link | Consistent endpoint example, insufficient DDE initial data. F1; link passes. |
| 116–118 | Deliverables and solvability/numerical guidance | Formulation is incomplete until F1–F5 are addressed; guidance is not a simulation result. F6; O1–O2. |

All eight displays have the following independent algebra dispositions. The stable identifiers are functional routing data, preserved here for exact matching rather than scientific authority.

| Display lines | Equation identifier suffix | Algebraic assessment |
| --- | --- | --- |
| 29–36 | `21b743159cf3e3b1` | Correct all-partner-root scalar acceleration on its regular domain. |
| 40–47 | `2c5b3d8a9fb366b7` | Correct second-member partner acceleration. |
| 55–60 | `770f081643146eb7` | Correct subtraction; signed-coordinate ordering required. |
| 67–73 | `4c0bb2e2964b4da3` | Correct per-root vector kernel; missing total root sums. |
| 82–84 | `7e10678a75233e78` | Correct definition on $X_1>X_2$. |
| 89–92 | `4c4fa207618fc9e4` | Correct if the geometric midpoint is fixed at zero. |
| 97–103 | `67a4cf4a320971d3` | Correct derivatives of the preceding positions. |
| 108–112 | `e0defb4c22d7efd2` | Consistent endpoint values, not a complete history specification. |

Dimensional check: each acceleration has $KW/r^2$ units; the vector form has $K\mathbf r/r^3$ with the same units; the two relative rows subtract quantities of the same units; positions and their time derivatives match $r$ and $r'$. No extra $1/r$ or mass factor is needed. The $c_f$-free causal constraint is consistent with normalization, although the declaration appears after its first use. No erroneous reversal of attractive polarity was found by the displayed algebra.

## Live owners consulted and source boundaries

The task was kept to one assigned chapter. The router's Corpus Review workflow was selected; the integration procedure was read because the assignment explicitly requested it, without invoking source integration. Supporting owner reads were focused on the definitions and claims used here; this is not a full independent audit of those owners.

| Owner | Relevant material inspected and use |
| --- | --- |
| [Corpus Reviewer](../../../office-of-research/cto/prompts/corpus-reviewer.md) and [Integrator Reviewer](../../../office-of-research/cto/prompts/integrator-reviewer.md) | Full procedures: coverage, independent reasoning, exact references, claim distinctions and validation; report-only assignment controls edits. |
| [Review skill owner](../../../op/skills/skill-architrino-review.md), [skills policy](../../../op/skills/README.md), [Theory Orientation](../../../op/theory-orientation.md), [Operator Explanation Standard](../../../op/operator-explanation-standard.md), [execution procedure](../../../op/codex-goal-seeking-prompt-template.md) | Live workflow and evidence policy; this report is the sole durable destination authorized by the assignment. |
| [Academic Style Guide](../../../../content/markdown/aaa/archie/academic-style-guide.md), [Mathematics Style Guide](../../../../content/markdown/aaa/archie/mathematics-style-guide.md) | Audience, local definitions, native coordinate notation, transmitter-weight law, equation links, and claim grades. |
| [Mathematical Terminology](../../../../content/markdown/aaa/archie/mathematics-terminology.md), [Terminology Usage](../../../../content/markdown/aaa/archie/terminology-usage.md), [Comparative Glossary](../../../../content/markdown/aaa/archie/comparative-glossary.md) | Native time and geometry, polarity, causal roles, $D_t$, $D_r$, $W^{\mathrm{acc}}$, self-root and comparison boundaries; unrelated glossary entries were not audited. |
| [Ontology](../../../../content/markdown/aaa/foundations/ontology.md), [Architrino](../../../../content/markdown/aaa/foundations/architrino.md) | Primitive entity, absence of primitive mass, polarity, retained history, acceleration-first receiving law and coincidence boundary. |
| [Euclidean Void](../../../../content/markdown/aaa/foundations/euclidean-void.md), [Absolute Time](../../../../content/markdown/aaa/foundations/absolute-time.md), [Absolute Timespace](../../../../content/markdown/aaa/foundations/absolute-timespace.md) | Native coordinate/time meanings, path-history dependence, and the preferred wake rest frame. Absolute Timespace lines 401–477 distinguish origin changes from boosts. |
| [Detecting the Absolute Frame](../../../../content/markdown/aaa/foundations/detecting-the-absolute-frame.md), [Constructing the Absolute Frame](../../../../content/markdown/aaa/foundations/constructing-the-absolute-frame.md) | Tagged emission centers and coordinate-versus-observer-access distinctions. No observational frame-detection claim is made in the target. |
| [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md) | Opening canonical law, all transmitters and roots, simple-root collapse, transmitter weight, branch floors, and caustic/finite-width distinctions, especially lines 59–163 and 332–411. |
| [Causal Action Functional](../../../../content/markdown/aaa/dynamics/causal-action-functional.md), [Energy](../../../../content/markdown/aaa/dynamics/energy.md), [Binary Dynamics](../../../../content/markdown/aaa/dynamics/binary-dynamics.md) | Partner/self separation, primitive acceleration versus candidate action/energy accounts, and no primitive mass. Circular dynamics is not a substitute for the assigned one-dimensional history. |
| [Units and Constants](../../../../content/markdown/aaa/validation/simulations/action-energy/units-and-constants.md), [Causal Set and Delay Geometry](../../../../content/markdown/aaa/validation/simulations/action-energy/causal-set-and-delay-geometry.md) | Local normalization, derivative formula, full-history uniqueness and finite-history coverage. |
| [Well-posedness and Regularization](../../../../content/markdown/aaa/validation/simulations/action-energy/well-posedness-and-regularization.md), [Self-interaction Switch](../../../../content/markdown/aaa/validation/simulations/action-energy/self-interaction-switch.md) | Regular-history conditions, positive-delay self test, finite-width versus sharp claims. |
| [Radial Attraction](../../../../content/markdown/aaa/validation/simulations/action-energy/radial-attraction.md), [Like-Polarity Symmetric Repulsion](../../../../content/markdown/aaa/validation/simulations/action-energy/repulsion.md), [Action Model](../../../../content/markdown/aaa/validation/simulations/action-energy/action-model.md) | Fixed-transmitter comparison, signed two-body contrast, and comparison-method boundary. Sibling assertions were not treated as proof of the target. |

One external mathematical source was checked for the initial-history and well-posedness boundary: Ferenc Hartung, Tibor Krisztin, Hans-Otto Walther, and Jianhong Wu, *Functional Differential Equations with State-Dependent Delays: Theory and Applications* (2006), DOI [10.1016/S1874-5725(06)80009-X](https://doi.org/10.1016/S1874-5725(06)80009-X), with [accessible manuscript](https://aimath.org/WWN/variabletimelag/sur0b.pdf), §3.1–3.2, manuscript pages 27–29. The inspected text treats initial histories and explains why state-dependent-delay uniqueness needs additional regularity hypotheses. It supports the caution against deducing uniqueness from endpoint data or a generic DDE label. It does not prove well-posedness, a conserved energy, or absence of closed forms for this particular Master Equation. No electromagnetic comparison equations from that source were imported as substrate premises. The explicit chapter-specific counterexamples above supply the independent mathematical evidence.

## Limitations and proposed disposition

This is an independent AI-assisted mathematical and editorial review, not a simulation acceptance or empirical test. The derivations are independent of any chapter implementation; the numerical evaluator only checks arithmetic against them. It is not an EOM solver and cannot establish root coverage outside its explicitly factored cases, time evolution, stability, or physical realization. No Python, build, generator write, or solver campaign was run. Only the assigned source receives exhaustive chapter coverage; nearby owners were inspected at the relevant passages. No conclusion is drawn about unrelated corpus health or authorship of defects.

The link check establishes local file existence, equation identifier presence, and source-formula/line agreement in the current generated registry. It does not establish deployed URLs, browser navigation, screen layout, or quality of symbol explanations. KaTeX parsing establishes syntax acceptance, not mathematical correctness. A full rendered visual inspection was not performed because the source formulas were readable and a visual artifact was not needed to resolve the findings.

The intended history's eventual behavior remains open. In particular, none of the prescribed counterexamples establishes that a freely released initially static pair reaches a multi-root, self-hit, or caustic configuration. The exact early-time solution is restricted by its emission-time and regular-domain assumptions. No equilibrium stability analysis was performed, and no primitive physical mass or force balance was introduced.

Recommended disposition: address F1–F5 before presenting the page as an exact computational specification. Retain the correct attractive signs, transmitter-only weight, relative subtraction, and conditional midpoint kinematics. The smallest coherent revision declares a concrete symmetric past, the partner-only/no-self time domain, explicit transmitter derivatives and simple-root bounds, and an all-root vector expression. F6 can then be handled as local exposition cleanup. O1 and O2 remain stated mathematical limits, without a new tracker, validator, or research campaign being required by this report.

## Validation working record

Before inspecting the chapter with the new scratch checker, `node .tmp/crw005-attraction-review/check.mjs --known` passed its synthetic known cases on 2026-09-11: one display at lines 7–9, one inline expression, two links, exclusion of fenced examples, detection of an unmatched dollar delimiter, successful valid KaTeX parsing, rejection of an invalid command, and acceptance/rejection of matching/mismatching registry formulas. The command printed `KNOWN PASS` and exited 0; its known-case mode does not read the chapter. Target checks follow this recorded pass. The checker is disposable scratch, not a proposed repository gate.

Before running the numerical examples, `node .tmp/crw005-attraction-review/numeric.mjs --known` passed three analytically predetermined checks: stationary attraction at distance 2 gives acceleration $-1/4$, polarity reversal gives $+1/4$, and the affine source $X(s)=s/2$ viewed from position 2 has root $s=-4$, transmitter factor $1/2$, and acceleration $-1/8$. This command printed `KNOWN PASS` and exited 0 before example evaluation. All use $c_f=1$ and $\kappa\epsilon^2=1$. These are fixed-history algebra checks, not evolved solutions.

After adding the report-only checking mode, `check.mjs --known` was rerun and again exited 0 before that mode was applied to this report. The same extraction and KaTeX checks remain bounded by the simple Markdown syntax covered by the fixture and the manually inspected target.

### Completed target validation

| Check and scope | Result | Evidence boundary |
| --- | --- | --- |
| `node .tmp/crw005-attraction-review/check.mjs --target` | Exit 0; KaTeX 0.16.47 accepted all 8 displays and 32 inline expressions with strict errors enabled; no unmatched dollar delimiter found. | Syntax, not mathematical validity or visual layout. |
| Same checker, chapter links | All 9 local link targets exist: one Architrino chapter link and eight equation-viewer links. | Local resolution only; deployed site not inspected. |
| Same checker, generated equation records | All 8 stable identifiers occur in `content/generated/equation-mapping/corpus-equations.json`; each source path, display line range, and whitespace-normalized formula agrees. | Scoped current-record agreement; not a whole-registry freshness claim. |
| `node .tmp/crw005-attraction-review/numeric.mjs --examples` | Exit 0; all listed root residuals evaluate to zero; exact-reference acceleration comparisons pass at $10^{-12}\max(1,|\text{expected}|)$. | Checks the explicit analytic examples, not generic root solving or coupled evolution. |
| `rg -n 'attraction.md' content/graph/textbook_toc.json content/graph/scene_graph.json` plus exact-path inspection | Exact target path appears in both graphs; textbook entry at line 1285 and scene-graph document entry at line 3500. | Establishes inclusion; no entire graph-order or graph-consistency certification. The operator assigned this one chapter, so no traversal-order selection was needed. |

The numerical example output gives $A_1^{(b)}=-0.0033333333333333327$, static $A_1^{(a)}=-0.0025$, mixed-history $M''=-0.0004166666666666663$, self-hit acceleration $-0.0025$, and the three-root sum $-2.6736111111111103$. These are floating-point evaluations of the separately derived exact expressions, not physical measurements.

### Report verification and source recheck

`node .tmp/crw005-attraction-review/check.mjs --report` exited 0 after the final wording update: all 9 report display equations and 174 inline expressions parsed in strict KaTeX, and all 41 local report links resolved to existing files. Local heading fragments were not machine-validated. The report's mathematical reasoning was then self-reviewed for signs, root coverage in the factored examples, history endpoint compatibility, physical-layer boundaries, and the validity interval of the early-time solution.

`git diff --check -- content/markdown/aaa/validation/simulations/action-energy/attraction.md` exited 0 with no diagnostics. `git diff --no-index --check /dev/null reference/priorities/aaa-corpus-rewrite/evidence/crw-005-attraction-review-2026-09-11.md` emitted no whitespace diagnostics and returned 1 for the new-file comparison; this is recorded as its actual outcome, not described as an exit-0 repository gate. `git --no-optional-locks status --short` restricted to the chapter and report showed only the untracked report. No Git mutation command was used.

The final source recheck by `shasum -a 256` and `wc -l` returned the same SHA-256, `7c7344fa6ce56b79a0141deea6aa2882f7dcfa4fab0afe10a4782493813119b1`, and 118 lines. This establishes equality of the chapter bytes at initial inspection and final recheck, not absence of all concurrent activity elsewhere. A later hash change invalidates the exact line binding and requires rechecking the affected findings. Durable output is only this assigned report; the two check scripts remain disposable scratch under `.tmp/crw005-attraction-review/`.
