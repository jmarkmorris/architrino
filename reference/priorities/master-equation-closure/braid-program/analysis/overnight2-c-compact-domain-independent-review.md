# Independent review of the explicit compact containing domain

## Scope and known-first record

This review reconstructs [the explicit compact-domain note](overnight2-c-explicit-compact-domain.md) within the coefficient-one logarithmic complete circular six-member class: three fixed neutral antipodal unit-polarity pairs, common center and rate, minimum radius one, fixed radius bound $R\ge1$, distinct simultaneous positions, strictly subfield original configurations and all ordinary causal roots. It uses a proved separation floor $0<\delta\le1$. The reviewed subject digest, measured by `shasum -a 256`, is `9d3f50d7192650c24786a31bca3e4a3716849f00fc8345ac93599f02eb325848`.

Before target arithmetic, `"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-compact-domain-independent-check.py --stage known` passed the separately authored [checker](../evidence/overnight2-c-compact-domain-independent-check.py). The known inversion example uses orthogonal unit vectors and returns squared norm two on both sides. The known static scalar example uses positions $(1,0),(-1,0)$ with opposite unit polarities and returns $-1$. The rational-sum control returns $1/3+1/6=1/2$. The source SHA-256 is `9ff5d850bd7e2e1c758b29c3b4ae01f285c0678e74366b5fa3fe4c065df4955e`; the receipt is `.local-data/master-equation-closure/overnight2-c/review-compact-known.json`. This record precedes target use of the instrument.

No subject implementation is imported. The illustrative exact examples check the arithmetic instrument; the general identities and domain statements are established by the independent derivation below rather than by those examples.

## Verdict

**Derived and independently reconstructed:** the per-row comparison, static neutral scalar identity, complete thirty-row error bound, strict cutoff $u>\delta/(100R^2)$ and compact regular containing-domain statement are supported. No mathematical defect was found. The comparison explicitly requires $uR<1$ and is invoked only where that extra bound is proved. It is not asserted throughout the eventual compact domain merely because actual member speeds are at most one.

The [constructive-separation adjudication](overnight2-c-explicit-separation-independent-review.md) independently supports the explicit $\delta$ used at $R=35$, and the [root-bound adjudication](overnight2-c-root-bound-independent-review.md) independently supports the closed-subfield factor, delay and root-census statements. The present scalar argument does not serve as evidence for either dependency, so the composition does not introduce a circular proof.

## Per-row delayed-to-static comparison

At reception let $x$ be the receiver, $y$ the source's present position, $z$ its emission position and $\tau=|x-z|>0$ its causal delay. Write $d=|x-y|\ge\delta$, and impose the additional comparison hypothesis $s=uR<1$. Since every source radius is at most $R$, its speed is at most $s$, giving $|z-y|\le s\tau$, $D\ge1-s>0$ and $|1-D|\le s$ for its actual transmitter factor.

For any nonzero Euclidean vectors $p,q$, direct expansion gives

$$
\left|\frac p{|p|^2}-\frac q{|q|^2}\right|^2
=\frac1{|p|^2}+\frac1{|q|^2}-\frac{2p\cdot q}{|p|^2|q|^2}
=\frac{|p-q|^2}{|p|^2|q|^2}.
$$

Taking nonnegative square roots proves the proposed inversion identity without an alignment assumption. Set $p=x-z$ and $q=x-y$. Their norms are $\tau,d$ and $|p-q|=|y-z|\le s\tau$. The exact logarithmic unsigned row is $A=p/(\tau^2D)$ and the static reference at those same present positions is $A^0=q/d^2$. Adding and subtracting $q/(d^2D)$ gives

$$
|A-A^0|\le\frac1D\left|\frac p{\tau^2}-\frac q{d^2}\right|
+\frac{|1-D|}{D d}
\le\frac{s}{Dd}+\frac{s}{Dd}
\le\frac{2s}{d(1-s)}\le\frac{2s}{\delta(1-s)}.
$$

The same bound applies after multiplying both rows by their fixed unit polarity product. The two sources of error are the changed emission position and the transmitter weighting. Both are retained. The static expression is only a comparison function for the same geometry, not a substituted dynamical law.

The hypothesis $uR<1$ is stronger than actual subfield speeds when $R$ is a loose upper radius bound. That distinction is necessary: no step divides by $1-uR$ unless positivity has been separately established.

## Static scalar and all thirty delayed rows

At six distinct positions, the static signed row from $j$ to $i$ is $q_iq_j(x_i-x_j)/|x_i-x_j|^2$. Pairing the two directed rows of each unordered pair yields

$$
q_iq_j\frac{x_i\cdot(x_i-x_j)+x_j\cdot(x_j-x_i)}{|x_i-x_j|^2}=q_iq_j.
$$

There are three positive and three negative unit polarities, so $\sum_iq_i=0$ and $\sum_iq_i^2=6$. The full static scalar is therefore

$$
\sum_i x_i\cdot A_i^0=\sum_{i<j}q_iq_j
=\frac{(\sum_iq_i)^2-\sum_iq_i^2}{2}=-3.
$$

An exact circular reference satisfies $A_i=-u^2x_i$, giving the scalar $-u^2S$ with $S=\sum_i|x_i|^2\le6R^2$. Strictly subfield complete histories supply one positive root in each directed partner channel and no positive self root. There are six receivers with five partner rows each, hence thirty rows whose error estimates must be summed. Since $|x_i|\le R$, the scalar difference satisfies

$$
|3-u^2S|\le\sum_i|x_i|\sum_{j\ne i}|A_{ij}-A_{ij}^0|
\le30R\frac{2s}{\delta(1-s)}
=\frac{60uR^2}{\delta(1-uR)}.
$$

The factor sixty thus includes every directed row and both per-row error terms. This derivation uses the geometry and polarity products only; it makes no mass, momentum, conservation-law or force premise.

## Strict exclusion of slow rotation

Suppose $0<u\le\delta/(100R^2)$ with $0<\delta\le1$ and $R\ge1$. Then $uR\le\delta/(100R)\le1/100$, so the extra comparison hypothesis holds. In particular $(1-uR)^{-1}\le2$, and

$$
\frac{60uR^2}{\delta(1-uR)}\le\frac{120uR^2}{\delta}\le\frac65.
$$

The required circular scalar obeys

$$
u^2S\le6u^2R^2\le\frac{6\delta^2}{10000R^2}\le\frac3{5000}.
$$

Consequently $|3-u^2S|\ge3-3/5000$, which exceeds $6/5$ by the exact margin $8997/5000>0$. This contradicts the complete scalar inequality and includes equality at the proposed cutoff. Thus $u>\delta/(100R^2)$ is strict. The static case $u=0$ separately fails because exact static accelerations would be zero while their scalar sum is $-3$. No optimality is claimed for the factor one hundred.

## Compact containing domain and complete-root continuity

Take the independently checked separation constant at $R=35$ and define $u_0=\delta/(100\cdot35^2)>0$. Fix simultaneous spatial rotation by choosing the phase of the radius-one positive endpoint to be zero; the two remaining phases belong to a compact two-dimensional torus. Consider the set

$$
\mathcal C=\{(r_2,r_3,u,\phi_2,\phi_3):
1\le r_2\le r_3\le35,\quad u_0\le u\le1/r_3,
\quad |x_i-x_j|\ge\delta\ \text{for all distinct labels}\}.
$$

The radius/rate restrictions are closed and bounded. Every pair distance is continuous on those parameters and the phase torus, so the separation constraints are closed. Hence $\mathcal C$ is compact. Every original exact strictly ordered subfield configuration belongs to it, and its closure remains in it. The weakened non-strict radius and speed bounds deliberately retain equal-radius and wake-speed boundary points; no potentially relevant limiting geometry is discarded.

At each point of $\mathcal C$, all present member positions remain distinct and every speed is at most one. The independently proved closed-subfield census therefore gives exactly thirty positive partner roots and no positive self roots. Every partner delay and factor satisfy

$$
\delta/2\le\tau\le70,\qquad D\ge\frac{\delta^2}{128\cdot35^2}>0.
$$

The causal chord is nonzero and its delay derivative is nonzero. The implicit-function theorem supplies local smooth partner branches, and uniqueness identifies them on overlaps within $\mathcal C$. Their row expressions and finite sums are continuous there, including at equal radii with distinct endpoint positions and at outer speed one. Thus a limit of exact configurations satisfies the limiting partner equations. No positive self row is omitted at the closed boundary, where none exists.

The static comparison need not apply at all points of $\mathcal C$: $uR$ may exceed one when $R=35$ is a loose bound on a configuration's actual outer radius. The compactness and root-continuity claims instead use the actual endpoint speed constraints, so they remain valid without that comparison hypothesis.

Partner branch smoothness is not smoothness of the complete acceleration through a superfield neighborhood. Positive self roots can appear immediately beyond the speed boundary and must enter the selected law. A future interval extension of partner formulas would have to preserve its role as a necessary extension for the original subfield domain or establish the new complete census. No such numerical extension is carried out here.

## Verification results, boundaries and falsifiers

After the recorded known controls, the checker with `--stage target` returned `passed: true`. It checked the inversion identity on rational vectors $(3,4)$ and $(2,-1)$, obtaining squared value $26/125$ on both sides; the static scalar on six distinct collinear antipodal points, obtaining $-3$; and the exact coefficients thirty, sixty, $6/5$, $3/5000$ and the contradiction margin $8997/5000$. The receipt is `.local-data/master-equation-closure/overnight2-c/review-compact-exact.json`. These examples and constants supplement the general proof above; they are not sampled evidence for its universal claims.

The only writes are this review, its independent arithmetic checker and review-prefixed receipts. No subject, previous proof/review, main report or shared owner was edited. No root sampling, residual replay, trajectory evolution, cover enlargement or large worker was run, and no cost claim is inferred from compactness.

Falsifiers are failure of the Euclidean inversion identity, a source displacement exceeding its path-length bound, an incorrect transmitter-factor comparison, an omitted row or an incorrect thirty-row coefficient, a different neutral static scalar, failure of the separation dependency in its actual scope, or an exact selected configuration below the stated angular-rate cutoff. Applying the comparison merely from a loose radius bound, dropping equal-radius or wake-speed limits, or extending partner-only acceleration into a superfield neighborhood would exceed the established result.

The recommended parent disposition is to integrate the strict angular-rate cutoff and compact regular containing-domain reduction as independently reconstructed analytic results. They do not establish that the zero set is nonempty or empty, that a practical finite numerical cover exists, or that any configuration is stable or physically accepted.
