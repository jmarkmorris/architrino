# Noncoplanar Spinor Transport Certificate

Status. Priority proof packet for the `spinor_closure` row in [priorities.md](priorities.md), following [spinor-holonomy-return-table-packet.md](spinor-holonomy-return-table-packet.md), [spinor-holonomy-control-table.md](spinor-holonomy-control-table.md), and [nontrivial-spinor-support-row-attempt.md](nontrivial-spinor-support-row-attempt.md). This file is priority material only. It does not edit or canonize reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

Claim level. Certificate template / defer-with-blocker. The packet defines the exact rows needed to evaluate a candidate retained active-root row $r_\star$ on a non-coplanar ordered branch. It does not claim a passing spinor support row. The current status remains blocked until a populated branch chart supplies the row transport, parity extraction, quotient witness, angular-momentum ledger, and doubled-path return data.

Promotion decision. Defer with blocker. The theorem-target content should not be promoted into reader-facing prose as spinor closure until at least one populated non-coplanar row satisfies

$$
\epsilon_{r_\star}^{2\pi}=1,
\qquad
\epsilon_{r_\star}^{4\pi}=0,
\qquad
\Delta_{\mathbf J}^{2\pi},\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J},
$$

after allowed quotient, with all branch-domain and root-continuation rows populated. Until then, this packet is a priority-side worksheet for the next branch-chart or simulation run.

## Certificate Object

Use the ordered separated-scale aliases

$$
H\equiv I,\qquad M\equiv M,\qquad L\equiv O,
$$

and the active-root row set

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

A candidate support row is a retained active root

$$
r_\star
=
(a_\star,\alpha_\star;m_\star,\beta_\star;b_\star)
\in\mathscr K_B,
\qquad
a_\star,m_\star\in\{H,M,L\},
\qquad
\alpha_\star,\beta_\star\in\{+1,-1\}.
$$

The certificate evaluates a tuple

$$
\mathfrak S_{\mathrm{nc}}
\left(
B,r_\star,\gamma_{2\pi},\gamma_{4\pi};
\varepsilon_{\mathrm{nc}},
\varepsilon_{\mathrm{root}},
\varepsilon_\Psi,
\varepsilon_{\mathbf J}
\right),
$$

where $B$ is a stable ordered branch chart, $\gamma_{2\pi}$ is the visible nontrivial $SO(3)$ loop, and $\gamma_{4\pi}=\gamma_{2\pi}\ast\gamma_{2\pi}$ is the doubled path.

The candidate row supports a spinor-like ordered-history lift only if the populated certificate gives

$$
\eta_B^{\mathrm{table}}(\gamma_{2\pi})=1,
\qquad
\eta_B^{\mathrm{table}}(\gamma_{4\pi})=0,
$$

with $r_\star$ contributing a retained non-gauge odd row. The visible $SO(3)$ loop alone is not support. An angular-momentum residual above tolerance is not support; it is a conservation failure.

## Path And Non-Coplanarity Rows

### Row 1: Non-Coplanarity Margin

For the transported ordered normals define

$$
D_{HML}(s)
=
\det[
\hat{\mathbf n}_H(s),
\hat{\mathbf n}_M(s),
\hat{\mathbf n}_L(s)
].
$$

The branch is in the non-coplanar test domain only if the margins

$$
\mu_{\mathrm{nc}}^{2\pi}
=
\inf_{s\in[0,1]}|D_{HML}(s)|,
\qquad
\mu_{\mathrm{nc}}^{4\pi}
=
\inf_{s\in[0,2]}|D_{HML}(s)|
$$

satisfy

$$
\mu_{\mathrm{nc}}^{2\pi}\ge\varepsilon_{\mathrm{nc}}>0,
\qquad
\mu_{\mathrm{nc}}^{4\pi}\ge\varepsilon_{\mathrm{nc}}>0.
$$

Pass. The ordered branch remains non-coplanar through both paths.

Fail. The row fails if $D_{HML}(s)=0$ or falls below the declared margin. This routes the attempt to planar $SO(2)$ / $U(1)$ degeneration, not spinor support.

No-go. A fixed-normal reduced chart with

$$
\hat{\mathbf n}_H=\hat{\mathbf n}_M=\hat{\mathbf n}_L
$$

has $D_{HML}=0$ and cannot populate this certificate.

### Row 2: Visible Path Record

The $2\pi$ path must be supplied as an ordered-branch path

$$
\gamma_{2\pi}:[0,1]\to\mathcal Q_B^{\mathrm{ord}}
$$

whose visible ordered-frame projection closes but represents the nontrivial loop:

$$
\rho_B(\gamma_{2\pi})(0)
=
\rho_B(\gamma_{2\pi})(1)
=
\mathbf 1,
\qquad
[\rho_B(\gamma_{2\pi})]
=
1\in\pi_1(SO(3))\cong\mathbb Z_2.
$$

The doubled path is

$$
\gamma_{4\pi}=\gamma_{2\pi}\ast\gamma_{2\pi},
\qquad
\gamma_{4\pi}:[0,2]\to\mathcal Q_B^{\mathrm{ord}}.
$$

Pass. The visible normal triad closes after $2\pi$ and is tracked through the doubled path.

Fail. If the visible path is not the generator of $\pi_1(SO(3))$, the table is not testing the ordered-frame spinor route.

No-go. If the only populated datum is the visible loop, the certificate is unpopulated. The rigid control already shows that a visible nontrivial loop gives ordinary closure when every retained history row returns identically.

## Active-Root Transport Rows

### Row 3: Root Continuation

The same candidate row must be continued through both paths:

$$
t_{0,r_\star}^{(b_\star)}(s)
\in
\mathcal C_{a_\star\alpha_\star,m_\star\beta_\star}(t;s),
\qquad
s\in[0,2].
$$

The root margin must be declared as a positive separation from root loss, fold crossing, separator crossing, inactive-root collision, and undeclared relabeling:

$$
g_{\mathrm{root},r_\star}(s)>0,
\qquad
\mu_{\mathrm{root},r_\star}
=
\inf_{s\in[0,2]}g_{\mathrm{root},r_\star}(s)
\ge
\varepsilon_{\mathrm{root}}>0.
$$

Pass. The same simple active root is followed through $\gamma_{2\pi}$ and $\gamma_{4\pi}$, with row identity fixed.

Fail. Root loss, fold crossing, separator crossing, causal-locus reconnection, inactive-root collision, or undeclared relabeling leaves the branch-preserving holonomy test.

No-go. A raw self-hit count such as $\Delta N_{\text{self}}=+2$ does not populate this row unless it is refined into individual continued roots $t_{0,r}^{(b)}(s)$.

### Row 4: Phase Branch

The phase residual for $r_\star$ is

$$
\Psi_{r_\star}(s)
=
\vartheta_{a_\star,\alpha_\star}(t;s)
-
\vartheta_{m_\star,\beta_\star}(t_{0,r_\star}^{(b_\star)};s)
+
\phi_{a_\star m_\star}^{(b_\star)}(s)
-
2\pi k_{r_\star}(s).
$$

The populated row must include an integer phase branch

$$
k_{r_\star}(s)\in\mathbb Z
$$

and residual bound

$$
\sup_{s\in[0,2]}
\left|\Psi_{r_\star}(s)\right|
\le
\varepsilon_\Psi,
$$

with the exact branch condition $\Psi_{r_\star}(s)\equiv0\pmod{2\pi}$ in the ideal certificate. The row entries are

$$
\Delta k_{r_\star}^{2\pi}
=
k_{r_\star}(1)-k_{r_\star}(0),
\qquad
\Delta k_{r_\star}^{4\pi}
=
k_{r_\star}(2)-k_{r_\star}(0).
$$

Pass. The same root remains phase-locked and the integer branch changes are populated.

Fail. If $\Psi_{r_\star}$ does not close inside tolerance, the row is a phase-lock failure.

No-go. An odd $\Delta k_{r_\star}^{2\pi}$ is not support unless the quotient witness shows it is physical and tied to the same continued root rather than smooth rephasing.

### Row 5: Emission-Order Transport

The row must include declared source / receiver emission-order data

$$
\mathcal E_{r_\star}(s)
=
\left(
\sigma_{\mathrm{src},r_\star}(s),
\sigma_{\mathrm{rec},r_\star}(s),
\preceq_{r_\star}(s)
\right),
\qquad
s\in[0,2],
$$

inside the same branch chart. Let $p_{e,r_\star}^{2\pi}$ be the endpoint permutation or order reversal needed to compare $\mathcal E_{r_\star}(1)$ with $\mathcal E_{r_\star}(0)$ while preserving the root identity. Define

$$
\Delta e_{r_\star}^{2\pi}
=
\operatorname{sgn}_2(p_{e,r_\star}^{2\pi}),
\qquad
\Delta e_{r_\star}^{4\pi}
=
\operatorname{sgn}_2(p_{e,r_\star}^{4\pi}),
$$

where $\operatorname{sgn}_2=1$ for odd source / receiver reversal and $\operatorname{sgn}_2=0$ for identity return.

Pass. The order datum is defined for the same continued row and gives a parity entry.

Fail. An order reversal caused by root loss, fold crossing, separator crossing, or relabeling is not a branch-preserving sheet row.

No-go. A self-hit row without an explicit source / receiver convention does not populate $\Delta e_{r_\star}$.

## Parity And Provenance Rows

### Row 6: Component-Resolved Causal-Writhe Parity Extractor

The component assigned to $r_\star$ is

$$
W_{r_\star}(s)
=
\begin{cases}
Wr_c^{a_\star}(s), & a_\star=m_\star,\\
Wr_c^{a_\star m_\star}(s), & a_\star\ne m_\star.
\end{cases}
$$

The certificate must declare the row-local parity extractor before evaluation:

$$
\Pi_{W,r_\star}:
\{W_{r_\star}(s)\}_{s\in[0,2]}
\longrightarrow
\mathbb Z_2.
$$

The entries are

$$
\Delta w_{r_\star}^{2\pi}
=
\Pi_{W,r_\star}
\left(
W_{r_\star}\big|_{[0,1]}
\right),
\qquad
\Delta w_{r_\star}^{4\pi}
=
\Pi_{W,r_\star}
\left(
W_{r_\star}\big|_{[0,2]}
\right).
$$

Pass. The extractor is fixed before the run, applies to the component attached to $r_\star$, and reports a row-local parity.

Fail. A parity obtained only by changing the extractor after seeing the path, by aggregating unrelated components, or by relabeling the ordered branch is not support.

No-go. The current fixed-normal reduced data do not include $Wr_c^a(s)$ or $Wr_c^{ab}(s)$ transport and therefore cannot populate this row.

### Row 7: Row-To-Chirality Provenance

The chirality row may use

$$
\chi_c(s),
\qquad
\chi_{HML}^{(c)}(s),
\qquad
\{s_a^{\mathrm{plane}}(s)\}_{a\in\{H,M,L\}},
\qquad
s_{\mathrm{axial}}(s),
\qquad
\Sigma_{\mathrm{WCT}}(s),
$$

but an odd chirality entry supports $r_\star$ only when it is row-sourced. The certificate must provide a provenance map

$$
\operatorname{Prov}_{\chi}:
\left(
\chi_c(0),
\chi_c(1),
\chi_c(2),
\mathscr K_B
\right)
\longrightarrow
\mathbb Z_2^{\mathscr K_B}
$$

such that

$$
\Delta\chi_c^{2\pi}
=
\left[
\sum_{r\in\mathscr K_B}
\Delta\chi_r^{2\pi}
\right]_2,
\qquad
\Delta\chi_{r_\star}^{2\pi}
=
\operatorname{Prov}_{\chi}^{2\pi}(r_\star).
$$

The doubled entry is analogous:

$$
\Delta\chi_c^{4\pi}
=
\left[
\sum_{r\in\mathscr K_B}
\Delta\chi_r^{4\pi}
\right]_2.
$$

Pass. Any chirality parity assigned to $r_\star$ has explicit row provenance and is not an aggregate relabeling.

Fail. A changed `HML/HLM` label, planar sign, axial sign, or weak-coupling-triad exposure with no row provenance is a chirality-data failure, not an active-root support row.

No-go. An unsourced aggregate $\chi_c$ change cannot replace $r_\star$.

## Quotient And Conservation Rows

### Row 8: Quotient Witness

Let $G_{\mathrm{gauge}}$ be the allowed quotient generated only by center-of-mass translation, time-origin choice, smooth phase reparameterization inside the same root-ledger cell, and small branch-preserving deformation. The certificate must decide whether the endpoint difference of $r_\star$ survives this quotient.

Define the endpoint row states

$$
\mathfrak h_{r_\star}(s)
=
\left(
t_{0,r_\star}^{(b_\star)}(s),
k_{r_\star}(s),
\mathcal E_{r_\star}(s),
W_{r_\star}(s),
\Delta\chi_{r_\star}(s)
\right).
$$

The quotient witness is

$$
q_{r_\star}^{2\pi}
=
\begin{cases}
1, &
\text{if no }g\in G_{\mathrm{gauge}}\text{ maps }\mathfrak h_{r_\star}(1)
\text{ to }\mathfrak h_{r_\star}(0)\text{ while preserving all row identities},\\
0, &
\text{if the endpoint difference is removed by an allowed gauge move.}
\end{cases}
$$

The row contribution retained after quotient is

$$
\epsilon_{r_\star}^{2\pi}
=
q_{r_\star}^{2\pi}
\left[
\Delta k_{r_\star}^{2\pi}
+
\Delta e_{r_\star}^{2\pi}
+
\Delta w_{r_\star}^{2\pi}
+
\Delta\chi_{r_\star}^{2\pi}
\right]_2.
$$

The doubled row uses the same rule with endpoint $s=2$:

$$
\epsilon_{r_\star}^{4\pi}
=
q_{r_\star}^{4\pi}
\left[
\Delta k_{r_\star}^{4\pi}
+
\Delta e_{r_\star}^{4\pi}
+
\Delta w_{r_\star}^{4\pi}
+
\Delta\chi_{r_\star}^{4\pi}
\right]_2.
$$

Pass. A nonzero row survives quotient because it is physical branch-history data.

Fail. If the only odd entry is erased by allowed gauge, the candidate row does not support a spinor-like lift.

No-go. The quotient row is unpopulated unless the certificate shows why time-origin shifts, center-of-mass shifts, smooth rephasing, and small branch-preserving deformations do not erase the proposed odd entry.

### Row 9: Angular-Momentum Residual

The path ledger is

$$
\mathcal J_{\mathrm{tot}}^{\mathrm{path}}(s)
=
\mathcal J_B(\mathfrak H_B(s))
+
\mathcal J_{\mathrm{drive}}(s)
+
\mathcal J_{\mathrm{wake},\partial}(s).
$$

The $2\pi$ and $4\pi$ residuals are

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

and

$$
\Delta_{\mathbf J}^{4\pi}
=
\sup_{s\in[0,2]}
\frac{
\left\|
\mathcal J_{\mathrm{tot}}^{\mathrm{path}}(s)
-
\mathcal J_{\mathrm{tot}}^{\mathrm{path}}(0)
\right\|
}
{
1+\left\|\mathcal J_{\mathrm{tot}}^{\mathrm{path}}(0)\right\|
}.
$$

Pass. The ledger satisfies

$$
\Delta_{\mathbf J}^{2\pi}\le\varepsilon_{\mathbf J},
\qquad
\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J}.
$$

Fail. If either residual exceeds tolerance, the attempt fails as an angular-momentum ledger failure or missing drive / wake term.

No-go. A nonzero angular-momentum residual cannot be counted as $\epsilon_{r_\star}^{2\pi}=1$. Conservation is a background gate, not spinor support.

## Doubled-Path Restoration Row

### Row 10: $4\pi$ Return Map

The doubled path must restore the lifted branch history after allowed quotient:

$$
\left[
\mathcal T_{\gamma_{4\pi}}\mathfrak H_B
\right]_{G_{\mathrm{gauge}}}
=
\left[
\mathfrak H_B
\right]_{G_{\mathrm{gauge}}}.
$$

For the candidate row,

$$
\epsilon_{r_\star}^{4\pi}=0,
$$

and the total retained table must satisfy

$$
\epsilon_{\mathrm{wake}}^{4\pi}(B)
=
\left[
\sum_{r\in\mathscr K_B}
\epsilon_r^{4\pi}
\right]_2
=0.
$$

Pass. The same lifted branch restores after $\gamma_{4\pi}$ with no root loss, no unbalanced angular momentum, no non-coplanarity loss, and no retained odd sheet parity.

Fail. If $\epsilon_{r_\star}^{4\pi}=1$ or any retained row fails to restore, the proposed two-sheet lift does not close as a fermion spinor target.

No-go. $4\pi$ restoration cannot be inferred from the visible $SO(3)$ loop. It must be evaluated on root continuation, phase branch, emission order, component-resolved causal writhe, chirality provenance, quotient, and angular momentum.

## Support Criterion

A populated certificate supports the branch-local spinor route only if all gate rows pass and the retained parity is odd after $2\pi$ and even after $4\pi$:

$$
\epsilon_{r_\star}^{2\pi}=1,
\qquad
\epsilon_{r_\star}^{4\pi}=0,
$$

with the other retained rows returning identically or contributing an even physical sum:

$$
\left[
\sum_{r\in\mathscr K_B\setminus\{r_\star\}}
\epsilon_r^{2\pi}
\right]_2
=0,
\qquad
\left[
\sum_{r\in\mathscr K_B}
\epsilon_r^{4\pi}
\right]_2
=0.
$$

Then the table computes

$$
\eta_B^{\mathrm{table}}(\gamma_{2\pi})
=
\left[
\sum_{r\in\mathscr K_B}
\epsilon_r^{2\pi}
\right]_2
=1,
\qquad
\eta_B^{\mathrm{table}}(\gamma_{4\pi})=0.
$$

If several physical rows change after $2\pi$, the support condition generalizes to an odd retained sum after quotient. The packet still requires every nonzero row to have populated root continuation, parity provenance, quotient decision, angular-momentum compatibility, and doubled-path restoration.

## Certificate Worksheet

| Certificate row | Required populated data | Passing condition | Failure / no-go routing |
| --- | --- | --- | --- |
| Non-coplanarity margin | $D_{HML}(s)$ for $s\in[0,2]$ | $\mu_{\mathrm{nc}}^{2\pi},\mu_{\mathrm{nc}}^{4\pi}\ge\varepsilon_{\mathrm{nc}}>0$ | Degenerates to planar $SO(2)$ / $U(1)$ if the determinant vanishes; fixed-normal reduced data are no-go. |
| Path $\gamma_{2\pi}/\gamma_{4\pi}$ | Ordered-branch path and visible projection $\rho_B$ | $\rho_B$ closes and $[\rho_B(\gamma_{2\pi})]=1\in\pi_1(SO(3))$ | A visible loop alone is ordinary $SO(3)$ background, not support. |
| Root continuation | $t_{0,r_\star}^{(b_\star)}(s)$ and $g_{\mathrm{root},r_\star}(s)$ | Same simple active root, $\mu_{\mathrm{root},r_\star}\ge\varepsilon_{\mathrm{root}}$ | Root loss, fold crossing, separator crossing, inactive-root collision, or relabeling exits the branch-preserving test. |
| Phase branch | $k_{r_\star}(s)$ and $\Psi_{r_\star}(s)$ | $\Psi_{r_\star}(s)\equiv0\pmod{2\pi}$ and $\Delta k$ is populated | Odd phase branch is support only with a physical quotient witness. |
| Emission-order transport | $\mathcal E_{r_\star}(s)$ | $\Delta e_{r_\star}$ is defined for the same continued row | Missing source / receiver convention is no-go; order reversal from relabeling is fail. |
| Component-resolved causal-writhe extractor | $W_{r_\star}(s)$ and predeclared $\Pi_{W,r_\star}$ | $\Delta w_{r_\star}$ is component-local and row-local | Aggregate or after-the-fact extractor is fail; missing $Wr_c$ transport is no-go. |
| Row-to-chirality provenance | $\operatorname{Prov}_\chi$ for $\chi_c$, $\chi_{HML}^{(c)}$, signs, and $\Sigma_{\mathrm{WCT}}$ | Any $\Delta\chi_{r_\star}$ is explicitly row-sourced | Unsourced aggregate chirality change cannot replace $r_\star$. |
| Quotient witness | $q_{r_\star}^{2\pi}$ and $q_{r_\star}^{4\pi}$ | Odd entry survives only physical quotient | Gauge-erased parity is ordinary coordinate change, not spinor support. |
| Angular-momentum residual | $\mathcal J_{\mathrm{tot}}^{\mathrm{path}}(s)$ | $\Delta_{\mathbf J}^{2\pi},\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J}$ | Residual above tolerance is conservation failure, not a sheet row. |
| Doubled-path restoration | Full $s\in[0,2]$ return map | $\epsilon_{r_\star}^{4\pi}=0$ and $\epsilon_{\mathrm{wake}}^{4\pi}=0$ | Failure to restore after $4\pi$ rejects the fermion spinor target. |

## Outcome Classification

| Outcome | Certificate result | Meaning |
| --- | --- | --- |
| Passing branch-local support row | All rows populated and pass, $\epsilon_{r_\star}^{2\pi}=1$, $\epsilon_{r_\star}^{4\pi}=0$, and the total retained sum is odd after $2\pi$ and zero after $4\pi$. | The ordered-frame route gains a branch-local spinor-like history lift candidate. |
| Ordinary $SO(3)$ closure | Visible path row passes, conservation passes, all retained history rows return identically, and $\epsilon_{\mathrm{wake}}^{2\pi}=0$. | This is the rigid-control outcome, not spinor support. |
| Non-coplanar-domain failure | $D_{HML}$ reaches zero or the margin falls below tolerance. | The branch leaves the non-coplanar spinor-test domain. |
| Active-root failure | $t_{0,r_\star}^{(b_\star)}(s)$ is lost, folded, reconnected, or relabeled. | The path is not a branch-preserving holonomy certificate. |
| Phase-lock failure | $\Psi_{r_\star}$ does not close modulo $2\pi$ inside tolerance. | The candidate row is not a retained active phase row. |
| Quotient failure | The odd entry is removed by allowed gauge. | The apparent sheet change is coordinate, not physical. |
| Chirality provenance failure | Only aggregate $\chi_c$ or sign data change, with no row source. | Chirality data are not an active-root support row. |
| Angular-momentum failure | $\Delta_{\mathbf J}^{2\pi}>\varepsilon_{\mathbf J}$ or $\Delta_{\mathbf J}^{4\pi}>\varepsilon_{\mathbf J}$. | The ledger is missing drive / wake / torque content or the path is inadmissible. |
| Doubled-path failure | $\epsilon_{\mathrm{wake}}^{4\pi}=1$ or any retained row fails to restore after $\gamma_{4\pi}$. | The two-sheet lift does not close as a fermion spinor target. |
| Data no-go | Any required row is absent. | The packet remains defer-with-blocker; no support claim is allowed. |

## Current Blocker

This packet converts the support-row no-go into a concrete row-population target. The next admissible proof or simulation run must supply, for one retained $r_\star$ on a stable non-coplanar ordered branch:

1. $\mu_{\mathrm{nc}}^{2\pi}$ and $\mu_{\mathrm{nc}}^{4\pi}$;
2. explicit $\gamma_{2\pi}$ and $\gamma_{4\pi}$ branch paths;
3. $t_{0,r_\star}^{(b_\star)}(s)$ and root margins on $s\in[0,2]$;
4. $k_{r_\star}(s)$ and $\Psi_{r_\star}(s)$;
5. $\mathcal E_{r_\star}(s)$ and $\Delta e_{r_\star}$;
6. $W_{r_\star}(s)$, $\Pi_{W,r_\star}$, and $\Delta w_{r_\star}$;
7. $\operatorname{Prov}_\chi$ and any $\Delta\chi_{r_\star}$;
8. quotient witnesses $q_{r_\star}^{2\pi}$ and $q_{r_\star}^{4\pi}$;
9. $\mathcal J_{\mathrm{tot}}^{\mathrm{path}}(s)$ and angular-momentum residuals;
10. the doubled-path return map for the full retained row set.

Until those data exist, the honest verdict is:

$$
\boxed{
\text{defer with blocker: no populated non-coplanar spinor support row exists yet.}
}
$$
