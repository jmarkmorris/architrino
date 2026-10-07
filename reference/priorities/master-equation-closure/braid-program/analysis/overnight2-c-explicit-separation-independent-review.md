# Independent review of the constructive subfield separation bound

## Scope and known-first record

The frozen subject is [the explicit global separation theorem](overnight2-c-explicit-global-separation.md), with digest `7efea6ce8074cde8732a6f724759258f16855b3ce9e6f1709eaab75c1fab4367` measured by `shasum -a 256`. Its explicit assumption that simultaneous member positions are distinct was included in the reviewed source. The class has three fixed neutral antipodal unit-polarity pairs on complete common-center circular histories, minimum radius one, maximum radius at most a fixed $R\ge1$, positive angular rate, strictly subfield speeds, coefficient-one logarithmic reception and unchanged transmitter weighting. This review does not modify that subject.

Before evaluating target constants, `"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-explicit-separation-independent-check.py --stage known` passed the separately authored [checker](../evidence/overnight2-c-explicit-separation-independent-check.py). In addition to the known rational sum $1/3+1/6=1/2$, its integer-based power-of-ten bracket function returned $[-3,-2]$ for $1/1000$, $[-1,0]$ for $99/100$, $[0,1]$ for $3/2$ and $[4,5]$ for $10000$, where $[p,p+1]$ means $10^p\le x<10^{p+1}$. This tests equality boundaries and both signs of exponent before the target. The source SHA-256 is `7a618f36886ed92b42c2c4241557c58ae7f3c12371eab3cdd25127c990f37baf`, and the known receipt is `.local-data/master-equation-closure/overnight2-c/review-explicit-known.json`.

All target arithmetic uses exact rational operations and integer comparisons; there is no floating conversion, logarithm or underflow-prone decimal evaluation. The analytic argument below remains the independent reference for the geometric and functional claims.

## Verdict and complete-root boundary

**Derived and independently reconstructed:** the proposed explicit lower bound $\delta$ is supported throughout the stated class. The improved inverse estimate, full response-segment argument, maximal-phase sign exclusion and closest-pair construction all survive independent reconstruction. No mathematical defect was found. The constant is positive and explicit, but extremely weak at $R=35$; this is a quantified strength statement, not an empirical computational-cost claim.

The distinct-position assumption is essential to the claimed census. With that assumption and strictly subfield complete circular source histories, delay minus distance is strictly increasing in each partner channel, starts negative and reaches nonnegative values by the sum of radii. Each of the thirty directed partner channels therefore has exactly one positive root with $D>0$. Each self displacement is strictly shorter than the wake distance, giving no positive self root. All roots are accounted for. The proof does not discard coincident-label channels to preserve this census; such configurations are expressly outside its class.

The [closed-subfield root-bound adjudication](overnight2-c-root-bound-independent-review.md) independently establishes $|A|\le256R^2/d^3$, $\tau\le(224R^2d)^{1/3}$ and the isolated-pair cutoff used below. Those results do not depend on the present explicit global bound, so this composition is not circular.

## Improved inverse estimate

Fix a receiver $x$ with $v=uJx$, $q=|v|<1$, and a nonzero unsigned response vector $k$. The independently differentiated reconstruction map in the [uniform-separation review](overnight2-c-uniform-separation-independent-review.md) is

$$
n=k/|k|,\quad D=1-n\cdot v,\quad \tau=(|k|-v\cdot k)^{-1},\quad
Y=R(u\tau)(x-\tau n),
$$

$$
DY=\tau^2R(u\tau)\left[(n-v+u\tau Jn)(n-v)^{\mathsf T}-D(I-nn^{\mathsf T})\right].
$$

These are identities for actual rows and define a smooth mathematical map on all nonzero responses because $q<1$. The reconstructed source may leave the physical parameter box along a response segment; none of the following estimates require a source-speed bound at those intermediate points.

Suppose $0<u\tau\le2$ and put $\bar v=(x-R(-u\tau)x)/\tau$, $L=|n-\bar v|$ and $d=|Y-x|=\tau L$. The sine bound on $0\le u\tau/2\le1$ gives

$$
L\ge1-q\operatorname{sinc}(u\tau/2)\ge1-q+\frac{q u^2\tau^2}{28},\qquad L\le2.
$$

Average receiver acceleration bounds $|v-\bar v|\le uq\tau/2\le u\tau/2$. Using $2D=|n-v|^2+1-q^2$ gives

$$
D\le L^2+\frac{u^2\tau^2}{4}+(1-q),\qquad
\|DY\|\le\tau^2(3D+u\tau\sqrt{2D}).
$$

For $q\ge1/2$, one has $u^2\tau^2\le56L$, so $D\le(2+14+1)L=17L$ and $d\ge u^2\tau^3/56$. Substituting these bounds into the derivative estimate gives

$$
\|DY\|\le51\tau d+\sqrt{34}\,u\tau^{5/2}\sqrt d
\le(51+\sqrt{1904})\tau d<95\tau d.
$$

The final strict inequality follows from $44^2-1904=32>0$. For $q<1/2$, $L>1/2$ and $D<3/2<3L$. Thus $\|DY\|\le\tau^2(9L+2\sqrt{6L})<16\tau^2L$, since $2\sqrt{6L}/L\le\sqrt{48}<7$. Both cases justify the common uniform bound $\|DY\|\le95\tau d$ for every receiver speed below one on the stated inverse domain. No limit $q\to1$ or lower bound on $u$ is needed.

If two actual rows at this receiver differ by at most $M$ and $\tau_1\le1/(760M)$, the two-Lipschitz function $f(k)=|k|-v\cdot k$ obeys $f(k(t))\ge1/\tau_1-2M\ge1/(2\tau_1)$ along their straight response segment. This both excludes zero from the segment and bounds $\tau(t)\le2\tau_1$. Minimum radius one and subfield speed imply $u<1$, while $M\ge1$; hence $u\tau(t)<2$ throughout. All hypotheses of the inverse bound therefore hold at intermediate points, not merely endpoints.

With $d(t)=|Y(k(t))-x|>0$, the derivative bound gives $|d'|\le190M\tau_1d$ and $|Y'|\le190M\tau_1d$. Integrating gives

$$
|Y(k_2)-Y(k_1)|\le d(0)\left(e^{190M\tau_1}-1\right)<\frac13d(0).
$$

Indeed $190M\tau_1\le1/4$, whereas $\log(4/3)=\int_1^{4/3}t^{-1}dt>1/4$. The strict inequality follows analytically; no floating evaluation of the exponential or logarithm is used. This result assumes no comparable source-separation scales.

## Maximal-phase sign theorem and the bounded pilot condition

Suppose one same-polarity endpoint from each pair has phases in a common real interval of width $W<\pi-2$. Reversing all polarity labels, if needed, leaves every polarity product unchanged and permits calling these the positive endpoints. Select their maximal-phase member as receiver. For each other positive endpoint write its phase difference as $-\alpha$, with $0\le\alpha\le W$. At every positive root, $0<u\tau\le u(a+b)<2$. The same-polarity source therefore has delayed angle $-\alpha-u\tau\in(-\pi,0)$, yielding a positive tangential row. Its antipode has delayed angle $\pi-\alpha-u\tau\in(0,\pi)$ and opposite polarity, again yielding a positive tangential row. The receiver's own antipode has $\alpha=0$ and obeys the same strict sign.

There are exactly two other same-polarity partners and three opposite-polarity partners at this receiver, all with positive delays and factors. All five tangential contributions are strictly positive; no positive self row exists. The required circular tangential acceleration is zero. Thus this phase sector cannot contain an exact reference. This is a local phase-region statement, not a universal tangential sign assertion.

The parent additionally requested adjudication of the sharpened sufficient box condition $W_B+2\omega_{\rm hi}r_{3,\rm hi}<3<\pi$. It is valid by the same proof: every point's positive-endpoint phase width is at most $W_B$, and every row satisfies $\omega\tau\le\omega(a+b)\le2\omega_{\rm hi}r_{3,\rm hi}$. The maximal-phase receiver may vary from point to point; the contradiction still excludes every point in the box.

Direct `cat` inspection of `overnight2-c-phase-sector-pilot.py`, whose SHA-256 was measured as `a2a376393b39e5f51fc776ecf6b466c78ca96db480d5844b1af1b0388caee694`, confirms that it uses the rational hull of the two phase intervals together with $\phi_1=0$ for $W_B$. It uses the declared angular-rate and outer-radius upper endpoints and a strict comparison with three. It applies no polarity-changing half-turn wraps. Its dyadic decoding and parameter indices match the declared five-coordinate frozen subfield domain. This is a source-level adjudication of the criterion, not independent target execution or replay of the saved residual baseline. No pilot exclusion count is certified by this review.

## Constructing the global separation cutoff

For fixed $R\ge1$ define $M=1+768R^2$, $\eta=[448R^2(760M)^3]^{-1}$ and

$$
\delta=\min\left\{\eta,\frac1{1792R^2(1+1024R^2/\eta^3)^3}\right\}.
$$

These numbers are positive, and $\eta<1/8$ follows already from $R\ge1$ and $M\ge1$. Suppose a closest distinct-member distance $d<\delta$ is attained by $i,j$. They are not antipodes because an antipodal separation is at least two.

If all other four partners of receiver $i$ were at distance at least $\eta$, the independently checked isolated-pair bound would give $d\ge[1792R^2(1+1024R^2/\eta^3)^3]^{-1}\ge\delta$, a contradiction. Hence a third member $k$ lies within $\eta$ of $i$. It cannot be the antipode of $i$, nor of $j$, whose distance from $i$ is at least $2-d>1$. It therefore belongs to the remaining pair. The three selected members contain one endpoint of every pair; their three mutual distances are below $2\eta$.

Each receiver in this triple is more than one unit away from all three outside antipodes: $|x_p+x_q|\ge2|x_p|-|x_p-x_q|\ge2-2\eta>1$. The explicit row bound makes each outside norm at most $256R^2$, and the required circular acceleration has norm at most one. Therefore the exact internal sum at each receiver has norm at most $M$. Each internal delay satisfies

$$
\tau\le(224R^2\cdot2\eta)^{1/3}=\frac1{760M}.
$$

For mixed polarity, call the two majority members $i',j'$ and the minority member $k'$. Their internal equations have the unsigned differences $k_{i'j'}-k_{i'k'}$ and $k_{j'i'}-k_{j'k'}$, each of norm at most $M$. Applying the full-segment inverse bound at the two receivers gives both $|x_{j'}-x_{k'}|<|x_{i'}-x_{j'}|/3$ and $|x_{i'}-x_{k'}|<|x_{i'}-x_{j'}|/3$. The triangle inequality is then impossible. The relabeling covers every mixed-polarity arrangement and every hierarchy among the three distances.

For equal polarity, use the maximal-phase theorem. For vectors of radii at least one, with shortest angular separation $\theta\in[0,\pi]$, their distance is at least $2\sin(\theta/2)\ge2\theta/\pi$. Both $j$ and $k$ lie within $\eta$ of $i$, so their phases have representatives within $\pi\eta/2$ of its phase. The three phases share an interval of width at most $\pi\eta<\pi/8<\pi-2$. The last comparison follows from $\pi>3$. That phase sector cannot balance. Both polarity cases contradict the hypothetical closest distance, proving $d\ge\delta$ for every exact configuration.

## Exact strength at radius bound thirty-five

After the known controls were recorded, the checker with `--stage target` passed the constant identities and evaluated the two cutoffs exactly at $R=35$. It returned $M=940801$ and, putting

$$
E=200607973414492429932691148800000,
$$

it returned the exact rational values

$$
\eta=\frac1E,\qquad
\delta=\frac1{2195200\left(1+1254400E^3\right)^3}<\eta.
$$

The full expanded integer denominator of $\delta$ is retained in `.local-data/master-equation-closure/overnight2-c/review-explicit-exact.json`. This factored form is exactly the same rational number. The checker certified by integer comparison that

$$
10^{-33}\le\eta<10^{-32},\qquad 10^{-316}\le\delta<10^{-315}.
$$

These brackets involve no floating underflow. The target receipt also verifies $44^2-1904=32$, $7^2-48=1$, $190/760=1/4$, the identity defining the delay threshold, and selection of the isolated-pair branch in the minimum at $R=35$. The resulting cutoff is a proved but weak separation estimate; no assertion about a feasible covering mesh or computation cost follows from these exponents.

## Limits and falsifiers

No numerical root search, residual recomputation, trajectory evolution, cover enlargement or large worker ran. The writes are confined to this review, its independent exact-arithmetic checker and review-prefixed receipts. The frozen subject, pilot source, previous proofs/reviews, main report and shared owners were not edited by this reviewer.

Falsifiers are an intermediate response segment outside the proved inverse domain, a failed derivative estimate, an incorrect sign among the five maximal-phase rows, a closest-pair case not covered by the isolated/triple split, an outside antipode closer than the stated geometric bound, a polarity relabeling that changes a product, a failure of the exact arithmetic, a missed admitted root, or an exact member of the selected class with separation below $\delta$. The distinct-position assumption, fixed three antipodal pairs, unit magnitudes, common positive circular rate and strictly subfield speed domain are retained throughout.

The recommended parent integration is to record the constructive theorem, its certified rational scale and the separately checked phase criterion at their stated grades. This gives neither an exact reference nor a practical numerical whole-domain exclusion, stability result, superfield extension or actual-time continuation rule.
