# Neutral Braid Base Certificate

Promotion status: `priority-only`. This packet defines the
`neutral_braid_base_certificate` proof object requested in
[Braid](../braid-retained-branch-closure.md) and refines the general scaffold in
[Neutral Braid Model](neutral-braid-model.md). It does not retain a branch,
does not authorize migration into `content/markdown/aaa`, and does not promote
any observer export.

The certificate is the irreducible six-site neutral braid certificate. It is
defined before any binary partition, shell braid support row, or nested shell
braid radial ordering is assumed. Those later structures are optional
case-reduction rows of a neutral braid, not separate ontology.

Retained-branch language below is theorem-target language only. A future
retained neutral braid branch would have to populate all required rows on one
live ledger and then pass the downstream stability, action, Noether, event, and
observer-export obligations required by the retained-branch proof stack.

---

## 1. Scope And Status

The base certificate answers one question:

$$
\text{has a six-site neutral Noether braid branch candidate been specified on one ledger?}
$$

It does not answer:

1. whether the candidate has a binary partition;
2. whether the candidate is a shell braid;
3. whether the candidate is a nested shell braid;
4. whether a retained branch exists;
5. whether Lorentz, photon, mass-map, color, strong-field, or cosmology exports
   pass.

The base predicate is a row-level theorem target:

$$
P_{\mathrm{neutral}}^{0}(B,W)
\Longleftrightarrow
\bigwedge_{r\in\mathfrak{R}_{\mathrm{req}}^{0}}
P_r(B,W),
$$

where every predicate $P_r$ is computed over the same branch window $W$, the
same source-pair policy, the same active causal-root ledger, the same memory
convention, the same endpoint convention, and the same inventory ledger. If any
row changes those conventions, the certificate exits with a ledger-mismatch
status rather than a retained-branch claim.

---

## 2. Base Variables

Let

$$
I=\{1,\ldots,6\}
$$

index the six Noether braid architrinos. A neutral braid base branch supplies a
polarity map

$$
\sigma:I\to\{+1,-1\},
\qquad
\#\{i:\sigma_i=+1\}=3,
\qquad
\#\{i:\sigma_i=-1\}=3,
$$

so that

$$
Q_{\mathrm{neutral}}
=
\epsilon\sum_{i\in I}\sigma_i
=0.
$$

No binary label is available at this level. In particular, the notation
$i=(a,\sigma)$ is invalid until a case-reduction row declares and certifies a
partition into three two-site opposite-polarity blocks.

The base geometry consists of six closed arclength curves

$$
\mathbf{Y}_i:\mathbb{R}/L_i\mathbb{Z}\to\mathbb{R}^3,
\qquad
L_i>0,
\qquad
\|\mathbf{Y}_i'(\lambda)\|=1,
$$

positive bounded speed factors

$$
0<\nu_-\le\nu_i(\lambda)\le\nu_+<\infty,
$$

and causal-time maps

$$
\chi_i(\lambda)
=
\int_0^\lambda\frac{d\xi}{\nu_i(\xi)},
\qquad
\Lambda_i=\chi_i^{-1},
\qquad
H_i=\chi_i(L_i).
$$

The center-time trajectory is

$$
\mathbf{x}_i(u)=\mathbf{Y}_i(\Lambda_i(u)).
$$

The certificate must declare either a common-period row

$$
H_i=H_*
$$

or a winding-period row

$$
m_iH_i=H_{\mathrm{com}},
\qquad
m_i\in\mathbb{Z}_{>0}.
$$

The base source-pair policy is all ordered cross-site pairs:

$$
\Pi_{\mathrm{src}}^{0}
=
\{(i,j)\in I\times I:i\ne j\}.
$$

Same-source or fold-layer terms are absent from the base all-pairs ledger unless
a separate action/event row introduces and accounts for them. A support force or
Noether sea medium-response force is likewise absent unless the same
action/Noether/event ledger accounts for its work and exchange terms.

The minimal base range and noncollision floors are

$$
R_{\max}
=
\max_{i\in I}\sup_{\lambda}
\|\mathbf{Y}_i(\lambda)-\mathbf{C}\|
<\infty,
$$

and

$$
d_{\min}
=
\inf_{i\ne j,\lambda,\mu}
\|\mathbf{Y}_i(\lambda)-\mathbf{Y}_j(\mu)\|
\ge d_0>0.
$$

Here $\mathbf{C}$ is a gauge point used to state the finite range row. This is
not a shell braid support band, a hollow-support claim, or a nested radial
ordering.

---

## 3. Required Certificate Tuple

The base certificate tuple is

$$
\mathfrak{R}_{\mathrm{neutral}}^{0}(B,W)
=
\left(
\mathsf{NeutralInventory},
\mathsf{BaseCurves}^{\nu},
\mathsf{GaugePeriod}^{\nu},
\mathsf{RangeNoncollision},
\mathsf{AllPairsRoot}^{\nu},
\mathsf{Tail}^{\nu},
\mathsf{ForceDynamics}^{\nu},
\mathsf{FiniteMode},
\mathsf{ActionNoether}^{\nu},
\mathsf{Event}^{\nu},
\mathsf{CaseReduction},
\mathsf{ObserverExport},
\mathsf{Status}
\right).
$$

The required rows are:

| Row | Required payload |
| --- | --- |
| $\mathsf{NeutralInventory}$ | $I=\{1,\ldots,6\}$, exactly three positive and three negative architrinos, $Q_{\mathrm{neutral}}=0$, all ordered cross-site source pairs |
| $\mathsf{BaseCurves}^{\nu}$ | six closed arclength curves, positive bounded speed factors, causal clocks $\chi_i$, inverse maps $\Lambda_i$, and physical paths $\mathbf{x}_i$ |
| $\mathsf{GaugePeriod}^{\nu}$ | center gauge, phase gauge, common-period row or winding-period row, with no binary labels |
| $\mathsf{RangeNoncollision}$ | finite range bound, positive noncollision floor, and any declared topology floor; no shell support or nested ordering assumed |
| $\mathsf{AllPairsRoot}^{\nu}$ | active, excluded, and tail causal-root rows for every ordered pair $i\ne j$, positive delay floor, Jacobian floor, and root-status convention |
| $\mathsf{Tail}^{\nu}$ | finite owned tail cover, terminal predicate for every tail cell, and tail exclusion or assimilation error carried into every later residual |
| $\mathsf{ForceDynamics}^{\nu}$ | force ledger, tangential speed row, normal curvature row, and scale convention all computed from the same all-pairs root ledger |
| $\mathsf{FiniteMode}$ | finite coefficient chart or direct curve-level certificate using site labels $i\in I$, plus convergence, Krawczyk, or rejection status |
| $\mathsf{ActionNoether}^{\nu}$ | total action or declared action obstruction, work-one-form curl row, action-derived $\Gamma_B^\nu$ or tensorial inertia row, and Noether currents |
| $\mathsf{Event}^{\nu}$ | endpoint convention, event interval, root-fold, same-source/fold-layer if declared, topology-change, support-boundary if declared, and exchange rows |
| $\mathsf{CaseReduction}$ | optional binary partition, shell braid, and nested shell braid rows marked `not-claimed`, `open`, `passed`, or `failed` |
| $\mathsf{ObserverExport}$ | downstream Lorentz, photon, mass-map, generation, color, strong-field, and cosmology rows marked `passed`, `failed`, or `not_computed` |
| $\mathsf{Status}$ | primary first-failure code from Section 5 |

The all-pairs root equation is, for every ordered pair $i\ne j$,

$$
G_{ij,\alpha}^{\nu}(u,\eta)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta))
\right\|
-\eta
=0.
$$

The corresponding bounded-speed Jacobian is

$$
J_{ij,\alpha}^{\nu}
=
1-\nu_j^-\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_{ij,\alpha},
$$

with certificate floors

$$
\eta_{ij,\alpha}(u)\ge\eta_0>0,
\qquad
|J_{ij,\alpha}^{\nu}(u)|\ge J_0>0.
$$

The force ledger is

$$
F_i^\nu(u)
=
\sum_{j\ne i}
\sum_{\alpha\in\mathcal{A}_{ij}^{\nu}(u)}
\sigma_i\sigma_j
\frac{\widehat{\mathbf{R}}_{ij,\alpha}(u)}
{\eta_{ij,\alpha}(u)^2|J_{ij,\alpha}^{\nu}(u)|}
+
F_{i,\mathrm{self}}^\nu
+
F_{i,\mathrm{med}}^\nu
+
F_{i,\mathrm{supp}}^\nu.
$$

The last three terms must be zero or separately action-accounted on the same
ledger. They cannot be fitted residual-canceling terms.

The bounded-speed dynamics rows are

$$
R_{T,i}^{\nu}
=
\nu_i\nu_i'
-
\Gamma_B^\nu\mathbf{T}_i\cdot F_i^\nu,
$$

and

$$
R_{N,i}^{\nu}
=
\nu_i^2\mathbf{K}_i
-
\Gamma_B^\nu P_i^\perp F_i^\nu.
$$

The speed row must also close the period solvability condition

$$
\int_0^{H_i}
\mathbf{T}_i(u)\cdot F_i^\nu(u)\,du
=0
$$

with primitive speed excursion inside the declared speed band.

---

## 4. Optional Case-Reduction Interface

The case-reduction row is required even when no case is claimed. Its job is to
make later braid variants explicit reductions of the neutral braid base:

$$
\mathsf{CaseReduction}(B)
=
\left(
\mathsf{BinaryPartition},
\mathsf{ShellBraid},
\mathsf{NestedShellBraid}
\right).
$$

### 4.1 Binary Partition

A binary partition is optional data

$$
\mathcal{P}=\{P_1,P_2,P_3\},
\qquad
|P_a|=2,
\qquad
\sum_{i\in P_a}\sigma_i=0.
$$

Only after this row passes may the packet use $i=(a,\sigma)$ notation. If exact
antipodality or speed parity is claimed, the row must add those residuals. A
failed binary-partition row does not reject the neutral braid base certificate.
It only blocks binary-specific claims and nested shell braid claims that depend
on binary blocks.

### 4.2 Shell Braid

A shell braid reduction adds a controlled common radial support band around a
declared gauge point $\mathbf{C}$:

$$
0<R_{\mathrm{in}}<R_{\mathrm{out}},
$$

with margins

$$
B_i^-
=
\inf_\lambda
\left(\|\mathbf{Y}_i(\lambda)-\mathbf{C}\|-R_{\mathrm{in}}\right),
\qquad
B_i^+
=
\inf_\lambda
\left(R_{\mathrm{out}}-\|\mathbf{Y}_i(\lambda)-\mathbf{C}\|\right).
$$

The shell braid row passes only when

$$
B_i^-\ge0,
\qquad
B_i^+\ge0
$$

for all $i$, with support multipliers, support work, and support-boundary event
rows added when the dynamics uses support forces or barriers. Occupancy and
signed-balance rows are required only if the branch claims enclosing support,
shielding, or near-neutral coarse exposure.

### 4.3 Nested Shell Braid

A nested shell braid reduction requires a binary partition plus ordered radial
support bands for the three binary blocks. If $a\prec b$ denotes the declared
radial order, the gap row has the form

$$
R_a^+ + \epsilon_R \le R_b^-.
$$

Every ordered-gap row, binary-block row, support-work row, and root-ledger row
must use the same underlying neutral braid ledger. If the radial order changes,
the branch exits to an event or transition status rather than silently retaining
a nested shell braid label.

The implication direction is one-way:

$$
\text{neutral braid base certificate plus passed case rows}
\Longrightarrow
\text{corresponding shell braid or nested shell braid case}.
$$

The reverse implication is not accepted unless the reduction packet also proves
that no base row was hidden by the symmetry, support, or radial-order ansatz.

---

## 5. First-Failure And Status Codes

The primary status is the first failed required row in the following order:

| Status | Trigger |
| --- | --- |
| `neutral-base-inventory-open` | the six-site, three-positive/three-negative inventory or all ordered cross-site source policy is missing |
| `neutral-base-curve-chart-open` | closed arclength curves, speed factors, causal clocks, or gauge rows are missing |
| `neutral-base-period-open` | no common-period or winding-period row is declared |
| `neutral-base-noncollision-open` | finite range or noncollision floors are missing or fail |
| `neutral-base-all-pairs-root-ledger-open` | some ordered pair $i\ne j$ lacks active, excluded, or tail root status |
| `neutral-base-jacobian-floor-open` | active roots lack positive delay or Jacobian floors |
| `neutral-base-tail-ledger-open` | tail cells are not owned, excluded, assimilated, or carried into error bounds |
| `neutral-base-force-ledger-mismatch` | force, root, support, medium, or endpoint conventions do not match |
| `neutral-base-dynamics-open` | tangential speed row, normal curvature row, or speed-period solvability row is open |
| `neutral-base-finite-mode-search-open` | no finite-mode or curve-level search/certification object populates the base rows |
| `neutral-base-action-noether-open` | action exactness, action-derived scale, Noether currents, or Noether sea exchange rows are missing |
| `neutral-base-event-ledger-open` | endpoint, root-fold, topology-change, same-source/fold-layer, or exchange rows are missing when needed |
| `neutral-base-case-reduction-statused` | base rows are statused and optional case reductions are marked `not-claimed`, `open`, `passed`, or `failed` |
| `neutral-base-observer-export-statused` | observer exports are explicitly marked `passed`, `failed`, or `not_computed` |
| `retained-neutral-braid-theorem-target-open` | the base certificate is a theorem target only; no retained branch is claimed here |
| `not-retained` | default status for this packet and for any branch lacking all required retained-branch proof rows |

Case-reduction failures are not base failures. The following statuses block only
the named downstream case claim:

$$
\texttt{binary-partition-not-claimed},
\qquad
\texttt{binary-partition-open},
\qquad
\texttt{binary-partition-failed},
$$

$$
\texttt{shell-braid-reduction-open},
\qquad
\texttt{shell-braid-reduction-failed},
$$

$$
\texttt{nested-shell-braid-reduction-open},
\qquad
\texttt{nested-shell-braid-reduction-failed}.
$$

Observer-export statuses are downstream:

$$
\texttt{observer-export-not-computed},
\qquad
\texttt{observer-export-failed},
\qquad
\texttt{observer-export-passed}.
$$

They may block a Lorentz, photon, mass-map, color, strong-field, or cosmology
claim, but they do not define the base neutral braid certificate.

---

## 6. Dependency Rows

Root ledger dependency: every dynamics, force, finite-mode, action, event,
stability, and observer-export row must consume the same all-pairs root ledger

$$
\mathcal{A}_{B}^{0}
=
\left\{
(i,j,\alpha,u,\eta_{ij,\alpha},J_{ij,\alpha}^{\nu})
:
i\ne j
\right\}
$$

with the same active, tail, and excluded statuses. A binary-specific ledger is
not a base neutral braid ledger unless it is shown to be the restriction of
$\mathcal{A}_{B}^{0}$ after a passed binary-partition row.

Finite-mode search dependency: the first executable target must use site labels
$i\in I$ and the all-pairs residual rows. A neutral finite-mode residual has the
form

$$
\mathcal{B}_{M,\mathrm{neutral}}^\nu(z_M)
=
\left(
R_{\mathrm{chart}},
R_{\mathrm{gauge}},
R_{\mathrm{unit}},
R_{\nu\mathrm{band}},
R_H,
R_{\mathrm{root}}^\nu,
R_{\mathrm{tail}}^\nu,
R_{\mathrm{force}}^\nu,
R_T^\nu,
R_N^\nu,
R_{\mathrm{action}}^\nu,
R_{\mathrm{Noeth}}^\nu,
R_{\mathrm{event}}^\nu,
R_{\mathrm{case}},
R_{\mathrm{export}}
\right).
$$

A solve over a binary-partition chart, a shell braid support chart, or a nested
shell braid radial chart is a case-reduction solve unless it also emits the
base rows above.

Action/Noether dependency: a base dynamics row is promotion-eligible only when
the same ledger supports a total action

$$
\mathcal{S}_{\mathrm{tot}}
=
\mathcal{S}_{\mathrm{car}}
+
\mathcal{S}_{\mathrm{hist}}
+
\mathcal{S}_{\mathrm{constraints}}
+
\mathcal{S}_{\mathrm{sea/event}},
$$

an action-derived scale or inertia operator, a work-one-form curl bound, and
Noether currents for time translation, spatial translation, rotation, charge,
and source provenance. A fitted $\Gamma_K$ alone gives a diagnostic row, not a
retained-branch row.

Observer-export dependency: a neutral braid branch may export Lorentz, photon,
mass-map, generation, color, strong-field, or cosmology rows only after the base
ledger, action/Noether row, event row, and retained-branch theorem target are
statused. Each export must then report `passed`, `failed`, or `not_computed` on
the same branch convention. No observer export can rescue a failed base
certificate.

Promotion decision: `priority-only`. The mathematical advance here is the
separation of the irreducible six-site neutral braid certificate from optional
binary partition, shell braid, and nested shell braid reductions. The next hard
blockers remain the all-pairs root ledger, the first neutral finite-mode search,
and the action/Noether row on the same ledger.
