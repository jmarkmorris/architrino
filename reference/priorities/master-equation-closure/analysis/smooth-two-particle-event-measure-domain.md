# Does the history integral determine an instantaneous velocity change?

## Scope and conclusion

This independent domain audit keeps the accepted supplied history, infinite alternating lattice, grouped stationary sum, $g=16$ and $c_f=1$. It investigates whether the canonical history integral itself determines an acceleration measure with a finite atom at the first wake-speed event. An atom of vector size $J$ means an instantaneous velocity change $J$. No regulator, event rule or generalized equation is adopted here.

**Derived conclusion, [independently accepted](smooth-two-particle-event-measure-independent-adjudication.md):** a fixed-path positive-delay history measure, when its absolute weighted mass is finite over compact reception intervals, has no self atom at this event. Its reception-time fiber contains no admitted positive-delay own root. Removing a positive-delay cutoff from that same fixed measure cannot create an atom there. The independent measure argument further excludes every finite bounded-variation velocity continuation satisfying that direct positive-measure equation and canonical agreement on the fixed-old-source charts. If the positive contribution instead diverges, the result is failure of a finite measure, not a finite impulse selected by the formula. A weak limit of measures from different histories can concentrate at the event; the displayed canonical expression and its regular-chart equivalence alone do not determine that different limit.

This distinction does not establish multiple solutions of the coupled Master Equation. A formal addition $J\delta_0$ to off-event acceleration data is an extension of a measure, not a proof that the resulting path generates that acceleration from all its causal histories. The right-state and event-measure questions left open by the [accepted weaker-continuation assessment](smooth-two-particle-weaker-continuation-independent-adjudication.md) remain open outside the precise fixed-path interpretation below.

## 1. What the canonical expression defines

The [path-history integral](../../../../content/markdown/aaa/dynamics/master-equation.md#path-history-sum-and-integral-representation) is presented as a distributional encoding of the causal-root sum. Its collapse in emission time is justified when the active roots are simple. The [canonical form and exclusions](../../../../content/markdown/aaa/dynamics/master-equation.md#conventions-and-exclusions) retain strictly earlier emissions and exclude zero separation. They expressly do not certify a finite transition at a same-transmitter birth from that boundary. The [auxiliary regulator section](../../../../content/markdown/aaa/dynamics/master-equation.md#auxiliary-dual-mollified-regulator-for-proof-and-computation) requires a convergence and event certificate before extending the regular-domain formula to a singular chart.

Translate the event to reception time zero. Write $t$ for reception, $s$ for emission, $\tau=t-s$, and

$$
r(t,s)=|X_i(t)-X_j(s)|,\qquad
n(t,s)=\frac{X_i(t)-X_j(s)}{r(t,s)},\qquad
Q_X(t,s)=r(t,s)-(t-s).
$$

The subscript $X$ stresses that the whole retained path is fixed when evaluating this functional. The coupling $g$ is distinct from the residual $Q_X$. On a positive-range differentiable chart,

$$
\partial_sQ_X=D_s=1-n\cdot V_j(s),\qquad
\partial_tQ_X=-D_r=n\cdot V_i(t)-1.
$$

For a fixed $t$, a simple root $s_\ell(t)$ contributes $g\sigma_{ij}n/(r^2|D_s|)$. A nonsimple root does not become a defined finite number merely by writing $\delta(Q_X)$: the familiar one-variable composition and root-collapse formula require their hypotheses. In particular, when a continuum of emission roots appears, the expression cannot still be evaluated as a finite ordinary sum of simple rows.

The equal-magnitude self coefficient is positive, $\sigma_{ii}=1$. The infinite other-label sum retains its accepted grouping throughout this audit. No absolute-summability assertion about the entire stationary lattice is made.

## 2. A joint history measure and its reception pushforward

There is a mathematically useful enlargement of the evaluation viewpoint that must be stated explicitly. On the strict causal domain

$$
\Omega=\{(t,s):s<t,\ r(t,s)>0\},
$$

suppose $Q_X$ is continuously differentiable and its joint gradient is nonzero on the zero set. Then the delta on the two-variable chart has the usual level-curve meaning

$$
d\nu_X
=g\sigma_{ij}\frac{n}{r^2}
\frac{d\mathcal H^1|_{\{Q_X=0\}}}{|\nabla Q_X|},
\qquad
d\lambda_X
=\frac{g}{r^2}
\frac{d\mathcal H^1|_{\{Q_X=0\}}}{|\nabla Q_X|}.
$$

Here $\mathcal H^1$ is arc length along the causal curve, and the positive scalar measure $\lambda_X$ bounds the absolute vector contribution. The reception measure is the pushforward $\mu_X=\pi_*\nu_X$, where $\pi(t,s)=t$ means that every causal contribution is assigned to its reception time. This definition is valid over a compact reception window $K$ when $\lambda_X(\pi^{-1}K)<\infty$. Local finiteness on compact subsets of the open $(t,s)$ domain alone is insufficient: $\pi^{-1}K$ can approach the excluded diagonal, where the inverse-square factor diverges.

For a less regular path, one may state a conditional theorem by assuming a nonnegative scalar incidence measure carried by $\Gamma=\{Q_X=0\}\cap\Omega$, with geometric direction $n$, finite projected-window scalar mass, and agreement with the canonical density on every applicable smooth-old-source simple chart. This agreement includes a smooth source implicit map $s=S(t,x)$ composed with a Lipschitz receiver $x=X(t)$: the selected branch must carry the density $g n/(r^2|D_s|)\,dt$ almost everywhere. Requiring agreement only on open joint charts with a smooth receiver would leave a gap for arbitrary bounded-variation histories, which need not have such smooth intervals. This is an explicit hypothesis, not an assertion that a delta pullback exists on an arbitrary bounded-variation history. “Carried by” means the measure assigns zero mass outside $\Gamma$. Its topological support in the ambient closed plane may still meet the diagonal; accumulation near a boundary differs from positive measure assigned to that boundary.

This construction recovers the canonical regular formula. Where $D_s\ne0$, write the curve as $s=s(t)$. Since $s'=D_r/D_s$,

$$
\frac{d\mathcal H^1}{|\nabla Q_X|}
=\frac{\sqrt{1+(D_r/D_s)^2}}{\sqrt{D_r^2+D_s^2}}\,dt
=\frac{dt}{|D_s|}.
$$

Thus the receiver factor has not been inserted as a new instantaneous multiplier. If instead the chart is written $t=T(s)$ with $D_r\ne0$, its emission parametrization contains $ds/|D_r|$; pushing it to reception recovers the same measure. These are two coordinate descriptions of one curve measure, not two laws.

A finite-order emission fold can have $D_s=0$ while $D_r\ne0$. The joint measure then remains regular on a positive-range chart although its reception density is unbounded. For the canonical ordinary fold that density is proportional to $|t-t_f|^{-1/2}$, and its mass in a shrinking reception window tends to zero. The [finite-impulse lemma](../../../../content/markdown/aaa/dynamics/master-equation.md#caustic-transit-and-finite-impulse) therefore supplies no nonzero point atom.

If both joint derivatives vanish, if the path is not differentiable on the relevant locus, or if the weighted measure is not finite up to the projected boundary, this chart construction does not supply the missing definition. No such singular locus is silently discarded.

## 3. Fixed-path cutoff exhaustion cannot create this event atom

For the selected first-event identity, the accepted incoming history is strictly subunit before zero. Consequently,

$$
|X_i(0)-X_i(s)|< -s\qquad(s<0).
$$

There is no positive-delay own root at reception zero. The only formal coincidence is $s=t=0$, outside $\Omega$. This conclusion uses the unchanged incoming history and continuous position at the event; it does not depend on which outgoing velocity is proposed.

Suppose a fixed-path own incidence measure of §2 is well defined on its admitted charts and has finite scalar mass over compact reception windows containing zero. More generally, the following argument needs only a fixed positive dominating measure carried by the admitted incidence set, so it also applies to a separately justified singular chart with those properties. Then

$$
\mu_X(\{0\})
=\nu_X\bigl(\{(0,s)\in\Omega:Q_X(0,s)=0\}\bigr)=0.
$$

Now retain only delays $\tau\ge\varepsilon>0$, using restrictions of that same measure:

$$
\mu_{X,\varepsilon}
=\pi_*\bigl(\mathbf1_{\{\tau\ge\varepsilon\}}\nu_X\bigr).
$$

For each compact reception window $K$,

$$
\|\mu_X-\mu_{X,\varepsilon}\|_{\mathrm{TV}(K)}
\le\lambda_X\bigl(\pi^{-1}K\cap\{0<\tau<\varepsilon\}\bigr)
\longrightarrow0.
$$

The sets on the right decrease to the empty set and have finite dominating measure. Thus this cutoff removal converges in total variation, which is stronger than weak convergence; it retains the zero event atom. Equivalently, the fixed positive measure can first be exhausted by its admitted positive-delay pieces and then pushed forward. No mass is added at the excluded boundary.

This is not the incorrect general inference that atom-free approximants always have an atom-free weak limit. The decisive additional facts are a single fixed measure, restriction cutoffs, and finite absolute weighted mass up to the reception window. If these fail, the assertion has not been proved. Signed conditional cancellation without such domination would require its own convergence prescription; the accepted grouped stationary remainder is treated separately and supplies no adjustable cancellation.

In the common-cone classes already excluded by the [weaker-continuation proof](smooth-two-particle-weaker-continuation-domain.md), the positive projection of a selected simple own branch has infinite integral as its delay tends to zero. The scalar mass is therefore not finite near the boundary. Removing the cutoff produces divergence there. Replacing that divergence by a finite vector atom would require a new, justified limiting or subtraction construction; it is not the value of the fixed positive exhaustion.

For the actual lattice, the uniform position neighborhood $B=7/20$ bounds every distinct-label causal range below by $1-2B=3/10$. On a sufficiently short outgoing window all cross emissions remain in the fixed smooth subunit past. The accepted grouped cross contribution is bounded and continuous, hence contributes an ordinary density $R(t)\,dt$ with no event atom. This application retains the same uniform-neighborhood qualification as the accepted theorem.

## 4. What the diagonal convention does and does not decide

The convention $H(0)=0$ acts on the delay $\tau=t-s$. It excludes the simultaneous emission-reception diagonal; it is not a rule setting every reception-time atom at $t=0$ to zero. Positive-delay emissions could in principle all arrive at one reception time in a different singular geometry. At the present first event, the relevant own fiber is empty by the strictly subunit incoming chord inequality, and the actual cross field is regular. Those geometric facts, together with the finite-measure hypothesis, establish the zero-atom result.

Nor does writing $H(0)=0$ justify multiplying an undefined distribution by a discontinuous factor. One can restrict an already defined measure to the strict causal domain; that operation says nothing by itself about the existence of a limit that accumulates on the deleted boundary. Restriction to an open set need not commute with a weak limit whose mass reaches its boundary.

### Exact positive-range control: a joint measure can have a reception atom

This control distinguishes a general measure statement from the specific first-event geometry. It is a prescribed local kinematic example, not a solution or approximation to the lattice dynamics. Choose one unit vector $e$, receiver $X_r(t)=2te$, and transmitter $X_j(s)=se$ restricted to the emission window $-2<s<-1$. Near $t=0$,

$$
r=2t-s>0,\qquad n=e,\qquad Q_X=t,\qquad D_s=0,\qquad D_r=-1.
$$

The joint gradient is nonzero even though every emission in that window arrives at $t=0$. Its joint-history pushforward is

$$
\mu_X
=ge\left(\int_{-2}^{-1}\frac{ds}{s^2}\right)\delta_0
=\frac g2e\,\delta_0.
$$

This exact chart has positive delay and positive range; excluding the diagonal does not remove it. It has a persistent nonsimple emission interval, outside the canonical ordinary-fold theorem and regular simple-root acceptance. It shows only why a blanket statement that every joint history pushforward must be atom-free would be false. The accepted incoming self history cannot contain this fiber.

## 5. Different histories can concentrate while agreeing away from the event

A second exact control concerns limits of measures, not causal dynamics. For a fixed vector $J$, define

$$
d\eta_n(t)=J\,n\,\mathbf1_{(1/n,\,2/n)}(t)\,dt.
$$

Every $\eta_n$ has zero atom at zero, vanishes on every fixed compact set away from zero for large enough $n$, and has total vector mass $J$. For every continuous test function $\varphi$,

$$
\int\varphi\,d\eta_n
=J\int_1^2\varphi(u/n)\,du
\longrightarrow J\varphi(0).
$$

Thus $\eta_n\rightharpoonup J\delta_0$. These measures are not restrictions of one fixed finite incidence measure. They also have not been generated from Master Equation paths, so the arbitrary choice of $J$ proves no physical nonuniqueness.

The distinction matters if one considers histories $X_n$ that vary with a regulator, a cutoff, a numerical grid or a transition scale. Regular-chart convergence of $X_n$ and their acceleration densities away from zero leaves the concentrated mass undecided. A sufficient way to rule out an event atom is a bound such as

$$
\lim_{h\downarrow0}\ \sup_n
\|\mu_{X_n}\|_{\mathrm{TV}((-h,h))}=0.
$$

A finite nonzero impulse would instead require a proven vector-mass limit, controlled total variation, and a theorem tying the limiting path to those same history measures. Neither type of statement follows from the regular simple-root identity alone. Pointwise convergence of integrands away from the diagonal cannot replace it.

## 6. Formal extension freedom is not coupled dynamical freedom

Suppose an acceleration measure is specified only on a punctured reception interval. If two finite vector Radon measures extend it across zero, their difference is supported at the singleton $\{0\}$ and therefore equals $J\delta_0$ for some vector $J$. This elementary extension statement is conditional on existence of at least one finite extension. If the off-event positive variation is infinite near zero, no such finite extension exists. Allowing more general distributions would introduce a different class, potentially including derivatives of delta; those are not finite velocity-impulse measures.

For a bounded-variation velocity with finite one-sided traces, a distributional motion equation would require

$$
DV=\mu_X+R(t)\,dt,\qquad
V(0+)-V(0-)=\mu_X(\{0\}).
$$

The fixed-path measure of §3 assigns zero to the right side and therefore cannot generate a nonzero jump. A nonzero addition $J\delta_0$ would have no admitted incidence in the event fiber; it is extra boundary data, not an undetermined coefficient within the direct positive-delay pushforward. This is a precise conclusion for that formulation and does not require guessing the direction of the proposed jump.

The [independent stronger proof](smooth-two-particle-event-measure-independent-adjudication.md#3-no-direct-positive-measure-continuation-with-bounded-variation-velocity) also rules out the resulting continuous-trace bounded-variation passage. The zero atom gives the matching right trace $e$, so sufficiently short own chords all satisfy $e\cdot n\ge c>0$. The complete positive incidence measure and the incoming cross trace $e\cdot R(0)=\alpha>0$ imply the measure inequality

$$
d(e\cdot V)\ge\frac\alpha2\,dt.
$$

Integration as a measure forces $Q_X(t,0)>0$. The fixed strictly subunit past therefore supplies the same unique negative-emission simple root as before. Because position is locally Lipschitz and the source remains smooth, this selected root is Lipschitz on each compact positive reception interval. Its canonical density and reciprocal-delay identity hold almost everywhere, giving

$$
\frac{cg}{2M}\left|\left(\tau^{-1}\right)'\right|dt
\le e\cdot d\mu_X,
$$

where $M$ bounds the finite local velocity. As $\tau(t)\to0$, the left side has infinite mass near zero, contradicting finite reception variation. The argument controls singular-continuous velocity variation through the measure equation; it does not discard that variation by considering only an almost-everywhere derivative.

Positivity is indispensable in this statement. An arbitrary finite signed vector measure is not enough to represent the canonical self interaction. The direct construction uses $n\,d\lambda_X$ with $\lambda_X\ge0$ and its genuine pushforward. In the common cone, $e\cdot\mu_X\ge c\,\pi_*\lambda_X$, so finite reception variation entails finite scalar mass locally. A conditionally cancelled vector series that fails this domination is not licensed by the statement “finite vector total variation.” None of these assumptions requires the topological support to stay a positive distance from the diagonal.

Conversely, appending $J\delta_0$ formally changes $V(0+)$, which changes the subsequent position history, its causal roots and its future received acceleration. The new path must satisfy the entire coupled equation, not just the same off-event formula written with an unspecified $X$. Demonstrating that two measure extensions agree away from zero does not demonstrate that either one, or both, is generated by a lawful continuation from the fixed supplied past.

The present canonical text gives no accepted singular event prescription selecting a nonzero $J$. It does not prove that every possible same-law varying-history limit is impossible. A limit derived uniquely from the unchanged interaction would need its own convergence, source-velocity-at-event, complete-root and coupling theorem before it could supply that prescription.

## 7. Evidence boundary and falsifiers

This is a mathematical domain audit, with no numerical evolution and no change to the equation or retained histories. The exact controls are the regular-chart Jacobian identity, the empty first-event own fiber, continuity from above of one finite dominating measure, the positive-range prescribed-path atom, and the elementary concentrating-density limit. The last two distinguish mathematical possibilities; neither is a coupled lattice solution.

The fixed-path conclusion would be falsified by a finite, absolutely dominated incidence measure carried by the stated strict causal set whose reception pushforward has nonzero mass at an empty fiber, or by a failure of the displayed total-variation estimate for its restriction cutoffs. A nonzero atom from a changing sequence of histories would violate neither statement. It would address the separate unresolved convergence question.

Audited input hashes, the source snapshot, presentation checker, known-control receipt and final check are retained under `.local-data/master-equation-closure/event-measure/domain/`. The presentation checker verifies KaTeX syntax, math delimiters, linked-file existence and whitespace; it does not validate the mathematics. All prior equation, history, proof and acceptance inputs remain unchanged. Independent mathematical review accepted this audit, including the positive-range atom control and the explicit Lipschitz-receiver source-chart qualification. The acceptance does not select a varying-history boundary limit or an outgoing state.
