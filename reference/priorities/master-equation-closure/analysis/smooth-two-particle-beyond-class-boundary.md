# Regular continuation beyond the first environmental displacement boundary

## Scope and status

The original environmental displacement ceiling $1/16$ was a restriction of the earlier proof domain. Its [first reach](smooth-two-particle-first-class-boundary-independent-adjudication.md) occurs at a time $\tau$ satisfying $5121/1024<\tau\le10339/2048$, while the selected targets are still rising. The present calculation proves regular continuation through $H=81/16=5.0625$, beyond that entire bracket, using the larger displacement neighborhood $B=3/32$. It also places a specific environmental displacement strictly outside the old ball at $H$.

**Status: [independently accepted unique regular continuation through $81/16$](smooth-two-particle-beyond-class-boundary-independent-adjudication.md).** The equation, complete supplied past, $g=16$, $c_f=1$, infinite alternating simple cubic lattice, one architrino per site, and original eight-source stationary summation are unchanged. The two selected targets remain the identities anchored at $(0,0,0)$ and $(1,0,0)$. Only the displacement neighborhood used to prove local continuation is enlarged. No numerical trajectory is evolved or reintegrated, and no physical state is reset at the old boundary.

## 1. Why the enlarged neighborhood defines the same dynamics

Write $X_i(t)=i+y_i(t)$. On the closed neighborhood $|y_i|\le B=3/32$, distinct-anchor separations satisfy

$$
|X_i-X_j|\ge1-2B=\frac{13}{16}.
\tag{1}
$$

Consequently, every causal emission received by $H$ obeys

$$
s\le H-\frac{13}{16}=\frac{17}{4}<5.
\tag{2}
$$

The accepted incoming histories through $17/4$ cover the endpoint as well as its interior. This first bound uses only the enlarged neighborhood and does not assume the improved source displacement. The accepted source-prefix norms then give $b<1/100$, sharpening the cutoff to

$$
s\le H-1+B+\frac1{100}=\frac{3333}{800}=4.16625
<\frac{267}{64}<\frac{17}{4}.
\tag{3}
$$

All source motion needed during this continuation is therefore already fixed by the accepted past. The 836 incoming histories exactly cover the first-front census through $17/4$. The potentially affected receiver set through $H$ has 1,278 identities, including the two targets; all occur in the previous 1,350-path allocation. This is a prospective finite set for the whole interval, not an asserted count of moving identities at the earlier unknown boundary time. The infinite stationary complement remains in the original block field.

The independent exact geometry receipt counts 79,256 possible actual generated correction rows on the enlarged receiver domain. Including 96 additional numerical-only rows gives an actual/comparison union of 79,352; the old-pulse support test retains 480 further rows across the population. These counts describe changes relative to the stationary sum, not a replacement of the infinite interaction by a finite graph. The selected witness and target unions contain 162 and 166 rows respectively, exactly covering the unchanged selected residual's row sets.

Let $S_0(y)$ denote that stationary block field. The previously proved solid-harmonic expansion is valid throughout $|y|<1$. With $q=B^2$, its remainder coefficients are

$$
\begin{aligned}
C_5(B)&=\frac{65}{2}\left[\frac6{1-q}+\frac{2q}{(1-q)^2}\right],\\
C_D(B)&=\frac{65}{2}\left[\frac{30}{1-q}+\frac{22q}{(1-q)^2}+\frac{4q(1+q)}{(1-q)^3}\right].
\end{aligned}
\tag{4}
$$

At $B=3/32$, exact rational evaluation gives $C_5<198$ and $C_D<992$. The subject uses the outward bounds $199$ and $1000$. In particular,

$$
\begin{aligned}
|S_0(y)|&\le14.3271|y|^3+199|y|^5,\\
\|DS_0(y)\|&\le3(14.3271)|y|^2+1000|y|^4.
\end{aligned}
\tag{5}
$$

These estimates are uniform convergence and derivative bounds for the same block-grouped infinite sum. They neither replace it by its cubic part nor alter its summation prescription. They also show that no stationary-field singularity occurs when a displacement passes $1/16$.

## 2. A finite system with fixed delayed inputs

For a distinct source and receiver, the causal equation has one simple positive root while the source history remains subunit in speed. The incoming histories have strict speed bounds, and their root denominators remain separated from zero. Implicit differentiation therefore makes each received contribution locally Lipschitz in the current receiver position. Together with (5), the acceleration field for a receiver has the form

$$
y_i''(t)=F_i(t,y_i(t)),\qquad 5\le t\le H,
\tag{6}
$$

where all delayed source arguments lie in the already accepted interval by (2). No unknown motion after $5$ appears on the right side. The finite potentially affected population thus gives ordinary nonautonomous initial-value equations with fixed incoming histories and an analytic stationary complement. The accepted actual positions and velocities at $5$ provide their initial data; numerical centers and errors are used only to enclose these data.

Local existence and uniqueness follow from the bounded locally Lipschitz field. Continue this local solution until $H$ or the first contact with $|y|=3/32$, speed $1/2$, or another regularity boundary. The estimates below keep all those bounds strict. Hence the locally unique solution continues through $H$. Its whole-history speed bound excludes positive own-history roots, so omitting such roots is a proved property of this solution, not a modification of the Master Equation.

This is an application of the [restricted local evolution lemma](smooth-two-particle-next-feedback.md#6-restricted-local-evolution-and-continuation-lemma) at the interior cut $a=5$. The step length $1/16$ is below the delay floor $13/16$, the stationary field is $C^1$ and vanishes at each anchor, and the accepted actual histories are $C^3$ with only finitely many disturbed labels and a common finite starting time. Their acceleration and jerk already satisfy the same equation at the cut, so the continuation joins smoothly. The lemma is applied to these actual histories, not to numerical interpolants. Its conclusion is uniqueness among regular continuations with this identical actual past in the enlarged domain.

This argument explains why crossing the old displacement ceiling causes no new physical event rule. Neither the root equation nor the acceleration field changes there, and no denominator or separation vanishes. The same solution passes through that former proof boundary.

## 3. Closing the displacement and speed estimates

For one changed source row, let $b,w$ bound source displacement and speed and let $r$ be a lower bound for its causal and stationary-interpolation ranges. Decomposing the displaced inverse-square vector from the transmitter denominator gives

$$
D(b,w,r)=\frac{2b}{r^3}+\frac{w}{r^2(1-w)}.
\tag{7}
$$

The first term follows from the derivative norm $2/r^3$ of $R/|R|^3$. The second bounds the difference between the causal denominator and one. Sixteen times the sum of (7), plus the stationary field (5), bounds the total acceleration. Actual generated rows are included by the exact first-front test. Every possible negative-time pulse row is retained using its support $[-11/8,-9/8]$; these rows have causal range greater than six on the new interval.

Each source bound uses the numerical prefix norm plus its accepted solution error. A preliminary range based on $b<1/100$ chooses the enclosing accepted prefix; only afterward is the range sharpened using that source's smaller $b$. The cumulative source-acceleration uncertainty includes all inherited errors before $13/4$. Zero error is assigned only on the intersection of actual and numerical zero prefixes. Thus the new domain changes neither the source data nor the uncertainty already attached to them.

The new known-first outward subject gives acceleration below $3.961969510616$. The independent rational reference uses slightly coarser incoming uncertainty and proves the following bound, which is used for the accepted continuation:

$$
|y_i''|<3.962883.
\tag{8}
$$

The largest queried source prefix is $267/64$. Its source displacement, speed and acceleration bounds are respectively below $0.005511463$, $0.019298632$ and $0.056915166$. The accepted initial population bounds are $P_5<0.062304432625$ and $V_5<0.177391004262$. Integrating (8) for at most $1/16$ yields

$$
\begin{aligned}
|y_i'|&<V_5+\frac{3.962883}{16}<0.425071193<\frac12,\\
|y_i|&<P_5+\frac{V_5}{16}+\frac{3.962883}{512}
<0.081131377<\frac3{32}.
\end{aligned}
\tag{9}
$$

These are whole-vector bounds for every potentially affected receiver, including both targets. The strict displacement margin exceeds $0.0126186$, so enlarging the permitted radius is not merely relabeling a failed estimate: the integrated equation keeps the solution strictly inside that larger region. The speed bound is likewise strict. The infinite complement remains stationary where the first-front exclusion applies.

The original acceleration allowance $256$ is amply satisfied. The independent row census permits at most 166 changed rows including possible old-pulse rows at one receiver. The source speed and acceleration remain below $1/32$ and $3/8$. With range $13/16$ and receiver speed below $1/2$, each changed-row time derivative has norm below $4.425563<6$. Equation (5) gives stationary derivative coefficient below $52|y|^2$, so

$$
|y_i'''|<16\left(166\cdot6+52\left(\frac3{32}\right)^2\frac12\right)=15939.65625<65536.
\tag{9a}
$$

Whole-history speed below $1/2$ preserves one simple cross-history root with residual slope greater than $1/2$, excludes positive own-history roots, and gives normalized own-history gap greater than $1/2$. The root-tube radius $1/256$ retains complement gap greater than $1/512$. Thus the existing required gaps $1/4$ and $1/1024$ remain strict. Equation (1) preserves positive separation, and bounded displacements of lattice anchors preserve finite density. No regularity boundary intervenes before $H$.

## 4. Reusing the original full-law residual correctly

The [preceding selected comparison](smooth-two-particle-first-class-boundary.md#4-two-quadratic-comparison-curves) supplied two quadratic curves, one for the environmental witness $w=(-1,0,0)$ and one for the right target. Their position, velocity and acceleration agree exactly with the frozen numerical endpoint at $5$. They remain unchanged here:

$$
\widetilde y_i(5+u)=\widetilde y_i(5)+u\widetilde v_i(5)+\frac12u^2\widetilde a_i(5),
\qquad0\le u\le\frac1{16}.
\tag{10}
$$

Their full-law residuals remain bounded by $0.025802910321$ and $0.115937197079$. Those residuals concern the comparison curves alone. Both curves stay inside $3/40$, so the earlier stationary remainder coefficient $197$ used in that residual remains valid and its receipt need not change.

The new actual solution may lie outside $3/40$. Every acceleration sensitivity comparing the actual and quadratic paths is therefore recomputed on their common convex neighborhood $3/32$, with the larger stationary derivative bound (5). Reusing the old residual does not reuse the smaller sensitivity domain. Source-error propagation again includes the union of actual and comparison rows. For these two receivers that union contains 328 generated rows in total. The supplied old pulses have already passed them; the stationary contribution is still present in $S_0$.

## 5. New error comparison and actual motion outside the old radius

For the vector error $e_i=y_i-\widetilde y_i$, received-source differentiation gives

$$
\|e_i''\|\le\lambda_i\|e_i\|+q_i.
\tag{11}
$$

Twice integrating this vector inequality gives a positive Volterra comparison. Scalar majorants $P_i,V_i$ solve $P_i'=V_i$, $V_i'=\lambda_iP_i+q_i$, starting from the accepted error norms at $5$. No second derivative of the Euclidean error norm is assumed. The new outward subject obtains

| Bound | Witness $(-1,0,0)$ | Right target |
| --- | ---: | ---: |
| $\lambda_i$ | $24.456693222$ | $44.589482845$ |
| $q_i$, including the unchanged full-law residual | $0.089213542400$ | $0.184819640263$ |
| $P_i(H)$ | $0.004296913711$ | $0.004910896402$ |
| $V_i(H)$ | $0.026451364459$ | $0.039962681284$ |
| Uniform acceleration-error bound | $0.194301842809$ | $0.403793971119$ |

Positive Taylor-series kernels with exact rational tail bounds propagate the subject majorants at step $1/2048$. The independent reference uses the larger convenient coefficients $(\lambda_w,q_w)=(25,23/250)$ and $(\lambda_{\rm target},q_{\rm target})=(45,47/250)$, evaluated with separate exact rational positive series. The actual solution already exists through $H$ by (9), so the resulting endpoint intervals are actual continuation statements, not contradiction values for a hypothetically unexited solution. Even the coarser independent estimate gives

$$
z_w(H)>0.06437605151>\frac1{16}.
\tag{12}
$$

Thus this specific environmental architrino has moved strictly beyond the original displacement radius by $H$. Its reflected partner at $(2,0,0)$ has the same vertical motion. Neither is proved to be the first identity that reached the old radius.

The independently accepted right-target endpoint intervals, rounded outward, are

$$
\begin{aligned}
z(H)&\in[0.042549284968,\ 0.052389561060],\\
z'(H)&\in[0.126311449164,\ 0.206851971190],\\
z''(H)&\in[0.087415267767,\ 0.906227691897].
\end{aligned}
\tag{13}
$$

The quadratic target velocity increases and its quadratic acceleration is constant. Subtracting the independent nondecreasing error majorants gives the accepted continuous bounds

$$
z'(t)>0.09526010667,
\qquad z''(t)>0.08741526776,
\qquad5\le t\le\frac{81}{16}.
\tag{14}
$$

The other target has identical vertical motion by the original symmetry and uniqueness. Both continue to rise and accelerate upward after the certified first environmental boundary. The next target maximum remains unfound; passing this proof boundary does not establish a later turn, eventual damping, or a long-time outcome.

## Evidence, independence and limits

New continuation instruments and their known-first receipts are retained under `.local-data/master-equation-closure/beyond-class-boundary/continuation/`. They read the frozen accepted incoming errors, source-prefix norms, endpoint arrays and first-boundary residual receipt. No earlier subject, independent reference, supplied history or numerical array is altered. The stationary-domain bounds (4), changed-row estimate (7), ordinary differential equation continuation argument and positive Volterra comparison are the mathematical references.

The [independent adjudication](smooth-two-particle-beyond-class-boundary-independent-adjudication.md) accepts the enlarged analytic domain, source completeness, existence and uniqueness argument, strict bootstrap, regularity bounds, actual passage beyond the old radius, and continuous target signs. The claim would fail if a required emission lay after the accepted source prefix, a causal root or received row were omitted, the stationary block sum lacked the uniform bounds (5), a source error were queried without an accepted enclosing prefix, a displacement or speed inequality in (9) failed, or the continuous sign bounds in (14) were nonpositive. The result remains a finite continuation for this specified preparation and is not a claim about typical populated-universe behavior.
