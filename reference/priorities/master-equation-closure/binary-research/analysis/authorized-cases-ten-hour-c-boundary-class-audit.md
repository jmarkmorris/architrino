# Skeptical audit of the logarithmic continuous-velocity boundary class

**Derived audit finding: the stated necessary-and-sufficient local criterion survives this review; no substantive proof gap was found.** At a separated first unit-speed endpoint with the specified complete strict incoming history and ordinary incoming partner sources, a continuation in the stated continuous-velocity class exists exactly when the uniquely reconstructed partner-only curve remains at or below one on a right neighborhood. When it exists, it is locally unique and regular. This does not establish that any member of the admitted perturbed spiral family actually reaches such an endpoint.

This is a skeptical reconstruction of a known conclusion, not a blind-to-conclusion discovery. The [continuous-boundary subject](authorized-cases-ten-hour-c-spiral-continuous-boundary-criterion.md) and its [existing adjudication](authorized-cases-ten-hour-reference-c-spiral-boundary-adjudication.md) were read before this audit was written. The earlier [blind reference](authorized-cases-ten-hour-reference-c-spiral-boundary-class.md) independently established only the bounded-acceleration result and the endpoint integrability consequence; it explicitly left the general logarithmic divergence step open. The subject supplied that step, and both the existing adjudication and this audit check it by proof reconstruction. Agreement is not represented as two independent discoveries of the full argument.

## Frozen case, class and analytical controls

The [case admission](authorized-cases-ten-hour-cd-source-admission.md#c-the-spiral-uses-the-registered-logarithmic-law) fixes the coefficient-one logarithmic acceleration row, $K_{\log}=c_f=1$, the original mirror-planar complete history and its admitted compatible perturbations. It retains every positive-delay ordinary root and the unchanged diagonal exclusion. For a selected member path $x$ and self source $s<t$, put

$$
\rho=t-s=|x(t)-x(s)|,\qquad
n=\frac{x(t)-x(s)}{\rho},\qquad
D_s=1-n\cdot v(s).
$$

The self contribution is $n/(\rho|D_s|)$, with positive self polarity. Its absolute transmitter denominator is indispensable to the proof. The partner contribution has the opposite polarity and is bounded on the local ordinary source chart.

The incoming endpoint is translated to zero. The complete incoming speeds are strictly below one, the endpoint positions are distinct, the matching endpoint velocity is a unit vector $e$, and the inherited partner root has positive range and denominator. Incoming source paths are $C^2$ near those partner emissions. Candidate continuations have continuous matching velocity, velocity absolutely continuous on every compact subinterval of $(0,\varepsilon)$, and satisfy the full acceleration equation almost everywhere with every positive-delay root ordinary and the full row sum absolutely convergent there. Neither bounded acceleration nor absolute continuity through zero is assumed.

Three already known analytical controls fix the scope before the audit:

1. In the [positive-projection curved-arrival argument](../../collinear-research/analysis/authorized-cases-ten-hour-curved-birth-obstruction.md), a positive endpoint partner projection forces the endpoint chord above its wake radius. The unique incoming self root then gives the divergence of $\log\rho$ for the logarithmic row. The new proof must reduce to that argument when its incoming-root region fills the whole right interval.
2. The [accepted nondegenerate grazing construction](authorized-cases-ten-hour-reference-c-grazing-adjudication.md) has negative second derivative of speed at equality and a local return below one. Its complete joined path has no self chord, and the finite ordinary partner row determines the acceleration at equality. The new criterion must continue to allow this event.
3. A curved unit-speed arc has strictly shorter chords than arc lengths, whereas a straight unit-speed interval has equality for every subinterval. This Euclidean norm-equality control prevents treating every equality touch as a self-root singularity, while exposing why a straight unit segment fails the ordinary-root class.

These are analytical controls, not new physical preparations or numerical trajectories. No new instrument was built or run.

## Complete past and the partner chart

For fixed $\delta>0$, strict incoming speed gives

$$
c_\delta=\int_{-\delta}^0(1-|v(u)|)\,du>0.
$$

For every old source $s\le-\delta$, including the entire supplied tail,

$$
|x(t)-x(s)|-(t-s)
\le-c_\delta+\int_0^t(|v(u)|-1)\,du.
\tag{1}
$$

The omitted incoming integral is nonpositive. The outgoing integral tends to zero by continuous velocity. Thus every possible self root is uniformly recent as $t\downarrow0$; both its source time and delay tend uniformly to zero. No uniform speed margin on the infinite old tail is required. Merely checking a bounded old interval would not establish this result; inequality (1) explicitly covers all older sources.

The partner chart does not require a new remote-past asymptotic argument. Its inherited ordinary root persists under the implicit-function theorem in a compact negative-time source neighborhood. On the entire negative source axis, the partner gap is strictly increasing: for $s_1<s_2<0$, its increase is at least $(s_2-s_1)-|X_j(s_2)-X_j(s_1)|>0$. This global comparison also applies where differentiating a zero spatial distance would be inconvenient. Hence no second incoming partner root is missed. Positive endpoint separation excludes sources $0\le s<t$ for all sufficiently small receiving times. There is exactly one partner root per receiver, and its row $B_i(t,X_i)$ is bounded.

Incoming $C^2$ source regularity gives continuous bounded derivatives of this row with respect to the receiver position in a small compact neighborhood; its range and source derivative are bounded away from zero. Therefore $B_i$ is continuous in time and locally Lipschitz in position. A bound on receiver acceleration is not used here.

## The full self sum becomes integrable at the endpoint

At a recent root,

$$
n=\frac1{\rho}\int_s^t v(u)\,du.
$$

Continuity of $v$ at the unit vector $e$ puts all root directions in one small cone. On a sufficiently short common interval there are $c>0$ and $V<\infty$ such that

$$
n\cdot e\ge c,\qquad
n\cdot\frac{v(t)}{|v(t)|}\ge c,\qquad
|D_s|\le1+V.
\tag{2}
$$

Every self term has both positive projections, even when $D_s<0$. Let $S(t)$ be the sum of $1/(\rho|D_s|)$ over all self roots at equation-valid times. Absolute convergence is used here: it identifies $S$ with the sum of self-row norms and allows comparison of the complete vector sum with its positive projected terms. No cancellation between self terms is available.

There is no hidden finite-root hypothesis. Ordinary roots have local implicit charts because the path is $C^1$ and $D_s\ne0$. Their positive weighted counting sum is measurable: every finite set of distinct ordinary roots persists on disjoint local charts, and taking the supremum over such finite local sums gives the same nonnegative sum. One may equivalently use a countable chart cover. Values on the null set where the continuation-class conditions fail do not affect any integral. Infinitely many roots accumulating toward the excluded diagonal are not silently discarded.

With $w=e\cdot v$ and $|B|\le M$, the equation gives

$$
w'\ge cS-M
\quad\hbox{almost everywhere}.
$$

On each positive compact interval, local absolute continuity licenses integration:

$$
c\int_a^{t_0}S(t)\,dt
\le w(t_0)-w(a)+M(t_0-a).
\tag{3}
$$

The continuous finite trace of $w(a)$ at zero bounds the right side uniformly as $a\downarrow0$. Nonnegativity then proves $S\in L^1(0,t_0)$. Moreover $|v'|\le M+S$ almost everywhere. Passing to zero in the ordinary integral equation on $[a,t]$ shows that $v$ is actually absolutely continuous on $[0,t_0]$. This is a derived improvement of the class, not an assumption inserted into it. It also explains why an oscillatory cancellation cannot hide a nonintegrable full acceleration near zero.

## Superfield components and the complete incoming/outgoing cover

At every superfield reception $|v(t)|>1$, the self chord gap is positive sufficiently near the diagonal. Inequality (1) supplies a negative older value, so a positive-delay self root exists. At almost every such time it is ordinary by the stated class. Its speed projection is at least $c/[(1+V)\rho]$, which tends uniformly to infinity at superfield times approaching zero. Since the partner row is bounded, a smaller right interval has

$$
\frac d{dt}|v(t)|\ge1
\quad\hbox{at almost every superfield time}.
\tag{4}
$$

Local absolute continuity of speed follows from that of velocity and the norm chain rule; velocity remains away from zero. A connected superfield component cannot have a finite right endpoint inside this interval: integrating (4) from an interior point would make its limiting speed greater than one, contradicting the continuity value one at that endpoint. Every component must therefore reach the right edge. There is at most one component. If superfield times accumulate at zero, this component fills the whole initial interval. This excludes an evasion by infinitely many tiny superfield excursions without assuming any arrival rate.

Suppose for contradiction that the whole small interval is superfield. Define

$$
H=\{t:|x(t)-x(0)|>t\}.
$$

On each open component of $H$, strict incoming source speed and (1) give exactly one root $s(t)<0$. It is $C^1$ and satisfies

$$
\rho'=\frac{n\cdot[v(t)-v(s(t))]}{D_s},\qquad
|(\log\rho)'|\le\frac{2V}{\rho D_s}\le2VS.
\tag{5}
$$

Neither $\rho$ nor the emission clock is assumed monotone. At a positive boundary point of $H$, the incoming root tends to source zero. Compactness follows from the uniform old-source exclusion. A negative limiting source would be a second incoming zero of the gap when the endpoint source zero is already a zero, contradicting strict source monotonicity. Therefore $\rho(t)\to t$ at that boundary.

On the complement of $H$, the source-zero gap is nonpositive while the near-diagonal gap is positive. A self root consequently lies in $[0,t)$; when the first gap is zero, source zero itself is available. At equation-valid times this root is ordinary, so

$$
\frac1t\le(1+V)S(t)
\quad\hbox{almost everywhere on }H^c.
\tag{6}
$$

This estimate never tracks an outgoing root branch. It survives switches between roots, ordinary fold-adjacent pieces, infinitely many components of $H$, and a complicated closed complement. A degenerate source-zero root on a positive-measure reception set would violate the expressly stated class; it cannot be used and then quietly removed. Degeneracy on its permitted null exceptional set does not affect (6).

## Why the patched logarithm has no singular variation

Set $L=\rho$ on $H$ and $L=t$ on $H^c$. The boundary matching proves continuity on the positive interval, and the uniform root exclusion proves $L(t)\to0$ at zero. Fix $0<a<b$ and set $f=\log(L/t)$. Then $f$ is continuous, is zero on $H^c$, and is $C^1$ on each component of $H$, with

$$
|f'|\le2VS+1/t.
$$

The right side is integrable on $[a,b]$. Define $k=f'$ on $H$ and zero on $H^c$. On any component, integrating over compactly truncated pieces and passing to the endpoints gives its endpoint difference; the derivative bound makes this passage legitimate. Each component lying wholly inside a subinterval $[u,v]\subset[a,b]$ contributes zero because its endpoint values of $f$ vanish. At most two components meet $u$ or $v$, and their integrals give exactly $f(v)-f(u)$. Absolute integrability justifies summing over all the other countably many components. Hence

$$
f(v)-f(u)=\int_u^v k(t)\,dt
$$

for every such subinterval. This proves absolute continuity directly. It does not use the generally false assertion that a continuous function with an almost-everywhere derivative automatically satisfies the fundamental theorem. A singular Cantor-type variation cannot remain on the complement, because $f$ is identically zero there and the component integral identity fixes every endpoint difference.

It follows that $\log L$ is locally absolutely continuous and

$$
|(\log L)'|
\le\max\{2V,1+V\}S
\quad\hbox{almost everywhere},
\tag{7}
$$

using (5) on $H$ and (6) on its complement. Thus its total variation between $a$ and a fixed $t_0$ stays bounded as $a\downarrow0$, by (3). But $\log L(a)\to-\infty$. This is the required contradiction. It excludes accumulating superfield times and proves that every continuation in the stated class is at most unit speed on some whole right neighborhood.

## Necessity, sufficiency and equality touches

Once the complete joined path is locally at most unit speed, a self chord equality requires equality both in the speed integral and in the Euclidean triangle inequality. Continuous velocity must be one constant unit vector over the entire positive-length chord interval. A chord reaching into the strict incoming history cannot have this property. An entirely outgoing straight unit interval would give a continuum of nonordinary self roots at every interior reception, a positive-measure set excluded by the continuation class. Therefore there are no self roots at all on a smaller right interval, including at isolated exceptional reception times.

The full equation now reduces almost everywhere to

$$
X_i''=B_i(t,X_i),\qquad
X_i(0)=X_{i,0},\quad X_i'(0)=V_{i,0}.
\tag{8}
$$

The endpoint absolute continuity already derived from (3) permits its integral formulation through zero. The locally Lipschitz partner chart has a unique local solution. Therefore every admitted full-root continuation is precisely that reconstructed curve, and the reconstructed speeds must remain at most one. This proves necessity and local uniqueness without assuming bounded acceleration at the outset.

Conversely, suppose the reconstructed pair remains at most one. Its single partner acceleration has nonzero magnitude on the whole small interval, since its coupling, range and denominator are nonzero. Thus the reconstructed curve cannot contain a straight unit-speed segment. The chord-equality argument excludes every self root, including roots crossing zero. The unique incoming partner root and exclusion of all outgoing partner sources remain valid. Hence the reconstruction satisfies the complete unchanged law, has finite continuous acceleration, and belongs to the larger stated class. This proves sufficiency without defining a new equation at equality.

An isolated touch-return is permitted, as the known grazing control requires. A curved interval of equality is not excluded merely because speed equals one; the criterion still asks whether the actual reconstructed curve remains at most one and has its verified root census. No claim that such an interval occurs in the admitted family follows. The straight equality interval is excluded for the specific root reason above.

For a first nonzero finite-order two-sided expansion of the reconstructed squared-speed defect, its strict negative-time side gives the stated odd crossing versus even return signs. The reconstruction agrees with the incoming regular partner equation locally by backward uniqueness on the same old source chart. Higher smoothness and existence of such an expansion are conditional, not consequences of the incoming $C^2$ premise alone. For an infinitely flat or oscillatory defect, only its actual right-side sign settles the criterion.

The strict-domain label excludes equality even when this mathematical continuation exists. The inclusive-domain-only label admits precisely the verified at-most-unit reconstruction; it supplies no reflection, projection, cap, selectable acceleration or other boundary response. Neither label makes an actual endpoint occurrence claim.

## Relation to earlier canonical results and final limitations

The pre-existing [canonical curved-path theorem](../../analysis/curved-path-wake-speed-obstructions.md) uses the inverse-square row and positive-rate arrival hypotheses, with its own upward and downward dispositions. The separately accepted [positive-partner-projection theorem](authorized-cases-ten-hour-reference-c-adjudication.md) applies independently to the canonical and logarithmic rows under that sign hypothesis. Neither is a new result of this boundary audit.

The present refinement is the logarithmic continuous-velocity criterion for a complete strict incoming history and a bounded ordinary partner chart, including flat crossings without a positive-rate hypothesis. It closes the wider-class gap left by the bounded-acceleration criterion through the joined incoming/outgoing delay argument. This audit does not promote it to an unreviewed canonical flat-arrival theorem, to histories already superfield in their incoming past, or to a statement about a different response.

The result excludes continuous matching continuations with positive-time locally absolutely continuous velocity when the reconstructed curve has superfield times arbitrarily close to zero. It does not decide velocity jumps, singular velocity measures, positive-measure root degeneracy, non-absolutely-convergent row sums, collision or partner-source degeneracy, or an equation with a modified root or equality rule. Those are outside its declared class. The actual later fate of a chosen spiral perturbation remains dependent on its endpoint occurrence and source-bound data.

Falsifiers are a violation of the complete old-source inequality (1), a recent self direction with negative fixed projection, cancellation allowed by a different transmitter sign rule, a superfield component ending despite (4), failure of incoming-root matching at a boundary of $H$, failure of the component integral identity under its stated hypotheses, or a loss of the ordinary Lipschitz partner chart. Each would reopen the corresponding consequence. No such failure was found in the frozen sources.

## Source identities and closure

The following SHA-256 identities were measured with the standard hashing command during this audit:

| Source | SHA-256 |
| --- | --- |
| Case admission | 4a676e88cd3735180bd7ed99bbefcf3980248e214a6a87f80eaefbc7dc472133 |
| Continuous-boundary subject | 25c3fb3dccb89f5ea36f1b413d7f4d72d779cebbd36d0cf98bc0ffcfd3125f39 |
| Existing boundary adjudication | 582e6e97a0fa7254b3ad2ba212a7531f4243ae07440554cf5962805047483af6 |
| Earlier regular criterion | 0891821e1cc5f2440c36e8e175fdf6479bbcd9c10f8e15395d1488c5054ca3ce |
| Earlier partial blind reference | 2511b1ec0267aa534dd6bf6bd0e046ab99f5f8add8314013c9256b96de3afe61 |
| Positive-projection subject | a17b6dc5f89c23622c23f521c52ddfe3bd714da7bf7b1e0c35cb6aaad9b709ba |
| Positive-projection adjudication | 4cfd083615bf02b5d706320e35f55b950ffc00ceb514b50b8badd21d64f5d82a |
| Grazing subject | 92a8367e99e5ea323762d892d4b9f604098d88d2f4854b9852b32e3cd84f63ec |
| Grazing adjudication | fc2eade695fd1f492eab9ae00e35f6fdbba532613fee0ad540d2fdf7c1869793 |
| Pre-existing canonical curved-path theorem | a6caab056631abddd1bff7fbbb47ed404bf6d576e2a8b9a7273c102e1beabe1d |

This file is the only new artifact for the boundary-class audit. Existing source, subject, reference and shared owner files were preserved. Manual proof and local-link review, plus a native whitespace check, are the scoped validation; no renderer or new instrument is claimed. No Python, trajectory, numerical target, long-running process, Git mutation, generated write or physical-history alteration occurred. The bounded audit is complete, with no scientific process active under this worker.
