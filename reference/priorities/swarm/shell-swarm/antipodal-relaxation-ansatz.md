# Antipodal Relaxation Ansatz

Promotion status: `priority-only`. This packet develops the antipodal-relaxation ansatz for same-level tri-binary intrinsic curve dynamics. It is a theorem-target and search-chart packet only. It does not claim a retained branch, a spinor proof, a mass map, observer export, or migration readiness.

This packet uses the intrinsic curve equation from [intrinsic-curve-dynamics-equation.md](intrinsic-curve-dynamics-equation.md), the retention hypotheses from [minimal-dynamics-closure-theorem.md](minimal-dynamics-closure-theorem.md), the current negative dynamics synthesis in [current-dynamics-synthesis.md](current-dynamics-synthesis.md), and the carrier/spin obligations in [topological-carrier-and-spin-targets.md](topological-carrier-and-spin-targets.md).

---

## 1. Purpose

The rigid octahedral row uses exact antipodality inside each binary:

$$
\mathbf{Y}_{a,+}(\lambda)
=-\mathbf{Y}_{a,-}(\lambda).
$$

That row gives a clean partner-root seed, but it does not solve the intrinsic dynamics residual. Antipodal relaxation adds the smallest geometry degree of freedom that can move the two members of a binary together without changing the integer inventory or the pro/anti polarity labels.

The key distinction is:

$$
\text{inventory pairing}
\ne
\text{exact geometric antipodality}.
$$

The inventory pairing fixes which architrino and antiarchitrino form a binary. Exact antipodality is only a certificate residual. A branch may relax geometric antipodality only if the same row preserves center gauge, support band, noncollision, root floors, event/action accounting, and framed-wake topology.

---

## 2. Pair-Midpoint Chart

Use sites

$$
i=(a,\sigma),
\qquad
a\in\{1,2,3\},
\qquad
\sigma\in\{+1,-1\}.
$$

In dimensionless center-gauge coordinates, write each pair as

$$
\mathbf{Y}_{a,\sigma}(\lambda)
=
\mathbf{m}_a(\lambda)
+\sigma\mathbf{r}_a(\lambda).
$$

Here $\mathbf{r}_a$ is the half-separation curve of binary $a$, and $\mathbf{m}_a$ is its pair-midpoint curve relative to the branch center. Exact antipodality is the submanifold

$$
\mathbf{m}_a(\lambda)=\mathbf{0}
\qquad
\text{for all }a,\lambda.
$$

The antipodal error used by the carrier certificate is

$$
\mathbf{e}_a(\lambda)
=
\mathbf{Y}_{a,+}(\lambda)+\mathbf{Y}_{a,-}(\lambda)
=
2\mathbf{m}_a(\lambda).
$$

Thus the certificate residual is

$$
\mathcal{R}_{\mathrm{anti}}
=
\max_a\sup_{\lambda}
\frac{2\|\mathbf{m}_a(\lambda)\|}
{\epsilon_{\mathrm{anti}}}.
$$

A relaxed row may pass the antipodal certificate only when

$$
\mathcal{R}_{\mathrm{anti}}\le1.
$$

This residual is not a dynamics equation. It is a declaration of how far the branch is allowed to depart from exact antipodality while still being treated as a small relaxation of the same carrier family.

---

## 3. Inventory And Center Gauge

For the neutral six-site Noether swarm search, the polarity ledger remains

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon,
\qquad
\epsilon=\frac{|e|}{6},
$$

and the inventory row remains

$$
\mathcal{I}_q=(N_+,N_-;C_{\mathrm{cent}},S_{\mathrm{chor}},Q),
\qquad
N_+=N_-=3,
\qquad
Q=0.
$$

Antipodal relaxation does not add central inventory and does not alter $Q$. It only changes the geometry of the six existing sites.

With equal center-gauge weights, the center gauge is

$$
\sum_{a,\sigma}\mathbf{Y}_{a,\sigma}(\lambda)=\mathbf{0}.
$$

In the pair-midpoint chart this becomes

$$
2\sum_{a=1}^{3}\mathbf{m}_a(\lambda)=\mathbf{0},
$$

so the relaxed row must impose

$$
\mathcal{R}_{\mathrm{center},m}
=
\sup_{\lambda}
\left\|
\sum_{a=1}^{3}\mathbf{m}_a(\lambda)
\right\|
=0.
$$

Differentiating gives the velocity and curvature center rows:

$$
\sum_a\mathbf{m}'_a(\lambda)=\mathbf{0},
\qquad
\sum_a\mathbf{m}''_a(\lambda)=\mathbf{0}.
$$

Therefore pair-midpoint motion cannot be used as hidden branch-center motion. If the sum of pair-midpoint accelerations is nonzero, the row has left the rest-frame center-gauge chart and must be treated as a moving-assembly export or rejected for the minimal rest-branch theorem.

The electric dipole of the neutral six-site row is

$$
\mathbf{p}_q(\lambda)
=
\sum_a
\left(
+\epsilon\mathbf{Y}_{a,+}(\lambda)
-\epsilon\mathbf{Y}_{a,-}(\lambda)
\right)
=
2\epsilon\sum_a\mathbf{r}_a(\lambda).
$$

The pair-midpoint variables $\mathbf{m}_a$ cancel from this expression. Thus small antipodal relaxation does not by itself create net charge or a new electric dipole source, but it can change quadrupole, angular-momentum, exposure, and delayed-root data.

---

## 4. Arclength Compatibility

The intrinsic curve equation assumes

$$
\left\|\mathbf{Y}'_{a,\sigma}(\lambda)\right\|=1.
$$

In the pair-midpoint chart,

$$
\mathbf{Y}'_{a,\sigma}
=
\mathbf{m}'_a+\sigma\mathbf{r}'_a.
$$

If the two members of a binary use the same arclength parameter $\lambda$, then both partner arclength equations imply

$$
\|\mathbf{m}'_a+\mathbf{r}'_a\|^2=1,
\qquad
\|\mathbf{m}'_a-\mathbf{r}'_a\|^2=1.
$$

Adding and subtracting gives the pair-synchronous constraints

$$
\mathbf{m}'_a\cdot\mathbf{r}'_a=0,
$$

and

$$
\|\mathbf{m}'_a\|^2+\|\mathbf{r}'_a\|^2=1.
$$

These equations are useful because they separate admissible pair-midpoint motion from a false speed residual. A finite-mode search using this ansatz must add

$$
\mathcal{R}_{\mathrm{sync},a}^{(1)}
=
\mathbf{m}'_a\cdot\mathbf{r}'_a,
$$

and

$$
\mathcal{R}_{\mathrm{sync},a}^{(2)}
=
\|\mathbf{m}'_a\|^2+\|\mathbf{r}'_a\|^2-1
$$

at each collocation node, unless it instead gives the two partners separate arclength clocks and declares the resulting winding data.

Period closure requires

$$
\mathbf{m}_a(\lambda+L)=\mathbf{m}_a(\lambda),
\qquad
\mathbf{r}_a(\lambda+L)=\mathbf{r}_a(\lambda),
$$

or a declared integer winding relation in the sense of [minimal-dynamics-closure-theorem.md](minimal-dynamics-closure-theorem.md).

---

## 5. Support-Band Consequences

The support-band inequalities become

$$
1-\delta_*
\le
\|\mathbf{m}_a(\lambda)+\sigma\mathbf{r}_a(\lambda)\|
\le
1+\delta_*,
$$

after normalization by the chosen branch scale $R_*$. Squaring gives

$$
\|\mathbf{m}_a\|^2+\|\mathbf{r}_a\|^2
+2\sigma\mathbf{m}_a\cdot\mathbf{r}_a
\in
\left[(1-\delta_*)^2,(1+\delta_*)^2\right].
$$

The first-order radius split inside a pair is therefore controlled by

$$
2\mathbf{m}_a\cdot\mathbf{r}_a.
$$

If the branch is intended to remain inside a thin support band, a strong low-order gauge is

$$
\mathbf{m}_a(\lambda)\cdot\mathbf{r}_a(\lambda)
=O(\|\mathbf{m}_a\|^2).
$$

This is not the same as the arclength condition $\mathbf{m}'_a\cdot\mathbf{r}'_a=0$. Both must be checked. The support residuals added by antipodal relaxation are

$$
\mathcal{R}_{\mathrm{band},a,\sigma}^{-}
=
\max\left\{0,(1-\delta_*)-\|\mathbf{m}_a+\sigma\mathbf{r}_a\|\right\},
$$

and

$$
\mathcal{R}_{\mathrm{band},a,\sigma}^{+}
=
\max\left\{0,\|\mathbf{m}_a+\sigma\mathbf{r}_a\|-(1+\delta_*)\right\}.
$$

---

## 6. Noncollision Floors

The partner separation is

$$
\|\mathbf{Y}_{a,+}-\mathbf{Y}_{a,-}\|
=
2\|\mathbf{r}_a\|.
$$

Thus pair-midpoint relaxation does not directly shrink the same-binary separation. The partner noncollision gate is

$$
2\inf_{a,\lambda}\|\mathbf{r}_a(\lambda)\|
>
\epsilon_x/R_*.
$$

For distinct binaries,

$$
\mathbf{Y}_{a,\sigma}-\mathbf{Y}_{b,\tau}
=
\mathbf{m}_a-\mathbf{m}_b
+\sigma\mathbf{r}_a-\tau\mathbf{r}_b,
\qquad
a\ne b.
$$

Let a reference row have distances

$$
d_{a\sigma,b\tau}^{0}(\lambda)
=
\|\sigma\mathbf{r}_a^0(\lambda)-\tau\mathbf{r}_b^0(\lambda)\|.
$$

Write

$$
\Delta_m=\max_a\|\mathbf{m}_a\|_{C^0},
\qquad
\Delta_r=\max_a\|\mathbf{r}_a-\mathbf{r}_a^0\|_{C^0}.
$$

The reverse triangle inequality gives

$$
\|\mathbf{Y}_{a,\sigma}-\mathbf{Y}_{b,\tau}\|
\ge
d_{a\sigma,b\tau}^{0}
-2\Delta_m-2\Delta_r.
$$

Therefore a sufficient cross-binary floor is

$$
2\Delta_m+2\Delta_r
<
d_{\min,\mathrm{cross}}^{0}-\epsilon_x/R_*.
$$

This is only a sufficient inequality. A retained row must still emit the actual value of

$$
d_{\min}
=
\inf_{\substack{(a,\sigma)\ne(b,\tau)\\ \lambda}}
\|\mathbf{Y}_{a,\sigma}(\lambda)-\mathbf{Y}_{b,\tau}(\lambda)\|.
$$

---

## 7. Root-Floor Protection

The intrinsic root equation is

$$
G_{ij}(\lambda,\eta)
=
\|\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda-\eta)\|
-\eta
=0.
$$

For a retained root, write

$$
\widehat{\mathbf{R}}_{ij}^{\alpha}
=
\frac{\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\lambda-\eta_{ij}^{\alpha})}
{\eta_{ij}^{\alpha}},
$$

and

$$
J_{ij}^{\alpha}
=
1-\mathbf{T}_j(\lambda-\eta_{ij}^{\alpha})
\cdot\widehat{\mathbf{R}}_{ij}^{\alpha}.
$$

Let a small deformation be

$$
\delta\mathbf{Y}_{a,\sigma}
=
\delta\mathbf{m}_a+\sigma\delta\mathbf{r}_a.
$$

At fixed root label, the first-order root shift is

$$
\delta\eta_{ij}^{\alpha}
=
\frac{
\widehat{\mathbf{R}}_{ij}^{\alpha}\cdot
\left[
\delta\mathbf{Y}_i(\lambda)
-\delta\mathbf{Y}_j(\lambda-\eta_{ij}^{\alpha})
\right]
}
{J_{ij}^{\alpha}}.
$$

For a partner root with $i=(a,+)$ and $j=(a,-)$, the pure pair-midpoint part is

$$
\delta\mathbf{m}_a(\lambda)
-\delta\mathbf{m}_a(\lambda-\eta_{ij}^{\alpha}).
$$

Thus a constant pair-midpoint offset cancels from the partner root shift, while a varying pair-midpoint curve changes partner delays through its causal-delay phase difference. Cross-binary roots see the difference

$$
\delta\mathbf{m}_a(\lambda)
-\delta\mathbf{m}_b(\lambda-\eta_{ij}^{\alpha}),
$$

so even slowly varying pair-midpoint offsets can change cross-root geometry.

If the reference active-root ledger has

$$
J_{\min}^{0}>\epsilon_J,
$$

and the deformation obeys

$$
\|\delta\mathbf{Y}\|_{C^1}\le\Delta,
$$

then root labels are protected on the same root stratum whenever constants $C_{\eta}$ and $C_J$ from the certified root brackets satisfy

$$
C_{\eta}\Delta
<
\eta_{\mathrm{bracket}},
$$

and

$$
C_J\Delta
<
J_{\min}^{0}-\epsilon_J.
$$

Completeness of the root ledger also requires an off-root gap. If outside the retained root brackets

$$
g_{\mathrm{off}}^0
=
\inf |G_{ij}^{0}(\lambda,\eta)|>0,
$$

then a sufficient no-new-root condition is

$$
2\Delta<g_{\mathrm{off}}^0/2.
$$

The exact constants depend on the active brackets, memory window, and interpolation norm. The ansatz cannot inherit the rigid partner-root value or cross-root counts without this rescreen.

---

## 8. Dynamics Split

For each site, the intrinsic dynamics equation is

$$
\mathbf{Y}_{a,\sigma}''
=
\Gamma
P_{a,\sigma}^{\perp}
\widetilde{\mathbf{F}}_{a,\sigma},
$$

with tangential closure

$$
\mathbf{T}_{a,\sigma}\cdot
\widetilde{\mathbf{F}}_{a,\sigma}=0.
$$

Since

$$
\mathbf{Y}_{a,\sigma}''
=
\mathbf{m}_a''+\sigma\mathbf{r}_a'',
$$

define the site residual

$$
\mathbf{D}_{a,\sigma}
=
\mathbf{m}_a''+\sigma\mathbf{r}_a''
-\Gamma
P_{a,\sigma}^{\perp}
\widetilde{\mathbf{F}}_{a,\sigma}.
$$

The pair-even and pair-odd residuals are

$$
\mathbf{D}_{a}^{\mathrm{even}}
=
\frac{1}{2}
\left(
\mathbf{D}_{a,+}+\mathbf{D}_{a,-}
\right)
=
\mathbf{m}_a''
-\frac{\Gamma}{2}
\left(
P_{a,+}^{\perp}\widetilde{\mathbf{F}}_{a,+}
+P_{a,-}^{\perp}\widetilde{\mathbf{F}}_{a,-}
\right),
$$

and

$$
\mathbf{D}_{a}^{\mathrm{odd}}
=
\frac{1}{2}
\left(
\mathbf{D}_{a,+}-\mathbf{D}_{a,-}
\right)
=
\mathbf{r}_a''
-\frac{\Gamma}{2}
\left(
P_{a,+}^{\perp}\widetilde{\mathbf{F}}_{a,+}
-P_{a,-}^{\perp}\widetilde{\mathbf{F}}_{a,-}
\right).
$$

Exact antipodality sets $\mathbf{m}_a=\mathbf{0}$. On that submanifold, the pair-even equation becomes the necessary force-balance condition

$$
P_{a,+}^{\perp}\widetilde{\mathbf{F}}_{a,+}
+P_{a,-}^{\perp}\widetilde{\mathbf{F}}_{a,-}
=
\mathbf{0}.
$$

If this condition fails, an exact-antipodal ansatz is overconstrained. Pair-midpoint motion supplies $\mathbf{m}_a''$ as the new variable that can absorb pair-even normal residuals. It does not automatically solve the branch because the new $\mathbf{m}_a$ also changes roots, tangents, support-band radii, curvature, and framed-wake data.

The center-gauge row gives a further solvability condition. Since

$$
\sum_a\mathbf{m}_a''=\mathbf{0},
$$

the pair-even force demands must satisfy

$$
\sum_{a=1}^{3}
\left(
P_{a,+}^{\perp}\widetilde{\mathbf{F}}_{a,+}
+P_{a,-}^{\perp}\widetilde{\mathbf{F}}_{a,-}
\right)
=
\mathbf{0}
$$

on the rest-frame branch chart. If this row fails, the residual is a common center-acceleration or boundary-exchange demand, not an internal antipodal-relaxation solution.

The tangential residual splits similarly:

$$
\mathcal{T}_{a}^{\mathrm{even}}
=
\frac{1}{2}
\left(
\mathbf{T}_{a,+}\cdot\widetilde{\mathbf{F}}_{a,+}
+\mathbf{T}_{a,-}\cdot\widetilde{\mathbf{F}}_{a,-}
\right),
$$

and

$$
\mathcal{T}_{a}^{\mathrm{odd}}
=
\frac{1}{2}
\left(
\mathbf{T}_{a,+}\cdot\widetilde{\mathbf{F}}_{a,+}
-\mathbf{T}_{a,-}\cdot\widetilde{\mathbf{F}}_{a,-}
\right).
$$

The useful role of antipodal relaxation is specifically to add columns to the linearized operator that can reduce the pair-even rows unreachable by exact-antipodal radial, phase, and plane-normal modes.

The arclength-inverse $M=3$ screens sharpen the opening rule. Exact-antipodal continuation should not be abandoned merely because a pair-even tangential residual is present. The parity calculation in [exact-antipodal-parity-lemma.md](exact-antipodal-parity-lemma.md) shows that $\mathcal{R}_{\mathrm{tan}}$ is expected to be pair-even while $\mathcal{R}_{K}$ is pair-odd when the root ledger is antipodally closed. In the current exact-antipodal evaluator, the $M=3$ restricted matrix still has full local rank and a strong range signal. The first apparent root loss is also not a pair-even obstruction: the missing same-sign binary-$3$ from binary-$2$ roots reappear when the memory window extends from $\eta_{\max}=4$ to $\eta_{\max}=4.5$. Antipodal relaxation opens only after an exact-antipodal $M=3$ or refined-grid successor passes the cokernel test in [support-complete-dynamics-obstruction-certificate.md](support-complete-dynamics-obstruction-certificate.md), showing a stable pair-even left-null obstruction not explained by root-ledger, memory-window, support-band, tail-force, action-scale, or discretization errors, and after [antipodal-relaxation-column-certificate.md](antipodal-relaxation-column-certificate.md) shows that pair-midpoint columns span the obstructing cokernel direction.

---

## 9. Added Residual Vector

The antipodal-relaxation search should append the following rows to the intrinsic residual vector:

$$
\mathcal{R}_{\mathrm{anti-relax}}
=
\left(
\mathcal{R}_{\mathrm{anti}},
\mathcal{R}_{\mathrm{center},m},
\mathcal{R}_{\mathrm{sync}},
\mathcal{R}_{\mathrm{band},m},
\mathcal{R}_{x,m},
\mathcal{R}_{J,m},
\mathcal{R}_{\mathrm{root},m},
\mathcal{R}_{\mathrm{dyn}}^{\mathrm{even}},
\mathcal{R}_{\mathrm{dyn}}^{\mathrm{odd}},
\mathcal{R}_{\mathrm{tan}}^{\mathrm{even}},
\mathcal{R}_{\mathrm{tan}}^{\mathrm{odd}},
\mathcal{R}_{\mathrm{frame},m},
\mathcal{R}_{\mathbf{J},m}
\right).
$$

The meanings are:

| Residual | Required condition |
| --- | --- |
| $\mathcal{R}_{\mathrm{anti}}$ | antipodal-error certificate stays inside its declared tolerance |
| $\mathcal{R}_{\mathrm{center},m}$ | $\sum_a\mathbf{m}_a=\sum_a\mathbf{m}'_a=\sum_a\mathbf{m}''_a=\mathbf{0}$ |
| $\mathcal{R}_{\mathrm{sync}}$ | pair-synchronous arclength constraints hold, or declared winding data replace them |
| $\mathcal{R}_{\mathrm{band},m}$ | both members of every pair stay inside the same support band |
| $\mathcal{R}_{x,m}$ | pair and cross-binary noncollision floors remain strict |
| $\mathcal{R}_{J,m}$ | all retained root Jacobians remain above $\epsilon_J$ |
| $\mathcal{R}_{\mathrm{root},m}$ | partner and cross-root labels are recomputed and complete under the declared root policy |
| $\mathcal{R}_{\mathrm{dyn}}^{\mathrm{even}}$ | pair-midpoint curvature closes the pair-even normal dynamics |
| $\mathcal{R}_{\mathrm{dyn}}^{\mathrm{odd}}$ | half-separation curvature closes the pair-odd normal dynamics |
| $\mathcal{R}_{\mathrm{tan}}^{\mathrm{even}}$ | pair-even tangential work row vanishes |
| $\mathcal{R}_{\mathrm{tan}}^{\mathrm{odd}}$ | pair-odd tangential work row vanishes |
| $\mathcal{R}_{\mathrm{frame},m}$ | framed-wake continuation remains defined after relaxation |
| $\mathcal{R}_{\mathbf{J},m}$ | mechanical, causal-wake, and Noether sea angular-momentum ledger closes on the relaxed row |

Rows already present in the minimal dynamics theorem are not replaced. The added rows only expose how antipodal relaxation modifies them.

---

## 10. Finite-Mode Search Chart

A minimal finite-mode chart is

$$
\mathbf{m}_a(\lambda)
=
\sum_{h\in\mathcal{H}_M}
\mathbf{M}_{a,h}\varphi_h(\lambda),
\qquad
\mathbf{r}_a(\lambda)
=
\mathbf{r}_a^0(\lambda)
+
\sum_{h\in\mathcal{H}_M}
\mathbf{R}_{a,h}\varphi_h(\lambda).
$$

Center gauge can be enforced by eliminating the third midpoint:

$$
\mathbf{m}_3(\lambda)
=
-\mathbf{m}_1(\lambda)-\mathbf{m}_2(\lambda).
$$

The first rank screen should keep $\mathbf{r}_a=\mathbf{r}_a^0$ and solve only for midpoint modes. This isolates whether the pair-even residual actually lies in the antipodal-relaxation range. If the pair-even rows improve but root floors or support bands collapse, the ansatz is not a retained route. If pair-even rows do not improve, antipodal relaxation is not the missing low-order degree of freedom.

For the linearized matrix, the pure midpoint column for a retained root contributes

$$
\delta\mathbf{Y}_{a,\sigma}
=
\delta\mathbf{m}_a,
$$

independent of $\sigma$. Therefore it couples most directly to pair-even residual rows. It couples to pair-odd rows only through the induced changes in roots, Jacobians, projectors, and tangents.

---

## 11. Spin And Topology Risks

Exact antipodality supplies a strong discrete involution:

$$
\mathbf{Y}_{a,+}(\lambda)
\mapsto
-\mathbf{Y}_{a,-}(\lambda).
$$

Relaxation replaces this with

$$
\mathbf{Y}_{a,+}+\mathbf{Y}_{a,-}=2\mathbf{m}_a.
$$

The framed-wake braid record $\mathcal{K}_q$ therefore cannot be inherited from the exact-antipodal row. It must be recomputed on the relaxed row using the same active roots, support band, and endpoint convention.

Topological invariants are protected only under an ambient isotopy that keeps all worldlines disjoint and keeps the framed-wake continuation nonsingular. A sufficient local protection statement is:

$$
d_{\min}>\epsilon_x,
\qquad
J_{\min}>\epsilon_J,
\qquad
\mathcal{R}_{\mathrm{frame},m}\le1.
$$

If any of these fail, linking numbers, node-clearance rows, and framed-wake parity cannot be transported from the seed. The failure code is `framed-wake-parity-open`, not a spin result.

Mechanical angular momentum also changes. In the dimensionless pair chart, ignoring common scale factors,

$$
\mathbf{J}_{a,\mathrm{mech}}
=
\mathbf{Y}_{a,+}\times\mathbf{Y}'_{a,+}
+\mathbf{Y}_{a,-}\times\mathbf{Y}'_{a,-}.
$$

Substitution gives

$$
\mathbf{J}_{a,\mathrm{mech}}
=
2\mathbf{m}_a\times\mathbf{m}'_a
+2\mathbf{r}_a\times\mathbf{r}'_a.
$$

The mixed terms cancel, but the midpoint loop adds a new angular-momentum channel

$$
2\mathbf{m}_a\times\mathbf{m}'_a.
$$

Thus antipodal relaxation may help or spoil the spin target depending on whether this new channel closes with the causal-wake and Noether sea angular-momentum ledgers. A small $\mathcal{R}_{\mathrm{anti}}$ does not imply a small spin correction if $\mathbf{m}'_a$ is large or if the midpoint loop changes framed-wake transport.

The main topology risks are:

| Risk | Trigger | Required response |
| --- | --- | --- |
| `partner-involution-broken` | $\mathcal{R}_{\mathrm{anti}}>1$ or exact-pair symmetry is used after relaxation | stop using exact-antipodal parity arguments |
| `cross-root-relabel` | a cross-root is born, lost, merged, or changes order | declare a new root stratum and rescreen |
| `node-clearance-shift` | pair-midpoint motion moves a site through a carrier-node neighborhood at a new time | recompute $\chi_x^n$, $\chi_t^n$, and $\chi_J^n$ |
| `framed-wake-frame-slip` | the wake-ribbon frame is not continuously transported through the relaxed row | mark spinor parity `not_computed` or failed |
| `angular-momentum-ledger-open` | $2\mathbf{m}_a\times\mathbf{m}'_a$ is not balanced by other ledger channels | do not use the row for spin retention |

---

## 12. Branch-Retention Boundary

Antipodal relaxation is admissible as a search chart if it supplies:

$$
\mathcal{R}_{\mathrm{anti-relax}}=0
$$

within declared tolerances, while the minimal dynamics residual from [minimal-dynamics-closure-theorem.md](minimal-dynamics-closure-theorem.md) also vanishes on the same active-root ledger.

The ansatz is rejected as a retained branch if any of the following occur:

1. pair-midpoint motion violates center gauge;
2. support-band splitting exceeds tolerance;
3. the noncollision floor or Jacobian floor is lost;
4. a root label is inherited from the rigid row without rescreening;
5. pair-even dynamics are improved only by hidden center acceleration;
6. spinor parity is asserted without recomputing the framed-wake row;
7. angular-momentum closure omits the midpoint-loop contribution.

Therefore the strongest current claim is:

$$
\text{antipodal relaxation is a necessary candidate column for the pair-even dynamics residual.}
$$

It is not evidence of a retained shell swarm branch until a concrete relaxed curve family closes the full intrinsic dynamics, root, inventory, action, event, stability, and framed-wake rows together on one live ledger.
