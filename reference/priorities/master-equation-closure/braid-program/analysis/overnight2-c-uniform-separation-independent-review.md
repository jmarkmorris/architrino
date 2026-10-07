# Independent review of uniform subfield separation

## Scope, clock and known-first record

This review reconstructs [the uniform subfield separation proof](overnight2-c-uniform-subfield-separation.md) for three fixed neutral antipodal unit-polarity pairs, complete common-center circular histories, the unchanged logarithmic equation with $K_{\log}=c_f=1$, smallest radius one, strictly ordered radii bounded above by a fixed finite constant, and all admitted ordinary positive-delay roots. It does not modify the subject or infer a new response law at wake speed.

The session clock returned 2026-10-07 04:28:32 UTC at review startup. An `rg` read of the current plan and C report confirmed the unchanged scientific stop at 13:55:15 UTC and hard closeout at 15:25:15 UTC. These checks establish the current review's allocation boundary; they do not restart or extend it.

Before target constant arithmetic, `"${AAA_VENV:-../.venv}/bin/python" reference/priorities/master-equation-closure/braid-program/evidence/overnight2-c-uniform-separation-independent-check.py --stage known` passed the independently authored [checker](../evidence/overnight2-c-uniform-separation-independent-check.py) on $1/3+1/6=1/2$, $(3/5)^2+(4/5)^2=1$, and $1/7-1/5=-2/35$. Its source SHA-256 is `77b20ca5e3a8cefdf5fd289651a44c6f9dcec141fc2709d1b9fd37b4d0fcc589`; the receipt is `.local-data/master-equation-closure/overnight2-c/review-uniform-known.json`. This record was written before target use of that instrument. The checker imports no subject or earlier numerical implementation.

By `shasum -a 256`, the frozen mathematical subject's digest is `be6b646fa8f1fb59cec9bf557fc7afae8c705fd81c6ddf11febae6de02078a9d`. The algebraic reconstruction below checks its claims independently; exact arithmetic is limited to the constants and does not stand in for a proof of the inverse, response-segment or cluster statements.

## Verdict

**Derived and independently reconstructed:** the proof supports a uniform positive simultaneous separation in the declared bounded-radius strictly subfield exact circular class, without a fixed speed margin below wake speed. No defect or unresolved mathematical blocker was found in the new inverse estimate, its use along the full response segment, or either three-member polarity case. The conclusion is qualitative: it gives no value of the separation constant, no exact reference and no whole-domain numerical exclusion.

The finite-radius bound and the earlier fixed-speed-margin collision theorem are dependencies, not conclusions newly proved by this review. The [earlier collision adjudication](overnight2-c-collision-independent-review.md) supplies the latter. Its proof uses the constant-velocity collision kernel and does not use the present uniform inverse estimate, so the dependency is not circular. The current argument works for any fixed finite upper radius bound; applying the value thirty-five additionally uses the separately adjudicated outer-radius theorem.

## Regularity of rows outside a limiting cluster

For each original strictly subfield configuration, global source speed below one makes delay minus distance strictly increasing, so each distinct partner has exactly one positive root and each self channel has none. Distinct positions follow from strict ordering of the pair radii and their nonzero antipodal distances. The complete delay bound is $0<\tau\le r_i+r_j\le2R$ for a fixed finite radius bound $R$; no past-history tail is omitted.

Take a convergent parameter subsequence with all limiting speeds at most one. If a receiver and source have different limiting present positions, their delays stay above half their present distance and have positive limiting subsequences. Let $z$ be the limiting emission position, $n$ the unit limiting chord direction, and $\tau>0$ its limiting delay. Suppose the limiting source factor were zero. Equality in $n\cdot\omega Jz\le|\omega Jz|\le1$ would require source speed exactly one and $n$ parallel to its velocity. Thus $n\perp z$, and $x=z+\tau n$ gives $|x|^2=|z|^2+\tau^2>|z|^2$. This contradicts $u|z|=1$ and the limiting receiver-speed bound $u|x|\le1$. The case $u=0$ cannot produce a zero factor at all.

This argument applies to every convergent positive-delay subsequence, so compactness prevents the factor from tending to zero in a noncolliding row. Its delay is bounded below as well; therefore its unsigned acceleration norm stays bounded. No assumption about a generic fold is used. The conclusion concerns the actual rows in the subfield sequence and their ordinary noncolliding limits; it does not assume root continuity across an unexamined singularity.

If present source and receiver positions instead converge to the same point of radius $a$, a positive limiting delay would obey the circular self relation $\tau=2a|\sin(u\tau/2)|$. For $u>0$ and $\tau>0$, the strict inequality $|\sin t|<t$ gives $2a|\sin(u\tau/2)|<au\tau\le\tau$; at $u=0$ the chord vanishes. Both cases are impossible. Thus every internal delay tends to zero. Since $0<D\le2$, each internal unsigned row norm $1/(\tau D)$ diverges.

Grouping the finitely many labels by equal limiting present position is legitimate after extracting a common convergent subsequence of the bounded positions and angular rates. Every collision cluster has at most one member of each fixed antipodal pair, since its pair separation is at least two. A two-member cluster has one divergent internal row at either receiver and only bounded outside rows; the bounded required circular acceleration cannot balance it. A three-member cluster contains one member of every pair, so its antipodes form the other three-member cluster. All radii then tend to one because the radius-one pair participates. The earlier fixed-speed-margin theorem forces $u\to1$; otherwise a subsequence would retain a uniform margin and contradict that theorem. Consequently every receiver speed in either cluster tends to one.

## Exact inverse and its derivative

Fix one receiver position $x$ and positive angular rate $\omega$, and put $v=\omega Jx$, with $q=|v|<1$. Reflection permits this rotation convention. An actual emission point is $z=x-\tau n$. Its source factor satisfies the exact common-rotation identity

$$
D=1-n\cdot\omega Jz=1-n\cdot v,
$$

because $n\cdot Jn=0$. This rewrites the actual transmitter factor; it adds no receiver response to the law. For its unsigned row $k=n/(\tau D)$,

$$
n=\frac{k}{|k|},\qquad f(k)=|k|-v\cdot k=\frac1\tau,\qquad
Y(k)=R(\omega\tau)(x-\tau n).
$$

The last expression recovers the present source position. For every nonzero vector $k$, $f(k)\ge(1-q)|k|>0$, so these formulas define a smooth map even when its reconstructed source lies outside the original parameter domain. This extension is used only as a mathematical map along a segment. It need not provide a globally single-valued source-to-response law outside the original subfield domain, and the proof makes no such assumption.

Let $P=I-nn^{\mathsf T}$. At fixed $x,\omega,v$, differentiation gives

$$
d\tau=-\tau^2(n-v)^{\mathsf T}dk,\qquad dn=\frac{P}{|k|}dk=\tau DP\,dk.
$$

Differentiating the rotation and the chord separately then yields

$$
dY=R(\omega\tau)\bigl[(v-\omega\tau Jn-n)d\tau-\tau\,dn\bigr],
$$

$$
DY=\tau^2R(\omega\tau)\left[(n-v+\omega\tau Jn)(n-v)^{\mathsf T}-DP\right].
$$

This independently reproduces the proposed derivative, including its signs. The matrix has no division by $D$; a uniform relative estimate still requires the additional chord bound proved next.

## Uniform estimate at arbitrary intermediate responses

Assume $1/2\le\omega\le1$, $1/2\le q<1$ and $0<\tau\le1$. These conditions hold eventually at cluster receivers, and will be checked separately along each segment. Define the average receiver velocity over the delay by

$$
\bar v=\frac{x-R(-\omega\tau)x}{\tau},\qquad L=|n-\bar v|,\qquad d=|Y(k)-x|=\tau L.
$$

The last identity follows by rotating $Y-x$ backwards. Also $|\bar v|=q\operatorname{sinc}(\omega\tau/2)$. For $0\le s\le1/2$, the sine Taylor upper bound gives

$$
1-\operatorname{sinc}(s)\ge s^2\left(\frac16-\frac{s^2}{120}\right)
\ge\frac{79}{480}s^2\ge\frac{s^2}{7}.
$$

Therefore

$$
L\ge1-|\bar v|\ge(1-q)+\frac{q\omega^2\tau^2}{28}
\ge(1-q)+\frac{\tau^2}{224},\qquad d\ge\frac{\tau^3}{224}>0.
$$

This bound uses the fixed receiver's circular path only. It does not constrain the radius or speed of the reconstructed source. The receiver acceleration has norm $\omega q\le1$, so averaging its velocity change gives $|\bar v-v|\le\tau/2$. Thus $|n-v|^2\le2L^2+\tau^2/2$. From the exact identity $2D=|n-v|^2+1-q^2$, together with $L\le2$, $1-q\le L$ and $\tau^2\le224L$, it follows that

$$
D\le L^2+\frac{\tau^2}{4}+(1-q)\le(2+56+1)L=59L=\frac{59d}{\tau}.
$$

Since $|n-v|^2\le2D$, taking the Euclidean operator norm in the independently differentiated inverse gives

$$
\|DY\|\le\tau^2\left(|n-v|^2+\omega\tau|n-v|+D\right)
\le\tau^2(3D+\tau\sqrt{2D}).
$$

Substitution of $D\le59d/\tau$ gives $177\tau d+\sqrt{118}\,\tau^{5/2}\sqrt d$. The cubic lower bound on $d$ makes the second term at most $\sqrt{118\cdot224}\,\tau d<163\tau d$. Hence

$$
\boxed{\|DY(k)\|\le340\tau d(k).}
$$

All inequalities hold at every nonzero response vector satisfying the displayed receiver and delay conditions, including intermediate segment points. They do not merely compare endpoint responses or assume a uniform lower source factor.

## Bounded response difference and unrestricted distance scales

At one receiver let two actual internal unsigned rows satisfy $|k_2-k_1|\le M$, where $M$ is independent of the sequence, and let $\tau_1\to0$. Since $D_1\le2$, $|k_1|\ge1/(2\tau_1)\to\infty$. The whole segment $k(t)=k_1+t(k_2-k_1)$ avoids zero eventually. More directly, $f(k)=|k|-v\cdot k$ is globally $(1+q)$-Lipschitz and hence two-Lipschitz, so

$$
f(k(t))\ge\frac1{\tau_1}-2M\ge\frac1{2\tau_1}
$$

once $2M\tau_1\le1/2$. Thus its delay obeys $0<\tau(t)\le2\tau_1\le1$ eventually. The receiver data are fixed along this segment and already lie in the required ranges. Every point on the full segment therefore satisfies the uniform estimate.

With $d(t)=|Y(k(t))-x|>0$ and $C=680M\tau_1$, the chain rule gives both $|d'(t)|\le C d(t)$ and $|Y'(t)|\le C d(t)$. Grönwall's elementary differential inequality gives $d(t)\le d(0)e^{Ct}$; integrating the second bound gives

$$
|Y(k_2)-Y(k_1)|\le d(0)(e^C-1)=o(d(0)).
$$

In addition $|d(1)-d(0)|\le|Y(k_2)-Y(k_1)|$, so $d(1)/d(0)\to1$. The conclusion is relative to either source's distance from the receiver. It assumes no relation among three cluster distances in advance. Source positions on the interpolating response segment may leave the configuration domain; the preceding map estimate deliberately permits this.

## Both three-member polarity cases

For mixed polarity, take the two majority members $i,j$ and the minority member $k$. All outside rows are bounded by the closed-boundary lemma, and required circular accelerations are bounded. The exact equation at $i$ has internal part $k_{ij}-k_{ik}$, so this difference is bounded. The segment lemma implies $|x_j-x_k|=o(|x_i-x_j|)$. Applying the same argument at $j$ gives $|x_i-x_k|=o(|x_j-x_i|)$. The triangle inequality $|x_i-x_j|\le|x_i-x_k|+|x_k-x_j|$ is impossible for positive $|x_i-x_j|$. The argument works for arbitrary scale hierarchies and does not use reciprocity between two different receivers' delayed rows.

For equal polarity, choose the largest-radius member of the three-member cluster. Because the cluster contains one member of each pair, this is a global outer-radius receiver of radius $a$; its two internal source radii satisfy $b\le a$. Each internal polarity product is positive. At its causal root,

$$
k_r=\frac{a-b\cos\theta}{\tau^2D}
=\frac{a^2-b^2+\tau^2}{2a\tau^2D}\ge\frac1{2aD}>0.
$$

The complete internal radial sum is bounded by the bounded outside rows and required radial acceleration. Since its two summands are positive, each is bounded. With $a\le R$, the last inequality supplies a uniform positive lower bound on each internal $D$. Their full norms nevertheless diverge because $\tau\to0$ and $D\le2$. Consequently their radial chord components $n_r=k_r/|k|$ tend to zero.

The unit chord direction must approach a tangential direction. At this receiver $v=ua\,e_t$ and $ua\to1$, while $D=1-ua\,n_t$ stays bounded away from zero. The positive tangential direction would force $D\to0$ and is therefore impossible. Each internal direction tends to $-e_t$, and each tangential row tends to minus infinity. Their sum cannot be canceled by bounded outside rows or the zero required tangential acceleration. This argument covers either common polarity because their products are positive. It does not infer a source-factor floor for arbitrary internal rows before establishing radial positivity.

These exhaust the possible collision clusters. A hypothetical sequence of exact configurations with minimum separation tending to zero would have a two- or three-member limiting cluster after compact extraction, and each case has been contradicted. Therefore the exact class has a uniform positive minimum separation, or is empty. The theorem does not establish which alternative holds.

## Independent constants, limitations and falsifiers

After the recorded known controls, the same checker with `--stage target` returned `passed: true` and independently recomputed the sine-coefficient margin $73/3360$, cubic coefficient $1/224$, factor coefficient $59$, derivative coefficient $177$, radicand $26432$, strict square margin $163^2-26432=137$, final coefficient $340$ and segment coefficient $680$. Its receipt is `.local-data/master-equation-closure/overnight2-c/review-uniform-exact.json`. These are exact-arithmetic checks; the proof of their relevance is given above. No numerical root search, residual replay, trajectory evolution or large worker was used.

The review writes only its assigned report, independent constant checker and review-prefixed local receipts. No frozen subject, previous proof/review, main report or shared owner was edited. Local retention supplies no separate backup or demonstrated recovery claim.

The conclusion removes collision, including a simultaneous collision/wake-speed limit, from this bounded-radius strictly subfield exact class. It leaves equal-radius noncolliding limits, regular noncolliding wake-speed limits, quantitative separation estimates and existence/nonexistence on the remaining closure unresolved. It supplies no actual-time collision rule, superfield extension, stability spectrum or physical acceptance claim.

Falsifiers are a noncolliding closed-subfield limiting row with zero factor; a positive self delay at speed at most one; a failure of the independently differentiated inverse; an intermediate segment point violating the stated receiver/delay conditions or the relative estimate; a bounded pair of response differences violating the Grönwall conclusion; an unaccounted cluster polarity case; or an exact bounded-radius collision sequence. The uniform finite radius, three fixed antipodal pairs, unit polarity products, common circular rotation and unchanged logarithmic source weighting are load-bearing assumptions. Altering them requires a new proof.

The recommended parent disposition is to integrate the claim as an independently reconstructed qualitative uniform-separation theorem within these assumptions, preserving the uncomputed constant and remaining compact-closure questions.
