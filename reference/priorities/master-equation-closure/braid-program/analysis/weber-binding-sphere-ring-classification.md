# Balanced Rings of Three and Three on One Circle: Classification (Lane A)

Status: frozen by lane A at the time in the run record. Level reached: **level (1), a pencil proof, for the polarity words $++-+--$ and $+++---$ (no balanced ring exists); level (2), a complete computer-assisted proof, for the alternating word $+-+-+-$ (the regular hexagon is the only balanced ring)**. The level (2) chain is: (i) a pencil collision-margin lemma with $\delta=0.05$ rad; (ii) a validated branch-and-bound exclusion of the region where every gap is at least $0.01$ rad, which overlaps the lemma; (iii) an interval uniqueness certificate in the box of half-width $0.025$ rad around the hexagon. A pencil proof for the alternating word was not found. This document answers Section 12 of the [preregistration](weber-binding-sphere-preregistration.md) and was written blind to the second lane.

In plain terms: six equal members, three of each polarity, are placed on a circle that turns rigidly, and each member must receive from the other five exactly the inward acceleration that keeps it on the circle, with no acceleration along the circle. The result is that this happens in one arrangement only, the regular hexagon with alternating polarities. When two like members are neighbours, the member at the start of a like block is always accelerated along the circle, and a three-line inequality shows it. When the polarities alternate, a short argument shows that no two members can come closer than $0.05$ rad, and a computer search with guaranteed error bounds then examines every remaining arrangement and discards all of them except a small box around the hexagon, inside which the hexagon is shown to be the only solution.

## 1. Question and notation

Six members of unit weight sit at distinct points $\mathbf X_i=(\cos\theta_i,\sin\theta_i)$, $i=0,\dots,5$, of the unit circle and rotate rigidly at rate $\Omega$. The weight is a numerical coefficient of the comparison law, not a mass. Three members have polarity $q_i=+1$ and three have $q_i=-1$; $\sigma_{ij}=q_iq_j$, $\phi_{ij}=\theta_i-\theta_j$ and $d_{ij}=|\mathbf X_i-\mathbf X_j|=2|\sin(\phi_{ij}/2)|$. Units are $K=R=1$; the wake speed $c_f$ does not enter the instantaneous ring balance. The ring is in rigid inverse-square balance when, for every $i$,

$$\mathbf a_i:=\sum_{j\ne i}\sigma_{ij}\frac{\mathbf X_i-\mathbf X_j}{d_{ij}^3}=-\Omega^2\mathbf X_i,\qquad \Omega^2>0 .$$

Here $\mathbf a_i$ is the acceleration of member $i$ under the comparison law (like polarities accelerate apart), and $-\Omega^2\mathbf X_i$ is the centripetal acceleration of rigid rotation.

Members are labelled counterclockwise, so $\theta_0<\theta_1<\dots<\theta_5<\theta_0+2\pi$. The gaps are $g_k=\theta_{k+1}-\theta_k$ for $k=0,\dots,4$ and $g_5=2\pi-\sum_{k=0}^{4}g_k$; indices of gaps and members are read modulo 6. The polarity word lists $q_0q_1\cdots q_5$. The twenty placements of three $+$ signs on six positions form four classes under rotation of the labels, with representatives $+-+-+-$, $++-+--$, $++--+-$ and $+++---$; the third is the global polarity flip (equivalently the mirror image) of the second, and balance is unchanged by the flip and by reflection. Three words therefore remain: $+-+-+-$, $++-+--$ and $+++---$. For members $i\ne j$ the counterclockwise arc from $i$ to $j$ is $\psi_{i\to j}\in(0,2\pi)$, with $\psi_{i\to j}+\psi_{j\to i}=2\pi$. Two functions on $(0,2\pi)$ carry everything:

$$h(\psi)=\frac{\cos(\psi/2)}{4\sin^2(\psi/2)},\qquad u(\psi)=\frac{1}{4\sin(\psi/2)} .$$

## 2. The balance conditions

Let $\hat{\mathbf r}_i=\mathbf X_i$ and $\hat{\mathbf t}_i=(-\sin\theta_i,\cos\theta_i)$. Then $(\mathbf X_i-\mathbf X_j)\cdot\hat{\mathbf r}_i=1-\cos\phi_{ij}=2\sin^2(\phi_{ij}/2)$ and $(\mathbf X_i-\mathbf X_j)\cdot\hat{\mathbf t}_i=\sin\phi_{ij}=2\sin(\phi_{ij}/2)\cos(\phi_{ij}/2)$, while $d_{ij}^3=8|\sin(\phi_{ij}/2)|^3$. The tangential and radial components of $\mathbf a_i$ are therefore

$$T_i=\sum_{j\ne i}\sigma_{ij}\frac{\cos(\phi_{ij}/2)\,\operatorname{sgn}\sin(\phi_{ij}/2)}{4\sin^2(\phi_{ij}/2)},\qquad U_i=\sum_{j\ne i}\frac{\sigma_{ij}}{4|\sin(\phi_{ij}/2)|},$$

and balance is $T_i=0$ and $U_i=-\Omega^2$ for all $i$ with one common $\Omega^2>0$. With $\phi_{ij}=-\psi_{i\to j}$ modulo $2\pi$ this reads

$$T_i=-\sum_{j\ne i}\sigma_{ij}\,h(\psi_{i\to j}),\qquad U_i=\sum_{j\ne i}\sigma_{ij}\,u(\psi_{i\to j}).$$

Sign convention: a like member a short arc counterclockwise of $i$ contributes $-h<0$, an acceleration of $i$ clockwise, away from it. With $W(\theta)=\sum_{i<j}\sigma_{ij}/(2|\sin(\phi_{ij}/2)|)=\sum_{i<j}\sigma_{ij}/d_{ij}$ one has $T_i=-\partial W/\partial\theta_i$ and $\sum_iU_i=W$, so a balanced ring is a critical point of $W$ with all $U_i$ equal and negative and $\Omega^2=-W/6$. Five facts are used below.

- **F1 (monotonicity).** $h'(\psi)=-\dfrac{1+\cos^2(\psi/2)}{8\sin^3(\psi/2)}<0$, so $h$ is strictly decreasing on $(0,2\pi)$; $h(2\pi-\psi)=-h(\psi)$; $h>0$ on $(0,\pi)$ and $h(\pi)=0$. The magnitude $\kappa(\psi)=|h'(\psi)|$ is symmetric about $\pi$ and strictly decreasing on $(0,\pi]$.
- **F2 (small-arc bounds).** For $0<x\le\pi$, $\dfrac{1-x^2/8}{x^2}\le h(x)\le\dfrac1{x^2}$. Proof: with $t=x/2\in(0,\pi/2]$, $x^2h(x)=t^2\cos t/\sin^2t$. Lower bound: $t\ge\sin t$ and $\cos t\ge1-t^2/2$. Upper bound: $\sin t\ge t-t^3/6$ gives $\sin^2t\ge t^2(1-t^2/3)$, and $\cos t\le1-t^2/2+t^4/24\le1-t^2/3$ for $t^2\le4$.
- **F3 (the radial kernel).** $u$ is convex on $(0,2\pi)$, symmetric about $\pi$, with minimum $u(\pi)=1/4$, and $u(x)\ge1/(2x)$.
- **F4 (centre).** Summing the balance over $i$, the left side vanishes because $\sigma_{ij}(\mathbf X_i-\mathbf X_j)/d_{ij}^3$ is antisymmetric in $(i,j)$; since $\Omega^2>0$, $\sum_i\mathbf X_i=0$. Hence the members do not all lie on an arc shorter than $\pi$ (they would all have a positive component along the bisector of that arc), and equivalently every gap is smaller than $\pi$.
- **F5 (arc ranges).** If every gap is at least $g$, an arc made of $m$ consecutive gaps lies in $[mg,\,2\pi-(6-m)g]$, so by F1 its $h$ value lies in $[-h((6-m)g),\,h(mg)]$.

The alternating regular hexagon ($g_k=\pi/3$, word $+-+-+-$) is balanced: $T_i=0$ by the reflection symmetry through each member, and $U_i=-2u(\pi/3)+2u(2\pi/3)-u(\pi)=-1+1/\sqrt3-1/4$, so $\Omega^2=5/4-1/\sqrt3\approx0.6726497308$. Grade: derived (closed form).

## 3. The words with adjacent like members: pencil proof of non-existence

**Proposition 1.** No balanced ring has the word $++-+--$ or the word $+++---$. Grade: derived (pencil).

Proof. Look at member $0$ and write $h_k=h(\psi_{0\to k})$ for $k=1,\dots,5$. The arcs increase with $k$, so by F1 $h_1>h_2>h_3>h_4>h_5$. For $++-+--$ the signs $\sigma_{0k}$ are $+,-,+,-,-$ and $T_0=-h_1+h_2-h_3+h_4+h_5=-(h_1-h_2)-(h_3-h_4)+h_5$. For $+++---$ the signs are $+,+,-,-,-$ and $T_0=-h_1-h_2+h_3+h_4+h_5=-(h_1-h_3)-(h_2-h_4)+h_5$. In both cases the bracketed differences are positive, so $T_0<h_5$. The tangential condition $T_0=0$ then forces $h_5>0$, that is $\psi_{0\to5}<\pi$, that is $g_5>\pi$, which contradicts F4. $\blacksquare$

In words: the first member of a like block is accelerated clockwise by its like neighbour on the counterclockwise side and by its unlike neighbour on the clockwise side, and the remaining members cannot reverse this unless the whole ring fits in a half circle, which the centre condition forbids. The same argument applies to any word and any member whose sign sequence $\sigma_{i,k}$, read counterclockwise, can be paired in this way; for the alternating word the sequence is $-,+,-,+,-$ and the argument gives only that every gap is smaller than $\pi$.

## 4. The alternating word: collision-margin lemma

For the alternating word the others seen counterclockwise from member $i$ have signs $-,+,-,+,-$. Write $r_1=g_i$, $r_2=g_{i+1}$ for the first two gaps counterclockwise of $i$, $p_1=g_{i-1}$, $p_2=g_{i-2}$ for the first two gaps clockwise of $i$, and $\psi^{(3)}_i=\psi_{i\to i+3}$ for the arc to the third member, which has three gaps on either side. Using $h(2\pi-x)=-h(x)$ for the two clockwise members, $T_i=0$ is the identity called (E$_i$) below:

$$\Phi(r_1,r_2)-\Phi(p_1,p_2)=-h\big(\psi^{(3)}_i\big),\qquad \Phi(a,b):=h(a)-h(a+b).$$

By F1, $\Phi>0$ and $\Phi$ increases with $b$; and $\partial_a\Phi=\kappa(a+b)-\kappa(a)<0$ whenever $2a+b<2\pi$ (then $a+b$ is closer to $\pi$ than $a$ is), so $\Phi$ decreases with $a$ there.

**Lemma C (collision margin, $\delta=0.05$).** In every balanced ring with the word $+-+-+-$, every gap exceeds $0.05$ rad. Grade: derived (pencil).

Proof. Suppose the smallest gap is $g\le0.05$ and label so that $g_0=g$. All gaps are at least $g$. By F5, $|h(\psi^{(3)}_i)|\le h(3g)\le1/(9g^2)$, and for any two adjacent gaps $x,y$, $x+y\le2\pi-4g$ gives $-h(x+y)\le h(4g)\le1/(16g^2)$, hence $\Phi(x,y)\le h(x)+1/(16g^2)$. Put $\varkappa=0.999$; F2 gives $h(x)\ge\varkappa/x^2$ for $x\le0.089$.

Step 1 (the two gaps next to the smallest). (E$_0$) has $r_1=g_0$, $r_2=g_1$, $p_1=g_5$, $p_2=g_4$, so $\Phi(g_5,g_4)=\Phi(g,g_1)+h(\psi^{(3)}_0)\ge\Phi(g,g)-h(3g)\ge(\varkappa-\tfrac14-\tfrac19)/g^2$. Therefore $h(g_5)\ge(\varkappa-\tfrac14-\tfrac19-\tfrac1{16})/g^2\ge0.57538/g^2>0$, so $g_5<\pi$ and, by F2, $g_5\le g/\sqrt{0.57538}\le\alpha_1g$ with $\alpha_1=1.3184$. (E$_1$) has $p_1=g_0$, $p_2=g_5$, $r_1=g_1$, $r_2=g_2$ and gives in the same way $\Phi(g_1,g_2)\ge\Phi(g,g)-h(3g)$ and $g_1\le\alpha_1g$.

Step 2 (the next gap on each side). (E$_2$) has $p_1=g_1$, $p_2=g_0$, $r_1=g_2$, $r_2=g_3$, so $\Phi(g_2,g_3)\ge\Phi(g_1,g)-h(3g)\ge\Phi(\alpha_1g,g)-h(3g)$, using that $\Phi$ decreases in its first argument ($2g_1+g<2\pi$). By F2, with $\alpha_1g\le0.066\le0.089$, $\Phi(\alpha_1g,g)\ge\big(\varkappa/\alpha_1^2-1/(\alpha_1+1)^2\big)/g^2\ge0.38869/g^2$. Hence $h(g_2)\ge(0.38869-\tfrac19-\tfrac1{16})/g^2\ge0.21507/g^2$ and $g_2\le g/\sqrt{0.21507}\le\alpha_2g$ with $\alpha_2=2.157$. (E$_5$) has $r_1=g_5$, $r_2=g_0$, $p_1=g_4$, $p_2=g_3$ and gives in the same way $g_4\le\alpha_2g$.

Conclusion. The five consecutive gaps $g_4,g_5,g_0,g_1,g_2$ sum to at most $(1+2\alpha_1+2\alpha_2)g\le7.951\,g\le0.398<\pi$. All six members then lie on an arc shorter than $\pi$, which contradicts F4. $\blacksquare$

The constant $0.05$ is not the best the argument gives; it was chosen because the branch-and-bound below is cheap down to $0.01$, so the two regions overlap on $[0.01,0.05]$ with room to spare.

Two further exact constraints were proved on the way and are recorded because they hold for every word; neither is needed for the theorem. **Lemma A:** in a balanced ring the two members of any smallest gap are unlike. (For a like pair $a,b$ with gap $g$, $T_b-T_a=2h(g)-\sum_j\sigma_{aj}D(\psi_{a\to j})$ with $D(\psi)=h(\psi-g)-h(\psi)>0$; $D$ decreases on $[2g,\pi+g/2]$ and increases on $[\pi+g/2,2\pi-g]$, so packing the other four members at spacing $g$ and telescoping gives $\sum_jD\le2h(g)-h((k+1)g)-h((5-k)g)\le2h(g)$ for some $k\in\{0,\dots,4\}$, with strict inequality in $T_b-T_a>0$ because at least one $\sigma_{aj}=-1$.) **Lemma B:** if the smallest gap is $g$, then $\Omega^2\ge1/(6g)$. (For the unlike smallest pair the same packing applied to the convex $u$ gives $U_a+U_b\le-u((k+1)g)-u((5-k)g)\le-1/(3g)$.) Grade of both: derived (pencil), with a measured cross-check in the validation record.

## 5. Symmetry reduction

Rotations of the ring are removed by working in gaps. The remaining equivalences (reflection, relabelling within a polarity, global polarity flip) act on the gap vector $(g_0,\dots,g_5)$ by those cyclic shifts and reversals of the index that map the word to itself or to its negative. For $+-+-+-$ this is the full dihedral group of order 12; every orbit meets the set $\{g_0\le g_k\ (k=1,\dots,5),\ g_1\le g_5\}$ (shift the smallest gap to index 0, then use the reversal $k\mapsto-k$, which fixes gap 0 and exchanges gaps 1 and 5). For $++-+--$ the group has order 2, generated by $k\mapsto4-k$ with the polarity flip, and every orbit meets $\{g_0\le g_4\}$. For $+++---$ the group has order 4 (generated by $k\mapsto k+3$ and $k\mapsto4-k$, each with the flip); the orbit of gap 0 is $\{0,1,3,4\}$ and every orbit meets $\{g_0\le g_1,\ g_0\le g_3,\ g_0\le g_4\}$. The search domain for a margin $\delta$ is the box $[\delta,\,2\pi-5\delta]^5$ in the free gaps $(g_0,\dots,g_4)$ with $g_5$ derived. A box is discarded as outside the reduced domain only when one of the listed inequalities is violated at every point of the box (lower end of one gap interval above the upper end of the other). The alternating word was also run with the symmetry reduction switched off, as a check that the reduction loses nothing.

## 6. The interval method and its trust assumptions

**Enclosures.** For $i<j$ the arc $A_{ij}=\psi_{i\to j}=g_i+\dots+g_{j-1}$ involves free gaps only. On a box its range is the sum of the gap intervals, widened outward by $10^{-12}$ and capped above by $2\pi-(6-(j-i))\delta$; a box whose arc range is empty contains no point of the domain. By F1 the range of $h$ on an arc interval $[a,b]$ is $[h(b),h(a)]$, and by F3 the range of $u$ is $[\min,\max]$ over the two end points, with the minimum replaced by $1/4$ when the interval may contain $\pi$. $T_i$ and $U_i$ are sums of five such intervals with signs; the difference $U_i-U_k$ is formed term by term with the shared pair term $\sigma_{ik}u(A_{ik})$ cancelled exactly. No other dependency is exploited.

**Exclusion tests.** A box is excluded when (1) it is infeasible, (2) it lies outside the reduced domain, (3) the enclosure of some $T_i$, $i=0,\dots,5$, does not contain $0$, (4) the enclosure of some $U_i-U_k$ does not contain $0$, or (5) some $U_i$ is certainly non-negative (no $\Omega^2>0$). A box that is not excluded and lies inside the certified uniqueness box is a leaf of kind (6). Any other box is bisected along the gap with the largest width relative to $\min(1,\text{lower end})$. A box narrower than $10^{-9}$ in its widest relative direction would be recorded as undecided (7); the proof requires that there be none.

**Rounding.** Every floating result is widened outward by an a-priori bound that covers the whole block of operations that produced it: arc end points by $10^{-12}$ absolute (true error below $10^{-14}$); sine and cosine by $E=10^{-12}$ absolute; each quotient by $10^{-13}$ relative plus $10^{-300}$; each five-term sum by $10^{-13}$ times the sum of the magnitudes of its terms. The constants used for $\pi$ and $2\pi$ are the two adjacent doubles that bracket each ($3.141592653589793<\pi<3.1415926535897936$, $6.283185307179586<2\pi<6.283185307179587$).

**Trigonometric functions.** No library trigonometric function is used in any enclosure. $\sin x$ and $\cos x$ for $x\in[0,3.2]$ are computed by the degree-15 and degree-16 Taylor polynomials at $y=x/8\le0.4$ followed by three doublings $s\leftarrow2sc$, $c\leftarrow1-2s^2$. Error bound: the truncation errors are at most $0.4^{17}/17!<10^{-21}$; the Horner evaluations involve at most 30 rounded operations on quantities of magnitude at most 1, so the error after the polynomial stage is $e_0\le4\times10^{-15}$; each doubling gives $e_{k+1}\le4e_k+5\times10^{-16}$, so $e_3\le2.7\times10^{-13}$. The code widens by $10^{-12}$, which also absorbs the rounding of the widening additions themselves. The bounds for $h$ use the widened sine and cosine with the correct orientation for each sign of the cosine.

**Uniqueness certificate.** Let $F=(T_0,\dots,T_4)$ as a function of the free gaps on the box $X=\{|g_k-\pi/3|\le r\}$. The Jacobian is $\partial T_i/\partial g_k=\sum_{j>i,\ i\le k<j}\sigma_{ij}\kappa(A_{ij})-\sum_{j<i,\ j\le k<i}\sigma_{ij}\kappa(A_{ji})$, enclosed on $X$ by the monotonicity of $\kappa$ (F1). With $C$ a floating-point inverse of the midpoint Jacobian, the program bounds $\|I-C\,J(X)\|_\infty$ over the interval matrix. If the bound is below 1, $F$ is injective on $X$: for $x,y\in X$ the mean value theorem, applied row by row on the convex box, gives $F(x)-F(y)=M(x-y)$ with $M$ in the interval matrix, and $\|I-CM\|<1$ makes $CM$ invertible. Every balanced ring in $X$ is a zero of $F$, the hexagon is a zero of $F$ in $X$ by Section 2, so the hexagon is the only balanced ring in $X$. This is the contraction half of the Krawczyk test; existence is supplied by the closed form rather than by the inclusion half.

**Trust assumptions.** (TA1) Node 26.3.0 evaluates $+,-,\times,\div$ on binary64 with round-to-nearest, and parses the decimal constants above correctly. (TA2) The hand error bounds of this section are correct; they are supported by measured agreement (below) but not machine-proved. (TA3) The program implements the tests as described; this is supported by the known cases, by a replay of the bisection tree that shows the leaf list partitions the root box, and by a recheck of every leaf with a separately written evaluator on `mpmath.iv`, whose own correctness is then a further assumption of that recheck only. (TA4) The monotonicity and convexity facts F1 and F3, proved above, are used by both the instrument and the recheck. No assumption is made about `Math.sin` or `Math.cos`; they appear only on the comparison side of known case KA1.

## 7. Validation record (known cases first)

All known cases were run and recorded before the six-member target runs whose results are reported here; UTC times are in the run record and in the receipt. Commands are given in Section 12.

| Case | Content | Result | Tolerance or criterion | UTC |
|---|---|---|---|---|
| KA0 | Own sine and cosine against `Math.sin`, `Math.cos` on $2\times10^6$ points; against `mpmath` at 40 digits on 2000 points | max difference $1.3\times10^{-15}$; $9.7\times10^{-16}$ | below $5\times10^{-13}$ | 03:48:59Z; 03:57:20Z (first pass 03:45:52Z) |
| KA1 | Enclosure property: library-trigonometry point values of all $T_i$, $U_i$, $U_i-U_k$ inside the enclosure of a random box (half-widths $10^{-6}$ to $3\times10^{-2}$) containing the point; 120000 boxes per six-member word, 60000 per four-member word | 480000 boxes, 0 failures; smallest slack $2.0\times10^{-9}$; 100800 Jacobian entries against central differences, 0 failures | 0 failures | 03:49:01Z |
| KA2 | Hexagon: box of half-width $10^{-9}$ is not excluded, all $T_i$ enclosures contain 0, all $U_i$ enclosures contain $-(5/4-1/\sqrt3)$; certificate norm by radius | not excluded; certificate norm $0.370,\ 0.731,\ 0.905$ at $r=0.01,\ 0.02,\ 0.025$ (certified) and $1.074$ at $r=0.03$ (not certified) | norm below 1 at the stated radius | 03:49:01Z |
| KA3 | Known non-solutions: regular hexagon with words $+++---$ and $++-+--$ (half-width $10^{-3}$) and one irregular alternating box | all three excluded by the tangential test on member 0 | excluded | 03:49:01Z |
| KA4 | Four-member analogue, same code, $\delta=0.01$: see Section 9 | alternating square retained and certified, nothing else; agrees with the multi-start search | agreement | 03:49:01Z |
| KA5 | Sensitivity: 20000 random boxes containing the hexagon (half-widths $10^{-9}$ to $0.5$) and 20000 containing the square; a branch-and-bound from a root box of half-width $2\times10^{-9}$ around the hexagon with the uniqueness box switched off | 0 excluded; the root run ends with 38 undecided boxes, that is, the hexagon is retained | 0 excluded; undecided $>0$ | 03:49:01Z |

Pencil statements were cross-checked numerically (measured, `numpy` double precision, random configurations): the components $T_i,U_i$ against the vector definition (2000 configurations, relative difference below $6\times10^{-11}$); Proposition 1's inequality $T_0<0$ whenever $\psi_{0\to5}\ge\pi$ (387470 configurations, 0 violations); F2 on a grid of 400001 points; Lemma A and Lemma B (40247 and 59753 configurations, 0 violations). The chain of Lemma C was also tested in residual form, which does not assume balance: for any alternating configuration with smallest gap $g_0=g\le0.05$ the proof gives $h(g_5)+T_0\ge0.57538/g^2$, $h(g_1)-T_1\ge0.57538/g^2$, and, when the neighbouring gap is at most $1.3184\,g$, $h(g_2)-T_2\ge0.21507/g^2$ and $h(g_4)+T_5\ge0.21507/g^2$; on 200000 random clustered configurations there were no violations (smallest margin $0.174/g^2$). The corresponding four-member inequalities $h(g_3)+T_0\ge0.749/g^2$ and $h(g_1)-T_1\ge0.749/g^2$ had no violations in 200000 configurations, with smallest margin $0.0010/g^2$, which shows that bound is attained up to the factor $\varkappa$. The certificate was recomputed with `mpmath.iv` and `numpy` by a separately written script using the plain natural interval extension of $\kappa$: norm bound $0.90497$ at $r=0.025$ for six members and $0.52820$ at $r=0.05$ for four.

The known cases were first run at 03:39:54Z to 03:39:57Z, before the first six-member target runs at 03:40:17Z. The instrument then gained one option (writing the leaf list to a file), which changes no enclosure or test; all known cases and all target runs were repeated with the final script, and the table and Section 8 report the repeated runs. The repeated runs reproduce the box counts of the first runs exactly for all three words and for the run without symmetry reduction; the result files of the first runs were overwritten, so their leaf digests were not retained, except for the two four-member runs, whose digests are unchanged.

## 8. Result

**Theorem.** Let six members of unit weight, three of each polarity, sit at distinct points of one circle. The ring is in rigid inverse-square balance with $\Omega^2>0$ if and only if it is the alternating regular hexagon: the polarities alternate, all six gaps equal $\pi/3$, and $\Omega^2=(5/4-1/\sqrt3)\,K/R^3$. This holds up to rotation, reflection, relabelling within a polarity and the global polarity flip, each of which maps the hexagon to itself.

Proof. Words $++-+--$ and $+++---$: Proposition 1. Word $+-+-+-$: by Lemma C every balanced ring has all gaps above $0.05$; by the symmetry reduction it has a representative in the reduced domain with all gaps at least $0.01$; the branch-and-bound run `w1-d0.01` partitions that domain into leaves, each of which is infeasible, outside the reduced domain, excluded by a tangential or radial condition, or contained in the box $X=\{|g_k-\pi/3|\le0.025,\ k=0,\dots,4\}$, with no undecided leaf; and the certificate shows the hexagon is the only balanced ring in $X$. $\blacksquare$

Grade: derived. For the two non-alternating words the proof is pencil. For the alternating word it is computer-assisted and rests on trust assumptions TA1 to TA4 of Section 6.

Box tree of the target runs ($\delta=0.01$; all complete, no undecided leaf, no pending box):

| Run | Word | Boxes processed | Bisected | Infeasible | Outside reduced domain | Tangential | Radial difference | Radial sign | Inside $X$ | Deepest level | Wall seconds |
|---|---|---|---|---|---|---|---|---|---|---|---|
| `w1-d0.01` | $+-+-+-$ | 555407 | 277703 | 35671 | 84293 | 136231 | 21483 | 0 | 26 | 55 | 1.5 |
| `w1-d0.01-nosymm` | $+-+-+-$, no symmetry reduction | 14682807 | 7341403 | 635594 | 0 | 3938832 | 2766952 | 0 | 26 | 55 | 38.8 |
| `w2-d0.01` | $++-+--$ | 108525 | 54262 | 14455 | 2114 | 33077 | 4617 | 0 | 0 | 50 | 0.36 |
| `w3-d0.01` | $+++---$ | 1847 | 923 | 1 | 114 | 785 | 24 | 0 | 0 | 33 | 0.03 |

The runs on $++-+--$ and $+++---$ are not needed for the theorem; they confirm Proposition 1 on the region where every gap is at least $0.01$ by an independent route (validated on the stated region). Counts by depth and by excluding condition, and the SHA-256 digest of each leaf stream, are in the receipt. The complete leaf lists of the three symmetric runs are retained locally. A separately written Python program first replays the tree: starting from the root box and bisecting by the stated rule whenever the next leaf of the depth-first stream is not exactly the current box, it consumes each stream exactly, which shows in exact double arithmetic that the leaves partition the root box (the leaf volumes also sum to the root volume, relative difference $0$ in double precision). Every leaf was then rechecked with a separately written evaluator on `mpmath.iv` at 30 digits: 277704 of 277704 leaves confirmed for $+-+-+-$, 54263 of 54263 for $++-+--$, 924 of 924 for $+++---$. In this recheck 38716, 15272 and 28 leaves respectively were confirmed as holding no point of the domain at all (their lower gap sums already exceed $2\pi-\delta$), where the Node instrument, which widens outward, had recorded another valid condition. The recheck uses the same leaf list and the monotonicity facts F1 and F3, so it tests the coverage, the arithmetic, the trigonometry and the rounding bounds of the instrument, not the structure of the argument. The checker itself was run on two known bad cases first: a list with one leaf removed fails the replay (it stops at the missing leaf), and a list with one leaf relabelled to a condition that does not hold is reported as not confirmed at exactly that leaf.

Uniqueness box: $X=[\pi/3-0.025,\ \pi/3+0.025]^5$ in $(g_0,\dots,g_4)$, with floating end points $1.0221975511965977$ and $1.0721975511965975$ used both by the certificate and by the containment test; certificate norm bound $0.90497<1$ from the instrument and $0.90497$ from the `mpmath.iv` recheck. The box meets the excluded region: 26 leaves of the tree lie inside $X$ and every other leaf is excluded.

## 9. By-product: the four-member rings of two and two

**Proposition 2.** Four members of unit weight, two of each polarity, on one circle are in rigid inverse-square balance with $\Omega^2>0$ if and only if they form the alternating square, with $\Omega^2=(2\sqrt2-1)/4\approx0.4571067812$ (from $U_i=-2u(\pi/2)+u(\pi)$). Grade: derived, with the same trust assumptions.

Proof. Word $++--$: for member 0 the signs are $+,-,-$ and $T_0=-(h_1-h_2)+h_3<h_3$, so $T_0=0$ forces $\psi_{0\to3}<\pi$, all four members on an arc shorter than $\pi$, against F4 (which holds for any number of members). Word $+-+-$: the tangential condition of member $i$ is $h(p_1)=h(r_1)-h(\psi_{i\to i+2})$. Let $g=g_0\le0.05$ be the smallest gap. Member 0 gives $h(g_3)=h(g)-h(g+g_1)\ge h(g)-h(2g)$; member 1 gives $h(g_1)=h(g)+h(\psi_{1\to3})=h(g)-h(g+g_3)\ge h(g)-h(2g)$. By F2 both $g_1$ and $g_3$ are at most $g/\sqrt{0.999-1/4}\le1.156\,g$, so three consecutive gaps sum to at most $3.32\,g<\pi$, against F4. Hence every gap exceeds $0.05$. The run `ka4-alt-square` ($\delta=0.01$, reduced domain $g_0\le g_k$, $g_1\le g_3$) processed 639 boxes: 103 outside the reduced domain, 151 tangential, 58 radial difference, 8 inside the certified box $\{|g_k-\pi/2|\le0.05\}$ (certificate norm $0.528$), none undecided. $\blacksquare$

The leaf lists of both four-member runs were written by a repeat with the same script (runs `w4alt-d0.01` and `w4ppmm-d0.01`, leaf digests identical to those of the known-case runs) and passed the tree replay and the `mpmath.iv` recheck of every leaf (320 of 320 and 113 of 113).

Comparison with the unvalidated search (known case KA4): the multi-start least-squares search (3000 random starts per word) converged 2825 times for $+-+-$, always to the square with $\Omega^2=0.45710678118654746$, and never for $++--$; the validated run on $++--$ excluded all 225 boxes (111 tangential leaves, 2 outside the reduced domain). The two instruments agree: one solution, the alternating square. With the uniqueness box switched off the same code retains the square (5 undecided boxes in the test region), which shows that the exclusion is not vacuous.

## 10. Claims, grades and falsifiers

1. **No balanced ring with word $++-+--$ or $+++---$.** Derived (pencil, Proposition 1). Falsifier: any configuration with one of these words, $|T_i|$ and $|U_i-U_k|$ at rounding level and $U_i<0$; or an error in the three-line inequality, checkable by evaluating $T_0$ on any configuration with $\psi_{0\to5}\ge\pi$.
2. **Every balanced alternating ring has all gaps above $0.05$ rad.** Derived (pencil, Lemma C). Falsifier: an arithmetic error in Steps 1 and 2 (the constants $0.57538$, $1.3184$, $0.38869$, $0.21507$, $2.157$, $7.951$ can be recomputed by hand; the four inequalities of the chain hold for every configuration once the residual $T_i$ is carried along, so a single configuration violating one of them in that residual form would also refute the proof), or a failure of F2, which is checkable on a grid.
3. **No balanced alternating ring with all gaps at least $0.01$ rad other than the hexagon.** Derived, computer-assisted, under TA1 to TA4. Falsifier: a point of the root box not covered by the leaf list; a leaf whose recorded condition fails under an independent rigorous evaluation; a configuration in $X$ other than the hexagon with $T_0=\dots=T_4=0$; or an error in the rounding bounds of Section 6. The leaf lists under `.local-data` allow all four to be checked.
4. **Classification theorem (Section 8).** Derived from claims 1 to 3.
5. **Four-member classification (Proposition 2).** Derived, same assumptions; additionally measured agreement with the multi-start search.
6. **Multi-start search, six members.** Measured (instrument: `scipy` Levenberg-Marquardt on $(T_i,\,U_i-\bar U)$, 3000 random starts per word, acceptance at residual below $10^{-9}$ and $\bar U<0$): 2514 convergences for $+-+-+-$, all to the hexagon with $\Omega^2=0.6726497308103744$; none for the other two words. This instrument cannot establish absence; it is recorded as the unvalidated comparison only.
7. **Lemmas A and B.** Derived (pencil), not used by the theorem; measured cross-check with 0 violations in $10^5$ random configurations.

## 11. What is not proved

- A pencil proof for the alternating word. The uniqueness of the hexagon among alternating rings rests on the computation of Section 8.
- Machine verification of the hand error bounds (TA2) and of the program (TA3). The `mpmath.iv` recheck reduces but does not remove this, because it shares the leaf list, the monotonicity facts and the structure of the argument.
- Anything about stability, about rings that are not rigid, about members off one circle, about unequal weights or other counts than three and three (and two and two), or about the delayed law. The theorem classifies rigid balance on one circle under the instantaneous inverse-square comparison law only.
- Smaller margins by computation: exploratory runs at $\delta=0.001$ were stopped unfinished for the alternating word and for $++-+--$ (about $4.5\times10^7$ boxes each in 115 s without completing); they are not needed, because Lemma C and Proposition 1 cover that region, and no claim rests on them. The run at $\delta=0.001$ for $+++---$ completed (7765 boxes, none undecided) with the pre-final script.

## 12. Evidence

Tracked instruments and receipt (SHA-256 in the table at the end of this section):

- [weber-binding-sphere-ring-a-bnb.mjs](../evidence/weber-binding-sphere-ring-a-bnb.mjs): enclosures, exclusion tests, certificate, branch-and-bound driver.
- [weber-binding-sphere-ring-a-known-cases.mjs](../evidence/weber-binding-sphere-ring-a-known-cases.mjs): KA0 to KA5.
- [weber-binding-sphere-ring-a-multistart.py](../evidence/weber-binding-sphere-ring-a-multistart.py): unvalidated multi-start comparison.
- [weber-binding-sphere-ring-a-pencil-checks.py](../evidence/weber-binding-sphere-ring-a-pencil-checks.py): numerical cross-checks of the pencil statements.
- [weber-binding-sphere-ring-a-leaf-recheck.py](../evidence/weber-binding-sphere-ring-a-leaf-recheck.py): volume balance and `mpmath.iv` recheck of every leaf.
- [weber-binding-sphere-ring-a-certificate-recheck.py](../evidence/weber-binding-sphere-ring-a-certificate-recheck.py): `mpmath.iv` recheck of the certificate.
- [weber-binding-sphere-ring-a-make-receipt.mjs](../evidence/weber-binding-sphere-ring-a-make-receipt.mjs) and [weber-binding-sphere-ring-a-receipt.json](../evidence/weber-binding-sphere-ring-a-receipt.json): the receipt builder and the receipt (known cases with UTC, run summaries, counts by depth and condition, leaf digests, SHA-256 of every script and of every local file).

Commands, from the repository root, with `E=reference/priorities/master-equation-closure/braid-program/evidence` and `L=.local-data/master-equation-closure/weber-binding-sphere/ring-a`:

```
node $E/weber-binding-sphere-ring-a-known-cases.mjs $L 0.01
../.venv/bin/python $E/weber-binding-sphere-ring-a-multistart.py $L/multistart.json 3000
../.venv/bin/python $E/weber-binding-sphere-ring-a-pencil-checks.py $L
node $E/weber-binding-sphere-ring-a-bnb.mjs --mode run --word "+-+-+-" --delta 0.01 --kr 0.025 --out $L --tag w1-d0.01 --dump $L/w1-d0.01.leaves.f64
node $E/weber-binding-sphere-ring-a-bnb.mjs --mode run --word "+-+-+-" --delta 0.01 --kr 0.025 --symm 0 --out $L --tag w1-d0.01-nosymm
node $E/weber-binding-sphere-ring-a-bnb.mjs --mode run --word "++-+--" --delta 0.01 --kr 0 --out $L --tag w2-d0.01 --dump $L/w2-d0.01.leaves.f64
node $E/weber-binding-sphere-ring-a-bnb.mjs --mode run --word "+++---" --delta 0.01 --kr 0 --out $L --tag w3-d0.01 --dump $L/w3-d0.01.leaves.f64
../.venv/bin/python $E/weber-binding-sphere-ring-a-leaf-recheck.py $L/w1-d0.01.leaves.f64 "+-+-+-" 0.01 0.025 100000000 $L/w1-d0.01.recheck.json
../.venv/bin/python $E/weber-binding-sphere-ring-a-leaf-recheck.py $L/w2-d0.01.leaves.f64 "++-+--" 0.01 0 100000000 $L/w2-d0.01.recheck.json
../.venv/bin/python $E/weber-binding-sphere-ring-a-leaf-recheck.py $L/w3-d0.01.leaves.f64 "+++---" 0.01 0 100000000 $L/w3-d0.01.recheck.json
node $E/weber-binding-sphere-ring-a-bnb.mjs --mode run --word "+-+-" --delta 0.01 --kr 0.05 --out $L --tag w4alt-d0.01 --dump $L/w4alt-d0.01.leaves.f64
node $E/weber-binding-sphere-ring-a-bnb.mjs --mode run --word "++--" --delta 0.01 --kr 0 --out $L --tag w4ppmm-d0.01 --dump $L/w4ppmm-d0.01.leaves.f64
../.venv/bin/python $E/weber-binding-sphere-ring-a-leaf-recheck.py $L/w4alt-d0.01.leaves.f64 "+-+-" 0.01 0.05 100000000 $L/w4alt-d0.01.recheck.json
../.venv/bin/python $E/weber-binding-sphere-ring-a-leaf-recheck.py $L/w4ppmm-d0.01.leaves.f64 "++--" 0.01 0 100000000 $L/w4ppmm-d0.01.recheck.json
../.venv/bin/python $E/weber-binding-sphere-ring-a-certificate-recheck.py $L/certificate-recheck.json
node $E/weber-binding-sphere-ring-a-make-receipt.mjs $L $E/weber-binding-sphere-ring-a-receipt.json w1-d0.01 w1-d0.01-nosymm w2-d0.01 w3-d0.01 ka4-alt-square ka4-pp-mm ka4-alt-square-noK-detects ka5-hexagon-root w4alt-d0.01 w4ppmm-d0.01 w3-d0.001
```

The target runs and the leaf rechecks were launched through `node scripts/dev/owned-compute-supervisor.mjs run --owner-task claude-weber-binding-sphere-20261007c`. Runtime output is under `.local-data/master-equation-closure/weber-binding-sphere/ring-a/`; this is local retention only and is not backed up. Its size and the SHA-256 of each file are in the receipt and in the table below. A six-member leaf list is a sequence of records of 13 little-endian doubles (9 for four members): depth, leaf kind (1 to 7 as in Section 6), index of the excluding condition, then lower and upper end of each free gap.

| File | Location | Bytes | SHA-256 |
|---|---|---|---|
| `weber-binding-sphere-ring-a-bnb.mjs` | tracked evidence | 15850 | `18874f6fefc16459a6b37e18812d8d80873e1273d45901bfd7a00a2e09c4fa28` |
| `weber-binding-sphere-ring-a-certificate-recheck.py` | tracked evidence | 3260 | `28d5173393cb3d5a124305585ffa510045596ab4e12ddfcc82c6bed11f9f6923` |
| `weber-binding-sphere-ring-a-known-cases.mjs` | tracked evidence | 8532 | `2d73524dd01f858095f69f02f3b0860322c6fc1aaf9e6b336ffd2bf3add8c32a` |
| `weber-binding-sphere-ring-a-leaf-recheck.py` | tracked evidence | 6184 | `7b606aba34f6306fdf296f54066647553bddab527bd1c3fc321e9d37502c8db3` |
| `weber-binding-sphere-ring-a-make-receipt.mjs` | tracked evidence | 2964 | `a4caf7f515b2624c2d2c8adf278a3a7c031f7fdde3c311129bb2d830c9b43f6d` |
| `weber-binding-sphere-ring-a-multistart.py` | tracked evidence | 2725 | `509259a7825b8cc1039f5f1f287cdeb099ee1ddd8e315e123f74290809172410` |
| `weber-binding-sphere-ring-a-pencil-checks.py` | tracked evidence | 7196 | `d04ca9e29fb61d54372315deacdd9820c9d7613a55d6364ce3473a943a1d1a5f` |
| `weber-binding-sphere-ring-a-receipt.json` | tracked evidence | 68906 | `d56793a6dfff35b0b3eee9e737866ee73fa8d916dbbbcc02c449dd59a6c97866` |
| `known-cases.json` | local retention | 6177 | `c1da5d97ba43f230b6edf8e330250938f8e653de46292618809c26611bbc0386` |
| `pencil-checks.json` | local retention | 1808 | `82fa19406a1b91d9a15a196bca03a61a4c27ffd20081aca52687fefd012e97c6` |
| `multistart.json` | local retention | 1325 | `6abd7f3ef8e52119ea0fb77ad70c77a0e64cd71f071a42134ffbfe1046a1c1d8` |
| `certificate-recheck.json` | local retention | 718 | `c7c1215026c47ae9fa8ce8cf4dc1bcecc7f641409ce1551544a6bd39bb704292` |
| `w1-d0.01.result.json` | local retention | 5184 | `12683e402347d30bee546e71a72986257ce99345e3b60b9e11aedd305a480213` |
| `w1-d0.01.leaves.f64` | local retention | 28881216 | `8bdea1d65d2a027b3847094c6415cc10f3f992b130bbdbb1b7753e3d41139e47` |
| `w1-d0.01.recheck.json` | local retention | 806 | `45eb4cd60749cf51a7e5a37a5601376ee84758de975924978321d579594d2c75` |
| `w1-d0.01-nosymm.result.json` | local retention | 5020 | `1cde0348c29996fd8dfc134cc3beeebb431f9b726ce9f5c697f197900bd355a6` |
| `w2-d0.01.result.json` | local retention | 4516 | `377d3bdfcd72723781f137f9199a67d61d012da8f0595f7e896919a9d3c073a0` |
| `w2-d0.01.leaves.f64` | local retention | 5643352 | `a8c88e8236faa6d87ee0208ad3b74937846bdc762b33a0086d7ef6a085b4c210` |
| `w2-d0.01.recheck.json` | local retention | 754 | `e8209cda9afb70cdec23db2991c2179fbf92b7b4c460d3dfaf04bb62a0eb1081` |
| `w3-d0.01.result.json` | local retention | 3166 | `16a9655b8411f85c185b78e06534abf151c64fa1861527e087d71816c21bcffa` |
| `w3-d0.01.leaves.f64` | local retention | 96096 | `dfe0dc1f4981db064c859b7fb0aa910aef15f206aff8bc5bf9a6e49685221c16` |
| `w3-d0.01.recheck.json` | local retention | 717 | `fe532c7a57efd29a49b3194ab765ef24bfd013a2aa1c51d9849d20eaa157e3fe` |
| `ka4-alt-square.result.json` | local retention | 2679 | `a37bfb9c2d2ec70e116317534d16da85efcd403c9cf4b4afd05ef058e100eb83` |
| `ka4-pp-mm.result.json` | local retention | 2187 | `aff288fac0d06a6b0064c20977f529002786ecd6a805c5cb15c8ee434423489b` |
| `w4alt-d0.01.leaves.f64` | local retention | 23040 | `e509e28f7edbce1b2db511912f637f0c6ce87a163af5218a9f547376cd5bdbfc` |
| `w4alt-d0.01.recheck.json` | local retention | 718 | `8a16b30b8d6c3376e5404f00388cd9b4fa9a613d674d9fdaeded53f69b7fd5d1` |
| `w4ppmm-d0.01.leaves.f64` | local retention | 8136 | `05d40fdeab55e6695979c3f0190848b156dde509c24a7abd943d8fe62b760a4b` |
| `w4ppmm-d0.01.recheck.json` | local retention | 640 | `aede175c12d4e588894fdd760a160f48b6f0794cc964a56f88d330552ee0682e` |

The local directory holds 43 files, 34892246 bytes in total (about 34.9 MB), by directory listing at the time of the freeze. The receipt lists the SHA-256 of every local file present when it was built.

## Cross-review of lane B (after exposure)

This section was added after the Principal Investigator announced exposure at 04:08Z. Everything above it, and the run record entries up to the freeze, are the text frozen at 04:05Z (SHA-256 `4357070d38ef448a1433383886f950f3d10f9928d07dc1b3befd34a718c1a261`) and are unchanged. Lane B's document, [weber-binding-sphere-ring-classification-independent.md](weber-binding-sphere-ring-classification-independent.md), was read at its frozen hash `528c3ad78e8f322ffa969c38357649e89c5b0dc40e2b55b56f6c3db1306e59c2`; its scripts were not read. The review is on paper, with numerical cross-checks from lane A's own instrument where stated. Lane B works in half-angles: its kernel is $f(x)=\cos x/(4\sin^2x)=h(2x)$ in the notation of Section 1, its half-gaps are $\alpha_{k+1}=g_k/2$, and its radial kernel is this document's $u$.

### Item 1. Lemma 1, Lemma 2 and Theorem 1 (non-alternating words from the tangential conditions alone)

Verdict: **confirmed**. Each step was re-derived.

- Lemma 1. Seen from $p'$, the member $p$ sits at half-angle $\pi-a$ and member $j$ at $y_j$; seen from $p$, $p'$ sits at $a$ and $j$ at $y_j+a$, with $y_j+a<\pi$. Then $T_{p'}=f(a)-\sum_js_jf(y_j)$ and $T_p=-f(a)-\sum_js_jf(y_j+a)$, and the difference is the stated identity. Correct.
- Lemma 2. (i) and (ii) are immediate from monotonicity and $f(\pi-x)=-f(x)$. (iii): for $y<\mu_a$ both $y+a>y$ and $\pi-y-a>y$, so $y$ is nearer an end of $(0,\pi)$ than $y+a$ and $|f'(y)|>|f'(y+a)|$. (iv): $\mu_a+a=\pi-\mu_a$. (v): for $a>\pi/2$, $\mu_a<\pi-a$ gives $f(a)+f(\mu_a)>0$. Correct.
- Theorem 1, word $++-+--$. With the like pair $p,p'$ and the third like member $L$, the identity reads $g_a(y_L)=2f(a)+\sum_ug_a(y_u)$. The claim that $L$ has an unlike member on each side along the outer arc was checked for both like pairs and both mirror forms of the word. The unlike member on the side of $L$ away from $\mu_a$ has $g_a(y_{u^\ast})>g_a(y_L)$ by (iii), and the rest of the right side is positive by (iv) and (v). Correct; only $T_p=T_{p'}=0$ is used.
- Theorem 1, word $+++---$. The two applications of Lemma 1 to one block give $f(b)-f(a+b)>2f(a)$ and $f(a)-f(a+b)>2f(b)$, the second after $f(\pi-x)=-f(x)$ with the third like member at $y=\pi-a-b$. Their sum $-2f(a+b)>f(a)+f(b)$ forces $a+b>\pi/2$; the same for the other block contradicts $a+b+c+d<\pi$. Correct; the six tangential conditions are used and nothing else. The four-member remark for $++--$ is correct for the same reason.

Is it a different argument from Proposition 1 of this document? Yes. Proposition 1 uses one tangential condition, $T_0=0$, and then the centre condition $\sum_i\mathbf X_i=0$, which needs the full vector balance of all six members and $\Omega^2>0$. Theorem 1 uses two tangential conditions (word $++-+--$) or six (word $+++---$) and nothing else, so it proves more: these words have no critical point of $W$ at all. The identity of Lemma 1 is the same identity that underlies Lemma A of Section 4 (there written as $T_b-T_a$ with $D(\psi)=h(\psi-g)-h(\psi)=g_a(y)$, and with the same decrease-then-increase shape), found independently; but Lemma A applies it to a smallest gap with a packing bound, whereas Theorem 1 applies it to an arbitrary like pair with the minimum value of $g_a$. The two lanes therefore exclude the non-alternating words by two genuinely different pencil routes, and lane B's is the stronger statement.

Numerical cross-check with lane A's instrument (measured support for Theorem 1 on a stated region; validated to the same standard as Section 6, without leaf recheck): the tangential-only driver described under Item 3, on all gaps at least $0.01$, excludes every box for $++-+--$ (175737 boxes, 64748 tangential leaves, none undecided), for $+++---$ (1975 boxes, none undecided) and for the four-member $++--$ (225 boxes, none undecided).

### Item 2. Lemmas 3, 4 and 5, the function $\rho$, and the region $D_6$ (collision margin for the alternating word)

Verdict: **confirmed**. The margin, every half-gap above $0.4069$ and so every gap above $0.8138$ rad, is correct, and it is about sixteen times larger than this document's $\delta=0.05$.

- (F4). $\rho'(x)=x\,k(x)/\sin^3x$ with $k(x)=\sin2x-x(1+\cos^2x)$ was re-derived by differentiating $x^2\cos x/\sin^2x$. Then $k'(x)=2\cos2x-1-\cos^2x+x\sin2x=-3\sin^2x+x\sin2x=\sin x\,(2x\cos x-3\sin x)$, which is negative on $(0,\pi/2]$ because $3\tan x>2x$ there and the bracket equals $-3$ at $\pi/2$. With $k(0)=0$ this gives $k<0$ and $\rho$ strictly decreasing from $1$ to $0$. Correct.
- Lemma 3. The two groupings of $T_k=f_1-f_2+f_3-f_4+f_5$ are $(f_1-f_2)+(f_3-f_4)+f_5$ and $f_1-(f_2-f_3)-(f_4-f_5)$, with $f_5=-f(\alpha_{k-1})$ and $f_4=-f(\alpha_{k-1}+\alpha_{k-2})$. Dropping one positive bracket in each gives the stated inequality for consecutive triples read in either direction, and $f(\alpha_{k-1})>0$ gives every half-gap below $\pi/2$. The four-member case holds with equality. Correct.
- Lemma 4. $f(v)-f((1+\mu)v)=[\rho(v)-\rho((1+\mu)v)/(1+\mu)^2]/(4v^2)\ge\rho(v)[1-(1+\mu)^{-2}]/(4v^2)$ uses $\rho((1+\mu)v)\le\rho(v)$, which holds by monotonicity up to $\pi/2$ and by sign beyond it, and $1-(1+\mu)^{-2}=1/\lambda^2$. The strict step $\rho(\lambda v)<\rho(v)$ holds for the same two reasons, including the boundary case $v=\pi/2$ where $\rho(v)=0>\rho(\lambda v)$. Correct.
- Lemma 5. The constants were recomputed: $a_2=1.154701$, $a_3=1.367671$, $a_4=1.675474$, $\pi/(1+2a_2+2a_3+a_4)=0.406931$ and $\pi/(1+2a_2+a_3)=0.671701$. Each triple is one to which Lemma 3 applies in the direction used, the hypotheses of Lemma 4 ($v\le\pi/2$, $u+v<\pi$, $w<\pi$) are supplied by Lemma 3, $\psi$ is increasing, and $\psi(a_k\varepsilon)=a_{k+1}\varepsilon$. Correct. One remark, not a defect: in the third step the hypothesis $u\ge\mu v$ of Lemma 4 holds directly with $\mu=\varepsilon/\alpha_3$ because $u=\alpha_2\ge\varepsilon$, so the appeal to the monotonicity of $\lambda$ is not needed.
- Symmetry normalization and $D_6$. Shifting the gap labels by one place and reversing them are the same reductions used in Section 5 of this document (smallest gap first, then $g_1\le g_5$); the bounds of Lemma 5 are symmetric under the reversal, and the upper bounds follow from $\varepsilon\le\pi/6$. Correct.

Relation to Lemma C of this document. Both start from the same identity (this document's (E$_i$) is lane B's alternating sum for $T_k$). Lemma C bounds the two far terms separately by $h(3g)$ and $h(4g)$, uses flat bounds with a factor $0.999$, and closes with the centre condition; lane B drops a positive bracket instead, which loses nothing at leading order, keeps the exact kernel through $\rho$, and closes with the sum of the gaps, so that the centre condition, the radial conditions and the sign of $\Omega^2$ are not used. Lemma C is consistent with Lemma 5 and strictly weaker.

Numerical cross-check against lane A's frozen leaf data (run `w1-d0.01`, 277704 leaves; measured, by reading the leaf list with `numpy`). (a) No unexcluded leaf contains a point with a gap below $0.8138$: the only unexcluded leaves are the 26 inside the uniqueness box, and over those 26 the smallest lower end of any of the six gaps, including the derived sixth, is $0.97022$ and the largest upper end is $1.12823$. (b) 276551 leaves lie wholly where some gap is below $0.8138$, and all of them are excluded leaves (35671 infeasible, 83884 outside the reduced domain, 135771 tangential, 21225 radial difference). (c) Translating $D_6$ to gaps ($g_0\in[0.8138,\pi/3]$, $g_0\le g_k$, $g_1\le g_5$, $g_1,g_5\le1.2094$, $g_2,g_4\le1.4324$, $g_3\le1.7546$), 277074 leaves lie wholly outside $D_6$ by a box test; 277063 of them are excluded leaves and the other 11 are leaves inside the uniqueness box whose lower end of $g_0$ exceeds $\pi/3$, a normalization that lane A's instrument does not impose and that the certificate covers. The 630 leaves that may meet $D_6$ are 397 tangential, 218 radial difference and 15 inside the uniqueness box. So the answer to the question as posed is: every leaf outside $D_6$ is either excluded or lies in the certified box around the hexagon, and lane A's data are consistent with lane B's margin. (d) For four members, lane B's margin is $1.3434$ in gap units; the 8 unexcluded leaves of `w4alt-d0.01` have smallest gap lower end $1.42447$, and all 215 leaves lying wholly where some gap is below $1.3434$ are excluded.

Further measured checks, written by lane A without reading lane B's scripts: $\rho$ strictly decreasing on a grid of 2000001 points of $(0,\pi/2]$; Lemma 2 on 20000 random $a$ with 50 points each, 0 violations; the implication of Lemma 4 in the form $f(\lambda v)<f(v)-f((1+\mu)v)$ on 902471 random admissible $(v,\mu)$, 0 violations; Lemma 3 in residual form on 1200000 member-configurations, 0 violations when the two clockwise terms are evaluated through $f(\pi-x)=-f(x)$. A first evaluation of that last check formed $\pi$ minus a tiny half-gap in double precision and reported 1323 spurious violations near collisions; the cause was cancellation in the checker, not the lemma.

### Item 3. "The six tangential conditions alone force the hexagon"

Verdict: **confirmed**, by a rerun of lane A's instrument on the region where every gap is at least $0.01$, and by lane B's Lemma 5 (checked above) for the region nearer collisions.

The frozen instrument applies its tests in a fixed order (tangential, radial sign, radial difference), so the 21483 radial-difference leaves of Section 8 show only that the radial test fired first on those boxes, not that it was needed. The exclusion function was not changed. A thin driver, [weber-binding-sphere-ring-a-tangential-only.mjs](../evidence/weber-binding-sphere-ring-a-tangential-only.mjs), imports the frozen enclosures and certificate unchanged and applies only the tests "infeasible", "outside the reduced domain", "some $T_i$ enclosure excludes zero" and "inside the certified box"; root box, bisection rule and leaf record are those of the instrument. Its known cases were run first (04:08:21Z): from a root box of half-width $2\times10^{-9}$ around the hexagon with the uniqueness box off it retains the hexagon (75 undecided boxes), and for the four-member alternating word it leaves only the certified box around the square (1133 boxes, 8 inside the box, none undecided).

| Run (tangential conditions only) | Region | Boxes processed | Bisected | Infeasible | Outside reduced domain | Tangential | Inside $X$ | Undecided | Deepest | Wall seconds |
|---|---|---|---|---|---|---|---|---|---|---|
| `tonly-w1-d0.01`, word $+-+-+-$ | all gaps at least $0.01$ | 1478737 | 739368 | 77040 | 204857 | 457439 | 33 | 0 | 55 | 1.9 |
| `tonly-w1-d0.8`, word $+-+-+-$ | all gaps at least $0.8$ | 4107 | 2053 | 3 | 577 | 1441 | 33 | 0 | 39 | 0.02 |
| `tonly-w2-d0.01`, word $++-+--$ | all gaps at least $0.01$ | 175737 | 87868 | 19821 | 3300 | 64748 | 0 | 0 | 50 | 0.28 |
| `tonly-w3-d0.01`, word $+++---$ | all gaps at least $0.01$ | 1975 | 987 | 3 | 120 | 865 | 0 | 0 | 33 | 0.01 |

In every run 0 boxes remain undecided and none is pending. The uniqueness certificate of Section 6 already concerns $F=(T_0,\dots,T_4)$ only, so the tangential-only statement in $X$ needs nothing new. Scope of this confirmation: lane A's own collision lemma (Lemma C) uses the centre condition and so cannot carry a tangential-only statement below gap $0.05$; there the statement rests on lane B's Lemma 5 and Theorem 1. These four runs wrote no leaf list and were not rechecked with `mpmath.iv`; they are validated runs of the frozen enclosures under TA1 to TA4, on the stated regions.

### Comparison of the common results

| Result | Lane A | Lane B | Agreement |
|---|---|---|---|
| Words $++-+--$ and $+++---$ | no balanced ring; pencil, one tangential condition plus the centre condition; also validated on gaps at least $0.01$ | no critical point of $W$; pencil, tangential conditions only; also validated on half-gaps at least $0.01$ | agree; different proofs; lane B's statement is stronger |
| Alternating word | only the regular hexagon, $\Omega^2=5/4-1/\sqrt3$ | the same, and from the tangential conditions alone | agree; lane B's stronger form confirmed by lane A's rerun on gaps at least $0.01$ |
| Collision margin, alternating word | every gap above $0.05$ (uses the centre condition) | every gap above $0.8138$ (tangential only) | consistent; lane B's is sharper and was checked on paper and against lane A's leaves |
| Four members | only the alternating square, $\Omega^2=(2\sqrt2-1)/4$; margin $0.05$ | the same; margin $1.3434$ in gap units | agree |
| Uniqueness box, six members | half-width $0.025$ in gaps, norm bound $0.905$ | half-width $0.005$ in half-gaps, that is $0.010$ in gaps, bound $0.390$ | agree: lane B's box lies inside lane A's; lane A's bound at half-width $0.01$ is $0.370$ (KA2), the same size as lane B's for the same box with a different preconditioner |
| Uniqueness box, four members | half-width $0.05$ in gaps, norm bound $0.528$ | half-width $0.02$ in half-gaps, that is $0.04$ in gaps, bound $0.478$ | agree: nested boxes, bounds of the same size |
| Multi-start searches (measured) | hexagon only; square only | hexagon only; square only | agree |

Box counts of the two lanes are not comparable: the regions, the coordinates, the splitting rules and the enclosures (lane B adds a mean-value form) differ. No disagreement between the lanes was found, and no defect was located in lane B's pencil arguments. What this cross-review does not cover: lane B's scripts and receipts were not read, so its computation is assessed here only through its written method and through the consistency of its stated results with lane A's independent runs.

Evidence added by this cross-review: `weber-binding-sphere-ring-a-tangential-only.mjs` (tracked, SHA-256 `d7ed4efebeec720bb24bb8cd56114dd26d1beaa03c2fd5ae9f08324fe1540b5d`); result files under the local retention directory of Section 12 (not backed up): `tonly-w1-d0.01.result.json` `7cc34a07a509563a3b442fb994ad54b65dd781963a760f4a5baa3964719dfc6f`, `tonly-w1-d0.8.result.json` `bce9c7519d952b25614a69ff679246bafc0b4bfc59e4f1eef4a40d0e54bb0336`, `tonly-w2-d0.01.result.json` `0b71666f606cd510a3c558cdd27f6ebf5b4fbcdcce4b26139bff0c105930ae62`, `tonly-w3-d0.01.result.json` `97e30079c6f0d992d5787be82569ac56fb59077087fc5d99d09850342b08a453`, `tonly-known-hexagon.result.json` `e91375c86d3ad585a70e454219d0e9a71783d71ea67383763b3ccec8f9136f92`, `tonly-w4alt-d0.01.result.json` `60f500abe5ef8764d91d206b6bedac7caa61452985bf2ec0afe35c4e08b753d1`, `tonly-w4ppmm-d0.01.result.json` `28bf931b075389dbc2f3e62ae794e9b17639cfbb1dc21b0224b40e8acf0e0b29`. The frozen receipt and the hash table of Section 12 were not rebuilt and do not list these files. The leaf-data and lemma checks of Items 1 and 2 were run as inline `numpy` commands and have no retained script; their numbers are those reported here.

## 13. Run record (lane A, append-only, UTC, 2026-10-07)

- 03:29Z: shared clock start (set by the Principal Investigator). 03:31:20Z: lane A begins; read `AGENTS.md`, Section 12 of the preregistration and the long-running job policy.
- 03:38:32Z: instrument written. 03:38:54Z: probe of the instrument on known-case material only (own sine and cosine against the library, certificate norm by radius, trial four-member runs). One trial four-member run used an uncertified radius $0.1$ and is discarded.
- 03:39:54Z to 03:39:57Z: known cases KA0 to KA5, first pass, all pass. 03:39:54Z to 03:40:38Z: multi-start comparison search (44 s). Deviation: this short run was started with a shell background job rather than through the supervisor; it ended on its own and `pgrep` at 03:45:52Z showed no process.
- 03:40:17Z: first six-member target runs at $\delta=0.01$ through the supervisor, one process per word; all three complete within 2 s with no undecided box (counts as in Section 8).
- 03:41Z to 03:45Z: pencil work. The tree for $+++---$ closed almost entirely on the tangential condition of member 0, which led to Proposition 1; Lemma C and the four-member lemma followed from the identity (E$_i$).
- 03:45:38Z to 03:45:52Z: numerical cross-checks of the pencil statements, all pass.
- 03:46:11Z: supervised runs: alternating word without symmetry reduction (complete, 14682807 boxes, 40.6 s, none undecided) and exploratory runs at $\delta=0.001$. The $+++---$ run completed (7765 boxes). The runs for $+-+-+-$ and $++-+--$ were stopped by lane A at 03:48:29Z with `owned-compute-supervisor.mjs stop` after about 115 s ($4.49\times10^7$ and $4.83\times10^7$ boxes processed, no undecided box so far, tens of boxes pending); both process groups reported closed. They were exploratory and no claim rests on them.
- 03:48:59Z to 03:49:02Z: the instrument gained the option to write the leaf list; known cases repeated with the final script, all pass.
- 03:49:02Z to 03:49:41Z: final target runs through the supervisor with leaf lists (three words) and the repeat without symmetry reduction; counts identical to the first runs.
- 03:49:40Z to 03:50:26Z: leaf recheck written. Its first version used the plain natural interval extension and did not confirm 40 of 924 wide leaves for $+++---$. Cause: on wide arcs that cross $\pi$ the sine is not monotone and the natural extension is loose, and some boxes are exactly infeasible although the widened instrument records another condition. The checker was changed to end-point evaluation by the monotonicity facts and to recognise exact infeasibility; the instrument was not changed. This is a correction to the checker and is recorded as such.
- 03:50:38Z to 03:52:51Z: leaf rechecks (the two larger lists through the supervisor, heartbeat every 5 s): 924 of 924, 54263 of 54263 and 277704 of 277704 leaves confirmed; volume balance exact.
- 03:51:51Z: certificate recheck with `mpmath.iv`, pass (norm bound $0.90497$ at $r=0.025$).
- 03:54:44Z: receipt first built; `owned-compute-supervisor.mjs list --active` showed no lease of lane A.
- Housekeeping note: an attempt to delete the stale local files of the first runs was refused by the session's safety check and nothing was deleted; the directory therefore still holds the first runs' supervisor logs (`w?-d0.01.log`, `w?-d0.001.log`) and the two exploratory checkpoints beside the final files.
- 03:57:20Z: the chain of Lemma C and of the four-member lemma tested in residual form on random configurations (checks P7 and P8 added to the pencil-check script; all checks rerun, all pass). The constant $\alpha_2$ in Lemma C was rounded up from $2.1563$ to $2.157$ for a clean margin; no conclusion changes.
- 03:58:50Z to 03:59:03Z: tree replay added to the leaf recheck (partition of the root box in exact double arithmetic); the checker passed on the $+++---$ list and failed, as it must, on two deliberately corrupted copies under `.tmp/weber-binding-sphere/ring-a/` (one leaf removed: replay stops at leaf 100; one leaf relabelled: leaf 200 not confirmed).
- 04:01:53Z: four-member runs repeated with leaf lists (digests identical to the known-case runs) and rechecked: partition and all leaves confirmed.
- 04:02Z to 04:05Z: the recheck script gained the four-member symmetry table, so the three six-member rechecks were repeated with the final script through the supervisor (heartbeat every 5 s); results as reported in Section 8.
- 04:04:59Z: freeze. Final receipt built after all rechecks; `owned-compute-supervisor.mjs list --active` filtered to this owner task shows no lane A lease, and `pgrep -f ring-a` shows no lane A process. Elapsed since the shared clock start: about 36 minutes. Level reached as in the status line.
- 04:08Z: exposure announced by the Principal Investigator; lane B's document read at hash `528c3ad7…306e59c2` (scripts not read). 04:08:21Z: known cases of the tangential-only driver (hexagon retained, four-member square). 04:08:44Z to 04:08:47Z: tangential-only runs for the alternating word through the supervisor (gaps at least $0.01$ and at least $0.8$), complete, none undecided. 04:08:53Z to 04:10:37Z: inline checks of lane B's lemmas and of the frozen leaf data against lane B's margin. 04:10:21Z to 04:10:23Z: tangential-only runs for $++-+--$, $+++---$ and $++--$ through the supervisor, complete, none undecided.
- 04:11:50Z: cross-review section inserted above this run record; the frozen text is otherwise unchanged (a copy of the 04:05Z document is kept at `.tmp/weber-binding-sphere/ring-a/doc-frozen-0405.md`). No lane A lease active by `owned-compute-supervisor.mjs list --active` filtered to this owner task, and no lane A process by `pgrep -f ring-a`.
