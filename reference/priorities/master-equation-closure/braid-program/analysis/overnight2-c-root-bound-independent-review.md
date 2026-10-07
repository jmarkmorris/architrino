# Independent review of closed-subfield root bounds

## Scope and known-first arithmetic

This review independently reconstructs [the explicit closed-subfield root-bound note](overnight2-c-closed-subfield-root-bound.md). The selected objects are complete common-center planar circular histories, every radius at most a fixed $R>0$, every speed at most $c_f=1$, distinct present receiver/source positions for partner claims, unchanged transmitter weighting and logarithmic coefficient $K_{\log}=1$. The isolated-pair corollary additionally uses six unit-polarity members, minimum radius one, distinct simultaneous positions and exact circular balance. No superfield or singular-continuation claim is selected.

Before target constants, `"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-root-bound-independent-check.py --stage known` passed a separately authored [rational checker](../evidence/overnight2-c-root-bound-independent-check.py). The controls use endpoint velocity components $(4/5,-3/5)$ and $(4/5,3/5)$, both of unit norm. With factor $D=1/5$ and rotation-delay product $6/5$, they exactly satisfy $2D-D^2=(6/5)^2/4=9/25$. The static factor control returns one. The checker imports no subject or previous instrument. Its source SHA-256 is `279a92136173ae6b3da16308945e75d696c970f1764684937024e10d345f4e08`; the known receipt is `.local-data/master-equation-closure/overnight2-c/review-root-bound-known.json`. This record precedes target use.

The frozen subject digest measured by `shasum -a 256` is `45fbcdba1d8485a923fe2b8fd8ab41aae6e813c0366b9606cba0d438a97378de`. Direct reading of that note fixes the review subject; the proof below is an independent derivation rather than a replay of stored root output.

## Verdict

**Derived and independently reconstructed:** the factor bound $D\ge\tau^2/(32R^2)\ge d^2/(128R^2)$, row bound $|A|\le256R^2/d^3$, complete closed-subfield root census, cubic delay bound $\tau\le(224R^2d)^{1/3}$ and isolated-pair cutoff are supported. No mathematical defect was found. The partner census requires distinct simultaneous member positions; equal radii are permitted if the positions remain distinct. The isolated-pair estimate requires all four other partners to retain the stated separation $g$.

## Two endpoint velocities and the factor floor

Reflect the plane so the angular rate is $u\ge0$. Let $x$ be the reception position, $z$ the source emission position, $x-z=\tau n$ with $|n|=1$, and define $w=uJz$, $v=uJx$. Common circular rotation gives $v-w=u\tau Jn$ and $n\cdot v=n\cdot w$. Thus the source factor $D=1-n\cdot w$ is also $1-n\cdot v$ as a geometric identity; no receiver response is inserted.

In the orthonormal basis $(n,Jn)$ write $w=(1-D)n+\beta Jn$ and $v=(1-D)n+(\beta+u\tau)Jn$. Both endpoint speed constraints are needed:

$$
(1-D)^2+\beta^2\le1,\qquad
(1-D)^2+(\beta+u\tau)^2\le1.
$$

At least one transverse magnitude is $u\tau/2$ or larger. Consequently $2D-D^2\ge u^2\tau^2/4$. Since the direct source bound gives $D\ge0$, dropping $D^2$ yields

$$
D\ge\frac{u^2\tau^2}{8}.
$$

This is strictly positive for positive delay when $u>0$; for $u=0$, $D=1$. It does not rely on a strict speed margin, a positive radial gap, or a sign of the transverse source velocity. The independently checked unit-velocity control realizes equality in the intermediate inequality, confirming its factor of four.

The radius bound gives $\tau\le|x|+|z|\le2R$. If $u\ge1/(2R)$, the preceding estimate gives $D\ge\tau^2/(32R^2)$. If $u<1/(2R)$, the direct bound gives $D\ge1-uR>1/2$, whereas $\tau^2/(32R^2)\le1/8$. Thus the same factor bound holds in both cases, including the static case. Source speed at most one gives $d\le\tau+|X_j(0)-X_j(-\tau)|\le2\tau$, so

$$
\frac d2\le\tau\le2R,\qquad D\ge\frac{\tau^2}{32R^2}\ge\frac{d^2}{128R^2}>0.
$$

With unit polarity magnitudes and coefficient one, $|A|=1/(\tau D)\le32R^2/\tau^3\le256R^2/d^3$. This bounds the actual delayed row rather than an instantaneous surrogate.

## Entire past, uniqueness and boundary smoothness

For a distinct present source/receiver pair, let $g(\tau)=|x-X_j(-\tau)|-\tau$. Its source path has Lipschitz constant at most one, so $g$ is nonincreasing even at wake speed. It starts at $d>0$ and is nonpositive by $2R$, ensuring a positive root. At every positive root the chord length is positive, and differentiation is legitimate: $g'=n\cdot V_j-1=-D<0$ by the proved factor bound.

If there were two roots, monotonicity would force $g$ to be identically zero between them, contradicting its strictly negative derivative at a root. Hence there is exactly one positive partner root. No root can occur beyond the complete chord interval. For a nonzero-radius self channel, $|X(0)-X(-\tau)|=2a|\sin(u\tau/2)|<au\tau\le\tau$ when $u,\tau>0$; when $u=0$ or $a=0$, the self chord is zero directly. There is no admitted positive self root. Thus six distinct present positions yield exactly thirty directed partner roots and zero positive self roots throughout the noncolliding closed subfield domain.

At a positive partner root the distance function is smooth because its chord is nonzero, and its delay derivative is nonzero. The implicit-function theorem supplies a locally smooth partner-root branch. Uniqueness identifies this branch with the complete partner root on the closed subfield side. If $d\ge\delta>0$, the displayed estimates provide uniform delay, factor and row bounds. These statements do not assert smoothness of the complete acceleration into a superfield domain: newly appearing positive self roots have to be included there. They also do not admit coincident present partners under the noncolliding census.

## Cubic upper delay estimate, including its sine domain

Let $y$ be the source present position and $q=u|x|\le1$ the receiver speed. From $z=R(-u\tau)y=x-\tau n$, rotation invariance of the norm gives

$$
\frac d\tau=\left|n-\bar v\right|,\qquad
\bar v=\frac{x-R(-u\tau)x}{\tau}.
$$

Both radius-speed constraints imply $u\tau\le u(|x|+|z|)\le2$. Therefore $s=u\tau/2$ lies in $[0,1]$, the actual domain needed for the sine estimate. Here $|\bar v|=q\operatorname{sinc}(s)$, and the Taylor upper bound yields

$$
1-\operatorname{sinc}(s)\ge s^2\left(\frac16-\frac{s^2}{120}\right)
\ge\frac{19}{120}s^2\ge\frac{s^2}{7}.
$$

If $q\ge1/2$, then $u\ge1/(2R)$. Hence

$$
\frac d\tau\ge1-q\operatorname{sinc}(s)
\ge q(1-\operatorname{sinc}(s))
\ge\frac{q u^2\tau^2}{28}\ge\frac{\tau^2}{224R^2}.
$$

If $q<1/2$, the same left side exceeds $1/2$, which is at least $\tau^2/(8R^2)$ because $\tau\le2R$. This is stronger than the required bound. The case $q=0$, including static histories, is covered. Consequently $d\ge\tau^3/(224R^2)$ and $\tau\le(224R^2d)^{1/3}$. Since $D\le2$, the unsigned row also has the lower bound

$$
|A|\ge\frac1{2\tau}\ge\frac1{2(224R^2d)^{1/3}}.
$$

The estimate uses the receiver's average velocity but preserves the actual transmitter factor. Neither endpoint speed constraint can be silently dropped from the preceding factor and sine-domain arguments.

## Isolated-pair cutoff

Now impose the six-member exact circular class, minimum radius one and distinct positions. All speeds at most one imply $u\le1$, so the required acceleration at any receiver has norm $u^2r_i=u(ur_i)\le1$. There are five partner rows and no positive self row. Suppose the chosen near partner has present separation $d$ and the other four are each at least $g>0$ away. The norm of each of those four rows is at most $256R^2/g^3$. Rearranging the full exact vector equation gives

$$
\frac1{2(224R^2d)^{1/3}}\le |A_{\mathrm{near}}|
\le1+\frac{1024R^2}{g^3}=:C.
$$

All quantities are positive, so cubing and rearranging preserve the inequality direction: $224R^2d\ge1/(8C^3)$ and

$$
d\ge\frac1{1792R^2(1+1024R^2/g^3)^3}.
$$

No sign assumption or reciprocal cancellation is used. The lower bound is non-strict as stated. It is not a global separation constant when a third member approaches and $g$ shrinks; no such strengthening follows here.

## Independent constants and limits

After the known controls were recorded, the checker with `--stage target` returned `passed: true`, independently verifying coefficients $1/32$, $1/128$, $256$, $1/224$, $1792$ and $1024$, and the sine margin $19/120-1/7=13/840>0$. The receipt is `.local-data/master-equation-closure/overnight2-c/review-root-bound-exact.json`. These checks confirm rational algebra only; the complete-root and geometric arguments above supply the independent analytic reference.

No root sampling, target residual replay, trajectory integration or large worker was run. The only writes are this assigned review, its independent checker and review-prefixed receipts. No frozen subject, previous proof/review, main report or shared owner was modified. No external backup or practical regeneration-cost claim is made.

Falsifiers include a positive root violating the two endpoint speed inequalities, a sign error in the velocity difference, a root outside the full chord interval, two positive roots despite the monotonicity and strict derivative, a positive self root at speed at most one, a sine-bound application outside $u\tau\le2$, or an exact isolated pair violating the derived cutoff with all four other partners at least $g$ away. The formulas locate the exact assumptions and constants to check. They do not prove existence, numerical whole-domain exclusion, stability, superfield regularity or actual-time continuation.

The recommended parent integration is to retain these explicit closed-subfield bounds and the isolated-pair corollary as independently reconstructed analytic results. Applying them with an uncomputed global separation constant still does not produce numerical cover parameters or a practical cost estimate.
