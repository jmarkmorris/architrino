# Singularity Resolution

This section frames how architrino assemblies avoid singularities and how strong-field behavior should be interpreted in the tri-binary architecture. It is the canonical strong-field bridge for [Nested Binaries and the Noether Core](noether-core.md), [Tri-Binary Dynamics](../dynamics/tri-binary-dynamics.md), and [Black Holes](./black-holes.md).

## Canonical Strong-Field Alignment Condition

This chapter is the canonical source for the strong-field event-horizon alignment condition used across spacetime documents.

Use the following regime definition near the horizon:
$$
v_M=c_f,\qquad v_O\to c_f,
$$
with middle/outer binaries becoming coplanar and co-linear with the inner binary at alignment and precession ceasing in that limit.

This condition is a constitutive boundary condition on Noether-Sea state, not an isolated metric ansatz imported from an asymptotically flat solution. In schematic form, the horizon-interface closure problem is
$$
F_H\!\left[
\rho_{\text{core}}(\mathbf{x},t),
\Sigma_{\text{medium}}(\mathbf{x},t),
\mathbf{u}_{\text{medium}}(\mathbf{x},t),
\{\Lambda_{\text{NC}}\};
\partial\Omega
\right]
=0,
\qquad
v_M=c_f,\quad v_O\to c_f.
$$
The boundary data $\partial\Omega$ record the surrounding Noether-Sea and effective exterior state. A viable singularity replacement must solve the alignment condition with finite boundary data in embedded, non-isolated settings, rather than relying on asymptotic flatness as an implicit support.

### Trapped-Surface Comparison Pressure

Penrose-style singularity theorems are useful here because they remove a misleading loophole: collapse failure cannot be dismissed merely by abandoning exact spherical symmetry. At the effective GR comparison layer, a trapped surface is detected by both future-directed null expansions becoming negative,
$$
\theta_+^{\mathrm{eff}}<0,\qquad \theta_-^{\mathrm{eff}}<0.
$$
That is a standard-theory warning that weak-field continuation has entered a generic strong-collapse regime.

The $\mathbb{A}\mathbb{A}\mathbb{A}$ response is not to import the singularity as ontology. The comparison target is instead
$$
\theta_+^{\mathrm{eff}}<0,\quad \theta_-^{\mathrm{eff}}<0
\quad\Longrightarrow\quad
F_H=0,\qquad \mathcal{R}_H(\Omega)<\infty
$$
for the corresponding compact strong-field region $\Omega$, after the effective variables are translated into native Noether-Sea boundary data. In plain terms, whenever the observer-level GR description says collapse has passed the generic trapped-surface threshold, the native model must enter a finite maximum-curvature or horizon-interface regime rather than requiring symmetry, a zero-volume endpoint, or an arbitrary branch choice.

### Finite-Boundary-Data Regularity

The useful comparison lesson from analytic singularity-removal programs is not an imported mirror boundary or complex-time ontology. It is the regularity criterion: a candidate strong-field replacement must keep the native variables finite and the continuation rule unambiguous in the regime where the effective metric description would otherwise diverge.

For a compact strong-field region $\Omega$, a minimal diagnostic is
$$
\mathcal{R}_H(\Omega)
=
\sup_{\Omega}
\left(
|\rho_{\text{core}}(\mathbf{x},t)|
+
\|\Sigma_{\text{medium}}(\mathbf{x},t)\|
+
\|\mathbf{u}_{\text{medium}}(\mathbf{x},t)\|
\right)
<\infty,
$$
together with the horizon-interface condition $F_H=0$ and a finite Noether-core closure-label ensemble. This is a theorem target, not a definition of success: the strong-field model must show that finite boundary data determine a finite maximum-curvature replacement rather than a zero-volume endpoint or an arbitrary branch choice.

A sharper endpoint criterion is that those same finite data admit a continuation map
$$
\mathcal{T}_{\Omega}:
\left(
X_\Omega(t_i),
\mathcal{B}_{\partial\Omega}|_{[t_i,t_f]},
N_{\text{sea}}|_{\Omega\times[t_i,t_f]}
\right)
\longmapsto
X_\Omega(t_f),
$$
with
$$
F_H=0,\qquad
\mathcal{R}_H(\Omega)<\infty,\qquad
0<\left|\mathcal{B}_{H}\right|<\infty.
$$
This is the singularity-resolution form of the black-hole endpoint gate: the replacement must be finite, ledger-preserving, and non-arbitrary using compact boundary data, without importing a remnant, bounce, or asymptotic boundary condition as doctrine.

## Maximal Curvature vs Planck Scale

The **inner binary** (maximal curvature, self-hit regime) is a stabilization outcome of wake dynamics. The **middle binary always rides field speed** ($v=c_f$), with **variable radius and frequency**; it serves as the **energy-storage fulcrum** for transfers across the tri-binary.

In strong-field conditions (e.g., near an event horizon), the **outer binary frequency increases** and its **velocity approaches field speed**, while the **middle binary** remains at $v=c_f$ as its radius/frequency shift. At the horizon, the **middle and outer binaries reach $v=c_f$ and become coplanar and co-linear with the inner binary**, with **precession ceasing** at alignment.

One preserved intuition, to be read only as a heuristic, is that this alignment limit may correspond to a temporary **planar horizon state** rather than to the final interior shape. In that picture, the horizon is the point of strongest flattening, while deeper interior self-hit pressure can reopen the suppressed polar degree of freedom so the core returns to a finite 3D configuration instead of terminating in a zero-volume endpoint. This is compatible with the maximum-curvature replacement logic, but it is not yet a derived mechanism; compare [Horizon Chirality and Planar Spin](./horizon-chirality.md).

**Rule of thumb:** "Planck-scale" references in this framework map to the **event-horizon alignment condition** (tri-binary coplanarity/co-linearity at $v=c_f$), unless an explicit derivation links them to another scale.
