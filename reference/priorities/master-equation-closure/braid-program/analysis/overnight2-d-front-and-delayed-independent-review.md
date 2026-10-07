# Independent review of front residual enclosures and delayed admission

## Disposition and boundary

**Derived disposition:** the [front residual construction](overnight2-d-front-residual-enclosure.md), the corresponding [front helper](overnight2-d-front-enclosure.py), the narrow polynomial range refinement and the [delayed admission proposal](overnight2-d-delayed-admission.md) have valid mathematical foundations on their stated domains. The reviewed front helper encloses both source traces and all intersected declared pieces; the delayed proposal correctly separates smooth error transport from the finite source-velocity jump. No invalidating in-domain mathematical defect was found. These are reviewed mathematical components, not a completed residual certificate or a new trajectory-admission result.

Two implementation/definition qualifications must be carried into an application. First, `front_bracket` does not itself validate $0\le L<1$, although its proof and division require that domain; `direct_channel` does validate it. A caller must supply an independently certified common speed bound, and an explicit guard should be added before presenting `front_bracket` as a self-validating primitive. Second, the jump vector is the exact comparison trace difference $\Delta v_j=\dot Q_j(0+)-\dot Q_j(0-)$, not automatically the literal physical kick. The encoded positive initial velocity differs from the exact post-kick velocity by the already enclosed initialization discrepancy. The parent confirmed that its planned implementation will compute the former difference with outward arithmetic and will add the speed guard after this frozen review. Neither repair was performed by this reviewer.

The live Ramon E. Moore role and Specialist charter were used as lenses; their names and prior acceptance are not mathematical evidence. The argument below is independently derived. Only this companion was authored. The parent owns integration in the [research account](overnight2-d-followup-and-research-2026-10-07.md). Its separate new adaptive residual aggregation source, pilot and future delayed application are outside this assignment and are not adjudicated here.

## 1. True roots across a continuous position and a velocity jump

Fix reception time $t$, receiver position $x=Q_i(t)$, and a source path $Q_j$ that is continuous and globally $L$-Lipschitz on the complete past up to $t$, with $L<1$. For

$$
F_t(\tau)=\tau-|x-Q_j(t-\tau)|
$$

and $\tau_2>\tau_1$, the reverse triangle inequality gives

$$
F_t(\tau_2)-F_t(\tau_1)\ge(1-L)(\tau_2-\tau_1).
$$

This does not use a classical source derivative. Positive present partner separation makes $F_t(0)<0$; the displayed inequality gives divergence to positive infinity and hence exactly one positive root. If a fixed positive proposal $\tau_0$ has $|F_t(\tau_0)|\le\epsilon$ uniformly over a reception interval, monotonicity implies $|\tau-\tau_0|\le\epsilon/(1-L)$. No smooth root-to-candidate bridge or derivative through the velocity jump is needed.

The code first encloses the receiver position and the entire source image at $t-\tau_0$, then encloses $\tau_0-|R|$ and applies this bound. It rejects a resulting delay interval with nonpositive lower endpoint. Over the enlarged source interval it obtains position and velocity boxes by hulling every intersected piece. A numerical proposal affects sharpness and possible rejection; it is not accepted as the true root.

At the true root, $R=\tau n$ with $|n|=1$. The denominator $W=\tau-R\cdot V$ obeys $W\ge\tau(1-L)>0$ for either source trace. Therefore replacing the direct interval lower endpoint by the maximum of itself and the geometric lower bound is valid for all true rows. It is not a claim that every unrelated corner of the Cartesian position/velocity box has this property. The signed row

$$
\sigma_{ij}\frac{R}{\tau^2W},\qquad |\sigma_{ij}|=1,
$$

is consequently enclosed by the code. Both traces are included at an isolated source-zero reception; arbitrary values at a finite number of isolated reception times do not affect the almost-everywhere residual integral. A changed physical event prescription on a positive-measure set would not be covered.

The negative branch in `source_boxes` is the joined rigid path, evaluated as the encoded initial position plus $r(\cos(\phi+\omega s)-\cos\phi,\sin(\phi+\omega s)-\sin\phi,0)$. This preserves its exact mathematical birth node while enclosing trigonometric uncertainty. It assumes the selected zero-drift preparation. Positive pieces use the exact-increment polynomial evaluator. Closed endpoint intersection includes the negative and positive traces at zero, both ordinary acceleration traces when an interval starts at a knot, and the terminal trace. Ordinary positive knots are position/velocity continuous and do not introduce finite channel jumps.

Application prerequisites remain explicit: finite correctly shaped arrays, increasing times, exact-node consistency, the original zero-drift negative history, unit signs, completed source coverage and a bound $L$ for that same path. The helper alone does not verify the full preparation and receipt chain. Past-source coverage fails closed when its upper endpoint exceeds the completed comparison.

## 2. Reception localization and residual integration

For the reference source birth node $Q_j(0)$, let

$$
G_{ij}(t)=t-|Q_i(t)-Q_j(0)|.
$$

Its increase is bounded below by $(1-L)$ times the reception-time increase. A residual bound at any proposal $t_0$ therefore yields a certified root bracket by division by $1-L$, provided the bracket is within the declared receiver history and the speed premise holds. In the implementation, floating `brentq` and the cached evaluator propose $t_0$ only. The decisive residual is reevaluated against the exact declared polynomial and birth node. A poor proposal can reject a case; it cannot turn a failed interval enclosure into a valid bracket. Padding is added outward. An explicit speed-domain guard is the missing local input defense noted above.

For an exact reception partition $J=\bigcup_\ell J_\ell$, with adjacent endpoints identical and each interval covered once, let $r_\ell$ bound the residual norm throughout $J_\ell$. Then $R_J=\sum_\ell|J_\ell|r_\ell$ bounds its norm integral. With nonnegative constant growth $m$ and other forcing $f$, variation of constants gives

$$
Y(b)\le e^{mh}\bigl(Y(a)+R_J\bigr)+h\phi(mh)f,
\qquad h=b-a,\quad\phi(x)=(e^x-1)/x,
$$

with $\phi(0)=1$. This follows by bounding the exponential weight on the residual integral by $e^{mh}$. Allocating the entire nonnegative budget at the comparison start also bounds every earlier time, because the resulting scalar upper curve is nondecreasing. It does not add an impulse or velocity reset to the actual trajectory.

The reviewed front module implements source boxes, individual true rows and front brackets. It does not implement complete member/channel summation, partition validation, residual integral aggregation or a completed receipt. Those application obligations cannot be inferred from its control pass. The parent's separate adaptive application must independently bind every row, interval, residual method, integral and dependency. The controlled arithmetic examples below establish formulas, not that out-of-scope implementation.

## 3. Polynomial range refinement and trigonometric callback

Write the polynomial enclosure as $p(q)=p_0(q)+e(q)$ on $[-1,1]$, where $p_0(q)=\sum c_kq^k$ has fixed coefficients in interval boxes and only $|e(q)|\le E$ is known. The derivative of the finite polynomial satisfies

$$
p_0'(q)\in c_1+\left[-\sum_{k=2}^n k\max|c_k|,\sum_{k=2}^n k\max|c_k|\right].
$$

When this interval is nonnegative or nonpositive, every represented finite polynomial is monotone. Its range is bounded by the two endpoint intervals; adding $[-E,E]$ gives a valid range even for a discontinuous or arbitrarily rapidly oscillating remainder. The code's `value` already includes that remainder, so hulling its endpoint evaluations performs exactly this final enlargement. Intersecting with the original coefficient absolute-sum bound is sound because both contain the same range. When the finite derivative has no sign, the original coarse bound remains. The code never differentiates the uniform remainder.

The optional `center_function(center, cosine)` leaves the prior default callback unchanged. Its contract must be an enclosure of sine or cosine over the whole supplied center interval, in the compatible interval type or explicitly converted by endpoints. A point approximation at the center midpoint would be insufficient. Given that contract, the prior addition formula and Taylor-plus-uniform-remainder proof apply unchanged. The tighter `bound()` can alter interval widths and numerical outputs even with the default callback; unchanged default callback does not mean every old numerical result is bitwise identical. Prior receipts retain their original arithmetic source snapshots and cannot be rebound to this new hash.

## 4. Exact delayed endpoints and history coverage

Fix reception $t$ and the actual source time $s$. Set $p=e_i^x(t)-e_j^x(s)$ and $z=e_j^v(s)$, and freeze these two vectors while varying $\theta\in[0,1]$. The auxiliary position root uses receiver $Q_i(t)+\theta p$ and reference source $Q_j$; its velocity argument is $\dot Q_j+\theta z$. At $\theta=1$,

$$
Q_i(t)+p-Q_j(s)=X_i(t)-X_j(s),\qquad
\dot Q_j(s)+z=\dot X_j(s).
$$

Thus the endpoint is exactly the actual channel, while $\theta=0$ is the comparison channel. The shifted source argument at intermediate $\theta$ does not require evaluating or differentiating the unknown error at those intermediate source times. This distinction is essential to the proof.

The proposed two-stage history bound is sufficient when implemented literally. First use valid bounds on the entire admitted past, current trial history and negative translation to enclose the actual root and all homotopy roots. Establish a source upper endpoint strictly below the reception cell's left endpoint. Then take a certified supremum of earlier member error over that source interval, recompute the smaller region, and verify that the new complete interval stays inside the domain where the earlier bound was selected. Neither a nominal source sample nor a positive delay estimate alone discharges this coverage condition. If a source interval crosses zero, both the negative translation bound with zero velocity error and the positive weighted error bound are needed; using only one branch's allowance can invalidate the region.

On each smooth part of the homotopy the derivative is $Bp+Cz$. With $p=e_i^x-e_j^x(s)$, the delayed part has weighted operator $[-B/\alpha,C]$ acting on $(\alpha e_j^x,e_j^v)$. Its spectral upper bound times the certified earlier $Y_j$ is valid. Negative sources instead contribute $\|B\|E_x^j$. Signed receiver matrices must be summed before bounding their logarithmic norm. Integrating the smooth matrices over the homotopy still lies inside their interval boxes, even when finite source jumps split the integration into several portions.

## 5. Jump count, height and reception support

At a source-zero crossing, the delay is $t$ and the position normal is continuous. The velocity denominators are $D_\pm=1-n\cdot(v_j^\pm+\theta z)$. Direct subtraction gives

$$
\Delta F=\frac{\sigma_{ij}n}{t^2}\left(\frac1{D_+}-\frac1{D_-}\right),\qquad
|\Delta F|=\frac{|n\cdot(v_j^+-v_j^-)|}{t^2D_+D_-}.
$$

The sign reverses if the crossing orientation reverses; its norm bound is unchanged. A uniform jump height $J_{ij}$ follows from a positive reception-time lower bound, positive denominator floors for both traces and the exact comparison jump norm. In this application the comparison jump is encoded $V_j[0]$ minus the exact joined negative derivative. Substituting the physical kick without its initialization discrepancy is an unjustified identification, however small that discrepancy is.

The crossing equation is

$$
|Q_i(t)-Q_j(0)+\theta p|^2=t^2.
$$

For $p\ne0$ it is a nonconstant quadratic in $\theta$, hence has at most two real roots and at most two crossings in $[0,1]$. A double root is tangency and cannot increase this count. For $p=0$ the source time does not move with $\theta$, so there is no crossed finite jump. The exceptional reception exactly at the reference front can be handled by one-sided traces and is irrelevant to the integral. Therefore twice the uniform jump height is a valid pointwise bound for the sum of finite jump magnitudes; cancellations are not assumed.

A crossing implies $\big||Q_i(t)-Q_j(0)|-t\big|\le|p|\le P_{ij}$. The inverse-Lipschitz inequality for $G_{ij}$ then bounds the support length by $2P_{ij}/(1-L)$. On a cell of width $h$, the actual integral of the jump-term norm is at most

$$
2J_{ij}\min\left(h,\frac{2P_{ij}}{1-L}\right).
$$

For implementation, define the chosen allowance as an outward upper bound on this expression, or on the sharper certified bracket-overlap expression. The proposal's notation $A_{ij}\le\cdots$ should be understood as a bound on the actual integral; a freely chosen numerical allowance must not merely be less than the right-hand side. All $P_{ij},J_{ij}$ and factor floors must be uniform over the reception cell and full homotopy. Counting the same event conservatively in adjacent cells is valid. Missing any part of its certified support is not.

These jump terms are bounded differences of channel accelerations over short reception intervals. They are not physical impulses. Adding their integral allowances and the independent residual integral at the start of a scalar comparison is a conservative bookkeeping device. With positive-history forcing included, the proposed endpoint formula and strict first-exit test follow by the same variation-of-constants argument above.

## 6. Existence and limits of the delayed proposal

When every causal source precedes the current cell, the source history is known. It has continuous position, piecewise continuous velocity with the single original velocity jump, and locally Lipschitz velocity elsewhere when its already admitted acceleration is bounded. The implicit root is regular on the strict range/factor region. Away from source-zero reception surfaces, this gives a locally Lipschitz receiver vector field and ordinary unique continuation.

For the actual birth node, the reception event function is $t-|X_i(t)-X_j(0)|$. Along a trial solution its increase is at least $(1-V_{\max})(t_2-t_1)>0$. Thus each of the finitely many ordered partner birth events is crossed at most once, transversely. At simultaneous events all corresponding signed rows must switch to their prescribed outgoing traces together. Position and velocity remain continuous, and the piecewise bounded acceleration equations determine the outgoing continuation. Finitely many such crossings cannot accumulate into infinitely many event resets on the cell. A completed application must verify the source-before-cell condition, both traces, simultaneous-event inventory and strict ceiling/factor margins; a scalar inequality alone is not an existence proof. This review supports the conditional construction, without claiming that an unexamined delayed application has discharged these obligations.

## 7. Controls, identities and preservation

Ordinary shared-venv executions of `overnight2-d-front-enclosure.py` and `overnight2-d-polynomial-enclosure.py` both completed with exit zero. Their known controls include the stationary-then-speed-$1/4$ source, exact source-zero reception at two, channel traces $1/4$ and $1/3$, root inclusion and the monotone polynomial with bounded remainder. No scientific target was run.

Separate inline analytic controls additionally passed:

- A negative stationary branch and three positive linear/quadratic pieces, checking complete piece inventory, the birth velocity jump, both acceleration traces at the two ordinary knots and the terminal trace.
- A receiver $x_i(t)=2+t/8$ with outgoing source velocities $+1/4$ and $-1/4$, negative channel sign, exact rational causal roots on either side, and reception bracket containing the exact front $16/7$.
- Increasing and decreasing polynomial ranges with arbitrary remainder $\pm1/1024$; the independent proof permits any bounded oscillation or discontinuity, not only the finitely checked values.
- The optional callback using the separately rational trigonometric evaluator, checked against independent exact-rational Taylor brackets at three polynomial arguments for each trigonometric function.
- Exact line/sphere crossings at $\theta=1/4,3/4$, a double tangency at $1/2$, the exact jump difference $1/12$ between the two known static-front rows, a known partition integral $7/2$, and zero-growth scalar budget accounting $59/16$. These last arithmetic controls do not test the out-of-scope adaptive aggregator.

Direct source reads and `diff -u` establish that the polynomial changes are exactly the finite-polynomial monotonic range refinement, optional center callback and its new control. Frozen identities are:

| Artifact | SHA-256 |
| --- | --- |
| Front residual note | `4883b2ff2cf3be95f872daf4c74cfdcfa72020b266762e2392ca6acb8fc7d64d` |
| Front helper | `8cc8ad41e363e6dd357a2d3d972600f4468cfdfacb5a791a8fa6a285a8088a5b` |
| Current polynomial arithmetic | `3b2fd494e336027b75a91b99d05dda1ab35f1537df28a70c277b8362bbb7c6c8` |
| Preserved prior polynomial arithmetic | `308510f8faef225562e7a0baa05f3149317ffe4a36fa30975d3c7314c14b0b1c` |
| Delayed admission proposal | `39daa3749be9fb1d0ba7a341a4d56f127f68cb89a696b85ecfdbb22ee941dcc3` |

The old arithmetic source remains at `.local-data/master-equation-closure/overnight2-d/polynomial-enclosure-before-range-refinement.py`. Existing reference arrays, earlier receipts and reviews were not changed or rebound. Inline controls suppressed bytecode and created no files. Only this new review companion was written; no scientific target, recursive agent, sidebar message or Git mutation was used. The parent retains responsibility for the two stated implementation qualifications, complete aggregation/application review and integration in its research account.

Falsifiers include a true root outside the residual-over-slope enclosure, a lost source trace or piece, a true denominator below its intersected floor, an exact represented polynomial value outside the refined range, an invalid center callback, an auxiliary endpoint unequal to the actual channel, a third crossing for a fixed nonzero line displacement, jump support outside its certified bracket, or a delayed history bound taken from an uncovered interval. Until an application certifies complete reception coverage and closes the strict comparison and continuation conditions, these components do not extend the accepted prefront trajectory or admit any tail.

Closing validation reproduced all five frozen subject/snapshot identities above. The directly imported residual checker remains `9b8baa6135d12145275a5b64fb8f803623ce04d802e65f5ae68f6b24d7a54554`, the rational initializer `4cea0ac572420687f0445508759403e4c2da8ef13f2bfe8e9c97c72438db2915`, the kick helper `ea6b4781df9db8bf71c508fedd8dfe02c7867ab1fdf51f5498d5cbdbbe12fafa`, and the underlying interval primitive `bcd12aefb4c1daa1fe7faec368c3aeb0ecc5c640f82fb8d7e93e99e382b3ffff`, matching their retained prior identities. All four distinct relative-link destinations exist by explicit filesystem checks. Scoped `git diff --no-index --check /dev/null` emitted no whitespace diagnostics; its difference exit status is expected for a new companion. This bounded component review is complete, with application and integration obligations left explicitly to their parent owners.
