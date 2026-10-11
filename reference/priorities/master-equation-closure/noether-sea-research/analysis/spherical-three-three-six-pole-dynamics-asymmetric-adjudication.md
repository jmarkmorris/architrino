# Independent verdict on the asymmetric six-pole comparison

**Derived verdict: accept the stated finite-interval conclusions.** The [reviewer asymmetric reference](spherical-three-three-six-pole-review-asymmetric-reference.md), SHA-256 `1022417d19808390a56664f2b12f155fafeff0df3e5f97c06fa066335e726150`, establishes a strict one-versus-five speed split throughout physical $0<T\le1/10$, ordinary complete roots and inward support. Its additional support derivatives and full-input symmetry boundary are accepted by the separate reconstructions below. No repair to that reference is required. Neither frozen reference is edited, and no later source reception or time-domain extension is accepted here.

The separate pre-exposure derivation is [dynamics reference](spherical-three-three-six-pole-dynamics-reference.md), SHA-256 `4e61538c7a9967c8acab220e1646cb26fe782eea359b6ef3a6b2332bcc30148e`. The configuration was frozen first as [exact fourth-pattern input](spherical-three-three-six-pole-dynamics-configuration.md), SHA-256 `18c7823ffe6dd9cadbe66b48d17e65f3e838b891a34495195b9a047b62ea3a8d`. Agreement is between separately derived analytical references, not executions of shared code. The canonical law, preparation and selected parameters remain shared premises.

## Input and actual-domain comparison

Both direction tables agree exactly: only $P_x$ has $(0,1,1)/\sqrt2$, while $E_x$ retains $(0,-1,1)/\sqrt2$. Each is unit tangent to its unchanged pole. Both use $\theta(s)=s(1+4s)^3/2$, $K=c_f=1,R=10$, initial speed one half and normal support only. Nonzero controls $\theta(-1/8)=-1/128$, $\theta'(-1/8)=-1/8$, and release derivative $1/2$ agree with direct differentiation. The invalid radial direction fails its dot-product test. No history or coefficient changes are hidden by the comparison.

The reviewer's scaled displacement estimate $3/500$ follows from speed below $3/5$ for scaled duration $1/100$. Thus distance to any other old pole exceeds $\sqrt2-3/500>697/500$. Candidate source time is below $1/100-697/500=-173/125$, with margin $567/500$ before the preparation seam $-1/4$. Whole-history sub-wake speed gives causal monotonicity, so each candidate is the unique partner root and cannot coexist with a missed moving-history root. The same-path chord inequality excludes positive-delay self roots. There are thirty directed partner roots, all with transmitter factor one and receiver factor greater than $2/5$.

Its dimensionless canonical field norm bound five and normal term bound $9/25$ give $|\mathbf y''|<43/50$ after the $K/R=1/10$ scaling. Speed stays within $43/5000$ of one half, closing the bootstrap strictly. This agrees with the independently proved stronger physical acceleration bound $33/500$ in my frozen reference. Both arguments establish actual smooth constrained continuation through physical $T=1/10$, rather than a prescribed path. My stronger support enclosure $-3/125<\lambda_i<-21/1000$ lies inside the reviewer's $(-12173/500000,-10327/500000)$ and independently confirms its inward-support statement. No support zero occurs on this interval.

## Independent reconstruction of support derivatives

At each receiver let $\mathbf n$ be its initial outward normal, let $\mathbf b$ be its cap unit tangent, and let $\mathbf d$ be its selected unit velocity direction. Put $c=\mathbf d\cdot\mathbf b$, equal to one for $P_x$ and zero for the other five. The separately reconstructed stationary signed field is

$$
\mathbf A=-\frac{\mathbf n}{4R^2}-\frac{\mathbf b}{R^2},\quad
\mathbf v=\frac{\mathbf d}{2},\quad
\mathbf a=-\frac{\mathbf n}{4R}-\frac{\mathbf b}{R^2}.
$$

Paired transverse source axes contribute only mixed normal/tangent Jacobian entries. The antipodal term contributes the remaining diagonal entries, giving

$$
J=D\mathbf A=\frac1{4R^3}\mathbf n\mathbf n^{\mathsf T}
-\frac1{8R^3}(I-\mathbf n\mathbf n^{\mathsf T})
+\frac3{2R^3}(\mathbf n\mathbf b^{\mathsf T}+\mathbf b\mathbf n^{\mathsf T}).
$$

For $\lambda=-|\mathbf v|^2/R-\mathbf n\cdot\mathbf A$ and $\mathbf n'=\mathbf v/R$,

$$
\lambda'=-3\mathbf v\cdot\mathbf A/R-\mathbf n\cdot J\mathbf v
=3c/(4R^3).
$$

Thus the initial support derivatives are $3/4000$ for $P_x$ and zero otherwise. To check the second derivative without reusing the peer result, write $H=D^2\mathbf A$. At the pole the transverse signed pairs cancel in $\mathbf n\cdot H[\mathbf v,\mathbf v]$; the opposite source gives $3/(64R^4)$. The required contractions are

$$
\mathbf a\cdot\mathbf A=1/R^4+1/(16R^3),\quad
\mathbf v\cdot J\mathbf v=-1/(32R^3),\quad
\mathbf n\cdot J\mathbf a=-3/(2R^5)-1/(16R^4).
$$

Differentiating the preceding expression for $\lambda'$ gives

$$
\lambda''=-\frac3R(\mathbf a\cdot\mathbf A+\mathbf v\cdot J\mathbf v)
-\frac1R\mathbf v\cdot J\mathbf v
-\mathbf n\cdot H[\mathbf v,\mathbf v]-\mathbf n\cdot J\mathbf a
=-\frac3{2R^5}-\frac3{64R^4}=-\frac{63}{3200000}.
$$

This is independent of the chosen tangent direction. Therefore the support difference is $3T/4000+O(T^3)$ locally. The peer correctly limits this to an initial difference and does not claim its sign over the full interval. The scalar speed derivatives were already obtained in my frozen reference: the cap member has $u'=-1/100$, $u''=1/16000$, and the other five have $u'=0$, $u''=21/80000$. Their difference is $-T/100-T^2/10000+O(T^3)$, consistent with the peer.

## Stronger uniform speed split

The peer's extension from initial coefficients to a uniform speed ordering has a valid explicit remainder argument. All physical source distances exceed ten, so $|\mathbf A|<1/20$, $\|J\|<1/100$, and $2/5<u<3/5$. For unit velocity $\widehat{\mathbf v}$ and tangent canonical acceleration $\mathbf B$, direct differentiation gives

$$
\widehat{\mathbf v}'=(I-\widehat{\mathbf v}\widehat{\mathbf v}^{\mathsf T})\mathbf B/u-u\mathbf n/10.
$$

The normal term is essential and has not been dropped. The norm bound is $1/8+3/50=37/200$. Since the field is actually static throughout the admitted root domain,

$$
|u''|\le |\widehat{\mathbf v}'|\,|\mathbf A|+\|J\|\,u
<37/4000+3/500=61/4000.
$$

For a cap-minus-unchanged speed difference $D$, this gives $|D''|<61/2000$, with $D(0)=0,D'(0)=-1/100$. Twice integrating proves

$$
-T/100-61T^2/4000<D(T)<-T/100+61T^2/4000<0
\quad(0<T\le1/10).
$$

The last inequality has coefficient margin $1/100-61/40000=339/40000>0$. The same derivative bound gives $u_{P_x}'<-1/100+61T/4000<0$, so the changed member keeps slowing throughout the interval. This argument does not assert that each of the other five speeds is monotone throughout; their positive second derivative at release is a local statement. The stronger speed ordering is therefore accepted independently of any uncontrolled Taylor remainder.

## Full-input symmetry versus fixed-source conjugacy

The unique initial speed derivative at $P_x$ precludes a transitive full-history symmetry. More precisely, an orthogonal permutation of the signed poles with optional global polarity reversal that preserves the whole input must fix this uniquely distinguished label. It cannot reverse all polarities while fixing a positive label. Its remaining spatial action is a coordinate permutation fixing x, leaving only the possible y/z exchange. That exchange reverses the required common-rotation direction at the mapped positive-y/positive-z label and fails the history test. Identity is the only member of this stated natural orthogonal pole/label symmetry class. This is not a claim about every conceivable abstract transformation.

The equality of the other five scalar histories has a different, valid reason. With all roots stationary, their actual omitted-self fields depend only on their own receiver states and the same old signed poles. Cyclic coordinate permutations and inversion with polarity exchange conjugate the common-rotation receiver equations and initial data. Ordinary uniqueness therefore makes the five speed and support histories equal, even though those transformations are not symmetries of the entire fourth-pattern moving history. The cap receiver likewise follows its cap initial-value problem over this interval. Once moving preparation is received, this decoupling requires fresh proof and is not inferred here.

## Controls, receipt and remaining dependency

The separate Jacobian/Hessian reconstruction, exact nonzero history controls, invalid radial-direction control, stationary transmitter limit and self-root exclusion are analytical controls. No numerical instrument, solver, job, lease or extra agent is used. Claims are derived, not measured trajectories or machine interval certificates. Falsifiers are a wrong history coefficient, missing root, invalid source margin, incorrect normal term in unit-velocity differentiation, wrong signed Jacobian/Hessian contraction, failed rational comparison or an invalid conjugacy after nonstationary histories arrive. Later history, support differences beyond initial order and any longer-time motion remain outside this verdict.

Dispatch `2cfb8120-f03c-4ad7-aa3a-83fcf9e8df91` was admitted untruncated at 2026-10-10 22:41:30 UTC, with verified 2780-byte payload and four source identities; provider transport remained separately unverified. The retained bundle is `.local-data/agent-dispatch/six-pole-dynamics-asymmetric-adjudicate-20261010-2242` at repository root. Only this new dynamics adjudication is authored. Every frozen subject, configuration and reference is preserved. Cost/replay effort is unprofiled and local capture does not prove backup recoverability. No new capability claim or global-idleness statement is made. Coordinator integration is the next dependency; no successor or domain extension is selected. Exploration cutoff remains 23:26:02 UTC and hard closeout 23:41:02 UTC.

Measured closing receipt: `shasum -a 256` after authoring matched all four admitted baseline identities. Scoped `git diff --no-index --check /dev/null` on this companion emitted no whitespace diagnostics, with status one for the new-file difference. No renderer was run. All issued commands returned. This saved verdict is the meaningful checkpoint and completed bounded adjudication; identity/hygiene checks remain separate from the mathematical derivations above.
