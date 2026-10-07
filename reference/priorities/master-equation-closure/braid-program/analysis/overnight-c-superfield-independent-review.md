# Independent review of the aligned ordinary-superfield exclusion

## Verdict and limits

Claim grade: derived. No defect was found in the frozen [aligned superfield exclusion](overnight-c-superfield-aligned-exclusion.md). Its entire positive-delay chart contains exactly thirty-six ordinary roots: six self hits, twelve same-polarity partner hits, and eighteen opposite-polarity partner hits. Every root has positive transmitter factor, and every received tangential row is strictly positive in its receiver's increasing-angle frame. Thus the stated circular histories cannot satisfy the unchanged logarithmic equation.

The argument is continuous over the declared radius, angular-rate, and independently variable phase intervals. It neither samples roots nor infers completeness from solver convergence. The initial delay strip, the later interval, and the entire old-history complement are all covered explicitly. The positive-delay self hits are essential to the census and are retained.

This verdict is limited to the compact box below. It does not establish an exact superfield assembly, stability, dynamical evolution into this chart, continuation through a fold, or exclusion of other superfield geometries. A uniform positive transmitter-factor minimum exists by the proved chart and compactness, but this review supplies no numerical value for that minimum. Scientific acceptance and integration remain with the parent; the reviewer role supplies no acceptance authority.

Falsifiers are a positive root in the initial strip or beyond the geometric range bound, a second root in a channel, a nonordinary or nonpositive source factor at a root, an incorrect polarity or receiver-frame sign, a failed rational inequality, or an exact full-vector circular solution satisfying these complete assumptions.

## Equation, histories, and receiver frame

The [logarithmic definition](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) supplies the equation, and the [C assignment](overnight-braid-research-plan-2026-10-06.md#c-logarithmic-planar-three-binary-geometry) explicitly permits the ordinary-superfield fallback with complete self-root accounting. The selected law retains $K_{\log}=c_f=1$, unit polarities, every ordinary positive-delay root, and the absolute transmitter weight. No ceiling, receiver factor, root exclusion, coefficient change, or event rule is added.

The three persistent antipodal neutral pairs have complete paths

$$
X_{a,s}(t)=s r_a e^{i(\omega t+\phi_a)},\qquad q_{a,s}=s,
\qquad a\in\{1,2,3\},\quad s\in\{-1,+1\},
$$

for every real time. The parameter box is

$$
r_1=1,\quad r_2\in[26/25,53/50],\quad r_3\in[109/100,111/100],
$$

$$
\omega\in[51/50,26/25],\qquad \phi_1=0,\qquad
\phi_2,\phi_3\in[-1/1000,1/1000].
$$

Here every speed exceeds wake speed: $\omega r_a\ge51/50>1$, while the largest is at most $1443/1250$. Radius normalization and common phase fix scale and orientation gauges. The pair identities and polarities remain fixed throughout.

For one receiver, rotate the local radial axis to its present position and let $a$ denote its radius. Let $b$ be the source radius, $\tau>0$ the delay, and $\epsilon$ the difference between their positive-endpoint pair phases. Then $|\epsilon|\le1/500$. The present relative source phase is $\epsilon$ for equal polarities and $\pi+\epsilon$ modulo $2\pi$ for opposite polarities. This remains true for a negative receiver: subtracting its added $\pi$ either cancels the negative source's added $\pi$ or changes the opposite-polarity relative phase by a full turn. Thus the same formulas apply to all six receiver frames.

With $\eta=\omega\tau-\epsilon$, the source's delayed relative angle is $\theta=-\eta$ for equal polarities and $\theta=\pi-\eta$ for opposite polarities. The delayed displacement is $z=(a-b\cos\theta,-b\sin\theta)$. On a causal root, $|z|=\tau$, and the source factor and tangential row are

$$
D=1+\frac{\omega ab\sin\theta}{\tau},
\qquad
A_t=-\sigma\frac{b\sin\theta}{\tau^2|D|},
$$

where $\sigma$ is the polarity product. These follow directly from $\dot X_j=\omega b(-\sin\theta,\cos\theta)$ and the logarithmic vector row $\sigma z/(|z|^2|D|)$. The tangential unit vector points in the direction of increasing receiver angle; since $\omega>0$ here, it is also the direction of motion.

## Entire-delay squared gaps

Claim grade: derived. Bounded circular geometry gives $|z|\le a+b=:L$ for every emission time. Hence any positive causal root has $0<\tau\le L$, and the whole region $\tau>L$ is root-free. On positive delays, squaring the equation $|z|=\tau$ introduces no extra roots because both quantities are nonnegative. The squared gaps are

$$
G_+(\tau)=\tau^2-a^2-b^2+2ab\cos\eta
=\tau^2-(a-b)^2-4ab\sin^2(\eta/2)
$$

for equal polarities and

$$
G_-(\tau)=\tau^2-a^2-b^2-2ab\cos\eta
$$

for opposite polarities. For self channels, $a=b$ and $\epsilon=0$ exactly. The resulting root at $\tau=0$ is the same-time endpoint excluded by the equation and is not an admitted self hit.

At a positive root, $G=(\tau-|z|)(\tau+|z|)$. Differentiation gives $G'=2\tau(1-d|z|/d\tau)=2\tau D$, since $d|z|/d\tau=n\cdot\dot X_j(-\tau)$. Equivalently, differentiating the explicit gaps gives

$$
\frac{G_+'}{2\tau}=1-\frac{\omega ab\sin\eta}{\tau},
\qquad
\frac{G_-'}{2\tau}=1+\frac{\omega ab\sin\eta}{\tau},
$$

which match the corresponding source factors. This relation is used only at positive causal roots; no division by zero or assumption about the same-time self endpoint occurs.

## Initial strip exclusion

Claim grade: derived. Put $t_0=1/4$. Throughout $0\le\tau\le t_0$, $|\eta|\le131/500$ and $|\eta/2|\le131/1000$. For $0\le x\le131/1000$, the bound $\sin x\ge x-x^3/6$, together with oddness and the positive factor $1-x^2/6$, gives

$$
\sin^2(\eta/2)\ge\frac{99}{100}(\eta/2)^2.
$$

The exact slack in the constant comparison is

$$
\left(1-\frac{(131/1000)^2}{6}\right)^2-\frac{99}{100}
=\frac{154362499921}{36000000000000}>0.
$$

The elementary sine bound follows by integrating $\cos x\ge1-x^2/2$; that cosine bound follows from $|\sin x|\le|x|$. These are Euclidean trigonometric facts, without a standard-physics premise.

For same-polarity partners from different pairs, the radius product is at least $26/25$ and the gap is at least $3/100$. Since $(99/100)(26/25)-1=37/1250>0$,

$$
G_+(\tau)\le\tau^2-(a-b)^2-(\omega\tau-\epsilon)^2.
$$

Completing the square shows

$$
\tau^2-(\omega\tau-\epsilon)^2
=-(\omega^2-1)\left(\tau-\frac{\omega\epsilon}{\omega^2-1}\right)^2
+\frac{\epsilon^2}{\omega^2-1}.
$$

The denominator is positive, so this is an upper bound for every real delay, not only selected samples. Consequently

$$
G_+(\tau)\le\frac{(1/500)^2}{(51/50)^2-1}-\left(\frac3{100}\right)^2
=\frac1{10100}-\frac9{10000}
=-\frac{809}{1010000}<0.
$$

For self channels the nonzero radius-gap argument is unavailable and is not used. Their exact $\epsilon=0$, $a=b$ instead gives

$$
G_+(\tau)\le\tau^2\left[1-\frac{99}{100}a^2\omega^2\right]<0
\quad(0<\tau\le t_0),
$$

because $(99/100)(51/50)^2-1=7499/250000>0$. Thus no positive self root is hidden immediately next to the excluded zero-delay endpoint.

For opposite polarity, $\cos\eta\ge1-(131/500)^2/2=482839/500000>0$. Therefore

$$
G_-(\tau)<\tau^2-a^2-b^2\le\frac1{16}-2=-\frac{31}{16}<0.
$$

All channels are root-free in the initial positive strip, including its endpoint $t_0$.

## Later root uniqueness and ordinary source factors

Claim grade: derived. For $t_0\le\tau\le L$ the full box obeys

$$
\frac{253}{1000}\le\eta\le\frac{5777}{2500}<3<\pi.
$$

The lower endpoint is $(51/50)(1/4)-1/500$ and the upper endpoint is $(26/25)(222/100)+1/500$. Thus $\sin\eta>0$ throughout this interval. If an explicit elementary lower bound for $\pi$ is desired, integration of the alternating geometric polynomial of degree fourteen on $[0,1]$ gives

$$
\pi>4\sum_{k=0}^{7}\frac{(-1)^k}{2k+1}
=\frac{135904}{45045}=3+\frac{769}{45045}>3.
$$

This follows from $1/(1+x^2)=\sum_{k=0}^{7}(-1)^kx^{2k}+x^{16}/(1+x^2)$ and $\int_0^1(1+x^2)^{-1}dx=\pi/4$.

For same polarity, put $f(\tau)=G_+'(\tau)$. Then

$$
f(\tau)=2\tau-2\omega ab\sin\eta,
\qquad f''(\tau)=2\omega^3ab\sin\eta>0.
$$

Thus $f$ is strictly convex. At $t_0$ the angle lies in $[253/1000,131/500]\subset(0,\pi/2)$. Sine is increasing there and $ab\ge1$, which gives the exact upper bound

$$
f(t_0)\le\frac12-2\frac{51}{50}\left[\frac{253}{1000}-\frac{(253/1000)^3}{6}\right]
=-\frac{530697291}{50000000000}<0.
$$

At $L$, using $\sin\eta\le1$, $L\ge2$, and $ab\le(111/100)^2$, one obtains

$$
f(L)\ge2\left[2-\frac{26}{25}\left(\frac{111}{100}\right)^2\right]
=\frac{89827}{62500}>0.
$$

For completeness, strict convexity with these endpoint signs does imply exactly one zero of $f$ on this interval. Existence follows from continuity. If $c$ is any zero after the negative left endpoint, the secant slope $(f(c)-f(t_0))/(c-t_0)$ is positive. Convexity implies $f'(c)$ is at least this slope, and the increasing derivative then keeps $f$ positive for all later times. Therefore a second zero is impossible. This argument does not confuse convexity of $G_+$ with convexity of its derivative.

Let $c$ denote that unique zero of $f$. Then $G_+$ strictly decreases until $c$ and strictly increases after $c$. Its initial value $G_+(t_0)$ is negative by the initial-strip proof. At the other end,

$$
G_+(L)=2ab(1+\cos(\omega L-\epsilon))>0,
$$

because $0<\omega L-\epsilon<\pi$. Hence $G_+$ crosses zero exactly once after $c$, where $G_+'>0$. Its unique positive root is ordinary and has $D=G_+'/(2\tau)>0$. This proof includes the self channels; the separate initial-strip argument excludes any additional positive self root near zero.

For opposite polarity,

$$
G_-'(\tau)=2\tau+2\omega ab\sin\eta>0
$$

on the later interval. Its initial value is negative and its final value is

$$
G_-(L)=2ab(1-\cos(\omega L-\epsilon))>0.
$$

There is exactly one crossing, again with positive derivative and positive $D$. Neither polarity has a root at $L$ itself. Together with the initial strip and $\tau>L$ complement, these arguments exhaust the entire past.

There are six receiver labels and six source labels per receiver. Each receiver has one self source, two same-polarity partners, and three opposite-polarity partners. Thus the census is six self hits plus twelve same-polarity partner hits plus eighteen opposite-polarity partner hits. Every range exceeds $1/4$, and every root is simple with positive $D$.

For each labelled channel, the implicit-function theorem applies at every root since $G'\ne0$. Uniqueness makes the local root functions agree, so the root and $D$ are continuous throughout the compact parameter domain. Their positive values therefore have positive minima. This justifies the subject's qualitative uniform-margin statement; it supplies neither a numerical minimum nor an extension through an external fold.

## Tangential sign and circular contradiction

Claim grade: derived. On the unique root of each channel, $\sin\eta>0$, $\tau>0$, and $D>0$. For same polarity, $\sigma=1$ and $\sin\theta=\sin(-\eta)=-\sin\eta$. For opposite polarity, $\sigma=-1$ and $\sin\theta=\sin(\pi-\eta)=\sin\eta$. Substitution into the unchanged logarithmic row yields the same expression in both cases:

$$
A_t=\frac{b\sin\eta}{\tau^2D}>0.
$$

This also includes self, whose polarity product is positive. The receiver-frame derivation applies equally to negative endpoints, so positivity is not an artifact of calculating only one charge sign. Every receiver sums six strictly positive tangential rows. Its prescribed rigid circular path has acceleration $-\omega^2X_i$ and therefore zero tangential component. These requirements contradict each other at every point of the declared box.

No cancellation from an omitted old root, opposite polarity, or self channel is available: the all-past census includes all of them. The result is an exclusion of this ordinary chart. It does not require a numerical lower bound on tangential acceleration and does not claim anything about histories outside the chart.

## Exact controls, receipts, and file disposition

The independently authored [rational checker](../evidence/overnight-c-review-superfield-exact.py) uses Python's exact fractions and imports no subject implementation or output. Its [known controls](../evidence/overnight-c-review-superfield-controls.json) ran first: $1/2+1/3=5/6$, the concave quadratic's exact maximum $1/3$ at $\omega=2$, $\epsilon=1$, $\tau=2/3$, the square-completion identity at additional rational arguments, the channel count for one neutral pair, and the positive tangential signs for both polarity products at exact right angles. These cases validate the small arithmetic and counting instrument, not a different dynamical model.

Only after those controls passed did the [target receipt](../evidence/overnight-c-review-superfield-target.json) reconstruct the radius gap, product bound, trigonometric-inequality slacks, endpoint derivative signs, angular range, and channel multiplicities. Every rational inequality has the required strict sign. The instrument reports thirty-six roots only conditionally on the analytical chart proved above; it does not perform a root search or independently establish root uniqueness by enumeration.

Both commands exited zero under the executable shared venv:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-superfield-exact.py controls > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-superfield-controls.json
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-superfield-exact.py target --controls reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-superfield-controls.json > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-superfield-target.json
```

The review instrument hash is `3de1303a4bc361c656250fd0b2fccda9a1cea28ae1e70358265c0894137879f7`; its target mode requires a successful known-case receipt with that same hash. `shasum -a 256` measured the frozen subject hash as `228c5c21b12bd6644057048627931723739e5c651a828fe568a3f23fd116f036`, matching the assignment. These hashes establish source identity, not mathematical correctness.

Scoped validation parsed the new Python source with `ast.parse` under the shared venv and checked all six relative file-link targets with `test -f`; both exited zero. `git diff --no-index --check /dev/null` on the new Markdown returned 1 against the empty source and emitted no whitespace diagnostics. Final `shasum -a 256` measurements retained the assigned subject and review-instrument hashes. `git --no-optional-locks status --short` restricted to the four new review paths listed those four as untracked; that inspection establishes no broader checkout condition.

Files created are this companion, `evidence/overnight-c-review-superfield-exact.py`, `evidence/overnight-c-review-superfield-controls.json`, and `evidence/overnight-c-review-superfield-target.json`, under the Braid Program owner. Subject and earlier theorem/review files remain read-only to this review. No numerical search, sustained computation, extra agent, sidebar message, production change, or acceptance promotion was performed. The bounded review is complete with no mathematical blocker found; the parent owns integration and any further investigation.
