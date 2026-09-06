# Independent Review of Sections 12--14

**Review identifier:** `FSC-016-PPAI-2026-09-02` **Review date:** 2026-09-02 **Reviewer role:** Principal Proof Architect & Integrator **Review target:** [Field-Speed Ceiling: Mathematics, Geometry, and Dynamical System](../analysis/mathematics-geometry-dynamical-system.md), Sections 12--14 **Review disposition:** coherent next-step program with two required specification repairs, one required many-body convergence obligation, and one counting correction **Claim level:** independent review findings only; this review adopts no field-speed ceiling, response law, event law, braid, action unit, energy account, stability result, Noether-sea model, or physical claim.

## Executive assessment

Sections 12--14 are mathematically coherent as a conditional research program. The central reductions survive independent algebraic review:

- the completed-net criterion $g_i\geq0$ and $\mathbf B_i=-(c_f^2/R_a)\hat{\boldsymbol\rho}_i$ is necessary and sufficient for the prescribed field-speed circular paths under the proposed post-summation response;
- commensurate frequencies give integer winding data, inverse radius ratios, and two relative-phase coordinates after absolute-time translation is quotiented;
- a fixed noninertial dimensionless shape can have at most one compatible homothetic scale while its simple-root chart and fixed couplings persist;
- the normalized isolated-binary constants and raw cycle diagnostics reproduce from the exact $D=\cos D$ definition; and
- the action and energy formulas are kept explicitly conditional on an action functional, a same-record energy identity, and a typed event account that do not yet exist.

The packet should not yet be used verbatim as the theorem specification for FSC-017. Findings FSC16-1 and FSC16-2 must be repaired or carried explicitly into that theorem packet; FSC16-3 is the first unavoidable Noether-sea convergence burden; FSC16-4 corrects the scalar residual count used for rank and dimension arguments.

Plainly: the braid equations and their strongest claim boundaries are sound. The review found no hidden energy or stability result. It did find places where the future proof instructions are not yet precise enough to support a rigorous continuation, rank count, or stability theorem.

## Findings

### FSC16-1 — The active-constraint tangent statement mixes an equality branch with an inequality margin

**Severity:** required specification repair.

The endpoint interface places the speed ceiling inside the inequality vector $\mathfrak G(\mathbf z)\geq\mathbf0$ ([target lines 3066--3076](../analysis/mathematics-geometry-dynamical-system.md#endpoint-equations-for-a-one-unit-transfer)), while every branch under discussion also satisfies the exact field-speed equality $R_a|\omega_a|=c_f$. The tangent paragraph then refers to a point with “strict speed-ceiling margins” and later imposes $D\mathbf G_{\mathrm{act}}[\dot{\mathbf y}]\geq\mathbf0$ at an active speed-ceiling margin. A field-speed branch cannot have a strict margin for that same constraint.

The one-sided tangent inequality is correct only after the direction of the continuation parameter is declared. If a differentiable feasible family is defined for both signs of the parameter through an active constraint, its first derivative must be tangent to the active boundary, so the corresponding derivative is zero rather than merely nonnegative. Calling the condition a complementarity problem also requires a declared multiplier or complementarity pair; tangent-cone feasibility alone is not yet such a system.

**Smallest repair:** separate the exact field-speed equations

$$
H_a(\mathbf y)=R_a^2\omega_a^2-c_f^2=0
$$

from the genuine inequality margins. State $DH_a[\dot{\mathbf y}]=0$ on a same-boundary branch. For any other active inequality, state whether $\varepsilon\geq0$ gives a one-sided tangent with $DG[\dot{\mathbf y}]\geq0$ or a two-sided family gives $DG[\dot{\mathbf y}]=0$. Reserve “complementarity” for a later system that actually includes its multipliers and complementary-slackness equations.

**Falsifier:** exhibit one declared two-sided differentiable family of exact field-speed records for which the field-speed constraint has a nonzero first derivative at the base record.

Plainly: an exact field-speed orbit sits on the boundary; it does not have spare speed margin. The future derivative calculation must distinguish staying on that boundary from moving inward through a separately declared one-sided transition.

### FSC16-2 — The monodromy paragraph states a sufficient stability criterion and then denies its consequence

**Severity:** required theorem-statement repair.

The stability paragraph says that symmetry-reduced monodromy spectral radius below one is a sufficient criterion for exponential orbital asymptotic stability, then says that orbital or Lyapunov stability and basin attraction do not follow from that criterion. Exponential orbital asymptotic stability already includes local orbital stability and local attraction. The paragraph also needs the hypotheses under which a spectral-radius statement about the linearized return map controls the nonlinear state-dependent-delay return map.

**Smallest repair:** state the criterion conditionally on a well-posed $C^1$ local semiflow on the declared retained-history phase space, a $C^1$ Poincare return map on a transverse slice, an isolated reduced fixed point, and a bounded derivative whose spectrum is being evaluated. Under those hypotheses, reduced spectral radius below one implies local exponential orbital asymptotic stability and therefore a local basin. Global basin size, robustness across event or root-chart boundaries, and attraction from undeclared histories remain separate claims. Without those hypotheses, retain the spectral calculation only as a linear diagnostic.

**Falsifier:** produce a declared $C^1$ reduced return map meeting the stated hypotheses and having derivative spectral radius below one while its fixed point is not locally asymptotically stable.

Plainly: once the nonlinear return map is genuinely defined and smooth, all reduced multipliers inside the unit circle do buy local stability. They do not say how large the basin is or what happens after a perturbation crosses into another root or event chart.

### FSC16-3 — Local finiteness does not control the infinite Noether-sea wake sum

**Severity:** required many-body convergence obligation; not an error in a claimed theorem because Section 12.4 is explicitly a program.

The Noether-sea interface asks for a “locally finite or otherwise controlled” many-braid ledger and treatment of distant earlier wakefronts. Local finiteness of sources or roots is insufficient for the raw inverse-square vector sum in three spatial dimensions. At roughly constant number density, a shell contains $O(r^2\,dr)$ sources while each unscreened row has magnitude $O(r^{-2})$, leaving an $O(dr)$ absolute shell contribution. Neutrality or angular cancellation may improve the signed sum, but that improvement must be derived with a summation prescription and a boundary-independent limit; it cannot be inferred from pairwise neutrality alone.

**Smallest repair:** make the first sea theorem target a finite-volume exhaustion with a declared boundary condition and ordering, a uniform tail estimate derived from the braid's actual far-field cancellation or multipole order, and a proof that the receiver ledger converges in the stated norm independently of admissible exhaustion order. If only conditional convergence is obtained, the boundary and summation convention remain part of the physical state and must be exposed.

**Falsifier:** find two admissible finite-volume exhaustions of the same declared many-braid history whose receiver acceleration ledgers converge to different limits, or one exhaustion whose tail fails the proposed uniform bound.

Plainly: infinitely many individually small wakes can still add up to an undefined total. A sea model must prove how distant neutral assemblies cancel and whether changing the order or shape of the outer boundary changes the local answer.

### FSC16-4 — The inverse problem has eighteen scalar residual conditions, not twelve

**Severity:** counting correction before any rank or dimension argument.

The inverse-problem paragraph calls the closure system “all twelve conditions---six scalar inequalities and six perpendicular vector equalities.” Each perpendicular equality lies in a two-dimensional plane and therefore contributes two scalar equalities after the velocity-parallel component is removed. The system has six scalar inequalities and twelve scalar equality components: eighteen scalar conditions before symmetry and dependency reductions. Calling the six vector equations six conditions is harmless prose, but “twelve conditions” is incorrect and can corrupt a bordered-Jacobian or dimension count.

**Smallest repair:** say “six scalar inequalities and six two-component perpendicular vector equalities (twelve scalar equality components).” Any later finite reduction must then prove which scalar components are independent after symmetry quotienting.

**Falsifier:** provide a declared coordinate reduction in which one of the perpendicular vector equations has only one independent scalar component for every member of the stated general family.

Plainly: each architrino must get both sideways components right, not just one. That matters when counting unknowns against equations in a search or implicit-function theorem.

## Independently checked results

### Field-speed compatibility criterion

Decompose the completed ordinary acceleration as

$$
\mathbf A_i^{\mathrm{ord}}
=
g_i\hat{\mathbf t}_i+\mathbf B_i,
\qquad
\hat{\mathbf t}_i\mathbin{\cdot}\mathbf B_i=0.
$$

At the boundary, the proposed response retains $\min(g_i,0)\hat{\mathbf t}_i+\mathbf B_i$. The prescribed circular acceleration has no velocity-parallel component. Equality therefore holds exactly when $g_i\geq0$ and $\mathbf B_i$ equals the prescribed inward vector. This verifies the iff criterion at its stated conditional authority.

Plainly: the rule removes only a net forward component. Any net backward component would remain and spoil a constant-speed circle, while the two sideways components must reproduce the exact inward turn.

### Homothetic scale selection

For $\mathbf X_i^{(L)}(T)=L\overline{\mathbf X}_i(c_fT/L)$, the velocity is independent of $L$, the path acceleration scales as $L^{-1}$, and the fixed-coupling inverse-square ledger scales as $L^{-2}$. Positive homogeneity of the response therefore reduces compatibility to a vector equation linear in $L$. Two distinct positive scales cannot solve it for one nonzero-curvature fixed shape on the same root chart.

Plainly: enlarging the same shape weakens its wake acceleration faster than it weakens the turn the path requires, so at most one size can balance.

### Exact normalized binary and cycle values

A direct bisection of $D=\cos D$, followed by substitution into the displayed exact formulas with $c_f=K=1$, reproduced

| Quantity | Independent value |
| --- | ---: |
| $D$ | $0.7390851332151607$ |
| $R_\ast$ | $0.20211137351526115$ |
| $\omega_\ast$ | $4.9477670781574865$ |
| $f_\ast$ | $0.7874615877561081$ |
| $T_\ast$ | $1.269903212484974$ |
| $\Delta_\ast$ | $0.29875502283765176$ |
| $\Delta_\ast/T_\ast$ | $0.2352581046338496$ |
| $\mathcal J_{\mathrm{label}}^{\mathrm{raw}}$ | $5.726578731318179$ |
| $\mathcal J_{\mathrm{binary}}^{\mathrm{raw}}$ | $11.453157462636359$ |

This is an independent arithmetic check of the exact formulas, not independent evidence for the proposed ceiling law or for physical realization.

Plainly: the numbers in Sections 12 and 13 are internally consistent with the exact Dottie-number formulas. Their accuracy does not turn the conditional model into accepted dynamics.

## Best next theorem target

The strongest bounded next target is one symmetry-reduced winding stratum, not the unrestricted three-binary inverse problem:

> **Common-center equal-winding regular-chart disposition theorem.** Fix $c_f=1$, one declared polarity word, persistent labels, a common center, three declared oriented plane normals, primitive winding $\mathbf k=(1,1,1)$, and a compact collision-free relative-phase domain. Prove uniform positive range, delay, $D_t$, and $D_r$ floors and an unchanged five-partner root census over that domain. Then either enclose one exact zero of all twelve scalar perpendicular-residual components with all six forward inequalities nonnegative, or certify that the residual has no zero on the entire domain.

The proof route is:

1. quotient global Euclidean motion, absolute-time translation, and the three frame/phase representation redundancies;
2. derive analytic root branches and uniform floors on the compact quotient domain;
3. use the homothetic theorem to eliminate the one overall scale wherever the vector directions permit it;
4. reduce symmetry-related receivers and Fourier modes only by proved equivariance;
5. apply an independently authored interval or topological existence/exclusion instrument to the remaining residual; and
6. retain every hard root, collision, direction, and forward-margin failure separately rather than averaging them into a score.

This theorem would yield a prescribed-chart existence or exclusion result only. It would not establish a solution of the delayed evolution, retention, stability, action transfer, Noether-sea embedding, or physical identity.

Plainly: choose one finite, exact family and either find a mathematically certified braid-shaped residual zero or rule that whole family out. Do not begin with every possible winding, plane, center, and event geometry at once.

## Action, energy, and stability disposition

The action-transfer and energy interfaces are appropriately non-promotional. In particular, $\mathcal A_{\mathrm{cyc}}=EP$ is not treated as a generic identity: the packet requires that relation to be derived on the same branch before using $E=f\mathcal A_{\mathrm{cyc}}$. The integer allocation in $h_{\mathrm{act}}$ and any identification with observer-level Planck $h$ also remain explicit additional hypotheses. No repair is required at this claim boundary.

The stability proof order is also correct: no spectrum may be interpreted about a nonzero-residual configuration. FSC16-2 narrows only the later theorem statement and the distinction between local and global attraction.

Plainly: the manuscript correctly refuses to turn a repeating geometry or a zero speed-change diagnostic into stored energy, quantized action, or stability. Those conclusions still need their own native equations and proofs.

## Final disposition

FSC-016 is complete as an independent review gate. Sections 12--14 are suitable as a conditional program and are not reconciled as finished theorems. FSC-017 may consume the bounded theorem target above only after carrying FSC16-1 through FSC16-4 as explicit specification constraints. The reviewed source was not edited, so the review remains independent of the subject.

Closure goal: repair the active-constraint and monodromy statements, preserve the full scalar residual count, prove a boundary-independent many-braid tail limit before any Noether-sea claim, and then certify or exclude one compact three-binary winding stratum without promoting prescribed compatibility to retained dynamics.
