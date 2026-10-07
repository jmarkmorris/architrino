# Independent review of the collision and speed boundary

## Verdict and scope

**Derived and independently reconstructed:** the [collision boundary theorem](overnight2-c-collision-speed-boundary.md) is supported in its stated class. With a fixed finite radius bound and a fixed margin below wake speed, exact logarithmic circular configurations of three neutral antipodal unit-polarity pairs have a qualitative positive minimum simultaneous separation. Any sequence of exact configurations approaching collision must approach wake speed. Every closest collision cluster has the limiting outermost radius, and the same bounded-radius class has a qualitative positive lower angular-rate bound if it contains any exact configurations.

This adjudication rederives the causal kernel, closest-cluster limit and static scalar contradiction from the selected law. It does not use the earlier interval instruments, optimizer outputs, saved exclusions or numerical controls. The subject was read to identify the claimed proof, and the independent reconstruction below supplies the check; independence is not a claim of having been unaware of the proposed route. The Ramon E. Moore role supplies an analytical lens, not acceptance authority.

The source identity measured by `shasum -a 256` on `overnight2-c-collision-speed-boundary.md` is `5a25380ca532125e401f4232fad674ca55e84f468da434009aeebfe1912bb5b9`. Source comparison used `cat` and `nl -ba` on that file. The proof needs only a finite radius bound $R$; this review assumes $r_3\le R$ and does not re-adjudicate the separate theorem yielding $r_3<35$. All conclusions below are conditional on the exact selected circular histories and their equations, not existence assertions.

## Selected equations and complete causal coverage

Let $J$ denote a ninety-degree planar rotation. For six persistent labels, grouped into three antipodal pairs, write

$$
X_i(t)=e^{\omega Jt}x_i,\qquad |x_i|=r_i\in[1,R],\qquad u=|\omega|,\qquad u r_3<1.
$$

Here $r_3$ is the largest of the three pair radii; the smallest is normalized to one. The polarities of the two members of each pair are $+1$ and $-1$. Their complete histories are specified for every real time. For a receiver $i$ at time zero and a source $j$, the ordinary positive delay $\tau$ solves

$$
\tau=|x_i-X_j(-\tau)|,\qquad n=\frac{x_i-X_j(-\tau)}{\tau},\qquad D=1-n\cdot V_j(-\tau),\qquad A_{ij}=q_iq_j\frac{n}{\tau D}.
$$

This is the selected logarithmic law with $K_{\log}=c_f=1$ and unit polarity magnitudes. Since the source speed is strictly below one, $D>0$, agreeing with the absolute transmitter factor in the full law. An exact circular reference must satisfy $-\omega^2x_i=\sum_{j\ne i}A_{ij}$ at every receiver. Nothing below changes that equation or suppresses an admitted root.

For each distinct pair with simultaneous distance $d_{ij}>0$, the function $f(\tau)=\tau-|x_i-X_j(-\tau)|$ increases strictly by the global source Lipschitz bound. It starts at $-d_{ij}$ and is nonnegative at $|x_i|+|x_j|$. Thus it has exactly one positive root, which lies in the complete finite interval $0<\tau\le2R$. For the same label, $|x_i-X_i(-\tau)|\le u|x_i|\tau<\tau$ excludes every positive self root. There are exactly thirty directed partner channels and no positive self channel; this is a derived census for the complete histories, not a finite sampling claim.

If a source has speed at most $v_0<1$, triangle inequalities at the root give the useful two-sided estimate

$$
\frac{d_{ij}}{1+v_0}\le\tau_{ij}\le\frac{d_{ij}}{1-v_0}.
$$

Even without a uniform source margin, the pointwise strict subfield bound gives $\tau_{ij}\ge d_{ij}/2$. The stronger estimate is needed only for sources within the small cluster.

## Why distant sources remain controlled

The issue requiring care is a source outside the closest cluster whose speed tends to one. A source-speed factor alone would not give a uniform bound. Common circular rotation supplies a bound in terms of the receiver radius instead.

For receiver radius $a$, source radius $b$, and their emission-reception angular difference $\theta$, the root chord obeys $\tau^2=a^2+b^2-2ab\cos\theta$, and $|n\cdot V_j|=u ab|\sin\theta|/\tau$. If $a\le b$, the identity

$$
a^2\tau^2-a^2b^2\sin^2\theta=a^2(a-b\cos\theta)^2\ge0
$$

gives $ab|\sin\theta|/\tau\le a$; exchanging the radii gives the minimum-radius bound in the other case. Therefore

$$
D\ge1-u\min(a,b)\ge1-u a.
$$

For any receiver whose speed is at most $v_0<1$, every partner contribution consequently satisfies

$$
|A_{ij}|=\frac1{\tau_{ij}D_{ij}}\le\frac{2}{(1-v_0)d_{ij}}.
$$

The source may approach wake speed without invalidating this estimate. This is the uniformity needed for outside-cluster rows. It depends on the exact circular geometry and unchanged transmitter factor; it is not a general arbitrary-history estimate.

## Independent reconstruction of the limiting kernel

Take a nonzero present displacement $y\in\mathbb R^2$ and a common velocity $v$ with $|v|<1$. Set $s=1-|v|^2>0$, $\beta=v\cdot y$ and $\rho=\sqrt{\beta^2+s|y|^2}$. Solving the causal quadratic gives the unique positive delay

$$
\ell=|y+v\ell|,\qquad s\ell^2-2\beta\ell-|y|^2=0,\qquad \ell=\frac{\beta+\rho}{s}>0.
$$

The other quadratic root is negative because $\rho>|\beta|$. With $n=(y+v\ell)/\ell$, the source factor satisfies

$$
D_v=1-n\cdot v>0,\qquad \ell D_v=s\ell-\beta=\rho.
$$

Thus $K_v(y)=n/(\ell D_v)$ is finite and nonzero. Given a kernel value $k\ne0$, its positive amplitude implies $n=k/|k|$. Hence $\ell=1/(|k|(1-n\cdot v))$ and

$$
y=\ell(n-v)=\frac{n-v}{|k|(1-n\cdot v)}.
$$

This proves injectivity directly. It does not presume reciprocity: generally $K_v(-y)$ need not equal $-K_v(y)$. The proof uses equality of two kernel values only where the receiver equation actually requires it.

For a unit vector $e\perp v$, $e\cdot n=(e\cdot y)/\ell$, so

$$
e\cdot K_v(y)=\frac{e\cdot y}{\ell^2D_v}.
$$

The transverse sign agrees with the present displacement. If $y$ lies parallel to a nonzero $v$, direct one-dimensional substitution gives $K_v(y)=y/|y|^2$, so its direction agrees with $y$ on either side. At $v=0$ this last formula holds in every direction. These are analytic special-case checks of the derived expression, not results from a numerical instrument.

Consider now distinct points $z_1,\ldots,z_m$ with $m=2$ or $3$ and unit polarities. For $m=2$, each proposed balance contains one nonzero term and is impossible. For three mixed polarities, choose a receiver of the polarity occurring twice. Its two source coefficients are opposite and equal in magnitude. Zero acceleration would imply $K_v(z_i-z_j)=K_v(z_i-z_k)$, contradicting injectivity and distinct sources. The unit magnitudes are essential to this equality.

For three equal polarities, choose an extreme projection perpendicular to $v$. If those projections are not all equal, both projected contributions are nonnegative and at least one is positive. If all projections are equal, the points lie on a line parallel to $v$, and an extreme point receives two kernels pointing the same way. At $v=0$, choose any direction separating two of the distinct points. These alternatives exhaust every geometry and every polarity assignment for two or three members; no limiting balance exists.

## Closest-cluster selection and passage to the limit

Suppose exact configurations have minimum simultaneous distances $d_n\to0$. Their reception positions lie in a compact disk, and $|\omega_n|<1$ because the smallest radius is one. Pass to a subsequence on which all positions and angular rates converge and one fixed labeled pair realizes $d_n$. Choose one of those labels as the anchor. For each other label, pass through finitely many further subsequences so that its anchor distance divided by $d_n$ either converges to a finite number or tends to infinity. The finite-ratio labels form the closest cluster $C$.

For each $i\in C$, the scaled coordinate $z_{i,n}=(x_{i,n}-x_{\mathrm{anchor},n})/d_n$ is bounded. Extract a common subsequence for all its vector limits. Distinct cluster labels remain separated by at least one in this scale since $d_n$ was the global minimum; no labels coalesce during this second limit. Each original antipodal pair is separated by $2r_a\ge2$, so $C$ contains at most one member from each pair. Its fixed closest pair ensures $2\le|C|\le3$.

Every cluster member has the same limiting position $x_*$ and velocity $v_*=\omega_*Jx_*$. Assume $|v_*|<1$. A single number $v_0<1$ bounds every cluster member's speed for sufficiently large $n$, at all times, because circular speeds are constant. For an internal row, $d_{ij,n}/d_n$ has a finite positive limit, and the two-sided causal estimate above bounds $\tau_{ij,n}/d_n$ above and away from zero. In particular $\tau_{ij,n}=O(d_n)$.

The circular acceleration is uniformly bounded: $u_n^2r_i\le u_n^2r_3<u_n\le1$. Taylor's theorem therefore supplies the explicit uniform remainder bound

$$
X_{j,n}(-\tau)=x_{j,n}-\tau V_{j,n}(0)+R_{j,n}(\tau),\qquad |R_{j,n}(\tau)|\le\frac12\tau^2.
$$

After division by $d_n$, the remainder tends to zero. Every subsequential delay limit $\ell$ solves the unique constant-velocity causal equation for $y=z_i-z_j$ and $v=v_*$. Uniqueness makes all internal delay subsequences agree. Also $V_{j,n}(-\tau_{ij,n})-V_{j,n}(0)=O(\tau_{ij,n})\to0$, and $D_{ij,n}$ tends to the positive $D_{v_*}$. Thus the actual circular rows obey

$$
d_n A_{ij,n}\longrightarrow q_iq_jK_{v_*}(z_i-z_j),\qquad i,j\in C,\ i\ne j.
$$

For $j\notin C$, the anchor distance divided by $d_n$ tends to infinity; subtracting a bounded cluster-anchor distance proves $d_{ij,n}/d_n\to\infty$ for every cluster receiver. The receiver-speed estimate, uniform despite an outside source's possibly vanishing speed margin, then gives $d_n|A_{ij,n}|\to0$. There are only finitely many outside sources. The left side of each exact circular equation is uniformly bounded and also vanishes after multiplication by $d_n$.

The limiting equations are therefore exactly the impossible two- or three-member equations above. This contradiction establishes that a convergent closest cluster cannot have speed less than one. All original speeds are below one, so its limiting speed must equal one.

## Consequences and their exact limits

For any fixed $\epsilon>0$, failure of a positive minimum separation among exact configurations satisfying $u r_3\le1-\epsilon$ would produce a sequence to which the contradiction applies. This proves existence of a separation constant $d_\epsilon>0$ for the fixed radius bound $R$. Its value has not been estimated. If a general exact collision sequence failed to satisfy $u_nr_{3,n}\to1$, it would have a subsequence with some fixed positive speed margin, again impossible.

The stronger receiver-based argument also fixes the location of a closest collision cluster. On a convergent subsequence it yields $u_*|x_*|=1$. Since $|x_*|\le r_{3,*}$ and $u_*r_{3,*}\le1$, necessarily $|x_*|=r_{3,*}$ and $u_*r_{3,*}=1$. In particular $u_*>0$. This concerns the labels of a closest cluster at the smallest separation scale. It does not assert that every other member or every larger-scale approach must join that cluster.

Finally assume a sequence of exact configurations has $u_n\to0$. Bounded radii imply $u_nr_{3,n}\le1/2$ eventually, so the separation theorem gives a fixed positive separation. Passing to a compact subsequence retains six distinct limiting points. All delays remain at most $2R$; all source displacements over those delays tend uniformly to zero, all factors $D$ tend to one, and every partner row tends to its static logarithmic value. For that static value, pair the two directed terms of every unordered pair:

$$
q_iq_j\frac{x_i\cdot(x_i-x_j)+x_j\cdot(x_j-x_i)}{|x_i-x_j|^2}=q_iq_j.
$$

Summing gives $\sum_i x_i\cdot A_i=\sum_{i<j}q_iq_j=((\sum_iq_i)^2-\sum_iq_i^2)/2=-3$. The corresponding exact circular scalar is $-u_n^2\sum_i|x_{i,n}|^2\to0$, a contradiction. Hence the set of exact configurations, if nonempty, has positive infimum of $u$. This scalar pairing is used only in the static limit, where reciprocity is established by the explicit kernel; it is not imported into the moving kernel.

The theorem supplies necessary restrictions only. It gives no numerical separation constant, angular-rate constant, complete interval cover, exact configuration, stability statement, or continuation through collision or wake speed. The simultaneous collision/wake-speed boundary remains open. Equal-radius limits with distinct positions are not excluded. Unequal polarity magnitudes, more than three antipodal pairs, arbitrary histories, an unbounded radius class or altered source weights require separate analysis.

## Verification boundary and falsifiers

No defect requiring correction of the frozen subject was found by the independent algebra and source comparison above. No numerical search, Python command, interval replay, automatic proof checker or CPU-heavy worker was run. No source or previous review was changed; this new report is the only authored artifact. Its local repository retention does not imply a separate backup or verified recovery procedure.

The supported claim would fail if the receiver-radius floor were false, a positive causal root were omitted, the quadratic kernel had a second positive branch, its inverse were nonunique, a distinct two- or three-member unit-polarity balance existed, the closest cluster could contain both members of an antipodal pair despite the radius floor, the uniformly bounded acceleration did not control the Taylor remainder, or a scaled outside row survived despite its diverging scaled separation. The displayed identities locate each falsifier. An exact bounded-radius collision sequence retaining a positive subfield margin, or an exact bounded-radius sequence with angular rate tending to zero, would directly falsify the conclusions.

The parent should integrate these results as independently reconstructed analytic necessary conditions, preserving the uncomputed constants and unresolved collision/wake-speed boundary. No broader acceptance follows from this review.
