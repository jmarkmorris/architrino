# Independent adjudication of the six-pole symmetry reference

**Derived verdict: accepted within its finite analytical scope.** The frozen subject correctly establishes actual constrained motion on physical $0\le T\le1$, complete stationary-source roots, all six equal speeds and supports within each pattern, identical scalar histories for patterns 1 and 3 on that interval, the stated release speed derivatives, and the first two support derivatives. Its whole-interval support enclosure remains strictly inward. No correction is required by this review. The Taylor signs remain local and do not establish unit-interval speed monotonicity, later preparation reception or all-time behavior.

## Frozen inputs, admission and independence

The subject is [six-pole symmetry reference](spherical-three-three-six-pole-symmetry-reference.md), 15300 bytes, SHA-256 `4c47cadeda75a340eb2af03c0d1854bcf3c99a01ce4a213cc6ac78d3f7d57a00`. The independently frozen [review reference](spherical-three-three-six-pole-review-reference.md) is 13977 bytes, SHA-256 `acb318946111155fc84c1c1d6f0388e026aa2fac11a9694f3e70234e0f775567`. The [plan](spherical-three-three-six-pole-plan.md) is 9208 bytes, SHA-256 `b66ecf15b903624c2007228f8613df59f52d40ae83378c6beee1c269da4b8b43`. `shasum -a 256` matched all three before comparison. Both derivations were frozen before peer exposure; neither is modified here.

Dispatch `bfef2ce5-d2b8-4d67-adc6-be3e79cb0953` was admitted untruncated at 2026-10-10 22:32:49.651 UTC. Its 2701-byte payload hash is `97912616829ad99c75287a8161c78dd58e15846d467764d27dfdc2f3c3d9e9c4`; payload verification passed and provider transport verification remained false. This comparison uses the same selected $K=c_f=1,R=10$, initial speed $1/2$, exact great-circle preparation and normal constraint only. No future path, tangent control or alternate equation is introduced.

The earlier reference independently derived the release field, Jacobian, both rotational speed derivatives, transitive broken-pattern history symmetry, and a shorter physical $T=1/10$ interval. The subject's longer interval, cap second speed derivative and support derivatives are reconstructed below, rather than accepted merely from shared initial values.

## Full physical unit interval

Bootstrap actual speed below $3/5$ for $0\le T\le1$. Every receiver moves less than $3/5$ from its own pole. Every other old source pole is therefore farther than $10\sqrt2-3/5>13$. The candidate root $S=T-r$ obeys $S<-12<-5/2$, so it lies in the exact stationary past. The complete preparation has speed at most $1/2$, and the released bootstrap segments have speed below $3/5$. The full-past causal residual is strictly monotone. It identifies the stationary candidate as the unique root for each partner and excludes all alternative preparation or positive-time roots. A self root contradicts strict path length. The result is thirty directed roots, transmitter weights exactly one, receiver factors above $2/5$, delay greater than 13, and preparation margin greater than $19/2$ in physical time.

The static omitted-self canonical field is consequently exact on this interval. Its norm is below $5/169<3/100$. Normal support has zero tangential speed contribution, so $|dv/dT|<3/100$ while speed is positive. Integration from $v(0)=1/2$ gives $47/100<v<53/100$. In particular no zero-speed endpoint can arise; the estimate can equivalently be applied up to its first hypothetical zero. This improves the upper bootstrap strictly. Current pair distances remain above $10\sqrt2-6/5>12$, and the constrained vector field is smooth away from the five old poles. Local existence and continuation therefore prove the entire physical unit interval. No recent-history approximation or extra solver is involved.

This longer proof is independent of the shorter reference's endpoint. It uses only the same canonical field, explicit stationary root times, geometric separation and differential inequalities.

## History symmetry and cross-pattern scalar identity

The full histories have the form $R(\mathbf n_i\cos\theta+\mathbf d_i\sin\theta)$. A permitted spatial map must carry both vectors and all polarity products to their target data. Cyclic permutation plus inversion supplies a transitive action for common rotation and cap motion, with a global polarity reversal under inversion. For the broken pattern inversion alone fails, as the independently frozen reference already showed.

Let $Q$ exchange two axes. Since $\det Q=-1$ and $Q\mathbf w=\mathbf w$, its action on a positive rotation direction is $Q(\mathbf w\times\mathbf e_a)=-\mathbf w\times Q\mathbf e_a$. The map $-Q$ therefore sends a positive pole to a negative pole with exactly the copied broken direction, and sends negative back to positive. Combined with the cyclic permutation, it acts transitively on six full histories. The global polarity reversal preserves the canonical products. Uniqueness preserves these symmetries on the admitted interval, proving all six equal speed norms and signed supports in each pattern. The broken pair departs from antipodality immediately because its summed initial velocity is the nonzero vector $\mathbf d_a$.

Patterns 1 and 3 have identical positive-member initial positions and velocities, and identical static omitted-self fields on the unit interval. Their positive trajectories coincide by uniqueness. The transitive symmetry in each pattern makes all member speed and support histories identical across the two patterns there. Their recent supplied histories differ; neither this argument nor the scalar agreement licenses equality once those different preparations arrive.

## Independent release derivative calculation

Use a positive pole and an orthonormal tangent basis $\mathbf b,\mathbf c$, where $\mathbf b$ points toward the diagonal cap and $\mathbf c$ is the common-rotation direction. The antipodal signed kernel and the two transverse signed pairs give

$$
\mathbf A_0=-\mathbf n/(4R^2)-\mathbf b/R^2,\qquad
\mathbf B=-\mathbf b/R^2,\qquad A_n=-1/(4R^2),
$$
$$
D\mathbf A=R^{-3}\left[-I/8+3\mathbf n\mathbf n^T/8+\tfrac32(\mathbf n\mathbf b^T+\mathbf b\mathbf n^T)\right].
$$

For any tangent velocity $\mathbf v$ with $v^2=1/4$, $\mathbf v\cdot D\mathbf A\mathbf v=-v^2/(8R^3)$. The actual acceleration is $\mathbf a=\mathbf B-v^2\mathbf n/R$. Differentiating the norm, retaining this normal term, yields

$$
v'=\frac{\mathbf v\cdot\mathbf B}{v},\qquad
vv''+(v')^2=|\mathbf B|^2+\mathbf v\cdot D\mathbf A\mathbf v-A_n v^2/R
=1/R^4+v^2/(8R^3).
$$

For rotational directions $v'=0$, and therefore $v''=2/R^4+1/(16R^3)=21/80000$. For cap motion $v'=-1/R^2$, and subtracting $(v')^2=1/R^4$ gives $v''=1/(16R^3)=1/16000$. These are physical-time right derivatives of the actual solution. They confirm both speed expansions in the subject, including the additional cap quadratic coefficient $1/32000$.

The release support is $\lambda_0=-1/(4R)+1/(4R^2)=-9/400$. Differentiation gives

$$
\lambda'=-3\mathbf v\cdot\mathbf B/R-\mathbf n\cdot D\mathbf A\mathbf v
=\frac{3}{2R^3}\mathbf v\cdot\mathbf b.
$$

Hence it is zero for both rotational directions and $3/(4R^3)=3/4000$ for cap motion. This also verifies the sign convention: the cap initially makes negative support less inward.

## Independently reconstructed support Hessian

To check the additional second support derivative, start with the individual kernel $f(\mathbf r)=\mathbf r/|\mathbf r|^3$. For tangent $\mathbf v$ at the receiver pole,

$$
\mathbf n\cdot D^2f(\mathbf r)[\mathbf v,\mathbf v]
=-\frac{3(\mathbf n\cdot\mathbf r)v^2}{|\mathbf r|^5}
+\frac{15(\mathbf n\cdot\mathbf r)(\mathbf r\cdot\mathbf v)^2}{|\mathbf r|^7},
$$

because $\mathbf n\cdot\mathbf v=0$. A transverse signed pair has equal $|\mathbf r|$, equal $\mathbf n\cdot\mathbf r$, and opposite $\mathbf r\cdot\mathbf v$; the squares agree and its two radial Hessian contributions cancel. For the opposite-polarity antipodal source $\mathbf r=2R\mathbf n$, the second term vanishes and the sign reversal makes the first positive. Thus

$$
\mathbf n\cdot D^2\mathbf A[\mathbf v,\mathbf v]=3v^2/(16R^4).
$$

This cancellation holds for every tangent direction, including cap motion. The remaining terms follow independently from the displayed field and Jacobian:

$$
\mathbf n\cdot D\mathbf A\mathbf a=-3/(2R^5)-v^2/(4R^4),
$$
$$
\mathbf n''\cdot\mathbf A=1/R^5+v^2/(4R^4),\qquad
2\mathbf n'\cdot D\mathbf A\mathbf v=-v^2/(4R^4).
$$

Adding all four terms gives

$$
(\mathbf n\cdot\mathbf A)''=-1/(2R^5)-v^2/(16R^4).
$$

Combining this with the independently derived $vv''+(v')^2$ yields

$$
\lambda''=-\frac2R[1/R^4+v^2/(8R^3)]+\frac1{2R^5}+\frac{v^2}{16R^4}
=-\frac3{2R^5}-\frac{3v^2}{16R^4}=-63/3200000.
$$

It is the same for all three patterns. The common and broken patterns therefore first make support more inward at second order, with coefficient $-63/6400000$. The cap has the positive first-order coefficient and that same second-order coefficient. The local Taylor sign conclusions are valid because the reduced actual vector field is smooth; no bound on the remainder is asserted over the full unit interval.

## Whole-interval support and grade limits

The static kernel derivative has operator norm $2/r^3$ per source, so along the straight segment from the original pole to the current receiver, $\|D\mathbf A\|<10/2197<1/200$. Thus $|\mathbf A-\mathbf A_0|<3/1000$. With $|\mathbf n-\mathbf n_0|<3/50$ and $|\mathbf A_0|=\sqrt{17}/(4R^2)<11/1000$,

$$
|\mathbf n\cdot\mathbf A-A_n(0)|<3/1000+33/50000,
$$

and $|\mathbf n\cdot\mathbf A|<31/5000$. The speed bounds then give

$$
-3429/100000<\lambda<-1589/100000,
$$

which imply the subject's widened $-7/200<\lambda<-3/200<0$ throughout physical $0\le T\le1$. Therefore no support zero occurs on this admitted interval. This interval result is separate from, and stronger in duration than, continuity or the Taylor expansion alone.

All accepted statements are analytical derivations. They do not establish a physical source of normal support, rigid rotation, an equilibrium, a stability spectrum, energy mapping, recurrence, surface coverage, later preparation reception or all-time motion. Equal speeds do not mean constant speed. No claim about hexagon support is altered by this six-pole verdict.

## Controls, preservation and next dependency

The frozen independent reference supplied unit-tangent and invalid-radial controls, exact preparation coefficient checks at release and a nonzero preparation time, the stationary signed-pair sum, and the self-root path-length exclusion. The additional Hessian check here uses cancellation of a signed transverse pair and the separately known antipodal kernel as analytical controls. No new instrument or target computation was run; the exact calculations are displayed rather than described as machine interval certificates. No new scientific job, process lease or extra agent is launched.

Falsifiers are a failed old-pole source-time margin, a missing root, incorrect omitted-self field, a failed strict speed bootstrap, a history direction not preserved by the proposed symmetry, a missing normal term in the speed derivatives, an uncancelled transverse radial Hessian term, wrong physical-time scaling, or an inward-support endpoint failing its displayed inequality. The inspected subject and reference remain frozen. This report requires no repair companion. Root owns integration and any later selected comparison; no successor is self-selected.

Only this new review companion and authorized bundle diagnostics are written. Issued commands are terminal, without a global-idleness assertion. Costs remain unprofiled and local preservation is not recoverability verification. No EOM capability claim is needed or made. New exploration stops 23:26:02 UTC and hard closeout remains 23:41:02 UTC on October 10, 2026.
