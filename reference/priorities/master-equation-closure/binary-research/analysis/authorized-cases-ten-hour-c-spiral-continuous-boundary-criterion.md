# Continuous-velocity boundary selection by a patched self delay

## Statement and fixed scope

Claim grade: derived candidate awaiting independent assessment. This successor strengthens the [bounded-acceleration criterion](authorized-cases-ten-hour-c-spiral-regular-boundary-criterion.md) without changing the law, endpoint, or actual perturbation family. It is frozen separately so the earlier subject remains unchanged.

Use only the registered coefficient-one inverse-distance logarithmic response with $c_f=1$, complete ordinary-root sums, and unchanged self treatment. Place a possible first finite strict endpoint of the admitted mirror-planar family at $t=0$. Both complete incoming paths have speed strictly below one; the endpoint velocities are continuous and unit; endpoint separation and the inherited ordinary partner delays and denominators are positive. The incoming paths are $C^2$ near the sampled partner source times. No actual member endpoint is asserted.

The continuation class now has only continuous matching velocity at zero and velocity absolutely continuous on every compact interval inside $(0,\epsilon)$. At almost every positive reception time, all positive-delay causal roots are ordinary, the complete acceleration sum converges absolutely, and the equation holds. No bounded acceleration, bounded variation across zero, arrival rate, or outgoing source-branch regularity is assumed.

**Candidate theorem.** Every continuation in this class remains at or below unit speed on some right neighborhood of zero. Consequently it has no self roots there and coincides with the unique regular partner-only reconstruction from the fixed incoming past. Such a continuation exists if and only if that reconstructed curve stays at or below one locally, and then it is locally unique. In particular, a flat reconstructed crossing cannot be continued by an integrably or nonintegrably unbounded acceleration while keeping continuous velocity in this class.

The result concerns a regular, separated first arrival from a complete strict past. It does not impose a ceiling response, classify prescribed superfield histories, admit jumps or singular velocity measures, or resolve partner-root degeneracy. The ordinary-root almost-everywhere convention is part of the stated continuation class, as in the accepted curved-path obstruction.

## 1. Uniformly recent self roots and a common positive projection

Write the selected path $x$, velocity $v$, and unit endpoint direction $e=v(0)$. The regular partner acceleration $B(t)$ is bounded by $M$ on a short right interval: positive separation excludes outgoing partner sources, and the inherited source root stays in a fixed ordinary incoming neighborhood. This conclusion uses only receiver position continuity, not a bounded receiver acceleration.

For any fixed small $\delta>0$, complete incoming strict speed gives

$$
c_\delta=\int_{-\delta}^0(1-|v(u)|)\,du>0,
$$

and every $s\le-\delta$ obeys

$$
|x(t)-x(s)|-(t-s)
\le-c_\delta+\int_0^t(|v(u)|-1)\,du<0
\tag{1}
$$

when $t$ is sufficiently small. Therefore all possible self sources approach zero uniformly as reception approaches zero, and every self delay $\rho=t-s$ tends uniformly to zero.

Continuity of velocity supplies a finite common bound $V$ and a sufficiently small interval on which every recent root direction satisfies

$$
n\cdot e\ge c>0,
\qquad n\cdot\frac{v(t)}{|v(t)|}\ge c>0,
\qquad |D_s|=|1-n\cdot v(s)|\le1+V.
\tag{2}
$$

For example, these follow by writing the root chord direction as the average velocity on its source interval, and taking that whole interval sufficiently close to the fixed unit vector $e$. All self rows have the same positive fixed projection, irrespective of the sign of $D_s$.

Let

$$
S(t)=\sum_{\text{self roots}}\frac1{\rho|D_s|}
\tag{3}
$$

at equation-valid times. Then the complete equation implies, with $w=e\cdot v$,

$$
w'(t)\ge cS(t)-M.
\tag{4}
$$

Integrating between positive times and using the finite continuous trace at zero shows

$$
\int_0^{t_0}S(t)\,dt<\infty
\tag{5}
$$

for every sufficiently small fixed $t_0$. Thus any candidate continuation already has finite total self accumulation in this interval. In fact $|v'|\le M+S$ then gives absolute continuity through zero, but only (5) is needed below.

## 2. Accumulating superfield components must form one initial interval

At every superfield time $|v(t)|>1$, the self chord function

$$
g(t,s)=|x(t)-x(s)|-(t-s)
$$

is positive just below the diagonal, because $g(t,s)/(t-s)\to|v(t)|-1$. Equation (1) gives a negative value at a fixed older source. Hence at least one positive-delay self root exists. At almost every such reception time it is ordinary by the continuation class.

Uniformly vanishing delays and (2) show that the speed projection of this one row tends uniformly to infinity at superfield reception times approaching zero. Shrink the interval so that the scalar speed $b=|v|$ therefore satisfies

$$
b'(t)\ge1
\quad\hbox{at almost every superfield time in }(0,\epsilon).
\tag{6}
$$

No derivative bound on the receiver is used. The speed chain rule is valid on positive compact intervals because $v$ is absolutely continuous and bounded away from zero.

Every connected component of the open set $\{t\in(0,\epsilon):b(t)>1\}$ must extend to the right edge $\epsilon$. Otherwise its finite right endpoint would have speed one by continuity, whereas integration of (6) from any interior time makes the endpoint speed strictly larger than one. There can consequently be at most one such component. If superfield times accumulate at zero, that component is the whole interval $(0,\epsilon)$. Thus a failure of the theorem would imply

$$
b(t)>1\qquad(0<t<\epsilon).
\tag{7}
$$

The remainder of the proof excludes (7).

## 3. Incoming-source and outgoing-source regions cover the contradiction

Let

$$
g_0(t)=|x(t)-x(0)|-t,
\qquad H=\{t\in(0,\epsilon):g_0(t)>0\}.
$$

On the open set $H$, the incoming source equation has exactly one root $s(t)<0$. Its source derivative is

$$
D_s=1-n\cdot v(s)>0
$$

because the complete incoming speed is strictly below one. Existence follows from (1) and $g_0>0$; uniqueness follows from this strictly positive derivative. The incoming root is $C^1$ on each component of $H$, and its delay $\rho=t-s$ satisfies

$$
\rho'(t)=\frac{n\cdot[v(t)-v(s(t))]}{D_s},
\qquad
| (\log\rho)' |\le\frac{2V}{\rho D_s}\le2VS(t).
\tag{8}
$$

At a positive-time boundary of $H$, this root converges to the endpoint source $s=0$. To see this, old sources are uniformly excluded by (1), and any subsequential negative source limit would solve $g(t,s)=0$ while $g(t,0)=0$, contradicting strict incoming source monotonicity. Thus $\rho(t)\to t$ at that boundary.

For $t\notin H$, $g_0(t)\le0$, while (7) makes $g(t,s)>0$ close to $s=t$. There is therefore a root with source $s\in[0,t)$ and delay at most $t$. When $g_0=0$, the source $s=0$ itself supplies such a root. At equation-valid times it is ordinary. Its contribution gives

$$
\frac1t\le(1+V)S(t)
\quad\hbox{for almost every }t\notin H.
\tag{9}
$$

This step follows no outgoing root branch. Fold creation, root switching, and the sign of an outgoing transmitter denominator do not enter the bound.

## 4. A continuous patched delay has finite logarithmic variation

Define the positive function

$$
L(t)=
\begin{cases}
\rho(t),&t\in H,\\
t,&t\notin H.
\end{cases}
\tag{10}
$$

The boundary matching above makes $L$ continuous on $(0,\epsilon)$. Equation (1) also makes $L(t)\to0$ as $t\downarrow0$.

We need a precise gluing fact, not an unproved global implicit-root continuation. Fix any compact interval $[a,b]\subset(0,\epsilon)$ and put $f=\log(L/t)$. This continuous function vanishes on the complement of $H$, is $C^1$ on each component of $H$, and on those components has

$$
|f'|\le2VS+1/t.
$$

The right side is integrable on $[a,b]$ by (5). Integrating $f'$ over a component with both ends inside $[a,b]$ gives zero, since $f$ vanishes at both endpoints; for the at most two components meeting the ends it gives their endpoint difference. Absolute integrability permits summing over the countably many components. Applying the same observation to every subinterval proves the integral identity for $f$ and therefore its absolute continuity on $[a,b]$.

Consequently $\log L$ is locally absolutely continuous, with derivative $(\log\rho)'$ on $H$ and $1/t$ almost everywhere on its complement. Equations (8)–(9) imply

$$
| (\log L)' |\le C S(t)
\quad\hbox{almost everywhere},
\qquad C=\max\{2V,1+V\}.
\tag{11}
$$

For fixed $t_0>0$ and any $0<a<t_0$,

$$
|\log L(t_0)-\log L(a)|
\le C\int_a^{t_0}S(t)\,dt
\le C\int_0^{t_0}S(t)\,dt<\infty.
\tag{12}
$$

The upper bound is independent of $a$, but $L(a)\to0$ makes the left side diverge. This contradiction excludes (7), hence excludes superfield times accumulating at the endpoint. The candidate theorem's speed conclusion follows.

## 5. Exact continuation criterion and the flat cases

Once both label speeds remain at most one on a right neighborhood, any positive-delay self chord would require a straight unit-speed segment. A segment meeting the incoming past contradicts its strict speed. A segment entirely in the outgoing interval creates a continuum of nonordinary self roots at every interior reception time, contrary to the continuation class. Thus no self roots exist.

Positive separation keeps all partner sources in the fixed incoming past on a sufficiently small interval. Its ordinary source equation and incoming $C^2$ path give a locally Lipschitz position-dependent partner acceleration $B_i(t,X_i)$. The full equation reduces to the locally unique integral equation

$$
X_i''=B_i(t,X_i),\qquad
X_i(0)=x_i(0),\qquad X_i'(0)=v_i(0).
\tag{13}
$$

The necessity, sufficiency, and uniqueness proof from the regular criterion now applies to the whole continuous-velocity class. In particular, the putatively larger class automatically reduces to a regular $C^2$ curve when any continuation exists.

If this reconstructed curve stays at most one, its nonzero single partner acceleration excludes a straight unit segment, so it has no self roots and is a valid unchanged-law continuation. If its speed exceeds one arbitrarily near zero, no continuation exists in the stated class. A strict-domain trajectory ends at equality even in the first case; an inclusive-domain-only trajectory may follow the proved continuation. Neither label supplies an additional equation.

For a finite first nonzero Taylor coefficient of the reconstructed squared-speed defect, the complete strict incoming side makes odd order an outward crossing and even order a return. The odd case is now excluded in the full stated class, while the even case is a valid local return. Infinitely flat behavior is decided by the actual right-side sign, not by a vanishing jet. No such coefficient or sign is selected for an actual small-family member here.

## Controls, falsifiers, and limits

The accepted positive-projection obstruction is the incoming-root-only control: its $g_0>0$ region fills a right neighborhood, so (10) uses only the already accepted logarithmic delay argument. The accepted quadratic grazing return has no superfield component and remains a valid solution. These known cases check that the stronger argument preserves both existing endpoint outcomes before any use on a flat arrival.

The main new proof burden is the complementary outgoing-root bound (9) and its continuous gluing with (8). Falsifiers include a superfield component ending at unit speed despite (6), failure of incoming root matching to $s=0$ at a boundary of $H$, a nonpositive projected recent self row, failure of the component-wise absolute-continuity gluing despite its integrable derivative bound, or failure of the old-source exclusion (1). A root-degenerate reception set of positive measure is outside the stated ordinary-root class; it is not silently deleted from the equation. Velocity jumps, singular velocity measures, loss of separation, or an unbounded partner row also lie outside this result.

No computation or alternative response is introduced. This file alone is new; all earlier candidates, independent references and shared owners remain unchanged. The parent coordinator owns integration. The candidate requires an independently frozen derivation and assessment, especially of the gluing step, before acceptance.
