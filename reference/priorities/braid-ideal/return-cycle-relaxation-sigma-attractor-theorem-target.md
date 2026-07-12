# Return-Cycle Relaxation — Transverse-Shear Attractor ($\sigma\to0$) Theorem Target

Claim level: derivation-closure target. This packet states the single theorem
that carries the settled $\sigma=0$ obligation of Corollary 1
([boosted-delay-attractor-theorem-target.md](../master-equation-closure/boosted-delay-attractor-theorem-target.md))
**independently of the axis absorber**. It is the proof-lane sibling of the
dynamical-sea axis-absorber build
([dynamical-sea-axis-absorber-instrument-spec.md](dynamical-sea-axis-absorber-instrument-spec.md)).
It does not claim the theorem is proved.

## Why $\sigma=0$ is now a separate obligation (the evidence that split it)

Corollary 1 needs the composed two-drift transverse shear $\sigma$ to settle to
zero (the composed state relaxes to the oblate spheroid about $\hat v_{\rm
comb}$). Until 2026-07-10 this was bundled with the axis absorber: the working
hypothesis was that $\sigma$ would settle once the spin axis $\hat n$ was
anchored to the drift $\hat d$. The native dynamical-sea run **refutes that
bundling**:

- **$\sigma$ is decoupled from the axis anchor.** In the reorienting-dipole gain
  sweep (polar-pair, $\theta=90°$, $u=0.2$), the axis anchor is gain-reachable
  ($\hat n$ to $10°$ from $\hat d$ at $p_0\times2$), yet $\sigma$ never settles at
  any gain (0.24–0.48) and does not track anchor quality: the *best* anchor
  ($p_0\times2$, $10°$) has the *worst* end $\sigma$ (0.42), a weak anchor
  ($a{=}1.8$, $37°$) the lowest (0.24), and $\sigma$ is *anti-correlated* in time
  (minimum *before* the axis anchors, then grows while it is best-anchored). The
  sea modestly *reduces* $\sigma$ versus the bare oblique release
  ($0.60\to0.24$–$0.48$) but never settles it. So the axis torque neither
  delivers nor gates $\sigma=0$ — it is a separate shape-sector obligation.
- **$\sigma$ dips then rebounds in the one-way release.** Bare and weakly-coupled
  oblique releases show $\sigma$ fall toward zero then rebound ($\theta=30°$:
  $0.797\to\mathbf{0.015}\to0.34$; the $50\times$ dip is real, the settle is
  not). The transverse isotropy is approached transiently but is **not an
  attractor** of the one-way (instantaneous-composition) shape dynamics.

Together these localize the shear to the **composed shape dynamics itself**, not
to the axis orientation. The settle must come from a relaxation channel the
one-way release lacks — the **return cycle** (the bidirectional wake phase-lock
that already supplies Corollary 2 / step S4).

## Theorem (target)

Let the composed transverse shape tensor $q_\perp(t)$ be the drift-frame
$2\times2$ block of the cycle-averaged shape tensor (instrument
`transverseShapeTensorBlock`), with shear $\sigma=(q_{\perp1}-q_{\perp2})/(q_{\perp1}+q_{\perp2})$.
**Claim:** under the **return-cycle** boosted-delay dynamics — the bidirectional
(fore/aft) wake with its phase-lock memory retained — the shear mode $\sigma$ is
a Lyapunov-decaying (asymptotically stable) mode of the composed shape sector, so
$\sigma(t)\to0$ and the composed state relaxes to the single-drift oblate
spheroid about $\hat v_{\rm comb}$, **for any fixed axis orientation** (anchored
or not). Equivalently: the transverse-shear eigenvalue of the return-cycle-
averaged shape response is strictly negative, whereas the one-way instantaneous
response leaves it non-negative (oscillatory), which is why the one-way release
only dips-and-rebounds.

This is exactly the analytic content of the theorem target's **step S3**
(uniqueness / path-independence, measured as $q_\perp$-anisotropy decay), now
attacked directly and decoupled from the axis sector.

## Proof strategy

1. **Shear mode isolation (R1).** In the drift frame, decompose the composed
   shape Jacobian's transverse block into trace (breathing), and the two
   traceless modes: the shear $\sigma$ and the in-plane rotation. Show (as in the
   S2 analysis) that the *one-way pointwise* law contributes no antisymmetric
   part to this block, so the shear's fate is set by the *history-dependent*
   (return-cycle) response, not the pointwise kernel.
2. **Return-cycle memory kernel (R2).** Write the transverse-shear response as a
   convolution against the bidirectional-wake memory kernel $K_{\rm rc}(\tau)$
   (the same fore/aft leg structure whose half-difference is the $\mathcal
   S_{\rm asm}$ offset, already native-measured: $0/0.103/0.223/0.413$). The
   settle question is the sign of $\int K_{\rm rc}$ projected on the shear mode.
3. **Decay sign (R3).** Show the return-cycle kernel makes the shear-mode
   eigenvalue strictly negative on the certified drift band — i.e. the fore/aft
   phase-lock damps the transverse anisotropy, converting the one-way dip-and-
   rebound into a monotone decay. This is the crux inequality.
4. **Axis-independence (R4).** Show the shear-mode eigenvalue does not change sign
   with the axis orientation (the transverse block is defined in the drift frame,
   about $\hat d$, independent of $\hat n$) — this is the analytic statement of
   the measured decoupling, and it is what lets Corollary 1 close on this theorem
   alone rather than waiting on the axis absorber.

## Instrument confirmation (what would witness R3)

The native release already retains the full bidirectional (return-cycle) history,
and it records drift-frame $\sigma(t)$ — but in the free release $\sigma$ is
confounded by the simultaneous axis tumble, coherent expansion, and radial
collapse, so the free $\sigma(t)$ track cannot by itself read the shear-mode
eigenvalue. The clean R3 witness is a **shear-mode linear-response probe**: seed
a small transverse quadrupole perturbation $\delta q_\perp$ on the relaxed
release with the axis held (reuse the existing `twinPerturbation` stability
machinery, projected on the traceless drift-frame shear mode rather than the
tangential kick), and measure whether $\delta\sigma(t)$ **decays** (shear-mode
eigenvalue $<0$ — $\sigma=0$ is an attractor, R3 holds) or **oscillates/grows**
(the dip-and-rebound is the marginal/forced case). Equivalently, sweep the seed
phase to map $\hat R_{\rm shear}(\omega_{\rm shape})$ and read the sign of its
real part. This isolates R3 empirically at fixed (unanchored) axis, decoupled
from the absorber. Build note: a `twinPerturbation`-style readback extension of
the same runner (shear-mode projection + decay-rate fit), not a new solver.

## Native R3 probe (2026-07-10) — R3 is not posable on the bare braid; it presupposes the shape fixed point

The shear-mode probe was built (`DECLARED.shearSeed`; traceless transverse
quadrupole on all sites' $x$ and $v$, drift-perpendicular frame; fixture (i);
suite 38/38) and run at $u=0$, row 7, $dt=0.001$, seeds $\varepsilon\in\{0.02,
0.05,0.15\}$. It does **not** cleanly read the shear-mode eigenvalue, and the
reason is itself the result:

- **The rest readback $\sigma$ is not zero** — the bare spindle's transverse
  ($x$–$y$) block is intrinsically anisotropic (three antipodal pairs at phases
  $[0°,120°,330°]$ and different radii), so $\sigma(u{=}0)\approx0.78$ at release,
  dipping to $0.36$ then rebounding to $0.47$. $\sigma=0$ is **not** the bare
  rest fixed point of this readback.
- **The bare release has no stable shape fixed point** — it coherently expands
  (the un-absorbed Row 7 rail pump) and halts by speed runaway (positive
  Lyapunov). So a seeded quadrupole diverges like *any* perturbation: the scaled
  responses $\delta\sigma/\varepsilon$ do **not** collapse across seeds (they
  differ in magnitude and even sign), i.e. the divergence is the release's
  general Lyapunov instability, not a clean shear-mode eigenvalue.

**Consequence — R3 is conditional on S1/S2, not independent of them.** The
shear-mode attractor question presupposes the composed state already sits at the
**stable oblate shape fixed point** (the theorem's existence/stability steps S1,
S2). The bare braid does not (radial expansion un-absorbed), so R3 cannot even be
posed there. This **refines the decoupling**: $\sigma=0$ is decoupled from the
**axis anchor** (the gain sweep — a different sector) but is **coupled to the
radial / rail-pump closure** — it rides on the *same* shape-attractor existence
(S1/S2) that the ruler arm needs anyway. So $\sigma=0$ is not a wholly separate
theorem needing a new mechanism; once S1/S2 deliver the stabilized oblate fixed
point, R3 (shear damping) becomes posable and the harmonic-matching argument
(R2/R3 below) can be applied and measured (re-run the shear probe *at the
stabilized fixed point*, where $\delta\sigma/\varepsilon$ should collapse and its
sign is the eigenvalue). Until then, the native R3 verdict is **blocked on the
radial closure**, not open on its own.

## Claim ladder and handoff

- The **decoupling** (R4, that $\sigma=0$ is not gated by the axis anchor) is
  native-measured (the gain sweep), stated here at measurement grade.
- R1 is a structured derivation (the S2 pointwise-symmetry result already gives
  the no-antisymmetric-pointwise-part half).
- R2–R3 (the return-cycle kernel and its shear-damping sign) are the open
  analytic core — the decay-sign inequality is the one unproved step — but the
  native probe (above) shows R3 is **conditional on S1/S2**: it can only be posed
  once the shape sits at the stabilized oblate fixed point. On the bare
  (expanding) braid the shear-mode eigenvalue is not measurable.

When R1–R4 close, this packet discharges the $\sigma=0$ half of Corollary 1, and
the native probe sharpens the dependency structure: $\sigma=0$ is decoupled from
the **axis anchor** but shares the **radial / shape-attractor closure (S1/S2)**
with the ruler arm. So large-drift Lorentz recovery needs (a) a settled axis
anchor (coherent dynamical sea / gain-tuned absorber, CTO lane), (b) the shape
attractor S1/S2 (which the ruler needs anyway), and (c) *given* (b), the shear
damping R2/R3 (proof lane) — three obligations, with $\sigma=0$ riding on (b)
rather than standing wholly alone. Fail-closed: names no retained branch,
authorizes no acceptance.
