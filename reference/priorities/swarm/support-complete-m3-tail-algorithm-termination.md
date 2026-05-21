# Support-Complete $M=3$ Tail Algorithm Termination

Promotion status: `priority-only`. This packet states the termination theorem for the adaptive support-tail subdivision algorithm. It composes [support-complete-m3-tail-interval-enclosures.md](support-complete-m3-tail-interval-enclosures.md), [support-complete-m3-tail-newton-certificate.md](support-complete-m3-tail-newton-certificate.md), [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md), and [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md).

It does not certify the current exact-antipodal $M=3$ branch. It proves that, under explicit regularity and separation hypotheses, the support-tail problem is a finite computation, not an open-ended search.

---

## 1. Tail Domain

For a required ordered source pair $(i,j)$, receiver arclength cell $I_n$, and tail interval $T_{\mathrm{tail}}$, define the compact closed hull

$$
\overline{\mathcal{Q}}_{ij,n}
=
I_n\times[\eta_{\mathrm{mem}},B_{\mathrm{sup}}+m_\eta].
$$

The owned open-left tail is

$$
\mathcal{Q}_{ij,n}^{\mathrm{tail}}
=
I_n\times(\eta_{\mathrm{mem}},B_{\mathrm{sup}}+m_\eta].
$$

The root equation is

$$
G_{ij}(\lambda,\eta;\alpha)
=
\|\mathbf{Y}_i(\lambda;\alpha)-\mathbf{Y}_j(\lambda-\eta;\alpha)\|
-\eta.
$$

The Jacobian row is

$$
\partial_\eta G_{ij}=-J_{ij},
\qquad
J_{ij}
=
1-\mathbf{T}_j(\lambda-\eta)\cdot\widehat{\mathbf{R}}_{ij}(\lambda,\eta).
$$

The algorithm works on atomic boxes

$$
B=I\times Q\subset\overline{\mathcal{Q}}_{ij,n},
\qquad
Q=[a,b],
$$

with an owned set $O(B)$ that respects the open-left memory boundary.

---

## 2. Adaptive Subdivision Rule

Each atomic box is tested in the following order:

1. period-cut and trigonometric-critical splitting for the arclength-inverse Fourier chart;
2. distance exclusion;
3. monotone endpoint exclusion;
4. Lipschitz point exclusion;
5. interval Newton exclusion;
6. nodewise bracket plus parametric Krawczyk root-tube inclusion;
7. subdivision of the widest uncertified dependency direction.

The widest direction is chosen from the normalized widths

$$
\frac{|I|}{h_K},
\qquad
\frac{|Q|}{B_{\mathrm{sup}}-\eta_{\mathrm{mem}}+m_\eta},
\qquad
\max_m |m\Theta|,
$$

where the last term forces phase splitting when a Fourier interval crosses sine/cosine critical points. The algorithm may choose any deterministic tie-breaker, but it must record the chosen split reason.

A box may be terminal only with one of:

$$
\texttt{tail-cell-empty-distance},
\quad
\texttt{tail-cell-empty-monotone},
\quad
\texttt{tail-cell-empty-lipschitz},
\quad
\texttt{tail-cell-empty-newton},
\quad
\texttt{tail-root-tube-krawczyk}.
$$

All other statuses are nonterminal and require either subdivision or an explicit failure row.

---

## 3. Regular Tail Hypotheses

The termination theorem assumes the following finite regularity package on a coefficient box $X_\alpha$:

1. arclength speed floor:

   $$
   S_i(\theta;\alpha)\ge s_0>0
   $$

   for every required site and $\alpha\in X_\alpha$;

2. noncollision and normalization floor:

   $$
   \|\mathbf{Y}_i(\lambda;\alpha)-\mathbf{Y}_j(\lambda-\eta;\alpha)\|\ge d_0>0
   $$

   on every retained or tested tail box;

3. regular root sheets: the zero set in the owned tail is a finite union of graphs

   $$
   \eta=\eta_u(\lambda;\alpha)
   $$

   with

   $$
   |J_{ij}(\lambda,\eta_u;\alpha)|\ge J_0>0;
   $$

4. root-tube separation:

   $$
   \operatorname{dist}(\mathcal{T}_u,\mathcal{T}_v)\ge s_{\mathrm{tube}}>0
   \quad
   (u\ne v),
   $$

   and every tube has positive distance from active brackets, slab boundaries, period cuts, and the support endpoint unless the endpoint convention assigns it deliberately;

5. excluded-region gap:

   $$
   |G_{ij}(\lambda,\eta;\alpha)|\ge g_0>0
   $$

   on the complement of all root tubes inside the owned tail.

These hypotheses are not assumed true for the current row. They state exactly what the interval run must either certify or fail to certify.

---

## 4. Termination Theorem

**Theorem target: finite support-tail certification.** Under the regular tail hypotheses, adaptive subdivision with the tests in Section 2 terminates after finitely many boxes. Its terminal boxes form a support-complete execution ledger on $\mathcal{Q}_{ij,n}^{\mathrm{tail}}$: every terminal box is either root-free or contains exactly one root tube with positive Jacobian floor, positive tube separation, fixed $J$ sign stratum, and coefficient-box persistence.

Proof route:

1. The arclength-inverse Fourier chart is $C^2$ on the compact coefficient box because the speed floor is positive.
2. Therefore $G$, $J$, and the needed interval extensions are uniformly continuous on the compact tail hull.
3. On the excluded region, the positive gap $g_0$ and uniform continuity imply that sufficiently small boxes have interval enclosures excluding zero by distance, Lipschitz, or Newton disjointness.
4. Near each regular root graph, the Jacobian floor and tube separation give an implicit-function neighborhood in which the parametric Krawczyk inclusion succeeds after sufficient subdivision.
5. The finite root-sheet assumption and compactness give a finite subcover by those empty and root-tube neighborhoods.
6. Any fair adaptive subdivision eventually refines every unresolved box below the Lebesgue number of that finite cover; hence all boxes become terminal.

Thus an infinite subdivision run can only occur if at least one regular tail hypothesis fails, the interval implementation is not convergent under subdivision, or the algorithm is not fair.

---

## 5. Failure Classification

If the adaptive algorithm does not terminate within the declared refinement budget, the failure row must identify the first violated or unproven hypothesis:

| Failure status | Meaning |
| --- | --- |
| `tail-speed-floor-open` | arclength-inverse speed floor is not certified on a tail interval |
| `tail-distance-floor-open` | unit-separation normalization is too wide or approaches zero |
| `tail-jacobian-graze-open` | $0\in J(B)$ persists under subdivision near a candidate root |
| `tail-root-tube-separation-open` | two candidate tubes or a tube and boundary cannot be separated |
| `tail-excluded-gap-open` | complement gap $g_0$ cannot be certified |
| `tail-interval-extension-nonconvergent` | interval evaluation does not sharpen under required subdivisions |
| `tail-subdivision-budget-open` | no mathematical failure yet; computational budget was exhausted |

None of these statuses is an exact-antipodal dynamics obstruction. They are support-tail certificate statuses. The master status remains

$$
\texttt{active-window-only}
$$

until the tail ledger terminates with exclusion or assimilation.

---

## 6. Certificate Size Bound

The theorem is qualitative, but a practical run should emit a size bound. Let $\delta_{\emptyset}$ be a certified maximum box diameter on which every excluded-region box passes some empty test, and let $\delta_{\mathrm{tube}}$ be a certified maximum box diameter on which every root-tube neighborhood passes the Krawczyk inclusion. Define

$$
\delta_*
=
\min\{\delta_{\emptyset},\delta_{\mathrm{tube}}\}.
$$

For a two-dimensional tail rectangle of widths $h_K$ and $|T_{\mathrm{tail}}|$, a crude terminal-box bound is

$$
N_{\mathrm{box}}
\le
\left\lceil\frac{h_K}{\delta_*}\right\rceil
\left\lceil\frac{|T_{\mathrm{tail}}|}{\delta_*}\right\rceil
N_{\mathrm{split}},
$$

where $N_{\mathrm{split}}$ accounts for period cuts and trigonometric critical splits. This is not meant as a sharp complexity estimate. It is a sanity row: if the reported subdivision tree is much larger than this bound, the interval implementation or split policy should be audited.

---

## 7. Output Schema

A terminating support-tail algorithm run must emit:

| Field | Payload |
| --- | --- |
| `tail_domain` | owned tail interval, compact hull, source pair, node cell, endpoint convention |
| `regularity_floors` | $s_0$, $d_0$, $J_0$, $s_{\mathrm{tube}}$, $g_0$ where certified |
| `subdivision_tree` | terminal and nonterminal boxes, split reasons, and parent-child links |
| `terminal_statuses` | one terminal status for every owned box |
| `root_tube_cover` | Krawczyk tube labels, sign strata, separations, and antipodal mates |
| `empty_cover` | empty boxes with selected exclusion predicate and margin |
| `failure_rows` | first violated or unproven regularity hypothesis, if any |
| `size_bound` | $\delta_*$ and the resulting crude $N_{\mathrm{box}}$ comparison |
| `ledger_export` | tail execution ledger rows and $E_{\mathrm{tail}}$ inputs |

---

## 8. Current $M=3$ Reading

No terminating support-tail subdivision run has been emitted for the current exact-antipodal $M=3$ row. The useful advance is that the first blocker is now a finite theorem target:

$$
\text{regular tail hypotheses}
\Longrightarrow
\text{finite support-tail certificate}.
$$

If the hypotheses fail, the failure is informative. A persistent Jacobian graze, tube merger, or excluded-gap failure would be a real root-ledger event. A subdivision-budget failure is only an implementation status. In all cases, the current branch remains

$$
\texttt{active-window-only},
\qquad
\texttt{not-retained}
$$

until the terminal tail ledger exists.
