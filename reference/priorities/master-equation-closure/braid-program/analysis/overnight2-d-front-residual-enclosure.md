# Complete residual coverage across the original source kick

## Question and scope

The [polynomial residual construction](overnight2-d-polynomial-residual.md) preserves cancellation between the reference acceleration and its delayed channel sum. The [ordinary-piece extension](overnight2-d-source-piece-enclosure.md) covers continuous position and velocity across reference interpolation knots. Neither alone covers a source-time interval containing the original velocity jump at zero. This note derives a separate enclosure for such intervals without smoothing the kick or selecting a new event rule. It concerns the residual of the declared comparison path, not actual trajectory admission.

The comparison $Q_j$ is continuous on its complete available past, with a certified common speed bound $L<1$. Its negative branch is the translated rigid history; its positive branch is the exact-increment piecewise polynomial. Let $J=[a,b]$ be a reception interval inside one declared receiver piece. Every evaluation below encloses the complete interval, including one-sided acceleration traces when required. Distinct partner separation has an independently certified positive lower bound.

## A direct channel enclosure valid across the velocity jump

For receiver $i$ and source $j$, choose any positive encoded proposal $\tau_0$. For every $t\in J$, define

$$
F_t(\tau)=\tau-|Q_i(t)-Q_j(t-\tau)|.
$$

The global speed bound implies $F_t(\tau_2)-F_t(\tau_1)\ge(1-L)(\tau_2-\tau_1)$ for $\tau_2>\tau_1$, including intervals that cross the kick. Positive present separation gives $F_t(0)<0$ and the same bound gives $F_t(\tau)\to+\infty$. Thus the root exists uniquely. If interval evaluation encloses $F_t(\tau_0)$ for all $t\in J$ in a set of absolute magnitude at most $\epsilon$, then

$$
|\tau(t)-\tau_0|\le\delta=\frac{\epsilon}{1-L}.
$$

Require $\tau_0-\delta>0$ and put $\mathcal T=[\tau_0-\delta,\tau_0+\delta]$, $\mathcal S=J-\mathcal T$. Enclose $Q_j(\mathcal S)$ and both one-sided values of $\dot Q_j(\mathcal S)$ by the union of every intersected negative or positive source piece. The position enclosure uses continuity at zero; the velocity enclosure explicitly contains the original jump. With $\mathcal R=Q_i(J)-Q_j(\mathcal S)$, form

$$
\mathcal W=\mathcal T-\mathcal R\cdot\dot Q_j(\mathcal S).
$$

At a true root, $R=\tau n$ with $|n|=1$, so $W=\tau(1-n\cdot\dot Q_j)\ge\tau(1-L)$. Intersect the direct lower endpoint of $\mathcal W$ with this independently valid positive floor. The signed channel lies in

$$
\sigma_{ij}\frac{\mathcal R}{\mathcal T^2\mathcal W}.
$$

This is an interval evaluation of the true channel. It does not differentiate through a velocity jump or use a smooth candidate-to-root bridge. At the isolated reception time itself the two one-sided values suffice for an almost-everywhere integrated residual bound. Summing signed channel intervals before subtracting the complete receiver acceleration enclosure gives a valid residual box. Its coordinate absolute sum bounds the Euclidean residual norm. A broad interval may be conservative; it cannot silently omit a trace.

## Reception-front brackets and subdivision

The reference source-zero reception for channel $(i,j)$ solves

$$
G_{ij}(t)=t-|Q_i(t)-Q_j(0)|=0.
$$

Its increase is at least $(1-L)(t_2-t_1)$, so there is at most one root and an interval evaluation at a numerical proposal provides a certified bracket by the same residual-over-slope estimate. The bracket may be padded outward for numerical convenience. Its endpoints are partition points only; they do not alter the reference or impose a physical event reset.

Outside these brackets, use the cancellation-preserving polynomial residual method when all of its guards hold. Inside them, use the direct interval enclosure above. Subdivision is permitted whenever a candidate bridge, polynomial range, denominator or requested residual budget is unresolved. Every subinterval must be included exactly once, with adjacent endpoints identical and complete parent-cell coverage. Failure to cover any interval rejects the completed certificate.

## Integrated residual and later error transport

For a partition $J=\bigcup_\ell J_\ell$ with residual upper bounds $r_\ell$, the outward sum

$$
R_J=\sum_\ell |J_\ell|r_\ell
$$

bounds the residual norm integral. It is preferable to a whole-cell maximum when a short kick bracket has a larger residual. If a later error comparison on a cell of width $h$ has nonnegative receiver growth bound $m$ and nonnegative non-residual forcing bound $f$, then

$$
Y(t+h)\le e^{mh}\bigl(Y(t)+R_J\bigr)+h\phi(mh)f,
\qquad \phi(x)=\frac{e^x-1}{x},\quad\phi(0)=1.
$$

The same endpoint bounds every earlier point in the cell: place the entire nonnegative residual budget at the cell's comparison start and evolve its nondecreasing scalar upper curve. This mathematical upper bound does not add a jump to the physical trajectory. Actual source-front displacement terms are separate and are not discharged by certifying the reference residual.

## Polynomial range refinement

For a polynomial enclosure $p(q)=\sum_{k=0}^n c_kq^k+e(q)$, $q\in[-1,1]$, the coefficients lie in declared intervals and only $|e(q)|\le E$ is known. One may enclose the derivative of the finite coefficient polynomial by

$$
c_1+\left[-\sum_{k=2}^n k|c_k|,\ \sum_{k=2}^n k|c_k|\right].
$$

If this interval has one sign, each represented finite polynomial is monotone, so its range lies between its endpoint interval evaluations. Add $[-E,E]$ afterwards. No derivative of the unknown remainder is inferred. If monotonicity is unproved, retain the original coefficient absolute-sum range. Either range may be intersected with the original valid range.

## Validation boundary and falsifiers

These are derived proposals pending independent review and implementation checks. Known controls must include a continuous piecewise linear source with a nonzero velocity jump, both one-sided true channel values, complete partition and integral aggregation, and a polynomial with bounded but rapidly oscillating remainder to prevent accidental differentiation of that remainder. A missing source piece, lost kick trace, nonpositive root margin, incorrect partition or inward rounding falsifies the numerical application. No target result is claimed in this note.
