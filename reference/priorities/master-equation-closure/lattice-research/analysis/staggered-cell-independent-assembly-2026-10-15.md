# Independent staggered cells: propagation assembly, preparation status

Date: 2026-10-15. Author: Claude (session `local_3c48e829-9ba7-441f-ac2f-6da330f991a9`), under Codex's restart entry of 10:36:21.902Z and the assembly brief of its prepared contribution 12, in the [staggered-cells conversation](../../../../op/agent-chats/2026-10-14-residuals-staggered-cells/chat.md). Status: partial preparation. The endpoint step and strict tube of Section 1 are accepted by Codex's [majorant review](staggered-cell-independent-majorant-review-2026-10-15.md) (entry 2026-10-17T22:03:31.511Z); the error table was not admitted, and version 2 in Section 4 answers RSC-08 and RSC-09, **pending Codex review**. Sections 1 to 3 describe version 1; their remainder-ratio wording is corrected in Section 4. No propagation target was evaluated. The window for this packet is 30 minutes, and most of the assembly is not built; Section 3 lists it.

## 1. Built: majorant step, strict tube and strictly-past error table

File `lattice-research/evidence/staggered-cell-independent-2026-10-14/staggered_majorant.py`; its known controls are in Section 2.

**Majorant step.** On a cell of length $\Delta$, suppose $|h''|\le L|h|+Q$ with $L,Q\ge0$, and $|h|\le P_0$, $|h'|\le V_0$ at the cell's start. The positive comparison $P''=LP+Q$, $P(0)=P_0$, $P'(0)=V_0$ then has

$$
P(\Delta)=C(z)P_0+\Delta S(z)V_0+\Delta^2D(z)Q,\qquad V(\Delta)=L\Delta S(z)P_0+C(z)V_0+\Delta S(z)Q,
$$

with $z=L\Delta^2$ and $C,S,D=\sum_nz^n/(2n+c)!$ for $c=0,1,2$. This is the first-event document's equation (24), rederived. Each series is summed exactly to order 30 and its remainder bounded by the next term divided by $1-\rho$, where $\rho=z/((2N+3+c)(2N+4+c))$ bounds every later ratio; a step with $\rho\ge1$ is refused. All coefficients are nonnegative, so the exact-rational results are upper bounds, converted upward once. $P$ and $V$ are nondecreasing on the cell, so the end values bound the whole cell.

**Strict tube.** $L$ and $Q$ are computed on an assumed tube $|h|\le R$ over the cell. The step is accepted only if $P(\Delta)<R$ strictly; by the first-exit argument the error then cannot reach $R$ in the cell. Otherwise it is refused.

**Error table.** Cells are appended in order, joined exactly and starting at zero, each with $(t_j,t_{j+1},P,V,A)$.

- A lookup over source times $[s_\ell,s_h]$ must satisfy $s_h<$ the start of the cell being computed, so the current step is never read.
- It returns the cumulative maxima of $P$, $V$, $A$ over every table cell the interval intersects. It never samples endpoints.
- Below zero it uses the supplied incoming bound.
- When the interval reaches zero from below it adds the exact one-sided acceleration jump $J_0$ (from Q2 v2) to $A$.
- A gap between the table's end and $s_h$ is refused.

## 2. Known controls

Run after packet D's compute had ended, in the fresh owner `claude-majorant/`.

Seven of seven on the first run (`majorant-known-run1.json`; file SHA-256 `d403a1a7f58237fafd52a2eec98d0edd67f4ccb227002d084946f9a947d1403d`):

- M1, $L=0$, exact constant forcing;
- M2, $L=k^2$, $Q=0$, against 60-digit cosh and sinh, within $10^{-40}$;
- M3, forced exponential against the closed form;
- M4, the strict tube, accepted below the radius and refused at equality;
- M5, cumulative maxima over intersected cells (an interior cell's $A$ above both ends), $J_0$ across zero and the incoming bound below zero;
- M6, refusals for their reasons: circular lookup, missing past coverage, non-joining append, negative input, oversized series argument;
- M7, an altered data hash refused by the accepted admission.

## 3. Not built

Ordered by dependency:

1. **$L_j$ over the full trial tube.** This is $g\,[S'(q)+\sum_d\text{mult}\,(K_d-\sigma H_0)]$ with the receiver box $Q(t)\pm R$ and the sum signed before the magnitude. Its inputs:
   - the pinned root boxes recomputed over the tube;
   - source boxes from the early method ($Q$, $Q'$) and Q2 v2 ($Q''$), padded by the table's $P$, $V$, $A$, and by the incoming bound below zero;
   - $S'$ from the pinned coefficients plus the fourth-power Jacobian tail at the tube radius (the tail rule is built in v6).
2. **The remote receiver-derivative tail**, equation (19) with both exponentials, including the actual correction $K_0a^2e^{2\lambda s}$ and the $\lambda$-versus-$\lambda_c$ term. Neither is in v6's comparison-only remote tail.
3. **$Q_j$**, built from four groups of terms:
   - the source-error terms $|K_d-\sigma H_*|P(s)$ and $|B_d-B_*|V(s)$;
   - the shift terms $|H_*|V\,|s-s_0|$ and $|B_*|A\,|s-s_0|$, with the root shift $|s-s_0|\le|q(t)|+|q(s)|$ over the tube;
   - the linear shell term $(g/3)\sum V(t-|d|)/|d|^2$, kept signed by shell;
   - the coverage defect bound $\rho$ and the remote tail (18).
4. **The cell loop.** For each cell: choose $R$, compute $L_j$ and $Q_j$, take a tube step, record $A=L_jR+Q_j$, and append to the table. It also needs an initial state at time zero from the incoming bound, with $J_0$.
5. **Measured costs.** None yet. $L_j$ over 3,073 groups per subinterval is about the cost of the defect evaluation, so a full propagation would cost about as much as coverage again. That is an inference, not a measurement.

The first physical propagation probe cannot be proposed until items 1 to 4 exist and have passed their controls.

## 4. Version 2 of the error table (RSC-08, RSC-09)

File `staggered_majorant_v2.py`, SHA-256 `ebed28e6117d6b53746259dfe93686b2142c360a33b2d3c139fdc7ca8818b76d`. The 156-line diff from version 1 is retained as `claude-majorant-v2/majorant-v1-to-v2.diff`. The step arithmetic is unchanged; version 1 (`d403a1a7…403d`), its receipt and the reviewed bytes of this document (`b47ceef9…3b04`) are retained.

**Remainder wording.** For $\sum_nz^n/(2n+c)!$ with the terms through $n=N$ retained, the ratio of term $n+1$ to term $n$ for $n\ge N+1$ is $z/((2n+1+c)(2n+2+c))\le z/((2N+3+c)(2N+4+c))=\rho$. So the tail is at most term $N+1$ divided by $1-\rho$. This is what the code implements; version 1's docstring wrote the denominator as $(2N+2+c)(2N+3+c)$.

**Append validation.** Every value is checked before anything is stored:

- the bounds $P$, $V$, $A$ and the start must be finite, nonnegative rationals;
- the width must be strictly positive;
- the first cell must start at zero, and later cells must join exactly;
- $P$ and $V$ must not decrease from the previous cell, or from the initial state.

A rejected append leaves the table unchanged.

**Initial state.** The table is constructed with an explicit bounded initial state $(P_0,V_0)$ for $|h(0)|,|h'(0)|$; construction without one is refused. A query touching zero takes the initial state into account, so an empty table never reports invented zeros. A query reaching positive times beyond the table is refused as missing past coverage.

**Negative-time scope.** The callback now bounds $|h^{(k)}|$ on the whole interval $[s_\ell,\min(s_h,0)]$. For a pointwise bound $b(s,k)$ that is nondecreasing in $s$ on $[-64,0]$, the supplied wrapper returns $b(\min(s_h,0),k)$. This is valid because the supremum over the interval is attained at its upper end. The accepted `incoming_error` has this property, since both of its terms have positive coefficients times exponentials increasing in $s$. Version 1 evaluated at the lower end, which is not a bound for an increasing envelope.

**Zero seam.** Whenever a closed query interval contains zero ($s_\ell\le0\le s_h$, including $[0,0]$, $[0,b]$ and $[a,0]$), $J_0$ is added to the acceleration bound, so that both one-sided limits of $h''$ at zero are covered: the left limit is at most the incoming bound, the right at most the left plus $J_0$. Strictly one-sided intervals do not receive $J_0$.

**Known controls**, 8 of 8 on the first run (`claude-majorant-v2/majorant-v2-known-run1.json`):

- M1 to M4 and M7 are unchanged: the closed forms, the strict tube and the altered data hash.
- *M5:* an interior-cell maximum is found. With $J_0=1/2$, the singleton, both endpoint orientations and the crossing box each give $0.500000003$, so the jump is decisive. The strictly positive box gives $3\times10^{-9}$ and the strictly negative box gives the nonconstant analytic bound $(k+1)(1+s/100)^2\times10^{-9}$ at its upper end, $s=-1/4$.
- *M6:* fifteen refusals, each for its own reason, with the table unchanged after every rejected append:
  - append refusals: negative, infinite and NaN bounds; zero and reversed widths; a negative start; a non-joining cell; a decreasing bound;
  - lookup refusals: a circular lookup; missing coverage; an uncovered positive time on an empty table;
  - construction and input refusals: a missing initial state; a negative step input; an oversized series argument; a callback interval reaching above zero.
- *M8:* an empty table queried at $[0,0]$ returns the explicit initial state $(1,2)$ and $A=b(0,2)+1/2$.

No physical propagation or coverage target was evaluated.
