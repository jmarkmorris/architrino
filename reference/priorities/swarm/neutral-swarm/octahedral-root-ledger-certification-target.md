# Octahedral Root-Ledger Certification Target

Promotion status: `priority-only`. This packet turns the sampled causal-root diagnostic for the rigid octahedral carrier in [octahedral-carrier-worked-example.md](../shell-swarm/octahedral-carrier-worked-example.md) into a narrow proof target for the certified all-pairs ledger in [all-pairs-root-ledger.md](all-pairs-root-ledger.md).

It does not retain a branch, does not promote material into `content/markdown/aaa`, and does not override the rigid carrier's neutral tangential-residual failure. Its only success condition is a certified all-pairs root ledger for this fixed Noether swarm seed. Dynamics, action, Noether, stability, shell swarm, and nested shell swarm rows remain separate downstream obligations.

---

## 1. Fixed Carrier Input

Use the rigid octahedral representative

$$
\begin{aligned}
\mathbf{p}_1(\theta)&=(\cos\theta,\sin\theta,0),\\
\mathbf{p}_2(\theta)&=(0,\cos\theta,\sin\theta),\\
\mathbf{p}_3(\theta)&=(\sin\theta,0,\cos\theta),
\end{aligned}
$$

with six sites

$$
\mathbf{x}_{a,\sigma}(\theta)
=
\sigma R\mathbf{p}_a(\theta),
\qquad
a\in\{1,2,3\},
\qquad
\sigma\in\{+1,-1\}.
$$

The neutral swarm polarity row is

$$
q_{a,+}=+\epsilon,
\qquad
q_{a,-}=-\epsilon.
$$

The ordered all-pairs source policy is

$$
\Pi_{\mathrm{all}}^{\mathrm{oct}}
=
\{
((a,\sigma),(b,\sigma')) :
(a,\sigma)\ne(b,\sigma')
\},
$$

so

$$
|\Pi_{\mathrm{all}}^{\mathrm{oct}}|=30.
$$

Same-source roots are not part of this packet. The excluded $y=0$ same-source tangent limit from the worked example remains outside $\Pi_{\mathrm{all}}^{\mathrm{oct}}$ unless a later event row declares and accounts for a same-source or fold-layer policy.

For an ordered pair $i=(a,\sigma)$ and $j=(b,\sigma')$, the dimensionless delay is

$$
y=\frac{c_f(t-s)}{R}=\theta-\theta^-,
$$

and the rigid root equation is

$$
G_{ij}(\theta,y)
=
\left\|
\sigma\mathbf{p}_a(\theta)
-
\sigma'\mathbf{p}_b(\theta-y)
\right\|
-y
=0.
$$

Every positive root satisfies

$$
0<y\le2
$$

because the dimensionless separation of two sites on the support sphere is at most $2$.

---

## 2. Sampled Diagnostic Versus Certified Ledger

The worked example reports sampled diagnostic success for the root row:

| Diagnostic row | Sampled result |
| --- | --- |
| Antipodal partner root | one positive root $y_*\approx1.4781702664$ |
| Cross-binary root count | exactly one root per ordered pair and sampled $\theta$ |
| Cross-binary sampled delay range | $0.6367346708\le y\le1.9793201188$ |
| Minimum sampled cross-root Jacobian | $J_{\min,\mathrm{cross}}\approx0.7284199113$ |

These rows are not a certificate. They are nodewise floating-point evidence that the root count, delay range, and Jacobian floor are plausible for this rigid carrier. A certified ledger must replace the sampled statements by interval statements on a finite cover of the full phase period and the full delay window.

Until that replacement is emitted, the status remains

$$
\texttt{all-pairs-root-ledger-open}.
$$

The sampled diagnostic may seed brackets and cell choices, but no dynamics, action, Noether, event, stability, observer-export, shell swarm, or nested shell swarm row may consume it as a retained active-root ledger.

---

## 3. Interval Theta Cells

The certification cover is a finite owned phase cover

$$
\mathcal{T}_{\theta}
=
\{\Theta_n\}_{n=1}^{N_\theta},
\qquad
\Theta_n=[\theta_n^-,\theta_n^+],
$$

with half-open ownership chosen so that

$$
\bigsqcup_{n=1}^{N_\theta}\Theta_n
=
[0,2\pi).
$$

Interval arithmetic may use closed endpoint enclosures, but the ledger must state which cell owns each period-cut endpoint. A sampled phase node $\theta_n$ does not certify the interval cell $\Theta_n$.

For every

$$
(i,j)\in\Pi_{\mathrm{all}}^{\mathrm{oct}},
\qquad
\Theta_n\in\mathcal{T}_{\theta},
$$

the certificate must own the full delay slab

$$
\{(i,j)\}\times\Theta_n\times(0,2].
$$

The active-root tube and inactive-gap rows must satisfy the disjoint accounting identity

$$
\mathsf{Tube}_{ij,n}
\ \sqcup\
\bigsqcup_{\beta}
\mathsf{Gap}_{ij,n,\beta}
=
\{(i,j)\}\times\Theta_n\times(0,2].
$$

This identity is the interval lift from sampled diagnostic evidence to the all-pairs root ledger. Missing cells, overlapping tubes, unowned endpoints, or delay intervals not assigned to either an active tube or inactive gap are hard failures.

---

## 4. Certification Obligations

The certified octahedral root ledger must emit the following rows on one ledger identity.

| Row | Required certificate |
| --- | --- |
| Pair-policy checksum | $\Pi_{\mathrm{all}}^{\mathrm{oct}}$ has $30$ ordered pairs, each receiver has $5$ incoming source rows, each source has $5$ receiver rows, there are $6$ ordered antipodal-partner rows, $24$ ordered cross-binary rows, and $0$ same-source rows |
| Interval theta cells | $\mathcal{T}_{\theta}$ covers $[0,2\pi)$ with declared endpoint ownership and no unowned period-cut cell |
| Root uniqueness per ordered pair | for every $(i,j,\Theta_n)$ there is exactly one active positive-delay root tube in $(0,2]$ |
| Root residual | the active tube satisfies $G_{ij}(\theta,y_{ij,n}(\theta))=0$ by interval Newton, Krawczyk, or an equivalent interval proof |
| Delay bounds | every active tube has certified bounds $0<y_0\le y_{ij,n}(\theta)\le y_1<2$ on its owned cell, or else the endpoint cell at $y=2$ is explicitly owned and statused |
| Jacobian floor | every active tube has a fixed sign stratum $\zeta_{ij,n}\in\{+1,-1\}$ and $\zeta_{ij,n}J_{ij,n}(\theta)\ge J_0>0$ |
| Inactive gap exclusion | every complement cell in $(0,2]$ carries one of the inactive predicates allowed by [all-pairs-root-ledger.md](all-pairs-root-ledger.md): `distance-gap`, `same-sign-endpoints`, `lipschitz-empty`, `newton-disjoint`, or `owned-by-active-root` |
| Ledger consumer checksum | every downstream consumer records the same pair policy, theta-cell cover, active-root labels, inactive-gap cover, delay bounds, Jacobian floor, endpoint convention, and same-source policy |

For the Jacobian row, define

$$
\mathbf{R}_{ij}(\theta,y)
=
\sigma\mathbf{p}_a(\theta)
-
\sigma'\mathbf{p}_b(\theta-y),
\qquad
\widehat{\mathbf{R}}_{ij}
=
\frac{\mathbf{R}_{ij}}{y},
$$

and

$$
\mathbf{T}_{j}^{-}(\theta,y)
=
\frac{d}{d\theta}
\left[
\sigma'\mathbf{p}_b(\theta-y)
\right].
$$

The fixed-speed Jacobian consumed by this packet is

$$
J_{ij}(\theta,y)
=
1-\mathbf{T}_{j}^{-}(\theta,y)\cdot\widehat{\mathbf{R}}_{ij}(\theta,y).
$$

The global floor exported to the all-pairs ledger is

$$
J_{\min}^{\mathrm{oct}}
=
\inf_{(i,j,n,\theta)}
\left|J_{ij}(\theta,y_{ij,n}(\theta))\right|
\ge J_0>0.
$$

The pair-policy checksum is accepted only if

$$
\mathsf{Chk}_{\Pi}
=
\left(
|I|,
|\Pi_{\mathrm{all}}^{\mathrm{oct}}|,
\{d_i^{\mathrm{recv}}\}_{i\in I},
\{d_i^{\mathrm{src}}\}_{i\in I},
N_{\mathrm{partner}},
N_{\mathrm{cross}},
N_{\mathrm{same}}
\right)
=
\left(
6,
30,
\{5\}_{i\in I},
\{5\}_{i\in I},
6,
24,
0
\right).
$$

A symmetry-compressed partner/cross table, an unordered-pair table, or a shell swarm case table may be useful as a diagnostic, but it is not this all-pairs checksum.

---

## 5. First-Failure Statuses

The certification attempt must stop at the first applicable status in this order.

| Status | First failing condition |
| --- | --- |
| `all-pairs-root-ledger-open` | only sampled nodes, floating brackets, or an incomplete interval cover have been emitted |
| `ordered-pair-policy-mismatch` | the pair-policy checksum is not $(6,30,\{5\},\{5\},6,24,0)$, or a binary, shell swarm, or nested shell swarm compression is used as the base ledger |
| `root-residual-failed` | an active tube does not interval-certify $G_{ij}=0$ |
| `root-tube-overlap` | two active tubes overlap or a single ordered pair/cell has more than one retained positive-delay tube without an event row |
| `delay-floor-collision` | an active tube touches $y=0$ or lacks a positive delay floor |
| `memory-window-exit` | an active tube leaves the owned support-complete window $(0,2]$ |
| `inactive-gap-uncertified` | any complement delay cell lacks an inactive gap predicate |
| `jacobian-sign-open` | an active tube lacks a fixed Jacobian sign stratum |
| `jacobian-floor-failed` | $J_{\min}^{\mathrm{oct}}\le\epsilon_J$ on the certified tube set |
| `support-complete-memory-open` | the payload does not attach the finite support bound $0<y\le2$ or leaves the $y=2$ endpoint convention open |
| `ledger-rerun-required` | a downstream row consumes a different root, endpoint, pair-policy, inactive-gap, or same-source convention |
| `optional-reduction-not-certified` | a shell swarm or nested shell swarm reduction is claimed before the neutral all-pairs equality row is certified |
| `all-pairs-root-ledger-certified` | all pair-policy, interval-cell, root-uniqueness, delay-bound, Jacobian-floor, inactive-gap, and checksum rows pass on one ledger |

The status

$$
\texttt{all-pairs-root-ledger-certified}
$$

certifies only the rigid carrier's causal-root ledger. It does not change the branch status to retained. The rigid octahedral row still carries the downstream failure

$$
\texttt{tangential-residual-open}
$$

until a force, dynamics, action, Noether, event, and stability packet closes on the same ledger.

---

## 6. Payload Target

The proof payload for this packet is

$$
\mathsf{L}_{\mathrm{oct}}^{\mathrm{root}}
=
\left(
\mathsf{LedgerID},
\Pi_{\mathrm{all}}^{\mathrm{oct}},
\mathsf{Chk}_{\Pi},
\mathcal{T}_{\theta},
\mathsf{ActiveTubes},
\mathsf{InactiveGaps},
y_0,
y_1,
J_0,
J_{\min}^{\mathrm{oct}},
\mathsf{SameSourcePolicy},
\mathsf{ConsumerChecksum},
\mathsf{FirstFailure},
\mathsf{Status}
\right).
$$

Required field meanings:

| Field | Payload |
| --- | --- |
| $\mathsf{LedgerID}$ | rigid octahedral carrier label, source packet, solver version, tolerance, and timestamp |
| $\Pi_{\mathrm{all}}^{\mathrm{oct}}$ | all $30$ ordered distinct source pairs over the six neutral swarm sites |
| $\mathsf{Chk}_{\Pi}$ | the pair-policy checksum from Section 4 |
| $\mathcal{T}_{\theta}$ | interval theta cells, endpoint ownership, and period-cut convention |
| $\mathsf{ActiveTubes}$ | one certified positive-delay tube for each $(r,s,\Theta_n)$ |
| $\mathsf{InactiveGaps}$ | complete inactive-gap cover of each complement delay cell |
| $y_0,y_1$ | global positive lower delay floor and upper active-delay bound with $y_1<2$ unless the endpoint row is separately owned |
| $J_0,J_{\min}^{\mathrm{oct}}$ | declared Jacobian floor and certified global minimum |
| $\mathsf{SameSourcePolicy}$ | `ordinary-same-source-excluded` unless a later event packet declares a different policy |
| $\mathsf{ConsumerChecksum}$ | checksum required for force, dynamics, action, Noether, event, stability, and observer-export consumers |
| $\mathsf{FirstFailure}$ | first status from Section 5 |
| $\mathsf{Status}$ | `all-pairs-root-ledger-certified` or the first failure status |

---

## 7. Theorem Target

**Theorem target: rigid octahedral sampled ledger certification.** Suppose the rigid octahedral carrier above is equipped with an interval theta-cell cover, the ordered pair policy $\Pi_{\mathrm{all}}^{\mathrm{oct}}$, the pair-policy checksum $\mathsf{Chk}_{\Pi}$, one certified positive-delay root tube for every ordered pair and theta cell, a certified inactive-gap cover of the remaining delay slab, positive global delay bounds, a fixed Jacobian sign stratum and floor on every active tube, and a consumer checksum tying all downstream rows to the same ledger.

Then the sampled root evidence from the worked example has been upgraded to a certified all-pairs causal-root ledger for the rigid octahedral neutral swarm carrier. The result is still `priority-only`: it may unblock a later Noether swarm, shell swarm, or nested shell swarm calculation that consumes this exact ledger, but it does not by itself retain a branch.
