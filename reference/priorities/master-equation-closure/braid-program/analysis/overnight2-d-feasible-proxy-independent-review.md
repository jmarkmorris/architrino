# Independent review of feasible-proxy root exclusion

## Disposition and scope

**Derived disposition:** the frozen [feasible-proxy root-exclusion note](overnight2-d-feasible-proxy-root-exclusion.md) gives a valid sufficient complete-root test. Its two-discrepancy endpoint allowance is conservative. Using the stronger integrated-defect hypothesis already present in the note yields the one-payment and separate exterior-window tests derived below. The parent's proposed sharpening has the correct signs, integration limits, and quantifiers. No numerical target, old-Hermite acceptance, actual-history extension, or ceiling continuation follows from this component review.

The live Ramon E. Moore role and Specialist charter supplied the review lens. Mathematical derivation and exact analytical controls supplied the evidence. This companion is the only file written for this bounded proof review; the subject and predecessor comparisons remained read-only. Parent integration belongs to the [existing research account](overnight2-d-followup-and-research-2026-10-07.md). The separately pending second-prefix receipt adjudication remains independent of this lemma.

## The frozen auxiliary-path argument

Fix a reception time $t\ge0$. Let $Q_j$ be continuous and locally absolutely continuous on its complete past, with negative-time speed at most one almost everywhere. Let $W_j$ be measurable and satisfy $|W_j|\le1$ almost everywhere on $[0,t]$. Joining the exact same negative path to

$$
\widehat Q_j(s)=Q_j(0)+\int_0^sW_j(u)\,du
$$

for nonnegative $s$ gives a complete 1-Lipschitz auxiliary position path. The agreement at zero is essential. With $\rho_j=Q_j'-W_j$ on positive time,

$$
Q_j(s)-\widehat Q_j(s)=\int_0^s\rho_j(u)\,du,
\qquad
|Q_j(s)-\widehat Q_j(s)|\le\varepsilon_j(t)
$$

whenever $\varepsilon_j(t)\ge\int_0^t|\rho_j|$. The discrepancy is zero for negative source times. Bounded distant negative history is compatible with and retained by this construction; once the strict finite-bracket signs are established, continuity already supplies the enclosed root.

For $x_\theta=x_0+\theta p$, $|p|\le P$, define $F_\theta(r)=r-|x_\theta-Q_j(t-r)|$ and its auxiliary counterpart $\widehat F_\theta$. The auxiliary gap is nondecreasing on all delays, and $|F_\theta-\widehat F_\theta|\le\varepsilon_j(t)$ uniformly. Consequently, for $0\le r\le a$,

$$
F_\theta(r)\le F_0(a)+P+2\varepsilon_j(t),
$$

and for $r\ge b$,

$$
F_\theta(r)\ge F_0(b)-P-2\varepsilon_j(t).
$$

The frozen strict endpoint inequalities therefore exclude every original-reference root outside $(a,b)$, uniformly in the translations. No unexamined delay interval or remote negative source remains. Nonzero source distance and a common almost-everywhere bound $1-n_\theta\cdot Q_j'\ge d>0$ on the whole interior bracket make $F_\theta$ strongly increasing there. Its opposite signs give exactly one interior root, which is then complete. Ordinary acceleration knots do not invalidate absolute continuity; source-velocity traces and all intersected pieces must still be covered in an interval implementation.

This proof uses two independent evaluations of the uniform position discrepancy, one at the exterior delay and one at the bracket endpoint. The factor two is correct for this proof. It is not the optimal consequence of the stronger defect-integral information.

## Sharper exclusion from correlated increments

Extend $W_j$ to negative time by $Q_j'$ almost everywhere and set $\rho_j=0$ there. For two delays $r_2>r_1\ge0$, write $s_2=t-r_2<s_1=t-r_1$. Absolute continuity and feasible $W_j$ give

$$
|Q_j(s_1)-Q_j(s_2)|
\le(s_1-s_2)+\int_{s_2}^{s_1}|\rho_j(u)|\,du.
$$

The reverse triangle inequality now yields the receiver-independent inequality

$$
F_\theta(r_2)-F_\theta(r_1)
\ge-\int_{t-r_2}^{t-r_1}|\rho_j(u)|\,du.
$$

This lower bound correlates the two position discrepancies because they are increments of the same integral. Define the nonnegative exterior defect allowances

$$
E_L(t,a)=\int_{\max(0,t-a)}^t|\rho_j(u)|\,du,
\qquad
E_R(t,b)=\int_0^{\max(0,t-b)}|\rho_j(u)|\,du.
$$

For $r\le a$, apply the increment inequality from $r$ to $a$ and bound its integral by $E_L$. For $r\ge b$, apply it from $b$ to $r$ and bound its integral by $E_R$. Including the same receiver-translation allowance once gives

$$
F_\theta(r)\le F_0(a)+P+E_L(t,a)\quad(0\le r\le a),
$$

$$
F_\theta(r)\ge F_0(b)-P-E_R(t,b)\quad(r\ge b).
$$

Thus the sufficient strict tests are

$$
F_0(a)+P+E_L(t,a)<0,
\qquad F_0(b)-P-E_R(t,b)>0.
$$

Both exterior windows lie inside $[0,t]$, and each integral is bounded by the same full-history $\varepsilon_j(t)$. That full-history allowance therefore suffices once in each test. The source interval corresponding to the interior bracket, between $t-b$ and $t-a$, is governed by the local factor instead; its defect need not be charged to exterior exclusion. If $b\ge t$, the right exterior lies in the feasible negative past and $E_R=0$. All these inequalities are uniform in $\theta$ and in every vector $p$ covered by the specified radius and local-factor region.

For a candidate $r_c$ with $|F_0(r_c)|\le e_c$, a common sufficient test is $d\delta>e_c+P+\varepsilon_j(t)$ on the validated bracket $[r_c-\delta,r_c+\delta]$, $0<\delta<r_c$. A sharper sufficient version replaces the common defect allowance by $\max(E_L(t,r_c-\delta),E_R(t,r_c+\delta))$. The factor and the defect windows depend on the proposed bracket and must be validated there before acceptance. The earlier two-point root-displacement estimate still applies after complete roots have been established.

**Recommendation:** retain the frozen two-payment proof as a valid uniform-distance fallback, but use the correlated increment theorem when implementing an exclusion test based on a certified kinematic-defect integral. This is a mathematical improvement, not evidence that a particular candidate will satisfy the sharper margins.

## Exact controls and counterexample

The reviewer first checked a rational linear-interpolation helper on the known value 3 at one-quarter between 2 and 6. All following controls used exact `Fraction` arithmetic and completed with `PASS`; no numerical target was used.

### A valid overspeed reference

Take $Q(s)=(\tfrac54\min(\max(s,0),1),0,0)$, with feasible $W=(1,0,0)$ on $(0,1)$ and zero elsewhere. Its negative history is static, its kinematic-defect integral is $1/4$, and its source speed is genuinely greater than one on $(0,1)$. At reception $t=3$ and receiver $x=(0,2,0)$, use the delay bracket $[7/4,3]$.

The left gap plus twice the full defect allowance is $(9-\sqrt{89})/4<0$, since $81<89$. The right gap minus that allowance is $1/2>0$. Throughout the bracket, the source-direction first component is nonpositive, so the local factor is at least one. The unique complete root has source time in $(0,1)$ and satisfies

$$
9r^2-150r+289=0,
\qquad r=\frac{25-4\sqrt{21}}3\in(11/5,9/4).
$$

The exact rational quadratic signs at $11/5$ and $9/4$ confirm this inner root bracket. In the sharpened test, $E_L=0$ because its source window is $[5/4,3]$, and $E_R=0$ because its window ends at zero. All the defect lies in the interior source window. This control shows both that global reference feasibility is unnecessary under the new complete-exclusion test and that the separate exterior allowances can be substantially sharper.

### A uniform-distance bound alone does not justify one payment

For $s\le0$, take both paths zero. On $0\le s\le4$, take the feasible proxy $\widehat Q(s)=\max(s-2,0)$ and the scalar reference $Q(s)=\widehat Q(s)+e(s)$, where $e$ is continuous piecewise linear with node values

$$
(s,e(s))=(0,0),(1,0),(2,-1/4),(3,1/4),(4,0).
$$

Then $\sup|e|=1/4$, while $\int_0^4|Q'-\widehat Q'|=1$. At $t=4$ and scalar receiver $x=17/8$, the delay gap has

$$
F(2)=-3/8,
\qquad F(3)=7/8,
\qquad F(r)=\frac54r-\frac{23}{8}\quad(2\le r\le3).
$$

Thus paying the uniform distance $1/4$ only once gives strict signs at 2 and 3 and a positive local factor $5/4$. Nevertheless, the exact gap has three roots,

$$
r=1/2,\quad5/4,\quad23/10.
$$

Two lie outside the purported bracket. These identities were checked directly by rational piecewise evaluation. The frozen two-payment test correctly fails at the left endpoint. The correlated test also correctly fails there: its left exterior defect is $3/4$, not the uniform position bound $1/4$. This counterexample distinguishes two different information contracts and does not contradict the valid one-payment integral theorem.

## Connection to the existing error comparison

The [geometry comparison](overnight-d-finite-geometry-enclosure.md#translating-one-receiver-while-holding-a-reference-source-path-fixed) uses the original reference position $Q_j$ to define roots, feasible $W_j+z$ in the acceleration denominator, and $W_j'$ in the source-velocity chain-rule term. Its position-root factor is $\gamma=1-n\cdot Q_j'$; its acceleration factor is $D=1-n\cdot(W_j+z)$. The root-exclusion lemma does not identify these two factors and supplies no lower bound for $D$ by itself.

At the actual source time $S$, the fixed endpoint vectors $p=e_i^x(t)-e_j^x(S)$ and $z=V_j(S)-W_j(S)$ give the same actual causal equation at the translated reference root. Complete uniqueness establishes that this root is $S$. The proxy is needed only to exclude other roots; replacing $Q_j$ by $\widehat Q_j$ in the residual or matrices would change the comparison being analyzed.

The [finite-history comparison](overnight-d-finite-history-error.md) separately retains $\rho^x=Q'-W$ because $(e^x)'=e^v-\rho^x$. The weighted geometry comparison must continue paying that kinematic residual, its acceleration residual, and the normal-cone complementarity allowance. The defect integral used for root exclusion does not remove any of them. Final velocity error relative to $Q'$ is bounded by the error relative to $W$ plus $|\rho^x|$.

Measurable feasible $W$ is enough for the exclusion lemma. The acceleration and derivative comparison needs its stronger branchwise absolute-continuity or Lipschitz assumptions, bounds on $W'$, and separate treatment of every reference-velocity jump. If $W$ is the Euclidean projection of an absolutely continuous $Q'$ onto the unit ball, nonexpansiveness preserves absolute continuity and bounds its derivative almost everywhere; discontinuous input traces still require explicit jump treatment. Feasibility alone supplies none of these derivative or event premises. Complete translated regions, positive delays, initialization, source-zero support bounds, and a noncircular existence/continuation argument remain separate obligations.

## Identities, preservation, and falsifiers

The reviewed frozen subject SHA-256 is `c9958cfe9d749cf18682fc2a4a7bcd045cfc9578ab42360af39b3bbcd394ff14`, measured before the derivation and checked again at closure. The sharper theorem was supplied in the parent's message after the freeze and independently derived here; it was not silently written into the frozen subject. The only new artifact from this bounded task is this companion, with no scratch, scientific target, recursive agent, sidebar communication, or Git mutation.

The conclusion is falsified by a position discontinuity at the join, a feasible-velocity violation, failure of absolute continuity, an underbounded defect integral, use of a uniform distance bound as though it controlled integral increments, nonstrict endpoint signs, missing translated/source-piece coverage, or a nonpositive interior position-root factor. A future application must cover every reception time and translation in its declared region with outward arithmetic. Failure to obtain a useful allowance is a limitation of that certificate, not a physical obstruction. The proof review is complete; numerical application and actual-history admission remain unperformed here.
