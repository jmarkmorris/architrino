# Equation Closure Pass 2026-06-24 I

## Workstream Metadata

- Kind: `priority`
- Status: `draft`
- Parent: [Equation Mapping Internal Priority](priorities.md)
- Source inventory: [Equation Mapping Detail](equation.md)
- Claim level: no-retune geometry correction and solver-certificate target
- Promotion status: priority-only

## Scope

This pass integrates the Elie Cartan-style common-carrier response for `EQ-02`, `EQ-03`, `EQ-04`, and downstream `EQ-04A`. It does not add a new equation row or score. It strengthens the first accepted evidence object from shared support to connection-controlled no-retune.

## Correction

The previous invariant-cell target remains necessary. A positive-width cell in truncated delay-state space is still the support certificate. The correction is that support alone does not forbid hidden retune. A fiber product over the common carrier proves that the rows project to the same support; it does not prove that the row fibers were transported by one rule.

The strengthened carrier is a bundle over the drift base

$$
B_{02\text{-}04}
=
\{(\mathfrak B_0,\mathcal N_0,u):-c_f<u<c_f\}
$$

with a connection $\omega$. The clock, envelope, two-way signal, energy, momentum, shell, phase, and Noether sea rows are associated-bundle readouts of one parallel section. The rest branch supplies the flat reference section at $u=0$, and the moving branch must supply the transport rule to $u\neq0$.

## Gamma-Free Coframe Target

The moving coframe is

$$
e^A_u
=
\left(e^0_u,e^\parallel_u,e^\perp_u\right).
$$

It must be constructed from causal-root and wake-return data, using $c_f$, $u$, $\mathcal L_{\mathrm{root}}(u)$, $\mathcal L_{\mathrm{wake}}(u)$, and retained boundary history. It must not use $\gamma_f(u)$, fitted Lorentz residuals, or the mass-shell target as inputs.

The compact theorem target is:

$$
e^0_u(\partial_t)=\lambda(u),
\qquad
\frac{e^\parallel_u}{e^\perp_u}=\lambda(u)^{-1},
\qquad
\eta_{AB}e^A_u e^B_u\ \text{is drift-invariant}.
$$

Then `EQ-02` is the time-leg readout, `EQ-03` is the reciprocal envelope-leg readout, and `EQ-04` is the coframe norm of the energy-momentum covector. Only after this construction may $\lambda(u)$ be compared with $\gamma_f(u)=(1-u^2/c_f^2)^{-1/2}$.

## Witness Split

The witness surface should split into:

- $W_{\mathrm{supp}}$: shared support on the same accepted invariant cell, `domainId`, and `commonCarrierId`.
- $W_{\mathrm{hol}}$: holonomy/parallel-section witness showing that the row sections are transported from one reference section under $\omega$.

$W_{\mathrm{supp}}=0$ is necessary. $W_{\mathrm{hol}}=0$ is the no-retune certificate.

The current first row-level blocker, `missing_accepted_raw_labeled_rows_preserved_on_retained_history`, should be upgraded in meaning. The accepted row is not just preserved labels; it is a local trivialization and flat reference section at $u=0$ plus a recorded gamma-free transport rule to $u\neq0$.

## Torsion And Sea Discipline

The solver output should include torsion

$$
T^A_u
=
de^A_u+\omega^A{}_{B,u}\wedge e^B_u.
$$

In the primitive homogeneous cell, the target is $T^A_u=0$. In dressed wake-tail or self-hit-asymmetric rows, nonzero $T^A_u$ becomes a measured wake-tail invariant.

The Noether sea tensor $\mathcal M_{\mathrm{sea}}^{ab}(u)$ remains a constitutive tensor. In the primitive run it is a consumer of the gamma-free coframe solution, not a source used to manufacture $\lambda(u)$ or $\gamma_f(u)$.

## Solver Output Target

Per drift value, the retained-record solver should emit:

$$
\left(
B_N,\Sigma_N,P_N,\mathcal K_{P_N},
e^A_u,
\omega^A{}_{B,u},
T^A_u,
\Phi_{T^2}(u),
\mathcal M_{\mathrm{sea}}^{ab}(u),
W_{\mathrm{supp}},
W_{\mathrm{hol}}
\right).
$$

Here $\Phi_{T^2}(u)$ is the holonomy of the equal-frequency three-binary phase bundle on $T^3/S^1\simeq T^2$. Phase offsets should be connection holonomy, not free phase handles.

## Koide Disposition

`EQ-04A` remains downstream. The strengthened interpretation treats

$$
\mathbf R_{\ell}
=
\left(\sqrt{M_{\ell,0}},\sqrt{M_{\ell,1}},\sqrt{M_{\ell,2}}\right)
$$

as the transported root/coframe section. Masses are quadratic norms of root-leg readouts. If

$$
\mathbf R_{\ell}
=
R_d\hat{\mathbf d}
+\mathbf R_{\mathrm{tr}},
$$

then the Koide angle is the moment-map/equipartition diagnostic

$$
\mathcal J_K
=
\lVert\mathbf R_{\mathrm{tr}}\rVert^2
-
\left|R_d\right|^2.
$$

Koide becomes interesting when $\mathcal J_K=0$ after the charged-lepton generation-by-shielding mass map has already fixed the three masses. It remains score-neutral if a Koide angle, mass scale, or exposure parameter is fitted directly.

## Score Decision

No scores change.

- `EQ-02` remains `4`.
- `EQ-03` remains `4`.
- `EQ-04` remains `4`.
- `EQ-04A` remains `1`.

The pass raises the no-retune burden and clarifies the solver output target, but it supplies no accepted invariant cell or holonomy witness.

## Next Action

The first executable form of this test is now recorded in [Equation Closure Pass 2026-06-24 J](equation-closure-pass-2026-06-24-j.md). The current attempt fixture declares a gamma-free coframe row and checks whether

$$
e^0_u(\partial_t)\frac{e^\parallel_u}{e^\perp_u}=1
$$

inside the arithmetic band. The remaining score-moving task is to replace the declared attempt legs with a wake-return extraction on certified invariant support and then build the full $W_{\mathrm{hol}}$ certificate.
