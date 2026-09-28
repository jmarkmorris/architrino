# Independent adjudication of the reception-time event measure

**Disposition: independently accepted; claim grade: derived.** The canonical positive-delay history integral, interpreted as a direct locally finite reception-time measure, cannot supply a finite instantaneous velocity change at the certified first wake-speed event. In fact no local bounded-variation velocity continuation can satisfy that direct positive-measure equation in the uniform population neighborhood specified below. This strengthens the earlier integral-solution obstruction without selecting a new event law. A varying-history regularization limit or a boundary-supported distribution is a distinct construction and is not determined by the ordinary positive-delay formula alone.

This independent derivation was captured before reading the concurrent subject and domain proofs. Inputs are the [canonical Master Equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form), the [accepted first event](smooth-two-particle-next-event-independent-adjudication.md), the [weaker-continuation assessment](smooth-two-particle-weaker-continuation-independent-adjudication.md) and the [reciprocal-delay identity](mec-008-self-delay-independent-adjudication.md#independent-reciprocal-delay-derivation). The supplied past, $g=16$, $c_f=1$, infinite alternating lattice and stationary block prescription are unchanged. All old references remain frozen.

## 1. The measure represented by the regular history integral

Translate the event to zero and consider one identity. For a fixed position path $X$, define the strict positive-delay incidence domain and residual

$$
\Omega=\{(t,s):s<t,\ |X(t)-X(s)|>0\},\qquad
F(t,s)=|X(t)-X(s)|-(t-s).
$$

Let $\Gamma=\{F=0\}\cap\Omega$, let $\pi(t,s)=t$, and on $\Gamma$ put $r=t-s$ and $n=[X(t)-X(s)]/r$. On a smooth submersion chart where $\nabla F\ne0$, the formal scalar delta measure has the ordinary geometric interpretation

$$
d\lambda_X=\frac{g}{r^2}\frac{d\mathcal H^1}{|\nabla F|}
\quad\text{on }\Gamma.
\tag{1}
$$

Its vector acceleration measure is $n\,d\lambda_X$, pushed to reception time:

$$
\mu_X=\pi_*(n\lambda_X).
\tag{2}
$$

Formula (1) is a representation on a declared regular chart, not an automatic definition on every degenerate or nonsmooth history. The factor $g/r^2$ is positive for the same persistent identity. Signed root playback supplies no negative self weight.

On an emission-simple graph $s=s(t)$, write $D_t=F_s=1-n\cdot v(s)$ and $F_t=n\cdot v(t)-1$. The tangent length is $\sqrt{1+(s')^2}\,dt$, while $|\nabla F|=|D_t|\sqrt{1+(s')^2}$ by $F_t+F_s s'=0$. Consequently

$$
d\mu_X(t)=\frac{g\,n(t,s(t))}{r(t)^2|D_t(t,s(t))|}\,dt.
\tag{3}
$$

This is the canonical transmitter-weighted row, with no extra receiver multiplier. A reception turning point does not create an atom merely by changing playback. The ordinary positive-range fold gives an integrable density of order $|t-t_f|^{-1/2}$; its mass over a shrinking reception window tends to zero, rather than to a finite nonzero impulse atom.

For a less regular proposed continuation, the theorem below assumes a positive incidence measure rather than asserting that (1) is already defined. Its required properties are explicit:

1. A nonnegative scalar measure $\lambda_X$ is carried on the actual strict positive-delay set $\Gamma$, and the vector direction is the geometric $n$.
2. Its restriction to every simple pre-event-source chart agrees with (3), including a smooth source implicit map $s=S(t,x)$ composed with a locally Lipschitz receiver $x=X(t)$. On that selected graph the canonical density is required almost everywhere in reception time. Agreement only on open joint charts with smooth receivers would be insufficient for the bounded-variation theorem. Other admitted own contributions are retained with the same positive scalar sign. No boundary term supported on the removed diagonal is appended.
3. The weighted scalar mass above each compact reception window is finite, so $\pi_*\lambda_X$ is a locally finite measure and (2) is a locally finite vector measure.

The third condition is stronger than local finiteness on compact subsets of the open set $\Omega$. A compact reception window can lift to roots approaching the missing diagonal, leaving every compact subset of $\Omega$. Mass may diverge there even though every interior chart is regular. In the common-cone neighborhood used below, scalar mass and the positive projected vector mass are comparable, so the contradiction also rules out any ordinary vector-measure interpretation that retains that positive projection.

## 2. An empty event fiber has no direct atom

The accepted incoming history obeys $|v(s)|<1$ for every $s<0$, with $|v(0-)|=1$. Hence for every earlier emission

$$
|X(0)-X(s)|\le\int_s^0 |v(u)|\,du<-s.
$$

Thus $\Gamma\cap\pi^{-1}(\{0\})$ is empty. The zero-delay point $(0,0)$ is not in $\Omega$. For any measure having the support and pushforward interpretation above,

$$
\mu_X(\{0\})
=\int_{\Gamma\cap\pi^{-1}(\{0\})}n\,d\lambda_X=0.
\tag{4}
$$

This conclusion is about an empty measurable fiber, not about the pointwise value of a density. An ordinary density can concentrate under a separate parameter limit even if each density vanishes at zero; §6 treats that different operation.

The cross contribution in the accepted uniform population neighborhood is a bounded continuous function $R(t,X(t))$, hence its reception measure is $R\,dt$ and also has no atom at zero. Therefore a direct measure equation

$$
Dv=R\,dt+\mu_X
\tag{5}
$$

cannot prescribe a nonzero jump there. If $v$ has bounded variation, its event atom is $Dv(\{0\})=v(0+)-v(0-)$. Equation (4) forces both traces to equal the same unit vector $e$.

There is a stronger consequence than simply forbidding one jump coefficient: the resulting locally finite measure equation itself cannot continue past this event.

## 3. No direct positive-measure continuation with bounded-variation velocity

Assume a hypothetical continuation has continuous position with distributional derivative represented by a locally bounded-variation velocity $v$. Position is then locally Lipschitz and equals the integral of that velocity. Keep the fixed incoming history. Assume (1)–(3)'s measure requirements, the complete measure equation (5), and the bounded continuous cross trace

$$
e\cdot R(0,X(0))=\alpha>0.
$$

This class permits singular-continuous variation and jumps of velocity after zero. It does not assume absolute continuity on any outgoing interval. Its measure equation controls those components rather than discarding them in an almost-everywhere derivative equation.

### 3.1. The trace and the equation force an old-source root

By §2 the right velocity trace equals $e$. Choose a right-continuous bounded-variation representative. Its right limit at zero and the fixed incoming limit give $|v(u)-e|<1/2$ sufficiently close to zero, apart from irrelevant changes of representative on sets of measure zero. This suffices for every chord average of the continuous position.

As in the earlier root-localization proof, strict subunit incoming chords exclude every root whose emission stays a fixed distance below zero; the stationary remote past excludes arbitrarily old roots. Every nearby self root therefore has a short chord contained in the trace neighborhood. On that root,

$$
n=\frac1{t-s}\int_s^t v(u)\,du,
\qquad e\cdot n\ge\frac12.
$$

All own contributions consequently have nonnegative projection along $e$, including any singular reception component represented by the positive incidence measure. After shortening the interval, the measure equation yields

$$
D(e\cdot v)\ge\frac\alpha2\,dt.
\tag{6}
$$

Evaluating (6) on $(0,t]$ and using the right-continuous representative gives $e\cdot v(t)\ge1+\alpha t/2$. Integrating the velocity then gives

$$
e\cdot[X(t)-X(0)]\ge t+\frac\alpha4t^2>t.
\tag{7}
$$

Therefore $F(t,0)>0$ at every small positive reception. A fixed negative emission has negative residual by continuity from the event. Strict subunit speed of the fixed earlier path makes $F(t,s)$ strictly increasing in $s<0$, so there is exactly one negative-emission root $s(t)<0$. It is simple because

$$
D_t(t,s(t))\ge1-|v(s(t))|>0.
$$

Root localization gives $s(t)\to0$ and $\delta(t)=t-s(t)\to0$ as $t\downarrow0$.

### 3.2. The selected graph remains regular enough for an integral contradiction

The source of this root always lies in the fixed smooth earlier history. The equation $|x-X(s)|-(t-s)=0$ therefore has a locally smooth implicit solution $s=S(t,x)$ around each point of the selected graph. On any compact reception interval $[a,b]\subset(0,h)$, its source derivative has a positive minimum and its range is positive. Composition with the Lipschitz receiver $X(t)$ makes $s(t)=S(t,X(t))$ and $\delta(t)$ Lipschitz there. They are absolutely continuous and differentiable almost everywhere, even if $v$ itself has singular-continuous variation or jumps.

At almost every reception where $X'=v$, implicit differentiation gives

$$
\delta'=\frac{n\cdot[v(t)-v(s)]}{D_t}.
$$

The canonical source-simple chart agreement, explicitly including this Lipschitz receiver, fixes an absolutely continuous component of $\mu_X$ equal to the selected row (3). With a finite bound $M$ on incoming and outgoing velocities near zero,

$$
|A_s|\ge\frac{g}{2M}\left|(\delta^{-1})'\right|,
\qquad
e\cdot\mu_X\ge\frac12|A_s|\,dt.
$$

For fixed $b>0$ and $0<a<b$ this implies

$$
(e\cdot\mu_X)([a,b])
\ge\frac{g}{4M}\left|\delta(a)^{-1}-\delta(b)^{-1}\right|.
\tag{8}
$$

The right side tends to infinity as $a\downarrow0$. The left side is bounded by the assumed finite mass over a compact reception neighborhood of zero. This is a contradiction.

Thus a direct locally finite positive-history measure cannot balance any local bounded-variation velocity continuation. The earlier absolute-continuity restriction is unnecessary in this explicitly defined measure equation. The proof does not exclude all distributions or all possible regularization limits, because those need not be direct locally finite positive pushforwards on $\Omega$.

## 4. Application to the fixed lattice event

The accepted event has $e\cdot a(0-)>1.463081418064$ for every possible first identity, and uniform displacement below $0.265390942$. Retain a common local displacement neighborhood $B=7/20<1/2$ and the unchanged stationary block prescription. Supremum-norm continuity of the population positions at the event supplies this neighborhood. Coordinatewise continuity alone is insufficient for infinitely many labels.

Every distinct-label range is then at least $1-2B=3/10$. Receptions within $3/20$ after the event can sample only cross emissions before $-3/20$. All cross contributions consequently use the fixed earlier histories, whose finite nonstationary support and subunit source velocities give simple roots with a common transmitter margin. The stationary remainder is regular. Thus $R$ is bounded and continuous, and its event trace equals the incoming acceleration because there is no own root at zero. No uniform future speed bound or finite future disturbed support is needed for this argument.

The single-identity contradiction in §3 applies to any actual first identity, including simultaneous arrivals. It changes neither the accepted time bracket nor the unresolved ordering of the twelve candidates. It constructs no outgoing motion and establishes no damping or global lattice-instability theorem.

## 5. Fixed-history delay cutoffs: zero atom or infinite mass

For one fixed candidate path and its fixed positive incidence measure, let $\lambda_\varepsilon$ be the restriction to $t-s\ge\varepsilon$. The sets increase to $\Omega$ as $\varepsilon\downarrow0$. If the weighted scalar reception mass is finite on compact windows, monotone convergence gives the same direct pushforward, and the vector measures converge in total variation on each such window because

$$
\|\mu_X-\mu_{X,\varepsilon}\|_{\mathrm{TV},K}
\le\lambda_X\big(\pi^{-1}(K)\cap\{0<t-s<\varepsilon\}\big)\longrightarrow0.
$$

The limit has the zero atom (4). No finite nonzero event atom is generated by deleting and then restoring subsets of the same fixed positive-delay incidence measure.

If the selected common-cone root has the divergent mass (8), these same cutoffs have unbounded projected mass in every compact reception window containing a right neighborhood of zero. A nonnegative compactly supported test function equal to one on that neighborhood detects divergence. Hence there is no finite Radon-measure limit obtained by this cutoff exhaustion. A finite additional atom cannot repair infinite mass on every punctured right neighborhood. Infinite positive mass and a finite delta impulse are different mathematical objects.

## 6. Why varying-history limits and distributional extensions are separate

A weak limit of measures associated with changing paths or kernels can concentrate mass even when each approximating measure has zero atom at zero. A simple measure control is $f_\varepsilon(t)\,dt$, with $f_\varepsilon(t)=J/\varepsilon$ on $0<t<\varepsilon$ and zero elsewhere: against a continuous test function its limit is $J\varphi(0)$. This example demonstrates the logical possibility of concentration; it is neither a solution of the Master Equation nor evidence that any admissible history family produces a particular $J$.

Unlike fixed-history cutoff exhaustion, the measures in such a family need not be nested restrictions of one measure. The canonical regular-domain limit alone does not determine their boundary concentration. A claim that an unmodified-law limit selects an impulse must specify the path family and convergence topology, prove the complete causal-root and stationary-sum limits, and establish that the boundary mass and resulting motion are uniquely fixed. No such family or event update is selected here.

There is a second ambiguity if one abandons locally finite measures and asks only for an extension of off-event distributions. If $T$ is one such extension across zero, then $T+J\delta_0$ agrees with it on every test function supported away from zero, for every vector $J$. Off-event agreement therefore cannot fix even the coefficient that would represent a velocity jump. More singular boundary distributions can create further freedom, but that classification is not needed to demonstrate this ambiguity.

For the positive projected divergent branch, there is no positive distributional extension across zero. To see this directly, choose a nonnegative smooth test function $\varphi$ equal to one near zero and smooth functions $0\le\chi_\varepsilon\le\varphi$ supported away from zero whose integrals against the known branch density tend to infinity. An extension $T$ agreeing off zero must have $T(\chi_\varepsilon)\to\infty$, while positivity would require the single finite number $T(\varphi)$ to dominate all those values. A subtraction or finite-part prescription would discard this positive property and require additional mathematical choices. It is not obtained by the ordinary positive-delay pushforward (1)–(3).

## 7. Independent checks, scope and falsifiers

The independent references are the elementary graph Jacobian cancellation in §1, the empty-fiber pushforward identity, bounded-variation trace and measure inequalities, the fixed-old-source implicit graph, the canonical reciprocal-delay identity, and monotone cutoff convergence. They were derived before reading the concurrent subject. No physical simulation, kernel modification or prescribed future is used as evidence for the result.

The direct BV theorem would be falsified by a locally finite positive incidence measure with the declared strict support and canonical simple-chart agreement, together with a bounded-variation solution of (5), that violates either the empty-fiber identity or inequality (8). A boundary-supported addition, an uncontrolled cross remainder, loss of uniform population position control, or a varying-history limit is outside those hypotheses and is not a counterexample to that theorem. Nor is merely writing a delta symbol at a non-simple root a proof that its pullback or pushforward exists.

### Subject and domain reconciliation

The independently derived argument above accepts the complete [event-measure subject](smooth-two-particle-event-measure.md) and [domain audit](smooth-two-particle-event-measure-domain.md). The review checked the source-variable weight, geometric direction, strict incidence domain, empty event fiber, bounded-variation traces, common cone, measure inequality, locally Lipschitz implicit root, reciprocal-delay integral, compact reception mass, uniform population application and the distinction between fixed cutoffs and changing histories. Canonical agreement explicitly covers a locally Lipschitz receiver composed with a smooth old-source root map; no smooth outgoing interval is silently required.

The domain's positive-range kinematic control is also accepted: $X_r(t)=2te$, $X_j(s)=se$ on $-2<s<-1$ gives residual $F=t$, so its joint measure pushes to $(g/2)e\delta_0$. This is not the accepted lattice geometry or a coupled solution. It demonstrates that excluding the diagonal alone does not exclude every reception atom; the present theorem instead uses the actual empty event fiber. The domain's changing-density control demonstrates possible measure concentration without asserting that an admissible Master Equation family realizes it.

The new `measure-control.py` passed its known elementary antiderivative and invalid-domain controls before its target controls. Exact Fraction arithmetic then confirmed: the prescribed smooth self branch with $\delta=2t$ and $g=16$ has cutoff mass $4/\varepsilon^2-1$ on $\varepsilon/2<t<1$; a changing uniform density on $(0,\varepsilon)$ has moments $1,\varepsilon/2,\varepsilon^2/3$; a density $t^{-1/2}$ has mass $2\varepsilon$ on $(0,\varepsilon^2)$; and the positive-range kinematic atom above has coefficient $8$. These finite arithmetic controls corroborate exact examples, not the general theorem or any physical continuation. The general result rests on §§1–6.

The frozen subject SHA-256 is `be316f937b75519989507f058a7919b462daa8c4911d36a868614572ae622619`; the frozen domain SHA-256 is `2b8968a0b0c8b148b2178baef3001577685efd847ecfa6c8933137f0e983b999`. Six prior input hashes were rechecked using `shasum -a 256 -c` against the saved input manifest, with all six matching. Independent source snapshots, exact controls, known-first presentation receipts and hash manifests are retained under `.local-data/master-equation-closure/event-measure/independent/`. The presentation check covers KaTeX syntax, math delimiters, linked-file existence and whitespace, not mathematical validity. All prior equation, history and acceptance inputs remain frozen; no physical evolution, event update or publication was performed.
