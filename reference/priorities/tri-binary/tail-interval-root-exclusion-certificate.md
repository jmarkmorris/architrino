# Tail-Interval Root Exclusion Certificate

Promotion status: `priority-only`. This packet supplies the missing certificate method for the adaptive-memory row in [adaptive-memory-action-row.md](adaptive-memory-action-row.md). It explains how a run can prove that the interval beyond the largest active root contains no additional required delayed roots without simply raising $\eta_{\mathrm{mem}}$ to the conservative support bound $2r_{\max}+m_\eta$.

The certificate is local to one declared curve, source-pair policy, memory convention, and collocation grid. It does not retain a branch.

---

## 1. Tail Problem

For receiver $i$, source $j$, and arclength node $\lambda_n$, write

$$
G_{ij,n}(\eta;\alpha)
=
\|\mathbf{Y}_i(\lambda_n;\alpha)
-
\mathbf{Y}_j(\lambda_n-\eta;\alpha)\|
-
\eta.
$$

Suppose the active root ledger has already bracketed every retained root up to the declared active window

$$
0<\eta\le\eta_{\mathrm{mem}},
$$

with largest emitted active delay

$$
\eta_{\mathrm{act}}
=
\max_{a\in\mathcal{A}_{\eta_{\mathrm{mem}}}}\eta_a
<
\eta_{\mathrm{mem}}.
$$

If

$$
\eta_{\mathrm{mem}}<2r_{\max},
$$

the support-bound memory certificate does not exclude roots in the tail

$$
T_{ij,n}
=
(\eta_{\mathrm{mem}},\,2r_{\max}+m_\eta].
$$

The tail certificate is a proof that

$$
G_{ij,n}(\eta;\alpha)\ne0
\qquad
\text{for every }\eta\in T_{ij,n}
$$

for every required ordered pair and node under the declared source-pair policy.

---

## 2. Interval Distance Exclusion

Partition a tail interval into closed slabs

$$
Q_q=[a_q,b_q],
\qquad
\eta_{\mathrm{mem}}\le a_q<b_q\le2r_{\max}+m_\eta.
$$

For each slab compute an interval enclosure of the delayed distance:

$$
D_{ij,n}(Q_q)
\subseteq
\left\{
\|\mathbf{Y}_i(\lambda_n;\alpha)
-
\mathbf{Y}_j(\lambda_n-\eta;\alpha)\|
:
\eta\in Q_q
\right\}.
$$

Write this interval as

$$
D_{ij,n}(Q_q)
=
[D_q^-,D_q^+].
$$

Because every $\eta\in Q_q$ satisfies $a_q\le\eta\le b_q$, the whole root function obeys the interval enclosure

$$
G_{ij,n}(Q_q)
\subseteq
[D_q^- - b_q,\ D_q^+ - a_q].
$$

Therefore the slab is root-free if either

$$
D_q^+<a_q-\epsilon_G,
$$

or

$$
D_q^->b_q+\epsilon_G.
$$

This is the simplest direct tail proof. It is sharper than the global support row because $D_q^+$ is a source-pair and phase-slab distance bound, while $2r_{\max}$ is the worst possible distance between any two support points.

---

## 3. Monotone Endpoint Exclusion

Interval distance bounds can be too wide when the source curve bends through the slab. A second valid row uses the root Jacobian

$$
J_{ij,n}(\eta;\alpha)
=
1-
\mathbf{T}_j(\lambda_n-\eta;\alpha)
\cdot
\widehat{\mathbf{R}}_{ij,n}(\eta;\alpha),
$$

with

$$
\partial_\eta G_{ij,n}=-J_{ij,n}.
$$

On a slab $Q_q$, compute an interval enclosure

$$
J_{ij,n}(Q_q)\subseteq[J_q^-,J_q^+].
$$

If either

$$
J_q^->\epsilon_J
$$

or

$$
J_q^+<-\epsilon_J,
$$

then $G_{ij,n}$ is monotone on $Q_q$. In that case the slab is root-free if the endpoint values have the same strict sign:

$$
G_{ij,n}(a_q;\alpha)>\epsilon_G
\quad\text{and}\quad
G_{ij,n}(b_q;\alpha)>\epsilon_G,
$$

or

$$
G_{ij,n}(a_q;\alpha)<-\epsilon_G
\quad\text{and}\quad
G_{ij,n}(b_q;\alpha)<-\epsilon_G.
$$

This row is especially useful near a root-front boundary. It proves that a root has crossed into an extended active window, or that no additional root lies after the last active bracket, without forcing the whole tail slab to have a narrow distance enclosure.

---

## 4. Lipschitz Point Exclusion

A third row is useful when neither the whole distance interval nor the Jacobian interval is sharp enough. Choose a certified point

$$
c_q\in Q_q
$$

and compute a bound

$$
\left|\partial_\eta G_{ij,n}(\eta;\alpha)\right|
\le
L_q
\qquad
\text{for every }\eta\in Q_q.
$$

Let

$$
\Delta_q
=
\sup_{\eta\in Q_q}|\eta-c_q|
=
\max\{c_q-a_q,\ b_q-c_q\}.
$$

If

$$
\left|G_{ij,n}(c_q;\alpha)\right|
>
L_q\Delta_q+\epsilon_G,
$$

then the slab is root-free. Indeed, if a zero $\eta_*$ existed in $Q_q$, the mean-value theorem would give

$$
\left|G_{ij,n}(c_q;\alpha)\right|
\le
L_q|\eta_*-c_q|
\le
L_q\Delta_q,
$$

contradicting the certified margin.

This row is weaker than a full interval proof but cheap to emit. It should be accepted only when the derivative bound is rigorous: interval arithmetic, automatic-differentiation envelopes, Bernstein bounds, or a verified dense-sampling row with a Lipschitz remainder.

---

## 5. Tail Exclusion Theorem Target

**Theorem target.** Fix a coefficient vector $\alpha$, arclength node $\lambda_n$, ordered source pair $(i,j)$, source-pair policy, and memory interval

$$
T_{ij,n}=(\eta_{\mathrm{mem}},\eta_{\mathrm{tail}}],
\qquad
\eta_{\mathrm{tail}}\le2r_{\max}+m_\eta.
$$

Suppose $T_{ij,n}$ is covered by finitely many slabs $Q_q=[a_q,b_q]$. Suppose each slab carries at least one of the following certificates:

1. distance-exclusion certificate:

   $$
   D_q^+<a_q-\epsilon_G
   \qquad
   \text{or}
   \qquad
   D_q^->b_q+\epsilon_G;
   $$

2. monotone-endpoint certificate:

   $$
   0\notin[J_q^-,J_q^+],
   \qquad
   \operatorname{sign}G_{ij,n}(a_q)
   =
   \operatorname{sign}G_{ij,n}(b_q),
   $$

   with endpoint margin at least $\epsilon_G$ and Jacobian margin at least $\epsilon_J$;

3. Lipschitz point certificate:

   $$
   |G_{ij,n}(c_q;\alpha)|
   >
   L_q\Delta_q+\epsilon_G,
   \qquad
   |\partial_\eta G_{ij,n}|\le L_q
   \quad\text{on }Q_q.
   $$

Then

$$
G_{ij,n}(\eta;\alpha)\ne0
\qquad
\text{for every }\eta\in T_{ij,n}.
$$

If the same statement holds for every required ordered source pair and node, then the active ledger is tail-complete up to $\eta_{\mathrm{tail}}$.

If additionally

$$
\eta_{\mathrm{tail}}\ge2r_{\max}+m_\eta,
$$

then the row is support-complete memory. If $\eta_{\mathrm{tail}}<2r_{\max}+m_\eta$, the row is only tail-complete to the emitted endpoint and must not be called support-complete.

### Proof Route

The distance-exclusion row follows directly from

$$
G_{ij,n}(Q_q)
\subseteq
[D_q^- - b_q,\ D_q^+ - a_q].
$$

If this interval excludes zero with margin $\epsilon_G$, $G_{ij,n}$ has no zero in $Q_q$.

For the monotone-endpoint row, $0\notin[J_q^-,J_q^+]$ implies that $\partial_\eta G_{ij,n}$ has one strict sign on $Q_q$. Hence $G_{ij,n}$ is monotone. A continuous monotone function whose endpoint values have the same strict sign cannot vanish in the interval.

For the Lipschitz row, a zero inside the slab would force the certified sample value to be no larger than $L_q\Delta_q$ by the mean-value theorem, contradicting the strict margin.

The finite cover then excludes roots on the union of slabs.

---

## 6. Relation To The $M=3$ Tail

At $\rho=0.8$ in the exact-antipodal $M=3$ trust path, the extended active window reports

$$
\eta_{\mathrm{act}}\approx4.4058154936,
\qquad
\eta_{\mathrm{mem}}=4.5,
$$

while the support bound gives

$$
2r_{\max}\approx5.5211575250.
$$

Thus the active-window margin

$$
4.5-\eta_{\mathrm{act}}\approx0.0941845064
$$

does not certify the remaining interval

$$
(4.5,\ 5.5211575250].
$$

A successor packet can upgrade the row without increasing the active window all the way to $5.5211575250+m_\eta$ only by covering this tail with the interval certificates above. If such a certificate fails, the correct status remains

$$
\texttt{m3-tail-interval-uncertified}.
$$

If it passes on every required source-pair row, the memory status may change from

$$
\texttt{active-window-certified}
$$

to

$$
\texttt{support-complete-memory}
$$

for the emitted curve and collocation grid.

---

## 7. Required Output Fields

A tail-exclusion packet must emit:

| Field | Required content |
| --- | --- |
| `tail_interval` | $(\eta_{\mathrm{mem}},\eta_{\mathrm{tail}}]$ and whether $\eta_{\mathrm{tail}}\ge2r_{\max}+m_\eta$ |
| `tail_partition` | slab endpoints $Q_q=[a_q,b_q]$ for every required pair and node |
| `distance_enclosure` | interval $[D_q^-,D_q^+]$ and method used to compute it |
| `jacobian_enclosure` | interval $[J_q^-,J_q^+]$ when a monotone-endpoint certificate is used |
| `lipschitz_bound` | point $c_q$, derivative bound $L_q$, radius $\Delta_q$, and sample margin when a Lipschitz certificate is used |
| `endpoint_values` | $G_{ij,n}(a_q)$, $G_{ij,n}(b_q)$, and endpoint margins |
| `certificate_type` | `distance-exclusion`, `monotone-endpoint`, `lipschitz-point`, or `failed` for every slab |
| `tail_status` | `tail-excluded`, `tail-incomplete`, or `support-complete-memory` |
| `refinement_status` | whether slab refinement changes any certificate type or margin sign |

The distance and Jacobian enclosures may come from interval arithmetic, Bernstein bounds for the finite Fourier curves, automatic-differentiation interval envelopes, or a verified dense-sampling plus Lipschitz remainder. The method must be named because sampled endpoint signs alone are not a proof.

---

## 8. Failure Codes

Use these failure codes:

| Failure code | Trigger |
| --- | --- |
| `tail-distance-overlap` | $[D_q^- - b_q,\ D_q^+ - a_q]$ contains zero on some slab |
| `tail-monotonicity-open` | $0\in[J_q^-,J_q^+]$ and distance exclusion also fails |
| `tail-endpoint-bracket` | endpoint values have opposite signs or fail the $\epsilon_G$ margin |
| `lipschitz-bound-insufficient` | $|G(c_q)|\le L_q\Delta_q+\epsilon_G$ on a slab without another passing certificate |
| `tail-refinement-drift` | refining the partition changes a passing tail row into an open row |
| `tail-interval-uncertified` | at least one required pair/node/slab has no valid exclusion certificate |
| `support-complete-memory-open` | the emitted tail endpoint remains below $2r_{\max}+m_\eta$ |

Unsupported conclusions:

$$
\texttt{root-annihilation},
\qquad
\texttt{source-pair-pruned},
\qquad
\texttt{support-complete-memory}
$$

are not allowed unless the corresponding root event, pruning rule, or full tail certificate is supplied explicitly.
