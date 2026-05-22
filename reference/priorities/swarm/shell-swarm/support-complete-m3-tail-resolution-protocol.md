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

### 7.1 Next Execution Packet: Owned Cells And Stop Conditions

The next run should emit a finite owned-cell packet, not another sampled tail plot. Use the two initial owned delay slabs

$$
Q_{\mathrm{obs}}=[4.5,5.0],
\qquad
O_{\mathrm{obs}}=(4.5,5.0],
$$

and

$$
Q_{\mathrm{deep}}=[5.0,5.5211575250+m_\eta],
\qquad
O_{\mathrm{deep}}=(5.0,5.5211575250+m_\eta].
$$

After period splitting, every atomic cell has the form

$$
c=(i,j,n,q,s),
\qquad
\mathcal{Q}_c=I_{n,s}\times Q_{q,s}\times X_\alpha,
$$

with owned set

$$
\mathcal{O}_c
=
\{(i,j)\}\times I_{n,s}\times O_{q,s}.
$$

The packet must satisfy the owned-cell accounting identity

$$
\bigsqcup_{c\in\mathcal{C}_{\mathrm{all}}}\mathcal{O}_c
=
\Pi_{\mathrm{src}}\times[0,L_*)\times T_{\mathrm{tail}}.
$$

The diagnostic hot pair set is

$$
\Pi_{\mathrm{hot}}
=
\{
+3\leftarrow+2,\,
-3\leftarrow-2
\}
\subset\Pi_{\mathrm{src}}.
$$

Execute the blocks in this order:

| Block | Owned cells | Purpose |
| --- | --- | --- |
| $\mathcal{C}_1$ | $(i,j)\in\Pi_{\mathrm{hot}}$, $O_q=O_{\mathrm{obs}}$, all $n,s$ | test the sampled-empty prediction where failure is most informative |
| $\mathcal{C}_2$ | $(i,j)\in\Pi_{\mathrm{src}}\setminus\Pi_{\mathrm{hot}}$, $O_q=O_{\mathrm{obs}}$, all $n,s$ | close the rest of the observed subtail |
| $\mathcal{C}_3$ | $(i,j)\in\Pi_{\mathrm{hot}}$, $O_q=O_{\mathrm{deep}}$, all $n,s$ | test whether the old memory-exit labels have deeper support roots |
| $\mathcal{C}_4$ | $(i,j)\in\Pi_{\mathrm{src}}\setminus\Pi_{\mathrm{hot}}$, $O_q=O_{\mathrm{deep}}$, all $n,s$ | close the remaining support-only tail |

Within a block, use a declared lexicographic order on $(i,j,n,q,s)$ and record the exact-antipodal mate for every cell. A failure in $\mathcal{C}_1$ is a first-failure certificate for the hottest diagnostic row only; it does not exclude the need to account for the remaining required pairs. A support-complete tail outcome requires all four blocks to terminate.

For every first-slab cell, the open-left boundary row must pass before any tail root can be owned by that cell. Either the endpoint is strictly non-root with margin

$$
m_{\mathrm{mem}}(c)-e_{\mathrm{mem}}(c)>0,
$$

or it is inherited from an active endpoint root sheet in $\mathcal{A}_{4.5}$ and the one-sided collar has

$$
J_{\mathrm{mem}}^- - \epsilon_J>e_{\mathrm{mem}}(c).
$$

If neither endpoint row passes, stop immediately with

$$
\texttt{tail-boundary-convention-failed}.
$$

After the boundary row, each cell must select exactly one terminal predicate. An empty-cell predicate may be selected only for

$$
p\in
\{\mathrm{dist},\mathrm{mono},\mathrm{lip},\mathrm{Newt}\}
$$

when

$$
m_p(c)>e_p(c),
\qquad
E_p(c)=\frac{e_p(c)}{m_p(c)}<1,
\qquad
\rho_p(c)=\frac{m_p(c)-e_p(c)}{L_{p,c}^{\alpha}}>0.
$$

The emitted empty status must identify the attaining predicate and the corresponding interval rows: $D_c$, $J_c$, endpoint signs, Lipschitz center, or Newton image. If no empty predicate has a positive error-dominating margin, the cell may still terminate by root-sheet assimilation. In that case the run must emit a Krawczyk tube $\mathcal{T}_u$ with fixed $J$ sign stratum, exact-antipodal mate, complement gap, and separation from active brackets, other tail tubes, and owned-slab boundaries. A tube is terminal only if

$$
m_{\mathrm{root}}^{\mathrm{exec}}(u)
=
\min
\left\{
J_u^- -\epsilon_J,\,
m_{\mathrm{Kraw}}(u),\,
m_{\mathrm{tube}}(u),\,
g_u^{\mathrm{comp}}-\epsilon_G,\,
m_{\mathrm{anti}}(u),\,
m_{\mathrm{sep}}(u)
\right\}
>
e_{\mathrm{tube}}(u),
$$

and hence

$$
E_{\mathrm{tube}}(u)
=
\frac{e_{\mathrm{tube}}(u)}
{m_{\mathrm{root}}^{\mathrm{exec}}(u)}
<1.
$$

Here $m_{\mathrm{sep}}(u)$ is the certified separation from the active ledger, competing tail tubes, and the owned-delay boundary. A nodewise bracket without this arclength-cell tube row is only the diagnostic status

$$
\texttt{tail-roots-assimilated-nodewise};
$$

it is not a support-complete input.

The run must emit at least the following ledger fields for every atomic cell:

| Field | Payload |
| --- | --- |
| `execution_block` | $\mathcal{C}_1,\mathcal{C}_2,\mathcal{C}_3$, or $\mathcal{C}_4$ |
| `owned_cell_id` | $(i,j,n,q,s)$ and exact-antipodal mate label |
| `owned_delay_set` | $O_{q,s}$ with open-left endpoint ownership |
| `closed_arithmetic_hull` | $Q_{q,s}$ used for outward-rounded interval arithmetic |
| `boundary_row` | endpoint status, $m_{\mathrm{mem}}$, $e_{\mathrm{mem}}$, and active endpoint match when used |
| `selected_predicate` | exactly one empty predicate or one root-tube predicate |
| `selected_margin` | $m_p(c)$ or $m_{\mathrm{root}}^{\mathrm{exec}}(u)$ |
| `certified_error` | $e_p(c)$ or $e_{\mathrm{tube}}(u)$ with round, phase, coefficient, mesh, and sheet components |
| `normalized_error` | $E_p(c)$ or $E_{\mathrm{tube}}(u)$ |
| `coefficient_radius` | $\rho_p(c)$ or $\rho_{\mathrm{tube}}(u)$ and the limiting sensitivity row |
| `interval_rows` | $D_c$, $J_c$, endpoint signs, Lipschitz data, Newton image, or Krawczyk image, as applicable |
| `first_failure` | present only when a row stops, carrying the failed block, cell, predicate attempts, limiting interval, and recommended subdivision or assimilation action |

The stop conditions are:

| Stop status | Exact condition | Mathematical reading |
| --- | --- | --- |
| `tail-exclusion-restored` | every cell in $\mathcal{C}_1\cup\mathcal{C}_2\cup\mathcal{C}_3\cup\mathcal{C}_4$ selects an empty predicate, $E_{\mathrm{tail}}^{\mathrm{exec}}<1$, and $\rho_{\mathrm{tail}}>0$ | the tail contributes no roots for this ledger, so $\mathcal{A}_{\eta}^{\mathrm{sup}}=\mathcal{A}_{4.5}$ and $\epsilon_{\mathcal{F}}^{\mathrm{tail}}=0$ |
| `tail-root-sheet-assimilated` | at least one root tube is terminal, every other cell is terminal, all antipodal mate rows pass, $E_{\mathrm{tail}}^{\mathrm{exec}}<1$, and $\rho_{\mathrm{tail}}>0$ | the tail roots are part of $\mathcal{A}_{\eta}^{\mathrm{sup}}$, and force, $\Gamma$, curl, action, Krawczyk, cokernel, and refinement rows must be recomputed |
| `tail-certificate-pointwise-only` | all pointwise predicates pass but coefficient-box persistence is missing | useful as a sampled-row diagnostic, not master-eligible and not retained |
| `tail-antipodal-closure-failed` | a terminal tube or bracket lacks a certified exact-antipodal mate | exact-antipodal tail support is not certified; this is not relaxation evidence |
| `tail-antipodal-compression-invalid` | a copied mate row lacks equality of $G$, $J$, margins, errors, or coefficient-box inflation | schedule the mate cell independently or fail the tail packet |
| `tail-certificate-failure` | the first ordered cell has no terminal predicate with error-dominating margin, or its required endpoint, separation, speed-floor, source-pair, period-split, or ledger-identity row fails | downstream rows remain active-window diagnostics only |

For a failure stop, define the first failed cell $c_*$ as the earliest cell under the declared block and lexicographic order whose endpoint row, terminal predicate, pairing row, or persistence row cannot be certified. The first-failure payload is

$$
\mathsf{F}_{\mathrm{tail}}
=
\left(
c_*,
\mathrm{block}(c_*),
\mathrm{status}_*,
Q_{c_*},
I_{c_*},
X_\alpha,
\{m_p(c_*),e_p(c_*),E_p(c_*)\}_p,
J_{c_*},
d_{\mathrm{anti}}(c_*),
\mathrm{remedy}_*
\right).
$$

The allowed remedies are `subdivide-delay`, `subdivide-arclength`, `increase-precision`, `switch-to-root-tube`, `fix-endpoint-policy`, `schedule-antipodal-mate`, or `reduce-coefficient-box-radius`. This payload is the sharper certificate when the run cannot yet return exclusion or assimilation.

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

Even after one of those tail statuses is obtained, the material remains priority-only until the support-complete corrector, force/action, event, stability, inventory, and master-retention rows close on the same ledger identity. The current branch is therefore still

$$
\texttt{not-retained}
$$

until those support-complete rows close.
