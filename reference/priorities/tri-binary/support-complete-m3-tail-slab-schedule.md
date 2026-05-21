# Support-Complete $M=3$ Tail Slab Schedule

Promotion status: `priority-only`. This packet turns the exact-antipodal $M=3$ support-tail proof stack into an execution schedule. It sits between the formulas in [support-complete-m3-tail-interval-enclosures.md](support-complete-m3-tail-interval-enclosures.md), [support-complete-m3-tail-newton-certificate.md](support-complete-m3-tail-newton-certificate.md), [support-complete-m3-tail-margin-sensitivity.md](support-complete-m3-tail-margin-sensitivity.md), and the terminal ledger in [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md).

It does not retain a branch. Its job is narrower: every owned atomic support-tail cell must receive exactly one coefficient-box persistent terminal predicate, so the ledger can return either `tail-exclusion-restored` or `tail-root-sheet-assimilated` with $\rho_{\mathrm{tail}}>0$.

---

## 1. Tail Domain And Initial Split

The unresolved support tail is

$$
T_{\mathrm{tail}}
=
(4.5,\ 5.5211575250+m_\eta].
$$

The sampled $\eta_{\max}=5.0$ diagnostic from [support-complete-m3-tail-frontier-shrinkage.md](support-complete-m3-tail-frontier-shrinkage.md) gives an execution split, not a proof:

$$
T_{\mathrm{obs}}=(4.5,5.0],
\qquad
T_{\mathrm{deep}}=(5.0,5.5211575250+m_\eta].
$$

The schedule starts with the ordered list

$$
\mathcal{Q}^{(0)}
=
\left\{
T_{\mathrm{obs}},
T_{\mathrm{deep}}
\right\},
$$

then subdivides any failed cell until one terminal predicate passes or a regularity row fails. The observed/deep split is only a priority order for the queue: $T_{\mathrm{obs}}$ is tested first because the current rescore suggests it may be empty, while $T_{\mathrm{deep}}$ is treated by the same interval predicates.

---

## 2. Atomic Owned Cells

Let $I_n$ be a period-split receiver arclength cell:

$$
I_n
=
\left[
\lambda_n-\frac{h_K}{2},
\lambda_n+\frac{h_K}{2}
\right]
\pmod {L_*},
$$

split again whenever $I_n$ or $I_n-Q_q$ crosses a period cut. Let $Q_q=[a_q,b_q]$ be the closed arithmetic enclosure for an owned delay slab

$$
O_q=(a_q,b_q].
$$

For the first support-tail slab, $a_q=4.5$ and the left endpoint is not tail-owned:

$$
O_q=(4.5,b_q].
$$

An atomic cell is

$$
c=(i,j,n,q,s),
\qquad
\mathcal{Q}_c
=
I_{n,s}\times Q_{q,s}\times X_\alpha,
$$

where $(i,j)$ is an ordered source pair, $s$ records period-cut splitting, and $X_\alpha$ is the arclength-inverse coefficient box.

The owned cells must satisfy the disjoint accounting identity

$$
\bigsqcup_c
\left(
\{(i,j)\}\times I_{n,s}\times O_{q,s}
\right)
=
\Pi_{\mathrm{src}}\times [0,L_*)\times T_{\mathrm{tail}},
$$

where $\Pi_{\mathrm{src}}$ is the required ordered source-pair policy. Closed intervals $Q_{q,s}$ are used for interval arithmetic; the half-open owned sets $O_{q,s}$ are used only for root ownership and endpoint accounting.

---

## 3. Open-Left Memory Endpoint Row

The support tail is open at $\eta_{\mathrm{mem}}=4.5$. A root exactly at $\eta_{\mathrm{mem}}$ belongs to the active ledger $\mathcal{A}_{4.5}$, not to the tail ledger. The first slab therefore carries an explicit endpoint row:

$$
\mathsf{B}_{\mathrm{mem}}(i,j,n,s)
=
\left(
G(I_{n,s},4.5,X_\alpha),
J(I_{n,s},[4.5,4.5+\delta_{\mathrm{mem}}],X_\alpha),
\Pi_{\mathrm{end}}
\right).
$$

The endpoint row passes in either of two ways.

**Strict non-root endpoint.** If

$$
0\notin G(I_{n,s},4.5,X_\alpha)
$$

and the first collar has no sign crossing by one of the empty-cell predicates below, then the left endpoint creates no tail-owned root.

**Inherited active endpoint root.** If an active root sheet in $\mathcal{A}_{4.5}$ owns $G=0$ at $\eta=4.5$, first split $I_{n,s}$ into the endpoint-root tube and its complement. The complement must satisfy the strict non-root endpoint row above. On the endpoint-root tube, the tail side is certified by a one-sided monotone collar. With local coordinate $r=\eta-4.5\in(0,\delta_{\mathrm{mem}}]$ and a fixed sign $\zeta_{\mathrm{mem}}\in\{\pm1\}$, require

$$
\zeta_{\mathrm{mem}}J(I_{n,s},[4.5,4.5+\delta_{\mathrm{mem}}],X_\alpha)
\ge
J_{\mathrm{mem}}^->\epsilon_J.
$$

Since $G_\eta=-J$ and the endpoint sheet supplies $G(\lambda,4.5;\alpha)=0$ on the tube, $G$ has fixed nonzero sign for every $r>0$ in the collar. The endpoint root is copied from $\mathcal{A}_{4.5}$, the complement is gap-certified, and the collar is tail-empty. If the endpoint interval merely contains zero but no active endpoint sheet and complement split are emitted, the inherited row is unavailable. If neither row passes, the first slab status is

$$
\texttt{tail-boundary-convention-failed}.
$$

---

## 4. Terminal Predicate Cascade

Every atomic cell must terminate with exactly one selected predicate. The schedule applies the following cascade in order, because cheaper empty predicates should prevent unnecessary root-tube construction.

### 4.1 Distance Empty Cell

Let $D_c=[D_c^-,D_c^+]$ enclose the distance $r=\|\mathbf{R}\|$ on $\mathcal{Q}_c$. The distance predicate passes if

$$
D_c^+<a_q-\epsilon_G
\qquad
\text{or}
\qquad
D_c^->b_q+\epsilon_G.
$$

The margin is

$$
m_D(c)
=
\max
\left\{
a_q-D_c^+,
D_c^- - b_q
\right\}
-\epsilon_G.
$$

### 4.2 Monotone Endpoint Empty Cell

If

$$
0\notin J_c,
\qquad
J_c=J(I_{n,s},Q_{q,s},X_\alpha),
$$

and the endpoint intervals have the same strict sign,

$$
0\notin G(I_{n,s},a_q,X_\alpha),
\qquad
0\notin G(I_{n,s},b_q,X_\alpha),
$$

with

$$
\operatorname{sign}G(I_{n,s},a_q,X_\alpha)
=
\operatorname{sign}G(I_{n,s},b_q,X_\alpha),
$$

then no root lies in the owned slab. The monotone margin is

$$
m_M(c)
=
\min
\left\{
\operatorname{dist}(0,J_c),
\operatorname{dist}(0,G(I_{n,s},a_q,X_\alpha)),
\operatorname{dist}(0,G(I_{n,s},b_q,X_\alpha))
\right\}
-\epsilon_G.
$$

### 4.3 Lipschitz Empty Cell

Let $z_c=(\lambda_c,\eta_c)$ be the cell center and let

$$
|G(z)-G(z_c)|\le L_c\Delta_c
$$

on $I_{n,s}\times Q_{q,s}$. The Lipschitz predicate passes if

$$
|G(z_c;X_\alpha)|>L_c\Delta_c+\epsilon_G.
$$

The margin is

$$
m_L(c)
=
|G(z_c;X_\alpha)|-L_c\Delta_c-\epsilon_G.
$$

### 4.4 Newton Empty Cell

When $0\notin J(I_{n,s},Q_{q,s},X_\alpha)$, define

$$
N_{I,Q,X_\alpha}(\eta_c)
=
\eta_c+
\frac{G(I_{n,s},\eta_c,X_\alpha)}
{J(I_{n,s},Q_{q,s},X_\alpha)}.
$$

The Newton empty predicate passes if

$$
N_{I,Q,X_\alpha}(\eta_c)\cap Q_{q,s}=\varnothing.
$$

The selected margin is

$$
m_{\mathrm{Newt}}(c)
=
\operatorname{dist}
\left(
N_{I,Q,X_\alpha}(\eta_c),
Q_{q,s}
\right).
$$

### 4.5 Krawczyk Root Tube

If empty predicates fail, the cell may instead certify one root sheet. Choose a predictor $\eta_p(\lambda)$ and correction interval $Z=[-w,w]$:

$$
H(\lambda,z;\alpha)
=
G(\lambda,\eta_p(\lambda)+z;\alpha).
$$

With scalar preconditioner $C$, define

$$
K_Z(X_\alpha)
=
-C\,H(I_{n,s},0,X_\alpha)
+
\left(1+CJ_{I,Z}(X_\alpha)\right)Z.
$$

The tube predicate passes if

$$
K_Z(X_\alpha)\subset\operatorname{int}Z.
$$

It is terminal only when the fixed sign stratum, complement gap, and exact-antipodal mate also pass:

$$
m_{\mathrm{root}}(u)
=
\min
\left\{
J_u^- -\epsilon_J,
m_{\mathrm{Kraw}}(u),
g_u^{\mathrm{comp}}-\epsilon_G,
m_{\mathrm{anti}}(u)
\right\}
>e_{\mathrm{Kraw}}(u).
$$

If no empty predicate passes and no root tube passes, the cell status is

$$
\texttt{tail-cell-uncertified}.
$$

---

## 5. Coefficient-Box Score

For every selected empty predicate $p\in\{D,M,L,\mathrm{Newt}\}$, the schedule records

$$
E_p(c)=\frac{e_p(c)}{m_p(c)},
\qquad
\rho_p(c)
=
\frac{m_p(c)-e_p(c)}{L_{p,c}^{\alpha}},
$$

with $m_p(c)-e_p(c)>0$. For every selected root tube,

$$
E_{\mathrm{tube}}(u)
=
\frac{e_{\mathrm{Kraw}}(u)}{m_{\mathrm{root}}(u)},
\qquad
\rho_{\mathrm{tube}}(u)
=
\frac{m_{\mathrm{root}}(u)-e_{\mathrm{Kraw}}(u)}
{L_{\mathrm{Kraw},u}^{\alpha}}.
$$

The tail execution score is

$$
E_{\mathrm{tail}}
=
\max
\left\{
E_p(c),
E_{\mathrm{tube}}(u)
\right\},
$$

and the coefficient-box tail radius is

$$
\rho_{\mathrm{tail}}
=
\min
\left\{
\rho_p(c),
\rho_{\mathrm{tube}}(u)
\right\}.
$$

The row is proof-budget eligible only when

$$
E_{\mathrm{tail}}<1,
\qquad
\rho_{\mathrm{tail}}>0,
\qquad
\operatorname{persist}(\mathsf{L}_{\mathrm{tail}})
=
\texttt{coefficient-box}.
$$

---

## 6. Exact-Antipodal Pairing

Let $\iota$ be the exact-antipodal mate map on ordered source-pair and receiver cells. The schedule may compute only one representative cell per orbit, but the execution ledger must still emit both labels:

$$
c^\iota=(i^\iota,j^\iota,n^\iota,q,s^\iota).
$$

A representative predicate copies to the mate only if

$$
G_{c^\iota}=G_c,
\qquad
J_{c^\iota}=J_c,
\qquad
m_{c^\iota}=m_c,
\qquad
e_{c^\iota}=e_c,
\qquad
L_{c^\iota}^{\alpha}=L_c^{\alpha}
$$

under the same endpoint ownership, period split, source-pair policy, and coefficient-box inflation. Otherwise the mate cell is not certified by compression and must be scheduled independently.

---

## 7. Slab Schedule Theorem Target

**Theorem target: coefficient-box support-tail schedule.** Fix the exact-antipodal $M=3$ coefficient vector, coefficient box $X_\alpha$, source-pair policy $\Pi_{\mathrm{src}}$, endpoint policy $\Pi_{\mathrm{end}}$, and tail interval $T_{\mathrm{tail}}$. Suppose the schedule emits a finite family of owned cells satisfying the accounting identity above. Suppose every first-slab boundary row passes, every atomic cell has exactly one terminal predicate, all selected margins dominate their certified errors, all sensitivity radii are positive, and every exact-antipodal compression copy satisfies the equality rows in Section 6. Then the support-tail execution ledger is complete on $T_{\mathrm{tail}}$.

If no Krawczyk root tubes are selected, then

$$
\mathcal{A}_{\eta}^{+}=\mathcal{A}_{4.5},
\qquad
\epsilon_{\mathcal{F}}^{\mathrm{tail}}=0,
\qquad
\texttt{tail-exclusion-restored}.
$$

If one or more Krawczyk root tubes are selected, then those tubes define differentiable tail root sheets over their owned receiver cells, and the next status is

$$
\texttt{tail-root-sheet-assimilated},
$$

with force, $\Gamma$, curl, action, Krawczyk, and cokernel rows recomputed from $\mathcal{A}_{\eta}^{+}$.

Proof route:

1. the disjoint owned-cell identity covers every required delay in $T_{\mathrm{tail}}$ exactly once;
2. the open-left endpoint row prevents roots at $\eta=4.5$ from being double-counted as tail roots;
3. each empty predicate excludes $G=0$ on its owned cell by interval containment, monotonicity, Lipschitz domination, or Newton disjointness;
4. each Krawczyk predicate gives exactly one root sheet over the receiver cell and a fixed $J$ sign stratum;
5. positive margin/error and positive coefficient sensitivity radii preserve all predicates on $X_\alpha$;
6. exact-antipodal pairing is a certified equality of interval objects, not an inferred visual symmetry.

---

## 8. Output Schema

A slab schedule run must emit:

| Field | Payload |
| --- | --- |
| `tail_split` | $T_{\mathrm{obs}}$, $T_{\mathrm{deep}}$, and final delay slabs $O_q$ |
| `owned_cells` | ordered list of $(i,j,n,q,s)$ cells and exact-antipodal mate labels |
| `boundary_rows` | endpoint ownership, active endpoint matches, and one-sided collar margins |
| `terminal_predicates` | exactly one selected predicate per atomic cell |
| `selected_margins` | $m_p(c)$, $e_p(c)$, $L_{p,c}^{\alpha}$, $E_p(c)$, and $\rho_p(c)$ |
| `root_tubes` | predictor, $Z$, $K_Z$, fixed $J$ sign stratum, complement gap, and mate row |
| `tail_score` | $E_{\mathrm{tail}}$, $\rho_{\mathrm{tail}}$, limiting cell, and limiting predicate |
| `ledger_status` | `tail-exclusion-restored`, `tail-root-sheet-assimilated`, or first failed row |

---

## 9. Current $M=3$ Reading

No slab schedule has been emitted for the current $\rho=0.8$ exact-antipodal $M=3$ row. The current status remains

$$
\texttt{active-window-only},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{not-retained}.
$$

This is now the immediate mathematical execution target. Event normal forms, action/cokernel rows, and stability rows do not reduce the first uncertainty until this schedule returns a coefficient-box persistent tail status with $\rho_{\mathrm{tail}}>0$.
