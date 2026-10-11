# Independent adjudication of asymmetric six-pole dynamics

**Derived verdict: accepted on physical $0\le T\le1/10$.** The frozen configuration matches the selected one-member direction change. The subject correctly proves actual local continuation, thirty stationary-source partner roots, no positive-delay self root, its sharper inward-support enclosure, the speed Taylor coefficients and equality of the five unchanged speed histories. No repair is required by this comparison. Later reception and later equality remain unresolved. The subject's initial Taylor splitting and the independently frozen reference's explicit full-short-interval splitting bound are separate evidence statements.

## Frozen identities and independence

The [exact configuration](spherical-three-three-six-pole-dynamics-configuration.md) is 2638 bytes, SHA-256 `18c7823ffe6dd9cadbe66b48d17e65f3e838b891a34495195b9a047b62ea3a8d`. The [dynamics reference](spherical-three-three-six-pole-dynamics-reference.md) is 11833 bytes, SHA-256 `4e61538c7a9967c8acab220e1646cb26fe782eea359b6ef3a6b2332bcc30148e`. The separately frozen [review asymmetric reference](spherical-three-three-six-pole-review-asymmetric-reference.md) is 11238 bytes, SHA-256 `1022417d19808390a56664f2b12f155fafeff0df3e5f97c06fa066335e726150`. The [plan](spherical-three-three-six-pole-plan.md) hash is `b66ecf15b903624c2007228f8613df59f52d40ae83378c6beee1c269da4b8b43`. `shasum -a 256` matched all four before this comparison. Both asymmetric derivations were frozen before peer exposure; neither is altered here.

Dispatch `b97ad311-f14f-4455-952a-3fe3fdc61931` was admitted untruncated at 2026-10-10 22:41:34.401 UTC. Its 2795-byte payload SHA-256 is `19bb45a4d3121a6116b58663877d223e9a1853c91c02af2d8fe62761f5810015`; payload verification passed and provider transport verification remained false. No numerical comparison or shared implementation supplies the acceptance.

Only $P_x$ takes $(0,1,1)/\sqrt2$; $E_x$ retains $(0,-1,1)/\sqrt2$ and the other four directions match common rotation. Every direction has unit norm and zero pole-axis component. The complete scalar preparation is still $\theta=s(1+4s)^3/2$, with $\theta'(0)=1/2$ and $\theta(-1/8)=-1/128,\theta'(-1/8)=-1/8$. These agree with the independently frozen nonzero controls. The selected law remains $K=c_f=1,R=10$, normal support only, canonical transmitter weighting and all roots.

## Actual continuation and full-past roots

Reconstruct the physical-time bootstrap: speed below $3/5$ through $T\le1/10$ bounds each displacement by $3/50$. The nearest other old pole is farther than $10\sqrt2-3/50>139/10$. Therefore the stationary candidate emission is below $-69/5$, well before the preparation seam at $-5/2$. Complete-history speed below $3/5$ makes the causal residual strictly monotone on the entire past, so these candidates are the unique partner roots. The same global speed bound excludes every positive-delay self root by path length. This identifies thirty roots with transmitter factors one and receiver factors greater than $2/5$, rather than merely counting selected stationary candidates.

The canonical field is the exact five-old-pole field with the receiver's own pole omitted. Its norm is below $5/169<3/100$. The actual constrained acceleration has tangent part given by the projected canonical field and normal part $-u^2\mathbf n/10$, hence magnitude below $33/500$. Integrating gives $|u-1/2|<33/5000$, strictly inside the bootstrap. Current distinct-member separation exceeds $10\sqrt2-3/25>69/5$. Smoothness away from the old poles and tangency preservation close actual continuation through the endpoint. This proof is independent of any assumption that the current arrangement stays an octahedron.

The source margin also proves that no preparation has arrived on this interval. It is why receiver equations reduce to independent fixed-source equations; it is not a general permission to ignore the chosen recent histories.

## Speed coefficients and equality scope

The signed antipodal/transverse decomposition independently retained in the review reference gives

$$
\mathbf A_0=-\mathbf n/(4R^2)-\mathbf b/R^2,\qquad
\mathbf a_0=-\mathbf b/R^2-u^2\mathbf n/R,
$$

and for tangent $\mathbf v$ with $u=1/2$,

$$
\mathbf v^T(D\mathbf A)\mathbf v=-1/(32R^3),\qquad
\mathbf a_0\cdot\mathbf A_0=1/R^4+1/(16R^3).
$$

For $W=u^2$, differentiation therefore gives

$$
W''(0)=2/R^4+1/(16R^3)=21/80000.
$$

At $u=1/2$, $W'=u'$ and $u''=W''-2(W')^2$. The changed member has $W'=-1/100$, while the other five have $W'=0$. Thus $u_{P_x}''=1/16000$, and the other second derivatives are $21/80000$. These reconstruct the subject's two Taylor expansions and agree with the separately derived norm-based calculation; the squared-speed conversion introduces no missing factor of two.

The initial split is $u_{P_x}-u_j=-T/100-T^2/10000+O(T^3)$. The subject uses this as a local initial statement. Separately, the frozen independent reference derived $|u''|<61/4000$ on the admitted interval and the explicit negative bound

$$
u_{P_x}-u_j<-T/100+61T^2/4000<0\quad(0<T\le1/10).
$$

That stronger retained theorem is not inferred from the subject's Taylor remainder or from comparison agreement. Its independent adjudication is separately owned.

The whole input has no transitive history symmetry: the release speed derivative already singles out $P_x$. The subject correctly uses a narrower conjugacy argument for the five unchanged members. Their independent stationary-source receiver equations and initial data are related by cyclic permutations and inversion/global polarity exchange, even though these transformations do not preserve the complete asymmetric moving assembly. Uniqueness makes the five speed histories equal only on the admitted static-source domain.

The x-pair summed velocity is $(0,0,1/\sqrt2)$, so antipodal pairing immediately fails there. The y and z pairs retain inverse initial states and conjugate static receiver equations; they remain antipodal on this interval. These statements are mutually consistent and imply no later full-state symmetry.

## Sharper inward-support enclosure

The subject's sharper support enclosure is reconstructed independently. Along each segment from its initial pole to its current position, every old-source distance exceeds 13. The sum of kernel derivative norms is below $10/2197<1/200$. With displacement below $3/50$,

$$
|\mathbf A-\mathbf A_0|<3/10000.
$$

The radial unit vector changes by less than $3/500$, while $|\mathbf A_0|=\sqrt{17}/400<11/1000$. Hence

$$
|\mathbf n\cdot\mathbf A+1/400|
<3/10000+33/500000=183/500000<1/2500.
$$

Thus $-29/10000<\mathbf n\cdot\mathbf A<-21/10000$. The speed estimate implies $49/100<u<51/100$. The selected support formula yields

$$
\lambda>-(51/100)^2/10+21/10000=-2391/100000>-3/125,
$$
$$
\lambda<-(49/100)^2/10+29/10000=-2111/100000<-21/1000.
$$

These strict inequalities prove the subject's $-3/125<\lambda_i<-21/1000<0$ for every member on the entire physical interval. There is no support zero. Initial equal support does not imply later equal support between the changed member and the other five, and the subject does not make that claim. The result identifies required constrained acceleration, not a physical provider.

## Controls, falsifiers and limits

This acceptance uses separately frozen geometry/kernel reasoning, direct physical-unit continuation inequalities and explicit arithmetic. Analytical controls include unit tangent versus rejected radial direction, exact nonzero preparation values, the stationary transmitter limit, the antipodal signed term, the self-root path-length contradiction and the independent squared-speed/norm derivative conversion. No new instrument, numerical evolution, scientific job, process lease or extra agent was used. No machine interval certificate or measured trajectory is claimed.

Falsifiers are a wrong direction or preparation coefficient, unavailable stationary emission, omitted root, an incorrect omitted-self kernel, failure of a strict speed/separation margin, a missing normal term in the derivative calculation, wrong time/radius scaling, a failed support endpoint inequality or a claim of full-history transitivity based only on pole geometry. No later reception, stability spectrum, energy relation, recurrence or all-time motion is accepted.

The subject's EOM capability paragraph is attributed to its stated direct source reads; this mathematical review does not independently audit that code or enlarge its scope. Resource costs remain unprofiled and local retention does not prove recoverability. Only this review companion and authorized bundle diagnostics are written; all frozen inputs remain unchanged. Issued commands are terminal, without a global-idleness assertion. Root owns integration and any next selected task. No successor or time-domain extension is selected. Exploration cutoff remains 23:26:02 UTC and hard closeout 23:41:02 UTC October 10.
