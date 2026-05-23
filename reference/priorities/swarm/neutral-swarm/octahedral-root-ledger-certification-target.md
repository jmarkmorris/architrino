# Octahedral Root-Ledger Certification Target

Promotion status: `priority-only`. This packet turns the sampled causal-root diagnostic for the rigid octahedral carrier in [octahedral-carrier-worked-example.md](../shell-swarm/octahedral-carrier-worked-example.md) into a certified all-pairs root ledger for this fixed rigid carrier. The executable artifact now owns all $30$ ordered distinct source rows on one ledger: $6$ antipodal-partner rows and $24$ cross-binary rows with analytic active-root graphs, inactive-gap predicates, delay bounds, support-complete memory depth, and a global Jacobian floor.

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

These rows were the original sampled evidence. The current executable artifact retains them as diagnostics, but the ledger status no longer depends on sampling alone: the analytic certificate below supplies the all-pairs equality-row mapping, one owned periodic theta cell, active implicit root graphs, inactive-gap predicates, delay bounds, endpoint convention, support-complete memory depth, and global Jacobian floor.

The rigid-octahedral root-ledger status is now

$$
\texttt{all-pairs-root-ledger-certified}.
$$

This certifies only the causal-root ledger. No dynamics, action, Noether, event, stability, observer-export, shell swarm, or nested shell swarm row may consume it as branch retention.

---

## 2.1 Analytic Root-Uniqueness Lemma

Define

$$
H_{ij}(\theta,y)
=
\left\|
\mathbf{x}_i(\theta)-\mathbf{x}_j(\theta-y)
\right\|
-y,
\qquad
0<y\le2,
$$

where $\mathbf{x}_{a,\sigma}=\sigma R\mathbf{p}_a$ and the dimensionless normalization sets $R=1$. Away from a zero separation, write

$$
\widehat{\mathbf{R}}_{ij}(\theta,y)
=
\frac{\mathbf{x}_i(\theta)-\mathbf{x}_j(\theta-y)}
{\|\mathbf{x}_i(\theta)-\mathbf{x}_j(\theta-y)\|},
\qquad
\mathbf{T}_j^-(\theta,y)
=
\frac{d}{d\theta}\mathbf{x}_j(\theta-y).
$$

Then

$$
\frac{\partial H_{ij}}{\partial y}
=
\mathbf{T}_j^-(\theta,y)\cdot\widehat{\mathbf{R}}_{ij}(\theta,y)-1
=
-J_{ij}(\theta,y).
$$

The source tangent has unit norm and is orthogonal to the delayed source position. If $\mathbf{T}_j^-\cdot\widehat{\mathbf{R}}_{ij}=1$ at a nonzero separation, then the receiver would satisfy

$$
\mathbf{x}_i
=
\mathbf{x}_j^-+d\mathbf{T}_j^-,
\qquad
d>0,
$$

and hence

$$
\|\mathbf{x}_i\|^2
=
\|\mathbf{x}_j^-\|^2+d^2
>1,
$$

contradicting the unit support sphere. Thus $J_{ij}>0$ at every positive-delay root. The distance term is still $1$-Lipschitz through zero-separation points, while $-y$ removes any flat positive-root component, so $H_{ij}$ has at most one positive root on $(0,2]$.

For antipodal partner rows,

$$
H_{\mathrm{partner}}(y)
=
2\cos\frac{y}{2}-y,
$$

with $H_{\mathrm{partner}}(0)=2$ and $H_{\mathrm{partner}}(2)=2\cos1-2<0$. Therefore every ordered antipodal partner row has exactly one positive root in $(0,2)$.

The root-ledger artifact records this exact orbit as the antipodal-partner certificate

$$
y_*\in[1.47817026642,1.47817026644],
\qquad
J_*=1+\sin\frac{y_*}{2}
\in[1.673612029179,1.673612029187],
$$

for all six ordered antipodal-partner rows. Its inactive gaps are the monotone intervals on the two sides of this root bracket.

For cross-binary rows, $a\ne b$. At $y=0$, the same-time dot product has magnitude at most $1/2$, so

$$
H_{ij}(\theta,0)\ge1.
$$

At $y=2$, the delayed cross-binary dot product has magnitude bounded by

$$
\left|
\mathbf{p}_a(\theta)\cdot\mathbf{p}_b(\theta-2)
\right|
\le
\frac{1+|\sin2|}{2},
$$

and therefore every sign choice obeys

$$
\left\|
\sigma\mathbf{p}_a(\theta)-\sigma'\mathbf{p}_b(\theta-2)
\right\|
\le
\sqrt{3+|\sin2|}
<2.
$$

Thus $H_{ij}(\theta,2)<0$. The monotonicity row gives exactly one positive root in $(0,2)$ for each ordered cross-binary row and each phase $\theta$.

The cross-binary equations have a stronger symmetry-reduced route. Define

$$
\varepsilon_{ab}=+1
\quad
\text{for }
(a,b)\in\{(1,2),(2,3),(3,1)\},
$$

and $\varepsilon_{ab}=-1$ for the reversed cyclic pairs. With $\delta_{ij}=\sigma\sigma'$, the squared root equation is equivalent on $y>0$ to

$$
F_{ij}(\theta,y)
=
y^2-2
+\delta_{ij}
\left(
\sin(2\theta-y)+\varepsilon_{ab}\sin y
\right)
=0.
$$

After the phase shift $\tilde{\theta}=\theta$ for $\delta_{ij}=+1$ and $\tilde{\theta}=\theta+\pi/2$ for $\delta_{ij}=-1$, all twenty-four cross-binary rows reduce to

$$
F_{\kappa}(\tilde{\theta},y)
=
y^2-2+\sin(2\tilde{\theta}-y)+\kappa\sin y,
\qquad
\kappa=\delta_{ij}\varepsilon_{ab}\in\{+1,-1\}.
$$

These certified $\kappa=\pm1$ reduced root graphs are the root-graph input consumed by the frozen speed-ODE cross-binary anti-periodicity proof in [octahedral-speed-ode-diagnostic.md](octahedral-speed-ode-diagnostic.md). That proof is a downstream force-mean consumer; it does not change the all-pairs root-ledger status.

A cross root can occur only when

$$
\left|2-y^2-\kappa\sin y\right|\le1.
$$

For $\kappa=+1$, this confines the delay to

$$
y\in[a_+,b_+],
\qquad
a_+^2+\sin a_+=1,
\qquad
b_+^2+\sin b_+=3,
$$

with

$$
[a_+,b_+]\approx[0.636732650805282,1.418310091622525].
$$

For $\kappa=-1$, it confines the delay to

$$
y\in[a_-,b_-],
\qquad
a_-^2-\sin a_-=1,
\qquad
b_-^2-\sin b_-=3,
$$

with

$$
[a_-,b_-]\approx[1.409624004002596,1.979320146556212].
$$

The endpoint signs

$$
F_{\kappa}(\tilde{\theta},0)\le-1,
\qquad
F_{\kappa}(\tilde{\theta},2)\ge1-\sin2>0
$$

give uniform existence. On any possible cross root,

$$
J
=
\frac{\partial_yF_{\kappa}}{2y}
=
\frac{2y-\cos(2\tilde{\theta}-y)+\kappa\cos y}{2y}.
$$

The delay bands imply

$$
\partial_yF_+
\ge
2a_+-1+\cos a_+
>0,
$$

and

$$
\partial_yF_-
\ge
2a_--1-\cos a_-
>0.
$$

Therefore the cross-binary roots are unique and carry the conservative analytic floor

$$
J_0
<
\min\left\{
\frac{2a_+-1+\cos a_+}{2b_+},
\frac{2a_--1-\cos a_-}{2b_-},
1+\sin\frac{y_*}{2}
\right\}
\approx0.3798562906.
$$

The sampled floor is sharper, but this analytic floor is sufficient for the certificate. The executable payload emits the equality-row mapping from all twenty-four ordered cross-binary rows to the two $\kappa$ classes, the owned periodic theta cell, the active implicit root graph, and the inactive-gap predicates on the same ledger.

Consequently, the rigid octahedral seed has one positive-delay root for every ordered distinct pair and every phase, and the finite memory depth

$$
h_{\mathrm{mem}}=2
$$

is support-complete for this fixed support sphere. Together with the emitted row payload, this closes the rigid-octahedral all-pairs causal-root ledger.

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
| `all-pairs-root-ledger-open` | no analytic or interval root proof has been emitted |
| `interval-payload-open` | analytic one-root-per-ordered-pair and $h_{\mathrm{mem}}=2$ support-complete memory are staged, but finite theta cells, active tubes, inactive gaps, delay bounds, and the Jacobian floor have not been emitted on one constructive payload |
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
\texttt{interval-payload-open}
$$

is now a closed predecessor status for the fixed rigid-octahedral carrier. It remains available for future carriers that have only analytic route material without an emitted all-pairs payload.

The status

$$
\texttt{all-pairs-root-ledger-certified}
$$

is the current rigid-octahedral root-ledger status. It certifies only the rigid carrier's causal-root ledger. It does not change the branch status to retained. The rigid octahedral row still carries the downstream failure

$$
\texttt{closed-rejected:rigid-octahedral-fixed-speed-neutral-row}
$$

for the fixed-speed zero-offset row, and broader neutral swarm retention still requires force, dynamics, action, Noether, event, and stability closure on a compatible ledger.

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
