# Minimal Four-Substep Certificate Instance

Status. Proof packet for the reduced `worked_three_layer_noether_transition` row in [angular-momentum-spin.md](angular-momentum-spin.md). This file instantiates the solved positive outer-coupled four-substep branch as far as the present symbolic scaffold allows. It is priority material, not AAA prose, and it does not prove the general tri-binary partition theorem.

Claim level. The scalar partition and separated-scale mechanical retunes below are exact inside the declared reduced chart. Root replayability, phase lock, normalized tail-wake pullback, torque consistency, and stability remain branch-chart data requirements. The packet therefore separates rows that pass by assumption from rows that require retained branch-chart evaluation.

## Declared Certificate Object

Use the branch-chart evaluation object from [fundamental-ledger-branch-chart-packet.md](fundamental-ledger-branch-chart-packet.md):

$$
\mathfrak C_{\mathbf J}
\left(
B^-,B^+,\Gamma_{\text{coupl}},W;h,\eta,\epsilon_c
\right).
$$

The minimal instance is denoted

$$
\mathfrak C_{\mathbf J}^{\min}
\equiv
\mathfrak C_{\mathbf J}
\left(
B_{\min}^-,B_{\min}^+,\Gamma_{\min},W;h,\eta,\epsilon_c
\right),
\qquad
W=[t_i,t_f].
$$

The coupling datum is fixed as

$$
\Gamma_{\min}
=
\left(
+1,
\Delta E_{\text{coupl}},
\Delta\mathbf J_{\text{coupl}},
\hat{\mathbf a},
\mathrm{Geom}_{\min}
\right),
$$

with

$$
\Delta\mathbf J_{\text{coupl}}
=
\hbar\hat{\mathbf a},
\qquad
\Delta E_{\text{coupl}}
=
\omega_{\text{tx}}\hbar.
$$

The source-side angular-momentum change is therefore

$$
\Delta\mathbf J_{\text{tx}}
=
-\hbar\hat{\mathbf a}.
$$

The clean reduced chart assumes fixed projected normals, no transport remainder, and no retained net wake increment:

$$
\hat{\mathbf n}_I^-=\hat{\mathbf n}_M^-=\hat{\mathbf n}_O^-
=
\hat{\mathbf n}_I^+=\hat{\mathbf n}_M^+=\hat{\mathbf n}_O^+
=
\hat{\mathbf a},
$$

$$
\Delta\hat{\mathbf n}_I
=
\Delta\hat{\mathbf n}_M
=
\Delta\hat{\mathbf n}_O
=
\mathbf 0,
\qquad
\Delta\mathbf L_{\mathrm{tr}}^{B_{\min}}
=
\mathbf 0,
$$

and

$$
\Delta\mathbf J_{\mathrm{wake},B_{\min}}^{(\eta)}[W]
=
\mathbf 0,
\qquad
\Delta E_{\mathrm{wake},B_{\min}}^{(\eta)}
=
0.
$$

These are assumptions of the clean certificate instance. They do not replace the theorem-level requirement to evaluate the normalized characteristic-tail wake charge and torque diagnostic on the retained row set.

## Symbolic Branch Data

The pre-transaction branch chart is represented by

$$
B_{\min}^-
=
\left(
\{R_\ell^-,\omega_\ell^-,\hat{\mathbf n}_\ell^-=\hat{\mathbf a}\}_{\ell\in\{I,M,O\}},
\mathcal R_{B^-}^{\mathrm{act}},
\mathcal G_{B^-}^{\mathrm{inact}},
\mathfrak H_{B^-},
\nu_J^-,
g_{\mathrm{inact}}^-,
h_{\mathrm{mem}}^-,
\lambda_{\mathrm{sec}}^-
\right).
$$

The post-transaction branch chart is represented by

$$
B_{\min}^+
=
\left(
\{R_\ell^+,\omega_\ell^+,\hat{\mathbf n}_\ell^+=\hat{\mathbf a}\}_{\ell\in\{I,M,O\}},
\mathcal R_{B^+}^{\mathrm{act}},
\mathcal G_{B^+}^{\mathrm{inact}},
\mathfrak H_{B^+},
\nu_J^+,
g_{\mathrm{inact}}^+,
h_{\mathrm{mem}}^+,
\lambda_{\mathrm{sec}}^+
\right).
$$

The retained active rows on $W$ must be a single row set for force, torque, and normalized tail-wake evaluation:

$$
\mathcal R_{\mathrm{force}}^{\mathrm{act}}
=
\mathcal R_{\mathrm{torque}}^{\mathrm{act}}
=
\mathcal R_{\mathrm{wake}}^{\mathrm{act}}
=
\mathcal R_{\min}^{\mathrm{act}}.
$$

The inner self-hit change is declared on a raw simple-root separator chart as

$$
\Delta N_{\text{self}}=+2,
\qquad
\Delta D=0,
$$

with two retained inner self-hit substeps represented by rows

$$
\rho_{I,1}^{\mathrm{self}},
\rho_{I,2}^{\mathrm{self}}
\in
\mathcal R_{\min}^{\mathrm{act}}.
$$

This declares the symbolic ledger jump. It does not by itself prove root simplicity, root transport, inactive gaps, or phase closure.

## Substep Partition

Let the common substep be

$$
\iota=\frac{\hbar}{4}.
$$

The minimal branch has one outer substep, one middle hinge substep, and two equal inner self-hit substeps:

$$
\Delta I_{\text{outer}}=\iota,
\qquad
\Delta I_{\text{middle}}=\iota,
\qquad
\Delta I_{\text{inner}}^{(1)}=\iota,
\qquad
\Delta I_{\text{inner}}^{(2)}=\iota.
$$

Thus

$$
\Delta I_{\text{inner}}
=
\Delta I_{\text{inner}}^{(1)}
+
\Delta I_{\text{inner}}^{(2)}
=
2\iota
=
\frac{\hbar}{2},
$$

and the complete scalar partition is

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

The scalar residual evaluates exactly:

$$
\mathcal R_I^{B_{\min}}
=
\Delta I_{\text{inner}}
+
\Delta I_{\text{middle}}
+
\Delta I_{\text{outer}}
+
\Delta I_{\text{wake}}
-
\hbar
=
\frac{\hbar}{2}
+
\frac{\hbar}{4}
+
\frac{\hbar}{4}
+
0
-
\hbar
=
0.
$$

Therefore the scalar action row passes inside the clean reduced chart.

## Retune Rows

The separated-scale circular mechanical increment used by this packet is

$$
\Delta\mathbf L_{\mathrm{mech},\ell}^{B_{\min}}
\simeq
2\mu_{\text{arch}}
\left(
2R_\ell^-\omega_\ell^-\Delta R_\ell
+
\left(R_\ell^-\right)^2\Delta\omega_\ell
\right)\hat{\mathbf a},
$$

because $\Delta\hat{\mathbf n}_\ell=\mathbf 0$ and $\Delta\mathbf L_{\mathrm{tr},\ell}=\mathbf 0$ in the declared chart.

### Outer Interface Row

The outer retune is

$$
\Delta R_O=0,
\qquad
\Delta\omega_O
=
\frac{\hbar}
{8\mu_{\text{arch}}\left(R_O^-\right)^2}.
$$

The mechanical increment evaluates to

$$
\Delta\mathbf L_{\mathrm{mech},O}^{B_{\min}}
=
2\mu_{\text{arch}}
\left(R_O^-\right)^2
\frac{\hbar}
{8\mu_{\text{arch}}\left(R_O^-\right)^2}
\hat{\mathbf a}
=
\frac{\hbar}{4}\hat{\mathbf a}.
$$

The outer speed row passes only if

$$
R_O^-
\left(
\omega_O^-
+
\frac{\hbar}
{8\mu_{\text{arch}}\left(R_O^-\right)^2}
\right)
<c_f.
$$

If this inequality fails, the clean outer-coupled reduced branch leaves the outer sub-field-speed regime.

### Middle Hinge Row

The middle retune is

$$
\Delta R_M
=
\frac{\hbar}
{8\mu_{\text{arch}}R_M^-\omega_M^-},
\qquad
\Delta\omega_M
=
-
\frac{\hbar}
{8\mu_{\text{arch}}\left(R_M^-\right)^2}.
$$

The first-order hinge cancellation is exact:

$$
R_M^-\Delta\omega_M
+
\omega_M^-\Delta R_M
=
-
\frac{\hbar}{8\mu_{\text{arch}}R_M^-}
+
\frac{\hbar}{8\mu_{\text{arch}}R_M^-}
=
0.
$$

The mechanical increment evaluates to

$$
\Delta\mathbf L_{\mathrm{mech},M}^{B_{\min}}
=
2\mu_{\text{arch}}
\left(
2R_M^-\omega_M^-
\frac{\hbar}
{8\mu_{\text{arch}}R_M^-\omega_M^-}
-
\left(R_M^-\right)^2
\frac{\hbar}
{8\mu_{\text{arch}}\left(R_M^-\right)^2}
\right)\hat{\mathbf a}
=
\frac{\hbar}{4}\hat{\mathbf a}.
$$

The exact product after the retune is

$$
R_M^+\omega_M^+
=
\left(R_M^-+\Delta R_M\right)
\left(\omega_M^-+\Delta\omega_M\right)
=
R_M^-\omega_M^-
-
\frac{\hbar^2}
{64\mu_{\text{arch}}^2\left(R_M^-\right)^3\omega_M^-}.
$$

If the pre-branch hinge has $R_M^-\omega_M^-=c_f$, then the row passes to first order and has second-order residual

$$
\mathcal R_M^{(2)}
=
-
\frac{\hbar^2}
{64\mu_{\text{arch}}^2\left(R_M^-\right)^3\omega_M^-}.
$$

The finite-row pass condition is therefore

$$
\left|\mathcal R_M^{(2)}\right|
\le
\varepsilon_M,
$$

unless a second-order retune is supplied.

### Inner Self-Hit Rows

The total inner retune is

$$
\Delta R_I=0,
\qquad
\Delta\omega_I
=
\frac{\hbar}
{4\mu_{\text{arch}}\left(R_I^-\right)^2}.
$$

Equivalently, the two equal self-hit substeps carry

$$
\Delta\omega_I^{(1)}
=
\Delta\omega_I^{(2)}
=
\frac{\hbar}
{8\mu_{\text{arch}}\left(R_I^-\right)^2}.
$$

The total mechanical increment evaluates to

$$
\Delta\mathbf L_{\mathrm{mech},I}^{B_{\min}}
=
2\mu_{\text{arch}}
\left(R_I^-\right)^2
\frac{\hbar}
{4\mu_{\text{arch}}\left(R_I^-\right)^2}
\hat{\mathbf a}
=
\frac{\hbar}{2}\hat{\mathbf a}.
$$

The post-retune self-hit speed ratio is

$$
s_I^+
=
\frac{
R_I^-
\left(
\omega_I^-
+
\dfrac{\hbar}
{4\mu_{\text{arch}}\left(R_I^-\right)^2}
\right)
}{c_f}.
$$

The inner row passes only if

$$
s_I^+>1
$$

and the nontrivial self-delay equation has the declared branch solution

$$
\delta_{\text{self}}^+
=
2s_I^+
\sin\!\left(\frac{\delta_{\text{self}}^+}{2}\right),
$$

with the two-step raw separator update

$$
\Delta N_{\text{self}}=+2,
\qquad
\Delta D=0.
$$

## Vector Residual Evaluation

With the row values above,

$$
\sum_{\ell\in\{I,M,O\}}
\Delta\mathbf L_{\mathrm{mech},\ell}^{B_{\min}}
=
\left(
\frac{\hbar}{2}
+
\frac{\hbar}{4}
+
\frac{\hbar}{4}
\right)\hat{\mathbf a}
=
\hbar\hat{\mathbf a}.
$$

Using the clean-chart assumptions

$$
\Delta\mathbf L_{\mathrm{tr}}^{B_{\min}}=\mathbf 0,
\qquad
\Delta\mathbf J_{\mathrm{wake},B_{\min}}^{(\eta)}[W]=\mathbf 0,
\qquad
\Delta\mathbf J_{\text{coupl}}=\hbar\hat{\mathbf a},
$$

the vector residual evaluates to

$$
\mathcal R_{\mathbf J}^{B_{\min}}
=
\sum_{\ell}
\Delta\mathbf L_{\mathrm{mech},\ell}^{B_{\min}}
+
\Delta\mathbf L_{\mathrm{tr}}^{B_{\min}}
+
\Delta\mathbf J_{\mathrm{wake},B_{\min}}^{(\eta)}[W]
-
\Delta\mathbf J_{\text{coupl}}
=
\hbar\hat{\mathbf a}
-
\hbar\hat{\mathbf a}
=
\mathbf 0.
$$

The transverse residual also evaluates to zero:

$$
\mathcal R_{\perp}^{B_{\min}}
=
\left(I-\hat{\mathbf a}\hat{\mathbf a}^{T}\right)
\mathcal R_{\mathbf J}^{B_{\min}}
=
\mathbf 0.
$$

This vector pass is conditional on the fixed-normal, no-transport, no-retained-wake assumptions. If any layer increment has a transverse part, the failed component is

$$
\left(I-\hat{\mathbf a}\hat{\mathbf a}^{T}\right)
\left(
\Delta\mathbf L_{\mathrm{tr}}^{B}
+
\Delta\mathbf J_{\mathrm{wake},B}^{(\eta)}[W]
+
\sum_{\ell}
\Delta\mathbf L_{\mathrm{mech},\ell}^{B}
\right),
$$

and the scalar $\hbar$ row is not enough to certify angular-momentum closure.

## Energy-Frequency Row

In the first action-angle approximation with no retained root-energy or wake-energy term,

$$
\Delta E_{\text{mech}}^{B_{\min}}
=
\omega_O^\ast\Delta I_{\text{outer}}
+
\omega_M^\ast\Delta I_{\text{middle}}
+
\omega_I^\ast\Delta I_{\text{inner}}.
$$

Substituting the minimal partition gives

$$
\Delta E_{\text{mech}}^{B_{\min}}
=
\frac{\hbar}{4}
\left(
\omega_O^\ast
+
\omega_M^\ast
+
2\omega_I^\ast
\right)
=
\omega_\ast\hbar,
$$

where

$$
\omega_\ast
\equiv
\frac{\omega_O^\ast+\omega_M^\ast+2\omega_I^\ast}{4}.
$$

The clean energy residual is

$$
\mathcal R_E^{B_{\min}}
=
\Delta E_{\text{mech}}^{B_{\min}}
-
\Delta E_{\text{coupl}}
=
\left(\omega_\ast-\omega_{\text{tx}}\right)\hbar.
$$

Equivalently, using the mismatch convention in the source packet,

$$
\Delta E_{\text{mismatch}}
=
\left(\omega_{\text{tx}}-\omega_\ast\right)\hbar
=
-\mathcal R_E^{B_{\min}}.
$$

The clean energy-frequency row passes exactly only when

$$
\omega_{\text{tx}}=\omega_\ast.
$$

With tolerance, the pass condition is

$$
\left|\omega_{\text{tx}}-\omega_\ast\right|\hbar
\le
\varepsilon_E.
$$

If $\omega_{\text{tx}}<\omega_\ast$, the branch fails unless a declared root-energy, wake-energy, recoil, or transport channel supplies

$$
\left(\omega_\ast-\omega_{\text{tx}}\right)\hbar.
$$

If $\omega_{\text{tx}}>\omega_\ast$, the branch fails unless the surplus

$$
\left(\omega_{\text{tx}}-\omega_\ast\right)\hbar
$$

is routed into a declared wake, transport, recoil, or alternate branch channel.

## Tail-Wake Row

The clean instance assigns

$$
\Delta\mathbf J_{\mathrm{wake},B_{\min}}^{(\eta)}[W]=\mathbf 0,
\qquad
\Delta E_{\mathrm{wake},B_{\min}}^{(\eta)}=0.
$$

The theorem-level row is stronger than this assignment. It requires the normalized delayed-interior characteristic-tail boundary charge to be evaluated on the same retained rows:

$$
\mathbf{J}_{\mathrm{wake,eff},B_{\min}}^{(\eta)}(t_f)
-
\mathbf{J}_{\mathrm{wake,eff},B_{\min}}^{(\eta)}(t_i)
=
\mathbf 0.
$$

It also requires the diagnostic-to-action residual to pass:

$$
\mathcal R_{\mathrm{wake}}^{B_{\min}}
=
\Delta\mathbf J_{\mathrm{wake},B_{\min}}^{(\eta)}[W]
-
\Delta\mathbf L_{\mathrm{wake,torque}}^{B_{\min}}[W],
\qquad
\left\|\mathcal R_{\mathrm{wake}}^{B_{\min}}\right\|
\le
\varepsilon_{\mathrm{wake}}.
$$

Therefore the clean tail-wake value passes by assumption, but the wake pullback row requires retained branch-chart data before the certificate can be promoted.

## Stability And Replay Rows

The reduced chart is accepted only if the root, phase, and section-stability rows pass:

$$
\epsilon_{\mathrm{root}}(B_{\min}^{\pm})
\le
\varepsilon_{\mathrm{root}},
\qquad
\epsilon_{\mathrm{rt}}(B_{\min}^{\pm})
\le
\varepsilon_{\mathrm{rt}},
\qquad
\nu_J(B_{\min}^{\pm})
\ge
\nu_{\min}>0,
$$

$$
g_{\mathrm{inact}}(B_{\min}^{\pm})
\ge
g_{\min}>0,
\qquad
\epsilon_{\Phi}(B_{\min}^{\pm})
\le
\varepsilon_{\Phi},
$$

and

$$
\left\|\mathcal R_{\mathrm{return}}(B_{\min}^+)\right\|
\le
\varepsilon_{\mathrm{return}},
\qquad
\rho\!\left(M_{\mathcal S}\vert_{E_\perp}\right)
\le
1-\lambda_{\mathrm{sec}},
\qquad
\lambda_{\mathrm{sec}}>0.
$$

These rows are not populated by the symbolic retune alone. They require a retained branch chart or interval certificate.

## Blocked Rows

The present symbolic scaffold does not fill the following rows:

| Row | Missing data | Exact pass condition |
| --- | --- | --- |
| `root_chart` | Active and inactive causal-root rows for $B_{\min}^-$ and $B_{\min}^+$. | $\epsilon_{\mathrm{root}}\le\varepsilon_{\mathrm{root}}$, $\epsilon_{\mathrm{rt}}\le\varepsilon_{\mathrm{rt}}$, $\nu_J\ge\nu_{\min}>0$, and $g_{\mathrm{inact}}\ge g_{\min}>0$. |
| `row_set_identity` | Proof that force, torque, and normalized tail-wake charges use $\mathcal R_{\min}^{\mathrm{act}}$. | $\mathcal R_{\mathrm{force}}^{\mathrm{act}}=\mathcal R_{\mathrm{torque}}^{\mathrm{act}}=\mathcal R_{\mathrm{wake}}^{\mathrm{act}}$. |
| `phase_lock` | Phase residuals after geometric phase, wake-return delay, and root-ledger phase. | $\epsilon_{\Phi}(B_{\min}^{\pm})\le\varepsilon_{\Phi}$ with no undeclared root relabeling. |
| `torque_consistency` | Time integral of retained row torques on $W$. | $\|\mathcal R_{T,\ell}^{B_{\min}}\|\le\varepsilon_T$ for $\ell\in\{I,M,O\}$. |
| `tail_wake_pullback` | Normalized characteristic-tail charge on retained rows. | $\Delta\mathbf J_{\mathrm{wake},B_{\min}}^{(\eta)}[W]=\mathbf 0$ and $\|\mathcal R_{\mathrm{wake}}^{B_{\min}}\|\le\varepsilon_{\mathrm{wake}}$. |
| `section_stability` | Return map or positive trapping replacement for $B_{\min}^+$. | $\|\mathcal R_{\mathrm{return}}\|\le\varepsilon_{\mathrm{return}}$ and $\rho(M_{\mathcal S}\vert_{E_\perp})\le1-\lambda_{\mathrm{sec}}$ with $\lambda_{\mathrm{sec}}>0$. |

## Final Verdict Table

| Certificate row | Symbolic value in this instance | Verdict |
| --- | --- | --- |
| Coupling sign and axis | $\sigma=+1$, $\Delta\mathbf J_{\text{coupl}}=\hbar\hat{\mathbf a}$ | passes by assumption |
| Normal alignment | $\hat{\mathbf n}_I=\hat{\mathbf n}_M=\hat{\mathbf n}_O=\hat{\mathbf a}$ | passes by assumption |
| Transport remainder | $\Delta\mathbf L_{\mathrm{tr}}^{B_{\min}}=\mathbf 0$ | passes by assumption |
| Scalar partition | $\hbar/2+\hbar/4+\hbar/4+0-\hbar=0$ | passes by assumption |
| Vector partition | $\sum_\ell\Delta\mathbf L_{\mathrm{mech},\ell}^{B_{\min}}-\hbar\hat{\mathbf a}=\mathbf 0$ | passes by assumption |
| Transverse residual | $\mathcal R_{\perp}^{B_{\min}}=\mathbf 0$ under fixed normals and no transport/wake | passes by assumption |
| Outer retune | $\Delta R_O=0$, $\Delta\omega_O=\hbar/\left(8\mu_{\text{arch}}(R_O^-)^2\right)$ | fails unless $R_O^-(\omega_O^-+\hbar/(8\mu_{\text{arch}}(R_O^-)^2))<c_f$ |
| Middle hinge | $R_M^-\Delta\omega_M+\omega_M^-\Delta R_M=0$ and $\mathcal R_M^{(2)}=-\hbar^2/(64\mu_{\text{arch}}^2(R_M^-)^3\omega_M^-)$ | fails unless $|\mathcal R_M^{(2)}|\le\varepsilon_M$ or a second-order retune is supplied |
| Inner retune | $\Delta R_I=0$, $\Delta\omega_I=\hbar/\left(4\mu_{\text{arch}}(R_I^-)^2\right)$ | fails unless $s_I^+>1$ |
| Inner self-delay | $\delta_{\text{self}}^+=2s_I^+\sin(\delta_{\text{self}}^+/2)$ | requires branch-chart data |
| Self-root parity | $\Delta N_{\text{self}}=+2$, $\Delta D=0$ | passes by assumption on the declared raw simple-root separator chart |
| Root chart replay | $\epsilon_{\mathrm{root}}$, $\epsilon_{\mathrm{rt}}$, $\nu_J$, $g_{\mathrm{inact}}$ not evaluated | requires branch-chart data |
| Phase lock | $\epsilon_{\Phi}$ not evaluated | requires branch-chart data |
| Torque consistency | $\mathcal R_{T,\ell}^{B_{\min}}$ not evaluated | requires branch-chart data |
| Tail-wake value | $\Delta\mathbf J_{\mathrm{wake},B_{\min}}^{(\eta)}[W]=\mathbf 0$, $\Delta E_{\mathrm{wake},B_{\min}}^{(\eta)}=0$ | passes by assumption |
| Tail-wake pullback | Normalized characteristic-tail charge not evaluated on retained rows | requires branch-chart data |
| Energy frequency | $\mathcal R_E^{B_{\min}}=(\omega_\ast-\omega_{\text{tx}})\hbar$ | fails unless $|\omega_{\text{tx}}-\omega_\ast|\hbar\le\varepsilon_E$ or a declared energy channel absorbs the mismatch |
| Section stability | $\rho(M_{\mathcal S}\vert_{E_\perp})$ and $\lambda_{\mathrm{sec}}$ not evaluated | requires branch-chart data |

## Certificate Verdict

Inside the clean reduced chart, the populated symbolic rows give

$$
\mathcal R_I^{B_{\min}}=0,
\qquad
\mathcal R_{\mathbf J}^{B_{\min}}=\mathbf 0,
\qquad
\mathcal R_{\perp}^{B_{\min}}=\mathbf 0,
$$

and

$$
\mathcal R_E^{B_{\min}}
=
\left(\omega_\ast-\omega_{\text{tx}}\right)\hbar.
$$

Therefore the solved minimal branch is conditionally certified as an algebraic four-substep angular-momentum partition when:

1. the outer, middle, and inner retune inequalities above pass;
2. $\omega_{\text{tx}}=\omega_\ast$ within tolerance, or the mismatch is routed into a declared non-clean channel;
3. the retained root chart, phase lock, normalized tail-wake pullback, torque consistency, and section-stability rows are supplied by branch-chart data.

The branch is not yet a theorem-grade conserved Noether braid branch. It is a concrete certificate instance whose populated rows identify exactly what remains to certify.
