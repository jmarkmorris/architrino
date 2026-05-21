# Fundamental Ledger Branch-Chart Packet

Status. Proof packet for `fundamental_angular_momentum_ledger`, `tri_binary_partition_rule`, and the reduced `worked_three_layer_noether_transition` branch in [angular-momentum-spin.md](angular-momentum-spin.md). This packet is a branch-chart evaluation object, not a theorem promotion into AAA prose.

Claim level. The equations below turn the existing scaffold in [core-angular-momentum-ledger.md](core-angular-momentum-ledger.md) and [swarm-partition-and-spinor.md](swarm-partition-and-spinor.md) into a replayable certificate target. A passing certificate would validate one retained Noether-core branch chart for angular-momentum conservation and tri-binary partition closure. It would not by itself prove global branch uniqueness, spinor closure, measurement response, or Bell correlations.

## Evaluation Object

Fix a transition window

$$
W=[t_i,t_f],
$$

a pre-transaction branch chart $B^-$, a candidate post-transaction chart $B^+$, and a coupling datum

$$
\Gamma_{\text{coupl}}
=
\left(
\sigma,
\Delta E_{\text{coupl}},
\Delta\mathbf J_{\text{coupl}},
\hat{\mathbf a},
\mathrm{Geom}_{\text{coupl}}
\right),
\qquad
\sigma\in\{+1,-1\}.
$$

The core-facing convention is

$$
\Delta\mathbf J_{\text{coupl}}
=
\sigma\hbar\hat{\mathbf a}
+\Delta\mathbf J_{\text{coupl},\perp},
\qquad
\hat{\mathbf a}\cdot\Delta\mathbf J_{\text{coupl},\perp}=0.
$$

Equivalently, the source or apparatus channel carries

$$
\Delta\mathbf J_{\text{tx}}
=
-\Delta\mathbf J_{\text{coupl}}.
$$

The angular-momentum branch-chart evaluation object is

$$
\mathfrak C_{\mathbf J}
\left(
B^-,B^+,\Gamma_{\text{coupl}},W;h,\eta,\epsilon_c
\right)
=
\left(
\mathfrak B^-,\mathfrak B^+,
\mathfrak H_{B^-},\mathfrak H_{B^+},
\mathcal T_B,
\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)},
\mathcal R_{\mathrm{part}},
\mathcal V_{\mathrm{cert}}
\right).
$$

Here $\mathfrak B^\pm$ are Master-Equation branch-chart objects of the form

$$
\mathfrak{B}(\Gamma,\mathcal{S};h,\eta,\epsilon_c)
=
\left(
\mathcal{R}^{\mathrm{act}},
\mathcal{G}^{\mathrm{inact}},
\nu_J,
h_{\mathrm{mem}},
\mathcal{R}_{\mathrm{return}},
\lambda_{\mathrm{sec}}
\right),
$$

$\mathfrak H_{B^\pm}$ are the retained path-history records, $\mathcal T_B$ is the layer torque ledger on $W$, $\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}$ is the normalized delayed-interior characteristic-tail angular-momentum boundary increment pulled back to the same retained rows, $\mathcal R_{\mathrm{part}}$ is the vector and scalar partition residual package, and $\mathcal V_{\mathrm{cert}}$ is the row-by-row certificate table.

The evaluation object is admissible only when the active-root rows used by the force residual, the torque ledger, the Noether wake-history boundary increment, and the partition residuals are the same rows. If the row sets differ, the packet fails before any scalar $\hbar$ partition is evaluated.

## Branch-Chart Inputs

Use layer labels

$$
\ell\in\{I,M,O\}
$$

for inner, middle, and outer. Each layer has two members $\alpha\in\{+1,-1\}$ and current reduced coordinates

$$
\mathbf x_{\ell,\alpha}(t)
=
\mathbf X(t)+\mathbf c_\ell(t)
+\alpha R_\ell(t)\mathbf e_\ell(\theta_\ell(t)),
$$

with

$$
\theta_\ell(t)
=
\theta_{\ell,0}
+\int_{t_0}^{t}\omega_\ell(s)\,ds,
\qquad
\mathbf u_\ell(t)\times\mathbf v_\ell(t)
=
\hat{\mathbf n}_\ell(t).
$$

The member phase is

$$
\vartheta_{\ell,\alpha}(t)
=
\theta_\ell(t)+\frac{1-\alpha}{2}\pi.
$$

For each retained branch row

$$
\rho=(\ell,\alpha;m,\beta;b)
\in\mathcal R_B^{\mathrm{act}}(s),
$$

let $t_{0,\rho}(s)<s$ be the retained emission time. The causal-root residual is

$$
\mathcal R_{\mathrm{root},\rho}(s)
\equiv
\left\|
\mathbf x_{\ell,\alpha}(s)
-
\mathbf x_{m,\beta}(t_{0,\rho}(s))
\right\|
-
c_f\left(s-t_{0,\rho}(s)\right).
$$

The phase-lock residual is

$$
\mathcal R_{\Phi,\rho}(s)
\equiv
\operatorname{dist}_{2\pi}
\left(
\vartheta_{\ell,\alpha}(s)
-
\vartheta_{m,\beta}(t_{0,\rho}(s))
+
\phi_{\ell m}^{(b)}
-
2\pi k_{\ell m}^{(b)}
\right).
$$

The branch Jacobian is

$$
J_\rho(s)
=
1-
\frac{
\mathbf v_{m,\beta}(t_{0,\rho}(s))
\cdot
\hat{\mathbf r}_{\rho}(s)
}{c_f},
$$

where

$$
\mathbf r_{\rho}(s)
=
\mathbf x_{\ell,\alpha}(s)
-
\mathbf x_{m,\beta}(t_{0,\rho}(s)),
\qquad
\hat{\mathbf r}_{\rho}(s)
=
\frac{\mathbf r_{\rho}(s)}{\|\mathbf r_{\rho}(s)\|}.
$$

The root-transport residual is

$$
\mathcal R_{\mathrm{rt},\rho}(s)
\equiv
\frac{d t_{0,\rho}}{ds}
-
\frac{
1-\hat{\mathbf r}_{\rho}(s)\cdot
\mathbf v_{\ell,\alpha}(s)/c_f
}{
J_\rho(s)
}.
$$

For the retained chart define the branch floors and residual maxima

$$
\nu_J(B)
=
\inf_{\rho,s\in W}|J_\rho(s)|,
$$

$$
\epsilon_{\mathrm{root}}(B)
=
\sup_{\rho,s\in W}
\left|\mathcal R_{\mathrm{root},\rho}(s)\right|,
\qquad
\epsilon_{\Phi}(B)
=
\sup_{\rho,s\in W}
\left|\mathcal R_{\Phi,\rho}(s)\right|,
$$

and

$$
\epsilon_{\mathrm{rt}}(B)
=
\sup_{\rho,s\in W}
\left|\mathcal R_{\mathrm{rt},\rho}(s)\right|.
$$

Inactive root separation is retained as the Master-Equation branch-chart gap

$$
g_{\mathrm{inact}}(B)
=
\inf_{\mathcal G^{\mathrm{inact}}}g_a^{ij}.
$$

Self-hit rows are the diagonal rows

$$
\mathcal R_B^{\mathrm{self}}(s)
=
\{
(\ell,\alpha;\ell,\alpha;b)\in\mathcal R_B^{\mathrm{act}}(s):
t_{0,\rho}(s)\in\mathcal H_{\ell,\alpha}^{B}(s)
\},
$$

with trivial self-coincidence excluded. Off-diagonal rows are

$$
\mathcal R_B^{\mathrm{off}}(s)
=
\mathcal R_B^{\mathrm{act}}(s)\setminus
\mathcal R_B^{\mathrm{self}}(s).
$$

## Torque And Wake Integrals

For each retained row $\rho=(\ell,\alpha;m,\beta;b)$, define the force-like bookkeeping term

$$
\mathbf F_{\rho}(s)
=
\mu_{\text{arch}}\kappa\sigma_{\ell\alpha,m\beta}
\frac{|q_{\ell,\alpha}q_{m,\beta}|}
{\|\mathbf r_{\rho}(s)\|^2 |J_\rho(s)|}
\hat{\mathbf r}_{\rho}(s).
$$

The branch torque about the chosen origin is

$$
\boldsymbol{\tau}_{\rho}(s)
=
\mathbf x_{\ell,\alpha}(s)\times\mathbf F_{\rho}(s).
$$

The layer torque ledger is

$$
\mathbf T_\ell^B(s)
=
\sum_{\alpha}
\sum_{(m,\beta;b):(\ell,\alpha;m,\beta;b)\in\mathcal R_B^{\mathrm{act}}(s)}
\boldsymbol{\tau}_{\ell\alpha\leftarrow m\beta}^{(b)}(s).
$$

The endpoint mechanical layer increment is

$$
\Delta\mathbf L_{\mathrm{mech},\ell}^{B}
=
\sum_{\alpha}
\left[
\mathbf x_{\ell,\alpha}(t_f)\times
\mu_{\text{arch}}\mathbf v_{\ell,\alpha}(t_f)
-
\mathbf x_{\ell,\alpha}(t_i)\times
\mu_{\text{arch}}\mathbf v_{\ell,\alpha}(t_i)
\right].
$$

The layer torque consistency residual is

$$
\mathcal R_{T,\ell}^{B}
\equiv
\Delta\mathbf L_{\mathrm{mech},\ell}^{B}
-
\int_{t_i}^{t_f}\mathbf T_\ell^B(s)\,ds.
$$

In the separated-scale circular approximation,

$$
\Delta\mathbf L_{\mathrm{mech},\ell}^{B}
\simeq
2\mu_{\text{arch}}
\left(
2R_\ell^-\omega_\ell^-\Delta R_\ell
+
\left(R_\ell^-\right)^2\Delta\omega_\ell
\right)\hat{\mathbf n}_\ell^-
+
2\mu_{\text{arch}}\left(R_\ell^-\right)^2\omega_\ell^-
\Delta\hat{\mathbf n}_\ell
+
\Delta\mathbf L_{\mathrm{tr},\ell}.
$$

The action-kernel wake increment must use the normalized delayed-interior characteristic-tail boundary charge from the Master-Equation action-kernel handoff. On the retained branch chart, define

$$
\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}[W]
\equiv
\mathbf{J}_{\mathrm{wake,eff},B}^{(\eta)}(t_f)
-
\mathbf{J}_{\mathrm{wake,eff},B}^{(\eta)}(t_i),
$$

where

$$
\mathbf{J}_{\mathrm{wake,eff},B}^{(\eta)}(t_\ast)
=
-\frac{1}{2}\sum_{i,j}
\int_{X_{ij}^{B}(t_\ast)}
\mathbf{x}_i(t_1)\times
\nabla_{\mathbf{x}_i(t_1)}
\mathcal{K}_{ij,\mathrm{eff}}^{(\eta)}(t_1,t_0)
\,dt_0\,dt_1.
$$

The chart-restricted crossing domain is

$$
X_{ij}^{B}(t_\ast)
=
\{(t_1,t_0):t_0\le t_\ast<t_1,\ t_1>t_0\}
\cap
\{(i,j,t_1,t_0): (i,j,t_1,t_0)\ \text{lies on a retained row of }\mathcal R_B^{\mathrm{act}}\},
$$

with trivial self-coincidence excluded when $i=j$. This is the primary wake increment for certification. The older work-integral reconstruction

$$
\Delta\mathbf L_{\mathrm{wake,torque}}^{B}[W]
=
-
\int_{t_i}^{t_f}
\sum_{\ell\in\{I,M,O\}}\mathbf T_\ell^B(s)\,ds
+
\Delta\mathbf L_{\mathrm{wake},\partial}^{B}
$$

is retained only as a diagnostic unless it is shown to be the pullback of the same normalized action kernel. The required diagnostic-to-action residual is

$$
\mathcal R_{\mathrm{wake}}^{B}
\equiv
\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}[W]
-
\Delta\mathbf L_{\mathrm{wake,torque}}^{B}[W].
$$

For a theorem-level branch claim, $\mathcal R_{\mathrm{wake}}^{B}$ must converge to zero with the same $\eta$, $\epsilon_c$, endpoint convention, and retained row set used in the force residual.

## Partition Residuals

The vector partition residual is

$$
\boxed{
\mathcal R_{\mathbf J}^{B}
\equiv
\sum_{\ell\in\{I,M,O\}}
\Delta\mathbf L_{\mathrm{mech},\ell}^{B}
+
\Delta\mathbf L_{\mathrm{tr}}^{B}
+
\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}[W]
-
\Delta\mathbf J_{\text{coupl}}.
}
$$

The equivalent source-side form is

$$
\widetilde{\mathcal R}_{\mathbf J}^{B}
\equiv
\Delta\mathbf J_{\text{tx}}
+
\sum_{\ell\in\{I,M,O\}}
\Delta\mathbf L_{\mathrm{mech},\ell}^{B}
+
\Delta\mathbf L_{\mathrm{tr}}^{B}
+
\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}[W].
$$

Both forms encode the same vector ledger. A certificate should report one sign convention and may report the other as a check.

The scalar partition components are projections onto the supplied transaction axis:

$$
\Delta I_{\text{inner}}
=
\hat{\mathbf a}\cdot
\Delta\mathbf L_{\mathrm{mech},I}^{B},
\qquad
\Delta I_{\text{middle}}
=
\hat{\mathbf a}\cdot
\Delta\mathbf L_{\mathrm{mech},M}^{B},
$$

$$
\Delta I_{\text{outer}}
=
\hat{\mathbf a}\cdot
\Delta\mathbf L_{\mathrm{mech},O}^{B},
\qquad
\Delta I_{\text{wake}}
=
\hat{\mathbf a}\cdot
\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}[W].
$$

The scalar action residual is

$$
\boxed{
\mathcal R_I^{B}
\equiv
\Delta I_{\text{inner}}
+
\Delta I_{\text{middle}}
+
\Delta I_{\text{outer}}
+
\Delta I_{\text{wake}}
-
\sigma\hbar.
}
$$

The transverse residual is what prevents the scalar ledger from hiding a failed spin-transport balance:

$$
\mathcal R_{\perp}^{B}
\equiv
\left(I-\hat{\mathbf a}\hat{\mathbf a}^{T}\right)
\left(
\sum_{\ell\in\{I,M,O\}}
\Delta\mathbf L_{\mathrm{mech},\ell}^{B}
+
\Delta\mathbf L_{\mathrm{tr}}^{B}
+
\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}[W]
-
\Delta\mathbf J_{\text{coupl}}
\right).
$$

The energy residual is

$$
\mathcal R_E^{B}
\equiv
\sum_{\ell\in\{I,M,O\}}
\int_{B^-\to B^+}\omega_\ell\,dI_\ell
+
\Delta E_{\mathrm{root}}^{B}
+
\Delta E_{\mathrm{wake},B}^{(\eta)}
-
\Delta E_{\text{coupl}}.
$$

In the first action-angle approximation this is evaluated as

$$
\mathcal R_E^{B}
\approx
\omega_I^\ast\Delta I_{\text{inner}}
+
\omega_M^\ast\Delta I_{\text{middle}}
+
\omega_O^\ast\Delta I_{\text{outer}}
+
\Delta E_{\mathrm{root}}^{B}
+
\Delta E_{\mathrm{wake},B}^{(\eta)}
-
\omega_{\text{tx}}\sigma\hbar.
$$

For nonnegative reduced branch families with two inner self-hit substeps, use

$$
\Delta I_{\text{outer}}=a\sigma\hbar,
\qquad
\Delta I_{\text{inner}}=2b\sigma\hbar,
\qquad
\Delta I_{\text{wake}}=w\sigma\hbar,
$$

and

$$
\Delta I_{\text{middle}}
=
\left(1-a-2b-w\right)\sigma\hbar.
$$

This parameterization is admissible only when the vector residual, energy residual, root-ledger conditions, phase-lock residuals, and branch-stability rows also pass. The coefficients $a$, $b$, and $w$ are not interpretive weights.

## Success And Failure Conditions

A branch chart passes this packet when all of the following hold for declared tolerances:

$$
\epsilon_{\mathrm{root}}(B^\pm)\le\varepsilon_{\mathrm{root}},
\qquad
\epsilon_{\mathrm{rt}}(B^\pm)\le\varepsilon_{\mathrm{rt}},
\qquad
\epsilon_{\Phi}(B^\pm)\le\varepsilon_{\Phi},
$$

$$
\nu_J(B^\pm)\ge\nu_{\min}>0,
\qquad
g_{\mathrm{inact}}(B^\pm)\ge g_{\min}>0,
\qquad
0<h_{\mathrm{mem}}<h<\infty,
$$

$$
\|\mathcal R_{\mathrm{return}}(B^+)\|
\le
\varepsilon_{\mathrm{return}},
\qquad
\rho\!\left(M_{\mathcal S}\vert_{E_\perp}\right)
\le
1-\lambda_{\mathrm{sec}},
\qquad
\lambda_{\mathrm{sec}}>0,
$$

and

$$
\|\mathcal R_{T,\ell}^{B}\|
\le
\varepsilon_T
\quad
\text{for every }\ell,
\qquad
\|\mathcal R_{\mathrm{wake}}^{B}\|
\le
\varepsilon_{\mathrm{wake}},
$$

$$
\|\mathcal R_{\mathbf J}^{B}\|
\le
\varepsilon_{\mathbf J},
\qquad
|\mathcal R_I^{B}|
\le
\varepsilon_I,
\qquad
\|\mathcal R_{\perp}^{B}\|
\le
\varepsilon_{\perp},
\qquad
|\mathcal R_E^{B}|
\le
\varepsilon_E.
$$

It fails under any of the following conditions:

1. The retained force rows, torque rows, and action-kernel wake-boundary rows are not the same branch rows.
2. A root residual, root-transport residual, Jacobian floor, inactive-root gap, memory-depth condition, return residual, or section-stability margin fails.
3. The scalar partition closes but $\mathcal R_{\mathbf J}^{B}$ or $\mathcal R_{\perp}^{B}$ does not. That is a failed angular-momentum ledger, not a spin-like response.
4. $\Delta I_{\text{wake}}$ is assigned without evaluating the normalized characteristic-tail wake increment.
5. A self-hit transition violates the declared root-ledger rule, including $\Delta N_{\text{self}}\in2\mathbb Z$ and $\Delta D=0$ on raw simple-root separator charts where that guardrail applies.
6. The phase-lock residual closes only after changing root labels without a declared fold, separator, grouped-channel, or branch-continuation rule.
7. The energy residual requires an undeclared root-energy, wake-energy, recoil, or transport channel.

If exactly one stable post-branch satisfies these rows, the partition is unique for the supplied coupling geometry. If more than one stable post-branch satisfies them, the result is branch-dependent and must be passed forward with a deterministic selection map. If no accepted post-branch passes, the transaction is forbidden, reflected, or routed into wake exchange.

## Minimal Four-Substep Certificate

This reduced certificate specializes the packet to the solved positive outer-coupled branch. Its assumptions are:

$$
\sigma=+1,
\qquad
\Delta\mathbf J_{\text{coupl}}=\hbar\hat{\mathbf a},
\qquad
\hat{\mathbf n}_I\cdot\hat{\mathbf a}
=
\hat{\mathbf n}_M\cdot\hat{\mathbf a}
=
\hat{\mathbf n}_O\cdot\hat{\mathbf a}
=1,
$$

$$
\Delta\mathbf L_{\mathrm{tr}}^{B}=\mathbf 0,
\qquad
\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}[W]=\mathbf 0,
$$

and the substep pattern is one outer substep, one middle hinge substep, and two equal inner self-hit substeps. Let

$$
\iota=\frac{\hbar}{4}.
$$

The exact substep rows are:

| Row | Substep | Required increment | Mechanical retune | Branch condition |
| --- | --- | --- | --- | --- |
| `O1` | Outer interface | $\Delta I_{\text{outer}}=\iota$ | $\Delta R_O=0$, $\Delta\omega_O=\dfrac{\hbar}{8\mu_{\text{arch}}\left(R_O^-\right)^2}$ | $R_O^-\left(\omega_O^-+\dfrac{\hbar}{8\mu_{\text{arch}}\left(R_O^-\right)^2}\right)<c_f$ |
| `M1` | Middle hinge | $\Delta I_{\text{middle}}=\iota$ | $\Delta R_M=\dfrac{\hbar}{8\mu_{\text{arch}}R_M^-\omega_M^-}$, $\Delta\omega_M=-\dfrac{\hbar}{8\mu_{\text{arch}}\left(R_M^-\right)^2}$ | $R_M^+\omega_M^+=c_f+O(\iota^2)$ |
| `I1` | Inner self-hit | $\Delta I_{\text{inner}}^{(1)}=\iota$ | contributes half of $\Delta\omega_I=\dfrac{\hbar}{4\mu_{\text{arch}}\left(R_I^-\right)^2}$ at $\Delta R_I=0$ | retained self-hit row has $s_I^+>1$ |
| `I2` | Inner self-hit | $\Delta I_{\text{inner}}^{(2)}=\iota$ | completes $\Delta\omega_I=\dfrac{\hbar}{4\mu_{\text{arch}}\left(R_I^-\right)^2}$ at $\Delta R_I=0$ | total raw separator jump satisfies $\Delta N_{\text{self}}=+2$, $\Delta D=0$ |

The resulting partition is

$$
\boxed{
\Delta I_{\text{outer}}=\frac{\hbar}{4},
\qquad
\Delta I_{\text{middle}}=\frac{\hbar}{4},
\qquad
\Delta I_{\text{inner}}=\frac{\hbar}{2},
\qquad
\Delta I_{\text{wake}}=0.
}
$$

The exact certificate validation rows are:

| Certificate row | Required validation equation or inequality | Pass value for the minimal branch |
| --- | --- | --- |
| `row_set_identity` | $\mathcal R_{\mathrm{force}}^{\mathrm{act}}=\mathcal R_{\mathrm{torque}}^{\mathrm{act}}=\mathcal R_{\mathrm{wake}}^{\mathrm{act}}$ | Same retained rows for force, torque, and normalized tail wake charge. |
| `root_chart` | $\epsilon_{\mathrm{root}}\le\varepsilon_{\mathrm{root}}$, $\epsilon_{\mathrm{rt}}\le\varepsilon_{\mathrm{rt}}$, $\nu_J\ge\nu_{\min}>0$, $g_{\mathrm{inact}}\ge g_{\min}>0$ | Positive replayable branch chart on $B^-$ and $B^+$. |
| `phase_lock` | $\epsilon_{\Phi}\le\varepsilon_{\Phi}$ for every retained active row | No undeclared root relabeling across $W$. |
| `section_stability` | $\|\mathcal R_{\mathrm{return}}\|\le\varepsilon_{\mathrm{return}}$, $\rho(M_{\mathcal S}\vert_{E_\perp})\le1-\lambda_{\mathrm{sec}}$ | Stable post-transaction section with $\lambda_{\mathrm{sec}}>0$. |
| `outer_speed` | $R_O^-\left(\omega_O^-+\dfrac{\hbar}{8\mu_{\text{arch}}\left(R_O^-\right)^2}\right)<c_f$ | Outer layer remains sub-field-speed. |
| `middle_hinge` | $\left|R_M^+\omega_M^+-c_f\right|\le\varepsilon_M$ | First-order hinge row passes with $O(\iota^2)$ residual. |
| `inner_self_hit` | $s_I^+=\dfrac{R_I^-\left(\omega_I^-+\dfrac{\hbar}{4\mu_{\text{arch}}\left(R_I^-\right)^2}\right)}{c_f}>1$ and $\delta_{\text{self}}^+=2s_I^+\sin\!\left(\dfrac{\delta_{\text{self}}^+}{2}\right)$ | Inner layer remains on a nontrivial self-hit branch. |
| `self_root_parity` | $\Delta N_{\text{self}}=+2$, $\Delta D=0$ on the raw simple-root separator chart | The two inner substeps are a minimal even self-root jump. |
| `tail_wake_increment` | $\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}[W]=\mathbf 0$ and $\|\mathcal R_{\mathrm{wake}}^{B}\|\le\varepsilon_{\mathrm{wake}}$ | No retained net wake angular momentum after closure; transient wake torque must match the normalized action-kernel boundary ledger. |
| `scalar_partition` | $\Delta I_{\text{outer}}+\Delta I_{\text{middle}}+\Delta I_{\text{inner}}+\Delta I_{\text{wake}}=\hbar$ | $\hbar/4+\hbar/4+\hbar/2+0=\hbar$. |
| `vector_partition` | $\left\|\sum_{\ell}\Delta\mathbf L_{\mathrm{mech},\ell}^{B}+\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}[W]-\hbar\hat{\mathbf a}\right\|\le\varepsilon_{\mathbf J}$ | Fixed-normal, no-transport branch reduces to the scalar partition only if transverse residual also vanishes. |
| `energy_frequency` | $\left|\omega_{\text{tx}}-\dfrac{\omega_O^\ast+\omega_M^\ast+2\omega_I^\ast}{4}\right|\hbar\le\varepsilon_E$ when $\Delta E_{\mathrm{root}}^{B}=\Delta E_{\mathrm{wake},B}^{(\eta)}=0$ | Clean minimal branch passes only at $\omega_{\text{tx}}=\omega_\ast$. |
| `action_kernel_residual` | $\epsilon_{\mathrm{var}}^{(\eta)}(W)\to0$ with vanishing declared endpoint or period-cut leakage | The normalized tail kernel is a conservation charge, not a hidden force-law change. |

The minimal branch fails cleanly when

$$
\omega_{\text{tx}}
\ne
\omega_\ast
\equiv
\frac{\omega_O^\ast+\omega_M^\ast+2\omega_I^\ast}{4}
$$

and no declared root-energy, wake-energy, recoil, or transport channel absorbs

$$
\Delta E_{\mathrm{mismatch}}
=
\left(\omega_{\text{tx}}-\omega_\ast\right)\hbar.
$$

It also fails if the scalar row passes but the vector row does not, because then the four substeps have closed the bookkeeping projection while losing angular momentum in the transverse ledger.

## Next Consumer

The immediate consumer is a concrete branch-chart run or hand-built certificate that fills $\mathcal V_{\mathrm{cert}}$ with numerical or interval rows. The first useful output is not a new gate; it is a completed instance of the table above for one retained Noether-core chart. If it passes, the branch can be promoted as a reduced angular-momentum ledger certificate. If it fails, the failure row says whether the four-substep branch is energy-mismatched, root-inadmissible, wake-incomplete, vector-incomplete, or unstable.
