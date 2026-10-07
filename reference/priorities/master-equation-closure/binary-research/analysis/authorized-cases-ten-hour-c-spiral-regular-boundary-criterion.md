# The regular continuation criterion at a logarithmic unit-speed arrival

## Fixed endpoint and claim scope

Claim grade: derived candidate awaiting independent assessment. This note concerns a possible finite endpoint of the actual small mirror-planar family fixed by the [method admission](authorized-cases-ten-hour-c-spiral-method-admission.md). It does not assert that a member reaches this endpoint, and it does not select a new initial history. The law is only the registered inverse-distance logarithmic response, with coefficient one and $c_f=1$, every ordinary positive-delay root retained, and unchanged diagonal exclusion.

Translate a finite strict endpoint to $t=0$. Its complete incoming individual speeds are strictly below one, its positions remain distinct, and each partner root is ordinary with positive delay. The endpoint theorem already supplies these conditions for the admitted family. Assume the incoming paths are $C^2$ near the sampled partner source events, as they are in the admitted regular family. Write the positive path as $x$, its limiting velocity as $e$, and $|e|=1$.

The continuation class considered here has continuous velocity through zero, velocity absolutely continuous on compact positive-time intervals, and essentially bounded acceleration on some whole right neighborhood of zero. It satisfies the unchanged full ordinary-root equation almost everywhere, with all roots ordinary and the row sum absolutely convergent at those reception times. This is a narrower class than the continuous-velocity class in the [positive-projection obstruction](../../collinear-research/analysis/authorized-cases-ten-hour-curved-birth-obstruction.md). The restriction to bounded acceleration is essential to the argument below.

The conclusion is an exact local criterion within this regular class. First reconstruct the unique partner-only curve from the endpoint data, using the fixed incoming partner history. A bounded-acceleration full-root continuation exists if and only if that reconstructed curve remains at or below unit speed on some right neighborhood. When it exists, it is unique locally. A reconstructed curve that crosses above one arbitrarily close to zero has no continuation in this class, regardless of how flat the crossing is.

## 1. Bounded acceleration excludes every immediate superfield sequence

This step uses only complete incoming strict speed, a continuous matching velocity, a bounded partner contribution, and the positive logarithmic self row. It requires neither a nonzero arrival speed derivative nor a finite-order Taylor expansion.

For a self source define

$$
g(t,s)=|x(t)-x(s)|-(t-s),\qquad s<t.
$$

Fix any small $\delta>0$ and set

$$
c_\delta=\int_{-\delta}^0(1-|v(u)|)\,du>0.
$$

For every $s\le-\delta$, complete incoming subfield speed and the triangle inequality give

$$
g(t,s)\le-c_\delta+
\int_0^t(|v(u)|-1)\,du.
\tag{1}
$$

The last integral tends to zero. Thus every self root at sufficiently small positive reception times has $s>-\delta$, uniformly over the complete older source domain. Since $\delta$ is arbitrary, every such root has delay $\rho=t-s\to0$ uniformly as $t\downarrow0$. No uniform remote-past speed margin is needed in (1).

Continuity of velocity at zero makes every velocity in a sufficiently short interval $[-\delta,t]$ lie within $\eta$ of $e$. At any root in that interval,

$$
n=\frac{x(t)-x(s)}{t-s}
=\frac1{t-s}\int_s^t v(u)\,du,
\qquad |n|=1,
$$

so $|n-e|\le\eta$ and

$$
e\cdot n\ge1-\eta^2/2,
\qquad |D_s|=|1-n\cdot v(s)|\le\eta+\eta^2/2.
\tag{2}
$$

Every admitted self contribution has positive projection along the same fixed $e$. Any one ordinary self root therefore contributes at least

$$
e\cdot A_s
\ge \frac{1-\eta^2/2}{\rho(\eta+\eta^2/2)}.
\tag{3}
$$

The bound tends uniformly to infinity when reception approaches zero, because the root exclusion and velocity continuity can both be made uniform. Extra roots have the same sign and cannot cancel it.

If $|v(t)|>1$, then $g(t,s)/(t-s)\to|v(t)|-1>0$ as $s\uparrow t$. Equation (1) supplies a negative value at a fixed earlier source. Continuity in $s$ supplies a positive-delay self root. At almost every such reception time the continuation class requires that root to be ordinary. No implicit continuation of a chosen root branch is needed here.

Suppose now that superfield times accumulate at zero. By continuity of speed each belongs to an open superfield interval. Choose equation-valid times in those intervals approaching zero. Their complete self sum has unbounded positive $e$ projection by (3), while the regular partner row stays bounded. The acceleration therefore cannot be essentially bounded. This contradiction proves that every continuation in the stated class satisfies

$$
|v(t)|\le1\quad\hbox{for all sufficiently small }t\ge0.
\tag{4}
$$

Apply the argument to both mirror labels. More generally a label whose endpoint speed is already below one remains below one by continuity; the same local conclusion then holds for both members of a pair with only one unit endpoint.

## 2. The partner-only local curve is determined by the incoming past

Positive endpoint separation excludes any partner source emitted at or after zero for sufficiently small reception times. The inherited partner root remains in a compact negative-time neighborhood of its endpoint source, where its delay and transmitter denominator have positive lower bounds. Let $B_i(t,X)$ denote the resulting partner acceleration for receiver label $i$ at position $X$ near its endpoint position.

The implicit source equation has nonzero source derivative $D$. Its position derivatives and time derivative are bounded locally. The incoming source path is $C^2$ there, so the explicit logarithmic row and its first derivatives with respect to $X$ are bounded. Hence $B_i$ is continuous in time and locally Lipschitz in receiver position. The equation

$$
X_i''(t)=B_i(t,X_i(t)),\qquad
X_i(0)=x_i(0),\qquad X_i'(0)=v_i(0)
\tag{5}
$$

has a unique local $C^2$ solution by the usual integral-equation contraction on a sufficiently short interval. Its interval and the Lipschitz bounds can be chosen while the source roots remain in the fixed incoming past. The two receiver equations are then determined separately by that past. For mirror incoming data, reflection maps one equation and endpoint condition to the other, so uniqueness preserves the mirror relation.

Equation (5) is a local mathematical reconstruction used to test a continuation. It is not an authorized replacement law beyond its verified subfield or inclusive interval.

## 3. Necessity, sufficiency, and local uniqueness

An admitted continuation satisfying (4) has no self root. Indeed, equality

$$
|x(t)-x(s)|=t-s
$$

under speeds at most one requires equality in both the speed integral and the triangle inequality. The continuous velocity must therefore be a fixed unit vector throughout $[s,t]$. Such a segment cannot contain any incoming time, whose speed is strictly below one. If it lies entirely after zero, every reception time in its interior has a continuum of nonordinary self roots, contrary to the almost-everywhere ordinary-root continuation class. Thus a purported root is impossible.

The full equation consequently reduces to (5) almost everywhere on a whole right interval. Absolute continuity and the bounded acceleration extend its integral equation through zero, and the local uniqueness just established forces the continuation to equal the partner-only reconstruction. In particular, the reconstruction must satisfy (4). This proves necessity and uniqueness.

Conversely, suppose the unique reconstructed pair in (5) stays at or below unit speed on a right interval. Its sole partner row has nonzero magnitude throughout a smaller interval: separation, delay and denominator remain regular and the coupling is one. Thus it cannot contain a straight unit-speed segment. The equality argument above excludes all positive-delay self roots, including ones that would reach into the strict incoming past. The unique partner root remains ordinary; no outgoing partner root exists by separation. The reconstructed pair therefore obeys the complete unchanged logarithmic equation and is a bounded-acceleration continuation. This proves sufficiency.

The strict domain still ends at equality. The inclusive-domain-only label permits exactly the reconstructed curve when the criterion holds; it supplies no projected update, reflection, contact interaction or selectable acceleration.

## 4. Consequences for flat smooth arrivals

Let $E_B(t)=|X_B'(t)|^2$ for the reconstructed curve. If it has a first nonzero finite-order expansion through the endpoint,

$$
E_B(t)-1=c_m t^m+o(|t|^m),\qquad c_m\ne0,
\tag{6}
$$

the fixed incoming strict side imposes $c_m(-1)^m<0$. An odd $m$ therefore has $c_m>0$ and crosses above one on the outgoing side; no bounded-acceleration full-root continuation exists. An even $m$ has $c_m<0$ and gives a genuine local touch-return satisfying the complete law. This statement is conditional on the expansion of the actual reconstructed curve. It supplies neither that expansion nor its order for a selected perturbed spiral member.

For $m=1$, the conclusion agrees with the stronger accepted positive-projection theorem, which excludes even continuous-velocity locally absolutely continuous continuations without a bounded-acceleration hypothesis. For $m=2$, it agrees with the accepted nondegenerate grazing construction. These two already established cases check the orientation of the criterion before its application to higher-order flat arrivals. The additional content here is the bounded-acceleration classification for arbitrary flat crossings or returns, including cases with no finite-order expansion.

For an infinitely flat or oscillating $E_B-1$, the exact criterion remains the sign on a right interval. A Taylor jet that vanishes to every available order does not decide it. If the reconstructed curve has superfield times arbitrarily close to zero, the regular class is excluded. If it stays at most one locally, it supplies the unique regular continuation.

## Remaining wider-class obstruction

This argument does not exclude a continuous-velocity continuation with acceleration unbounded at zero. For a transverse arrival the accepted theorem selects an ordinary incoming-source root and integrates its logarithmic delay divergence. At a flat curved crossing the nearest relevant roots can instead have outgoing source times. Their source branches can meet transmitter-degenerate folds. Ordinary roots almost everywhere alone do not justify continuing one differentiable delay branch across every such event or discarding the critical set in an integral change of variables. That missing step is not supplied by (1)–(3).

No actual family member has been shown to reach a flat endpoint, and no unbounded-acceleration continuation is constructed. The candidate only closes the regular local criterion at an endpoint if it occurs.

## Evidence and falsifiers

The known-case controls are the accepted transverse obstruction and the accepted quadratic grazing return, used solely at their independently established scopes. The derivation uses the exact positive self row, complete incoming speed bounds, ordinary partner roots, elementary norm equality, and a local Lipschitz integral equation. There is no numerical target, prescribed replacement history or imported physical law.

Falsifiers are failure of the uniform old-source exclusion (1), a recent ordinary self row with nonpositive fixed projection in (2), a positive-measure superfield interval without an ordinary equation-valid root, an unbounded or non-Lipschitz partner reconstruction despite its stated source hypotheses, or a curved at-most-unit segment with an exact own-path wake chord. The latter would violate equality in the Euclidean triangle inequality. A continuation with acceleration unbounded at zero is outside this theorem rather than a falsifier.

Only this new subject is written. All earlier subjects and independent references remain frozen, and the root coordinator retains shared integration ownership. No owned computation is active; independent assessment is required before the candidate is integrated as accepted.
