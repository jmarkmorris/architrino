# Lorentz/GR Bridge Dependency Handoff

Claim level: non-promotional dependency packet. This file prepares the Lorentz/GR bridge interface before `spiral_branch_chart_test` closes. It does not claim that moving three-binary Lorentz behavior, weak-field GR recovery, PPN closure, or preferred-frame suppression has been proved.

Source anchors inspected for this handoff:

- [priorities.md](priorities.md)
- [lorentz-kinematics.md](../../../content/markdown/aaa/spacetime/lorentz-kinematics.md)
- [emergent-metric.md](../../../content/markdown/aaa/spacetime/emergent-metric.md)
- [proper-time-and-time-dilation.md](../../../content/markdown/aaa/spacetime/proper-time-and-time-dilation.md)

## Dependency Split

The bridge has two proof stages.

1. Moving-assembly extraction: a retained moving Noether braid branch must supply contraction, clock-retuning, and two-way leakage rows from one branch ledger.
2. Weak-field medium response: only after the moving-assembly packet closes may the coarse-grained Noether sea record be projected into ADM/Cartan variables and PPN residuals.

The first stage is blocked by `spiral_branch_chart_test`. The second stage can be prepared as a coefficient and residual contract, but it cannot be evaluated until the first stage supplies a branch class and a shared clock/ruler ledger.

## Upstream Branch-Chart Inputs

The bridge consumes a branch certificate, not a narrative description. The required upstream input is

$$
\mathfrak{B}_{q}
=
\left(
q,\mathcal{D}_{\beta},\boldsymbol{\rho}^{\star}_{q},
J_{\min},g_{\mathrm{inactive}},h_{\mathrm{mem}},
\lambda_{\mathrm{mon}},\mathcal{R}_{\mathrm{ret}},
\eta,\epsilon_c
\right),
$$

where:

- $q$ is the retained branch identity.
- $\mathcal{D}_{\beta}=\{0\le\beta_f\le\beta_{\max}<1\}$ with $\beta_f=v/c_f$ is the certified drift band.
- $\boldsymbol{\rho}^{\star}_{q}(s;\beta_f)$ is the translated attractor family.
- $J_{\min}>0$ is the active-root Jacobian floor.
- $g_{\mathrm{inactive}}>0$ is the inactive-root gap floor.
- $h_{\mathrm{mem}}<\infty$ is the declared memory-depth bound.
- $\lambda_{\mathrm{mon}}$ is the monodromy or trapping stability margin.
- $\mathcal{R}_{\mathrm{ret}}$ is the returned-section residual.
- $\eta$ and $\epsilon_c$ are the regularization and branch-cut tolerances used in the certificate.

The Lorentz/GR bridge is blocked if any entry is missing, if the branch identity changes under refinement, or if the reported Lorentz variables are extracted from a different ledger than $\mathfrak{B}_{q}$.

## Moving Noether Braid Contract

Primitive causal roots remain solved with the field speed $c_f$. The observer-channel speed is declared only after the branch chart is fixed:

$$
c_\star
\in
\{c_f,\ c_{\text{eff}}(\mathbf{x},t),\ c_\gamma(\mathbf{x},t)\},
\qquad
\beta_\star=\frac{v}{c_\star},
\qquad
\gamma_\star(v)=\frac{1}{\sqrt{1-\beta_\star^2}}.
$$

For branch $q$, the moving shape tensor is

$$
Q_{ab}^{(q)}(v)
=
\frac{1}{M_q}
\left\langle
\sum_i m_i r_{i,a}r_{i,b}
\right\rangle_{\mathrm{cyc},q},
\qquad
M_q=\sum_i m_i.
$$

With drift axis $\hat{\mathbf e}_{\parallel}$ and transverse projector $P_{\perp}^{ab}=\delta^{ab}-\hat e_{\parallel}^{a}\hat e_{\parallel}^{b}$, the extracted semiaxes are

$$
a_{\parallel,q}(v)
=
\sqrt{\hat e_{\parallel}^{a}Q_{ab}^{(q)}(v)\hat e_{\parallel}^{b}},
\qquad
a_{\perp,q}(v)
=
\sqrt{\frac{1}{2}P_{\perp}^{ab}Q_{ab}^{(q)}(v)}.
$$

The declared clock phase must come from the same branch ledger:

$$
T_q(v)
=
\frac{2\pi}{\langle\dot{\theta}_{\mathrm{clk},q}\rangle_{\mathrm{cyc}}},
\qquad
T_0=T_q(0).
$$

The moving-assembly residuals prepared for the future bridge are

$$
R_{\parallel}^{(q)}(v)
\equiv
\frac{a_{\parallel,q}(v)}{a_{\perp,q}(v)}
-
\frac{1}{\gamma_\star(v)},
\qquad
R_T^{(q)}(v)
\equiv
\frac{T_q(v)}{T_0}
-
\gamma_\star(v).
$$

The acceptance target, not yet claimed, is

$$
|R_{\parallel}^{(q)}(v)|
\le
C_{\parallel}\epsilon_{\mathrm{LV}}\beta_\star^2,
\qquad
|R_T^{(q)}(v)|
\le
C_T\epsilon_{\mathrm{LV}}\beta_\star^2
$$

uniformly on the certified drift band. The packet fails if contraction and clock retuning use different branch ledgers, if $c_f$ is identified with $c_\star$ without a dressing map, or if Lorentz agreement appears only after tuning PPN coefficients.

## Prepared Coefficient Identities

The moving-branch packet may report a cycle-averaged stiffness tensor

$$
K_{ab}(\beta)
=
\left\langle
\frac{\partial^2 U_{\text{eff}}}{\partial r_a\partial r_b}
\right\rangle_{\mathrm{cyc}},
\qquad
K_{\parallel}=\hat e_{\parallel}^{a}K_{ab}\hat e_{\parallel}^{b},
\qquad
K_{\perp}=\frac{1}{2}P_{\perp}^{ab}K_{ab}.
$$

Write

$$
\frac{K_{\parallel}}{K_0}
=
1+k_2\beta^2+k_4\beta^4+O(\beta^6)+\Delta_{\parallel}^{\mathrm{LV}},
$$

$$
\frac{K_{\perp}}{K_0}
=
1+\ell_2\beta^2+\ell_4\beta^4+O(\beta^6)+\Delta_{\perp}^{\mathrm{LV}}.
$$

The prepared Lorentz identities are:

$$
\ell_2-k_2=-1,
\qquad
4(\ell_4-k_4)+3k_2^2-2k_2\ell_2-\ell_2^2=-1,
$$

for the semiaxis ratio, and

$$
k_2+2\ell_2=-3,
$$

$$
\frac{7}{72}(k_2+2\ell_2)^2
-
\frac{k_4+\ell_2^2+2\ell_4+2k_2\ell_2}{6}
=
\frac{3}{8}
$$

for the clock period when the symmetric clock-frequency aggregator is used. The local minimal solution retained as a target row is

$$
k_2=-\frac{1}{3},
\qquad
\ell_2=-\frac{4}{3},
\qquad
k_4=-\frac{1}{9},
\qquad
\ell_4=\frac{2}{9},
$$

before leakage terms. These numbers are not a closure claim; they are a diagnostic row that a branch-derived stiffness calculation must recover or falsify.

## Clock-Row Handoff

The proper-time channel consumes the same moving branch through the Noether sea cadence stretch

$$
\Gamma_N(\mathbf{x},t)
=
\frac{T_N(\mathbf{x},t)}{T_{N0}}
=
\frac{\Omega_{N0}}{\Omega_N(\mathbf{x},t)},
\qquad
C_N=\Gamma_N^{-1}.
$$

The prepared deformation record is

$$
\mathbf{g}_N
=
\left(
\ln n,\,
\ln\chi_{\text{sea}},\,
\ln\lambda,\,
-\ln\xi,\,
\ln\frac{R_{\text{core}}}{R_{\text{core},0}}
\right)^T.
$$

The clock-row extraction target is

$$
\ln\Gamma_N
=
\mathbf{b}_N\cdot\mathbf{g}_N
+\mathcal{R}_{\Gamma},
\qquad
\mathbf{b}_N
=
\left(
b_n,b_\chi,b_\lambda,1,b_R
\right).
$$

The coefficient $b_\xi=1$ is inherited only if the homogeneous moving-core branch supplies $\Gamma_N\to1/\xi\to\gamma_\star$ within the leakage tolerance. Static weak-field redshift separately requires

$$
\ln\Gamma_N(\mathbf{x},t)
=
-\frac{\Phi_N(\mathbf{x},t)}{c_0^2}
+O\!\left(\frac{\Phi_N^2}{c_0^4}\right).
$$

Equivalently, for static weak-potential response coefficients

$$
\ln n=a_n\frac{U}{c_0^2},
\quad
\ln\chi_{\text{sea}}=a_\chi\frac{U}{c_0^2},
\quad
\ln\lambda=a_\lambda\frac{U}{c_0^2},
\quad
\ln\frac{R_{\text{core}}}{R_{\text{core},0}}=a_R\frac{U}{c_0^2},
$$

with $U=-\Phi_N>0$ and $-\ln\xi=0+O(U^2/c_0^4)$ in an isotropic static endpoint cell,

$$
b_n a_n+b_\chi a_\chi+b_\lambda a_\lambda+b_R a_R=1.
$$

The shared clock/signal delay condition prepared for the weak-field bridge is

$$
\Delta_\chi^{\mathrm{clk\text{-}sig}}
\equiv
a_\chi-(1+\gamma_{\text{eff}}),
\qquad
\Delta_\chi^{\mathrm{clk\text{-}sig}}=0.
$$

If this condition fails, the difference is a channel-splitting residual and cannot be hidden inside a fitted clock row.

## Weak-Field Medium-Response Handoff

The coarse-grained medium response is the ADM/Cartan map

$$
\mathcal{K}_{\mathrm{med}}:
(h_{ij},n,\chi_{\text{sea}},\Phi_{\text{eff}},\text{stress})
\mapsto
(N,u^i_{\text{sea}},e^a{}_i,\gamma_{ij}),
\qquad
\gamma_{ij}=\delta_{ab}e^a{}_i e^b{}_j.
$$

The observer-level effective line element is

$$
ds_{\mathrm{eff}}^2
=
-N^2c_0^2dt^2
+
\gamma_{ij}
\left(dx^i-u^i_{\text{sea}}dt\right)
\left(dx^j-u^j_{\text{sea}}dt\right).
$$

The prepared first weak-field coefficient scaffold is

$$
\delta n=n-1,
\qquad
\delta\chi=\frac{\chi_{\text{sea}}}{\chi_{\text{sea}}(\infty)}-1,
\qquad
\varphi=\frac{\Phi_{\text{eff}}}{c_0^2},
$$

$$
N
=
1
+A_N^n\delta n
+A_N^\chi\delta\chi
+A_N^\Phi\varphi
+Q_N(\delta n,\delta\chi,\varphi,\sigma)
+O(c_0^{-6},\epsilon_{\mathrm{LV}}),
$$

$$
\gamma_{ij}
=
h_{ij}
\left(
1
+A_\gamma^n\delta n
+A_\gamma^\chi\delta\chi
+A_\gamma^\Phi\varphi
\right)
+A_{\gamma,\mathrm{tf}}\sigma^{\mathrm{tf}}_{ij}
+O(c_0^{-4},\epsilon_{\mathrm{LV}}),
$$

$$
u^i_{\text{sea}}
=
B^i{}_j w^j\frac{U}{c_0^2}
+O(c_0^{-5},\epsilon_{\mathrm{LV}}).
$$

These coefficient rows must be derived from one retained Noether sea record. The bridge is not admissible if clock redshift, Shapiro delay, lensing, weak-field acceleration, and preferred-frame residuals require separate fitted records.

## PPN And Leakage Variables

The weak-field bridge should export the PPN vector

$$
\mathbf{p}_{\mathrm{PPN}}^{(q)}
=
\begin{pmatrix}
\gamma_{\mathrm{PPN}}^{(q)}-1\\
\beta_{\mathrm{PPN}}^{(q)}-1\\
\alpha_1^{(q)}\\
\alpha_2^{(q)}\\
\alpha_3^{(q)}
\end{pmatrix},
$$

against the benchmark row

$$
\mathbf{b}_{\mathrm{Will}}
=
\begin{pmatrix}
2.3\times10^{-5}\\
8\times10^{-5}\\
4\times10^{-5}\\
2\times10^{-9}\\
4\times10^{-20}
\end{pmatrix}.
$$

The prepared pass condition is

$$
\left\|
\operatorname{diag}(\mathbf{b}_{\mathrm{Will}})^{-1}
\mathbf{p}_{\mathrm{PPN}}^{(q)}
\right\|_\infty
\le1.
$$

The preferred-frame leakage scalar for the bridge remains

$$
\mathcal{L}_{\mathrm{PF}}
\equiv
\max\left(
\mathcal{E}_{\text{shape}},
\mathcal{E}_{\text{clock}},
\sup_{\beta,\theta}|\Delta_{\text{tw}}(\beta,\theta)|,
|\alpha_1|,
|\alpha_2|,
|\alpha_3|,
|C_{Uv}|
\right).
$$

The bridge target is $\mathcal{L}_{\mathrm{PF}}\le\epsilon_{\mathrm{LV}}$. This packet only names the variables and their consumers.

## Failure Modes

The Lorentz/GR bridge remains blocked or falsified under any of the following conditions:

- `spiral_branch_chart_test` fails to produce an admissible branch certificate with finite memory depth, positive active Jacobian floor, positive inactive-root gaps, and stable returned-section behavior.
- The moving shape, clock phase, two-way synchronization row, or photon specialization are extracted from different branch ledgers.
- The branch requires a hidden identification $c_f=c_{\text{eff}}=c_\gamma$ rather than declaring a dressing map for $c_\star$.
- The stiffness coefficients do not converge under controlled $\eta$ or $\epsilon_c$ refinement.
- The homogeneous Lorentz branch does not fix $b_\xi=1$ through $\Gamma_N\to1/\xi$.
- Static redshift, Shapiro delay, lensing, and weak-field acceleration require independent coefficient rows.
- $\Delta_\chi^{\mathrm{clk\text{-}sig}}$ is absorbed as fit freedom rather than exported as channel splitting.
- Preferred-frame leakage exceeds the declared tolerance in clock, shape, two-way signal, PPN, or SME-style projections.
- Agreement with Lorentz or GR observables occurs only for an isolated value of $\kappa$, $\eta$, or axial-structure detail rather than an open admissible parameter family.

## Ready Outputs Before Spiral Closure

The following bridge pieces are prepared now:

- Branch-input tuple $\mathfrak{B}_q$ and required fields.
- Moving semiaxis and clock-period residual definitions.
- Stiffness-coefficient diagnostic identities through $O(\beta^4)$.
- Clock-row deformation record $\mathbf{g}_N$ and cadence-stretch extraction row.
- Shared clock/signal delay residual $\Delta_\chi^{\mathrm{clk\text{-}sig}}$.
- ADM/Cartan coefficient scaffold for weak-field medium response.
- PPN vector, benchmark normalization, and preferred-frame leakage variables.

The following pieces remain blocked:

- Numerical or interval values for $R_{\parallel}^{(q)}$, $R_T^{(q)}$, $\Delta_{\mathrm{tw}}^{(q)}$, $k_i$, and $\ell_i$.
- Any claim that $b_\xi=1$ has been derived for an actual branch.
- Any claim that $\gamma_{\mathrm{PPN}}=1$, $\beta_{\mathrm{PPN}}=1$, or $\alpha_i=0$ has been recovered.
- Any promotion of the Lorentz/GR bridge from dependency handoff to closure result.
