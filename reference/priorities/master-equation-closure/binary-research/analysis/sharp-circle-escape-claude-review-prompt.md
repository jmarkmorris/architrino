# Claude assignment: sharp capped-circle escape review and finite-history certification

## Objective

Independently assess whether the expanding near-circular binary, released from the specified supplied history under the sharp capped Master Equation, escapes to unbounded separation. First audit the proposed sufficient escape theorem. Then attempt the finite-history certification needed to apply it to this input. If certification cannot be completed, identify the precise unproved inequality or missing validated capability; do not replace that result with additional floating-point agreement.

This is a bounded research assignment for the existing local checkout at `/Users/markmorris/vibe/architrino`. Read its live `AGENTS.md`, startup router, and applicable procedure before working. The [core geometry theorem review procedure](../../../../office-of-research/cto/prompts/core-geometry-theorem-reviewer.md) supplies the mathematical review lens. This assignment additionally authorizes a separate review report and a bounded certification attempt, as specified below; the reviewed source documents and instruments remain unchanged.

## Read these files

Read the primary analysis in full, then the supporting passages required to check it:

1. **Primary target:** [sharp-circle-braking-continuation.md](sharp-circle-braking-continuation.md), especially §4, the sufficient escape condition and radial-turn exclusion, and §5, the numerical margins and proof boundary.
2. **Submitted instrument:** [sharp-circle-braking.mjs](../../../../../scripts/field-speed-ceiling/sharp-circle-braking.mjs). Inspect source, not just its output. It is an explicit-use floating-point research diagnostic, not the production EOM solver or an exact-trajectory certificate.
3. **Submitted evidence:** [sharp-circle-braking-receipt.json](../evidence/sharp-circle-braking-receipt.json), including known controls, commands, parameters, source identity and both refinement runs. Detailed observation logs, if present, are at the literal ignored directory `.local-data/field-speed-ceiling/braking/`.
4. **Input and earlier stopping point:** [sharp-circle-first-departure.md](sharp-circle-first-departure.md) and [sharp-circle-departure.mjs](../../../../../scripts/field-speed-ceiling/sharp-circle-departure.mjs).
5. **Current synthesis:** [manuscript.md §9.3.5–§9.3.6](../manuscript.md#135-first-observed-departures-under-the-sharp-equation).
6. **Equation authorities:** [Master Equation, canonical form](../../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), [shared ceiling definition and root geometry](../../analysis/field-speed-ceiling-definition-and-shared-results.md), and the relevant hypotheses of [regular-chart history-to-ledger well-posedness](../../analysis/regular-chart-history-to-ledger-well-posedness.md).

The [circular nonlinear-instability proof](planar-circle-nonlinear-instability.md) and its [earlier independent review](../../field-speed-ceiling/analysis/planar-circle-instability-independent-review.md) are context only if needed. Their prior review does not validate this new trajectory or escape argument. The circular work now belongs to the Braid Program; do not restore or write into the former active ceiling directory.

## Fixed physical and mathematical scope

- Use the **sharp Master Equation**. The field-speed ceiling is the only authorized dynamical modification. There is no self action at or below the ceiling, including equality. No softened kernel, causal smoothing, frozen-source replacement, consumed-front flag, added collision rule, imposed future path, or mass/force/energy premise is permitted.
- Set $c_f=1$. Use length unit $R_\ast$ and time unit $R_\ast/c_f$. The dimensionless coupling is $k=4D(1+\sin D)$, where $D$ is the unique positive solution of $D=\cos D$. Enclose these constants when certification requires it.
- The exact supplied history is $X_A(t)=r_0(\cos(t/r_0),\sin(t/r_0))$, $X_B(t)=-X_A(t)$, for every $t\le0$, with $r_0=1001/1000$ and exact unit tangent velocities. The labels have opposite polarity. Evolve from release at zero.
- This past is kinematically consistent but is not an all-past solution of the acceleration law. Treat it as supplied data for a delayed initial-history problem. Successful certification would prove a fact about its released future; it would not establish physical preparation, membership of the exact unstable manifold, or the fate of every disturbance.
- Keep the full delayed source dependence. In this antipodal reduction the partner row is $A=-kn/(\ell^2J)$, where $\ell=|X(t)+X(s)|=t-s$, $n=(X(t)+X(s))/\ell$, and $J=1+n\cdot V(s)$. Verify this reduction independently against the live equation.
- At $|V|=1$ remove only $(V\cdot A)_+V$. At $|V|<1$, retain all of $A$. The reference switches from the active boundary equation to this interior equation when the raw forward component becomes negative.

## Stage 1: independently audit the sufficient escape argument

Reconstruct the proof from the sharp equation before relying on the submitted derivation. Classify each conclusion as proved under stated assumptions, correct with additional assumptions, or false, and explain any repair explicitly.

The proposed criterion starts from an exact finite solution through $T_0$, a fixed unit vector $e$, $x(t)=e\cdot X(t)$, $x_0=x(T_0)>0$, $v_0=V(T_0)$ and $w_0=e\cdot v_0$. There must be $S<T_0$ with negative causal gap $g(T_0,S)$ and, throughout $[S,T_0]$, nonnegative source projection and speed bounded by $b<1$. For $0<u<w_0$ and $|v_0|<b$, it proposes

$$
I=\frac{k}{(1-b)u x_0}<\min\{b-|v_0|,w_0-u\}.
$$

Check the following load-bearing steps:

1. Does cap monotonicity permanently exclude every emission at or before $S$? Does the argument cover the entire original past, including its unit-speed portion, without silently truncating it?
2. Do the bootstrap hypotheses imply exactly one ordinary partner root, zero admitted self contribution, $J\ge1-b$, and $\ell\ge x_0+u(t-T_0)$? Check root existence as well as uniqueness and the signs in the antipodal source factor.
3. Does the integrated acceleration bound genuinely control the vector velocity change by $I$? Does the strict margin close the bootstrap without circularly assuming permanent subfield evolution?
4. Do the hypotheses justify continuation across every finite future time? Check delayed-history regularity, source-time motion, root/position clearance, compatibility at $T_0$, and the local existence theorem actually used. Identify any additional assumption needed instead of treating bounded acceleration alone as a complete existence theorem.
5. Does integrability imply convergence to a nonzero velocity and unbounded partner separation? Separate this from any claim of monotone speed or a specified asymptotic speed.
6. For $e=v_0/|v_0|$ and $p_0=|X(T_0)-x_0e|$, check the additional radial estimate

   $$
   X\cdot V\ge x_0u-p_0I+(u^2-I^2)(t-T_0),
   $$

   and whether $u>I$ and $x_0u>p_0I$ exclude all later radial maxima under the same hypotheses.

If the theorem is false, produce the smallest decisive counterexample or failed implication within its stated mathematical scope. Do not run a certification campaign against a theorem you have refuted. If the theorem needs a repair, state the corrected theorem and assess whether the target could satisfy it without changing the physical law.

## Stage 2: certify the finite history if feasible

The existing runs indicate ceiling release near normalized time 19.90982975, at radius 2.87223645. At time 1000 they indicate radius 489.04675 and speed 0.47827616. With $e$ chosen along the final velocity, $b=0.7$, and $u=0.35$, the proposed escape inequality has numerical margin approximately 0.03189960. These values are leads, not trusted enclosures.

Audit the reference algorithm's release detection, trial extension of the boundary vector field, accepted velocity normalization, history interpolation and derivative, root brackets, stage-source bounds, and finite-step event checks. Distinguish errors in its diagnostic scope from missing certification. Its narrow bisection bracket is not a total event-time error bound; its tiny interpolation speed excess is not an exact cap certificate.

Use an independent analytical reference or a genuinely validated numerical route. A separately written high-precision integrator can provide useful cross-checks, but high precision, residuals, halved steps, and agreement between implementations do not enclose the exact solution by themselves. Do not copy the submitted recurrence and call the agreement independent.

Prefer an existing suitable interval or validated-integration capability if one is available. Use outward-rounded arithmetic or an equivalent proved error accounting, and include every source of error that carries the conclusion. For Python, follow the repository's shared-venv requirement; system Python is not a fallback. Any instrument authored for this task must pass a known analytical case before it is run on the target. Record that order and the controls.

Certification must cover:

- Exact constants, the supplied infinite analytic history, and the released initial data.
- Coupled position and velocity errors, history interpolation or representation error, and the delayed source velocity entering $J$.
- Complete causal-root ownership throughout the finite evolution, positive separation and transmitter-factor bounds, and the method-of-steps history domain.
- The active ceiling segment and a justified passage to subfield motion. Certify the release and response regime, or use a validated formulation covering the switch directly; do not assume that the floating-point sign-change detector proved transversality or excluded other switches.
- An enclosure at a chosen finite $T_0$ and bounds over the entire relevant source segment $[S,T_0]$, including the negative old-source gap, source projections and speeds, and the strict escape inequalities.
- A rigorously defined fixed direction $e$. If its choice uses a numerical terminal velocity, state the exact chosen vector or enclose its normalization and every resulting dot product. Do not treat an uncertain direction as exact without accounting for it.

Time 1000 is not mandatory. A shorter certified prefix with adequate margins is preferable. Nor must the certificate prove every detail of the numerical trajectory if a rigorously controlled enclosure suffices for the escape theorem. Keep the specified original input fixed.

Keep the attempt bounded. Do not launch an unattended long campaign or build a general-purpose production solver to finish this assignment. If a suitable validated route is unavailable or the first bounded attempt fails, report the exact mathematical or computational obstruction, the finite-domain obligation still needed, and the smallest next implementation or lemma. A partial certificate should state its certified endpoint and bounds. Do not quietly substitute longer ordinary numerical runs for certification.

## Write scope and deliverables

Preserve the submitted analysis, manuscript, scripts, receipts, and all concurrent edits. Do not modify either the reviewed implementation or its independent references. Do not stage, commit, push, publish, regenerate artifacts, edit controlled canon, activate unrelated queues, or install a recurring test obligation.

Write the independent report to the intended output path `reference/priorities/master-equation-closure/binary-research/analysis/sharp-circle-escape-independent-review.md`. Put new temporary instruments under the literal directory `.tmp/sharp-circle-escape-independent-review/`; retain any useful certification evidence under a distinct filename in `reference/priorities/master-equation-closure/braid-program/evidence/`. Record exact commands, parameters, numerical backend, source identities, known cases, and evidence limits. Do not overwrite the submitted receipt. Do not promote temporary instruments into the regular scripts or test suite as part of this review.

The report should give separate verdicts for:

1. The escape theorem and any repaired statement.
2. The additional no-radial-turn condition.
3. The submitted floating-point continuation and its actual evidential scope.
4. Finite-prefix certification: completed, partially completed, or not established, with exact bounds or the concrete blocker.
5. Escape of the specified released history: proved, refuted, or still unresolved.

Lead with the strongest defensible conclusion in plain language. Give the proof or decisive finding, not just a checklist. Separate mathematical findings from documentation repairs. End with the smallest useful next action and its reason. If a complete certificate succeeds, state precisely which finite inequalities certify the infinite future. If it does not, say explicitly that escape remains unproved despite the numerical indication. Do not generalize to the contracting history, arbitrary perturbations, a stable binary, or physical realization.
