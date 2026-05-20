# Causal-Writhe Gauge-Control Diagnostic

Status. Priority proof packet for `spinor_closure` and the component-resolved causal-writhe route, downstream of [causal-writhe-parity-extractor-packet.md](causal-writhe-parity-extractor-packet.md) and [noncoplanar-spinor-transport-certificate.md](noncoplanar-spinor-transport-certificate.md). This file defines a gauge-control diagnostic for the row-local extractor. It is priority material only and does not edit or canonize reader-facing $\mathbb{A}\mathbb{A}\mathbb{A}$ prose.

Claim level. Defer with blocker. The diagnostic separates three cases: a null rigid row, a gauge-flip failure row, and an admissible physical parity-change row. Its purpose is to prevent coordinate relabeling from being mistaken for spinor support.

Promotion decision. Defer with blocker. Promote only after a retained non-coplanar active-root row populates this diagnostic with sheet coordinates, gauge-control probes, quotient witness, angular-momentum residuals, and doubled-path restoration. Until then, the causal-writhe extractor remains a priority-side proof obligation, not a promoted spinor-support claim.

## Diagnostic Domain

Use the row-lift from the causal-writhe parity extractor:

$$
\widetilde r(s)
=
\left(
t_{0,r}(s),
k_r(s),
\mathcal E_r(s),
\Xi_r(s),
\mathcal C_r(s)
\right),
\qquad
s\in[0,2],
$$

on a stable non-coplanar ordered branch $B$ with visible paths

$$
\gamma_{2\pi}:[0,1]\to\mathcal Q_B^{\mathrm{ord}},
\qquad
\gamma_{4\pi}=\gamma_{2\pi}\ast\gamma_{2\pi}.
$$

Let the row-local extractor be

$$
\Pi_{W,r}^{2\pi}
=
W_r(1)-W_r(0)\pmod 2,
\qquad
\Pi_{W,r}^{4\pi}
=
W_r(2)-W_r(0)\pmod 2.
$$

The allowed gauge group is the same quotient used by the non-coplanar certificate:

$$
G_{\mathrm{gauge}}
=
\left\langle
\text{center-of-mass translation},
\text{time-origin choice},
\text{smooth phase reparameterization},
\text{branch-preserving coordinate change}
\right\rangle .
$$

A gauge probe $g\in G_{\mathrm{gauge}}$ acts on the row-lift by

$$
g\cdot\widetilde r(s)
=
\left(
t'_{0,r}(s),
k'_r(s),
\mathcal E'_r(s),
\Xi'_r(s),
\mathcal C'_r(s)
\right),
$$

without changing the retained row identity. A proposed odd parity is physical only if the extractor is invariant under these probes and the quotient witness does not erase the endpoint difference.

## Gauge-Control Residuals

The diagnostic residual for a candidate row $r$ is

$$
\Delta_{\mathrm{gc}}(r)
=
\Delta_{\mathrm{rig}}(r)
+
\Delta_{\mathrm{flip}}(r)
+
\Delta_{\mathrm{phys}}(r)
+
\Delta_{\mathrm{quot}}(r)
+
\Delta_{\mathrm{dbl}}(r)
+
\Delta_{\mathbf J}(r).
$$

The row can support a spinor-like ordered-history lift only if

$$
\Delta_{\mathrm{gc}}(r)\le\varepsilon_{\mathrm{gc}},
\qquad
\Delta_{\mathbf J}^{2\pi},\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J}.
$$

The component residuals are:

| Residual | Required content |
| --- | --- |
| $\Delta_{\mathrm{rig}}$ | The rigid control row returns all retained row data and gives zero parity. |
| $\Delta_{\mathrm{flip}}$ | Gauge probes cannot flip $\Pi_{W,r}$ while preserving row identity and physical branch data. |
| $\Delta_{\mathrm{phys}}$ | A claimed odd row is tied to component-resolved causal-writhe transport, not to coordinate relabeling. |
| $\Delta_{\mathrm{quot}}$ | The quotient witness decides whether the endpoint difference survives $G_{\mathrm{gauge}}$. |
| $\Delta_{\mathrm{dbl}}$ | The doubled path restores the row parity and branch domain. |
| $\Delta_{\mathbf J}$ | Angular-momentum residuals remain within tolerance on both paths. |

## Row A: Null Rigid Row

The null control uses a branch-preserving rigid path $\gamma_{2\pi}^{\mathrm{rig}}$ with the same visible nontrivial $SO(3)$ loop but identity return on retained row data:

$$
\widetilde r_{\mathrm{rig}}(1)=\widetilde r_{\mathrm{rig}}(0),
\qquad
\widetilde r_{\mathrm{rig}}(2)=\widetilde r_{\mathrm{rig}}(0),
$$

after allowed quotient. The required residual equations are

$$
\Delta_{\mathrm{rig}}(r)
=
\left|\Pi_{W,r,\mathrm{rig}}^{2\pi}\right|
+
\left|\Pi_{W,r,\mathrm{rig}}^{4\pi}\right|
+
\sup_{s\in[0,2]}
\left\|
\Xi_r^{\mathrm{rig}}(s)-\Xi_r^{\mathrm{rig}}(0)
\right\|,
$$

with the ideal value

$$
\Delta_{\mathrm{rig}}(r)=0,
\qquad
\Pi_{W,r,\mathrm{rig}}^{2\pi}=0,
\qquad
\Pi_{W,r,\mathrm{rig}}^{4\pi}=0.
$$

Pass. The rigid row is a successful null control when every retained row returns identically, the component-resolved causal-writhe parity is zero, and $\Delta_{\mathbf J}^{2\pi},\Delta_{\mathbf J}^{4\pi}\le\varepsilon_{\mathbf J}$.

Fail. If the rigid row reports $\Pi_{W,r,\mathrm{rig}}^{2\pi}=1$, the extractor is importing parity from the visible $SO(3)$ loop or from a coordinate convention. That is not spinor support.

No-go. If the row lacks $\Xi_r(s)$, $W_r(s)$, root continuation, or doubled-path return data, the null control is unpopulated.

## Row B: Gauge-Flip Failure Row

The gauge-flip test applies allowed probes $g\in G_{\mathrm{gauge}}$ to the same transported row. Define

$$
\delta_g\Pi_{W,r}^{2\pi}
=
\Pi_{W,g\cdot r}^{2\pi}
-
\Pi_{W,r}^{2\pi}
\pmod 2,
\qquad
\delta_g\Pi_{W,r}^{4\pi}
=
\Pi_{W,g\cdot r}^{4\pi}
-
\Pi_{W,r}^{4\pi}
\pmod 2.
$$

The gauge-flip residual is

$$
\Delta_{\mathrm{flip}}(r)
=
\sup_{g\in G_{\mathrm{gauge}}}
\left(
\left|\delta_g\Pi_{W,r}^{2\pi}\right|
+
\left|\delta_g\Pi_{W,r}^{4\pi}\right|
\right).
$$

The admissible value is

$$
\Delta_{\mathrm{flip}}(r)=0.
$$

Fail. If there exists an allowed gauge probe with

$$
\delta_g\Pi_{W,r}^{2\pi}=1
\quad\text{or}\quad
\delta_g\Pi_{W,r}^{4\pi}=1,
$$

while root identity, branch domain, and physical component data are preserved, then the row is a gauge-flip failure. The apparent odd causal-writhe parity is a coordinate relabeling artifact.

No-go. If the allowed quotient is not declared, or if the diagnostic cannot distinguish a branch-preserving coordinate change from a physical branch-history change, the row is blocked rather than passed.

## Row C: Admissible Physical Parity-Change Row

An admissible physical row is a retained active-root row $r_\star\in\mathscr K_B$ satisfying

$$
\Pi_{W,r_\star}^{2\pi}=1,
\qquad
\Pi_{W,r_\star}^{4\pi}=0,
$$

with gauge invariance

$$
\delta_g\Pi_{W,r_\star}^{2\pi}=0,
\qquad
\delta_g\Pi_{W,r_\star}^{4\pi}=0
\qquad
\text{for all }g\in G_{\mathrm{gauge}}.
$$

The physical-row residual is

$$
\Delta_{\mathrm{phys}}(r_\star)
=
\left|\Pi_{W,r_\star}^{2\pi}-1\right|
+
\left|\Pi_{W,r_\star}^{4\pi}\right|
+
\Delta_{\mathrm{sheet}}(r_\star)
+
\Delta_{\mathrm{return}}(r_\star)
+
\Delta_{\mathrm{gauge}}(r_\star).
$$

The quotient witness must retain the endpoint difference:

$$
q_{r_\star}^{2\pi}=1,
\qquad
q_{r_\star}^{4\pi}=0,
$$

so the row contribution is

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
\right]_2
=1,
$$

and the doubled path restores

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
\right]_2
=0.
$$

Pass. The row passes only when the odd $2\pi$ causal-writhe parity is component-resolved, row-local, invariant under all allowed gauge probes, retained by the quotient witness, conserved by the angular-momentum ledger, and restored by the doubled path.

Fail. The row fails if the odd entry is erased by allowed gauge, if $\Pi_{W,r_\star}^{4\pi}=1$, if the component assignment changes by relabeling, or if $\Delta_{\mathbf J}^{2\pi}$ or $\Delta_{\mathbf J}^{4\pi}$ exceeds tolerance.

No-go. A raw self-hit count, aggregate chirality change, fixed-normal visible loop, or coordinate-name swap cannot populate this row.

## Diagnostic Verdict Table

| Row | Required parity | Gauge-control outcome | Verdict |
| --- | --- | --- | --- |
| Null rigid row | $\Pi_{W,r}^{2\pi}=0$, $\Pi_{W,r}^{4\pi}=0$ | Confirms the extractor does not read the visible $SO(3)$ loop as support. | Required control pass. |
| Gauge-flip failure row | Any parity that changes under $g\in G_{\mathrm{gauge}}$ | Detects coordinate relabeling or smooth reparameterization artifact. | Fail; no spinor support. |
| Admissible physical parity-change row | $\Pi_{W,r_\star}^{2\pi}=1$, $\Pi_{W,r_\star}^{4\pi}=0$ | Odd row survives quotient and is invariant under allowed gauge probes. | Candidate support row, pending full populated certificate. |

## Current Bucket Verdict

The current angular-momentum/spin bucket has no populated gauge-control diagnostic for a retained non-coplanar row. In particular, it lacks a row-local table of gauge probes $g\cdot\widetilde r$, a populated $\Delta_{\mathrm{flip}}$ calculation, and a quotient witness separating coordinate relabeling from physical causal-writhe parity.

Therefore the present status is

$$
\Delta_{\mathrm{gc}}(r_\star)
\quad
\text{blocked},
\qquad
\Pi_{W,r_\star}^{2\pi},\Pi_{W,r_\star}^{4\pi}
\quad
\text{uncomputed}.
$$

The next admissible proof pass should populate the null rigid row first, then the gauge-flip failure probes, and only then test an admissible physical parity-change row. Until those rows are populated, coordinate relabeling must be treated as a blocker, not as spinor support.
