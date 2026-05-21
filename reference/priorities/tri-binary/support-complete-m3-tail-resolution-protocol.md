# Support-Complete $M=3$ Tail Resolution Protocol

Promotion status: `priority-only`. This packet turns the current exact-antipodal $M=3$ memory gap into a finite certificate problem. It does not retain a branch. Its purpose is to decide whether the $\rho=0.8$, $\eta_{\mathrm{mem}}=4.5$ row is support-complete after tail exclusion, requires tail-root assimilation, or remains an uncertified active-window screen. Concrete interval enclosures for the slab tests are supplied by [support-complete-m3-tail-interval-enclosures.md](support-complete-m3-tail-interval-enclosures.md), interval Newton/Krawczyk tests are supplied by [support-complete-m3-tail-newton-certificate.md](support-complete-m3-tail-newton-certificate.md), the mesh lift from collocation nodes to arclength cells is supplied by [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md), the finite execution/margin ledger that feeds the master theorem is [support-complete-m3-tail-execution-ledger.md](support-complete-m3-tail-execution-ledger.md), the adaptive termination theorem is [support-complete-m3-tail-algorithm-termination.md](support-complete-m3-tail-algorithm-termination.md), and the sampled frontier split is recorded in [support-complete-m3-tail-frontier-shrinkage.md](support-complete-m3-tail-frontier-shrinkage.md).

The protocol is local to one exact-antipodal arclength-inverse coefficient vector, one collocation grid, one source-pair policy, one endpoint convention, and one memory/action convention. It must be run before any support-complete Newton, cokernel, action, or relaxation decision for the current $M=3$ branch.

---

## 1. Current Numerical Tail

The extended-window $M=3$ row at $\rho=0.8$ has

$$
\eta_{\mathrm{mem}}=4.5,
\qquad
\eta_{\mathrm{act}}\approx4.4058154936,
$$

so the active-window margin is

$$
m_{\mathrm{act}}
=
4.5-4.4058154936
\approx0.0941845064.
$$

The same row has support radius

$$
r_{\max}\approx2.7605787625,
\qquad
B_{\mathrm{sup}}=2r_{\max}\approx5.5211575250.
$$

Therefore the no-margin unresolved support tail is

$$
T_{\mathrm{tail}}^0
=
(4.5,\ 5.5211575250],
$$

and the margin-aware certificate interval is

$$
T_{\mathrm{tail}}
=
(4.5,\ 5.5211575250+m_\eta].
$$

This is the first exact-antipodal $M=3$ problem to solve. The observed memory-window exit near $\rho\approx0.3205574954$ is already classified as a memory event, not a root annihilation or antipodal-relaxation trigger. At $\rho=0.8$, the missing mathematical object is a support-complete root ledger on $T_{\mathrm{tail}}$.

---

## 2. Tail Root Equation

For every required ordered source pair $(i,j)$ and collocation node $\lambda_n$, define

$$
G_{ij,n}(\eta;\alpha)
=
\|\mathbf{Y}_i(\lambda_n;\alpha)
-
\mathbf{Y}_j(\lambda_n-\eta;\alpha)\|
-
\eta.
$$

Let

$$
\mathbf{R}_{ij,n}(\eta)
=
\mathbf{Y}_i(\lambda_n)
-
\mathbf{Y}_j(\lambda_n-\eta),
\qquad
\widehat{\mathbf{R}}_{ij,n}(\eta)
=
\frac{\mathbf{R}_{ij,n}(\eta)}{\|\mathbf{R}_{ij,n}(\eta)\|}.
$$

The root Jacobian is

$$
J_{ij,n}(\eta;\alpha)
=
1-
\mathbf{T}_j(\lambda_n-\eta;\alpha)
\cdot
\widehat{\mathbf{R}}_{ij,n}(\eta),
\qquad
\partial_\eta G_{ij,n}=-J_{ij,n}.
$$

The protocol covers $T_{\mathrm{tail}}$ by closed slabs

$$
Q_q=[a_q,b_q],
\qquad
4.5\le a_q<b_q\le5.5211575250+m_\eta,
$$

for every required $(i,j,n)$. The source-pair policy must not change during this pass. If a pair is excluded by policy, the exclusion must already be part of the retained-branch protocol; the tail pass cannot silently prune it.

---

## 3. Slab Certificates

Each slab must receive exactly one certificate status:

| Status | Meaning |
| --- | --- |
| `tail-slab-empty-distance` | interval distance excludes $G=0$ |
| `tail-slab-empty-monotone` | monotone endpoint signs exclude $G=0$ |
| `tail-slab-empty-lipschitz` | point value plus Lipschitz radius excludes $G=0$ |
| `tail-root-bracketed` | exactly one root is isolated in the slab |
| `tail-slab-uncertified` | the slab is neither excluded nor assimilated |

For distance exclusion, compute

$$
D_q=[D_q^-,D_q^+]
\supset
\left\{
\|\mathbf{Y}_i(\lambda_n)
-
\mathbf{Y}_j(\lambda_n-\eta)\|:
\eta\in Q_q
\right\}.
$$

Then $Q_q$ is empty if

$$
D_q^+<a_q-\epsilon_G
\qquad\text{or}\qquad
D_q^->b_q+\epsilon_G.
$$

For monotone exclusion, compute

$$
J_q=[J_q^-,J_q^+]
\supset
\left\{
J_{ij,n}(\eta):\eta\in Q_q
\right\}.
$$

If

$$
J_q^->\epsilon_J
\qquad\text{or}\qquad
J_q^+<-\epsilon_J,
$$

then $G_{ij,n}$ is monotone on $Q_q$. The slab is empty when the endpoint signs agree with margin:

$$
G_{ij,n}(a_q)>\epsilon_G
\quad\text{and}\quad
G_{ij,n}(b_q)>\epsilon_G,
$$

or

$$
G_{ij,n}(a_q)<-\epsilon_G
\quad\text{and}\quad
G_{ij,n}(b_q)<-\epsilon_G.
$$

For Lipschitz exclusion, choose $c_q\in Q_q$ and compute

$$
|\partial_\eta G_{ij,n}(\eta)|\le L_q
\qquad
\text{for every }\eta\in Q_q.
$$

With

$$
\Delta_q=\max\{c_q-a_q,\ b_q-c_q\},
$$

the slab is empty if

$$
|G_{ij,n}(c_q)|>L_q\Delta_q+\epsilon_G.
$$

If a sign change occurs and the Jacobian interval excludes zero,

$$
G_{ij,n}(a_q)G_{ij,n}(b_q)<0,
\qquad
0\notin J_q,
$$

then $Q_q$ contains exactly one tail root. Record an isolating bracket $I_u=(\eta_u^-,\eta_u^+)$, a root $\eta_u\in I_u$, a Jacobian floor $|J_u|\ge J_{\mathrm{tail}}$, and positive excluded-gap margins on $Q_q\setminus I_u$.

---

## 4. Exact-Antipodal Closure Of Tail Labels

The exact-antipodal chart imposes

$$
\mathbf{Y}_{a,-}(\lambda)=-\mathbf{Y}_{a,+}(\lambda).
$$

Therefore a tail root for $+a\leftarrow+b$ must be paired by the antipodal involution with a tail root for $-a\leftarrow-b$ at the corresponding antipodal node and delay, up to the emitted bracket tolerance. A bracketed tail ledger passes antipodal closure only if

$$
\operatorname{dist}(I_u,\iota I_u)<\epsilon_{\mathrm{anti}},
$$

for every bracketed tail interval, after matching by the declared node and source-pair convention.

Failure of this row has status

$$
\texttt{tail-antipodal-closure-failed}.
$$

It is not by itself a midpoint-relaxation trigger. It is first a failure to produce a support-complete exact-antipodal tail ledger.

---

## 5. Assimilated Force Row

If all slabs are empty, set

$$
N_{i,n}^{\mathrm{tail}}=0,
\qquad
\epsilon_{\mathcal{F}}^{\mathrm{tail}}=0,
$$

and keep the existing active force as the support-complete force for this memory convention.

If tail roots are found, define

$$
\mathcal{U}_{i,n}^{\mathrm{tail}}
=
\left\{
u:
I_u\subset T_{\mathrm{tail}},
\quad
G_{ij,n}(\eta_u)=0
\right\},
$$

and extend the ledger:

$$
\mathcal{A}_{\eta}^{+}
=
\mathcal{A}_{4.5}
\cup
\mathcal{U}^{\mathrm{tail}}.
$$

For a tail root $u$, define

$$
\mathbf{f}_u
=
\frac{\sigma_i\sigma_{j(u)}}{\eta_u^2|J_u|}
\widehat{\mathbf{R}}_u.
$$

Then

$$
\widetilde{\mathbf{F}}_{i,n}^{+}
=
\widetilde{\mathbf{F}}_{i,n}^{\mathrm{act}}
+
\sum_{u\in\mathcal{U}_{i,n}^{\mathrm{tail}}}
\mathbf{f}_u.
$$

The fitted curvature scale must be recomputed on the extended ledger:

$$
\Gamma_K^+
=
\frac{
\langle \mathbf{K},P^\perp\widetilde{\mathbf{F}}^+\rangle
}{
\langle P^\perp\widetilde{\mathbf{F}}^+,
P^\perp\widetilde{\mathbf{F}}^+\rangle
}.
$$

The updated curvature residual is

$$
\mathcal{R}_K^+
=
\mathbf{K}
-
\Gamma_K^+P^\perp\widetilde{\mathbf{F}}^+.
$$

The old active-window residual is not a branch residual after tail roots are found. It becomes a pre-assimilation diagnostic.

---

## 6. Decision Theorem

**Tail-resolution theorem target.** Fix an exact-antipodal $M=3$ coefficient vector $\alpha$, a source-pair policy, a collocation grid, an endpoint convention, and $\eta_{\mathrm{mem}}=4.5$. Suppose every required $(i,j,n)$ tail interval $T_{\mathrm{tail}}$ is covered by finitely many slabs, every slab is certified either empty or exactly one-root bracketed, all bracketed roots are separated from old active brackets, and the bracketed set is closed under the exact-antipodal involution. Then the resulting ledger $\mathcal{A}_{\eta}^{+}$ is support-complete up to the support bound $2r_{\max}+m_\eta$ for that source-pair policy and grid.

The proof is finite covering plus the implicit-root theorem on every bracketed slab. Empty slabs exclude roots; one-root slabs provide isolated roots with nonzero $J$; bracket separation prevents label merger; exact-antipodal closure preserves the declared chart symmetry.

The theorem allows exactly three useful outcomes:

| Outcome | Required rows | Next mathematical step |
| --- | --- | --- |
| `tail-exclusion-restored` | all slabs empty and active brackets pass | run support-complete exact-antipodal corrector on the same active ledger |
| `tail-roots-assimilated` | all nodewise roots bracketed, paired, and included | lift brackets to continuous root sheets, then rerun force, $\Gamma$, curl, action, cokernel, and refinement rows on $\mathcal{A}_{\eta}^{+}$ |
| `tail-certificate-failure` | at least one slab is uncertified or antipodal closure fails | status remains `tail-force-error-unbounded` and `not-retained` |

---

The nodewise status `tail-roots-assimilated` is not yet the curve-level status used by the support-complete corrector. It must pass the mesh lift in [support-complete-m3-tail-mesh-lift.md](support-complete-m3-tail-mesh-lift.md), becoming

$$
\texttt{tail-root-sheet-assimilated},
$$

and then the derivative row in [support-complete-m3-root-sheet-variations.md](support-complete-m3-root-sheet-variations.md) before Newton, action, or Krawczyk rows are valid.

## 7. Immediate $M=3$ Run Order

The support-complete $M=3$ path is:

```text
rho=0.8 exact-antipodal M=3
base memory eta_mem=4.5
tail interval (4.5, 5.5211575250 + m_eta]
first slab family (4.5, 5.0] from sampled-tail-empty-to-5 diagnostic
second slab family (5.0, 5.5211575250 + m_eta]
declare tail execution ledger identity, endpoint ownership, and coefficient-box persistence
for every required ordered source pair and node:
  certify empty slabs or isolate tail roots
lift every atomic tail cell to an arclength-cell status
if all slabs empty:
  set tail_force_error_bound = 0
  run support-complete exact-antipodal corrector
if roots found:
  assimilate roots into A_eta+ as continuous root sheets
  emit root-sheet variation and derivative envelopes
  recompute force/Gamma/curl/action/cokernel/refinement
if any slab fails:
  keep active-window-only status
```

The hottest diagnostic row is the same-sign binary-$3$ from binary-$2$ pair and its antipodal mate, because those labels caused the fixed $\eta_{\max}=4$ memory exit. That row is only a priority seed for subdivision. The support-complete claim requires all required source pairs and all selected collocation nodes.

---

## 8. Current Status

The current exact-antipodal $M=3$ branch status is:

$$
\texttt{active-window-only},
\qquad
\texttt{tail-force-error-unbounded},
\qquad
\texttt{not-retained}.
$$

The next successful status is either

$$
\texttt{tail-exclusion-restored}
$$

or

$$
\texttt{tail-root-sheet-assimilated}.
$$

No relaxation, branch-switching, action stability, or observer-export row should be opened from the current $M=3$ data until this tail-resolution packet has one of those two successful outcomes.
