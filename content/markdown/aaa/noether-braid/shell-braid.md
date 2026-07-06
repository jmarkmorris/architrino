# Shell Braid

This chapter defines the one-band support family in the [Noether Braid](noether-braid.md) sequence. A shell braid adds controlled radial support to a [neutral braid](neutral-braid.md) without yet asserting the three ordered support bands of a [nested shell braid](nested-shell-braid.md).

A shell braid is the first step from balanced inventory toward spatial organization. The word `shell` says that the six paths stay within a controlled support band around a branch center. It does not say that the branch has already retained, that exact binary pairs exist, or that nested support bands have appeared.

A **shell braid** over a branch interval $J$ is a neutral braid whose six trajectories remain in a controlled radial band around a declared branch-center curve $\mathbf C:J\to\mathbb{R}^3$. For band limits $R_- < R_+$ and a representative shell scale $R_*$ satisfying $R_- \leq R_* \leq R_+$, the shell condition is

$$
R_-\leq
\left\| \mathbf X_i(T)-\mathbf C(T)\right\|
\leq R_+,
\qquad
i=1,\ldots,6,
\qquad
T\in J
$$

A narrow shell branch has small relative spread,

$$
\frac{R_+-R_-}{R_*}\leq\varepsilon_{\mathrm{shell}}
$$

while a broader shell branch keeps only the hollow-band condition. This is still not the nested shell braid. It is a one-band neutral braid whose support is spatially organized strongly enough to make a candidate exclusion envelope, shielding pattern, and Noether sea coupling channel meaningful for later certificate rows.

Near-antipodality is an optional shell braid constraint, not a definition of the neutral braid. A shell branch may carry an approximate fixed-point-free polarity-reversing involution $\iota$ with $\iota^2=\mathrm{id}$ and $\sigma_{\iota(i)}=-\sigma_i$, giving three opposite-polarity pairs. Relative to the declared branch-center curve $\mathbf C(T)$, define the near-antipodality defect

$$
\delta_{\mathrm{anti},i}(T)
=
\frac{
\left\| \mathbf X_i(T)+\mathbf X_{\iota(i)}(T)-2\mathbf C(T)\right\|
}{R_*}
$$

Exact antipodality, $\delta_{\mathrm{anti},i}=0$, is an ideal symmetry chart. It should not be expected in ordinary conditions: an external potential can disturb one member of the matching first, and the delayed response takes time to circulate through the full six-body causal ledger. The physical shell claim is therefore near-antipodality plus recovery,

$$
\sup_{T\in J}\delta_{\mathrm{anti},i}(T)
\leq
\varepsilon_{\mathrm{anti}},
\qquad
\delta_{\mathrm{anti},i}(T+T_{\mathrm{rec}})
\leq
\theta_{\mathrm{rec}}\,\delta_{\mathrm{anti},i}(T)+\varepsilon_{\mathrm{drive}}
\qquad
T,T+T_{\mathrm{rec}}\in J
$$

for recovery time $T_{\mathrm{rec}}$, dimensionless recovery contraction factor $0\leq\theta_{\mathrm{rec}}<1$, and driving residue $\varepsilon_{\mathrm{drive}}$. Near-antipodality is useful because it captures the shell branch's tendency to restore opposite-side balance without pretending that the two matched architrinos remain in lockstep under perturbation.

## Axis-Neutral Invariant Channel

The sharpest currently proved structure in the shell braid family is a symmetry channel, not a retained branch. The face-opposite seed places the three positrinos on the positive coordinate axes and the three electrinos opposite them,

$$
\epsilon_{+,x}=(R,0,0),
\qquad
\epsilon_{+,y}=(0,R,0),
\qquad
\epsilon_{+,z}=(0,0,R),
\qquad
\epsilon_{-,i}=-\epsilon_{+,i}
$$

Two finite symmetry groups act on this seed by simultaneous spatial transformation and site relabeling: the zero-angular-momentum group $S_3\times\langle\iota\rangle$, where $S_3$ permutes the coordinate axes together with the site labels and $\iota$ composes point inversion with polarity exchange, and the axis-neutral rotating group $C_3\times\langle\iota\rangle$, where $C_3$ is the three-fold rotation about the body diagonal

$$
\hat{\mathbf n}=\frac{(1,1,1)}{\sqrt3}
$$

Under four explicit assumptions — an equivariant delayed-force kernel whose magnitude depends only on invariant scalars times the polarity product, a complete symmetric causal-root policy with no label-dependent pruning, a well-posedness window with transversal roots and sub-field-speed histories, and symmetric initial path history — the unique solution remains on the fixed-point set of the acting group for as long as the window lasts. This is a derivation about the delayed dynamics, and it converts the six-body problem into small closed reduced systems: two scalar functions for the zero-angular-momentum channel, three for the axis-neutral rotating channel, and two representative worldlines ($\epsilon_{+,x}$ and $\epsilon_{-,x}$) once the branch also carries group velocity along $\hat{\mathbf n}$, because translation breaks $\iota$ while preserving $C_3$. Invariance of the channel does not prove stability transverse to it, and no statement in this section claims branch retention.

### Drum Geometry

Every site of the face-opposite seed has the same height $\pm R/\sqrt3$ along $\hat{\mathbf n}$ and the same lever arm $R\sqrt{2/3}$ from the axis, because the body diagonal makes equal angles $\arccos(1/\sqrt3)$ with the three coordinate axes. Viewed along $\hat{\mathbf n}$, the shell braid is a short drum: the three positrinos form a triangular ring above the mid-plane, the three electrinos form a matching ring below it, and the two triangles are staggered by $60^\circ$ so their projections interleave into a hexagon. Equal lever arms give every site the same tangential speed under rigid rotation about $\hat{\mathbf n}$, and on the rotating channel the three opposite-polarity pairs hold an exact $120^\circ$ phase separation at every instant, because the rotation by $2\pi/3$ about $\hat{\mathbf n}$ is one of the acting symmetries rather than an approximate phase convention.

### Axial Polarity Dipole

Since $\mathbb I+\varrho+\varrho^2=3\hat{\mathbf n}\hat{\mathbf n}^{\!\top}$ for the cyclic coordinate permutation $\varrho$, the polarity-signed dipole of the channel is exactly axial at all times, even under drift:

$$
\sum_{\ell}\sigma_\ell\,\mathbf X_\ell
=
3\left(\hat{\mathbf n}\cdot\left(\epsilon_{+,x}-\epsilon_{-,x}\right)\right)\hat{\mathbf n}
$$

The transverse dipole components cancel in balanced three-phase fashion. A branch that flattens toward the transverse plane therefore loses its leading polarity-signed moment entirely: the flattened fast shell braid is dipole-quiet, with its first surviving structure at higher multipole order. This identity is the shell braid's native contribution to the energy-shielding story used by the nested chapters, and it links the terminal planar limit to wake quietness rather than to increased exposure.

### Momentum Screw and Helicity

The same projector identity pins both kinematic momenta to the axis on the rotating channel:

$$
\mathbf P_{\mathrm{kin}}
=
3\,\hat{\mathbf n}\cdot\left(\mathbf v_{+,x}+\mathbf v_{-,x}\right)\hat{\mathbf n},
\qquad
\mathbf J_{\mathrm{kin}}\parallel\hat{\mathbf n}
$$

The axis-neutral direction is therefore the central axis of the branch's momentum screw: the unique direction that carries both linear and angular kinematic momentum, with the transport state reduced to the two scalars $P_\parallel$ and $J_\parallel$. Their origin-independent combination $\mathbf J\cdot\mathbf P$ — helicity in normalized form, screw pitch in geometric form — is the natural combined label, since an origin shift changes $\mathbf J$ only by a term orthogonal to $\mathbf P$. In delayed dynamics the particle-only momenta are not separately conserved; the causal wakes carry momentum and angular momentum of their own, and conservation is a statement about the combined particle and wake ledger. On the channel, symmetry fixes the momentum directions exactly while the magnitudes exchange with the wake ledger.

### Isolated Release and the Return-Response Question

Held-release diagnostics of the face-opposite seed on the zero-angular-momentum channel separate two claims that must not be conflated. The symmetry claim holds to numerical precision: the released seed stays on the invariant channel, with the dynamic center at zero, all six radii equal, and antipodal partners exact. The stability claim fails in isolation: across the tested windows the reduced radius shows a single compression-to-expansion turn and then expands without any later inward acceleration row, so the isolated seed behaves as a symmetric contraction-and-release channel rather than a self-maintaining branch.

This pairing is informative rather than damaging. A shell braid was never expected to close as a bare partner-wake problem in the Euclidean void: the candidate stabilizing ingredients — same-source self-hit rows, retained wake-energy response, shielding, angular-momentum-bearing initial data, and local Noether sea response — are exactly the ingredients the isolated diagnostic omits. The void result therefore sharpens the retention question into a return-response question: which internal or environmental term changes the reduced-radius equation from escape to a second turning point, a stable support radius, or a bounded limit cycle. The rotating channel defined above supplies the first untested internal candidate, since the zero-angular-momentum release is a radial free-fall chart with no centrifugal support. The environmental candidate is the local Noether sea response row developed in [Noether sea](../spacetime/noether-sea.md): in that reading, isolation is a limiting seed chart, and physical retention is local persistence inside an already populated medium.

### Polarity Conjugation and Fore-Aft Asymmetry

Because the delayed-force kernel depends on polarity only through products $\sigma_i\sigma_j$, global polarity conjugation leaves every trajectory unchanged: a positrino-face-leading branch and an electrino-face-leading branch are exactly degenerate in isolation. The leading-octant sign can acquire physical meaning only through coupling to an environment that is not polarity-balanced, which is where ordered-braid chirality must obtain its content; the helicity sign of the momentum screw is the candidate carrier of that chirality label. Translation along $\hat{\mathbf n}$, by contrast, produces a real asymmetry: with $\iota$ broken, the leading face meets fresh medium while the trailing face rides in the branch's own wake, and this fore-aft wake asymmetry is the native deformation channel developed further in [Nested Shell Braid Dynamics](nested-shell-braid-dynamics.md).
