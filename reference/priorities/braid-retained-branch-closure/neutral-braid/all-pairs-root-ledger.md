# All-Pairs Root Ledger

Promotion status: `partially-promoted`. The all-pairs source-pair policy, the $|\Pi_{\mathrm{all}}|=30$ count, and the rule that $3$ attractive / $2$ repellent source-site inventory does not compress the force ledger were promoted into [Noether Braid](../../../../content/markdown/aaa/noether-braid/noether-braid.md) as theorem-target language. This packet still supplies the priority-side causal-root and Jacobian-floor ledger for a general six-site neutral braid. It is the first hard blocker for the downstream dynamics, action, event, support, and observer-export rows: those rows may not claim closure from a partitioned, paired, or symmetry-compressed root list unless this all-pairs ledger has first emitted an explicit reduction row.

This packet refines [Neutral Braid Model](neutral-braid-model.md), [Braid](../braid-retained-branch-closure.md), and [bounded-speed-factor-root-sheet-certificate.md](../shell-braid/bounded-speed-factor-root-sheet-certificate.md). Promoted claim level: `theorem-target`. Remaining blocker: `all-pairs-root-ledger-open` until active, inactive, and tail cells are interval-certified or assimilated on one ledger.

---

## 1. Scope And Status

The ordered source-pair policy is

$$
\Pi_{\mathrm{all}}
=
\{(i,j)\in I\times I:i\ne j\},
\qquad
I=\{1,\ldots,6\}.
$$

Thus

$$
|\Pi_{\mathrm{all}}|=30.
$$

No binary partition, antipodal pairing, shell braid support band, nested shell braid radial order, or exact phase relation is part of this base ledger. If a later packet declares any of those reductions, it must prove that its compressed root rows are the image of this ordered-pair ledger under the declared equality rows.

The ledger input is a neutral braid branch chart

$$
\mathfrak{K}_{\nu}
=
\left(
I,\sigma,\mathbf{Y},\nu,\mathcal{D}_{\mathrm{supp}},
\mathcal{A}_{\nu},
\mathsf{Action}^{\nu},
\mathsf{Event}^{\nu},
\mathsf{Inventory}
\right),
$$

with three positive and three negative architrinos, arclength curves $\mathbf{Y}_i$, bounded speed factors $\nu_i$, causal-time maps $\chi_i$, inverses $\Lambda_i$, and physical periods $H_i$. The ledger output is a finite root inventory over every $(i,j)\in\Pi_{\mathrm{all}}$ and every receiver causal-time cell used by the solver.

The current status is

$$
\texttt{all-pairs-root-ledger-open}.
$$

The target certified status is

$$
\texttt{all-pairs-root-ledger-certified}.
$$

A solver may instead emit a first failure status from Section 6. A branch is not retained by this packet alone.

---

## 2. Ordered-Pair Root Equations

For each receiver site $i$ and source site $j\ne i$, define the causal-time trajectories

$$
\mathbf{x}_i(u)
=
\mathbf{Y}_i(\Lambda_i(u)),
\qquad
\mathbf{x}_j(u-\eta)
=
\mathbf{Y}_j(\Lambda_j(u-\eta)),
$$

using the declared equal-period or winding-period convention for the periodic extension of $\Lambda_j$. A retained delayed hit for the ordered pair $(i,j)$ is a positive delay $\eta>0$ solving

$$
G_{ij}^{\nu}(u,\eta)
=
\left\|
\mathbf{Y}_i(\Lambda_i(u))
-
\mathbf{Y}_j(\Lambda_j(u-\eta))
\right\|
-\eta
=0.
$$

For a root label $\alpha$, write

$$
\eta_{ij,\alpha}(u)>0,
\qquad
G_{ij}^{\nu}(u,\eta_{ij,\alpha}(u))=0.
$$

The delayed phases and separation data are

$$
\lambda_i=\Lambda_i(u),
\qquad
\lambda_j^-=\Lambda_j(u-\eta_{ij,\alpha}(u)),
$$

$$
\mathbf{R}_{ij,\alpha}(u)
=
\mathbf{Y}_i(\lambda_i)-\mathbf{Y}_j(\lambda_j^-),
\qquad
\widehat{\mathbf{R}}_{ij,\alpha}(u)
=
\frac{\mathbf{R}_{ij,\alpha}(u)}
{\eta_{ij,\alpha}(u)}.
$$

The force row consumed by dynamics must be built from the same ordered-pair root labels:

$$
F_{i,\mathrm{pair}}^\nu(u)
=
\sum_{j\ne i}
\sum_{\alpha\in\mathcal{A}_{ij}^{\nu}(u)}
\sigma_i\sigma_j
\frac{\widehat{\mathbf{R}}_{ij,\alpha}(u)}
{\eta_{ij,\alpha}(u)^2
\left|J_{ij,\alpha}^{\nu}(u)\right|}.
$$

The all-pairs ledger therefore records the structural inventory

$$
N_{\mathrm{attr},i}=3,
\qquad
N_{\mathrm{rep},i}=2,
$$

but it does not compress the force sum by that inventory. The signed counts are diagnostics; the source rows remain all $30$ ordered pairs.

A resolved root row is only a force-ledger input. It does not by itself close the fixed-speed force equation. The overread status `closed-rejected:resolved-root-rows-imply-fixed-speed-force-closure` records the rejected implication that resolved causal-root rows with positive Jacobian data alone force $\mathcal{R}_{\mathrm{tan}}=0$.

Same-source roots are outside $\Pi_{\mathrm{all}}$ in this packet. If a later branch uses same-source self-hit rows, it must attach a separate same-source policy and must still keep the $i\ne j$ all-pairs ledger unchanged.

---

## 3. Active And Inactive Root Sets

Let $\mathcal{U}$ be the solver's finite receiver-time cell cover. Let $h_{\mathrm{mem}}>0$ be the declared active memory depth. For each ordered pair and receiver time $u$, define the active root set

$$
\mathcal{A}_{ij}^{\nu}(u;h_{\mathrm{mem}})
=
\left\{
\alpha:
0<\eta_{ij,\alpha}(u)\le h_{\mathrm{mem}},
\quad
G_{ij}^{\nu}(u,\eta_{ij,\alpha}(u))=0,
\quad
\alpha\ \text{is isolated}
\right\}.
$$

The full active ledger is

$$
\mathcal{A}_{\mathrm{all}}^{\nu}(h_{\mathrm{mem}})
=
\left\{
(i,j,\alpha,u,\eta_{ij,\alpha}(u)):
(i,j)\in\Pi_{\mathrm{all}},
\alpha\in\mathcal{A}_{ij}^{\nu}(u;h_{\mathrm{mem}})
\right\}.
$$

Inactive root sets are not omitted roots. They are certified root-free cells. For an owned cell

$$
c=(i,j,U_n,Q_q,s),
\qquad
U_n\subset \mathcal{U},
\qquad
Q_q\subset(0,h_{\mathrm{mem}}],
$$

the inactive predicate is one of the following certified statements:

| Predicate | Certified statement |
| --- | --- |
| `distance-gap` | $\operatorname{dist}(G_{ij}^{\nu}(U_n,Q_q),0)>0$ by interval distance enclosure |
| `same-sign-endpoints` | endpoint intervals for $G_{ij}^{\nu}$ have the same strict sign and $0\notin J_{ij}^{\nu}(U_n,Q_q)$ |
| `lipschitz-empty` | a cell-center gap dominates the certified Lipschitz radius |
| `newton-disjoint` | a Newton or Krawczyk image is disjoint from the owned delay cell |
| `owned-by-active-root` | the cell is inside a retained root tube and its complement is gap-certified |

Root completeness on the active window is the disjoint accounting identity

$$
\bigsqcup_{\alpha\in\mathcal{A}_{ij}^{\nu}}
\mathsf{Tube}_{ij,\alpha}
\ \sqcup\
\bigsqcup_{\beta\in\mathcal{I}_{ij}^{\nu}}
\mathsf{Gap}_{ij,\beta}
=
\{(i,j)\}\times \mathcal{U}\times(0,h_{\mathrm{mem}}],
$$

for every $(i,j)\in\Pi_{\mathrm{all}}$. Here $\mathcal{I}_{ij}^{\nu}$ is the finite inactive-gap list. The identity is a proof obligation, not a display convention: overlapping root tubes, uncovered delay cells, or unowned endpoint roots are first hard failures.

A support-complete memory depth may be obtained in either of two ways. If the support descriptor gives

$$
\eta_{\mathrm{sup}}
=
\sup_{(i,j)\in\Pi_{\mathrm{all}},\,u,v}
\left\|
\mathbf{x}_i(u)-\mathbf{x}_j(v)
\right\|
<\infty,
$$

then delays $\eta>\eta_{\mathrm{sup}}$ cannot solve $G_{ij}^{\nu}=0$. A memory depth with

$$
h_{\mathrm{mem}}\ge \eta_{\mathrm{sup}}
$$

is support-complete after the active-window identity passes. If

$$
h_{\mathrm{mem}}<\eta_{\mathrm{sup}},
$$

then the tail interface in Section 5 must certify or assimilate the remaining interval

$$
T_{\mathrm{tail}}
=
(h_{\mathrm{mem}},\eta_{\mathrm{sup}}].
$$

Until one of these two routes passes, downstream rows must read

$$
\texttt{support-complete-memory-open}.
$$

---

## 4. Jacobian Floor And Continuation Row

At an active root, define

$$
\mathbf{T}_i=\mathbf{Y}_i'(\lambda_i),
\qquad
\mathbf{T}_j^-=\mathbf{Y}_j'(\lambda_j^-),
\qquad
\nu_j^-=\nu_j(\lambda_j^-).
$$

The bounded-speed Jacobian is

$$
J_{ij,\alpha}^{\nu}(u)
=
1-\nu_j^-\mathbf{T}_j^-\cdot
\widehat{\mathbf{R}}_{ij,\alpha}(u).
$$

Each active root label must declare a fixed sign stratum

$$
\zeta_{ij,\alpha}\in\{+1,-1\},
$$

and a positive floor

$$
\zeta_{ij,\alpha}
J_{ij,\alpha}^{\nu}(u)
\ge
J_0
>0
$$

on its owned receiver cell. Equivalently,

$$
J_{\min}^{\nu}
=
\inf_{(i,j,\alpha,u)\in\mathcal{A}_{\mathrm{all}}^{\nu}}
\left|J_{ij,\alpha}^{\nu}(u)\right|
\ge
J_0.
$$

The Jacobian residual is

$$
\mathcal{R}_{\mathrm{Jac}}^{\nu}
=
\frac{\epsilon_J}{J_{\min}^{\nu}}.
$$

On a fixed sign stratum, the implicit-function row gives a differentiable root sheet with

$$
\frac{d\eta_{ij,\alpha}}{du}
=
\frac{
\widehat{\mathbf{R}}_{ij,\alpha}\cdot
\left(
\nu_i\mathbf{T}_i-\nu_j^-\mathbf{T}_j^-
\right)
}{
J_{ij,\alpha}^{\nu}
}.
$$

Thus the continuation row is

$$
\mathsf{IFT}_{ij,\alpha}^{\nu}
=
\left(
G_{ij}^{\nu}=0,
\zeta_{ij,\alpha}J_{ij,\alpha}^{\nu}\ge J_0,
\frac{d\eta_{ij,\alpha}}{du},
\rho_{\mathrm{root},ij,\alpha}^{\nu},
\mathrm{owner}_{ij,\alpha}
\right).
$$

Here $\rho_{\mathrm{root},ij,\alpha}^{\nu}>0$ is the coefficient-box persistence radius over which the same ordered pair, root label, sign stratum, delay ownership, and endpoint convention remain valid. A continuation step may preserve a root label only while the root stays isolated, remains inside its declared memory convention, and keeps the Jacobian floor. Root-count changes are branch events, not Newton drift inside one chart.

Any dynamics, action, Noether, support, event, or observer-export row that evaluates with a different root label set must return

$$
\texttt{ledger-rerun-required}.
$$

---

## 5. Tail Exclusion Or Assimilation Interface

If $h_{\mathrm{mem}}<\eta_{\mathrm{sup}}$, the tail cover must use the same ordered-pair policy:

$$
\Pi_{\mathrm{src}}=\Pi_{\mathrm{all}},
\qquad
T_{\mathrm{tail}}=(h_{\mathrm{mem}},\eta_{\mathrm{sup}}].
$$

An owned tail cell has the form

$$
c=(i,j,U_n,Q_q,s),
\qquad
(i,j)\in\Pi_{\mathrm{all}},
\qquad
Q_q\subset T_{\mathrm{tail}}.
$$

The tail cells must satisfy

$$
\bigsqcup_c
\left(
\{(i,j)\}\times U_n\times O_q
\right)
=
\Pi_{\mathrm{all}}\times\mathcal{U}\times T_{\mathrm{tail}},
$$

where $O_q$ is the half-open owned delay set associated with the closed interval $Q_q$ used for interval arithmetic.

The memory endpoint row prevents double counting at $\eta=h_{\mathrm{mem}}$. If a root exactly at $h_{\mathrm{mem}}$ belongs to the active ledger, the tail side must carry a one-sided collar with fixed Jacobian sign:

$$
\zeta_{\mathrm{mem}}
J_{ij}^{\nu}(U_n,[h_{\mathrm{mem}},h_{\mathrm{mem}}+\delta_{\mathrm{mem}}])
\ge
J_{\mathrm{mem}}^-
>
\epsilon_J.
$$

Every tail cell must terminate with exactly one selected predicate:

| Tail predicate | Outcome |
| --- | --- |
| `distance-empty` | $G_{ij}^{\nu}=0$ is excluded by distance-delay separation |
| `monotone-empty` | $0\notin J_{ij}^{\nu}$ and endpoint signs exclude a crossing |
| `lipschitz-empty` | an interval gap dominates the certified variation bound |
| `newton-empty` | Newton or Krawczyk data exclude a root in the owned cell |
| `krawczyk-root-tube` | exactly one isolated root sheet is certified in the owned cell |

If every tail cell is empty, then

$$
\mathcal{A}_{\mathrm{all}}^{\nu,+}
=
\mathcal{A}_{\mathrm{all}}^{\nu}(h_{\mathrm{mem}}),
\qquad
\epsilon_{\mathcal{F}}^{\mathrm{tail}}=0,
\qquad
\texttt{tail-exclusion-restored}.
$$

If any `krawczyk-root-tube` predicate is selected, the discovered tail sheets are assimilated:

$$
\mathcal{A}_{\mathrm{all}}^{\nu,+}
=
\mathcal{A}_{\mathrm{all}}^{\nu}(h_{\mathrm{mem}})
\cup
\mathcal{A}_{\mathrm{tail}}^{\nu},
$$

and the solver must rerun force, dynamics, support, action, event, Krawczyk, and observer-export rows on $\mathcal{A}_{\mathrm{all}}^{\nu,+}$. The immediate status is

$$
\texttt{tail-root-sheet-assimilated-rerun-required}.
$$

If a tail cell is neither excluded nor assimilated, the ledger status is

$$
\texttt{tail-interval-uncertified}.
$$

---

## 6. Event And Failure Classifications

The root ledger classifies failures before any downstream row may interpret them as physics. The first hard failure is recorded as the ledger status; later diagnostic failures may be included as secondary evidence.

| Status | Trigger |
| --- | --- |
| `all-pairs-root-ledger-open` | no complete ledger has been emitted |
| `ordered-pair-policy-mismatch` | fewer than the $30$ ordered pairs in $\Pi_{\mathrm{all}}$ are covered, or a binary partition is used as the base source policy |
| `root-residual-failed` | a retained root label does not satisfy $G_{ij}^{\nu}=0$ within tolerance or interval proof |
| `root-tube-overlap` | two retained root tubes overlap without an ordering or event row |
| `inactive-gap-uncertified` | a gap cell has no certified root-free predicate |
| `memory-window-exit` | a retained active root leaves $(0,h_{\mathrm{mem}}]$ under the declared memory convention |
| `memory-window-reset` | $h_{\mathrm{mem}}$ is changed, so force, dynamics, action, event, and export rows must be recomputed |
| `support-complete-memory-open` | $h_{\mathrm{mem}}$ is not support-complete and the tail is not certified |
| `jacobian-floor-failed` | $J_{\min}^{\nu}\le\epsilon_J$ on an active root label |
| `jacobian-sign-open` | a root label lacks a fixed sign stratum |
| `root-fold-event` | $G_{ij}^{\nu}=0$ and $J_{ij}^{\nu}=0$ on an event surface |
| `root-label-collision` | two root labels meet or exchange order without a declared event/reset row |
| `delay-floor-collision` | $\eta_{ij,\alpha}\downarrow0$ or the noncollision floor fails for $i\ne j$ |
| `tail-boundary-convention-failed` | an endpoint root at $h_{\mathrm{mem}}$ is neither active-owned nor one-sided tail-excluded |
| `tail-exclusion-restored` | all tail cells are certified empty |
| `tail-root-sheet-assimilated-rerun-required` | one or more tail root sheets are certified and added to the root ledger |
| `tail-force-error-unbounded` | unresolved tail roots prevent a finite omitted-force envelope |
| `ledger-rerun-required` | a downstream row uses a stale or different root, endpoint, support, or tail convention |
| `optional-reduction-not-certified` | a binary, shell braid, or nested shell braid compression is claimed without equality rows from the all-pairs ledger |
| `all-pairs-root-ledger-certified` | active roots, inactive gaps, Jacobian floors, memory depth, and tail status close on one ordered-pair policy |

First-event surfaces that terminate continuation are

| Event surface | Equation or condition |
| --- | --- |
| root fold | $G_{ij}^{\nu}=0$ and $J_{ij}^{\nu}=0$ |
| root-label collision | $\eta_{ij,\alpha}=\eta_{ij,\beta}$ with unresolved ownership |
| memory boundary | $\eta_{ij,\alpha}=h_{\mathrm{mem}}$ |
| support-complete boundary | $h_{\mathrm{mem}}=\eta_{\mathrm{sup}}$ loses its support proof |
| tail event | a tail cell switches from excluded to assimilated or uncertified |
| delay floor | $\eta_{ij,\alpha}=0$ for $i\ne j$ |
| speed-band event | $\min\nu_i=\nu_-$ or $\max\nu_i=\nu_+$ changes the clock chart |
| period event | equal-period or winding-period row leaves tolerance |

At a first event, the correct outcome is a ledger reset or a new candidate branch label. It is not a retained-branch claim.

---

## 7. Solver Payload Schema

A solver emitting this ledger must return a structured payload with the following fields.

| Field | Payload |
| --- | --- |
| `ledger_id` | branch label, coefficient box, solver version, and timestamp |
| `promotion_status` | `priority-only` |
| `pair_policy` | $\Pi_{\mathrm{all}}$, cardinality $30$, and explicit exclusion of mandatory binary partition |
| `neutral_inventory` | $I$, $\sigma_i$, three positive and three negative architrinos, $Q_{\mathrm{core}}=0$ |
| `clock_maps` | $\chi_i$, $\Lambda_i$, $H_i$, equal-period or winding-period convention, speed-band margins |
| `support_memory` | $\eta_{\mathrm{sup}}$, $h_{\mathrm{mem}}$, support-complete-memory route, and memory endpoint policy |
| `receiver_cells` | finite causal-time cover $\mathcal{U}$, endpoint convention, and period-cut splitting |
| `active_roots` | one entry per $(i,j,\alpha,U_n)$ with bracket, delay bounds, $G$ residual, root owner, and force-used flag |
| `inactive_gaps` | finite root-free cell list with selected predicate and certified margin |
| `jacobian_floor` | $J_{ij,\alpha}^{\nu}$, sign label $\zeta_{ij,\alpha}$, local floor, $J_{\min}^{\nu}$, and $\mathcal{R}_{\mathrm{Jac}}^{\nu}$ |
| `sheet_continuation` | $d\eta_{ij,\alpha}/du$, coefficient-box persistence radius $\rho_{\mathrm{root}}^{\nu}$, and continuation ownership |
| `force_ledger` | all-pairs force sum, attraction/repulsion diagnostics, and consumer checksum for dynamics/action/event rows |
| `tail_interface` | tail domain, owned cells, endpoint rows, terminal predicates, tail roots if any, $\epsilon_{\mathcal{F}}^{\mathrm{tail}}$, and tail status |
| `event_classification` | first event surface, first hard failure, secondary diagnostics, and reset instruction |
| `optional_reductions` | binary, shell braid, nested shell braid, or exact-antipodal compression status; `not_claimed` is allowed |
| `downstream_contract` | list of rows required to consume this exact ledger: dynamics, support, action, Noether, event, stability, observer export |
| `status` | `all-pairs-root-ledger-certified` or first failed row |

The payload is accepted only if every downstream checksum points to the same $\mathcal{A}_{\mathrm{all}}^{\nu,+}$, the same inactive-gap cover, the same Jacobian floor, and the same memory/tail convention.

---

## 8. Theorem Target

**Theorem target: all-pairs causal-root ledger completeness.** Fix a neutral braid branch chart $\mathfrak{K}_{\nu}$, ordered source-pair policy $\Pi_{\mathrm{all}}$, receiver-time cover $\mathcal{U}$, memory depth $h_{\mathrm{mem}}$, support descriptor with finite $\eta_{\mathrm{sup}}$, and coefficient box $X$. Suppose the solver emits:

1. a disjoint active-root and inactive-gap cover of $\Pi_{\mathrm{all}}\times\mathcal{U}\times(0,h_{\mathrm{mem}}]$;
2. one positive-delay, isolated root sheet for every retained active root label;
3. a fixed Jacobian sign stratum and positive floor for every active root label;
4. a positive coefficient-box persistence radius for every active root sheet and every inactive predicate;
5. either $h_{\mathrm{mem}}\ge\eta_{\mathrm{sup}}$ or a tail cover on $(h_{\mathrm{mem}},\eta_{\mathrm{sup}}]$ whose cells are all excluded or assimilated;
6. a rerun instruction whenever assimilation changes $\mathcal{A}_{\mathrm{all}}^{\nu}$;
7. no downstream consumer using a different root, endpoint, support, or tail convention.

Then the ledger is support-complete for the general six-site neutral braid on $X$. The dynamics, support, action, event, and observer-export rows may consume the emitted root set only under the same ledger checksum. Any optional binary, shell braid, or nested shell braid reduction is a later equality-row theorem, not a premise of this all-pairs ledger.
