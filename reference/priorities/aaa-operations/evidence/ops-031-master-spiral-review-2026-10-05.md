# OPS-031 — Master Equation spiral continuation, 2026-10-05

This report-only continuation reviews the complete assigned interval, lines 3956–4646 of [Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#symmetric-delayed-spiral-advanced-non-circular-benchmark), from “Symmetric delayed spiral” through the separator before “Continuum.” The interval was read in three contiguous `sed` ranges, 3956–4200, 4201–4450, and 4451–4646, against the preserved snapshot below. Three bounded defects are demonstrated: circular-limit shortcuts omit the signs needed on wrapped roots; the variable-pitch normal is described as a Frenet normal without its curvature-sign restriction; and the radial-jet equation introduces an undefined residual and branch-sum symbol. A separate tangential-obstruction scope question is recorded without claiming that a retained evolving orbit has been constructed.

The substantive source was not edited. Findings are proposals for the existing dynamics owner; this receipt does not accept a repair, establish retained evolution, certify a root inventory, or complete the full Master Equation chapter review.

## Scope, authority, and snapshot

- **Measured source identity:** `shasum -a 256 content/markdown/aaa/dynamics/master-equation.md` returned `8a106d615611efe5b6baf8705a47f03edcf53ffe13d7998fb7af86432c139f7f` at the snapshot read. The exact full source was copied to `.tmp/ops031-oct05-spiral/master-equation.snapshot.md`; scratch is supplementary, while the mathematical witnesses and dispositions are preserved here.
- **Measured initial state:** `git --no-optional-locks status --short -- content/markdown/aaa/dynamics/master-equation.md reference/priorities/aaa-operations/evidence/ops-031-master-spiral-review-2026-10-05.md` returned no entries before this report was written. This scoped observation says nothing about unrelated checkout paths.
- **Read procedure:** live `AGENTS.md`, generated startup router, architrino-review skill entry and owner, corpus-reviewer owner, periodic-document-review owner, operator-explanation standard, and theory-orientation owner. The workflow selected was corpus review, with the operator-authorized bounded continuation replacing a whole-file claim. The periodic owner requires report-only substantive scans and permits no-change dispositions.
- **Read mathematical context:** Master Equation opening canonical geometry and weight definitions, lines 1–250; circular-chart scope and signed-sheet context, lines 3650–3955; related Binary Dynamics spiral statements and its circular signed-sheet context located by `rg`. Foundation openings were read for primitive ontology, absolute time, Euclidean geometry, absolute timespace, and coordinate-frame scope. Relevant Archie guide passages were read for local symbol definitions, layer discipline, acceleration-first language, and evidence/claim boundaries. This is a bounded contextual check, not full guide or foundation-chapter review coverage.
- **Reviewer and model boundary:** a delegated report-only Codex review. The parent assignment states that the October 4 model evaluation already covered the same model lineage. No new evaluation or superiority claim is made here.
- **Attribution:** causal attribution of all findings remains unresolved. No last-matching/first-mismatching history transition was inspected; none is called a regression introduced by a recent repair.

## SP-01 — Circular-limit shortcuts require signed sheets

**Disposition:** demonstrated mathematical scope defect; medium severity. **Grade:** derived by Euclidean chord geometry, with an independent Cartesian numerical witness. **Locations:** lines 4043, 4089, 4135, and 4214. The general partner and self formulas in the assigned section remain valid.

The partner simplification at line 4089 says:

> “when $p_0=0$ and $\rho=1$, this gives $J_{12}=1+\beta_f\sin(\Delta/2)$.”

The self simplification at line 4214 says:

> “the uniform circular self-hit formula, $J_{11}=1-\beta_f\cos(\Delta/2)$.”

For a circle, the chord lengths are positive norms:

$$
\Lambda_p=2|\cos(\Delta/2)|,
\qquad
\Lambda_s=2|\sin(\Delta/2)|.
$$

Set $p=p_0=0$, $\rho=1$, and $b=b_0=\beta_f$. Substitution into the general formulas, without dropping the absolute values, gives

$$
J_p=1+\beta_f\operatorname{sign}(\cos(\Delta/2))\sin(\Delta/2),
\qquad
J_s=1-\beta_f\operatorname{sign}(\sin(\Delta/2))\cos(\Delta/2).
$$

These formulas apply away from a zero chord. The simplified expressions require respectively $\cos(\Delta/2)>0$ and $\sin(\Delta/2)>0$. The chapter's preceding complete self-chart already preserves the factor $s=\operatorname{sign}(\sin\xi)$ at lines 3701–3710. The assigned spiral section later explicitly discusses older/wrapped roots at lines 4473–4476, so an unrestricted circular-limit claim can be misapplied to the intended root population.

An independent Cartesian check constructs the receiver at $(1,0)$ and the emission position and velocity from the circle, then computes $J=1-\hat{\mathbf r}\cdot\mathbf V_t$ directly. All numerical instantiations use $c_f=1$. The instrument is `.tmp/ops031-oct05-spiral/check-circular.mjs`; `node .tmp/ops031-oct05-spiral/check-circular.mjs` first passed the known partner and self cases at $\Delta=\pi/2$, giving respectively $1+\pi/4$ and $1-\pi/4$, before evaluating the wrapped target cases. Its saved output is `.tmp/ops031-oct05-spiral/circular-check.json`.

| Circular causal root | Speed ratio selected by the exact chord equation | Cartesian $J$ | Unrestricted shortcut $J$ | Correct $1/|J|$ | Shortcut $1/|J|$ |
| --- | --- | --- | --- | --- | --- |
| Partner, $\Delta=3\pi/2$ | $\beta_f=3\pi/(2\sqrt2)$ | $1-3\pi/4\approx-1.3561944902$ | $1+3\pi/4\approx3.3561944902$ | $0.7373573682$ | $0.2979565108$ |
| Self, $\Delta=5\pi/2$ | $\beta_f=5\pi/(2\sqrt2)$ | $1-5\pi/4\approx-2.9269908170$ | $1+5\pi/4\approx4.9269908170$ | $0.3416478091$ | $0.2029636419$ |

The instrument's chord residuals were zero to printed precision on these two targets. These are simple causal roots of prescribed circular histories, rather than equilibria or accepted histories through the folds that created their older roots. The counterexamples establish the algebraic shortcut defect without assigning retained-dynamics authority to those histories.

**Smallest correction, proposed:** replace the unrestricted partner sentence with “On the principal circular partner sheet, $0<\Delta<\pi$, this gives $J_{12}=1+\beta_f\sin(\Delta/2)$; wrapped sheets retain the sign of $\cos(\Delta/2)$.” Restrict the partner weight sentence at line 4135 to the same sheet. Replace the self sentence with “On a circular sheet with $\sin(\Delta/2)>0$, this gives $J_{11}=1-\beta_f\cos(\Delta/2)$; the complete circular chart retains $\operatorname{sign}(\sin(\Delta/2))$.” Qualify the circular partner delay analogy at line 4043 as principal-sheet, or use the complete $|\cos\xi|=\xi/\beta_f$ form. No change to the general spiral Jacobians or their absolute-value weights is warranted.

**Falsifier:** an explicit restriction covering all these shortcut sentences that excludes the demonstrated wrapped roots would reduce this to an exposition issue; alternatively, recomputing the position/velocity dot products on the declared circular roots and obtaining the shortcut values would reject the derived counterexamples. Inspect the preserved section and the independent Cartesian formulas above.

## SP-02 — The stated normal is an oriented normal on a general variable-pitch curve

**Disposition:** demonstrated geometric terminology/domain defect; medium severity. **Grade:** derived. **Locations:** lines 4045–4058 and the “Frenet” projection descriptions at 4148 and 4441–4450.

The section calls the displayed pair “the receiver Frenet frame for the variable-pitch spiral,” with

$$
\hat{\mathbf T}=\frac{-p\mathbf e_r+\mathbf e_\theta}{\sqrt{1+p^2}},
\qquad
\hat{\mathbf N}=\frac{-\mathbf e_r-p\mathbf e_\theta}{\sqrt{1+p^2}}.
$$

Assume $r>0$ and $\dot\theta>0$, as in the chart. This is an orthonormal tangent and left normal. A Frenet principal normal, however, is the normalized direction in which the unit tangent changes along the curve. Differentiate the tangent directly, using $r'/r=-p$, $\mathbf e_r'=\mathbf e_\theta$, and $\mathbf e_\theta'=-\mathbf e_r$:

$$
\frac{d\hat{\mathbf T}}{d\theta}
=\frac{1+p^2+p'}{1+p^2}\hat{\mathbf N},
\qquad
\frac{ds}{d\theta}=r\sqrt{1+p^2}.
$$

Consequently the signed curvature in this oriented normal is

$$
\frac{1+p^2+p'}{r(1+p^2)^{3/2}}.
$$

The displayed normal equals the principal normal only when $1+p^2+p'>0$. It is opposite when that quantity is negative, and the principal normal is undefined when it vanishes. No such restriction is declared for the variable-pitch extension.

The exact known control is $r(\theta)=1$, whose tangent changes toward $-\mathbf e_r$, the displayed normal. The target counterexample is the smooth positive curve $r(\theta)=e^{\theta^2}$ with $T=\theta$ and $c_f=1$. At $\theta=0$, $p=0$, $p'=-2$, $\mathbf X'=(0,1)$, and $\mathbf X''=(1,0)$. Its principal normal is $+\mathbf e_r$, while the displayed normal is $-\mathbf e_r$. This is a kinematic counterexample within the proposed general curve class; it is not asserted to solve the EOM. The particular local turn example later in the section, $r''/r=0.204$, has $1+p^2+p'=0.796>0$ at its center and is unaffected by this counterexample.

**Smallest correction, proposed:** describe the pair as “the oriented tangent-normal frame,” retaining the current formulas and all projection algebra, and add “The normal is the Frenet principal normal when $1+p^2+p'>0$; otherwise its sign relative to the principal normal must be tracked.” Use the same oriented-frame description in the two later references. Adding a positive-curvature assumption instead is a substantive narrowing of the variable-pitch chart and should be explicit if selected.

**Falsifier:** a declared assumption $1+p^2+p'>0$ throughout the claimed variable-pitch domain, or an explicitly defined signed-Frenet convention, would settle the defect by scope. Direct Cartesian differentiation of the counterexample that yields an inward principal normal would refute the witness. Neither the tangential projections nor the polar pitch equations should be rewritten on account of this issue.

## SP-03 — Define the radial residual and branch sum before the jet equation

**Disposition:** demonstrated explanatory omission; low-to-medium severity. **Grade:** measured for missing local definitions and derived for a compatible reconstruction. **Locations:** lines 4632–4641.

The final diagnostic introduces $\mathcal R_R^{\mathrm{tr}}$ and $B'_+(0)$ without stating what residual is being differentiated or what $B$ sums. `rg -n 'mathcal R_R|B._\+|3a_' content/markdown/aaa/dynamics/master-equation.md` found the occurrences only in the final diagnostic; the full assigned interval and the preceding canonical definitions distinguish $B_r$ and $B_\theta$ rather than a bare $B$. A reader cannot independently check the sign or normalization of a residual whose definition is absent.

The printed coefficient can be derived without changing it. Let $k=d\log\omega/d\theta$, let $B_r^{\mathrm{rec}}$ mean the evaluated radial branch sum on the transported history, and define

$$
\mathcal R_R^{\mathrm{tr}}(\theta)
=B_r^{\mathrm{rec}}(\theta)
-\Gamma(\theta)\left[\frac{r''(\theta)}{r(\theta)}-1+\frac{r'(\theta)}{r(\theta)}k(\theta)\right],
\qquad
\Gamma(\theta)=\frac{r(\theta)^3\omega(\theta)^2}{\kappa q_1^2}.
$$

This is evaluated acceleration minus kinematic requirement, both divided by $\kappa q_1^2/r^2$. At the stated even $C^3$ turn, $r'=r'''=0$, $r''/r=a_{\mathrm{rs}}$, and $\Gamma'=2k\Gamma$. The derivative of the bracket is $a_{\mathrm{rs}}k$. Hence, imposing the center tangential balance $\Gamma_\ast k_\ast=B_\theta^{\mathrm{rec}}(0)$ gives

$$
\left(\mathcal R_R^{\mathrm{tr}}\right)'_+(0)
=\left(B_r^{\mathrm{rec}}\right)'_+(0)
-(3a_{\mathrm{rs}}-2)B_\theta^{\mathrm{rec}}(0).
$$

This reproduces the printed coefficient if the bare $B$ is intended to mean $B_r^{\mathrm{rec}}$. It does not prove that the missing endpoint data can make the coefficient vanish.

**Smallest correction, proposed:** add the explicit normalized radial residual definition before line 4632, identify primes there as total angular derivatives along the transported roots and chosen time profile, and replace $B'_+(0)$ by $(B_r^{\mathrm{rec}})'_+(0)$ throughout that paragraph. If the author intends a different residual sign or normalization, derive that version rather than silently choosing this reconstruction. Preserve the current conditional construction and its unpopulated-history boundary.

**Falsifier:** an explicit local definition in the inspected source of $\mathcal R_R^{\mathrm{tr}}$ and bare $B$ matching the claimed jet would reject the measured omission. A different intended residual definition could invalidate the proposed reconstruction; that would not make the missing definition unnecessary.

## SP-O1 — Tangential negativity needs a stated recurrence or deceleration target

**Disposition:** unresolved scope question; no demonstrated global EOM counterexample, no repair acceptance. **Locations:** lines 4452–4464, 4473–4477, and 4500. **Grade:** derived for the speed identity; inferred for the scope concern.

The section says that a non-circular spiral beats the isolated circular tangential obstruction “only if” its weighted tangential sum becomes negative on enough of a controlled cycle. The earlier pitch-flow discussion correctly separates radius direction from tangential acceleration and admits changing angular rate as an escape from the constant-rate logarithmic no-go.

The weighted sum is proportional to $a_T=d\|\mathbf V\|/dT$, with a positive common factor. Thus negative tangential acceleration is a speed-decrease condition. A positive tangential sum alone cannot rule out an inward interval or a minimum-radius turn: at $p=0$, the radial turn depends on $\Gamma+B_r$, independently of $B_\theta$. For a declared complete speed-return cycle with positive tangential activity somewhere, the integral $\int a_T\,dT=0$ does require negative activity somewhere. That conditional argument explains a legitimate narrower use of the test, but the assigned section does not state a complete speed-return condition for its “controlled cycle.”

**Smallest proposed clarification if recurrence is intended:** “For a controlled cycle whose receiver speed returns to its initial value, positive tangential activity must be balanced by negative activity elsewhere. The following inequality tests the negative part of that balance; radius direction remains governed separately by the polar pitch flow.” If instead the target is a transient spiral or isolated radial turn, do not promote this inequality into a universal necessary condition without an additional argument.

**Falsifier/resolution:** identify the exact declared cycle/return condition in the source and derive the negative-activity necessity from it, or supply a retained variable-rate candidate establishing a counterexample to the broader reading. This receipt supplies neither a retained orbit nor a global nonexistence theorem. The owner should resolve the intended target before any substantive repair.

## Positive checks and no-change dispositions

These checks are analytical dispositions of the assigned source, not numerical orbit validation.

| Passage | Independent check and disposition | Boundary / falsifier |
| --- | --- | --- |
| Partner/self distances, line-of-action vectors, $D_t,D_r$, and general weights, 4009–4275 | **Derived, no change:** rotating the emission basis by $-\Delta$ gives the displayed displacement vectors. Dotting each vector with the source and receiver velocities gives the stated general $D_t,D_r$. The weight remains $c_f/|D_t|$, with no receiver multiplier. | Refuted by a direct Cartesian projection that differs on a noncoincident simple root. Circular shortcut defects SP-01 do not invalidate these general formulas. |
| Minimum-pitch conditions, 3990–4007 | **Derived, no change:** $\dot r=-pr\omega$; at $p=0$, $\ddot r=-p'r\omega^2$. Therefore $\dot r=0$, $\ddot r\ge0$ imply $p=0$, $p'\le0$ when $\omega\ne0$. | Necessary conditions alone do not prove a strict minimum in a degenerate case. |
| Polar acceleration sums and angular areal-rate record, 4287–4325 | **Derived, no change:** the Cartesian branch components yield $(\kappa q^2/r^2)(B_r\mathbf e_r+B_\theta\mathbf e_\theta)$, and differentiating $r^2\omega$ yields the displayed record. | This check is kinematic bookkeeping; it proves no conserved physical angular-momentum quantity or wake flux. |
| Closed pitch flow, 4332–4379 | **Derived, no change:** write $\dot r=-pr\omega$ and $\dot\omega/\omega^2=2p+B_\theta/\Gamma$. Substitution into $\ddot r-r\omega^2=(\kappa q^2/r^2)B_r$ gives $p'=-(1+p^2)-(B_r+pB_\theta)/\Gamma$. | Requires a smooth chart, $r>0$, $\omega>0$, finite simple-root sums. A zero angular rate lies outside this parameterization. |
| Radial turn rule, 4360–4387 | **Derived, no change to the nondegenerate criterion:** at $p=0$, $\ddot r=(\kappa q^2/r^2)(\Gamma+B_r)$. Positive sign gives a nondegenerate minimum and negative sign gives a nondegenerate maximum. | The prose already says the equality case needs higher derivatives. Strict biconditionals should be read with the nondegenerate qualification; a degenerate minimum is not excluded by equality. |
| Constant-pitch/rate compatibility and single-principal no-go, 4389–4439 | **Derived, no change:** constant $p$ and $\omega$ give $B_r=(p^2-1)\Gamma$, $B_\theta=-2p\Gamma$. With one root, the positive branch weight cancels. The analytic compatibility numerator has value $-4p$ at $\Delta=0$, so for fixed nonzero $p$ its zeros are isolated. A continuous retained root must then have constant $\Delta$, hence constant $b$ and $r$, contradicting nonzero pitch. | Requires the single continuous principal chart and the declared constant-rate ansatz. It is neither a non-circular global no-go nor a stability verdict. |
| Conditional turn-center data, 4528–4540 | **Derived/conditional, no change:** $r'(0)=0$, $r''(0)/r_\ast=a$ give $B_r=(a-1)\Gamma_\ast$; the angular equation gives $B_\theta=\Gamma_\ast\alpha_\ast/\omega_\ast^2$. | The source explicitly supplies no complete $C_{\mathrm{rs}}$, four-tube inventory, or populated acceleration record. Numerical scalar choices do not fill that gap. |
| Finite-memory time law and first transport cancellation, 4536–4630 | **Derived/conditional, no change:** $H=\omega_\ast\int d\phi/\dot\theta$ gives the root equation. For preserved moments and endpoints, $\partial_\theta H=k_\ast\Delta$ and $b'/b=k_\ast$, so $\partial_\theta(H/b)=0$. In the $Q$ form, $\partial_\theta K_Q=Q(\theta)-Q(\theta-\Delta)=0$ at the retained center endpoints. | Endpoint conditions preserve transmitter speed/weight as well as root offsets; moments alone preserve offsets. These identities do not establish finite-collar positivity, complete roots, or acceleration closure. |
| Conditional endpoint-slope construction, 4641–4644 | **No-change disposition:** the text explicitly denies having a supplied profile, independent instrument, or archived cancellation result, and keeps the construction conditional. | A completed retained-profile certificate with root completeness and residual bounds could upgrade this status. This review provides no such certificate. |

## Coverage and remaining work

**Measured coverage:** every source line 3956–4646 was read from the matching preserved snapshot using the three contiguous `sed` commands above. The interval contains 691 lines by inclusive subtraction; blank lines, display equations, equation links, and conditional-construction prose are all included. Nearby opening and circular context were read for the checks stated above, without representing those contextual reads as full review dispositions of other chapter regions.

**Remaining gaps:** Master Equation material outside the assigned interval is not newly certified here; the parent controls the overall chapter cursor. No finite-collar history, complete retained root inventory, numerical orbit, stability spectrum, singular-event continuation, physical assembly interpretation, rendered preview, or full source-validator run was performed. No external source was required for the elementary Euclidean and polar identities. No Python step, generator write, or publication operation was used.

The report's proposals are bounded and separable. SP-01 retains the valid general Jacobians and restricts only shorthand reductions. SP-02 retains the oriented projection frame and records its relation to the principal normal. SP-03 supplies the definitions needed to inspect an otherwise reproducible jet. SP-O1 requires the owner's scope decision and does not authorize a rewrite.

## Final verification

**Measured final source preservation:** `shasum -a 256` on the live source and snapshot returned the same complete hash recorded above, and `cmp` of those two paths returned exit 0 after the report was written. No newer source bytes appeared in this scoped check.

**Measured report whitespace:** `git diff --no-index --check /dev/null reference/priorities/aaa-operations/evidence/ops-031-master-spiral-review-2026-10-05.md` emitted no whitespace diagnostics; its exit 1 represents the new-file difference. The earlier ordinary `git diff --check` did not inspect this untracked file and is not relied on as evidence. The scoped status command showed only this report as untracked, with no entry for the substantive source. These checks establish preservation and report formatting only, not whole-corpus correctness.

A source hash change during the shared-checkout session would not retroactively alter this snapshot review; it would require a delta check before relying on the report for newer bytes.
