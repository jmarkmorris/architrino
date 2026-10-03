# Independent adjudication of conditional downward wake-speed crossing

The [downward-crossing obstruction](downward-wake-speed-crossing-obstruction.md) is accepted on its stated local collinear solution class. A continuously differentiable path crossing strictly from above wake speed to below it creates a recent positive-delay self branch. Its transmitter factor is negative, but the unchanged equation uses its absolute value, so the branch accelerates forward. The accumulated contribution is infinite. A finite continuous receiver velocity can accommodate that branch only if the actual remaining rows have a nonintegrable negative projection.

**Claim grade: derived, conditional on the unchanged inverse-square law, strict local collinearity, finite continuous endpoint velocity, local absolute continuity of outgoing velocity and a well-defined complete remainder.** The proof below independently reconstructs the branch from the two sides of a maximum of $x(T)-T$, obtains the signed playback from the causal residual, and integrates the complete projected receiver equation. It accepts a conditional exclusion, not a universal two-sided speed barrier, a continuation rule or a population cancellation theorem. The [subject](downward-wake-speed-crossing-obstruction.md) and [reciprocal-delay reference](mec-008-self-delay-independent-adjudication.md) remain unchanged.

## Assumptions and the receiver-local account of acceleration

Set $c_f=1$. Let one persistent label have $\mathbf X(T)=\mathbf X_0+x(T)\mathbf e$ on $[-a,a]$, where $\mathbf e$ is a fixed unit vector, $x\in C^1$, $x(0)=0$ and $v=x'>0$. The crossing is strict:

$$
v(0)=1,\qquad v(S)>1\quad(-a<S<0),\qquad
0<v(T)<1\quad(0<T<a).
$$

No derivative of $v$ at zero is assumed. In particular, no transversality of the speed crossing and no power law are required. Suppose $v$ is locally absolutely continuous on $(0,a)$ and the [canonical equation](../../../../content/markdown/aaa/dynamics/master-equation.md#the-master-equation-canonical-form) holds almost everywhere there. The complete source histories and all admitted ordinary roots are retained. Any infinite acceleration sum must already have a justified meaning.

For the tracked self row, let $A_s(T)>0$ be its acceleration along $\mathbf e$. Define $\mathbf R(T)$ by the actual equation,

$$
\dot{\mathbf V}(T)=A_s(T)\mathbf e+\mathbf R(T),
\qquad b(T)=\max\{0,-\mathbf e\cdot\mathbf R(T)\}.
$$

Every other row belongs to $\mathbf R$, including other recent self roots, remote self roots and partner rows. This decomposition does not omit an inconvenient contribution or choose a counterterm. The theorem assumes $\int_0^{a_1}b(T)dT<\infty$ on some short outgoing interval. It requires neither a pointwise bound on the whole remainder nor a prescribed sign for its forward part.

Finite label count alone is insufficient to establish this condition: root count, range and transmitter margins can still degenerate. A finite number of opposing rows with uniform positive range and absolute transmitter margins is a sufficient special case. A separately justified infinite sum with finite negative projection is also covered. A nonintegrable negative projection lies outside the exclusion, without being asserted to exist.

## Geometry of the recent branch

Put $h(T)=x(T)-T$. Before crossing, $h'=v-1>0$; afterwards, $h'=v-1<0$. Thus $h$ has a strict maximum $h(0)=0$, with strictly increasing and decreasing branches on its two sides. A forward same-label causal chord from emission $S<0$ to reception $T>0$ satisfies

$$
x(T)-x(S)=T-S
\quad\Longleftrightarrow\quad h(T)=h(S).
$$

Since $x'>0$, any chord with these endpoints has positive displacement along $\mathbf e$, so the displayed scalar condition is the full positive-range norm condition. Fix an incoming interval $(-a/2,0)$. For all sufficiently small $T>0$, $h(T)$ lies between $h(-a/2)$ and zero. Strict monotonicity of the incoming branch gives a unique $S(T)\in(-a/2,0)$ with $h(S(T))=h(T)$. As $T\downarrow0$, continuity and strict monotonicity force $S(T)\uparrow0$. The delay $\delta(T)=T-S(T)$ is positive and tends to zero.

The inverse is continuously differentiable at every positive reception, because $h'(S(T))>0$ there. It need not have a bounded derivative at birth. Let

$$
w_-(T)=v(S(T))-1>0,\qquad w_+(T)=1-v(T)>0.
$$

These are the speed excess at emission and deficit at reception, evaluated along the tracked branch. Differentiating the scalar chord, or using the canonical signed root-playback identity, gives

$$
D_t=1-v(S(T))=-w_-(T),\qquad
D_r=1-v(T)=w_+(T),
$$

$$
S'(T)=\frac{D_r}{D_t}=-\frac{w_+(T)}{w_-(T)},
\qquad
\delta'(T)=\frac{w_-(T)+w_+(T)}{w_-(T)}>0.
$$

Every positive-time root in this branch is simple, even if its transmitter margin tends to zero at birth. The direction is exactly $\mathbf e$. Uniqueness is limited to the specified incoming emission interval. No completeness or uniqueness assertion about remote self roots has been inserted.

Equivalently, if $\rho=-S$, integration of the speed excess and deficit gives $F_-(\rho)=F_+(T)$ with $F_-'(\rho)=v(-\rho)-1$ and $F_+'(T)=1-v(T)$. This reproduces the subject's primitive construction. The two descriptions verify the same root without requiring speed derivatives at zero.

## Exact pullback of the acceleration measure

Self polarity is positive under the unchanged law. Let $K_i=\kappa|q_i|^2>0$. Range equals delay, and the transmitter magnitude is $w_-$, so

$$
A_s(T)=\frac{K_i}{\delta(T)^2w_-(T)}.
$$

Combining this row with the strictly increasing delay gives the exact measure identity

$$
A_s(T)dT
=\frac{K_i\,d\delta}
{\delta^2[\,w_-(T)+w_+(T)\,]}.
$$

The negative emission playback has been accounted for in $\delta'$; it does not make this measure negative. No receiver playback multiplier belongs in the instantaneous row. This distinction is essential: replacing the absolute transmitter weight by its signed counterpart would be a different equation.

Both speeds tend to one at their incident endpoint. Consequently $w_-+w_+$ tends to zero and has a finite positive upper bound $B_0$ on a sufficiently short interval $(0,a_1]$. The weaker boundedness is enough. For $0<\epsilon<t\le a_1$, change variable to delay to obtain

$$
\int_\epsilon^t A_s(T)dT
\ge\frac{K_i}{B_0}
\left[\frac1{\delta(\epsilon)}-\frac1{\delta(t)}\right].
$$

Since $\delta(\epsilon)\to0$, the right side tends to positive infinity. This is an infinite accumulated acceleration contribution, not a computed outgoing velocity or energy yield.

On every compact outgoing interval, the self row is continuous and finite. Local absolute continuity of $v$ and the actual equation therefore give

$$
v(t)-v(\epsilon)
=\int_\epsilon^t A_s(T)dT
+\int_\epsilon^t\mathbf e\cdot\mathbf R(T)dT,
$$

$$
\int_\epsilon^t A_s(T)dT
\le v(t)-v(\epsilon)+\int_\epsilon^t b(T)dT.
$$

The last right side stays finite as $\epsilon\downarrow0$ by endpoint continuity and the assumed opposing integral. This contradicts the divergent lower bound. Thus a canonical solution cannot have all the stated crossing and remainder properties. More quantitatively, any such finite-velocity crossing would have to satisfy

$$
\int_\epsilon^t b(T)dT
\ge\frac{K_i}{B_0}
\left[\frac1{\delta(\epsilon)}-\frac1{\delta(t)}\right]
-[v(t)-v(\epsilon)],
$$

which requires an infinite negative projection from the actual remainder as the birth is approached. This necessity neither constructs an environment supplying it nor licenses cancellation of individually undefined acceleration sums.

## Exact controls and arbitrarily flat crossings

The quadratic control $x(T)=T-\alpha T^2/2$ with $\alpha>0$ gives $h(T)=-\alpha T^2/2$. Matching its two branches yields $S(T)=-T$, $\delta=2T$, $D_t=-\alpha T$ and $A_s=K_i/(4\alpha T^3)$. Its prescribed acceleration is $-\alpha$, so it is not a canonical outgoing path with an integrable opposing remainder. This confirms the direction, absolute denominator and measure orientation algebraically.

Unequal crossing orders also fit the proof. For example, take $v(-\rho)=1+\alpha\rho$ and $v(T)=1-\beta T^3$ on sufficiently short intervals, with positive coefficients of the required dimensions. The matched primitives are $\alpha\rho^2/2=\beta T^4/4$, hence $\rho=cT^2$ with $c=\sqrt{\beta/(2\alpha)}$ and $\delta=T+cT^2$. The row is $K_i/[\alpha cT^2\delta^2]$, which diverges as $K_i(\alpha c)^{-1}T^{-4}$. This prescribed control demonstrates that the proof did not silently assume the symmetric delay $2T$.

For still flatter crossings, continuity and strict positivity of the excess and deficit remain sufficient to match the two monotone branches. Their derivatives can vanish to every order at zero. The measure proof still uses only bounded $w_-+w_+$ and $\delta\to0$. Flatness changes the branch parametrization, not the contradiction. No numerical instrument or trajectory run is needed for these controls.

## Relation to the accepted reciprocal-delay theorem

The [independent reciprocal-delay derivation](mec-008-self-delay-independent-adjudication.md#independent-reciprocal-delay-derivation) proves a connected-graph estimate from the canonical row. On any simple self graph,

$$
\|\mathbf A_s\|\,
\left|\mathbf n\cdot[\mathbf V(T)-\mathbf V(S)]\right|
=K_i\left|(\delta^{-1})'\right|.
$$

The present branch has $\mathbf n=\mathbf e$ and velocity difference $-(w_-+w_+)$. Its exact measure is a more specialized version of the same identity. It can therefore exclude a diagonal birth on that single graph when the endpoint velocity and actual opposing-integral conditions hold. Anchoring the estimate at any interior positive delay and integrating backwards needs no positive delay at the birth endpoint.

There is a useful distinction between decompositions. The reference treats the sum of a finite recent-root census in a common forward cone, with all remaining rows in its remainder. This theorem tracks one explicitly constructed forward row and puts all other actual rows in $\mathbf R$. The direct projected inequality above needs no separate finite census of those other rows; their meaning and finite negative integral are its hypotheses. The same proof mechanism applies, but one must not assert that the reference's entire population hypothesis set has been verified merely from this local branch.

The stronger [uniform floor across all root branches](mec-008-self-delay-independent-adjudication.md#why-the-floor-is-uniform-across-root-branches) additionally needs complete finite simple recent sections, regular initial and cutoff sections, backward lineage control and a positive entrance minimum. Those conditions compare different root graphs. They are unnecessary for the single-graph birth contradiction and are not satisfied automatically by it. A zero-delay birth cannot be defended by pointing to the absent initial entrance floor; it is already excluded by the connected-graph integral if its own opposing-integral and regularity conditions hold.

Accordingly, the subject's correction of the earlier broad reading is accepted. Denying direct use of the uniform entrance-floor theorem at a newborn branch was appropriate. Denying the connected-graph estimate itself would be too broad. The new local construction verifies which branch exists and which velocity/direction hypotheses hold; the finite opposing integral remains an explicit condition on the full equation.

## Verdict, falsifiers and preservation

| Claim | Verdict and falsifier |
| --- | --- |
| Strict $C^1$ collinear crossing creates a recent simple self graph | Accepted. A path satisfying the strict inequalities for which the matched $h$ branches fail the positive-delay chord equation would overturn this construction. |
| Negative transmitter factor gives forward self acceleration | Accepted under the canonical absolute weight. Direct substitution yielding a nonforward direction or different denominator would overturn it. |
| Acceleration pullback diverges at birth | Accepted. A valid change of variables on this branch yielding a finite integral despite bounded $w_-+w_+$ and vanishing delay would overturn the estimate. |
| Integrable actual opposing remainder excludes the crossing | Accepted. A complete canonical solution with finite continuous endpoint velocity and the stated negative-integral bound that violates the two integrated inequalities would falsify the result. |
| A universal two-sided wake-speed barrier follows | Not established. Noncollinear chords, touches without strict crossing, velocity jumps, singular lineages and nonintegrable opposing contributions need their own analyses. |
| A uniform delay floor for every graph is needed for this contradiction | Rejected. The connected-graph estimate anchored inside this explicit branch is sufficient; the uniform theorem serves a stronger quantifier. |

The only new durable edit in this assignment is this adjudication. The subject and reciprocal-delay reference were bound before drafting with `shasum -a 256` in `.tmp/logarithmic-collective-adjudication/downward-frozen.sha256`. Post-edit digest and Markdown/KaTeX checks verify preservation and document syntax; the mathematical acceptance is the independent proof above. No source equation, event rule, shared queue, history record, corpus claim, numerical instrument or variant selection was changed.
