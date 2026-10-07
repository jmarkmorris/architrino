# A collision boundary requires approach to wake speed

## Statement and significance

Claim grade: derived, pending independent review. Consider exact complete circular histories of three fixed neutral antipodal pairs under the logarithmic inverse-distance equation with $K_{\log}=c_f=1$, unchanged transmitter factor and every ordinary positive-delay hit. Normalize the smallest radius to one and assume ordered radii $1=r_1<r_2<r_3<35$, common center, common angular speed $u=|\omega|$ and strict subfield speed $u r_3<1$. The upper radius bound is the earlier [independently checked result](overnight-c-outer-radius-thirty-five-independent-review.md). The argument below also works with any other finite upper radius bound.

Let $d$ be the smallest simultaneous distance between distinct members. For each fixed $\epsilon\in(0,1)$ there exists a number $d_\epsilon>0$ such that every exact configuration satisfying $u r_3\le1-\epsilon$ has $d\ge d_\epsilon$. Equivalently, any sequence of exact configurations with $d\to0$ must satisfy

$$
u r_3\longrightarrow1.
$$

This is a qualitative necessary boundary restriction, not a computed positive separation constant. It shows that collision cannot be approached while a fixed margin below wake speed remains. It does not exclude approach to a simultaneous collision and wake-speed boundary, admit an exact reference, or assign any law at coincidence. The proof examines the leading received contributions near a hypothetical collision and shows that two or three nearby members cannot balance them at a common subfield velocity.

## Selected law and complete roots

Write the six complete paths as $X_{a,s}(t)=s r_a e^{i(\omega t+\phi_a)}$ for all real $t$, with polarities $q_{a,s}=s$. At reception time zero, put $x_i=X_i(0)$. Each ordinary hit has delay $\tau>0$, chord $\tau n=x_i-X_j(-\tau)$ with $|n|=1$, factor $D=1-n\cdot V_j(-\tau)$ and contribution

$$
A_{ij}=q_iq_j\frac{n}{\tau D}.
$$

The absolute value in the selected law reduces to $D$ because every source speed is below one. The distance-minus-delay function is strictly decreasing by the source's speed bound; each distinct-member channel has one positive root, and the same-member channel has none. Thus all thirty directed partner roots and no positive self roots are present. The argument does not delete a root or replace the source factor.

For a receiver radius $a$ and source radius $b$, the circular chord identity implies $ab|\sin\theta|/\tau\le\min(a,b)$ at a root. Consequently $D\ge1-u a$, including for an outer source whose speed is close to one. If $d_{ij}=|x_i-x_j|$, the source speed bound also gives $\tau\ge d_{ij}/2$. Hence a receiver with $u a\le v_0<1$ satisfies the uniform row bound

$$
|A_{ij}|\le\frac{2}{(1-v_0)d_{ij}}.
$$

This estimate is used to show that distant members vanish after rescaling a small cluster. Their contributions remain in every original equation.

## The uniform-velocity limiting kernel

First consider a present displacement $y\ne0$ and a common constant source velocity $v$, $|v|<1$. This auxiliary kernel will be derived as the limit of the actual circular histories; it is not an alternative chosen interaction law. The positive causal delay $\ell$ is uniquely determined by

$$
\ell=|y+v\ell|,\qquad n=\frac{y+v\ell}{\ell},\qquad D_v=1-n\cdot v>0.
$$

The associated coefficient-one logarithmic contribution is

$$
K_v(y)=\frac{n}{\ell D_v}.
$$

It has two elementary properties needed below. First, it never vanishes and is injective. Indeed, if $k=K_v(y)$, then $n=k/|k|$, $D_v=1-n\cdot v$, $\ell=1/(|k|D_v)$ and

$$
y=\frac{n-v}{|k|(1-n\cdot v)}.
$$

Thus $k$ determines exactly one $y$. This is a direct inverse formula; no assertion about a standard-physics potential or field is used.

Second, for any unit direction $e$ perpendicular to $v$,

$$
e\cdot K_v(y)=\frac{e\cdot y}{\ell^2 D_v}.
$$

The denominator is positive. Thus the transverse component of the kernel has the same sign as the present transverse displacement. If $v=0$, the kernel is exactly $y/|y|^2$, and any direction may be used. If $y$ is parallel to nonzero $v$, subfield speed implies $n=\operatorname{sign}(y\cdot v)\,v/|v|$, so the kernel points along $y$.

## No two- or three-member limiting balance

Let $z_1,\ldots,z_m$ be distinct planar points, with $m=2$ or $m=3$, and $q_i\in\{-1,1\}$. The limiting equations would be

$$
\sum_{j\ne i}q_iq_j K_v(z_i-z_j)=0,\qquad i=1,\ldots,m.
$$

For two members, each sum has one nonzero term and cannot vanish.

For three members of mixed polarity, one polarity occurs twice. Choose a receiver with that majority polarity. Its other two sources have opposite signs, so its equation requires $K_v(z_i-z_j)=K_v(z_i-z_k)$. Injectivity gives $z_j=z_k$, contrary to their distinctness. It is unnecessary to assume a static reciprocal response or sum the equations.

For three members of one polarity, every coefficient $q_iq_j$ is positive. If their projections onto a direction perpendicular to $v$ are not all equal, choose a member with largest projection. Its two projected contributions are nonnegative and at least one is positive, so its equation fails. If the projections are all equal, the points lie on a line parallel to $v$; an extreme member on that line receives both kernels in the same direction, again preventing zero. For $v=0$, choose any direction with unequal projections, which exists because the points are distinct. These cases exhaust every polarity and geometry for $m\le3$.

## Rescaling a hypothetical circular collision

Suppose a sequence of exact circular configurations has $d_n\to0$. Choose a closest pair and pass to subsequences whenever needed; there are finitely many labels. Radii are in $[1,35]$, phases are on circles and $0\le u_n<1$, so reception positions and angular rates have convergent subsequences. Let $x_*$ be the limiting position of the selected closest pair and let $v_*=\lim\omega_n Jx_{i,n}$, where $J$ rotates a planar vector by ninety degrees.

Assume, for contradiction, that $|v_*|<1$. Define a cluster $C$ by retaining all labels whose distance from the selected anchor, divided by $d_n$, stays bounded on the subsequence. By a further finite diagonal subsequence every other scaled distance tends to infinity. For $i\in C$ set $z_{i,n}=(x_{i,n}-x_{\mathrm{anchor},n})/d_n$ and pass to limits. The cluster contains at least the closest pair, and every two limiting points remain at distance at least one because $d_n$ is the minimum distance among all labels.

Each antipodal pair has simultaneous separation $2r_a\ge2$. Consequently a cluster of diameter $O(d_n)$ contains at most one member of each of the three fixed pairs, so $2\le|C|\le3$. All members of $C$ have the same limiting reception position $x_*$ and velocity $v_*$. Their prescribed acceleration magnitudes satisfy $u_n^2r_a\le1$ because $u_n r_3<1$ and $r_a\le r_3$, so their short-time Taylor remainders have a uniform quadratic bound.

For two labels in $C$, their source speed stays below some fixed $v_0<1$ for sufficiently large $n$. The causal bounds give $\tau_{ij,n}=O(d_n)$ and positive finite bounds for $\tau_{ij,n}/d_n$. The complete circular history then yields

$$
x_{i,n}-X_{j,n}(-\tau_{ij,n})
=x_{i,n}-x_{j,n}+\tau_{ij,n}V_{j,n}(0)+O(\tau_{ij,n}^2).
$$

Divide by $d_n$ and use the exact causal equation. Every subsequential limit $\ell$ solves $\ell=|z_i-z_j+v_*\ell|$, whose unique positive solution was established above. The emission velocity converges to $v_*$ and its factor converges to $D_{v_*}>0$. Therefore the actual circular contributions have the limit

$$
d_n A_{ij,n}\longrightarrow q_iq_j K_{v_*}(z_i-z_j),\qquad i,j\in C,\ i\ne j.
$$

For a receiver in $C$ and a source outside $C$, the earlier receiver-radius factor bound applies with $u_n r_i\le v_0<1$, even if that source's own speed tends to one. Since $d_{ij,n}/d_n\to\infty$, it gives $d_n|A_{ij,n}|\to0$. The required circular acceleration also vanishes after multiplication by $d_n$. Multiplying every exact receiver equation in $C$ by $d_n$ and passing to the limit consequently gives precisely the impossible two- or three-member limiting balance. This contradiction proves that a closest cluster cannot have $|v_*|<1$.

## Boundary consequences and limits

If the claimed uniform $d_\epsilon$ did not exist, a sequence with $u_n r_{3,n}\le1-\epsilon$ and $d_n\to0$ would supply a closest cluster with $|v_*|\le1-\epsilon$, contradicting the argument. Likewise, if a collision sequence did not have $u_n r_{3,n}\to1$, it would contain a subsequence with a fixed speed margin and the same contradiction. This proves the statement.

On any convergent closest-cluster subsequence, its radius $|x_*|$ and the outer radius limit $r_{3,*}$ must satisfy $|x_*|=r_{3,*}$: the proof requires $u_*|x_*|=1$, while strict subfield speed in the original sequence gives $u_*r_{3,*}\le1$ and $|x_*|\le r_{3,*}$. Thus the closest collision cluster can occur only at the limiting outermost radius. This does not require the inner radius to approach that radius unless the inner pair participates in the closest cluster.

There is also a qualitative low-speed consequence. No sequence of exact configurations in the same bounded-radius class can have $u_n\to0$. The separation theorem gives a positive lower separation eventually, using for example $u_n r_{3,n}\le1/2$. After passage to a compact subsequence, all thirty contributions then converge to their instantaneous static logarithmic values. The static scalar identity for six neutral unit-polarity members is

$$
\sum_i x_i\cdot\sum_{j\ne i}q_iq_j\frac{x_i-x_j}{|x_i-x_j|^2}
=\sum_{i<j}q_iq_j
=\frac{(\sum_iq_i)^2-\sum_iq_i^2}{2}=-3.
$$

The required circular scalar tends to zero as $u_n\to0$, contradicting this identity. Hence exact configurations, if any exist in this class, have a positive lower angular-rate bound. Neither this bound nor $d_\epsilon$ has been computed. Their existence does not yet provide intervals suitable for a complete numerical cover.

The remaining boundary issue includes simultaneous approach to wake speed and collision. Equal-radius limits with distinct endpoint positions are also regular geometric boundaries of the strictly ordered chart and have not been excluded by this proof. No superfield statement, stability spectrum, trajectory evolution, physical acceptance or singular continuation is claimed.

## Verification and falsifiers

This proof is analytic; no numerical search, saved interval witness or approximate optimizer state is a premise. Independent reconstruction is pending. Falsifiers are a nonzero uniform-velocity kernel with a nonunique inverse, a two- or three-member configuration satisfying all displayed limiting equations, a closest cluster with more than three distinct members despite fixed antipodal separations, a failure of the receiver-radius factor floor, an omitted causal hit, a nonuniform short-delay remainder, an invalid subsequence limit, or an exact collision sequence retaining a fixed subfield speed margin. The argument uses bounded radii, planar common rotation, fixed unit polarities and the exact logarithmic source factor; removing any of these assumptions requires a new proof.
