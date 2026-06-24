# Common Carrier Geometry Review Response

## Overall Insights, Corrections, And Advancements

The central correction is that a fiber product over the common carrier is necessary but weak. It proves that the rows project to the same support, but it does not prevent separate tuning in the row fibers. No-retune needs a connection over the drift base and a holonomy witness showing that clock, envelope, two-way signal, energy, momentum, shell, phase, and Noether sea rows are parallel readings of one section.

The natural base is the drift line

$$
B_{02\text{-}04}
=
\{(\mathfrak B_0,\mathcal N_0,u):-c_f<u<c_f\}.
$$

The rest branch supplies the reference section at $u=0$. The moving branch should supply a gamma-free transport rule to $u\neq0$. Under this reading, `EQ-02`, `EQ-03`, and `EQ-04` are associated-bundle readouts of one moving coframe, not three co-fitted rows.

The key coframe target is

$$
e^A_u
=
\left(e^0_u,e^\parallel_u,e^\perp_u\right),
$$

constructed from causal-root and wake-return data using $c_f$, $u$, $\mathcal L_{\mathrm{root}}$, $\mathcal L_{\mathrm{wake}}$, and retained boundary history. The construction is forbidden to use $\gamma_f$, fitted Lorentz residuals, or the shell target as inputs. The desired theorem target is:

$$
e^0_u(\partial_t)=\lambda(u),
\qquad
\frac{e^\parallel_u}{e^\perp_u}=\lambda(u)^{-1},
\qquad
\eta_{AB}e^A_u e^B_u\ \text{is drift-invariant}.
$$

Only after this construction may $\lambda(u)$ be compared with $\gamma_f(u)=(1-u^2/c_f^2)^{-1/2}$.

The witness surface should split into:

1. $W_{\mathrm{supp}}$: shared support on the same accepted invariant cell, `domainId`, and `commonCarrierId`.
2. $W_{\mathrm{hol}}$: holonomy or parallel-section mismatch under the connection $\omega$.

$W_{\mathrm{supp}}=0$ is necessary; $W_{\mathrm{hol}}=0$ is the no-retune certificate.

The mass shell should be treated as a coframe norm rather than a separate postulate. A regulator-free shell residual should compute the Minkowski norm squared of the unit energy-momentum covector in the orthonormal coframe. Raw and normalized residuals remain diagnostics, but regulators should not be part of the acceptance claim.

The Noether sea tensor $\mathcal M_{\mathrm{sea}}^{ab}$ is a constitutive response, not a substrate metric. In the primitive homogeneous run it should be a consumer of the drift and coframe solution, never a source used to manufacture $\lambda(u)$ or $\gamma_f(u)$.

Torsion is the missing row for wake-tail and self-hit asymmetry:

$$
T^A_u
=
de^A_u+\omega^A{}_{B,u}\wedge e^B_u.
$$

The primitive homogeneous target is $T^A_u=0$. In dressed wake-tail rows, nonzero $T^A_u$ becomes a measurable invariant rather than an unnamed residual.

For equal-frequency tri-binaries, the phase rows live naturally on $T^3/S^1\simeq T^2$. Phase offsets should be holonomy of a flat $T^2$ phase-bundle connection over the drift line, not free torus angles.

For `EQ-04A`, the useful reading is that square-root masses are root/coframe coordinates. The vector

$$
\mathbf R_{\ell}
=
\left(\sqrt{M_{\ell,0}},\sqrt{M_{\ell,1}},\sqrt{M_{\ell,2}}\right)
$$

should be the transported object, with mass as the quadratic norm of each root leg. Decomposing

$$
\mathbf R_{\ell}
=
R_d\hat{\mathbf d}
+\mathbf R_{\mathrm{tr}}
$$

gives the moment-map/equipartition diagnostic

$$
\mathcal J_K
=
\lVert\mathbf R_{\mathrm{tr}}\rVert^2
-
\left|R_d\right|^2.
$$

The Koide angle condition is $\mathcal J_K=0$. It is evidence only if the charged-lepton generation-by-shielding map fixes the root section first.

## Integrated Answers

1. The common carrier should be a bundle with connection over the drift base, not only a fiber product over a label.
2. The first accepted geometric evidence object is a rest-frame flat reference section plus a gamma-free transport rule.
3. Solver output per $u$ should include $(e^A_u,\omega^A{}_{B,u},T^A_u,\Phi_{T^2}(u),\mathcal M_{\mathrm{sea}}^{ab}(u),W_{\mathrm{supp}},W_{\mathrm{hol}})$, alongside the invariant-cell certificate.
4. `EQ-02` is the time leg $e^0_u(\partial_t)$; `EQ-03` is the reciprocal envelope leg $e^\parallel_u/e^\perp_u$; `EQ-04` is the coframe norm of energy-momentum.
5. The fatal circularity is $\gamma_f\to e^A_u\to$ recovered $\gamma_f$. The coframe construction must be pre-registered as gamma-free.
6. `EQ-04A` should test Koide as a post-prediction mass-root moment-map residual, not as a fitted angle or claimed invariant.
7. The fastest falsifier is the $\beta_f=0.6$ coframe reciprocity test:

$$
e^0_u(\partial_t)\frac{e^\parallel_u}{e^\perp_u}=1.
$$

This test must extract $e^A_u$ from wake-return timing without inserting $\gamma_f$.

## One-Line Synthesis

The next score-moving `EQ-02` through `EQ-04A` artifact is a positive-width invariant cell plus a gamma-free coframe connection with $W_{\mathrm{hol}}=0$; shared support alone is not enough.
