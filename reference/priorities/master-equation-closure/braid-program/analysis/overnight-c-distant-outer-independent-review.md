# Independent review of the distant-outer-pair necessary condition

## Verdict and claim boundary

Claim grade: derived. No mathematical defect was found in the frozen [distant-outer-pair corollary](overnight-c-distant-outer-pair-compactness.md), SHA-256 `4e82f4cad62e94e5a40b527cf0be7b0d8c3cafb217575a34df6c7c723f8d9cb0`. Its finite separation estimate is valid, including all twelve directed internal contributions and all eight contributions from the outer pair to the four inner receivers. Combining it with the independently reviewed preceding condition validly proves that any hypothetical exact sequence with $r_3\to\infty$ must satisfy $r_2\to1$, phase alignment modulo $\pi$, and $\limsup r_3d\le6$.

The result restricts a hypothetical sequence of exact prescribed circular configurations. It does not construct any such configuration or sequence, describe an actual time evolution toward coincidence, assign an acceleration at contact, or establish a global exclusion of the three-pair class. Strict subfield speed, complete separated histories, and the ordinary-root law remain mandatory. No superfield, speed-boundary, stability, or nonlinear-fate claim follows. The role is a review lens, not acceptance authority; the parent owns integration.

## Equation and complete root inventory

The [logarithmic equation owner](../../equation-variants/logarithmic-potential/manuscript.md#master-equation-before-and-after-a-logarithmic-replacement) gives the per-hit acceleration at $K_{\log}=c_f=1$ as

$$
q_iq_j\frac{n_{ij}}{\tau_{ij}|D_{ij}|},\qquad
X_i(t)-X_j(t-\tau_{ij})=\tau_{ij}n_{ij},
\qquad D_{ij}=1-n_{ij}\cdot\dot X_j(t-\tau_{ij}).
$$

Each complete path has constant radius $r_j$ and speed $u r_j<1$, where $u=|\omega|$. For distinct labels, distance minus delay starts strictly positive, decreases by at least $(1-u r_j)$ times the delay increment, and is negative beyond $r_i+r_j$. Thus there is one ordinary positive root for every ordered pair of distinct labels. At each root $D_{ij}\ge1-u r_j>0$. Self distance minus delay starts at zero and is strictly negative thereafter. The six-member system therefore has exactly 30 directed partner roots and no positive-delay self root for each finite allowed configuration. This whole-half-line argument is unchanged as the radius parameters vary; it requires no uniform source-speed gap across an unbounded sequence.

Let $I$ be the four inner labels with radii one and $r=r_2$, and let $s=r_3>M\ge r>1$. Exactly $4\cdot3=12$ directed partner hits have both labels in $I$. Exactly $4\cdot2=8$ hits come from the outer pair to these four receivers. The remaining ten system hits enter the two outer equations; the proof does not discard them from the law, but uses only necessary consequences of the four inner equations.

## Static inner contraction

At a fixed reception time, write $x_i=X_i(t)$. For the instantaneous algebraic comparison

$$
A_i^0=\sum_{j\in I\setminus\{i\}}
q_iq_j\frac{x_i-x_j}{|x_i-x_j|^2},
$$

each unordered pair contributes exactly $q_iq_j$ to $\sum_i x_i\cdot A_i^0$, because

$$
\frac{q_iq_j\{x_i\cdot(x_i-x_j)+x_j\cdot(x_j-x_i)\}}
{|x_i-x_j|^2}=q_iq_j.
$$

There are two positive and two negative inner polarities, so their sum is zero and their squared-polarity sum is four. Hence the contraction equals $-2$. All present separations are positive because the radii differ and the members of each pair are antipodal. This identity is a comparison for bounding the actual delayed equations, not an equilibrium assumption or replacement equation.

## Independent derivation of the finite causal correction

For one directed inner hit, set

$$
y=x_i-x_j,\qquad z=x_i-X_j(t-\tau)=\tau n,
\qquad \bar v=\frac{X_j(t)-X_j(t-\tau)}{\tau}.
$$

Then $y=\tau(n-\bar v)$. Decompose $\bar v=p n+w$ with $w\perp n$, and put $a=1-p=\bar D>0$. Thus $y=\tau(a n-w)$ and $|y|^2=\tau^2(a^2+|w|^2)$. Direct vector subtraction gives

$$
\frac n{\tau a}-\frac y{|y|^2}
=\frac{|w|^2 n+a w}{\tau a(a^2+|w|^2)}.
$$

The numerator's squared norm is $|w|^2(a^2+|w|^2)$. Therefore the exact norm identity is

$$
\left|\frac n{\tau\bar D}-\frac y{|y|^2}\right|
=\frac{|w|}{\bar D|y|}.
$$

Since the source speed is constant, $|\bar v|\le u r_j$, $|w|\le u r_j$, and $\bar D\ge1-u r_j>0$. This yields the first error bound without a power-series expansion or a discarded parallel component.

For the actual emission velocity $v_e$, circular acceleration has norm $u^2r_j$ throughout the delay. The fundamental theorem of calculus and one integration give

$$
|\bar v-v_e|
\le\frac1\tau\int_0^\tau u^2r_j t\,dt
=\frac{u^2r_j\tau}{2}.
$$

Because $D$ and $\bar D$ are both at least $1-u r_j$,

$$
\left|\frac n{\tau D}-\frac n{\tau\bar D}\right|
=\frac{|D-\bar D|}{\tau D\bar D}
\le\frac{u^2r_j}{2(1-u r_j)^2}.
$$

Unit polarity changes no norm. Multiplying each row error by $|x_i|\le M$, using $|y|\ge d$, $r_j\le M$, and summing twelve directed internal rows proves

$$
E_{\mathrm{int}}\le
\frac{12M^2u}{(1-Mu)d}
+\frac{6M^2u^2}{(1-Mu)^2}.
$$

This includes the actual transmitter factors throughout. The finite bound can become large as $d\to0$; that loss of uniformity is retained and is exactly what the sequence conclusion exploits.

## Outer rows and the necessary inequality

For an inner receiver at radius $a\le M$ and an outer emitter at radius $s$, let $\theta$ be their delayed relative angle and $\ell$ the chord distance. The identities

$$
\ell^2=a^2+s^2-2as\cos\theta,\qquad
\ell^2-s^2\sin^2\theta=(a-s\cos\theta)^2\ge0
$$

imply $s|\sin\theta|/\ell\le1$. The source velocity projection along the chord has magnitude at most $u a s|\sin\theta|/\ell\le u a$, so $D\ge1-uM>0$. Also $\ell\ge s-a\ge s-M$. Each outer row thus has norm at most $1/[(s-M)(1-uM)]$. Multiplication by receiver radius and summation over the eight rows yield

$$
E_{\mathrm{outer}}\le\frac{8M}{(s-M)(1-uM)}.
$$

For exact circular balance, write the actual inner contraction as $-2+e$, where $|e|\le E_{\mathrm{int}}+E_{\mathrm{outer}}$. Kinematics gives $-2+e=-u^2\sum_{i\in I}|x_i|^2$, whence

$$
2=e+u^2\sum_{i\in I}|x_i|^2
\le E_{\mathrm{int}}+E_{\mathrm{outer}}+4M^2u^2.
$$

This sign is consistent with the inward circular acceleration. Each positive right-hand term increases with $u$ on $[0,1/M)$: $u/(1-Mu)$, its square, $1/(1-Mu)$, and $u^2$ are nondecreasing. Since $u<1/s<1/M$, replacing $u$ by $1/s$ conservatively gives

$$
2\le\frac{12M^2}{(s-M)d}+H_M(s),
\qquad H_M(s)=\frac{6M^2+8Ms}{(s-M)^2}+\frac{4M^2}{s^2}.
$$

All denominators are positive. When $H_M(s)<2$, rearrangement gives precisely

$$
d\le\frac{12M^2}{(s-M)(2-H_M(s))}.
$$

No cancellation between opposite outer sources or deletion of distant sources is used.

## Sequence conclusion and order of limits

The [independent preceding review](overnight-c-separated-radius-independent-review.md#unbounded-outer-radius-limit) establishes that any hypothetical exact sequence with $s_n\to\infty$ has $\limsup r_n\le5$. Hence $r_n\le6$ eventually. With the fixed value $M=6$, $H_6(s_n)\to0$, and the finite bound gives $d_n\to0$.

Let $\rho_n=\operatorname{dist}(\phi_{2,n},\pi\mathbb Z)\in[0,\pi/2]$. The two same-pair separations are $2$ and $2r_n$. The smaller cross-pair squared distance is $1+r_n^2-2r_n|\cos\phi_{2,n}|$, so

$$
d_n=\min\left\{2,\sqrt{(r_n-1)^2+4r_n\sin^2(\rho_n/2)}\right\}.
$$

Eventually $d_n<2$, and both nonnegative terms under this radical must tend to zero. Thus $r_n\to1$ and $\rho_n\to0$. This is positional coincidence in a limiting sequence, irrespective of which cross-pair polarity endpoints approach each other.

For any fixed $\epsilon>0$, eventually $r_n\le1+\epsilon$, so choose the constant $M=1+\epsilon$ in the already proved finite inequality. Then $H_M(s_n)\to0$ and $s_n/(s_n-M)\to1$, giving

$$
\limsup_{n\to\infty}s_nd_n\le6(1+\epsilon)^2.
$$

Since this holds for every fixed positive $\epsilon$, letting $\epsilon\downarrow0$ yields $\limsup s_nd_n\le6$. The two stages are essential: the first gives radius convergence; only then is the sharper fixed $M$ available. There is no interchange with an uncontrolled moving parameter and no assumed existence of a limiting ordinary configuration.

## Independent controls and receipts

The [separate exact checker](../evidence/overnight-c-review-distant-outer-exact.py) uses only standard-library rational arithmetic. Its [controls receipt](../evidence/overnight-c-review-distant-outer-controls.json) was recorded before target mode and passed an elementary fraction identity, the static neutral pair's per-receiver contraction $-1/2$, and a nontrivial average-velocity subtraction. The latter uses $n=(1,0)$, $\bar v=(2/5,4/5)$ and $\tau=5$, for which $y=(3,-4)$ and the subtraction norm is exactly $4/15$. It checks the general algebraic identity without claiming this selected average velocity is an exact circular root.

After those controls passed, the [target receipt](../evidence/overnight-c-review-distant-outer-target.json) evaluated the static four-point contraction independently by summing the twelve directed vector rows at the separated points $(\pm1,0)$ and $(0,\pm2)$. It returned $-2$, counted eight outer-source labels, checked the $u=1/s$ substitution at three exact parameter triples, and checked the cross-chord identity at a rational angle cosine. The arbitrary finite triples are algebra controls, not exact configurations or evidence that the inequalities are sharp. The full continuous and sequence claims rest on the derivations above.

Both commands exited 0 under the shared executable venv, in the listed order:

```bash
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-distant-outer-exact.py controls > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-distant-outer-controls.json
"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-distant-outer-exact.py target --controls reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-distant-outer-controls.json > reference/priorities/master-equation-closure/braid-program/evidence/overnight-c-review-distant-outer-target.json
```

Checker SHA-256: `561a7607a4b8c594784de77afeed02349aadcd8b56c4f4ac02fc537e01a21fcc`. Target mode requires hash-matching controls. `shasum -a 256` measured the frozen subject hash above before review, and the live role directory was relisted. No subject implementation was imported or modified, and no residual search or sustained job was launched.

Scoped validation: standard-library `ast.parse` accepted the new checker under the shared venv, exit 0. Final `shasum -a 256` retained the subject and checker identities. `git diff --no-index --check /dev/null` for this new report emitted no whitespace diagnostics and returned 1 for the difference from an empty source.

Falsifiers are a failed exact subtraction identity, missing ordinary hit, incorrect 12/8 multiplicity, wrong projected source-factor bound, a sign error in the contraction equation, failure of the monotone rate substitution, or an exact configuration violating the finite inequality. For the asymptotic statement, an exact sequence with $s_n\to\infty$ but failing any of the three stated limits would overturn at least one of these necessary estimates or the preceding radius condition.

Only this report and the three `overnight-c-review-distant-outer-*` evidence companions were authored. The subject, prior reviews, shared owners, and runtime cover remain untouched by this review. No mathematical blocker remains; acceptance and integration are outside this report.
