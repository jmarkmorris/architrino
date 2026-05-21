# Current Dynamics Synthesis

Promotion status: `priority-only`. This packet summarizes the current mathematical state of same-level tri-binary dynamics after the rigid, polarity, deformation, arclength, linearized, and theorem-target packets in this directory. It is a synthesis of priority-side work only. It does not retain a branch or authorize migration into `content/markdown/aaa`.

---

## 1. Main Conclusion

The rigid octahedral same-level carrier is a strong geometry/root seed, but it is not a dynamics branch.

The viable dynamics problem is not:

$$
\text{find phase offsets on a rigid carrier}.
$$

It is:

$$
\text{find six closed arclength-parametrized curves whose delayed causal-wake force equals their curvature acceleration}.
$$

The core equation is therefore

$$
\mathbf{Y}_i''(\lambda)
=
\Gamma P_i^\perp(\lambda)\widetilde{\mathbf{F}}_i(\lambda),
\qquad
\mathbf{Y}_i'(\lambda)\cdot\widetilde{\mathbf{F}}_i(\lambda)=0,
$$

on one retained active-root ledger. This is developed in [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md) and formalized as a theorem target in [minimal-dynamics-closure-theorem.md](minimal-dynamics-closure-theorem.md).

---

## 2. Numerical Evidence So Far

The current screens all remain negative.

| Packet | Best useful result | Blocking residual |
| --- | --- | --- |
| [octahedral-carrier-worked-example.md](octahedral-carrier-worked-example.md) | exact noncollision floor $d_{\min}=R$, clean partner root, stable first cross-root screen | rigid neutral tangential RMS $\approx1.1010$ |
| [rigid-carrier-dynamics-results.md](rigid-carrier-dynamics-results.md) | phase offsets reduce tangential RMS to about $0.8798$ | pointwise tangential residual remains $O(1)$ |
| [polarity-phase-rigid-screen-results.md](polarity-phase-rigid-screen-results.md) | neutral polarity reassignment reaches tangential RMS about $0.8296$ with good floors | rigid polarity/phase freedom is still insufficient |
| [low-order-deformation-search-results.md](low-order-deformation-search-results.md) | common radial breathing reduces tangential RMS to about $0.6663$ | angle-clock speed and radial/support rows fail |
| [pair-specific-deformation-search-results.md](pair-specific-deformation-search-results.md) | site-specific radial/phase coupling improves speed RMS to about $0.0689$ and keeps $J_{\min}\approx0.3663$ | tangential RMS remains about $0.8209$ |
| [arclength-deformation-search-results.md](arclength-deformation-search-results.md) | arclength common breathing reaches tangential RMS about $0.4659$ | force-versus-curvature RMS remains about $1.4628$ and $J_{\min}\approx0.2487$ |
| [plane-normal-precession-search-results.md](plane-normal-precession-search-results.md) | common nonplanar mode improves force-versus-curvature RMS to about $1.2176$ | tangential RMS rises to about $0.7023$ and $J_{\min}\approx0.2878$ |
| [binary-specific-plane-normal-search-results.md](binary-specific-plane-normal-search-results.md) | coarse binary-specific normal modes appeared plausible | refinement fails period compatibility, tangential closure, curvature closure, and Jacobian margin |
| [finite-mode-rank-screen-results.md](finite-mode-rank-screen-results.md) | six-parameter common radial-plus-normal Jacobian is full rank with condition number about $3.62$ | least-squares correction predicts only about $5.6\%$ residual-norm improvement |
| [intrinsic-m2-collocation-rank-results.md](intrinsic-m2-collocation-rank-results.md) | exact-antipodal $M=2$ vector Fourier basis has full $36$-column rank and actual clipped steps reduce residual norm | period/unit rows still open; no nonlinear constrained solve yet |
| [intrinsic-m2-nonlinear-solve-results.md](intrinsic-m2-nonlinear-solve-results.md) | bounded nonlinear $M=2$ solve reduces training tangential RMS to about $0.2566$ and curvature RMS to about $0.4387$ | refinement exposes off-grid residual peaks plus open period/unit rows |
| [intrinsic-m2-refined-solve-results.md](intrinsic-m2-refined-solve-results.md) | $K=12$ restart reduces tangential RMS to about $0.3763$ and curvature RMS to about $0.6255$ while preserving root count | period-length spread grows to about $0.0771R$ |
| [equal-period-projection-results.md](equal-period-projection-results.md) | minimum-norm period projection closes length spread to about $2.6\times10^{-5}R$ while keeping tangential RMS about $0.3923$ and curvature RMS about $0.6377$ | force residuals and unit-speed row remain open |
| [equal-period-constraint-qualification.md](equal-period-constraint-qualification.md) | length Jacobian rank-$2$ evidence turns equal period into a local codimension-$2$ manifold target | restricted dynamics rank/range test on $\ker D\mathbf{L}$ remains open |
| [rational-winding-screen-results.md](rational-winding-screen-results.md) | low-integer winding search chooses $(1,1,1)$; nontrivial winding is unsupported by the refined $M=2$ lengths | equal-period force/unit rows still open |
| [unit-speed-chart-reparameterization.md](unit-speed-chart-reparameterization.md) | proves construction-speed spread is a chart row removable by arclength inverse when $S_i>0$ and lengths match | force/root/curvature closure must be recomputed in the arclength-inverse chart |
| [arclength-inverse-rescore-results.md](arclength-inverse-rescore-results.md) | projected row has $S_{\min}\approx0.6904$, preserves $5$-$5$ roots, and reproduces the reciprocal $K=12$ force-curvature metric | $K=18$ off-grid peaks persist and intrinsic $\mathcal{R}_{K}$ RMS is about $0.96$ |
| [arclength-inverse-restricted-rank-screen.md](arclength-inverse-restricted-rank-screen.md) | equal-period-restricted $K=6$ matrix has full $34$-column rank and predicts about $61\%$ residual-norm reduction | predicted step is too large for branch acceptance; trust-region nonlinear solve required |
| [arclength-inverse-trust-region-results.md](arclength-inverse-trust-region-results.md) | clipped equal-period arclength-inverse steps improve $K=6$, $K=12$, and $K=18$ residuals while preserving $5$-$5$ roots through $\rho=0.8$ | $\rho=1.2$ loses root count and $\rho=0.8$ has large support-band growth; finite-mode closure remains open |

The important positive signal is that deformation can substantially reduce tangential leakage or curvature mismatch, depending on which deformation axis is opened. The important negative signal is that low-mode improvements tend to trade one residual for another or move toward poor Jacobian floors unless the solver enforces the full intrinsic curve system. The arclength-inverse rescore adds one more caution: reciprocal force-from-curvature diagnostics can look better than the retained intrinsic curvature-from-force row, so future packets must state their $\Gamma$ convention.

---

## 3. What Changed Mathematically

The first deformation screens treated the construction angle as physical time:

$$
q_i(t)=t+\phi_i.
$$

For a deformed curve this is the wrong final chart. If

$$
\mathbf{X}_i(q)
$$

is not traversed at constant arclength speed in $q$, then the apparent speed residual partly measures the clock choice rather than a physical impossibility.

The corrected clock is

$$
\int_0^{q_i(t)}
\left\|
\mathbf{X}_i'(\zeta)
\right\|d\zeta
=
c_ft
\pmod{L_i}.
$$

Then

$$
\|\dot{\mathbf{x}}_i(t)\|=c_f
$$

holds identically, and the carrier residual becomes

$$
\mathcal{R}_{\mathrm{dyn},i}
=
\mathbf{F}_i-c_f^2\boldsymbol{\kappa}_i.
$$

Thus the new retained-branch residuals are not merely

$$
\mathcal{R}_{\mathrm{speed}},
\qquad
\mathcal{R}_{\mathrm{tan}}.
$$

They are:

$$
\mathcal{R}_L,
\qquad
\mathcal{R}_T,
\qquad
\mathcal{R}_{\mathrm{tan}},
\qquad
\mathcal{R}_{\mathrm{curv}},
$$

plus the root, support, noncollision, event/action, and stability rows.

The status of $\mathcal{R}_T$ is subtler than the force rows. In a constant-speed Fourier chart it is an algebraic row,

$$
\|\partial_{\theta}\mathbf{Z}_i\|^2-\ell^2=0,
$$

but in an arclength-inverse shape chart it is replaced by the regularity floor

$$
\min_{\theta}\|\partial_{\theta}\mathbf{Z}_i(\theta)\|>0
$$

and by the exact inverse arclength map. Thus construction-speed spread is not itself a physical force-balance failure; it is a sign that the finite Fourier phase is not yet an arclength phase.

---

## 4. Current Dynamics Picture

The same-level branch has three hard constraints that must be solved together.

First, the delayed force field must be tangent-free:

$$
\mathbf{T}_i\cdot\widetilde{\mathbf{F}}_i=0.
$$

Second, the normal component must match curvature with one derived scale row:

$$
\mathbf{K}_i=\Gamma P_i^\perp\widetilde{\mathbf{F}}_i.
$$

Third, the same curve must preserve the active causal-root ledger:

$$
J_{\min}>\epsilon_J,
\qquad
d_{\min}>\epsilon_x,
\qquad
|\mathcal{A}_i(\lambda)|<\infty.
$$

The screens show that these constraints pull against each other. Strong radial breathing improves tangential balance but tends to degrade Jacobian floors and does not align the full force with curvature. Site-specific radial/phase coupling protects speed and roots better, but it gives back too much tangential improvement. Common plane-normal precession improves curvature alignment, but increases tangential leakage; binary-specific normal modes fail when period and Jacobian constraints are refined.

---

## 5. Most Likely Missing Degrees Of Freedom

The next deformation family should change delayed line-of-action directions without relying only on radius.

The most plausible missing rows are:

1. plane-normal precession, so each binary plane can rotate slowly and change cross-binary causal-hit projections;
2. antipodal relaxation, so the two partners in a binary are not forced to remain exact negatives when force balance wants a small separation asymmetry;
3. a controlled self/fold-layer row, if same-source delayed contributions can be regularized with a weak-limit and event ledger;
4. a declared Noether-Sea medium-response term, but only with a constitutive row and event/action closure.

The first two are preferable as the next pure-geometry search because they do not introduce a new force channel. The latest screens sharpen this: plane-normal precession is a live direction, but only inside a solver that treats period length and Jacobian floors as hard constraints; antipodal relaxation is the next geometric degree of freedom to test before any self/fold-layer or medium-response term is introduced.

---

## 6. Minimal Retention Target

A candidate branch is not retained until one packet supplies a single active-root ledger and a single curve family satisfying:

$$
\mathcal{R}_{\mathrm{curve}}
=
\left(
\mathcal{R}_{T},
\mathcal{R}_{L},
\mathcal{R}_{\mathrm{center}},
\mathcal{R}_{\mathrm{support}},
\mathcal{R}_{\mathrm{root}},
\mathcal{R}_{\mathrm{tan}},
\mathcal{R}_{\mathrm{curv}},
\mathcal{R}_{\mathrm{event}},
\mathcal{R}_{\mathrm{action}}
\right)
=0
$$

within declared tolerances, with

$$
J_{\min}>\epsilon_J,
\qquad
d_{\min}>\epsilon_x.
$$

The linearized route is:

$$
D\mathcal{F}(\alpha_*)\delta\alpha
=
-\mathcal{F}(\alpha_*),
$$

after quotienting translations, rotations, time shift, and center gauge. The rank target in [linearized-dynamics-matrix.md](linearized-dynamics-matrix.md) is therefore not a proof of existence; it is the gate that tells whether a chosen Fourier deformation space has enough directions to kill the current residual.

---

## 7. Immediate Mathematical Next Step

The next high-value computation is not another rigid phase search. It is a finite-mode intrinsic curve solve:

$$
\mathbf{Y}_i(\lambda)
=
\sum_{m=0}^{M}
\mathbf{a}_{i,m}\cos m\lambda
+
\mathbf{b}_{i,m}\sin m\lambda,
$$

with collocation constraints

$$
\|\mathbf{Y}_i'(\lambda_n)\|=1,
$$

and objective

$$
\mathcal{J}_{\mathrm{curve}}
=
\|\mathcal{R}_{T}\|^2
+\|\mathcal{R}_{L}\|^2
+\|\mathcal{R}_{\mathrm{tan}}\|^2
+\|\mathcal{R}_{\mathrm{curv}}\|^2
+\mathcal{P}_x
+\mathcal{P}_J
+\mathcal{P}_{\mathrm{support}}.
$$

The first full collocation run should start with the rigid octahedral loop basis, then enable plane-normal precession and antipodal relaxation before introducing any self/fold-layer or medium-response channel. The common plane-normal screen is the best evidence so far that nonplanar geometry matters, the binary-specific screen shows that common-period and Jacobian barriers must be enforced during the solve rather than audited afterward, the six-variable rank screen shows that the current scalar ansatz is too small even though its columns are independent, and the $M=2$ vector rank and nonlinear screens show that the full collocation direction has enough local degrees of freedom to produce real descent. The immediate bottleneck is now coupled equality solving: the equal-period projection shows $\mathcal{R}_L$ can be closed without destroying the force progress, the rational-winding screen does not support a nontrivial winding escape, and the equal-period constraint-qualification lemma reduces the next linear algebra target to the restricted residual matrix on $\ker D\mathbf{L}$.

The next solver should compare two versions of that restricted target. In the constant-speed Fourier chart the open rows are $\mathcal{R}_T$, $\mathcal{R}_{\mathrm{tan}}$, and $\mathcal{R}_{\mathrm{curv}}$. In the arclength-inverse shape chart, $\mathcal{R}_T$ is replaced by the nondegeneracy floor $S_i>0$, and the open physical rows are $\mathcal{R}_{\mathrm{tan}}$ and the retained intrinsic curvature row

$$
\mathcal{R}_{K}
=
\mathbf{K}-\Gamma_KP^\perp\widetilde{\mathbf{F}}
$$

computed after inverse arclength reparameterization. The reciprocal row

$$
\mathcal{R}_{F}
=
\widetilde{\mathbf{F}}-\Gamma_F\mathbf{K}
$$

should remain as a comparison diagnostic only.

The latest rank and trust-region screens show that equal-period restriction does not locally kill the arclength-inverse force directions: the $K=6$ restricted matrix has full $34$-column rank and clipped nonlinear steps produce real descent through $K=18$. The obstruction is now finite-mode nonlinear closure with controlled support-band size. The best accepted sampled trust row is $\rho=0.8$, which preserves $5$-$5$ roots and reduces the $K=18$ residual norm from about $11.49$ to about $8.94$, but it grows the support radius to about $2.32$ and still leaves nonzero $\mathcal{R}_{\mathrm{tan}}$ and $\mathcal{R}_{K}$.

If the exact-antipodal $M=2$ trust solve stalls, the next conservative expansion is exact-antipodal $M=3$ arclength-inverse modes. Antipodal relaxation should wait until the residual split shows a persistent pair-even obstruction unreachable by exact-antipodal modes.

Until such a curve solve closes, the correct status remains:

$$
\texttt{architecture-development},
\qquad
\texttt{priority-only},
\qquad
\texttt{no-retained-same-level-branch-yet}.
$$
