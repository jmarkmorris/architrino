# Master Equation Review: Open Items After the 2026-07-24 Electrodynamics-Comparison Pass

## Status

- Purpose: record the items from an electrostatics/electrodynamics comparison review of the canonical per-hit acceleration law that are **not yet captured** in `content/markdown/aaa/dynamics/master-equation.md`
- Scope: the canonical branch law, its wake-energy bookkeeping, and its kernel argument list
- Standing: priority analysis; not canon, not an EOM solver specification
- Provenance caution: the numerical tables below were produced by a single script in which the $\mathbb{A}\mathbb{A}\mathbb{A}$ evaluator and the observer-level comparison instrument were authored together, in one change, by one author. Under the Evidence Independence rule that is **not** independent agreement. Grade every number here `measured, non-independent`. The closed forms are separately checkable and are graded `derived`.

**Plainly:** this file is a to-do list of things a review turned up that nobody has written into the theory documents yet. It also warns that the numbers in it were produced by one program checking itself, so they are leads to follow, not settled results.

## What this review already lost to faster work

Two of the three findings from this review were captured, independently and more completely, while the review was still being written. They are listed here so no one re-opens them.

| Finding | Status | Where |
| --- | --- | --- |
| Exact $1/\gamma_f$ transverse projection under rigid common translation | **Captured, extended** | `master-equation.md`, Moving Transceiver Geometry section |
| Self-hit tangential sign flip at $\beta_f=\pi/2$; self-hit strictly outward | **Captured, extended** | `master-equation.md` §self-hit propositions |
| Conserved-account underdetermination; $\mathbf P_{\text{wake}}$/$\mathbf L_{\text{wake}}$ circularity | **Already documented** | [analysis-transmitter-factor-conservation-obstruction.md](analysis-transmitter-factor-conservation-obstruction.md) |

Two corrections to the review, both from the captured work:

1. The review reported that the partner-plus-self tangential total has **no** zero for $\beta_f\in(1,20)$. That search used only the **principal** partner root. Including older signed partner sheets, the complete sum does vanish at discrete points beginning near $\beta_f\approx3.07036$, with inward net radial acceleration. Exact constant-speed circular algebraic balance is **not** excluded. The review's non-existence reading was an artifact of a restricted ledger.

2. The review offered the rigid-translation transverse identity as evidence that $W^{\mathrm{acc}}$ is transmitter-side. On that branch $\mathbf V_i=\mathbf V_j$, so substituting $D_r$ for $D_t$ leaves the weight unchanged. **The configuration cannot discriminate transmitter-side from receiver-side attribution.** The transmitter-side attribution rests on the uniform-emission causal-surface-density derivation, not on this test.

**Plainly:** the review got two things wrong and the corpus caught both. One was a search that did not look at enough branches. The other was offering a test as evidence for something the test physically cannot see.

---

## Item 1 — Wake-energy bookkeeping is dimensionally inconsistent (highest confidence, no instrument needed)

Three expressions intended to denote the same quantity carry three different dimensions. Let $L$, $T$, $Q$ denote length, time, polarity, with $[\kappa]=L^3T^{-2}Q^{-2}$.

| Expression | Location | Dimensions |
| --- | --- | --- |
| $K_\mu=\tfrac12\mu_{\text{arch}}\lVert\mathbf V\rVert^2$ | Energy functional | $[\mu]\,L^2T^{-2}$ |
| $E_{\text{wake}}$ from the action kernel $\mathcal K_{ij}$ | Action-Level Wake-Energy Functional | $L\,T^{-1}$ |
| $E^{(\eta)}_{\text{wake}}$ regularized diagnostic | Regularized Energy Diagnostic | $T^{-1}$ |

The diagnostic reads

$$
E^{(\eta)}_{\text{wake}}(T_r)=\tfrac12\sum_{i,j}\kappa\sigma_{ij}|q_iq_j|\int \mathrm dT_t\,\frac{W^{\mathrm{acc}}_{ij}}{r_{ij}^2}\,\delta_\eta\!\left(g_{ij}\right)
$$

Collapsing $\delta_\eta$ supplies $1/\lvert D_{t,ij}\rvert$, which is a **second** factor of $W^{\mathrm{acc}}/c_f$. So the diagnostic evaluates to $\tfrac12\sum\kappa\sigma|q_iq_j|\,W^2/(c_f r^2)$: one power of $W^{\mathrm{acc}}$ too many, one power of $r$ too many, and no $\mu_{\text{arch}}$.

**Plainly:** potential energy has to fall off like one over the distance, the way Coulomb potential energy does. This expression falls off like one over distance squared, which is the shape of an acceleration, not an energy. It also counts the delay-compression weight twice. It is not a slightly-off version of the right thing; it is a different kind of thing.

Collapsing the action kernel on a simple root gives the correct shape:

$$
E_{\text{wake}}=-\tfrac12\sum_{i,j}\mu_{\text{arch}}\,\kappa\,\sigma_{ij}\,|q_iq_j|\,\frac{W^{\mathrm{acc}}_{ij}}{r_{ij}}
\qquad
[\mu]\,\frac{L^3T^{-2}}{L}=[\mu]L^2T^{-2}\ \checkmark
$$

which corresponds to repairing the action-kernel prefactor from $\dfrac{\kappa\sigma_{ij}|q_iq_j|}{c_f}$ to $\mu_{\text{arch}}\,\kappa\,\sigma_{ij}\,|q_iq_j|$.

### Required work

1. Verify all three dimension counts by hand. No simulation is involved; this is checkable in minutes.
2. Verify the proposed corrected form and prefactor.
3. Decide which published expression is authoritative and correct the other, or correct both. Current occurrences: the diagnostic near the `W^acc/r^2` integrand, and the `/c_f` prefactor at three sites in the action sections.
4. Enumerate consumers. Any $\mathcal R_E$ residual, $\eta$-ladder convergence study, or test under `tests/` computing a wake energy is currently measuring a dimensionally inconsistent quantity, and any agreement it reports is not evidence.
5. Report whether any published number in the corpus depends on the incorrect form. If so its grade drops until recomputed.

### Falsifier

Evaluate the corrected wake energy for a static pair with $W^{\mathrm{acc}}=1$. It must reduce to $\mu_{\text{arch}}\kappa|q_iq_j|/r$. Failure overturns the correction.

Grade: `derived`. Independent reference: dimensional analysis of the declared symbol dimensions.

---

## Item 2 — The kernel is blind to transmitter acceleration, and this is nowhere stated

The per-hit law reads $\mathbf X_t(T_t)$ and $\mathbf V_t(T_t)$ from the transmitter history. The transmitter's **acceleration** at the emission event appears nowhere in the kernel. A search of `master-equation.md` finds no statement of this fact or its consequences.

Consequences to verify and record as an explicit design commitment:

1. **A causal wake carries no memory of transmitter acceleration.** From a single hit, a receiver cannot distinguish an inertially moving transmitter from an accelerating one.
2. **There is no $1/r$ channel.** With a strictly inverse-square kernel, flux through a large sphere falls off and no energy reaches infinity at substrate level. There is no field-radiation channel.
3. **There is therefore no radiation reaction.** This is plausibly a **feature**: it removes the classical point-charge self-force runaway by construction, which is one of the pathologies the Finite-Regulator Pathology Quarantine section works to exclude. Check whether that section can claim this more directly than it currently does.
4. **Radiation must be entirely emitted-assembly.** Audit `content/markdown/aaa/reactions/radiation.md`, `bremsstrahlung.md`, and `synchrotron.md` for any argument that implicitly assumes a field radiation channel or an acceleration-dependent emission amplitude.

**Plainly:** the wake an architrino sends out records where it was and how fast it was going, but not whether it was speeding up. That single omission decides several large questions at once — it means nothing radiates away into the distance at this layer, which in turn means the classical runaway problem never arises, and it means every account of radiation in the theory has to come from whole assemblies being emitted rather than from fields carrying energy off.

A reader can currently finish the chapter without noticing any of this. Make it a stated commitment rather than an implicit consequence.

Grade: `derived` for the argument-list observation; `target` for consequences 2–4 until the audit runs.

---

## Item 3 — Rigid-translation residual: general orientation and the symmetry null space

`master-equation.md` records the perpendicular-configuration pair sum as a momentum-closure non-claim:

$$
\mathbf A_{ij}+\mathbf A_{ji}=2\kappa\sigma_{ij}\frac{|q_iq_j|}{d^2}\beta_f\hat{\mathbf e}
$$

What is **not** captured is the general-orientation form and its consequence. Measured over a sweep in $\psi$, the angle between the instantaneous separation and the drift direction:

$$
\sum_i\mathbf A_i=\frac{2\beta_f\,\kappa\,\sigma\,|q^2|}{d^2}\bigl(-\cos2\psi,\;-\sin2\psi,\;0\bigr)
$$

Constant magnitude at every orientation; direction rotating at **twice** the orientation angle. Never zero for a pair, at any $\psi$ or any $d$.

**Plainly:** turning the pair does not remove the leftover shove. It only rotates it, and it rotates twice as fast as you turn the pair. So there is no orientation at which two architrinos can simply coast side by side.

That $2\psi$ dependence is the useful part. A quantity that rotates at twice the angle is a second-harmonic object, and second-harmonic objects cancel under three-fold or higher rotational symmetry. Measured, units $\kappa|q^2|/d^2$ at $\beta_f=0.3$:

| configuration | $\sum_i\mathbf A_i$ |
| --- | --- |
| pair, any $\psi$ | $0.6$ — never zero |
| collinear 3, along drift axis | $-1.35$ |
| equilateral triangle in drift plane | **0** (exact) |
| square in drift plane, all like polarity | **0** (exact) |
| square, alternating polarity (neutral) | **0** (exact) |
| regular tetrahedron, generic orientation | $0.15$ — **not** zero |

**Plainly:** three architrinos in a triangle can coast. Two cannot. Three in a line cannot. A tetrahedron, at least in the orientation tested, cannot. The pattern suggests the law does not forbid drifting assemblies so much as it selects which shapes are allowed to drift.

### Required work

1. **Derive the general 3D per-pair residual.** The planar form above is verified; the 3D form is not, and the tetrahedron result proves the 3D case is not automatic.
2. **State and prove or refute the null condition.** The planar evidence is consistent with the residual being a traceless rank-2 object that cancels whenever the pair distribution weighted by $\sigma_{ij}|q_iq_j|/d_{ij}^2$ has vanishing second harmonic about the drift axis. Note the square cancels even with **alternating** polarity, meaning the $\sigma_{ij}$ weighting cancels within the edge set and within the diagonal set separately; explain why.
3. **Test the certified braid geometries** in `content/markdown/aaa/noether-braid/` against the null condition. Do not assume they pass. Untested geometries are unknown, not passing.
4. **Establish the failure timescale.** The residual is linear in the assembly's own drift speed, so a failing assembly obeys $d\mathbf V/dT\propto\pm\mathbf V$. A preliminary scaling gives $\sim(c_f/v_{\text{internal}})$ internal periods, which for relativistic internal speeds is a few cycles. If that holds, the test is binary — a braid is in the null space, or it cannot exist as a drifting object. There is no small-correction regime.

### Dependency

This item is coupled to the open line-of-action question already recorded in `master-equation.md`. Replacing the emission-point line of action by an inertially extrapolated one changes the residual at first order in $\beta_f$. A three-way tension is recorded for the perpendicular configuration:

| line of action | transverse binding | pair sum |
| --- | --- | --- |
| emission point (canonical) | $1/\gamma_f$ | $2\beta_f$ |
| inertially extrapolated emission point | $\gamma_f$ | $0$ |
| structure including a receiver-velocity term | $1/\gamma_f$ | $0$ |

The first two differ by exactly $\gamma_f^2$ transversally, and $\gamma_f$ is configuration-dependent, so no constant renormalization of $\kappa$ reconciles them. If no transmitter-side-only law achieves both properties, the no-receiver-velocity axiom is what is under test. **Do not relax that axiom without operator decision** — it is currently asserted in three separate places in the chapter.

**Plainly:** there are three things we want and no known version of the law gives all three at once. Fixing the leftover shove by aiming the line of action differently breaks the exact transverse result, and by a factor that changes with speed, so no single constant can patch it. The third option works but requires the receiver's own velocity to enter, which the theory currently forbids.

Grade: `measured, non-independent` for both tables. `target` for the null condition until derived.

### Falsifiers

- Recompute the pair sum at any $\beta_f>0$ and any $\psi$. A zero result overturns the general-orientation form.
- Recompute the triangle or square at any $\beta_f$. A nonzero result overturns the null-space table.
- Add a fourth architrino breaking the three-fold symmetry of a passing configuration. A still-zero result overturns the proposed null condition.
- Absorb the $\gamma_f^2$ gap into a redefinition of $\kappa$. Success overturns the three-way tension.

---

## Suggested order

Item 1 first and alone. It needs no instrument, and until it is fixed any wake-energy residual in the test suite is measuring the wrong object, which contaminates verification of the others. Item 3 next, since it carries the live theory question. Item 2 is an audit and can run in parallel with either.

Reproduction script for Items 1 and 3: [evidence/drift-residual-null-space-2026-07-24.py](evidence/drift-residual-null-space-2026-07-24.py). It shares the non-independence defect noted in Status; treat it as a lead generator, not as certification.

Closure goal: resolve the wake-energy dimensional inconsistency, then determine whether the rigid-translation residual is a symmetry selection rule satisfied by certified braids or a live obstruction to translating assemblies.
