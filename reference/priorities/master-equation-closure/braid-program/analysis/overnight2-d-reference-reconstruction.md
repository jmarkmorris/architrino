# Reducing the finite-history residual without changing the release

## The reference is an approximation, not a selected motion law

A finite-history certificate compares the exact original release to a declared approximate path. Improving that path changes the comparison residual, not the equation or initial preparation. Here the retained seed-1 positions and velocities remain fixed at every original history node. The proposed reconstruction changes only the interpolating curve between nodes and subdivides at nominal source-zero reception times. It uses the same complete rigid negative-time history with the already documented comparison-only translation at zero. All numerical units remain $K=c_f=c_a=1$.

This is initially a dependent floating diagnostic: the acceleration used to improve interpolation is evaluated by the existing history/root instrument. It is not independent evidence for those accelerations, a validated new evolution, or a replacement for an interval residual bound. The reconstructed path can be useful only if its complete speed, root domain and residual are subsequently enclosed.

## Endpoint-preserving acceleration correction

On a cell $[a,a+h]$ let $q=(t-a)/h$ and let $\mathbf x_3(t)$ denote the old cubic reference restricted to that cell. Let $\mathbf A_0,\mathbf A_1$ be the selected ordinary-law accelerations at the cell's endpoints, evaluated on the old reference with the appropriate one-sided source-zero traces. Define the acceleration discrepancies

$$
\mathbf d_0=\mathbf A_0-\ddot{\mathbf x}_3(a+),\qquad
\mathbf d_1=\mathbf A_1-\ddot{\mathbf x}_3((a+h)-).
$$

Add the polynomial

$$
\mathbf b(q)=\frac{h^2}{2}q^2(1-q)^2[(1-q)\mathbf d_0+q\mathbf d_1],\qquad
\mathbf x_5(t)=\mathbf x_3(t)+\mathbf b(q).
$$

The factors $q^2$ and $(1-q)^2$ make both the added position and velocity vanish at both endpoints. Differentiating twice with respect to $t$ gives $\ddot{\mathbf b}(a)=\mathbf d_0$ and $\ddot{\mathbf b}(a+h)=\mathbf d_1$. Hence the new endpoint accelerations are exactly the prescribed $\mathbf A_0,\mathbf A_1$, while all retained endpoint positions and velocities are unchanged. This is a quintic Hermite reconstruction expressed as a small correction to the original cubic, avoiding a new subtraction of almost equal absolute positions on short cells.

At an ordinary interpolation node where the supplied acceleration is continuous, the adjacent new acceleration traces agree; the reconstructed path is $C^2$ there. At a genuine source-kick reception, distinct acceleration traces are retained, while position and velocity stay continuous. This matters for signed error transport: the original cubic has acceleration jumps even at ordinary interpolation knots, and the source-velocity chain rule then has different one-sided derivative matrices. Making ordinary acceleration traces agree removes that particular reference irregularity, without removing a physical kick front or changing the law.

The endpoint accelerations are computed using the old reference, so they are generally not exactly the equation's acceleration evaluated on the reconstructed source paths. The new residual must therefore be recomputed with the reconstructed paths on both receiver and source sides. Reporting zero endpoint residual against the old source history would not establish a lower residual for the new reference.

## Known-case control and numerical scope

The independent polynomial control uses $x(t)=t^5$ on $[0,1]$. Its cubic position/velocity endpoint interpolant is $-2t^2+3t^3$, whose acceleration discrepancies are 4 and 6. The displayed correction recovers $t^5$ identically. The instrument checked position and its first two derivatives at 31 points, with maximum binary64 discrepancy $3.553\times10^{-15}$, and verified exact endpoint correction constraints on vector data. These controls passed before target use.

The first written control mistakenly used $-3t^2+4t^3$, whose right derivative is 6 instead of the required 5. It failed before any target calculation. Correcting the analytically specified control, not the polynomial formula, resolved the failure. This receipt preserves the distinction between a faulty expected fixture and a numerical target defect.

The [reconstruction instrument](overnight2-d-quintic-reference.py) compares old and new residuals at the same three interior Gauss nodes per selected cell. Those values are samples. Even when every cell is visited, the resulting quadrature is not an upper bound on the residual integral or maximum. Partial cell sampling is separately labelled. Source-zero events are located on the retained reference; subdividing there preserves the reference position at those event nodes, so the mathematical endpoint-preserving correction does not move that reference event. Finite arithmetic, complete monotonicity and absence of extra roots still require validation.

## Falsifiers and next deciding test

The reconstruction formula would be refuted by a nonzero added endpoint position/velocity or a mismatch of either prescribed endpoint acceleration. A target claim of reduced sampled residual would fail if the same declared sample points, joined past and full reconstructed source evaluations produced the opposite comparison. Even successful residual reduction cannot establish actual finite-history admission without a valid error propagation and complete ordinary-domain bootstrap.

The next deciding test is whether this reconstruction materially lowers the time-67 comparison's residual burden without losing the strict-interior and ordinary-root margins. If it does, the original positive-envelope method and the signed transport method can each be assessed against a smaller, explicitly defined forcing. No new release, kick, source truncation or response modification is involved.
