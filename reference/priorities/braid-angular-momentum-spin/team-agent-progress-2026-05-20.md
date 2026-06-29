# Team-Agent Progress 2026-05-20: Angular-Momentum Spin Proof Packets

This packet supports [Angular Momentum and Spin Closure](braid-angular-momentum-spin.md). It is priority material, not a completed theorem. Its purpose is to convert the angular-momentum, spinor, photon, measurement, and Bell scaffolds into branch-chart objects with pass/fail rows that can be evaluated by proof work or simulations.

The packet consumes the receiver-normal Master-Equation handoff: downstream angular-momentum work must pull the Noether wake-history increments back to a retained branch chart rather than treating missing torque as an informal correction. The immediate target is therefore a retained-chart conservation test for $\mathbf J$, followed by separate spinor and measurement gates.

## Branch-Chart Conservation Pullback

For a Noether braid branch chart $B$ on a transaction window $W=[t_i,t_f]$, the angular-momentum proof object is

$$
\mathcal C_{\mathbf J}^{B}(W)
=
\left(
\mathfrak B_B,
\mathfrak H_B,
\Gamma_{\mathrm{coupl}},
\{\mathbf T_\ell^B\}_{\ell\in\{I,M,O\}},
\Delta\mathbf J_{\mathrm{wake},\partial}^{B},
\Delta\mathbf L_{\mathrm{tr}}^{B}
\right).
$$

Here $\mathfrak B_B$ is the retained branch-chart certificate from the Master Equation, $\mathfrak H_B$ is the branch-history object, and

$$
\Gamma_{\mathrm{coupl}}
=
\left(
\sigma,
\Delta E_{\mathrm{coupl}},
\Delta\mathbf J_{\mathrm{coupl}},
\hat{\mathbf a},
\mathrm{Geom}_{\mathrm{coupl}}
\right)
$$

is the coupling datum. The chart must declare active roots $\mathcal R_B(t)$, self-hit histories $\mathcal H_{\ell,\alpha}^{B}(t)$, the Jacobian floor $\nu_J^B$, inactive-root gap $g_{\mathrm{inact}}^B$, memory depth $h_{\mathrm{mem}}^B$, phase residuals $\Psi_{\ell\alpha\leftarrow m\beta}^{(b)}$, and the section-stability margin used for branch persistence.

For each receiver layer,

$$
\mathbf T_\ell^B(t)
=
\sum_{\alpha}
\sum_{(m,\beta;b):(\ell,\alpha;m,\beta;b)\in\mathcal R_B(t)}
\mathbf x_{\ell,\alpha}(t)\times
\mathbf F_{\ell\alpha\leftarrow m\beta}^{(b)}(t).
$$

The layer mechanical increments are

$$
\Delta\mathbf L_{\mathrm{mech},\ell}^{B}
=
\int_{t_i}^{t_f}\mathbf T_\ell^B(s)\,ds,
$$

with $\Delta\mathbf L_{\mathrm{tr}}^{B}$ retained separately when the core center, layer centers, plane frames, or non-circular corrections are not negligible. The vector conservation residual is

$$
\mathcal R_{\mathbf J}^{B}
=
\frac{
\left\|
\Delta\mathbf J_{\mathrm{coupl}}
+
\sum_{\ell\in\{I,M,O\}}\Delta\mathbf L_{\mathrm{mech},\ell}^{B}
+
\Delta\mathbf L_{\mathrm{tr}}^{B}
+
\Delta\mathbf J_{\mathrm{wake},\partial}^{B}
\right\|
}{
\left\|\Delta\mathbf J_{\mathrm{coupl}}\right\|+\epsilon_{\mathbf J}
}.
$$

The projected scalar partition residual is defined only after the transaction axis $\hat{\mathbf a}$ is supplied by $\Gamma_{\mathrm{coupl}}$:

$$
\Delta I_\ell^{B}
=
\hat{\mathbf a}\cdot\Delta\mathbf L_{\mathrm{mech},\ell}^{B},
\qquad
\Delta I_{\mathrm{wake}}^{B}
=
\hat{\mathbf a}\cdot\Delta\mathbf J_{\mathrm{wake},\partial}^{B},
$$

and

$$
\mathcal R_I^{B}
=
\frac{
\left|
\sum_{\ell\in\{I,M,O\}}\Delta I_\ell^{B}
+
\hat{\mathbf a}\cdot\Delta\mathbf L_{\mathrm{tr}}^{B}
+
\Delta I_{\mathrm{wake}}^{B}
-
\Delta I_{\mathrm{accepted}}
\right|
}{
\left|\Delta I_{\mathrm{accepted}}\right|+\epsilon_I
}.
$$

The energy residual is

$$
\mathcal R_E^{B}
=
\frac{
\left|
\Delta E_{\mathrm{coupl}}
+
\sum_{\ell\in\{I,M,O\}}\Delta E_\ell^{B}
+
\Delta E_{\mathrm{wake},\partial}^{B}
+
\Delta E_{\mathrm{tr}}^{B}
\right|
}{
\left|\Delta E_{\mathrm{coupl}}\right|+\epsilon_E
}.
$$

The certified candidate set for an accepted transaction is therefore

$$
\mathscr P_{\mathrm{cert}}(B,\Gamma_{\mathrm{coupl}})
=
\left\{
\left(B',\boldsymbol{\Delta I}\right):
\mathcal R_{\mathbf J}^{B'}\le\varepsilon_{\mathbf J},
\mathcal R_I^{B'}\le\varepsilon_I,
\mathcal R_E^{B'}\le\varepsilon_E,
\nu_J^{B'}>\nu_{\min},
g_{\mathrm{inact}}^{B'}>g_{\min},
g_{\mathrm{phase}}^{B'}>0,
\lambda_{\mathrm{sec}}^{B'}>0
\right\}.
$$

This set makes the branch-selection cases precise:

- accepted and unique when $\left|\mathscr P_{\mathrm{cert}}\right|=1$;
- branch-dependent when $\left|\mathscr P_{\mathrm{cert}}\right|>1$ and no deterministic $\operatorname{Sel}_B$ has been supplied;
- forbidden when $\mathscr P_{\mathrm{cert}}=\varnothing$ and no reflected or wake-routed branch closes the vector and energy ledgers;
- routed into wake exchange when $\Delta I_{\mathrm{wake}}^{B}$ or $\Delta E_{\mathrm{wake},\partial}^{B}$ is nonzero and the full residual vector still passes.

## Minimal Four-Substep Certificate Rows

The solved minimal outer-coupled transition is now a reduced certificate inside the general object above. It is not the general partition theorem. For the fixed-normal, no-retained-wake branch with one outer substep, one middle substep, and two equal inner self-hit substeps, the common substep is

$$
\iota=\frac{\hbar}{4},
$$

so

$$
\Delta I_O=\frac{\hbar}{4},
\qquad
\Delta I_M=\frac{\hbar}{4},
\qquad
\Delta I_I=\frac{\hbar}{2},
\qquad
\Delta I_{\mathrm{wake}}=0.
$$

The branch-chart certificate should report these rows.

| Row | Certificate expression | Pass condition |
| --- | --- | --- |
| Scalar action | $\Delta I_O+\Delta I_M+\Delta I_I+\Delta I_{\mathrm{wake}}=\hbar$ | $\mathcal R_I^B\le\varepsilon_I$ |
| Vector ledger | $-\hbar\hat{\mathbf a}+\sum_\ell\Delta\mathbf L_{\mathrm{mech},\ell}^B+\Delta\mathbf L_{\mathrm{tr}}^B+\Delta\mathbf J_{\mathrm{wake},\partial}^B=\mathbf 0$ | $\mathcal R_{\mathbf J}^B\le\varepsilon_{\mathbf J}$ |
| Outer speed | $R_O^-\left(\omega_O^-+\hbar/(8\mu_{\mathrm{arch}}(R_O^-)^2)\right)<c_f$ | outer layer remains sub-field-speed |
| Middle hinge | $R_M^-\Delta\omega_M+\omega_M^-\Delta R_M=0$ | post-step hinge remains on $R_M\omega_M=c_f$ to first order |
| Inner self-hit | $s_I^+>1$ and $\delta_{\mathrm{self}}^+=2s_I^+\sin(\delta_{\mathrm{self}}^+/2)$ | inner self-hit branch remains admissible |
| Root parity | $\Delta N_{\mathrm{self}}=+2$, $\Delta D=0$ on the raw simple-root chart | even self-root jump with no declared discontinuity |
| Phase lock | $\Psi_{\ell\alpha\leftarrow m\beta}^{(b)}(t_f;B')\equiv0\pmod{2\pi}$ for retained active rows | no hidden phase-window failure |
| Energy | $\omega_{\mathrm{tx}}=\omega_\ast=(\omega_O^\ast+\omega_M^\ast+2\omega_I^\ast)/4$ in the clean branch | $\mathcal R_E^B\le\varepsilon_E$; otherwise route mismatch into root, wake, or transport terms |
| Stability | $\rho(D\mathcal P_{B'})<1$ or declared positive trapping replacement | accepted branch is stable, not only algebraically closed |

The useful advance is that a failed row now identifies a specific rerouting: energy mismatch, vector-transverse imbalance, missing wake term, root-parity failure, phase-window failure, or branch-instability failure.

## Ordered-Frame Spinor Return Table

The spinor route needs a return table before it needs more analogy. For a stable ordered branch $B$, write

$$
\mathcal G_B
=
\{\mathcal G_H,\mathcal G_M,\mathcal G_L,\mathcal G_{HM},\mathcal G_{HL},\mathcal G_{ML}\}.
$$

For a physical rotation path $\gamma$, the table row for each retained root-ledger entry $g\in\mathcal G_B$ is

$$
\mathcal T_g(\gamma)
=
\left(
\Delta k_g,
\Delta b_g,
\Delta\Psi_g,
\Delta o_g,
\Delta W_g,
\Delta J_g
\right).
$$

Here $\Delta k_g$ records winding or phase-branch change, $\Delta b_g$ records branch-sheet change, $\Delta\Psi_g$ records the phase residual after transport, $\Delta o_g$ records source/receiver ordering or emission-order change, $\Delta W_g$ records the component-resolved causal-writhe contribution, and $\Delta J_g$ records the contribution to angular-momentum residual bookkeeping.

The whole return record is

$$
\mathcal H_B(\gamma)
=
\left(
\{\mathcal T_g(\gamma)\}_{g\in\mathcal G_B},
\Delta\chi_c(\gamma),
\Delta\mathcal W_c^{\mathrm{core}}(\gamma),
\mathcal R_{\mathbf J}^{B}(\gamma)
\right).
$$

A candidate spinor lift must then provide a branch-declared homomorphism

$$
\eta_B:
\mathcal H_B(\gamma)\longrightarrow\mathbb Z_2
$$

that is invariant under allowed branch-preserving gauge homotopies and changes only through declared branch-changing events. The $2\pi$ gate is

$$
\pi\!\left(\mathcal T_{\gamma_{2\pi}}\tilde q_B\right)=\pi(\tilde q_B),
\qquad
\eta_B(\mathcal H_B(\gamma_{2\pi}))=1,
\qquad
\mathcal R_{\mathbf J}^{B}(\gamma_{2\pi})\le\varepsilon_{\mathbf J}.
$$

The $4\pi$ restoration gate is

$$
\mathcal T_{\gamma_{4\pi}}\tilde q_B=\tilde q_B,
\qquad
\eta_B(\mathcal H_B(\gamma_{2\pi}\ast\gamma_{2\pi}))=0,
\qquad
\mathcal R_{\mathbf J}^{B}(\gamma_{4\pi})\le\varepsilon_{\mathbf J}.
$$

This keeps the claim level disciplined. A nontrivial $2\pi$ history sheet is a theorem target only after $\eta_B$ is computed from causal-root continuation and component-resolved causal writhe on one stable branch certificate. If every row returns identically after $2\pi$, the ordered-core route closes as an ordinary $SO(3)$ object for that branch.

## Photon, Measurement, And Bell Gate Vector

Photon Gate B can advance before Bell only if it remains attached to the same angular-momentum ledger. For a Gate B record window, use the residual vector

$$
\mathcal R_{\gamma B}
=
\left(
\|P_\perp a_\perp-a_\perp\|,
\|A^2-A\|,
\|A^\dagger-A\|,
\left|\operatorname{tr}_\perp A-1\right|,
\sup_{\rho\in[0,1]}\left|\Delta_{\mathrm{pol}}(\rho)\right|,
\mathcal R_{\mathbf J}^{\gamma},
\mathcal R_{\mathrm{NS}}^{\gamma}
\right).
$$

The first four components test transverse support and rank-one analyzer projection. The detector-bias component tests the material return-map measure. The ledger component tests local energy, momentum, and angular-momentum balance for pass and reject channels. The no-signaling component tests that the polarization statistics cannot be used as a causal influence between separated analyzers.

For a Stern-Gerlach-like spin-measurement packet, use the single-core response vector

$$
\mathcal R_{\mathrm{SG}}
=
\left(
\sup_{\alpha}
\left|
P_+(\alpha\mid\mathrm{rec})
-
\cos^2\!\left(\frac{\alpha}{2}\right)
\right|,
\Delta_{\mathrm{rec}},
\mathcal R_{\mathbf J}^{\mathrm{app}},
\Delta_{\mathrm{prep}},
\Delta_{\mathrm{sep}}
\right).
$$

Here $\Delta_{\mathrm{rec}}$ measures failure of the record-cycle phase to push forward to the ideal measure, $\mathcal R_{\mathbf J}^{\mathrm{app}}$ measures the apparatus impulse ledger residual, $\Delta_{\mathrm{prep}}$ measures substrate-preparation mismatch for the effective spinor coordinate, and $\Delta_{\mathrm{sep}}$ measures failure of the reduced separatrix to match the concrete apparatus dynamics.

The Bell handoff remains downstream and should be reported as

$$
\mathcal R_{\mathrm{Bell}}
=
\left(
\Delta_{\mathrm{MI}}^{\mathrm{prov}},
\Delta_{\mathrm{NS}}^A,
\Delta_{\mathrm{NS}}^B,
\Delta_{\mathrm{Bell}}
\right).
$$

The intended pass class is

$$
\Delta_{\mathrm{MI}}^{\mathrm{prov}}\le\varepsilon_{\mathrm{MI}},
\qquad
\Delta_{\mathrm{NS}}^A,\Delta_{\mathrm{NS}}^B\le\varepsilon_{\mathrm{NS}},
\qquad
\Delta_{\mathrm{Bell}}\le\varepsilon_{\mathrm{Bell}}.
$$

If the Bell residual passes only by making the pair-provenance distribution setting-dependent, the measurement-response model has failed the intended closure. If the no-signaling residual fails, the result is not an acceptable Bell recovery even if the correlation curve is fit. If the single-core $\mathcal R_{\mathrm{SG}}$ packet fails, the pair-provenance calculation is premature.

## Direct Next Use

This packet updates the workstream in three concrete ways:

1. `fundamental_angular_momentum_ledger` now has a branch-chart conservation-pullback object and residual set to evaluate.
2. `spinor_closure` now has a return-table object that can falsify or support the provisional $2\pi$ / $4\pi$ history-lift route on one stable branch.
3. `photon_planar_pair_transverse_ledger`, `measurement_response`, `pair_provenance_measure`, and `bell_rebuild` now have separate residual vectors, so later work can fail locally without falsely demoting or promoting the whole angular-momentum program.
