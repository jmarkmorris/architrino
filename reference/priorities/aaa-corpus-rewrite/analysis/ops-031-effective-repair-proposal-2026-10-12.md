# OPS-031 — Effective Lagrangian replacements, October 12, 2026

**✓ Implemented — all nine groups approved and separately verified.** The [implementation closure](../evidence/ops-031-effective-correction-closure-2026-10-12.md) records final source identity, independent mathematical verification and the separately requested Claude review. This is the single before/after review surface for the [October 11 findings](../../aaa-operations/evidence/ops-031-effective-lagrangian-review-2026-10-11.md) and their [existing maintenance referral](../work-queue.md#ops-031--october-11-effective-lagrangian-referral). Each Before block is an exact unique excerpt; each After block is its proposed literal replacement. Links inside fenced excerpts are relative to the target chapter. No action, conserved physical account, symplectic construction, singular event law, quantization or spin recovery is established by these repairs. CRW-005 remains closed.

Target: [Effective Lagrangian](../../../../content/markdown/aaa/dynamics/effective-lagrangian.md). Source SHA-256: `fbf1be86d20fb7115b464ff9940d83c83447b8b6fb2bbcc835cb9a045c22138c`. All nine groups were approved and implemented on October 12, followed by separate verification. Before/After blocks below preserve the exact approved replacements.

## ELO11-01 — Separate arriving-hit weight from root playback

**✓ Implemented.** Transmitter-time coarea collapse determines the arriving weight independently of the receiver playback derivative.

Source line 5.

Before:

```markdown
The validity condition is exact: any variational scaffold in this chapter that does not produce transmitter-side acceleration weight is invalid as closure evidence. The required path-history functional must reduce to an acceleration law carrying $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ on the same retained roots as the Master Equation. Here $c_f$ is the causal-wake propagation speed and $D_t$ measures how the transmitter crosses the causal-root condition. Transmitter-side factors remain transversality diagnostics until they are paired with the receiver-side factor and checked by the stated residuals.
```

After:

```markdown
The validity condition is exact: any variational scaffold in this chapter that does not produce transmitter-side acceleration weight is invalid as closure evidence. The required path-history functional must reduce to an acceleration law carrying $W^{\mathrm{acc}}=c_f/\lvert D_t\rvert$ on the same retained roots as the Master Equation. Here $c_f$ is the causal-wake propagation speed and $D_t$ measures how the transmitter crosses the causal-root condition. The transmitter-side factor determines the acceleration weight on a simple retained root. The receiver-side factor separately determines root playback; recovering the acceleration law from an action requires the complete variation and its boundary terms.
```

## ELO11-02 — Use dimensioned complete residuals in charge tests

**✓ Implemented.** Quadratic charge differentiation requires μ_arch; separately defined complete Euler residuals prevent the scale-only diagnostic from gaining action authority.

Source line 384, fragment 1.

Before:

```markdown
A derivation, reduction, or simulation that claims action-derived dynamics must therefore distinguish the scale-only diagnostic below from the complete Euler derivative. The scale-only row checks agreement with the desired native acceleration scale, but a small value does not establish that the candidate action varies to that law, because receiver, transmitter, constraint, self-history, and boundary terms may remain.
```

After:

```markdown
A derivation, reduction, or simulation that claims action-derived dynamics must therefore distinguish the scale-only diagnostic below from the complete Euler derivative. The scale-only row checks agreement with the desired native acceleration scale, but a small value does not establish that the candidate action varies to that law, because receiver, transmitter, constraint, self-history, and boundary terms may remain. Define $\mathbf A_{i,\mathrm{scale}}^{(\eta)}=\sum_j\kappa\sigma_{ij}|q_iq_j|\mathbf A_{ij,\mathrm{scale}}^{(\eta)}$ for the scale-only normalizer. Separately, where the complete first variation admits the split $\delta S_\eta=-\sum_i\int\mu_{\mathrm{arch}}(\mathbf A_i-\mathbf A_{i,\mathrm{act}}^{(\eta)})\cdot\boldsymbol\xi_i\,dT+\delta S_{\eta,\mathrm{boundary}}$, it defines the complete action acceleration $\mathbf A_{i,\mathrm{act}}^{(\eta)}$. Every receiver, transmitter, constraint and self-history term must be included. Define $\mathbf R_{\mathrm{EL},i}^{(\eta)}=\mathbf A_i-\mathbf A_{i,\mathrm{act}}^{(\eta)}$ on that chart. This complete Euler residual is distinct from the scale-only $\mathbf R_{A,i}^{(\eta)}$ displayed below; their equality requires a separate proof. If the complete split has not been established, the charge-balance tests have not been supplied for that candidate.
```

Source line 397, fragment 2.

Before:

```markdown
$$
\epsilon_{\mathrm{var}}^{(\eta)}(W)
=
\frac{
\sum_i\int_W\|\mathbf{R}_{A,i}^{(\eta)}(T)\|\,dT
}{
\sum_i\int_W
\left(
\|\mathbf A_i(T)\|
+
\|\mathbf{A}_{i,\mathrm{act}}^{(\eta)}(T)\|
\right)dT
+
\varepsilon
}
$$
```

After:

```markdown
$$
\epsilon_{\mathrm{var}}^{(\eta)}(W)
=
\frac{
\sum_i\int_W\|\mathbf{R}_{A,i}^{(\eta)}(T)\|\,dT
}{
\sum_i\int_W
\left(
\|\mathbf A_i(T)\|
+
\|\mathbf{A}_{i,\mathrm{scale}}^{(\eta)}(T)\|
\right)dT
+
\varepsilon_A
}
$$
```

Source line 573, fragment 3.

Before:

```markdown
$$
\epsilon_E^{(\eta)}(W)
=
\frac{
\left|
\Delta_W\left(K+E_{\text{wake}}^{(\eta)}\right)
-
\int_W\sum_i\mathbf V_i\cdot\mathbf{R}_{A,i}^{(\eta)}\,dT
-
\int_W\mathcal{B}_E^{(\eta)}\,dT
\right|
}{
\left|\Delta_W K\right|
+
\left|\Delta_W E_{\text{wake}}^{(\eta)}\right|
+
\varepsilon
}
$$
```

After:

```markdown
$$
\epsilon_E^{(\eta)}(W)
=
\frac{
\left|
\Delta_W\left(K+E_{\text{wake}}^{(\eta)}\right)
-
\int_W\sum_i\mu_{\text{arch}}\,\mathbf V_i\cdot\mathbf{R}_{\mathrm{EL},i}^{(\eta)}\,dT
-
\int_W\mathcal{B}_E^{(\eta)}\,dT
\right|
}{
\left|\Delta_W K\right|
+
\left|\Delta_W E_{\text{wake}}^{(\eta)}\right|
+
\varepsilon_E
}
$$
```

Source line 604, fragment 4.

Before:

```markdown
$$
\epsilon_P^{(\eta)}(W)
=
\frac{
\left\|
\Delta_W\left(\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake}}^{(\eta)}\right)
-
\int_W\sum_i\mathbf{R}_{A,i}^{(\eta)}\,dT
-
\int_W\boldsymbol{\mathcal{B}}_P^{(\eta)}\,dT
\right\|
}{
\left\|\Delta_W\mathbf{P}_{\mathrm{mech}}\right\|
+
\left\|\Delta_W\mathbf{P}_{\mathrm{wake}}^{(\eta)}\right\|
+
\varepsilon
}
$$
```

After:

```markdown
$$
\epsilon_P^{(\eta)}(W)
=
\frac{
\left\|
\Delta_W\left(\mathbf{P}_{\mathrm{mech}}+\mathbf{P}_{\mathrm{wake}}^{(\eta)}\right)
-
\int_W\sum_i\mu_{\text{arch}}\,\mathbf{R}_{\mathrm{EL},i}^{(\eta)}\,dT
-
\int_W\boldsymbol{\mathcal{B}}_P^{(\eta)}\,dT
\right\|
}{
\left\|\Delta_W\mathbf{P}_{\mathrm{mech}}\right\|
+
\left\|\Delta_W\mathbf{P}_{\mathrm{wake}}^{(\eta)}\right\|
+
\varepsilon_P
}
$$
```

Source line 627, fragment 5.

Before:

```markdown
$$
\epsilon_J^{(\eta)}(W)
=
\frac{
\left\|
\Delta_W\left(\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake}}^{(\eta)}\right)
-
\int_W\sum_i\mathbf X_i(T)\times\mathbf{R}_{A,i}^{(\eta)}\,dT
-
\int_W\boldsymbol{\mathcal{B}}_J^{(\eta)}\,dT
\right\|
}{
\left\|\Delta_W\mathbf{J}_{\mathrm{mech}}\right\|
+
\left\|\Delta_W\mathbf{J}_{\mathrm{wake}}^{(\eta)}\right\|
+
\varepsilon
}
$$
```

After:

```markdown
$$
\epsilon_J^{(\eta)}(W)
=
\frac{
\left\|
\Delta_W\left(\mathbf{J}_{\mathrm{mech}}+\mathbf{J}_{\mathrm{wake}}^{(\eta)}\right)
-
\int_W\sum_i\mu_{\text{arch}}\,\mathbf X_i(T)\times\mathbf{R}_{\mathrm{EL},i}^{(\eta)}\,dT
-
\int_W\boldsymbol{\mathcal{B}}_J^{(\eta)}\,dT
\right\|
}{
\left\|\Delta_W\mathbf{J}_{\mathrm{mech}}\right\|
+
\left\|\Delta_W\mathbf{J}_{\mathrm{wake}}^{(\eta)}\right\|
+
\varepsilon_J
}
$$
```

Source line 595, fragment 6.

Before:

```markdown
Here $\mathcal{B}_E^{(\eta)}$ is the declared endpoint or period-cut leakage. For isolated period-matched tests, $\epsilon_{\mathrm{var}}^{(\eta)}\to0$, $\mathcal{B}_E^{(\eta)}\to0$, and $\epsilon_E^{(\eta)}\to0$ are the minimal conservation checks before the effective Hamiltonian is accepted as more than a diagnostic fit.
```

After:

```markdown
Here $\mathcal{B}_E^{(\eta)}$ is signed endpoint or period-cut power leakage. Momentum and angular-momentum leakages have units of momentum per time and angular momentum per time. The positive denominator floors $\varepsilon_A$, $\varepsilon_E$, $\varepsilon_P$, and $\varepsilon_J$ have velocity, energy, momentum, and angular-momentum units, respectively. The three charge balances use the complete $\mathbf R_{\mathrm{EL},i}^{(\eta)}$, not the scale-only $\mathbf R_{A,i}^{(\eta)}$. Vanishing complete Euler residual and leakage support conservation tests only with separately derived charges and balance identities; small scale-only $\epsilon_{\mathrm{var}}^{(\eta)}$ alone is insufficient.
```

Source line 597, fragment 7.

Before:

```markdown
The energy residual above is theorem-level only after the chart declares one symmetry-preserving action or independently derived causal-wake update, its endpoint convention, branch floors, and endpoint or period-cut leakage terms. The work-integral reconstruction $U(T)$ remains a trajectory diagnostic unless it is derived from that same construction and boundary convention.
```

After:

```markdown
The energy residual is a charge-balance test only after a symmetry-preserving generating action or independently derived causal-wake update supplies the actual energy, complete dynamical residual, endpoint convention, branch floors and signed window leakage. Dimensional weighting alone establishes no charge identity and cannot evaluate an unconstructed Noether test. The work-integral reconstruction $U(T)$ remains a trajectory diagnostic unless independently identified with that construction and boundary account.
```

Source line 603, fragment 8.

Before:

```markdown
For an effective reduction to promote a retained chart rather than fit it, it must also report vector residuals for the same branch pullback:
```

After:

```markdown
Derive momentum, angular momentum and their finite-window balances on the same complete branch record. In the quadratic kinetic chart, a valid balance has the following dimensionally weighted form, using the complete acceleration-valued Euler residual defined above:
```

Source line 649, fragment 9.

Before:

```markdown
Small $\epsilon_E^{(\eta)}$, $\epsilon_P^{(\eta)}$, and $\epsilon_J^{(\eta)}$ are conservation diagnostics when the regularization is inserted at the equation-of-motion level. They become Noether-charge tests only when the action regularization itself preserves time translation, spatial translation, and rotation symmetry on the retained chart.
```

After:

```markdown
Small $\epsilon_E^{(\eta)}$, $\epsilon_P^{(\eta)}$, and $\epsilon_J^{(\eta)}$ test only the declared charges and balance identities. They are Noether-charge tests only after the same generating action, symmetry variation and boundary account independently establish those identities. Symmetry-preserving regularization is necessary but does not derive the charges or identify the scale-only comparison with the complete Euler residual.
```

## ELO11-03 — Distinguish the received statistic from a conserved wake charge

**✓ Implemented.** Correct static normalization does not resolve the independently reconstructed factor-of-two moving-pair power mismatch.

Source line 469, fragment 1.

Before:

```markdown
Because the Lagrangian is nonlocal in time, the corresponding Noether charges are path-history functionals tracking interactions that are still carried by causal wakes between emission and reception.
```

After:

```markdown
Any Noether charges independently constructed for this nonlocal action are history-aware boundary functionals. Their interaction and endpoint content must follow from the complete variation; nonlocality alone does not specify a conserved charge.
```

Source line 534, fragment 2.

Before:

```markdown
where the action-level nonlocal Noether charge can be written with the weighted causal kernel from [Master Equation](./master-equation.md#action-level-wake-energy-functional-at-a-time-boundary). To avoid confusing the receiver-gradient kernel above with the Noether-energy kernel, write
```

After:

```markdown
Here $E_{\text{wake}}$ denotes the independently derived wake contribution required by the conservation target; no formula for that charge is established here. The following received-interaction statistic from [Master Equation](./master-equation.md#action-level-wake-energy-functional-at-a-time-boundary) is a different object. To distinguish it from the receiver-gradient kernel and a conserved energy, write
```

Source line 535, fragment 3.

Before:

```markdown
$$
\mathcal{K}_{ij}^{E}(T_1,T_t)
=
\mu_{\text{arch}}\kappa\,\sigma_{ij}\,|q_iq_j|
\Theta(T_1-T_t)
\frac{\delta\!\big(\tilde g_{ij}(T_1,T_t)\big)}
{r_{ij}(T_1,T_t)}
$$
```

After:

```markdown
$$
\mathcal{K}_{ij}^{\mathrm{stat}}(T_1,T_t)
=
\mu_{\text{arch}}\kappa\,\sigma_{ij}\,|q_iq_j|
\Theta(T_1-T_t)
\frac{\delta\!\big(\tilde g_{ij}(T_1,T_t)\big)}
{r_{ij}(T_1,T_t)}
$$
```

Source line 548, fragment 4.

Before:

```markdown
$$
E_{\text{wake}}(T)
=
-\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{T} dT_t
\int_{T}^{\infty} dT_1\,
\partial_{T_1}\mathcal{K}_{ij}^{E}(T_1,T_t)
$$
```

After:

```markdown
$$
E_{\mathrm{stat}}(T)
=
-\frac{1}{2}\sum_{i,j}
\int_{-\infty}^{T} dT_t
\int_{T}^{\infty} dT_1\,
\partial_{T_1}\mathcal{K}_{ij}^{\mathrm{stat}}(T_1,T_t)
$$
```

Source line 559, fragment 5.

Before:

```markdown
The outer minus sign matches the action convention $S=S_{\mathrm{kinetic}}-\tfrac12\sum S_{ij}$ and makes the static like-polarity pair charge positive. Reversing that sign would contradict the positive work required to bring a repelling like-polarity pair closer.
```

After:

```markdown
The outer minus sign gives correct static normalization: for a stationary pair at separation $R$, the statistic is $C/R$, with $C=\mu_{\mathrm{arch}}\kappa\sigma_{12}|q_1q_2|$. With vanishing upper reception-time boundary, the composed derivative integrates to half the ordered interaction contributions received at the current time. That normalization does not establish conservation. With $c_f=1$, move only one receiver locally at radial speed $\epsilon$ while preserving the incoming emission histories of a static pair. Then $E_{\mathrm{stat}}'=-C\epsilon/(2R^2)+O(\epsilon^2)$, whereas negative action-derived mechanical power is $-C\epsilon/R^2+O(\epsilon^2)$. This factor-of-two mismatch rules out identifying the displayed statistic with the required wake charge under that account. This is a prescribed-history test of the candidate functional and account, not an evolved Master Equation solution or a verdict that the Master Equation violates conservation.
```

Source line 561, fragment 6.

Before:

```markdown
The boundary charge must inherit both the units and the sign of the same action kernel.
```

After:

```markdown
A genuine boundary charge requires an independent derivation with the units, sign and endpoint terms of the same generating action. The displayed statistic is not substituted for $E_{\text{wake}}$ in the conservation tests.
```

## ELO11-04 — Keep resonance replay conditional

**✓ Implemented.** Incommensurate canonical flows preserve globally defined actions and the symplectic form; periodic memory replay is a proposed construction, not a universal necessity.

Source line 231, fragment 1.

Before:

```markdown
Outside that locus, the action integral is multivalued under the return map, so the apparent integer is a local chart artifact rather than a branch invariant.
```

After:

```markdown
Outside that locus, global action integrals and any return-map monodromy must be tested on the actual branch. Incommensurate phase motion does not by itself make an action integral multivalued or invalidate a Hamiltonian chart. An invariant integer-action condition still requires its independently established phase transport and holonomy data; a local chart alone does not supply that recovery result.
```

Source line 933, fragment 2.

Before:

```markdown
where $h$ is the retained memory depth and $\mathcal K_{\mathrm{symp}}$ is built from the same branch causal kernel that supplies the acceleration. The explicit construction of $\mathcal K_{\mathrm{symp}}$ and the boundary-flux identity below are open requirements for Hamiltonian validity. The residual $\epsilon_{\omega}$ is small only when this memory term is replayable: after one return, the retained history segment $[-h,0]$ must map to a congruent segment with the same branch records and boundary convention. This is why phase-locked branches are the natural Hamiltonian domain. They replay the history window that carries $\omega_{\mathrm{mem}}$, while off-lock branches leak symplectic content through the memory boundary and can look dissipative after projection.
```

After:

```markdown
where $h$ is the retained memory depth and $\mathcal K_{\mathrm{symp}}$ is a candidate memory kernel to be constructed from the same retained branch dynamics. Its descent to the effective chart, closedness, nondegeneracy and relation to boundary flux remain open requirements. Congruent history replay over one return is a useful candidate construction for the selected phase-locked chart: it permits comparison of the same history segment and boundary convention on successive returns. It does not by itself prove preservation of $\omega_0+\omega_{\mathrm{mem}}$, and periodic replay is not established as necessary for every Hamiltonian reduction. Off-lock branches require their own two-form and boundary-flux test; phase drift alone establishes neither symplectic leakage nor energy loss.
```

Source line 935, fragment 3.

Before:

```markdown
Equivalently, $\omega_{\mathrm{mem}}$ is the symplectic flux through the boundary of the retained memory interval. A branch admitting a Hamiltonian description must make that boundary periodic under the return map:
```

After:

```markdown
For a selected periodic return chart, a derived boundary-flux identity could relate the candidate memory correction to transport through the boundary of the retained interval. Once that identity and its boundary convention are supplied, the corresponding periodic cancellation target is
```

Source line 946, fragment 4.

Before:

```markdown
after quotienting only true zero-Floquet neutral directions. If the memory-boundary flux has a secular component, the projected chart can conserve neither the corrected symplectic form nor the apparent energy ledger without adding the missing history variable. This is the same branch-symplectic validity condition used by the scalar causal-action return-map residual and by binary or doubling-frequency return-map records: preserve $\omega_0+\omega_{\mathrm{mem}}$ on the retained delayed chart, not merely the instantaneous phase volume.
```

After:

```markdown
after quotienting only independently verified neutral symmetry directions. The displayed boundary integral remains schematic until its flux form and integration convention are constructed. A secular contribution to that derived flux would require an explicit balance with the retained interior record, omitted history variables and window boundary terms; it would not by itself prove failure of energy conservation. The general validity test remains preservation of the constructed corrected two-form on the admitted chart, rather than instantaneous phase volume alone.
```

## ELO11-05 — Separate temporal parity from tensor antisymmetry

**✓ Implemented.** An isotropic delayed response can have an odd-frequency part while its antisymmetric spatial tensor component vanishes.

Source line 807.

Before:

```markdown
Its even part supplies candidate inertia-like and mass-renormalization coefficients; its odd part supplies candidate anti-damping, viscosity-like response, and antisymmetric stress. Ratios such as $\eta_{\mathrm{cg}}/m_{\mathrm{eff}}$ or $\eta_{\mathrm{cg}}/\kappa$ become branch invariants only after the same delayed kernel and comparison window have been independently certified.
```

After:

```markdown
Its even part supplies candidate inertia-like and mass-renormalization coefficients; its odd-frequency part supplies candidate damping or anti-damping and viscosity-like response. Antisymmetric stress requires a separately derived antisymmetric tensor component: temporal frequency parity and interchange of spatial indices are different operations. Ratios such as $\eta_{\mathrm{cg}}/m_{\mathrm{eff}}$ or $\eta_{\mathrm{cg}}/\kappa$ are branch diagnostics computed from the same delayed kernel and comparison window. Calling a ratio invariant additionally requires the specified state or chart transformations to preserve it; independent certification of one value does not establish invariance.
```

## ELO11-06 — Use disjoint energy accounts and signed window inputs

**✓ Implemented.** Count each coherent-to-incoherent transfer once and normalize signed transfers with nonnegative magnitudes.

Source line 809, fragment 1.

Before:

```markdown
The corresponding dissipation residual is
```

After:

```markdown
For the comparison window, declare nonoverlapping retained accounts $K_{\mathrm{cg}}$ and $E_{\mathrm{wake}}$. Let $D_{\mathrm{ex}}(W)$ be the signed net transfer out of these accounts into heat or medium-response channels excluded from $E_{\mathrm{wake}}$, positive for outward transfer and negative for return. Let $\mathcal W_{\mathrm{in}}(W)$ be the signed net energy supplied to the retained accounts by external work and the window boundary, positive for input. A separately derived balance then has the comparison residual
```

Source line 811, fragment 2.

Before:

```markdown
\mathcal R_{\mathrm{diss}}(W)
=
\frac{
\left|
\Delta_W K_{\mathrm{cg}}
+\int_W
\left(
2\eta_{\mathrm{cg}}\mathring E_{ij}\mathring E^{ij}
+\zeta_{\mathrm{cg}}(\nabla_{\mathbf X}\cdot\mathbf{u})^2
\right)\,dT\,dV
+\Delta_W E_{\mathrm{wake}}
\right|
}{
|\Delta_W K_{\mathrm{cg}}|
+\int_W
\left(
2\eta_{\mathrm{cg}}\mathring E_{ij}\mathring E^{ij}
+\zeta_{\mathrm{cg}}(\nabla_{\mathbf X}\cdot\mathbf{u})^2
\right)dT\,dV
+|\Delta_W E_{\mathrm{wake}}|
+\varepsilon
}
```

After:

```markdown
\mathcal R_{\mathrm{diss}}(W)
=
\frac{
\left|
\Delta_W K_{\mathrm{cg}}
+\Delta_W E_{\mathrm{wake}}
+D_{\mathrm{ex}}(W)
-\mathcal W_{\mathrm{in}}(W)
\right|
}{
|\Delta_W K_{\mathrm{cg}}|
+|\Delta_W E_{\mathrm{wake}}|
+|D_{\mathrm{ex}}(W)|
+|\mathcal W_{\mathrm{in}}(W)|
+\varepsilon_{\mathrm{diss}}
}
```

Source line 837, fragment 3.

Before:

```markdown
This residual prevents ordinary viscous loss language from replacing the exact wake-history energy ledger. A nonzero positive quadratic term is allowed as a coarse channel for coherent-to-incoherent transfer, but the transferred content must appear in the retained wake, heat, or medium-response record.
```

After:

```markdown
Here $\varepsilon_{\mathrm{diss}}>0$ has energy units. The quadratic constitutive comparison gives $D_{\mathrm{visc}}(W)=\int_W[2\eta_{\mathrm{cg}}\mathring E_{ij}\mathring E^{ij}+\zeta_{\mathrm{cg}}(\nabla_{\mathbf X}\cdot\mathbf u)^2]dT\,dV$. It is nonnegative only under the declared nonnegative coefficient and positive-metric assumptions. Its transfer belongs in $D_{\mathrm{ex}}$ only to the extent that it is excluded from the retained wake-energy change; energy already counted in $\Delta_W E_{\mathrm{wake}}$ must not be added again. The boundary and external-input account must use the same retained window and sign convention. This is an accounting comparison pending a derived balance, not a new physical dissipation law.
```

## ELO11-07 — State first-derivative and moving-endpoint conventions

**✓ Implemented.** The field expression excludes higher derivatives; moving endpoints use total displacement and the displayed vertical Noether generator fixes time.

Source line 473, fragment 1.

Before:

```markdown
The ordinary boundary-term identity makes the recovery burden precise. For a local action, the first variation splits into an interior Euler-Lagrange term and an endpoint term,
```

After:

```markdown
The ordinary boundary-term identity makes the recovery burden precise. For a first-derivative local action, $\delta q_{\mathrm{std}}^a$ is the interior variation at fixed time, while $\Delta q_{\mathrm{std}}^a=\delta q_{\mathrm{std}}^a+\dot q_{\mathrm{std}}^a\delta t_{\mathrm{std}}$ is the total endpoint displacement. The first variation splits into the interior Euler-Lagrange term and moving-endpoint term,
```

Source line 474, fragment 2.

Before:

```markdown
$$
\delta S_{\mathrm{std}}
=
\int_{t_{\mathrm{std},a}}^{t_{\mathrm{std},b}}
\left(
\frac{\partial L_{\mathrm{std}}}{\partial q_{\mathrm{std}}^a}
-
\frac{d}{dt_{\mathrm{std}}}\frac{\partial L_{\mathrm{std}}}{\partial (dq_{\mathrm{std}}^a/dt_{\mathrm{std}})}
\right)\delta q_{\mathrm{std}}^a\,dt_{\mathrm{std}}
+
\left[p_a\delta q_{\mathrm{std}}^a-H_{\mathrm{std}}\delta t_{\mathrm{std}}\right]_{t_{\mathrm{std},a}}^{t_{\mathrm{std},b}}
$$
```

After:

```markdown
$$
\delta S_{\mathrm{std}}
=
\int_{t_{\mathrm{std},a}}^{t_{\mathrm{std},b}}
\left(
\frac{\partial L_{\mathrm{std}}}{\partial q_{\mathrm{std}}^a}
-
\frac{d}{dt_{\mathrm{std}}}\frac{\partial L_{\mathrm{std}}}{\partial (dq_{\mathrm{std}}^a/dt_{\mathrm{std}})}
\right)\delta q_{\mathrm{std}}^a\,dt_{\mathrm{std}}
+
\left[p_a\Delta q_{\mathrm{std}}^a-H_{\mathrm{std}}\delta t_{\mathrm{std}}\right]_{t_{\mathrm{std},a}}^{t_{\mathrm{std},b}}
$$
```

Source line 502, fragment 3.

Before:

```markdown
The more general local Noether form also matters. For an infinitesimal active transformation
```

After:

```markdown
For a local first-derivative action, the following vertical Noether formula concerns infinitesimal active coordinate transformations at fixed time:
```

Source line 509, fragment 4.

Before:

```markdown
the action variation is unchanged when the Lagrangian changes at most by a total time derivative,
```

After:

```markdown
Assume the prolonged coordinate variation changes the Lagrangian only by the total derivative
```

Source line 525, fragment 5.

Before:

```markdown
Spatial translations have $G=0$ and recover momentum. Rotations recover angular momentum. Time translations are the case where the total-derivative term supplies the Hamiltonian energy. In the delayed chart, the same pattern is admissible only after $X^a$, $G$, and the boundary functional are replaced by history-aware branch quantities from the retained causal-root record.
```

After:

```markdown
Spatial translations with $G=0$ recover momentum, and rotations recover angular momentum. The displayed vertical formula has no time generator and does not cover a change of the time coordinate. Time-translation symmetry uses the moving-endpoint identity above; for a time-independent local Lagrangian it conserves the Hamiltonian. In a delayed chart, each generator, boundary term and charge requires a separate history-aware derivation on the retained causal-root record.
```

Source line 841, fragment 6.

Before:

```markdown
At the standard local-field level, the action principle changes the object being varied rather than the logic of stationarity. A particle path in the recognition form is replaced by effective fields $\varphi_{\mathrm{eff}}^A(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$, and the local action has the layer-explicit schematic form
```

After:

```markdown
At the standard local-field level, a particle path is replaced by effective fields $\varphi_{\mathrm{eff}}^A(x_{\mathrm{eff}}^i,t_{\mathrm{eff}})$. For the first-derivative density considered here, the action depends on these fields and their first time and spatial derivatives only:
```

Source line 842, fragment 7.

Before:

```markdown
$$
S[\varphi]
=
\int dt_{\mathrm{eff}}\,d^3x_{\mathrm{eff}}\,
\mathcal{L}
\left(
\varphi_{\mathrm{eff}}^A,
\partial_{t_{\mathrm{eff}}}\varphi_{\mathrm{eff}}^A,
\partial_{x_{\mathrm{eff}}^i}\varphi_{\mathrm{eff}}^A,
\ldots
\right).
$$
```

After:

```markdown
$$
S[\varphi]
=
\int dt_{\mathrm{eff}}\,d^3x_{\mathrm{eff}}\,
\mathcal{L}
\left(
\varphi_{\mathrm{eff}}^A,
\partial_{t_{\mathrm{eff}}}\varphi_{\mathrm{eff}}^A,
\partial_{x_{\mathrm{eff}}^i}\varphi_{\mathrm{eff}}^A
\right).
$$
```

Source line 857, fragment 8.

Before:

```markdown
Fixed-boundary variation gives the field Euler-Lagrange expression
```

After:

```markdown
For this first-derivative density, fixed-boundary variation gives the field Euler-Lagrange expression
```

Source line 871, fragment 9.

Before:

```markdown
This is the common effective grammar behind Maxwell, Einstein-Hilbert, and Standard Model action formulations. For $\mathbb{A}\mathbb{A}\mathbb{A}$ it is not a license to treat fields as substrate objects. It is the recovery grammar a local chart must satisfy after the delayed branch record has been coarse-grained into admitted fields and after its Euler-Lagrange residual has been checked against the same causal-wake, boundary, and transmitter-side acceleration-weight records.
```

After:

```markdown
This first-derivative expression is a local-field recovery template. Higher-derivative densities require their higher-order Euler derivatives and corresponding boundary data: the comparison density $\tfrac12(\partial_t^2\varphi)^2$ contributes $\partial_t^4\varphi$. Equivalent first-derivative formulations require their own boundary treatment, including for the Einstein-Hilbert comparison. For $\mathbb{A}\mathbb{A}\mathbb{A}$ these templates do not make effective fields substrate objects. A recovered local chart must be checked against the same delayed histories, causal roots, acceleration weights and boundary record.
```

## ELO11-08 — Keep the regular minimax barrier separate from fold crossing

**✓ Implemented.** A positive Jacobian floor excludes a fold; empty connecting-path classes yield infinity, not a proved finite transition barrier.

Source line 998, fragment 1.

Before:

```markdown
The corresponding computable object is a branch-barrier diagnostic. It is the minimum value of the receiver-side statistic required to change $[\mathfrak B]$ by an admissible branch transition, such as a $\Delta N_s=\pm2$ root birth or death under the same Jacobian floor and boundary convention. Because $B_{\mathrm{rec}}$ has inverse-area units and is not a proved action or energy, it cannot by itself be called a mass gap. A physical gap would require a derived map from this statistic to the action-level boundary charge or an independently defined energy difference.
```

After:

```markdown
The corresponding computable object is the candidate excess saddle height $B_{\mathrm{rec}}$ defined in [Causal Action Functional](causal-action-functional.md#branch-barrier-and-transition-cost). It is the infimum, over regular admissible connecting paths, of the positive part of the path supremum minus the larger endpoint statistic. The memory window, positive Jacobian floor, boundary convention and root identities remain fixed along each admitted path. A root birth or death at a fold has $D_t=0$ and is outside that regular domain. If there is no connecting path, $B_{\mathrm{rec}}=+\infty$ means only that the chosen domain excludes the connection. Because $B_{\mathrm{rec}}$ has inverse-area units and is not a proved action or energy, a physical gap requires a derived dimensional map to an independently defined action-level charge or energy difference.
```

Source line 1000, fragment 2.

Before:

```markdown
In the action-counting notation of [Causal Action Functional](causal-action-functional.md#branch-barrier-and-transition-cost), let $\mathfrak B_{\lambda_0(\eta)}$ and $\mathfrak B_{\lambda_1(\eta)}$ be retained finite-regulator branch charts on opposite sides of a path that crosses the specific codimension-one wall $\Sigma_{\mathrm{fold}}$. The same target is
```

After:

```markdown
Let $\mathfrak B_{\lambda_0(\eta)}$ and $\mathfrak B_{\lambda_1(\eta)}$ be regular endpoint records in a declared family of the same comparison domains. Any regulator-dependent identification of those domains must be specified before taking a limit. The regular-domain diagnostic can be written
```

Source line 1003, fragment 3.

Before:

```markdown
\Delta_{\mathrm{branch}}^{(\mathrm{rec})}
=
\liminf_{\eta\to0^+}
B_{\mathrm{rec}}(\lambda_0(\eta),\lambda_1(\eta))
>
0
```

After:

```markdown
\Delta_{\mathrm{branch}}^{(\mathrm{rec})}
=
\liminf_{\eta\to0^+}
B_{\mathrm{rec}}(\lambda_0(\eta),\lambda_1(\eta))
\in
[0,+\infty]
```

Source line 1013, fragment 4.

Before:

```markdown
for the wall that changes the targeted entry of the assembly topological charge. The wall may be a causal-root fold, a phase-lock wall, or a frame-degeneracy wall. A positive $\Delta_{\mathrm{branch}}^{(\mathrm{rec})}$ means only that this receiver-side statistic retains a nonzero fold-crossing barrier under regulator refinement with the declared memory and regulator state. Establishing a mass or energy gap requires the additional dimensional and variational map described above.
```

After:

```markdown
A positive finite value would require independently bounded regular connecting paths and a lower bound covering every admitted path; it would still be a statistic-level excess height rather than a mass or energy gap. Endpoints separated by a fold, phase-lock or frame-degeneracy wall need not have such a path. Finite-regulator endpoints alone supply no scalar on an interpolating singular transition. A fold-crossing extension remains unconstructed: it would need its own finite event functional, admissible path class, regulator limit and independent bounds. No event law or finite cross-sector barrier is supplied by the regular-domain expression.
```

Source line 1015, fragment 5.

Before:

```markdown
> Claim grade: derived for the dimensional limitation and guessed for the use of $B_{\mathrm{rec}}$ as a useful branch-barrier diagnostic. Falsifier: a derivation showing that $B_{\mathrm{rec}}$ itself is the correctly normalized action or energy difference would remove the limitation; collapse of the barrier to zero under regulator or path refinement would reject the proposed diagnostic gap.
```

After:

```markdown
> Claim grade: derived for the dimensional limitation and the exclusion of folds by the regular-domain floor; guessed for a physical interpretation of the excess-height diagnostic. Falsifier: a constructed and independently bounded singular extension would replace the stated absence of a fold-crossing diagnostic in its own domain; regular admissible paths with excess tending to zero would reject a proposed positive regular barrier. A physical gap still requires the separate dimensional and dynamical map.
```

## ELO11-09 — Normalize action circulation and define the bundle datum

**✓ Implemented.** S_env has action units; ordinary real-density sign crossings on closed loops have even parity and do not construct odd bundle holonomy.

Source line 1043, fragment 1.

Before:

```markdown
and the interfaces $\rho_q=0$ may serve as candidate polarity domain walls. The envelope map is faithful only on a region where $\sigma$ is constant. A zero set alone does not define a double cover; if a loop $\gamma$ is assigned domain-wall crossings, the phase chart must carry the lost sign sheet as an explicitly defined $\mathbb{Z}_2$ bundle datum:
```

After:

```markdown
and the interfaces $\rho_q=0$ may serve as candidate polarity domain walls. The envelope projection must retain any polarity information required by the same record. A zero set alone does not define a double cover: ordinary transverse sign crossings of a continuous single-valued real density have even parity on a closed loop. A candidate flat $\mathbb Z_2$ phase bundle instead requires consistent locally constant transition functions taking values $\pm1$ on a declared cover of the retained loop. Let $N_{\mathrm{wall}}(\gamma)\in\{0,1\}$ label the parity of their transition product; it is an additional candidate datum to be reconstructed from the history, not the raw number of density-zero crossings. Choose the loop $\gamma$ within the region where $\rho_{\mathrm{env}}>0$ and the local phases are differentiable. With action-valued local phase $S_{\mathrm{env}}$ and $\hbar_{\mathrm{eff}}>0$, the conditional circulation test is
```

Source line 1046, fragment 2.

Before:

```markdown
\oint_{\gamma}
\nabla_{\mathbf X} S_{\mathrm{env}}\cdot d\boldsymbol{\ell}
=
\pi\,N_{\mathrm{wall}}(\gamma)
\quad
(\mathrm{mod}\ 2\pi)
```

After:

```markdown
\frac{1}{\hbar_{\mathrm{eff}}}
\oint_{\gamma}
\nabla_{\mathbf X} S_{\mathrm{env}}\cdot d\boldsymbol{\ell}
=
\pi\,N_{\mathrm{wall}}(\gamma)
\quad
(\mathrm{mod}\ 2\pi)
```

Source line 1056, fragment 3.

Before:

```markdown
where $N_{\mathrm{wall}}(\gamma)$ is the parity count of enclosed polarity-domain-wall intersections in the retained projection. The proposed interpretation is that the memory-current circulation carries the polarity-sign information discarded by the nonnegative envelope. This is not yet a derivation of spin. A spin-$\tfrac12$-like double-valued envelope is supported only if the $\mathbb{Z}_2$ sign-sheet circulation is recovered from the same $(\rho_q,\mathbf{j}_q)$ history and persists under branch-preserving deformation.
```

After:

```markdown
For locally constant sign transitions, local phases differ on overlaps by constant multiples of $\pi\hbar_{\mathrm{eff}}$, so their gradients agree and the loop integral is evaluated consistently over the local chart segments. Chart-transition phase jumps are not added again to that integral. The left side is dimensionless, consistently with the later phase convention $\exp(iS_{\mathrm{env}}/\hbar_{\mathrm{eff}})$. The displayed relation is a conditional consistency test for the declared flat sign-bundle datum. Deriving that datum and its transport from the retained polarity/current history remains open. A spin-$\tfrac12$-like sign response is a further recovery target requiring the same datum to persist under branch-preserving deformation and agree with the exchange-cycle response.
```

Source line 1058, fragment 4.

Before:

```markdown
This is a hard test for the spinor and exchange-statistics program and connects to the [exchange-loop hard wall](../foundations/ontology.md#the-fundamental-entity). The candidate double-cover picture treats polarity domain walls as the branch locus of the sign information forgotten by the nonnegative envelope. If the parity $N_{\mathrm{wall}}(\gamma)\pmod 2$ can change without crossing a certified fold, reconnection, or declared surgery event in the retained branch record, then the half-integer envelope response has been fitted rather than derived. Even deformation-stable $\mathbb{Z}_2$ holonomy would supply only a candidate substrate carrier for the $-1$ sign under an exchange cycle; the exchange response must still be derived from the same signed polarity/current history rather than imposed as a quantum label.
```

After:

```markdown
This is a hard test for the spinor and exchange-statistics program and connects to the [exchange-loop hard wall](../foundations/ontology.md#the-fundamental-entity). Relating a consistent double-cover datum to polarity walls is a guessed carrier mechanism. A change of the declared bundle holonomy without a corresponding admitted branch event would reject that proposed identification. Even deformation-stable $\mathbb Z_2$ holonomy would supply only a candidate carrier for the $-1$ sign under an exchange cycle; the exchange response must still be derived from the same signed polarity/current history rather than imposed as a quantum label.
```

Source line 1060, fragment 5.

Before:

```markdown
> Claim grade: guessed for the polarity-wall double cover and its relation to spin-$\tfrac12$ exchange. Falsifier: a retained exchange cycle whose sign response disagrees with the wall-parity holonomy, or a wall-parity change without a branch event, would refute the proposed carrier.
```

After:

```markdown
> Claim grade: guessed for deriving the phase-bundle transport datum from polarity/current history and for its relation to spin-$\tfrac12$ exchange. Falsifier: a retained exchange cycle whose sign response disagrees with the proposed bundle holonomy, or a holonomy change without the corresponding admitted branch event, would refute the proposed carrier. Ordinary density-zero crossings alone do not establish this datum.
```

Source line 1130, fragment 6.

Before:

```markdown
and spin-$\tfrac{1}{2}$ exchange still requires the polarity-domain-wall $\mathbb{Z}_2$ holonomy to be derived and remain deformation-stable on the same retained branch.
```

After:

```markdown
and spin-$\tfrac{1}{2}$ exchange still requires the candidate $\mathbb{Z}_2$ bundle transport datum to be derived from the same retained history and remain deformation-stable; ordinary polarity-domain-wall crossings do not supply it.
```

## Verification and approval boundary — preserved proposal-time record

The known-case-first packaging instrument checks all nine groups and 44 unique source fragments against the preserved source version, then constructs a complete hypothetical chapter in ignored scratch. All 79 original display/viewer associations and 13 headings remain in order. The canonical chapter has not been edited. Whole-candidate syntax, local-link and mathematical checks are recorded below; these checks do not establish physical closure.

The independent mathematical references and falsifiers remain in the October 11 receipt. The proposals preserve those boundaries: dimensional consistency does not turn a scale-only comparison into a complete Euler derivative; a static kernel sign does not prove a conserved charge; irrational phase motion does not imply symplectic loss; a regular-domain exclusion does not establish a finite physical crossing barrier; and scalar sign changes do not construct odd bundle holonomy.

Approval may select implementation of these nine bounded groups followed by separate verification. It grants no publication, generator writes, new equation variant or expanded scientific campaign. A changed source version, a failed stated reference or a contradictory unchanged passage reopens the affected replacement before implementation.

### Preparation checks and independent reference review — preserved proposal-time record

Two drafting agents prepared disjoint groups, and a separate read-only reviewer checked the whole hypothetical chapter against independent elementary references: quadratic charge differentiation, the composed-kernel moving-pair test, nonresonant canonical torus flow, isotropic temporal-parity response, signed disjoint energy balances, integration by parts with moving endpoints, regular-domain minimax definitions and phase transport with constant sign transitions. Reviewer agreement is not the reference; those stated mathematical comparisons are. The draft phase proposal initially added chart jumps to the gradient integral. The antiperiodic comparison phase S = hbar times theta/2 gave gradient circulation pi times hbar, while the added closing jump incorrectly cancelled it. The final proposal removes that double count, restricts the candidate transitions to locally constant signs, and requires positive envelope density and differentiable local phases along the loop. The bundle construction remains open.

The separate final bounded recheck passes at hypothetical-source SHA-256 `f75607cf421cd7b0ef5f4dfe507e44164b95c24db0eac83e3f9363334735b850`. The replacement manifest in ignored task scratch has SHA-256 `cb4941c617509f07dcdb39c8f06dece6c25c663df9114ceb9b5286428b00c2ab`; the exact replacement text is preserved durably in this document. Known-case-first whole-candidate KaTeX and canonical-base link checks pass 348 mathematical spans, 79 displays/viewers and 89 local-file occurrences. The proposal checker skips fenced Before/After literals; those proposed expressions are checked in the complete hypothetical chapter instead. Local target existence does not establish fragment navigation or browser layout, and no external bibliography or whole-repository acceptance is claimed.

Native `cmp` against the frozen source and `shasum -a 256` confirm that the canonical chapter retains the source hash recorded above. Scoped whitespace checks cover this proposal and the edited owner/status/log pointers. Coverage and due dates are unchanged; no generator, Git publication, scientific reference instrument or corpus source is modified. All nine groups remain proposed.
