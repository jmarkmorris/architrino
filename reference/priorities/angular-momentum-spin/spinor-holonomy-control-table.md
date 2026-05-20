# Spinor Holonomy Control Table

This proof packet supports [Angular Momentum and Spin Closure](angular-momentum-spin.md) and should be read beside [Spinor Holonomy Return Table Packet](spinor-holonomy-return-table-packet.md). It does not edit or canonize $\mathbb{A}\mathbb{A}\mathbb{A}$ prose. Its purpose is to make the ordered-frame spinor route falsifiable by evaluating a controlled null case.

Claim level: provisional control / falsifier packet. The result below is not a proof that every ordered Noether-core branch is ordinary $SO(3)$. It proves only that a branch-preserving rigid ordered-frame loop with identity return on every retained history row has trivial table holonomy.

## Controlled Null Branch

Use the separated-scale ordered branch notation from the return-table packet:

$$
H\equiv I,\qquad M\equiv M,\qquad L\equiv O,
$$

with branch-history record

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
\right).
$$

The control case assumes a stable branch-preserving path

$$
\gamma_{2\pi}^{\mathrm{rig}}:[0,1]\to\mathcal Q_B^{\mathrm{ord}}
$$

whose visible ordered-frame projection is the nontrivial loop in $SO(3)$:

$$
\rho_B(\gamma_{2\pi}^{\mathrm{rig}})(0)
=
\rho_B(\gamma_{2\pi}^{\mathrm{rig}})(1)
=
\mathbf 1,
\qquad
\left[\rho_B(\gamma_{2\pi}^{\mathrm{rig}})\right]
=
1\in\pi_1(SO(3))\cong\mathbb Z_2.
$$

The path is a control because it is rigid on the retained branch-history data. It keeps the ordered non-coplanar test domain open,

$$
\det[\hat{\mathbf n}_H(s),\hat{\mathbf n}_M(s),\hat{\mathbf n}_L(s)]\ne0
\qquad
\text{for all }s\in[0,1],
$$

and no active root is lost, folded, reconnected, or relabeled. In table form, every retained row returns identically after the allowed quotient removes only genuine gauge choices.

The active-root row set is the same as in the positive return packet:

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

For each row $r\in\mathscr K_B$, the rigid control imposes:

$$
t_{0,r}^{(b)}(1)=t_{0,r}^{(b)}(0),
\qquad
\Psi_r(s)\equiv0\pmod{2\pi},
\qquad
g_{\mathrm{root},r}(s)>0.
$$

The control also imposes zero row increments:

$$
\Delta k_r^{2\pi}=0,\qquad
\Delta e_r^{2\pi}=0,\qquad
\Delta w_r^{2\pi}=0,\qquad
\Delta\chi_r^{2\pi}=0
\qquad
\text{for every }r\in\mathscr K_B.
$$

The angular-momentum path residual remains a conservation check, not a source of spinor parity:

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
}
\le\varepsilon_{\mathbf J}.
$$

## Control Return Table

| Row family | Control condition after $\gamma_{2\pi}^{\mathrm{rig}}$ | Sheet contribution | Verdict |
| --- | --- | --- | --- |
| $H$ self-hit | root identity, phase branch, emission order, $Wr_c^H$, and high self-history return identically | $\epsilon_r^{2\pi}=0$ | no spinor support |
| $H$ same-layer partner | partner root, in-layer phase closure, source / receiver order, and $Wr_c^H$ return identically | $\epsilon_r^{2\pi}=0$ | no spinor support |
| $M$ same-layer partner | hinge root-ledger cell, phase branch, and $Wr_c^M$ return identically | $\epsilon_r^{2\pi}=0$ | no spinor support |
| $L$ same-layer partner | outer partner root, phase branch, $Wr_c^L$, and planar-sign candidate return identically | $\epsilon_r^{2\pi}=0$ | no spinor support |
| $HM$ exchange | high-middle exchange roots and $Wr_c^{HM}$ return identically in both active directions | $\epsilon_r^{2\pi}=0$ | no spinor support |
| $HL$ exchange | high-low exchange roots and $Wr_c^{HL}$ return identically in both active directions | $\epsilon_r^{2\pi}=0$ | no spinor support |
| $ML$ exchange | middle-low exchange roots and $Wr_c^{ML}$ return identically in both active directions | $\epsilon_r^{2\pi}=0$ | no spinor support |
| Ordered chirality row | $\chi_c$, $\chi_{HML}^{(c)}$, retained planar signs, axial sign, and $\Sigma_{\mathrm{WCT}}$ return identically | $\Delta\chi_c^{2\pi}=0$ | no spinor support |
| Total angular-momentum ledger | $\Delta_{\mathbf J}^{2\pi}\le\varepsilon_{\mathbf J}$ and no hidden drive / wake imbalance | not a $\mathbb Z_2$ sheet row | control remains admissible |

Each active row therefore has

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
\right]_2
=0.
$$

The branch-level provisional wake-history parity is consequently

$$
\epsilon_{\mathrm{wake}}^{2\pi}(B)
=
\left[
\sum_{r\in\mathscr K_B}
\epsilon_r^{2\pi}
\right]_2
=0.
$$

The doubled path cannot create a sheet change that was absent from each rigid half-loop. With the same identity-return assumptions,

$$
\epsilon_{\mathrm{wake}}^{4\pi}(B)
=0,
\qquad
\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J}.
$$

Thus the control computes the table holonomy

$$
\eta_B^{\mathrm{table}}(\gamma_{2\pi}^{\mathrm{rig}})
=
\epsilon_{\mathrm{wake}}^{2\pi}(B)
=0,
\qquad
\eta_B^{\mathrm{table}}(\gamma_{4\pi}^{\mathrm{rig}})
=
\epsilon_{\mathrm{wake}}^{4\pi}(B)
=0.
$$

The verdict is ordinary $SO(3)$ closure for this branch and path:

$$
\boxed{
\mathcal T_{\gamma_{2\pi}^{\mathrm{rig}}}\tilde q_B=\tilde q_B,
\qquad
\eta_B^{\mathrm{table}}(\gamma_{2\pi}^{\mathrm{rig}})=0.
}
$$

This is a successful falsifier: if a proposed spinor proof assigns spinor-like $2\pi$ lift to this table while every retained non-gauge history row is zero, the proof is importing the $SU(2)\to SO(3)$ analogy instead of deriving the lift from delayed causal-root transport.

## Required Nonzero Row For Spinor Support

The control identifies the exact object that must become nonzero before the ordered-frame route can support a spinor-like $2\pi$ history lift. It is not the visible $SO(3)$ loop and not the total angular-momentum residual. The required row is a retained, non-gauge active-root sheet row

$$
r_\star\in\mathscr K_B
\qquad
\text{with}
\qquad
\epsilon_{r_\star}^{2\pi}=1.
$$

Equivalently, the first non-null support condition is

$$
\exists r_\star\in\mathscr K_B
\quad\text{such that}\quad
\left[
\Delta k_{r_\star}^{2\pi}
+
\Delta e_{r_\star}^{2\pi}
+
\Delta w_{r_\star}^{2\pi}
+
\Delta\chi_{r_\star}^{2\pi}
\right]_2
=1
$$

after quotienting only genuine gauge rows, while the branch remains stable and conserved:

$$
\Delta_{\mathbf J}^{2\pi},\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J},
\qquad
g_{\mathrm{root},r_\star}>0,
\qquad
\Psi_{r_\star}(s)\equiv0\pmod{2\pi}.
$$

In the minimal supporting repair of this control, all rows except $r_\star$ return identically and the single retained odd row gives

$$
\epsilon_{\mathrm{wake}}^{2\pi}(B)
=
\left[
\epsilon_{r_\star}^{2\pi}
\right]_2
=1.
$$

More complicated supporting branches may have several changed physical rows, but their retained sum must still be odd:

$$
\left[
\sum_{r\in\mathscr K_B}
\epsilon_r^{2\pi}
\right]_2
=1.
$$

The admissible sources of the nonzero row are deliberately narrow:

| Possible source inside $r_\star$ | Supports spinor-like lift? | Condition |
| --- | --- | --- |
| $\Delta k_{r_\star}^{2\pi}=1$ | only if retained as physical | The phase-branch change is not removable as smooth rephasing and is tied to the same continued active root. |
| $\Delta e_{r_\star}^{2\pi}=1$ | yes, if branch-preserving | The source / receiver emission-order datum changes sheet without root loss, fold crossing, or relabeling. |
| $\Delta w_{r_\star}^{2\pi}=1$ | yes, if component-resolved | The relevant $Wr_c^a$ or $Wr_c^{ab}$ parity changes under transport and survives the declared component-writhe parity extractor. |
| $\Delta\chi_{r_\star}^{2\pi}=1$ | yes, if row-sourced | The ordered chirality change is sourced by the active-root transport and is not an unsourced aggregate relabeling. |
| $\Delta_{\mathbf J}^{2\pi}$ nonzero above tolerance | no | This is a conservation failure, not a spinor sheet. |
| visible normal-triad return alone | no | The base $SO(3)$ loop is already present in the control and gives $\eta_B=0$ without a retained history row. |

The $4\pi$ restoration requirement then demands that the same physical source close on the doubled path:

$$
\epsilon_{r_\star}^{4\pi}=0,
\qquad
\mathcal T_{\gamma_{4\pi}}\mathfrak H_B=\mathfrak H_B
\quad
\text{after allowed gauge quotient}.
$$

If $r_\star$ fails to restore after the doubled path, the table may show a branch reconfiguration or broken return map, but it does not support a fermion spinor closure target.

## Minimal Four-Substep Certificate Is Not A Holonomy Proof

The solved minimal four-substep transaction certificate remains valuable, but it is not itself a spinor holonomy proof. It supplies a reduced transaction partition:

$$
\Delta I_{\mathrm{outer}}=\frac{\hbar}{4},
\qquad
\Delta I_{\mathrm{middle}}=\frac{\hbar}{4},
\qquad
\Delta I_{\mathrm{inner}}=\frac{\hbar}{2},
\qquad
\Delta I_{\mathrm{wake}}=0.
$$

Those rows test scalar action, vector angular-momentum balance, outer speed, middle hinge behavior, inner self-hit admissibility, raw self-root parity, phase lock, energy closure, and branch stability for a transaction. They do not by themselves provide:

1. a stable non-coplanar ordered branch along a rotation path;
2. a declared $\gamma_{2\pi}$ whose visible projection is the generator of $\pi_1(SO(3))$;
3. continuation of every active causal-root row through that path;
4. transported component-resolved causal-writhe entries $Wr_c^a$ and $Wr_c^{ab}$;
5. transported ordered chirality entries $\chi_c$ and $\chi_{HML}^{(c)}$;
6. a quotient decision showing that any odd row is physical rather than gauge;
7. doubled-path restoration after $\gamma_{4\pi}$.

Therefore the minimal certificate can at most supply candidate branch data for the holonomy table. It becomes relevant to spinor closure only after it is embedded into a stable non-coplanar branch with

$$
\det[\hat{\mathbf n}_H,\hat{\mathbf n}_M,\hat{\mathbf n}_L]\ne0
$$

throughout a supplied rotation path, and after the return table computes

$$
\eta_B^{\mathrm{table}}(\gamma_{2\pi})
=
\left[
\sum_{r\in\mathscr K_B}
\epsilon_r^{2\pi}
\right]_2.
$$

In the control table above, that computation is zero even though the visible loop is the nontrivial $SO(3)$ loop. This is the useful discipline: transaction closure, angular-momentum conservation, and ordinary ordered-frame return are necessary background checks, but spinor-like closure requires a retained non-gauge history-sheet row.

## Control Verdict

For the controlled null path,

$$
\boxed{
\eta_B^{\mathrm{table}}(\gamma_{2\pi}^{\mathrm{rig}})=0,
\qquad
\eta_B^{\mathrm{table}}(\gamma_{4\pi}^{\mathrm{rig}})=0,
\qquad
\Delta_{\mathbf J}^{2\pi},\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J}.
}
$$

The ordered Noether-core frame therefore closes as an ordinary $SO(3)$ object for this branch and path. A future spinor-support table must exhibit at least one retained, non-gauge active-root sheet row $r_\star$ with $\epsilon_{r_\star}^{2\pi}=1$ and $\epsilon_{r_\star}^{4\pi}=0$, while preserving branch stability, phase closure, non-coplanarity, and the angular-momentum residuals.
