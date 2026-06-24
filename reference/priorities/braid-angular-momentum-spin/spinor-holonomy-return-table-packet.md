# Spinor Holonomy Return Table Packet

This proof packet supports [Angular Momentum and Spin Closure](braid-angular-momentum-spin.md), especially the `spinor_closure` and `component_resolved_causal_writhe_bridge` tasks. It does not edit or canonize AAA prose. Its purpose is to make the first ordered-frame holonomy test executable on one stable separated-scale Noether braid branch.

Claim level: provisional proof packet. A passing table would establish a first branch-local holonomy gate only. It would not by itself prove spin-$\tfrac{1}{2}$ behavior for every fermion-sector branch, recover measurement statistics, or close spin-statistics.

## Branch and Rotation Data

Use a stable separated-scale Noether braid branch $B_{\mathrm{sep}}$ with ordered layer aliases
$$
H\equiv I,\qquad M\equiv M,\qquad L\equiv O,
$$
where $H$ is the high / inner self-hit layer, $M$ is the field-speed hinge, and $L$ is the low / outer interface layer. The branch is in the non-coplanar spinor-test domain:
$$
R_H\omega_H>c_f,\qquad
R_M\omega_M\approx c_f,\qquad
R_L\omega_L<c_f,
\qquad
\det[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L]\ne0.
$$

The branch-history record is
$$
\mathfrak H_B
=
\left(
\{\mathbf x_{a,\alpha},\dot{\mathbf x}_{a,\alpha}\},
\{\mathcal G_a\}_{a\in\{H,M,L\}},
\{\mathcal G_{ab}\}_{a<b},
\{\Psi_r\}_{r\in\mathscr K_B},
\mathcal W_c^{\mathrm{core}},
\chi_c,
\mathcal J_B
\right),
$$
where $\mathscr K_B$ is the active-root row set defined below, $\chi_c$ is the ordered core chirality branch, and
$$
\mathcal W_c^{\mathrm{core}}
=
\left(
\{Wr_c^a\}_{a\in\{H,M,L\}},
\{Wr_c^{ab}\}_{a<b},
\chi_{HML}^{(c)},
\{s_a^{\mathrm{plane}}\}_{a\in\{H,M,L\}},
s_{\mathrm{axial}},
\Sigma_{\mathrm{WCT}}
\right)
$$
is the component-resolved causal-writhe candidate inherited from the priority file.

Let $\gamma_{2\pi}$ be a physical ordered-frame rotation path with visible orientation loop
$$
R_\gamma:[0,1]\to SO(3),
\qquad
R_\gamma(0)=R_\gamma(1)=\mathbf 1,
\qquad
[R_\gamma]=1\in\pi_1(SO(3))\cong\mathbb Z_2.
$$
The transported branch history is $\mathcal T_{\gamma_{2\pi}}\mathfrak H_B$. The doubled path is
$$
\gamma_{4\pi}=\gamma_{2\pi}\ast\gamma_{2\pi}.
$$

## Active-Root Row Set

The return table is evaluated over
$$
\mathscr K_B
=
\mathscr K_H^{\mathrm{self}}
\sqcup
\mathscr K_H^{\mathrm{partner}}
\sqcup
\mathscr K_M^{\mathrm{partner}}
\sqcup
\mathscr K_L^{\mathrm{partner}}
\sqcup
\mathscr K_{HM}
\sqcup
\mathscr K_{HL}
\sqcup
\mathscr K_{ML}.
$$
Each row has the form
$$
r=(a,\alpha;m,\beta;b),
\qquad
a,m\in\{H,M,L\},
\qquad
\alpha,\beta\in\{+1,-1\},
$$
and records the continued causal root
$$
t_{0,r}^{(b)}(s)\in
\mathcal C_{a\alpha,m\beta}(t;s),
\qquad
s\in[0,1],
$$
through the $2\pi$ path. The root may be a same-member self-hit, same-layer partner hit, or inter-layer exchange hit.

For every row define the phase residual
$$
\Psi_r(s)
=
\vartheta_{a,\alpha}(t;s)
-
\vartheta_{m,\beta}(t_{0,r}^{(b)};s)
+
\phi_{am}^{(b)}(s)
-
2\pi k_r(s),
$$
with the active-root condition
$$
\Psi_r(s)\equiv0\pmod{2\pi}.
$$
The integer change
$$
\Delta k_r^{2\pi}=k_r(1)-k_r(0)
$$
is the phase-branch entry for the table.

## Local Parity Diagnostics

The packet uses parity diagnostics only as provisional table variables. They are not canon definitions.

For each row $r$, define the source / receiver ordering parity
$$
\Delta e_r^{2\pi}
\in\mathbb Z_2
$$
to be $1$ exactly when the continued row returns with an odd reversal of the row's declared emission-order data inside the same branch chart. It is $0$ when the emission-order data return identically.

Define the component causal-writhe parity
$$
\Delta w_r^{2\pi}
\in\mathbb Z_2
$$
by applying the declared component-writhe parity extractor to the row's relevant component:
$$
W_r
=
\begin{cases}
Wr_c^a, & a=m,\\
Wr_c^{am}, & a\ne m.
\end{cases}
$$
Thus $\Delta w_r^{2\pi}=1$ means the row detects an odd branch-history change in the retained component-resolved causal-writhe data, while $\Delta w_r^{2\pi}=0$ means it returns identically on the declared component.

Define the chirality entry
$$
\Delta\chi_r^{2\pi}
\in\mathbb Z_2
$$
as the row's contribution to a changed ordered chirality branch $\chi_c$, including the `HML/HLM` datum and any retained $\chi_{HML}^{(c)}$ parity. A smooth rotation that preserves the ordered 3D branch should have $\Delta\chi_r^{2\pi}=0$ unless the causal-root continuation detects a physical sheet change that is not removable by the quotient.

The row-level provisional sheet contribution is
$$
\epsilon_r^{2\pi}
=
\left[
\Delta k_r^{2\pi}
+
\Delta e_r^{2\pi}
+
\Delta w_r^{2\pi}
+
\Delta\chi_r^{2\pi}
\right]_2.
$$
The branch-level provisional wake-history parity is
$$
\epsilon_{\mathrm{wake}}^{2\pi}(B_{\mathrm{sep}})
=
\left[
\sum_{r\in\mathscr K_B}
\epsilon_r^{2\pi}
\right]_2,
$$
after the quotient decisions in the table have removed only genuine gauge rows.

## Quotient Decisions

The table must decide which returned differences are gauge and which are physical branch-history data.

| Decision class | Removed by $G_{\mathrm{gauge}}$? | Rule for this packet |
| --- | --- | --- |
| Center-of-mass translation | yes | Remove only the common $\mathbf X(t)$ shift, with no change in root identity or phase branch. |
| Time-origin choice | yes | Remove uniform reindexing of the closure period that preserves every $t_{0,r}^{(b)}$ continuation class. |
| Smooth phase reparameterization inside the same root-ledger cell | yes | Remove only if all $\Delta k_r^{2\pi}$ changes cancel as coordinate rephasing and no row changes emission order, writhe parity, or $\chi_c$. |
| Small branch-preserving deformation | yes | Remove only while ordered layer labels, active-root ledgers, chirality branch, and root gaps remain fixed. |
| Ordered layer permutation | no | A change exchanging $H$, $M$, or $L$ is a physical branch change or a failed table row. |
| Oriented-normal reversal | no | Reversal of a retained $\hat{\mathbf n}_a$ is not a gauge move in the ordered-frame chart. |
| Causal-root relabeling, fold, separator crossing, or root loss | no | This invalidates a branch-preserving $2\pi$ holonomy table unless it is explicitly declared as the branch-changing event under study. |
| Odd component-resolved causal-writhe parity | no | Retain as physical if it survives the declared component-writhe parity extractor and does not arise from allowed rephasing. |
| $\chi_c$ branch change | no | Retain as physical; a smooth branch-preserving rotation should not erase or relabel it. |
| $\epsilon_{\mathrm{wake}}$ sheet change | no | Retain as the candidate two-sheet history lift when the row table otherwise passes. |

## Concrete $2\pi$ Return Table

The following table is the required branch-certificate worksheet. Each active row family expands into one row for every actual root $r\in\mathscr K_B$ in the stable branch certificate.

| Row family | Active roots $r$ | Phase branch entry | Component-resolved causal-writhe entry | Chirality branch entry | Angular-momentum row | Quotient / gauge decision | $2\pi$ criterion | $4\pi$ criterion |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| $H$ self-hit | $r=(H,\alpha;H,\alpha;b)\in\mathscr K_H^{\mathrm{self}}$ | $\Delta k_r^{2\pi}$ from $\Psi_{H\alpha\leftarrow H\alpha}^{(b)}$ | $\Delta w_r^{2\pi}$ from $Wr_c^H$ | contribution to $\chi_{HML}^{(c)}$ through the high self-history | keep $2\mu_{\text{arch}}R_H^2\omega_H\hat{\mathbf n}_H+\mathbf L_{\mathrm{self-act}}^H$ and its wake boundary term | self-hit root identity, even separator parity, and root continuation are not gauge | pass if the root remains simple, $\Psi_r\equiv0$, $g_{\mathrm{root},r}>0$, and retained $\epsilon_r^{2\pi}$ is recorded | pass if the doubled row returns with $\epsilon_r^{4\pi}=0$ and no root loss |
| $H$ same-layer partner | $r=(H,\alpha;H,-\alpha;b)\in\mathscr K_H^{\mathrm{partner}}$ | $\Delta k_r^{2\pi}$ from in-layer partner phase closure | $\Delta w_r^{2\pi}$ from $Wr_c^H$ and in-layer emission order | contribution to high-layer ordering inside $\chi_c$ | include the $H$ mechanical increment plus retained in-layer wake torque | same-layer member exchange is not gauge unless it is only a smooth phase origin shift with all ledgers fixed | pass if source / receiver ordering returns or gives a retained odd parity without branch change | pass if odd parity cancels on the doubled path |
| $M$ same-layer partner | $r=(M,\alpha;M,-\alpha;b)\in\mathscr K_M^{\mathrm{partner}}$ | $\Delta k_r^{2\pi}$ from hinge phase closure | $\Delta w_r^{2\pi}$ from $Wr_c^M$ | contribution to middle placement in `HML/HLM` | include hinge contribution $2\mu_{\text{arch}}R_M^2\omega_M\hat{\mathbf n}_M$ and boundary wake term | hinge rephasing is gauge only if it preserves the $v=c_f$ root-ledger cell | pass if $R_M\omega_M\approx c_f$ remains in the declared tolerance and the row has no unbalanced phase slip | pass if doubled transport restores the hinge row and phase branch |
| $L$ same-layer partner | $r=(L,\alpha;L,-\alpha;b)\in\mathscr K_L^{\mathrm{partner}}$ | $\Delta k_r^{2\pi}$ from outer phase closure | $\Delta w_r^{2\pi}$ from $Wr_c^L$ and planar sign candidate $s_L^{\mathrm{plane}}$ when a viewing normal is declared | contribution to low / outer placement in $\chi_c$ | include $2\mu_{\text{arch}}R_L^2\omega_L\hat{\mathbf n}_L$ and source-facing wake exchange | outer phase origin is gauge only inside the same root-ledger cell | pass if the outer branch remains sub-field-speed and the row's retained parity is well-defined | pass if doubled transport restores outer row, phase, and planar sign |
| $HM$ exchange | $r=(H,\alpha;M,\beta;b)$ or $(M,\beta;H,\alpha;b)\in\mathscr K_{HM}$ | $\Delta k_r^{2\pi}$ from $\Psi_{H\alpha\leftarrow M\beta}^{(b)}$ or reverse row | $\Delta w_r^{2\pi}$ from $Wr_c^{HM}$ | records whether high-middle ordering contributes to $\chi_{HML}^{(c)}$ | include paired $H/M$ torque and wake-boundary exchange | delayed exchange-root relabeling is not gauge | pass if both directions, when active, close phase and preserve exchange-root identity | pass if doubled $HM$ exchange returns with zero retained parity |
| $HL$ exchange | $r=(H,\alpha;L,\beta;b)$ or $(L,\beta;H,\alpha;b)\in\mathscr K_{HL}$ | $\Delta k_r^{2\pi}$ from high-low phase closure | $\Delta w_r^{2\pi}$ from $Wr_c^{HL}$ | records whether high-low ordering flips the `HML/HLM` branch | include paired $H/L$ torque and wake-boundary exchange | high-low causal-root continuation is physical branch data | pass if active roots remain separated from inactive roots and retained parity is not erased by rephasing | pass if doubled $HL$ exchange restores the original branch row |
| $ML$ exchange | $r=(M,\alpha;L,\beta;b)$ or $(L,\beta;M,\alpha;b)\in\mathscr K_{ML}$ | $\Delta k_r^{2\pi}$ from middle-low phase closure | $\Delta w_r^{2\pi}$ from $Wr_c^{ML}$ | records whether middle-low ordering contributes to $\chi_c$ | include paired $M/L$ torque and wake-boundary exchange | middle-low exchange-root relabeling is not gauge | pass if hinge / outer exchange closes without branch loss or hidden torque | pass if doubled $ML$ exchange restores phase, root identity, and parity |
| Ordered chirality row | $\chi_c$, $\chi_{HML}^{(c)}$, and retained $\{s_a^{\mathrm{plane}}\},s_{\mathrm{axial}},\Sigma_{\mathrm{WCT}}$ | not a phase root; references all row phase branches | aggregate $\sum_r\Delta w_r^{2\pi}$ and declared component tuple | $\Delta\chi_c^{2\pi}$ | no independent $\mathbf J$ term; must be compatible with all layer and wake terms | not gauge if `HML/HLM`, planar signs, axial sign, or weak-coupling-triad exposure change physically | pass if any nonzero retained chirality parity is explicitly sourced by row transport and the base branch remains non-coplanar | pass if all chirality entries restore after $\gamma_{4\pi}$ |
| Total angular-momentum ledger | all rows | all $\Delta k_r^{2\pi}$ must satisfy phase closure | all retained writhe entries must be compatible with root continuation | $\chi_c$ must be branch-preserving unless sheet change is the retained parity | use $\mathcal J_{\mathrm{tot}}^{\mathrm{path}}$ below | quotient must not hide unbalanced torque | pass if $\Delta_{\mathbf J}^{2\pi}\le\varepsilon_{\mathbf J}$ | pass if $\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J}$ and the full lifted state restores |

## Angular-Momentum Conservation Residual

The table must declare whether the rotation path is tested as an isolated adiabatic continuation or as a driven comparison path. For a driven path, include the drive and boundary wake ledgers:
$$
\mathcal J_{\mathrm{tot}}^{\mathrm{path}}(s)
=
\mathcal J_B(\mathfrak H_B(s))
+
\mathcal J_{\mathrm{drive}}(s)
+
\mathcal J_{\mathrm{wake},\partial}(s).
$$
For an isolated path, set $\mathcal J_{\mathrm{drive}}=\mathbf 0$ and absorb all retained boundary wake into $\mathcal J_B$.

The residual is
$$
\Delta_{\mathbf J}^{2\pi}
=
\sup_{s\in[0,1]}
\frac{
\left\|
\mathcal J_{\mathrm{tot}}^{\mathrm{path}}(s)
-
\mathcal J_{\mathrm{tot}}^{\mathrm{path}}(0)
\right\|
}
{
1+\left\|\mathcal J_{\mathrm{tot}}^{\mathrm{path}}(0)\right\|
},
$$
with an analogous $\Delta_{\mathbf J}^{4\pi}$ on $s\in[0,2]$ for the doubled path. The angular-momentum gate passes only when the declared tolerance satisfies
$$
\Delta_{\mathbf J}^{2\pi}\le\varepsilon_{\mathbf J},
\qquad
\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J}.
$$

If this packet is evaluated on the solved minimal positive transaction certificate, the projected partition row should use
$$
\Delta I_H=\frac{\hbar}{2},
\qquad
\Delta I_M=\frac{\hbar}{4},
\qquad
\Delta I_L=\frac{\hbar}{4},
\qquad
\Delta I_{\mathrm{wake}}=0,
$$
with the reminder that this partition is a transaction certificate, not the general holonomy proof.

## Pass / Fail Gates

The $2\pi$ nontrivial-history-lift gate passes for $B_{\mathrm{sep}}$ only if all of the following conditions hold:

1. The visible ordered normal triad closes:
   $$
   \rho_B(\mathcal T_{\gamma_{2\pi}}\mathfrak H_B)
   =
   \rho_B(\mathfrak H_B).
   $$
2. The branch remains in the non-coplanar test domain:
   $$
   \det[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L]\ne0
   $$
   along the path, with positive root and phase margins.
3. Every active root row continues without undeclared root loss, fold crossing, separator crossing, or branch-changing relabeling.
4. Every row satisfies $\Psi_r(s)\equiv0\pmod{2\pi}$ in the regularized chart.
5. The angular-momentum residual satisfies $\Delta_{\mathbf J}^{2\pi}\le\varepsilon_{\mathbf J}$.
6. After quotienting only genuine gauge rows,
   $$
   \epsilon_{\mathrm{wake}}^{2\pi}(B_{\mathrm{sep}})=1.
   $$

The $4\pi$ restoration gate passes only if the doubled path restores the lifted branch history:
$$
\rho_B(\mathcal T_{\gamma_{4\pi}}\mathfrak H_B)
=
\rho_B(\mathfrak H_B),
\qquad
\epsilon_{\mathrm{wake}}^{4\pi}(B_{\mathrm{sep}})=0,
\qquad
\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J},
$$
with all active-root rows returning to their original root identity, phase branch, component-resolved causal-writhe entry, and chirality branch after quotienting allowed gauge.

The ordered-frame spinor candidate fails for this branch if any of the following occur:

| Failure | Meaning |
| --- | --- |
| $\epsilon_{\mathrm{wake}}^{2\pi}=0$ while all rows otherwise close | The ordered frame behaves as an ordinary $SO(3)$ object for this branch. |
| $\epsilon_{\mathrm{wake}}^{4\pi}=1$ or any row fails to restore after $\gamma_{4\pi}$ | The proposed two-sheet lift does not close as a fermion spinor target. |
| A row changes by an undeclared root fold, separator crossing, root loss, or causal-locus reconnection | The table has left the branch-preserving holonomy test; it may indicate a reconfiguration event, not a spinor lift. |
| $\Delta_{\mathbf J}^{2\pi}>\varepsilon_{\mathbf J}$ or $\Delta_{\mathbf J}^{4\pi}>\varepsilon_{\mathbf J}$ | The quotient is hiding unbalanced angular momentum or missing drive / wake terms. |
| $\det[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L]=0$ along the path | The branch has degenerated into the planar $SO(2)$ / $U(1)$ domain and is no longer a non-coplanar spinor-test branch. |
| The only nonzero parity comes from a row classified as gauge | The apparent sheet change is a coordinate artifact, not physical history holonomy. |

## Resulting Mathematical Artifact

The concrete object produced by this packet is the map
$$
\eta_{B_{\mathrm{sep}}}^{\mathrm{table}}:
\{\gamma_{2\pi},\gamma_{4\pi}\}
\longrightarrow
\mathbb Z_2
$$
computed by the return table:
$$
\eta_{B_{\mathrm{sep}}}^{\mathrm{table}}(\gamma_{2\pi})
=
\epsilon_{\mathrm{wake}}^{2\pi}(B_{\mathrm{sep}}),
\qquad
\eta_{B_{\mathrm{sep}}}^{\mathrm{table}}(\gamma_{4\pi})
=
\epsilon_{\mathrm{wake}}^{4\pi}(B_{\mathrm{sep}}).
$$
The provisional spinor-holonomy gate is
$$
\boxed{
\eta_{B_{\mathrm{sep}}}^{\mathrm{table}}(\gamma_{2\pi})=1,
\qquad
\eta_{B_{\mathrm{sep}}}^{\mathrm{table}}(\gamma_{4\pi})=0,
\qquad
\Delta_{\mathbf J}^{2\pi},\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J}.
}
$$

This is the next branch-certificate target: populate the rows from a simulated or analytic stable branch. If the populated table passes, the ordered-frame route gains a concrete branch-local $2\pi$ history lift and $4\pi$ restoration. If it fails, the failure row identifies whether the route collapses to ordinary $SO(3)$ closure, leaves the branch-preserving domain, loses angular-momentum balance, or degenerates into the planar $SO(2)$ / $U(1)$ regime.
