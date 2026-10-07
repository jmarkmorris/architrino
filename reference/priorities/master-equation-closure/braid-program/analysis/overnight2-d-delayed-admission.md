# Piecewise delayed error admission with the original kick retained

## Scope and definitions

This extension of the [accepted prefront argument](overnight2-d-prefront-admission.md) admits one reception cell at a time after causal sources enter the unknown positive history, provided its stated checks pass. It uses the same original balance 1, seed 1, its complete prescribed negative history and original kick, and $K=c_f=c_a=1$. The inclusive ceiling remains selected and must be proved inactive in every admitted region. The [independent component review](overnight2-d-front-and-delayed-independent-review.md) accepts the conditional mathematical construction. The [final eighth-prefix adjudication](overnight2-d-eighth-prefix-admission-independent-review.md) accepts actual trajectory membership through time 46.53742538935399, with uniform velocity error at most $6.895563693793051\times10^{-7}$ and position error at most $3.4477818468965258\times10^{-6}$. All earlier prefix certificates retain their original scopes and identities. The [midpoint alternative](overnight2-d-midpoint-geometry.md) resolves the preceding polynomial source-enclosure failure in the independently checked 424th cell; the later guarded Taylor/cache composition closes the final accepted steps. The last run stopped at its declared wall cap, not at a reported mathematical gate failure. Later admission and actual tail entry remain open.

Let $Q_i$ be the exact-increment comparison and $X_i$ the exact trajectory. Define $e_i^x=X_i-Q_i$, $e_i^v=\dot X_i-\dot Q_i$ and $Y_i=(\alpha^2|e_i^x|^2+|e_i^v|^2)^{1/2}$. A completed history supplies a nondecreasing memberwise upper bound $E_i(t)$ for $Y_i$ at every earlier positive time; on negative time the position error is the constant initial translation and the velocity error is zero. For a cell $J=[a,b]$, choose trial upper bounds $U_i$ and require $L+\max_iU_i<1$, where $L$ bounds comparison speed on the complete available past.

## Exact auxiliary endpoints and the delayed interval

Fix reception time $t$ and let $s$ be the actual causal source time for channel $(i,j)$. Set

$$
p=e_i^x(t)-e_j^x(s),\qquad z=e_j^v(s).
$$

For a homotopy parameter $\theta\in[0,1]$, use receiver $Q_i(t)+\theta p$, the reference source position $Q_j$, and source-velocity argument $\dot Q_j+\theta z$. The position root changes with $\theta$. At $\theta=1$ its root is exactly $s$, because $Q_i(t)+p-Q_j(s)=X_i(t)-X_j(s)$. Its velocity argument is the actual $\dot X_j(s)$. At $\theta=0$ the channel is the comparison channel. This algebra identifies both endpoints before estimating derivatives.

To bound $p,z$ without circularity, first use conservative trial bounds on any as-yet-unadmitted positive history and the known negative translation bound to enclose all candidate source times. Require the resulting source upper endpoint to be strictly below $a$. Only then replace the conservative positive-history allowance by the already certified maximum over that source interval. Recompute the channel region using those earlier bounds and check that its complete source interval remains within the interval used for the bound. Failure rejects or subdivides the cell. A positive delay floor larger than the reception-cell width is a convenient sufficient starting condition; it does not replace the explicit endpoint check.

If $W_j$ bounds $Y_j$ over the resulting positive source interval, use

$$
P_{ij}\ge U_i/\alpha+W_j/\alpha,\qquad Z_{ij}\ge W_j.
$$

Include the separately certified negative translation when a source interval intersects negative time. All root, range and causal-factor margins must hold for the complete translation/velocity homotopy. This construction uses source-error values at the actual source time; it does not differentiate the unknown error or replace a state-dependent delay by the nominal one.

## Smooth portions and the finite velocity jump

On portions of the homotopy avoiding source zero, the reviewed matrices give the exact mean-value derivative $B_{ij}p+C_{ij}z$. Ordinary reference acceleration knots only require both one-sided acceleration values in the matrix enclosure. The source position and velocity are continuous at those knots, so no finite channel jump is added there.

At source zero, reference position is continuous but its velocity changes by the comparison trace difference $\Delta v_j=V_j[0]-\dot Q_j(0-)$. This exact comparison difference includes the positive initial velocity representation discrepancy; substituting the literal physical kick would omit that discrepancy. A homotopy crossing has fixed delay $\tau=t$ and source position $Q_j(0)$. If $n$ is the corresponding unit direction and $D_\pm=1-n\cdot(v_j^\pm+\theta z)$, its channel jump satisfies

$$
|\Delta F_{ij}|=\frac{|n\cdot\Delta v_j|}{t^2D_+D_-}
\le J_{ij}:=\frac{|\Delta v_j|}{t_{\min}^2D_{\min}^2}.
$$

All lower bounds are outward and positive. The line $Q_i(t)+\theta p-Q_j(0)$ intersects the sphere of radius $t$ in at most two points unless $p=0$. When $p=0$ the source time does not change and there is no crossed finite jump. Degenerate isolated tangency does not increase the upper count of two. Thus the total finite jump contribution at any ordinary reception time has norm at most $2J_{ij}$.

Such a crossing can occur only where

$$
|G_{ij}(t)|\le P_{ij},\qquad G_{ij}(t)=t-|Q_i(t)-Q_j(0)|.
$$

The reverse triangle inequality proves this support condition. Since $G_{ij}$ increases at least at rate $1-L$, the support has length at most $2P_{ij}/(1-L)$. On a cell of width $h$, the actual integrated norm of the finite jump term is bounded by the expression below. Choose the numerical allowance $A_{ij}$ by rounding this expression upward:

$$
A_{ij}\ge2J_{ij}\min\left(h,\frac{2P_{ij}}{1-L}\right).
$$

Alternatively intersect the cell with a certified bracket of the reference reception front enlarged by $P_{ij}/(1-L)$ and use twice the jump-height bound times that overlap length. The same event may be conservatively counted in adjacent cells; no interval may be omitted. This is an error estimate for displaced source-kick reception, not a physical velocity reset or a new selected event law.

## Scalar propagation and first exit

Sum the signed receiver matrices before bounding their logarithmic norm:

$$
m_i\ge\tfrac12\left\|\alpha I+\left(\sum_{j\ne i}B_{ij}\right)^\top/\alpha\right\|_2.
$$

For a positive delayed source, the joint weighted block norm $h_{ij}\ge\|[-B_{ij}/\alpha,\ C_{ij}]\|_2$ bounds its smooth contribution by $h_{ij}W_j$. A negative source contributes $\|B_{ij}\|d_j^*$, with its exact zero velocity error. If the source interval straddles zero, take an upper bound valid for both cases. Let $f_i$ be the sum of these nonnegative forcing bounds. Let $R_i$ be the independently enclosed residual norm integral on the reception cell and $A_i=\sum_jA_{ij}$ the finite-jump allowance. Then

$$
Y_i(b)\le e^{m_ih}\bigl(E_i(a)+R_i+A_i\bigr)+h\phi(m_ih)f_i.
$$

Placing the entire residual and jump budgets at the start of this comparison yields a nondecreasing upper curve that covers every interior reception time. The computed endpoint must be strictly below the trial $U_i$. Update all members simultaneously only after all source-domain, history-coverage, scalar and strict-trial checks pass. No comparison acceptance follows merely from a small sampled residual.

## Existence and review boundary

On a cell whose causal sources all precede its left endpoint, the source histories are already admitted. Away from their original velocity discontinuity the ordinary receiver equation has locally Lipschitz coefficients on the strict root region. The only finite velocity jump in the source path is the original one at zero; later acceleration jumps leave source velocity continuous. Each original birth reception is transverse because receiver speed is strictly below one, so its increasing geometric event function crosses once. Piecewise continuation uses the original one-sided acceleration traces and continuous receiver position and velocity. A complete proof must check this continuation argument together with the numerical admission application, including simultaneous receptions, rather than treating a successful scalar inequality as existence by itself.

To define the cell field before assuming the unknown future solution, temporarily continue each admitted source after $a$ by $Q_j(t)+e_j^x(a)$. This continuation agrees with the admitted position at $a$, has the comparison's subunit speed, and stays within the coarse positional trial. Its temporary velocity error is zero. The coarse source-before-$a$ test then proves that every selected root uses admitted past history, so the artificial continuation drops out of the actual cell equation. First-exit control and one-sided continuation apply to that independently defined field. This is the noncircular existence construction checked in the complete application review.

## Reusing an independently admitted prefix

The resumption adaptation preserves the accepted first-80-cell runner as `delayed-admission-before-resume.py` in the existing ignored evidence owner. A later run may consume its complete receipt only with all recorded dependencies matched, including that exact source snapshot, and with the same reference, domain, exact rational weight, initialization, event brackets and comparison jumps. It must retain every prior memberwise envelope at every prior cell endpoint; retaining only the final endpoint would lose the earlier source-time bounds needed by the method of steps. The current complete residual inventory must match each reused residual budget, and all reused incoming values, outgoing values and strict trial inequalities are checked in order.

The subsequent calculation starts at the first new cell using the unchanged `cell_step` implementation. Its output contains the unchanged prior record blocks followed by the new blocks, and binds the prior receipt itself as evidence. Resumption is an induction-preserving reuse of an independently reviewed prefix, not a new independent validation of that prefix. Known synthetic-prefix and rejection controls passed before target use; the [completed independent resumption review](overnight2-d-delayed-resume-independent-review.md) accepts the adaptation within this contract. Every enlarged trajectory receipt still requires its own complete adjudication.

Falsifiers include an omitted positive-history interval, a root outside the translation region, any denominator lower bound failing, a third sphere crossing on the stated line geometry, a kick contribution outside the stated reception support, a missing residual interval, or a scalar endpoint failing the strict trial. The time-67 source cutoff and much later tail entry remain separate obligations.
